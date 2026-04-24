
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بوت محادثة"]
    A --- B0["برنامج ذكاء اصطناعي يستخدم أساليب معالجة اللغات الطبيعية للتفاعل مع المستخدمين عن طريق المحادثات الصوتية أو النصية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
