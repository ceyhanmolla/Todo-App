# 🎨 Modern Pastel TODO App

A beautiful, modern TODO application built with vanilla HTML, CSS, and JavaScript. Features a pastel color palette, responsive design, and persistent storage using localStorage.

## ✨ Features

- **✅ Full CRUD Operations** - Add, edit, delete, and complete tasks
- **🎨 Pastel Color Palette** - Modern UI with color theory-compliant design
- **📱 Fully Responsive** - Mobile-first design (320px to 1440px+)
- **💾 Persistent Storage** - LocalStorage for saving tasks locally
- **🔍 Search & Filter** - Filter tasks (All/Active/Completed) and search by keyword
- **⌨️ Keyboard Shortcuts** - Ctrl+Shift+D to clear completed tasks
- **🔒 Security** - XSS protection, input sanitization, and data validation
- **⚡ High Performance** - Event delegation, optimized animations, minimal DOM queries

## 🚀 Quick Start

### Option 1: Open Locally
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start adding tasks!

### Option 2: Use with a Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js / http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📋 How to Use

### Adding Tasks
1. Type your task in the input field at the top
2. Press **Enter** or click the **+** button
3. Task appears in the list below

### Managing Tasks
- **Complete Task** - Click the checkbox next to any task
- **Edit Task** - Click the **✎** (edit) button
- **Delete Task** - Click the **✕** (delete) button
- **Clear Completed** - Click "Tamamlananları Sil" button to remove all completed tasks

### Filtering & Searching
- **Filter Buttons** - Click "Tümü", "Aktif", or "Tamamlanan" to filter tasks
- **Search** - Use the search box to find tasks by keyword (real-time search)

### Stats
- **Toplam** - Total number of tasks
- **Aktif** - Number of incomplete tasks
- **Tamamlanan** - Number of completed tasks

## 🎨 Color Palette

The interface follows a clean Notion‑style monochrome theme, using black and white as the foundation.
A dark mode is also available via the toggle button at the top‑right.

| Theme | Element | Hex |
|-------|---------|-----|
| Light | Text / Primary | `#000000` |
| Light | Background / Accent | `#FFFFFF` |
| Light | Border / Secondary | `#E0E0E0` |
| Dark  | Text / Primary | `#FFFFFF` |
| Dark  | Background / Accent | `#000000` |
| Dark  | Border / Secondary | `#444444` |


### 🌙 Dark Mode

- Click the 🌗 button in the header to toggle between light and dark themes.
- Preference is persisted in `localStorage` and respects the system `prefers-color-scheme` on first visit.

The theme switch updates the `data-theme` attribute on the `<body>`, and custom properties
are overridden accordingly to present a coherent black-and-white UI that mimics Notion.

## 📁 Project Structure

```
todo-app/
├── index.html          # HTML structure and semantic markup
├── styles.css          # Modern CSS with responsive design
├── script.js           # Vanilla JavaScript app logic
├── README.md           # This file
├── progress.md         # Development progress tracker
├── security.md         # Security audit report
├── optimizations.md    # Performance audit & optimization notes
├── agents.md           # AI agent configuration
└── MASTER_INSTRUCTIONS.md  # Development guidelines
```

## 🔒 Security

This application implements several security best practices:

- **Input Sanitization** - All user inputs are sanitized to prevent XSS attacks
- **HTML Escaping** - Dynamic content is properly escaped
- **Data Validation** - Input length limits and required field validation
- **Secure Storage** - localStorage is used safely with error handling
- **No External Dependencies** - Zero external libraries to minimize attack surface

## ⚡ Performance

- **Event Delegation** - Efficient event handling with minimal DOM queries
- **Debounced Search** - Search input uses debouncing for better performance
- **Optimized Animations** - CSS transitions and transforms for smooth UX
- **Minimal DOM Manipulation** - Smart rendering with targeted updates
- **Lazy Loading** - Components load only when needed

## 🛠️ Development

### Prerequisites
- Modern web browser with ES6+ support
- Text editor or IDE

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to HTML/CSS/JS files
4. Refresh browser to see changes

### Building for Production
No build process required - the app runs directly in the browser!

## 📱 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by modern task management applications
- Built with vanilla web technologies for maximum compatibility
- Color palette designed for accessibility and user comfort

---

**Built with ❤️ using HTML, CSS, and JavaScript**