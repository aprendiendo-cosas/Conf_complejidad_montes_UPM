// Escena 10 · Primer reto: las repoblaciones (10.1–10.35)
// 10.5 hace aparecer el panel de las características; 10.14 y 10.19 son clics sin cambio visual.
(() => {
  const { $, el, layer, text, arc, pill } = P;
  const g10 = $('#s10');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b', GOOD = '#a8d672', BAD = '#f0906a', DARK = '#1b1711';
  const mid = { 'text-anchor': 'middle' };

  // Fondos nuevos dentro del paisaje (así también los vería la lente de las gafas), con fundido lento
  const land = $('#landscape'), before = $('#smoke');
  [['bg3', 'imagenes/fondo_3_erosion.jpg'], ['bg4', 'imagenes/fondo_4_repoblacion.jpg']].forEach(([flag, href]) => {
    const g = el('g', { class: 'L Lslow', 'data-on': flag }, land);
    land.insertBefore(g, before);
    el('image', { href, x: 0, y: 0, width: 1600, height: 900, preserveAspectRatio: 'xMidYMid slice' }, g);
  });

  // Banda superior: 10.2 / 10.11 / 10.25 (misma franja); 10.4 y su panel, hacia el centro de la imagen
  el('rect', { x: 0, y: 30, width: 1600, height: 92, fill: DARK, opacity: .8 }, layer(g10, 'band10'));
  text(layer(g10, 't102'), 800, 92, 'Este paisaje podía tener este aspecto en 1940', { ...mid, 'font-size': 48, 'font-weight': 700, fill: AMBER });
  text(layer(g10, 't1011'), 800, 92, 'El resultado lo representa bien esta imagen', { ...mid, 'font-size': 48, 'font-weight': 700, fill: AMBER });
  text(layer(g10, 't1025'), 800, 90, '¿Qué dirían nuestros expertos en sistemas sobre este proceso de regeneración?', { ...mid, 'font-size': 37, 'font-weight': 700, fill: AMBER });
  const t4 = layer(g10, 't104');
  el('rect', { x: 0, y: 318, width: 1600, height: 66, fill: DARK, opacity: .8 }, t4);
  text(t4, 800, 362, 'En 1940 se puso en marcha el plan de Villanueva y Esteva, con las siguientes características:', { ...mid, 'font-size': 32, 'font-weight': 500, fill: CREAM });

  // 10.6–10.9 · características del plan, en un panel bajo el rótulo 10.4
  el('rect', { x: 0, y: 384, width: 1600, height: 270, fill: DARK, opacity: .8 }, layer(g10, 'panel10a'));
  const bullet = (flag, x, y, str, size = 34, color = AMBER) => {
    const g = layer(g10, flag);
    el('circle', { cx: x, cy: y - size * .33, r: 7, fill: color }, g);
    text(g, x + 26, y, str, { 'font-size': size, 'font-weight': 500, fill: CREAM });
  };
  ['Repoblar 6 MHas con objetivo protector y productor',
   'El Estado podía firmar consorcios obligatorios con ayuntamientos para repoblar',
   'Sin participación de los actores locales',
   'Débiles indicadores de éxito: superficie repoblada']
    .forEach((s, i) => bullet('c' + (i + 6), 230, 448 + i * 60, s));

  // 10.13–10.23 · balance sobre el pinar denso, en un panel centrado
  el('rect', { x: 150, y: 160, width: 1300, height: 578, rx: 24, fill: DARK, opacity: .82 }, layer(g10, 'panel10b'));
  text(layer(g10, 'hpos'), 800, 222, 'Resultados positivos:', { ...mid, 'font-size': 40, 'font-weight': 700, fill: GOOD });
  ['Se cortó la «hemorragia» de suelo en nuestros montes',
   'En algunas zonas se produjo madera',
   'La superficie forestal aumentó considerablemente']
    .forEach((s, i) => bullet('pos' + (i + 1), 210, 282 + i * 50, s, 29, GOOD));
  text(layer(g10, 'hneg'), 800, 482, 'Efectos negativos:', { ...mid, 'font-size': 40, 'font-weight': 700, fill: BAD });
  ['No se han realizado los tratamientos necesarios en muchos de estos pinares',
   'Elevada vulnerabilidad frente a plagas, incendios, decaimiento, etc.',
   'Poca capacidad de proveer servicios',
   'En el plano social, poco apego de los actores locales al territorio']
    .forEach((s, i) => bullet('neg' + (i + 1), 210, 542 + i * 50, s, 29, BAD));


  // ================= Con las gafas puestas (10.26–10.35) =================
  // 10.26 · las gafas aparecen y se abren de golpe (como 5.1–5.2) y el paisaje se oscurece un poco (como 5.3)
  { const v = layer(g10, 'gl10', 'L', 2.2); g10.insertBefore(v, g10.firstChild);   // por debajo de los rótulos
    el('rect', { width: 1600, height: 900, fill: DARK, opacity: .5 }, v); }
  const defs = $('#defs');
  const mk = (id, color) => { const m = el('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m); };
  mk('arrBad10', BAD); mk('arrAmb10', AMBER);

  // 10.27 · título arriba y, debajo, cuadro de diales: uno al máximo y el resto a cero (quietos)
  const tt = layer(g10, 'tit10');
  el('rect', { x: 0, y: 30, width: 1600, height: 140, fill: DARK, opacity: .8 }, tt);
  text(tt, 800, 88, 'Dörner y Meadows criticarían poner el foco en maximizar pocos componentes del sistema', { ...mid, 'font-size': 35, 'font-weight': 700, fill: AMBER });
  text(tt, 800, 140, 'Esto genera hipertrofias y atrofias que hacen el sistema poco sostenible', { ...mid, 'font-size': 29, 'font-weight': 500, fill: CREAM });
  const dl = layer(g10, 'dials', 'L', 1);
  el('rect', { x: 170, y: 690, width: 1260, height: 192, rx: 22, fill: DARK, opacity: .85 }, dl);
  const DIALS = [['Suelo y madera', 84, 84], ['Biodiversidad', -84, -84], ['Pastos y ganado', -84, -84],
                 ['Empleo local', -84, -84], ['Resiliencia', -84, -84]];
  const DX = i => 300 + i * 250, DY = 800, R = 66;
  DIALS.forEach(([lab, a0, a1], i) => {
    const cx = DX(i), main = i === 0;
    el('path', { d: `M${cx - R},${DY} A${R},${R} 0 0 1 ${cx + R},${DY}`, stroke: '#5a4c39', 'stroke-width': 12, fill: 'none', 'stroke-linecap': 'round' }, dl);
    el('path', { d: `M${cx + R * Math.cos(-Math.PI / 6)},${DY + R * Math.sin(-Math.PI / 6)} A${R},${R} 0 0 1 ${cx + R},${DY}`, stroke: BAD, 'stroke-width': 12, fill: 'none', opacity: .55 }, dl);
    const nd = el('g', { class: 'needle10', style: `--a0:${a0}deg; --a1:${a1}deg; transform-origin:${cx}px ${DY}px` }, dl);
    el('line', { x1: cx, y1: DY, x2: cx, y2: DY - R + 8, stroke: main ? AMBER : CREAM, 'stroke-width': 5, 'stroke-linecap': 'round' }, nd);
    el('circle', { cx, cy: DY, r: 8, fill: main ? AMBER : CREAM }, dl);
    text(dl, cx, DY + 46, lab, { ...mid, 'font-size': 23, 'font-weight': main ? 800 : 500, fill: main ? AMBER : CREAM });
  });

  // 10.28 · rótulos de los efectos de segundo orden sobre el pinar (sin flechas)
  const ef = layer(g10, 'efectos');
  [[[560, 470], 'plagas'], [[880, 380], 'incendios'], [[1200, 540], 'abandono rural']].forEach(([to, lab]) =>
    pill(ef, to[0], to[1], lab, { size: 30, bg: '#5a1f12', color: '#ffd9c8' }));

  // 10.30 · decisión balística: parábola que entra desde fuera del encuadre y cae en la ladera
  const bal = layer(g10, 'balis');
  const LAND = [720, 600];
  el('path', { d: `M-40,330 Q330,-170 ${LAND[0]},${LAND[1]}`, stroke: AMBER, 'stroke-width': 6, fill: 'none', 'stroke-dasharray': '18 12', 'marker-end': 'url(#arrAmb10)' }, bal);
  [34, 22].forEach((r, k) => el('ellipse', { cx: LAND[0], cy: LAND[1] + 8, rx: r * 1.6, ry: r * .55, fill: 'none', stroke: AMBER, 'stroke-width': 3, opacity: k ? .9 : .5 }, bal));
  pill(bal, 360, 660, 'decisión balística (tirarse un triple)', { size: 30, bg: DARK, color: AMBER });

  // 10.31 · las consecuencias no las sufren los decisores: flecha larga que sale hacia «Madrid»
  const mad = layer(g10, 'madrid');
  el('path', { d: arc([LAND[0] + 40, LAND[1] - 20], [1585, 236], -.12), stroke: CREAM, 'stroke-width': 5, fill: 'none', 'marker-end': 'url(#arrAmb10)', 'stroke-dasharray': '4 0' }, mad);
  pill(mad, 1580, 200, 'Madrid', { size: 32, anchor: 'end', bg: DARK, color: CREAM });

  // 10.32 · exceso de control central: un nodo conectado a todas las decisiones
  const cc = layer(g10, 'central');
  const C = [800, 500], SAT = [[[400, 330], '¿Dónde plantar?'], [[1200, 330], '¿Qué especies?'], [[400, 690], '¿Qué usos?'], [[1200, 690], '¿Cómo involucrar?']];
  SAT.forEach(([p]) => el('line', { x1: C[0], y1: C[1], x2: p[0], y2: p[1], stroke: AMBER, 'stroke-width': 4, opacity: .85 }, cc));
  SAT.forEach(([p, lab]) => pill(cc, p[0], p[1] + 10, lab, { size: 30, bg: DARK, color: CREAM }));
  el('circle', { cx: C[0], cy: C[1], r: 92, fill: '#3a2a14', stroke: AMBER, 'stroke-width': 5 }, cc);
  text(cc, C[0], C[1] - 6, 'Control', { ...mid, 'font-size': 32, 'font-weight': 800, fill: AMBER });
  text(cc, C[0], C[1] + 30, 'central', { ...mid, 'font-size': 32, 'font-weight': 800, fill: AMBER });

  // 10.34 · gobierno policéntrico: el nodo se divide en círculos anidados
  const pc = layer(g10, 'anidados');
  el('circle', { cx: C[0], cy: C[1], r: 250, fill: '#24303a', 'fill-opacity': .82, stroke: '#7fb3d9', 'stroke-width': 5 }, pc);
  text(pc, C[0], C[1] - 178, 'Estado', { ...mid, 'font-size': 36, 'font-weight': 800, fill: '#a9d2f0' });
  text(pc, C[0], C[1] - 140, 'escala · dinero · técnica', { ...mid, 'font-size': 27, 'font-weight': 500, fill: CREAM });
  el('circle', { cx: C[0], cy: C[1] + 40, r: 130, fill: '#2f3a1e', 'fill-opacity': .9, stroke: GOOD, 'stroke-width': 5 }, pc);
  text(pc, C[0], C[1] + 22, 'Comunidad', { ...mid, 'font-size': 34, 'font-weight': 800, fill: GOOD });
  text(pc, C[0], C[1] + 60, 'reglas · vigilancia', { ...mid, 'font-size': 26, 'font-weight': 500, fill: CREAM });
  text(pc, C[0], C[1] + 92, 'memoria', { ...mid, 'font-size': 26, 'font-weight': 500, fill: CREAM });

  // 10.35 · el peso del pasado: bancales y carboneras reaparecen bajo el pinar
  const pas = layer(g10, 'pasado');
  for (let k = 0; k < 6; k++) {
    const y0 = 455 + k * 38, x0 = 170 + k * 12, x1 = 660 - k * 6;
    const d = `M${x0},${y0 + 18} C${x0 + 140},${y0 + 4} ${x1 - 200},${y0 - 24} ${x1},${y0 - 30}`;
    el('path', { d, stroke: '#3a2614', 'stroke-width': 7, fill: 'none', opacity: .55, transform: 'translate(0,4)' }, pas);
    el('path', { d, stroke: '#e8c48c', 'stroke-width': 4, fill: 'none', 'stroke-dasharray': '10 5', opacity: .95 }, pas);
  }
  [[960, 520], [1080, 470], [1010, 610], [1180, 560]].forEach(([x, y]) => {
    el('ellipse', { cx: x, cy: y, rx: 34, ry: 13, fill: '#1e1610', stroke: '#8a6a44', 'stroke-width': 3 }, pas);
    el('ellipse', { cx: x, cy: y - 2, rx: 18, ry: 6, fill: '#3b2c1f' }, pas);
  });
  pill(pas, 420, 420, 'bancales', { size: 30, bg: DARK, color: '#f0d4a4' });
  pill(pas, 1070, 420, 'carboneras', { size: 30, bg: DARK, color: '#f0d4a4' });

  const s9 = ['viaje', 'reto1', 'reto2', 'capitan', 'bocadillo', 'v8dark'];
  const people = ['p_lena', 'p_past', 'p_caza', 'p_seta', 'p_ocio'];
  P.steps([
    { id: '10.1', off: [...s9, ...people] },          // fondo del momento 2.1: paisaje con pueblo, sin personas
    { id: '10.2', on: ['band10', 't102'] },
    { id: '10.3', on: ['bg3'] },
    { id: '10.4', on: ['t104'] },
    { id: '10.5', on: ['panel10a'] },
    { id: '10.6', on: ['c6'] },
    { id: '10.7', on: ['c7'] },
    { id: '10.8', on: ['c8'] },
    { id: '10.9', on: ['c9'] },
    { id: '10.10', off: ['t104', 'panel10a', 'c6', 'c7', 'c8', 'c9'] },
    { id: '10.11', off: ['t102'], on: ['t1011'] },
    { id: '10.12', off: ['bg3'], on: ['bg4'] },
    { id: '10.13', on: ['panel10b', 'hpos'] },
    { id: '10.14' },
    { id: '10.15', on: ['pos1'] },
    { id: '10.16', on: ['pos2'] },
    { id: '10.17', on: ['pos3'] },
    { id: '10.18', on: ['hneg'] },
    { id: '10.19' },
    { id: '10.20', on: ['neg1'] },
    { id: '10.21', on: ['neg2'] },
    { id: '10.22', on: ['neg3'] },
    { id: '10.23', on: ['neg4'] },
    { id: '10.24', off: ['panel10b', 'hpos', 'pos1', 'pos2', 'pos3', 'hneg', 'neg1', 'neg2', 'neg3', 'neg4'] },
    { id: '10.25', off: ['t1011'], on: ['t1025'] },
    { id: '10.26', off: ['band10', 't1025'], on: ['gl10'] },
    { id: '10.27', on: ['tit10', 'dials'] },
    { id: '10.28', on: ['efectos'] },
    { id: '10.29' },                                   // los diales se quedan quietos
    { id: '10.30', off: ['tit10', 'dials', 'efectos'], on: ['balis'] },
    { id: '10.31', on: ['madrid'] },
    { id: '10.32', off: ['balis', 'madrid'], on: ['central'] },
    { id: '10.33' },
    { id: '10.34', off: ['central'], on: ['anidados'] },
    { id: '10.35', off: ['anidados'], on: ['pasado'] },
  ]);
})();
