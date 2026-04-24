
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["كيراس"]
    A --- B0["واجهة برمجة تطبيقات بلغة البايثون تُستخدم في تعلُّم الآلة"]
    A --- B1["وتعمل على عدد من أُطر التعلُّم العميق."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
