
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تعلُّم التوصيف المعرفي))
    Start -->|خطوة 1| Step0["أساليب مبنية على البيانات لبناء توصيف معرفي باستخدام طُرُق تلقائية أو شبه تلقائية تعتمد على التنقيب في النصوص أو تعلُّم الآلة."]
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
