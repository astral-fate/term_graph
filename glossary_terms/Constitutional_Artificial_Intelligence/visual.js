
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي دستوري"]
    A --- B0["طريقة لجعل أنظمة الذكاء الاصطناعي أكثر توافقًا مع القيم والأخلاق الإنسانية"]
    A --- B1["عن طريق إنشاء مجموعة من القواعد أو المبادئ توجِّه سلوكها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
