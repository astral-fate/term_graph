
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحميل البيانات"]
    A --- B0["عملية استيراد أو نقل أو دمج البيانات من مصادر مختلفة في نظام تخزين واحد"]
    A --- B1["مثل قاعدة بيانات أو مستودع بيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
