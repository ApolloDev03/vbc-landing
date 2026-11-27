/* ==========================================================================
   Landing page: hero tap sequence, card-deck slider, NFC flip card
   Depends on cards.js (CARD_LAYOUTS, renderVCard)
   ========================================================================== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero: NFC card taps the phone, profile opens (loops) ---------- */
  const stage = $("#stage");
  if (stage) {
    $("#heroPhoneCard").innerHTML = renderVCard(CARD_LAYOUTS[0]);
    if (reduceMotion) { stage.classList.add("ready", "tapped"); }
    else {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      const tap = async () => {
        stage.classList.add("tapping");
        await wait(800);
        stage.classList.remove("tapping");
        stage.classList.add("tapped");
      };
      (async function loop() {
        await wait(1300);
        stage.classList.add("ready");
        await wait(400);
        await tap();
        while (true) {
          await wait(4500);                       // show the opened profile
          if (document.hidden) { await wait(1000); continue; }
          stage.classList.remove("tapped");      // profile closes, card returns
          await wait(1100);
          await tap();
        }
      })();
    }
  }

  /* ---------- Card deck: a hand of cards that fans around the active one ---------- */
  const deck = $("#deck");
  if (deck) {
    const nameEl = $("#deckName"), subEl = $("#deckSub"), useEl = $("#deckUse");
    let list = [], cards = [], active = 0, drag = null, auto = null, paused = false;

    const angleStep = () => (innerWidth < 600 ? 9 : 11);

    function build() {
      list = CARD_LAYOUTS.slice();
      deck.innerHTML = list.map((d, i) =>
        `<div class="deck-card" data-i="${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${list.length}: ${d.title}">${renderVCard(d)}</div>`
      ).join("");
      cards = $$(".deck-card", deck);
      active = Math.min(Math.floor(list.length / 2), list.length - 1);
      // deal-in: start stacked below, then fan out
      cards.forEach(c => { c.style.transition = "none"; c.style.transform = "translateY(140px) scale(.8)"; c.style.opacity = 0; });
      deck.offsetHeight;
      cards.forEach((c, i) => {
        c.style.transition = "";
        c.style.transitionDelay = reduceMotion ? "0ms" : Math.abs(i - active) * 60 + "ms";
      });
      layout();
      setTimeout(() => cards.forEach(c => (c.style.transitionDelay = "")), 900);
    }

    // signed shortest distance between j and active on a loop
    function rel(j, shift = 0) {
      const n = list.length;
      let o = j - active - shift;
      if (n > 2) { o = ((o % n) + n) % n; if (o > n / 2) o -= n; }
      return o;
    }

    function layout(shift = 0) {
      const step = angleStep();
      cards.forEach((c, j) => {
        const o = rel(j, shift);
        const a = Math.abs(o);
        const visible = a <= 3.2;
        c.style.zIndex = String(100 - Math.round(a * 10));
        c.style.opacity = visible ? String(Math.max(0, 1 - Math.max(0, a - 2) * .9)) : "0";
        c.style.pointerEvents = a < 2.5 ? "auto" : "none";
        c.style.transform =
          `translateY(${a * 14}px) rotate(${o * step}deg) scale(${1 - Math.min(a, 3) * .07})`;
        c.classList.toggle("is-active", Math.round(o) === 0 && shift === 0);
        c.setAttribute("aria-hidden", Math.round(o) !== 0);
      });
      const d = list[active];
      if (d && shift === 0) {
        nameEl.textContent = d.title;
        subEl.textContent = `Layout ${d.id}, ${d.category}`;
        useEl.href = `register.html?layout=${d.id}`;
      }
    }

    function go(delta) {
      if (!list.length) return;
      active = (active + delta + list.length) % list.length;
      layout();
    }

    $("#deckPrev").addEventListener("click", () => { go(-1); restart(); });
    $("#deckNext").addEventListener("click", () => { go(1); restart(); });
    deck.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { go(1); restart(); }
      if (e.key === "ArrowLeft") { go(-1); restart(); }
    });

    // drag: the whole hand rotates with your finger
    const PX_PER_CARD = 150;
    deck.addEventListener("pointerdown", e => {
      const card = e.target.closest(".deck-card"); if (!card) return;
      drag = { x: e.clientX, dx: 0, card, moved: false };
      deck.setPointerCapture(e.pointerId);
      cards.forEach(c => c.classList.add("dragging"));
    });
    deck.addEventListener("pointermove", e => {
      if (!drag) return;
      drag.dx = e.clientX - drag.x;
      if (Math.abs(drag.dx) > 4) drag.moved = true;
      layout(-drag.dx / PX_PER_CARD);
    });
    const endDrag = () => {
      if (!drag) return;
      cards.forEach(c => c.classList.remove("dragging"));
      const steps = Math.round(-drag.dx / PX_PER_CARD) || (Math.abs(drag.dx) > 50 ? -Math.sign(drag.dx) : 0);
      if (!drag.moved) {
        // a click on a side card brings it to the front
        const j = +drag.card.dataset.i;
        if (j !== active) { active = j; }
        layout();
      } else go(steps);
      drag = null; restart();
    };
    deck.addEventListener("pointerup", endDrag);
    deck.addEventListener("pointercancel", endDrag);

    // autoplay: pauses on hover, focus, off-screen; off for reduced motion
    function restart() {
      clearInterval(auto);
      if (reduceMotion) return;
      auto = setInterval(() => { if (!paused && !drag) go(1); }, 3800);
    }
    deck.addEventListener("mouseenter", () => (paused = true));
    deck.addEventListener("mouseleave", () => (paused = false));
    deck.addEventListener("focusin", () => (paused = true));
    deck.addEventListener("focusout", () => (paused = false));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { paused = !en.isIntersecting; }).observe(deck);
    }
    addEventListener("resize", () => layout());

    build();
    restart();
  }

  /* ---------- NFC flip card + QR pattern ---------- */
  const flip = $("#flipCard");
  if (flip) {
    const toggle = () => {
      flip.classList.toggle("flipped");
      flip.setAttribute("aria-pressed", flip.classList.contains("flipped"));
    };
    flip.addEventListener("click", toggle);
    flip.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });

    const qr = $("#qr");
    const N = 11, cells = [];
    const finder = (x, y) => {
      const inBox = (ox, oy) => x >= ox && x < ox + 3 && y >= oy && y < oy + 3;
      return inBox(0, 0) || inBox(N - 3, 0) || inBox(0, N - 3);
    };
    let seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const on = finder(x, y) ? !(x % (N - 3) === 1 && y % (N - 3) === 1 && false) : rnd() > .5;
      cells.push(`<i class="${on ? "" : "o"}"></i>`);
    }
    qr.innerHTML = cells.join("");
  }
})();
