
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["عالِم بيانات"]
    A --- B0["شخص متخصص في تحليلات البيانات"]
    A --- B1["ولديه مهارات فنية لحل المشكلات المعقدة باستخدام أدوات علم البيانات وأساليبها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
