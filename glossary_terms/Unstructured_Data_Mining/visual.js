
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تنقيب في البيانات غير المهيكلة"]
    A --- B0["عملية اكتشاف الأنماط في كمية كبيرة من البيانات غير المهيكلة"]
    A --- B1["واستخراج المعلومات المفيدة منها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
