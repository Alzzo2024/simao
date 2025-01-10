document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Set initial visibility based on screen size
    const setInitialVisibility = () => {
        if (window.innerWidth > 768) {
            navLinks.style.visibility = 'visible';
        } else {
            navLinks.style.visibility = 'hidden';
        }
    };

    // Run on load
    setInitialVisibility();

    // Toggle menu function with improved visibility handling
    const toggleMenu = () => {
        if (hamburger && navLinks) {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navLinks.style.visibility = navLinks.classList.contains('active') ? 'visible' : 'hidden';
            body.classList.toggle('no-scroll');
        }
    };

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.visibility = 'visible';
            body.classList.remove('no-scroll');
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.visibility = 'hidden';
        }
    });

    // Hamburger click event
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Handle all navigation items
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
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger?.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
            toggleMenu();
        }
    });
});
