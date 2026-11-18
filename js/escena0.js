// Escena 0 · Portada
(() => {
  const { $, el, layer, text } = P;
  const g = $('#s0');
  const INK = '#3a2e1f';

  // velo sobre el bosque
  el('rect', { width: 1600, height: 900, fill: '#f6efe2', opacity: .58 }, layer(g, 'veil'));

  // título, autor y evento, centrados y en negrita; en la portada el velo es casi blanco para que resalten
  const t = layer(g, 'title');
  el('rect', { width: 1600, height: 900, fill: '#fbf8f2', opacity: .8 }, t);
  text(t, 800, 355, 'Retos de restaurar la naturaleza', { 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 800, fill: '#2e2416' });
  text(t, 800, 450, 'en un mundo complejo', { 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 800, fill: '#2e2416' });
  text(t, 800, 520, 'Francisco Javier Bonet García · Área de Ecología · Universidad de Córdoba',
    { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 700, fill: '#3f3324' });
  el('line', { x1: 235, x2: 1365, y1: 650, y2: 650, stroke: '#6f604a', 'stroke-width': 2 }, t);
  // nombre del centro, sin forzar el ancho (textLength apretaba las letras hasta montarlas)
  text(t, 800, 700, 'Escuela Técnica Superior de Ingeniería de Montes, Forestal y del Medio Natural',
    { 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 700, 'letter-spacing': .5, fill: '#3f3324' });

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
  const lema = layer(g, 'lema');
  text(lema, 800, 170, '«Saber es hacer»', { 'text-anchor': 'middle', 'font-size': 76, 'font-style': 'italic', 'font-weight': 600,
    fill: INK, 'font-family': 'Georgia, "Times New Roman", serif' });

  P.steps([
    { id: '0.0', on: ['veil', 'title'] },
    { id: '0.1', off: ['title'] },
    { id: '0.2', on: ['foto1'] },
    { id: '0.3', on: ['foto2'] },
    { id: '0.4', on: ['lema'] },
  ]);
})();
