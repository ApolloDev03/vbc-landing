/* ==========================================================================
   Login + register pages
   Hook your backend where you see "TODO: backend".
   ========================================================================== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- LOGIN ---------- */
  const fan = $("#fan");
  if (fan) {
    fan.innerHTML = [2, 0, 4].map(i => `<div class="fan-card">${renderVCard(CARD_LAYOUTS[i])}</div>`).join("");
  }

  const seg = $("#loginMode");
  if (seg) {
    const pwForm = $("#pwForm"), otpForm = $("#otpForm");
    const setMode = m => {
      seg.dataset.mode = m;
      $$("button", seg).forEach(b => b.setAttribute("aria-selected", b.dataset.mode === m));
      pwForm.hidden = m !== "password";
      otpForm.hidden = m !== "otp";
      // carry the number across
      const from = m === "otp" ? $("#lMobile") : $("#oMobile");
      const to = m === "otp" ? $("#oMobile") : $("#lMobile");
      if (from.value && !to.value) to.value = from.value;
    };
    $$("button", seg).forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
    $$("[data-switch]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); setMode(a.dataset.switch); }));

    pwForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!vbcValidate(pwForm)) return;
      // TODO: backend — POST mobile + password, then redirect to the dashboard
      vbcToast("Logged in. Opening your dashboard…");
    });

    // OTP boxes: auto-advance, backspace, paste
    const boxes = $$(".otp input");
    boxes.forEach((inp, i) => {
      inp.addEventListener("input", () => {
        inp.value = inp.value.replace(/\D/g, "").slice(-1);
        if (inp.value && boxes[i + 1]) boxes[i + 1].focus();
      });
      inp.addEventListener("keydown", e => { if (e.key === "Backspace" && !inp.value && boxes[i - 1]) boxes[i - 1].focus(); });
      inp.addEventListener("paste", e => {
        const d = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
        if (!d) return; e.preventDefault();
        d.split("").forEach((ch, k) => boxes[k] && (boxes[k].value = ch));
        boxes[Math.min(d.length, 5)].focus();
      });
    });

    let codeSent = false;
    otpForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!vbcValidate(otpForm)) return;
      if (!codeSent) {
        // TODO: backend — request an SMS code for this number
        codeSent = true;
        $("#otpBoxes").hidden = false;
        $("#otpBtn").innerHTML = 'Verify and log in <i class="fa-solid fa-arrow-right"></i>';
        boxes[0].focus();
        vbcToast("Code sent by SMS.");
        return;
      }
      const code = boxes.map(b => b.value).join("");
      if (code.length < 6) { boxes.find(b => !b.value).focus(); return; }
      // TODO: backend — verify the code
      vbcToast("Verified. Opening your dashboard…");
    });
  }

  /* ---------- REGISTER ---------- */
  const reg = $("#regForm");
  if (reg) {
    const preview = $("#previewCard"), picker = $("#layoutPicker"), label = $("#previewLabel");
    const params = new URLSearchParams(location.search);
    let layout = CARD_LAYOUTS.find(l => String(l.id) === params.get("layout")) || CARD_LAYOUTS[0];

    // what the preview shows when a field is empty
    const blank = { name: "Your name", role: "Owner", company: "Your company", phone: "+91 98XXX XXXXX", email: "you@company.com", web: "vbcardindia.com/you", city: "Your city" };
    const values = {};

    function draw(pulse) {
      const data = { ...layout, ...blank };
      Object.keys(values).forEach(k => { if (values[k]) data[k] = values[k]; });
      preview.innerHTML = renderVCard(data);
      label.textContent = `Layout ${layout.id}, ${layout.title}`;
      if (pulse) { preview.classList.remove("pulse"); void preview.offsetWidth; preview.classList.add("pulse"); }
    }

    picker.innerHTML = CARD_LAYOUTS.map(l =>
      `<button type="button" style="--c1:${l.colors.c1};--c2:${l.colors.c2}" aria-pressed="${l.id === layout.id}" data-id="${l.id}" aria-label="Layout ${l.id}, ${l.title}" title="${l.title}"></button>`
    ).join("");
    picker.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      layout = CARD_LAYOUTS.find(l => String(l.id) === b.dataset.id);
      $$("button", picker).forEach(x => x.setAttribute("aria-pressed", x === b));
      draw(true);
    });

    // live binding: typing updates only the bound text, no re-render
    $$("[data-bind]", reg).forEach(inp => inp.addEventListener("input", () => {
      const key = inp.dataset.bind;
      values[key] = inp.value.trim();
      const node = preview.querySelector(`[data-bind="${key}"]`);
      if (node) node.textContent = values[key] || blank[key];
      if (key === "name") preview.querySelector(".vc-avatar").textContent = vcInitials(values.name || "Your Name");
    }));
    draw();

    // scale the preview so it always fits the panel height
    const wrap = $("#previewWrap"), scaler = $("#previewScale");
    const fit = () => {
      const h = wrap.clientHeight;
      scaler.style.setProperty("--fit", h ? Math.min(1, h / 480).toFixed(3) : 1);
    };
    fit(); addEventListener("resize", fit);

    reg.addEventListener("submit", e => {
      e.preventDefault();
      if (!vbcValidate(reg)) return;
      // TODO: backend — POST all fields plus layout.id
      vbcToast(`Account created with layout ${layout.id}. Opening your dashboard…`);
    });
  }
})();
