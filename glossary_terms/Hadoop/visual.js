
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["هدوب"]
    A --- B0["إطار مفتوح المصدر يوفر معالجة موزَّعة لمجموعات كبيرة من البيانات عبر مجموعات من أجهزة الحاسب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
