
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم ذاتي التوجيه))
    Start -->|خطوة 1| Step0["نوع من تعلُّم الآلة يستخدم بيانات غير مُسمَّاة لتعلُّم الخصائص"]
    Step0 -->|خطوة 2| Step1["وذلك بالاعتماد على أسماء مستعارة محددة بصورة ذاتية في عملية التوجيه."]
    Step1 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
