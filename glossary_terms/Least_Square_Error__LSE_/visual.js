
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خطأ تربيعي أقل"]
    A --- B0["طريقة للعثور على أفضل ملاءمة للبيانات لتقليل مربع الأخطاء بين البيانات الفعلية وخط الملاءمة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
