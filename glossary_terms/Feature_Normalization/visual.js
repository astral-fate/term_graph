
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسوية الخصائص"]
    A --- B0["طريقة لتغيير نطاق قيم خاصية إلى نطاق قياسي من القيم"]
    A --- B1["عادةً من -1 إلى +1 أو من 0 إلى 1."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
