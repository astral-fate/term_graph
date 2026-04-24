
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تصفية تعاونية"]
    A --- B0["أسلوب يُستخدم في أنظمة التوصية للتنبؤ باهتمامات المستخدم بناءً على اهتمامات المستخدمين الآخرين."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
