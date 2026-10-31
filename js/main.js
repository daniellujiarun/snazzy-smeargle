import { studio, looks, process } from "./content.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const TOTAL = pad(looks.length);

const src = (id, kind, ext = "png") => `assets/looks/${id}-${kind}.${ext}`;
const has = (look, kind) => Boolean(look.images?.[kind]);
const altFor = (look, side) =>
  `${look.title}: ${side} view of the Minecraft skin designed by ${look.designer} for ${look.client}`;

/* ---------- Templates ---------- */

// A front/back pair that the flip button toggles between.
function figure(look, { sticker = false, eager = false } = {}) {
  const f = sticker ? "sticker" : "front";
  const b = sticker ? "back-sticker" : "back";
  const loading = eager ? "eager" : "lazy";
  return `
    <div class="fig" data-side="front" data-fig="${look.id}">
      <img class="fig__img fig__img--front" src="${src(look.id, f)}" alt="${altFor(look, "Front")}" loading="${loading}" decoding="async">
      <img class="fig__img fig__img--back" src="${src(look.id, b)}" alt="${altFor(look, "Back")}" loading="lazy" decoding="async">
    </div>`;
}

const flipButton = (look) => `
  <button class="flip" type="button" data-flip="${look.id}" aria-pressed="false">
    <span class="flip__dots" aria-hidden="true"><i></i><i></i></span>
    <span class="flip__label">View back</span>
  </button>`;

const credits = (look) => `
  <p class="credits">
    <span>Commissioned by <em>${look.client}</em></span>
    <span>Designed by ${look.designer}</span>
    <span>Build-A-Skin commission</span>
  </p>`;

const titleLines = (text) =>
  text.split(" ").map((w) => `<span class="line"><span>${w}</span></span>`).join(" ");

function collage(look, n, mirror) {
  const [tagA, tagB] = look.tags;
  return `
  <div class="collage__wash" aria-hidden="true"><img src="${src(look.id, "backdrop", "webp")}" alt="" loading="lazy"></div>
  <div class="collage${mirror ? " collage--mirror" : ""}">
    <div class="clip" data-reveal>
      <p class="clip__no">Look ${n}</p>
      <h2 class="clip__title" id="t-${look.id}">${look.title}</h2>
      <p class="clip__sub">a Snazzy Smeargle original</p>
    </div>
    <figure class="tile tile--a" data-reveal="mask"><img src="${src(look.id, "backdrop", "webp")}" alt="${look.images.backdrop}" loading="lazy"></figure>
    <figure class="tile tile--b" data-reveal="mask" data-speed="0.05"><img src="${src(look.id, "scene", "webp")}" alt="${look.images.scene}" loading="lazy"></figure>
    <figure class="tile tile--c" data-reveal="mask" data-speed="-0.04"><img class="pixel" src="${src(look.id, "back")}" alt="${altFor(look, "Back")}" loading="lazy"></figure>
    <figure class="tile tile--d" data-reveal="mask"><img src="${src(look.id, "scene", "webp")}" alt="" loading="lazy"></figure>
    <div class="collage__fig" data-reveal="rise">${figure(look, { sticker: true })}</div>
    <span class="tag tag--1" data-reveal>${look.client}</span>
    <span class="tag tag--2" data-reveal>designed by ${look.designer}</span>
    <span class="tag tag--3" data-reveal>look ${n} / ${TOTAL}</span>
    <p class="collage__script" data-reveal><span>${tagA}</span> <em>${tagB}</em></p>
  </div>
  <div class="look__foot">${flipButton(look)}${credits(look)}</div>`;
}

