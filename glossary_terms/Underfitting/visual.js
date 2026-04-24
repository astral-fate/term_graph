
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فرط التعميم"]
    A --- B0["مشكلة في تعلُّم الآلة تحدث عندما يفشل النموذج في نمذجة تعقيد بيانات التدريب بطريقة كافية"]
    A --- B1["وهو ما يؤدي إلى ضعف القدرة التنبؤية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
