document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Set initial state for all pages
    if (navLinks) {
        navLinks.style.transition = 'transform 0.3s ease-in-out';
        if (window.innerWidth <= 768) {
            navLinks.style.transform = 'translateX(-100%)';
        }
    }

    // Toggle menu function
    const toggleMenu = () => {
        if (hamburger && navLinks) {
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.transform = 'translateX(0)';
                body.style.overflow = 'hidden';
            } else {
                navLinks.style.transform = 'translateX(-100%)';
                body.style.overflow = '';
            }
        }
    };

    // Window resize handler
    window.addEventListener('resize', () => {
        if (navLinks) {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.transform = 'translateX(0)';
                body.style.overflow = '';
                hamburger?.classList.remove('active');
            } else if (!hamburger?.classList.contains('active')) {
                navLinks.style.transform = 'translateX(-100%)';
            }
        }
    });

    // Event listeners
    hamburger?.addEventListener('click', toggleMenu);

    // Navigation items click handler
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
