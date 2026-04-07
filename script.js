// Intersection Observer for Animations (opacity + transform)
document.addEventListener("DOMContentLoaded", () => {

    // 1. Fade-in on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opt-out of observing once animated to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 2. Hamburger Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const megaMenu = document.querySelector('.mega-menu');

    if (menuToggle && megaMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = megaMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Cerrar el menú al hacer clic en cualquier enlace dentro del menú
        megaMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                megaMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2.2 Mega Menu Dynamic Previews
    const menuLinks = document.querySelectorAll('.mega-menu ul li a');
    const menuPreviewImg = document.getElementById('menu-preview-img');
    const menuPreviewText = document.getElementById('menu-preview-text');

    const menuProducts = {
        'atrapamugre-pesado': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600',
        'atrapamugre-medio': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600',
        'alumat': 'https://images.unsplash.com/photo-1595428774223-ef52624120ec?q=80&w=600',
        'humedad': 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=600',
        'publicitaria': 'https://images.unsplash.com/photo-1528642463367-1d3083c1c7bb?q=80&w=600',
        'lana': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600',
        'gym': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600'
    };

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const text = link.innerText.toLowerCase();
            let img = '';
            let name = '';

            if (text.includes('pesado')) { img = menuProducts['atrapamugre-pesado']; name = 'Tráfico Pesado'; }
            else if (text.includes('medio')) { img = menuProducts['atrapamugre-medio']; name = 'Tráfico Medio'; }
            else if (text.includes('alumat')) { img = menuProducts['alumat']; name = 'Alumat'; }
            else if (text.includes('humedad')) { img = menuProducts['humedad']; name = 'Atrapahumedad'; }
            else if (text.includes('publicitaria')) { img = menuProducts['publicitaria']; name = 'Logos Personalizados'; }
            else if (text.includes('lana')) { img = menuProducts['lana']; name = 'Lana Natural'; }
            else if (text.includes('gym')) { img = menuProducts['gym']; name = 'Pisos Caucho'; }

            if (img && menuPreviewImg) {
                menuPreviewImg.classList.remove('active');
                setTimeout(() => {
                    menuPreviewImg.src = img;
                    if (menuPreviewText) menuPreviewText.innerText = name;
                    menuPreviewImg.classList.add('active');
                }, 50);
            }
        });
    });

    // 3. Product Hover Image Logic (HOME)
    const productItems = document.querySelectorAll('.hover-product-list li');
    const previewBox = document.getElementById('product-image-preview');

    if (previewBox && productItems.length > 0) {
        productItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const imgUrl = item.getAttribute('data-img');
                previewBox.style.backgroundImage = `url('${imgUrl}')`;
                previewBox.innerHTML = ''; // Limpiar el hint
            });
            item.addEventListener('mouseleave', () => {
                // Opcional: mantener la ultima o limpiar
            });
        });
    }

    // 4. Animated Counters
    const statsSection = document.querySelector('.animated-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // ms
            const frameRate = 30; // ms
            const totalFrames = Math.round(duration / frameRate);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                // Ease out quad
                const currentCount = Math.round(target * (1 - (1 - progress) * (1 - progress)));

                // Format with dots for thousands
                stat.innerText = currentCount.toLocaleString('es-CO');

                if (frame === totalFrames) {
                    clearInterval(counter);
                    stat.innerText = target.toLocaleString('es-CO');
                }
            }, frameRate);
        });
    }

    // 5. Atrapamugre Interactive Page Logic (Redesign)
    const lineTabs = document.querySelectorAll('.line-tab');
    const trafficDatas = document.querySelectorAll('.traffic-data');
    const swatches = document.querySelectorAll('.swatch');
    const maintBtns = document.querySelectorAll('.maint-btn');
    const monitorViews = document.querySelectorAll('.monitor-view');
    
    // Monitors and Labels
    const imgColorMonitor = document.getElementById('img-color-monitor');
    const txtColorName = document.getElementById('txt-color-name');
    const imgMaintMonitor = document.getElementById('img-maint-monitor');
    const txtMaintStep = document.getElementById('txt-maint-step');

    function setMonitorView(viewId) {
        monitorViews.forEach(view => {
            view.classList.remove('active');
            if (view.id === viewId) view.classList.add('active');
        });
    }

    // Tabs logic
    if (lineTabs.length > 0) {
        lineTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-traffic');
                
                lineTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                trafficDatas.forEach(data => {
                    data.classList.remove('active');
                    if (data.id === `content-${target}`) {
                        data.classList.add('active');
                        // Reset and trigger stats animation
                        hasAnimatedStats = false; 
                        animateNumbers(); 
                    }
                });
            });
        });
    }

    // Swatches (Color) logic
    if (swatches.length > 0) {
        swatches.forEach(swatch => {
            swatch.addEventListener('mouseenter', () => {
                const color = swatch.getAttribute('data-color');
                const img = swatch.getAttribute('data-img');
                
                if (imgColorMonitor) imgColorMonitor.src = img;
                if (txtColorName) txtColorName.innerText = color;
                setMonitorView('view-color');
            });
            swatch.addEventListener('mouseleave', () => {
                setMonitorView('view-default');
            });
        });
    }

    // Maintenance logic
    if (maintBtns.length > 0) {
        maintBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const step = btn.getAttribute('data-step');
                const img = btn.getAttribute('data-img');
                
                if (imgMaintMonitor) imgMaintMonitor.src = img;
                if (txtMaintStep) txtMaintStep.innerText = step;
                setMonitorView('view-maint');
            });
            btn.addEventListener('mouseleave', () => {
                setMonitorView('view-default');
            });
        });
    }
});
