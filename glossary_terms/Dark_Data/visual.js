
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بيانات مظلمة"]
    A --- B0["البيانات التي تجمعها المؤسسات وتعالجها وتخزنها أثناء أنشطة الأعمال العادية"]
    A --- B1["ولكنها لا تستخدمها في أغراض أخرى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
