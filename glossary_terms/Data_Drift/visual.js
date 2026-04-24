
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انحراف البيانات"]
    A --- B0["تغيير في توزيع البيانات المُدْخَلة في النموذج"]
    A --- B1["يحدث مع مرور الوقت"]
    A --- B2["وقد يؤدي إلى انخفاض أداء النموذج"]
    A --- B3["يُطلق عليه أيضًا "تغيُّر البيانات"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
