// Escena 0 · Portada
(() => {
  const { $, el, layer, text } = P;
  const g = $('#s0');
  const INK = '#3a2e1f';

  // velo sobre el bosque
  el('rect', { width: 1600, height: 900, fill: '#f6efe2', opacity: .58 }, layer(g, 'veil'));

  // título, autor y evento, centrados; en la portada el velo es más opaco para que se lean bien
  const t = layer(g, 'title');
  el('rect', { width: 1600, height: 900, fill: '#f6efe2', opacity: .62 }, t);
  const halo = { stroke: '#fbf6ec', 'stroke-width': 8, 'paint-order': 'stroke', 'stroke-linejoin': 'round' };
  text(t, 800, 355, 'Retos de restaurar la naturaleza', Object.assign({ 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 700, fill: '#2e2416' }, halo));
  text(t, 800, 450, 'en un mundo complejo', Object.assign({ 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 700, fill: '#2e2416' }, halo));
  text(t, 800, 520, 'Francisco Javier Bonet García · Área de Ecología · Universidad de Córdoba',
    Object.assign({ 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 500, fill: '#3f3324' }, halo));
  el('line', { x1: 235, x2: 1365, y1: 650, y2: 650, stroke: '#6f604a', 'stroke-width': 2 }, t);
  // nombre del evento: por concretar en la escaleta; ocupa el ancho del título
  text(t, 800, 700, 'ETSI de Montes, Forestal y del Medio Natural · Universidad Politécnica de Madrid · 19 de noviembre de 2026',
    Object.assign({ 'text-anchor': 'middle', 'font-size': 27, 'font-weight': 500, fill: '#3f3324', textLength: 1130, lengthAdjust: 'spacing' }, halo));

  // fotos de las dos sedes, como fotos sobre la mesa
  function photo(flag, href, cx, cy, w, h, rot) {
    const p = layer(g, flag, 'photo');
    p.style.setProperty('--r', rot + 'deg');
    const b = 14;
    el('rect', { x: cx - w / 2 - b, y: cy - h / 2 - b, width: w + 2 * b, height: h + 2 * b + 10, fill: '#fbf8f1', filter: 'url(#shadow)' }, p);
    el('image', { href, x: cx - w / 2, y: cy - h / 2, width: w, height: h, preserveAspectRatio: 'xMidYMid slice' }, p);
  }
  photo('foto1', 'imagenes/escuela_montes_1.jpg', 450, 520, 600, 378, -4);
  photo('foto2', 'imagenes/escuela_montes_2.jpg', 1160, 540, 640, 372, 3);

  // lema de la Escuela, arriba, sobre las dos fotos
  const lema = layer(g, 'lema', 'L', .6);
  text(lema, 800, 170, '«Saber es hacer»', { 'text-anchor': 'middle', 'font-size': 76, 'font-style': 'italic', 'font-weight': 600,
    fill: INK, 'font-family': 'Georgia, "Times New Roman", serif' });

  P.steps([
    { id: '0.0', on: ['veil', 'title'] },
    { id: '0.1', off: ['title'] },
    { id: '0.2', on: ['foto1'] },
    { id: '0.3', on: ['foto2', 'lema'] },
  ]);
})();
