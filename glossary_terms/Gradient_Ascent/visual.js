
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["صعود تدرجي"]
    A --- B0["خوارزمية تحسين للعثور على الحد الأقصى للدالة"]
    A --- B1["عن طريق ضبط المُعامِلات بشكل متكرر في اتجاه التدرج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