function band(look, n) {
  const scene = has(look, "scene")
    ? `<figure class="band__scene" data-reveal="mask"><img src="${src(look.id, "scene", "webp")}" alt="${look.images.scene}" loading="lazy"><figcaption>In-game</figcaption></figure>`
    : "";
  return `
  <div class="band__top" data-reveal>
    <span class="pill">Look ${n}</span>
    <span>${look.client}</span>
  </div>
  <p class="band__spaced" data-reveal aria-hidden="true">Designed by ${look.designer} · Collection 01</p>
  <h2 class="band__title" id="t-${look.id}">${titleLines(look.title + ".")}</h2>
  <div class="band__band" data-reveal="wipe">
    <img class="band__photo" data-speed="0.06" src="${src(look.id, "ref", "webp")}" alt="${look.images.ref}" loading="lazy">
  </div>
  ${scene}
  <div class="band__fig" data-reveal="rise">${figure(look)}</div>
  <div class="band__foot">
    <span class="band__big" aria-hidden="true">${n}</span>
    ${credits(look)}
    ${flipButton(look)}
  </div>`;
}

function torn(look, n, mirror) {
  const before = look.before
    ? `<figure class="torn__before" data-reveal>
         <img class="pixel" src="${src(look.id, "before")}" alt="${look.before}" loading="lazy">
         <figcaption><span class="label">Before</span> crazy glow-up →</figcaption>
       </figure>`
    : "";
  return `
  <div class="torn__head" data-reveal>
    <span class="pill">Look ${n}</span>
    <span>Build-A-Skin commission</span>
    <span>${n} / ${TOTAL}</span>
  </div>
  <div class="torn__stage${mirror ? " torn__stage--mirror" : ""}">
    <h2 class="torn__title${look.title.length > 10 ? " torn__title--long" : ""}" id="t-${look.id}">${titleLines(look.title)}</h2>
    <div class="torn__frame" data-reveal="tear">
      <img src="${src(look.id, "ref", "webp")}" alt="${look.images.ref}" loading="lazy">
      <p class="torn__no" aria-hidden="true">№ ${n}</p>
      <p class="torn__handle"><em>${look.client}</em><i></i></p>
    </div>
    <div class="torn__fig" data-reveal="rise" data-speed="-0.05">${figure(look)}</div>
    <span class="torn__sticker" data-reveal>Designed by ${look.designer}</span>
    ${before}
  </div>
  <div class="look__foot">${flipButton(look)}${credits(look)}</div>`;
}

function renderLooks() {
  const counters = { collage: 0, torn: 0 };
  $("[data-looks]").innerHTML = looks
    .map((look, i) => {
      const n = pad(i + 1);
      const k = counters[look.layout]++ || 0;
      const body =
        look.layout === "collage" ? collage(look, n, k % 2 === 1)
        : look.layout === "torn" ? torn(look, n, k % 2 === 1)
        : band(look, n);
      return `
      <section class="look look--${look.layout} theme-${look.theme}" id="look-${look.id}" data-look="${i}"
        style="--tone:${look.tone};--accent:${look.accent};--band:${look.band || look.accent}"
        aria-labelledby="t-${look.id}">
        ${body}
      </section>`;
    })
    .join("");
}

function renderIndex() {
  $("[data-index]").innerHTML = looks
    .map(
      (l, i) => `
    <li data-reveal>
      <a href="#look-${l.id}" data-peek-id="${l.id}">
        <span class="index__no">${pad(i + 1)}</span>
        <span class="index__name">${l.title}</span>
        <span class="index__client">${l.client}</span>
        <span class="index__by">${l.designer}</span>
      </a>
    </li>`
    )
    .join("");
}

