
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["توسيع أفقي"]
    A --- B0["طريقة لزيادة الأداء وسعة التخزين والتوفُّر عن طريق تقسيم مجموعات البيانات"]
    A --- B1["ونسخها إلى مجموعات من الخوادم."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
