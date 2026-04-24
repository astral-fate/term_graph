
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((معالجة الصور))
    Start -->|خطوة 1| Step0["استخدام خوارزمية لمعالجة الصور أو استخراج معلومات مفيدة منها"]
    Step0 -->|خطوة 2| Step1["ويُطلق عليه أيضًا "معالجة الصور الرقمية"."]
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
