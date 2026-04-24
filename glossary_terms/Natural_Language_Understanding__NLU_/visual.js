
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فهم اللغات الطبيعية"]
    A --- B0["مجال فرعي من معالجة اللغات الطبيعية يهتم ببناء آلات قادرة على فهم لغة الإنسان الطبيعية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
