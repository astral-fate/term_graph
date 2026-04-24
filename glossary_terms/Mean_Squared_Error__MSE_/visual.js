
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["متوسط الخطأ التربيعي"]
    A --- B0["متوسط الخسارة التربيعية لكل مثال"]
    A --- B1["محسوبًا بقسمة الخسارة التربيعية على عدد الأمثلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
