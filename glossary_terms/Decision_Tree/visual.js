
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"شجرة القرار"}
    Root -->|مسار أ| L1("خوارزمية تعلُّم موجَّه تستخدم رسومًا بيانية شجرية")
    Root -->|مسار ب| R1("لإجراء عمليات تحليل القرار.")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
