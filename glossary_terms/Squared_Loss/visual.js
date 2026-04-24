
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مربع الخسارة"]
    A --- B0["دالة خسارة تقيس الخطأ بين تنبؤات النموذج والقيم الفعلية"]
    A --- B1["عن طريق تربيع الفرق بينهما"]
    A --- B2["ويُطلق عليها أيضًا "خسارة إل 2"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
