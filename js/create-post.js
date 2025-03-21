document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const createPostForm = document.getElementById('create-post-form');
    const titleInput = document.getElementById('post-title');
    const authorInput = document.getElementById('post-author');
    const categorySelect = document.getElementById('post-category');
    const tagsInput = document.getElementById('post-tags');
    const tagsPreview = document.getElementById('tags-preview');
    const imageInput = document.getElementById('post-image');
    const imagePreview = document.getElementById('image-preview');
    const selectImageBtn = document.getElementById('select-image-btn');
    const editor = document.getElementById('editor');
    const contentTextarea = document.getElementById('post-content');
    const previewBtn = document.getElementById('preview-btn');
    const publishBtn = document.getElementById('publish-btn');
    const previewModal = document.getElementById('preview-modal');
    const closePreviewBtn = document.getElementById('close-preview');
    const postPreview = document.getElementById('post-preview');
    const editPostBtn = document.getElementById('edit-post-btn');
    const confirmPublishBtn = document.getElementById('confirm-publish-btn');
    
    // Initialize editor
    initEditor();
    
    // Load saved data if available
    loadSavedData();
    
    // Event listeners
    tagsInput.addEventListener('input', updateTagsPreview);
    selectImageBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleImageUpload);
    previewBtn.addEventListener('click', showPreview);
    closePreviewBtn.addEventListener('click', hidePreview);
    editPostBtn.addEventListener('click', hidePreview);
    confirmPublishBtn.addEventListener('click', publishPost);
    
    // Form submission
    createPostForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            publishPost();
        }
    });
    
    // Auto-save form data every 30 seconds
    setInterval(saveFormData, 30000);
    
    // Initialize rich text editor
    function initEditor() {
        // Set up toolbar buttons
        const toolbarButtons = document.querySelectorAll('.editor-toolbar button');
        
        toolbarButtons.forEach(button => {
            button.addEventListener('click', () => {
                const command = button.getAttribute('data-command');
                
                if (command === 'h2' || command === 'h3' || command === 'p') {
                    document.execCommand('formatBlock', false, command);
                } else if (command === 'createLink') {
                    const url = prompt('Enter the link URL:');
                    if (url) document.execCommand(command, false, url);
                } else if (command === 'insertImage') {
                    const url = prompt('Enter the image URL:');
                    if (url) document.execCommand(command, false, url);
                } else if (command === 'code') {
                    // Insert code block
                    const selection = window.getSelection();
                    const range = selection.getRangeAt(0);
                    const preElement = document.createElement('pre');
                    const codeElement = document.createElement('code');
                    
                    if (selection.toString().length > 0) {
                        codeElement.textContent = selection.toString();
                        preElement.appendChild(codeElement);
                        range.deleteContents();
                        range.insertNode(preElement);
                    } else {
                        codeElement.textContent = 'Your code here';
                        preElement.appendChild(codeElement);
                        range.insertNode(preElement);
                    }
                } else {
                    document.execCommand(command, false, null);
                }
                
                // Update hidden textarea with content
                updateContentTextarea();
                
                // Focus back on editor
                editor.focus();
            });
        });
        
        // Update content textarea when editor content changes
        editor.addEventListener('input', updateContentTextarea);
        
        // Focus editor when clicked
        editor.addEventListener('focus', () => {
            editor.classList.add('focused');
        });
        
        editor.addEventListener('blur', () => {
            editor.classList.remove('focused');
        });
    }
    
    // Update content textarea with editor content
    function updateContentTextarea() {
        contentTextarea.value = editor.innerHTML;
    }
    
    // Update tags preview
    function updateTagsPreview() {
        const tags = tagsInput.value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        
        tagsPreview.innerHTML = '';
        
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag-item';
            tagElement.innerHTML = `
                ${tag}
                <button type="button" class="remove-tag" data-tag="${tag}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            tagsPreview.appendChild(tagElement);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-tag').forEach(button => {
            button.addEventListener('click', () => {
                const tagToRemove = button.getAttribute('data-tag');
                const updatedTags = tags.filter(tag => tag !== tagToRemove);
                tagsInput.value = updatedTags.join(', ');
                updateTagsPreview();
            });
        });
    }
    
    // Handle image upload
    function handleImageUpload() {
        const file = imageInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreview.classList.add('has-image');
                imagePreview.innerHTML = `
                    <div class="image-actions">
                        <button type="button" id="remove-image">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                // Add event listener to remove button
                document.getElementById('remove-image').addEventListener('click', removeImage);
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Remove image
    function removeImage() {
        imageInput.value = '';
        imagePreview.style.backgroundImage = '';
        imagePreview.classList.remove('has-image');
        imagePreview.innerHTML = `
            <i class="fas fa-image"></i>
            <span>No image selected</span>
        `;
    }
    
    // Show preview modal
    function showPreview() {
        if (!validateForm()) return;
        
        const title = titleInput.value;
        const author = authorInput.value;
        const category = categorySelect.value;
        const tags = tagsInput.value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        const content = editor.innerHTML;
        
        // Create preview HTML
        let previewHTML = `
            <div class="post-preview-header">
        `;
        
        // Add image if available
        if (imageInput.files[0]) {
            const imageUrl = URL.createObjectURL(imageInput.files[0]);
            previewHTML += `
                <div class="post-preview-image" style="background-image: url(${imageUrl})"></div>
            `;
        }
        
        previewHTML += `
                <div class="post-preview-category">${category}</div>
                <h1 class="post-preview-title">${title}</h1>
                <div class="post-preview-meta">
                    <span>By ${author}</span>
                    <span class="meta-divider">•</span>
                    <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="post-preview-tags">
                    ${tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="post-preview-content">
                ${content}
            </div>
        `;
        
        postPreview.innerHTML = previewHTML;
        previewModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Hide preview modal
    function hidePreview() {
        previewModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        
        // Validate title
        if (!titleInput.value.trim()) {
            document.getElementById('title-error').textContent = 'Title is required';
            isValid = false;
        } else if (titleInput.value.trim().length < 5) {
            document.getElementById('title-error').textContent = 'Title must be at least 5 characters';
            isValid = false;
        }
        
        // Validate author
        if (!authorInput.value.trim()) {
            document.getElementById('author-error').textContent = 'Author name is required';
            isValid = false;
        }
        
        // Validate category
        if (!categorySelect.value) {
            document.getElementById('category-error').textContent = 'Please select a category';
            isValid = false;
        }
        
        // Validate tags
        if (!tagsInput.value.trim()) {
            document.getElementById('tags-error').textContent = 'At least one tag is required';
            isValid = false;
        }
        
        // Validate content
        updateContentTextarea();
        if (!contentTextarea.value.trim()) {
            document.getElementById('content-error').textContent = 'Content is required';
            isValid = false;
        } else if (contentTextarea.value.trim().length < 100) {
            document.getElementById('content-error').textContent = 'Content must be at least 100 characters';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Publish post
    function publishPost() {
        if (!validateForm()) return;
        
        // Get form data
        const title = titleInput.value;
        const author = authorInput.value;
        const category = categorySelect.value;
        const tags = tagsInput.value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        const content = editor.innerHTML;
        
        // Create post object
        const post = {
            id: Date.now(),
            title: title,
            author: author,
            category: category,
            tags: tags,
            content: content,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            readTime: calculateReadTime(content) + ' min read',
            excerpt: generateExcerpt(content),
            likes: 0,
            comments: []
        };
        
        // Save image if available
        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                post.image = e.target.result;
                savePostAndRedirect(post);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            savePostAndRedirect(post);
        }
    }
    
    // Save post and redirect to posts page
    function savePostAndRedirect(post) {
        // Get existing user posts
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        
        // Add new post
        userPosts.unshift(post);
        
        // Save to localStorage
        localStorage.setItem('userPosts', JSON.stringify(userPosts));
        
        // Clear form data
        localStorage.removeItem('postFormData');
        
        // Show success notification
        window.showNotification('Post published successfully!', 'success');
        
        // Redirect to posts page
        setTimeout(() => {
            window.location.href = 'posts.html';
        }, 1500);
    }
    
    // Calculate read time
    function calculateReadTime(content) {
        // Remove HTML tags
        const text = content.replace(/<[^>]*>/g, '');
        
        // Count words (average reading speed is 200-250 words per minute)
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        
        return minutes;
    }
    
    // Generate excerpt
    function generateExcerpt(content) {
        // Remove HTML tags
        const text = content.replace(/<[^>]*>/g, '');
        
        // Get first 150 characters
        let excerpt = text.substring(0, 150).trim();
        
        // Add ellipsis if text is longer
        if (text.length > 150) {
            excerpt += '...';
        }
        
        return excerpt;
    }
    
    // Save form data to localStorage
    function saveFormData() {
        if (!titleInput.value && !editor.innerHTML) return;
        
        const formData = {
            title: titleInput.value,
            author: authorInput.value,
            category: categorySelect.value,
            tags: tagsInput.value,
            content: editor.innerHTML
        };
        
        localStorage.setItem('postFormData', JSON.stringify(formData));
        
        // Show notification
        window.showNotification('Draft saved automatically', 'info');
    }
    
    // Load saved form data
    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('postFormData'));
        
        if (savedData) {
            titleInput.value = savedData.title || '';
            authorInput.value = savedData.author || '';
            categorySelect.value = savedData.category || '';
            tagsInput.value = savedData.tags || '';
            editor.innerHTML = savedData.content || '';
            
            // Update tags preview
            updateTagsPreview();
            
            // Update content textarea
            updateContentTextarea();
            
            // Show notification
            window.showNotification('Draft loaded from previous session', 'info');
        }
    }
});