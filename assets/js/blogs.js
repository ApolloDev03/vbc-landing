/* ==========================================================================
   Blog: posts data + listing page + detail page
   To add a post, add an object to BLOG_POSTS. The detail page is
   blog-detail.html?post=<slug>. Cover art is drawn from "cover" (no images needed).
   cover.type: "stack" | "waves" | "grid" | "chat" | "pins" | "rings"
   ========================================================================== */
const BLOG_POSTS = [
  {
    slug: "paper-visiting-cards-are-costing-you-customers",
    title: "Why your paper visiting card is quietly costing you customers",
    excerpt: "Paper cards get lost, go out of date and can't be forwarded. Here's what changes when your card becomes a link.",
    category: "Guides", date: "2026-11-18", read: 5,
    author: { name: "Krunal Shah", role: "Founder, VB India" },
    cover: { type: "stack" },
    tags: ["Visiting cards", "Small business", "Getting started"],
    body: [
      { p: ["Most visiting cards end up in a drawer, a wallet or the bin within a week. The person who took yours meant to call, but by the time they need you, the card is gone. That's a lost customer you never knew you had."] },
      { h: "The three problems with paper", p: ["Paper cards have three weaknesses that a link doesn't. They run out, so you're always one event away from an empty box. They go out of date the moment your number, address or offer changes. And they can't be forwarded: nobody photographs a card to share it with a colleague."],
        list: ["Reprinting costs money every time a detail changes", "A card shows contact details but not what you sell", "There's no way to know who looked at it"] },
      { h: "What a digital card does differently", p: ["A digital business card is a small web page with your call, WhatsApp, email and directions buttons, plus your products, photos and brochure. You share it as a link, a QR code or with a tap of an NFC card.", "Because it's a link, people can forward it in a WhatsApp group in one tap. Because it's online, you update it once and everyone who has it sees the change."],
        quote: "The best visiting card is the one your customer can forward to someone else." },
      { h: "Keep paper for the handshake, not the follow-up", p: ["You don't have to stop printing completely. Many owners keep a small batch of paper or NFC cards with a QR code on the back. The physical card starts the conversation; the link does the follow-up."] }
    ],
    takeaways: ["Paper cards get lost, run out and go out of date", "A link can be forwarded, updated and tracked", "Put a QR code on any card you still print"]
  },
  {
    slug: "how-nfc-business-cards-work",
    title: "How NFC business cards work, and why they don't need a battery",
    excerpt: "A tiny chip, a phone and no app. A plain-language look at what happens when someone taps your card.",
    category: "Technology", date: "2026-11-10", read: 4,
    author: { name: "Team VB India", role: "Product" },
    cover: { type: "waves" },
    tags: ["NFC", "How it works"],
    body: [
      { p: ["NFC stands for near-field communication. It's the same short-range technology used for tap-to-pay. An NFC business card has a small chip and antenna sealed inside the plastic."] },
      { h: "Where the power comes from", p: ["The chip has no battery. When a phone comes within a few centimetres, the phone's own NFC reader creates a small magnetic field. That field powers the chip just long enough for it to send back the link stored on it.", "Because there's no battery, the card never needs charging and doesn't wear out the way a battery would."] },
      { h: "What the customer sees", p: ["On most modern phones with NFC switched on, a notification appears as soon as the card touches the back of the phone. Tapping it opens your digital card in the browser. There's nothing to install."],
        list: ["Hold the card near the top back of the phone", "Wait a second for the notification", "Tap the notification to open the card"] },
      { h: "Why every card should also have a QR code", p: ["Some phones don't have NFC, and some people keep it switched off. A QR code printed on the back of the card gives them the same link through the camera, so nobody misses out."],
        quote: "NFC is the fast way in. The QR code is the way in that always works." }
    ],
    takeaways: ["The phone powers the chip, so there's no battery", "No app is needed to open the card", "Always print a QR code on the back as a backup"]
  },
  {
    slug: "what-to-put-on-your-digital-business-card",
    title: "10 things to put on your digital business card",
    excerpt: "A checklist for a card that answers customers' questions before they have to call you.",
    category: "Checklist", date: "2026-10-29", read: 6,
    author: { name: "Krunal Shah", role: "Founder, VB India" },
    cover: { type: "grid" },
    tags: ["Checklist", "Profile tips"],
    body: [
      { p: ["A good digital card answers the first five questions a customer would ask on the phone: who you are, what you sell, where you are, how to pay and how to reach you. Use this list to check yours."] },
      { h: "The essentials", p: ["Start with the details people need to contact you. Make every button work in one tap."],
        list: ["A clear photo or logo", "Your name, role and company name", "Call and WhatsApp buttons with the right number", "Email and website links", "Your location with a directions button"] },
      { h: "The details that win the sale", p: ["These are the sections that turn a visitor into an enquiry. Customers like to see products and proof before they get in touch."],
        list: ["Products or services with photos and prices", "A gallery of your work, shop or team", "A brochure or catalogue as a PDF", "UPI QR and bank details for quick payment", "Customer reviews and an enquiry form"] },
      { h: "Keep it fresh", p: ["Look at your card once a month. Update prices, add new products and remove anything you no longer offer. Because it's one link, every customer sees the latest version."],
        quote: "If a customer has to call you to ask a basic question, your card is missing something." }
    ],
    takeaways: ["Cover contact, products, location and payment", "Add proof: photos, reviews and a brochure", "Review the card once a month"]
  },
  {
    slug: "whatsapp-and-digital-card-more-enquiries",
    title: "Using WhatsApp and a digital card to get more enquiries",
    excerpt: "Your customers already live on WhatsApp. Here's how to make your card do the selling inside every chat.",
    category: "Marketing", date: "2026-10-15", read: 5,
    author: { name: "Team VB India", role: "Customer success" },
    cover: { type: "chat" },
    tags: ["WhatsApp", "Marketing", "Enquiries"],
    body: [
      { p: ["For most small businesses in India, WhatsApp is where enquiries start and orders are confirmed. A digital card fits straight into that habit: it's a link that opens a full profile from any chat."] },
      { h: "Share it at the right moments", p: ["Send your card link after every first conversation, in reply to price enquiries and when you meet someone new. It gives people one place to see what you do and save your number."],
        list: ["As the first reply to a new enquiry", "In your WhatsApp Business profile and quick replies", "With every quotation or invoice", "In community and trade groups, where allowed"] },
      { h: "Share single products, not just the card", p: ["When someone asks about one item, share that product from your card instead of a plain photo. They see the price and details, and the rest of your range is one tap away."],
        quote: "Every forward of your card is a free introduction to someone you haven't met yet." },
      { h: "Make it easy to reply", p: ["Put the WhatsApp button near the top of your card and keep your enquiry form short. The fewer steps between interest and a message, the more messages you'll get."] }
    ],
    takeaways: ["Send your card after every first conversation", "Share individual products from the card", "Keep the WhatsApp button at the top"]
  },
  {
    slug: "qr-codes-for-small-shops",
    title: "QR codes for small shops: where to print them so people scan",
    excerpt: "A QR code only works if people notice it. Simple places that get your card scanned every day.",
    category: "Retail", date: "2026-09-30", read: 4,
    author: { name: "Team VB India", role: "Customer success" },
    cover: { type: "pins" },
    tags: ["QR codes", "Retail", "Shop marketing"],
    body: [
      { p: ["A QR code that links to your digital card turns any printed surface into a way to save your contact, see your products and pay you. The trick is putting it where people already pause."] },
      { h: "Spots that work", p: ["Think about where customers wait or look for information. Those are the moments they have time to scan."],
        list: ["The billing counter, next to your UPI code", "Shop door and window stickers", "Product packaging and carry bags", "Delivery boxes and invoices", "Your vehicle, if you do deliveries"] },
      { h: "Tell people what they'll get", p: ["A bare QR code is easy to ignore. Add a short line under it such as \"Scan to see our full menu\" or \"Scan to save our number\". People scan more when they know what's on the other side."],
        quote: "Give the scan a reason: a price list, a catalogue or an offer." },
      { h: "Print it big enough", p: ["Make sure the code is large enough to scan from where people will stand, and printed on a plain background with good contrast. Test it with two or three different phones before you print a large batch."] }
    ],
    takeaways: ["Put codes where customers already wait", "Add a short line saying what the scan opens", "Test the size and contrast before printing"]
  },
  {
    slug: "trade-fair-lead-checklist",
    title: "Trade fair checklist: collect leads without a stack of cards",
    excerpt: "How to use NFC and QR cards at exhibitions so every conversation turns into a contact you can follow up.",
    category: "Events", date: "2026-09-12", read: 6,
    author: { name: "Krunal Shah", role: "Founder, VB India" },
    cover: { type: "rings" },
    tags: ["Events", "Trade fairs", "NFC"],
    body: [
      { p: ["At a busy trade fair you might talk to hundreds of people over a few days. Paper cards pile up on both sides of the table, and most never get followed up. A digital card makes the swap instant and keeps the details in phones, not pockets."] },
      { h: "Before the fair", p: ["Get your card ready a week ahead, so you're not editing it at the stall."],
        list: ["Update your products and add a fair-only offer", "Upload your latest catalogue as a PDF", "Order NFC cards for everyone working the stall", "Print a large QR code standee for the table"] },
      { h: "At the stall", p: ["Tap your NFC card on the visitor's phone, or point them to the standee. Ask them to save your contact while you're talking, so it's done before they walk away.", "Keep a phone ready to note who you met and what they asked about. That note makes the follow-up personal."],
        quote: "The goal isn't to hand out cards. It's to leave with contacts you'll actually call." },
      { h: "After the fair", p: ["Follow up within two days, while the conversation is fresh. Send a short WhatsApp message with your card link and the product they were interested in. Check your dashboard for enquiries that came through the card during the event."] }
    ],
    takeaways: ["Prepare your card and catalogue a week early", "Ask visitors to save your contact at the stall", "Follow up on WhatsApp within two days"]
  }
];

