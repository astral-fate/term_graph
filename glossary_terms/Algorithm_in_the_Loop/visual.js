
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية في الحلقة))
    Start -->|خطوة 1| Step0["إطار تعاوني لاتخاذ القرار"]
    Step0 -->|خطوة 2| Step1["يستفيد من الخوارزميات لتحسين عملية اتخاذ القرار البشري."]
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
