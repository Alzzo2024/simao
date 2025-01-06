document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Enhanced Filter System
    const filterSystem = {
        activeFilter: 'all',
        
        initialize() {
            this.setupFilterButtons();
            this.setupPortfolioCards();
            this.setupAnimations();
        },

        setupFilterButtons() {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.handleFilterClick(button);
                });
            });
        },

        handleFilterClick(button) {
            const filterValue = button.getAttribute('data-filter');
            this.activeFilter = filterValue;
            
            // Update UI
            this.updateActiveButton(button);
            this.filterPortfolioItems(filterValue);
        },

        updateActiveButton(activeButton) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        },

        filterPortfolioItems(filterValue) {
            portfolioItems.forEach(item => {
                const matches = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                this.animateItem(item, matches);
            });
        },

        animateItem(item, show) {
            if (show) {
                item.style.display = 'block';
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        }
    };

    // Portfolio Card Interactions
    const cardSystem = {
        initialize() {
            this.setupCardHovers();
            this.setupCardLinks();
        },

        setupCardHovers() {
            portfolioItems.forEach(card => {
                card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
                card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
            });
        },

        handleCardHover(card, isHovering) {
            const image = card.querySelector('img');
            const overlay = card.querySelector('.card-overlay');
            
            if (isHovering) {
                image.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            } else {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            }
        },

        setupCardLinks() {
            document.querySelectorAll('.project-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = link.getAttribute('href');
                    this.handleCardClick(link, url);
                });
            });
        },

        handleCardClick(link, url) {
            link.classList.add('clicking');
            setTimeout(() => {
                window.open(url, '_blank');
                link.classList.remove('clicking');
            }, 300);
        }
    };

    // Animation System
    const animationSystem = {
        initialize() {
            this.setupScrollAnimations();
            this.setupInitialAnimations();
        },

        setupScrollAnimations() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('show');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );

            portfolioItems.forEach(item => observer.observe(item));
        },

        setupInitialAnimations() {
            portfolioItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 100}ms`;
                item.classList.add('animate-in');
            });
        }
    };

    // Initialize all systems
    filterSystem.initialize();
    cardSystem.initialize();
    animationSystem.initialize();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            portfolioGrid.style.opacity = '0';
            setTimeout(() => {
                filterSystem.filterPortfolioItems(filterSystem.activeFilter);
                portfolioGrid.style.opacity = '1';
            }, 300);
        }, 250);
    });
});