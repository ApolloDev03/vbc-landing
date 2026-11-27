/* ==========================================================================
   Card layouts — dynamic data.
   Add, remove or edit objects in CARD_LAYOUTS and the slider, filters,
   counters and the register-page picker all update automatically.

   template : "classic" | "split" | "gold" | "mono" | "neon" | "arch" | "band"
   colors   : c1 / c2 = header gradient, ink = header text, accent = company pill
   ========================================================================== */
const CARD_LAYOUTS = [
  { id: 101, title: "Harbour Blue",   category: "Corporate", template: "classic",
    name: "Rohan Mehta",    role: "Managing Director",     company: "Mehta Exports",
    phone: "+91 98250 11223", email: "rohan@mehtaexports.in", web: "mehtaexports.in", city: "Ahmedabad",
    colors: { c1: "#0A86C8", c2: "#0B2440", ink: "#ffffff", accent: "#F5B301" } },

  { id: 102, title: "Saffron Split",  category: "Retail",    template: "split",
    name: "Priya Shah",     role: "Founder",               company: "Shah Sarees",
    phone: "+91 99090 44556", email: "hello@shahsarees.com", web: "shahsarees.com", city: "Surat",
    colors: { c1: "#F07B1A", c2: "#B3361C", ink: "#ffffff", accent: "#FFE3B8" } },

  { id: 103, title: "Royal Gold",     category: "Creative",  template: "gold",
    name: "Aarav Kapoor",   role: "Creative Director",     company: "Northstar Studio",
    phone: "+91 98111 20304", email: "aarav@northstar.studio", web: "northstar.studio", city: "Mumbai",
    colors: { c1: "#6B1F2A", c2: "#1E0B0E", ink: "#F5D68C", accent: "#E9B949" } },

  { id: 104, title: "Paper White",    category: "Minimal",   template: "mono",
    name: "Neha Iyer",      role: "Chartered Accountant",  company: "Iyer & Associates",
    phone: "+91 90040 77881", email: "neha@iyerca.in", web: "iyerca.in", city: "Pune",
    colors: { c1: "#1F2A37", c2: "#1F2A37", ink: "#1F2A37", accent: "#E5E7EB" } },

  { id: 105, title: "Night Signal",   category: "Creative",  template: "neon",
    name: "Kabir Rao",      role: "App Developer",         company: "Pixelforge Labs",
    phone: "+91 97380 55012", email: "kabir@pixelforge.dev", web: "pixelforge.dev", city: "Bengaluru",
    colors: { c1: "#22D3EE", c2: "#7C3AED", ink: "#ffffff", accent: "#22D3EE" } },

  { id: 106, title: "Leaf Arch",      category: "Retail",    template: "arch",
    name: "Meera Patel",    role: "Owner",                 company: "Green Basket Organics",
    phone: "+91 98795 30120", email: "orders@greenbasket.in", web: "greenbasket.in", city: "Vadodara",
    colors: { c1: "#2F9E5B", c2: "#14532D", ink: "#ffffff", accent: "#D9F99D" } },

  { id: 107, title: "Graphite Band",  category: "Corporate", template: "band",
    name: "Vikram Desai",   role: "Sales Head",            company: "Desai Engineering",
    phone: "+91 98240 66771", email: "vikram@desaieng.com", web: "desaieng.com", city: "Rajkot",
    colors: { c1: "#404247", c2: "#16181C", ink: "#ffffff", accent: "#F5B301" } },

  { id: 108, title: "Rose Clinic",    category: "Health",    template: "arch",
    name: "Dr. Ananya Joshi", role: "Dental Surgeon",      company: "Smile Studio Clinic",
    phone: "+91 99251 88990", email: "care@smilestudio.in", web: "smilestudio.in", city: "Ahmedabad",
    colors: { c1: "#E0567A", c2: "#7A1E3F", ink: "#ffffff", accent: "#FFE4EC" } },

  { id: 109, title: "Teal Clinic",    category: "Health",    template: "classic",
    name: "Dr. Sameer Khan", role: "Physiotherapist",      company: "MoveWell Physio",
    phone: "+91 90990 12456", email: "book@movewell.in", web: "movewell.in", city: "Indore",
    colors: { c1: "#0FA3A3", c2: "#0B4A55", ink: "#ffffff", accent: "#B9F3EE" } },

  { id: 110, title: "Ink Minimal",    category: "Minimal",   template: "mono",
    name: "Ishaan Verma",   role: "Architect",             company: "Verma Design Office",
    phone: "+91 98980 23455", email: "studio@vermadesign.in", web: "vermadesign.in", city: "Jaipur",
    colors: { c1: "#0A86C8", c2: "#0A86C8", ink: "#12202F", accent: "#E0F2FE" } },

  { id: 111, title: "Indigo Split",   category: "Corporate", template: "split",
    name: "Sneha Reddy",    role: "HR Consultant",         company: "PeopleFirst Advisory",
    phone: "+91 96660 34512", email: "sneha@peoplefirst.in", web: "peoplefirst.in", city: "Hyderabad",
    colors: { c1: "#4F46E5", c2: "#1E1B4B", ink: "#ffffff", accent: "#C7D2FE" } },

  { id: 112, title: "Spice Band",     category: "Retail",    template: "band",
    name: "Harsh Trivedi",  role: "Chef & Owner",          company: "Tadka House",
    phone: "+91 97277 40011", email: "table@tadkahouse.in", web: "tadkahouse.in", city: "Ahmedabad",
    colors: { c1: "#C2410C", c2: "#431407", ink: "#ffffff", accent: "#FDBA74" } }
];

