
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر بأمثلة قليلة"]
    A --- B0["أسلوب لهندسة الأوامر يُعطى فيه النموذج تعليمات وبعض الأمثلة لتوجيه استجاباته."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
