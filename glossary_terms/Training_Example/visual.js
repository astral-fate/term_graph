
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مثال تدريب"]
    A --- B0["مثال من بيانات التدريب يتكون من خاصية واحدة أو أكثر"]
    A --- B1["وقد يحوي اسمًا أيضًا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
