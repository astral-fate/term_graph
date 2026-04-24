
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["روبوت قابل لإعادة البرمجة"]
    A --- B0["روبوت مصمَّم بطريقة تُمكّن من تعديل حركاته المبرمجة أو وظائفه المساندة"]
    A --- B1["دون الحاجة الى أي تغيير مادي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
