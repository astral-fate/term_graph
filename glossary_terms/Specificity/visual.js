
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دقة التحديد"]
    A --- B0["معدل صحة تنبؤ النموذج للأسماء السلبية عندما تكون بالفعل كذلك"]
    A --- B1["ويُطلق عليه أيضًا "المعدل السلبي الصحيح"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
