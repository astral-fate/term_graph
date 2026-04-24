
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["تضمين المستندات الافتراضي"]
    A --- B0["أسلوب استرجاع يُنشئ تضمينات افتراضية للمستندات"]
    A --- B1["ثم يستخدمها لاسترداد مستندات مماثلة من نفس مساحة التضمين."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
