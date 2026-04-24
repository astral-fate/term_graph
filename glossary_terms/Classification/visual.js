
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"تصنيف"}
    Root -->|مسار أ| L1("نوع من خوارزميات تعلُّم الآلة")
    Root -->|مسار ب| R1("تحدد الفئة التي ينتمي إليها مُدْخَل معين")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
