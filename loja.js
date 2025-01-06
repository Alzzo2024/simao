document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('searchInput');
    const tagFilters = document.querySelectorAll('.tag-filters .tag');
    const productCards = document.querySelectorAll('.product-card');
    const cartCounter = document.querySelector('.cart-counter');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Cart state
    let cart = [];
    let cartCount = 0;

    // Filter functionality
    tagFilters.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            tagFilters.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');

            const filter = tag.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        productCards.forEach(card => {
            const categories = card.getAttribute('data-categories').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Cart functionality
    cartCounter.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Add to cart functionality for paid products
    document.getElementById('buyButton').addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        const productInfo = {
            title: productCard.querySelector('.product-title').textContent,
            price: productCard.querySelector('.current-price').textContent,
            image: productCard.querySelector('.product-image').src
        };
        
        addToCart(productInfo);
    });

    function addToCart(product) {
        cart.push(product);
        updateCartCount();
        updateCartDisplay();
        cartSidebar.classList.add('active');
    }

    function updateCartCount() {
        cartCount = cart.length;
        document.querySelector('.cart-count').textContent = cartCount;
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace('€', ''));
            total += price;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">${item.price}</p>
                    <button class="remove-item" data-index="${index}">Remover</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        totalAmount.textContent = `€${total.toFixed(2)}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartCount();
                updateCartDisplay();
            });
        });
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Redirecionando para o checkout...');
            // Add your checkout logic here
        } else {
            alert('Seu carrinho está vazio!');
        }
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartCounter.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });

    // Initialize cart display
    updateCartCount();
    updateCartDisplay();
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const cardsView = document.querySelector('.cards__inner');
    const tableView = document.querySelector('.comparison-table');
    const cards = document.querySelectorAll('.card');
    const subscribeButtons = document.querySelectorAll('.card__cta');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // View Toggle System
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.view === 'table') {
                cardsView.style.opacity = '0';
                setTimeout(() => {
                    cardsView.classList.add('hidden');
                    tableView.classList.remove('hidden');
                    setTimeout(() => {
                        tableView.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                tableView.style.opacity = '0';
                setTimeout(() => {
                    tableView.classList.add('hidden');
                    cardsView.classList.remove('hidden');
                    setTimeout(() => {
                        cardsView.style.opacity = '1';
                    }, 50);
                }, 300);
            }
        });
    });

    // Enhanced Card Interactions
    cards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) c.style.transform = 'scale(0.95)';
            });
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.transform = '';
            });
        });

        // Touch device support
        card.addEventListener('touchstart', () => {
            card.classList.add('card--touched');
        });

        card.addEventListener('touchend', () => {
            card.classList.remove('card--touched');
        });
    });

    // Subscribe Button System
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tier = this.closest('.card').querySelector('.card__heading').textContent;
            
            this.classList.add('clicking');
            setTimeout(() => {
                this.classList.remove('clicking');
                window.location.href = this.getAttribute('onclick').split("'")[1];
            }, 200);

            // Analytics tracking (if implemented)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'subscription_click', {
                    'tier': tier
                });
            }
        });
    });

    // Mobile Navigation
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll System
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Card Animation System
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card--visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));

    // Price Animation
    const prices = document.querySelectorAll('.card__price');
    prices.forEach(price => {
        const value = parseFloat(price.textContent);
        price.innerHTML = value.toLocaleString('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }) + '<span>/mês</span>';
    });

    // Window Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                cardsView.classList.remove('hidden');
                tableView.classList.add('hidden');
                toggleBtns[0].classList.add('active');
                toggleBtns[1].classList.remove('active');
            }
        }, 250);
    });
});