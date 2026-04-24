
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تنقيب في النصوص"]
    A --- B0["عملية تطبيق أساليب التنقيب في البيانات لاستخراج الأنماط والرؤى من المستندات النصية"]
    A --- B1["ويُطلق عليها أيضًا "تحليلات النصوص"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
