/* ==========================================================================
   Card layouts — dynamic data.
   Add, remove or edit objects in CARD_LAYOUTS and the slider, filters,
   counters and the register-page picker all update automatically.

   template : "classic" | "split" | "gold" | "mono" | "neon" | "arch" | "band"
   colors   : c1 / c2 = header gradient, ink = header text, accent = company pill
              use only the brand palette: #96745B #D6B58C #30241E #F5EEE6 #FFFFFF
   ========================================================================== */
const CARD_LAYOUTS = [
  { id: 101, title: "Harbour Blue",   category: "Corporate", template: "classic",
    name: "Rohan Mehta",    role: "Managing Director",     company: "Mehta Exports",
    phone: "+91 98250 11223", email: "rohan@mehtaexports.in", web: "mehtaexports.in", city: "Ahmedabad",
    colors: { c1: "#96745B", c2: "#30241E", ink: "#FFFFFF", accent: "#D6B58C" } },

  { id: 102, title: "Saffron Split",  category: "Retail",    template: "split",
    name: "Priya Shah",     role: "Founder",               company: "Shah Sarees",
    phone: "+91 99090 44556", email: "hello@shahsarees.com", web: "shahsarees.com", city: "Surat",
    colors: { c1: "#D6B58C", c2: "#D6B58C", ink: "#30241E", accent: "#F5EEE6" } },

  { id: 103, title: "Royal Gold",     category: "Creative",  template: "gold",
    name: "Aarav Kapoor",   role: "Creative Director",     company: "Northstar Studio",
    phone: "+91 98111 20304", email: "aarav@northstar.studio", web: "northstar.studio", city: "Mumbai",
    colors: { c1: "#30241E", c2: "#30241E", ink: "#D6B58C", accent: "#D6B58C" } },

  { id: 104, title: "Paper White",    category: "Minimal",   template: "mono",
    name: "Neha Iyer",      role: "Chartered Accountant",  company: "Iyer & Associates",
    phone: "+91 90040 77881", email: "neha@iyerca.in", web: "iyerca.in", city: "Pune",
    colors: { c1: "#30241E", c2: "#30241E", ink: "#30241E", accent: "#F5EEE6" } },

  { id: 105, title: "Night Signal",   category: "Creative",  template: "neon",
    name: "Kabir Rao",      role: "App Developer",         company: "Pixelforge Labs",
    phone: "+91 97380 55012", email: "kabir@pixelforge.dev", web: "pixelforge.dev", city: "Bengaluru",
    colors: { c1: "#96745B", c2: "#30241E", ink: "#F5EEE6", accent: "#D6B58C" } },

  { id: 106, title: "Leaf Arch",      category: "Retail",    template: "arch",
    name: "Meera Patel",    role: "Owner",                 company: "Green Basket Organics",
    phone: "+91 98795 30120", email: "orders@greenbasket.in", web: "greenbasket.in", city: "Vadodara",
    colors: { c1: "#D6B58C", c2: "#F5EEE6", ink: "#30241E", accent: "#FFFFFF" } },

  { id: 107, title: "Graphite Band",  category: "Corporate", template: "band",
    name: "Vikram Desai",   role: "Sales Head",            company: "Desai Engineering",
    phone: "+91 98240 66771", email: "vikram@desaieng.com", web: "desaieng.com", city: "Rajkot",
    colors: { c1: "#30241E", c2: "#96745B", ink: "#FFFFFF", accent: "#D6B58C" } },

  { id: 108, title: "Rose Clinic",    category: "Health",    template: "arch",
    name: "Dr. Ananya Joshi", role: "Dental Surgeon",      company: "Smile Studio Clinic",
    phone: "+91 99251 88990", email: "care@smilestudio.in", web: "smilestudio.in", city: "Ahmedabad",
    colors: { c1: "#96745B", c2: "#96745B", ink: "#FFFFFF", accent: "#F5EEE6" } },

  { id: 109, title: "Teal Clinic",    category: "Health",    template: "classic",
    name: "Dr. Sameer Khan", role: "Physiotherapist",      company: "MoveWell Physio",
    phone: "+91 90990 12456", email: "book@movewell.in", web: "movewell.in", city: "Indore",
    colors: { c1: "#30241E", c2: "#96745B", ink: "#F5EEE6", accent: "#D6B58C" } },

  { id: 110, title: "Ink Minimal",    category: "Minimal",   template: "mono",
    name: "Ishaan Verma",   role: "Architect",             company: "Verma Design Office",
    phone: "+91 98980 23455", email: "studio@vermadesign.in", web: "vermadesign.in", city: "Jaipur",
    colors: { c1: "#96745B", c2: "#96745B", ink: "#30241E", accent: "#F5EEE6" } },

  { id: 111, title: "Indigo Split",   category: "Corporate", template: "split",
    name: "Sneha Reddy",    role: "HR Consultant",         company: "PeopleFirst Advisory",
    phone: "+91 96660 34512", email: "sneha@peoplefirst.in", web: "peoplefirst.in", city: "Hyderabad",
    colors: { c1: "#30241E", c2: "#96745B", ink: "#D6B58C", accent: "#D6B58C" } },

  { id: 112, title: "Spice Band",     category: "Retail",    template: "band",
    name: "Harsh Trivedi",  role: "Chef & Owner",          company: "Tadka House",
    phone: "+91 97277 40011", email: "table@tadkahouse.in", web: "tadkahouse.in", city: "Ahmedabad",
    colors: { c1: "#96745B", c2: "#30241E", ink: "#FFFFFF", accent: "#D6B58C" } }
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
  // text colour that reads on c1 (sand and cream need espresso, the rest white)
  const on = /^#(D6B58C|F5EEE6|FFFFFF)$/i.test(c.c1) ? "#30241E" : "#FFFFFF";
  const style = `--c1:${c.c1};--c2:${c.c2};--ink:${c.ink};--accent:${c.accent};--on:${on}`;
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
