
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أخذ عيِّنات المُرشَّحين"]
    A --- B0["طريقة لتحسين التدريب"]
    A --- B1["عن طريق حساب الاحتمالات لجميع الأصناف المستهدفة"]
    A --- B2["ولعينة عشوائية من الأصناف الأخرى."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
