/* Legal pages: build the "On this page" list from the headings and highlight the current section */
(function () {
  const body = document.querySelector(".legal-page .prose");
  const toc = document.getElementById("legalToc");
  if (!body || !toc) return;
  const heads = [...body.querySelectorAll("h2")];
  heads.forEach(h => { if (!h.id) h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); });
  toc.innerHTML = heads.map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join("");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    toc.querySelectorAll("a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-20% 0px -70% 0px" });
  heads.forEach(h => io.observe(h));
})();
