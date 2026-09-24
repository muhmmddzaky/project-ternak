/* ============================================================
   main.js — NusaTernak Farm
   Semua logika interaktif website ada di sini.
   Sections:
     1. Image Paths
     2. Navbar
     3. Mobile Nav
     4. Scroll Reveal
     5. Hero Counter Animation
     6. Contact Form
     7. Product Card 3D Tilt
============================================================ */

/* ----------------------------------------------------------
   1. IMAGE PATHS
   Ganti path di sini kalau kamu pindahkan folder images
---------------------------------------------------------- */
const IMAGES = {
  hero:  './images/hero-bg.jpg',
  goat:  './images/product-goat.jpg',
  eggs:  './images/product-eggs.jpg',
  quail: './images/product-quail.jpg',
  cow:   './images/product-cow.jpg',
};

/* ----------------------------------------------------------
   2. NAVBAR — transparan di atas, glassmorphism saat scroll
---------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ----------------------------------------------------------
   3. MOBILE NAV — hamburger menu open/close
---------------------------------------------------------- */
const hamburgerBtn  = document.getElementById('hamburgerBtn');
const mobileNav     = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

hamburgerBtn.addEventListener('click',  () => mobileNav.classList.add('open'));
mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link =>
  link.addEventListener('click', () => mobileNav.classList.remove('open'))
);

/* ----------------------------------------------------------
   4. SCROLL REVEAL — elemen muncul saat masuk viewport
---------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----------------------------------------------------------
   5. HERO COUNTER ANIMATION
   Angka-angka di hero section menghitung naik saat halaman dimuat
---------------------------------------------------------- */

/** Animasi angka dari 0 → target dalam durasi tertentu */
function animateCounter(el, target, suffix = '', duration = 1800) {
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress  = Math.min((timestamp - startTime) / duration, 1);
    const eased     = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent  = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// Konfigurasi setiap stat — sesuaikan angka di sini
const STATS = [
  { id: 'stat1', target: 500, suffix: '+'    },
  { id: 'stat2', target: 4,   suffix: ''     },
  { id: 'stat3', target: 8,   suffix: ' Thn' },
  { id: 'stat4', target: 300, suffix: '+'    },
];

let countersStarted = false;
const heroSection   = document.getElementById('hero');

new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      STATS.forEach(({ id, target, suffix }) => {
        const el = document.getElementById(id);
        if (el) animateCounter(el, target, suffix);
      });
    }
  },
  { threshold: 0.5 }
).observe(heroSection);

/* ----------------------------------------------------------
   6. CONTACT FORM — feedback visual saat submit
---------------------------------------------------------- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');

  // Tampilkan status sukses
  btn.innerHTML  = '✅ Pesan Terkirim!';
  btn.style.background = 'var(--clr-green-mid)';
  btn.disabled   = true;

  // Reset setelah 3 detik
  setTimeout(() => {
    btn.innerHTML = `Kirim Pesan
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>`;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// Expose ke window supaya bisa dipanggil dari HTML onsubmit
window.handleSubmit = handleSubmit;

/* ----------------------------------------------------------
   7. PRODUCT CARD 3D TILT — efek perspektif saat hover
---------------------------------------------------------- */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ----------------------------------------------------------
   8. HERO KEN BURNS — zoom out pelan saat halaman dimuat
---------------------------------------------------------- */
window.addEventListener('load', () => {
  if (heroSection) heroSection.classList.add('loaded');
});

