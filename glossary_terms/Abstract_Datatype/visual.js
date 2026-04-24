
function renderVisual(container, termData) {
    const mermaidCode = `graph TD
A["نوع البيانات المجرد"] --> B["تعريف النوع"]
B --> C["القيم الممكنة"]
B --> D["العمليات المسموحة"]
C --> E["أمثلة القيم"]
D --> F["الدوال والإجراءات"]
E --> G["عدد صحيح: 1, 2, 3, ..."]
E --> H["نص: ""مرحبا"", ""عالم"""]
E --> I["منطقية: صحيح, خطأ"]
F --> J["العمليات الأساسية"]
F --> K["العمليات المتقدمة"]
J --> L["الجمع، الطرح، الضرب، القسمة"]
K --> M["الفرز، البحث، التكرار"]
A --> N["الاستقلال عن التنفيذ"]
N --> O["التنفيذ باستخدام المصفوفات"]
N --> P["التنفيذ باستخدام القوائم"]
N --> Q["التنفيذ باستخدام الأشجار"]
O --> R["التخزين المتسلسل"]
P --> S["التخزين الديناميكي"]
Q --> T["التخزين الهرمي"]
A --> U["الفوائد"]
U --> V["إعادة الاستخدام"]
U --> W["الصيانة الأسهل"]
U --> X["التجريد العالي"]`;
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
