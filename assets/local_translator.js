
(function() {
    let isArabic = localStorage.getItem('isArabic') === 'true';
    const originalTextCache = new Map();
    let cacheIdCounter = 0;

    function translateNode(node) {
        if (node.nodeType === 3) {
            let text = node.nodeValue;
            let trimmed = text.trim();
            if (!trimmed) return;

            let parent = node.parentNode;
            if (!parent.hasAttribute('data-trans-id')) {
                let id = 'trans_' + (cacheIdCounter++);
                parent.setAttribute('data-trans-id', id);
                originalTextCache.set(id, text);
            }

            if (isArabic) {
                // Exact match from database
                if (window.FULL_DICTIONARY && window.FULL_DICTIONARY[trimmed]) {
                    node.nodeValue = text.replace(trimmed, window.FULL_DICTIONARY[trimmed]);
                    return;
                }
                
                // Partial match for longer paragraphs
                let newText = text;
                if (window.FULL_DICTIONARY) {
                    for (const [en, ar] of Object.entries(window.FULL_DICTIONARY)) {
                        if (en.length > 5 && newText.includes(en)) {
                            newText = newText.replace(en, ar);
                        }
                    }
                }
                if (newText !== text) {
                    node.nodeValue = newText;
                }
            } else {
                let id = parent.getAttribute('data-trans-id');
                if (id && originalTextCache.has(id)) {
                    node.nodeValue = originalTextCache.get(id);
                }
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            for (let i = 0; i < node.childNodes.length; i++) {
                translateNode(node.childNodes[i]);
            }
        }
    }

    function updatePage() {
        if (isArabic) {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
            document.body.style.fontFamily = "'Tajawal', sans-serif";
            document.body.style.textAlign = "right";
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
            document.body.style.fontFamily = "";
            document.body.style.textAlign = "left";
        }
        translateNode(document.body);
    }

    const observer = new MutationObserver((mutations) => {
        if (!isArabic) return;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => translateNode(node));
            }
        });
    });

    window.addEventListener('load', () => {
        const btn = document.createElement('button');
        btn.innerHTML = isArabic ? 'English' : 'عربي';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.left = '20px';
        btn.style.padding = '10px 20px';
        btn.style.backgroundColor = '#10b981';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.borderRadius = '30px';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = '999999';
        btn.style.fontFamily = "'Tajawal', sans-serif";
        btn.style.fontSize = '16px';
        btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        
        btn.onclick = () => {
            isArabic = !isArabic;
            localStorage.setItem('isArabic', isArabic);
            btn.innerHTML = isArabic ? 'English' : 'عربي';
            updatePage();
        };
        document.body.appendChild(btn);
        
        updatePage();
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
