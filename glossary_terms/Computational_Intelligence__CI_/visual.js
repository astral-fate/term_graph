
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء حوسبي"]
    A --- B0["مجال دراسة يركز على الدافع البيولوجي واللغوي لتطوير الطُّرُق الحوسبية"]
    A --- B1["ويشمل الشبكات العصبية والأنظمة الضبابية والحوسبة التطورية."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
