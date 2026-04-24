
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نقل حرفي"]
    A --- B0["عملية تمثيل الكلمات والعبارات في لغة ما باستخدام الحروف الهجائية للغة أخرى"]
    A --- B1["مع الحفاظ على نطقها الأصلي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
