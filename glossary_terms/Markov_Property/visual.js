
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["خاصية ماركوف"]
    A --- B0["مفهوم يصف عملية عشوائية يعتمد فيها احتمال الحالات المستقبلية على الحالة الحالية فقط"]
    A --- B1["وليس على تسلسل من الأحداث التي قبلها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
