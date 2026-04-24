
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["شبكة معرفية"]
    A --- B0["شبكة تُمثِّل أشياء العالم الحقيقي وعلاقاتها"]
    A --- B1["وتُسمَّى أيضًا "شبكة دلالية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
