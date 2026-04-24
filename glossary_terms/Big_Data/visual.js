
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات ضخمة"]
    A --- B0["مجموعة بيانات كبيرة تتطلب تقنيات قابلة للتوسع لتخزينها ومعالجتها وإدارتها وتحليلها"]
    A --- B1["نظرًا لخصائص حجمها وتنوعها وسرعتها وتباينها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
