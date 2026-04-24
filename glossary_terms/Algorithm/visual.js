
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية))
    Start -->|خطوة 1| Step0["مجموعة من التعليمات المحددة لحل مشكلة ما"]
    Step0 -->|خطوة 2| Step1["أو أداء مهمة معينة."]
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
