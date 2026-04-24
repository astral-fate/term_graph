
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["اكتشاف القيم الشاذة"]
    A --- B0["طريقة لتحديد القيم التي تبدو غير متسقة مع معظم القيم الأخرى في مجموعة البيانات أو بعيدة عنها"]
    A --- B1["ويُطلق عليها أيضًا "اكتشاف الشذوذ غير الموجَّه"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
