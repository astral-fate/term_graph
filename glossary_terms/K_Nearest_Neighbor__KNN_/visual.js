
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خوارزمية أقرب الجيران"]
    A --- B0["خوارزمية تُصنِّف نقاط البيانات الجديدة بناءً على أغلبية أو متوسط أقرب ​​نقاط البيانات التي عددها (ك) في مجموعة بيانات التدريب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
