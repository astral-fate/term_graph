
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["فخ القيم غير العددية"]
    A --- B0["حالة يصبح فيها عدد في نموذج ما قيمة غير عددية أثناء عملية التدريب"]
    A --- B1["وبسببه تصبح الأعداد الأخرى قيمًا غير عددية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
