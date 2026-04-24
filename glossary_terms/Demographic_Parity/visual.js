
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تكافؤ ديموغرافي"]
    A --- B0["مقياس للإنصاف يكون استيفاؤه عندما لا تعتمد نتائج تصنيف النموذج على سمة حساسة معينة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
