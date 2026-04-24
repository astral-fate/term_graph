
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تفسير مغاير"]
    A --- B0["طريقة تُستخدم لشرح القرارات التي تتخذها نماذج تعلُّم الآلة"]
    A --- B1["عن طريق وصف التغييرات في البيانات المُدْخَلة التي من الممكن أن تؤدي إلى نتائج مختلفة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
