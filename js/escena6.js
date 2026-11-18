// Escena 6 · Problemas retorcidos (6.1–6.6e)
(() => {
  const { $, el, layer, text } = P;
  const g6 = $('#s6');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b';

  // 6.3 · banda centrada sobre el paisaje
  const se = layer(g6, 'sesb');
  el('rect', { x: 0, y: 372, width: 1600, height: 150, fill: '#1b1711', opacity: .78 }, se);
  text(se, 800, 470, '«No era un bosque, sino un socioecosistema»', { 'text-anchor': 'middle', 'font-size': 62, 'font-weight': 700, fill: CREAM });

  // 6.5 · velo oscuro y rótulo arriba
  el('rect', { width: 1600, height: 900, fill: '#1b1711', opacity: .8 }, layer(g6, 'wdim'));
  const wt = layer(g6, 'wtitle');
  text(wt, 800, 150, 'Los problemas de los socioecosistemas', { 'text-anchor': 'middle', 'font-size': 58, 'font-weight': 700, fill: CREAM });
  text(wt, 800, 222, 'son perversos (wicked)', { 'text-anchor': 'middle', 'font-size': 58, 'font-weight': 700, fill: AMBER });

  // 6.6a–e · características, una por clic, bajo el rótulo y en letra más pequeña
  const CAR = [
    ['Son difícilmente formulables porque dependen', 'de intereses de personas y colectivos'],
    ['Cada problema es único'],
    ['Cada decisión es irreversible. No hay ensayo sin consecuencias'],
    ['Las soluciones no son verdaderas o falsas, sino mejores o peores'],
    ['No se resuelven. Se gestionan'],
  ];
  let y = 340;
  CAR.forEach((lines, i) => {
    const last = i === CAR.length - 1;
    const g = layer(g6, 'w' + (i + 1));
    if (last) y += 30;
    const size = last ? 46 : 36;
    el('circle', { cx: 222, cy: y - size * .33, r: 8, fill: AMBER }, g);
    lines.forEach((l, k) => text(g, 250, y + k * 46, l, { 'font-size': size, 'font-weight': last ? 700 : 500, fill: last ? AMBER : CREAM }));
    y += lines.length * 46 + 30;
  });

  // 6.1 · vuelve la vista sistémica del inicio de la escena 5: se apaga todo lo que encendió la escena 5 salvo las gafas
  const keep = new Set(['glasses', 'lensfull']);
  const s5flags = [...new Set(P.STEPS.filter(s => s.id.startsWith('5.')).flatMap(s => s.on || []))].filter(f => !keep.has(f));

  P.steps([
    { id: '6.1', off: s5flags },
    { id: '6.2' },
    { id: '6.3', on: ['sesb'] },
    { id: '6.4', off: ['sesb'] },
    { id: '6.5', on: ['wdim', 'wtitle'] },
    { id: '6.6a', on: ['w1'] },
    { id: '6.6b', on: ['w2'] },
    { id: '6.6c', on: ['w3'] },
    { id: '6.6d', on: ['w4'] },
    { id: '6.6e', on: ['w5'] },
  ]);
})();
