
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سرد قصصي للبيانات"]
    A --- B0["ممارسة توصيل الرؤى المستمدة من البيانات عن طريق السرد والتصوير لجعل المعلومات المعقدة أكثر تأثيرًا وقابلية للفهم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
