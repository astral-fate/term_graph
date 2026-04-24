
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذاكرة قصيرة المدى"]
    A --- B0["ذاكرة تُتيح للنموذج الاحتفاظ بالمعلومات واستخدامها في سياق محادثة أو جلسة واحدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
