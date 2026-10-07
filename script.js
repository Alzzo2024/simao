document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const langBtn = document.getElementById("lang-switch");
    const mobileLangContainer = document.getElementById("mobile-lang-container");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // =====================================================
    // ABERTURA: "pele" preta de quadrados (estilo Venom)
    // Todos os quadrados são quadrados perfeitos e 100% pretos.
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
            { cell: base,       min: 1.5, max: 2.3 },    // camada grande (tapa tudo)
            { cell: base * 0.5, min: 1.5, max: 2.4 }     // camada pequena (dá o aspeto de amálgama)
        ];

        const HOLD = 600;     // ms de breu total antes de começar
        const SPREAD = 1700;  // ms que a massa demora a recuar de um canto ao outro
        const DUR = 520;      // ms que cada quadrado demora a desaparecer

        layers.forEach(L => {
            const cols = Math.ceil(W / L.cell) + 1;
            const rows = Math.ceil(H / L.cell) + 1;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const s = L.cell * (L.min + Math.random() * (L.max - L.min));
                    const cx = (c + 0.5) * L.cell + (Math.random() - 0.5) * 0.4 * L.cell;
                    const cy = (r + 0.5) * L.cell + (Math.random() - 0.5) * 0.4 * L.cell;

                    let t = (cx / W) * 0.55 + (cy / H) * 0.45;
                    t += 0.10 * Math.sin(cx * 0.006 + cy * 0.004)
                       + 0.08 * Math.sin(cy * 0.012 - cx * 0.005 + 1.7)
                       + (Math.random() - 0.5) * 0.10;
                    t = Math.min(1, Math.max(0, t));

                    const sq = document.createElement("div");
                    sq.className = "intro-sq";
                    sq.style.cssText =
                        `left:${cx - s / 2}px;top:${cy - s / 2}px;width:${s}px;height:${s}px;` +
                        `z-index:${Math.floor(Math.random() * 60)};` +
                        `transition-delay:${(t * SPREAD).toFixed(0)}ms;transition-duration:${DUR}ms;`;
                    intro.appendChild(sq);
                }
            }
        });

        setTimeout(() => intro.classList.add("go"), HOLD);
        setTimeout(() => document.body.classList.add("site-ready"), HOLD + SPREAD * 0.75);
        setTimeout(finish, HOLD + SPREAD + DUR + 120);
    }
    runIntro();

    // =====================================================
    // FUNDO: ondas grandes, espalhadas e irregulares
    // =====================================================
    (function initWaves() {
        const cv = document.getElementById("bg-waves");
        if (!cv) return;
        const ctx = cv.getContext("2d");
        let W = 0, H = 0, K = 1;

        const N = window.innerWidth < 700 ? 16 : 26;   // menos linhas no telemóvel (mais leve)
        const HALF = 55;
        const STEP = 14;
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
            K = Math.min(2, Math.max(1, 1000 / W));
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
    // AUTOCOLANTES DO "SOBRE" (clique = balão de texto traduzível)
    // Estão sempre a flutuar (CSS). De vez em quando abanam.
    // =====================================================
    const stickers = Array.from(document.querySelectorAll(".sticker"));
    const bubble = document.getElementById("sticker-bubble");
    let bubbleTimer, activeSticker = null;

    function currentLangKey() {
        return document.documentElement.lang === "en" ? "ben" : "bpt";
    }

    function hideBubble() {
        bubble.classList.remove("show");
        stickers.forEach(s => s.classList.remove("on"));
        activeSticker = null;
    }

    stickers.forEach(st => {
        st.addEventListener("click", () => {
            clearTimeout(bubbleTimer);
            if (activeSticker === st && bubble.classList.contains("show")) {
                hideBubble();
                return;
            }
            stickers.forEach(s => s.classList.remove("on"));
            activeSticker = st;
            st.classList.add("on");
            bubble.textContent = st.dataset[currentLangKey()];
            bubble.classList.add("show");
            bubbleTimer = setTimeout(hideBubble, 3500);
        });
        st.addEventListener("animationend", (e) => {
            if (e.target === st) st.classList.remove("wiggle");
        });
    });

    if (!reduceMotion && stickers.length) {
        const visibleStickers = () => stickers.filter(s => s.style.display !== "none");
        const scheduleWiggle = () => {
            const wait = 9000 + Math.random() * 7000;    // entre 9 e 16 segundos
            setTimeout(() => {
                const list = visibleStickers();
                if (list.length && !document.hidden) {
                    const pick = list[Math.floor(Math.random() * list.length)];
                    pick.classList.add("wiggle");
                    if (list.length > 1 && Math.random() < 0.35) {
                        const other = list.filter(s => s !== pick)[Math.floor(Math.random() * (list.length - 1))];
                        setTimeout(() => other.classList.add("wiggle"), 350);
                    }
                }
                scheduleWiggle();
            }, wait);
        };
        setTimeout(scheduleWiggle, 4000);
    }

    // =====================================================
    // GOSTOS PESSOAIS (MÚSICAS, SÉRIES/FILMES, JOGOS)
    // Para adicionar algo novo, basta acrescentar um objeto à lista.
    // Séries/filmes: kind: "serie" ou "filme".
    // Jogos: platinum: true mostra o troféu e a borda prateada.
    // =====================================================
    const SHOW_PLACEHOLDERS = true; // true = mostra caixas vazias até completar 5/3/5. Põe false para esconder.
    const PLATINUM_ICON = "img/platina.png"; // imagem do troféu de platina

    const favoritesData = {
        music: [
            {
                title: "Stargazing",
                sub: "Travis Scott",
                img: "music/stargazing.png",
                mp3: "audio/stargazing.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/7wBJfHzpfI3032CSD7CE2m",
                apple: "https://music.apple.com/us/song/stargazing/1421658117"
            },
            {
                title: "Loverboy",
                sub: "A-Wall",
                img: "music/loverboy.png",
                mp3: "audio/loverboy.mp3",
                spotify: "https://open.spotify.com/intl-pt/album/3eRtkeVpH7EGKvzMdkYL3l",
                apple: "https://music.apple.com/pt/song/loverboy/1773107733"
            },
            {
                title: "Serenate Existencialista",
                sub: "O Grilo",
                img: "music/serenataexistencialista.png",
                mp3: "audio/serenataexistencialista.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/1tIJba7S9uHsNml4BqZrah",
                apple: "https://music.apple.com/pt/song/serenata-existencialista/1321381128"
            },
            {
                title: "Guitarrada",
                sub: "O Grilo",
                img: "music/guitarrada.png",
                mp3: "audio/Guitarrada.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/7fT4wCxnKI1FFb0QnQ4nX3",
                apple: "https://music.apple.com/pt/song/guitarrada/1798963360"
            },
            {
                title: "Deletérios",
                sub: "Deco",
                img: "music/deletérios.png",
                mp3: "audio/deletérios.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/64h99EDQhmXvR9Wgdj9De2",
                apple: "https://music.apple.com/us/album/delet%C3%A9rios-single/1640901808?l=pt-BR"
            },
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
                title: "O corpo é que paga",
                sub: "António Variações",
                img: "music/ocorpoéquepaga.png",
                mp3: "audio/O corpo é que paga.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/3XGa0xYj3bmqRf183emc6q",
                apple: "https://music.apple.com/pt/song/o-corpo-%C3%A9-que-paga/1394682094",
            },
            {
                title: "Anjo da guarda",
                sub: "António Variações",
                img: "music/anjodaguarda.png",
                mp3: "audio/Anjinho da guarda.mp3",
                spotify: "https://open.spotify.com/intl-pt/album/3Vj6HqLnv4aoqUE5B0bdCX",
                apple: "https://music.apple.com/pt/album/anjo-da-guarda/1394681516",
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
                title: "No Other Heart",
                sub: "Mac DeMarco",
                img: "music/nootherheart.png",
                mp3: "audio/nootherheart.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/3J31Ng3dKKJ6sEHDtV9hSp",
                apple: "https://music.apple.com/us/album/no-other-heart-single/6789828863"
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
                title: "L.A.X.",
                sub: "Das Kope",
                img: "music/L.A.X..png",
                mp3: "audio/L.A.X..mp3",
                spotify: "https://open.spotify.com/intl-pt/track/3cKbIicif5YVFF4VqI47sA",
                apple: "https://music.apple.com/us/album/l-a-x-single/1408788152"
            },
            {
                title: "Constelação do amor",
                sub: "Kantirez",
                img: "music/constelaçãodoamor.png",
                mp3: "audio/constelaçãodoamor.mp3",
                spotify: "https://open.spotify.com/intl-pt/album/36lpj8Tl9DDN8k9S7Tetly",
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
            },
            {
                title: "Lá longe senhora",
                sub: "Carlos Paião",
                img: "music/lálongesenhora.png",
                mp3: "audio/lálongesenhora.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/6jU1kesgl8KLoL0hjk2E6R",
                apple: "https://music.apple.com/pt/song/l%C3%A1-longe-senhora/693243790"
            },
            {
                title: "Morena",
                sub: "Vítor Kley & Mariana Nolasco",
                img: "music/morena.png",
                mp3: "audio/morena.mp3",
                spotify: "https://open.spotify.com/intl-pt/track/5UOBna7TimaJuyxB8Dg2jI",
                apple: "https://music.apple.com/gb/song/morena/1590383089"
            }
        ],
        media: [
            {
                title: "Iron Lung",
                sub: "Markiplier",
                img: "filmes/ironlung.png",
                kind: "filme",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "Breaking Bad",
                sub: "Vince Gilligan",
                img: "filmes/breakingbad.png",
                kind: "serie",
                tagPt: "Crime",
                tagEn: "Crime"
            },
            {
                title: "Obsession",
                sub: "Curry Barker",
                img: "filmes/obsession.png",
                kind: "filme",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "The Platform",
                sub: "Galder Gaztelu-Urrutia",
                img: "filmes/theplatform.png",
                kind: "filme",
                tagPt: "Terror psicológico",
                tagEn: "Psychological horror"
            },
            {
                title: "House M.D.",
                sub: "David Shore",
                img: "filmes/House.png",
                kind: "serie",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "IT: Chapter One",
                sub: "Andy Muschietti",
                img: "filmes/it1.png",
                kind: "filme",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "IT: Chapter Two",
                sub: "Andy Muschietti",
                img: "filmes/it2.png",
                kind: "filme",
                tagPt: "Terror",
                tagEn: "Horror"
            },
            {
                title: "The Bad Guys",
                sub: "Pierre Perifel",
                img: "filmes/badguys.png",
                kind: "filme",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "The Bad Guys 2",
                sub: "Pierre Perifel & JP Sans",
                img: "filmes/badguys2.png",
                kind: "filme",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "Nimona",
                sub: "Nick Bruno & Troy Quane",
                img: "filmes/nimona.png",
                kind: "filme",
                tagPt: "Aventura",
                tagEn: "Adventure"
            },
            {
                title: "The Gaslight District",
                sub: "Glitch & Nick Szopko",
                img: "filmes/thegaslightdistrict.png",
                kind: "serie",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "Helluva Boss",
                sub: "Vivienne Medrano",
                img: "filmes/helluvaboss.png",
                kind: "serie",
                tagPt: "Comédia",
                tagEn: "Comedy"
            },
            {
                title: "Hazbin Hotel",
                sub: "Vivienne Medrano",
                img: "filmes/hazbinhotel.png",
                kind: "serie",
                tagPt: "Musical",
                tagEn: "Musical"
            }
        ],
        games: [
            { title: "Celeste", img: "games/celeste.png", platinum: true },
            { title: "Cult of the Lamb", img: "games/cultofthelamb.png" },
            { title: "Hollow Knight", img: "games/hollowknight.png" },
            { title: "Hollow Knight Silksong", img: "games/Silksong.png" },
            { title: "Minecraft", img: "games/Minecraft.png", platinum: true },
            { title: "Minecraft Dungeons", img: "games/minecraftdungeons.png" },
            { title: "Roblox", img: "games/roblox.png", platinum: true },
            { title: "Teardown", img: "games/Teardown.png" },
            { title: "Rocket League", img: "games/rocketleague.png" },
            { title: "Detroit Become Human", img: "games/detroit.png" },
            { title: "Hello Neighbor", img: "games/helloneighbor.png", platinum: true },
            { title: "Hello Neighbor 2", img: "games/helloneighbor2.png" },
            { title: "FarCry 5", img: "games/farcry5.png" },
            { title: "FarCry 6", img: "games/farcry6.png" },
            { title: "Super Chicken Jumper", img: "games/superchickenjumper.png" },
            { title: "Exit 8", img: "games/exit8.png", platinum: true },
            { title: "Iron Lung", img: "games/ironlung.png" },
            { title: "Resident Evil 7", img: "games/residentevil7.png" },
            { title: "Ghostrunner", img: "games/ghostrunner.png" },
            { title: "Ghostrunner 2", img: "games/ghostrunner2.png" },
            { title: "Coffee Talk", img: "games/CoffeeTalk.png", platinum: true },
            { title: "Coffee Talk: Episode 2", img: "games/coffeetalkepisode2.png", platinum: true },
            { title: "Bendy and the Ink Machine", img: "games/batim.png" },
            { title: "Bendy and the Dark Revival", img: "games/batdr.png" },
            { title: "Superliminal", img: "games/superliminal.png", platinum: true },
            { title: "Subnautica", img: "games/subnautica.png" },
            { title: "Subnautica Below Zero", img: "games/subnauticabelowzero.png" },
            { title: "Schizophrenia", img: "games/schizophrenia.png", platinum: true },
            { title: "Five Night's at Freddy's", img: "games/fnaf1.png" },
            { title: "Five Night's at Freddy's 3", img: "games/fnaf3.png" },
            { title: "Five Night's at Freddy's 4", img: "games/fnaf4.png" },
            { title: "Five Night's at Freddy's: Sister Location", img: "games/fnafsl.png" },
            { title: "Five Night's at Freddy's: Ultimate Custom Night", img: "games/fnafucn.png" },
            { title: "Five Night's at Freddy's: Help Wanted", img: "games/fnafhw.png" },
            { title: "Five Night's at Freddy's: Security Breach", img: "games/fnafsb.png" },
            { title: "Dead Cells", img: "games/deadcells.png" },
            { title: "Riders Republic", img: "games/ridersrepublic.png" },
            { title: "Forager", img: "games/forager.png" },
            { title: "Spider-Man Miles Morales", img: "games/spidermanmilesmorales.png" },
            { title: "Overcooked 2", img: "games/overcooked2.png" },
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
        card._item = item;
        if (item.platinum) card.classList.add("platinum");

        const hasAudio = (type === "music" && item.mp3);

        const playHTML = hasAudio
            ? `<button class="fav-play-btn" aria-label="Play / Pause"><i class="fa-solid fa-play"></i></button>`
            : "";

        const errorHTML = hasAudio
            ? `<div class="fav-error" data-pt="MP3 não encontrado" data-en="MP3 not found">MP3 não encontrado</div>`
            : "";

        const platHTML = item.platinum
            ? `<img src="${PLATINUM_ICON}" alt="Platina" title="Platina" class="plat-trophy" onerror="this.style.display='none'">`
            : "";

        const subHTML = item.sub ? `<p class="fav-card-sub">${item.sub}</p>` : "";

        const tagHTML = item.tagPt
            ? `<span class="unified-tag tag-genre" data-pt="${item.tagPt}" data-en="${item.tagEn || item.tagPt}">${item.tagPt}</span>`
            : "";

        let linksHTML = "";
        if (type === "music" && (item.spotify || item.apple || item.mp3)) {
            const fname = (item.title + (item.sub ? " - " + item.sub : "")).replace(/[\\/:*?"<>|]/g, "") + ".mp3";
            linksHTML = `<div class="fav-card-links">
                ${item.spotify ? `<a href="${item.spotify}" target="_blank" title="Spotify"><i class="fa-brands fa-spotify"></i></a>` : ""}
                ${item.apple ? `<a href="${item.apple}" target="_blank" title="Apple Music"><i class="fa-brands fa-apple"></i></a>` : ""}
                ${item.mp3 ? `<a href="${encodeURI(item.mp3)}" download="${fname}" title="Download"><i class="fa-solid fa-download"></i></a>` : ""}
            </div>`;
        }

        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="fav-card-img" draggable="false">
            ${platHTML}
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

    // Setinhas dos carrosséis + arrastar com o rato
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

        // Arrastar com o rato (no telemóvel já se desliza com o dedo)
        let down = false, moved = false, startX = 0, startLeft = 0;
        track.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            if (e.target.closest("button, a, input")) return;
            down = true; moved = false;
            startX = e.clientX; startLeft = track.scrollLeft;
        });
        window.addEventListener("pointermove", (e) => {
            if (!down) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 4) {
                if (!moved) { moved = true; track.classList.add("dragging"); }
                track.scrollLeft = startLeft - dx;
            }
        });
        window.addEventListener("pointerup", () => {
            if (!down) return;
            down = false;
            track.classList.remove("dragging");
        });
        track.addEventListener("click", (e) => {
            if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
        }, true);

        car._updateArrows = updateArrows;
    });

    // =====================================================
    // ANIMAÇÃO DE TROCA (layout / filtros)
    // As caixas encolhem e desaparecem, a altura ajusta-se
    // suavemente e as novas caixas entram em cascata.
    // =====================================================
    function runSwap(track, change) {
        const car = track.closest(".fav-carousel");
        const refresh = () => { if (car && car._updateArrows) car._updateArrows(); };

        if (reduceMotion || !track.animate) {
            change();
            track.scrollLeft = 0;
            refresh();
            return Promise.resolve();
        }

        const visible = () => Array.from(track.querySelectorAll(".fav-card:not(.is-hidden)"));
        const h0 = track.offsetHeight;

        const outs = visible().map(c => c.animate(
            [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.86)" }],
            { duration: 220, easing: "ease-in", fill: "forwards" }
        ));

        return Promise.all(outs.map(a => a.finished)).catch(() => {}).then(() => {
            change();
            track.scrollLeft = 0;
            outs.forEach(a => a.cancel());

            const h1 = track.offsetHeight;
            refresh();

            if (h0 !== h1) {
                track.style.overflow = "hidden";
                track.style.height = h0 + "px";
                void track.offsetHeight;
                track.style.transition = "height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
                track.style.height = h1 + "px";
                setTimeout(() => {
                    track.style.height = "";
                    track.style.transition = "";
                    track.style.overflow = "";
                    refresh();
                }, 540);
            }

            visible().forEach((c, i) => {
                c.animate(
                    [
                        { opacity: 0, transform: "translateY(22px) scale(0.9)" },
                        { opacity: 1, transform: "translateY(0) scale(1)" }
                    ],
                    { duration: 520, delay: Math.min(i, 18) * 35, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "backwards" }
                );
            });

            return new Promise(r => setTimeout(r, 380));
        });
    }

    // Fila de trocas por carrossel (cliques rápidos não se atropelam)
    function swap(track, change) {
        track._chain = (track._chain || Promise.resolve()).then(() => runSwap(track, change));
    }

    // Mostra só as caixas que cumprem o filtro (pred = null mostra tudo)
    function applyFilter(track, pred) {
        const filtering = typeof pred === "function";
        track.querySelectorAll(".fav-card").forEach(c => {
            if (c.classList.contains("fav-card-empty")) {
                c.classList.toggle("is-hidden", filtering);
                return;
            }
            c.classList.toggle("is-hidden", filtering && !pred(c._item));
        });
    }

    // ---------- BOTÕES DE LAYOUT (músicas: 2 filas; jogos: 3 filas) ----------
    document.querySelectorAll(".layout-btn[data-target]").forEach(btn => {
        const track = document.getElementById(btn.dataset.target);
        if (!track) return;
        const car = track.closest(".fav-carousel");

        btn.addEventListener("click", () => {
            swap(track, () => {
                const expanded = car.classList.toggle("expanded");
                btn.classList.toggle("on", expanded);
                btn.querySelector("i").className = expanded ? "fa-solid fa-grip-lines" : "fa-solid fa-table-cells-large";
            });
        });
    });

    // ---------- FILTRO SÉRIES / FILMES ----------
    const mediaTrack = document.getElementById("track-media");
    const mediaFilter = document.getElementById("media-filter");
    if (mediaTrack && mediaFilter) {
        const segBtns = mediaFilter.querySelectorAll(".seg-btn");
        segBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("on")) return;
                segBtns.forEach(b => b.classList.toggle("on", b === btn));
                const kind = btn.dataset.kind;
                swap(mediaTrack, () => applyFilter(mediaTrack, kind === "all" ? null : (it => it.kind === kind)));
            });
        });
    }

    // ---------- FILTRO JOGOS PLATINADOS ----------
    const gamesTrack = document.getElementById("track-games");
    const platBtn = document.getElementById("plat-btn");
    if (gamesTrack && platBtn) {
        platBtn.addEventListener("click", () => {
            swap(gamesTrack, () => {
                const on = platBtn.classList.toggle("on");
                applyFilter(gamesTrack, on ? (it => it.platinum) : null);
            });
        });
    }

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
        document.documentElement.lang = currentLang.toLowerCase(); // ajuda a hifenização do texto justificado e os balões dos autocolantes
        
        document.querySelectorAll("[data-pt]").forEach(el => {
            const text = el.getAttribute(`data-${currentLang.toLowerCase()}`);
            if (text) el.textContent = text;
        });

        // se um balão estiver aberto, atualiza o texto para a nova língua
        if (activeSticker && bubble.classList.contains("show")) {
            bubble.textContent = activeSticker.dataset[currentLangKey()];
        }
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
