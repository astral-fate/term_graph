
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إعادة تشغيل التجربة"]
    A --- B0["مخزن مؤقت للذاكرة في التعلُّم التعزيزي لتخزين انتقالات الحالة المكتسبة أثناء عملية التعلُّم واستخدامها لاحقًا لتدريب النموذج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
