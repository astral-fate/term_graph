
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسرُّب البيانات"]
    A --- B0["حالة في تعلُّم الآلة تُستخدم فيها معلومات من خارج مجموعة بيانات التدريب لإنشاء النماذج"]
    A --- B1["وهو ما يؤدي إلى تقديرات أداء غير دقيقة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
