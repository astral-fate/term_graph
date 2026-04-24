
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مركز البيانات"]
    A --- B0["مكان يضم مجموعة من الخوادم وأجهزة تخزين البيانات مع اتصال عالي السرعة"]
    A --- B1["لإدارة تطبيقات المؤسسة وبياناتها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
