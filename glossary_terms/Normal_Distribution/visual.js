
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توزيع طبيعي"]
    A --- B0["توزيع احتمالي مستمر يُعرَّف بمُعامِلين: المتوسط والانحراف المعياري"]
    A --- B1["ويُطلق عليه أيضًا "توزيع جاوسي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
