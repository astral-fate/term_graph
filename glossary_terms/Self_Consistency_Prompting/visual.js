
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر الاتساق الذاتي"]
    A --- B0["أسلوب في هندسة الأوامر يُحسِّن دقة النماذج"]
    A --- B1["عن طريق إنشاء استجابات متعددة لنفس الأمر"]
    A --- B2["واختيار الإجابة الأكثر تكرارًا أو اتساقًا لتكون الإجابة النهائية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
