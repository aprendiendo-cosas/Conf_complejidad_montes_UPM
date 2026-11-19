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
  // bloque de texto en la parte alta; abajo, el faldón de logos sobre una franja blanca
  text(t, 800, 240, 'Retos de restaurar la naturaleza', { 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 800, fill: '#2e2416' });
  text(t, 800, 335, 'en un mundo complejo', { 'text-anchor': 'middle', 'font-size': 84, 'font-weight': 800, fill: '#2e2416' });
  text(t, 800, 405, 'Curro Bonet García · Área de Ecología · Universidad de Córdoba',
    { 'text-anchor': 'middle', 'font-size': 30, 'font-weight': 700, fill: '#3f3324' });
  el('line', { x1: 335, x2: 1265, y1: 465, y2: 465, stroke: '#9a8b72', 'stroke-width': 2 }, t);
  // nombre del centro, más pequeño para dejar sitio al faldón (sin textLength: apretaba las letras)
  text(t, 800, 522, 'Escuela Técnica Superior de Ingeniería de Montes, Forestal y del Medio Natural',
    { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 700, 'letter-spacing': .4, fill: '#3f3324' });
  text(t, 800, 562, 'Universidad Politécnica de Madrid',
    { 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 700, 'letter-spacing': .4, fill: '#3f3324' });
  // faldón de logos (1117×119), sobre una franja blanca que funde con su fondo
  const FW = 1460, FH = FW * 119 / 1117, FY = 900 - FH - 22;
  el('rect', { x: 0, y: FY - 22, width: 1600, height: 900 - FY + 22, fill: '#ffffff' }, t);
  el('line', { x1: 0, x2: 1600, y1: FY - 22, y2: FY - 22, stroke: '#d9cfbd', 'stroke-width': 2 }, t);
  el('image', { href: 'imagenes/faldon.jpeg', x: (1600 - FW) / 2, y: FY, width: FW, height: FH }, t);

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
