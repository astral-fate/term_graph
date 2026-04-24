
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة شبكية"]
    A --- B0["مجموعة من أجهزة الحاسب المتصلة بالشبكة"]
    A --- B1["وتعمل كأنها جهاز حاسب عملاق افتراضي لتنفيذ المهام الكبيرة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
