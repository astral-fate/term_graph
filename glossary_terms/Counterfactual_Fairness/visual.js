
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["إنصاف مغاير"]
    A --- B0["مقياس إنصاف يُقيِّم ما إذا كان المُصنِّف يعطي نفس النتيجة لأفراد متطابقين إلا في سمة حساسة أو أكثر."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
