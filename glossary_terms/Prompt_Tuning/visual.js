
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط الأوامر"]
    A --- B0["أسلوب لتكييف نموذج ما على مهام محددة"]
    A --- B1["عن طريق ضبط الأوامر المُدْخَلة"]
    A --- B2["بدلًا من تعديل مُعامِلات النموذج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
