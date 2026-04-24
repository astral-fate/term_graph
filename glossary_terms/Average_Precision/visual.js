
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["متوسط الإحكام"]
    A --- B0["مقياس يلخص أداء تسلسل مُرتَّب للنتائج عن طريق حساب متوسط قيم الدقة لكل نتيجة ذات صلة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
