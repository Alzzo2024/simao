document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Initial setup for mobile menu
    function initializeMobileMenu() {
        if (!navLinks) return;
        
        if (window.innerWidth <= 768) {
            navLinks.style.cssText = `
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(18, 18, 18, 0.95);
                backdrop-filter: blur(10px);
                display: none;
                transform: translateX(-100%);
                transition: transform 0.3s ease-in-out;
            `;
        } else {
            navLinks.style.cssText = `
                position: relative;
                transform: none;
                display: flex;
                background: none;
                width: auto;
                height: auto;
            `;
        }
    }

    // Initialize on page load
    initializeMobileMenu();

    // Toggle menu function
    function toggleMenu() {
        if (!hamburger || !navLinks) return;

        const isOpening = !hamburger.classList.contains('active');

        hamburger.classList.toggle('active');

        if (isOpening) {
            navLinks.style.display = 'flex';
            requestAnimationFrame(() => {
                navLinks.style.transform = 'translateX(0)';
            });
            body.style.overflow = 'hidden';
        } else {
            navLinks.style.transform = 'translateX(-100%)';
            body.style.overflow = '';
            setTimeout(() => {
                if (!hamburger.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
    }

    // Window resize handler
    function handleResize() {
        if (!navLinks) return;

        if (window.innerWidth > 768) {
            navLinks.style.cssText = `
                position: relative;
                transform: none;
                display: flex;
                background: none;
                width: auto;
                height: auto;
            `;
            body.style.overflow = '';
            hamburger?.classList.remove('active');
        } else {
            if (!hamburger?.classList.contains('active')) {
                navLinks.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: rgba(18, 18, 18, 0.95);
                    backdrop-filter: blur(10px);
                    display: none;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease-in-out;
                `;
            }
        }
    }

    // Event Listeners
    window.addEventListener('resize', handleResize);
    hamburger?.addEventListener('click', toggleMenu);

    // Handle navigation item clicks
    const navItems = document.querySelectorAll('.nav-links a, .nav-links .container');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (hamburger?.classList.contains('active') && 
            !navLinks?.contains(e.target) && 
            !hamburger?.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger?.classList.contains('active')) {
            toggleMenu();
        }
    });
});
