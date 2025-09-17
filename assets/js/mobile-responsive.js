/**
 * Mobile Responsive JavaScript
 * Handles mobile-specific interactions and responsive behavior
 */

class MobileResponsive {
    constructor() {
        this.init();
        this.bindEvents();
        this.handleResize();
    }

    init() {
        // Set initial mobile state
        this.isMobile = window.innerWidth < 1024;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;
        
        // Get DOM elements
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.profileSidebar = document.getElementById('profileSidebar');
        this.profileOverlay = document.getElementById('profileOverlay');
        this.userProfileIcon = document.getElementById('userProfileIcon');
        this.closeProfile = document.getElementById('closeProfile');
        this.body = document.body;
        
        // Initialize mobile state
        this.updateMobileState();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });
        }

        // Sidebar overlay click
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Profile icon click
        if (this.userProfileIcon) {
            this.userProfileIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleProfileSidebar();
            });
        }

        // Profile overlay click
        if (this.profileOverlay) {
            this.profileOverlay.addEventListener('click', () => {
                this.closeProfileSidebar();
            });
        }

        // Close profile button
        if (this.closeProfile) {
            this.closeProfile.addEventListener('click', () => {
                this.closeProfileSidebar();
            });
        }

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Escape key to close sidebars
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeProfileSidebar();
            }
        });

        // Touch events for better mobile interaction
        this.handleTouchEvents();

        // Prevent body scroll when sidebars are open
        this.handleBodyScroll();
    }

    updateMobileState() {
        this.isMobile = window.innerWidth < 1024;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;

        // Update body classes
        this.body.classList.toggle('mobile', this.isMobile);
        this.body.classList.toggle('tablet', this.isTablet);
        this.body.classList.toggle('desktop', this.isDesktop);

        // Auto-close sidebars on desktop
        if (this.isDesktop) {
            this.closeSidebar();
            this.closeProfileSidebar();
        }
    }

    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateMobileState();
            this.adjustViewport();
        }, 100);
    }

    adjustViewport() {
        // Fix viewport height on mobile browsers
        if (this.isMobile) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    }

    toggleSidebar() {
        if (!this.sidebar) return;

        const isOpen = this.sidebar.classList.contains('open');
        
        if (isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        if (!this.sidebar) return;

        this.sidebar.classList.add('open');
        if (this.sidebarOverlay) {
            this.sidebarOverlay.classList.add('active');
        }
        
        // Prevent body scroll
        this.body.style.overflow = 'hidden';
        
        // Focus management
        this.trapFocus(this.sidebar);
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
    }

    closeSidebar() {
        if (!this.sidebar) return;

        this.sidebar.classList.remove('open');
        if (this.sidebarOverlay) {
            this.sidebarOverlay.classList.remove('active');
        }
        
        // Restore body scroll
        this.body.style.overflow = '';
        
        // Return focus to menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
    }

    toggleProfileSidebar() {
        if (!this.profileSidebar) return;

        const isOpen = this.profileSidebar.classList.contains('open');
        
        if (isOpen) {
            this.closeProfileSidebar();
        } else {
            this.openProfileSidebar();
        }
    }

    openProfileSidebar() {
        if (!this.profileSidebar) return;

        this.profileSidebar.classList.add('open');
        if (this.profileOverlay) {
            this.profileOverlay.classList.add('active');
        }
        
        // Prevent body scroll
        this.body.style.overflow = 'hidden';
        
        // Focus management
        this.trapFocus(this.profileSidebar);
        
        // Announce to screen readers
        this.announceToScreenReader('Profile menu opened');
    }

    closeProfileSidebar() {
        if (!this.profileSidebar) return;

        this.profileSidebar.classList.remove('open');
        if (this.profileOverlay) {
            this.profileOverlay.classList.remove('active');
        }
        
        // Restore body scroll
        this.body.style.overflow = '';
        
        // Return focus to profile icon
        if (this.userProfileIcon) {
            this.userProfileIcon.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Profile menu closed');
    }

    handleTouchEvents() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        // Swipe to open/close sidebar
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            const diffX = currentX - startX;
            const diffY = Math.abs(currentY - startY);
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(diffX) > diffY && Math.abs(diffX) > 50) {
                if (diffX > 0 && startX < 50 && !this.sidebar?.classList.contains('open')) {
                    // Swipe right from left edge to open sidebar
                    this.openSidebar();
                } else if (diffX < 0 && this.sidebar?.classList.contains('open')) {
                    // Swipe left to close sidebar
                    this.closeSidebar();
                }
            }
        }, { passive: true });
    }

    handleBodyScroll() {
        // Prevent scroll when modals or sidebars are open
        const observer = new MutationObserver(() => {
            const hasOpenModal = document.querySelector('.modal-overlay.active');
            const hasOpenSidebar = this.sidebar?.classList.contains('open');
            const hasOpenProfile = this.profileSidebar?.classList.contains('open');
            
            if (hasOpenModal || hasOpenSidebar || hasOpenProfile) {
                this.body.style.overflow = 'hidden';
            } else {
                this.body.style.overflow = '';
            }
        });

        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }

    trapFocus(element) {
        if (!element) return;

        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Public methods for external use
    static getInstance() {
        if (!MobileResponsive.instance) {
            MobileResponsive.instance = new MobileResponsive();
        }
        return MobileResponsive.instance;
    }

    // Utility methods
    static isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    static getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    static addTouchClass() {
        if (MobileResponsive.isTouchDevice()) {
            document.body.classList.add('touch-device');
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add touch device class
    MobileResponsive.addTouchClass();
    
    // Initialize mobile responsive behavior
    MobileResponsive.getInstance();
    
    // Set initial viewport height for mobile
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileResponsive;
} else if (typeof window !== 'undefined') {
    window.MobileResponsive = MobileResponsive;
}