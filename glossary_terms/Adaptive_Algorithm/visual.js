
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية تَكَيُّفيَّة))
    Start -->|خطوة 1| Step0["خوارزمية تغير سلوكها في وقت التشغيل بناءً على المعلومات المتاحة"]
    Step0 -->|خطوة 2| Step1["والمعايير المحددة سابقًا."]
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
