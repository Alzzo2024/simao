document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.getElementById("cursor-custom");
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");
    const mobileLangContainer = document.getElementById("mobile-lang-container");

    const openModalBtn = document.getElementById("open-download-modal");
    const closeModalBtn = document.getElementById("close-download-modal");
    const downloadModal = document.getElementById("download-modal");

    function handleLangButtonPosition() {
        if (window.innerWidth <= 950) {
            if (!mobileLangContainer.contains(langBtn)) {
                mobileLangContainer.appendChild(langBtn);
                langBtn.style.display = "flex";
            }
        } else {
            const headerActions = document.querySelector('.header-actions');
            if (!headerActions.contains(langBtn)) {
                headerActions.insertBefore(langBtn, mobileBtn);
                langBtn.style.display = "flex";
            }
        }
    }
    window.addEventListener('resize', handleLangButtonPosition);
    handleLangButtonPosition();

    // CURSOR PERSONALIZADO (Apenas Desktop)
    if (window.innerWidth > 950) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
        document.querySelectorAll('a, button, .s-link, .photo-item, .glass-box, .btn-cv, .card-btn-square').forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("pointer-mode"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("pointer-mode"));
        });
    }

    // INTERAÇÕES DA MODAL DE DOWNLOAD
    if(openModalBtn && downloadModal && closeModalBtn) {
        openModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            downloadModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        const closeModalFunc = () => {
            downloadModal.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        closeModalBtn.addEventListener("click", closeModalFunc);
        
        downloadModal.addEventListener("click", (e) => {
            if(e.target === downloadModal) closeModalFunc();
        });
    }

    // MENU MOBILE
    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
        
        const spans = mobileBtn.querySelectorAll('span');
        if(mobileMenu.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    document.querySelectorAll(".mobile-menu-overlay a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
            
            const spans = mobileBtn.querySelectorAll('span');
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        });
    });

    // SISTEMA DE TRADUÇÃO MULTILINGUE
    let currentLang = "PT";
    langBtn.addEventListener("click", () => {
        currentLang = (currentLang === "PT") ? "EN" : "PT";
        langBtn.textContent = currentLang;
        
        document.querySelectorAll("[data-pt]").forEach(el => {
            const text = el.getAttribute(`data-${currentLang.toLowerCase()}`);
            if (text) el.textContent = text;
        });
    });

    // SCROLL REVEAL ANIMAÇÕES
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".entrance-anim").forEach(el => observer.observe(el));

    // BOTÃO SCROLL TOP
    const btt = document.getElementById("scroll-top-btn");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 400) {
            btt.style.display = "block";
        } else {
            btt.style.display = "none";
        }
    });
    btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
