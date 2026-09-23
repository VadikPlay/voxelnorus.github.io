# OrbitDev — integrated static portfolio

This project keeps the approved VFinal visual design and restores the original data-driven project structure.

## Run

```bash
python3 build.py
```

The generator reads:

- `data/profile.json` — profile, contacts, payments and the 4 services
- `data/projects/*.json` — project case studies
- `static/style.css` — the VFinal design stylesheet

It writes:

- `dist/index.html`
- `dist/ru/index.html`
- `dist/p/<slug>.html`
- `dist/ru/p/<slug>.html`
- `dist/style.css`
- `dist/sitemap.xml`
- `dist/robots.txt`

The four service cards are driven from `data/profile.json` and stay responsive: 4 columns on desktop, 2 on tablet, 1 on mobile.

`location` is intentionally not used or rendered on the site.

## Product visuals

`assets/products/` is reserved for the product visuals you will add later. Service cards intentionally have no product logos/icons right now.

Use SVG for logos. For raster card artwork, 96×96 px transparent PNG is a good starting size. A main brand logo should preferably be SVG; a transparent PNG around 240×64 px also works.

## Before publishing

Replace `YOUR_NAME`, `YOUR_TELEGRAM`, `YOUR_GITHUB_USERNAME` and demo URLs in the data/project files.
