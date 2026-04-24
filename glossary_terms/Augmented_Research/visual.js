
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بحث مُعزَّز"]
    A --- B0["تطبيق الذكاء الاصطناعي في تحليل البيانات واختبار الفرضيات"]
    A --- B1["لدعم البحث في المجالات المختلفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
