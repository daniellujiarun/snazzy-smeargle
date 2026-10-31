# The Snazzy Smeargle

Static portfolio site with no build step: plain HTML, CSS and JavaScript modules.

- **Edit text and looks:** `js/content.js`. This file holds the studio copy, stats, team, all 8 looks (title, client, designer, layout, colours) and the process steps.
- **Images:** `assets/looks/<id>-front.png`, `-sticker.png`, `-back.png`, `-back-sticker.png`, plus `-scene.webp`, `-ref.webp` and `-backdrop.webp` where they exist.
- **Layouts:** each look uses `"collage"`, `"band"` or `"torn"`. Collage and torn looks alternate between normal and mirrored layouts automatically.

## Run locally

Opening `index.html` directly from disk won't work, because browsers block JavaScript modules on `file://`. Serve the folder instead:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Deploy

Upload the folder as-is to GitHub Pages, Vercel or Netlify. There is no build command, and the output directory is the root.
