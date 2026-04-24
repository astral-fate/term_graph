
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خاصية"]
    A --- B0["صفة أو ميزة للبيانات يمكن استخدامها مُدخَلًا لعملية التنبؤ"]
    A --- B1["وغالبًا ما تُستخدم مُرادِفًا لكلمة "سمة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
