// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Theme toggle with animation
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark mode if saved or preferred
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.add('theme-transition');
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Update icon with animation
            updateThemeIcon(isDarkMode);
            
            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        });
    }
    
    // Newsletter form submission with enhanced animation
    const newsletterForm = document.getElementById('newsletter-form');
    const subscriptionMessage = document.getElementById('subscription-message');
    const subscribeButton = document.getElementById('subscribe-button');
    
    if (newsletterForm && subscriptionMessage) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email input
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validate email
            if (!isValidEmail(email)) {
                subscriptionMessage.textContent = 'Please enter a valid email address.';
                subscriptionMessage.style.display = 'block';
                subscriptionMessage.className = 'subscription-message error';
                return;
            }
            
            // Disable button and show loading state
            if (subscribeButton) {
                subscribeButton.disabled = true;
                subscribeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            }
            
            // Simulate API call
            setTimeout(() => {
                // Show success message with animation
                subscriptionMessage.textContent = `Thank you for subscribing with ${email}! Check your inbox for confirmation.`;
                subscriptionMessage.style.display = 'block';
                subscriptionMessage.className = 'subscription-message success';
                
                // Add animation class
                subscriptionMessage.classList.add('animate-success');
                
                // Reset form
                emailInput.value = '';
                
                // Reset button
                if (subscribeButton) {
                    subscribeButton.disabled = false;
                    subscribeButton.innerHTML = 'Subscribe';
                }
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    subscriptionMessage.classList.add('fade-out');
                    setTimeout(() => {
                        subscriptionMessage.style.display = 'none';
                        subscriptionMessage.classList.remove('animate-success', 'fade-out');
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add scroll animations to elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Check animations on page load
    checkAnimations();
    
    // Add page transition effect
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if modifier keys are pressed
            if (e.metaKey || e.ctrlKey) return;
            
            const href = this.getAttribute('href');
            
            // Only apply transition for internal links
            if (href && href.indexOf('http') !== 0) {
                e.preventDefault();
                
                // Add page transition class
                document.body.classList.add('page-transition-out');
                
                // Navigate to new page after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Add page transition in class when page loads
    document.body.classList.add('page-transition-in');
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('page-transition-in');
    }, 500);
    
    // Cookie consent banner
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    cookieConsent.innerHTML = `
        <div class="cookie-content">
            <p>We use cookies to improve your experience on our website. By continuing to browse, you agree to our <a href="#">Cookie Policy</a>.</p>
            <div class="cookie-buttons">
                <button class="btn btn-primary" id="accept-cookies">Accept</button>
                <button class="btn btn-outline" id="decline-cookies">Decline</button>
            </div>
        </div>
    `;
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieChoice')) {
        // Add cookie banner to page after a delay
        setTimeout(() => {
            document.body.appendChild(cookieConsent);
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Handle cookie consent buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'accept-cookies') {
            localStorage.setItem('cookieChoice', 'accepted');
            cookieConsent.classList.remove('show');
            setTimeout(() => {
                cookieConsent.remove();
            }, 500);
        } else if (e.target && e.target.id === 'decline-cookies') {
            localStorage.setItem('cookieChoice', 'declined');
            cookieConsent.classList.remove('show');
            setTimeout(() => {
                cookieConsent.remove();
            }, 500);
        }
    });
    
    // Notification system
    const notificationSystem = document.createElement('div');
    notificationSystem.className = 'notification-container';
    document.body.appendChild(notificationSystem);
    
    // Global function to show notifications
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notificationSystem.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove notification after duration
        const timeout = setTimeout(() => {
            closeNotification(notification);
        }, duration);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            closeNotification(notification);
        });
    };
    
    function closeNotification(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // Helper function to update theme icon
    function updateThemeIcon(isDarkMode) {
        const icon = document.querySelector('#theme-toggle i');
        if (!icon) return;
        
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});