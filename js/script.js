        document.addEventListener('DOMContentLoaded', function () {
            // #region agent log
            const checkFontLoading = () => {
                const bodyStyle = window.getComputedStyle(document.body);
                const htmlStyle = window.getComputedStyle(document.documentElement);
                const computedFontBody = bodyStyle.fontFamily;
                const computedFontHtml = htmlStyle.fontFamily;
                const allSheets = Array.from(document.styleSheets);
                const cssFilesStatus = allSheets.map(sheet => {
                    try { return {href: sheet.href, loaded: sheet.cssRules !== null, rulesCount: sheet.cssRules?.length || 0}; } catch(e) { return {href: sheet.href, loaded: false, error: e.message}; }
                });
                const systemCssSheet = allSheets.find(sheet => {
                    try { return sheet.href && sheet.href.includes('system.css'); } catch(e) { return false; }
                });
                const systemCssLoaded = !!systemCssSheet;
                let systemCssRules = [];
                if (systemCssSheet) {
                    try {
                        if (systemCssSheet.cssRules) {
                            Array.from(systemCssSheet.cssRules).forEach(rule => {
                                if (rule.style && rule.style.fontFamily) {
                                    systemCssRules.push({selector: rule.selectorText, fontFamily: rule.style.fontFamily});
                                }
                            });
                        }
                    } catch(e) { systemCssRules = [{error: e.message}]; }
                }
                const googleFontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
                const googleFontsLoaded = googleFontsLink && googleFontsLink.sheet !== null;
                const fontFaceRules = [];
                allSheets.forEach(sheet => {
                    try {
                        if (sheet.cssRules) {
                            Array.from(sheet.cssRules).forEach(rule => {
                                if (rule.type === CSSRule.FONT_FACE_RULE) fontFaceRules.push(rule.cssText);
                            });
                        }
                    } catch(e) {}
                });
                const fontFamilyRules = [];
                allSheets.forEach(sheet => {
                    try {
                        if (sheet.cssRules) {
                            Array.from(sheet.cssRules).forEach(rule => {
                                if (rule.style && rule.style.fontFamily) {
                                    fontFamilyRules.push({selector: rule.selectorText, fontFamily: rule.style.fontFamily, sheetHref: sheet.href});
                                }
                            });
                        }
                    } catch(e) {}
                });
                const logData1 = {computedFontBody, computedFontHtml, systemCssLoaded, systemCssRules, googleFontsLoaded, googleFontsHref:googleFontsLink?.href||null, cssFilesStatus};
                console.log('Font diagnostic - CSS loading:', logData1);
                fetch('http://127.0.0.1:7242/ingest/3303bda7-3429-4c4d-b268-0dfd265126cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:6',message:'Font diagnostic - CSS loading',data:logData1,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                const logData2 = {fontFaceRules, fontFamilyRules};
                console.log('Font diagnostic - Font rules:', logData2);
                fetch('http://127.0.0.1:7242/ingest/3303bda7-3429-4c4d-b268-0dfd265126cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:7',message:'Font diagnostic - Font rules',data:logData2,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            };
            setTimeout(checkFontLoading, 1000);
            // #endregion agent log
            let lastY = window.scrollY;
            let ticking = false;
            const nav = document.querySelector('nav');
            const fonduNavbar = document.querySelector('.fondu-navbar');
            const DELTA = 10;
            if (!nav) return;
            function onScroll() {
                const currentY = window.scrollY;
                if (Math.abs(currentY - lastY) < DELTA) { ticking = false; return; }
                if (currentY > lastY && currentY > 100) {
                    nav.classList.add('hidden');
                    if (fonduNavbar) fonduNavbar.classList.add('hidden');
                } else {
                    nav.classList.remove('hidden');
                    if (fonduNavbar) fonduNavbar.classList.remove('hidden');
                }
                lastY = currentY <= 0 ? 0 : currentY;
                ticking = false;
            }
            window.addEventListener('scroll', function () {
                if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
            }, { passive: true });
            
            // Menu hamburger (expositions.html)
            const btnMenu = document.querySelector('.btn-menu');
            if (btnMenu) {
                btnMenu.addEventListener('click', function() {
                    nav.classList.toggle('menu-open');
                    document.body.classList.toggle('menu-open');
                });
                
                // Fermer le menu quand on clique sur un lien
                const navLinks = document.querySelectorAll('nav ul li a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        nav.classList.remove('menu-open');
                        document.body.classList.remove('menu-open');
                    });
                });
            }
            
            // Menu hamburger (index.html - burger-menu)
            const burgerMenu = document.querySelector('.burger-menu');
            if (burgerMenu) {
                burgerMenu.addEventListener('click', function() {
                    nav.classList.toggle('menu-open');
                    document.body.classList.toggle('menu-open');
                });
                
                // Fermer le menu quand on clique sur un lien
                const navLinks = document.querySelectorAll('nav ul li a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        nav.classList.remove('menu-open');
                        document.body.classList.remove('menu-open');
                    });
                });
            }
        });