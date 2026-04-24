
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات غير متوازنة الأصناف"]
    A --- B0["مشكلة في التصنيف عندما يكون عدد الأصناف في مجموعة بيانات مختلفًا اختلافًا كبيرًا"]
    A --- B1["ويُطلق عليها أيضًا "بيانات غير متوازنة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
