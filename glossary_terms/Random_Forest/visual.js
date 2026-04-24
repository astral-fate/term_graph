
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["غابة عشوائية"]
    A --- B0["طريقة تعلُّم تجميعي تُنشئ عددًا من أشجار القرارات"]
    A --- B1["ثم تجمع مخرجاتها للحصول على أفضل نتيجة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
