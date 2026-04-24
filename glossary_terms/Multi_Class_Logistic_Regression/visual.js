
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انحدار لوجستي متعدد الأصناف"]
    A --- B0["استخدام الانحدار اللوجستي لمشكلات التصنيف ذات الأصناف المتعددة"]
    A --- B1["ويُطلق عليه أيضًا "انحدار متعدد الحدود"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
