
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إدارة البيانات الوصفيَّة"]
    A --- B0["إدارة البيانات التي تصف البيانات الأخرى لضمان إنشائها وتخزينها وصيانتها بطريقة موحدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
