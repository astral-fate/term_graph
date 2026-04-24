
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["معلوماتية السلوك"]
    A --- B0["مجال يهتم بجمع البيانات غير المتجانسة وتحليلها وتفسيرها"]
    A --- B1["لتمثيل السلوك البشري ونمذجته."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
