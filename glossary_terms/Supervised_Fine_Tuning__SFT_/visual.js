
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط دقيق موجَّه"]
    A --- B0["طريقة لتكييف نموذج مُدرَّب سابقًا على مهمة محددة"]
    A --- B1["عن طريق تدريبه على بيانات مُسمَّاة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
