### DevBlog - Interactive Web Development Blog

## 📝 Description

DevBlog (live [here](https://devvblog.netlify.app/))is a fully interactive blog website focused on web development topics. It features a clean, responsive design with numerous interactive elements to enhance user experience. The site includes a post creation system that allows users to write and publish their own blog posts with a rich text editor.

## ✨ Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive Elements**:
    - Image carousels
    - Animated counters
    - Typing effects
    - Post filtering and searching
    - Reading progress bars
    - Comment sections
    - Interactive forms with validation
- **Post Creation System**:
    - Rich text editor with formatting options
    - Image uploads
    - Tag management
    - Post preview
    - Auto-saving drafts
- **Local Storage Integration**:
    - Saves user-created posts
    - Remembers user preferences
    - Stores comments and likes

## 🛠️ Technologies Used

- HTML5  
- CSS3 (with custom variables for theming)  
- Vanilla JavaScript (ES6+)  
- Font Awesome for icons  
- LocalStorage API for data persistence  

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)  
- Basic knowledge of HTML, CSS, and JavaScript (for customization)  

### Installation

1. Clone the repository:

     ```bash
     git clone https://github.com/CodeWithEugene/DevBlog.git
     ```

2. Navigate to the project directory:

     ```bash
     cd devblog
     ```

3. Open `index.html` in your browser or use a local development server:

     ```bash
     # Using Python
     python -m http.server

     # Using Node.js with http-server
     npx http-server
     ```

## 📂 Project Structure

```plaintext
devblog/
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── home.js
│   ├── posts.js
│   ├── post-detail.js
│   ├── create-post.js
│   ├── about.js
│   └── contact.js
├── index.html
├── posts.html
├── post-detail.html
├── create-post.html
├── about.html
├── contact.html
└── README.md
```

## 🔍 Features in Detail

### Home Page

- Hero section with animated text  
- Featured posts carousel  
- Animated statistics counters  
- Newsletter subscription form  

### Posts Page

- Post filtering by category  
- Search functionality  
- Sort options (newest, oldest, title, reading time)  
- Responsive post grid  

### Post Creation

- Rich text editor with formatting toolbar  
- Image upload and preview  
- Tag management system  
- Form validation  
- Auto-saving drafts  
- Post preview before publishing  

### Post Detail Page

- Reading progress bar  
- Table of contents with smooth scrolling  
- Like and bookmark functionality  
- Comment section with likes and replies  
- Related posts suggestions  

### About Page

- Team member cards with flip effect  
- Skill progress bars  
- Interactive timeline  
- Animated statistics  

### Contact Page

- Form validation  
- Interactive map  
- Contact information cards  

## 🔄 Data Persistence

DevBlog uses the browser's LocalStorage API to persist data, including:

- User-created blog posts  
- Comments and likes  
- Bookmarked posts  
- Theme preferences  
- Form drafts  

This means that user data will persist between sessions but is limited to the browser it was created in.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/amazing-feature`)  
3. Make your changes  
4. Commit your changes (`git commit -m 'Add some amazing feature'`)  
5. Push to the branch (`git push origin feature/amazing-feature`)  
6. Open a Pull Request  

Please ensure your code follows the existing style and includes appropriate comments.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 📱 Contact

If you have any questions or suggestions, feel free to contact me [here](https://wa.link/2bd4nv).

---

Made with ❤️ by [Eugenius](https://eugeniuss.netlify.app/)  