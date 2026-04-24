
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نظرية التحكم"]
    A --- B0["مجال في الرياضيات التطبيقية يتعامل مع سلوك الأنظمة الديناميكية باستخدام التغذية الراجعة للتأثير في السلوك وتحقيق الهدف المنشود."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
