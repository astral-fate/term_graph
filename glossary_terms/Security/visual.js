
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أمن"]
    A --- B0["الدرجة التي يحمي بها النظام البيانات والمعلومات"]
    A --- B1["عن طريق السماح بالوصول المناسب إلى البيانات بناءً على مستويات التفويض."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
