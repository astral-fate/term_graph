
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات طرفية"]
    A --- B0["عملية جمع البيانات وتحليلها قريبًا من الأجهزة الطرفية"]
    A --- B1["مثل: أجهزة الاستشعار وأجهزة إنترنت الأشياء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
