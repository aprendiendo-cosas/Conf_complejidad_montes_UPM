// Escena 7 · Conocimiento tradicional y reformulación de la hipótesis (7.1–7.14)
(() => {
  const { $, el, layer, text, smooth, pill } = P;
  const g7 = $('#s7');
  const CREAM = '#f3e6c8', AMBER = '#f2b84b', INK = '#2e2416', RUST = '#b0662a';
  const f = v => v.toFixed(1);
  // curva abierta suave por los puntos (Catmull-Rom)
  const line = pts => { let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`; }
    return d; };

  // banda oscura arriba, sobre el cielo, para los rótulos de 7.2 y 7.4
  function band(flag, lines) {
    const g = layer(g7, flag);
    const h = 70 + lines.length * 62;
    el('rect', { x: 0, y: 40, width: 1600, height: h, fill: '#1b1711', opacity: .8 }, g);
    lines.forEach((l, k) => text(g, 800, 40 + 78 + k * 62, l, { 'text-anchor': 'middle', 'font-size': 46, 'font-weight': 700, fill: CREAM }));
    return g;
  }
  band('tmalos', ['¿Tan malos somos gestionando los recursos naturales?']);
  band('tsiglos', ['No. Llevamos siglos combinando saberes empíricos', 'con avances científicos para mejorar nuestra forma de gestión']);

  // 7.5 · acequia: sale del barranco central y corre hacia la izquierda, casi a nivel
  const AQ = [[805, 428], [760, 440], [700, 452], [630, 458], [555, 470], [480, 486], [410, 494], [340, 490], [270, 482], [200, 488], [130, 502], [70, 512]];
  const strip = [...AQ.map(([x, y], i) => [x, y + 6]),
    ...AQ.slice().reverse().map(([x, y], i) => [x, y + 34 + 16 * Math.sin(i * 1.7) + (i % 3) * 6])];
  const aqG = layer(g7, 'acequia');
  el('path', { d: smooth(strip), fill: '#9fd36a', opacity: .45, filter: 'url(#soft3)', style: 'mix-blend-mode:soft-light' }, layer(aqG, 'acequia', 'L', .9));
  el('path', { d: smooth(strip), fill: '#7fb54a', opacity: .32 }, layer(aqG, 'acequia', 'L', .9));
  const dq = line(AQ), dr = layer(aqG, 'acequia', 'draw');
  el('path', { d: dq, stroke: '#2a1c10', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: .55, pathLength: 1 }, dr);
  el('path', { d: dq, stroke: '#5fb8e8', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1 }, dr);
  pill(layer(aqG, 'acequia', 'L', 1.2), 640, 578, 'Acequias como infraestructura de gestión', { size: 24 }).setAttribute('class', 'ptag');

  // 7.6 · dehesa: mancha verdosa dentro del triángulo ganado–caza–setas
  const dG = layer(g7, 'dehesa');
  const DH = [[330, 612], [430, 618], [520, 660], [610, 730], [590, 790], [470, 800], [330, 792], [250, 758], [255, 690], [285, 640]];
  el('path', { d: smooth(DH), fill: '#8fcf5a', opacity: .38, stroke: '#cdeea0', 'stroke-width': 3, 'stroke-opacity': .8 }, dG);
  pill(dG, 430, 716, 'Dehesa', { size: 28 }).setAttribute('class', 'ptag');

  // 7.8–7.11 · pregunta y causas, sobre el paisaje velado (mismo estilo que 6.5–6.10)
  { const v = layer(g7, 'qdim'); el('rect', { width: 1600, height: 900, fill: '#2b4a63', opacity: .3, style: 'mix-blend-mode:multiply' }, v); el('rect', { width: 1600, height: 900, fill: '#1b1711', opacity: .8 }, v); }
  text(layer(g7, 'qtitle'), 800, 190, '¿Por qué ya no nos sirven tan bien estas técnicas?', { 'text-anchor': 'middle', 'font-size': 56, 'font-weight': 700, fill: AMBER });
  ['El contexto climático está cambiando rápido.', 'El sistema económico se ha globalizado.', 'Estos métodos son difícilmente transferibles.']
    .forEach((s, i) => {
      const g = layer(g7, 'pq' + (i + 1)), y = 340 + i * 96;
      el('circle', { cx: 300, cy: y - 13, r: 8, fill: AMBER }, g);
      text(g, 330, y, s, { 'font-size': 40, 'font-weight': 500, fill: CREAM });
    });

  // 7.14 · hipótesis reformulada, en el estilo de la escena 4
  const nh = layer(g7, 'hypnew');
  text(nh, 800, 340, 'Ya teníamos una mirada compleja, pero lenta y local.', { 'text-anchor': 'middle', 'font-size': 52, 'font-weight': 500, fill: INK });
  text(nh, 800, 470, 'Necesitamos una explícita:', { 'text-anchor': 'middle', 'font-size': 72, 'font-weight': 700, fill: INK });
  text(nh, 800, 565, 'rápida, transferible y contrastable.', { 'text-anchor': 'middle', 'font-size': 72, 'font-weight': 700, fill: RUST });

  const s6flags = [...new Set(P.STEPS.filter(s => s.id.startsWith('6.')).flatMap(s => s.on || []))];
  P.steps([
    { id: '7.1', off: s6flags },
    { id: '7.2', on: ['tmalos'] },
    { id: '7.3', off: ['tmalos'] },
    { id: '7.4', on: ['tsiglos'] },
    { id: '7.5', on: ['acequia'] },
    { id: '7.6', on: ['dehesa'] },
    { id: '7.7', off: ['tsiglos'] },
    { id: '7.8', on: ['qdim', 'qtitle'] },
    { id: '7.9', on: ['pq1'] },
    { id: '7.10', on: ['pq2'] },
    { id: '7.11', on: ['pq3'] },
    { id: '7.12' },
    { id: '7.13', off: ['acequia', 'dehesa', 'qdim', 'qtitle', 'pq1', 'pq2', 'pq3'], on: ['dim', 'hyp1', 'hyp2', 'ast'] },
    { id: '7.14', off: ['hyp1', 'hyp2', 'ast'], on: ['hypnew'] },
  ]);
})();
