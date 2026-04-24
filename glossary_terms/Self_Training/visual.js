
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تدريب ذاتي"]
    A --- B0["طريقة تعلُّم ذاتي التوجيه تُستخدم في التصنيف عندما تكون البيانات غير المُسمَّاة أكثر من البيانات المُسمَّاة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
