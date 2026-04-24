
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحيُّز المُختبِر"]
    A --- B0["نوع من التحيُّز التأكيدي الذي يواصل فيه المختبر تدريب النموذج إلى أن تُؤكَّد الفرضية المطروحة سابقًا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
