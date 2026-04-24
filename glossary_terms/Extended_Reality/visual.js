
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["واقع ممتد"]
    A --- B0["دمج الذكاء الاصطناعي مع تقنية الواقع الافتراضي والمُعَزَّز والمختلط لإضافة إمكانات متقدمة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
