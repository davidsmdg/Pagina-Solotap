document.addEventListener("DOMContentLoaded", () => {
    // 1. Hamburger Menu Logic (TOP PRIORITY)
    const menuToggle = document.querySelector('.menu-toggle');
    const megaMenu = document.querySelector('.mega-menu');

    if (menuToggle && megaMenu) {
        menuToggle.addEventListener('click', (e) => {
            console.log('Menu toggle clicked');
            e.preventDefault();
            const isActive = megaMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('Menu active state:', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        megaMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                megaMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Fade-in on scroll
    try {
        const fadeElements = document.querySelectorAll('.fade-in');
        const observerOptions = { threshold: 0.1 };
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        fadeElements.forEach(el => fadeObserver.observe(el));
    } catch (e) { console.warn("Fade observer error ignored."); }

    // 3. Mega Menu Previews
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
            if (!menuPreviewImg) return;
            const text = link.innerText.toLowerCase();
            let img = '', name = '';
            if (text.includes('pesado')) { img = menuProducts['atrapamugre-pesado']; name = 'Tráfico Pesado'; }
            else if (text.includes('medio')) { img = menuProducts['atrapamugre-medio']; name = 'Tráfico Medio'; }
            else if (text.includes('alumat')) { img = menuProducts['alumat']; name = 'Alumat'; }
            else if (text.includes('humedad')) { img = menuProducts['humedad']; name = 'Atrapahumedad'; }
            else if (text.includes('publicitaria')) { img = menuProducts['publicitaria']; name = 'Logos Personalizados'; }
            else if (text.includes('lana')) { img = menuProducts['lana']; name = 'Lana Natural'; }
            else if (text.includes('gym')) { img = menuProducts['gym']; name = 'Pisos Caucho'; }

            if (img) {
                menuPreviewImg.classList.remove('active');
                setTimeout(() => {
                    if (menuPreviewImg) {
                        menuPreviewImg.src = img;
                        if (menuPreviewText) menuPreviewText.innerText = name;
                        menuPreviewImg.classList.add('active');
                    }
                }, 50);
            }
        });
    });

    // 4. Product Hover (HOME)
    const previewBox = document.getElementById('product-image-preview');
    if (previewBox) {
        document.querySelectorAll('.hover-product-list li').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const imgUrl = item.getAttribute('data-img');
                previewBox.style.backgroundImage = `url('${imgUrl}')`;
                previewBox.innerHTML = '';
            });
        });
    }

    // 5. Counters
    function animateNumbers() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!target) return;
            let current = 0;
            const timer = setInterval(() => {
                current += target / 100;
                if (current >= target) {
                    stat.innerText = target.toLocaleString('es-CO');
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.round(current).toLocaleString('es-CO');
                }
            }, 20);
        });
    }

    const statsSection = document.querySelector('.animated-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                animateNumbers();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.1 });
        statsObserver.observe(statsSection);
    }
});