/* ---------- Cover art: drawn in the brand palette ---------- */
function blogCover(post, seed = 0) {
  const M = "#96745B", S = "#D6B58C", E = "#30241E", C = "#F5EEE6", W = "#FFFFFF";
  const t = post.cover.type;
  let g = "";
  if (t === "stack") {
    g = `<rect width="800" height="500" fill="${S}"/>
      <g class="cv-a"><rect x="230" y="150" width="320" height="200" rx="18" fill="${M}" transform="rotate(-14 390 250)"/></g>
      <g class="cv-b"><rect x="250" y="150" width="320" height="200" rx="18" fill="${C}" transform="rotate(-4 410 250)"/></g>
      <g class="cv-c"><rect x="270" y="150" width="320" height="200" rx="18" fill="${W}" transform="rotate(7 430 250)"/>
        <line x1="300" y1="360" x2="420" y2="140" stroke="${M}" stroke-width="4" transform="rotate(7 430 250)"/>
        <circle cx="345" cy="278" r="16" fill="${M}" transform="rotate(7 430 250)"/></g>`;
  } else if (t === "waves") {
    g = `<rect width="800" height="500" fill="${E}"/>
      <g class="cv-a" fill="none" stroke="${S}" stroke-width="18" stroke-linecap="round">
        <path d="M400 190 a60 60 0 0 1 0 120"/><path d="M440 150 a110 110 0 0 1 0 200" opacity=".75"/><path d="M480 110 a160 160 0 0 1 0 280" opacity=".5"/></g>
      <circle class="cv-b" cx="360" cy="250" r="26" fill="${S}"/>
      <rect class="cv-c" x="140" y="150" width="130" height="200" rx="22" fill="${M}"/>`;
  } else if (t === "grid") {
    let cells = ""; let r = 7 + seed;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let y = 0; y < 7; y++) for (let x = 0; x < 12; x++) {
      const v = rnd();
      if (v > .45) cells += `<rect x="${110 + x * 50}" y="${80 + y * 50}" width="40" height="40" rx="8" fill="${v > .8 ? E : v > .6 ? M : W}"/>`;
    }
    g = `<rect width="800" height="500" fill="${C}"/><g class="cv-a">${cells}</g>`;
  } else if (t === "chat") {
    g = `<rect width="800" height="500" fill="${M}"/>
      <g class="cv-a"><rect x="150" y="110" width="330" height="80" rx="30" fill="${C}"/><rect x="180" y="140" width="200" height="14" rx="7" fill="${S}"/></g>
      <g class="cv-b"><rect x="320" y="215" width="330" height="80" rx="30" fill="${E}"/><rect x="350" y="245" width="240" height="14" rx="7" fill="${S}"/></g>
      <g class="cv-c"><rect x="150" y="320" width="250" height="80" rx="30" fill="${C}"/><rect x="180" y="350" width="130" height="14" rx="7" fill="${M}"/></g>`;
  } else if (t === "pins") {
    g = `<rect width="800" height="500" fill="${E}"/>
      <g class="cv-a"><rect x="300" y="110" width="200" height="200" rx="16" fill="${W}"/>
        <rect x="320" y="130" width="50" height="50" rx="6" fill="${E}"/><rect x="430" y="130" width="50" height="50" rx="6" fill="${E}"/><rect x="320" y="240" width="50" height="50" rx="6" fill="${E}"/>
        <rect x="395" y="200" width="30" height="30" fill="${M}"/><rect x="440" y="245" width="40" height="40" fill="${M}"/></g>
      <rect class="cv-b" x="250" y="340" width="300" height="46" rx="23" fill="${S}"/>
      <circle class="cv-c" cx="400" cy="110" r="14" fill="${S}"/>`;
  } else {
    g = `<rect width="800" height="500" fill="${S}"/>
      <g class="cv-a" fill="none" stroke="${E}" stroke-width="3" opacity=".55">
        <circle cx="400" cy="250" r="70"/><circle cx="400" cy="250" r="120"/><circle cx="400" cy="250" r="170"/><circle cx="400" cy="250" r="220"/></g>
      <circle class="cv-b" cx="400" cy="250" r="44" fill="${E}"/>
      <g class="cv-c"><circle cx="280" cy="150" r="18" fill="${M}"/><circle cx="560" cy="330" r="22" fill="${W}"/><circle cx="530" cy="140" r="12" fill="${E}"/></g>`;
  }
  return `<svg class="cover-art cv-${t}" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration for ${post.title.replace(/"/g, "")}">${g}</svg>`;
}

