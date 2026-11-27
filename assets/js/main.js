/* ==========================================================================
   Shared behaviour: theme, header, nav lens, buttons, modal, toast, reveal
   ========================================================================== */
(function () {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (circular reveal from the toggle) ---------- */
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("vbc-theme", t); } catch (e) {}
    $$(".theme-toggle").forEach(b => b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme"));
  }
  $$(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (!document.startViewTransition || reduceMotion) return setTheme(next);
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(() => setTheme(next));
      vt.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
    });
  });
  setTheme(root.getAttribute("data-theme") || "dark");

  /* ---------- Header: compact on scroll, mobile menu ---------- */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", scrollY > 20);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    const mt = $(".menu-toggle");
    mt && mt.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      mt.setAttribute("aria-expanded", open);
    });
    $$(".nav-links a").forEach(a => a.addEventListener("click", () => header.classList.remove("nav-open")));
  }

  /* ---------- Nav lens: a pill that slides to the hovered link ---------- */
  const links = $(".nav-links");
  if (links) {
    const lens = document.createElement("span");
    lens.className = "nav-lens";
    links.prepend(lens);
    const moveTo = a => {
      if (!a) { lens.style.opacity = 0; return; }
      lens.style.width = a.offsetWidth + "px";
      lens.style.transform = `translateX(${a.parentElement.offsetLeft}px)`;
      lens.style.opacity = 1;
    };
    $$("a", links).forEach(a => {
      a.addEventListener("mouseenter", () => moveTo(a));
      a.addEventListener("focus", () => moveTo(a));
    });
    links.addEventListener("mouseleave", () => moveTo($("a.active", links)));
    moveTo($("a.active", links));

    // highlight the section in view
    const sections = $$("a[href^='#']", links).filter(a => a.getAttribute("href").length > 1).map(a => $(a.getAttribute("href"))).filter(Boolean);
    if (sections.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          $$("a", links).forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
          if (!links.matches(":hover")) moveTo($("a.active", links));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(s => io.observe(s));
    }
  }

  /* ---------- Buttons: click ripple + pointer-tracked fill ---------- */
  document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".btn");
    if (!b || reduceMotion) return;
    const r = b.getBoundingClientRect();
    const s = Math.max(r.width, r.height);
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(span);
    setTimeout(() => span.remove(), 700);
  });
  document.addEventListener("pointermove", e => {
    const b = e.target.closest(".btn-ghost");
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", e.clientX - r.left + "px");
    b.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  window.vbcToast = function (msg) {
    let t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast"; t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.innerHTML = `<i class="fa-solid fa-circle-check"></i><span></span>`;
    $("span", t).textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  };

  /* ---------- Modal ("Talk to us") ---------- */
  const modal = $("#talkModal");
  let lastFocus;
  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => $("input", modal)?.focus(), 200);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    lastFocus && lastFocus.focus();
  }
  $$("[data-open-modal]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openModal(); }));
  if (modal) {
    $(".modal-close", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
    $("form", modal).addEventListener("submit", e => {
      e.preventDefault();
      if (!window.vbcValidate(e.target)) return;
      e.target.reset();
      closeModal();
      vbcToast("Message sent. We'll call you back shortly.");
    });
  }

  /* ---------- Simple form validation (shared) ---------- */
  window.vbcValidate = function (form) {
    let ok = true;
    $$("[required]", form).forEach(input => {
      const field = input.closest(".field");
      let valid = input.value.trim() !== "";
      if (valid && input.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (valid && input.dataset.type === "mobile") valid = /^[6-9]\d{9}$/.test(input.value.replace(/\D/g, "").slice(-10)) && input.value.replace(/\D/g, "").length >= 10;
      if (valid && input.minLength > 0) valid = input.value.length >= input.minLength;
      field && field.classList.toggle("invalid", !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    return ok;
  };
  document.addEventListener("input", e => {
    const f = e.target.closest(".field.invalid");
    f && f.classList.remove("invalid");
  });

  /* ---------- Password show / hide ---------- */
  $$(".eye").forEach(btn => btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.innerHTML = `<i class="fa-solid ${show ? "fa-eye-slash" : "fa-eye"}"></i>`;
    btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
  }));

  /* ---------- Reveal on scroll (quiet, once) ---------- */
  const revealEls = $$(".reveal, .steps");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .18 });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add("in"));

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();
