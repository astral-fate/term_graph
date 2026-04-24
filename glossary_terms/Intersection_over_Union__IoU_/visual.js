
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقاطع على الاتحاد"]
    A --- B0["مقياس لتحديد دقة مهام اكتشاف الأشياء أو الصور عن طريق مقارنة إطار التحديد المتوقع مع إطار التحديد الفعلي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