/* ----------------------------------------------------------
   9. COMMODITY DATA (Foto ke-1 & Foto ke-3)
---------------------------------------------------------- */
const COMMODITIES = {
  quail: {
    title: 'ANEKA UNGGAS',
    category: 'KOMODITI PETERNAKAN PT. ALGHONI ANAM',
    emoji: '🪶',
    headerBg: 'linear-gradient(135deg, hsl(140, 45%, 22%) 0%, hsl(143, 35%, 38%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'PRODUK UTAMA',
        desc: 'PRODUK YANG DITAWARKAN BERUPA TELUR PUYUH DAN TELUR ITIK SEGAR, DENGAN KUALITAS TERBAIK DAN ASUH (AMAN, SEHAT, UTUH DAN HALAL).',
        img: IMAGES.eggs,
        reverse: false,
        tags: ['Telur Puyuh Segar', 'Telur Itik Organik', 'Standar ASUH', 'Kualitas Grade A']
      },
      {
        badge: 'BURUNG PUYUH PETELUR',
        title: 'COTURNIX JAPONICA',
        desc: 'COTURNIX JAPONICA MERUPAKAN JENIS BURUNG PUYUH PETELUR YANG DIPELIHARA DI PETERNAKAN PT. ALGHONI ANAM. JENIS PUYUH INI DIPILIH KARENA MEMILIKI PRODUKSI TELUR YANG TINGGI, PEMELIHARAAN YANG EFISIEN DAN PERTUMBUHAN YANG CEPAT.',
        img: IMAGES.quail,
        reverse: true,
        tags: ['Produksi Telur Tinggi', 'Pemeliharaan Efisien', 'Pertumbuhan Cepat', 'Kandang Bertingkat Modern']
      },
      {
        badge: 'UNGGAS PILIHAN',
        title: 'ITIK PAJAJARAN',
        desc: 'ITIK PAJAJARAN MENJADI PILIHAN PT. ALGHONI ANAM UNTUK DIBUDIDAYAKAN. ITIK INI TERPILIH MENJADI UNGGAS YANG DIPELIHARA DI PT. ALGHONI ANAM KARENA PRODUKSI TELUR YANG TINGGI (270-300 BUTIR/TAHUN), DAYA ADAPTASI LINGKUNGAN DAN YOLK TELUR PEKAT.',
        img: IMAGES.hero,
        reverse: false,
        tags: ['270-300 Butir/Tahun', 'Yolk Kuning Telur Pekat', 'Adaptasi Cuaca Tropis', 'Pakan Bernutrisi']
      }
    ],
    promos: [
      {
        badge: 'PRODUK OLAHAN',
        title: 'MIX PLATER QUEPI & SOSTETIK',
        prices: ['HANYA 7K - 8K !!'],
        note: 'Gratis ongkir untuk daerah kampus IPB Sukabumi!',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'OPEN ORDER SEGAR',
        title: 'OPEN ORDER TELUR PUYUH DAN TELUR ITIK',
        prices: ['Rp. 450 / butir (Telur Puyuh)', 'Rp. 2.500 / butir (Telur Itik)'],
        note: 'Pemesanan partai besar maupun retail siap kami layani dengan standar pengemasan aman.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  goat: {
    title: 'KAMBING BREEDING',
    category: 'KOMODITI PETERNAKAN PT. ALGHONI ANAM',
    emoji: '🐐',
    headerBg: 'linear-gradient(135deg, hsl(32, 45%, 24%) 0%, hsl(40, 50%, 38%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'BIBIT UNGGUL KAMBING BREEDING',
        desc: 'PT. ALGHONI ANAM MENYEDIAKAN BIBIT KAMBING PERAH DAN POTONG DENGAN GENETIK UNGGUL, PEMELIHARAAN TERSTANDAR BIOSECURITY, DAN TERVERIFIKASI ASUH (AMAN, SEHAT, UTUH, DAN HALAL).',
        img: IMAGES.goat,
        reverse: false,
        tags: ['Bibit Bersertifikat', 'Rekam Medis Lengkap', 'Bebas Cacat & Penyakit', 'Siap Kawin & Bunting']
      },
      {
        badge: 'PEJANTAN SIAP POTONG & AQIQAH',
        title: 'JANTAN DEWASA',
        desc: 'TERSEDIA PEJANTAN DEWASA SIAP POTONG DAN PRODUKTIF UMUR >2 TAHUN DENGAN RATA-RATA BOBOT 34.5KG. SANGAT COCOK UNTUK KEBUTUHAN AQIQAH, HEWAN QURBAN, MAUPUN SEBAGAI PEJANTAN INDUKAN PEMACAK UNGGUL.',
        img: IMAGES.goat,
        reverse: true,
        tags: ['Bobot Rata-rata 34.5kg', 'Umur >2 Tahun', 'Siap Potong & Qurban', 'Sehat & Agresif']
      },
      {
        badge: 'INDUKAN PRODUKTIF',
        title: 'BETINA DEWASA & BREEDING',
        desc: 'INDUKAN KAMBING PERAH DAN POTONG PILIHAN DARI RAS SAPERA, ETOWA (PE), DAN SAANEN DENGAN PRODUKSI SUSU TINGGI DAN FERTILITAS PRIMA UNTUK MEMASTIKAN POPULASI TERNAK ANDA CEPAT BERKEMBANG.',
        img: IMAGES.goat,
        reverse: false,
        tags: ['Ras Sapera & PE', 'Produksi Susu Tinggi', 'Umur 2-3 Tahun', 'Garansi Sehat & Aktif']
      }
    ],
    promos: [
      {
        badge: 'KATALOG INDUKAN',
        title: 'BETINA DEWASA SIAP BUNTING',
        prices: ['Rp. 1.800.000 / ekor'],
        note: 'Tersedia tag nomor seri 053, 079, 020, 371 dengan rekam medis dan vaksin lengkap.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'QURBAN & AQIQAH',
        title: 'PEJANTAN DEWASA 34.5 KG',
        prices: ['Mulai Rp. 2.500.000 / ekor'],
        note: 'Gratis ongkir area Sukabumi dan sekitarnya dengan garansi ternak sehat sampai tujuan.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  eggs: {
    title: 'AYAM PETELUR',
    category: 'KOMODITI PETERNAKAN PT. ALGHONI ANAM',
    emoji: '🥚',
    headerBg: 'linear-gradient(135deg, hsl(24, 50%, 25%) 0%, hsl(36, 60%, 40%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'TELUR AYAM SEGAR HARIAN',
        desc: 'TELUR AYAM NEGERI KONSUMSI SEGAR YANG DIAMBIL LANGSUNG DARI KANDANG SETIAP PAGI. MEMILIKI CANGKANG COKLAT TEBAL, BERSIH, SERTA TERVERIFIKASI ASUH BEBAS CEMARAN ANTIBIOTIK DAN BAKTERI.',
        img: IMAGES.eggs,
        reverse: false,
        tags: ['Grade A Fresh Harian', 'Bebas Residu Kimia', 'Cangkang Tebal Bersih', 'Standar Higienis ASUH']
      },
      {
        badge: 'RAS UNGGULAN',
        title: 'AYAM RAS ISA BROWN',
        desc: 'AYAM PETELUR RAS ISA BROWN DIPILIH KARENA KETAHANAN TUBUHNYA YANG PRIMA DI IKLIM TROPIS, KONVERSI PAKAN SANGAT EFISIEN, DAN KEMAMPUAN PRODUKSI TELUR KONSISTEN SEPANJANG TAHUN.',
        img: IMAGES.hero,
        reverse: true,
        tags: ['Tahan Iklim Tropis', 'Produktivitas Tinggi', 'Kuning Telur Pekat', 'Pakan Alami Berkualitas']
      },
      {
        badge: 'SISTEM KANDANG',
        title: 'BIOSECURITY SEMI-OTOMATIS',
        desc: 'KANDANG KAMI MENGGUNAKAN VENTILASI TERKONTROL DAN SISTEM SANITASI PERIODIK SEHINGGA TELUR TERJAGA TETAP BERSIH, TIDAK TERCEMAR, DAN LANGSUNG MASUK KE BAGIAN PACKING SECARA STERIL.',
        img: IMAGES.eggs,
        reverse: false,
        tags: ['Sanitasi Terjadwal', 'Pemilahan Cepat', 'Penyimpanan Sejuk', 'Kemasan Rapi & Aman']
      }
    ],
    promos: [
      {
        badge: 'PAKET RETAIL',
        title: 'TELUR SEGAR 1 TRAY (30 BUTIR)',
        prices: ['Rp. 28.000 / tray'],
        note: 'Sangat cocok untuk stok kebutuhan harian rumah tangga dan warung makan.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'MITRA USAHA',
        title: 'PASOKAN KATERING & RESTORAN',
        prices: ['Harga Spesial Mitra Grosir'],
        note: 'Jadwal pengiriman rutin berkala dengan jaminan kualitas dan ketersediaan stok.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  cow: {
    title: 'SAPI PERAH & OLAHAN',
    category: 'KOMODITI PETERNAKAN PT. ALGHONI ANAM',
    emoji: '🐄',
    headerBg: 'linear-gradient(135deg, hsl(210, 48%, 22%) 0%, hsl(218, 42%, 36%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'SUSU SAPI MURNI SEGAR',
        desc: 'SUSU SAPI SEGAR HASIL PEMERAHAN HIGIENIS PAGI DAN SORE HARI DARI SAPI PERAH SEHAT. MENGANDUNG PROTEIN TINGGI, KALSIUM ALAMI, DAN RASA GURIH ASLI TANPA TAMBAHAN AIR MAUPUN BAHAN KIMIA.',
        img: IMAGES.cow,
        reverse: false,
        tags: ['100% Murni Segar', 'Tanpa Bahan Pengawet', 'Pemerahan Higienis', 'Kaya Nutrisi & Kalsium']
      },
      {
        badge: 'PROSES STERIL',
        title: 'SUSU PASTEURISASI PREMIUM',
        desc: 'DIPROSES MELALUI PASTEURISASI SUHU TERKONTROL UNTUK MEMATIKAN BAKTERI PATOGEN TANPA MERUSAK STRUKTUR GIZI DAN KESEGARAN ASLI SUSU SAPI, DIKEMAS DALAM BOTOL HIGIENIS TERSEGEL RAPAT.',
        img: IMAGES.hero,
        reverse: true,
        tags: ['Pasteurisasi Berstandar', 'Tahan 7-10 Hari Dingin', 'Botol Segel Higienis', 'Aroma Segar & Alami']
      },
      {
        badge: 'INOVASI RASA',
        title: 'CAFE LATTE & PRODUK OLAHAN',
        desc: 'KAMI JUGA MENGHADIRKAN MINUMAN KEKINIAN BERGIZI TINGGI: CAFE LATTE DARI SUSU MURNI DAN KOPI PILIHAN, SUSU RASA COKELAT DAN STRAWBERRY, SERTA YOGURT ASLI YANG SANGAT SEHAT BAGI PENCERNAAN.',
        img: IMAGES.cow,
        reverse: false,
        tags: ['Cafe Latte Creamy', 'Yogurt Alami', 'Cokelat Belgia', 'Siap Minum Dingin']
      }
    ],
    promos: [
      {
        badge: 'MINUMAN SEGAR',
        title: 'CAFE LATTE & FRESH MILK BOTTLE',
        prices: ['Mulai Rp. 15.000 / botol'],
        note: 'Tersedia ukuran 250ml dan 1 Liter, praktis dinikmati kapan saja.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'LANGGANAN',
        title: 'PAKET LANGGANAN KELUARGA',
        prices: ['Mulai Rp. 65.000 / minggu'],
        note: 'Pengantaran rutin setiap pagi langsung ke rumah di Sukabumi & sekitarnya.',
        bgClass: 'card-blue-b'
      }
    ]
  }
};

