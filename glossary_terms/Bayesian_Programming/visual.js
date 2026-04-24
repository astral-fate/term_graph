
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((برمجة بايزية))
    Start -->|خطوة 1| Step0["طريقة إحصائية لبناء نماذج احتمالية"]
    Step0 -->|خطوة 2| Step1["وحل المشكلات المفتوحة ذات المعلومات غير المكتملة."]
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
