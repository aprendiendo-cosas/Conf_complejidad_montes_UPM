// Escena 8 · Hay reglas: Dörner, Meadows, Ostrom (8.1–8.6)
// Sobre el paisaje velado en claro (el velo «dim» de la escena 4 sigue encendido desde 7.13).
(() => {
  const { $, el, layer, text } = P;
  const g8 = $('#s8');
  const INK = '#2e2416', RUST = '#b0662a', MUTED = '#5c4b36';

  // 8.1 · rótulo arriba
  const tt = layer(g8, 'reglas');
  text(tt, 800, 92, 'La buena noticia es que disponemos de reglas', { 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 700, fill: INK });
  text(tt, 800, 148, 'para bailar con sistemas complejos', { 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 700, fill: RUST });

  // 8.2 · recuadro central
  el('rect', { x: 110, y: 192, width: 1380, height: 690, rx: 26, fill: '#fffdf8', opacity: .72, stroke: MUTED, 'stroke-width': 2.5 }, layer(g8, 'caja'));

  // ficha: retrato sin fondo + nombre + datos, en columna (O y E) o en fila (S)
  function ficha(flag, img, name, lines, { x, y, size, row }) {
    const g = layer(g8, flag);
    el('image', { href: 'imagenes/' + img, x: x - size / 2, y, width: size, height: size, preserveAspectRatio: 'xMidYMax meet' }, g);
    const tx = row ? x + size / 2 + 26 : x, ty = row ? y + 70 : y + size + 42, anchor = row ? 'start' : 'middle';
    text(g, tx, ty, name, { 'text-anchor': anchor, 'font-size': 34, 'font-weight': 700, fill: INK });
    lines.forEach((l, k) => text(g, tx, ty + 40 + k * 32, l, { 'text-anchor': anchor, 'font-size': 24, 'font-weight': 500, fill: MUTED }));
  }
  ficha('fmeadows', 'retrato_donella.png', 'Donella Meadows', ['1941–2001', 'Pensamiento sistémico', 'Jerarquías de escala'], { x: 1255, y: 215, size: 250 });
  ficha('fdorner', 'retrato_dorner.png', 'Dietrich Dörner', ['1938', 'Psicólogo · Mundos simulados', 'Formas de equivocarse al decidir'], { x: 345, y: 215, size: 250 });
  ficha('fostrom', 'retrato_ostrom.png', 'Elinor Ostrom', ['1933–2012 · Nobel de Economía 2009', 'Bienes comunales y formas de gobernanza'], { x: 640, y: 618, size: 245, row: true });

  // 8.6 · qué aporta cada uno, en el hueco entre las tres fichas
  const sint = layer(g8, 'aportes');
  [['Dörner', ' explica cómo nace el comportamiento', 'de la persona que decide.'],
   ['Meadows', ' explica las consecuencias sistémicas', 'de esas decisiones.'],
   ['Ostrom', ' propone formas de gobernanza', 'que evitan problemas.']].forEach(([who, a, b], k) => {
    const y = 290 + k * 104;
    const t = text(sint, 800, y, '', { 'text-anchor': 'middle', 'font-size': 29, 'font-weight': 500, fill: INK });
    el('tspan', { 'font-weight': 800, fill: RUST }, t).textContent = who;
    el('tspan', {}, t).textContent = a;
    text(sint, 800, y + 38, b, { 'text-anchor': 'middle', 'font-size': 29, 'font-weight': 500, fill: INK });
  });

  P.steps([
    { id: '8.1', off: ['hypnew'], on: ['reglas'] },
    { id: '8.2', on: ['caja'] },
    { id: '8.3', on: ['fmeadows'] },
    { id: '8.4', on: ['fdorner'] },
    { id: '8.5', on: ['fostrom'] },
    { id: '8.6', on: ['aportes'] },
  ]);
})();
