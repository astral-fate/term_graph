
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم تعزيزي))
    Start -->|خطوة 1| Step0["نوع من تعلُّم الآلة يتعلَّم السياسة المثلى عن طريق المكافآت والعقوبات"]
    Step0 -->|خطوة 2| Step1["لأجل تحسين إجمالي المكافأة."]
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
