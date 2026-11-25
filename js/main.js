/* ============================================================
   main.js — AgroNusa Farm (PT AgroNusa Mandiri)
   Semua logika interaktif website ada di sini.
   Sections:
     1. Image Paths
     2. Navbar
     3. Mobile Nav
     4. Scroll Reveal
     5. Hero Counter Animation
     6. Contact Form
     7. Product Card 3D Tilt
     8. Hero Ken Burns
     9. Product Data
    10. Product Detail Modal
    11. Toast Notification & Copy Coordinates
    12. Catalog Button
============================================================ */

/* ----------------------------------------------------------
   1. IMAGE PATHS
   Ganti path di sini kalau memindahkan folder images
---------------------------------------------------------- */
const IMAGES = {
  hero: './images/hero-bg.jpg',
  goat: './images/product-goat.jpg',
  eggs: './images/product-eggs.jpg',
  cow:  './images/product-cow.jpg',
};

/* ----------------------------------------------------------
   2. NAVBAR — transparan di atas, glassmorphism saat scroll
---------------------------------------------------------- */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ----------------------------------------------------------
   3. MOBILE NAV — hamburger menu open/close
---------------------------------------------------------- */
const hamburgerBtn   = document.getElementById('hamburgerBtn');
const mobileNav      = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', () => mobileNav.classList.add('open'));
}
if (mobileNavClose && mobileNav) {
  mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
}
if (mobileNav) {
  document.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

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
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// Konfigurasi setiap stat
const STATS = [
  { id: 'stat1', target: 500, suffix: '+'    },
  { id: 'stat2', target: 5,   suffix: ''     },
  { id: 'stat3', target: 8,   suffix: ' Thn' },
  { id: 'stat4', target: 300, suffix: '+'    },
];

let countersStarted = false;
const heroSection   = document.getElementById('hero');

if (heroSection) {
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
}

/* ----------------------------------------------------------
   6. CONTACT FORM — validasi & feedback visual saat submit
---------------------------------------------------------- */
function handleSubmit(e) {
  e.preventDefault();
  const form     = e.target;
  const namaEl   = document.getElementById('nama');
  const telEl    = document.getElementById('telepon');
  const minatEl  = document.getElementById('minat');
  const pesanEl  = document.getElementById('pesan');
  const btn      = document.getElementById('submitBtn');

  if (!namaEl || !telEl || !minatEl || !pesanEl || !btn) return;

  if (!namaEl.value.trim() || !telEl.value.trim() || !minatEl.value || !pesanEl.value.trim()) {
    showToast('⚠️ Mohon lengkapi seluruh kolom formulir dengan benar.');
    return;
  }

  // Tampilkan status sukses
  btn.innerHTML        = '✅ Pesan Terkirim!';
  btn.style.background = 'var(--clr-green-mid)';
  btn.disabled         = true;
  showToast('📬 Pesan Anda untuk PT AgroNusa Mandiri telah diterima!');

  // Reset setelah 3 detik
  setTimeout(() => {
    btn.innerHTML = `Kirim Pesan
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>`;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
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
   9. PRODUCT DATA — PT AgroNusa Mandiri (AgroNusa Farm)
---------------------------------------------------------- */
const COMMODITIES = {
  beef: {
    title: 'PREMIUM BEEF',
    category: 'PRODUK PT AGRONUSA MANDIRI • BOGOR',
    emoji: '🥩',
    headerBg: 'linear-gradient(135deg, hsl(140, 42%, 20%) 0%, hsl(143, 34%, 36%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'Daging Sapi Pilihan Grade A',
        desc: 'Premium Beef dari AgroNusa Farm berasal dari sapi potong sehat yang dipelihara secara modern di Bogor dengan pakan hijauan dan konsentrat terukur sehingga menghasilkan daging empuk dan bernutrisi tinggi.',
        img: IMAGES.hero,
        reverse: false,
        tags: ['Potongan Segar Pilihan', 'Standar ASUH & Halal', 'Pengawasan Dokter Hewan', 'Bebas Pengawet']
      },
      {
        badge: 'PENANGANAN MODERN',
        title: 'Proses Higienis & Rantai Dingin',
        desc: 'Setiap potongan daging sapi dikemas vakum secara higienis dan disimpan pada suhu rantai dingin terkontrol untuk mempertahankan kesegaran, warna alami, serta cita rasa daging.',
        img: IMAGES.cow,
        reverse: true,
        tags: ['Kemasan Vakum Steril', 'Rantai Dingin Terjaga', 'Siap Masak Harian', 'Ketertelusuran Jelas']
      }
    ],
    promos: [
      {
        badge: 'KEMASAN RITEL',
        title: 'PREMIUM BEEF PACK 1 KG',
        prices: ['Mulai Rp 135.000 / kg'],
        note: 'Tersedia pilihan potongan Has Dalam, Has Luar, dan daging serbaguna.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'MITRA KULINER',
        title: 'PASOKAN RESTORAN & KATERING',
        prices: ['Harga Khusus Mitra Agribisnis'],
        note: 'Pengiriman terjadwal dari Bogor untuk kebutuhan bisnis kuliner dan hotel.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  goat: {
    title: 'GOAT MEAT',
    category: 'PRODUK PT AGRONUSA MANDIRI • BOGOR',
    emoji: '🐐',
    headerBg: 'linear-gradient(135deg, hsl(32, 45%, 24%) 0%, hsl(40, 50%, 38%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'Daging Kambing Muda Segar',
        desc: 'Goat Meat PT AgroNusa Mandiri berasal dari kambing pilihan usia optimal yang dipelihara di kandang berstandar biosecurity, menghasilkan serat daging lembut, rendah lemak berlebih, dan tidak berbau prengus.',
        img: IMAGES.goat,
        reverse: false,
        tags: ['Serat Daging Lembut', 'Aroma Alami Bersih', 'Standar Halal & ASUH', 'Siap Olah']
      },
      {
        badge: 'KUALITAS TERJAGA',
        title: 'Pemotongan & Pengemasan Higienis',
        desc: 'Diproses dengan standar kebersihan ketat dan dikemas rapi dalam ukuran praktis untuk kebutuhan dapur rumah tangga, warung makan, hingga acara keluarga.',
        img: IMAGES.hero,
        reverse: true,
        tags: ['Kemasan Higienis', 'Potongan Sesuai Kebutuhan', 'Rantai Dingin Terkendali', 'Stok Terjaga']
      }
    ],
    promos: [
      {
        badge: 'PAKET KELUARGA',
        title: 'GOAT MEAT SEGAR 1 KG',
        prices: ['Mulai Rp 120.000 / kg'],
        note: 'Tersedia potongan paha, iga, dan daging tanpa tulang dalam kemasan vakum.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'KEMITRAAN',
        title: 'PASOKAN RUTIN KULINER',
        prices: ['Hubungi 0800-1234-5678'],
        note: 'Siap melayani pemesanan berkala dengan jaminan mutu PT AgroNusa Mandiri.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  eggs: {
    title: 'FRESH CHICKEN EGGS',
    category: 'PRODUK PT AGRONUSA MANDIRI • BOGOR',
    emoji: '🥚',
    headerBg: 'linear-gradient(135deg, hsl(24, 50%, 25%) 0%, hsl(36, 60%, 40%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'Telur Ayam Segar Panen Harian',
        desc: 'Fresh Chicken Eggs dipanen setiap pagi dari unit unggas petelur AgroNusa Farm. Memiliki cangkang tebal bersih, kuning telur cerah pekat, dan terjamin bebas residu bahan berbahaya.',
        img: IMAGES.eggs,
        reverse: false,
        tags: ['Panen Segar Harian', 'Cangkang Tebal Bersih', 'Bebas Residu Antibiotik', 'Standar ASUH']
      },
      {
        badge: 'MANAJEMEN KANDANG',
        title: 'Biosecurity & Pakan Alami Terukur',
        desc: 'Pemeliharaan ayam petelur didukung sistem sanitasi rutin dan formulasi pakan bernutrisi seimbang sehingga mutu serta ukuran telur selalu konsisten sepanjang tahun.',
        img: IMAGES.hero,
        reverse: true,
        tags: ['Sanitasi Terjadwal', 'Sortasi Mutu Ketat', 'Kemasan Aman Anti Pecah', 'Nutrisi Optimal']
      }
    ],
    promos: [
      {
        badge: 'PAKET HARIAN',
        title: 'FRESH CHICKEN EGGS (1 TRAY / 30 BUTIR)',
        prices: ['Rp 28.000 / tray'],
        note: 'Ideal untuk kebutuhan rumah tangga, toko bahan pangan, dan UMKM kuliner.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'GROSIR & MITRA',
        title: 'PASOKAN BAKERY & RESTORAN',
        prices: ['Harga Spesial Mitra Grosir'],
        note: 'Pengiriman terjadwal langsung dari fasilitas AgroNusa Farm di Bogor.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  milk: {
    title: 'FRESH MILK',
    category: 'PRODUK PT AGRONUSA MANDIRI • BOGOR',
    emoji: '🥛',
    headerBg: 'linear-gradient(135deg, hsl(210, 48%, 22%) 0%, hsl(218, 42%, 36%) 100%)',
    sections: [
      {
        badge: 'PRODUK UTAMA',
        title: 'Susu Sapi Murni Segar',
        desc: 'Fresh Milk dari PT AgroNusa Mandiri diperoleh melalui pemerahan higienis pagi dan sore hari dari sapi perah sehat, kaya protein, kalsium alami, dan tanpa bahan pengawet.',
        img: IMAGES.cow,
        reverse: false,
        tags: ['100% Susu Murni', 'Tanpa Pengawet', 'Pemerahan Higienis', 'Kaya Protein & Kalsium']
      },
      {
        badge: 'PROSES STERIL',
        title: 'Pasteurisasi Suhu Terkontrol',
        desc: 'Diproses melalui pasteurisasi modern untuk menjaga keamanan konsumsi tanpa merusak kandungan gizi serta rasa gurih alami susu segar, dikemas dalam botol tersegel rapat.',
        img: IMAGES.hero,
        reverse: true,
        tags: ['Pasteurisasi Terstandar', 'Botol Segel Higienis', 'Simpan Dingin 4°C', 'Segar & Bernutrisi']
      }
    ],
    promos: [
      {
        badge: 'BOTOL SEGAR',
        title: 'FRESH MILK BOTTLE 1 LITER',
        prices: ['Mulai Rp 18.000 / liter'],
        note: 'Tersedia dalam kemasan botol higienis siap konsumsi maupun untuk bahan baku kafe.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'LANGGANAN',
        title: 'PAKET LANGGANAN KELUARGA & KAFE',
        prices: ['Pesan via info@agronusamandiri.example'],
        note: 'Pengantaran rutin area Bogor dan sekitarnya dengan armada berpendingin.',
        bgClass: 'card-blue-b'
      }
    ]
  },

  fertilizer: {
    title: 'ORGANIC FERTILIZER',
    category: 'PRODUK PT AGRONUSA MANDIRI • BOGOR',
    emoji: '🌱',
    headerBg: 'linear-gradient(135deg, hsl(142, 48%, 22%) 0%, hsl(95, 38%, 34%) 100%)',
    sections: [
      {
        badge: 'AGROEKOSISTEM BERKELANJUTAN',
        title: 'Pupuk Organik Matang Fermentasi',
        desc: 'Organic Fertilizer merupakan bagian penting dari siklus peternakan terpadu PT AgroNusa Mandiri. Limbah organik ternak diolah melalui fermentasi terkontrol menjadi pupuk padat kaya unsur hara.',
        img: IMAGES.hero,
        reverse: false,
        tags: ['100% Bahan Organik', 'Fermentasi Matang Sempurna', 'Bebas Bau Menyengat', 'Menyuburkan Tanah']
      },
      {
        badge: 'MANFAAT PERTANIAN',
        title: 'Dukungan Agribisnis Ramah Lingkungan',
        desc: 'Membantu memperbaiki struktur tanah, meningkatkan daya serap air, dan mendukung pertumbuhan tanaman pangan, hortikultura, maupun perkebunan secara berkelanjutan.',
        img: IMAGES.cow,
        reverse: true,
        tags: ['Kaya Mikroba Baik', 'Cocok untuk Hortikultura', 'Ramah Lingkungan', 'Kemasan Karung Praktis']
      }
    ],
    promos: [
      {
        badge: 'KEMASAN KEBUN',
        title: 'ORGANIC FERTILIZER 25 KG',
        prices: ['Rp 25.000 / karung'],
        note: 'Siap pakai untuk pekarangan rumah, kebun sayur, maupun tanaman hias.',
        bgClass: 'card-blue-a'
      },
      {
        badge: 'MITRA PERTANIAN',
        title: 'PASOKAN KELOMPOK TANI & PERKEBUNAN',
        prices: ['Harga Khusus Pembelian Curah'],
        note: 'Solusi agribisnis berkelanjutan langsung dari unit pengolahan PT AgroNusa Mandiri.',
        bgClass: 'card-blue-b'
      }
    ]
  }
};

/* ----------------------------------------------------------
   10. MODAL PENJELASAN PRODUK
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

let currentCommodityKey = 'beef';

/** Render isi modal sesuai produk yang dipilih */
function renderModalContent(key) {
  const data = COMMODITIES[key];
  if (!data || !modalBody) return;

  currentCommodityKey = key;

  // Update Header
  if (modalEmoji)    modalEmoji.textContent    = data.emoji;
  if (modalCategory) modalCategory.textContent = data.category;
  if (modalTitle)    modalTitle.textContent    = data.title;
  if (modalHeader)   modalHeader.style.background = data.headerBg;

  // Update Switcher Tabs
  modalTabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === key);
  });

  // Render Sections
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

  // Render Promo & Order Cards
  if (data.promos && data.promos.length > 0) {
    html += `
      <div class="modal-promo-label">
        <span>📢</span> Penawaran &amp; Informasi Pemesanan
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

  // Update Email CTA
  if (modalCtaBtn) {
    const subject = encodeURIComponent(`Pemesanan & Informasi ${data.title} - PT AgroNusa Mandiri`);
    const body    = encodeURIComponent(`Halo PT AgroNusa Mandiri (AgroNusa Farm),\n\nSaya tertarik dengan produk ${data.title}. Mohon informasi ketersediaan stok dan pemesanan.\n\nTerima kasih.`);
    modalCtaBtn.href = `mailto:info@agronusamandiri.example?subject=${subject}&body=${body}`;
  }
}

/** Buka Modal */
function openProductModal(key = 'beef') {
  if (!productModal) return;
  renderModalContent(key);
  productModal.classList.add('open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/** Tutup Modal */
function closeProductModal() {
  if (!productModal) return;
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

// Klik kartu produk di section #products untuk buka modal
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const commKey = card.getAttribute('data-commodity');
    if (commKey) {
      e.preventDefault();
      openProductModal(commKey);
    }
  });
});

// Tombol khusus dalam kartu produk
document.querySelectorAll('.product-card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const commKey = btn.getAttribute('data-commodity');
    if (commKey) openProductModal(commKey);
  });
});

/* ----------------------------------------------------------
   11. TOAST NOTIFIKASI & SALIN KOORDINAT (Bogor, West Java)
---------------------------------------------------------- */
const toastMsg      = document.getElementById('toastMsg');
const toastText     = document.getElementById('toastText');
const copyCoordsBtn = document.getElementById('copyCoordsBtn');
let toastTimer      = null;

function showToast(text, duration = 3000) {
  if (!toastMsg || !toastText) return;
  toastText.textContent = text;
  toastMsg.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastMsg.classList.remove('show');
  }, duration);
}

if (copyCoordsBtn) {
  copyCoordsBtn.addEventListener('click', () => {
    const coordsStr = '-6.597147, 106.806039';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coordsStr).then(() => {
        showToast(`📋 Koordinat ${coordsStr} (Bogor) berhasil disalin!`);
      }).catch(() => {
        showToast(`📍 Koordinat Bogor: ${coordsStr}`);
      });
    } else {
      showToast(`📍 Koordinat Bogor: ${coordsStr}`);
    }
  });
}

/* ----------------------------------------------------------
   12. KATALOG PRODUK BUTTON
---------------------------------------------------------- */
const openCatalogFullBtn = document.getElementById('openCatalogFullBtn');
if (openCatalogFullBtn) {
  openCatalogFullBtn.addEventListener('click', () => {
    openProductModal('beef');
    showToast('📖 Membuka detail katalog produk AgroNusa Farm...');
  });
}
