
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حوسبة سحابية"]
    A --- B0["أسلوب حوسبي لتمكين الوصول إلى مجموعة قابلة للتوسع من موارد الحاسب المشتركة"]
    A --- B1["مع توفير خدمة ذاتية وإدارة عند الطلب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
