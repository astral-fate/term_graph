
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انجراف المفهوم"]
    A --- B0["تغيُّر غير متوقع في الخصائص الإحصائية للمتغير المستهدف"]
    A --- B1["يحدث بمرور الوقت."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
