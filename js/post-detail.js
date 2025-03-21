document.addEventListener('DOMContentLoaded', function() {
    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    // Blog posts data with content (default posts)
    const defaultPosts = [
        {
            id: 1,
            title: "Getting Started with Web Development",
            content: `
                <p>Web development is an exciting field that combines creativity with technical skills. If you're just starting out, here's what you need to know.</p>
                
                <h2 id="core-technologies">The Three Core Technologies</h2>
                
                <p>Web development is built on three fundamental technologies:</p>
                
                <ul>
                    <li><strong>HTML (HyperText Markup Language)</strong>: The structure and content of web pages</li>
                    <li><strong>CSS (Cascading Style Sheets)</strong>: The styling and appearance of web pages</li>
                    <li><strong>JavaScript</strong>: The interactive functionality of web pages</li>
                </ul>
                
                <h2 id="html-basics">Getting Started with HTML</h2>
                
                <p>HTML is the backbone of any website. It uses tags to define elements on a page, such as headings, paragraphs, images, and links.</p>
                
                <p>Here's a simple HTML example:</p>
                
                <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
                
                <h2 id="css-basics">Adding Style with CSS</h2>
                
                <p>CSS allows you to control how HTML elements look on the page. You can change colors, fonts, spacing, and more.</p>
                
                <p>Here's a simple CSS example:</p>
                
                <pre><code>body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  color: #0066cc;
}

p {
  margin-bottom: 20px;
}</code></pre>
                
                <h2 id="js-basics">Making It Interactive with JavaScript</h2>
                
                <p>JavaScript adds interactivity to your web pages. You can use it to respond to user actions, update content dynamically, and much more.</p>
                
                <p>Here's a simple JavaScript example:</p>
                
                <pre><code>// When the button is clicked, show an alert
document.getElementById('myButton').addEventListener('click', function() {
  alert('Hello, World!');
});</code></pre>
                
                <h2 id="next-steps">Next Steps</h2>
                
                <p>Once you've learned the basics, you can explore more advanced topics like:</p>
                
                <ul>
                    <li>Responsive design</li>
                    <li>CSS frameworks like Bootstrap or Tailwind CSS</li>
                    <li>JavaScript frameworks like React, Vue, or Angular</li>
                    <li>Backend development with Node.js, Python, or other languages</li>
                    <li>Database integration</li>
                </ul>
                
                <p>The most important thing is to practice regularly and build projects. Start small and gradually take on more complex challenges as your skills improve.</p>
            `,
            date: "March 15, 2025",
            author: "Jane Doe",
            authorBio: "Jane is a senior web developer with over 10 years of experience in building web applications.",
            authorAvatar: "JD",
            category: "Web Development",
            tags: ["html", "css", "javascript", "beginners"],
            relatedPosts: [2, 3, 4]
        },
        {
            id: 2,
            title: "Responsive Design Principles",
            content: `
                <p>Responsive design is an approach to web design that makes your websites look good on all devices. Here are the key principles to follow.</p>
                
                <h2 id="what-is-responsive">What is Responsive Design?</h2>
                
                <p>Responsive design is an approach to web design that makes your websites look good on all devices and screen sizes. Instead of creating separate versions of your website for desktop and mobile, you create one website that adapts to different screen sizes.</p>
                
                <h2 id="key-principles">Key Principles</h2>
                
                <h3 id="fluid-grids">1. Fluid Grids</h3>
                
                <p>Use relative units like percentages instead of fixed units like pixels for layout elements. This allows your layout to scale based on the screen size.</p>
                
                <pre><code>.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  width: 33.33%;
  float: left;
  padding: 0 15px;
}</code></pre>
                
                <h3 id="flexible-images">2. Flexible Images</h3>
                
                <p>Make sure your images scale with the layout by setting their max-width to 100%.</p>
                
                <pre><code>img {
  max-width: 100%;
  height: auto;
}</code></pre>
                
                <h3 id="media-queries">3. Media Queries</h3>
                
                <p>Use CSS media queries to apply different styles based on the device's characteristics, such as width, height, or orientation.</p>
                
                <pre><code>/* Base styles for all devices */
.column {
  width: 100%;
}

/* Styles for tablets and larger */
@media (min-width: 768px) {
  .column {
    width: 50%;
  }
}

/* Styles for desktops and larger */
@media (min-width: 1024px) {
  .column {
    width: 33.33%;
  }
}</code></pre>
                
                <h3 id="mobile-first">4. Mobile-First Approach</h3>
                
                <p>Start by designing for the smallest screen size first, then progressively enhance the design for larger screens. This ensures that your website works well on all devices, even those with limited capabilities.</p>
                
                <h2 id="tools">Tools and Frameworks</h2>
                
                <p>Several CSS frameworks can help you implement responsive design more easily:</p>
                
                <ul>
                    <li><strong>Bootstrap</strong>: A popular framework with a responsive grid system and pre-styled components</li>
                    <li><strong>Tailwind CSS</strong>: A utility-first CSS framework that makes it easy to build responsive designs</li>
                    <li><strong>Foundation</strong>: A responsive front-end framework with a focus on accessibility</li>
                </ul>
                
                <h2 id="testing">Testing Your Responsive Design</h2>
                
                <p>Always test your website on various devices and screen sizes to ensure it looks and functions correctly. You can use browser developer tools to simulate different screen sizes, but nothing beats testing on actual devices.</p>
                
                <h2 id="conclusion">Conclusion</h2>
                
                <p>Responsive design is essential in today's multi-device world. By following these principles, you can create websites that provide a great user experience regardless of the device being used.</p>
            `,
            date: "March 10, 2025",
            author: "John Smith",
            authorBio: "John is a UI/UX designer specializing in responsive and mobile-first design approaches.",
            authorAvatar: "JS",
            category: "Design",
            tags: ["css", "responsive", "mobile", "design"],
            relatedPosts: [1, 4, 9]
        },
        {
            id: 3,
            title: "JavaScript Fundamentals",
            content: `
                <p>JavaScript is the programming language of the web. Let's explore the core concepts you need to know.</p>
                
                <h2 id="what-is-js">What is JavaScript?</h2>
                
                <p>JavaScript is a high-level, interpreted programming language that is one of the core technologies of the web. It allows you to add interactivity to websites, create web applications, build servers, and even develop mobile apps.</p>
                
                <h2 id="variables">Variables and Data Types</h2>
                
                <p>JavaScript has several ways to declare variables:</p>
                
                <pre><code>// Using let (block-scoped, can be reassigned)
let name = "John";

// Using const (block-scoped, cannot be reassigned)
const age = 30;

// Using var (function-scoped, older way)
var isStudent = true;</code></pre>
                
                <p>JavaScript has the following data types:</p>
                
                <ul>
                    <li><strong>String</strong>: Text, e.g., <code>"Hello"</code></li>
                    <li><strong>Number</strong>: Numeric values, e.g., <code>42</code> or <code>3.14</code></li>
                    <li><strong>Boolean</strong>: <code>true</code> or <code>false</code></li>
                    <li><strong>Null</strong>: Intentional absence of any value</li>
                    <li><strong>Undefined</strong>: Variable declared but not assigned a value</li>
                    <li><strong>Object</strong>: Collections of related data</li>
                    <li><strong>Symbol</strong>: Unique and immutable primitive value</li>
                    <li><strong>BigInt</strong>: Integers with arbitrary precision</li>
                </ul>
                
                <h2 id="functions">Functions</h2>
                
                <p>Functions are reusable blocks of code that perform a specific task:</p>
                
                <pre><code>// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function (ES6+)
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Function expression
const greet = function(name) {
  return "Hello, " + name + "!";
};</code></pre>
                
                <h2 id="dom">DOM Manipulation</h2>
                
                <p>JavaScript can interact with the Document Object Model (DOM) to change the content, structure, and style of a web page:</p>
                
                <pre><code>// Selecting elements
const heading = document.getElementById("main-heading");
const paragraphs = document.querySelectorAll("p");

// Changing content
heading.textContent = "New Heading";
heading.innerHTML = "New &lt;em&gt;Heading&lt;/em&gt;";

// Changing styles
heading.style.color = "blue";
heading.classList.add("highlight");

// Creating and adding elements
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph.";
document.body.appendChild(newParagraph);

// Event handling
heading.addEventListener("click", function() {
  alert("Heading was clicked!");
});</code></pre>
                
                <h2 id="conclusion">Conclusion</h2>
                
                <p>JavaScript is a versatile language with many features. This overview covers just the fundamentals, but there's much more to learn as you continue your journey in web development.</p>
            `,
            date: "March 5, 2025",
            author: "Emily Johnson",
            authorBio: "Emily is a JavaScript developer who loves teaching others about web development.",
            authorAvatar: "EJ",
            category: "JavaScript",
            tags: ["javascript", "programming", "web", "beginners"],
            relatedPosts: [1, 5, 8]
        }
    ];
    
    // Get user-created posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    
    // Combine user posts with default posts
    const posts = [...userPosts, ...defaultPosts];
    
    const postContent = document.getElementById('post-content');
    const tocContainer = document.getElementById('table-of-contents');
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const relatedPostsContainer = document.getElementById('related-posts');
    
    if (postContent) {
        // Find the post with the matching ID
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            // Update page title
            document.title = `${post.title} - DevBlog`;
            
            // Render post content
            postContent.innerHTML = `
                <header class="post-detail-header">
                    ${post.image ? `<div class="post-detail-image" style="background-image: url('${post.image}')"></div>` : ''}
                    <div class="post-detail-category">${post.category}</div>
                    <h1 class="post-detail-title">${post.title}</h1>
                    <div class="post-detail-meta">
                        <span>By ${post.author}</span>
                        <span class="meta-divider">•</span>
                        <span>${post.date}</span>
                    </div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </header>
                <div class="post-detail-content">
                    ${post.content}
                </div>
                <div class="post-author">
                    <div class="author-avatar">${post.authorAvatar || post.author.charAt(0).toUpperCase()}</div>
                    <div class="author-info">
                        <h3>About the Author</h3>
                        <h4>${post.author}</h4>
                        <p>${post.authorBio || 'A passionate writer and contributor to DevBlog.'}</p>
                    </div>
                </div>
                <div class="post-actions">
                    <button id="like-button" class="btn btn-outline btn-icon">
                        <i class="far fa-heart"></i> <span id="like-count">0</span>
                    </button>
                    <button id="bookmark-button" class="btn btn-outline btn-icon">
                        <i class="far fa-bookmark"></i> <span>Bookmark</span>
                    </button>
                    <div class="share-buttons">
                        <span>Share:</span>
                        <button class="btn btn-icon" aria-label="Share on Twitter">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="btn btn-icon" aria-label="Share on Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button class="btn btn-icon" aria-label="Share on LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </button>
                        <button id="copy-link" class="btn btn-icon" aria-label="Copy link">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Create reading progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            document.body.appendChild(progressBar);
            
            // Update progress bar on scroll
            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
                
                const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
                progressBar.style.width = `${scrollPercentage}%`;
            });
            
            // Generate table of contents
            if (tocContainer) {
                const headings = postContent.querySelectorAll('h2, h3');
                
                if (headings.length > 0) {
                    const tocList = document.createElement('ul');
                    
                    headings.forEach(heading => {
                        const id = heading.getAttribute('id');
                        
                        if (id) {
                            const listItem = document.createElement('li');
                            listItem.className = heading.tagName === 'H3' ? 'toc-subitem' : '';
                            
                            const link = document.createElement('a');
                            link.href = `#${id}`;
                            link.textContent = heading.textContent;
                            
                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                
                                const targetElement = document.getElementById(id);
                                if (targetElement) {
                                    // Smooth scroll to heading
                                    window.scrollTo({
                                        top: targetElement.offsetTop - 100,
                                        behavior: 'smooth'
                                    });
                                    
                                    // Update URL hash
                                    history.pushState(null, null, `#${id}`);
                                }
                            });
                            
                            listItem.appendChild(link);
                            tocList.appendChild(listItem);
                        }
                    });
                    
                    tocContainer.appendChild(tocList);
                    
                    // Make TOC sticky on scroll
                    const tocOffset = tocContainer.offsetTop;
                    
                    window.addEventListener('scroll', () => {
                        if (window.pageYOffset > tocOffset) {
                            tocContainer.classList.add('sticky');
                        } else {
                            tocContainer.classList.remove('sticky');
                        }
                    });
                } else {
                    tocContainer.style.display = 'none';
                }
            }
            
            // Handle like button
            const likeButton = document.getElementById('like-button');
            const likeCount = document.getElementById('like-count');
            
            if (likeButton && likeCount) {
                // Check if post is already liked
                const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
                const isLiked = likedPosts.includes(post.id);
                
                // Update button state
                if (isLiked) {
                    likeButton.classList.add('active');
                    likeButton.querySelector('i').classList.remove('far');
                    likeButton.querySelector('i').classList.add('fas');
                }
                
                // Get like count from localStorage or default to random number
                const likes = JSON.parse(localStorage.getItem('postLikes') || '{}');
                const currentLikes = likes[post.id] || Math.floor(Math.random() * 50) + 5;
                likeCount.textContent = currentLikes;
                
                // Handle like button click
                likeButton.addEventListener('click', () => {
                    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
                    const likes = JSON.parse(localStorage.getItem('postLikes') || '{}');
                    
                    if (likedPosts.includes(post.id)) {
                        // Unlike post
                        const index = likedPosts.indexOf(post.id);
                        likedPosts.splice(index, 1);
                        
                        likes[post.id] = Math.max(0, (likes[post.id] || 0) - 1);
                        
                        likeButton.classList.remove('active');
                        likeButton.querySelector('i').classList.remove('fas');
                        likeButton.querySelector('i').classList.add('far');
                        
                        // Show notification
                        window.showNotification('Post unliked', 'info');
                    } else {
                        // Like post
                        likedPosts.push(post.id);
                        
                        likes[post.id] = (likes[post.id] || 0) + 1;
                        
                        likeButton.classList.add('active');
                        likeButton.querySelector('i').classList.remove('far');
                        likeButton.querySelector('i').classList.add('fas');
                        
                        // Show notification
                        window.showNotification('Post liked!', 'success');
                    }
                    
                    // Update localStorage
                    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
                    localStorage.setItem('postLikes', JSON.stringify(likes));
                    
                    // Update like count
                    likeCount.textContent = likes[post.id];
                    
                    // Add heart animation
                    const heart = document.createElement('i');
                    heart.className = 'fas fa-heart heart-animation';
                    heart.style.left = `${Math.random() * 100}%`;
                    likeButton.appendChild(heart);
                    
                    // Remove heart after animation
                    setTimeout(() => {
                        heart.remove();
                    }, 1000);
                });
            }
            
            // Handle bookmark button
            const bookmarkButton = document.getElementById('bookmark-button');
            
            if (bookmarkButton) {
                // Check if post is already bookmarked
                const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
                const isBookmarked = bookmarkedPosts.includes(post.id);
                
                // Update button state
                if (isBookmarked) {
                    bookmarkButton.classList.add('active');
                    bookmarkButton.querySelector('i').classList.remove('far');
                    bookmarkButton.querySelector('i').classList.add('fas');
                    bookmarkButton.querySelector('span').textContent = 'Bookmarked';
                }
                
                // Handle bookmark button click
                bookmarkButton.addEventListener('click', () => {
                    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
                    
                    if (bookmarkedPosts.includes(post.id)) {
                        // Remove bookmark
                        const index = bookmarkedPosts.indexOf(post.id);
                        bookmarkedPosts.splice(index, 1);
                        
                        bookmarkButton.classList.remove('active');
                        bookmarkButton.querySelector('i').classList.remove('fas');
                        bookmarkButton.querySelector('i').classList.add('far');
                        bookmarkButton.querySelector('span').textContent = 'Bookmark';
                        
                        // Show notification
                        window.showNotification('Bookmark removed', 'info');
                    } else {
                        // Add bookmark
                        bookmarkedPosts.push(post.id);
                        
                        bookmarkButton.classList.add('active');
                        bookmarkButton.querySelector('i').classList.remove('far');
                        bookmarkButton.querySelector('i').classList.add('fas');
                        bookmarkButton.querySelector('span').textContent = 'Bookmarked';
                        
                        // Show notification
                        window.showNotification('Post bookmarked!', 'success');
                    }
                    
                    // Update localStorage
                    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
                });
            }
            
            // Handle copy link button
            const copyLinkButton = document.getElementById('copy-link');
            
            if (copyLinkButton) {
                copyLinkButton.addEventListener('click', () => {
                    const url = window.location.href;
                    
                    // Copy URL to clipboard
                    navigator.clipboard.writeText(url).then(() => {
                        // Show notification
                        window.showNotification('Link copied to clipboard!', 'success');
                        
                        // Change button icon temporarily
                        const icon = copyLinkButton.querySelector('i');
                        icon.classList.remove('fa-link');
                        icon.classList.add('fa-check');
                        
                        // Reset icon after delay
                        setTimeout(() => {
                            icon.classList.remove('fa-check');
                            icon.classList.add('fa-link');
                        }, 2000);
                    }).catch(() => {
                        // Show error notification
                        window.showNotification('Failed to copy link', 'error');
                    });
                });
            }
            
            // Render related posts
            if (relatedPostsContainer && post.relatedPosts) {
                const relatedPostsList = document.createElement('div');
                relatedPostsList.className = 'related-posts-list';
                
                // If user post, use random posts as related
                const relatedIds = post.relatedPosts || 
                    posts.filter(p => p.id !== post.id)
                         .sort(() => 0.5 - Math.random())
                         .slice(0, 3)
                         .map(p => p.id);
                
                relatedIds.forEach(relatedId => {
                    const relatedPost = posts.find(p => p.id === relatedId);
                    
                    if (relatedPost) {
                        const postCard = document.createElement('article');
                        postCard.className = 'post-card related-post';
                        
                        postCard.innerHTML = `
                            <div class="post-category">${relatedPost.category}</div>
                            <h3 class="post-title">${relatedPost.title}</h3>
                            <div class="post-meta">
                                <span>${relatedPost.date}</span>
                                <span class="meta-divider">•</span>
                                <span>${relatedPost.readTime || '5 min read'}</span>
                            </div>
                            <a href="post-detail.html?id=${relatedPost.id}" class="btn btn-outline btn-sm">Read More</a>
                        `;
                        
                        relatedPostsList.appendChild(postCard);
                    }
                });
                
                relatedPostsContainer.appendChild(relatedPostsList);
            }
            
            // Comments section
            if (commentsContainer) {
                // Get comments from localStorage or use default
                const allComments = JSON.parse(localStorage.getItem('postComments') || '{}');
                const postComments = allComments[post.id] || [];
                
                // Render comments
                renderComments(postComments);
                
                // Handle comment form submission
                if (commentForm) {
                    commentForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        
                        const nameInput = document.getElementById('comment-name');
                        const emailInput = document.getElementById('comment-email');
                        const contentInput = document.getElementById('comment-content');
                        
                        // Validate inputs
                        if (!nameInput.value.trim() || !emailInput.value.trim() || !contentInput.value.trim()) {
                            window.showNotification('Please fill in all fields', 'error');
                            return;
                        }
                        
                        // Create new comment
                        const newComment = {
                            id: Date.now(),
                            name: nameInput.value.trim(),
                            email: emailInput.value.trim(),
                            content: contentInput.value.trim(),
                            date: new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                            likes: 0
                        };
                        
                        // Add comment to localStorage
                        const allComments = JSON.parse(localStorage.getItem('postComments') || '{}');
                        const postComments = allComments[post.id] || [];
                        
                        postComments.unshift(newComment);
                        allComments[post.id] = postComments;
                        
                        localStorage.setItem('postComments', JSON.stringify(allComments));
                        
                        // Reset form
                        commentForm.reset();
                        
                        // Render updated comments
                        renderComments(postComments);
                        
                        // Show notification
                        window.showNotification('Comment added successfully!', 'success');
                    });
                }
            }
        } else {
            // Post not found
            postContent.innerHTML = `
                <div class="post-not-found">
                    <h1>Post Not Found</h1>
                    <p>The post you are looking for does not exist.</p>
                    <a href="posts.html" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Back to Posts</a>
                </div>
            `;
        }
    }
    
    // Function to render comments
    function renderComments(comments) {
        if (!commentsContainer) return;
        
        // Clear container
        commentsContainer.innerHTML = '';
        
        // Show comment count
        const commentCount = document.createElement('h3');
        commentCount.className = 'comments-count';
        commentCount.textContent = `Comments (${comments.length})`;
        commentsContainer.appendChild(commentCount);
        
        if (comments.length === 0) {
            const noComments = document.createElement('p');
            noComments.className = 'no-comments';
            noComments.textContent = 'Be the first to comment!';
            commentsContainer.appendChild(noComments);
            return;
        }
        
        // Create comments list
        const commentsList = document.createElement('div');
        commentsList.className = 'comments-list';
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.setAttribute('data-comment-id', comment.id);
            
            commentElement.innerHTML = `
                <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${comment.name}</h4>
                        <span>${comment.date}</span>
                    </div>
                    <p>${comment.content}</p>
                    <div class="comment-actions">
                        <button class="comment-like" data-comment-id="${comment.id}">
                            <i class="far fa-thumbs-up"></i> <span>${comment.likes}</span>
                        </button>
                        <button class="comment-reply" data-comment-id="${comment.id}">
                            <i class="far fa-comment"></i> Reply
                        </button>
                    </div>
                </div>
            `;
            
            commentsList.appendChild(commentElement);
        });
        
        commentsContainer.appendChild(commentsList);
        
        // Add event listeners to comment actions
        const likeButtons = document.querySelectorAll('.comment-like');
        const replyButtons = document.querySelectorAll('.comment-reply');
        
        likeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const commentId = parseInt(button.getAttribute('data-comment-id'));
                
                // Update comment likes in localStorage
                const allComments = JSON.parse(localStorage.getItem('postComments') || '{}');
                const postComments = allComments[postId] || [];
                
                const commentIndex = postComments.findIndex(c => c.id === commentId);
                
                if (commentIndex !== -1) {
                    postComments[commentIndex].likes += 1;
                    allComments[postId] = postComments;
                    localStorage.setItem('postComments', JSON.stringify(allComments));
                    
                    // Update like count in UI
                    const likeCount = button.querySelector('span');
                    likeCount.textContent = postComments[commentIndex].likes;
                    
                    // Change icon to filled
                    const icon = button.querySelector('i');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            });
        });
        
        replyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const commentId = button.getAttribute('data-comment-id');
                const commentElement = document.querySelector(`.comment[data-comment-id="${commentId}"]`);
                
                // Remove any existing reply forms
                const existingForm = document.querySelector('.reply-form');
                if (existingForm) {
                    existingForm.remove();
                }
                
                // Create reply form
                const replyForm = document.createElement('form');
                replyForm.className = 'reply-form';
                
                replyForm.innerHTML = `
                    <div class="form-group">
                        <input type="text" id="reply-name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <textarea id="reply-content" placeholder="Your Reply" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary btn-sm">Submit Reply</button>
                        <button type="button" class="btn btn-outline btn-sm cancel-reply">Cancel</button>
                    </div>
                `;
                
                // Add form after comment
                commentElement.appendChild(replyForm);
                
                // Focus on name input
                replyForm.querySelector('#reply-name').focus();
                
                // Handle cancel button
                replyForm.querySelector('.cancel-reply').addEventListener('click', () => {
                    replyForm.remove();
                });
                
                // Handle form submission
                replyForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Show notification
                    window.showNotification('Reply feature coming soon!', 'info');
                    
                    // Remove form
                    replyForm.remove();
                });
            });
        });
    }
});