
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة عصبية"]
    A --- B0["طريقة حوسبية تحاكي الدماغ البشري باستخدام خوارزميات وأجهزة خاصة لتحسين كفاءة الطاقة وسرعة الحوسبة"]
    A --- B1["ويُطلق عليها أيضًا "هندسة عصبية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
