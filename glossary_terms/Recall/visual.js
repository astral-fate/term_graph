
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استدعاء"]
    A --- B0["مقياس لتحديد نسبة القيم الإيجابية الفعلية التي حُددت تحديدًا صحيحًا"]
    A --- B1["ويُطلق عليه أيضًا "معدل إيجابي صحيح"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
