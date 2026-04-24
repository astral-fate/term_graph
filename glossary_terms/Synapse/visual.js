
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ناقل عصبي"]
    A --- B0["الرابط بين الخلايا العصبية (العقد) في الشبكة العصبية الاصطناعية"]
    A --- B1["يُطلق عليه أيضًا "ناقل عصبي اصطناعي"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
