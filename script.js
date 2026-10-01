document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");
    const mobileLangContainer = document.getElementById("mobile-lang-container");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // =====================================================
    // ABERTURA: "pele" preta de quadrados (estilo Venom)
    // O ecrã começa todo preto. A massa de quadrados vai
    // recuando de um canto ao canto oposto, com a frente
    // irregular, até revelar o site. A foto fica parada.
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
        const base = Math.max(64, Math.round(W / 12));   // tamanho dos quadrados grandes
        const layers = [
            { cell: base,        min: 1.5, max: 2.3 },   // camada grande (tapa tudo)
            { cell: base * 0.5,  min: 1.3, max: 2.4 }    // camada pequena (dá o aspeto de pele/amálgama)
        ];
        const palette = ["#000000", "#000000", "#030303", "#060606", "#0a0a0a", "#0b1017"];

        const HOLD = 600;     // ms de breu total antes de começar
        const SPREAD = 1700;  // ms que a massa demora a recuar de um canto ao outro
        const DUR = 520;      // ms que cada quadrado demora a desaparecer

        layers.forEach(L => {
            const cols = Math.ceil(W / L.cell) + 1;
            const rows = Math.ceil(H / L.cell) + 1;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const s = L.cell * (L.min + Math.random() * (L.max - L.min));
                    const cx = (c + 0.5) * L.cell + (Math.random() - 0.5) * 0.6 * L.cell;
                    const cy = (r + 0.5) * L.cell + (Math.random() - 0.5) * 0.6 * L.cell;

                    // progresso na diagonal (canto superior esquerdo -> inferior direito) + ruído
                    // para a frente da massa ser irregular, com "tentáculos"
                    let t = (cx / W) * 0.55 + (cy / H) * 0.45;
                    t += 0.10 * Math.sin(cx * 0.006 + cy * 0.004)
                       + 0.08 * Math.sin(cy * 0.012 - cx * 0.005 + 1.7)
                       + (Math.random() - 0.5) * 0.10;
                    t = Math.min(1, Math.max(0, t));

                    const sq = document.createElement("div");
                    sq.className = "intro-sq";
                    sq.style.cssText =
                        `left:${cx - s / 2}px;top:${cy - s / 2}px;width:${s}px;height:${s}px;` +
                        `background:${palette[Math.floor(Math.random() * palette.length)]};` +
                        `z-index:${Math.floor(Math.random() * 60)};` +
                        `--r:${(Math.random() * 90 - 45).toFixed(0)}deg;` +
                        `transition-delay:${(t * SPREAD).toFixed(0)}ms;transition-duration:${DUR}ms;`;
                    intro.appendChild(sq);
                }
            }
        });

        intro.style.background = "transparent"; // agora só os quadrados tapam o site

        setTimeout(() => intro.classList.add("go"), HOLD);
        // o título começa a escrever-se quando a massa já recuou quase toda
        setTimeout(() => document.body.classList.add("site-ready"), HOLD + SPREAD * 0.75);
        setTimeout(finish, HOLD + SPREAD + DUR + 120);
    }
    runIntro();

    // =====================================================
    // FUNDO: ondas grandes, espalhadas e irregulares
    // Linhas que seguem um campo de fluxo suave: curvas largas
    // que se cruzam, sem serem lineares nem paralelas.
    // =====================================================
    (function initWaves() {
        const cv = document.getElementById("bg-waves");
        if (!cv) return;
        const ctx = cv.getContext("2d");
        let W = 0, H = 0, K = 1;

        const N = 26;        // número de linhas
        const HALF = 55;     // passos para cada lado do ponto inicial
        const STEP = 14;     // comprimento de cada passo (px)
        const lines = [];
        for (let i = 0; i < N; i++) {
            lines.push({
                x: Math.random(),
                y: Math.random(),
                color: Math.random() < 0.8 ? "132,186,234" : "243,243,243",
                alpha: 0.05 + Math.random() * 0.08,
                width: Math.random() < 0.2 ? 1.8 : 1
            });
        }

        function angle(x, y, t) {
            return 0.35
                + 2.1 * Math.sin(x * 0.0016 * K + y * 0.0009 * K + t * 0.00007)
                + 1.7 * Math.cos(y * 0.0018 * K - x * 0.0008 * K - t * 0.00005);
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            K = Math.min(2, Math.max(1, 1000 / W));   // em ecrãs pequenos as curvas ficam um pouco mais apertadas
            cv.width = W * dpr;
            cv.height = H * dpr;
            cv.style.width = W + "px";
            cv.style.height = H + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function draw(t) {
            ctx.clearRect(0, 0, W, H);
            ctx.lineJoin = "round";
            ctx.lineCap = "round";

            for (const ln of lines) {
                const px = ln.x * W, py = ln.y * H;

                // para trás
                const back = [];
                let x = px, y = py;
                for (let i = 0; i < HALF; i++) {
                    const a = angle(x, y, t);
                    x -= Math.cos(a) * STEP;
                    y -= Math.sin(a) * STEP;
                    back.push(x, y);
                }

                ctx.beginPath();
                ctx.moveTo(back[back.length - 2], back[back.length - 1]);
                for (let i = back.length - 4; i >= 0; i -= 2) ctx.lineTo(back[i], back[i + 1]);
                ctx.lineTo(px, py);

                // para a frente
                x = px; y = py;
                for (let i = 0; i < HALF; i++) {
                    const a = angle(x, y, t);
                    x += Math.cos(a) * STEP;
                    y += Math.sin(a) * STEP;
                    ctx.lineTo(x, y);
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
                title: "Amanhã Tou Melhor",
                sub: "Capitão Fausto",
                img: "music/amanhãtoumelhor.png",
                mp3: "audio/amanhãtoumelhor.mp3",
                spotify: "https://open.spotify.com/intl-pt/album/6XsQLJOB2sts5JX29PbVjK",
                apple: "https://music.apple.com/us/album/amanh%C3%A3-tou-melhor-single/1092665749"
            },
            {
                title: "Supernova",
                sub: "Capitão Fausto",
                img: "music/supernova.png",
                mp3: "audio/Supernova.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/49yTZz0EysKG1CwYhdH6Mv",
                apple: "https://music.apple.com/pt/song/supernova/880159983"
            },
            {
                title: "Toma o comprimido",
                sub: "António Variações",
                img: "music/tomaocomprimido.png",
                mp3: "audio/tomaocomprimido.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/61jvrLg2aii3M7zzcqWrWV",
                apple: "https://music.apple.com/br/song/toma-o-comprimido/1475230990"
            },
            {
                title: "Canção do Engate",
                sub: "António Variações",
                img: "music/engate.png",
                mp3: "audio/cançãodoengate.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/5v5Kra9bZOVKBXpfLVK2fP",
                apple: "https://music.apple.com/gb/song/can%C3%A7%C3%A3o-de-engate/806751936"
            },
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
            },
            {
                title: "Eu fui à Europa",
                sub: "Linda Batista",
                img: "music/eufuiàeuropa.png",
                mp3: "audio/eufuiàeuropa.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/2Iyu84vScylpOiETyJ9QJk",
                apple: "https://music.apple.com/br/song/eu-fui-%C3%A0-europa/401731722"
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
                title: "The Platform",
                sub: "Galder Gaztelu-Urrutia",
                img: "filmes/theplatform.png",
                tagPt: "Terror psicológico",
                tagEn: "Psychological horror"
            },
            {
                title: "House M.D.",
                sub: "David Shore",
                img: "filmes/House.png",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "IT: Chapter One",
                sub: "Andy Muschietti",
                img: "filmes/it1.png",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "IT: Chapter Two",
                sub: "Andy Muschietti",
                img: "filmes/it2.png",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "The Bad Guys",
                sub: "Pierre Perifel",
                img: "filmes/badguys.png",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "The Bad Guys 2",
                sub: "Pierre Perifel & JP Sans",
                img: "filmes/badguys2.png",
                tagPt: "Comédia",
                tagEn: "Comedy"
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
            { title: "Hollow Knight Silksong", img: "games/Silksong.png" },
            { title: "Minecraft", img: "games/Minecraft.png" },
            { title: "Teardown", img: "games/Teardown.png" },
            { title: "Rocket League", img: "games/rocketleague.png" },
            { title: "Detroit Become Human", img: "games/detroit.png" },
            { title: "FarCry 5", img: "games/farcry5.png" },
            { title: "FarCry 6", img: "games/farcry6.png" },
            { title: "Super Chicken Jumper", img: "games/superchickenjumper.png" },
            { title: "Iron Lung", img: "games/ironlung.png" },
            { title: "Ghostrunner", img: "games/ghostrunner.png" },
            { title: "Ghostrunner 2", img: "games/ghostrunner2.png" },
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
