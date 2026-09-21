# Sobola Pocket Pay Landing Website


## Project structure

```text
sobola-pocket-pay/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
└── README.md
```

## Run locally

No build step or package installation is required.

1. Extract the project folder if using the ZIP archive.
2. Open `index.html` in any modern browser.

For local development, you may also run a basic static server from the project directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included

- Responsive desktop, tablet and mobile navigation
- Animated Pocket Pay ecosystem journey
- Interactive participant map and feature grid
- Responsive horizontal and vertical payment timeline
- Parent phone UI, school dashboard and platform preview
- Accessible modal, keyboard support and visible focus states
- IntersectionObserver-based reveals, counters and active navigation
- `prefers-reduced-motion` support
- Semantic HTML and social/SEO metadata
- Official supplied Sobola wordmark, cleaned and integrated as a local optimized asset
- No external libraries, frameworks, fonts or runtime dependencies

## Important implementation notes

- All dashboard values and transaction entries are explicitly marked or described as demo data.
- Every “Login to Top-Up” action opens `https://sobola.org/portal` in a new tab using safe link attributes.
- Contact addresses are currently functional placeholders using the `sobola.org` domain and can be replaced with confirmed business addresses.
- Privacy Policy, Terms, and social links are placeholders until final destinations are supplied.
- The interface uses CSS and semantic text visuals, so no external image downloads are required.

## Browser support

Designed for recent versions of Chrome, Edge, Firefox and Safari. JavaScript enhances interaction, while the content remains readable without animation.

## Brand asset note

The supplied Sobola wordmark is stored locally at `assets/logo/sobola-logo.png`. The stray screenshot mark and excess whitespace were removed. No AI-generated logo or icon asset is used. Interface symbols remain code-based CSS shapes or Unicode symbols. Future custom imagery should be supplied by Sobola.

## Pocket Pay product identity update

The supplied Pocket Pay logo is stored at `assets/logo/pocket-pay-logo.png` and appears in the hero, parent wallet and administration UI. The Pocket Pay explainer and process transitions use restrained product-style interaction. Ecosystem cards remain white until hover or keyboard focus.
