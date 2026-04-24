
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تكرار البيانات"]
    A --- B0["تكرار البيانات على عدد من أجهزة الحاسب داخل نظام موزَّع"]
    A --- B1["لضمان مستوى الاتساق في الوصول إلى المعلومات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
