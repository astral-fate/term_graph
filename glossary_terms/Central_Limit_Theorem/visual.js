
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نظرية الحد المركزي"]
    A --- B0["نظرية تنص على أن توزيع المتوسطات لمشاهدات مستقلة يقترب من نموذج التوزيع الطبيعي كلما أصبح حجم العينة أكبر"]
    A --- B1["بغض النظر عن الشكل الإحصائي لتوزيع المجموعة التي أُخِذت منها العينة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
