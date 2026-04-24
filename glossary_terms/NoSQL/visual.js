
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نو سيكوال"]
    A --- B0["طريقة لتصميم قواعد البيانات تُتيح تخزين البيانات والاستعلام عنها بطريقة مختلفة عن قواعد البيانات العلائقية"]
    A --- B1["ويُطلق عليها أيضًا "غير علائقية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
