
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي مُجسَّد"]
    A --- B0["مجال يركز على دمج قدرات الذكاء الاصطناعي في الروبوتات وتمكينها من التعلُّم عن طريق التفاعل مع البيئة المحيطة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
