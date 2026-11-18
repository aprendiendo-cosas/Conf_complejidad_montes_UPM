// Escena 5 · Las gafas de la complejidad (5.1–5.61)
(() => {
  const { $, el, layer, text, smooth, arc, pill } = P;
  const g5 = $('#s5'), defs = $('#defs');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b';
  const C_FIS = '#ffe14d', C_FUN = '#ff8a4c', C_CTL = '#5fd0ff';   // jerarquía física, funcional y de control

  // marcadores de flecha
  const marker = (id, color, size = 6) => {
    const m = el('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: size, markerHeight: size, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m);
  };
  marker('arrCream', CREAM, 5); marker('arrCtl', C_CTL, 4.2);

  // ================= Qué es un sistema (5.3–5.16) =================
  el('rect', { width: 1600, height: 900, fill: '#1b1711', opacity: .8 }, layer(g5, 'sysdark'));

  const diagram = el('g', { id: 'diagram' }, g5);
  // definición en NE; en 5.4 se reduce y sube
  const def = el('g', { id: 'def' }, diagram);
  const defL = layer(def, 'def');
  el('rect', { x: 870, y: 40, width: 700, height: 190, rx: 20, fill: '#2a2319', opacity: .85, stroke: AMBER, 'stroke-opacity': .5, 'stroke-width': 2 }, defL);
  ['Un sistema es un conjunto de elementos', 'que interactúan entre sí para satisfacer', 'un propósito concreto.'].forEach((l, i) =>
    text(defL, 900, 100 + i * 50, l, { 'font-size': 34, fill: CREAM }));

  // ejes desde el origen
  const O = [860, 560];
  const axis = (flag, to, labels, lx, ly, anchor, delay = 0) => {
    const g = el('g', {}, diagram);
    const p = el('path', { class: 'draw', 'data-on': flag, pathLength: 1, d: `M${O} L${to}`, stroke: CREAM, 'stroke-width': 4, fill: 'none', 'marker-end': 'url(#arrCream)' }, g);
    p.style.setProperty('--d', delay + 's');
    const t = layer(g, flag, 'L', .8 + delay);
    labels.forEach((s, i) => text(t, lx, ly + i * 32, s, { 'text-anchor': anchor, 'font-size': 26, 'font-weight': 600, fill: CREAM }));
  };

  // cono de propiedades (va debajo de los ejemplos)
  const cone = layer(diagram, 'cone', 'L');
  (() => {
    const Cc = [370, 230], w = 150, th = 46;
    const dx = Cc[0] - O[0], dy = Cc[1] - O[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const ang = Math.atan2(ny, nx) * 180 / Math.PI;
    const P1 = [Cc[0] + nx * w, Cc[1] + ny * w], P2 = [Cc[0] - nx * w, Cc[1] - ny * w];
    const lg = el('linearGradient', { id: 'gCone', gradientUnits: 'userSpaceOnUse', x1: P1[0], y1: P1[1], x2: P2[0], y2: P2[1] }, defs);
    [['0', '#a8641c'], ['.45', '#f5c56a'], ['.6', '#f8d68c'], ['1', '#8f5216']].forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, lg));
    el('path', { d: `M${O} L${P1} A${w},${th} ${ang} 0 0 ${P2} Z`, fill: 'url(#gCone)', opacity: .5, stroke: AMBER, 'stroke-width': 2 }, cone);
    el('ellipse', { cx: Cc[0], cy: Cc[1], rx: w, ry: th, transform: `rotate(${ang},${Cc[0]},${Cc[1]})`, fill: '#f5c56a', opacity: .28, stroke: '#f8d68c', 'stroke-width': 3 }, cone);
  })();

  // el primer eje espera a que se haya ido la definición (5.4)
  axis('ax1', [1500, 560], ['Diversidad de elementos'], 1500, 604, 'end', .9);
  axis('ax2', [545, 845], ['Diversidad de conexiones'], 580, 862, 'start');
  axis('ax3', [860, 150], ['Diversidad de información', 'transmitida por las conexiones'], 884, 188, 'start');

  // ejemplos en círculos (imágenes de 1024 px con el círculo dibujado de r ≈ 384)
  const disc = (flag, href, cx, cy, R) => {
    const id = 'clip' + flag;
    const cp = el('clipPath', { id }, defs); el('circle', { cx, cy, r: R }, cp);
    const g = layer(diagram, flag, 'pop'); g.style.transformOrigin = '50% 50%';
    const s = R / 372;
    el('circle', { cx, cy, r: R, fill: '#f6eedc' }, g);
    el('image', { href, x: cx - 512 * s, y: cy - 512 * s, width: 1024 * s, height: 1024 * s, 'clip-path': `url(#${id})` }, g);
    el('circle', { cx, cy, r: R, fill: 'none', stroke: AMBER, 'stroke-width': 4 }, g);
  };
  disc('vaso', 'imagenes/vaso_agua.png', O[0], O[1], 62);   // en el origen de los tres ejes
  disc('torm', 'imagenes/tormenta.jpg', 700, 380, 82);
  disc('coral', 'imagenes/coral.jpg', 370, 230, 118);

  // propiedades: escalera de arriba (autoorganización, junto al arrecife) abajo (resiliencia)
  const props = ['Autoorganización', 'No linealidad', 'Impredecibilidad', 'Adaptabilidad', 'Resiliencia'];
  props.forEach((s, i) => {
    const parent = i === 0 ? g5 : diagram;
    const g = layer(parent, 'pr' + (i + 1));
    const t = text(g, 40 + i * 36, 420 + i * 56, s, { 'font-size': 34, 'font-weight': 700, fill: AMBER,
      stroke: '#1b1711', 'stroke-width': 5, 'paint-order': 'stroke', 'stroke-linejoin': 'round' });
    if (i === 0) t.setAttribute('id', 'pr1');
    el('path', { d: `M${32 + i * 36},${432 + i * 56} h${s.length * 18} `, stroke: AMBER, 'stroke-width': 2, opacity: .45 }, g);
  });

  // ================= Autoorganización: la lupa (5.19–5.43) =================
  // El círculo de la lupa (centro 450,450; r 400) enseña 5_zoom_bosque.jpg (2048×1800) a escala 0,444,
  // centrado en el punto (1024,1000) de la imagen para que entren todos los animales.
  const LC = [450, 450], LR = 400, S = LR / 900, OX = LC[0] - 1024 * S, OY = LC[1] - 1000 * S;
  const toS = ([x, y]) => [OX + x * S, OY + y * S];

  // contorno del bosque en el paisaje general (fuera de la lupa): 5.24 y 5.34
  // los puntos del borde quedan fuera de la imagen y el contorno se recorta justo en su límite (clip 'imgClip')
  const FOREST = [[733, 288], [833, 290], [780, 344], [810, 392], [1027, 376], [996, 432], [940, 495], [1027, 537], [1246, 545],
    [1255, 595], [1121, 616], [1300, 640], [1640, 695], [1640, 940], [-40, 940], [-40, 347], [213, 326], [370, 430], [557, 420], [714, 370]];
  el('rect', { width: 1600, height: 900 }, el('clipPath', { id: 'imgClip' }, defs));

  const contour = (parent, flag, pts, color, isImg = true, extra = {}) => {
    const d = smooth(isImg ? pts.map(toS) : pts);
    el('path', { d, fill: 'none', stroke: '#1a140e', 'stroke-width': 9, opacity: .45, class: 'L', 'data-on': flag }, parent);
    el('path', Object.assign({ d, fill: 'none', stroke: color, 'stroke-width': 4.5, 'stroke-linejoin': 'round', class: 'draw', 'data-on': flag, pathLength: 1 }, extra), parent);
  };
  const label = (parent, flag, x, y, str, color, size = 24) => pill(layer(parent, flag, 'L', .5), x, y, str, { color, size });

  // contornos sobre el paisaje (debajo de la lupa)
  const land = el('g', { 'clip-path': 'url(#imgClip)' }, g5);
  contour(land, 'c_bosque', FOREST, C_FIS, false);
  label(land, 'l_com', 930, 245, 'Comunidades', C_FIS);
  contour(land, 'c_eco', FOREST, C_FUN, false);
  label(land, 'l_eco', 1180, 255, 'Ciclo hidrológico, producción de biomasa, etc.', C_FUN);

  // la lupa
  const lupa = layer(g5, 'lupa', 'grow');
  el('circle', { cx: LC[0], cy: LC[1], r: LR, fill: '#000', opacity: .35, filter: 'url(#soft2)', transform: 'translate(8,12)' }, lupa);
  const cp = el('clipPath', { id: 'lupaClip' }, defs); el('circle', { cx: LC[0], cy: LC[1], r: LR }, cp);
  const inside = el('g', { 'clip-path': 'url(#lupaClip)' }, lupa);
  el('circle', { cx: LC[0], cy: LC[1], r: LR, fill: '#5b3a22' }, inside);
  el('image', { href: 'imagenes/5_zoom_bosque.jpg', x: OX, y: OY, width: 2048 * S, height: 1800 * S }, inside);

  // 5.20–5.23 · poblaciones
  contour(inside, 'c_conejos', [[150, 1195], [300, 1185], [425, 1395], [590, 1430], [600, 1585], [260, 1605], [165, 1480], [125, 1330]], C_FIS);
  contour(inside, 'c_lobos', [[835, 1330], [1060, 1325], [1210, 1318], [1425, 1330], [1435, 1545], [1210, 1555], [1050, 1545], [835, 1545]], C_FIS);
  contour(inside, 'c_arboles', [[790, 470], [1000, 430], [1125, 560], [1180, 830], [1385, 890], [1390, 1180], [1255, 1295], [1000, 1265], [915, 1050], [790, 905], [760, 650]], C_FIS);
  label(inside, 'l_pobl', ...toS([1542, 596]), 'Poblaciones', C_FIS);

  // 5.29–5.33 · jerarquías funcionales
  contour(inside, 'c_prod', [[0, 1175], [0, 60], [140, 30], [265, 150], [300, 380], [600, 370], [680, 225], [765, 420], [1000, 445], [1285, 205],
    [1525, 245], [1645, 330], [1825, 295], [2048, 330], [2048, 1175], [1500, 1245], [1000, 1235], [500, 1175]], C_FUN);
  label(inside, 'l_prod', ...toS([697, 536]), 'Productores primarios', C_FUN);
  contour(inside, 'c_herb', [[160, 1180], [500, 1150], [700, 1140], [905, 1160], [905, 1335], [860, 1470], [600, 1605], [250, 1605], [150, 1420]], C_FUN);
  label(inside, 'l_herb', ...toS([648, 1660]), 'Herbívoros', C_FUN);
  contour(inside, 'c_depr', [[850, 1345], [1050, 1335], [1420, 1322], [1640, 1395], [1862, 1398], [1885, 1560], [1550, 1628], [1280, 1618], [1050, 1565], [850, 1555]], C_FUN);
  contour(inside, 'c_depr', Array.from({ length: 10 }, (_, i) => [1145 + Math.cos(i / 10 * 6.283) * 150, 250 + Math.sin(i / 10 * 6.283) * 130]), C_FUN);
  label(inside, 'l_depr', ...toS([1460, 1600]), 'Depredadores', C_FUN);

  // 5.38–5.40 · jerarquías de control (flechas)
  const shorten = (a, b, k) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
    return [[a[0] + dx / L * k, a[1] + dy / L * k], [b[0] - dx / L * k, b[1] - dy / L * k]]; };
  const arrow = (flag, a, b, bend, both = false, delay = 0) => {
    const [A, B] = shorten(toS(a), toS(b), 10), d = arc(A, B, bend);
    el('path', { d, fill: 'none', stroke: '#10202a', 'stroke-width': 8, opacity: .5, class: 'L', 'data-on': flag }, inside);
    const p = el('path', { d, fill: 'none', stroke: C_CTL, 'stroke-width': 4, class: 'draw', 'data-on': flag, pathLength: 1,
      'marker-end': 'url(#arrCtl)' }, inside);
    if (both) p.setAttribute('marker-start', 'url(#arrCtl)');
    p.style.setProperty('--d', delay + 's');
  };
  const PAIRS = [ // [depredador, presa, curvatura]
    [[1110, 330], [470, 1420], .12],   // águila → conejos
    [[1290, 1560], [580, 1545], -.25], // serpiente → conejos
    [[1080, 1370], [780, 1240], .25],  // lobos → ciervos
  ];
  PAIRS.forEach(([a, b, k], i) => arrow('a_down', a, b, k, false, i * .35));
  PAIRS.forEach(([a, b, k], i) => arrow('a_up', b, a, k, false, i * .35));   // mismo lado invertido = lado contrario
  arrow('a_comp', [1400, 1440], [1620, 1450], .3, true);    // lobos ↔ zorro
  arrow('a_comp', [290, 1240], [510, 1240], -.3, true, .3); // conejos ↔ ciervos

  // aro y mango de la lupa
  el('circle', { cx: LC[0], cy: LC[1], r: LR, fill: 'none', stroke: '#2b2520', 'stroke-width': 20 }, lupa);
  el('circle', { cx: LC[0], cy: LC[1], r: LR - 13, fill: 'none', stroke: '#fff', 'stroke-opacity': .22, 'stroke-width': 3 }, lupa);
  el('path', { d: 'M741,741 L852,852', stroke: '#2b2520', 'stroke-width': 40, 'stroke-linecap': 'round' }, lupa);
  el('path', { d: 'M770,770 L847,847', stroke: '#6b4a30', 'stroke-width': 26, 'stroke-linecap': 'round' }, lupa);

  // rótulos de control, fuera de la lupa y apilados a su derecha (dentro taparían las flechas)
  label(g5, 'l_down', 1090, 500, 'Control de arriba a abajo', C_CTL);
  label(g5, 'l_up', 1090, 555, 'Control de abajo a arriba', C_CTL);
  label(g5, 'l_comp', 1090, 610, 'Competencia interespecífica', C_CTL);
  label(g5, 'l_retro', 1195, 700, 'Retroalimentaciones compensadoras y reforzadoras', C_CTL, 30);

  // leyenda en NE: una fila por tipo de jerarquía
  const legRow = (flag, i, color, str, isArrow) => {
    const g = layer(g5, flag, 'L', .3), y = 30 + i * 54;
    el('rect', { x: 1190, y, width: 380, height: 50, rx: 12, fill: '#1f1a14', opacity: .85 }, g);
    if (isArrow === 'patch') el('path', { d: smooth([[1212, y + 25], [1236, y + 11], [1264, y + 18], [1260, y + 38], [1230, y + 40]]), fill: color, 'fill-opacity': .6, stroke: color, 'stroke-width': 2 }, g);
    else if (isArrow) el('path', { d: `M1210,${y + 25} L1262,${y + 25}`, stroke: color, 'stroke-width': 4, 'marker-end': 'url(#arrCtl)' }, g);
    else el('path', { d: smooth([[1212, y + 25], [1236, y + 13], [1262, y + 20], [1258, y + 36], [1230, y + 38]]), fill: 'none', stroke: color, 'stroke-width': 3.5 }, g);
    text(g, 1282, y + 33, str, { 'font-size': 23, 'font-weight': 600, fill: CREAM });
  };
  legRow('leg1', 0, C_FIS, 'Jerarquía física');
  legRow('leg2', 1, C_FUN, 'Jerarquías funcionales');
  legRow('leg3', 2, C_CTL, 'Jerarquías de control', true);
  legRow('leg4', 3, CREAM, 'Subsistemas', 'patch');

  // ================= Subsistemas y casi descomponibilidad (5.44–5.61) =================
  // flechas con punta de tamaño fijo en píxeles, para que las finas no se queden sin punta
  const markerPx = (id, color, px) => {
    const m = el('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: px, markerHeight: px, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m);
  };
  markerPx('arrSubA', CREAM, 30); markerPx('arrSubB', CREAM, 20); markerPx('arrSubC', CREAM, 15); markerPx('arrSubD', CREAM, 12);
  const C_SUELO = '#e07a5f', C_PLANT = '#b5f23d', C_ANIM = '#c77dff', C_ENC = '#4d8dff', C_MAT = '#f15bb5';

  // mancha semitransparente; pts en coordenadas de la imagen de la lupa (isImg) o de la pantalla
  const patch = (parent, flag, pts, color, isImg = true) => {
    const d = smooth(isImg ? pts.map(toS) : pts);
    el('path', { d, fill: color, 'fill-opacity': .38, stroke: color, 'stroke-width': 3, 'stroke-linejoin': 'round', class: 'L', 'data-on': flag }, parent);
  };
  // flecha bidireccional (a, b en pantalla)
  const biArrow = (parent, flag, a, b, bend, w, mk, delay = 0) => {
    const d = arc(a, b, bend);
    el('path', { d, fill: 'none', stroke: '#14100b', 'stroke-width': w + 4, opacity: .45, class: 'L', 'data-on': flag }, parent);
    const p = el('path', { d, fill: 'none', stroke: CREAM, 'stroke-width': w, 'stroke-linecap': 'round', class: 'draw', 'data-on': flag, pathLength: 1,
      'marker-start': `url(#${mk})`, 'marker-end': `url(#${mk})` }, parent);
    p.style.setProperty('--d', delay + 's');
  };

  // dentro de la lupa (debajo de los rótulos): suelo, plantas y animales terrestres
  const subIn = el('g', {}, inside);
  patch(subIn, 'm_suelo', [[-150, 1600], [500, 1585], [1000, 1600], [1500, 1585], [2200, 1600], [2200, 1950], [1000, 1980], [-150, 1950]], C_SUELO);
  patch(subIn, 'm_plant', [[0, 1175], [0, 60], [140, 30], [265, 150], [300, 380], [600, 370], [680, 225], [765, 420], [1000, 445], [1285, 205],
    [1525, 245], [1645, 330], [1825, 295], [2048, 330], [2048, 1175], [1500, 1245], [1000, 1235], [500, 1175]], C_PLANT);
  patch(subIn, 'm_anim', [[160, 1190], [500, 1150], [900, 1150], [1000, 1320], [1450, 1320], [1600, 1395], [1880, 1395], [1895, 1570],
    [1500, 1600], [1000, 1585], [600, 1595], [250, 1595], [140, 1440]], C_ANIM);
  label(subIn, 'l_suelo', 450, 752, 'Suelo', C_SUELO, 26);
  label(subIn, 'l_plant', ...toS([620, 430]), 'Plantas', C_PLANT, 26);
  label(subIn, 'l_anim', ...toS([1180, 1255]), 'Animales terrestres', C_ANIM, 26);

  // fuera de la lupa, sobre el paisaje (recortado a la imagen y debajo de la lupa)
  // la cumbre: silueta de la montaña principal en fondo_1_bosque.jpg, en coordenadas de pantalla
  const SKY = [[-40, 356], [119, 338], [232, 322], [344, 294], [457, 266], [658, 258], [745, 285], [833, 291], [996, 351], [1215, 398],
    [1309, 401], [1434, 438], [1640, 505]];
  const MAT = SKY.concat([[1640, 695], [1300, 640], [1121, 616], [1255, 595], [1246, 545], [1027, 537], [940, 495], [996, 432], [1027, 376],
    [810, 392], [780, 344], [833, 300], [733, 298], [714, 370], [557, 420], [370, 430], [213, 336]]);
  const subOut = el('g', { 'clip-path': 'url(#imgClip)' }, g5);
  g5.insertBefore(subOut, lupa);
  patch(subOut, 'm_enc', FOREST, C_ENC, false);
  el('path', { d: 'M' + MAT.map(p => p.join(',')).join(' L') + ' Z', fill: C_MAT, 'fill-opacity': .38, stroke: C_MAT, 'stroke-width': 3,
    'stroke-linejoin': 'round', class: 'L', 'data-on': 'm_mat' }, subOut);
  label(g5, 'l_enc', 985, 590, 'Encinar', C_ENC, 26);
  label(g5, 'l_mat', 1340, 578, 'Matorral de alta montaña', C_MAT, 26);

  // 5.57 · interacciones fuertes dentro de cada subsistema
  biArrow(subIn, 'a_sub', [300, 802], [600, 802], .08, 7, 'arrSubA');
  biArrow(subIn, 'a_sub', toS([380, 820]), toS([1500, 820]), -.12, 7, 'arrSubA', .2);
  biArrow(subIn, 'a_sub', toS([620, 1480]), toS([1450, 1470]), .1, 7, 'arrSubA', .4);
  biArrow(g5, 'a_sub', [895, 520], [1000, 440], .25, 7, 'arrSubA', .6);
  biArrow(g5, 'a_sub', [1170, 440], [1500, 520], -.1, 7, 'arrSubA', .8);
  // 5.58–5.60 · interacciones débiles entre subsistemas, cada vez más finas
  const weak = el('g', {}, g5);
  biArrow(weak, 'a_w1', toS([1720, 780]), [950, 545], .18, 3.2, 'arrSubB');
  biArrow(weak, 'a_w2', toS([1500, 330]), [1080, 410], -.2, 2, 'arrSubC');
  biArrow(weak, 'a_w3', toS([1600, 560]), [1420, 318], -.06, 1.2, 'arrSubD');

  // 5.61 · la ley, a la derecha de la lupa
  const law = layer(g5, 'ley');
  el('rect', { x: 880, y: 612, width: 700, height: 282, rx: 20, fill: '#1f1a14', opacity: .9, stroke: AMBER, 'stroke-opacity': .5, 'stroke-width': 2 }, law);
  text(law, 910, 666, 'Casi descomponibilidad', { 'font-size': 40, 'font-weight': 700, fill: AMBER });
  ['Las interacciones a corto plazo dentro de cada', 'subsistema son fuertes y frecuentes, mientras que',
    'las interacciones entre distintos subsistemas son', 'débiles pero no nulas, operando a escalas', 'temporales más lentas.'].forEach((l, i) =>
    text(law, 910, 716 + i * 38, l, { 'font-size': 26, fill: CREAM }));

  const DIAG = ['sysdark', 'def', 'defsmall', 'ax1', 'ax2', 'ax3', 'vaso', 'torm', 'coral', 'cone', 'pr1', 'pr2', 'pr3', 'pr4', 'pr5', 'prhi'];
  P.steps([
    { id: '5.1', off: ['dim', 'hyp1', 'hyp2', 'ast'], on: ['glasses'] },
    { id: '5.2', on: ['lensfull'] },
    { id: '5.3', on: ['sysdark', 'def'] },
    { id: '5.4', off: ['def'], on: ['ax1'] },
    { id: '5.5', on: ['ax2'] },
    { id: '5.6', on: ['ax3'] },
    { id: '5.7', on: ['vaso'] },
    { id: '5.8', on: ['torm'] },
    { id: '5.9', on: ['coral'] },
    { id: '5.10', on: ['cone'] },
    { id: '5.11', on: ['pr1'] },
    { id: '5.12', on: ['pr2'] },
    { id: '5.13', on: ['pr3'] },
    { id: '5.14', on: ['pr4'] },
    { id: '5.15', on: ['pr5'] },
    { id: '5.16', on: ['prhi'] },
    { id: '5.17', off: DIAG },
    { id: '5.18' },
    { id: '5.19', on: ['lupa'] },
    { id: '5.20', on: ['c_conejos'] },
    { id: '5.21', on: ['c_lobos'] },
    { id: '5.22', on: ['c_arboles'] },
    { id: '5.23', on: ['l_pobl'] },
    { id: '5.24', on: ['c_bosque'] },
    { id: '5.25', on: ['l_com'] },
    { id: '5.26', off: ['c_conejos', 'c_lobos', 'c_arboles', 'l_pobl', 'c_bosque', 'l_com'] },
    { id: '5.27', on: ['leg1'] },
    { id: '5.28' },
    { id: '5.29', on: ['c_prod'] },
    { id: '5.30', on: ['l_prod'] },
    { id: '5.31', on: ['c_herb'] },
    { id: '5.32', on: ['l_herb'] },
    { id: '5.33', on: ['c_depr', 'l_depr'] },
    { id: '5.34', on: ['c_eco'] },
    { id: '5.35', on: ['l_eco'] },
    { id: '5.36', off: ['c_prod', 'l_prod', 'c_herb', 'l_herb', 'c_depr', 'l_depr', 'c_eco', 'l_eco'] },
    { id: '5.37', on: ['leg2'] },
    { id: '5.38', on: ['a_down', 'l_down'] },
    { id: '5.39', on: ['a_up', 'l_up'] },
    { id: '5.40', on: ['a_comp', 'l_comp'] },
    { id: '5.41', on: ['l_retro'] },
    { id: '5.42', off: ['a_down', 'l_down', 'a_up', 'l_up', 'a_comp', 'l_comp', 'l_retro'] },
    { id: '5.43', on: ['leg3'] },
    { id: '5.44' },
    { id: '5.45', on: ['m_suelo'] },
    { id: '5.46', on: ['l_suelo'] },
    { id: '5.47', on: ['m_plant'] },
    { id: '5.48', on: ['l_plant'] },
    { id: '5.49', on: ['m_anim'] },
    { id: '5.50', on: ['l_anim'] },
    { id: '5.51', on: ['m_enc'] },
    { id: '5.52', on: ['l_enc'] },
    { id: '5.53', on: ['m_mat'] },
    { id: '5.54', on: ['l_mat'] },
    { id: '5.55', on: ['leg4'] },
    { id: '5.56' },
    { id: '5.57', on: ['a_sub'] },
    { id: '5.58', on: ['a_w1'] },
    { id: '5.59', on: ['a_w2'] },
    { id: '5.60', on: ['a_w3'] },
    { id: '5.61', on: ['ley'] },
  ]);
})();
