
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حقن الأوامر"]
    A --- B0["نوع من الهجوم السيبراني ​​على نموذج"]
    A --- B1["عن طريق التلاعب بالمُدْخَلات المقدمة له بطريقة تنتج مخرجات غير مرغوبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
