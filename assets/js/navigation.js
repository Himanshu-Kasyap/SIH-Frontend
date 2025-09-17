// Universal Navigation Manager
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupUserProfile();
        this.setupActiveNavigation();
        this.setupMobileMenu();
        this.setupProfileSidebar();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Mobile menu toggle for landing page
        const landingMenuToggle = document.getElementById('landingMenuToggle');
        const landingSideMenu = document.getElementById('landingSideMenu');
        
        if (landingMenuToggle && landingSideMenu) {
            landingMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                landingSideMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!landingSideMenu.contains(e.target) && !landingMenuToggle.contains(e.target)) {
                    landingSideMenu.classList.remove('active');
                }
            });
        }

        // Mobile menu toggle for dashboard
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu toggle clicked'); // Debug log
                
                // Toggle sidebar
                sidebar.classList.toggle('active');
                sidebar.classList.toggle('open'); // Add both classes for compatibility
                
                // Toggle button active state for animation
                mobileMenuToggle.classList.toggle('active');
                
                // Toggle overlay
                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle('active');
                }
            });
            
            // Ensure the button is visible
            mobileMenuToggle.style.display = 'flex';
            mobileMenuToggle.style.visibility = 'visible';
        } else {
            console.log('Mobile menu toggle or sidebar not found'); // Debug log
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                sidebar?.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        }

        // User profile toggle
        const userProfileIcon = document.getElementById('userProfileIcon');
        const profileSidebar = document.getElementById('profileSidebar');
        const profileOverlay = document.getElementById('profileOverlay');
        const closeProfile = document.getElementById('closeProfile');

        if (userProfileIcon && profileSidebar) {
            userProfileIcon.addEventListener('click', () => {
                profileSidebar.classList.add('active');
                if (profileOverlay) {
                    profileOverlay.classList.add('active');
                }
            });
        }

        if (closeProfile) {
            closeProfile.addEventListener('click', () => {
                profileSidebar?.classList.remove('active');
                profileOverlay?.classList.remove('active');
            });
        }

        if (profileOverlay) {
            profileOverlay.addEventListener('click', () => {
                profileSidebar?.classList.remove('active');
                profileOverlay.classList.remove('active');
            });
        }

        // Dark mode toggle
        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            darkToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    setupUserProfile() {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.email) {
            const profileEmail = document.getElementById('profileEmail');
            const profileTitle = document.getElementById('profileTitle');
            const welcomeUser = document.getElementById('welcomeUser');

            if (profileEmail) {
                profileEmail.textContent = userData.email;
            }

            if (userData.name && userData.name.length > 0) {
                if (profileTitle) {
                    profileTitle.textContent = userData.name;
                }
                if (welcomeUser) {
                    welcomeUser.textContent = 'Welcome ' + userData.name;
                }
            } else {
                if (welcomeUser) {
                    welcomeUser.textContent = 'Welcome ' + userData.email;
                }
            }
        }
    }

    setupActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.dashboard-sidebar nav ul li');
        
        navLinks.forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPage || 
                    (currentPage === '' && href === 'index.html') ||
                    (currentPage === 'index.html' && href === 'dashboard.html')) {
                    li.classList.add('active');
                }
            }
        });
    }

    setupMobileMenu() {
        // Ensure mobile menu toggle exists
        let mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (!mobileMenuToggle) {
            // Create mobile menu toggle if it doesn't exist
            const header = document.querySelector('.dashboard-header-top');
            if (header) {
                mobileMenuToggle = document.createElement('button');
                mobileMenuToggle.id = 'mobileMenuToggle';
                mobileMenuToggle.className = 'mobile-menu-toggle';
                mobileMenuToggle.innerHTML = '☰';
                mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
                header.insertBefore(mobileMenuToggle, header.firstChild);
                
                // Add event listener to the newly created button
                const sidebar = document.getElementById('sidebar');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                
                if (sidebar) {
                    mobileMenuToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        sidebar.classList.toggle('active');
                        sidebar.classList.toggle('open');
                        if (sidebarOverlay) {
                            sidebarOverlay.classList.toggle('active');
                        }
                    });
                }
            }
        }
        
        // Handle responsive behavior
        const handleResize = () => {
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            
            if (window.innerWidth > 1024) {
                sidebar?.classList.remove('active');
                sidebar?.classList.remove('open');
                sidebarOverlay?.classList.remove('active');
            }
        };

        window.addEventListener('resize', handleResize);
    }

    setupProfileSidebar() {
        // Setup profile menu actions
        const profileMenuItems = document.querySelectorAll('.profile-menu ul li');
        
        profileMenuItems.forEach(item => {
            const text = item.textContent.trim().toLowerCase();
            
            if (text.includes('logout')) {
                item.addEventListener('click', () => {
                    this.logout();
                });
            } else if (text.includes('profile')) {
                item.addEventListener('click', () => {
                    window.location.href = 'profile.html';
                });
            } else if (text.includes('notifications')) {
                item.addEventListener('click', () => {
                    if (window.notificationManager) {
                        window.notificationManager.showNotificationDropdown();
                    }
                });
            }
        });
    }

    checkAuthStatus() {
        // Authentication check removed - all pages are now accessible without login
        const user = JSON.parse(localStorage.getItem('user'));
        // User data is still available for personalization when logged in
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        }
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            darkToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        switch (type) {
            case 'success':
                notification.style.background = '#06D6A0';
                break;
            case 'error':
                notification.style.background = '#FF5A5F';
                break;
            case 'warning':
                notification.style.background = '#FFC857';
                break;
            default:
                notification.style.background = '#4361EE';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Method to update navigation based on user role
    updateNavigationForRole(role) {
        const adminOnlyItems = document.querySelectorAll('[data-admin-only]');
        
        if (role !== 'admin') {
            adminOnlyItems.forEach(item => {
                item.style.display = 'none';
            });
        }
    }

    // Method to highlight current section
    highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.dashboard-sidebar nav ul li a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.parentElement.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.parentElement.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    
    // Load dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            darkToggle.textContent = '☀️ Light Mode';
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}// Force mob
ile menu toggle visibility on page load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure mobile menu toggle is visible on mobile devices
    function ensureMobileMenuToggle() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (mobileMenuToggle) {
            // Force visibility styles
            mobileMenuToggle.style.display = 'flex';
            mobileMenuToggle.style.visibility = 'visible';
            mobileMenuToggle.style.opacity = '1';
            mobileMenuToggle.style.position = 'relative';
            mobileMenuToggle.style.zIndex = '10000';
            mobileMenuToggle.style.width = '44px';
            mobileMenuToggle.style.height = '44px';
            mobileMenuToggle.style.background = 'rgba(255, 255, 255, 0.2)';
            mobileMenuToggle.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            mobileMenuToggle.style.borderRadius = '8px';
            mobileMenuToggle.style.cursor = 'pointer';
            mobileMenuToggle.style.alignItems = 'center';
            mobileMenuToggle.style.justifyContent = 'center';
            mobileMenuToggle.style.flexShrink = '0';
            
            // Clear any text content
            mobileMenuToggle.innerHTML = '';
            
            // Add CSS hamburger icon
            const style = document.createElement('style');
            style.textContent = `
                #mobileMenuToggle::before {
                    content: "" !important;
                    position: absolute !important;
                    left: 50% !important;
                    top: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    width: 18px !important;
                    height: 2px !important;
                    background: #ffffff !important;
                    box-shadow: 0 -5px 0 0 #ffffff, 0 5px 0 0 #ffffff !important;
                }
            `;
            document.head.appendChild(style);
            
            console.log('Mobile menu toggle visibility ensured');
        } else {
            console.log('Mobile menu toggle not found');
        }
    }
    
    // Run immediately and on resize
    ensureMobileMenuToggle();
    window.addEventListener('resize', ensureMobileMenuToggle);
});