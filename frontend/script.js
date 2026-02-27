/**
 * ILMEC - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initVideoSlideshow();
    initScrollAnimations();
    initGalleryToggle();
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

/**
 * Gallery Toggle - View More/Less
 */
function initGalleryToggle() {
    const moreImages = document.querySelectorAll('.more-images');
    const btn = document.getElementById('viewMoreBtn');
    
    // Hide more images initially
    moreImages.forEach(item => {
        item.style.display = 'none';
    });
    
    // Make first 3 images visible initially
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    galleryItems.forEach((item, index) => {
        if (index < 3) {
            item.style.display = 'block';
        }
    });
}

function toggleGallery() {
    const moreImages = document.querySelectorAll('.more-images');
    const btn = document.getElementById('viewMoreBtn');
    const isHidden = moreImages[0].style.display === 'none';
    
    if (isHidden) {
        // Show more images
        moreImages.forEach(item => {
            item.style.display = 'block';
        });
        btn.innerHTML = `
            View Less Images
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        `;
    } else {
        // Hide more images
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
        galleryItems.forEach((item, index) => {
            if (index >= 3) {
                item.style.display = 'none';
            }
        });
        btn.innerHTML = `
            View More Images
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        `;
    }
}

