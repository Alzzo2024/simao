document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const articleCards = document.querySelectorAll('.article-card');
    const sectionTitle = document.querySelector('.section-title');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt';

    const translations = {
        pt: {
            artigos: "Artigos",
            sectionTitle: "Artigos",
            searchPlaceholder: "Pesquisar artigos...",
            article1: {
                title: "Ferramentas de Programmação",
                tags: ["Ferramentas", "Programmação"],
                excerpt: "Um Ensaio sobre a Arte da Construcção Digital...",
                date: "4 Dez 2024",
                readTime: "6 min leictura",
                readMore: "Ler mais"
            }
        },
        en: {
            artigos: "Articles",
            sectionTitle: "Articles",
            searchPlaceholder: "Search articles...",
            article1: {
                title: "Programming Tools",
                tags: ["Tools", "Programming"],
                excerpt: "An Essay on the Art of Digital Construction...",
                date: "Dec 4 2024",
                readTime: "6 min read",
                readMore: "Read more"
            }
        },
        es: {
            artigos: "Artículos",
            sectionTitle: "Artículos",
            searchPlaceholder: "Buscar artículos...",
            article1: {
                title: "Herramientas de Programación",
                tags: ["Herramientas", "Programación"],
                excerpt: "Un Ensayo sobre el Arte de la Construcción Digital...",
                date: "4 Dic 2024",
                readTime: "6 min lectura",
                readMore: "Leer más"
            }
        },
        fr: {
            artigos: "Articles",
            sectionTitle: "Articles",
            searchPlaceholder: "Rechercher des articles...",
            article1: {
                title: "Outils de Programmation",
                tags: ["Outils", "Programmation"],
                excerpt: "Un Essai sur l'Art de la Construction Numérique...",
                date: "4 Déc 2024",
                readTime: "6 min lecture",
                readMore: "Lire plus"
            }
        },
        it: {
            artigos: "Articoli",
            sectionTitle: "Articoli",
            searchPlaceholder: "Cerca articoli...",
            article1: {
                title: "Strumenti di Programmazione",
                tags: ["Strumenti", "Programmazione"],
                excerpt: "Un Saggio sull'Arte della Costruzione Digitale...",
                date: "4 Dic 2024",
                readTime: "6 min lettura",
                readMore: "Leggi di più"
            }
        },
        nl: {
            artigos: "Artikelen",
            sectionTitle: "Artikelen",
            searchPlaceholder: "Zoek artikelen...",
            article1: {
                title: "Programmeertools",
                tags: ["Tools", "Programmeren"],
                excerpt: "Een Essay over de Kunst van Digitale Constructie...",
                date: "4 Dec 2024",
                readTime: "6 min leestijd",
                readMore: "Lees meer"
            }
        },
        ru: {
            artigos: "Статьи",
            sectionTitle: "Статьи",
            searchPlaceholder: "Поиск статей...",
            article1: {
                title: "Инструменты программирования",
                tags: ["Инструменты", "Программирование"],
                excerpt: "Эссе об искусстве цифрового конструирования...",
                date: "4 Дек 2024",
                readTime: "6 мин чтения",
                readMore: "Читать далее"
            }
        }
    };

    function updateArticleContent(language) {
        const content = translations[language];
        if (!content) return;

        // Update section title
        if (sectionTitle) {
            sectionTitle.textContent = content.sectionTitle;
        }

        // Update search placeholder
        if (searchInput) {
            searchInput.placeholder = content.searchPlaceholder;
        }

        // Update article content
        articleCards.forEach((card, index) => {
            const articleData = content[`article${index + 1}`];
            if (articleData) {
                card.querySelector('h2').textContent = articleData.title;
                
                const tags = card.querySelectorAll('.tag');
                tags.forEach((tag, i) => {
                    tag.textContent = articleData.tags[i];
                });
                
                card.querySelector('.article-excerpt').textContent = articleData.excerpt;
                card.querySelector('.date').textContent = articleData.date;
                card.querySelector('.read-time').textContent = articleData.readTime;
                card.querySelector('.read-more').textContent = articleData.readMore;
            }
        });
    }

    // Initialize with saved language
    updateArticleContent(savedLanguage);
    
    // Update active language visual indicator
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.dataset.lang === savedLanguage) {
            option.classList.add('active');
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            articleCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.toLowerCase());
                const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
                
                const isMatch = 
                    title.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm)) ||
                    excerpt.includes(searchTerm);

                card.style.display = isMatch ? 'block' : 'none';
            });
        });
    }

    // Language switch handler
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const language = e.target.closest('.language-option').dataset.lang;
            
            // Save language preference
            localStorage.setItem('selectedLanguage', language);
            
            // Update content
            updateArticleContent(language);
            
            // Update active language visual indicator
            document.querySelectorAll('.language-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
        });
    });

    // Mobile menu handler
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Pagination
    const itemsPerPage = 6;
    const pageButtons = document.querySelectorAll('.page-btn');

    if (pageButtons.length) {
        pageButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const start = index * itemsPerPage;
                const end = start + itemsPerPage;
                
                articleCards.forEach((article, articleIndex) => {
                    article.style.display = 
                        (articleIndex >= start && articleIndex < end) ? 'block' : 'none';
                });
            });
        });
    }
});