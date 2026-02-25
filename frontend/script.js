/**
 * ILMEC - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initVideoSlideshow();
    initScrollAnimations();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

/**
 * Video Slideshow
 */
function initVideoSlideshow() {
    const videos = document.querySelectorAll('.hero-video');
    if (videos.length === 0) return;
    
    let currentIndex = 0;
    
    function playVideo(index) {
        videos.forEach((v, i) => {
            v.classList.toggle('active', i === index);
            if (i === index) v.play().catch(() => {});
        });
    }
    
    videos.forEach((video, index) => {
        video.play().catch(() => {});
        video.addEventListener('ended', () => {
            currentIndex = (currentIndex + 1) % videos.length;
            playVideo(currentIndex);
        });
    });
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % videos.length;
        playVideo(currentIndex);
    }, 6000);
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .stat-item, .gallery-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

