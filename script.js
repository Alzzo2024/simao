// DOM Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenu = document.getElementById('closeMenu');
const languageBtn = document.getElementById('languageBtn');
const languageModal = document.getElementById('languageModal');
const categoryBtn = document.getElementById('categoryBtn');
const categoryModal = document.getElementById('categoryModal');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const selectedCategory = document.getElementById('selectedCategory');

// Language data
const translations = {
    pt: {
        'donate': 'DOAR',
        'home': 'Início',
        'portfolio': 'Portefólio',
        'articles': 'Artigos',
        'books': 'Livros',
        'contacts': 'Contactos',
        'hero-title': 'SIMÃO ARAÚJO',
        'hero-description': 'Desenvolvedor - Designer - Escritor',
        'portfolio-title': 'PORTEFÓLIO',
        'project1-title': 'Património Editorial',
        'project2-title': 'Centro Académico Tradicionalista',
        'project3-title': 'Adamastor do Xadrez',
        'view-project': 'Ver Projeto',
        'articles-title': 'ARTIGOS',
        'all-articles': 'Todas',
        'tech-articles': 'Media',
        'tech-category': 'Media',
        'article1-title': 'Conciliar o Tradicionalismo com a Era Digital',
        'read-article': 'Ler Artigo',
        'books-title': 'Livros',
        'view-book': 'Ver livro',
        'companies-title': 'EMPRESAS COM QUEM COLABOREI',
        'copyright': '© 2025 - Simão Araújo - Todos os direitos reservados',
        'available': 'Disponível'
    },
    en: {
        'donate': 'DONATE',
        'home': 'Home',
        'portfolio': 'Portfolio',
        'articles': 'Articles',
        'books': 'Books',
        'contacts': 'Contacts',
        'hero-title': 'SIMÃO ARAÚJO',
        'hero-description': 'Developer - Designer - Writter',
        'portfolio-title': 'PORTFOLIO',
        'project1-title': 'Património Editorial',
        'project2-title': 'Centro Académico Tradicionalista',
        'project3-title': 'Adamastor do Xadrez',
        'view-project': 'View Project',
        'articles-title': 'ARTICLES',
        'all-articles': 'All',
        'tech-articles': 'Media',
        'tech-category': 'Media',
        'article1-title': 'Reconciling Traditionalism with the Digital Age',
        'read-article': 'Read Article',
        'books-title': 'Books',
        'view-book': 'View book',
        'companies-title': 'COMPANIES I HAVE COLLABORATED WITH',
        'copyright': '© 2025 - Simão Araújo - All rights reserved',
        'available': 'Available'
    }
};

// Current language
let currentLanguage = 'pt';
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollTop();
    updateLanguage();
    filterArticles();
});

// Event Listeners
function initializeEventListeners() {
    // Hamburger Menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Language Modal
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageModal();
        });
    }

    // Language Options
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            closeLanguageModal();
        });
    });

    // Category Modal
    if (categoryBtn) {
        categoryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCategoryModal();
        });
    }

    // Category Options
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            changeCategory(category);
            closeCategoryModal();
        });
    });

    // Menu Navigation Links
    const menuLinks = document.querySelectorAll('.menu-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageModal.contains(e.target)) {
            closeLanguageModal();
        }
        if (!categoryBtn.contains(e.target) && !categoryModal.contains(e.target)) {
            closeCategoryModal();
        }
    });

    // Scroll Top Button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    hamburgerMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburgerMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Language Modal Functions
function toggleLanguageModal() {
    languageModal.classList.toggle('active');
    languageBtn.classList.toggle('active');
}

function closeLanguageModal() {
    languageModal.classList.remove('active');
    languageBtn.classList.remove('active');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    updateLanguageButton();
    updateLanguageOptions();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

function updateLanguageButton() {
    const flagImg = languageBtn.querySelector('img');
    const langText = languageBtn.querySelector('span') || languageBtn.childNodes[2];
    
    if (currentLanguage === 'pt') {
        flagImg.src = 'https://flagcdn.com/w20/pt.png';
        flagImg.alt = 'PT';
        if (langText && langText.nodeType === Node.TEXT_NODE) {
            langText.textContent = ' PT';
        }
    } else {
        flagImg.src = 'https://flagcdn.com/w20/gb.png';
        flagImg.alt = 'EN';
        if (langText && langText.nodeType === Node.TEXT_NODE) {
            langText.textContent = ' EN';
        }
    }
}

function updateLanguageOptions() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Category Modal Functions
function toggleCategoryModal() {
    categoryModal.classList.toggle('active');
    categoryBtn.classList.toggle('active');
}

function closeCategoryModal() {
    categoryModal.classList.remove('active');
    categoryBtn.classList.remove('active');
}

function changeCategory(category) {
    currentCategory = category;
    updateCategoryButton();
    updateCategoryOptions();
    filterArticles();
}

function updateCategoryButton() {
    const categoryText = {
        'all': currentLanguage === 'pt' ? 'Todas' : 'All',
        'tech': currentLanguage === 'pt' ? 'Media' : 'Media',
    };
    
    if (selectedCategory) {
        selectedCategory.textContent = categoryText[currentCategory] || categoryText['all'];
    }
}

function updateCategoryOptions() {
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        const category = option.getAttribute('data-category');
        if (category === currentCategory) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function filterArticles() {
    const articles = document.querySelectorAll('.article-item');
    
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        
        if (currentCategory === 'all' || articleCategory === currentCategory) {
            article.classList.remove('hidden');
            article.style.display = 'block';
        } else {
            article.classList.add('hidden');
            article.style.display = 'none';
        }
    });
}

// Scroll Functions
function initializeScrollTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.portfolio-item, .article-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Handle form submissions (if any)
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form handling logic here
        console.log('Form submitted');
    });
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}, 100);

// Replace the scroll event listener
window.addEventListener('scroll', optimizedScrollHandler);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeLanguageModal();
        closeCategoryModal();
        closeMobileMenu();
    }
    
    // Handle Enter key for buttons
    if (e.key === 'Enter') {
        if (document.activeElement === languageBtn) {
            toggleLanguageModal();
        }
        if (document.activeElement === categoryBtn) {
            toggleCategoryModal();
        }
        if (document.activeElement === hamburgerMenu) {
            toggleMobileMenu();
        }
    }
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Close modals on resize
    closeLanguageModal();
    closeCategoryModal();
}, 250));

// Preload images
function preloadImages() {
    const images = [
        'https://flagcdn.com/w20/pt.png',
        'https://flagcdn.com/w20/gb.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service Worker registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        changeLanguage,
        changeCategory,
        filterArticles,
        toggleMobileMenu,
        closeMobileMenu
    };
}