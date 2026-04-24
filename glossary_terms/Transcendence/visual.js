
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تفوق"]
    A --- B0["حالة افتراضية يتفوق فيها الذكاء الاصطناعي على الذكاء البشري"]
    A --- B1["وقد يؤدي إلى قدرات تتجاوز بكثير الفهم البشري أو السيطرة عليه."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