/* ----------------------------------------------------------
   10. MODAL PENJELASAN KOMODITI (Foto ke-1)
---------------------------------------------------------- */
const productModal  = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalHeader   = document.getElementById('modalHeader');
const modalEmoji    = document.getElementById('modalEmoji');
const modalCategory = document.getElementById('modalCategory');
const modalTitle    = document.getElementById('modalTitle');
const modalBody     = document.getElementById('modalBody');
const modalCtaBtn   = document.getElementById('modalCtaBtn');
const modalTabBtns  = document.querySelectorAll('.modal-tab-btn');

let currentCommodityKey = 'quail';

/** Render isi modal sesuai komoditi yang dipilih */
function renderModalContent(key) {
  const data = COMMODITIES[key];
  if (!data) return;

  currentCommodityKey = key;

  // Update Header
  modalEmoji.textContent    = data.emoji;
  modalCategory.textContent = data.category;
  modalTitle.textContent    = data.title;
  modalHeader.style.background = data.headerBg;

  // Update Switcher Tabs
  modalTabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === key);
  });

  // Render Sections (Mirip Foto 1)
  let html = '';

  data.sections.forEach(sec => {
    html += `
      <div class="modal-section ${sec.reverse ? 'reverse' : ''}">
        <div>
          <div class="modal-section-badge">${sec.badge}</div>
          <h3 class="modal-section-title">${sec.title}</h3>
          <p class="modal-section-desc">${sec.desc}</p>
          <div class="modal-section-tags">
            ${sec.tags.map(t => `<span class="modal-section-tag">✓ ${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <img src="${sec.img}" alt="${sec.title}" class="modal-section-img" loading="lazy" />
        </div>
      </div>
    `;
  });

  // Render Promo & Order Flyers (Mirip 2 poster di bawah Foto 1)
  if (data.promos && data.promos.length > 0) {
    html += `
      <div class="modal-promo-label">
        <span>📢</span> Flyer &amp; Penawaran Spesial Komoditi Ini
      </div>
      <div class="modal-promo-grid">
        ${data.promos.map(promo => `
          <div class="modal-promo-card">
            <div>
              <div class="promo-badge-pill">${promo.badge}</div>
              <h4 class="modal-promo-card-title">${promo.title}</h4>
              <div class="modal-promo-prices-list">
                ${promo.prices.map(p => `<div class="modal-promo-price-chip">${p}</div>`).join('')}
              </div>
            </div>
            <p class="modal-promo-card-note">${promo.note}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  modalBody.innerHTML = html;

  // Update WhatsApp CTA
  const waText = encodeURIComponent(`Halo PT. Alghoni Anam Farm, saya tertarik dengan informasi komoditi ${data.title}. Mohon info pemesanan dan ketersediaan stok.`);
  modalCtaBtn.href = `https://wa.me/6281234567890?text=${waText}`;
}

/** Buka Modal */
function openProductModal(key = 'quail') {
  renderModalContent(key);
  productModal.classList.add('open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/** Tutup Modal */
function closeProductModal() {
  productModal.classList.remove('open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event Listeners pada Modal
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeProductModal);
}

if (productModal) {
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal && productModal.classList.contains('open')) {
    closeProductModal();
  }
});

// Switcher tabs dalam modal
modalTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (target) renderModalContent(target);
  });
});

