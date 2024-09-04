document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
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
        verMais: "Ver Mais"
    },
    en: {
        inicio: "Home",
        projetos: "Projects",
        parcerias: "Partnerships",
        assignaturas: "Subjects",
        contactos: "Contacts",
        portuguese: "Portuguese",
        english: "English",
        spanish: "Spanish",
        french: "French",
        name: "Simão Araújo",
        intro1: "Hello, I am Simão Araújo, a game developer, programmer, writer, and chess player from Portugal. From an early age, I have been deeply passionate about these arts and always strive to create something new.",
        intro2: "This website features simple and informative content for all users and my followers.",
        quartz: "Quartz",
        sapphire: "Sapphire",
        diamond: "Diamond",
        assign: "Assign",
        compareSubscriptions: "Compare Subscriptions",
        features: "Features",
        price: "Price",
        disclosure: "📢 Disclosure",
        exclusiveProducts: "📦 Exclusive Products",
        updatesAndNews: "📝 Updates and News",
        imagesAndGalleries: "📸 Images and Galleries",
        earlyAccess: "⏳ Early Access",
        offersAndDiscounts: "🏷️ Offers and Discounts",
        exclusiveDrawings: "🎉 Exclusive Drawings",
        surpriseGifts: "🎁 Surprise Gifts",
        exclusiveCourses: "🎓 Exclusive Courses",
        drawingsAndIllustrations: "🎨 Drawings and Illustrations",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "A traditional Portuguese publisher, books, articles, and much more.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "My chess channel, where I publish videos, analyses, and much more.",
        verMais: "View More"
    },
    es: {
        inicio: "Inicio",
        projetos: "Proyectos",
        parcerias: "Colaboraciones",
        assignaturas: "Asignaturas",
        contactos: "Contactos",
        portuguese: "Portugués",
        english: "Inglés",
        spanish: "Español",
        french: "Francés",
        name: "Simão Araújo",
        intro1: "Hola, soy Simão Araújo, un desarrollador de juegos, programador, escritor y jugador de ajedrez de Portugal. Desde una edad temprana, he estado profundamente apasionado por estas artes y siempre me esfuerzo por crear algo nuevo.",
        intro2: "Este sitio web presenta contenido simple e informativo para todos los usuarios y mis seguidores.",
        quartz: "Cuarzo",
        sapphire: "Zafiro",
        diamond: "Diamante",
        assign: "Asignar",
        compareSubscriptions: "Comparar Suscripciones",
        features: "Características",
        price: "Precio",
        disclosure: "📢 Divulgación",
        exclusiveProducts: "📦 Productos Exclusivos",
        updatesAndNews: "📝 Actualizaciones y Noticias",
        imagesAndGalleries: "📸 Imágenes y Galerías",
        earlyAccess: "⏳ Acceso Anticipado",
        offersAndDiscounts: "🏷️ Ofertas y Descuentos",
        exclusiveDrawings: "🎉 Dibujos Exclusivos",
        surpriseGifts: "🎁 Regalos Sorpresa",
        exclusiveCourses: "🎓 Cursos Exclusivos",
        drawingsAndIllustrations: "🎨 Dibujos e Ilustraciones",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "Una editorial tradicional portuguesa, libros, artículos y mucho más.",
        adamastorTitle: "Adamastor de Xadrez",
        adamastorDesc: "Mi canal de ajedrez, donde publico videos, análisis y mucho más.",
        verMais: "Ver Más"
    },
    fr: {
        inicio: "Accueil",
        projetos: "Projets",
        parcerias: "Partenariats",
        assignaturas: "Matières",
        contactos: "Contacts",
        portuguese: "Portugais",
        english: "Anglais",
        spanish: "Espagnol",
        french: "Français",
        name: "Simão Araújo",
        intro1: "Bonjour, je suis Simão Araújo, développeur de jeux, programmeur, écrivain et joueur d'échecs du Portugal. Depuis mon jeune âge, je suis profondément passionné par ces arts et je m'efforce toujours de créer quelque chose de nouveau.",
        intro2: "Ce site web propose un contenu simple et informatif pour tous les utilisateurs et mes abonnés.",
        quartz: "Quartz",
        sapphire: "Saphir",
        diamond: "Diamant",
        assign: "Attribuer",
        compareSubscriptions: "Comparer les Abonnements",
        features: "Fonctionnalités",
        price: "Prix",
        disclosure: "📢 Divulgation",
        exclusiveProducts: "📦 Produits Exclusifs",
        updatesAndNews: "📝 Mises à Jour et Nouvelles",
        imagesAndGalleries: "📸 Images et Galeries",
        earlyAccess: "⏳ Accès Anticipé",
        offersAndDiscounts: "🏷️ Offres et Réductions",
        exclusiveDrawings: "🎉 Dessins Exclusifs",
        surpriseGifts: "🎁 Cadeaux Surprises",
        exclusiveCourses: "🎓 Cours Exclusifs",
        drawingsAndIllustrations: "🎨 Dessins et Illustrations",
        patrimonioTitle: "Património Editorial",
        patrimonioDesc: "Une maison d'édition traditionnelle portugaise, livres, articles et bien plus encore.",
        adamastorTitle: "Adamastor do Xadrez",
        adamastorDesc: "Ma chaîne d'échecs, où je publie des vidéos, des analyses et bien plus encore.",
        verMais: "Voir Plus"
    }    
};

function updatePrices(language) {
    const priceElements = document.querySelectorAll('.title');
    priceElements.forEach(element => {
        let priceText = element.textContent;

        if (language === 'en') {
            // Ajusta para libras se o idioma for inglês
            if (priceText.includes('€')) {
                // Remove o símbolo € e a parte "/MÊS"
                let price = priceText.replace('€', '').replace('/MÊS', '').trim();
                // Converte o valor para libras (£) com base no valor fixo
                let newPrice = convertEuroToPound(price);
                element.innerHTML = `<span class="currency">£</span>${newPrice}<span class="month">/MONTH</span>`;
            }
        } else {
            // Mantém em euros para outros idiomas
            if (priceText.includes('£')) {
                // Remove o símbolo £ e a parte "/MONTH"
                let price = priceText.replace('£', '').replace('/MONTH', '').trim();
                // Converte o valor para euros (€) com base no valor fixo
                let newPrice = convertPoundToEuro(price);
                element.innerHTML = `<span class="currency">€</span>${newPrice}<span class="month">/MÊS</span>`;
            }
        }
    });
}

function convertEuroToPound(euroValue) {
    // Preços fixos em libras para valores em euros
    const euroToPoundRate = {
        '2,00': '2,00',
        '4,00': '4,00',
        '6,00': '5,00'
    };
    return euroToPoundRate[euroValue] || euroValue;
}

function convertPoundToEuro(poundValue) {
    // Preços fixos em euros para valores em libras
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
    // Atualiza os preços após a mudança de idioma
    updatePrices(language);
}

// Exemplo de uso com um seletor de idioma
document.getElementById('language-selector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
});