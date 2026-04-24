
function renderVisual(container) {
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%');
    svg.append('text').text('محاكاة مرشح الالتفاف (Convolution) في الشبكات العصبية. انقر للتشغيل').attr('x', 450).attr('y', 30).attr('fill', '#fff').attr('text-anchor', 'middle');
    const gridG = svg.append('g').attr('transform', 'translate(250, 80)');
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            const c = Math.random() > 0.7 ? '#38bdf8' : '#1e293b';
            gridG.append('rect').attr('x', i*30).attr('y', j*30).attr('width', 28).attr('height', 28).attr('fill', c);
        }
    }
    const filter = gridG.append('rect').attr('x', 0).attr('y', 0).attr('width', 88).attr('height', 88).attr('fill', 'rgba(239, 68, 68, 0.4)').attr('stroke', '#ef4444').attr('stroke-width', 3).style('display', 'none');
    const outG = svg.append('g').attr('transform', 'translate(550, 110)');
    for(let i=0; i<6; i++) {
        for(let j=0; j<6; j++) {
            outG.append('rect').attr('x', i*20).attr('y', j*20).attr('width', 18).attr('height', 18).attr('fill', '#1e293b').attr('id', `out-${i}-${j}`);
        }
    }
    svg.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'transparent').on('click', () => {
        filter.style('display', 'block');
        let step = 0;
        const interval = setInterval(() => {
            const i = step % 6; const j = Math.floor(step / 6);
            filter.transition().duration(100).attr('x', i*30).attr('y', j*30);
            d3.select(`#out-${i}-${j}`).transition().delay(100).duration(200).attr('fill', Math.random() > 0.5 ? '#10b981' : '#1e293b');
            step++;
            if(step >= 36) clearInterval(interval);
        }, 200);
    });
}
