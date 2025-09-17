/**
 * UI Enhancements JavaScript
 * Adds modern interactive features and animations
 */

class UIEnhancements {
    constructor() {
        this.init();
        this.bindEvents();
        this.addAnimations();
    }

    init() {
        // Add utility classes to body
        document.body.classList.add('ui-enhanced');
        
        // Initialize intersection observer for animations
        this.setupIntersectionObserver();
        
        // Add loading states
        this.setupLoadingStates();
        
        // Initialize particle effects
        this.initParticleEffects();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
    }

    bindEvents() {
        // Enhanced button interactions
        this.enhanceButtons();
        
        // Enhanced card interactions
        this.enhanceCards();
        
        // Enhanced form interactions
        this.enhanceForms();
        
        // Enhanced navigation
        this.enhanceNavigation();
        
        // Add ripple effects
        this.addRippleEffects();
        
        // Add hover sound effects (optional)
        this.addSoundEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and important elements
        const elementsToAnimate = document.querySelectorAll(
            '.agri-card, .product-card, .card, .btn, .nav-btn, .category-header'
        );
        
        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn, .nav-btn, button');
        
        buttons.forEach(button => {
            // Add hover class for enhanced effects
            button.classList.add('hover-lift');
            
            // Add click animation
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
                this.addClickAnimation(button);
            });
            
            // Add focus enhancement
            button.addEventListener('focus', () => {
                button.classList.add('animate-glow');
            });
            
            button.addEventListener('blur', () => {
                button.classList.remove('animate-glow');
            });
        });
    }

    enhanceCards() {
        const cards = document.querySelectorAll('.agri-card, .product-card, .card');
        
        cards.forEach(card => {
            // Add glass morphism class
            card.classList.add('glass');
            
            // Add tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                this.addTiltEffect(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });
            
            // Add click animation
            card.addEventListener('click', () => {
                this.addClickAnimation(card);
            });
        });
    }

    enhanceForms() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            this.addFloatingLabel(input);
            
            // Add focus animations
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
                this.addFocusGlow(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('focused');
                this.removeFocusGlow(input);
            });
            
            // Add validation styling
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    enhanceNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Add slide animation
                this.addSlideAnimation(button);
            });
        });
    }

    addRippleEffects() {
        const rippleElements = document.querySelectorAll('.btn, .nav-btn, .card');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Ensure element has relative positioning
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addTiltEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(10px)
        `;
    }

    resetTilt(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    addSlideAnimation(element) {
        element.classList.add('animate-slide-in-right');
        setTimeout(() => {
            element.classList.remove('animate-slide-in-right');
        }, 400);
    }

    addFloatingLabel(input) {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const wrapper = document.createElement('div');
            wrapper.className = 'floating-label-wrapper';
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            
            // Check if input has value
            const checkValue = () => {
                if (input.value) {
                    wrapper.classList.add('has-value');
                } else {
                    wrapper.classList.remove('has-value');
                }
            };
            
            input.addEventListener('input', checkValue);
            input.addEventListener('focus', checkValue);
            input.addEventListener('blur', checkValue);
            checkValue(); // Initial check
        }
    }

    addFocusGlow(input) {
        input.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.3)';
    }

    removeFocusGlow(input) {
        input.style.boxShadow = '';
    }

    validateInput(input) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    setupLoadingStates() {
        // Add loading state to buttons on form submission
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitButton = form.querySelector('button[type="submit"], .submit-btn');
                if (submitButton) {
                    this.addLoadingState(submitButton);
                }
            });
        });
    }

    addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.classList.add('loading');
        button.disabled = true;
        
        // Simulate loading (remove this in production)
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('loading');
            button.disabled = false;
        }, 2000);
    }

    initParticleEffects() {
        // Add subtle particle effects to header
        const header = document.querySelector('.dashboard-header');
        if (header) {
            this.createParticles(header);
        }
    }

    createParticles(container) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.appendChild(particle);
        }
    }

    setupSmoothScrolling() {
        // Add smooth scrolling to anchor links
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addSoundEffects() {
        // Optional: Add subtle sound effects for interactions
        // This would require audio files and user permission
        
        const buttons = document.querySelectorAll('.btn, .nav-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Play hover sound (if audio files are available)
                this.playSound('hover');
            });
            
            button.addEventListener('click', () => {
                // Play click sound (if audio files are available)
                this.playSound('click');
            });
        });
    }

    playSound(type) {
        // Placeholder for sound effects
        // In a real implementation, you would load and play audio files
        console.log(`Playing ${type} sound effect`);
    }

    addAnimations() {
        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 0.8;
                }
            }
            
            .floating-label-wrapper {
                position: relative;
                margin-bottom: 1rem;
            }
            
            .floating-label-wrapper label {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                transition: all 0.3s ease;
                pointer-events: none;
                color: rgba(255, 255, 255, 0.6);
                font-size: 14px;
            }
            
            .floating-label-wrapper.has-value label,
            .floating-label-wrapper.focused label {
                top: -8px;
                left: 8px;
                font-size: 12px;
                color: var(--primary-400);
                background: var(--card-bg, #ffffff);
                padding: 0 4px;
                border-radius: 4px;
            }
            
            .valid {
                border-color: var(--success-500) !important;
                box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
            }
            
            .invalid {
                border-color: var(--error-500) !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
            
            .ui-enhanced {
                scroll-behavior: smooth;
            }
            
            .particle {
                z-index: 1;
            }
        `;
        
        document.head.appendChild(style);
    }

    // Public methods for external use
    static getInstance() {
        if (!UIEnhancements.instance) {
            UIEnhancements.instance = new UIEnhancements();
        }
        return UIEnhancements.instance;
    }

    // Utility methods
    static addGlowEffect(element) {
        element.classList.add('animate-glow');
        setTimeout(() => {
            element.classList.remove('animate-glow');
        }, 2000);
    }

    static addPulseEffect(element) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 2000);
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} animate-slide-in-right`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            box-shadow: var(--shadow-xl);
            backdrop-filter: blur(20px);
            max-width: 300px;
        `;
        
        // Set background based on type
        switch (type) {
            case 'success':
                notification.style.background = 'var(--gradient-success)';
                break;
            case 'error':
                notification.style.background = 'var(--gradient-error, linear-gradient(135deg, #ef4444, #dc2626))';
                break;
            case 'warning':
                notification.style.background = 'var(--gradient-warning)';
                break;
            default:
                notification.style.background = 'var(--gradient-primary)';
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    UIEnhancements.getInstance();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIEnhancements;
} else if (typeof window !== 'undefined') {
    window.UIEnhancements = UIEnhancements;
}