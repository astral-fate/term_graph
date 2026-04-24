
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دالة المكافأة"]
    A --- B0["آلية تحفيز في التعلُّم التعزيزي تُحدد الكيفية التي يلزم الوكيل اتباعها للقيام بأفعال في بيئة ما."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
