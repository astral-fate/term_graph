
function renderVisual(container) {
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%');
    svg.append('text').text('توقع الكلمة التالية (Next-Token Prediction). انقر للتشغيل').attr('x', 450).attr('y', 40).attr('fill', '#fff').attr('text-anchor', 'middle');
    const input = svg.append('text').text('الذكاء الاصطناعي هو مستقبل').attr('x', 450).attr('y', 100).attr('fill', '#38bdf8').attr('text-anchor', 'middle').style('font-size', '1.5rem');
    const probs = [ {w: 'التكنولوجيا', p: 85}, {w: 'البشرية', p: 10}, {w: 'السيارات', p: 3}, {w: 'الزراعة', p: 2} ];
    const g = svg.append('g').attr('transform', 'translate(350, 150)').style('opacity', 0);
    probs.forEach((d, i) => {
        g.append('rect').attr('x', 0).attr('y', i*40).attr('width', d.p*2).attr('height', 30).attr('fill', '#8b5cf6');
        g.append('text').text(d.w).attr('x', -10).attr('y', i*40 + 20).attr('fill', '#fff').attr('text-anchor', 'end');
        g.append('text').text(`${d.p}%`).attr('x', d.p*2 + 10).attr('y', i*40 + 20).attr('fill', '#fff');
    });
    svg.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'transparent').on('click', () => {
        g.transition().duration(500).style('opacity', 1);
        setTimeout(() => { input.text('الذكاء الاصطناعي هو مستقبل التكنولوجيا'); g.transition().duration(500).style('opacity', 0); }, 2000);
    });
}
