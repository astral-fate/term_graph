
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ربط أحادي"]
    A --- B0["طريقة تجميع تحدد المسافة بين مجموعتين"]
    A --- B1["عن طريق أقصر مسافة بين أي نقطتي بيانات من كل مجموعة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
