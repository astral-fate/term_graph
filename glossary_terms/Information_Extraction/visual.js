
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استخراج المعلومات"]
    A --- B0["عملية الحصول على المعرفة"]
    A --- B1["عن طريق استعراض النصوص بحثًا عن أصناف محدَّدة للأشياء وعلاقاتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
