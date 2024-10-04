document.addEventListener('DOMContentLoaded', () => {
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Language selector functionality
    document.getElementById('language-selector').addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        changeLanguage(selectedLanguage);
    });
});

const translations = {
    pt: {
        inicio: "Início",
        projetos: "Projectos",
        parcerias: "Parcerias",
        assignaturas: "Assignaturas",
        contactos: "Contactos",
        portuguese: "Portuguez",
        english: "Inglez",
        spanish: "Castellano",
        french: "Francez",
        name: "Simão Araújo",
        intro1: "Olá, eu sou Simão Araújo, um desenvolvedor de jogos, programmador, escriptor e jogador de xadrez de Portugal. Desde cedo, fui tomado por um grande amor por estas artes e procuro sempre crear algo novo.",
        intro2: "Este website apresenta conteudos simples e informativos, para todos os usuarios e para os meus seguidores.",
        quartz: "Quartzo",
        sapphire: "Saphira",
        diamond: "Diamante",
        assign: "Assignar",
        compareSubscriptions: "Comparar Assingaturas",
        features: "Recursos",
        price: "Preço",
        disclosure: "📢 Divulgação",
        exclusiveProducts: "📦 Productos exclusivos",
        updatesAndNews: "📝 Actualizações e novidades",
        imagesAndGalleries: "📸 Imagens e Galerias",
        earlyAccess: "⏳ Accessos antecipados",
        offersAndDiscounts: "🏷️ Offertas e Descontos",
        exclusiveDrawings: "🎉 Sortheios exclusivos",
        surpriseGifts: "🎁 Presentes surpresa",
        exclusiveCourses: "🎓 Cursos exclusivos",
        drawingsAndIllustrations: "🎨 Desenhos e Illustrações",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "Uma editora tradicional portugueza, livros, artigos e muito mais.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "Meu canal de Xadrez, onde publico videos, analyses e muito mais.",
        auroraTitle:"Aurora",
        auroraDesc:"A Technologia Portugueza",
        verMais: "Ver Mais"
    },
    en: {
        inicio: "Home",
        projetos: "Projects",
        parcerias: "Partnerships",
        assignaturas: "Subscriptions",
        contactos: "Contacts",
        portuguese: "Portuguese",
        english: "English",
        spanish: "Spanish",
        french: "French",
        name: "Simão Araújo",
        intro1: "Hello, I'm Simão Araújo, a game developer, programmer, writer, and chess player from Portugal. From an early age, I was captivated by a great love for these arts and I always seek to create something new.",
        intro2: "This website presents simple and informative content for all users and my followers.",
        quartz: "Quartz",
        sapphire: "Sapphire",
        diamond: "Diamond",
        assign: "Subscribe",
        compareSubscriptions: "Compare Subscriptions",
        features: "Features",
        price: "Price",
        disclosure: "📢 Disclosure",
        exclusiveProducts: "📦 Exclusive products",
        updatesAndNews: "📝 Updates and news",
        imagesAndGalleries: "📸 Images and Galleries",
        earlyAccess: "⏳ Early access",
        offersAndDiscounts: "🏷️ Offers and Discounts",
        exclusiveDrawings: "🎉 Exclusive drawings",
        surpriseGifts: "🎁 Surprise gifts",
        exclusiveCourses: "🎓 Exclusive courses",
        drawingsAndIllustrations: "🎨 Drawings and Illustrations",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "A traditional Portuguese publisher, books, articles, and much more.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "My Chess channel, where I publish videos, analyses, and much more.",
        auroraTitle:"Aurora",
        auroraDesc:"The Portuguese technology",
        verMais: "See More"
    },
    es: {
        inicio: "Inicio",
        projetos: "Proyectos",
        parcerias: "Asociaciones",
        assignaturas: "Suscripciones",
        contactos: "Contactos",
        portuguese: "Portugués",
        english: "Inglés",
        spanish: "Español",
        french: "Francés",
        name: "Simão Araújo",
        intro1: "Hola, soy Simão Araújo, un desarrollador de juegos, programador, escritor y jugador de ajedrez de Portugal. Desde temprana edad, fui cautivado por un gran amor por estas artes y siempre busco crear algo nuevo.",
        intro2: "Este sitio web presenta contenido simple e informativo para todos los usuarios y mis seguidores.",
        quartz: "Cuarzo",
        sapphire: "Zafiro",
        diamond: "Diamante",
        assign: "Suscribirse",
        compareSubscriptions: "Comparar Suscripciones",
        features: "Características",
        price: "Precio",
        disclosure: "📢 Divulgación",
        exclusiveProducts: "📦 Productos exclusivos",
        updatesAndNews: "📝 Actualizaciones y noticias",
        imagesAndGalleries: "📸 Imágenes y Galerías",
        earlyAccess: "⏳ Acceso anticipado",
        offersAndDiscounts: "🏷️ Ofertas y Descuentos",
        exclusiveDrawings: "🎉 Sorteos exclusivos",
        surpriseGifts: "🎁 Regalos sorpresa",
        exclusiveCourses: "🎓 Cursos exclusivos",
        drawingsAndIllustrations: "🎨 Dibujos e Ilustraciones",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "Una editorial tradicional portuguesa, libros, artículos y mucho más.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "Mi canal de Ajedrez, donde publico videos, análisis y mucho más.",
        auroraTitle:"Aurora",
        auroraDesc:"Tecnología Portuguesa",
        verMais: "Ver Más"
    },
    fr: {
        inicio: "Accueil",
        projetos: "Projets",
        parcerias: "Partenariats",
        assignaturas: "Abonnements",
        contactos: "Contacts",
        portuguese: "Portugais",
        english: "Anglais",
        spanish: "Espagnol",
        french: "Français",
        name: "Simão Araújo",
        intro1: "Bonjour, je suis Simão Araújo, un développeur de jeux, programmeur, écrivain et joueur d'échecs du Portugal. Dès mon plus jeune âge, j'ai été captivé par un grand amour pour ces arts et je cherche toujours à créer quelque chose de nouveau.",
        intro2: "Ce site web présente un contenu simple et informatif pour tous les utilisateurs et mes followers.",
        quartz: "Quartz",
        sapphire: "Saphir",
        diamond: "Diamant",
        assign: "S'abonner",
        compareSubscriptions: "Comparer les Abonnements",
        features: "Fonctionnalités",
        price: "Prix",
        disclosure: "📢 Divulgation",
        exclusiveProducts: "📦 Produits exclusifs",
        updatesAndNews: "📝 Mises à jour et nouvelles",
        imagesAndGalleries: "📸 Images et Galeries",
        earlyAccess: "⏳ Accès anticipé",
        offersAndDiscounts: "🏷️ Offres et Réductions",
        exclusiveDrawings: "🎉 Tirages exclusifs",
        surpriseGifts: "🎁 Cadeaux surprises",
        exclusiveCourses: "🎓 Cours exclusifs",
        drawingsAndIllustrations: "🎨 Dessins et Illustrations",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "Une maison d'édition traditionnelle portugaise, livres, articles et bien plus encore.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "Ma chaîne d'Échecs, où je publie des vidéos, des analyses et bien plus encore.",
        auroraTitle:"Aurora",
        auroraDesc:"Technologie Portugaise",
        verMais: "Voir Plus"
    }    
};

function updatePrices(language) {
    const priceElements = document.querySelectorAll('.title');
    priceElements.forEach(element => {
        let priceText = element.textContent;

        if (language === 'en') {
            if (priceText.includes('€')) {
                let price = priceText.replace('€', '').replace('/MÊS', '').trim();
                let newPrice = convertEuroToPound(price);
                element.innerHTML = `<span class="currency">£</span>${newPrice}<span class="month">/MONTH</span>`;
            }
        } else {
            if (priceText.includes('£')) {
                let price = priceText.replace('£', '').replace('/MONTH', '').trim();
                let newPrice = convertPoundToEuro(price);
                element.innerHTML = `<span class="currency">€</span>${newPrice}<span class="month">/MÊS</span>`;
            }
        }
    });
}

function convertEuroToPound(euroValue) {
    const euroToPoundRate = {
        '2,00': '2,00',
        '4,00': '4,00',
        '6,00': '5,00'
    };
    return euroToPoundRate[euroValue] || euroValue;
}

function convertPoundToEuro(poundValue) {
    const poundToEuroRate = {
        '2,00': '2,00',
        '4,00': '4,00',
        '5,00': '6,00'
    };
    return poundToEuroRate[poundValue] || poundValue;
}

function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    updatePrices(language);
}
