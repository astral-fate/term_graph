
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((وحدة معالجة تينسر))
    Start -->|خطوة 1| Step0["دائرة متكاملة طورتها شركة جوجل مصممة خصيصًا لتسريع مهام تعلُّم الآلة."]
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
