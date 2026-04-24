
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر تحفيزية موجَّهة"]
    A --- B0["أسلوب في هندسة الأوامر يُضمِّن إشارات محددة لتوجيه استجابات النموذج نحو النتيجة المطلوبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
