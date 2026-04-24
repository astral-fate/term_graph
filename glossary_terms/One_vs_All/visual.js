
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["واحد مقابل الكل"]
    A --- B0["طريقة تصنيف للتعامل مع المشكلات المتعددة الأصناف باستخدام مصنِّفات ثنائية متعددة"]
    A --- B1["بمقدار مُصنِّف ثنائي واحد لكل نتيجة محتملة."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
