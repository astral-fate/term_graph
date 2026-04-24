
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء الأعمال"]
    A --- B0["نظام مبني على البيانات"]
    A --- B1["يشتمل على جمع البيانات وتخزينها وتحليلها وتصويرها"]
    A --- B2["لدعم اتخاذ القرار."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
