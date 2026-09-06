"use client";

import { useEffect, useRef } from "react";

/* Hand-written WebGL2: a domain-warped smoke field with additive embers, reactive to the
   pointer and to scroll. Rendered below native resolution — the field is low-frequency. */

const VERT_QUAD = `#version 300 es
precision highp float;
const vec2 P[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }`;

const FRAG_SMOKE = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uScroll;
uniform float uOct;
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.86, 0.5, -0.5, 0.86);
  for (int i = 0; i < 5; i++){ if (float(i) >= uOct) break; v += a * vnoise(p); p = rot * p * 2.03; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p  = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  float t = uTime * 0.045;
  vec2 q = p + uMouse * 0.22;
  q.y += t * 0.55 + uScroll * 1.15;
  vec2 w = vec2(fbm(q * 1.15 + vec2(0.0, t)), fbm(q * 1.15 + vec2(4.7, 2.1) - t * 0.8));
  float n = fbm(q * 1.45 + w * 1.55);
  float r = length(p * vec2(1.0, 1.12));
  float amb = smoothstep(0.30, 1.55, r) * 0.74 + 0.04;
  amb *= mix(1.2, 0.38, uv.y);
  amb *= mix(1.0, 0.5, smoothstep(0.02, 0.20, uScroll));
  float e = pow(max(n, 0.0), 1.45) * amb * 0.85;
  const vec3 cInk   = vec3(0.022, 0.021, 0.026);
  const vec3 cDeep  = vec3(0.34, 0.16, 0.05);
  const vec3 cEmber = vec3(1.0, 0.62, 0.26);
  vec3 col = mix(cInk, cDeep, smoothstep(0.03, 0.42, e));
  col = mix(col, cEmber, smoothstep(0.40, 0.95, e));
  col += vec3(0.30, 0.15, 0.03) * pow(1.0 - uv.y, 6.5) * 0.22;
  col *= 0.60;
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.012;
  fragColor = vec4(max(col, 0.0), 1.0);
}`;

const VERT_EMBER = `#version 300 es
precision highp float;
in float aSeed;
uniform float uTime;
uniform float uPx;
uniform float uScroll;
out float vA;
float h(float n){ return fract(sin(n * 78.233) * 43758.5453); }
void main(){
  float s = aSeed;
  float speed = 0.012 + h(s) * 0.030;
  float x = h(s * 1.73);
  float y = fract(h(s * 3.11) + uTime * speed + uScroll * 0.35);
  x += sin(uTime * 0.28 + s * 6.2831) * 0.035;
  x += cos(uTime * 0.11 + s * 2.7) * 0.02;
  gl_Position = vec4(x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0);
  gl_PointSize = (1.1 + h(s * 5.31) * 2.4) * uPx;
  vA = (0.12 + h(s * 7.77) * 0.42) * smoothstep(0.0, 0.12, y) * smoothstep(1.0, 0.78, y) * 0.6;
}`;

const FRAG_EMBER = `#version 300 es
precision highp float;
in float vA;
out vec4 fragColor;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.02, d);
  vec3 col = mix(vec3(1.0, 0.55, 0.20), vec3(1.0, 0.90, 0.70), a * a);
  fragColor = vec4(col * a, a * vA);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function program(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const v = compile(gl, gl.VERTEX_SHADER, vs);
  const f = compile(gl, gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const p = gl.createProgram();
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
  return p;
}

function start(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) {
    document.body.classList.add("no-gl");
    return () => {};
  }
  const coarse = matchMedia("(pointer: coarse)").matches;
  const EMBERS = coarse ? 70 : 150;
  const seeds = new Float32Array(EMBERS);
  for (let i = 0; i < EMBERS; i++) seeds[i] = (i + 1) * 0.6180339887;

  const smoke = program(gl, VERT_QUAD, FRAG_SMOKE);
  const ember = program(gl, VERT_EMBER, FRAG_EMBER);
  if (!smoke || !ember) {
    document.body.classList.add("no-gl");
    return () => {};
  }
  const uS = {
    uRes: gl.getUniformLocation(smoke, "uRes"),
    uTime: gl.getUniformLocation(smoke, "uTime"),
    uMouse: gl.getUniformLocation(smoke, "uMouse"),
    uScroll: gl.getUniformLocation(smoke, "uScroll"),
    uOct: gl.getUniformLocation(smoke, "uOct"),
  };
  const uE = {
    uTime: gl.getUniformLocation(ember, "uTime"),
    uPx: gl.getUniformLocation(ember, "uPx"),
    uScroll: gl.getUniformLocation(ember, "uScroll"),
  };
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
  const locSeed = gl.getAttribLocation(ember, "aSeed");
  gl.enableVertexAttribArray(locSeed);
  gl.vertexAttribPointer(locSeed, 1, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  const emptyVao = gl.createVertexArray();

  const SCALE = coarse ? 0.5 : 0.62;
  const OCT = coarse ? 3 : 5;
  const st = { px: 1, w: 0, h: 0, mx: 0, my: 0, tmx: 0, tmy: 0, scroll: 0, running: true, raf: 0, t0: performance.now() };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    st.px = dpr * SCALE;
    const w = Math.max(1, Math.round(window.innerWidth * st.px));
    const h = Math.max(1, Math.round(window.innerHeight * st.px));
    if (w === st.w && h === st.h) return;
    st.w = canvas.width = w;
    st.h = canvas.height = h;
    gl!.viewport(0, 0, w, h);
  }
  const onMove = (e: PointerEvent) => {
    st.tmx = (e.clientX / window.innerWidth) * 2 - 1;
    st.tmy = 1 - (e.clientY / window.innerHeight) * 2;
  };
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    st.scroll = max > 0 ? window.scrollY / max : 0;
  };
  const onVis = () => {
    st.running = !document.hidden && !reducedMotion;
    if (st.running) st.t0 = performance.now() - 1000;
  };

  function paint(t: number) {
    const g = gl!;
    g.disable(g.BLEND);
    g.useProgram(smoke);
    g.bindVertexArray(emptyVao);
    g.uniform2f(uS.uRes, st.w, st.h);
    g.uniform1f(uS.uTime, t);
    g.uniform2f(uS.uMouse, st.mx, st.my);
    g.uniform1f(uS.uScroll, st.scroll);
    g.uniform1f(uS.uOct, OCT);
    g.drawArrays(g.TRIANGLES, 0, 3);
    g.enable(g.BLEND);
    g.blendFunc(g.SRC_ALPHA, g.ONE);
    g.useProgram(ember);
    g.bindVertexArray(vao);
    g.uniform1f(uE.uTime, t);
    g.uniform1f(uE.uPx, st.px * 2.2);
    g.uniform1f(uE.uScroll, st.scroll);
    g.drawArrays(g.POINTS, 0, EMBERS);
    g.bindVertexArray(null);
  }

  let lastPaint = 0;
  function draw(now: number) {
    st.raf = requestAnimationFrame(draw);
    if (!st.running) return;
    if (now - lastPaint < 13.5) return;
    lastPaint = now;
    st.mx += (st.tmx - st.mx) * 0.045;
    st.my += (st.tmy - st.my) * 0.045;
    paint((now - st.t0) / 1000);
    if (reducedMotion) st.running = false;
  }

  resize();
  addEventListener("resize", resize, { passive: true });
  if (!coarse) addEventListener("pointermove", onMove, { passive: true });
  addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVis);
  onScroll();
  if (reducedMotion) paint(12.0);
  else st.raf = requestAnimationFrame(draw);
  requestAnimationFrame(() => canvas.classList.add("opacity-100"));

  return () => {
    cancelAnimationFrame(st.raf);
    removeEventListener("resize", resize);
    removeEventListener("pointermove", onMove);
    removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVis);
  };
}

export function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    return start(c, reduced);
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-[1600ms]"
    />
  );
}
