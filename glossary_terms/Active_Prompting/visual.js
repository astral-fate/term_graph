
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أوامر نشطة"]
    A --- B0["طريقة لتكييف نموذج على مهام محددة عن طريق اختيار الأسئلة الأكثر غموضًا"]
    A --- B1["وتوصيفها باستخدام أوامر متعلقة بالمهام وتسلسل الأفكار."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
