
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انتشار الأخطاء"]
    A --- B0["ظاهرة تحدث فيها أخطاء في البيانات أو المُعامِلات أو الحسابات الوسيطة"]
    A --- B1["ويمكن أن تؤثِّر في المخرجات النهائية للنموذج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
