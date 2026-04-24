
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ماتبلوتليب"]
    A --- B0["مكتبة رسومية مفتوحة المصدر بلغة بايثون تُستخدم لتصوير جوانب مختلفة من تعلُّم الآلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
