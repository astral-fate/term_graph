
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نُطْق"]
    A --- B0["أي مُدْخَل من مستخدم بشري إلى نظام ذكاء اصطناعي تحاوري"]
    A --- B1["مثل: بوت المحادثة"]
    A --- B2["وأنظمة التعرُّف على الكلام."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
