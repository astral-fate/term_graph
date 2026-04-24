
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُنتَج ذكي"]
    A --- B0["مُنتَج يستخدم التقنية والبيانات والتحليلات لتحسين نفسه بصورة مستمرة وتقديم تجربة مستخدم أفضل."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
