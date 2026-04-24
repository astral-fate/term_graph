
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسمية مستعارة"]
    A --- B0["أسلوب في التعلُّم الشبه الموجَّه يُنشئ النموذج فيه أسماء للبيانات غير المُسمَّاة"]
    A --- B1["ثم تُستخدم هذه الأسماء لتدريب النموذج بشكل أكبر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
