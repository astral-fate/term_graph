
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تسلسل أمامي"]
    A --- B0["طريقة استدلال تبدأ بمجموعة من الحقائق المعروفة"]
    A --- B1["وتطبق قواعد الاستنتاج لاستخلاص حقائق جديدة للوصول إلى هدف أو استنتاج محدد."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
