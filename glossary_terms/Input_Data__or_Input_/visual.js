
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات مُدْخَلة أو مُدْخَلات"]
    A --- B0["أي شكل من أشكال البيانات المُدْخَلة إلى نظام معالجة معلومات أو أي من مُكوِّناته لغرض المعالجة أو التخزين."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
