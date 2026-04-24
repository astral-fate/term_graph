
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إزالة غير الأكبر"]
    A --- B0["أسلوب يُستخدم في اكتشاف الأشياء لإزالة إطارات التحديد المتكررة أو المتداخلة"]
    A --- B1["مع الاحتفاظ بمربع واحد فقط لكل شيء مكتشَف."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
