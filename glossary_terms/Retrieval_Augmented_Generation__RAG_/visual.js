
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توليد مُعَزَّز بالاسترجاع"]
    A --- B0["إطار للذكاء الاصطناعي يدمج بين استرجاع المعلومات الخارجية والنماذج التوليدية لإنتاج استجابات أكثر دقة وملاءمة للسياق."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
