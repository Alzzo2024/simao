document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const subject = formData.get('subject');
        const message = `
Nome: ${formData.get('name')}
Email: ${formData.get('email')}
Assunto: ${subject}

Mensagem:
${formData.get('message')}
        `;
        
        const mailtoLink = `mailto:alzziano@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        
        window.location.href = mailtoLink;
        
        showNotification('Mensagem preparada para envio!');
        form.reset();
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}