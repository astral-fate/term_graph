
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم مبني على الخطأ))
    Start -->|خطوة 1| Step0["نوع من التعلُّم يستخدم فيه الوكيل معلومات حول الاختلاف بين السلوك الحالي والمستهدف لتعديل سلوكه."]
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
