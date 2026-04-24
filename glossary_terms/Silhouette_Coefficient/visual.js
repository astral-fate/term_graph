
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مُعامِل الظل"]
    A --- B0["مقياس يُستخدم لتقييم جودة التجميع"]
    A --- B1["عن طريق قياس مدى تشابه الشيء مع مجموعته مقارنة بالمجموعات الأخرى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
