// Motor común de la presentación.
// Cada escena (js/escenaN.js) dibuja su material en el SVG y registra sus pasos con P.steps().
// Un paso enciende (on) o apaga (off) «banderas»; los elementos con data-on="bandera" se muestran
// mientras la bandera esté encendida. Las banderas se acumulan paso a paso, así que se puede
// avanzar, retroceder o saltar a cualquier paso (#5.19 en la URL) y el estado es siempre el mismo.
window.P = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = s => document.querySelector(s);
  const svg = $('#stage');

  function el(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  // grupo que aparece con una bandera; cls: 'L' (fundido), 'pop', 'draw', 'photo', 'grow'…
  function layer(parent, flag, cls = 'L', delay) {
    const g = el('g', { class: cls, 'data-on': flag }, parent);
    if (delay) g.style.setProperty('--d', delay + 's');
    return g;
  }
  function text(parent, x, y, str, attrs = {}) {
    const t = el('text', Object.assign({ x, y }, attrs), parent);
    t.textContent = str;
    return t;
  }

  // generador pseudoaleatorio con semilla: el dibujo sale igual cada vez
  let seed = 7;
  const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  // mancha irregular y suave
  function blob(cx, cy, rx, ry, jit = .22, n = 11) {
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, k = 1 + (rnd() - .5) * 2 * jit;
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    return smooth(p);
  }
  // curva cerrada suave que pasa por los puntos (Catmull-Rom)
  function smooth(pts) {
    const n = pts.length, f = v => v.toFixed(1);
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d + ' Z';
  }
  // arco de A a B, curvado hacia un lado (bend > 0 o < 0)
  function arc([x1, y1], [x2, y2], bend = .2) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const cx = (x1 + x2) / 2 - dy / L * L * bend, cy = (y1 + y2) / 2 + dx / L * L * bend;
    return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  // rótulo con fondo en píldora
  function pill(parent, x, y, str, o = {}) {
    const fs = o.size || 24, w = str.length * fs * .52 + fs * 1.1, h = fs * 1.6;
    const ax = o.anchor === 'start' ? x : o.anchor === 'end' ? x - w : x - w / 2;
    const g = el('g', {}, parent);
    el('rect', { x: ax, y: y - h * .68, width: w, height: h, rx: h / 2, fill: o.bg || '#1f1a14', opacity: o.bgop ?? .82 }, g);
    text(g, ax + w / 2, y + fs * .02, str, { 'text-anchor': 'middle', 'font-size': fs, 'font-weight': o.weight || 600, fill: o.color || '#f6ecd8' });
    return g;
  }

  const STEPS = [];
  function steps(list) { STEPS.push(...list); }

  let cur = 0, layered = [], hud;
  function flagsAt(i) {
    const s = new Set();
    for (let k = 0; k <= i; k++) { (STEPS[k].off || []).forEach(x => s.delete(x)); (STEPS[k].on || []).forEach(x => s.add(x)); }
    return s;
  }
  function render() {
    const fl = flagsAt(cur);
    svg.setAttribute('class', [...fl].map(x => 'f-' + x).join(' '));
    layered.forEach(e => e.classList.toggle('on', fl.has(e.dataset.on)));
    hud.textContent = `${STEPS[cur].id} · ${cur + 1}/${STEPS.length}   (← → · h oculta)`;
    history.replaceState(null, '', '#' + STEPS[cur].id);
  }
  function go(d) { cur = Math.max(0, Math.min(STEPS.length - 1, cur + d)); render(); }
  function fromHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    const i = STEPS.findIndex(s => s.id === h);
    return i >= 0 ? i : 0;
  }
  function start() {
    layered = [...document.querySelectorAll('[data-on]')];
    hud = $('#hud');
    document.addEventListener('keydown', e => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); go(1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { cur = 0; render(); }
      else if (e.key === 'End') { cur = STEPS.length - 1; render(); }
      else if (e.key === 'h') hud.classList.toggle('hidden');
    });
    svg.addEventListener('click', () => go(1));
    window.addEventListener('hashchange', () => { const i = fromHash(); if (i !== cur) { cur = i; render(); } });
    cur = fromHash();
    render();
  }

  return { NS, $, svg, el, layer, text, rnd, blob, smooth, arc, pill, steps, start, STEPS };
})();
