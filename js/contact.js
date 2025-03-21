document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const submitButton = document.getElementById('submit-button');
    
    // Form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateInput(nameInput, 'name-error', validateName);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateInput(emailInput, 'email-error', validateEmail);
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('input', () => {
            validateInput(subjectInput, 'subject-error', validateSubject);
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateInput(messageInput, 'message-error', validateMessage);
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            clearErrors();
            
            // Validate form
            let isValid = true;
            
            if (!validateInput(nameInput, 'name-error', validateName)) {
                isValid = false;
            }
            
            if (!validateInput(emailInput, 'email-error', validateEmail)) {
                isValid = false;
            }
            
            if (!validateInput(subjectInput, 'subject-error', validateSubject)) {
                isValid = false;
            }
            
            if (!validateInput(messageInput, 'message-error', validateMessage)) {
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state with animation
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    // Hide loading state
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                    
                    // Show success message with animation
                    formSuccess.classList.remove('hidden');
                    formSuccess.classList.add('animate-in');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove('animate-in');
                        formSuccess.classList.add('animate-out');
                        
                        setTimeout(() => {
                            formSuccess.classList.add('hidden');
                            formSuccess.classList.remove('animate-out');
                        }, 500);
                    }, 5000);
                    
                    // Show notification
                    window.showNotification('Your message has been sent successfully!', 'success');
                }, 1500);
            } else {
                // Show error notification
                window.showNotification('Please fix the errors in the form', 'error');
                
                // Scroll to first error
                const firstError = document.querySelector('.error-text:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Interactive map
    const mapContainer = document.getElementById('contact-map');
    
    if (mapContainer) {
        // Create a simple interactive map
        mapContainer.innerHTML = `
            <div class="map-container">
                <div class="map-overlay">
                    <div class="map-marker" style="top: 40%; left: 30%;" data-location="New York">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="map-tooltip">New York</div>
                    </div>
                    <div class="map-marker" style="top: 35%; left: 50%;" data-location="London">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="map-tooltip">London</div>
                    </div>
                    <div class="map-marker" style="top: 45%; left: 80%;" data-location="Tokyo">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="map-tooltip">Tokyo</div>
                    </div>
                    <div class="map-marker" style="top: 70%; left: 65%;" data-location="Sydney">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="map-tooltip">Sydney</div>
                    </div>
                </div>
                <div class="map-info">
                    <h3>Our Global Team</h3>
                    <p>We have team members working remotely from around the world!</p>
                </div>
            </div>
        `;
        
        // Add interactivity to map markers
        const markers = document.querySelectorAll('.map-marker');
        
        markers.forEach(marker => {
            marker.addEventListener('mouseenter', () => {
                marker.classList.add('active');
            });
            
            marker.addEventListener('mouseleave', () => {
                marker.classList.remove('active');
            });
            
            marker.addEventListener('click', () => {
                const location = marker.getAttribute('data-location');
                const mapInfo = document.querySelector('.map-info');
                
                // Update map info based on location
                if (mapInfo) {
                    mapInfo.innerHTML = getLocationInfo(location);
                    
                    // Add animation
                    mapInfo.classList.add('animate-update');
                    setTimeout(() => {
                        mapInfo.classList.remove('animate-update');
                    }, 500);
                }
                
                // Update active marker
                markers.forEach(m => m.classList.remove('selected'));
                marker.classList.add('selected');
            });
        });
    }
    
    // Social media hover effects
    const socialLinks = document.querySelectorAll('.contact-card a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hover');
        });
    });
    
    // Helper function to validate name
    function validateName(name) {
        if (!name.trim()) {
            return { valid: false, message: 'Name is required' };
        }
        
        if (name.trim().length < 2) {
            return { valid: false, message: 'Name must be at least 2 characters' };
        }
        
        return { valid: true };
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        if (!email.trim()) {
            return { valid: false, message: 'Email is required' };
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        
        return { valid: true };
    }
    
    // Helper function to validate subject
    function validateSubject(subject) {
        if (!subject.trim()) {
            return { valid: false, message: 'Subject is required' };
        }
        
        return { valid: true };
    }
    
    // Helper function to validate message
    function validateMessage(message) {
        if (!message.trim()) {
            return { valid: false, message: 'Message is required' };
        }
        
        if (message.trim().length < 10) {
            return { valid: false, message: 'Message must be at least 10 characters' };
        }
        
        return { valid: true };
    }
    
    // Helper function to validate input
    function validateInput(input, errorId, validationFunction) {
        if (!input) return true;
        
        const errorElement = document.getElementById(errorId);
        const result = validationFunction(input.value);
        
        if (!result.valid) {
            input.classList.add('error');
            if (errorElement) {
                errorElement.textContent = result.message;
            }
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
            if (errorElement) {
                errorElement.textContent = '';
            }
            return true;
        }
    }
    
    // Helper function to clear all errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-text');
        const inputElements = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        inputElements.forEach(input => {
            input.classList.remove('error');
        });
        
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');
    }
    
    // Helper function to get location info
    function getLocationInfo(location) {
        const locationInfo = {
            'New York': {
                title: 'New York Office',
                address: '123 Broadway, New York, NY 10001',
                phone: '+1 (212) 555-1234',
                email: 'newyork@devblog.com'
            },
            'London': {
                title: 'London Office',
                address: '456 Oxford Street, London, W1C 1AB',
                phone: '+44 20 7123 4567',
                email: 'london@devblog.com'
            },
            'Tokyo': {
                title: 'Tokyo Office',
                address: '789 Shibuya, Tokyo 150-0002',
                phone: '+81 3 1234 5678',
                email: 'tokyo@devblog.com'
            },
            'Sydney': {
                title: 'Sydney Office',
                address: '101 George Street, Sydney NSW 2000',
                phone: '+61 2 9876 5432',
                email: 'sydney@devblog.com'
            }
        };
        
        const info = locationInfo[location] || {
            title: 'Global Headquarters',
            address: 'Remote Team',
            phone: '+1 (800) 555-5555',
            email: 'contact@devblog.com'
        };
        
        return `
            <h3>${info.title}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${info.address}</p>
            <p><i class="fas fa-phone"></i> ${info.phone}</p>
            <p><i class="fas fa-envelope"></i> ${info.email}</p>
        `;
    }
});