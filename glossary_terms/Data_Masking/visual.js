
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إخفاء البيانات"]
    A --- B0["عملية تعتيم المعلومات الحساسة عن طريق استبدالها ببيانات وهمية ولكنها واقعية المظهر"]
    A --- B1["يُطلق عليها أيضًا "تشويش البيانات"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
