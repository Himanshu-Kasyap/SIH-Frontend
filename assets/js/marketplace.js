// Marketplace JavaScript - Mobile-First Responsive Design

class FarmersMarketplace {
    constructor() {
        this.currentCategory = 'crops';
        this.products = this.loadSampleData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderProducts();
        this.updateCategoryInfo();
    }

    bindEvents() {
        // Navigation category buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.nav-btn').dataset.category;
                this.switchCategory(category);
            });
        });

        // Add product button
        document.getElementById('addBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal overlay click to close
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        // Form submission
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Image upload handling
        document.getElementById('images').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Upload area click
        document.querySelector('.upload-area').addEventListener('click', () => {
            document.getElementById('images').click();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Responsive navigation for mobile
        this.handleResponsiveNav();
    }

    switchCategory(category) {
        if (!category) return;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.currentCategory = category;
        this.updateCategoryInfo();
        this.renderProducts();
    }

    updateCategoryInfo() {
        const categoryInfo = {
            crops: {
                title: 'Fresh Crops',
                description: 'Discover fresh, quality crops directly from local farmers'
            },
            fertilizers: {
                title: 'Fertilizers & Nutrients',
                description: 'Find organic and chemical fertilizers for better crop yield'
            },
            seeds: {
                title: 'Quality Seeds',
                description: 'Premium seeds for various crops and vegetables'
            },
            services: {
                title: 'Agricultural Services',
                description: 'Professional farming services and labor assistance'
            },
            machinery: {
                title: 'Farm Machinery',
                description: 'Rent or buy agricultural equipment and machinery'
            },
            storage: {
                title: 'Storage Solutions',
                description: 'Secure storage spaces for your agricultural products'
            }
        };

        const info = categoryInfo[this.currentCategory];
        document.getElementById('categoryTitle').textContent = info.title;
        document.getElementById('categoryDescription').textContent = info.description;
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');
        const filteredProducts = this.products.filter(product => 
            product.category === this.currentCategory
        );

        if (filteredProducts.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        grid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
        
        // Add animation
        grid.classList.add('fade-in');
        setTimeout(() => grid.classList.remove('fade-in'), 300);
    }

    createProductCard(product) {
        const actionText = ['services', 'machinery', 'storage'].includes(product.category) ? 'Book Now' : 'Buy Now';
        const actionIcon = ['services', 'machinery', 'storage'].includes(product.category) ? 'calendar-check' : 'shopping-cart';
        
        return `
            <div class="product-card slide-up">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.title}">` : 
                        `<div class="image-placeholder"><i class="fas fa-image"></i></div>`
                    }
                    <div class="product-badge">${this.getCategoryBadge(product.category)}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <span><i class="fas fa-map-marker-alt"></i>${product.location}</span>
                        <span><i class="fas fa-phone"></i>${product.contact}</span>
                    </div>
                    <div class="product-price">₹${product.price} ${product.unit}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="marketplace.handlePurchase('${product.id}')">
                            <i class="fas fa-${actionIcon}"></i>
                            ${actionText}
                        </button>
                        <button class="btn btn-secondary" onclick="marketplace.handleContact('${product.contact}')">
                            <i class="fas fa-phone"></i>
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryBadge(category) {
        const badges = {
            crops: 'Fresh',
            fertilizers: 'Organic',
            seeds: 'Premium',
            services: 'Service',
            machinery: 'Rental',
            storage: 'Storage'
        };
        return badges[category] || 'Product';
    }

    openModal() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set default category in modal
        document.getElementById('category').value = this.currentCategory;
    }

    closeModal() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        document.getElementById('productForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
    }

    handleFormSubmission() {
        const formData = new FormData(document.getElementById('productForm'));
        const productData = {
            id: Date.now().toString(),
            category: formData.get('category') || document.getElementById('category').value,
            title: formData.get('title') || document.getElementById('title').value,
            description: formData.get('description') || document.getElementById('description').value,
            price: formData.get('price') || document.getElementById('price').value,
            unit: formData.get('priceUnit') || document.getElementById('priceUnit').value,
            location: formData.get('location') || document.getElementById('location').value,
            contact: formData.get('contact') || document.getElementById('contact').value,
            image: null, // In real app, handle image upload to server
            dateAdded: new Date().toISOString()
        };

        // Validate required fields
        if (!productData.title || !productData.description || !productData.price || !productData.location || !productData.contact) {
            alert('Please fill in all required fields');
            return;
        }

        // Add to products array
        this.products.push(productData);
        
        // Save to localStorage (in real app, send to server)
        this.saveToStorage();
        
        // Close modal and refresh view
        this.closeModal();
        
        // Switch to the category of the new product
        if (productData.category !== this.currentCategory) {
            this.switchCategory(productData.category);
        } else {
            this.renderProducts();
        }
        
        // Show success message
        this.showNotification('Product listed successfully!', 'success');
    }

    handleImageUpload(event) {
        const files = Array.from(event.target.files);
        const preview = document.getElementById('imagePreview');
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    preview.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }

        const grid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');
        
        const filteredProducts = this.products.filter(product => 
            product.category === this.currentCategory &&
            (product.title.toLowerCase().includes(query.toLowerCase()) ||
             product.description.toLowerCase().includes(query.toLowerCase()) ||
             product.location.toLowerCase().includes(query.toLowerCase()))
        );

        if (filteredProducts.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try searching with different keywords</p>
            `;
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        grid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    }

    handlePurchase(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const actionText = ['services', 'machinery', 'storage'].includes(product.category) ? 'booking' : 'purchase';
            this.showNotification(`Initiating ${actionText} for ${product.title}`, 'info');
            // In real app, redirect to payment/booking page
        }
    }

    handleContact(phoneNumber) {
        if (phoneNumber) {
            window.open(`tel:${phoneNumber}`, '_self');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1100;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    handleResponsiveNav() {
        // Navigation is now handled by the dashboard navigation system
        // Category navigation remains visible on all screen sizes
        const navCategories = document.querySelector('.nav-categories');
        if (navCategories) {
            navCategories.style.display = 'flex';
        }
    }

    saveToStorage() {
        localStorage.setItem('farmMarketplaceProducts', JSON.stringify(this.products));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('farmMarketplaceProducts');
        return stored ? JSON.parse(stored) : [];
    }

    loadSampleData() {
        // Check if there's stored data first
        const storedData = this.loadFromStorage();
        if (storedData.length > 0) {
            return storedData;
        }

        // Sample data for demonstration
        return [
            {
                id: '1',
                category: 'crops',
                title: 'Fresh Organic Tomatoes',
                description: 'Premium quality organic tomatoes, freshly harvested. Perfect for cooking and salads.',
                price: '40',
                unit: 'per kg',
                location: 'Pune, Maharashtra',
                contact: '+91 9876543210',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '2',
                category: 'crops',
                title: 'Basmati Rice',
                description: 'High-quality basmati rice with excellent aroma and taste. Directly from farm.',
                price: '2500',
                unit: 'per quintal',
                location: 'Haryana',
                contact: '+91 9876543211',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '3',
                category: 'fertilizers',
                title: 'Organic Compost',
                description: 'Natural organic compost made from cow dung and kitchen waste. Rich in nutrients.',
                price: '15',
                unit: 'per kg',
                location: 'Nashik, Maharashtra',
                contact: '+91 9876543212',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '4',
                category: 'seeds',
                title: 'Hybrid Corn Seeds',
                description: 'High-yield hybrid corn seeds with disease resistance. Suitable for all seasons.',
                price: '800',
                unit: 'per kg',
                location: 'Punjab',
                contact: '+91 9876543213',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '5',
                category: 'services',
                title: 'Farm Labor Service',
                description: 'Experienced farm workers available for harvesting, planting, and general farm work.',
                price: '500',
                unit: 'per day',
                location: 'Aurangabad, Maharashtra',
                contact: '+91 9876543214',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '6',
                category: 'machinery',
                title: 'Tractor Rental',
                description: 'Well-maintained tractor available for rent. Includes operator if needed.',
                price: '1200',
                unit: 'per day',
                location: 'Solapur, Maharashtra',
                contact: '+91 9876543215',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '7',
                category: 'storage',
                title: 'Cold Storage Space',
                description: 'Temperature-controlled storage facility for fruits and vegetables. Secure and clean.',
                price: '50',
                unit: 'per day per quintal',
                location: 'Mumbai, Maharashtra',
                contact: '+91 9876543216',
                image: null,
                dateAdded: new Date().toISOString()
            }
        ];
    }
}

// Initialize the marketplace when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.marketplace = new FarmersMarketplace();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);