// Klik kartu komoditi di section #products untuk buka modal (Foto 1)
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Kalau yang diklik bukan link anchor kontak eksternal
    const commKey = card.getAttribute('data-commodity');
    if (commKey) {
      e.preventDefault();
      openProductModal(commKey);
    }
  });
});

// Tombol khusus dalam kartu komoditi
document.querySelectorAll('.product-card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const commKey = btn.getAttribute('data-commodity');
    if (commKey) openProductModal(commKey);
  });
});

/* ----------------------------------------------------------
   11. TOAST NOTIFIKASI & SALIN KOORDINAT (Foto ke-2)
---------------------------------------------------------- */
const toastMsg     = document.getElementById('toastMsg');
const toastText    = document.getElementById('toastText');
const copyCoordsBtn = document.getElementById('copyCoordsBtn');

function showToast(text, duration = 3000) {
  if (!toastMsg) return;
  toastText.textContent = text;
  toastMsg.classList.add('show');
  setTimeout(() => {
    toastMsg.classList.remove('show');
  }, duration);
}

if (copyCoordsBtn) {
  copyCoordsBtn.addEventListener('click', () => {
    const coordsStr = '-6.941866, 106.955326';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coordsStr).then(() => {
        showToast(`📋 Koordinat ${coordsStr} berhasil disalin!`);
      }).catch(() => {
        showToast(`📍 Koordinat: ${coordsStr}`);
      });
    } else {
      showToast(`📍 Koordinat: ${coordsStr}`);
    }
  });
}

/* ----------------------------------------------------------
   12. KATALOG PRODUK BUTTON (Foto ke-3)
---------------------------------------------------------- */
const openCatalogFullBtn = document.getElementById('openCatalogFullBtn');
if (openCatalogFullBtn) {
  openCatalogFullBtn.addEventListener('click', () => {
    // Buka detail modal kambing atau arahkan ke WhatsApp
    openProductModal('goat');
    showToast('📖 Membuka detail katalog produk kambing...');
  });
}
