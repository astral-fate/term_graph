
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية تخفيف التحيز))
    Start -->|خطوة 1| Step0["خوارزمية مصممة لتقليل التحيزات داخل مجموعات البيانات أو نماذج الذكاء الاصطناعي."]
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
