
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء السرب"]
    A --- B0["مجال يركز على السلوك الجماعي للعناصر التي تتفاعل فيما بينها"]
    A --- B1["باستخدام أنظمة لا مركزية وذاتية التنظيم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
