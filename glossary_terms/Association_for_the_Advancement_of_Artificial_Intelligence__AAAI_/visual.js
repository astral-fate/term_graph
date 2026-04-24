
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["جمعية النهوض بالذكاء الاصطناعي"]
    A --- B0["جمعية علمية غير ربحية مُكرَّسة للنهوض بالبحث العلمي"]
    A --- B1["والتثقيف العام"]
    A --- B2["وتدريب الممارسين"]
    A --- B3["والحث على الاستخدام المسؤول للذكاء الاصطناعي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
