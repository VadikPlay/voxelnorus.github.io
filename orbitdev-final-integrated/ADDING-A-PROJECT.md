# Adding a project

1. Copy an existing file in `data/projects/`.
2. Rename it with a numeric prefix to control order, for example `02-price-tracker.json`.
3. Fill in the bilingual fields.
4. Run:

```bash
python3 build.py
```

The generator creates both EN and RU case-study pages automatically and updates `sitemap.xml`.