function renderStatic() {
  $("[data-descriptor]").textContent = studio.descriptor + ".";
  $("[data-tagline]").textContent = studio.tagline;
  $("[data-story]").textContent = studio.story;
  $("[data-year]").textContent = new Date().getFullYear();

  $("[data-stats]").innerHTML = studio.stats
    .map(
      (s) => `
    <li class="stat" data-reveal>
      <span class="stat__value"><span class="line"><span>${s.value}</span></span></span>
      <span class="stat__label">${s.label}</span>
    </li>`
    )
    .join("");

  $("[data-team]").innerHTML = studio.team
    .map((m) => `<li><span class="team__name">${m.name}</span><span class="team__role">${m.role}</span></li>`)
    .join("");

  $("[data-process]").innerHTML = process
    .map((p, i) => {
      let media = "";
      if (p.images) {
        media = `<div class="step__refs">${p.images
          .map((im) => `<img src="${im.src}" alt="${im.alt}" loading="lazy">`)
          .join("")}</div>`;
      }
      return `
      <li class="step" data-reveal>
        <span class="step__no">${pad(i + 1)}</span>
        <h3 class="step__name">${p.step}</h3>
        <p class="step__text">${p.text}</p>
        ${p.quote ? `<blockquote class="step__quote">“${p.quote}”</blockquote>` : ""}
        ${media}
      </li>`;
    })
    .join("");

  $("[data-closing-title]").innerHTML = studio.closing
    .split(" ")
    .map((w, i, a) => `<span class="line"><span>${i === a.length - 1 ? `<em>${w}</em>` : w}</span></span>`)
    .join(" ");

  $("[data-runway]").innerHTML = looks
    .map((l, i) => `<img src="${src(l.id, "front")}" alt="" loading="lazy" style="--i:${i}">`)
    .join("");

  $$("[data-email-link]").forEach((a) => {
    a.href = `mailto:${studio.email}?subject=${encodeURIComponent("Skin commission enquiry")}`;
    if (!a.textContent.trim()) a.textContent = studio.email;
  });
}

/* ---------- Hero carousel ---------- */

function hero() {
  const figBox = $("[data-hero-figure]");
  const backBox = $("[data-hero-back]");
  const num = $("[data-hero-num]");
  const count = $("[data-hero-count]");
  const caption = $("[data-hero-caption]");
  const pauseBtn = $("[data-hero-pause]");
  const section = $(".hero");
  let index = 0;
  let timer = null;
  let userPaused = false;

  // Warm the cache so slide changes never flash empty.
  looks.forEach((l) => { new Image().src = src(l.id, "sticker"); new Image().src = src(l.id, "back"); });

  function swap(box, html, dir) {
    const old = [...box.children];
    box.insertAdjacentHTML("beforeend", html);
    const fresh = box.lastElementChild;
    fresh.style.setProperty("--dir", dir);
    if (reduceMotion.matches || !old.length) { old.forEach((o) => o.remove()); return; }
    fresh.classList.add("is-entering");
    old.forEach((o) => { o.style.setProperty("--dir", dir); o.classList.add("is-leaving"); });
    requestAnimationFrame(() => requestAnimationFrame(() => fresh.classList.remove("is-entering")));
    setTimeout(() => old.forEach((o) => o.remove()), 1100);
  }

  function show(i, dir = 1) {
    index = (i + looks.length) % looks.length;
    const l = looks[index];
    const n = pad(index + 1);
    swap(figBox, `<img class="hero__img" src="${src(l.id, "sticker")}" alt="${altFor(l, "Front")}" fetchpriority="high">`, dir);
    swap(backBox, `<img class="hero__img" src="${src(l.id, "back")}" alt="" >`, dir);
    swap(num, `<span class="hero__digits">${n}</span>`, dir);
    count.textContent = n;
    caption.innerHTML = `<span class="label">Look ${n} / ${TOTAL}</span><span class="hero__look">${l.title}</span><span>for ${l.client} · by ${l.designer}</span>`;
    section.style.setProperty("--accent", l.accent);
  }

  const play = () => {
    stop();
    if (!userPaused && !reduceMotion.matches) timer = setInterval(() => show(index + 1, 1), 6000);
  };
  const stop = () => { clearInterval(timer); timer = null; };

  $("[data-hero-prev]").addEventListener("click", () => { show(index - 1, -1); play(); });
  $("[data-hero-next]").addEventListener("click", () => { show(index + 1, 1); play(); });
  pauseBtn.addEventListener("click", () => {
    userPaused = !userPaused;
    pauseBtn.setAttribute("aria-pressed", String(userPaused));
    pauseBtn.textContent = userPaused ? "Play" : "Pause";
    userPaused ? stop() : play();
  });
  section.addEventListener("pointerenter", stop);
  section.addEventListener("pointerleave", play);
  section.addEventListener("focusin", stop);
  section.addEventListener("focusout", play);
  section.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { show(index - 1, -1); }
    if (e.key === "ArrowRight") { show(index + 1, 1); }
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));

  if (reduceMotion.matches) {
    pauseBtn.hidden = true;
  }
  show(0);
  play();
}

