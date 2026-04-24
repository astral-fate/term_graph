
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أسلوب إرشادي"]
    A --- B0["أسلوب لتقديم حل سريع لمشكلة ما قد لا يكون هو الحل الأمثل"]
    A --- B1["ولكنه تقريبي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
