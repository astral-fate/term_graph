
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي كخدمة"]
    A --- B0["خدمة قائمة على السحابة"]
    A --- B1["توفر إمكانات الذكاء الاصطناعي وأدواته"]
    A --- B2["جاهزة للاستخدام من الأفراد والمؤسسات."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
