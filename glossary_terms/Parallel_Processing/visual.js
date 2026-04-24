
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((معالجة متوازية))
    Start -->|خطوة 1| Step0["طريقة للتعامل مع الحوسبة العالية عن طريق تقسيم مهام البرنامج وتشغيلها في الوقت نفسه على معالجات متعددة."]
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
