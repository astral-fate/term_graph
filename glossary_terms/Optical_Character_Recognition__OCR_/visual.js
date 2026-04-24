
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تعرُّف آلي على الحروف"]
    A --- B0["برنامج يتعرَّف على النصوص الموجودة في الصور ويُحوّلها إلى نصوص يمكن قراءتها عن طريق الآلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
