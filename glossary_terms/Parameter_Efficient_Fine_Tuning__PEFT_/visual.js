
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط دقيق فاعل للمُعامِلات"]
    A --- B0["أسلوب لتكييف النماذج المُدرَّبة سابقًا على مهام محددة"]
    A --- B1["عن طريق تحديث مجموعة فرعية صغيرة من المُعامِلات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
