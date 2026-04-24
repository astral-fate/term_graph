
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع انقسامي"]
    A --- B0["نوع من التجميع الهرمي تُجمَّع فيه جميع الأمثلة أولًا في مجموعة"]
    A --- B1["ثم تُقسَّم المجموعة بصورة تكرارية إلى شجرة هرمية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
