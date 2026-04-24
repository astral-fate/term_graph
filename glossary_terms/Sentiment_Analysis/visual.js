
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليل المشاعر"]
    A --- B0["عملية استخدام الخوارزميات الإحصائية أو خوارزميات تعلُّم الآلة لتحديد المشاعر والآراء المضمنة في نص أو صورة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
