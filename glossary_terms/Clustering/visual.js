
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع"]
    A --- B0["طريقة في تعلُّم الآلة غير الموجَّه لتجميع الأشياء المتشابهة في مجموعات"]
    A --- B1["ويُطلق عليها أيضًا "تحليل المجموعات"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
