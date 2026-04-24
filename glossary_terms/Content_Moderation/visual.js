
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إشراف على المحتوى"]
    A --- B0["مراقبة المحتوى الذي يقدمه المستخدمون"]
    A --- B1["وتطبيق القواعد والإرشادات المحددة سابقًا"]
    A --- B2["لتحديد مدى ملاءمته."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
