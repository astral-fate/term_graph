
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["ذكاء اصطناعي مضمَّن"]
    A --- B0["دمج قدرات الذكاء الاصطناعي في الأجهزة أو الأنظمة ذات الموارد الحوسبية المحدودة"]
    A --- B1["مثل أجهزة الاستشعار أو وحدات التحكم الدقيقة أو أجهزة إنترنت الأشياء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
