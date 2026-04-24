
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["سوق البيانات"]
    A --- B0["منصة إلكترونية عملُها الرئيس توفير البيانات أو أي خدمات ذات صلة"]
    A --- B1["كما تسمح بشراء وبيع البيانات القابلة للقراءة آليًّا."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
