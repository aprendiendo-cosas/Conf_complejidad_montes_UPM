// Escena 10 · Primer reto: las repoblaciones (10.1–10.50)
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


  // ================= Con las gafas puestas (10.26–10.50) =================
  // 10.26 · las gafas aparecen y se abren de golpe (como 5.1–5.2) y el paisaje se oscurece un poco (como 5.3)
  { const v = layer(g10, 'gl10', 'L', 2.2); g10.insertBefore(v, g10.firstChild);   // por debajo de los rótulos
    el('rect', { width: 1600, height: 900, fill: DARK, opacity: .5 }, v); }
  const defs = $('#defs');
  const mk = (id, color) => { const m = el('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m); };
  mk('arrBad10', BAD); mk('arrAmb10', AMBER); mk('arrEst10', '#a9d2f0'); mk('arrCr10', CREAM);

  // 10.27 · título arriba; 10.28 · cuadro de diales: uno al máximo y el resto a cero (quietos)
  const tt = layer(g10, 'tit10');
  el('rect', { x: 0, y: 30, width: 1600, height: 140, fill: DARK, opacity: .8 }, tt);
  text(tt, 800, 88, 'Dörner y Meadows criticarían poner el foco en maximizar pocos componentes del sistema', { ...mid, 'font-size': 35, 'font-weight': 700, fill: AMBER });
  text(tt, 800, 140, 'Esto genera hipertrofias y atrofias que hacen el sistema poco sostenible', { ...mid, 'font-size': 29, 'font-weight': 500, fill: CREAM });
  const dl = layer(g10, 'dials');
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

  // 10.29 · rótulos de los efectos de segundo orden sobre el pinar (sin flechas)
  const ef = layer(g10, 'efectos');
  [[[560, 470], 'plagas'], [[880, 380], 'incendios'], [[1200, 540], 'abandono rural']].forEach(([to, lab]) =>
    pill(ef, to[0], to[1], lab, { size: 30, bg: '#5a1f12', color: '#ffd9c8' }));

  // título de bloque con el estilo del 10.27 (banda arriba, título ámbar y subtítulo crema)
  const titleBand = (flag, t1, t2) => {
    const g = layer(g10, flag);
    el('rect', { x: 0, y: 30, width: 1600, height: 140, fill: DARK, opacity: .8 }, g);
    text(g, 800, t2 ? 88 : 112, t1, { ...mid, 'font-size': 34, 'font-weight': 700, fill: AMBER });
    if (t2) text(g, 800, 140, t2, { ...mid, 'font-size': 29, 'font-weight': 500, fill: CREAM });
  };

  // ---- Meadows y Dörner (10.32–10.36) ----
  titleBand('titMead', 'Meadows diría que la forma de decidir lo que se hizo peca de exceso de control central');
  // 10.33 · nodo «Estado», lejos del bosque (arriba a la derecha)
  const E = [1440, 330], ER = 78;
  const est = layer(g10, 'estado');
  el('circle', { cx: E[0], cy: E[1], r: ER, fill: '#24303a', stroke: '#7fb3d9', 'stroke-width': 5 }, est);
  text(est, E[0], E[1] + 12, 'Estado', { ...mid, 'font-size': 34, 'font-weight': 800, fill: '#a9d2f0' });
  // 10.34 · flechas a las cuatro decisiones
  const fq = layer(g10, 'estQ');
  const toward = (from, to, d) => { const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy); return [from[0] + dx / L * d, from[1] + dy / L * d]; };
  // rótulos cerca del Estado, con letra algo menor
  [[[1440, 212], '¿Dónde plantar?'], [[1195, 248], '¿Qué especies?'], [[1215, 452], '¿Qué usos?'], [[1455, 466], '¿Cómo evaluar?']].forEach(([q, lab]) => {
    el('path', { d: `M${toward(E, q, ER + 4)} L${toward(q, E, 24)}`, stroke: '#a9d2f0', 'stroke-width': 3.5, fill: 'none', 'marker-end': 'url(#arrEst10)' }, fq);
    pill(fq, q[0], q[1] + 8, lab, { size: 24, bg: DARK, color: CREAM });
  });
  // 10.35 · decisión balística: flecha del Estado al centro del bosque, con círculos concéntricos
  const LAND = [800, 470];
  const bal = layer(g10, 'balis');
  el('path', { d: `M${E[0] - ER},${E[1]} Q1080,230 ${LAND[0] + 20},${LAND[1] - 14}`, stroke: AMBER, 'stroke-width': 6, fill: 'none', 'stroke-dasharray': '18 12', 'marker-end': 'url(#arrAmb10)' }, bal);
  [34, 22].forEach((r, k) => el('ellipse', { cx: LAND[0], cy: LAND[1] + 8, rx: r * 1.6, ry: r * .55, fill: 'none', stroke: AMBER, 'stroke-width': 3, opacity: k ? .9 : .5 }, bal));
  pill(bal, 610, 545, 'Decisión balística', { size: 30, bg: DARK, color: AMBER });
  // 10.36 · del punto de caída al pueblo: las consecuencias no las sufren los que deciden
  const pu = layer(g10, 'alPueblo');
  el('path', { d: arc([LAND[0] + 40, LAND[1] + 14], [1220, 700], -.18), stroke: BAD, 'stroke-width': 5, fill: 'none', 'marker-end': 'url(#arrBad10)' }, pu);
  // rótulo en dos líneas centradas, por debajo de la flecha
  el('rect', { x: 620, y: 600, width: 400, height: 84, rx: 22, fill: '#5a1f12', opacity: .85 }, pu);
  text(pu, 820, 634, 'Los que deciden', { ...mid, 'font-size': 28, 'font-weight': 600, fill: '#ffd9c8' });
  text(pu, 820, 670, 'no sufren las consecuencias', { ...mid, 'font-size': 28, 'font-weight': 600, fill: '#ffd9c8' });

  // ---- Ostrom: gobierno policéntrico (10.38–10.43) ----
  const EQ = E, EQR = ER;                           // el Estado: mismo círculo y posición que en 10.33
  const eq = layer(g10, 'estQuarter');
  el('circle', { cx: EQ[0], cy: EQ[1], r: EQR, fill: '#24303a', stroke: '#7fb3d9', 'stroke-width': 5 }, eq);
  text(eq, EQ[0], EQ[1] + 12, 'Estado', { ...mid, 'font-size': 34, 'font-weight': 800, fill: '#a9d2f0' });
  // sus atributos, alrededor del círculo (dentro no caben a un tamaño legible)
  const eqw = layer(g10, 'estWords');
  [['escala', 1440, 212], ['dinero', 1295, 330], ['ciencia-técnica', 1440, 466]].forEach(([w, x, y]) =>
    pill(eqw, x, y + 8, w, { size: 24, bg: '#24303a', color: '#cfe6f7' }));
  const CM = [990, 690], CMR = 125;                 // la comunidad, junto al pueblo
  const cm = layer(g10, 'comunidad');
  el('circle', { cx: CM[0], cy: CM[1], r: CMR, fill: '#2f3a1e', 'fill-opacity': .9, stroke: GOOD, 'stroke-width': 5 }, cm);
  text(cm, CM[0], CM[1] - 42, 'Comunidad', { ...mid, 'font-size': 32, 'font-weight': 800, fill: GOOD });
  const cmw = layer(g10, 'comWords');
  ['reglas', 'vigilancia', 'memoria'].forEach((w, k) => text(cmw, CM[0], CM[1] + 2 + k * 34, w, { ...mid, 'font-size': 27, 'font-weight': 500, fill: CREAM }));
  const lk = layer(g10, 'enlace');
  el('path', { d: `M${toward(CM, EQ, CMR + 10)} L${toward(EQ, CM, EQR + 14)}`, stroke: CREAM, 'stroke-width': 6, fill: 'none', 'marker-start': 'url(#arrCr10)', 'marker-end': 'url(#arrCr10)' }, lk);
  titleBand('titOstrom', 'Ostrom nos propondría alternativas de gobernanza que reducirían los problemas anteriores', 'Gobierno policéntrico');

  // ---- Ellos ya lo intuían (10.45–10.50) ----
  titleBand('titEmp', 'Buena parte de las críticas anteriores ya estaban presentes de manera empírica...');
  el('rect', { x: 110, y: 205, width: 1380, height: 380, rx: 24, fill: DARK, opacity: .85 }, layer(g10, 'panelEmp'));
  [['e46', 'En 1939, Ceballos y Ximénez de Embún redactaron un plan mucho más integrador.', 280],
   ['e47', 'Se aplicó uno más centrado en pocos objetivos.', 345],
   ['e48', 'Algunas citas de Ceballos y Ximénez de Embún:', 410]].forEach(([f, str, y]) => bullet(f, 220, y, str, 32, AMBER));
  [['e49', '«Repoblar mucho como sea y donde sea, pero mucho»', 480], ['e50', '«Organización sindical de la propiedad»', 545]].forEach(([f, str, y]) => {
    const g = layer(g10, f);
    el('rect', { x: 290, y: y - 34, width: 6, height: 44, fill: AMBER }, g);
    text(g, 314, y, str, { 'font-size': 34, 'font-weight': 600, 'font-style': 'italic', fill: AMBER });
  });

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
    { id: '10.27', on: ['tit10'] },
    { id: '10.28', on: ['dials'] },
    { id: '10.29', on: ['efectos'] },
    { id: '10.30' },                                   // los diales se quedan quietos
    { id: '10.31', off: ['tit10', 'dials', 'efectos'] },
    { id: '10.32', on: ['titMead'] },
    { id: '10.33', on: ['estado'] },
    { id: '10.34', on: ['estQ'] },
    { id: '10.35', on: ['balis'] },
    { id: '10.36', on: ['alPueblo'] },
    { id: '10.37', off: ['titMead', 'estado', 'estQ', 'balis', 'alPueblo'] },
    { id: '10.38', on: ['titOstrom'] },
    { id: '10.39', on: ['estQuarter'] },
    { id: '10.40', on: ['estWords'] },
    { id: '10.41', on: ['comunidad'] },
    { id: '10.42', on: ['comWords'] },
    { id: '10.43', on: ['enlace'] },
    { id: '10.44', off: ['titOstrom', 'estQuarter', 'estWords', 'comunidad', 'comWords', 'enlace'] },
    { id: '10.45', on: ['titEmp'] },
    { id: '10.46', on: ['panelEmp', 'e46'] },
    { id: '10.47', on: ['e47'] },
    { id: '10.48', on: ['e48'] },
    { id: '10.49', on: ['e49'] },
    { id: '10.50', on: ['e50'] },
  ]);
})();
