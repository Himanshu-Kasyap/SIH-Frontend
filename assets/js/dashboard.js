// Get DOM elements
const darkToggle = document.getElementById('darkToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const userProfileIcon = document.getElementById('userProfileIcon');
const profileSidebar = document.getElementById('profileSidebar');
const profileOverlay = document.getElementById('profileOverlay');
const closeProfile = document.getElementById('closeProfile');

// Debug: Check if elements exist
console.log('Profile elements found:', {
    userProfileIcon: !!userProfileIcon,
    profileSidebar: !!profileSidebar,
    profileOverlay: !!profileOverlay,
    closeProfile: !!closeProfile
});

// Profile sidebar state
let profileSidebarOpen = false;

// Responsive breakpoints
const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
};

// Check if current screen is mobile
function isMobile() {
    return window.innerWidth < breakpoints.mobile;
}

// Check if current screen is tablet or above
function isTabletOrAbove() {
    return window.innerWidth >= breakpoints.mobile;
}

// Dark mode toggle
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Profile sidebar functions
function openProfileSidebar() {
    profileSidebarOpen = true;
    profileSidebar.classList.add('open');
    profileOverlay.classList.add('active');
    profileSidebar.setAttribute('aria-hidden', 'false');
    
    // Close navigation sidebar if open (mobile only)
    if (isMobile()) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        // Prevent body scrolling on mobile
        document.body.style.overflow = 'hidden';
    }
    
    // Focus management
    closeProfile.focus();
}

function closeProfileSidebar() {
    profileSidebarOpen = false;
    profileSidebar.classList.remove('open');
    profileOverlay.classList.remove('active');
    profileSidebar.setAttribute('aria-hidden', 'true');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Return focus to profile icon
    userProfileIcon.focus();
}

// Profile icon click handler
userProfileIcon.addEventListener('click', (e) => {
    console.log('Profile icon clicked!'); // Debug log
    e.preventDefault();
    e.stopPropagation();
    
    if (profileSidebarOpen) {
        console.log('Closing profile sidebar'); // Debug log
        closeProfileSidebar();
    } else {
        console.log('Opening profile sidebar'); // Debug log
        openProfileSidebar();
    }
});

// Close profile button handler
closeProfile.addEventListener('click', closeProfileSidebar);

// Profile overlay click handler
profileOverlay.addEventListener('click', closeProfileSidebar);

// Prevent sidebar from closing when clicking inside it
profileSidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Keyboard event handling
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileSidebarOpen) {
        closeProfileSidebar();
    }
});

// Handle clicks outside sidebar
document.addEventListener('click', (e) => {
    if (profileSidebarOpen && 
        !profileSidebar.contains(e.target) && 
        !userProfileIcon.contains(e.target)) {
        closeProfileSidebar();
    }
});

// Mobile menu functionality - Only works on mobile screens
mobileMenuToggle.addEventListener('click', () => {
    if (isMobile()) {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        // Close profile sidebar if open
        if (profileSidebarOpen) {
            closeProfileSidebar();
        }
    }
});

sidebarOverlay.addEventListener('click', () => {
    if (isMobile()) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }
});

// Close mobile menu when clicking on navigation items (mobile only)
const navItems = document.querySelectorAll('.sidebar nav ul li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isMobile()) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        }
    });
});

// Enhanced window resize handler for responsive behavior
function handleResize() {
    const wasMobile = document.body.classList.contains('was-mobile');
    const isCurrentlyMobile = isMobile();
    
    if (isCurrentlyMobile) {
        document.body.classList.add('was-mobile');
    } else {
        document.body.classList.remove('was-mobile');
    }
    
    // Handle transition from mobile to desktop
    if (wasMobile && !isCurrentlyMobile) {
        // Close mobile menu when switching to desktop
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        
        // Close profile sidebar and restore scrolling when switching to desktop
        if (profileSidebarOpen) {
            closeProfileSidebar();
        }
    }
    
    // Handle transition from desktop to mobile
    if (!wasMobile && isCurrentlyMobile) {
        // Ensure sidebar is hidden on mobile
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }
    
    // Update sidebar state based on screen size
    if (isTabletOrAbove()) {
        // On tablet and above, sidebar should be visible by default
        // Remove mobile-specific classes
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }
}

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    handleResize();
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        handleResize();
        
        if (profileSidebarOpen && isMobile()) {
            // Recalculate sidebar positioning if needed
            profileSidebar.style.height = `calc(100vh - ${document.querySelector('header').offsetHeight}px)`;
        }
    }, 100);
});

// Touch event handling for mobile gestures
let touchStartX = 0;
let touchEndX = 0;

profileSidebar.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

profileSidebar.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    
    // Swipe left to close (only on mobile)
    if (swipeDistance > swipeThreshold && isMobile()) {
        closeProfileSidebar();
    }
}

// Accessibility enhancements
// Focus trapping within sidebar
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

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

// Apply focus trapping to profile sidebar
trapFocus(profileSidebar);

// Keyboard navigation for menu items
const profileMenuItems = document.querySelectorAll('.profile-menu ul li');
profileMenuItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextItem = profileMenuItems[index + 1] || profileMenuItems[0];
                nextItem.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevItem = profileMenuItems[index - 1] || profileMenuItems[profileMenuItems.length - 1];
                prevItem.focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                item.click();
                break;
        }
    });

    // Add click handlers for menu items
    item.addEventListener('click', () => {
        // Placeholder for menu item actions
        console.log(`Clicked: ${item.textContent.trim()}`);
        
        // Close sidebar after action (except for settings that might open modals)
        if (!item.textContent.includes('Settings')) {
            closeProfileSidebar();
        }
    });
});

// Announce sidebar state changes to screen readers
function announceToScreenReader(message) {
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

// Enhanced profile sidebar functions with announcements
function openProfileSidebarWithAnnouncement() {
    profileSidebarOpen = true;
    profileSidebar.classList.add('open');
    profileOverlay.classList.add('active');
    profileSidebar.setAttribute('aria-hidden', 'false');
    
    // Close navigation sidebar if open (mobile only)
    if (isMobile()) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        // Prevent body scrolling on mobile
        document.body.style.overflow = 'hidden';
    }
    
    // Focus management
    closeProfile.focus();
    
    // Announce to screen readers
    announceToScreenReader('Profile sidebar opened');
}

function closeProfileSidebarWithAnnouncement() {
    profileSidebarOpen = false;
    profileSidebar.classList.remove('open');
    profileOverlay.classList.remove('active');
    profileSidebar.setAttribute('aria-hidden', 'true');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Return focus to profile icon
    userProfileIcon.focus();
    
    // Announce to screen readers
    announceToScreenReader('Profile sidebar closed');
}

// Update the function references
openProfileSidebar = openProfileSidebarWithAnnouncement;
closeProfileSidebar = closeProfileSidebarWithAnnouncement;

// Responsive utility functions for external use
window.ResponsiveUtils = {
    isMobile,
    isTabletOrAbove,
    breakpoints,
    handleResize
};