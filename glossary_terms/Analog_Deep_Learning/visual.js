
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم عميق تناظري))
    Start -->|خطوة 1| Step0["طريقة تستخدم الحوسبة والأجهزة التناظرية لإجراء العمليات الحسابية المطلوبة لمهام التعلُّم العميق."]
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
