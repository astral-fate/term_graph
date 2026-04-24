
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["آلة بولتزمان"]
    A --- B0["شبكة عصبية من العُقَد المتصلة المتماثلة"]
    A --- B1["وتتخذ قراراتها الخاصة بشأن التنشيط."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
