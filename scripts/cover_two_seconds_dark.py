"""Two Seconds Dark — single cover, drawn in the Nobody Made You language.

Same black paper ground (lifted straight from the Nobody Made You source), same chalky white
ink, same spot as the window. The window is gone; in its place a wall switch with the toggle
down. Only the edges catch light, the way a switch looks in a dark room. It is drawn 2.6x the
window's footprint so it still reads in a 56 px Spotify thumbnail, where the window vanishes.

Run: python3 scripts/cover_two_seconds_dark.py  -> brand/two-seconds-dark-cover-source.png
Then python3 scripts/assets.py to derive the site sizes.
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import os

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
rng = np.random.default_rng(2)
S = 3000
CX, CY = 1500, 1460                 # the window sits at 1443; a bigger object wants a touch less lift
K = 2.6                             # scale over the window's footprint; the paper grain does not scale
PW, PH = round(370 * K), round(605 * K)   # window frame footprint x K; a switch plate has the same 0.61 ratio
TINT = np.array([1.0, 0.958, 0.917])  # the source ink is slightly warm

# ---------- ground: the Nobody Made You paper with the window patched out ----------
src = np.asarray(Image.open("brand/nobody-made-you-cover-source.png").convert("RGB")).astype(np.float32)
ground = src.copy()
x0, x1, y0, y1 = 1230, 1770, 1040, 1850          # window plus margin
patch = src[y0:y1, x0 - 640:x1 - 640].copy()     # same paper, 640 px to the left
m = np.zeros((y1 - y0, x1 - x0), np.float32)
m[40:-40, 40:-40] = 1
m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(24))).astype(np.float32) / 255
ground[y0:y1, x0:x1] = ground[y0:y1, x0:x1] * (1 - m[..., None]) + patch * m[..., None]

# ---------- helpers ----------
def blur(a, r):
    """Separable gaussian on a float array (PIL won't blur mode F)."""
    if r <= 0:
        return a.astype(np.float32)
    k = int(3 * r) + 1
    x = np.arange(-k, k + 1, dtype=np.float32)
    g = np.exp(-0.5 * (x / r) ** 2)
    g /= g.sum()
    a = a.astype(np.float32)
    pad = np.pad(a, ((0, 0), (k, k)), mode="edge")
    a = np.stack([np.convolve(row, g, mode="valid") for row in pad]) if a.shape[0] < 1200 else _conv_axis(pad, g, 1, k)
    pad = np.pad(a, ((k, k), (0, 0)), mode="edge")
    return _conv_axis(pad, g, 0, k)

def _conv_axis(pad, g, axis, k):
    out = np.zeros_like(pad[k:-k] if axis == 0 else pad[:, k:-k])
    n = out.shape[axis]
    for i, w in enumerate(g):
        out += w * (pad[i:i + n] if axis == 0 else pad[:, i:i + n])
    return out

def noise(shape, octaves=((1, 1.0), (3, 0.8), (8, 0.6), (20, 0.4))):
    """Multi-octave smooth noise, normalised to mean 0 / std 1."""
    n = np.zeros(shape, np.float32)
    for r, w in octaves:
        n += w * blur(rng.standard_normal(shape).astype(np.float32), r)
    return (n - n.mean()) / n.std()

def rough(mask, amount=0.35, r=1.6):
    """Chalk edge: soften the mask then let noise eat into it. Gated so nothing lands outside the shape."""
    gate = np.clip(blur(mask, 2.5) * 3, 0, 1)
    return np.clip((blur(mask, r) + noise(mask.shape, ((2, 1.0), (5, 0.7))) * amount * 0.5) * 1.2 - 0.1, 0, 1) * gate

def ink(mask, base, spread=34.0, erode=0.85):
    """Chalky ink: base value, wide multiplicative texture, speckle erosion. Returns (value, alpha)."""
    a = rough(mask)
    v = base + noise(mask.shape) * spread
    fine = blur(rng.standard_normal(mask.shape).astype(np.float32), 0.8)
    v = np.where(fine > erode, v * 0.3, v)
    v = np.clip(v, 0, 255)
    return v, a

def rrect(size, box, r):
    im = Image.new("L", size, 0)
    ImageDraw.Draw(im).rounded_rectangle(box, r, fill=255)
    return np.asarray(im).astype(np.float32) / 255

def ellipse(size, box):
    im = Image.new("L", size, 0)
    ImageDraw.Draw(im).ellipse(box, fill=255)
    return np.asarray(im).astype(np.float32) / 255

def line(size, p0, p1, w):
    im = Image.new("L", size, 0)
    ImageDraw.Draw(im).line([p0, p1], fill=255, width=w)
    return np.asarray(im).astype(np.float32) / 255

# work in a local canvas around the plate
W, H = PW + 260, PH + 260
ox, oy = CX - W // 2, CY - H // 2
cx, cy = W // 2, H // 2
size = (W, H)
layers = []  # (value, alpha) painted in order

# ---------- plate ----------
outer = rrect(size, (cx - PW // 2, cy - PH // 2, cx + PW // 2, cy + PH // 2), round(20 * K))
bevel_w = round(19 * K)
inner = rrect(size, (cx - PW // 2 + bevel_w, cy - PH // 2 + bevel_w, cx + PW // 2 - bevel_w, cy + PH // 2 - bevel_w), round(10 * K))
# the face: barely lighter than the paper, like the window panes
yy, xx = np.mgrid[0:H, 0:W]
light = 1.0 + 0.16 * ((cy - yy) / (PH / 2)) - 0.10 * ((xx - cx) / (PW / 2))
face = np.clip(10.0 + 9.0 * (light - 0.85) / 0.4 + noise(size[::-1]) * 3.5, 0, 255)
layers.append((face, blur(inner, 1.0) * 0.9))
# the bevel: a chalk band, a touch darker than the window frame, brighter on the top and left edges
bevel = np.clip(outer - inner, 0, 1)
v, a = ink(bevel, 118.0)
layers.append((np.clip(v * light, 0, 255), a))

# ---------- the toggle slot ----------
SW, SH = round(58 * K), round(136 * K)
slot = rrect(size, (cx - SW // 2, cy - SH // 2, cx + SW // 2, cy + SH // 2), round(4 * K))
layers.append((np.full(size[::-1], 3.0, np.float32), blur(slot, 0.8)))       # the dark hole
e = round(4 * K)
slot_edge = np.clip(rrect(size, (cx - SW // 2 - e, cy - SH // 2 - e, cx + SW // 2 + e, cy + SH // 2 + e), round(6 * K)) - slot, 0, 1)
v, a = ink(slot_edge, 70.0, spread=20)
layers.append((v, a * 0.7))

# ---------- toggle: down (now) ----------
TW, TH = round(64 * K), round(112 * K)
def toggle(down, base=176.0):
    dy = round(26 * K) if down else -round(26 * K)
    body = rrect(size, (cx - TW // 2, cy + dy - TH // 2, cx + TW // 2, cy + dy + TH // 2), round(9 * K))
    v, a = ink(body, base, spread=26, erode=0.95)
    # the toggle is a wedge: the face that points at you is bright, the face that points away is in shadow
    t = np.clip((yy - (cy + dy - TH // 2)) / TH, 0, 1)
    shade = (0.62 + 0.55 * t) if down else (1.17 - 0.55 * t)
    v = np.clip(v * shade, 0, 255)
    # the tip catches the most light
    tip_y = cy + dy + TH // 2 - round(9 * K) if down else cy + dy - TH // 2 + round(9 * K)
    tip = rrect(size, (cx - TW // 2 + round(2 * K), tip_y - round(5 * K), cx + TW // 2 - round(2 * K), tip_y + round(5 * K)), round(4 * K))
    v = np.clip(v + blur(tip, 2.5 * K) * 55, 0, 255)
    return v, a

layers.append(toggle(True))

# ---------- screws ----------
R, L = round(17 * K), round(13 * K)
for sy, ang in ((cy - round(158 * K), 22), (cy + round(158 * K), -38)):
    head = ellipse(size, (cx - R, sy - R, cx + R, sy + R))
    v, a = ink(head, 140.0, spread=24)
    layers.append((v, a))
    d = np.deg2rad(ang)
    p0 = (cx - L * np.cos(d), sy - L * np.sin(d))
    p1 = (cx + L * np.cos(d), sy + L * np.sin(d))
    layers.append((np.full(size[::-1], 8.0, np.float32), blur(line(size, p0, p1, round(4 * K)), 0.7)))

# ---------- composite ----------
paper = ground[oy:oy + H, ox:ox + W].copy()
canvas = paper.copy()
touched = np.zeros((H, W), np.float32)
for v, a in layers:
    touched = np.maximum(touched, a)
    a = a[..., None]
    canvas = canvas * (1 - a) + (v[..., None] * TINT[None, None, :]) * a
# soften the ink into the paper and put grain back over it, only where ink landed
touched = np.clip(blur(touched, 2.0) * 1.5, 0, 1)[..., None]
soft = np.stack([blur(canvas[..., i], 0.7) for i in range(3)], -1)
grain = rng.standard_normal((H, W)).astype(np.float32)[..., None] * 3.2
soft = np.clip(soft + grain * (soft.mean(-1, keepdims=True) / 80 + 0.3), 0, 255)
ground[oy:oy + H, ox:ox + W] = paper * (1 - touched) + soft * touched

out = Image.fromarray(np.clip(ground, 0, 255).astype(np.uint8), "RGB")
out.save("brand/two-seconds-dark-cover-source.png", optimize=True)
print("cover", out.size)
