
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نزول تدرجي"]
    A --- B0["خوارزمية تحسين للعثور على الحد الأدنى من الدالة"]
    A --- B1["عن طريق اتخاذ خطوات بصورة تكرارية تتناسب مع سالب التدرج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
