
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ملف سجل"]
    A --- B0["ملف مُولَّد بواسطة الحاسب يشتمل على سجل لجميع الأنشطة داخل خادم أو نظام تشغيل أو تطبيق."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
