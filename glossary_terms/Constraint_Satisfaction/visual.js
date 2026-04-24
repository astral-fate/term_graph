
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تلبية القيود"]
    A --- B0["مشكلة تتعلق باتخاذ القرار مع محدودية الخيارات"]
    A --- B1["والهدف هو تلبية مجموعة معينة من القيود عن طريق إيجاد قيم مجموعة من المتغيرات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
