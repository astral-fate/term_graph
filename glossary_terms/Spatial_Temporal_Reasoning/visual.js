
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((استدلال مكاني-زماني))
    Start -->|خطوة 1| Step0["مجال من مجالات الذكاء الاصطناعي يهتم بالتمثيل والاستدلال في المكان والزمان مثل الإنسان."]
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
