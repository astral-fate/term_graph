
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["نزول تدرجي عشوائي بحُزَم صغيرة"]
    A --- B0["خوارزمية نزول تدرجي تقسم بيانات التدريب إلى حُزَم صغيرة لتقدير التدرج."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
