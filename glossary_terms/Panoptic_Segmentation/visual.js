
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقسيم شامل"]
    A --- B0["مهمة في رؤية الحاسب تجمع بين التقسيم الدلالي وتقسيم الأشياء لتقديم فهم كامل ومفصل للصورة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
