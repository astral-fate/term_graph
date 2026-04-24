
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع تمحوري"]
    A --- B0["خوارزمية تجميع"]
    A --- B1["ترتب البيانات في مجموعات غير هرمية تُمثَّل بواسطة مُتَّجه مركزي أو بؤرة تجميع."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
