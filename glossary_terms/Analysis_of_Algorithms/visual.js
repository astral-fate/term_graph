
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((تحليل الخوارزميات))
    Start -->|خطوة 1| Step0["عملية تحديد التعقيد الحوسبي للخوارزميات وأدائها"]
    Step0 -->|خطوة 2| Step1["وذلك من أجل تقييم مدى ملاءمة تطبيقاتها"]
    Step1 -->|خطوة 3| Step2["أو مقارنتها بخوارزميات أخرى."]
    Step2 --> End(((النتيجة)))
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
