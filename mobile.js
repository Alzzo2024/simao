document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const existingCloseButton = document.querySelector('.nav-close');

    // Remove existing close button if it exists
    if (existingCloseButton) {
        existingCloseButton.remove();
    }

    // Create and append new close button
    const closeButton = document.createElement('button');
    closeButton.className = 'nav-close';
    closeButton.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    `;
    navLinks.prepend(closeButton);

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('menu-open');
    };

    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) &&
            !hamburger.contains(e.target) &&
            navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Handle menu link clicks on mobile
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Fix button display on mobile
    const subscribeButton = document.querySelector('.button');
    if (subscribeButton) {
        subscribeButton.style.width = 'auto';
        subscribeButton.style.margin = '10px 0';
    }
});
