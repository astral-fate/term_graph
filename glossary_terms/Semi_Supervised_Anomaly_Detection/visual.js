
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["اكتشاف الشذوذ شبه الموجَّه"]
    A --- B0["أسلوب يُستخدم لتحديد الأنماط غير المعتادة داخل مجموعة البيانات باستخدام البيانات المُسمَّاة وغير المُسمَّاة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
