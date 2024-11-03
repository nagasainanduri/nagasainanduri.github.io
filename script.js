//Initiate AOS Script
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    disable: false
});

//Designing the Cyber Matrix Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const matrixRain = document.querySelector('.matrix-rain');
matrixRain.appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";
const drops = [];
const fontSize = 16;
const columns = canvas.width/fontSize;
for(let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#58a6ff';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 35);

//typed.js framework usage 
new Typed('#typed-text', {
    strings: ['Student', 'Android/Windows Developer', 'Linux Enthusiast', 'Full Stack developer'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    showCursor: false
});

//navigation for mobiles
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.innerHTML = mobileNav.classList.contains('active') 
        ? '<i class="fas fa-times text-2xl"></i>' 
        : '<i class="fas fa-bars text-2xl"></i>';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileNav.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
});

//smooth scrolling 
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