
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["جودة البيانات المُعَزَّزة"]
    A --- B0["استخدام تقنيات الذكاء الاصطناعي لأتمتة عمليات جودة البيانات"]
    A --- B1["وتحسين دقة البيانات واتساقها وموثوقيتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
