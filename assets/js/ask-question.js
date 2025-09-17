// Ask Question Page JavaScript
class AskQuestionManager {
    constructor() {
        this.form = document.getElementById('askQuestionForm');
        this.titleInput = document.getElementById('questionTitle');
        this.categorySelect = document.getElementById('questionCategory');
        this.descriptionEditor = null;
        this.hiddenDescription = document.getElementById('hiddenDescription');
        this.imagesInput = document.getElementById('questionImages');
        this.uploadArea = document.getElementById('uploadArea');
        this.imagePreviewContainer = document.getElementById('imagePreviewContainer');
        this.submitBtn = document.getElementById('submitBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        this.selectedImages = [];
        this.maxImages = 3;
        this.maxImageSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        this.init();
    }

    init() {
        this.initRichTextEditor();
        this.setupEventListeners();
        this.setupImageUpload();
        this.setupFormValidation();
    }

    initRichTextEditor() {
        // Initialize Quill rich text editor
        this.descriptionEditor = new Quill('#questionDescription', {
            theme: 'snow',
            placeholder: 'Describe your agricultural question in detail. Include information about your crops, location, current conditions, what you\'ve tried, and any specific symptoms or issues you\'re experiencing...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                ]
            }
        });

        // Update hidden textarea when editor content changes
        this.descriptionEditor.on('text-change', () => {
            const content = this.descriptionEditor.root.innerHTML;
            const textContent = this.descriptionEditor.getText().trim();
            this.hiddenDescription.value = content;
            this.updateCharCount('description', textContent.length, 5000);
            this.validateField('description');
        });
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Title input validation
        this.titleInput.addEventListener('input', () => {
            this.updateCharCount('title', this.titleInput.value.length, 200);
            this.validateField('title');
        });

        // Category selection validation
        this.categorySelect.addEventListener('change', () => {
            this.validateField('category');
        });

        // Prevent form submission on Enter in title field
        this.titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    setupImageUpload() {
        // File input change event
        this.imagesInput.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files);
        });

        // Drag and drop events
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFileSelection(e.dataTransfer.files);
        });

        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.imagesInput.click();
        });
    }

    setupFormValidation() {
        // Real-time validation for all fields
        const fields = ['title', 'category', 'description'];
        fields.forEach(field => {
            const element = document.getElementById(`question${field.charAt(0).toUpperCase() + field.slice(1)}`);
            if (element) {
                element.addEventListener('blur', () => this.validateField(field));
            }
        });
    }

    handleFileSelection(files) {
        const fileArray = Array.from(files);
        
        // Check if adding these files would exceed the limit
        if (this.selectedImages.length + fileArray.length > this.maxImages) {
            this.showError('images', `You can only upload up to ${this.maxImages} images`);
            return;
        }

        fileArray.forEach(file => {
            if (this.validateImage(file)) {
                this.addImagePreview(file);
            }
        });

        // Clear the file input
        this.imagesInput.value = '';
    }

    validateImage(file) {
        // Check file type
        if (!this.allowedTypes.includes(file.type)) {
            this.showError('images', 'Please upload only JPG, PNG, or GIF images');
            return false;
        }

        // Check file size
        if (file.size > this.maxImageSize) {
            this.showError('images', `Image "${file.name}" is too large. Maximum size is 5MB`);
            return false;
        }

        return true;
    }

    addImagePreview(file) {
        const imageId = Date.now() + Math.random();
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewElement = document.createElement('div');
            previewElement.className = 'image-preview';
            previewElement.dataset.imageId = imageId;

            previewElement.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-image" onclick="askQuestionManager.removeImage('${imageId}')">
                    <i class="fas fa-times"></i>
                </button>
                <div class="image-info">
                    ${this.formatFileSize(file.size)}
                </div>
            `;

            this.imagePreviewContainer.appendChild(previewElement);
        };

        reader.readAsDataURL(file);

        // Store the file with the ID
        this.selectedImages.push({
            id: imageId,
            file: file
        });

        this.clearError('images');
    }

    removeImage(imageId) {
        // Remove from selected images array
        this.selectedImages = this.selectedImages.filter(img => img.id !== imageId);

        // Remove preview element
        const previewElement = document.querySelector(`[data-image-id="${imageId}"]`);
        if (previewElement) {
            previewElement.remove();
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    updateCharCount(field, current, max) {
        const charCountElement = document.getElementById(`${field}CharCount`);
        if (charCountElement) {
            charCountElement.textContent = `${current}/${max}`;
            
            // Change color based on usage
            if (current > max * 0.9) {
                charCountElement.style.color = '#ef4444';
            } else if (current > max * 0.7) {
                charCountElement.style.color = '#f59e0b';
            } else {
                charCountElement.style.color = 'var(--accent-color)';
            }
        }
    }

    validateField(field) {
        let isValid = true;
        let errorMessage = '';

        switch (field) {
            case 'title':
                const title = this.titleInput.value.trim();
                if (!title) {
                    errorMessage = 'Question title is required';
                    isValid = false;
                } else if (title.length < 10) {
                    errorMessage = 'Title should be at least 10 characters long';
                    isValid = false;
                } else if (title.length > 200) {
                    errorMessage = 'Title cannot exceed 200 characters';
                    isValid = false;
                }
                break;

            case 'category':
                if (!this.categorySelect.value) {
                    errorMessage = 'Please select a category for your question';
                    isValid = false;
                }
                break;

            case 'description':
                const description = this.descriptionEditor.getText().trim();
                if (!description) {
                    errorMessage = 'Question description is required';
                    isValid = false;
                } else if (description.length < 20) {
                    errorMessage = 'Description should be at least 20 characters long';
                    isValid = false;
                } else if (description.length > 5000) {
                    errorMessage = 'Description cannot exceed 5000 characters';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            this.clearError(field);
        } else {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(`question${field.charAt(0).toUpperCase() + field.slice(1)}`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        if (inputElement) {
            inputElement.classList.add('error');
        }

        // Special handling for rich text editor
        if (field === 'description') {
            const editorElement = document.querySelector('.rich-editor');
            if (editorElement) {
                editorElement.classList.add('error');
            }
        }
    }

    clearError(field) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(`question${field.charAt(0).toUpperCase() + field.slice(1)}`);
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }

        if (inputElement) {
            inputElement.classList.remove('error');
        }

        // Special handling for rich text editor
        if (field === 'description') {
            const editorElement = document.querySelector('.rich-editor');
            if (editorElement) {
                editorElement.classList.remove('error');
            }
        }
    }

    validateForm() {
        const titleValid = this.validateField('title');
        const categoryValid = this.validateField('category');
        const descriptionValid = this.validateField('description');

        return titleValid && categoryValid && descriptionValid;
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('title', this.titleInput.value.trim());
            formData.append('category', this.categorySelect.value);
            formData.append('description', this.hiddenDescription.value);

            // Add images
            this.selectedImages.forEach((imageObj, index) => {
                formData.append('images', imageObj.file);
            });

            // Get user data (authentication check removed)
            const userData = JSON.parse(localStorage.getItem('user')) || { email: 'anonymous@example.com', name: 'Anonymous User' };

            // Submit the question
            const response = await fetch('/api/community/questions', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${userData.token || ''}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || 'Failed to post question');
            }

            // Success - redirect to question detail page
            this.showNotification('Question posted successfully!', 'success');
            
            setTimeout(() => {
                window.location.href = `question-detail.html?id=${result.data.questionId}`;
            }, 1500);

        } catch (error) {
            console.error('Error posting question:', error);
            this.showNotification(error.message || 'Failed to post question. Please try again.', 'error');
            this.setLoadingState(false);
        }
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.loadingOverlay.style.display = 'flex';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.loadingOverlay.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1rem 1.5rem;
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    backdrop-filter: blur(10px);
                    animation: slideIn 0.3s ease-out;
                }
                
                .notification-success {
                    border-left: 4px solid var(--success-color);
                }
                
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification-info {
                    border-left: 4px solid var(--accent-color);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                }
                
                .notification-content i {
                    font-size: 1.2rem;
                }
                
                .notification-success .notification-content i {
                    color: var(--success-color);
                }
                
                .notification-error .notification-content i {
                    color: #ef4444;
                }
                
                .notification-info .notification-content i {
                    color: var(--accent-color);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    opacity: 0.7;
                    transition: var(--transition);
                }
                
                .notification-close:hover {
                    opacity: 1;
                    background: rgba(0, 0, 0, 0.1);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize the ask question manager when the page loads
let askQuestionManager;

document.addEventListener('DOMContentLoaded', () => {
    askQuestionManager = new AskQuestionManager();
});

// Export for global access
window.askQuestionManager = askQuestionManager;