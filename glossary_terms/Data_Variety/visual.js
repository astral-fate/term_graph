
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تنوُّع البيانات"]
    A --- B0["اختلاف أنواع البيانات وصيَغها"]
    A --- B1["مثل: البيانات المهيكلة وشبه المهيكلة وغير المهيكلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
