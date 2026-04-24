
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((خوارزمية النحل))
    Start -->|خطوة 1| Step0["خوارزمية تحاكي سلوك أسراب النحل في العثور على الغذاء عن طريق البحث العشوائي"]
    Step0 -->|خطوة 2| Step1["ويمكن استخدامها لحل مشكلات التحسين."]
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
