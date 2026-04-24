
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة ناعمة"]
    A --- B0["مجموعة من الأساليب الحوسبية التي تتعامل مع النماذج التقريبية"]
    A --- B1["وتُقدِّم حلولًا فاعلة للمشكلات المعقدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
