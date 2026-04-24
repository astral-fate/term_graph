
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مجموعة مُحَدَّبة"]
    A --- B0["مجموعة فرعية من الفضاء الإقليدي"]
    A --- B1["يظل الخط المرسوم بين أي نقطتين فيها داخل المجموعة الفرعية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
