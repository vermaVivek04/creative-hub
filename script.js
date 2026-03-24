/* ========================================
   Vivek Verma Portfolio — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
});

/* ========================================
   SUBTLE STAR PARTICLES
   ======================================== */
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 12000));

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.4 + 0.3,
            opacity: Math.random() * 0.6 + 0.15,
            speed: Math.random() * 0.015 + 0.005,
            offset: Math.random() * Math.PI * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const t = Date.now();

        stars.forEach(s => {
            const o = s.opacity * (0.5 + 0.5 * Math.sin(t * s.speed + s.offset));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 190, 220, ${o})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);

        let current = 'home';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) {
                current = sec.id;
            }
        });

        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // Mobile toggle
    const toggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });
    }
}

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.about-content, .skills-grid, .skill-category, .project-card, .certificate-wrapper, .team-content, .contact-cards, .stat-card'
    ).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav if open
                document.querySelector('.nav-links')?.classList.remove('mobile-open');
            }
        });
    });
}
