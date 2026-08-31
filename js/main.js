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
    references: [
      { title: "5 Toon Shading Tips You Must Know (Blender)", creator: "Levi Magony", url: "https://www.youtube.com/watch?v=n9ZNGVvMOSQ" },
      { title: "Modeling a Whale in Blender 2.8 with Proportional Editing", creator: "Blender Bash", url: "https://www.youtube.com/watch?v=_HBxtiwATj8" },
      { title: "Modeling a 3D Jellyfish in Blender", creator: "SaTales", url: "https://www.youtube.com/watch?v=_YpI4bgDg_4" },
      { title: "How to Make Low Poly Clouds in Blender for Your Game!", creator: "Chris Folea Makes Things", url: "https://www.youtube.com/shorts/DWGpqrHwb7I" },
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
    references: [
      { title: "Blender 3D Beginner Tutorial: Mushrooms in Bottle", creator: "3DGreenhorn", url: "https://www.youtube.com/watch?v=kbiMXiUz9cc" },
    ],
  },
  {
    title: "Bedroom",
    category: "rooms",
    date: "2025-03-11",
    video: "assets/videos/Bedroom0001-0072.mp4",
    poster: "assets/images/BedroomThumbnail.png",
    description: "",
    references: [
      { title: "Blender 3D - Create a 3D Isometric Bedroom in 15 Minutes | Beginner Tutorial", creator: "3DGreenhorn", url: "https://www.youtube.com/watch?v=yCHT23A6aJA" },
    ],
  },
  {
    title: "Living Room",
    category: "rooms",
    date: "2025-03-11",
    video: "assets/videos/Livingroom0001-0072.mp4",
    poster: "assets/images/LivingRoomThumbnail.png",
    description: "",
    references: [
      { title: "Blender 3D Beginner Tutorial: Smooth 3D Living Room", creator: "3DGreenhorn", url: "https://www.youtube.com/watch?v=dEGJeVnWZAA" },
    ],
  },
  {
    title: "Kirby",
    category: "other",
    date: "2025-02-21",
    video: "assets/videos/KirbyVideo.mp4",
    poster: "assets/images/KirbyThumbnail.png",
    description: "",
    references: [
      { title: "How to Model and Rig Kirby in Blender! | Intermediate Tutorials | Blender 2.9x", creator: "CG Smoothie", url: "https://www.youtube.com/watch?v=vkt4a5ReBEA" },
    ],
  },
  {
    title: "Space Station",
    category: "big",
    date: "2024-12-19",
    video: "assets/videos/SpacestationVideo0001-0650.mp4",
    poster: "assets/images/SpaceStationThumbnail.png",
    description: "",
    references: [
      { title: "Spaceship Blender Tutorial", creator: "Stefeliga Flavius", url: "https://www.youtube.com/watch?v=YW3XxAcLNY8" },
      { title: "How to Model Easy Stars in Blender (Tutorial)", creator: "Ryan King Art", url: "https://www.youtube.com/watch?v=3fW3jnGXF58" },
    ],
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
    references: [
      { title: "Beginner Blender 4.0 Tutorial - Full Course", creator: "Blender Guru", url: "https://www.youtube.com/watch?v=4haAdmHqGOw" },
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

  let refsHtml = "";
  if (p.references) {
    refsHtml = `
      <details class="item-extra item-refs">
        <summary>Tutorial reference${p.references.length > 1 ? "s" : ""}</summary>
        <ul>
          ${p.references
            .map((r) =>
              r.url
                ? `<li><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>${r.creator ? ` — ${r.creator}` : ""}</li>`
                : `<li>${r.title}${r.creator ? ` — ${r.creator}` : ""}</li>`
            )
            .join("")}
        </ul>
      </details>`;
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
      ${refsHtml}
    </div>
  `;

  const video = item.querySelector(".carousel-video");
  const videoFrame = item.querySelector(".video-frame");
  const muteBtn = item.querySelector(".mute-btn");

  video.addEventListener(
    "loadedmetadata",
    () => {
      // Match the frame to the video's real aspect ratio (portrait, square,
      // or landscape) instead of forcing every card into one fixed shape.
      if (video.videoWidth && video.videoHeight) {
        videoFrame.style.setProperty("--ar", `${video.videoWidth} / ${video.videoHeight}`);
      }
      // For projects with no poster image, grab a frame from the video itself
      // so there's still a static thumbnail to show while inactive.
      if (!p.poster) {
        video.currentTime = Math.min(0.15, video.duration || 0);
      }
    },
    { once: true }
  );

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
