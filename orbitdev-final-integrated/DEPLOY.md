# Deploy

1. Fill in personal placeholders in `data/profile.json` and project links.
2. Generate the site:

```bash
python3 build.py
```

3. Publish the **contents of `dist/`** to your static host or GitHub Pages.

The visual design lives in `static/style.css`; the generator copies it into `dist/style.css` on every build.
