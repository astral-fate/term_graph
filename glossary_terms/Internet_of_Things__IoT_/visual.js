
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إنترنت الأشياء"]
    A --- B0["شبكة من الأجهزة الإلكترونية والبرمجيات وأجهزة الاستشعار التي تُتيح للآلات التفاعل مع بعضها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
