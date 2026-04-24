
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي مسؤول"]
    A --- B0["تصميم أنظمة الذكاء الاصطناعي وتطويرها ونشرها بطرق تتوافق مع المبادئ الأخلاقية والقيم المجتمعية والمعايير القانونية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
