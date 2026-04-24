
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أخذ عيِّنات البيانات"]
    A --- B0["عملية اختيار مجموعة فرعية من عيِّنات البيانات تُمثِّل مجموعة بيانات أكبر"]
    A --- B1["لأجل تحليل الأنماط والاتجاهات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
