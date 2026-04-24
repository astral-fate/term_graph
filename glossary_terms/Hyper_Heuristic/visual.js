
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إرشاد فائق"]
    A --- B0["منهجية بحث عالية المستوى تعمل على أتمتة عملية اختيار الأساليب الإرشادية"]
    A --- B1["أو دمجها لحل مشكلات البحث المعقدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
