// AOS Initialization
AOS.init({
    duration: 500,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    disable: false
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Typed.js Framework Usage
new Typed('#typed-text', {
    strings: ['Student', 'Android-Dev', 'Linux Enthusiast', 'Full-Stack Dev'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    showCursor: false
});
