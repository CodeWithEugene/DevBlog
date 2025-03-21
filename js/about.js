document.addEventListener('DOMContentLoaded', function() {
    // Team member card flip effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Create front and back elements
        const front = document.createElement('div');
        front.className = 'team-member-front';
        
        // Move existing content to front
        while (member.firstChild) {
            front.appendChild(member.firstChild);
        }
        
        // Create back content
        const back = document.createElement('div');
        back.className = 'team-member-back';
        
        // Add social links to back
        back.innerHTML = `
            <h3>Connect with me</h3>
            <div class="social-links">
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-link"><i class="fab fa-github"></i></a>
            </div>
            <p>Feel free to reach out for collaborations or just a friendly chat!</p>
        `;
        
        // Add front and back to member
        member.appendChild(front);
        member.appendChild(back);
        
        // Add flip class on hover
        member.addEventListener('mouseenter', () => {
            member.classList.add('flipped');
        });
        
        member.addEventListener('mouseleave', () => {
            member.classList.remove('flipped');
        });
    });
    
    // Animated skill bars
    const skills = [
        { name: 'HTML & CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'UI/UX Design', level: 70 }
    ];
    
    const skillsSection = document.querySelector('.about-skills');
    
    if (skillsSection) {
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'skills-container';
        
        skills.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            
            skillBar.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar" data-level="${skill.level}"></div>
                </div>
            `;
            
            skillsContainer.appendChild(skillBar);
        });
        
        skillsSection.appendChild(skillsContainer);
        
        // Animate skill bars when in viewport
        const progressBars = document.querySelectorAll('.skill-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = `${level}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Company timeline
    const timelineData = [
        { year: '2020', title: 'DevBlog Founded', description: 'Started as a small personal blog sharing web development tips.' },
        { year: '2021', title: 'Team Expansion', description: 'Welcomed our first team members and expanded our content categories.' },
        { year: '2022', title: 'Community Growth', description: 'Reached 10,000 monthly readers and launched our newsletter.' },
        { year: '2023', title: 'Workshops & Events', description: 'Started hosting virtual workshops and participating in tech conferences.' },
        { year: '2024', title: 'Platform Redesign', description: 'Completely redesigned our platform for better user experience.' },
        { year: '2025', title: 'Going Global', description: 'Expanded our team with international contributors and multilingual content.' }
    ];
    
    const timelineSection = document.querySelector('.about-timeline');
    
    if (timelineSection) {
        const timeline = document.createElement('div');
        timeline.className = 'timeline';
        
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll`;
            
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-description">${item.description}</p>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
        });
        
        timelineSection.appendChild(timeline);
    }
    
    // Animated counters
    const counterData = [
        { target: 50, title: 'Team Members', icon: 'users' },
        { target: 500, title: 'Articles Published', icon: 'file-alt' },
        { target: 100000, title: 'Monthly Readers', icon: 'eye' },
        { target: 25, title: 'Awards Won', icon: 'trophy' }
    ];
    
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        
        counterData.forEach(item => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item animate-on-scroll';
            
            statItem.innerHTML = `
                <div class="stat-icon">
                    <i class="fas fa-${item.icon}"></i>
                </div>
                <div class="stat-counter" data-target="${item.target}">0</div>
                <div class="stat-title">${item.title}</div>
            `;
            
            statsContainer.appendChild(statItem);
        });
        
        statsSection.appendChild(statsContainer);
        
        // Animate counters when in viewport
        const counters = document.querySelectorAll('.stat-counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    function updateCounter() {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target.toLocaleString();
                        } else {
                            entry.target.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        }
                    }
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Testimonials carousel
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Frontend Developer',
            content: 'DevBlog has been an invaluable resource in my journey as a developer. The tutorials are clear, concise, and always up-to-date with the latest trends.',
            avatar: 'SJ'
        },
        {
            name: 'Michael Chen',
            role: 'UX Designer',
            content: 'I appreciate how DevBlog bridges the gap between design and development. Their articles have helped me communicate better with the developers on my team.',
            avatar: 'MC'
        },
        {
            name: 'Jessica Williams',
            role: 'Full Stack Developer',
            content: 'The quality of content on DevBlog is exceptional. I've learned so many new techniques that I've been able to apply directly to my projects.',
            avatar: 'JW'
        }
    ];
    
    const testimonialsSection = document.querySelector('.about-testimonials');
    
    if (testimonialsSection) {
        const carousel = document.createElement('div');
        carousel.className = 'testimonials-carousel';
        
        // Create carousel container
        const carouselTrack = document.createElement('div');
        carouselTrack.className = 'carousel-track';
        
        // Create slides
        testimonials.forEach(testimonial => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide testimonial';
            
            slide.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-avatar">${testimonial.avatar}</div>
                    <blockquote>${testimonial.content}</blockquote>
                    <div class="testimonial-author">
                        <div class="testimonial-name">${testimonial.name}</div>
                        <div class="testimonial-role">${testimonial.role}</div>
                    </div>
                </div>
            `;
            
            carouselTrack.appendChild(slide);
        });
        
        // Create navigation
        const carouselNav = document.createElement('div');
        carouselNav.className = 'carousel-nav';
        
        carouselNav.innerHTML = `
            <button class="carousel-prev" aria-label="Previous testimonial">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-dots"></div>
            <button class="carousel-next" aria-label="Next testimonial">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // Assemble carousel
        carousel.appendChild(carouselTrack);
        carousel.appendChild(carouselNav);
        
        testimonialsSection.appendChild(carousel);
        
        // Initialize carousel
        let currentSlide = 0;
        const slideCount = testimonials.length;
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        
        // Create dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Set up navigation
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
    }
});