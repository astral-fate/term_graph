
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات توجيهية"]
    A --- B0["نوع من تحليلات البيانات"]
    A --- B1["يركز على التوصية بالإجراءات التي يمكنك اتخاذها لتحقيق النتائج المرجوة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
