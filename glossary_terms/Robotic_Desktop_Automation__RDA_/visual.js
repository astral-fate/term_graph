
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["أتمتة روبوتية لسطح المكتب"]
    A --- B0["برمجيات لأتمتة المهام الروتينية المتكررة على سطح مكتب المستخدم"]
    A --- B1["وغالبًا ما تحاكي الإجراءات البشرية لتحسين الكفاءة وتقليل الأخطاء."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
