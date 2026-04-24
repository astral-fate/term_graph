
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سير عمل البيانات"]
    A --- B0["سلسلة من العمليات التي تنقل البيانات الخام وتحوِّلها من مصادر مختلفة إلى وجهة للتحليل أو الاستخدام."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
