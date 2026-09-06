"""Derive site assets from the brand sources in ./brand. Run: python3 scripts/assets.py"""
from PIL import Image, ImageOps
import os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 1) Ouroboros: white line on black JPEG -> white on transparent PNG
src = Image.open("brand/ouroboros-source.jpg").convert("L")
w, h = src.size
side = max(w, h)
canvas = Image.new("L", (side, side), 0)
canvas.paste(src, ((side - w) // 2, (side - h) // 2))
# clean the noise floor: anything under 40 is background
alpha = canvas.point(lambda v: 0 if v < 40 else min(255, int((v - 40) * 255 / 215)))
white = Image.new("RGBA", (side, side), (255, 255, 255, 0))
white.putalpha(alpha)
white.save("public/brand/ouroboros.png", optimize=True)
print("ouroboros", white.size)

# favicon / touch icon: mark on soot
def icon(size, pad, path):
    bg = Image.new("RGBA", (size, size), (16, 12, 9, 255))
    m = white.resize((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    bg.alpha_composite(m, (pad, pad))
    bg.convert("RGB").save(path, optimize=True)
icon(512, 64, "app/icon.png")
icon(180, 20, "app/apple-icon.png")
print("icons done")

# 2) Cover art
cover = Image.open("brand/cut-it-shorter-cover-source.png").convert("RGB")
cover.resize((1400, 1400), Image.LANCZOS).save("public/releases/cut-it-shorter.jpg", quality=86, optimize=True, progressive=True)
cover.resize((640, 640), Image.LANCZOS).save("public/releases/cut-it-shorter-640.jpg", quality=84, optimize=True, progressive=True)
# OG 1200x630: cover on soot, centred, with a blurred, darkened cover as the ground
og = cover.resize((1200, 1200), Image.LANCZOS).crop((0, 285, 1200, 915))
og = ImageOps.autocontrast(og.convert("L")).convert("RGB")
og = Image.blend(og, Image.new("RGB", og.size, (16, 12, 9)), 0.55)
tile = cover.resize((560, 560), Image.LANCZOS)
og.paste(tile, (1200 - 560 - 48, 35))
og.save("app/opengraph-image.jpg", quality=86, optimize=True)
print("cover + og done")
