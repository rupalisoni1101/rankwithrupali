document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    const menuBtn = document.getElementById('menuBtn');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Handle Scroll
    window.addEventListener('scroll', () => {
        // Nav background
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Scroll spy
        let current = '';
        sections.forEach(s => {
            const top = s.offsetTop;
            const height = s.clientHeight;
            if (window.scrollY >= top - 200) {
                current = s.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Mobile Menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-open');
            document.body.style.overflow = navLinksList.classList.contains('mobile-open') ? 'hidden' : '';
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // Reveal on scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('v');
                // Optional: unobserve after reveal
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // FAQ Toggle
    window.toggleFaq = (el) => {
        const isOpen = el.classList.contains('open');
        // Close all others
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
        });
        
        if (!isOpen) {
            el.classList.add('open');
        }
    };

    // Hero Parallax
    const heroArt = document.querySelector('.hero-art');
    if (heroArt) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroArt.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Magnetic Button Effect (Simple version)
    const magneticBtns = document.querySelectorAll('.btn-coral, .btn-white');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});
