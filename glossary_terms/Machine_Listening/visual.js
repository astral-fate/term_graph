
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["استماع الآلة"]
    A --- B0["استخدام معالجة الإشارة وتعلُّم الآلة لتمكين الآلة من فهم الأصوات"]
    A --- B1["ويُطلق عليه أيضًا "سماع الآلة"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
