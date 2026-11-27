# Virtual Business Card India: website

Open `index.html` in a browser. No build step; fonts and icons are bundled, so it works offline.

## Pages
- `index.html`: landing page (hero NFC tap, features, card layouts slider, NFC card, FAQ, CTA)
- `login.html`: password or one-time-code login
- `register.html`: signup; the NFC card on the left fills in live as you type
- `blogs.html`: blog listing with search and topic filter
- `blog-detail.html?post=<slug>`: article page (contents, reading progress, share, takeaways)
- `privacy.html`, `terms.html`, `refund.html`: legal pages (linked in every footer)

## Colours
Only five colours are used: #96745B (mocha), #D6B58C (sand), #30241E (espresso),
#F5EEE6 (cream) and #FFFFFF. They are set as CSS variables at the top of
assets/css/style.css for both the dark and light themes.

## Editing content
- Card layouts: `assets/js/cards.js` (CARD_LAYOUTS array)
- Blog posts: `assets/js/blogs.js` (BLOG_POSTS array). Cover art is drawn
  automatically from `cover.type`: stack, waves, grid, chat, pins or rings.
- FAQ: in `index.html`, section id="faq" (also update the JSON-LD block below it)
- Header and footer are repeated in each HTML file; change all pages together.

## Structure
assets/css/style.css, fonts.css, fontawesome.min.css
assets/js/main.js (shared), home.js, auth.js, blogs.js, legal.js, cards.js
assets/images/logo-light.png, logo-dark.png, favicon.png, qr-vbcard.svg
assets/fonts/, assets/webfonts/

## Before going live
- Legal pages are a starting template. Have them reviewed, especially the
  refund timelines (7 days, 5 to 10 working days), before publishing.
- qr-vbcard.svg points to https://vbcardindia.com. Replace it if needed.
- Forms validate in the browser only. Search "TODO: backend" in assets/js/auth.js.
