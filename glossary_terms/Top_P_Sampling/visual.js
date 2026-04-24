
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أخذ عيِّنات أعلى ب"]
    A --- B0["طريقة لتوليد النصوص تختار الكلمة التالية من الكلمات الأكثر احتمالًا"]
    A --- B1["التي مجموع احتمالاتها تقارب القيمة (ب)"]
    A --- B2["ويُطلق عليها أيضًا "أخذ عيِّنات نيوكليوس"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
