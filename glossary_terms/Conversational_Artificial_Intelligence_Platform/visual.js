
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["منصة ذكاء اصطناعي تحاوري"]
    A --- B0["حل برمجي يتيح تطوير واجهات محادثة مدعومة بالذكاء الاصطناعي ونشرها"]
    A --- B1["لتسهيل التواصل باللغات الطبيعية بين البشر وأجهزة الحاسب."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
