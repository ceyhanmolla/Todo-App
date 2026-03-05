// ====================================
// MODERN PASTEL TODO APP - JAVASCRIPT
// ====================================

// --- Application State & Configuration ---
const APP = {
    todos: [],
    currentFilter: 'all',
    currentSearch: '',
    storageKey: 'modernTodoApp_todos',
    maxTaskLength: 255,
    minTaskLength: 1,

    // Initialize the app
    init() {
        this.loadTodos();
        this.loadTheme();
        this.setupEventListeners();
        this.render();
    },

    // Load todos from localStorage
    loadTodos() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.todos = stored ? JSON.parse(stored) : [];
            // Validate todos structure
            this.todos = this.todos.filter(todo =>
                todo && typeof todo === 'object' && todo.id && todo.text !== undefined
            );
        } catch (err) {
            console.error('Error loading todos:', err);
            this.todos = [];
        }
    },

    // Save todos to localStorage
    saveTodos() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (err) {
            console.error('Error saving todos:', err);
        }
    },

    // Setup all event listeners
    setupEventListeners() {
        // Theme toggle
        const themeButton = document.getElementById('themeButton');
        if (themeButton) {
            themeButton.addEventListener('click', () => this.toggleTheme());
        }
        
        // Form submission
        const form = document.getElementById('todoForm');
        form.addEventListener('submit', (e) => this.handleAddTodo(e));

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Search input with debounce
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentSearch = e.target.value.toLowerCase().trim();
                this.render();
            }, 300);
        });

        // Clear completed button
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.handleClearCompleted();
        });

        // Event delegation for todo items
        document.getElementById('todoList').addEventListener('click', (e) => {
            const todoItem = e.target.closest('[data-todo-id]');
            if (!todoItem) return;

            const id = parseInt(todoItem.dataset.todoId, 10);

            if (e.target.classList.contains('todo-checkbox')) {
                this.toggleTodo(id);
            } else if (e.target.classList.contains('btn-delete')) {
                this.deleteTodo(id);
            } else if (e.target.classList.contains('btn-edit')) {
                this.editTodo(id);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + D to clear completed
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.handleClearCompleted();
            }
        });
    },

    // --- CRUD Operations ---

    // Add a new todo
    handleAddTodo(e) {
        e.preventDefault();

        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        const errorEl = document.getElementById('formError');

        // Validation
        if (!text) {
            this.showError(errorEl, 'Görev adı boş olamaz.');
            return;
        }

        if (text.length < this.minTaskLength) {
            this.showError(errorEl, `Görev en az ${this.minTaskLength} karakter olmalı.`);
            return;
        }

        if (text.length > this.maxTaskLength) {
            this.showError(errorEl, `Görev en fazla ${this.maxTaskLength} karakter olabilir.`);
            return;
        }

        // Sanitize input (prevent XSS)
        const sanitizedText = this.sanitizeInput(text);

        // Create todo object
        const todo = {
            id: Date.now(),
            text: sanitizedText,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();

        // Clear input and error
        input.value = '';
        errorEl.textContent = '';

        // Focus back to input for accessibility
        input.focus();
    },

    // Toggle todo completion status
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    },

    // Delete a todo
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    },

    // Edit a todo (simple inline edit)
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Görev düzenle:', todo.text);

        if (newText === null) return; // User cancelled

        const trimmedText = newText.trim();

        if (!trimmedText) {
            alert('Görev adı boş olamaz.');
            return;
        }

        if (trimmedText.length > this.maxTaskLength) {
            alert(`Görev en fazla ${this.maxTaskLength} karakter olabilir.`);
            return;
        }

        todo.text = this.sanitizeInput(trimmedText);
        this.saveTodos();
        this.render();
    },

    // Clear all completed todos
    handleClearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;

        if (completedCount === 0) {
            alert('Silinecek tamamlanan görev yok.');
            return;
        }

        if (confirm(`${completedCount} tamamlanan görev silinecek. Emin misiniz?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    },

    // --- Filtering & Searching ---

    handleFilterChange(e) {
        const button = e.target.closest('.filter-btn');
        if (!button) return;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        this.currentFilter = button.dataset.filter;
        this.render();
    },

    getFilteredTodos() {
        let filtered = this.todos;

        // Apply filter
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(t => !t.completed);
                break;
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
            case 'all':
            default:
                // Show all
                break;
        }

        // Apply search
        if (this.currentSearch) {
            filtered = filtered.filter(t =>
                t.text.toLowerCase().includes(this.currentSearch)
            );
        }

        return filtered;
    },

    // --- Rendering ---

    render() {
        this.updateStats();
        this.renderTodoList();
        this.updateActionBar();
    },

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    },

    renderTodoList() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        // Clear list
        todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        // Render todos
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.todoId = todo.id;
            li.setAttribute('role', 'listitem');

            li.innerHTML = `
                <input
                    type="checkbox"
                    class="todo-checkbox"
                    ${todo.completed ? 'checked' : ''}
                    aria-label="Görev tamamla: ${this.escapeHtml(todo.text)}"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="btn-edit" title="Düzenle" aria-label="Düzenle">✎</button>
                    <button class="btn-delete" title="Sil" aria-label="Sil">✕</button>
                </div>
            `;

            todoList.appendChild(li);
        });
    },

    updateActionBar() {
        const clearBtn = document.getElementById('clearCompleted');
        const hasCompleted = this.todos.some(t => t.completed);
        clearBtn.disabled = !hasCompleted;
    },

    // --- Theme Management ---

    // Load theme preference from localStorage or OS
    loadTheme() {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') {
            document.body.setAttribute('data-theme', stored);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.setAttribute('data-theme', 'dark');
        }
    },

    // Save current theme to localStorage
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    },

    // Toggle between dark and light
    toggleTheme() {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        this.saveTheme(next);
    },

    // --- Utilities ---

    // Sanitize user input (prevent XSS)
    sanitizeInput(text) {
        // Remove any HTML tags and trim
        return text.replace(/<[^>]*>/g, '').trim();
    },

    // Escape HTML special characters
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    // Show form error
    showError(element, message) {
        element.textContent = message;
        // Auto-clear error after 4 seconds
        setTimeout(() => {
            element.textContent = '';
        }, 4000);
    },
};

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
    APP.init();
});