
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي تحاوري"]
    A --- B0["التقنيات التي تستخدم تعلُّم الآلة ومعالجة اللغات الطبيعية لتوفير تفاعل نصي أو صوتي مع المستخدمين يشبه التفاعل الإنساني."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
