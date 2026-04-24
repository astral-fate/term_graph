
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دالة الخسارة"]
    A --- B0["دالة تُستخدم لتحديد الخطأ بين مخرجات الخوارزمية والقيمة المستهدفة"]
    A --- B1["ويُطلق عليها أيضًا "دالة التكلفة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
