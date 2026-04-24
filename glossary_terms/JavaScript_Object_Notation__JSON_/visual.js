
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["صيغة جيسون"]
    A --- B0["صيغة خفيفة لتبادل البيانات يمكن للإنسان قراءتها"]
    A --- B1["وتُستخدم على نطاق واسع لهيكلة البيانات ونقلها بين الأنظمة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
