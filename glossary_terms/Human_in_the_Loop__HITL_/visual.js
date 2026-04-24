
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إنسان في الحلقة"]
    A --- B0["طريقة تدمج المُدْخَلات البشرية في دورة حياة أنظمة الذكاء الاصطناعي لتقديم الملاحظات وتحسين النتائج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
