
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["صندوق أسود"]
    A --- B0["استعارة تُستخدم لوصف نظام أو خوارزمية ذات بنية داخلية غير معروفة أو أعمال غير ظاهرة"]
    A --- B1["تؤدي إلى عدم فهم كيفية عملها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
