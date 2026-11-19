// Escena 11 · El Reglamento Europeo de Restauración y conclusión (11.1–11.25)
// Reutiliza de la escena 10 las gafas («gl10»), los fondos («bg3», «bg4») y el círculo del Estado («estQuarter», «estWords»).
(() => {
  const { $, el, layer, text } = P;
  const { limb, shade, head, sheep, SKIN } = P.fig;
  const g11 = $('#s11');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b', GOOD = '#a8d672', DARK = '#1b1711';
  const mid = { 'text-anchor': 'middle' };
  const defs = $('#defs');
  { const m = el('marker', { id: 'arrCr11', viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: CREAM }, m); }
  const toward = (from, to, d) => { const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy); return [from[0] + dx / L * d, from[1] + dy / L * d]; };

  // rótulo claro, como las etiquetas de la escena 2 pero más grande; admite varias líneas
  const label = (p, x, y, lines, size = 22) => {
    lines = [].concat(lines);
    const w = Math.max(...lines.map(l => l.length)) * size * .53 + size * 1.3, h = lines.length * size * 1.25 + size * .7;
    el('rect', { x: x - w / 2, y, width: w, height: h, rx: Math.min(h / 2, 18), fill: '#fffaf0', opacity: .93 }, p);
    lines.forEach((l, k) => text(p, x, y + size * 1.15 + k * size * 1.25, l, { ...mid, 'font-size': size, 'font-weight': 600, fill: '#3c3a33' }));
  };

  // 11.2 · título y subtítulo (estilo del 10.27); 11.19 · rótulo debajo
  const tt = layer(g11, 'tit11');
  el('rect', { x: 0, y: 30, width: 1600, height: 140, fill: DARK, opacity: .8 }, tt);
  text(tt, 800, 88, 'El Reglamento Europeo de Restauración (2024) nos pone ante un reto parecido al anterior', { ...mid, 'font-size': 34, 'font-weight': 700, fill: AMBER });
  text(tt, 800, 140, 'Veamos las consecuencias que tendría aplicar lo aprendido', { ...mid, 'font-size': 29, 'font-weight': 500, fill: CREAM });
  const sb = layer(g11, 'sub11');
  el('rect', { x: 0, y: 170, width: 1600, height: 58, fill: DARK, opacity: .8 }, sb);
  text(sb, 800, 210, 'Quizás con suerte el resultado se parezca a esto:', { ...mid, 'font-size': 30, 'font-weight': 600, 'font-style': 'italic', fill: AMBER });

  // 11.5 · los diales del 10.28, ahora todos a un nivel medio (quietos)
  const dl = layer(g11, 'dials11');
  el('rect', { x: 170, y: 690, width: 1260, height: 192, rx: 22, fill: DARK, opacity: .85 }, dl);
  [['Suelo y madera', 12], ['Biodiversidad', -8], ['Pastos y ganado', 6], ['Empleo local', -14], ['Resiliencia', 2]].forEach(([lab, a], i) => {
    const cx = 300 + i * 250, DY = 800, R = 66;
    el('path', { d: `M${cx - R},${DY} A${R},${R} 0 0 1 ${cx + R},${DY}`, stroke: '#5a4c39', 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' }, dl);
    el('path', { d: `M${cx + R * Math.cos(-Math.PI / 6)},${DY + R * Math.sin(-Math.PI / 6)} A${R},${R} 0 0 1 ${cx + R},${DY}`, stroke: '#f0906a', 'stroke-width': 12, fill: 'none', opacity: .55 }, dl);
    el('line', { x1: cx, y1: DY, x2: cx, y2: DY - R + 8, stroke: CREAM, 'stroke-width': 5, 'stroke-linecap': 'round', transform: `rotate(${a} ${cx} ${DY})` }, dl);
    el('circle', { cx, cy: DY, r: 8, fill: CREAM }, dl);
    text(dl, cx, DY + 46, lab, { ...mid, 'font-size': 23, 'font-weight': 500, fill: CREAM });
  });

  // 11.8–11.10 · Comunidad (más arriba y algo más pequeña que en 10.41, para no tocar los diales) y su enlace con el Estado
  const E = [1440, 330], ER = 78, CM = [990, 535], CMR = 100;
  const cm = layer(g11, 'com11');
  el('circle', { cx: CM[0], cy: CM[1], r: CMR, fill: '#2f3a1e', 'fill-opacity': .9, stroke: GOOD, 'stroke-width': 5 }, cm);
  text(cm, CM[0], CM[1] - 32, 'Comunidad', { ...mid, 'font-size': 28, 'font-weight': 800, fill: GOOD });
  const cmw = layer(g11, 'comW11');
  ['reglas', 'vigilancia', 'memoria'].forEach((w, k) => text(cmw, CM[0], CM[1] + 4 + k * 29, w, { ...mid, 'font-size': 23, 'font-weight': 500, fill: CREAM }));
  el('path', { d: `M${toward(CM, E, CMR + 10)} L${toward(E, CM, ER + 14)}`, stroke: CREAM, 'stroke-width': 6, fill: 'none', 'marker-start': 'url(#arrCr11)', 'marker-end': 'url(#arrCr11)' }, layer(g11, 'link11'));

  // ---------- 11.12–11.17 · lo que podría pasar en el territorio (sobre la ladera erosionada) ----------
  const fig = (flag, x, y, s) => { const o = el('g', { transform: `translate(${x},${y}) scale(${s})` }, g11); return layer(o, flag, 'pop'); };
  const blob = (p, cx, cy, rx, ry, fill, stroke) => {
    const pts = Array.from({ length: 10 }, (_, k) => { const a = k / 10 * Math.PI * 2, j = 1 + .14 * Math.sin(k * 2.3 + cx);
      return [cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]; });
    el('path', { d: P.smooth(pts), fill, 'fill-opacity': .45, stroke, 'stroke-width': 3, 'stroke-opacity': .85 }, p);
  };

  // 11.12 · dos repoblaciones del Ayuntamiento
  const o1 = layer(g11, 'o1');
  blob(o1, 380, 395, 120, 48, '#7fbf4a', '#cdeea0');
  blob(o1, 720, 322, 105, 42, '#7fbf4a', '#cdeea0');
  label(o1, 610, 438, 'Repoblación mantenida por el Ayuntamiento');

  // 11.13 · repoblación de la empresa X
  const o2 = layer(g11, 'o2');
  blob(o2, 1060, 420, 95, 38, '#4db6c4', '#b5eef5');
  label(o2, 1100, 300, ['Repoblación financiada por la empresa X', 'para compensar emisiones']);

  // 11.14 · las repoblaciones como centros de dispersión de semillas: tres flechas curvas desde cada una, sin rótulo
  { const m = el('marker', { id: 'arrSeed11', viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 4.5, markerHeight: 4.5, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#d6f5a8' }, m); }
  const seeds = layer(g11, 'seeds');
  // todas hacia abajo (hacia el territorio), sin tocar los rótulos: [mancha, ángulos (0° = este, 90° = abajo), longitud]
  [[[380, 395, 120, 48], [125, 148, 168], 55], [[720, 322, 105, 42], [55, 90, 125], 46], [[1060, 420, 95, 38], [45, 90, 135], 55]].forEach(([[cx, cy, rx, ry], angs, len]) =>
    angs.forEach((a, k) => {
      const t = a * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      const A = [cx + rx * .95 * c, cy + ry * .95 * s], B = [A[0] + len * c, A[1] + len * s];
      const p = el('path', { d: P.arc(A, B, k % 2 ? -.35 : .35), fill: 'none', stroke: '#d6f5a8', 'stroke-width': 3.5, 'stroke-linecap': 'round',
        'marker-end': 'url(#arrSeed11)', class: 'draw', 'data-on': 'seeds', pathLength: 1 }, seeds);
      p.style.setProperty('--d', (k * .15) + 's');
    }));

  // 11.15 · colmenas
  const o3 = fig('o3', 230, 575, 1.5);
  shade(o3, 0, 50);
  [[-36, '#e3b14a'], [-12, '#d98f3a'], [12, '#e3b14a'], [36, '#c97b34']].forEach(([x, c]) => {
    el('rect', { x: x - 9, y: -19, width: 18, height: 19, fill: c, stroke: '#6e4c2a', 'stroke-width': 1 }, o3);
    el('rect', { x: x - 10.5, y: -23, width: 21, height: 4.5, fill: '#5a4632' }, o3);
    el('rect', { x: x - 3, y: -4, width: 6, height: 2, fill: '#3a2a18' }, o3);
  });
  [[-20, -34], [4, -40], [26, -31], [-30, -42], [18, -46]].forEach(([x, y]) => el('circle', { cx: x, cy: y, r: 1.6, fill: '#2a2014' }, o3));
  label(o3, 0, 12, 'Aprovechamientos apícolas locales', 15);

  // 11.16 · rebaño junto a las encinas, con carga ajustada (pocas ovejas)
  const o4 = fig('o4', 210, 735, 1.4);
  [[0, 0, 1], [30, -6, .95], [58, 2, 1], [20, 12, 1.05], [84, -4, .92]].forEach(([x, y, s], k) => sheep(o4, x, y, s, k % 2 ? -1 : 1));
  label(o4, 42, 22, 'Ganadería con carga ajustada', 15);

  // 11.17 · cazador sembrando pasto para los conejos
  const o5 = fig('o5', 560, 640, 1.5);
  el('ellipse', { cx: 38, cy: 2, rx: 34, ry: 7, fill: '#8fcf5a', opacity: .55 }, o5);
  [[18, 0], [28, 3], [40, -1], [50, 3], [60, 0]].forEach(([x, y]) => limb(o5, [[x, y], [x - 2, y - 6]], '#5f9a35', 1.6));
  shade(o5, 0, 14);
  limb(o5, [[-6, -1], [-3, -13], [-1, -25]], '#6a5a3c', 6); limb(o5, [[8, -1], [5, -13], [2, -25]], '#6a5a3c', 6);
  limb(o5, [[-9, -1], [-4, -1]], '#3a2b1f', 4.2); limb(o5, [[6, -1], [11, -1]], '#3a2b1f', 4.2);
  el('path', { d: 'M-8,-24 C-9.5,-32 -9,-41 -6.5,-47 L6.5,-47 C9,-41 9.5,-32 8,-24 Z', fill: '#4f5e33' }, o5);
  el('path', { d: 'M-12,-36 L-4,-44 L-1,-26 L-12,-24 Z', fill: '#c9b38a', stroke: '#8a7350', 'stroke-width': .8 }, o5); // saco de semilla
  limb(o5, [[5, -44], [16, -42], [24, -46]], '#4f5e33', 4.6);                     // brazo lanzando
  el('circle', { cx: 25, cy: -46.5, r: 2.6, fill: SKIN }, o5);
  [[30, -44], [35, -38], [40, -32], [44, -24], [33, -30], [38, -20], [46, -14]].forEach(([x, y]) => el('circle', { cx: x, cy: y, r: 1.3, fill: '#e8d6a0' }, o5));
  head(o5, 1, -53, 'brim', '#3b4a26');
  const rab = el('g', { transform: 'translate(70,-1)' }, o5);                      // un conejo que se acerca
  el('ellipse', { cx: 0, cy: -5, rx: 7, ry: 5, fill: '#9a7a58' }, rab); el('circle', { cx: 6, cy: -9, r: 3.6, fill: '#9a7a58' }, rab);
  el('ellipse', { cx: 6, cy: -16, rx: 1.4, ry: 4.5, fill: '#9a7a58' }, rab); el('circle', { cx: -7, cy: -6, r: 2, fill: '#f3eee4' }, rab);
  label(o5, 30, 12, ['Regeneración de zonas', 'de alimentación de conejo'], 15);

  // 11.18 · guía con un grupo: evaluación de resultados y gestión adaptativa
  const o6 = fig('o6', 1020, 690, 1.35);
  const person = (x, body, hat, hc, s = 1) => {
    const p = el('g', { transform: `translate(${x},0) scale(${s})` }, o6);
    shade(p, 0, 11);
    limb(p, [[-4, -1], [-3, -20]], '#3d4757', 5); limb(p, [[4, -1], [3, -20]], '#3d4757', 5);
    el('path', { d: 'M-7,-19 C-8,-27 -7,-35 -5,-39 L5,-39 C7,-35 8,-27 7,-19 Z', fill: body }, p);
    el('rect', { x: -9, y: -36, width: 5, height: 13, rx: 2, fill: '#5a4632' }, p);   // mochila
    head(p, 0, -45, hat, hc);
  };
  person(26, '#c0603f', 'hair', '', .9); person(44, '#3f7ab0', 'cap', '#2e4a6b', .92);
  person(62, '#d1a93f', 'beanie', '#7a3b2e', .88); person(80, '#6b8f4a', 'hair', '', .9);
  // guía, de cara al grupo y señalando la ladera
  shade(o6, -6, 13);
  limb(o6, [[-10, -1], [-8, -24]], '#4a3b2b', 6); limb(o6, [[-2, -1], [-4, -24]], '#4a3b2b', 6);
  el('path', { d: 'M-15,-22 C-16,-31 -15,-41 -12,-46 L0,-46 C3,-41 4,-31 3,-22 Z', fill: '#2f6b4f' }, o6);
  limb(o6, [[-12, -43], [-24, -52], [-34, -58]], '#2f6b4f', 4.6);                 // brazo señalando
  el('circle', { cx: -35, cy: -59, r: 2.5, fill: SKIN }, o6);
  limb(o6, [[-1, -43], [3, -33], [1, -26]], '#2f6b4f', 4.6);
  // tablilla en la otra mano
  el('rect', { x: -1, y: -37, width: 12, height: 15, rx: 1.5, fill: '#8a6238', stroke: '#4e3620', 'stroke-width': .8, transform: 'rotate(-12 5 -30)' }, o6);
  el('rect', { x: 1, y: -34, width: 8, height: 10, fill: '#f6f0e2', transform: 'rotate(-12 5 -30)' }, o6);
  [-31, -28.5, -26].forEach(y => el('line', { x1: 2.5, y1: y, x2: 7.5, y2: y, stroke: '#7a7060', 'stroke-width': .6, transform: 'rotate(-12 5 -30)' }, o6));
  el('rect', { x: 3, y: -38.5, width: 4, height: 2.5, fill: '#b9b1a1', transform: 'rotate(-12 5 -30)' }, o6);
  head(o6, -6, -52, 'brim', '#6b5536');
  label(o6, 30, 12, ['Actividades de evaluación de resultados', '→ Gestión adaptativa'], 15);

  // 11.24 · se vela el fondo; 11.25 · conclusión en el centro (retoma el lema de la portada)
  el('rect', { width: 1600, height: 900, fill: DARK, opacity: .45 }, layer(g11, 'veil11', 'L', 0));   // 11.24 · velo suave
  const cc = layer(g11, 'concl');                                                                        // 11.25 · conclusión
  el('rect', { width: 1600, height: 900, fill: DARK, opacity: .5 }, cc);                                 // algo más de velo para leerla
  text(cc, 800, 420, 'Saber es hacer.', { ...mid, 'font-size': 76, 'font-weight': 800, fill: AMBER });
  text(cc, 800, 510, 'Y hoy, saber es mirar el sistema entero.', { ...mid, 'font-size': 54, 'font-weight': 700, fill: CREAM });

  // ---------- pasos ----------
  const s10on = [...new Set(P.STEPS.filter(s => s.id.startsWith('10.')).flatMap(s => s.on || []))].filter(f => f !== 'bg4' && f !== 'bg3');
  const people = ['p_lena', 'p_past', 'p_caza', 'p_seta', 'p_ocio'];
  const vec = ['dials11', 'estQuarter', 'estWords', 'com11', 'comW11', 'link11'];
  const objs = ['o1', 'o2', 'seeds', 'o3', 'o4', 'o5', 'o6'];
  P.steps([
    { id: '11.1', off: s10on },                       // todo lo de la escena 10, gafas incluidas
    { id: '11.2', on: ['tit11'] },
    { id: '11.3', off: ['bg4'], on: ['bg3'] },
    { id: '11.4', on: ['gl10'] },
    { id: '11.5', on: ['dials11'] },
    { id: '11.6', on: ['estQuarter'] },
    { id: '11.7', on: ['estWords'] },
    { id: '11.8', on: ['com11'] },
    { id: '11.9', on: ['comW11'] },
    { id: '11.10', on: ['link11'] },
    { id: '11.11', off: vec },
    { id: '11.12', on: ['o1'] },
    { id: '11.13', on: ['o2'] },
    { id: '11.14', on: ['seeds'] },
    { id: '11.15', on: ['o3'] },
    { id: '11.16', on: ['o4'] },
    { id: '11.17', on: ['o5'] },
    { id: '11.18', on: ['o6'] },
    { id: '11.19', off: objs },
    { id: '11.20', on: ['sub11'] },
    { id: '11.21', off: ['bg3', 'gl10'] },             // fondo 2 (bosque con pueblo); se quitan las gafas
    { id: '11.22', on: people },
    { id: '11.23', off: ['tit11', 'sub11'] },           // quedan solo las personas
    { id: '11.24', on: ['veil11'] },
    { id: '11.25', on: ['concl'] },
  ]);
})();
