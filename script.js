document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menuNav = document.querySelector('.menu-nav');

    if (menuToggle && menuNav) {
        menuToggle.addEventListener('click', () => {
            menuNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

       
        menuNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const timeString = `${hours}:${minutes}`;
        
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const dateString = now.toLocaleDateString('pt-BR', options);

        const timeElement = document.querySelector('#time');
        const dateElement = document.querySelector('#date');

        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);

        const whatsappNotification = document.querySelector('#whatsapp-notification-link');
        const whatsappArticle = whatsappNotification ? whatsappNotification.querySelector('article') : null;
        if (whatsappArticle && whatsappArticle.classList.contains('initially-hidden')) {
            setTimeout(() => {
                whatsappArticle.style.display = 'block'; 
                whatsappArticle.classList.remove('initially-hidden');
                whatsappArticle.classList.add('notification-item'); 
            }, 3000); 
        }
    }

    updateTime();
    setInterval(updateTime, 60000);

    document.querySelectorAll('.notification-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            console.log('Notificação clicada:', link.querySelector('.notification-title')?.textContent || link.querySelector('.app-name')?.textContent);
        });
    });

   
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    
    const carouselTrackNew = document.getElementById('carouselTrackNew');
    const slidesNew = document.querySelectorAll('.carousel-slide-new');
    const dotsContainerNew = document.getElementById('carouselDotsNew');
    let currentSlideNew = 0;

    
    if (carouselTrackNew && slidesNew.length > 0 && dotsContainerNew) {
        function updateCarouselNew() {
            carouselTrackNew.style.transform = `translateX(-${currentSlideNew * 100}%)`;
            updateDotsNew();
        }

        function updateDotsNew() {
            dotsContainerNew.innerHTML = ''; 
            slidesNew.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel-dot-new');
                if (index === currentSlideNew) {
                    dot.classList.add('active');
                }
                dot.onclick = () => {
                    currentSlideNew = index;
                    updateCarouselNew();
                };
                dotsContainerNew.appendChild(dot);
            });
        }

        
        window.moveSlideNew = (direction) => {
            currentSlideNew = (currentSlideNew + direction + slidesNew.length) % slidesNew.length;
            updateCarouselNew();
        };

        
        updateCarouselNew();
    }
});
