
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم الآلة المؤتمت))
    Start -->|خطوة 1| Step0["عملية أتمتة مهام تعلُّم الآلة"]
    Step0 -->|خطوة 2| Step1["لبناء النماذج وتدريبها واختبارها ونشرها."]
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
