
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع بالمتوسط"]
    A --- B0["خوارزمية تجميع تستخدم المتوسط لتصنيف البيانات إلى عدد (ك) من المجموعات بناءً على تشابه خصائصها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
