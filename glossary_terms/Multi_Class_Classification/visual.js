
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"تصنيف متعدد الأصناف"}
    Root -->|مسار أ| L1("نوع من التصنيف يُميّز بين أكثر من صنفين")
    Root -->|مسار ب| R1("ويُطلق عليه أيضًا "تصنيف متعدد الحدود".")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
