
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات رئيسة"]
    A --- B0["مجموعة من المعرفات والسمات التي تحدد كيانات الأعمال الرئيسة"]
    A --- B1["وتوفر سياقًا لعمليات الأعمال."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
