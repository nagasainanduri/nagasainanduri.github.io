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
    strings: ['Student', 'Android-Dev', 'Full-Stack Dev', 'Creative Designer', 'Linux Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    showCursor: false
});

// GitHub repos loading script
const GITHUB_USERNAME = 'NagaSaiNanduri';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
async function loadGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        const repos = await response.json();

        const sortedRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        const reposContainer = document.getElementById('github-repos');
        const template = document.getElementById('repo-template');
        const loadingSpinner = document.querySelector('.loading-spinner');
        loadingSpinner.remove();

        sortedRepos.forEach(repo => {
            const card = template.content.cloneNode(true);
            
            card.querySelector('h3').textContent = repo.name;
            card.querySelector('.repo-description').textContent = repo.description || 'No description available';
            card.querySelector('.repo-language').textContent = repo.language || 'N/A';
            card.querySelector('.repo-stars').textContent = repo.stargazers_count;
            card.querySelector('.repo-link').href = repo.html_url;

            reposContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        const reposContainer = document.getElementById('github-repos');
        const loadingSpinner = document.querySelector('.loading-spinner');
        
        loadingSpinner.innerHTML = `
            <p class="text-red-500">Error loading repositories. Please try again later or try refreshing the page !!</p>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadGitHubRepos();
});

// Cyber Matrix Background Script
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
        ctx.fillStyle = '#58a6ff';
        ctx.font = fontSize + 'px monospace';
                    
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 35);
});
