
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات شبه مهيكلة"]
    A --- B0["البيانات التي لا تخضع لهيكل ثابت"]
    A --- B1["ولكن لها بعض الخصائص التنظيمية"]
    A --- B2["ويُطلق عليها أيضًا "بيانات مهيكلة جزئيًّا"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
