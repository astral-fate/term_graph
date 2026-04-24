
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سايكيت-ليرن"]
    A --- B0["مكتبة شهيرة مفتوحة المصدر تُستخدم في تعلُّم الآلة"]
    A --- B1["مكتوبة بلغة بايثون."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
