
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["قاعدة التسلسل"]
    A --- B0["نظرية أساسية في حساب التفاضل والتكامل"]
    A --- B1["توفر طريقة لحساب مشتق دالة مركبة"]
    A --- B2["وتُستخدم أيضًا في الاحتمالات"]
    A --- B3["لحساب الاحتمال المشترك لتسلسل من الأحداث."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
