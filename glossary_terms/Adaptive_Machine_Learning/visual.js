
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الآلة التَّكَيُّفيّ))
    Start -->|خطوة 1| Step0["طريقة لتحديث نماذج تعلُّم الآلة وإعادة تدريبها تدريجيًّا"]
    Step0 -->|خطوة 2| Step1["للتَّكَيُّف مع التغيرات الجديدة."]
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
