
function renderVisual(container) {
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%');
    svg.append('text').text('انقر على الكلمات لرؤية مصفوفة الانتباه الذاتي (Self-Attention)').attr('x', 450).attr('y', 30).attr('fill', '#fff').attr('text-anchor', 'middle');
    const words = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "tired"];
    const g = svg.append('g').attr('transform', 'translate(50, 100)');
    words.forEach((w, i) => {
        const x = i * 80;
        g.append('text').text(w).attr('x', x).attr('y', 0).attr('fill', '#94a3b8').attr('text-anchor', 'middle').style('font-size', '1.1rem')
         .attr('class', `word-${i}`).style('cursor', 'pointer')
         .on('mouseover', function() {
             svg.selectAll('.att-line').remove();
             d3.selectAll('text[class^="word-"]').attr('fill', '#94a3b8').style('font-weight', 'normal');
             d3.select(this).attr('fill', '#38bdf8').style('font-weight', 'bold');
             words.forEach((target, j) => {
                 if(i !== j) {
                     let weight = Math.random() * 0.3;
                     if(words[i] === 'it' && words[j] === 'animal') weight = 0.9;
                     if(words[i] === 'animal' && words[j] === 'it') weight = 0.9;
                     if(weight > 0.1) {
                         g.append('path').attr('class', 'att-line').attr('d', `M ${i*80} 10 Q ${(i*80 + j*80)/2} ${100 + Math.abs(i-j)*20} ${j*80} 10`)
                          .attr('fill', 'none').attr('stroke', '#8b5cf6').attr('stroke-width', weight*10).attr('opacity', weight);
                     }
                 }
             });
         });
    });
}
