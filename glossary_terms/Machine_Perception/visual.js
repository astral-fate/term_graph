
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["منظور الآلة"]
    A --- B0["قدرة النظام على تلقي البيانات من البيئة الخارجية وتفسيرها بطريقة مماثلة لكيفية استخدام البشر حواسهم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
