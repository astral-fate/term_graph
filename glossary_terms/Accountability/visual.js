
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["المسؤولية"] --> B["التعريف"]
B --> C["حالة من المسؤولية عن شيء ما"]
C --> D["أساس المسؤولية"]
D --> E["التنظيم"]
D --> F["الاتفاق"]
D --> G["التعيين"]
E --> H["القوانين واللوائح"]
F --> I["العقود والالتزامات"]
G --> J["المناصب والصلاحيات"]
H --> K["الامتثال"]
I --> L["التنفيذ"]
J --> M["السلطة والواجب"]
K --> N["المراجعة والتدقيق"]
L --> N
M --> N
N --> O["المساءلة"]
O --> P["النتائج"]
P --> Q["النجاح"]
P --> R["الفشل"]
Q --> S["المكافأة"]
R --> T["العقوبات"]
S --> U["تعزيز الثقة"]
T --> V["تحسين الأداء"]
U --> W["الشفافية"]
V --> W
W --> X["النهاية"]`;
    container.innerHTML = `
        <div class="mermaid" style="display:flex; justify-content:center; align-items:center; height:100%;">
${mermaidCode}
        </div>
    `;
    setTimeout(() => {
        if (window.mermaid) { 
            try { window.mermaid.init(undefined, container.querySelectorAll('.mermaid')); } 
            catch (e) { console.error("Mermaid Error:", e); }
        }
    }, 50);
}
