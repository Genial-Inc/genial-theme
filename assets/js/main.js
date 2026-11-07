document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#primary-navigation');

    if (menuToggle && navMenu) {
        const closeMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', menuToggle.dataset.openLabel);
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        };

        menuToggle.dataset.openLabel = menuToggle.getAttribute('aria-label');
        menuToggle.dataset.closeLabel = document.documentElement.lang.startsWith('fr')
            ? 'Fermer le menu de navigation'
            : 'Close navigation menu';

        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeMenu();
                return;
            }

            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', menuToggle.dataset.closeLabel);
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    const carousel = document.querySelector('[data-carousel]');
    if (carousel) {
        const track = carousel.querySelector('[data-carousel-track]');
        const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
        const previousButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        let currentIndex = 0;

        const goTo = (index) => {
            if (slides.length === 0) return;
            currentIndex = (index + slides.length) % slides.length;
            track.scrollTo({
                left: slides[currentIndex].offsetLeft - slides[0].offsetLeft,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        };

        previousButton?.addEventListener('click', () => goTo(currentIndex - 1));
        nextButton?.addEventListener('click', () => goTo(currentIndex + 1));

        track.addEventListener('scroll', () => {
            const trackStart = track.getBoundingClientRect().left;
            const nearest = slides.reduce((bestIndex, slide, index) => {
                const distance = Math.abs(slide.getBoundingClientRect().left - trackStart);
                const bestDistance = Math.abs(slides[bestIndex].getBoundingClientRect().left - trackStart);
                return distance < bestDistance ? index : bestIndex;
            }, 0);
            currentIndex = nearest;
        }, { passive: true });
    }
});
