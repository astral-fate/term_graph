
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات استنباطية"]
    A --- B0["نوع من تحليلات البيانات"]
    A --- B1["يبدأ بنظرية عامة أو فرضية"]
    A --- B2["ثم يختبرها ببيانات محددة للوصول إلى نتيجة ما."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
