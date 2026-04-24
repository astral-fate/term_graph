
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["زخم"]
    A --- B0["أسلوب تحسين للنزول التدرجي يُسرِّع عملية التعلُّم"]
    A --- B1["عن طريق إضافة نسبة مئوية من متجه التحديث السابق إلى متجه التحديث الحالي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
