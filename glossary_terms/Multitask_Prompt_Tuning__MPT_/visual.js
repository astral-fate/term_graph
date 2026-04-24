
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ضبط الأوامر المتعددة المهام"]
    A --- B0["أسلوب لتكييف نموذج ما لمهام متعددة"]
    A --- B1["عن طريق تعلُّم أمر واحد يمكن نقله إلى المهام المستهدفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
