
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Start((واجهة برمجة التطبيقات))
    Start -->|خطوة 1| Step0["مجموعة من القواعد والبروتوكولات التي تُتيح للتطبيقات البرمجية المختلفة التواصل والتفاعل بعضها مع بعض."]
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
