
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نطاق الثقة"]
    A --- B0["نوع من تقدير النطاق الذي يشتمل على مجموعة من القيم المطلوبة لمطابقة مستوى الثقة في تقدير خصائص البيانات المرصودة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
