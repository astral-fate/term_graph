
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُحرِّك استنتاج"]
    A --- B0["مُكوِّن من مُكوِّنات النُّظُم الخبيرة يقوم بعملية الاستدلال لاستنتاج معلومات جديدة من الحقائق والقواعد المخزنة في قاعدة المعرفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
