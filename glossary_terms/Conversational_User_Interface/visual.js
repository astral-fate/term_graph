
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["واجهة مستخدم تحاورية"]
    A --- B0["واجهة مستخدم تتيح للمستخدمين التفاعل مع أجهزة الحاسب بطريقة تشبه المحادثة بين البشر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
