
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إطار الحُجج"]
    A --- B0["شبكة تشتمل على عُقَد تُمثِّل الحُجج"]
    A --- B1["وحافات تُمثِّل التعارضات بين هذه الحُجج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
