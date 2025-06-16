// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Update ARIA attributes
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Banner Slider
let currentSlide = 0;
const banners = document.querySelectorAll('.banner');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Remove active class from all banners and dots
    banners.forEach(banner => {
        banner.classList.remove('active');
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
    });
    
    // Add active class to current banner and dot
    banners[index].classList.add('active');
    dots[index].classList.add('active');
    dots[index].setAttribute('aria-selected', 'true');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % banners.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 6 seconds
let slideInterval = setInterval(nextSlide, 6000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        // Reset interval when user manually changes slide
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    });
    
    // Keyboard navigation for dots
    dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showSlide(index);
        }
    });
});

// Touch/swipe support for mobile banner navigation
let touchStartX = 0;
let touchEndX = 0;
const bannerSlider = document.querySelector('.banner-slider');

if (bannerSlider) {
    bannerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    bannerSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            currentSlide = currentSlide > 0 ? currentSlide - 1 : banners.length - 1;
            showSlide(currentSlide);
        }
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio item hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Language switching functionality
const translations = {
    pt: {
        inicio: 'Início',
        portfolio: 'Portefólio',
        contacto: 'Contacto',
        doacoes: 'Doações',
        nome: 'Simão Araújo',
        sobre: 'Olá, eu sou Simão Araújo, programador, designer e escritor português. Desde cedo, fui tomado por um grande amor por estas artes e procuro sempre criar algo novo.',
        empresas: 'Empresas com quem colaborei',
        ver: 'Ver',
        disponivel: 'Disponível',
        direitos: '© 2025 - Simão Araújo - todos os direitos reservados'
    },
    en: {
        inicio: 'Home',
        portfolio: 'Portfolio',
        contacto: 'Contact',
        doacoes: 'Donations',
        nome: 'Simão Araújo',
        sobre: 'Hello, I am Simão Araújo, a Portuguese programmer, designer and writer. From an early age, I was taken by a great love for these arts and I always seek to create something new.',
        empresas: 'Companies I collaborated with',
        ver: 'View',
        disponivel: 'Available',
        direitos: '© 2025 - Simão Araújo - all rights reserved'
    }
};

let currentLanguage = 'pt';

function switchLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('preferred-language', lang);
    
    // Update flag visual state
    updateFlagStates(lang);
    
    // Update donation block aria-label
    const donationBlock = document.querySelector('.donation-block');
    if (donationBlock) {
        donationBlock.setAttribute('aria-label', lang === 'pt' ? 'Fazer doação via Wise' : 'Make donation via Wise');
    }
}

function updateFlagStates(lang) {
    const flags = document.querySelectorAll('.flag');
    flags.forEach(flag => {
        if ((lang === 'pt' && flag.textContent === '🇵🇹') ||
            (lang === 'en' && flag.textContent === '🇬🇧')) {
            flag.style.opacity = '1';
            flag.style.transform = 'scale(1.1)';
        } else {
            flag.style.opacity = '0.6';
            flag.style.transform = 'scale(1)';
        }
    });
}

// Language flag functionality
const flags = document.querySelectorAll('.flag');
flags.forEach(flag => {
    flag.addEventListener('click', () => {
        if (flag.textContent === '🇵🇹') {
            switchLanguage('pt');
        } else if (flag.textContent === '🇬🇧') {
            switchLanguage('en');
        }
    });
    
    // Keyboard support for flags
    flag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flag.click();
        }
    });
});

