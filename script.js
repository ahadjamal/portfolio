const projects = [
  { id:"ai-nexus", name:"AI-Nexus", type:"PRESENTATION DESIGN · MOTION GRAPHICS", copy:"A visual world for making the future of AI feel close.", cover:"cover-nexus", label:"PERSONAL CONCEPT" },
  { id:"learning", name:"Learning Experience Platform", type:"UI DESIGN · E-LEARNING", copy:"An imagined platform built around learning by doing.", cover:"cover-learning", label:"FICTIONAL CONCEPT" },
  { id:"fpv", name:"FPV Cinematics", type:"VIDEOGRAPHY · EDITING · STORYTELLING", copy:"Finding a new line through the landscape.", cover:"cover-fpv", label:"PERSONAL WORK" },
  { id:"3d-creations", name:"3D Printed Creations", type:"PRODUCT DESIGN · 3D PRINTING", copy:"Everyday objects shaped one layer at a time.", cover:"cover-objects", label:"PERSONAL WORK" },
  { id:"explorations", name:"Personal Explorations", type:"3D · ILLUSTRATION · MOTION", copy:"Experiments that start with curiosity.", cover:"cover-play", label:"PERSONAL WORK" },
  { id:"nuvora", name:"NuVora — 3D Print Store", type:"STORE WEBSITE UI · PERSONAL CONCEPT", copy:"A storefront for useful things made layer by layer.", cover:"cover-nuvora", label:"PERSONAL EXPLORATION" },
];

const capabilities = [
  ["01","Visual design","A strong visual idea, made clear across the whole experience.","✳","Adobe CC · Figma"],
  ["02","Motion & storytelling","Movement with meaning: pace, reveal and a little emotion.","↗","After Effects · Premiere"],
  ["03","Learning experiences","Turning complex subjects into learning people can use.","◎","Storyline · Visual systems"],
  ["04","3D & interactive","Space, material and interaction as part of the story.","◌","Blender · C4D · 3D tools"],
  ["05","Presentation design","Giving important ideas a structure worth following.","▤","PowerPoint · Information design"],
  ["06","Creative technology","Prototype, test, tinker—and see where the idea leads.","⌘","HTML / CSS · AI · Electronics"],
];

const experiments = [
  ["FPV / 04","A new line through the landscape","AIRFRAME · ANALOG VIDEO","01"],
  ["MAKER / 08","Useful objects, one layer at a time","FDM PRINTING · ITERATION","02"],
  ["CIRCUIT / 03","A tiny screen with a bigger idea","ESP32 · SENSORS · PROTOTYPE","03"],
  ["IMAGE / 11","Worlds somewhere between real and rendered","GENERATIVE · 3D STUDY","04"],
];

const projectGrid = document.querySelector("#project-grid");
projectGrid.innerHTML = projects.map((p, index) => `
  <article class="project-card reveal" id="project-${p.id}">
    <a class="project-link" href="#project-${p.id}" data-project-id="${p.id}" aria-label="View ${p.name}">
      <div class="project-art ${p.cover}" role="img" aria-label="${p.name} project cover">
        <span class="art-mark">${p.label}</span><span class="art-open" aria-hidden="true">↗</span>
      </div>
      <div class="project-meta"><div><h3>${p.name}</h3><p>${p.type}</p></div></div>
    </a>
  </article>`).join("");

document.querySelector("#capability-grid").innerHTML = capabilities.map(([n,title,copy,icon,tools]) => `
  <article class="capability-card reveal"><span class="cap-number">${n} / 06</span><span class="cap-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${copy}</p><small>${tools}</small></article>`).join("");

document.querySelector("#lab-grid").innerHTML = experiments.map(([tag,title,meta,n]) => `
  <article class="lab-card"><div class="lab-card-art lab-art-${n}" aria-hidden="true"><span class="lab-ring"></span><span class="lab-cross">+</span><span class="lab-code">${n}—${tag.split(" /")[0]}</span></div><div class="lab-card-copy"><span>${tag}</span><h3>${title}</h3><small>${meta}</small></div><span class="lab-arrow" aria-hidden="true">↗</span></article>`).join("");

document.querySelector("#year").textContent = new Date().getFullYear();
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open");
}));

const slides = [
  [0,0,"Home page · a warm introduction to the collection"],
  [100,0,"Collection page · objects by form and function"],
  [0,100,"Product detail · Ridge Table Lamp"],
  [100,100,"Customize · material, colour and size"],
];
const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const projectView = document.querySelector("#project-view");
const galleryStatus = document.querySelector("#gallery-status");
const galleryPrevious = document.querySelector("#gallery-prev");
const galleryNext = document.querySelector("#gallery-next");
let activeProject = null;
let activeSlide = 0;

function renderNuvoraSlide() {
  const [x,y,caption] = slides[activeSlide];
  const image = document.querySelector("#nuvora-gallery-image");
  image.style.backgroundPosition = `${x}% ${y}%`;
  image.setAttribute("aria-label", `NuVora store website mockup: ${caption}`);
  galleryStatus.textContent = `${activeSlide+1} / ${slides.length}  ·  ${caption}`;
}

function openProject(project) {
  activeProject = project;
  activeSlide = 0;
  dialogTitle.textContent = project.name;
  dialogKicker.textContent = project.type;
  if (project.id === "nuvora") {
    projectView.innerHTML = '<div class="nuvora-gallery-image" id="nuvora-gallery-image" role="img"></div><p class="gallery-hint">A personal concept for a 3D-printed objects store. Use the arrows to explore four views of the website.</p>';
    galleryPrevious.hidden = galleryNext.hidden = false;
    renderNuvoraSlide();
  } else {
    const isNexus = project.id === "ai-nexus";
    projectView.innerHTML = isNexus
      ? '<img class="project-detail-image" src="assets/ai-nexus.png" alt="AI-Nexus concept art: a visitor among luminous storytelling panels in a deep blue gallery">'
      : `<div class="project-detail-image ${project.cover}" role="img" aria-label="${project.name} project artwork"></div>`;
    galleryPrevious.hidden = galleryNext.hidden = true;
    galleryStatus.textContent = project.copy;
  }
  dialog.showModal();
}

projectGrid.addEventListener("click", event => {
  const link = event.target.closest("[data-project-id]");
  if (!link) return;
  event.preventDefault();
  const project = projects.find(item => item.id === link.dataset.projectId);
  if (project) openProject(project);
});
document.querySelectorAll("#open-nuvora, #open-nuvora-preview").forEach(button => button.addEventListener("click", () => {
  openProject(projects.find(item => item.id === "nuvora"));
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
galleryPrevious.addEventListener("click", () => { activeSlide = (activeSlide + slides.length - 1) % slides.length; renderNuvoraSlide(); });
galleryNext.addEventListener("click", () => { activeSlide = (activeSlide + 1) % slides.length; renderNuvoraSlide(); });
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
