
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["علم الروبوتات السربية"]
    A --- B0["مجال في علم الروبوتات يركز على تنسيق المجموعات الكبيرة من الروبوتات الذاتية التحكم للعمل معًا بصورة جماعية دون تحكم مركزي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
