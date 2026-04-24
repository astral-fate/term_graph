
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحسين متعدد الأسراب"]
    A --- B0["نوع من تحسين سرب الجسيمات يُقدّر الحل للمشكلات المعقدة باستخدام أسراب متعددة بدلًا من سرب واحد."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
