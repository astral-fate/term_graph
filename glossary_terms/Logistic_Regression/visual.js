
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انحدار لوجستي"]
    A --- B0["نموذج إحصائي يستخدم دالة لوجستية لتحويل تنبؤ النموذج الخطي إلى قيمة بين 0"]
    A --- B1["ويُطلق عليه أيضًا "نموذج لوجيت"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
