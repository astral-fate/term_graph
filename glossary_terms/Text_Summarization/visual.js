
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تلخيص النصوص"]
    A --- B0["عملية إنشاء نسخة مختصرة من نص طويل بطريقة تلقائية"]
    A --- B1["مع الحفاظ على نقاطه الرئيسة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
