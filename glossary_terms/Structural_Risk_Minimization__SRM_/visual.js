
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تقليل المخاطر الهيكلي"]
    A --- B0["مبدأ استقرائي يُستخدم لمعالجة فرط التخصيص"]
    A --- B1["عن طريق الموازنة بين ملاءمة بيانات التدريب وتعقيد النموذج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
