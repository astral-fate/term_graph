
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تعزيز تَّكَيُّفيّ"]
    A --- B0["أسلوب تعزيز يجمع بين عدد من المصنِّفات الضعيفة"]
    A --- B1["لإنشاء مصنِّف قوي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
