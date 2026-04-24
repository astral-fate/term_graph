
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["علم الروبوتات السحابية"]
    A --- B0["مجال في علم الروبوتات تستخدم فيه الروبوتات التقنيات السحابية لتوسيع قدراتها"]
    A --- B1["مثل: التخزين والحوسبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
