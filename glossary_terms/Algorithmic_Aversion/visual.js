
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((نفور من الخوارزميات))
    Start -->|خطوة 1| Step0["الميل البشري إلى تجنب استخدام الخوارزميات أو عدم الثقة فيها"]
    Step0 -->|خطوة 2| Step1["حتى عندما تتفوق على الأداء البشري."]
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
