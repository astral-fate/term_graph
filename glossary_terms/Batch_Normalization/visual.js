
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسوية الحُزمة"]
    A --- B0["أسلوب تعلُّم موجَّه لتحسين أداء الشبكة العصبية واستقرارها عن طريق تحويل مخرجات الطبقة البينية إلى صيغة موحدة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
