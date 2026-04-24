
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خسارة تباينية"]
    A --- B0["دالة خسارة تشجع النموذج على تعلم عمليات التضمين"]
    A --- B1["عن طريق تقليل المسافة بين الأزواج المتشابهة من نقاط البيانات"]
    A --- B2["وتعظيم المسافة بين الأزواج غير المتشابهة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
