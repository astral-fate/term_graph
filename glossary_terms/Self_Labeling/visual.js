
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسمية ذاتية"]
    A --- B0["نوع من طُرُق التعلُّم الشبه الموجَّه يُدرِّب نموذجًا على بيانات مُسمَّاة"]
    A --- B1["ثم يستخدمه لإعطاء أسماء مستعارة للبيانات غير المُسمَّاة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
