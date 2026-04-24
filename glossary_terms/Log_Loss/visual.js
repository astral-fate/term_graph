
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خسارة لوغاريثمية"]
    A --- B0["مقياس أداء يُستخدم لتقييم نماذج التصنيف"]
    A --- B1["عن طريق تحديد الفرق بين الاحتمالات المتوقعة والأسماء الفعلية"]
    A --- B2["ويُطلق عليه أيضًا "خسارة الإنتروبيا التقاطعية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
