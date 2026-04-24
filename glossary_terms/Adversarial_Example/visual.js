
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["مثال عدائي"]
    A --- B0["مُدْخَلات صُمِّمت عمدًا لخداع نموذج تعلُّم الآلة"]
    A --- B1["ودفعه لارتكاب الأخطاء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
