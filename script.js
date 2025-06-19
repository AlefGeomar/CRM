document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO MENU RESPONSIVO ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');
    const openIcon = document.querySelector('.menu-toggle .fa-bars');
    const closeIcon = document.querySelector('.menu-toggle .fa-times');

    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' no menu de navegação
            menuNav.classList.toggle('active');

            // Alterna a visibilidade dos ícones de abrir/fechar
            const isActive = menuNav.classList.contains('active');
            if (openIcon && closeIcon) {
                openIcon.style.display = isActive ? 'none' : 'block';
                closeIcon.style.display = isActive ? 'block' : 'none';
            }
        });
    }


    // --- CÓDIGO ORIGINAL DO RELÓGIO E NOTIFICAÇÃO ---
    function updateClock() {
        const timeZone = 'America/Sao_Paulo'; 
        const now = new Date();

        const timeOptions = {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false 
        };
        
        const dateOptions = {
            timeZone: timeZone,
            weekday: 'long', 
            day: 'numeric', 
            month: 'short' 
        };

        const timeFormatter = new Intl.DateTimeFormat('pt-BR', timeOptions);
        const dateFormatter = new Intl.DateTimeFormat('pt-BR', dateOptions);
        
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');

        if (timeElement) {
            timeElement.textContent = timeFormatter.format(now);
        }
        
        if (dateElement) {
            let formattedDate = dateFormatter.format(now).replace('.', '');
            const parts = formattedDate.split(' '); 
            if (parts.length > 3) { 
                // Capitaliza o mês corretamente
                const monthIndex = parts.findIndex(part => part === 'de') + 1;
                if(parts[monthIndex]) {
                   parts[monthIndex] = parts[monthIndex].charAt(0).toUpperCase() + parts[monthIndex].slice(1);
                }
            }
            formattedDate = parts.join(' ');
            dateElement.textContent = formattedDate;
        }
    }

    // Chama a função do relógio
    updateClock(); 
    setInterval(updateClock, 1000);

    // Lógica da notificação do WhatsApp
    setTimeout(function() {
        const whatsappNotificationLink = document.getElementById('whatsapp-notification-link');
        const whatsappArticle = whatsappNotificationLink ? whatsappNotificationLink.firstElementChild : null;
        
        if (whatsappArticle) {
            whatsappArticle.classList.remove('initially-hidden'); 
            whatsappArticle.classList.add('notification-item'); 
        }
    }, 3000); 
});