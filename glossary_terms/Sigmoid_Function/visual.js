
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["دالة سيجمويد"]
    A --- B0["دالة تُعيّن مخرجات الانحدار اللوجستي أو المتعدد الحدود إلى احتمالات قيمتها بين الصفر والواحد."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
