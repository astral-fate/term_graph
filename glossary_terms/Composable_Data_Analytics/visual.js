
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تحليلات تركيبية للبيانات"]
    A --- B0["طريقة مرنة تتيح تجميع وإعادة استخدام مُكوِّنات البيانات والتحليلات الحالية"]
    A --- B1["لإنشاء حلول مخصصة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
