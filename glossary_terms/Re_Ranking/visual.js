
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إعادة ترتيب"]
    A --- B0["خطوة أخيرة في نظام التوصيات تأخذ في الاعتبار المعايير أو القيود الإضافية لإعادة ترتيب العناصر المسجلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
