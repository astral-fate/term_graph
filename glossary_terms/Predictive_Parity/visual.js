
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تكافؤ تنبؤي"]
    A --- B0["مقياس إنصاف يفحص ما إذا كانت معدلات إحكام المُصنِّف متكافئة لجميع المجموعات الفرعية"]
    A --- B1["ويُطلق عليه أيضًا "تكافؤ المعدل التنبؤي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
