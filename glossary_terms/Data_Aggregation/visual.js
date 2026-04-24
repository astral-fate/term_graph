
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تجميع البيانات"]
    A --- B0["عملية جمع البيانات من عدة مصادر للتحليل أو إعداد التقارير"]
    A --- B1["وتشمل تجميع البيانات أو تلخيصها عن طريق عمليات حسابية"]
    A --- B2["مثل: حساب المجموع أو المتوسط أو الحد الأدنى أو الحد الأقصى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
