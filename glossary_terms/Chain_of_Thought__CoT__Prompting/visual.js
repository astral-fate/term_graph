
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر تسلسل الأفكار"]
    A --- B0["أسلوب لهندسة الأوامر"]
    A --- B1["يحث النموذج على تقسيم المهام المعقدة إلى خطوات أصغر"]
    A --- B2["لإظهار عملية الاستدلال."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
