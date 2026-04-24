
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مسافة نقل التوزيع"]
    A --- B0["مقياس للتشابه بين توزيعين احتماليين"]
    A --- B1["ويُطلق عليه أيضًا "مسافة واسرستين"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
