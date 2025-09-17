// Profile Page JavaScript - HTML Interface Functionality
// This handles UI interactions for the profile page

class ProfileInterface {
    constructor() {
        this.currentTab = 'questions';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTabNavigation();
        this.setupReputationLevels();
        this.loadBasicUserInfo();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.closest('.tab-btn').dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Sort options
        const questionsSortSelect = document.getElementById('questionsSortSelect');
        const answersSortSelect = document.getElementById('answersSortSelect');
        
        if (questionsSortSelect) {
            questionsSortSelect.addEventListener('change', () => {
                if (this.currentTab === 'questions') {
                    this.loadTabContent('questions');
                }
            });
        }

        if (answersSortSelect) {
            answersSortSelect.addEventListener('change', () => {
                if (this.currentTab === 'answers') {
                    this.loadTabContent('answers');
                }
            });
        }

        // Pagination
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.loadTabContent(this.currentTab);
                    this.updatePagination();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadTabContent(this.currentTab);
                this.updatePagination();
            });
        }

        // Edit profile button
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.showEditProfileModal();
            });
        }
    }

    setupTabNavigation() {
        // Set initial active tab
        this.switchTab('questions');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Content`).classList.add('active');

        this.currentTab = tabName;
        this.currentPage = 1;
        
        // Load content for the selected tab (placeholder for now)
        this.loadTabContent(tabName);
    }

    async loadTabContent(tabName) {
        const contentContainer = document.getElementById(`${tabName}Content`);
        const listContainer = contentContainer.querySelector(`.${tabName}-list, .activity-timeline`);
        
        if (!listContainer) return;

        // Show loading spinner
        listContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading ${tabName}...</span>
            </div>
        `;

        try {
            const userId = this.getCurrentUserId();
            if (!userId) {
                this.showEmptyState(listContainer, tabName);
                return;
            }

            switch (tabName) {
                case 'questions':
                    await this.loadUserQuestions(listContainer, userId);
                    break;
                case 'answers':
                    await this.loadUserAnswers(listContainer, userId);
                    break;
                case 'activity':
                    await this.loadUserActivity(listContainer, userId);
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${tabName}:`, error);
            this.showErrorState(listContainer, `Failed to load ${tabName}`);
        }
    }

    showEmptyState(container, type) {
        let emptyMessage = '';
        let emptyIcon = '';

        switch (type) {
            case 'questions':
                emptyIcon = 'fas fa-question-circle';
                emptyMessage = 'No questions asked yet';
                break;
            case 'answers':
                emptyIcon = 'fas fa-comments';
                emptyMessage = 'No answers given yet';
                break;
            case 'activity':
                emptyIcon = 'fas fa-clock';
                emptyMessage = 'No recent activity';
                break;
        }

        container.innerHTML = `
            <div class="empty-state">
                <i class="${emptyIcon}"></i>
                <h3>${emptyMessage}</h3>
                <p>Start participating in the community to see content here!</p>
            </div>
        `;
    }

    setupReputationLevels() {
        // Define reputation levels
        this.reputationLevels = [
            { name: 'Beginner', min: 0, max: 99, color: '#95a5a6' },
            { name: 'Helper', min: 100, max: 499, color: '#3498db' },
            { name: 'Contributor', min: 500, max: 999, color: '#e67e22' },
            { name: 'Expert', min: 1000, max: 2499, color: '#9b59b6' },
            { name: 'Master', min: 2500, max: 4999, color: '#e74c3c' },
            { name: 'Legend', min: 5000, max: Infinity, color: '#f1c40f' }
        ];
    }

    updateReputationDisplay(reputation) {
        const currentLevel = this.getCurrentLevel(reputation);
        const nextLevel = this.getNextLevel(reputation);
        
        // Update level badge
        const levelBadge = document.getElementById('currentLevel');
        const levelPoints = document.getElementById('currentPoints');
        
        if (levelBadge) {
            levelBadge.textContent = currentLevel.name;
            levelBadge.style.background = currentLevel.color;
        }
        
        if (levelPoints) {
            levelPoints.textContent = `${reputation} points`;
        }

        // Update next level text
        const nextLevelText = document.getElementById('nextLevelText');
        if (nextLevelText && nextLevel) {
            nextLevelText.textContent = `Next: ${nextLevel.name} (${nextLevel.min} points)`;
        } else if (nextLevelText) {
            nextLevelText.textContent = 'Maximum level reached!';
        }

        // Update progress bar
        this.updateProgressBar(reputation, currentLevel, nextLevel);
    }

    getCurrentLevel(reputation) {
        return this.reputationLevels.find(level => 
            reputation >= level.min && reputation <= level.max
        ) || this.reputationLevels[0];
    }

    getNextLevel(reputation) {
        const currentLevelIndex = this.reputationLevels.findIndex(level => 
            reputation >= level.min && reputation <= level.max
        );
        return this.reputationLevels[currentLevelIndex + 1] || null;
    }

    updateProgressBar(reputation, currentLevel, nextLevel) {
        const progressFill = document.getElementById('reputationProgress');
        const progressText = document.getElementById('progressText');

        if (!nextLevel) {
            // Max level reached
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = 'Maximum level reached!';
            return;
        }

        const progressInLevel = reputation - currentLevel.min;
        const levelRange = nextLevel.min - currentLevel.min;
        const progressPercentage = (progressInLevel / levelRange) * 100;

        if (progressFill) {
            progressFill.style.width = `${Math.min(progressPercentage, 100)}%`;
        }

        if (progressText) {
            const pointsNeeded = nextLevel.min - reputation;
            progressText.textContent = `${progressInLevel} / ${levelRange} points to next level (${pointsNeeded} more needed)`;
        }
    }

    async loadBasicUserInfo() {
        const userId = this.getCurrentUserId();
        
        if (!userId) {
            this.showDefaultUserInfo();
            return;
        }

        try {
            // Load user profile data from API
            await this.loadUserProfile(userId);
            await this.loadUserStatistics(userId);
        } catch (error) {
            console.error('Error loading user info:', error);
            this.showDefaultUserInfo();
        }
    }

    showDefaultUserInfo() {
        // Load basic user information from localStorage as fallback
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (userData) {
            // Update profile name and email
            const profileName = document.getElementById('profileName');
            const profileEmailDisplay = document.getElementById('profileEmailDisplay');
            
            if (profileName) {
                profileName.textContent = userData.name || userData.email || 'Farmer';
            }
            
            if (profileEmailDisplay) {
                profileEmailDisplay.textContent = userData.email || '';
            }

            // Set default join date
            const joinDate = document.getElementById('joinDate');
            if (joinDate) {
                joinDate.textContent = 'Member since January 2024';
            }
        }

        // Initialize with default values
        this.updateStatistics({
            reputation: 0,
            questionsAsked: 0,
            answersGiven: 0,
            solutionsProvided: 0
        });
    }

    updateStatistics(stats) {
        // Update stat cards
        const elements = {
            userReputation: stats.reputation,
            questionsAsked: stats.questionsAsked,
            answersGiven: stats.answersGiven,
            solutionsProvided: stats.solutionsProvided
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Update tab counts
        const questionsCount = document.getElementById('questionsCount');
        const answersCount = document.getElementById('answersCount');
        
        if (questionsCount) questionsCount.textContent = stats.questionsAsked;
        if (answersCount) answersCount.textContent = stats.answersGiven;

        // Update reputation display
        this.updateReputationDisplay(stats.reputation);
    }

    updatePagination() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pageInfo = document.getElementById('pageInfo');

        if (prevBtn) {
            prevBtn.disabled = this.currentPage <= 1;
        }

        // Note: nextBtn state will be properly managed when we have real data in task 10.2
        if (nextBtn) {
            nextBtn.disabled = true; // Disabled for now since we don't have real data
        }

        if (pageInfo) {
            pageInfo.textContent = `Page ${this.currentPage} of 1`;
        }
    }

    showEditProfileModal() {
        // Placeholder for edit profile functionality
        alert('Edit profile functionality will be implemented in a future update.');
    }

    // Utility method to format dates
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Utility method to format relative time
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return this.formatDate(dateString);
    }

    // API Methods
    getCurrentUserId() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        
        if (userId) {
            return userId;
        }

        // Fallback to current user
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData?._id || null;
    }

    async makeApiCall(endpoint, options = {}) {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.token;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        const response = await fetch(endpoint, { ...defaultOptions, ...options });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    async loadUserProfile(userId) {
        try {
            const response = await this.makeApiCall(`/api/community/users/${userId}`);
            
            if (response.success && response.user) {
                const user = response.user;
                
                // Update profile information
                const profileName = document.getElementById('profileName');
                const profileEmailDisplay = document.getElementById('profileEmailDisplay');
                const joinDate = document.getElementById('joinDate');
                
                if (profileName) {
                    profileName.textContent = user.name || user.email || 'Farmer';
                }
                
                if (profileEmailDisplay) {
                    profileEmailDisplay.textContent = user.email || '';
                }

                if (joinDate && user.joinedAt) {
                    joinDate.textContent = `Member since ${this.formatDate(user.joinedAt)}`;
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            throw error;
        }
    }

    async loadUserStatistics(userId) {
        try {
            const response = await this.makeApiCall(`/api/community/users/${userId}/statistics`);
            
            if (response.success && response.statistics) {
                this.updateStatistics(response.statistics);
            }
        } catch (error) {
            console.error('Error loading user statistics:', error);
            // Don't throw error here, just use default values
            this.updateStatistics({
                reputation: 0,
                questionsAsked: 0,
                answersGiven: 0,
                solutionsProvided: 0
            });
        }
    }

    async loadUserQuestions(container, userId) {
        try {
            const sortSelect = document.getElementById('questionsSortSelect');
            const sortValue = sortSelect?.value || 'recent';
            
            const response = await this.makeApiCall(
                `/api/community/users/${userId}/questions?page=${this.currentPage}&limit=${this.itemsPerPage}&sort=${sortValue}`
            );
            
            if (response.success && response.questions) {
                this.renderQuestions(container, response.questions);
                this.updatePaginationForQuestions(response.pagination);
            } else {
                this.showEmptyState(container, 'questions');
            }
        } catch (error) {
            console.error('Error loading user questions:', error);
            this.showErrorState(container, 'Failed to load questions');
        }
    }

    async loadUserAnswers(container, userId) {
        try {
            const sortSelect = document.getElementById('answersSortSelect');
            const sortValue = sortSelect?.value || 'recent';
            
            const response = await this.makeApiCall(
                `/api/community/users/${userId}/answers?page=${this.currentPage}&limit=${this.itemsPerPage}&sort=${sortValue}`
            );
            
            if (response.success && response.answers) {
                this.renderAnswers(container, response.answers);
                this.updatePaginationForAnswers(response.pagination);
            } else {
                this.showEmptyState(container, 'answers');
            }
        } catch (error) {
            console.error('Error loading user answers:', error);
            this.showErrorState(container, 'Failed to load answers');
        }
    }

    async loadUserActivity(container, userId) {
        try {
            // Load recent activity (combination of questions and answers)
            const [questionsResponse, answersResponse] = await Promise.all([
                this.makeApiCall(`/api/community/users/${userId}/questions?page=1&limit=5&sort=recent`),
                this.makeApiCall(`/api/community/users/${userId}/answers?page=1&limit=5&sort=recent`)
            ]);

            const activities = [];

            // Add questions to activity
            if (questionsResponse.success && questionsResponse.questions) {
                questionsResponse.questions.forEach(question => {
                    activities.push({
                        type: 'question',
                        data: question,
                        timestamp: question.createdAt
                    });
                });
            }

            // Add answers to activity
            if (answersResponse.success && answersResponse.answers) {
                answersResponse.answers.forEach(answer => {
                    activities.push({
                        type: 'answer',
                        data: answer,
                        timestamp: answer.createdAt
                    });
                });
            }

            // Sort by timestamp (most recent first)
            activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            if (activities.length > 0) {
                this.renderActivity(container, activities.slice(0, 10)); // Show latest 10 activities
            } else {
                this.showEmptyState(container, 'activity');
            }
        } catch (error) {
            console.error('Error loading user activity:', error);
            this.showErrorState(container, 'Failed to load activity');
        }
    }

    renderQuestions(container, questions) {
        if (!questions || questions.length === 0) {
            this.showEmptyState(container, 'questions');
            return;
        }

        const questionsHtml = questions.map(question => `
            <div class="question-item">
                <div class="item-header">
                    <a href="question-detail.html?id=${question._id}" class="item-title">
                        ${this.escapeHtml(question.title)}
                    </a>
                    <div class="item-stats">
                        <span class="stat-item">
                            <i class="fas fa-comments"></i>
                            ${question.answerCount || 0}
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-eye"></i>
                            ${question.viewCount || 0}
                        </span>
                        ${question.isSolved ? '<span class="solved-badge">Solved</span>' : ''}
                    </div>
                </div>
                <div class="item-meta">
                    <span class="category-tag">${this.escapeHtml(question.category || 'General')}</span>
                    <span class="timestamp">${this.formatRelativeTime(question.createdAt)}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = questionsHtml;
    }

    renderAnswers(container, answers) {
        if (!answers || answers.length === 0) {
            this.showEmptyState(container, 'answers');
            return;
        }

        const answersHtml = answers.map(answer => `
            <div class="answer-item">
                <div class="item-header">
                    <a href="question-detail.html?id=${answer.questionId}" class="item-title">
                        Re: ${this.escapeHtml(answer.questionTitle || 'Question')}
                    </a>
                    <div class="item-stats">
                        <span class="stat-item">
                            <i class="fas fa-thumbs-up"></i>
                            ${answer.voteScore || 0}
                        </span>
                        ${answer.isSolution ? '<span class="solution-badge">Solution</span>' : ''}
                    </div>
                </div>
                <div class="answer-preview">
                    ${this.truncateText(this.escapeHtml(answer.content), 150)}
                </div>
                <div class="item-meta">
                    <span class="timestamp">${this.formatRelativeTime(answer.createdAt)}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = answersHtml;
    }

    renderActivity(container, activities) {
        if (!activities || activities.length === 0) {
            this.showEmptyState(container, 'activity');
            return;
        }

        const activityHtml = activities.map(activity => {
            const { type, data, timestamp } = activity;
            let icon, action, details;

            switch (type) {
                case 'question':
                    icon = 'question';
                    action = 'Asked a question';
                    details = `"${this.escapeHtml(data.title)}"`;
                    break;
                case 'answer':
                    icon = 'answer';
                    action = 'Posted an answer';
                    details = `to "${this.escapeHtml(data.questionTitle || 'a question')}"`;
                    break;
                default:
                    icon = 'question';
                    action = 'Activity';
                    details = '';
            }

            return `
                <div class="timeline-item">
                    <div class="timeline-icon ${icon}">
                        <i class="fas fa-${type === 'question' ? 'question-circle' : 'comments'}"></i>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-action">${action}</div>
                        <div class="timeline-details">${details}</div>
                        <div class="timeline-time">${this.formatRelativeTime(timestamp)}</div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = activityHtml;
    }

    showErrorState(container, message) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">Try Again</button>
            </div>
        `;
    }

    updatePaginationForQuestions(pagination) {
        this.updatePaginationState(pagination);
    }

    updatePaginationForAnswers(pagination) {
        this.updatePaginationState(pagination);
    }

    updatePaginationState(pagination) {
        const paginationContainer = document.getElementById('paginationContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pageInfo = document.getElementById('pageInfo');

        if (pagination && pagination.totalPages > 1) {
            paginationContainer.style.display = 'flex';
            
            if (prevBtn) {
                prevBtn.disabled = pagination.currentPage <= 1;
            }
            
            if (nextBtn) {
                nextBtn.disabled = pagination.currentPage >= pagination.totalPages;
            }
            
            if (pageInfo) {
                pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
            }
        } else {
            paginationContainer.style.display = 'none';
        }
    }

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Initialize profile interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.profileInterface = new ProfileInterface();
});