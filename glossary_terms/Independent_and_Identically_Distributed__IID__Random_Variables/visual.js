
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["متغيرات مستقلة ومتطابقة التوزيع"]
    A --- B0["متغيرات عشوائية مستقلة عن بعضها البعض"]
    A --- B1["ولها نفس التوزيع الاحتمالي."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
