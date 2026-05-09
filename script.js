document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.getElementById("cursor-custom");
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");

    // 1. Cursor Windows Azul
    if (window.innerWidth > 950) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        const clickables = document.querySelectorAll('a, button, .s-link');
        clickables.forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("pointer-mode"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("pointer-mode"));
        });
    }

    // 2. Menu Mobile
    if (mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    // 3. Tradução (Incluindo o texto "Sobre")
    let currentLang = "PT";
    langBtn.addEventListener("click", () => {
        currentLang = (currentLang === "PT") ? "EN" : "PT";
        langBtn.textContent = currentLang;
        
        document.querySelectorAll("[data-pt]").forEach(el => {
            const text = el.getAttribute(`data-${currentLang.toLowerCase()}`);
            if (text) el.textContent = text;
        });
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".entrance-anim").forEach(el => observer.observe(el));

    // 5. Scroll Top
    const btt = document.getElementById("scroll-top-btn");
    window.addEventListener("scroll", () => {
        btt.style.display = (window.pageYOffset > 400) ? "block" : "none";
    });
    btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});