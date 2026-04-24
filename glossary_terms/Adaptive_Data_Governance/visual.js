
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["حَوْكمة تَكَيُّفيَّة للبيانات"]
    A --- B0["طريقة مرنة لحوكمة البيانات"]
    A --- B1["تركز على التعديل المستمر"]
    A --- B2["لتلبية التغيرات في احتياجات العمل والمتطلبات التنظيمية والتقنيات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
