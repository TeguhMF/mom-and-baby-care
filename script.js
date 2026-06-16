// ── MOBILE NAVBAR TOGGLE ──
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}

// Menutup navigasi mobile saat salah satu link menu diklik
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// ── FLOATING WHATSAPP BUTTON HANDLER ──
function toggleTooltip(e) {
  e.preventDefault();
  const t = document.getElementById("waTooltip");
  t.classList.toggle("show");
}

function closeTooltip() {
  document.getElementById("waTooltip").classList.remove("show");
}

// Menutup popup secara otomatis saat pengguna klik di luar area popup/FAB
document.addEventListener("click", function (e) {
  const fab = document.getElementById("waFab");
  const tooltip = document.getElementById("waTooltip");
  if (fab && tooltip && !fab.contains(e.target) && !tooltip.contains(e.target)) {
    tooltip.classList.remove("show");
  }
});

// ── DIAL-IN WHATSAPP API LINKS ──
function openWA() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20ingin%20melakukan%20reservasi", "_blank");
}

function openWAHomecare() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20ingin%20booking%20layanan%20homecare%20untuk%20Sabtu%20%2F%20Minggu", "_blank");
}

function openWAPopupChat() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20tertarik%20dengan%20layanan%20klinik%20dan%20ingin%20bertanya%20lebih%20lanjut", "_blank");
}

// ── INTERSECTION OBSERVER WITH IMPROVED STAGGERED DELAY ──
document.addEventListener("DOMContentLoaded", function () {
  const animTargets = document.querySelectorAll(".animate-box");

  // Siapkan class scroll-anim dasar pada seluruh target
  animTargets.forEach((el) => el.classList.add("scroll-anim"));

  // Variabel bantuan untuk melacak urutan elemen yang muncul secara berurutan
  let globalAnimateIndex = 0;

  const animObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Menggunakan counter global agar elemen yang muncul berurutan tetap mendapatkan indeks delay yang bervariasi (0-3)
          const delayClassIndex = globalAnimateIndex % 4;
          globalAnimateIndex++;

          element.classList.add(`animate-delay-${delayClassIndex}`);
          element.classList.add("appear");
          
          // Lepas tracker setelah animasi berjalan agar menghemat resource browser
          observer.unobserve(element);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.08,
    },
  );

  animTargets.forEach((target) => animObserver.observe(target));
});

// ── LOCALSTORAGE VISITOR STATS LOGGER ──
function initVisitorStats() {
  const now = new Date();
  const dateString = now.toLocaleDateString('id-ID');

  // 1. Live Realtime Online Counter (Range 1 - 4 Orang)
  function updateOnlineCount() {
    const randomOnline = Math.floor(Math.random() * 4) + 1;
    const onlineEl = document.getElementById("stat-online");
    if (onlineEl) onlineEl.innerText = randomOnline;
  }
  updateOnlineCount();
  setInterval(updateOnlineCount, 7000); // Sinkronisasi ulang interval per 7 detik

  // 2. Persistent Tracker Logic via LocalStorage Browser
  let lastUpdateDate = localStorage.getItem("stats_last_date");
  let todayCount = parseInt(localStorage.getItem("stats_today")) || 3;       
  let yesterdayCount = parseInt(localStorage.getItem("stats_yesterday")) || 5; 
  let totalCount = parseInt(localStorage.getItem("stats_total")) || 12;       

  // Siklus pergantian tanggal otomatis
  if (lastUpdateDate && lastUpdateDate !== dateString) {
    yesterdayCount = todayCount;
    todayCount = Math.floor(Math.random() * 3) + 1; // Reset hari baru dimulai dari angka 1-3
    localStorage.setItem("stats_yesterday", yesterdayCount);
  } else {
    // Memberikan peluang 30% untuk menaikkan counter saat halaman di-refresh
    if (Math.random() < 0.3) {
      todayCount += 1;
      totalCount += 1;
    }
  }

  // Commit pembaruan state kembali ke storage local
  localStorage.setItem("stats_last_date", dateString);
  localStorage.setItem("stats_today", todayCount);
  localStorage.setItem("stats_total", totalCount);

  // Injeksi teks angka ke elemen penampung HTML
  if (document.getElementById("stat-today")) {
    document.getElementById("stat-today").innerText = todayCount;
    document.getElementById("stat-yesterday").innerText = yesterdayCount;
    document.getElementById("stat-total").innerText = totalCount;
  }
}

// Daftarkan handler statistik ke lifecycle DOMContentLoaded
document.addEventListener("DOMContentLoaded", initVisitorStats);