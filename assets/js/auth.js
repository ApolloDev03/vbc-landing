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

  /* ---------- REGISTER: the NFC card fills in as you type ---------- */
  const reg = $("#regForm");
  if (reg) {
    const card = $("#regCard");
    const val = id => ($("#" + id)?.value || "").trim();
    const outs = key => $$(`[data-out="${key}"]`, card);
    const blank = { company: "Your company", name: "Your name", phone: "+91 98XXX XXXXX", email: "you@company.com", place: "Your city, State" };
    const slug = t => t.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
    const initials = t => t.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "YC";
    const phoneFmt = t => {
      const d = t.replace(/\D/g, "").slice(-10);
      if (!d) return "";
      return "+91 " + (d.length > 5 ? d.slice(0, 5) + " " + d.slice(5) : d);
    };

    // which side of the card each field lives on, and what it updates
    const map = {
      rCompany: { side: "front", keys: ["company", "initials", "url"] },
      rGst:     { side: "front", keys: ["gst"] },
      rAddress: { side: "front", keys: ["place"] },
      rCity:    { side: "front", keys: ["place"] },
      rState:   { side: "front", keys: ["place"] },
      rPin:     { side: "front", keys: ["place"] },
      rName:    { side: "back",  keys: ["name"] },
      rEmail:   { side: "back",  keys: ["email"] },
      rMobile:  { side: "back",  keys: ["phone"] }
    };

    function compute() {
      const company = val("rCompany");
      const place = [val("rCity"), val("rState")].filter(Boolean).join(", ") + (val("rPin") ? " " + val("rPin") : "");
      return {
        company: company || blank.company,
        initials: initials(company),
        url: "vbcardindia.com/" + (slug(company) || "your-company"),
        gst: val("rGst").toUpperCase(),
        place: place || (val("rAddress") ? val("rAddress") : blank.place),
        name: val("rName") || blank.name,
        email: val("rEmail") || blank.email,
        phone: phoneFmt(val("rMobile")) || blank.phone
      };
    }

    function paint(changedKeys = []) {
      const data = compute();
      Object.entries(data).forEach(([k, v]) => outs(k).forEach(el => {
        if (el.textContent !== v) {
          el.textContent = v;
          if (changedKeys.includes(k)) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
        }
      }));
      const gst = outs("gst")[0]; if (gst) gst.hidden = !data.gst;
      if (gst && data.gst) gst.textContent = "GSTIN " + data.gst;
    }

    function setSide(side) { card.classList.toggle("show-back", side === "back"); }

    function setTyping(id, on) {
      $$("[data-out].typing", card).forEach(el => el.classList.remove("typing"));
      if (!on || !map[id]) return;
      const key = map[id].keys[0];
      outs(key).forEach(el => el.classList.add("typing"));
    }

    // progress checklist
    const steps = $$("#rpSteps li");
    const required = ["rCompany", "rName", "rEmail", "rMobile"];
    const okField = id => {
      const el = $("#" + id), v = val(id);
      if (!v) return false;
      if (el.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (el.dataset.type === "mobile") return /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10));
      return true;
    };
    let wasComplete = false;
    function progress(activeId) {
      const all = steps.map(li => li.dataset.f);
      const done = all.filter(okField);
      steps.forEach(li => {
        li.classList.toggle("done", okField(li.dataset.f));
        li.classList.toggle("now", li.dataset.f === activeId);
      });
      const pct = Math.round((done.length / all.length) * 100);
      $("#rpBar").style.width = pct + "%";
      $("#rpPct").textContent = pct + "%";
      const nextReq = required.find(id => !okField(id));
      const labels = { rCompany: "Let's start with your company name", rName: "Now, who should customers contact?",
                       rEmail: "Add your email address", rMobile: "Add your mobile number" };
      const complete = !nextReq;
      $("#rpLabel").textContent = complete ? (pct === 100 ? "Your card is complete" : "Ready to start. Add your city to finish") : labels[nextReq];
      if (complete && !wasComplete) {
        card.classList.remove("celebrate"); void card.offsetWidth; card.classList.add("celebrate");
        const b = $("#tapBurst"); b.classList.remove("go"); void b.offsetWidth; b.classList.add("go");
      }
      wasComplete = complete;
    }

    Object.keys(map).forEach(id => {
      const el = $("#" + id); if (!el) return;
      el.addEventListener("focus", () => { setSide(map[id].side); setTyping(id, true); progress(id); });
      el.addEventListener("blur", () => setTyping(id, false));
      el.addEventListener("input", () => { setSide(map[id].side); paint(map[id].keys); progress(id); });
    });

    // layout chosen on the landing page (register.html?layout=106)
    const layoutId = new URLSearchParams(location.search).get("layout");
    if (layoutId) {
      $("#rLayout").value = layoutId;
      const l = (window.CARD_LAYOUTS || []).find(x => String(x.id) === layoutId);
      const chip = $("#rpLayout");
      chip.textContent = `Layout ${layoutId}${l ? ", " + l.title : ""} selected`;
      chip.hidden = false;
    }

    paint(); progress();

    reg.addEventListener("submit", e => {
      e.preventDefault();
      if (!vbcValidate(reg)) { const f = reg.querySelector(".field.invalid input"); f && setSide(map[f.id]?.side); return; }
      // TODO: backend - POST the form fields (and #rLayout) to create the account
      card.classList.remove("celebrate"); void card.offsetWidth; card.classList.add("celebrate");
      vbcToast("Account created. Opening your dashboard…");
    });
  }
})();
