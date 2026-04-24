
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((استدلال واتخاذ القرار))
    Start -->|خطوة 1| Step0["جزء من طريقة تمثيل المعرفة والاستدلال يركز على تصميم خوارزميات الاستنتاج وتحليلها وتنفيذها."]
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
