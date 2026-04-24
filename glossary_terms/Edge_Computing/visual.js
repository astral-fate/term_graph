
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة طرفية"]
    A --- B0["طريقة حوسبية تُنفَّذ فيها عمليات الحوسبة في طرف الشبكة"]
    A --- B1["مثل: أجهزة استشعار إنترنت الأشياء أو الأجهزة المحلية"]
    A --- B2["بدلًا من مراكز البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
