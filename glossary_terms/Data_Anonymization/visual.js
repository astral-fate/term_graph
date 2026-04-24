
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إخفاء بيانات الهوية"]
    A --- B0["عملية تعديل معلومات التعريف الشخصية أو إزالتها من مجموعات البيانات"]
    A --- B1["لحماية خصوصية الأفراد."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
