
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مثال"]
    A --- B0["مثال من مجموعة البيانات يتكون من خاصية واحدة أو أكثر وقد يحوي اسمًا أيضًا"]
    A --- B1["ويُطلق عليه أيضًا "حالة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
