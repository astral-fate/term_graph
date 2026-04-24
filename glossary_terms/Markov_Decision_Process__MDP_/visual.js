
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((عملية قرار ماركوف))
    Start -->|خطوة 1| Step0["عملية تحكم عشوائي ذات وقت منفصل تُستخدم لنمذجة صنع القرار في مشكلات التحسين عند عدم التيقن."]
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
