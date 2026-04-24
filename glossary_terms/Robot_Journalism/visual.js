
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["صحافة روبوتية"]
    A --- B0["استخدام البرمجيات لكتابة المحتوى دون تدخل بشري"]
    A --- B1["يُطلق عليها أيضًا "صحافة مؤتمتة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
