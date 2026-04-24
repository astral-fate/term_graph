
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حالة البيئة"]
    A --- B0["قيم المُعامِلات في التعلُّم التعزيزي التي تصف التكوين الحالي للبيئة الذي يستخدمه الوكيل لاختيار فعل."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
