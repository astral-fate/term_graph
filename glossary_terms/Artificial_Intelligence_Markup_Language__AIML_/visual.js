
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["لغة ترميز الذكاء الاصطناعي"]
    A --- B0["لغة ترميزية مبنية على لغة الترميز الموسعة (XML)"]
    A --- B1["لتطوير تطبيقات اللغات الطبيعية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
