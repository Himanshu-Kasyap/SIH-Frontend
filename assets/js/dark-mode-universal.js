// Universal Dark Mode Toggle - Works across all pages
class UniversalDarkMode {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupDarkModeToggle();
        this.loadSavedPreference();
        this.setupDarkModeStyles();
    }

    setupDarkModeToggle() {
        // Wait a bit for DOM to be fully ready
        setTimeout(() => {
            const darkToggle = document.getElementById('darkToggle');
            if (darkToggle) {
                // Remove any existing event listeners by cloning
                const newToggle = darkToggle.cloneNode(true);
                darkToggle.parentNode.replaceChild(newToggle, darkToggle);
                
                // Add new event listener
                newToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDarkMode();
                });
                
                console.log('✅ Universal Dark Mode: Toggle initialized on', window.location.pathname);
            } else {
                console.log('⚠️ Universal Dark Mode: Toggle button not found on', window.location.pathname);
                // Try again after a short delay
                setTimeout(() => {
                    const retryToggle = document.getElementById('darkToggle');
                    if (retryToggle) {
                        retryToggle.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.toggleDarkMode();
                        });
                        console.log('✅ Universal Dark Mode: Toggle initialized on retry');
                    }
                }, 500);
            }
        }, 100);
    }

    toggleDarkMode() {
        const body = document.body;
        const darkToggle = document.getElementById('darkToggle');
        
        // Toggle dark class
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        
        // Update button text
        if (darkToggle) {
            darkToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        
        // Save preference
        localStorage.setItem('darkMode', isDark.toString());
        
        // Apply dark mode styles
        this.applyDarkModeStyles(isDark);
        
        console.log(`🌙 Universal Dark Mode: ${isDark ? 'ENABLED' : 'DISABLED'} on ${window.location.pathname}`);
        
        // Force a repaint to ensure styles are applied
        body.style.display = 'none';
        body.offsetHeight; // Trigger reflow
        body.style.display = '';
    }

    loadSavedPreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        // Wait for dark toggle to be available
        setTimeout(() => {
            const darkToggle = document.getElementById('darkToggle');
            
            if (savedDarkMode === 'true') {
                document.body.classList.add('dark');
                if (darkToggle) {
                    darkToggle.textContent = '☀️ Light Mode';
                }
                this.applyDarkModeStyles(true);
                console.log('🌙 Universal Dark Mode: Loaded DARK preference on', window.location.pathname);
            } else {
                document.body.classList.remove('dark');
                if (darkToggle) {
                    darkToggle.textContent = '🌙 Dark Mode';
                }
                this.applyDarkModeStyles(false);
                console.log('🌙 Universal Dark Mode: Loaded LIGHT preference on', window.location.pathname);
            }
        }, 50);
    }

    setupDarkModeStyles() {
        // Add CSS variables for dark mode if they don't exist
        const style = document.createElement('style');
        style.id = 'universal-dark-mode-styles';
        
        // Check if styles already exist
        if (document.getElementById('universal-dark-mode-styles')) {
            return;
        }
        
        style.textContent = `
            /* Universal Dark Mode Styles */
            :root {
                --bg-light: #ffffff;
                --bg-dark: #1a202c;
                --text-light: #2d3748;
                --text-dark: #e2e8f0;
                --card-light: rgba(255, 255, 255, 0.95);
                --card-dark: rgba(45, 55, 72, 0.95);
                --border-light: #e2e8f0;
                --border-dark: #4a5568;
            }
            
            /* Dark mode styles */
            body.dark {
                background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
                color: #e2e8f0 !important;
            }
            
            body.dark .dashboard-header {
                background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%) !important;
            }
            
            body.dark .dashboard-sidebar {
                background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%) !important;
            }
            
            body.dark .agri-card,
            body.dark .product-card,
            body.dark .card {
                background: rgba(45, 55, 72, 0.95) !important;
                border-color: #4a5568 !important;
                color: #e2e8f0 !important;
            }
            
            body.dark .main-content {
                background: #1a202c !important;
                color: #e2e8f0 !important;
            }
            
            body.dark .content-nav {
                background: #2d3748 !important;
                border-color: #4a5568 !important;
            }
            
            body.dark .content-nav button {
                background: #374151 !important;
                color: #e2e8f0 !important;
                border-color: #4a5568 !important;
            }
            
            body.dark .content-nav button.active {
                background: #4f46e5 !important;
                color: #ffffff !important;
            }
            
            body.dark .search-box input {
                background: #374151 !important;
                color: #e2e8f0 !important;
                border-color: #4a5568 !important;
            }
            
            body.dark .container {
                background: #1a202c !important;
            }
            
            body.dark .item {
                background: #2d3748 !important;
                border-color: #4a5568 !important;
                color: #e2e8f0 !important;
            }
            
            body.dark .item h3 {
                color: #f7fafc !important;
            }
            
            body.dark .item p,
            body.dark .item li {
                color: #cbd5e0 !important;
            }
            
            body.dark .svg-image {
                filter: brightness(0.8) contrast(1.2);
            }
            
            /* Ensure dark mode toggle is visible */
            body.dark .dark-toggle {
                background: rgba(255, 255, 255, 0.1) !important;
                color: #e2e8f0 !important;
                border-color: rgba(255, 255, 255, 0.2) !important;
            }
            
            body.dark .dark-toggle:hover {
                background: rgba(255, 255, 255, 0.2) !important;
            }
        `;
        
        document.head.appendChild(style);
    }

    applyDarkModeStyles(isDark) {
        const body = document.body;
        
        if (isDark) {
            // Apply dark mode specific styles
            body.style.setProperty('--bg-color', 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)');
            body.style.setProperty('--text-color', '#e2e8f0');
            body.style.setProperty('--card-bg', 'rgba(45, 55, 72, 0.95)');
        } else {
            // Apply light mode specific styles
            body.style.setProperty('--bg-color', 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)');
            body.style.setProperty('--text-color', '#2d3748');
            body.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
        }
    }

    // Public method to manually toggle dark mode
    static toggle() {
        if (window.universalDarkMode) {
            window.universalDarkMode.toggleDarkMode();
        }
    }

    // Public method to check if dark mode is active
    static isDarkMode() {
        return document.body.classList.contains('dark');
    }

    // Public method to set dark mode
    static setDarkMode(enabled) {
        const body = document.body;
        const darkToggle = document.getElementById('darkToggle');
        
        if (enabled) {
            body.classList.add('dark');
            if (darkToggle) {
                darkToggle.textContent = '☀️ Light Mode';
            }
        } else {
            body.classList.remove('dark');
            if (darkToggle) {
                darkToggle.textContent = '🌙 Dark Mode';
            }
        }
        
        localStorage.setItem('darkMode', enabled.toString());
        
        if (window.universalDarkMode) {
            window.universalDarkMode.applyDarkModeStyles(enabled);
        }
    }
}

// Initialize universal dark mode
window.universalDarkMode = new UniversalDarkMode();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalDarkMode;
}