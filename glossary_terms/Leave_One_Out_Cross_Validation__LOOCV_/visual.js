
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحقق تقاطعي عن طريق عزل نقطة"]
    A --- B0["حالة خاصة من التحقق التقاطعي المُجَزَّأ يكون فيها عدد المجموعات مساويًا لعدد المشاهدات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
