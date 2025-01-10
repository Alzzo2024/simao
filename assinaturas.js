document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary elements
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const cardsView = document.querySelector('.cards__inner');
    const tableView = document.querySelector('.comparison-table');
    const subscribersView = document.querySelector('.subscribers-wall');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const cards = document.querySelectorAll('.card');

    // Toggle view functionality
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all views
            cardsView.classList.add('hidden');
            tableView.classList.add('hidden');
            subscribersView.classList.add('hidden');

            // Show selected view based on data-view attribute
            switch(this.dataset.view) {
                case 'cards':
                    cardsView.classList.remove('hidden');
                    break;
                case 'table':
                    tableView.classList.remove('hidden');
                    break;
                case 'subscribers':
                    subscribersView.classList.remove('hidden');
                    break;
            }
        });
    });

    // Mobile menu functionality
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll using Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe each card for scroll animations
    cards.forEach(card => {
        observer.observe(card);
    });
});
