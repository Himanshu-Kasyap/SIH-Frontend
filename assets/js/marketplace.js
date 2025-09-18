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
        
        // Format additional information
        const quantityInfo = product.quantity ? `${product.quantity} ${product.quantityUnit || ''}` : '';
        const qualityBadge = product.quality ? `<span class="quality-badge">${product.quality.replace('-', ' ').toUpperCase()}</span>` : '';
        const negotiableBadge = product.negotiable ? '<span class="negotiable-badge">Negotiable</span>' : '';
        const deliveryBadge = product.homeDelivery ? '<span class="delivery-badge">Home Delivery</span>' : '';
        const sellerInfo = product.sellerName ? `<span><i class="fas fa-user"></i>${product.sellerName}</span>` : '';
        const availabilityInfo = product.availability ? `<span><i class="fas fa-clock"></i>${product.availability.replace('-', ' ')}</span>` : '';
        
        return `
            <div class="product-card slide-up">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.title}">` : 
                        `<div class="image-placeholder"><i class="fas fa-image"></i></div>`
                    }
                    <div class="product-badge">${this.getCategoryBadge(product.category)}</div>
                    ${qualityBadge}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    
                    ${quantityInfo ? `<div class="quantity-info"><i class="fas fa-box"></i>Available: ${quantityInfo}</div>` : ''}
                    
                    <div class="product-meta">
                        <span><i class="fas fa-map-marker-alt"></i>${product.location}</span>
                        ${sellerInfo}
                        ${availabilityInfo}
                    </div>
                    
                    <div class="product-price-section">
                        <div class="product-price">₹${product.price} ${product.unit}</div>
                        <div class="price-badges">
                            ${negotiableBadge}
                            ${deliveryBadge}
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="marketplace.handlePurchase('${product.id}')">
                            <i class="fas fa-${actionIcon}"></i>
                            ${actionText}
                        </button>
                        <button class="btn btn-secondary" onclick="marketplace.handleContact('${product.contact}')">
                            <i class="fas fa-phone"></i>
                            Contact
                        </button>
                        ${product.whatsapp ? `<button class="btn btn-success" onclick="marketplace.handleWhatsApp('${product.whatsapp}')">
                            <i class="fab fa-whatsapp"></i>
                            WhatsApp
                        </button>` : ''}
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
        const form = document.getElementById('productForm');
        const formData = new FormData(form);
        
        // Collect all form data including new fields
        const productData = {
            id: Date.now().toString(),
            category: document.getElementById('category').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            unit: document.getElementById('priceUnit').value,
            quantity: document.getElementById('quantity').value,
            quantityUnit: document.getElementById('quantityUnit').value,
            quality: document.getElementById('quality').value,
            availability: document.getElementById('availability').value,
            harvestDate: document.getElementById('harvestDate').value,
            expiryDate: document.getElementById('expiryDate').value,
            location: document.getElementById('location').value,
            contact: document.getElementById('contact').value,
            whatsapp: document.getElementById('whatsapp').value,
            sellerName: document.getElementById('sellerName').value,
            additionalInfo: document.getElementById('additionalInfo').value,
            negotiable: document.getElementById('negotiable').checked,
            homeDelivery: document.getElementById('homeDelivery').checked,
            image: null, // In real app, handle image upload to server
            dateAdded: new Date().toISOString()
        };

        // Validate required fields
        const requiredFields = {
            category: 'Category',
            title: 'Title',
            description: 'Description',
            price: 'Price',
            quantity: 'Quantity',
            availability: 'Availability',
            location: 'Location',
            contact: 'Contact Number',
            sellerName: 'Seller Name'
        };
        
        const missingFields = [];
        for (const [field, label] of Object.entries(requiredFields)) {
            if (!productData[field] || productData[field].trim() === '') {
                missingFields.push(label);
            }
        }
        
        if (missingFields.length > 0) {
            this.showNotification(`Please fill in the following required fields: ${missingFields.join(', ')}`, 'error');
            return;
        }
        
        // Validate contact number format
        const contactRegex = /^[+]?[0-9]{10,13}$/;
        if (!contactRegex.test(productData.contact.replace(/\s/g, ''))) {
            this.showNotification('Please enter a valid contact number (10-13 digits)', 'error');
            return;
        }
        
        // Validate WhatsApp number if provided
        if (productData.whatsapp && !contactRegex.test(productData.whatsapp.replace(/\s/g, ''))) {
            this.showNotification('Please enter a valid WhatsApp number (10-13 digits)', 'error');
            return;
        }
        
        // Validate price
        if (parseFloat(productData.price) <= 0) {
            this.showNotification('Please enter a valid price greater than 0', 'error');
            return;
        }
        
        // Validate quantity
        if (parseInt(productData.quantity) <= 0) {
            this.showNotification('Please enter a valid quantity greater than 0', 'error');
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

    handleWhatsApp(phoneNumber) {
        if (phoneNumber) {
            const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
            const message = encodeURIComponent('Hi, I am interested in your product listed on the marketplace.');
            window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
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

        // Sample data for demonstration - Comprehensive marketplace examples
        return [
            // CROPS SECTION - Fresh Produce
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
                category: 'crops',
                title: 'Fresh Onions',
                description: 'Red onions, freshly harvested. Good storage quality and excellent taste.',
                price: '25',
                unit: 'per kg',
                location: 'Nashik, Maharashtra',
                contact: '+91 9876543220',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '4',
                category: 'crops',
                title: 'Organic Potatoes',
                description: 'Chemical-free potatoes grown using organic farming methods. Perfect for all cooking needs.',
                price: '30',
                unit: 'per kg',
                location: 'Uttar Pradesh',
                contact: '+91 9876543221',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '5',
                category: 'crops',
                title: 'Fresh Wheat',
                description: 'High-quality wheat grains, perfect for flour making. Excellent protein content.',
                price: '2200',
                unit: 'per quintal',
                location: 'Punjab',
                contact: '+91 9876543222',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '6',
                category: 'crops',
                title: 'Green Chillies',
                description: 'Fresh green chillies with perfect spice level. Ideal for cooking and pickles.',
                price: '60',
                unit: 'per kg',
                location: 'Andhra Pradesh',
                contact: '+91 9876543223',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '7',
                category: 'crops',
                title: 'Fresh Cauliflower',
                description: 'White, fresh cauliflower heads. Grown without harmful pesticides.',
                price: '35',
                unit: 'per kg',
                location: 'Delhi',
                contact: '+91 9876543224',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '8',
                category: 'crops',
                title: 'Organic Carrots',
                description: 'Sweet and crunchy organic carrots. Rich in vitamins and minerals.',
                price: '45',
                unit: 'per kg',
                location: 'Himachal Pradesh',
                contact: '+91 9876543225',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '9',
                category: 'crops',
                title: 'Fresh Spinach',
                description: 'Green leafy spinach, freshly harvested. Rich in iron and nutrients.',
                price: '20',
                unit: 'per kg',
                location: 'Gujarat',
                contact: '+91 9876543226',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '10',
                category: 'crops',
                title: 'Sweet Corn',
                description: 'Fresh sweet corn cobs, perfect for boiling and grilling. Natural sweetness.',
                price: '15',
                unit: 'per piece',
                location: 'Karnataka',
                contact: '+91 9876543227',
                image: null,
                dateAdded: new Date().toISOString()
            },

            // FERTILIZERS SECTION - Organic & Chemical
            {
                id: '11',
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
                id: '12',
                category: 'fertilizers',
                title: 'NPK Fertilizer (19:19:19)',
                description: 'Balanced NPK fertilizer suitable for all crops. Promotes healthy growth.',
                price: '1200',
                unit: 'per 50kg bag',
                location: 'Gujarat',
                contact: '+91 9876543230',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '13',
                category: 'fertilizers',
                title: 'Vermicompost',
                description: 'Premium quality vermicompost made from earthworms. 100% organic and natural.',
                price: '25',
                unit: 'per kg',
                location: 'Tamil Nadu',
                contact: '+91 9876543231',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '14',
                category: 'fertilizers',
                title: 'Urea Fertilizer',
                description: 'High-quality urea fertilizer with 46% nitrogen content. Fast-acting formula.',
                price: '800',
                unit: 'per 50kg bag',
                location: 'Rajasthan',
                contact: '+91 9876543232',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '15',
                category: 'fertilizers',
                title: 'Bone Meal Fertilizer',
                description: 'Organic bone meal fertilizer rich in phosphorus. Perfect for flowering plants.',
                price: '35',
                unit: 'per kg',
                location: 'Punjab',
                contact: '+91 9876543233',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '16',
                category: 'fertilizers',
                title: 'Liquid Seaweed Fertilizer',
                description: 'Concentrated liquid fertilizer made from seaweed. Boosts plant immunity.',
                price: '450',
                unit: 'per liter',
                location: 'Kerala',
                contact: '+91 9876543234',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '17',
                category: 'fertilizers',
                title: 'Potash Fertilizer',
                description: 'Muriate of potash fertilizer for better fruit quality and disease resistance.',
                price: '950',
                unit: 'per 50kg bag',
                location: 'Haryana',
                contact: '+91 9876543235',
                image: null,
                dateAdded: new Date().toISOString()
            },

            // SEEDS SECTION - Various Crop Seeds
            {
                id: '18',
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
                id: '19',
                category: 'seeds',
                title: 'Tomato Seeds (Hybrid)',
                description: 'High-yielding hybrid tomato seeds. Disease resistant and long shelf life.',
                price: '2500',
                unit: 'per 100g',
                location: 'Maharashtra',
                contact: '+91 9876543240',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '20',
                category: 'seeds',
                title: 'Wheat Seeds (HD-2967)',
                description: 'High-quality wheat seeds with excellent yield potential. Drought resistant.',
                price: '2800',
                unit: 'per quintal',
                location: 'Uttar Pradesh',
                contact: '+91 9876543241',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '21',
                category: 'seeds',
                title: 'Onion Seeds',
                description: 'Red onion seeds with good storage quality. Suitable for kharif season.',
                price: '3500',
                unit: 'per kg',
                location: 'Karnataka',
                contact: '+91 9876543242',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '22',
                category: 'seeds',
                title: 'Chilli Seeds (Hot Variety)',
                description: 'High-quality chilli seeds producing very hot peppers. Good for commercial cultivation.',
                price: '4000',
                unit: 'per kg',
                location: 'Andhra Pradesh',
                contact: '+91 9876543243',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '23',
                category: 'seeds',
                title: 'Sunflower Seeds',
                description: 'High oil content sunflower seeds. Suitable for oil extraction and bird feed.',
                price: '120',
                unit: 'per kg',
                location: 'Karnataka',
                contact: '+91 9876543244',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '24',
                category: 'seeds',
                title: 'Cotton Seeds (BT)',
                description: 'Genetically modified BT cotton seeds with pest resistance. High yield variety.',
                price: '850',
                unit: 'per packet (450g)',
                location: 'Gujarat',
                contact: '+91 9876543245',
                image: null,
                dateAdded: new Date().toISOString()
            },

            // SERVICES SECTION - Agricultural Services
            {
                id: '25',
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
                id: '26',
                category: 'services',
                title: 'Crop Harvesting Service',
                description: 'Professional harvesting service with experienced team and modern equipment.',
                price: '2000',
                unit: 'per acre',
                location: 'Punjab',
                contact: '+91 9876543250',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '27',
                category: 'services',
                title: 'Soil Testing Service',
                description: 'Complete soil analysis including pH, nutrients, and organic matter content.',
                price: '800',
                unit: 'per sample',
                location: 'Delhi',
                contact: '+91 9876543251',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '28',
                category: 'services',
                title: 'Irrigation System Installation',
                description: 'Professional drip irrigation system installation and maintenance service.',
                price: '15000',
                unit: 'per acre',
                location: 'Rajasthan',
                contact: '+91 9876543252',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '29',
                category: 'services',
                title: 'Pest Control Service',
                description: 'Integrated pest management service using eco-friendly methods.',
                price: '1200',
                unit: 'per acre',
                location: 'Maharashtra',
                contact: '+91 9876543253',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '30',
                category: 'services',
                title: 'Farm Consultation',
                description: 'Expert agricultural consultation for crop planning and farm management.',
                price: '2000',
                unit: 'per visit',
                location: 'Haryana',
                contact: '+91 9876543254',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '31',
                category: 'services',
                title: 'Organic Certification',
                description: 'Complete organic certification process assistance for your farm.',
                price: '25000',
                unit: 'fixed price',
                location: 'Bangalore, Karnataka',
                contact: '+91 9876543255',
                image: null,
                dateAdded: new Date().toISOString()
            },

            // MACHINERY SECTION - Farm Equipment
            {
                id: '32',
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
                id: '33',
                category: 'machinery',
                title: 'Combine Harvester Rental',
                description: 'Modern combine harvester for efficient crop harvesting. Experienced operator included.',
                price: '8000',
                unit: 'per day',
                location: 'Punjab',
                contact: '+91 9876543260',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '34',
                category: 'machinery',
                title: 'Rotavator Service',
                description: 'Rotavator available for land preparation and soil mixing. Quick and efficient.',
                price: '800',
                unit: 'per acre',
                location: 'Uttar Pradesh',
                contact: '+91 9876543261',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '35',
                category: 'machinery',
                title: 'Seed Drill Machine',
                description: 'Precision seed drilling machine for accurate seed placement and spacing.',
                price: '1500',
                unit: 'per day',
                location: 'Haryana',
                contact: '+91 9876543262',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '36',
                category: 'machinery',
                title: 'Sprayer Equipment',
                description: 'High-capacity sprayer for pesticide and fertilizer application. Boom sprayer available.',
                price: '600',
                unit: 'per day',
                location: 'Gujarat',
                contact: '+91 9876543263',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '37',
                category: 'machinery',
                title: 'Threshing Machine',
                description: 'Multi-crop threshing machine suitable for wheat, rice, and other grains.',
                price: '2500',
                unit: 'per day',
                location: 'Rajasthan',
                contact: '+91 9876543264',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '38',
                category: 'machinery',
                title: 'Water Pump Rental',
                description: 'High-capacity water pump for irrigation. Diesel and electric options available.',
                price: '400',
                unit: 'per day',
                location: 'Tamil Nadu',
                contact: '+91 9876543265',
                image: null,
                dateAdded: new Date().toISOString()
            },

            // STORAGE SECTION - Storage Solutions
            {
                id: '39',
                category: 'storage',
                title: 'Cold Storage Space',
                description: 'Temperature-controlled storage facility for fruits and vegetables. Secure and clean.',
                price: '50',
                unit: 'per day per quintal',
                location: 'Mumbai, Maharashtra',
                contact: '+91 9876543216',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '40',
                category: 'storage',
                title: 'Grain Storage Warehouse',
                description: 'Dry storage facility for grains and cereals. Pest-free environment guaranteed.',
                price: '25',
                unit: 'per month per quintal',
                location: 'Punjab',
                contact: '+91 9876543270',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '41',
                category: 'storage',
                title: 'Controlled Atmosphere Storage',
                description: 'Advanced CA storage for extended shelf life of fruits. Maintains freshness for months.',
                price: '80',
                unit: 'per day per quintal',
                location: 'Himachal Pradesh',
                contact: '+91 9876543271',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '42',
                category: 'storage',
                title: 'Onion Storage Facility',
                description: 'Specialized storage for onions with proper ventilation and humidity control.',
                price: '30',
                unit: 'per month per quintal',
                location: 'Nashik, Maharashtra',
                contact: '+91 9876543272',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '43',
                category: 'storage',
                title: 'Potato Cold Storage',
                description: 'Temperature-controlled storage specifically designed for potato storage.',
                price: '45',
                unit: 'per month per quintal',
                location: 'West Bengal',
                contact: '+91 9876543273',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '44',
                category: 'storage',
                title: 'Seed Storage Facility',
                description: 'Climate-controlled storage for seeds with moisture and temperature control.',
                price: '100',
                unit: 'per month per quintal',
                location: 'Karnataka',
                contact: '+91 9876543274',
                image: null,
                dateAdded: new Date().toISOString()
            },
            {
                id: '45',
                category: 'storage',
                title: 'Multi-Purpose Warehouse',
                description: 'Large warehouse space suitable for various agricultural products. Flexible terms.',
                price: '15',
                unit: 'per day per quintal',
                location: 'Delhi',
                contact: '+91 9876543275',
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