
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["هجوم استنتاج العضوية"]
    A --- B0["هجوم يهدف إلى تحديد ما إذا كانت عينة بيانات استُخدمت في تدريب نموذج تعلُّم الآلة أم لا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
