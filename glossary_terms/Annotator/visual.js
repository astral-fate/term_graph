
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُوَصِّف"]
    A --- B0["عامل يساعد في تسمية البيانات (مثل الصور) عند الطلب"]
    A --- B1["يُطلق عليه أيضًا "مُسمِّي" أو "مُقيِّم"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