const fmtDate = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const postUrl = p => `blog-detail.html?post=${encodeURIComponent(p.slug)}`;
const initialsOf = n => n.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Listing page ---------- */
  const grid = $("#blogGrid");
  if (grid) {
    const featured = $("#blogFeatured");
    const chipsEl = $("#blogChips"), search = $("#blogSearch"), empty = $("#blogEmpty"), countEl = $("#blogCount");
    let cat = "All";

    const f = BLOG_POSTS[0];
    featured.innerHTML = `
      <a class="feat-post" href="${postUrl(f)}">
        <div class="fp-art">${blogCover(f)}</div>
        <div class="fp-body">
          <span class="post-cat">${esc(f.category)}</span>
          <h2>${esc(f.title)}</h2>
          <p>${esc(f.excerpt)}</p>
          <div class="post-meta">
            <span class="avatar">${initialsOf(f.author.name)}</span>
            <span><b>${esc(f.author.name)}</b><br>${fmtDate(f.date)}, ${f.read} min read</span>
          </div>
          <span class="read-link">Read the article <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>`;

    const cats = ["All", ...new Set(BLOG_POSTS.map(p => p.category))];
    chipsEl.innerHTML = cats.map(c => `<button type="button" class="blog-chip" aria-pressed="${c === "All"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest(".blog-chip"); if (!b) return;
      cat = b.dataset.cat;
      $$(".blog-chip", chipsEl).forEach(x => x.setAttribute("aria-pressed", x === b));
      render();
    });
    search.addEventListener("input", render);

    function render() {
      const q = search.value.trim().toLowerCase();
      const list = BLOG_POSTS.filter(p =>
        (cat === "All" || p.category === cat) &&
        (!q || (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(q)));
      grid.innerHTML = list.map((p, i) => `
        <a class="post-card" href="${postUrl(p)}" style="--i:${i}">
          <div class="pc-cover">${blogCover(p, i)}<span class="post-cat">${esc(p.category)}</span></div>
          <div class="pc-body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.excerpt)}</p>
            <div class="pc-foot">
              <span>${fmtDate(p.date)}</span><span>${p.read} min read</span>
              <span class="pc-go" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        </a>`).join("");
      empty.hidden = list.length > 0;
      countEl.textContent = `${list.length} ${list.length === 1 ? "article" : "articles"}`;
      featured.hidden = !!q || cat !== "All";
    }
    render();
  }

  /* ---------- Detail page ---------- */
  const art = $("#article");
  if (art) {
    const slug = new URLSearchParams(location.search).get("post");
    const idx = Math.max(0, BLOG_POSTS.findIndex(p => p.slug === slug));
    const p = BLOG_POSTS[idx];
    if (slug && !BLOG_POSTS.some(x => x.slug === slug)) {
      $("#notFound").hidden = false;
    }
    document.title = `${p.title} | Virtual Business Card India`;
    $('meta[name="description"]').setAttribute("content", p.excerpt);

    $("#artCat").textContent = p.category;
    $("#artTitle").textContent = p.title;
    $("#artExcerpt").textContent = p.excerpt;
    $("#artAvatar").textContent = initialsOf(p.author.name);
    $("#artAuthor").textContent = p.author.name;
    $("#artMeta").textContent = `${fmtDate(p.date)}, ${p.read} min read`;
    $("#artCover").innerHTML = blogCover(p);

    const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let html = "", toc = [];
    p.body.forEach((sec, si) => {
      if (sec.h) {
        const id = slugify(sec.h); toc.push({ id, t: sec.h });
        html += `<h2 id="${id}">${esc(sec.h)}</h2>`;
      }
      sec.p.forEach((para, pi) => { html += `<p${si === 0 && pi === 0 ? ' class="lead"' : ""}>${esc(para)}</p>`; });
      if (sec.list) html += `<ul class="art-list">${sec.list.map(li => `<li>${esc(li)}</li>`).join("")}</ul>`;
      if (sec.quote) html += `<blockquote class="pull"><p>${esc(sec.quote)}</p></blockquote>`;
    });
    html += `
      <aside class="takeaways" aria-label="Key takeaways">
        <svg class="pc-art" viewBox="0 0 1000 630" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><line x1="-10" y1="640" x2="480" y2="-10" class="pc-ln"/><circle cx="175" cy="398" r="58" class="pc-dt"/></svg>
        <h2 class="tk-title">Key takeaways</h2>
        <ol>${p.takeaways.map(t => `<li>${esc(t)}</li>`).join("")}</ol>
      </aside>
      <div class="art-tags">${p.tags.map(t => `<span>#${esc(t)}</span>`).join("")}</div>`;
    $("#artBody").innerHTML = html;

    // table of contents with scroll-spy
    const tocEl = $("#artToc");
    tocEl.innerHTML = toc.map(x => `<li><a href="#${x.id}">${esc(x.t)}</a></li>`).join("") + `<li><a href="#artBody" data-tk>Key takeaways</a></li>`;
    $("[data-tk]", tocEl).addEventListener("click", e => { e.preventDefault(); $(".takeaways").scrollIntoView({ behavior: "smooth", block: "center" }); });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => es.forEach(en => {
        if (!en.isIntersecting) return;
        $$("a", tocEl).forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
      }), { rootMargin: "-20% 0px -70% 0px" });
      $$("#artBody h2[id]").forEach(h => io.observe(h));
    }

    // reading progress
    const bar = $("#readBar");
    const onScroll = () => {
      const r = art.getBoundingClientRect();
      const total = r.height - innerHeight * .6;
      const pct = Math.min(1, Math.max(0, -r.top / (total || 1)));
      bar.style.transform = `scaleX(${pct})`;
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // share
    const url = location.href;
    $("#shareWa").href = "https://wa.me/?text=" + encodeURIComponent(p.title + " " + url);
    $("#shareCopy").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(url); vbcToast("Link copied."); }
      catch (e) { vbcToast("Copy this link: " + url); }
    });

    // keep reading: next two posts + prev/next
    const next = [1, 2].map(k => BLOG_POSTS[(idx + k) % BLOG_POSTS.length]);
    $("#moreGrid").innerHTML = next.map((q, i) => `
      <a class="post-card" href="${postUrl(q)}" style="--i:${i}">
        <div class="pc-cover">${blogCover(q, i + 3)}<span class="post-cat">${esc(q.category)}</span></div>
        <div class="pc-body"><h3>${esc(q.title)}</h3><p>${esc(q.excerpt)}</p>
          <div class="pc-foot"><span>${fmtDate(q.date)}</span><span>${q.read} min read</span><span class="pc-go" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span></div>
        </div>
      </a>`).join("");
    const prev = BLOG_POSTS[(idx - 1 + BLOG_POSTS.length) % BLOG_POSTS.length], nxt = BLOG_POSTS[(idx + 1) % BLOG_POSTS.length];
    $("#artPager").innerHTML = `
      <a href="${postUrl(prev)}" class="pg prev"><small><i class="fa-solid fa-arrow-left"></i> Previous</small><b>${esc(prev.title)}</b></a>
      <a href="${postUrl(nxt)}" class="pg next"><small>Next <i class="fa-solid fa-arrow-right"></i></small><b>${esc(nxt.title)}</b></a>`;
  }
})();
