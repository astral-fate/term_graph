
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليل البيانات الاستكشافي"]
    A --- B0["المرحلة الأولية في تحليل البيانات لدراسة مجموعة البيانات وتلخيص خصائصها الرئيسة"]
    A --- B1["يُطلق عليها أيضًا "استكشاف البيانات"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
