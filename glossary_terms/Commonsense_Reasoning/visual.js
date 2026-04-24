
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((استدلال بديهي))
    Start -->|خطوة 1| Step0["قدرة أنظمة الذكاء الاصطناعي على فهم المواقف اليومية"]
    Step0 -->|خطوة 2| Step1["والاستنتاج منها بطريقة مشابهة للبديهة البشرية."]
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
