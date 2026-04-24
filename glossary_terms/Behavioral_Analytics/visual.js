
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات سلوكية"]
    A --- B0["عملية استخدام البيانات المتعلقة بسلوكيات المستخدمين"]
    A --- B1["لفهم نواياهم وأفعالهم والتنبؤ بها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
