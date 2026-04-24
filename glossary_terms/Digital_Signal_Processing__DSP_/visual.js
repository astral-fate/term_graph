
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((معالجة الإشارات الرقمية))
    Start -->|خطوة 1| Step0["مجال فرعي من معالجة الإشارات يركز على استخدام أجهزة الحاسب لتحليل الإشارات الرقمية ومعالجتها."]
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
