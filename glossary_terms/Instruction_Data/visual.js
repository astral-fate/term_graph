
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات التعليمات"]
    A --- B0["البيانات التي تحتوي على: أمثلة للمهام"]
    A --- B1["والاستجابات المطلوبة"]
    A --- B2["وأحيانًا سياق إضافي"]
    A --- B3["لتحسين نموذج مُدرَّب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
