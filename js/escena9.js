// Escena 9 · Presentación de los retos (9.1–9.6)
// Sigue el velo oscuro de la escena 8 («v8dark»).
(() => {
  const { $, el, layer, text } = P;
  const g9 = $('#s9');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b', INK = '#2a2118';
  const mid = { 'text-anchor': 'middle' };

  // 9.2 · arriba
  text(layer(g9, 'viaje'), 800, 140, 'Ahora jugaremos a viajar en el tiempo', { ...mid, 'font-size': 58, 'font-weight': 700, fill: AMBER });

  // 9.3 · debajo
  const r1 = layer(g9, 'reto1');
  ['Trataremos de adivinar qué habrían dicho los tres autores anteriores',
   'ante un reto que abordaron nuestros antecesores:',
   'las repoblaciones forestales en España de los años 1940s']
    .forEach((l, k) => text(r1, 800, 240 + k * 48, l, { ...mid, 'font-size': 34, 'font-weight': k === 2 ? 700 : 500, fill: CREAM }));

  // 9.4 · debajo
  text(layer(g9, 'reto2'), 800, 430, 'Después aplicaremos lo aprendido al Reglamento de Restauración Europeo de 2024',
    { ...mid, 'font-size': 34, 'font-weight': 500, fill: CREAM });

  // 9.5 · el capitán a posteriori, en SE (imagen sin fondo, 640×383)
  const CW = 560, CH = 383 * CW / 640, CX = 1010, CY = 555;
  el('image', { href: 'imagenes/capitan_posteriori.png', x: CX, y: CY, width: CW, height: CH }, layer(g9, 'capitan', 'pop'));
  const mouth = [CX + 262 * CW / 640, CY + 295 * CW / 640];

  // 9.6 · bocadillo de cómic que sale de su boca
  const b = layer(g9, 'bocadillo', 'pop');
  const bx = 300, by = 545, bw = 700, bh = 150;
  const tail = `M${bx + bw - 190},${by + bh - 2} L${mouth[0] - 16},${mouth[1] - 8} L${bx + bw - 70},${by + bh - 2} Z`;
  el('rect', { x: bx, y: by, width: bw, height: bh, rx: 40, fill: '#fffdf6', stroke: INK, 'stroke-width': 4 }, b);
  el('path', { d: tail, fill: '#fffdf6', stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, b);
  el('rect', { x: bx + bw - 186, y: by + bh - 8, width: 112, height: 8, fill: '#fffdf6' }, b); // tapa la junta cola-globo
  text(b, bx + bw / 2, by + 62, 'Esto no es trabajo mío, es una técnica', { ...mid, 'font-size': 34, 'font-weight': 600, fill: INK });
  const l2 = text(b, bx + bw / 2, by + 108, 'llamada ', { ...mid, 'font-size': 34, 'font-weight': 600, fill: INK });
  el('tspan', { 'font-weight': 800, fill: '#b0662a' }, l2).textContent = '«extracción de lecciones»';

  P.steps([
    { id: '9.1', off: ['reglas', 'fmeadows', 'fdorner', 'fostrom', 'aportes'] },
    { id: '9.2', on: ['viaje'] },
    { id: '9.3', on: ['reto1'] },
    { id: '9.4', on: ['reto2'] },
    { id: '9.5', on: ['capitan'] },
    { id: '9.6', on: ['bocadillo'] },
  ]);
})();
