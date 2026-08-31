// TODO: fill in real descriptions when ready. Titles/categories can be adjusted too.
const PROJECTS = [
  {
    title: "Digital Portfolio Y1 Recap",
    category: "big",
    date: "2025-05-04",
    video: "assets/videos/0001-2347.mp4",
    poster: null,
    description: "",
  },
  {
    title: "Crystal Ocean",
    category: "big",
    date: "2025-04-05",
    video: "assets/videos/CrystalOceanFinal.mp4",
    poster: "assets/images/CrystalOceanThumbnail.png",
    description: "",
    extra: [
      { label: "Raw render pass", video: "assets/videos/CrystalOceanRendered0001-0240.mp4" },
    ],
  },
  {
    title: "Bottle",
    category: "other",
    date: "2025-03-19",
    video: "assets/videos/BottleVideo0001-0239.mp4",
    poster: "assets/images/BottleThumbnail.png",
    description: "",
    extra: [
      { label: "Instagram cut", video: "assets/videos/BottleVideoInsta0001-0239.mp4" },
    ],
  },
  {
    title: "Bedroom",
    category: "rooms",
    date: "2025-03-11",
    video: "assets/videos/Bedroom0001-0072.mp4",
    poster: "assets/images/BedroomThumbnail.png",
    description: "",
  },
  {
    title: "Living Room",
    category: "rooms",
    date: "2025-03-11",
    video: "assets/videos/Livingroom0001-0072.mp4",
    poster: "assets/images/LivingRoomThumbnail.png",
    description: "",
  },
  {
    title: "Kirby",
    category: "other",
    date: "2025-02-21",
    video: "assets/videos/KirbyVideo.mp4",
    poster: "assets/images/KirbyThumbnail.png",
    description: "",
  },
  {
    title: "Space Station",
    category: "big",
    date: "2024-12-19",
    video: "assets/videos/SpacestationVideo0001-0650.mp4",
    poster: "assets/images/SpaceStationThumbnail.png",
    description: "",
  },
  {
    title: "Donut",
    category: "donuts",
    date: "2024-11-30",
    video: "assets/videos/DonutVideo0001-0250.mp4",
    poster: "assets/images/DonutThumbnail.png",
    description: "",
    stills: [
      { label: "Cycles render", src: "assets/images/Donut5.0RenderCycles.png" },
      { label: "EEVEE render", src: "assets/images/Donut5.0RenderEEVEE.png" },
    ],
  },
];

/* ---------- Theme toggle ---------- */
(function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return prefersDark.matches ? "dark" : "light";
  }

  toggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

/* ---------- Carousel ---------- */
function carouselItem(p) {
  const item = document.createElement("div");
  item.className = "carousel-item";
  item.dataset.category = p.category;

  const thumbHtml = p.poster
    ? `<img class="thumb" src="${p.poster}" alt="${p.title} thumbnail" loading="lazy">`
    : "";

  let extraHtml = "";
  if (p.extra) {
    extraHtml = p.extra
      .map(
        (e) => `
      <details class="item-extra">
        <summary>${e.label}</summary>
        <video controls preload="none" src="${e.video}"></video>
      </details>`
      )
      .join("");
  }

  let stillsHtml = "";
  if (p.stills) {
    stillsHtml = `
      <div class="item-stills">
        ${p.stills
          .map((s) => `<figure><img src="${s.src}" alt="${p.title} — ${s.label}" loading="lazy"><figcaption>${s.label}</figcaption></figure>`)
          .join("")}
      </div>`;
  }

  item.innerHTML = `
    <div class="video-frame">
      <video class="carousel-video" muted loop playsinline preload="metadata" src="${p.video}"></video>
      ${thumbHtml}
      <button class="mute-btn" type="button" aria-label="Toggle sound">🔇</button>
    </div>
    <div class="item-meta">
      <div class="item-title-row">
        <h3>${p.title}</h3>
        <span class="item-date">${p.date}</span>
      </div>
      <p class="item-desc">${p.description || ""}</p>
      ${stillsHtml}
      ${extraHtml}
    </div>
  `;

  const video = item.querySelector(".carousel-video");
  const muteBtn = item.querySelector(".mute-btn");

  // For projects with no poster image, grab a frame from the video itself
  // so there's still a static thumbnail to show while inactive.
  if (!p.poster) {
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.currentTime = Math.min(0.15, video.duration || 0);
      },
      { once: true }
    );
  }

  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  return item;
}

function setActiveItem(track, item) {
  if (item === track._activeItem) return;

  if (track._activeItem) {
    const prevVideo = track._activeItem.querySelector(".carousel-video");
    track._activeItem.classList.remove("is-active");
    prevVideo.pause();
    prevVideo.muted = true;
    const prevMuteBtn = track._activeItem.querySelector(".mute-btn");
    if (prevMuteBtn) prevMuteBtn.textContent = "🔇";
  }

  item.classList.add("is-active");
  const video = item.querySelector(".carousel-video");
  video.play().catch(() => {});
  track._activeItem = item;
}

function updateActiveFromScroll(track) {
  const items = track.querySelectorAll(".carousel-item");
  if (!items.length) return;

  const trackRect = track.getBoundingClientRect();
  const center = trackRect.left + trackRect.width / 2;

  let closest = null;
  let closestDist = Infinity;
  items.forEach((item) => {
    const r = item.getBoundingClientRect();
    const itemCenter = r.left + r.width / 2;
    const dist = Math.abs(itemCenter - center);
    if (dist < closestDist) {
      closestDist = dist;
      closest = item;
    }
  });

  if (closest) setActiveItem(track, closest);
}

function initCarouselBehavior(track) {
  let raf = null;
  track.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => updateActiveFromScroll(track));
  });

  // Let a normal (vertical) mouse wheel drive horizontal scrolling too.
  track.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    },
    { passive: false }
  );

  document.querySelector(".carousel-nav.prev").addEventListener("click", () => {
    step(track, -1);
  });
  document.querySelector(".carousel-nav.next").addEventListener("click", () => {
    step(track, 1);
  });
}

function step(track, dir) {
  const items = Array.from(track.querySelectorAll(".carousel-item"));
  const currentIndex = items.indexOf(track._activeItem);
  const nextIndex = Math.max(0, Math.min(items.length - 1, currentIndex + dir));
  items[nextIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function render(filter) {
  const track = document.getElementById("project-track");
  track._activeItem = null;
  track.innerHTML = "";
  PROJECTS.filter((p) => filter === "all" || p.category === filter).forEach((p) =>
    track.appendChild(carouselItem(p))
  );
  track.scrollLeft = 0;
  requestAnimationFrame(() => updateActiveFromScroll(track));
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

initCarouselBehavior(document.getElementById("project-track"));
render("all");
