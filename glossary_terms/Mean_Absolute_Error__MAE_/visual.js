
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["متوسط الخطأ المطلق"]
    A --- B0["مقياس يُستخدم لتقييم دقة النموذج"]
    A --- B1["عن طريق حساب متوسط الفرق المطلق بين القيم المتوقعة والتنبؤ لجميع أمثلة التدريب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
