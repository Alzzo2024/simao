document.addEventListener('DOMContentLoaded', function() {
    // Toggle between cards and table view
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const cardsView = document.querySelector('.cards__inner');
    const tableView = document.querySelector('.comparison-table');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.view === 'table') {
                cardsView.classList.add('hidden');
                tableView.classList.remove('hidden');
            } else {
                cardsView.classList.remove('hidden');
                tableView.classList.add('hidden');
            }
        });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

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

    // Add animation on scroll
    const cards = document.querySelectorAll('.card');
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

    cards.forEach(card => {
        observer.observe(card);
    });
});