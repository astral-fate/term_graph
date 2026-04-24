
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خصوصية تباينية"]
    A --- B0["تعريف رياضي للخصوصية في تعلُّم الآلة يُتيح جمع الإحصاءات حول مجموعة البيانات وتحليلها ومشاركتها بناءً على البيانات الشخصية مع حماية خصوصية الأفراد."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
