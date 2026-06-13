// Hamburger nav mobile toggle
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}

// FIX: Menutup navigasi mobile menggunakan classList agar navbar tidak terhapus
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// Kontrol popup WhatsApp Floating Button
function toggleTooltip(e) {
  e.preventDefault();
  const t = document.getElementById("waTooltip");
  t.classList.toggle("show");
}

function closeTooltip() {
  document.getElementById("waTooltip").classList.remove("show");
}

// Menutup popup secara otomatis saat pengguna klik di sembarang tempat luar area popup
document.addEventListener("click", function (e) {
  const fab = document.getElementById("waFab");
  const tooltip = document.getElementById("waTooltip");
  if (fab && tooltip && !fab.contains(e.target) && !tooltip.contains(e.target)) {
    tooltip.classList.remove("show");
  }
});

// Link Template Pesan Otomatis WhatsApp
function openWA() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20ingin%20melakukan%20reservasi", "_blank");
}

// Link WhatsApp khusus untuk layanan homecare weekend
function openWAHomecare() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20ingin%20booking%20layanan%20homecare%20untuk%20Sabtu%20%2F%20Minggu", "_blank");
}

// Link WhatsApp dari popup melayang di halaman web
function openWAPopupChat() {
  window.open("https://wa.me/6285172341985?text=Halo%20Klinik%20Yusraharahap%2C%20saya%20tertarik%20dengan%20layanan%20klinik%20dan%20ingin%20bertanya%20lebih%20lanjut", "_blank");
}

// INTERSECTION OBSERVER DENGAN STAGGERED GRID DELAY EFFECTS
document.addEventListener("DOMContentLoaded", function () {
  const animTargets = document.querySelectorAll(".animate-box");

  animTargets.forEach((el) => el.classList.add("scroll-anim"));

  const animObserver = new IntersectionObserver(
    (entries, observer) => {
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

      intersectingEntries.forEach((entry, index) => {
        const element = entry.target;
        const delayClassIndex = index % 4;
        element.classList.add(`animate-delay-${delayClassIndex}`);
        element.classList.add("appear");
        observer.unobserve(element);
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
