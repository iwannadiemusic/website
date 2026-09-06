# iwannadie.music — plan

Official home of **I WANNA DIE** (rock / noir alt-pop). One page, static, free hosting.

**Palette from:** the kitchen on the *Cut It Shorter* cover — one tungsten bulb over cream tile,
sepia-stained plaster, a bleached towel with hair clippings on it, a soot-black jacket.

- soot `#100c09` — dark ground
- plaster `#2a2119` — dark surfaces / rules
- clipping `#8a7357` — secondary text on dark
- tungsten `#d9a24f` — the one accent (links, play button, focus ring)
- towel `#e9dcc3` — text on dark / light ground
- tile `#f4ecdc` — light-theme ground

**Type:** Big Shoulders Display 900 (wordmark, section heads — tall poster condensed),
Instrument Sans (everything else). Two families, clearly distinct.

**Layout:** left-aligned, one column, ≤ 70ch measure. Hero = the wordmark set enormous with
the ouroboros mark, cover art at the right with a tungsten glow. Sections: latest release
(30 s preview + Spotify / Apple links), music (data-driven list), lyrics, about, listen
(embeds), contact. Dark is the primary theme; light = sun-bleached paper version.

**Memorable thing:** the wordmark + ouroboros. Everything else quiet.

**Motion:** one — the ouroboros turns very slowly; off under `prefers-reduced-motion`.

**Deploy:** `output: 'export'` → GitHub Actions → GitHub Pages on org `iwannadiemusic`,
custom domain `iwannadie.music` (CNAME in `public/`). DNS at Spaceship: A → GitHub Pages IPs,
`www` CNAME → `iwannadiemusic.github.io`.

**Data lives in** `lib/site.ts` (name, links, contact) and `lib/releases.ts` (releases + lyrics).
Adding a release = one object.
