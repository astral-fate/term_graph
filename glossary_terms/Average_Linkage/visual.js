
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ربط متوسط"]
    A --- B0["طريقة تجميع تحسب المسافة بين مجموعتين عن طريق متوسط ​​المسافة بين جميع أزواج نقاط البيانات من كل مجموعة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
