
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استعلام باللغة الطبيعية"]
    A --- B0["استخدام اللغة الطبيعية لصياغة الاستعلامات التي يمكن لأنظمة الحاسب معالجتها وفهمها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
