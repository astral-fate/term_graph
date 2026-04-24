
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دافع داخلي"]
    A --- B0["آلية تشجع الوكيل على أداء سلوك معين نابع من طبيعته"]
    A --- B1["ومن دون تغذية راجعة مباشرة من البيئة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
