
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["بوت محادثة موجَّه"]
    A --- B0["بوت محادثة قائم على قواعد"]
    A --- B1["ويشتمل على تسلسل من محادثات مُعَدَّة سابقًا"]
    A --- B2["ويُطلق عليه أيضًا "بوت محادثة قائم على قواعد""]
    A --- B3["أو "بوت محادثة قائم على كلمات مفتاحية"."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
