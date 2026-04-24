
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["روبوت ذكي"]
    A --- B0["روبوت يمكنه تنفيذ المهام عن طريق استشعار محيطه"]
    A --- B1["والتفاعل مع المصادر الخارجية"]
    A --- B2["وتكييف سلوكه وفقًا لذلك."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
