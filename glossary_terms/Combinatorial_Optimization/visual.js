
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحسين توافقي"]
    A --- B0["عملية إيجاد الحل الأمثل من مجموعة محدودة من الاحتمالات"]
    A --- B1["وذلك عندما يكون البحث الشامل غير ممكن."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
