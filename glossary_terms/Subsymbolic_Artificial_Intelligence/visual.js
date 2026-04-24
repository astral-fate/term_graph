
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي شبه ترميزي"]
    A --- B0["فرع من فروع الذكاء الاصطناعي يهتم بالتعلُّم"]
    A --- B1["عن طريق استخدام المعلومات الضمنية والتمثيل الرقمي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
