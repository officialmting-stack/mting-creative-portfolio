// TODO: fill in real descriptions when ready. Titles/categories can be adjusted too.
// "Untitled Project" below is the file 0001-2347.mp4 — no thumbnail/name was provided
// for it, so rename it once you know which project it is.
const PROJECTS = [
  {
    title: "Untitled Project",
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

function projectCard(p) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = p.category;

  const posterAttr = p.poster ? ` poster="${p.poster}"` : "";
  const posterClass = p.poster ? "" : " no-poster";

  let extraHtml = "";
  if (p.extra) {
    extraHtml = p.extra
      .map(
        (e) => `
      <details class="project-extra">
        <summary>${e.label}</summary>
        <video controls preload="none" src="${e.video}"></video>
      </details>`
      )
      .join("");
  }

  let stillsHtml = "";
  if (p.stills) {
    stillsHtml = `
      <div class="project-stills">
        ${p.stills
          .map((s) => `<figure><img src="${s.src}" alt="${p.title} — ${s.label}" loading="lazy"><figcaption>${s.label}</figcaption></figure>`)
          .join("")}
      </div>`;
  }

  card.innerHTML = `
    <video class="project-video${posterClass}" controls preload="none" src="${p.video}"${posterAttr}></video>
    <div class="project-body">
      <div class="project-title-row">
        <h3>${p.title}</h3>
        <span class="project-date">${p.date}</span>
      </div>
      <p class="project-desc">${p.description || ""}</p>
      ${stillsHtml}
      ${extraHtml}
    </div>
  `;
  return card;
}

function render(filter) {
  const grid = document.getElementById("project-grid");
  grid.innerHTML = "";
  PROJECTS.filter((p) => filter === "all" || p.category === filter).forEach((p) =>
    grid.appendChild(projectCard(p))
  );
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

render("all");
