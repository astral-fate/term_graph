
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي واعٍ بذاته"]
    A --- B0["تصور نظري لذكاء اصطناعي لديه إدراك ووعي بوجوده"]
    A --- B1["وقادر على فهم أفكاره وعواطفه وبيئته."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
