document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");
    const mobileLangContainer = document.getElementById("mobile-lang-container");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // =====================================================
    // ABERTURA: amálgama de quadrados que revela o site
    // Depois de acabar, aparece o título "Criador Digital".
    // =====================================================
    function runIntro() {
        const intro = document.getElementById("intro");
        const finish = () => {
            if (intro) intro.remove();
            document.documentElement.classList.remove("intro-lock");
            document.body.classList.add("site-ready");
        };

        if (!intro || reduceMotion) { finish(); return; }

        document.documentElement.classList.add("intro-lock");

        const W = window.innerWidth;
        const H = window.innerHeight;
        const cell = Math.max(64, Math.round(W / 11));       // tamanho médio dos quadrados (mais pequeno = mais quadrados)
        const cols = Math.ceil(W / cell) + 1;
        const rows = Math.ceil(H / cell) + 1;
        const palette = ["#0b0b0b", "#101010", "#161616", "#1b1b1b", "#202020", "#16222f", "#101a24"];

        const squares = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const s = cell * (1.5 + Math.random() * 0.6);          // 1.5x a 2.1x a célula: sobrepõem-se e cobrem tudo
                const jx = (Math.random() - 0.5) * 0.4 * cell;
                const jy = (Math.random() - 0.5) * 0.4 * cell;
                const x = (c + 0.5) * cell + jx - s / 2;
                const y = (r + 0.5) * cell + jy - s / 2;

                const sq = document.createElement("div");
                sq.className = "intro-sq";
                sq.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${palette[Math.floor(Math.random() * palette.length)]};z-index:${Math.floor(Math.random() * 50)};`;
                intro.appendChild(sq);
                squares.push(sq);
            }
        }
        intro.style.background = "transparent"; // agora só os quadrados tapam o site

        const HOLD = 450;    // ms com o ecrã todo preto antes de começar
        const SPREAD = 1100; // ms durante os quais os quadrados vão desaparecendo
        const DUR = 550;     // ms que cada quadrado demora a desaparecer

        squares.forEach(sq => {
            sq.style.transitionDelay = (Math.random() * SPREAD).toFixed(0) + "ms";
            sq.style.transitionDuration = DUR + "ms";
        });

        setTimeout(() => intro.classList.add("go"), HOLD);
        setTimeout(finish, HOLD + SPREAD + DUR + 100);
    }
    runIntro();

    // =====================================================
    // FUNDO: ondinhas irregulares e discretas
    // =====================================================
    (function initWaves() {
        const cv = document.getElementById("bg-waves");
        if (!cv) return;
        const ctx = cv.getContext("2d");
        let W = 0, H = 0;

        const LINES = 18;
        const lines = [];
        for (let i = 0; i < LINES; i++) {
            const comps = [];
            for (let k = 0; k < 3; k++) {
                comps.push({
                    amp: 0.012 + Math.random() * 0.05,                       // fração da altura
                    freq: (0.5 + Math.random() * 2.2) * (Math.PI * 2) / 1400, // ondas largas e diferentes entre si
                    phase: Math.random() * Math.PI * 2,
                    speed: (Math.random() * 0.00025 + 0.00008) * (Math.random() < 0.5 ? -1 : 1)
                });
            }
            lines.push({
                base: (i + 0.5) / LINES + (Math.random() - 0.5) * 0.04,
                comps,
                envFreq: (0.4 + Math.random() * 1.2) * (Math.PI * 2) / 2200, // zonas mais calmas e zonas mais agitadas
                envPhase: Math.random() * Math.PI * 2,
                color: Math.random() < 0.8 ? "132,186,234" : "243,243,243",
                alpha: 0.05 + Math.random() * 0.07,
                width: Math.random() < 0.25 ? 1.6 : 1
            });
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            cv.width = W * dpr;
            cv.height = H * dpr;
            cv.style.width = W + "px";
            cv.style.height = H + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function draw(t) {
            ctx.clearRect(0, 0, W, H);
            for (const ln of lines) {
                ctx.beginPath();
                for (let x = -20; x <= W + 20; x += 14) {
                    const env = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(x * ln.envFreq + ln.envPhase));
                    let y = ln.base * H;
                    for (const c of ln.comps) {
                        y += Math.sin(x * c.freq + c.phase + t * c.speed) * c.amp * H * env;
                    }
                    if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `rgba(${ln.color},${ln.alpha})`;
                ctx.lineWidth = ln.width;
                ctx.stroke();
            }
        }

        function loop(t) {
            draw(t);
            requestAnimationFrame(loop);
        }

        resize();
        window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(0); });
        if (reduceMotion) draw(0); else requestAnimationFrame(loop);
    })();

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

    // =====================================================
    // GOSTOS PESSOAIS (MÚSICAS, SÉRIES/FILMES, JOGOS)
    // Para adicionar algo novo, basta acrescentar um objeto à lista.
    // =====================================================
    const SHOW_PLACEHOLDERS = true; // true = mostra caixas vazias até completar 5/3/5. Põe false para esconder.

    const favoritesData = {
        music: [
            {
                title: "Você gosta dela",
                sub: "DAPARTE",
                img: "music/vocegostadela.png",
                mp3: "audio/vocegostadela.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/3ekb16CKWJXiIS7Tt0dhav?si=d8d87985c0124a50",
                apple: "https://music.apple.com/us/song/voc%C3%AA-gosta-dela/1592586865"
            },
            
            {
                title: "Nope your too late i already died",
                sub: "WIFISKELETON",
                img: "music/nopedied.png",
                mp3: "audio/nopedied.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/0hta2Lb2zKJ7kEnAEZEE3G",
                apple: "https://music.apple.com/br/song/nope-your-too-late-i-already-died/1775530027"
            },
            {
                title: "Freaking Out The Neighborhood",
                sub: "Mac DeMarco",
                img: "music/MacDeMarco2.png",
                mp3: "audio/freakingouttheneighborhood.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/17L0mSvHatVjgTgBxfmyjf",
                apple: "https://music.apple.com/pt/song/freaking-out-the-neighborhood/6789812648"
            },
            {
                title: "Lover Is a Day",
                sub: "CUCO",
                img: "music/cuco.png",
                mp3: "audio/loveisaday.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/1ucnuV88gFTfR3BalmznDk",
                apple: "https://music.apple.com/us/song/lover-is-a-day/1405076653"
            },
            {
                title: "Ressurection",
                sub: "Peter Johnston Rva",
                img: "music/Resurrection.png",
                mp3: "audio/Resurrection.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/2aiX2gvkHZkVSdEPbNmEqX",
            },
            {
                title: "The Neighborhood",
                sub: "Sweater Weather",
                img: "music/theneighborhood.png",
                mp3: "audio/theneighborhood.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/0cQVqPuHQP4KEwc7ZUQmj6",
                apple: "https://music.apple.com/us/song/sweater-weather/635016640"
            },
            {
                title: "A Idade do Lobo",
                sub: "Reginaldo Rossi",
                img: "music/aidadedolobo.png",
                mp3: "audio/A Idade Do Lobo.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/1uYcDo2WRUfTifA1QSwFt6",
                apple: "https://music.apple.com/za/song/a-idade-do-lobo/1442688979"
            }
        ],
        media: [
            {
                title: "Iron Lung",
                sub: "Markiplier",
                img: "filmes/ironlung.png",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "Breaking Bad",
                sub: "Vince Gilligan",
                img: "filmes/breakingbad.png",
                tagPt: "Crime",
                tagEn: "Crime"
            },
            {
                title: "Obsession",
                sub: "Curry Barker",
                img: "filmes/obsession.png",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "Nimona",
                sub: "Nick Bruno & Troy Quane",
                img: "filmes/nimona.png",
                tagPt: "Aventura",
                tagEn: "Adventure"
            }
        ],
        games: [
            { title: "Celeste", img: "games/celeste.png" },
            { title: "Cult of the Lamb", img: "games/cultofthelamb.png" },
            { title: "Hollow Knight", img: "games/hollowknight.png" },
            { title: "Silksong", img: "games/silksong.png" },
            { title: "Minecraft", img: "games/Minecraft.png" },
            { title: "Teardown", img: "games/Teardown.png" },
            { title: "Coffee Talk", img: "games/CoffeeTalk.png" },
            { title: "Bendy and the Dark Revival", img: "games/batdr.png" },
        ]
    };

    // ---------- PLAYER DE ÁUDIO ----------
    const musicCards = []; // { card, btn, item }
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.5;
    let currentIdx = -1;

    function setPlayingUI(idx, playing) {
        musicCards.forEach((m, i) => {
            const isThis = (i === idx && playing);
            m.card.classList.toggle("playing", isThis);
            if (m.btn) {
                const icon = m.btn.querySelector("i");
                icon.className = isThis ? "fa-solid fa-pause" : "fa-solid fa-play";
            }
        });
    }

    function showAudioError(idx) {
        const m = musicCards[idx];
        if (!m) return;
        const box = m.card.querySelector(".fav-error");
        if (box) {
            box.classList.add("show");
            setTimeout(() => box.classList.remove("show"), 3500);
        }
        console.error("Não foi possível carregar o áudio:", m.item.mp3);
        currentIdx = -1; // permite tentar de novo no próximo clique
    }

    function playTrack(idx) {
        const m = musicCards[idx];
        if (!m || !m.item.mp3) return;
        if (currentIdx !== idx) {
            currentIdx = idx;
            audio.src = encodeURI(m.item.mp3);
            audio.load();
        }
        const p = audio.play();
        if (p && p.catch) {
            p.catch(err => {
                if (err && err.name === "AbortError") return;
                setPlayingUI(-1, false);
                showAudioError(idx);
            });
        }
    }

    function toggleTrack(idx) {
        if (currentIdx === idx && !audio.paused) {
            audio.pause();
        } else {
            playTrack(idx);
        }
    }

    audio.addEventListener("play", () => setPlayingUI(currentIdx, true));
    audio.addEventListener("pause", () => setPlayingUI(currentIdx, false));
    audio.addEventListener("error", () => {
        if (currentIdx !== -1) {
            const idx = currentIdx;
            setPlayingUI(-1, false);
            showAudioError(idx);
        }
    });
    audio.addEventListener("ended", () => {
        // Passa para a próxima música que tenha MP3
        let next = -1;
        for (let i = currentIdx + 1; i < musicCards.length; i++) {
            if (musicCards[i].item.mp3) { next = i; break; }
        }
        if (next !== -1) {
            playTrack(next);
            musicCards[next].card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        } else {
            setPlayingUI(-1, false);
        }
    });

    // ---------- CONTROLO DE VOLUME ----------
    const volSlider = document.getElementById("volume-slider");
    const volBtn = document.getElementById("volume-btn");
    let lastVolume = audio.volume;

    function updateVolumeUI() {
        const v = audio.volume;
        volSlider.value = Math.round(v * 100);
        volSlider.style.setProperty("--val", Math.round(v * 100) + "%");
        const icon = volBtn.querySelector("i");
        if (v === 0) icon.className = "fa-solid fa-volume-xmark";
        else if (v < 0.5) icon.className = "fa-solid fa-volume-low";
        else icon.className = "fa-solid fa-volume-high";
    }

    if (volSlider && volBtn) {
        volSlider.addEventListener("input", () => {
            audio.volume = volSlider.value / 100;
            if (audio.volume > 0) lastVolume = audio.volume;
            updateVolumeUI();
        });
        volBtn.addEventListener("click", () => {
            if (audio.volume > 0) {
                lastVolume = audio.volume;
                audio.volume = 0;
            } else {
                audio.volume = lastVolume || 0.5;
            }
            updateVolumeUI();
        });
        updateVolumeUI();
    }

    // ---------- CONSTRUÇÃO DAS CAIXAS ----------
    function buildCard(item, type) {
        const card = document.createElement("div");
        card.className = "fav-card glass-box";

        const hasAudio = (type === "music" && item.mp3);

        const playHTML = hasAudio
            ? `<button class="fav-play-btn" aria-label="Play / Pause"><i class="fa-solid fa-play"></i></button>`
            : "";

        const errorHTML = hasAudio
            ? `<div class="fav-error" data-pt="MP3 não encontrado" data-en="MP3 not found">MP3 não encontrado</div>`
            : "";

        const subHTML = item.sub ? `<p class="fav-card-sub">${item.sub}</p>` : "";

        const tagHTML = item.tagPt
            ? `<span class="unified-tag tag-genre" data-pt="${item.tagPt}" data-en="${item.tagEn || item.tagPt}">${item.tagPt}</span>`
            : "";

        let linksHTML = "";
        if (type === "music" && (item.spotify || item.apple)) {
            linksHTML = `<div class="fav-card-links">
                ${item.spotify ? `<a href="${item.spotify}" target="_blank" title="Spotify"><i class="fa-brands fa-spotify"></i></a>` : ""}
                ${item.apple ? `<a href="${item.apple}" target="_blank" title="Apple Music"><i class="fa-brands fa-apple"></i></a>` : ""}
            </div>`;
        }

        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="fav-card-img">
            ${errorHTML}
            <div class="fav-card-overlay">
                ${playHTML}
                <div class="fav-card-info">
                    <h3 class="fav-card-name">${item.title}</h3>
                    ${subHTML}
                    ${tagHTML}
                    ${linksHTML}
                </div>
            </div>
        `;
        return card;
    }

    function renderFavRow(trackId, items, type, visibleCount) {
        const track = document.getElementById(trackId);
        if (!track) return;

        items.forEach(item => {
            const card = buildCard(item, type);
            track.appendChild(card);

            if (type === "music") {
                const btn = card.querySelector(".fav-play-btn");
                const idx = musicCards.length;
                musicCards.push({ card, btn, item });
                if (btn) {
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        toggleTrack(idx);
                    });
                }
            }
        });

        if (SHOW_PLACEHOLDERS) {
            for (let i = items.length; i < visibleCount; i++) {
                const ph = document.createElement("div");
                ph.className = "fav-card fav-card-empty";
                track.appendChild(ph);
            }
        }
    }

    renderFavRow("track-music", favoritesData.music, "music", 5);
    renderFavRow("track-media", favoritesData.media, "media", 3);
    renderFavRow("track-games", favoritesData.games, "games", 5);

    // Setinhas dos carrosséis
    document.querySelectorAll(".fav-carousel").forEach(car => {
        const track = car.querySelector(".fav-track");
        const prev = car.querySelector(".fav-prev");
        const next = car.querySelector(".fav-next");

        function updateArrows() {
            const overflow = track.scrollWidth > track.clientWidth + 2;
            prev.style.visibility = overflow ? "visible" : "hidden";
            next.style.visibility = overflow ? "visible" : "hidden";
            prev.disabled = track.scrollLeft <= 2;
            next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        }

        prev.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }));
        next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth, behavior: "smooth" }));
        track.addEventListener("scroll", updateArrows);
        window.addEventListener("resize", updateArrows);
        updateArrows();
    });

    // MAPA DE PROJETOS DE DESIGN (Apenas os que precisam de galeria/modal)
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
            links: []
        }
    };

    let currentProject = "";
    let currentStepIndex = 0; 

    const projectModal = document.getElementById("project-modal");
    const modalSlot = document.getElementById("modal-dynamic-slot");
    const galleryPrevBtn = document.getElementById("gallery-prev");
    const galleryNextBtn = document.getElementById("gallery-next");

    function renderModalStep() {
        const data = projectDatabase[currentProject];
        if (!data) return;

        const imgCount = data.images ? data.images.length : 0;
        const totalSteps = 1 + imgCount + 1; 

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

        modalSlot.innerHTML = "";

        if (currentStepIndex === 0) {
            const introDiv = document.createElement("div");
            introDiv.className = "modal-intro-view";
            introDiv.innerHTML = `
                <h3 class="modal-intro-title">${data.title}</h3>
                <p class="modal-intro-desc">${data.description}</p>
            `;
            modalSlot.appendChild(introDiv);
        }
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
        else {
            const imgIndex = currentStepIndex - 1;
            const imgPath = data.images[imgIndex];
            
            const imgDiv = document.createElement("div");
            imgDiv.className = "modal-image-view";
            imgDiv.innerHTML = `<img src="${imgPath}" alt="Slide ${imgIndex}" class="modal-fixed-rect-img">`;
            modalSlot.appendChild(imgDiv);
        }
    }

    document.querySelectorAll(".portfolio-item-trigger").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const proj = trigger.getAttribute("data-project");
            if (proj && projectDatabase[proj]) {
                currentProject = proj;
                currentStepIndex = 0; 
                renderModalStep();
                projectModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

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
            const imgCount = data.images ? data.images.length : 0;
            const totalSteps = 1 + imgCount + 1;
            if (currentStepIndex < totalSteps - 1) {
                currentStepIndex++;
                renderModalStep();
            }
        }
    });

    if(projectModal) {
        // Fecha ao clicar fora do cartão (o clique dentro do cartão não fecha)
        projectModal.addEventListener("click", (e) => {
            if (e.target.closest(".gallery-content-card")) return;
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
        document.documentElement.lang = currentLang.toLowerCase(); // ajuda a hifenização do texto justificado
        
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
    }, { passive: true });
    btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});