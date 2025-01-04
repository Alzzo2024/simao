document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const message = document.getElementById('textarea').value;
        
        // Create the mailto URL
        const mailtoLink = `mailto:alzziano@proton.me?subject=Novo Contacto do Website&body=De: ${email}%0D%0A%0D%0AMensagem:%0D%0A${encodeURIComponent(message)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Clear the form
        form.reset();
        
        // Show success message
        showNotification('Mensagem enviada com sucesso!');
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add these styles to your CSS
    const styles = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            animation: slideIn 0.5s ease-out;
            z-index: 1000;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}