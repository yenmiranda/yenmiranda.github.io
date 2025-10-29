// ============================================
// MONTRA THAI MASSAGE - MAIN JAVASCRIPT
// Handles mobile menu and interactive features
// ============================================

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // When hamburger is clicked, toggle the menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger to X
        if (hamburger.classList.contains('active')) {
            hamburger.style.transform = 'rotate(90deg)';
        } else {
            hamburger.style.transform = 'rotate(0deg)';
        }
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        });
    });
    
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ===== SCROLL ANIMATIONS =====
    // Add fade-in animation when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all service cards and features
    const animatedElements = document.querySelectorAll('.service-card, .feature, .benefit');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    // Highlight the current section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    
    // ===== CONSOLE MESSAGE =====
    console.log('🎉 Montra Thai Massage website loaded successfully!');
    console.log('💆‍♀️ Built with HTML, CSS, and JavaScript');
    console.log('🤖 Enhanced with AI assistance');
});