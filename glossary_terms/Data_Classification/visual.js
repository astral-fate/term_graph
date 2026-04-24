
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    Root{"تصنيف البيانات"}
    Root -->|مسار أ| L1("عملية تعيين فئات أو أسماء للبيانات بناءً على محتواها أو حساسيتها أو معايير أخرى")
    Root -->|مسار ب| R1("لتحسين التنظيم والأمن والامتثال.")
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
