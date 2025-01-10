document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Set initial state
    const setInitialState = () => {
        if (navLinks) {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.transform = 'none';
            } else {
                navLinks.style.display = 'none';
                navLinks.style.transform = 'translateX(-100%)';
            }
        }
    };

    setInitialState();

    // Toggle menu function
    const toggleMenu = () => {
        if (hamburger && navLinks) {
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                navLinks.style.display = 'flex';
                // Force reflow
                navLinks.offsetHeight;
                navLinks.style.transform = 'translateX(0)';
            } else {
                navLinks.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    if (!hamburger.classList.contains('active')) {
                        navLinks.style.display = 'none';
                    }
                }, 300);
            }
            
            body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        }
    };

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.transform = 'none';
            body.style.overflow = '';
            hamburger.classList.remove('active');
        } else if (!hamburger.classList.contains('active')) {
            navLinks.style.display = 'none';
            navLinks.style.transform = 'translateX(-100%)';
        }
    });

    // Event listeners
    hamburger?.addEventListener('click', toggleMenu);

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
