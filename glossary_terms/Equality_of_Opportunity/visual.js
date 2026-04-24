
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تكافؤ الفرص"]
    A --- B0["مقياس إنصاف لفحص ما إذا كان المُصنِّف يتنبأ باسم مفضل بطريقة متساوية لجميع قيم السمة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
