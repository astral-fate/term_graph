
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسلسل الأوامر"]
    A --- B0["أسلوب يتضمن تقسيم مهمة معقدة إلى سلسلة من الأوامر"]
    A --- B1["ويكون مخرج الأمر الأول مُدْخَلًا للأمر الذي يليه."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
