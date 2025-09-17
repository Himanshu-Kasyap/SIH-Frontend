// Reporting functionality for community features
class ReportingSystem {
    constructor() {
        this.csrfToken = null;
        this.init();
    }

    async init() {
        await this.getCSRFToken();
        this.setupEventListeners();
    }

    async getCSRFToken() {
        try {
            const response = await fetch('/api/csrf-token');
            const data = await response.json();
            this.csrfToken = data.csrfToken;
        } catch (error) {
            console.error('Failed to get CSRF token:', error);
        }
    }

    setupEventListeners() {
        // Add report buttons to existing content
        this.addReportButtons();
        
        // Handle report form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'reportForm') {
                e.preventDefault();
                this.submitReport(e.target);
            }
        });

        // Handle modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
                this.closeReportModal();
            }
        });
    }

    addReportButtons() {
        // Add report buttons to questions
        document.querySelectorAll('.question-item, .question-detail').forEach(element => {
            if (!element.querySelector('.report-btn')) {
                const questionId = element.dataset.questionId;
                if (questionId) {
                    const reportBtn = this.createReportButton('question', questionId);
                    const actionsContainer = element.querySelector('.question-actions') || element;
                    actionsContainer.appendChild(reportBtn);
                }
            }
        });

        // Add report buttons to answers
        document.querySelectorAll('.answer-item').forEach(element => {
            if (!element.querySelector('.report-btn')) {
                const answerId = element.dataset.answerId;
                if (answerId) {
                    const reportBtn = this.createReportButton('answer', answerId);
                    const actionsContainer = element.querySelector('.answer-actions') || element;
                    actionsContainer.appendChild(reportBtn);
                }
            }
        });
    }

    createReportButton(type, id) {
        const button = document.createElement('button');
        button.className = 'report-btn';
        button.innerHTML = '<i class="fas fa-flag"></i> Report';
        button.onclick = () => this.openReportModal(type, id);
        return button;
    }

    openReportModal(targetType, targetId) {
        const modal = this.createReportModal(targetType, targetId);
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    createReportModal(targetType, targetId) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content report-modal">
                <div class="modal-header">
                    <h3>Report ${targetType}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <form id="reportForm">
                    <input type="hidden" name="targetType" value="${targetType}">
                    <input type="hidden" name="targetId" value="${targetId}">
                    <input type="hidden" name="reporterId" value="${this.getCurrentUserId()}">
                    <input type="hidden" name="_csrf" value="${this.csrfToken}">
                    
                    <div class="form-group">
                        <label for="reportType">Report Type:</label>
                        <select name="reportType" id="reportType" required>
                            <option value="">Select a reason</option>
                            <option value="spam">Spam</option>
                            <option value="inappropriate">Inappropriate Content</option>
                            <option value="harassment">Harassment</option>
                            <option value="misinformation">Misinformation</option>
                            <option value="copyright">Copyright Violation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="reason">Reason (required):</label>
                        <textarea name="reason" id="reason" rows="4" 
                                placeholder="Please explain why you are reporting this content..." 
                                required minlength="10" maxlength="500"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Additional Details (optional):</label>
                        <textarea name="description" id="description" rows="3" 
                                placeholder="Any additional information..." 
                                maxlength="1000"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-danger">Submit Report</button>
                        <button type="button" class="btn btn-secondary modal-close">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        return modal;
    }

    async submitReport(form) {
        const formData = new FormData(form);
        const reportData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/community/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.csrfToken
                },
                body: JSON.stringify(reportData)
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage('Report submitted successfully. Thank you for helping keep our community safe.', 'success');
                this.closeReportModal();
            } else {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            this.showMessage('Failed to submit report. Please try again.', 'error');
        }
    }

    closeReportModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    getCurrentUserId() {
        // This should be implemented based on your authentication system
        // For now, return a placeholder
        return localStorage.getItem('userId') || 'anonymous';
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the page
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Method to load user's reports
    async loadUserReports(userId) {
        try {
            const response = await fetch(`/api/community/reports/my?userId=${userId}`);
            const data = await response.json();
            
            if (data.success) {
                return data.data.reports;
            } else {
                throw new Error(data.error.message);
            }
        } catch (error) {
            console.error('Error loading user reports:', error);
            return [];
        }
    }

    // Method to display user reports in a table
    displayUserReports(reports, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (reports.length === 0) {
            container.innerHTML = '<p>No reports found.</p>';
            return;
        }

        const table = `
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Target</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${reports.map(report => `
                        <tr>
                            <td>${report.reportType}</td>
                            <td>${report.targetType}</td>
                            <td>${report.reason.substring(0, 50)}...</td>
                            <td><span class="status-badge status-${report.status}">${report.status}</span></td>
                            <td>${new Date(report.createdAt).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = table;
    }
}

// CSS styles for reporting functionality
const reportingStyles = `
    .report-btn {
        background: none;
        border: none;
        color: #dc3545;
        cursor: pointer;
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        transition: background-color 0.3s;
    }

    .report-btn:hover {
        background-color: #f8f9fa;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .report-modal {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #dee2e6;
        padding-bottom: 1rem;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #495057;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 1rem;
    }

    .form-group textarea {
        resize: vertical;
        font-family: inherit;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #dee2e6;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    }

    .btn-danger {
        background-color: #dc3545;
        color: white;
    }

    .btn-danger:hover {
        background-color: #c82333;
    }

    .btn-secondary {
        background-color: #6c757d;
        color: white;
    }

    .btn-secondary:hover {
        background-color: #5a6268;
    }

    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
        font-weight: 500;
    }

    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .reports-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    .reports-table th,
    .reports-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
    }

    .reports-table th {
        background-color: #f8f9fa;
        font-weight: 600;
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .status-pending {
        background-color: #fff3cd;
        color: #856404;
    }

    .status-reviewed {
        background-color: #d1ecf1;
        color: #0c5460;
    }

    .status-resolved {
        background-color: #d4edda;
        color: #155724;
    }

    .status-dismissed {
        background-color: #f8d7da;
        color: #721c24;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = reportingStyles;
document.head.appendChild(styleSheet);

// Initialize reporting system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.reportingSystem = new ReportingSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReportingSystem;
}