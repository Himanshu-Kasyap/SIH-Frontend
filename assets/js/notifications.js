/**
 * Notification Management Utility
 * Handles notification count display and real-time updates
 */

class NotificationManager {
    constructor() {
        this.userId = null;
        this.unreadCount = 0;
        this.updateInterval = null;
        this.apiBaseUrl = '/api/community';
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    // Initialize notification manager
    init() {
        // Add CSS animations for notifications
        this.addNotificationStyles();
        
        // Get user ID from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.id) {
            this.userId = user.id;
            this.lastActivity = Date.now();
            this.setupNotificationDisplay();
            this.startRealTimeUpdates();
            
            // Run enhanced maintenance (including cleanup)
            this.enhancedPeriodicMaintenance();
        }
    }

    // Add CSS styles for notification animations
    addNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification-badge, .community-notification-badge {
                animation-fill-mode: both;
            }
            
            .notification-toast {
                animation: slideInRight 0.3s ease;
            }
            
            .notification-item:hover {
                background-color: #f5f5f5 !important;
                transition: background-color 0.2s ease;
            }
            
            .notification-dropdown {
                animation: slideInRight 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Setup notification count display in navigation
    setupNotificationDisplay() {
        // Add notification badge to the notifications menu item
        const notificationMenuItem = document.querySelector('[role="menuitem"] i.fa-bell');
        if (notificationMenuItem) {
            const parentLi = notificationMenuItem.closest('li');
            if (parentLi && !parentLi.querySelector('.notification-badge')) {
                const badge = document.createElement('span');
                badge.className = 'notification-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ff4444;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    display: none;
                `;
                parentLi.style.position = 'relative';
                parentLi.appendChild(badge);
            }
        }

        // Add notification badge to Community Hub if it exists
        const communityMenuItem = document.querySelector('li:has(i.bi-people-fill)');
        if (communityMenuItem && !communityMenuItem.querySelector('.community-notification-badge')) {
            const badge = document.createElement('span');
            badge.className = 'community-notification-badge';
            badge.style.cssText = `
                position: absolute;
                top: 5px;
                right: 10px;
                background: #28a745;
                color: white;
                border-radius: 10px;
                padding: 2px 6px;
                font-size: 10px;
                font-weight: bold;
                display: none;
            `;
            communityMenuItem.style.position = 'relative';
            communityMenuItem.appendChild(badge);
        }

        // Setup header notification bell click handler
        const notificationBell = document.getElementById('notificationBell');
        if (notificationBell) {
            notificationBell.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showNotificationDropdown();
            });
        }

        // Initial count fetch
        this.updateNotificationCount();
    }

    // Fetch and update notification count
    async updateNotificationCount() {
        if (!this.userId) return;

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/count?userId=${this.userId}`);

            if (data.success) {
                this.unreadCount = data.data.unreadCount;
                this.displayNotificationCount();
            }
        } catch (error) {
            console.error('Error fetching notification count:', error);
            // Don't update count on error to avoid showing incorrect information
        }
    }

    // Display notification count in UI with enhanced visual feedback
    displayNotificationCount() {
        const previousCount = this.previousUnreadCount || 0;
        const hasNewNotifications = this.unreadCount > previousCount;

        // Update header notification badge
        const headerBadge = document.getElementById('headerNotificationBadge');
        if (headerBadge) {
            if (this.unreadCount > 0) {
                headerBadge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                headerBadge.style.display = 'flex';
                
                // Add pulse animation for new notifications
                if (hasNewNotifications) {
                    headerBadge.style.animation = 'pulse 1s ease-in-out 3';
                }
            } else {
                headerBadge.style.display = 'none';
            }
        }

        // Update profile menu notification badge
        const notificationBadge = document.querySelector('.profile-menu .notification-badge');
        if (notificationBadge) {
            if (this.unreadCount > 0) {
                notificationBadge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                notificationBadge.style.display = 'flex';
                
                // Add pulse animation for new notifications
                if (hasNewNotifications) {
                    notificationBadge.style.animation = 'pulse 1s ease-in-out 3';
                }
            } else {
                notificationBadge.style.display = 'none';
            }
        }

        // Update community hub badge
        const communityBadge = document.querySelector('.community-notification-badge');
        if (communityBadge) {
            if (this.unreadCount > 0) {
                communityBadge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                communityBadge.style.display = 'inline-block';
                
                // Add pulse animation for new notifications
                if (hasNewNotifications) {
                    communityBadge.style.animation = 'pulse 1s ease-in-out 3';
                }
            } else {
                communityBadge.style.display = 'none';
            }
        }

        // Update page title with notification count
        if (this.unreadCount > 0) {
            document.title = `(${this.unreadCount}) Kisan Sahayak`;
        } else {
            document.title = 'Kisan Sahayak';
        }

        // Store previous count for comparison
        this.previousUnreadCount = this.unreadCount;

        // Show brief toast notification for new notifications
        if (hasNewNotifications && this.unreadCount > 0) {
            this.showNewNotificationToast();
        }
    }

    // Check for new notifications when page becomes visible
    async checkForNewNotifications() {
        const previousCount = this.unreadCount;
        await this.updateNotificationCount();
        
        if (this.unreadCount > previousCount) {
            const newCount = this.unreadCount - previousCount;
            this.showNewNotificationToast(newCount);
        }
    }

    // Show a brief toast notification for new notifications
    showNewNotificationToast(newCount = null) {
        // Don't show toast if user is actively using the notification system
        if (document.querySelector('.notification-dropdown[style*="block"]')) {
            return;
        }

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        const message = newCount 
            ? `${newCount} new notification${newCount > 1 ? 's' : ''}`
            : 'New notification received';
        
        toast.innerHTML = `
            <i class="fas fa-bell" style="margin-right: 8px;"></i>
            ${message}
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Click to open notifications
        toast.addEventListener('click', () => {
            this.showNotificationDropdown();
            toast.remove();
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
    }

    // Start periodic updates with enhanced real-time features
    startPeriodicUpdates() {
        // Clear existing interval if any
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Update every 15 seconds for more real-time feel
        this.updateInterval = setInterval(() => {
            this.updateNotificationCount();
        }, 15000);

        // Also update when page becomes visible again
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.updateNotificationCount();
                // Show brief notification if count increased while away
                this.checkForNewNotifications();
            }
        });

        // Update when user interacts with the page (focus events)
        window.addEventListener('focus', () => {
            this.updateNotificationCount();
        });

        // Update when user returns from another tab/window
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => this.updateNotificationCount(), 1000);
            }
        });
    }

    // Stop periodic updates
    stopPeriodicUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
            this.realTimeInterval = null;
        }
    }

    // Get notification summary for dashboard
    async getNotificationSummary() {
        if (!this.userId) return null;

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/summary?userId=${this.userId}`);
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Error fetching notification summary:', error);
            return null;
        }
    }

    // Bulk mark notifications as read
    async markMultipleAsRead(notificationIds) {
        if (!this.userId || !notificationIds.length) return false;

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/mark-multiple-read`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    userId: this.userId,
                    notificationIds: notificationIds
                })
            });

            if (data.success) {
                this.unreadCount = data.data.unreadCount;
                this.displayNotificationCount();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error marking multiple notifications as read:', error);
            return false;
        }
    }

    // Get unread notification count only
    async getUnreadCount() {
        if (!this.userId) return 0;

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/unread-count?userId=${this.userId}`);
            return data.success ? data.data.count : 0;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            return 0;
        }
    }

    // Preload next page of notifications for better UX
    async preloadNotifications(page = 2) {
        if (!this.userId) return;

        try {
            const data = await this.getNotifications(page, 10);
            if (data && data.notifications.length > 0) {
                // Cache the results for faster loading
                this.notificationCache = this.notificationCache || {};
                this.notificationCache[page] = data;
            }
        } catch (error) {
            console.error('Error preloading notifications:', error);
        }
    }

    // Fetch notifications for display
    async getNotifications(page = 1, limit = 20, unreadOnly = false) {
        if (!this.userId) return null;

        try {
            const params = new URLSearchParams({
                userId: this.userId,
                page: page.toString(),
                limit: limit.toString(),
                unreadOnly: unreadOnly.toString()
            });

            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications?${params}`);
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return null;
        }
    }

    // Mark notification as read
    async markAsRead(notificationId) {
        if (!this.userId) return false;

        try {
            const response = await fetch(`${this.apiBaseUrl}/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: this.userId })
            });

            const data = await response.json();
            
            if (data.success) {
                this.unreadCount = data.data.unreadCount;
                this.displayNotificationCount();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }

    // Mark all notifications as read
    async markAllAsRead() {
        if (!this.userId) return false;

        try {
            const response = await fetch(`${this.apiBaseUrl}/notifications/mark-all-read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: this.userId })
            });

            const data = await response.json();
            
            if (data.success) {
                this.unreadCount = 0;
                this.displayNotificationCount();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            return false;
        }
    }

    // Create notification dropdown/modal
    createNotificationDropdown() {
        // Remove existing dropdown if any
        const existingDropdown = document.querySelector('.notification-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.style.display = 'none';

        const header = document.createElement('div');
        header.className = 'notification-dropdown-header';
        header.innerHTML = `
            <h4>Notifications</h4>
            <button class="mark-all-read-btn">Mark All Read</button>
        `;

        const content = document.createElement('div');
        content.className = 'notification-content';

        dropdown.appendChild(header);
        dropdown.appendChild(content);
        document.body.appendChild(dropdown);

        // Add event listeners
        header.querySelector('.mark-all-read-btn').addEventListener('click', () => {
            this.markAllAsRead().then(() => {
                this.loadNotificationContent(content);
            });
        });

        return dropdown;
    }

    // Load notification content with enhanced features
    async loadNotificationContent(contentElement) {
        contentElement.innerHTML = '<div class="notification-empty"><i class="fas fa-spinner fa-spin"></i><div class="notification-empty-title">Loading...</div></div>';

        const notifications = await this.getNotifications(1, 15);
        
        if (!notifications || notifications.notifications.length === 0) {
            contentElement.innerHTML = `
                <div class="notification-empty">
                    <i class="fas fa-bell-slash"></i>
                    <div class="notification-empty-title">No notifications yet</div>
                    <div class="notification-empty-subtitle">You'll see notifications here when someone interacts with your questions and answers</div>
                </div>
            `;
            return;
        }

        contentElement.innerHTML = '';
        
        // Add notification statistics
        const stats = document.createElement('div');
        stats.className = 'notification-stats';
        stats.innerHTML = `
            ${notifications.unreadCount} unread of ${notifications.pagination.totalNotifications} total notifications
        `;
        contentElement.appendChild(stats);
        
        notifications.notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${!notification.isRead ? 'unread' : ''}`;
            
            // Format notification time
            const timeAgo = this.getTimeAgo(new Date(notification.createdAt));
            
            // Add notification type icon
            let typeClass = 'answer';
            let typeIcon = 'fa-comment';
            
            switch (notification.type) {
                case 'answer':
                    typeClass = 'answer';
                    typeIcon = 'fa-comment';
                    break;
                case 'vote':
                    typeClass = 'vote';
                    typeIcon = 'fa-thumbs-up';
                    break;
                case 'solution':
                    typeClass = 'solution';
                    typeIcon = 'fa-check-circle';
                    break;
            }
            
            item.innerHTML = `
                <div class="notification-icon ${typeClass}">
                    <i class="fas ${typeIcon}"></i>
                </div>
                <div class="notification-body">
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-meta">
                        <span class="notification-time">${timeAgo}</span>
                        ${!notification.isRead ? '<span class="notification-new-badge">New</span>' : ''}
                    </div>
                </div>
            `;

            item.addEventListener('click', this.handleNotificationClick(notification));

            contentElement.appendChild(item);
        });

        // Add "View All" link if there are more notifications
        if (notifications.pagination.totalNotifications > 15) {
            const viewAllLink = document.createElement('div');
            viewAllLink.className = 'notification-view-all';
            viewAllLink.innerHTML = `View All Notifications (${notifications.pagination.totalNotifications})`;
            
            viewAllLink.addEventListener('click', () => {
                // Navigate to full notifications page (to be created)
                window.location.href = 'notifications.html';
            });
            
            contentElement.appendChild(viewAllLink);
        }
    }

    // Helper function to format time ago
    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    }

    // Show notification dropdown with enhanced features
    async showNotificationDropdown() {
        const dropdown = this.createNotificationDropdown();
        const content = dropdown.querySelector('.notification-content');
        
        await this.loadNotificationContent(content);
        dropdown.style.display = 'block';

        // Auto-refresh notifications every 30 seconds while dropdown is open
        const refreshInterval = setInterval(async () => {
            if (dropdown.style.display === 'block') {
                await this.loadNotificationContent(content);
            } else {
                clearInterval(refreshInterval);
            }
        }, 30000);

        // Close dropdown when clicking outside
        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && !e.target.closest('#notificationBell')) {
                dropdown.style.display = 'none';
                clearInterval(refreshInterval);
                document.removeEventListener('click', closeDropdown);
            }
        };

        // Handle keyboard navigation
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                dropdown.style.display = 'none';
                clearInterval(refreshInterval);
                document.removeEventListener('keydown', handleKeydown);
                document.removeEventListener('click', closeDropdown);
                return;
            }

            // Arrow key navigation
            const items = dropdown.querySelectorAll('.notification-item');
            const currentFocus = dropdown.querySelector('.notification-item:focus');
            let currentIndex = Array.from(items).indexOf(currentFocus);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items[currentIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[currentIndex].focus();
            } else if (e.key === 'Enter' && currentFocus) {
                e.preventDefault();
                currentFocus.click();
            }
        };

        // Make notification items focusable for keyboard navigation
        setTimeout(() => {
            const items = dropdown.querySelectorAll('.notification-item');
            items.forEach((item, index) => {
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-label', `Notification ${index + 1}`);
            });

            document.addEventListener('click', closeDropdown);
            document.addEventListener('keydown', handleKeydown);
        }, 100);
    }

    // Enhanced AJAX call with better error handling and retry logic
    async makeApiCall(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            ...options
        };

        let retries = 3;
        while (retries > 0) {
            try {
                const response = await fetch(url, defaultOptions);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                return data;
            } catch (error) {
                retries--;
                if (retries === 0) {
                    console.error('API call failed after retries:', error);
                    throw error;
                }
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, (4 - retries) * 1000));
            }
        }
    }

    // Enhanced real-time notification updates
    startRealTimeUpdates() {
        // Clear existing intervals
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }

        // Regular updates every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateNotificationCount();
        }, 30000);

        // More frequent updates when user is active (every 10 seconds)
        this.realTimeInterval = setInterval(() => {
            if (this.isUserActive()) {
                this.updateNotificationCount();
            }
        }, 10000);

        // Update when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.updateNotificationCount();
                this.checkForNewNotifications();
            }
        });

        // Update on user interaction
        ['click', 'keydown', 'mousemove', 'scroll'].forEach(event => {
            document.addEventListener(event, this.throttle(() => {
                this.lastActivity = Date.now();
            }, 5000));
        });
    }

    // Check if user is active (has interacted in the last 5 minutes)
    isUserActive() {
        const fiveMinutes = 5 * 60 * 1000;
        return (Date.now() - (this.lastActivity || Date.now())) < fiveMinutes;
    }

    // Throttle function to limit function calls
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Enhanced click handler for notifications with better navigation
    handleNotificationClick(notification) {
        return async (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Mark as read if unread
            if (!notification.isRead) {
                try {
                    await this.markAsRead(notification._id);
                    // Update UI immediately
                    const item = e.currentTarget;
                    item.classList.remove('unread');
                    const newBadge = item.querySelector('.notification-new-badge');
                    if (newBadge) newBadge.remove();
                } catch (error) {
                    console.error('Failed to mark notification as read:', error);
                }
            }

            // Close dropdown
            const dropdown = document.querySelector('.notification-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }

            // Navigate to relevant content
            if (notification.questionId) {
                this.navigateToQuestion(notification.questionId, notification.answerId);
            }
        };
    }

    // Smart navigation to questions/answers
    navigateToQuestion(questionId, answerId = null) {
        let targetUrl;
        
        // Determine the correct path based on current location
        const currentPath = window.location.pathname;
        const isInFrontendFolder = currentPath.includes('/frontend/public/');
        
        if (isInFrontendFolder) {
            targetUrl = `question-detail.html?id=${questionId}`;
        } else if (currentPath.includes('/public/')) {
            targetUrl = `question-detail.html?id=${questionId}`;
        } else {
            // Assume we're in the root and need to navigate to frontend/public
            targetUrl = `frontend/public/question-detail.html?id=${questionId}`;
        }

        // Add answer anchor if specified
        if (answerId) {
            targetUrl += `#answer-${answerId}`;
        }

        // Navigate with a small delay to allow UI updates
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 100);
    }

    // Enhanced mark as read with optimistic updates
    async markAsRead(notificationId) {
        if (!this.userId) return false;

        // Optimistic update
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.displayNotificationCount();

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/${notificationId}/read`, {
                method: 'PUT',
                body: JSON.stringify({ userId: this.userId })
            });

            if (data.success) {
                this.unreadCount = data.data.unreadCount;
                this.displayNotificationCount();
                return true;
            } else {
                // Revert optimistic update
                this.unreadCount += 1;
                this.displayNotificationCount();
                return false;
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
            // Revert optimistic update
            this.unreadCount += 1;
            this.displayNotificationCount();
            return false;
        }
    }

    // Enhanced mark all as read with better UX
    async markAllAsRead() {
        if (!this.userId || this.unreadCount === 0) return false;

        // Show loading state
        const markAllBtn = document.querySelector('.mark-all-read-btn');
        if (markAllBtn) {
            markAllBtn.textContent = 'Marking...';
            markAllBtn.disabled = true;
        }

        // Optimistic update
        const previousCount = this.unreadCount;
        this.unreadCount = 0;
        this.displayNotificationCount();

        try {
            const data = await this.makeApiCall(`${this.apiBaseUrl}/notifications/mark-all-read`, {
                method: 'PUT',
                body: JSON.stringify({ userId: this.userId })
            });

            if (data.success) {
                // Update all notification items in the dropdown
                document.querySelectorAll('.notification-item.unread').forEach(item => {
                    item.classList.remove('unread');
                    const newBadge = item.querySelector('.notification-new-badge');
                    if (newBadge) newBadge.remove();
                });

                if (markAllBtn) {
                    markAllBtn.textContent = 'All Read';
                    setTimeout(() => {
                        markAllBtn.textContent = 'Mark All Read';
                        markAllBtn.disabled = false;
                    }, 2000);
                }

                return true;
            } else {
                // Revert optimistic update
                this.unreadCount = previousCount;
                this.displayNotificationCount();
                
                if (markAllBtn) {
                    markAllBtn.textContent = 'Mark All Read';
                    markAllBtn.disabled = false;
                }
                return false;
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            
            // Revert optimistic update
            this.unreadCount = previousCount;
            this.displayNotificationCount();
            
            if (markAllBtn) {
                markAllBtn.textContent = 'Error - Try Again';
                markAllBtn.disabled = false;
            }
            return false;
        }
    }

    // Trigger cleanup of old notifications (called periodically)
    async triggerNotificationCleanup() {
        if (!this.userId) return;

        try {
            const response = await fetch(`${this.apiBaseUrl}/notifications/cleanup`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    userId: this.userId,
                    days: 30 // Clean up notifications older than 30 days
                })
            });

            const data = await response.json();
            
            if (data.success) {
                console.log(`Cleaned up ${data.data.cleanedCount} old notifications`);
                // Refresh notification count after cleanup
                this.updateNotificationCount();
            }
        } catch (error) {
            console.error('Error triggering notification cleanup:', error);
        }
    }

    // Enhanced periodic updates with cleanup
    enhancedPeriodicMaintenance() {
        // Run cleanup once per day (24 hours)
        const lastCleanup = localStorage.getItem('lastNotificationCleanup');
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (!lastCleanup || (now - parseInt(lastCleanup)) > oneDayMs) {
            this.triggerNotificationCleanup();
            localStorage.setItem('lastNotificationCleanup', now.toString());
        }
    }
}

// Create global instance
window.notificationManager = new NotificationManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
}