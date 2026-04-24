
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توليد مُعَزَّز بالاسترجاع الشبكي"]
    A --- B0["أسلوب يجمع بين تمثيل المعرفة القائم على الشبكة والتوليد المُعَزَّز بالاسترجاع لتحسين دقة النصوص المولدة وملاءمتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
