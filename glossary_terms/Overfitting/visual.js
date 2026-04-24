
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فرط التخصيص"]
    A --- B0["مشكلة في تعلُّم الآلة تحدث عند إنشاء نموذج يطابق بيانات التدريب بصورة كبيرة تجعله يفشل في التعميم على البيانات الجديدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
