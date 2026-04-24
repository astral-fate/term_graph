
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["زاحف الويب"]
    A --- B0["بوت تديره مُحَرِّكات البحث لتصفح وفهرسة محتوى مواقع الويب المتاحة على الإنترنت"]
    A --- B1["ويُطلق عليه أيضًا "عنكبوت الويب"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
