// ============================================
// BrightWave Electrical - Landing Page Scripts
// Vanilla JavaScript - No Dependencies
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // 1. SCROLL FADE-IN ANIMATION
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // ========================================
    // 2. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const stickyBarHeight = document.querySelector('.sticky-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - stickyBarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 3. COUNTER ANIMATION (Years Experience)
    // ========================================
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================================
    // 4. BUTTON HOVER EFFECTS (Enhanced)
    // ========================================
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // 5. STICKY BAR SHADOW ON SCROLL
    // ========================================
    const stickyBar = document.querySelector('.sticky-bar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            stickyBar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            stickyBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });

    // ========================================
    // 6. SERVICE CARD HOVER ANIMATIONS
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#F4C542';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#2E3A45';
        });
    });

    // ========================================
    // 7. FORM VALIDATION & FEEDBACK
    // ========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation (HTML5 handles most, this is extra)
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                e.preventDefault();
                return false;
            }

            // Optional: Email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                e.preventDefault();
                return false;
            }

            // If validation passes, form will submit normally via FormSubmit
        });
    }

    // ========================================
    // 8. GALLERY ITEM STAGGER ANIMATION
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // ========================================
    // 9. EMERGENCY BANNER PULSE (CSS Handled)
    // ========================================
    // The pulse animation is handled via CSS @keyframes
    // This section is reserved for any additional JS enhancements if needed

    // ========================================
    // 10. MOBILE MENU ACCESSIBILITY
    // ========================================
    // Add focus states for better keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #F4C542';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ========================================
    // 11. PERFORMANCE: LAZY LOAD OPTIMIZATION
    // ========================================
    // If images were present, we would implement lazy loading here
    // For now, this is a placeholder for future enhancement

    // ========================================
    // 12. CONSOLE MESSAGE (Optional)
    // ========================================
    console.log('%c⚡ BrightWave Electrical', 'color: #F4C542; font-size: 20px; font-weight: bold;');
    console.log('%cProfessional Electrical Services - Birmingham', 'color: #0C1F33; font-size: 14px;');

});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit rate of function calls
 * Useful for scroll and resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// SCROLL PERFORMANCE OPTIMIZATION
// ========================================
window.addEventListener('scroll', throttle(function() {
    // Any additional scroll-based animations can go here
    // Currently handled by Intersection Observer which is more performant
}, 100));
