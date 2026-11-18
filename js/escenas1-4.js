// Escenas 1–4 · El bosque, los humanos, la degradación y la hipótesis
(() => {
  const { $, el, layer, text, rnd, blob, smooth } = P;
  const INK = '#3a2e1f';

  // ================= Escena 1 y preguntas =================
  const s1 = $('#s1');
  const q = (flag, lines, size, y0) => {
    const g = layer(s1, flag);
    lines.forEach((l, i) => text(g, 800, y0 + i * size * 1.18, l, { 'text-anchor': 'middle', 'font-size': size, 'font-weight': 650, fill: INK,
      stroke: '#fbf3e3', 'stroke-width': 6, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }));
  };
  q('q1', ['¿Qué veis?'], 80, 150);
  q('q2', ['¿Sabemos gestionarlo de forma sostenible?'], 60, 140);
  q('q3', ['¿Por qué hay tantas situaciones en que los bosques', 'no se gestionan de forma sostenible?'], 50, 110);

  // ================= Escena 2 · Personas =================
  const H = $('#humans');
  const SKIN = '#e2b893', INK2 = '#2c2621';
  const limb = (p, pts, color, w) => el('path', { d: 'M' + pts.map(q => q.join(',')).join(' L'), stroke: color, 'stroke-width': w,
    fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  const shade = (p, cx, w = 15) => el('ellipse', { cx, cy: 1, rx: w, ry: 3.2, fill: '#2e2214', opacity: .38 }, p);
  const head = (p, x, y, hat, hatC = '#5a4632') => {
    el('circle', { cx: x, cy: y, r: 6.3, fill: SKIN, stroke: '#8a6446', 'stroke-width': .6 }, p);
    if (hat === 'beanie') el('path', { d: `M${x - 6.6},${y - 1} Q${x},${y - 12} ${x + 6.6},${y - 1} Z`, fill: hatC }, p);
    if (hat === 'brim') { el('ellipse', { cx: x, cy: y - 3.5, rx: 11, ry: 2.4, fill: hatC }, p);
      el('path', { d: `M${x - 5.5},${y - 3.5} Q${x},${y - 13} ${x + 5.5},${y - 3.5} Z`, fill: hatC }, p); }
    if (hat === 'cap') { el('path', { d: `M${x - 6.5},${y - 1.5} Q${x - 1},${y - 11} ${x + 6},${y - 2.5} Z`, fill: hatC }, p);
      el('path', { d: `M${x + 3},${y - 2.6} L${x + 11},${y - 1.2}`, stroke: hatC, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, p); }
    if (hat === 'beret') el('ellipse', { cx: x - 1, cy: y - 5, rx: 7.5, ry: 3.2, fill: hatC }, p);
    if (hat === 'hair') el('path', { d: `M${x - 6.4},${y - 1} Q${x - 2},${y - 9.5} ${x + 6.4},${y - 2} Q${x + 2},${y - 5} ${x - 6.4},${y - 1}Z`, fill: '#3b2a1e' }, p);
  };

  const sheep = (p, x, y, s = 1, flip = 1) => {
    const g = el('g', { transform: `translate(${x},${y}) scale(${s * flip},${s})` }, p);
    shade(g, 0, 12);
    limb(g, [[-6, 0], [-6, -7]], INK2, 2.2); limb(g, [[5, 0], [5, -7]], INK2, 2.2);
    [[-7, -11, 6], [0, -13, 7], [7, -11, 6], [-3, -8, 6], [4, -8, 6]].forEach(([cx, cy, r]) =>
      el('circle', { cx, cy, r, fill: '#f3efe6', stroke: '#b9b1a1', 'stroke-width': .8 }, g));
    el('ellipse', { cx: 13, cy: -14, rx: 4.2, ry: 3.4, fill: '#3a3530' }, g);
    el('path', { d: 'M11,-17 L9,-19', stroke: '#3a3530', 'stroke-width': 2, 'stroke-linecap': 'round' }, g);
  };
  const dog = (p, x, y, c = '#2f2b28', c2 = '#f1ece2', flip = 1) => {
    const g = el('g', { transform: `translate(${x},${y}) scale(${flip},1)` }, p);
    shade(g, 0, 12);
    limb(g, [[-8, 0], [-8, -8]], c, 2.6); limb(g, [[7, 0], [7, -8]], c, 2.6);
    el('ellipse', { cx: 0, cy: -10, rx: 11, ry: 4.6, fill: c }, g);
    el('ellipse', { cx: 2, cy: -8.5, rx: 5, ry: 2.6, fill: c2 }, g);
    el('path', { d: 'M9,-12 L14,-19 L19,-16 L17,-13 Z', fill: c }, g);
    el('path', { d: 'M13,-18 L12,-22 L15,-19 Z', fill: c }, g);
    el('path', { d: 'M-10,-12 Q-16,-16 -15,-21', stroke: c, 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, g);
  };
  const tag = (p, str, y = 14) => {
    const w = str.length * 10.5 + 22;
    el('rect', { x: -w / 2, y, width: w, height: 25, rx: 12.5, fill: '#fffaf0', opacity: .92 }, p);
    text(p, 0, y + 18, str, { 'text-anchor': 'middle', 'font-size': 16.5, 'font-weight': 600, fill: '#3c3a33' });
  };

  // ---- leñador: hacha en alto y leña apilada ----
  function lenador(p) {
    shade(p, 0, 22);
    // leña apilada y tocón
    [[-34, -5], [-24, -5], [-14, -5], [-29, -13], [-19, -13], [-24, -21]].forEach(([cx, cy]) => {
      el('circle', { cx, cy, r: 5.2, fill: '#b98a57', stroke: '#6b4526', 'stroke-width': 1.3 }, p);
      el('circle', { cx, cy, r: 2, fill: 'none', stroke: '#8a5e36', 'stroke-width': .8 }, p);
    });
    el('rect', { x: 15, y: -9, width: 15, height: 9, fill: '#7a5332' }, p);
    el('ellipse', { cx: 22.5, cy: -9, rx: 7.5, ry: 2.6, fill: '#c9a170', stroke: '#7a5332', 'stroke-width': .8 }, p);
    // piernas y botas
    limb(p, [[-6, -1], [-4, -13], [-2, -26]], '#3d4757', 6.5); limb(p, [[8, -1], [5, -13], [2, -26]], '#3d4757', 6.5);
    limb(p, [[-9, -1], [-4, -1]], '#2a2420', 4); limb(p, [[6, -1], [11, -1]], '#2a2420', 4);
    // camisa de cuadros
    el('path', { d: 'M-8,-25 C-9.5,-33 -9,-41 -6.5,-46.5 L6.5,-46.5 C9,-41 9.5,-33 8,-25 Z', fill: '#b3412e' }, p);
    [-3, 2].forEach(x => limb(p, [[x, -46], [x, -26]], '#7e2a1d', 1.2));
    [-40, -33].forEach(y => limb(p, [[-8.5, y], [8.5, y]], '#7e2a1d', 1.2));
    // brazos en alto
    limb(p, [[-5, -44], [-3, -55], [5, -63]], '#b3412e', 5); limb(p, [[5, -44], [9, -54], [8, -63]], '#b3412e', 5);
    el('circle', { cx: 6.5, cy: -64, r: 2.8, fill: SKIN }, p);
    // hacha
    limb(p, [[3, -61], [23, -79]], '#7b5431', 3.2);
    el('path', { d: 'M19,-84 L29,-79 L26,-71 L21,-76 Z', fill: '#9aa2a8', stroke: '#5f666b', 'stroke-width': .8 }, p);
    head(p, 0, -52, 'beanie', '#d9a43b');
  }
  // ---- pastor con cayado, perro y rebaño ----
  function pastor(p) {
    shade(p, 0, 16);
    limb(p, [[-4, -1], [-3, -24]], '#5b4a38', 6); limb(p, [[5, -1], [3, -24]], '#5b4a38', 6);
    limb(p, [[-7, -1], [-2, -1]], '#2a2420', 4); limb(p, [[3, -1], [8, -1]], '#2a2420', 4);
    el('path', { d: 'M-9,-20 C-10,-30 -9,-42 -6,-47 L6,-47 C9,-42 10,-30 9,-20 Z', fill: '#7d6a50' }, p);
    el('path', { d: 'M-9,-20 L9,-20 L8,-24 L-8,-24 Z', fill: '#5f4f3b' }, p);
    limb(p, [[-5, -44], [-9, -34], [-7, -26]], '#7d6a50', 4.6);
    limb(p, [[5, -44], [10, -36], [13, -40]], '#7d6a50', 4.6);
    // cayado
    el('path', { d: 'M14,0 L14,-66 Q14,-74 20,-74 Q26,-74 25,-67', stroke: '#6b4a2b', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, p);
    el('circle', { cx: 14, cy: -40, r: 2.8, fill: SKIN }, p);
    head(p, 0, -53, 'brim', '#4a3b2b');
    dog(p, -30, 2, '#2f2b28', '#f1ece2', -1);
    [[42, 2, 1], [72, -8, .92], [100, 4, .96], [64, 14, 1.04], [128, -4, .9], [154, 8, .94], [34, 20, 1.05], [96, 22, 1.02], [124, 18, .98]]
      .forEach(([x, y, s]) => sheep(p, x, y, s, rnd() < .3 ? -1 : 1));
  }
  // ---- cazador con escopeta al hombro y perro ----
  function cazador(p) {
    shade(p, 2, 16);
    limb(p, [[-7, -1], [-3, -13], [-1, -25]], '#6a5a3c', 6); limb(p, [[9, -1], [5, -13], [2, -25]], '#6a5a3c', 6);
    limb(p, [[-10, -1], [-5, -1]], '#3a2b1f', 4.2); limb(p, [[7, -1], [12, -1]], '#3a2b1f', 4.2);
    el('path', { d: 'M-8,-24 C-9.5,-32 -9,-41 -6.5,-47 L6.5,-47 C9,-41 9.5,-32 8,-24 Z', fill: '#4f5e33' }, p);
    el('path', { d: 'M-8,-31 L8,-31', stroke: '#3a4524', 'stroke-width': 1.5 }, p);
    el('rect', { x: -6, y: -30, width: 5, height: 4, fill: '#3a4524' }, p); el('rect', { x: 1, y: -30, width: 5, height: 4, fill: '#3a4524' }, p);
    // escopeta al hombro: el cañón apunta hacia atrás y arriba
    limb(p, [[4, -44], [-26, -60]], '#2b2b2b', 3.2);
    limb(p, [[4, -44], [12, -40]], '#6b4526', 5);
    limb(p, [[5, -44], [9, -48], [6, -52]], '#4f5e33', 4.6);
    limb(p, [[-5, -44], [-8, -34], [-6, -27]], '#4f5e33', 4.6);
    head(p, 1, -53, 'brim', '#3b4a26');
    dog(p, 30, 2, '#9a5a2e', '#f3eee4', 1);
  }
  // ---- setero agachado con cesta ----
  function setero(p) {
    shade(p, 2, 20);
    limb(p, [[-8, -1], [-13, -10], [-4, -17]], '#4a4a56', 6.4); limb(p, [[7, -1], [11, -11], [2, -17]], '#4a4a56', 6.4);
    limb(p, [[-11, -1], [-6, -1]], '#2a2420', 4); limb(p, [[5, -1], [10, -1]], '#2a2420', 4);
    el('path', { d: 'M-8,-14 C-8,-24 -3,-34 4,-38 L13,-33 C11,-27 7,-20 6,-14 Z', fill: '#8e5a7e' }, p);
    limb(p, [[9, -34], [16, -24], [20, -8]], '#8e5a7e', 4.4);
    el('circle', { cx: 20.5, cy: -6.5, r: 2.5, fill: SKIN }, p);
    limb(p, [[3, -34], [-2, -24], [-14, -18]], '#8e5a7e', 4.4);
    head(p, 11, -41, 'beret', '#3a3a46');
    // cesta con setas
    const b = el('g', { transform: 'translate(-24,0)' }, p);
    el('path', { d: 'M-11,-14 L11,-14 L8,0 L-8,0 Z', fill: '#b08150', stroke: '#6e4c2a', 'stroke-width': 1 }, b);
    [-6, -2, 2, 6].forEach(x => limb(b, [[x, -13], [x * .75, -1]], '#8a6238', .9));
    el('path', { d: 'M-11,-14 Q0,-30 11,-14', stroke: '#6e4c2a', 'stroke-width': 2, fill: 'none' }, b);
    [[-5, -15, '#b5523b'], [2, -16, '#a0703f'], [7, -14.5, '#b5523b']].forEach(([x, y, c]) =>
      el('path', { d: `M${x - 4},${y} Q${x},${y - 6} ${x + 4},${y} Z`, fill: c }, b));
    // setas en el suelo
    [[22, 0, '#b5523b'], [30, 1, '#a0703f']].forEach(([x, y, c]) => {
      limb(p, [[x, y], [x, y - 4]], '#efe3cb', 2.2);
      el('path', { d: `M${x - 4.5},${y - 3.5} Q${x},${y - 10} ${x + 4.5},${y - 3.5} Z`, fill: c }, p);
    });
  }
  // ---- corredor en zancada ----
  function corredor(p) {
    shade(p, 0, 15);
    limb(p, [[-15, -3], [-9, -11], [-2, -23]], SKIN, 4.6); limb(p, [[13, -8], [10, -16], [1, -23]], SKIN, 4.6);
    limb(p, [[-18, -3], [-13, -2]], '#e8e6e0', 4); limb(p, [[12, -8], [17, -7]], '#e8e6e0', 4);
    el('path', { d: 'M-6,-27 L6,-27 L5,-20 L-5,-20 Z', fill: '#1f2b3a' }, p);
    el('path', { d: 'M-5,-26 C-6,-34 -3,-42 1,-46 L10,-44 C11,-37 8,-31 6,-26 Z', fill: '#1f9bb6' }, p);
    limb(p, [[1, -42], [-8, -36], [-5, -29]], '#1f9bb6', 4.2); limb(p, [[8, -42], [15, -36], [20, -40]], '#1f9bb6', 4.2);
    head(p, 8, -51, 'cap', '#e0533c');
    [[-30, -30], [-34, -22], [-28, -14]].forEach(([x, y]) => limb(p, [[x, y], [x - 10, y]], '#fff6e6', 1.6));
  }

  const acts = [
    { flag: 'p_lena', x: 1185, y: 520, s: .95, label: 'madera', draw: lenador },
    { flag: 'p_past', x: 300, y: 380, s: .82, label: 'ganado', draw: pastor },
    { flag: 'p_caza', x: 205, y: 790, s: 1.45, label: 'caza', draw: cazador },
    { flag: 'p_seta', x: 700, y: 815, s: 1.45, label: 'setas', draw: setero },
    { flag: 'p_ocio', x: 1085, y: 400, s: .82, label: 'ocio', draw: corredor },
  ];
  acts.forEach(a => {
    const outer = el('g', { transform: `translate(${a.x},${a.y}) scale(${a.s})` }, H);
    const inner = layer(outer, a.flag, 'pop');
    a.draw(inner);
    tag(inner, a.label);
  });

  // ================= Escena 3 · Degradación =================
  const Z = {
    fire:    { cx: 840, cy: 520, label: 'incendio',    lx: 840,  ly: 372 },
    decline: { cx: 250, cy: 560, label: 'decaimiento', lx: 430,  ly: 655 },
    erosion: { cx: 1340, cy: 500, label: 'erosión',    lx: 1340, ly: 392 },
  };
  $('#zFire').setAttribute('d', blob(840, 520, 150, 115));
  // decaimiento: más extenso que en el prototipo
  [[250, 560, 245, 140], [120, 420, 135, 90], [430, 470, 120, 80]].forEach(([cx, cy, rx, ry]) =>
    el('path', { d: blob(cx, cy, rx, ry) }, $('#zDecline')));
  // pies secos, grises, salpicados dentro del decaimiento
  for (let i = 0; i < 22; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
    el('circle', { cx: 250 + Math.cos(a) * r * 230, cy: 540 + Math.sin(a) * r * 140, r: 7 + rnd() * 8 }, $('#zDead'));
  }
  $('#zErosion').setAttribute('d', blob(1340, 500, 180, 88, .28));

  // cárcavas: canales que bajan por la línea de máxima pendiente y se ramifican hacia arriba
  (() => {
    const g = $('#gullies');
    const ribbon = (pts, ws, dx = 0, dy = 0, k = 1) => {
      const L = [], R = [];
      pts.forEach(([x, y], i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
        let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const n = Math.hypot(nx, ny) || 1; nx /= n; ny /= n;
        const w = ws[i] * k / 2;
        L.push([x + nx * w + dx, y + ny * w + dy]); R.push([x - nx * w + dx, y - ny * w + dy]);
      });
      const all = L.concat(R.reverse());
      return 'M' + all.map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z';
    };
    // media cinta: entre el eje del canal y uno de sus bordes (side = 1 izquierda, -1 derecha)
    const half = (pts, ws, side) => {
      const E = pts.map(([x, y], i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
        let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const n = Math.hypot(nx, ny) || 1;
        return [x - side * nx / n * ws[i] / 2, y - side * ny / n * ws[i] / 2];
      });
      return 'M' + pts.concat(E.reverse()).map(p => p.map(v => v.toFixed(1)).join(',')).join(' L') + ' Z';
    };
    const fans = el('g', {}, g), walls = el('g', {}, g);
    const course = (a, b, n, wig, ph) => Array.from({ length: n + 1 }, (_, k) => { const u = k / n;
      return [a[0] + (b[0] - a[0]) * u + Math.sin(u * 7 + ph) * wig * Math.sin(u * Math.PI), a[1] + (b[1] - a[1]) * u]; });
    // Cárcavas en «bad-lands»: un escarpe irregular arriba, del que bajan surcos en V (anchos en la cabecera,
    // estrechos abajo) separados por aristas; la pared izquierda de cada surco al sol y la derecha en sombra.
    // Cada cárcava es una cuenca en anfiteatro: escarpe redondeado arriba, paredes que convergen
    // en un canal de salida y un abanico de sedimentos abajo. Pared izquierda al sol, derecha en sombra.
    const f = v => v.toFixed(1), P2 = p => `${f(p[0])},${f(p[1])}`;
    // Textura de surcos: muchos regueros finos y oscuros, fundidos con el suelo (multiplicar) y algo
    // difuminados, para que se lean como terreno roto y no como objetos sueltos.
    const tex = el('g', { style: 'mix-blend-mode:multiply', opacity: .85 }, g);
    const soft = el('g', { filter: 'url(#soft3)', opacity: .7 }, tex);
    for (let i = 0; i < 46; i++) {
      const sx = 1180 + rnd() * 330, sy = 430 + rnd() * 70 + Math.pow((sx - 1345) / 165, 2) * 25;
      const len = 28 + rnd() * 70, w = 1.2 + rnd() * 3.2;
      const pts = course([sx, sy], [sx + len * .14, sy + len], 10, 2 + rnd() * 3, rnd() * 6);
      const ws = pts.map((_, k) => w * (.35 + .65 * Math.sin(Math.min(1, k / 10 * 1.3) * Math.PI / 2)));
      el('path', { d: half(pts, ws.map(v => v * 2.6), 1) + half(pts, ws.map(v => v * 2.6), -1), fill: '#9c5a2c' }, soft);
      el('path', { d: half(pts, ws, 1) + half(pts, ws, -1), fill: '#4a2510' }, tex);
      el('path', { d: half(pts, ws.map(v => v * .9), 1), fill: '#f0cf9c', transform: 'translate(-1.2,-.4)', opacity: .5, style: 'mix-blend-mode:screen' }, g);
    }
    const systems = [];
    systems.forEach(([cx, cy, W, D]) => {
      const out = [cx + D * .12, cy + D];                                    // punto de salida
      const end = [out[0] + D * .14 + rnd() * 6, out[1] + D * (.5 + rnd() * .4)]; // final del canal
      const Lr = [cx - W / 2, cy + D * .18], Rr = [cx + W / 2, cy + D * .22];
      const top = [cx + (rnd() - .5) * 8, cy - D * .12];
      // cuenca: borde izquierdo, escarpe arriba, borde derecho
      const left = `M${P2(out)} Q${P2([Lr[0] + W * .06, out[1] - D * .25])} ${P2(Lr)} Q${P2([Lr[0] + W * .05, top[1]])} ${P2(top)}`;
      const right = `M${P2(out)} Q${P2([Rr[0] - W * .04, out[1] - D * .25])} ${P2(Rr)} Q${P2([Rr[0] - W * .05, top[1]])} ${P2(top)}`;
      const mid = [cx + (rnd() - .5) * 6, cy + D * .45];
      el('path', { d: left + ` L${P2(mid)} Z`, fill: '#c98c55' }, walls);
      el('path', { d: right + ` L${P2(mid)} Z`, fill: '#46260f' }, walls);
      el('path', { d: `M${P2(mid)} L${P2(out)}`, stroke: '#2a150a', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, walls);
      // aristas interiores: surcos que bajan desde el escarpe hacia la salida
      const nr = 2 + Math.floor(rnd() * 3);
      for (let k = 1; k <= nr; k++) {
        const u = k / (nr + 1), sx = Lr[0] + (Rr[0] - Lr[0]) * u, sy = top[1] + Math.abs(u - .5) * D * .5 + 4;
        el('path', { d: `M${f(sx)},${f(sy)} Q${f((sx + mid[0]) / 2 + (u - .5) * 8)},${f((sy + mid[1]) / 2)} ${P2(mid)}`,
          stroke: u < .5 ? '#9a6234' : '#2e180b', 'stroke-width': 1.4, fill: 'none', opacity: .9 }, walls);
      }
      // escarpe: labio iluminado sobre el borde
      el('path', { d: `M${P2(Lr)} Q${P2([Lr[0] + W * .05, top[1]])} ${P2(top)} Q${P2([Rr[0] - W * .05, top[1]])} ${P2(Rr)}`,
        stroke: '#f1d2a0', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round', transform: 'translate(0,-2)' }, walls);
      // canal de salida y abanico de sedimentos
      el('ellipse', { cx: end[0] + 3, cy: end[1] + 4, rx: W * .38, ry: W * .12, fill: '#e3b781', opacity: .6, filter: 'url(#soft3)' }, fans);
      el('path', { d: `M${P2(out)} Q${f((out[0] + end[0]) / 2 - 4)},${f((out[1] + end[1]) / 2)} ${P2(end)}`, stroke: '#e0b27a', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', transform: 'translate(-1.5,0)' }, walls);
      el('path', { d: `M${P2(out)} Q${f((out[0] + end[0]) / 2 - 4)},${f((out[1] + end[1]) / 2)} ${P2(end)}`, stroke: '#3a1f0e', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, walls);
    });
  })();

  // humo del incendio
  const sm = $('#smoke');
  for (let i = 0; i < 10; i++) {
    const c = el('circle', { cx: 750 + rnd() * 180, cy: 430 + rnd() * 60, r: 14 + rnd() * 12, fill: '#8d8780' }, sm);
    c.style.animationDelay = (-rnd() * 5.5).toFixed(2) + 's';
  }
  // etiquetas de los modos de fallo
  for (const [flag, z] of Object.entries(Z)) {
    const gg = layer($('#degLabels'), flag, 'L', 1.2);
    P.pill(gg, z.lx, z.ly, z.label, { size: 24 });
  }

  // ================= Escena 4 · La hipótesis =================
  const s4 = $('#s4');
  el('rect', { width: 1600, height: 900, fill: '#f6efe2', opacity: .84 }, layer(s4, 'dim'));
  text(layer(s4, 'hyp1'), 800, 400, 'No nos falta ciencia ni técnica.', { 'text-anchor': 'middle', 'font-size': 56, fill: '#4d4232' });
  const h2 = layer(s4, 'hyp2');
  const t2 = text(h2, 800, 495, 'Nos falta la mirada compleja.', { 'text-anchor': 'middle', 'font-size': 66, 'font-weight': 700, fill: INK });
  const ast = layer(s4, 'ast');
  const xEnd = 800 + (t2.getComputedTextLength ? t2.getComputedTextLength() : 960) / 2;
  text(ast, xEnd + 6, 478, '*', { 'font-size': 110, 'font-weight': 700, fill: '#b0662a' });
  text(ast, xEnd - 10, 560, '*matizable', { 'text-anchor': 'middle', 'font-size': 30, 'font-style': 'italic', fill: '#b0662a' });

  P.steps([
    { id: '1.1', off: ['veil', 'foto1', 'foto2', 'lema'], on: ['q1'] },
    { id: '2.1', off: ['q1'], on: ['village'] },
    { id: '2.2', on: ['p_lena'] },
    { id: '2.3', on: ['p_past'] },
    { id: '2.4', on: ['p_caza'] },
    { id: '2.5', on: ['p_seta'] },
    { id: '2.6', on: ['p_ocio'] },
    { id: '2.7', on: ['q2'] },
    { id: '3.1', off: ['q2'], on: ['fire'] },
    { id: '3.2', on: ['erosion'] },
    { id: '3.3', on: ['decline'] },
    { id: '3.4', on: ['q3'] },
    { id: '4.1', off: ['fire', 'erosion', 'decline', 'q3'], on: ['dim', 'hyp1'] },
    { id: '4.2', on: ['hyp2'] },
    { id: '4.3', on: ['ast'] },
  ]);
})();
