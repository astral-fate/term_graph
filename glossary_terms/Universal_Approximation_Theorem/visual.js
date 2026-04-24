
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نظرية التقريب الشامل"]
    A --- B0["نظرية أساسية تنص على أن الشبكات العصبية يمكنها تقريب أي دالة مستمرة عند توافر الإعدادات المناسبة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