/* Initials from a name: "Dr. Ananya Joshi" -> "AJ" */
function vcInitials(name) {
  return String(name || "?")
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map(w => w[0].toUpperCase()).join("") || "?";
}

function vcEscape(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Returns the HTML for one phone-style digital card */
function renderVCard(d) {
  const c = d.colors || {};
  const style = `--c1:${c.c1};--c2:${c.c2};--ink:${c.ink};--accent:${c.accent}`;
  return `
  <article class="vcard t-${vcEscape(d.template || "classic")}" style="${style}" aria-label="${vcEscape(d.title)} card layout">
    <header class="vc-head">
      <div class="vc-avatar">${vcEscape(vcInitials(d.name))}</div>
      <div class="vc-name" data-bind="name">${vcEscape(d.name)}</div>
      <div class="vc-role" data-bind="role">${vcEscape(d.role)}</div>
      <span class="vc-co" data-bind="company">${vcEscape(d.company)}</span>
      <div class="vc-actions">
        <span><i class="fa-solid fa-phone"></i></span>
        <span><i class="fa-brands fa-whatsapp"></i></span>
        <span><i class="fa-solid fa-envelope"></i></span>
        <span><i class="fa-solid fa-location-dot"></i></span>
      </div>
    </header>
    <div class="vc-body">
      <div class="vc-save"><i class="fa-solid fa-address-book"></i> Save to contacts</div>
      <div class="vc-row"><i class="fa-solid fa-phone"></i><span data-bind="phone">${vcEscape(d.phone)}</span></div>
      <div class="vc-row"><i class="fa-solid fa-envelope"></i><span data-bind="email">${vcEscape(d.email)}</span></div>
      <div class="vc-row"><i class="fa-solid fa-globe"></i><span data-bind="web">${vcEscape(d.web)}</span></div>
      <div class="vc-row"><i class="fa-solid fa-location-dot"></i><span data-bind="city">${vcEscape(d.city)}</span></div>
    </div>
    <nav class="vc-nav" aria-hidden="true">
      <span><i class="fa-solid fa-house"></i>Home</span>
      <span><i class="fa-solid fa-bag-shopping"></i>Products</span>
      <span><i class="fa-solid fa-images"></i>Gallery</span>
      <span><i class="fa-solid fa-indian-rupee-sign"></i>Pay</span>
      <span><i class="fa-solid fa-comment-dots"></i>Enquiry</span>
    </nav>
  </article>`;
}
