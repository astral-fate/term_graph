
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ربط كامل"]
    A --- B0["طريقة تجميع تُعرِّف المسافة بين مجموعتين عن طريق أقصى مسافة بين أي زوج من نقاط البيانات من كل مجموعة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
