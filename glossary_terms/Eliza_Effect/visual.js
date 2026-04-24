
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تأثير أليزا"]
    A --- B0["ميل الناس إلى نسب صفات شبيهة بصفات البشر"]
    A --- B1["مثل: الذكاء والفهم والعواطف"]
    A --- B2["إلى أنظمة الذكاء الاصطناعي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
