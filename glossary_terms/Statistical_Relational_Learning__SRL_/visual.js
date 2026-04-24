
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم علائقي إحصائي))
    Start -->|خطوة 1| Step0["فرع من تعلُّم الآلة يجمع بين التعلُّم الإحصائي والتعلُّم العلائقي لمعالجة عدم التيقن في البيانات والتعامل مع الهياكل العلائقية المعقدة."]
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
