
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انحدار خطي"]
    A --- B0["نوع من التحليل الإحصائي يوضح العلاقة بين عدة متغيرات لإنشاء نموذج تنبؤي وتوضيح الاتجاهات في البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
