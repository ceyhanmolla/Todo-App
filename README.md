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

- **XSS Protection** - Uses `textContent` instead of `innerHTML` and sanitizes user input
- **Input Validation** - Validates task length (1-255 characters)
- **Data Sanitization** - Removes HTML tags and escapes special characters
- **Error Handling** - Graceful error handling for storage failures

See [security.md](security.md) for detailed security audit.

## ⚡ Performance

Optimized for speed and efficiency:

- **Event Delegation** - Single event listener for all task items (not one per item)
- **Debounced Search** - 300ms debounce on search input to prevent excessive rendering
- **GPU Acceleration** - CSS animations use `transform` and `opacity` for smooth 60fps performance
- **Minimal DOM Queries** - Smart caching and efficient DOM manipulation

See [optimizations.md](optimizations.md) for detailed performance analysis.

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Minimum supported:** ES6+ JavaScript, CSS Grid, CSS Variables

## �️ Screenshot

![App Screenshot](screenshot.png)

*Replace `screenshot.png` with a real capture of the application for visual reference.*

## �💾 Data Storage

Tasks are stored in browser `localStorage` under the key `modernTodoApp_todos`. 

**Note:** localStorage has a limit of ~5-10MB per origin. For applications with thousands of tasks, consider migrating to IndexedDB.

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] Dark mode toggle
- [ ] Due dates and priority levels
- [ ] Task categories/tags
- [ ] Drag-and-drop reordering
- [ ] Export to JSON/CSV
- [ ] Notifications and reminders
- [ ] Cloud sync (Firebase, Supabase)
- [ ] Progressive Web App (PWA) support
- [ ] Offline support with Service Workers

## 📖 Development

### Technologies Used
- **HTML5** - Semantic markup, accessibility (ARIA labels)
- **CSS3** - Modern flexbox/grid, CSS variables, animations, media queries
- **JavaScript (ES6+)** - Vanilla JS with modular app structure, no dependencies

### Code Style
- Modular application structure (APP object)
- Comprehensive error handling
- Input validation and sanitization
- Descriptive variable and function names
- Inline documentation

## 🔄 Version History

### v1.0 (March 5, 2026) ✅ PRODUCTION READY
- Initial release with all core features
- Full responsive design
- Security audit passed
- Performance optimized

## 📄 License

This project is open-source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project for your own needs!

---

**Built with ❤️ using vanilla JavaScript, HTML5, and CSS3**

For detailed technical information, see:
- [Progress Report](progress.md) - Development phases and milestones
- [Security Audit](security.md) - Security analysis and recommendations  
- [Optimization Report](optimizations.md) - Performance metrics and improvements
