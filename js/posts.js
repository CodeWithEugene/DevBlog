document.addEventListener('DOMContentLoaded', function() {
    // Blog posts data (default posts)
    const defaultPosts = [
        {
            id: 1,
            title: "Getting Started with Web Development",
            excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
            date: "March 15, 2025",
            readTime: "5 min read",
            category: "Web Development",
            tags: ["html", "css", "javascript", "beginners"]
        },
        {
            id: 2,
            title: "Responsive Design Principles",
            excerpt: "Discover the key principles of responsive design and how to implement them in your projects.",
            date: "March 10, 2025",
            readTime: "7 min read",
            category: "Design",
            tags: ["css", "responsive", "mobile", "design"]
        },
        {
            id: 3,
            title: "JavaScript Fundamentals",
            excerpt: "Master the core concepts of JavaScript to build interactive web applications.",
            date: "March 5, 2025",
            readTime: "8 min read",
            category: "JavaScript",
            tags: ["javascript", "programming", "web", "beginners"]
        },
        {
            id: 4,
            title: "CSS Grid Layout",
            excerpt: "Learn how to create complex layouts with CSS Grid and improve your design skills.",
            date: "February 28, 2025",
            readTime: "6 min read",
            category: "CSS",
            tags: ["css", "layout", "grid", "design"]
        },
        {
            id: 5,
            title: "Introduction to React",
            excerpt: "Get started with React and learn how to build modern user interfaces.",
            date: "February 20, 2025",
            readTime: "10 min read",
            category: "React",
            tags: ["react", "javascript", "frontend", "library"]
        },
        {
            id: 6,
            title: "Web Performance Optimization",
            excerpt: "Learn techniques to optimize your website's performance and improve user experience.",
            date: "February 15, 2025",
            readTime: "9 min read",
            category: "Performance",
            tags: ["performance", "optimization", "speed", "user-experience"]
        },
        {
            id: 7,
            title: "Mastering CSS Flexbox",
            excerpt: "Deep dive into CSS Flexbox and learn how to create flexible layouts with ease.",
            date: "February 10, 2025",
            readTime: "7 min read",
            category: "CSS",
            tags: ["css", "flexbox", "layout", "design"]
        },
        {
            id: 8,
            title: "JavaScript ES6+ Features",
            excerpt: "Explore the modern features of JavaScript ES6 and beyond to write cleaner code.",
            date: "February 5, 2025",
            readTime: "8 min read",
            category: "JavaScript",
            tags: ["javascript", "es6", "programming", "modern"]
        },
        {
            id: 9,
            title: "Accessibility in Web Design",
            excerpt: "Learn how to make your websites accessible to all users, including those with disabilities.",
            date: "January 30, 2025",
            readTime: "6 min read",
            category: "Design",
            tags: ["accessibility", "a11y", "design", "inclusive"]
        },
        {
            id: 10,
            title: "Git and GitHub for Beginners",
            excerpt: "Learn the basics of version control with Git and how to collaborate using GitHub.",
            date: "January 25, 2025",
            readTime: "9 min read",
            category: "Tools",
            tags: ["git", "github", "version-control", "collaboration"]
        },
        {
            id: 11,
            title: "Building a REST API with Node.js",
            excerpt: "Step-by-step guide to creating a RESTful API using Node.js and Express.",
            date: "January 20, 2025",
            readTime: "12 min read",
            category: "Backend",
            tags: ["node.js", "api", "rest", "express"]
        },
        {
            id: 12,
            title: "CSS Animation Techniques",
            excerpt: "Learn how to create engaging animations using CSS transitions and keyframes.",
            date: "January 15, 2025",
            readTime: "7 min read",
            category: "CSS",
            tags: ["css", "animation", "transitions", "keyframes"]
        }
    ];
    
    // Get user-created posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    
    // Combine user posts with default posts
    const posts = [...userPosts, ...defaultPosts];
    
    const postsContainer = document.getElementById('posts-container');
    const searchInput = document.getElementById('search-posts');
    const categoryFilters = document.getElementById('category-filters');
    const sortSelect = document.getElementById('sort-posts');
    const loadMoreBtn = document.getElementById('load-more');
    const postsCountElement = document.getElementById('posts-count');
    
    // Variables for pagination
    let currentPage = 1;
    const postsPerPage = 6;
    let filteredPosts = [...posts];
    
    // Initialize the page
    if (postsContainer) {
        // Create category filters
        if (categoryFilters) {
            // Get unique categories
            const categories = [...new Set(posts.map(post => post.category))];
            
            // Create "All" filter
            const allFilter = document.createElement('button');
            allFilter.className = 'category-filter active';
            allFilter.textContent = 'All';
            allFilter.setAttribute('data-category', 'all');
            categoryFilters.appendChild(allFilter);
            
            // Create filter for each category
            categories.forEach(category => {
                const filter = document.createElement('button');
                filter.className = 'category-filter';
                filter.textContent = category;
                filter.setAttribute('data-category', category.toLowerCase().replace(/\s+/g, '-'));
                categoryFilters.appendChild(filter);
            });
            
            // Add event listeners to filters
            const filters = document.querySelectorAll('.category-filter');
            filters.forEach(filter => {
                filter.addEventListener('click', () => {
                    // Remove active class from all filters
                    filters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to clicked filter
                    filter.classList.add('active');
                    
                    // Filter posts
                    filterPosts();
                });
            });
        }
        
        // Check if we need to filter by category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam && categoryFilters) {
            // Find and activate the corresponding filter
            const filter = document.querySelector(`.category-filter[data-category="${categoryParam}"]`);
            if (filter) {
                // Remove active class from all filters
                document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
                
                // Add active class to matching filter
                filter.classList.add('active');
            }
        }
        
        // Add event listener to search input
        if (searchInput) {
            searchInput.addEventListener('input', debounce(() => {
                filterPosts();
            }, 300));
        }
        
        // Add event listener to sort select
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                filterPosts();
            });
        }
        
        // Add event listener to load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                renderPosts(false);
                
                // Show notification
                window.showNotification('More posts loaded!', 'info');
                
                // Scroll to the newly loaded posts
                const newPosts = document.querySelectorAll('.post-card.new');
                if (newPosts.length > 0) {
                    newPosts[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Remove new class after animation
                setTimeout(() => {
                    newPosts.forEach(post => post.classList.remove('new'));
                }, 1000);
            });
        }
        
        // Initial render
        filterPosts();
    }
    
    // Function to filter and sort posts
    function filterPosts() {
        // Reset pagination
        currentPage = 1;
        
        // Get active category filter
        const activeFilter = document.querySelector('.category-filter.active');
        const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        
        // Get search query
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Filter posts by category and search query
        filteredPosts = posts.filter(post => {
            // Category filter
            const categoryMatch = category === 'all' || post.category.toLowerCase().replace(/\s+/g, '-') === category;
            
            // Search filter
            const titleMatch = post.title.toLowerCase().includes(searchQuery);
            const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
            const categoryMatch2 = post.category.toLowerCase().includes(searchQuery);
            const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            
            return categoryMatch && (titleMatch || excerptMatch || categoryMatch2 || tagsMatch);
        });
        
        // Sort posts
        const sortBy = sortSelect ? sortSelect.value : 'newest';
        
        switch (sortBy) {
            case 'newest':
                // Convert string dates to Date objects for comparison
                filteredPosts.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
                break;
            case 'oldest':
                filteredPosts.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                });
                break;
            case 'title-asc':
                filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'read-time':
                filteredPosts.sort((a, b) => {
                    const aTime = parseInt(a.readTime.split(' ')[0]);
                    const bTime = parseInt(b.readTime.split(' ')[0]);
                    return aTime - bTime;
                });
                break;
        }
        
        // Update posts count
        if (postsCountElement) {
            postsCountElement.textContent = filteredPosts.length;
        }
        
        // Render posts
        renderPosts(true);
    }
    
    // Function to render posts
    function renderPosts(clearContainer) {
        if (!postsContainer) return;
        
        // Clear container if needed
        if (clearContainer) {
            postsContainer.innerHTML = '';
        }
        
        // Calculate start and end indices for current page
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        // Check if there are more posts to load
        if (endIndex >= filteredPosts.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if (loadMoreBtn) loadMoreBtn.style.display = 'block';
        }
        
        // Show message if no posts found
        if (postsToShow.length === 0 && clearContainer) {
            const noPostsMessage = document.createElement('div');
            noPostsMessage.className = 'no-posts';
            noPostsMessage.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            `;
            postsContainer.appendChild(noPostsMessage);
            return;
        }
        
        // Render each post
        postsToShow.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'post-card animate-on-scroll new';
            
            // Check if post has an image
            let imageHTML = '';
            if (post.image) {
                imageHTML = `
                    <div class="post-image" style="background-image: url('${post.image}')"></div>
                `;
            }
            
            postCard.innerHTML = `
                ${imageHTML}
                <div class="post-category">${post.category}</div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span>${post.date}</span>
                    <span class="meta-divider">•</span>
                    <span>${post.readTime}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
                <a href="post-detail.html?id=${post.id}" class="btn btn-outline btn-full">Read More</a>
            `;
            
            postsContainer.appendChild(postCard);
        });
    }
    
    // Debounce function for search input
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});