/* ---------- Interactions ---------- */

function flips() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-flip]");
    if (!btn) return;
    const fig = $(`[data-fig="${btn.dataset.flip}"]`, btn.closest(".look"));
    const toBack = fig.dataset.side === "front";
    fig.dataset.side = toBack ? "back" : "front";
    btn.setAttribute("aria-pressed", String(toBack));
    $(".flip__label", btn).textContent = toBack ? "View front" : "View back";
  });
}

function indexPeek() {
  const peek = $("[data-peek]");
  const list = $("[data-index]");
  if (!matchMedia("(hover: hover) and (min-width: 900px)").matches) return;
  let current = null;
  list.addEventListener("pointerover", (e) => {
    const a = e.target.closest("[data-peek-id]");
    if (!a || a.dataset.peekId === current) return;
    current = a.dataset.peekId;
    peek.innerHTML = `<img src="${src(current, "sticker")}" alt="">`;
    peek.classList.add("is-on");
  });
  list.addEventListener("pointermove", (e) => {
    const r = list.getBoundingClientRect();
    peek.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
  list.addEventListener("pointerleave", () => { peek.classList.remove("is-on"); current = null; });
}

function reveals() {
  const targets = $$("[data-reveal], .line");
  // Stagger sibling lines inside the same heading.
  $$("h1, h2, .stat__value, .closing__title").forEach((h) =>
    $$(".line", h).forEach((l, i) => l.style.setProperty("--d", `${i * 90}ms`))
  );
  $$(".runway img").forEach((img, i) => img.style.setProperty("--d", `${i * 70}ms`));
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-in"));
    $(".runway")?.classList.add("is-in");
    return;
  }
  // Clip-path hides an element from IntersectionObserver, so masked
  // elements are watched through their parent instead.
  const watch = new Map();
  const add = (observed, el) => {
    if (!watch.has(observed)) watch.set(observed, []);
    watch.get(observed).push(el);
  };
  targets.forEach((t) =>
    ["mask", "rise", "wipe"].includes(t.dataset.reveal) ? add(t.parentElement, t) : add(t, t)
  );
  add($(".runway"), $(".runway"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        watch.get(en.target).forEach((el) => el.classList.add("is-in"));
        io.unobserve(en.target);
      }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );
  watch.forEach((_, el) => io.observe(el));
}

function parallax() {
  const items = $$("[data-speed]");
  const wide = matchMedia("(min-width: 768px)");
  let ticking = false;
  function update() {
    ticking = false;
    if (reduceMotion.matches || !wide.matches) { items.forEach((el) => (el.style.translate = "")); return; }
    const vh = innerHeight;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    }
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  update();
}

function progress() {
  const box = $("[data-progress]");
  const num = $("[data-progress-num]");
  const bar = $("[data-progress-bar]");
  const sections = $$("[data-look]");
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const i = Number(en.target.dataset.look);
        num.textContent = pad(i + 1);
        bar.style.transform = `scaleY(${(i + 1) / looks.length})`;
      }),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => io.observe(s));

  const first = sections[0], last = sections[sections.length - 1];
  const nav = $("#nav");
  const onScroll = () => {
    const y = scrollY + innerHeight / 2;
    box.classList.toggle("is-on", y > first.offsetTop && y < last.offsetTop + last.offsetHeight);
    nav.classList.toggle("is-scrolled", scrollY > 40);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

renderStatic();
renderIndex();
renderLooks();
hero();
flips();
indexPeek();
reveals();
parallax();
progress();
