
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم موجَّه))
    Start -->|خطوة 1| Step0["نوع من تعلُّم الآلة يستخدم مجموعة بيانات مُسمّاة لتدريب نموذج للتنبؤ أو التصنيف."]
    Step0 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
