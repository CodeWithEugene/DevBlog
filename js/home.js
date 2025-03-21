document.addEventListener('DOMContentLoaded', function() {
    // Featured posts carousel
    const carousel = document.querySelector('.carousel');
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (carousel && slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Create dots for each slide
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Set up event listeners for buttons
        prevButton.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + slideCount) % slideCount);
        });
        
        nextButton.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % slideCount);
        });
        
        // Auto-advance carousel
        let intervalId = setInterval(() => {
            goToSlide((currentSlide + 1) % slideCount);
        }, 5000);
        
        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(() => {
                goToSlide((currentSlide + 1) % slideCount);
            }, 5000);
        });
        
        // Function to go to a specific slide
        function goToSlide(slideIndex) {
            // Update current slide
            currentSlide = slideIndex;
            
            // Move carousel track
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Add touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                goToSlide((currentSlide + 1) % slideCount);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                goToSlide((currentSlide - 1 + slideCount) % slideCount);
            }
        }
    }
    
    // Animated counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            function updateCounter() {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                } else {
                    counter.textContent = current.toLocaleString();
                    requestAnimationFrame(updateCounter);
                }
            }
            
            // Start counter animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Typing effect for hero heading
    const heroHeading = document.querySelector('.hero h1');
    
    if (heroHeading) {
        const originalText = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        const typingSpeed = 100; // milliseconds per character
        
        function typeWriter() {
            if (i < originalText.length) {
                heroHeading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing effect when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500); // Delay before starting
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroHeading);
    }
    
    // Featured posts hover effects
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
    
    // Newsletter form enhanced validation
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = newsletterForm ? newsletterForm.querySelector('input[type="email"]') : null;
    
    if (emailInput) {
        // Real-time validation
        emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            
            if (email.length > 0) {
                if (isValidEmail(email)) {
                    emailInput.classList.remove('error');
                    emailInput.classList.add('valid');
                } else {
                    emailInput.classList.remove('valid');
                    emailInput.classList.add('error');
                }
            } else {
                emailInput.classList.remove('error', 'valid');
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});