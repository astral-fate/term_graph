
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسميم البيانات"]
    A --- B0["هجوم أمني يقوم فيه المهاجم بإدخال بيانات خاطئة أو مضللة في مجموعة بيانات التدريب"]
    A --- B1["لإفساد سلوك النموذج أو التأثير عليه."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
