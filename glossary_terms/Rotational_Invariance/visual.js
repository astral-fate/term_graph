
function renderVisual(container, termData) {
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
graph TD
    A["انعدام تأثير الدوران"]
    A --- B0["قدرة الخوارزمية على تصنيف الصور تصنيفًا صحيحًا"]
    A --- B1["بغضِّ النظر عن التغيّر في اتجاهها."]
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error(e); }
        }
    }, 50);
}
