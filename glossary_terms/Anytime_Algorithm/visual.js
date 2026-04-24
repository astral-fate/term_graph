
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية فورية))
    Start -->|خطوة 1| Step0["خوارزمية تعطي نتيجة صالحة حتى لو قوطعت قبل انتهائها"]
    Step0 -->|خطوة 2| Step1["وتتحسن جودة نتائجها تدريجيًّا ما دامت تعمل."]
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
