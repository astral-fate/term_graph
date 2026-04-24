
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مواءمة الذكاء الاصطناعي"]
    A --- B0["عملية جعل أنظمة الذكاء الاصطناعي تعمل بطرق تتماشى مع الأهداف والقيم الإنسانية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
