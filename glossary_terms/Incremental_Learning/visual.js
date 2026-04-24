
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم تدريجي))
    Start -->|خطوة 1| Step0["طريقة من طُرُق تعلُّم الآلة يكون التدريب والتعلُّم فيها مستمرًّا كلما ظهرت أمثلة جديدة."]
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
