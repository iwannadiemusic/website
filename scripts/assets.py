"""Derive site assets from the brand sources in ./brand. Run: python3 scripts/assets.py

The 30 s preview is cut from the release master, at the same spot Apple's preview uses:
  ffmpeg -ss 81.0 -t 30 -i "../Nobody Made You/Nobody Made You.wav" \
    -af "afade=t=in:d=0.05,afade=t=out:st=28.5:d=1.5" -b:a 160k public/audio/nobody-made-you-preview.mp3
"""
from PIL import Image
import os
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for d in ("public/brand", "public/releases"):
    os.makedirs(d, exist_ok=True)

SOOT = (16, 12, 9, 255)

# 1) Mark: the moonlit window, cropped out of the black source -> white on transparent PNG
src = Image.open("brand/logo-source.png").convert("L")
mark_l = src.crop((1300, 1123, 1700, 1763))  # 400x640, frame plus a small margin
# clean the noise floor: the black ground tops out around 19
FLOOR = 24
alpha = mark_l.point(lambda v: 0 if v < FLOOR else min(255, int((v - FLOOR) * 255 / (255 - FLOOR))))
mark = Image.new("RGBA", mark_l.size, (255, 255, 255, 0))
mark.putalpha(alpha)
mark.save("public/brand/logo.png", optimize=True)
print("logo", mark.size)

# favicon / touch icons: mark on soot, fit to height
def icon(size, pad, boost=1.0):
    bg = Image.new("RGBA", (size, size), SOOT)
    h = size - 2 * pad
    w = round(h * mark.width / mark.height)
    m = mark.resize((w, h), Image.LANCZOS)
    if boost != 1.0:  # hairline frame fades out when tiny; lift it back up
        a = m.getchannel("A").point(lambda v: min(255, int(v * boost)))
        m.putalpha(a)
    bg.alpha_composite(m, ((size - w) // 2, pad))
    return bg.convert("RGB")

icon(512, 48).save("app/icon.png", optimize=True)
icon(180, 16).save("app/apple-icon.png", optimize=True)
# ICO entries are embedded PNGs and must be RGBA or Turbopack refuses to decode them
ico = [icon(48, 3, 1.4).convert("RGBA"), icon(32, 2, 1.8).convert("RGBA"), icon(16, 1, 2.6).convert("RGBA")]
ico[0].save("app/favicon.ico", sizes=[(48, 48), (32, 32), (16, 16)], append_images=ico[1:])
print("icons done")

# 2) Cover art
cover = Image.open("brand/nobody-made-you-cover-source.png").convert("RGB")
cover.resize((1400, 1400), Image.LANCZOS).save("public/releases/nobody-made-you.jpg", quality=86, optimize=True, progressive=True)
cover.resize((640, 640), Image.LANCZOS).save("public/releases/nobody-made-you-640.jpg", quality=84, optimize=True, progressive=True)
# OG 1200x630: the cover itself, scaled so the window fills most of the height, centred on it
scale = 0.7
big = cover.resize((round(3000 * scale), round(3000 * scale)), Image.LANCZOS)
cx, cy = round(1500 * scale), round(1443 * scale)  # window centre in the source
big.crop((cx - 600, cy - 315, cx + 600, cy + 315)).save("app/opengraph-image.jpg", quality=88, optimize=True)
print("cover + og done")
