# Virtual Business Card India — website

Open `index.html` in a browser. No build step, works offline (fonts and icons are bundled).

## Pages
- `index.html` – landing page (hero tap animation, features, steps, card-layout deck, NFC flip card, CTA, footer, "Talk to us" modal)
- `login.html` – password or one-time-code login
- `register.html` – 2-step signup with a live card preview and layout picker

## Structure
assets/css/style.css        all styles, both themes (CSS variables at the top)
assets/css/fonts.css        self-hosted fonts
assets/css/fontawesome.min.css + assets/webfonts/   icons
assets/js/cards.js          CARD_LAYOUTS array + card renderer  <-- edit this to add designs
assets/js/main.js           theme switch, header, buttons, modal, toast, validation
assets/js/home.js           hero animation, card deck slider, NFC flip card
assets/js/auth.js           login + register logic
assets/images/              logo-light.png, logo-dark.png, favicon.png

## Adding a card layout
Add an object to CARD_LAYOUTS in assets/js/cards.js. The slider, filter chips,
counters and register-page picker update automatically. Templates:
classic, split, gold, mono, neon, arch, band.

## Themes
Dark and light. The choice is saved in localStorage. The logo swaps to
logo-dark.png on the dark theme so the grey text stays readable.

## Backend
Forms validate in the browser and show a confirmation toast. Search
assets/js/auth.js for "TODO: backend" to connect your login/signup API.
`register.html?layout=106` preselects a layout (the "Use this layout" button does this).
