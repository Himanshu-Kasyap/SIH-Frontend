// Question Detail Page JavaScript

class QuestionDetailManager {
    constructor() {
        this.currentQuestionId = null;
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.answers = [];
        this.currentSort = 'votes';
        
        this.init();
    }

    init() {
        this.getQuestionIdFromURL();
        this.setupEventListeners();
        this.loadQuestionAndAnswers();
    }

    getQuestionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentQuestionId = urlParams.get('id');
        
        if (!this.currentQuestionId) {
            this.showError('Question ID not found in URL');
            setTimeout(() => {
                window.location.href = 'community.html';
            }, 2000);
        }
    }

    setupEventListeners() {
        // Answer form submission
        const answerForm = document.getElementById('answerForm');
        if (answerForm) {
            answerForm.addEventListener('submit', (e) => this.handleAnswerSubmission(e));
        }

        // Answer content character count
        const answerContent = document.getElementById('answerContent');
        if (answerContent) {
            answerContent.addEventListener('input', () => this.updateCharCount());
        }

        // Image upload for answers
        const answerImages = document.getElementById('answerImages');
        if (answerImages) {
            answerImages.addEventListener('change', (e) => this.handleAnswerImageUpload(e));
        }

        // Drag and drop for answer images
        const uploadArea = document.getElementById('answerUploadArea');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        }

        // Sort answers
        const answerSort = document.getElementById('answerSort');
        if (answerSort) {
            answerSort.addEventListener('change', (e) => this.handleSortChange(e));
        }

        // Cancel answer button
        const cancelBtn = document.getElementById('cancelAnswerBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.clearAnswerForm());
        }

        // Success modal close
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        if (closeSuccessModal) {
            closeSuccessModal.addEventListener('click', () => this.closeSuccessModal());
        }
    }

    async loadQuestionAndAnswers() {
        try {
            await Promise.all([
                this.loadQuestion(),
                this.loadAnswers()
            ]);
        } catch (error) {
            console.error('Error loading question and answers:', error);
            this.showError('Failed to load question details');
        }
    }

    async loadQuestion() {
        const loadingSpinner = document.getElementById('questionLoading');
        const questionContainer = document.getElementById('questionContainer');

        try {
            loadingSpinner.style.display = 'flex';

            const response = await fetch(`/api/community/questions/${this.currentQuestionId}`, {
                headers: {
                    'Authorization': `Bearer ${this.currentUser?.token || ''}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.renderQuestion(data.question);
                this.updatePageTitle(data.question.title);
            } else {
                throw new Error(data.error?.message || 'Failed to load question');
            }

        } catch (error) {
            console.error('Error loading question:', error);
            this.showError('Failed to load question details');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }

    renderQuestion(question) {
        const questionContainer = document.getElementById('questionContainer');
        
        const questionHTML = `
            <div class="question-header">
                <h1 class="question-title">${this.escapeHtml(question.title)}</h1>
                <div class="question-status">
                    ${question.isSolved ? '<div class="solved-badge large"><i class="fas fa-check-circle"></i> Solved</div>' : ''}
                    <div class="category-tag">${this.getCategoryDisplay(question.category)}</div>
                </div>
            </div>
            
            <div class="question-meta">
                <div class="question-author">
                    <div class="author-avatar">
                        ${question.author.name ? question.author.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div class="author-info">
                        <a href="profile.html?id=${question.author._id}" class="author-name">
                            ${this.escapeHtml(question.author.name || 'Anonymous')}
                        </a>
                        <div class="author-reputation">
                            <i class="fas fa-star"></i>
                            ${question.author.reputation || 0} reputation
                        </div>
                    </div>
                </div>
                <div class="question-stats">
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>${this.formatDate(question.createdAt)}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-eye"></i>
                        <span>${question.viewCount || 0} views</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-comments"></i>
                        <span>${question.answerCount || 0} answers</span>
                    </div>
                </div>
            </div>
            
            <div class="question-content">
                ${this.formatContent(question.description)}
            </div>
            
            ${question.images && question.images.length > 0 ? this.renderQuestionImages(question.images) : ''}
        `;
        
        questionContainer.innerHTML = questionHTML;
        
        // Store question data for answer operations
        this.currentQuestion = question;
        
        // Show/hide answer form based on login status
        this.toggleAnswerForm();
    }

    renderQuestionImages(images) {
        return `
            <div class="question-images">
                ${images.map(image => `
                    <img src="${image}" alt="Question image" class="question-image" onclick="this.openImageModal('${image}')">
                `).join('')}
            </div>
        `;
    }

    async loadAnswers() {
        const loadingSpinner = document.getElementById('answersLoading');
        const answersList = document.getElementById('answersList');

        try {
            loadingSpinner.style.display = 'flex';

            const response = await fetch(`/api/community/questions/${this.currentQuestionId}/answers?sort=${this.currentSort}`, {
                headers: {
                    'Authorization': `Bearer ${this.currentUser?.token || ''}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.answers = data.answers;
                this.renderAnswers();
                this.updateAnswerCount();
            } else {
                throw new Error(data.error?.message || 'Failed to load answers');
            }

        } catch (error) {
            console.error('Error loading answers:', error);
            this.showError('Failed to load answers');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }

    renderAnswers() {
        const answersList = document.getElementById('answersList');
        
        if (this.answers.length === 0) {
            answersList.innerHTML = `
                <div class="empty-answers">
                    <i class="fas fa-comments"></i>
                    <h3>No answers yet</h3>
                    <p>Be the first to help this farmer by posting an answer!</p>
                </div>
            `;
            return;
        }

        const answersHTML = this.answers.map(answer => this.renderAnswerCard(answer)).join('');
        answersList.innerHTML = answersHTML;
        
        // Setup answer event listeners
        this.setupAnswerEventListeners();
    }

    renderAnswerCard(answer) {
        const isAuthor = this.currentUser && this.currentUser.id === answer.author._id;
        const isQuestionAuthor = this.currentUser && this.currentQuestion && this.currentUser.id === this.currentQuestion.author._id;
        const canMarkSolution = isQuestionAuthor && !this.currentQuestion.isSolved;
        const userVote = answer.userVote || null; // Assuming this comes from backend

        return `
            <div class="answer-card ${answer.isSolution ? 'solution' : ''}" data-answer-id="${answer._id}">
                ${answer.isSolution ? '<div class="solution-badge"><i class="fas fa-check-circle"></i> Accepted Solution</div>' : ''}
                
                <div class="answer-header">
                    <div class="answer-author">
                        <div class="author-avatar">
                            ${answer.author.name ? answer.author.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div class="author-info">
                            <a href="profile.html?id=${answer.author._id}" class="author-name">
                                ${this.escapeHtml(answer.author.name || 'Anonymous')}
                            </a>
                            <div class="author-reputation">
                                <i class="fas fa-star"></i>
                                ${answer.author.reputation || 0} reputation
                            </div>
                        </div>
                    </div>
                    
                    <div class="answer-actions">
                        <div class="vote-controls">
                            <button class="vote-btn upvote ${userVote === 'up' ? 'active' : ''}" 
                                    data-answer-id="${answer._id}" 
                                    data-vote-type="up"
                                    ${!this.currentUser ? 'disabled' : ''}>
                                <i class="fas fa-chevron-up"></i>
                            </button>
                            <span class="vote-count ${answer.voteScore > 0 ? 'positive' : answer.voteScore < 0 ? 'negative' : ''}">
                                ${answer.voteScore || 0}
                            </span>
                            <button class="vote-btn downvote ${userVote === 'down' ? 'active' : ''}" 
                                    data-answer-id="${answer._id}" 
                                    data-vote-type="down"
                                    ${!this.currentUser ? 'disabled' : ''}>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        
                        ${canMarkSolution && !answer.isSolution ? `
                            <button class="mark-solution-btn" data-answer-id="${answer._id}">
                                <i class="fas fa-check"></i>
                                Mark as Solution
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <div class="answer-content">
                    ${this.formatContent(answer.content)}
                </div>
                
                ${answer.images && answer.images.length > 0 ? this.renderAnswerImages(answer.images) : ''}
                
                <div class="answer-meta">
                    <div class="answer-date">
                        <i class="fas fa-clock"></i>
                        <span>Answered ${this.formatDate(answer.createdAt)}</span>
                    </div>
                    ${answer.updatedAt !== answer.createdAt ? `
                        <div class="answer-date">
                            <i class="fas fa-edit"></i>
                            <span>Updated ${this.formatDate(answer.updatedAt)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderAnswerImages(images) {
        return `
            <div class="answer-images">
                ${images.map(image => `
                    <img src="${image}" alt="Answer image" class="answer-image" onclick="this.openImageModal('${image}')">
                `).join('')}
            </div>
        `;
    }

    setupAnswerEventListeners() {
        // Vote buttons
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleVote(e));
        });

        // Mark solution buttons
        document.querySelectorAll('.mark-solution-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleMarkSolution(e));
        });
    }

    async handleVote(e) {
        e.preventDefault();
        
        if (!this.currentUser) {
            this.showError('Please log in to vote');
            return;
        }

        const button = e.currentTarget;
        const answerId = button.dataset.answerId;
        const voteType = button.dataset.voteType;
        const isActive = button.classList.contains('active');

        try {
            button.disabled = true;

            let response;
            if (isActive) {
                // Remove vote
                response = await fetch(`/api/community/answers/${answerId}/vote`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${this.currentUser.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                // Add vote
                response = await fetch(`/api/community/answers/${answerId}/vote`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.currentUser.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ voteType })
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                // Update the vote display
                this.updateVoteDisplay(answerId, data.voteScore, data.userVote);
            } else {
                throw new Error(data.error?.message || 'Failed to vote');
            }

        } catch (error) {
            console.error('Error voting:', error);
            this.showError('Failed to vote. Please try again.');
        } finally {
            button.disabled = false;
        }
    }

    updateVoteDisplay(answerId, voteScore, userVote) {
        const answerCard = document.querySelector(`[data-answer-id="${answerId}"]`);
        if (!answerCard) return;

        const voteCount = answerCard.querySelector('.vote-count');
        const upvoteBtn = answerCard.querySelector('.vote-btn.upvote');
        const downvoteBtn = answerCard.querySelector('.vote-btn.downvote');

        // Update vote count
        voteCount.textContent = voteScore || 0;
        voteCount.className = `vote-count ${voteScore > 0 ? 'positive' : voteScore < 0 ? 'negative' : ''}`;

        // Update button states
        upvoteBtn.classList.toggle('active', userVote === 'up');
        downvoteBtn.classList.toggle('active', userVote === 'down');

        // Update answer data
        const answerIndex = this.answers.findIndex(a => a._id === answerId);
        if (answerIndex !== -1) {
            this.answers[answerIndex].voteScore = voteScore;
            this.answers[answerIndex].userVote = userVote;
        }
    }

    async handleMarkSolution(e) {
        e.preventDefault();
        
        const button = e.currentTarget;
        const answerId = button.dataset.answerId;

        if (!confirm('Are you sure you want to mark this as the accepted solution?')) {
            return;
        }

        try {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Marking...';

            const response = await fetch(`/api/community/answers/${answerId}/solution`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.currentUser.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                // Reload answers to show updated solution status
                await this.loadAnswers();
                
                // Update question status
                this.currentQuestion.isSolved = true;
                this.currentQuestion.solvedAnswerId = answerId;
                
                // Update question display
                this.updateQuestionSolvedStatus();
                
                this.showSuccess('Answer marked as solution successfully!');
            } else {
                throw new Error(data.error?.message || 'Failed to mark solution');
            }

        } catch (error) {
            console.error('Error marking solution:', error);
            this.showError('Failed to mark solution. Please try again.');
            button.innerHTML = '<i class="fas fa-check"></i> Mark as Solution';
        } finally {
            button.disabled = false;
        }
    }

    updateQuestionSolvedStatus() {
        const questionContainer = document.getElementById('questionContainer');
        const statusDiv = questionContainer.querySelector('.question-status');
        
        if (statusDiv && !statusDiv.querySelector('.solved-badge')) {
            const solvedBadge = document.createElement('div');
            solvedBadge.className = 'solved-badge large';
            solvedBadge.innerHTML = '<i class="fas fa-check-circle"></i> Solved';
            statusDiv.insertBefore(solvedBadge, statusDiv.firstChild);
        }
    }

    async handleAnswerSubmission(e) {
        e.preventDefault();
        
        if (!this.currentUser) {
            this.showError('Please log in to post an answer');
            return;
        }

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = document.getElementById('submitAnswerBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');

        // Validate form
        if (!this.validateAnswerForm()) {
            return;
        }

        try {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-block';

            const response = await fetch(`/api/community/questions/${this.currentQuestionId}/answers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.currentUser.token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.showSuccessModal();
                this.clearAnswerForm();
                
                // Reload answers to show the new answer
                await this.loadAnswers();
                
                // Update question answer count
                if (this.currentQuestion) {
                    this.currentQuestion.answerCount = (this.currentQuestion.answerCount || 0) + 1;
                    this.updateAnswerCount();
                }
            } else {
                throw new Error(data.error?.message || 'Failed to post answer');
            }

        } catch (error) {
            console.error('Error posting answer:', error);
            this.showError('Failed to post answer. Please try again.');
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
        }
    }

    validateAnswerForm() {
        const content = document.getElementById('answerContent').value.trim();
        const contentError = document.getElementById('answerError');

        // Clear previous errors
        contentError.classList.remove('show');

        if (!content) {
            contentError.textContent = 'Answer content is required';
            contentError.classList.add('show');
            return false;
        }

        if (content.length < 10) {
            contentError.textContent = 'Answer must be at least 10 characters long';
            contentError.classList.add('show');
            return false;
        }

        if (content.length > 3000) {
            contentError.textContent = 'Answer must be less than 3000 characters';
            contentError.classList.add('show');
            return false;
        }

        return true;
    }

    handleAnswerImageUpload(e) {
        const files = Array.from(e.target.files);
        this.processAnswerImages(files);
    }

    processAnswerImages(files) {
        const previewContainer = document.getElementById('answerImagePreview');
        const maxFiles = 2;
        const maxSize = 5 * 1024 * 1024; // 5MB

        // Clear previous previews
        previewContainer.innerHTML = '';

        if (files.length > maxFiles) {
            this.showError(`You can only upload up to ${maxFiles} images`);
            return;
        }

        files.forEach((file, index) => {
            if (file.size > maxSize) {
                this.showError(`Image ${file.name} is too large. Maximum size is 5MB`);
                return;
            }

            if (!file.type.startsWith('image/')) {
                this.showError(`${file.name} is not a valid image file`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-image" onclick="this.removeAnswerImage(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                previewContainer.appendChild(previewDiv);
            };
            reader.readAsDataURL(file);
        });
    }

    removeAnswerImage(index) {
        const fileInput = document.getElementById('answerImages');
        const previewContainer = document.getElementById('answerImagePreview');
        
        // Remove preview
        const previews = previewContainer.querySelectorAll('.image-preview');
        if (previews[index]) {
            previews[index].remove();
        }

        // Create new file list without the removed file
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        files.forEach((file, i) => {
            if (i !== index) {
                dt.items.add(file);
            }
        });
        fileInput.files = dt.files;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        const fileInput = document.getElementById('answerImages');
        
        // Update file input
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
        
        // Process images
        this.processAnswerImages(files);
    }

    handleSortChange(e) {
        this.currentSort = e.target.value;
        this.loadAnswers();
    }

    updateCharCount() {
        const textarea = document.getElementById('answerContent');
        const charCount = document.getElementById('answerCharCount');
        const currentLength = textarea.value.length;
        const maxLength = 3000;
        
        charCount.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength * 0.9) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '';
        }
    }

    updateAnswerCount() {
        const answerCountSpan = document.getElementById('answerCount');
        if (answerCountSpan && this.currentQuestion) {
            answerCountSpan.textContent = this.currentQuestion.answerCount || 0;
        }
    }

    clearAnswerForm() {
        const form = document.getElementById('answerForm');
        if (form) {
            form.reset();
            document.getElementById('answerImagePreview').innerHTML = '';
            this.updateCharCount();
        }
    }

    toggleAnswerForm() {
        const answerFormSection = document.getElementById('answerFormSection');
        // Login prompt removed - answer form is always available
        answerFormSection.style.display = 'block';
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    closeSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    updatePageTitle(questionTitle) {
        document.title = `${questionTitle} - Kisan Sahayak`;
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatContent(content) {
        // Convert line breaks to paragraphs
        return content.split('\n\n').map(paragraph => 
            `<p>${this.escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
        ).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }

    getCategoryDisplay(category) {
        const categories = {
            'crop-diseases': '🦠 Crop Diseases',
            'soil-management': '🌱 Soil Management',
            'weather-issues': '🌦️ Weather Issues',
            'pest-control': '🛡️ Pest Control',
            'harvesting': '🌾 Harvesting',
            'seeds-planting': '🌰 Seeds & Planting',
            'general': '📋 General'
        };
        return categories[category] || '📋 General';
    }

    openImageModal(imageSrc) {
        // Create and show image modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 90%; max-height: 90%;">
                <img src="${imageSrc}" alt="Full size image" style="width: 100%; height: auto; border-radius: 8px;">
                <div class="modal-actions" style="margin-top: 1rem;">
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-weight: 600;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showSuccess(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-weight: 600;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize the question detail manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.questionDetailManager = new QuestionDetailManager();
});

// Make functions available globally for onclick handlers
window.removeAnswerImage = function(index) {
    if (window.questionDetailManager) {
        window.questionDetailManager.removeAnswerImage(index);
    }
};

window.openImageModal = function(imageSrc) {
    if (window.questionDetailManager) {
        window.questionDetailManager.openImageModal(imageSrc);
    }
};