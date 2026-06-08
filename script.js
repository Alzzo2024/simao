document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");
    const mobileLangContainer = document.getElementById("mobile-lang-container");

    // Lógica Posicional do Seletor de Idioma
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

    // INTERATIVIDADE DAS TABS DO SOBRE
    const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    const initialActive = document.querySelector(".tab-content.active");
    if(initialActive) initialActive.classList.add("tab-fade-active");

    bookmarkButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            bookmarkButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(tc => {
                tc.classList.remove("active");
                tc.classList.remove("tab-fade-active");
            });

            btn.classList.add("active");
            const targetTab = btn.getAttribute("data-tab");
            const targetContent = document.getElementById(`tab-${targetTab}`);
            
            if(targetContent) {
                targetContent.classList.add("active");
                setTimeout(() => {
                    targetContent.classList.add("tab-fade-active");
                }, 20);
            }
        });
    });

    // MAPA AVANÇADO DE PROJETOS (Introdução, Imagens Fixas e Links Finais)
    const projectDatabase = {
        vimperio: {
            title: "Loja V Império",
            description: "Identidade visual desenvolvida para a marca V Império. É o espaço oficial da Associação As Quinas dedicado a todos os que orgulhosamente celebram a identidade nacional. Sob o mote «Portugal na tua pele», a loja oferece uma seleção exclusiva de vestuário, artigos e produtos pensados especialmente para o público patriota. Mais do que uma marca, é um ponto de encontro para quem ama Portugal no dia a dia.",
            images: ["portefolio/lojavimperio/lojavimperio1.png", "portefolio/lojavimperio/lojavimperio2.png", "portefolio/lojavimperio/lojavimperio3.png", "portefolio/lojavimperio/lojavimperio4.png"],
            links: [
                { label: "Visitar", url: "https://www.instagram.com/loja_v_imperio/", icon: "fa-brands fa-instagram" }
            ]
        },
        supercampainhas: {
            title: "Super Campainhas",
            description: "O Super Campainhas é um supermercado de proximidade e comércio a retalho, amplamente conhecido na região pelo seu atendimento personalizado e familiar. Focado em servir a comunidade, o estabelecimento destaca-se pela frescura diária dos seus produtos, com especial foco nas frutas e hortícolas, além de uma seleção completa de mercearia e bens de consumo diário. Tudo isto, sempre combinando a máxima dedicação e amor ao consumidor.",
            images: ["portefolio/supercampainhas/SPlogo1.png", "portefolio/supercampainhas/SPlogo2.png","portefolio/supercampainhas/SPpaleta.png","portefolio/supercampainhas/SPclube.png","portefolio/supercampainhas/SPmockups.png"],
            links: [] // Sem links por ser apenas portefólio fictício/arte
        }
    };

    let currentProject = "";
    let currentStepIndex = 0; // Passo 0 = Intro, Passos do Meio = Imagens, Passo Último = Ecrã de Links

    const projectModal = document.getElementById("project-modal");
    const modalSlot = document.getElementById("modal-dynamic-slot");
    const galleryPrevBtn = document.getElementById("gallery-prev");
    const galleryNextBtn = document.getElementById("gallery-next");

    function renderModalStep() {
        const data = projectDatabase[currentProject];
        if (!data) return;

        const totalSteps = 1 + data.images.length + 1; // 1(Intro) + Total Imagens + 1(Final)

        // Controlos de visibilidade dos botões laterais
        if (currentStepIndex === 0) {
            galleryPrevBtn.classList.add("hidden-btn");
        } else {
            galleryPrevBtn.classList.remove("hidden-btn");
        }

        if (currentStepIndex >= totalSteps - 1) {
            galleryNextBtn.classList.add("hidden-btn");
        } else {
            galleryNextBtn.classList.remove("hidden-btn");
        }

        // LIMPAR SLOT ANTERIOR
        modalSlot.innerHTML = "";

        // CASO 1: Passo de Introdução
        if (currentStepIndex === 0) {
            const introDiv = document.createElement("div");
            introDiv.className = "modal-intro-view";
            introDiv.innerHTML = `
                <h3 class="modal-intro-title">${data.title}</h3>
                <p class="modal-intro-desc">${data.description}</p>
            `;
            modalSlot.appendChild(introDiv);
        }
        // CASO 2: Ecrã Final de Links
        else if (currentStepIndex === totalSteps - 1) {
            const finalDiv = document.createElement("div");
            finalDiv.className = "modal-final-view";
            
            let linksHTML = "";
            if (data.links && data.links.length > 0) {
                linksHTML = `<div class="modal-links-container">`;
                data.links.forEach(lk => {
                    linksHTML += `
                        <a href="${lk.url}" target="_blank" class="modal-project-link">
                            <i class="${lk.icon}"></i> <span>${lk.label}</span>
                        </a>`;
                });
                linksHTML += `</div>`;
            } else {
                linksHTML = `<p class="modal-no-links-txt">(Este projeto serve fins demonstrativos e não possui ligações externas)</p>`;
            }

            finalDiv.innerHTML = `
                <h3 class="modal-final-title">${data.title}</h3>
                ${linksHTML}
            `;
            modalSlot.appendChild(finalDiv);
        }
        // CASO 3: Imagens Intermédias (Layout Retangular Fixo)
        else {
            const imgIndex = currentStepIndex - 1;
            const imgPath = data.images[imgIndex];
            
            const imgDiv = document.createElement("div");
            imgDiv.className = "modal-image-view";
            imgDiv.innerHTML = `<img src="${imgPath}" alt="Slide ${imgIndex}" class="modal-fixed-rect-img">`;
            modalSlot.appendChild(imgDiv);
        }
    }

    // Abertura da Modal Customizada
    document.querySelectorAll(".portfolio-item-trigger").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const proj = trigger.getAttribute("data-project");
            if (proj && projectDatabase[proj]) {
                currentProject = proj;
                currentStepIndex = 0; // Começa sempre na Introdução
                renderModalStep();
                projectModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Controlos de Navegação da Modal
    galleryPrevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderModalStep();
        }
    });

    galleryNextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const data = projectDatabase[currentProject];
        if (data) {
            const totalSteps = 1 + data.images.length + 1;
            if (currentStepIndex < totalSteps - 1) {
                currentStepIndex++;
                renderModalStep();
            }
        }
    });

    // Fecho da Modal
    if(projectModal) {
        projectModal.addEventListener("click", () => {
            projectModal.classList.remove("active");
            document.body.style.overflow = "auto";
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

    // TRADUÇÃO DINÂMICA
    let currentLang = "PT";
    langBtn.addEventListener("click", () => {
        currentLang = (currentLang === "PT") ? "EN" : "PT";
        langBtn.textContent = currentLang;
        
        document.querySelectorAll("[data-pt]").forEach(el => {
            const text = el.getAttribute(`data-${currentLang.toLowerCase()}`);
            if (text) el.textContent = text;
        });
    });

    // ENTRANCE OBSERVING
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".entrance-anim").forEach(el => observer.observe(el));

    // SCROLL TOP
    const btt = document.getElementById("scroll-top-btn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btt.style.display = "block";
        } else {
            btt.style.display = "none";
        }
    });
    btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});