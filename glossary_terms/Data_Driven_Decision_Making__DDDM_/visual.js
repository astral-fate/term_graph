
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"اتخاذ قرار مبني على البيانات"}
    Root -->|مسار أ| L1("عملية اتخاذ القرارات بناءً على البيانات بدلًا من مجرد الحدس أو الملاحظة")
    Root -->|مسار ب| R1("ويُطلق عليها أيضًا "اتخاذ قرار مستند إلى البيانات".")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
