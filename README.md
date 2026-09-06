# iwannadie.music

Official site of **I WANNA DIE**. Static Next.js export, hosted free on GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

- Releases and lyrics: `lib/releases.ts` — add an object per release.
- Name, links, contact: `lib/site.ts`.
- Brand sources: `brand/` → `python3 scripts/assets.py` regenerates icons, cover sizes and the OG image.
- Push to `main` deploys via `.github/workflows/deploy.yml`.
