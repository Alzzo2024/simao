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