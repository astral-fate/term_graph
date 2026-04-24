
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تلاعب بالبيانات"]
    A --- B0["تحيُّز إحصائي يحدث عند التلاعب بالبيانات أو تحليلها بطريقة مفرطة للوصول إلى نتائج ذات دلالة إحصائية مع أنها قد لا تكون كذلك"]
    A --- B1["يُطلق عليه أيضًا "تطفُّل على البيانات" أو "تصيُّد في البيانات" أو "قرصنة القيمة الاحتمالية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
