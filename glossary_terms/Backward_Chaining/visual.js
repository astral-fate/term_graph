
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسلسل خلفي"]
    A --- B0["طريقة استدلال منطقي تعمل بطريقة عكسية"]
    A --- B1["من الهدف إلى تحديد البيانات أو الإثباتات المؤيِّدة لذلك الهدف."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
