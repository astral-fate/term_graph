
function renderVisual(container) {
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%');
    svg.append('text').text('انقر لمحاكاة تفاعل المستخدمين أو القياسات').attr('x', 450).attr('y', 40).attr('fill', '#fff').attr('text-anchor', 'middle');
    let cA = 0, cB = 0;
    const rA = svg.append('rect').attr('x', 200).attr('y', 100).attr('width', 150).attr('height', 50).attr('fill', '#ef4444').style('cursor','pointer').on('click', ()=>{ cA++; update(); });
    const rB = svg.append('rect').attr('x', 550).attr('y', 100).attr('width', 150).attr('height', 50).attr('fill', '#10b981').style('cursor','pointer').on('click', ()=>{ cB++; update(); });
    const tA = svg.append('text').attr('x', 275).attr('y', 200).attr('fill', '#ef4444').attr('text-anchor', 'middle').text('0');
    const tB = svg.append('text').attr('x', 625).attr('y', 200).attr('fill', '#10b981').attr('text-anchor', 'middle').text('0');
    function update() { tA.text(`المجموعة أ: ${cA}`); tB.text(`المجموعة ب: ${cB}`); }
}
