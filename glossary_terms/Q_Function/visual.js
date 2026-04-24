
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دالة كيو"]
    A --- B0["دالة في التعلُّم التعزيزي تتنبأ بالعائد عند القيام بفعل معين في حالة ما وعند سياسة معينة"]
    A --- B1["ويُطلق عليها أيضًا "دالة قيمة الحالة-الفعل"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
