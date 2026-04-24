
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ويب دلالي"]
    A --- B0["امتداد لشبكة الويب العالمية لتمكين مشاركة البيانات وإعادة استخدامها عبر التطبيقات"]
    A --- B1["عن طريق تحديد مخازن البيانات والمفردات وقواعد التعامل مع البيانات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