// Donation block click handler with Wise link
const donationBlock = document.querySelector('.donation-block');
if (donationBlock) {
    donationBlock.addEventListener('click', () => {
        // Open Wise donation link
        window.open('https://wise.com/pay/me/simaoa65', '_blank');
        console.log('Opening Wise donation page');
    });
    
    // Add cursor pointer and hover effects
    donationBlock.style.cursor = 'pointer';
    donationBlock.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    
    donationBlock.addEventListener('mouseenter', () => {
        donationBlock.style.transform = 'translateY(-2px)';
        donationBlock.style.boxShadow = '0 4px 15px rgba(38, 39, 255, 0.3)';
    });
    
    donationBlock.addEventListener('mouseleave', () => {
        donationBlock.style.transform = 'translateY(0)';
        donationBlock.style.boxShadow = 'none';
    });
    
    // Add keyboard support
    donationBlock.setAttribute('tabindex', '0');
    donationBlock.setAttribute('role', 'button');
    donationBlock.setAttribute('aria-label', currentLanguage === 'pt' ? 'Fazer doação via Wise' : 'Make donation via Wise');
    
    donationBlock.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open('https://wise.com/pay/me/simaoa65', '_blank');
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.about-section, .portfolio-section, .companies-section');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header scroll effect - Only adds shadow, doesn't change colors
const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    
    // Only adds shadow, without changing colors
    if (scrollTop > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    
    // Arrow keys for banner navigation
    if (e.key === 'ArrowLeft') {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : banners.length - 1;
        showSlide(currentSlide);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
    
    // Tab navigation for mobile menu
    if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            const imagePreload = new Image();
            imagePreload.src = img.src;
        }
    });
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn(`Failed to load image: ${this.src}`);
        this.style.opacity = '0.5';
        this.alt = 'Image not available';
    });
});

// Add ripple effect to interactive elements
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.querySelectorAll('.btn-ver').forEach(addRippleEffect);

// Status indicator functionality
function updateStatus() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status span');
    
    if (statusDot && statusText) {
        // You can modify this logic based on your actual availability
        const isAvailable = true; // Change this based on your status
        
        if (isAvailable) {
            statusDot.style.backgroundColor = '#4CAF50'; // Green
            statusText.textContent = translations[currentLanguage].disponivel;
        } else {
            statusDot.style.backgroundColor = '#f44336'; // Red
            statusText.textContent = currentLanguage === 'pt' ? 'Ocupado' : 'Busy';
        }
        
        // Add pulsing animation
        statusDot.style.animation = 'pulse 2s infinite';
    }
}

// Add pulse animation CSS
const pulseCSS = `
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
}

.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #4CAF50;
    display: inline-block;
    margin-right: 8px;
}
`;

const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseCSS;
document.head.appendChild(pulseStyle);

// Enhanced accessibility features
function enhanceAccessibility() {
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#inicio';
    skipLink.textContent = currentLanguage === 'pt' ? 'Saltar para conteúdo principal' : 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Form validation utilities (for future use)
const validation = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    required: (value) => {
        return value && value.trim().length > 0;
    },
    
    minLength: (value, min) => {
        return value && value.length >= min;
    }
};

// Smooth reveal animations for sections
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.about-content, .portfolio-item, .companies-img');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animations
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

// Enhanced mobile menu functionality
function setupMobileMenu() {
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    
    document.body.appendChild(mobileMenuOverlay);
    
    // Show/hide overlay with menu
    hamburger.addEventListener('click', () => {
        setTimeout(() => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenuOverlay.style.opacity = '1';
                mobileMenuOverlay.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuOverlay.style.opacity = '0';
                mobileMenuOverlay.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }
        }, 10);
    });
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.style.opacity = '0';
        mobileMenuOverlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    });
}

// Social media links functionality
const socialLinks = document.querySelectorAll('.social-icon');
socialLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // Let the default behavior work (following the href)
        console.log(`Social link clicked: ${link.getAttribute('href')}`);
    });
});

// Portfolio links functionality
const portfolioLinks = document.querySelectorAll('.btn-ver');
portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading state
        const originalText = link.textContent;
        link.textContent = currentLanguage === 'pt' ? 'Carregando...' : 'Loading...';
        link.style.opacity = '0.7';
        
        // Reset after a short delay (in case the link doesn't navigate immediately)
        setTimeout(() => {
            link.textContent = originalText;
            link.style.opacity = '1';
        }, 2000);
    });
});

// Performance optimization - Reduce motion for users who prefer it
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize all functionality
function init() {
    enhanceAccessibility();
    setupRevealAnimations();
    setupMobileMenu();
    respectReducedMotion();
    updateStatus();
    
    // Update status periodically (every 5 minutes)
    setInterval(updateStatus, 300000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
        switchLanguage(savedLanguage);
    } else {
        updateFlagStates(currentLanguage);
    }
    
    // Ensure first slide is active
    showSlide(0);
    
    // Preload images
    preloadImages();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Set up ARIA attributes
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Initialize other features
    init();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        }, 0);
    });
}

// Lazy loading for images with data-src attribute
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        showSlide,
        validation,
        translations
    };
}