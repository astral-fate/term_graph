
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خسارة التقليل-التعظيم"]
    A --- B0["دالة خسارة تُستخدم في شبكة توليدية تنافسية يحاول فيها المولِّد تقليل هذه الدالة"]
    A --- B1["في حين يحاول المميّز تعظيمها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
