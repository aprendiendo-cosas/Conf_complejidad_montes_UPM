// Escena 10 · Primer reto: las repoblaciones (10.1–10.23)
// 10.5 hace aparecer el panel de las características; 10.14 y 10.19 son clics sin cambio visual.
(() => {
  const { $, el, layer, text } = P;
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

  // Banda superior: 10.2 / 10.11 (misma franja) y 10.4 justo debajo
  el('rect', { x: 0, y: 30, width: 1600, height: 92, fill: DARK, opacity: .8 }, layer(g10, 'band10'));
  text(layer(g10, 't102'), 800, 92, '«Este paisaje podía tener este aspecto en 1940»', { ...mid, 'font-size': 48, 'font-weight': 700, fill: AMBER });
  text(layer(g10, 't1011'), 800, 92, 'El resultado lo representa bien esta imagen', { ...mid, 'font-size': 48, 'font-weight': 700, fill: AMBER });
  const t4 = layer(g10, 't104');
  el('rect', { x: 0, y: 122, width: 1600, height: 66, fill: DARK, opacity: .8 }, t4);
  text(t4, 800, 166, 'En 1940 se puso en marcha el plan de Villanueva y Esteva, con las siguientes características:', { ...mid, 'font-size': 32, 'font-weight': 500, fill: CREAM });

  // 10.6–10.9 · características del plan, en un panel bajo la banda
  el('rect', { x: 0, y: 188, width: 1600, height: 270, fill: DARK, opacity: .8 }, layer(g10, 'panel10a'));
  const bullet = (flag, x, y, str, size = 34, color = AMBER) => {
    const g = layer(g10, flag);
    el('circle', { cx: x, cy: y - size * .33, r: 7, fill: color }, g);
    text(g, x + 26, y, str, { 'font-size': size, 'font-weight': 500, fill: CREAM });
  };
  ['Repoblar 6 MHas con objetivo protector y productor',
   'El Estado podía firmar consorcios obligatorios con ayuntamientos para repoblar',
   'Sin participación de los actores locales',
   'Débiles indicadores de éxito: superficie repoblada']
    .forEach((s, i) => bullet('c' + (i + 6), 230, 252 + i * 60, s));

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
  ]);
})();
