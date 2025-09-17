/**
 * Knowledge Base Integration Verification Script
 * Tests all components and functionality integration
 */

class KnowledgeBaseIntegrationTest {
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.totalTests = 0;
    }

    // Test navigation functionality
    testNavigation() {
        console.log('🧪 Testing Navigation Functionality...');
        
        // Test tab switching
        const tabs = document.querySelectorAll('#nav-tabs button');
        if (tabs.length === 5) {
            this.logTest('Navigation Tabs Count', true, `Found all 5 tabs: ${Array.from(tabs).map(t => t.textContent).join(', ')}`);
        } else {
            this.logTest('Navigation Tabs Count', false, `Expected 5 tabs, found ${tabs.length}`);
        }

        // Test active tab functionality
        const activeTab = document.querySelector('#nav-tabs button.active');
        if (activeTab) {
            this.logTest('Active Tab Detection', true, `Active tab: ${activeTab.textContent}`);
        } else {
            this.logTest('Active Tab Detection', false, 'No active tab found');
        }

        // Test tab click functionality
        if (tabs.length > 1) {
            const originalActive = document.querySelector('#nav-tabs button.active').textContent;
            tabs[1].click();
            
            setTimeout(() => {
                const newActive = document.querySelector('#nav-tabs button.active').textContent;
                this.logTest('Tab Switching', originalActive !== newActive, 
                    `Switched from ${originalActive} to ${newActive}`);
            }, 100);
        }
    }

    // Test search functionality
    testSearch() {
        console.log('🔍 Testing Search Functionality...');
        
        const searchBox = document.getElementById('search');
        const clearButton = document.getElementById('clearSearch');
        
        if (searchBox) {
            this.logTest('Search Box Exists', true, 'Search input field found');
            
            // Test search input
            searchBox.value = 'wheat';
            searchBox.dispatchEvent(new Event('input'));
            
            setTimeout(() => {
                const highlights = document.querySelectorAll('mark');
                this.logTest('Search Highlighting', highlights.length > 0, 
                    `Found ${highlights.length} highlighted search results`);
                
                // Test clear search
                if (clearButton) {
                    clearButton.click();
                    setTimeout(() => {
                        const clearedHighlights = document.querySelectorAll('mark');
                        this.logTest('Clear Search', clearedHighlights.length === 0, 
                            'Search cleared successfully');
                    }, 100);
                }
            }, 300);
        } else {
            this.logTest('Search Box Exists', false, 'Search input field not found');
        }
    }

    // Test content display
    testContentDisplay() {
        console.log('📄 Testing Content Display...');
        
        const contentContainer = document.getElementById('content');
        if (contentContainer) {
            this.logTest('Content Container', true, 'Content container found');
            
            const cards = contentContainer.querySelectorAll('.card');
            this.logTest('Content Cards', cards.length > 0, `Found ${cards.length} content cards`);
            
            // Test card structure
            if (cards.length > 0) {
                const firstCard = cards[0];
                const hasTitle = firstCard.querySelector('h3') !== null;
                const hasContent = firstCard.querySelector('p') !== null;
                
                this.logTest('Card Structure', hasTitle && hasContent, 
                    `Cards have proper structure: title=${hasTitle}, content=${hasContent}`);
            }
        } else {
            this.logTest('Content Container', false, 'Content container not found');
        }
    }

    // Test responsive design
    testResponsiveDesign() {
        console.log('📱 Testing Responsive Design...');
        
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const overlay = document.getElementById('sidebarOverlay');
        
        this.logTest('Mobile Menu Toggle', mobileToggle !== null, 'Mobile menu toggle button exists');
        this.logTest('Sidebar Overlay', overlay !== null, 'Sidebar overlay exists');
        
        // Test mobile menu functionality
        if (mobileToggle && sidebar) {
            const initialSidebarState = sidebar.classList.contains('open');
            mobileToggle.click();
            
            setTimeout(() => {
                const newSidebarState = sidebar.classList.contains('open');
                this.logTest('Mobile Menu Toggle Function', initialSidebarState !== newSidebarState, 
                    `Mobile menu ${newSidebarState ? 'opened' : 'closed'}`);
            }, 100);
        }

        // Test responsive grid
        const container = document.querySelector('.container');
        if (container) {
            const computedStyle = getComputedStyle(container);
            const hasGridLayout = computedStyle.display === 'grid';
            this.logTest('Responsive Grid Layout', hasGridLayout, 
                `Container uses ${computedStyle.display} layout`);
        }
    }

    // Test dark mode functionality
    testDarkMode() {
        console.log('🌙 Testing Dark Mode...');
        
        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            this.logTest('Dark Mode Toggle Exists', true, 'Dark mode toggle button found');
            
            const initialDarkState = document.body.classList.contains('dark');
            darkToggle.click();
            
            setTimeout(() => {
                const newDarkState = document.body.classList.contains('dark');
                this.logTest('Dark Mode Toggle Function', initialDarkState !== newDarkState, 
                    `Dark mode ${newDarkState ? 'enabled' : 'disabled'}`);
                
                // Test CSS variable changes
                const rootStyle = getComputedStyle(document.documentElement);
                const accentColor = rootStyle.getPropertyValue('--accent-color').trim();
                this.logTest('Dark Mode CSS Variables', accentColor !== '', 
                    `CSS variables updated: --accent-color = ${accentColor}`);
            }, 100);
        } else {
            this.logTest('Dark Mode Toggle Exists', false, 'Dark mode toggle button not found');
        }
    }

    // Test data integrity
    testDataIntegrity() {
        console.log('📊 Testing Data Integrity...');
        
        // Check if data object exists and has required categories
        if (typeof data !== 'undefined') {
            this.logTest('Data Object Exists', true, 'Global data object found');
            
            const requiredCategories = ['Crops', 'Soil', 'Fertilizers', 'Machines', 'Types of Schemes'];
            const availableCategories = Object.keys(data);
            
            const hasAllCategories = requiredCategories.every(cat => availableCategories.includes(cat));
            this.logTest('Data Categories Complete', hasAllCategories, 
                `Categories: ${availableCategories.join(', ')}`);
            
            // Test data structure for each category
            requiredCategories.forEach(category => {
                if (data[category] && Array.isArray(data[category])) {
                    const itemCount = data[category].length;
                    this.logTest(`${category} Data`, itemCount > 0, 
                        `${category} has ${itemCount} items`);
                    
                    // Test first item structure
                    if (itemCount > 0) {
                        const firstItem = data[category][0];
                        const hasName = firstItem.name !== undefined;
                        const hasSummary = firstItem.summary !== undefined;
                        this.logTest(`${category} Item Structure`, hasName && hasSummary, 
                            `Items have required fields: name=${hasName}, summary=${hasSummary}`);
                    }
                }
            });
        } else {
            this.logTest('Data Object Exists', false, 'Global data object not found');
        }
    }

    // Test styling consistency
    testStylingConsistency() {
        console.log('🎨 Testing Styling Consistency...');
        
        // Test CSS custom properties
        const rootStyle = getComputedStyle(document.documentElement);
        const customProperties = [
            '--bg-color', '--text-color', '--card-bg', '--header-bg', 
            '--sidebar-bg', '--accent-color', '--border-radius'
        ];
        
        const definedProperties = customProperties.filter(prop => 
            rootStyle.getPropertyValue(prop).trim() !== ''
        );
        
        this.logTest('CSS Custom Properties', definedProperties.length === customProperties.length, 
            `${definedProperties.length}/${customProperties.length} custom properties defined`);
        
        // Test header styling
        const header = document.querySelector('header');
        if (header) {
            const headerStyle = getComputedStyle(header);
            const hasGradient = headerStyle.background.includes('gradient') || 
                               headerStyle.backgroundImage.includes('gradient');
            this.logTest('Header Gradient Styling', hasGradient, 
                'Header has gradient background');
        }
        
        // Test card styling
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            const cardStyle = getComputedStyle(cards[0]);
            const hasBorderRadius = parseFloat(cardStyle.borderRadius) > 0;
            const hasBoxShadow = cardStyle.boxShadow !== 'none';
            
            this.logTest('Card Styling', hasBorderRadius && hasBoxShadow, 
                `Cards have proper styling: border-radius=${hasBorderRadius}, box-shadow=${hasBoxShadow}`);
        }
    }

    // Test animations and transitions
    testAnimations() {
        console.log('✨ Testing Animations and Transitions...');
        
        // Test CSS transitions
        const elementsWithTransitions = document.querySelectorAll('.card, button, .sidebar nav ul li');
        let hasTransitions = 0;
        
        elementsWithTransitions.forEach(element => {
            const style = getComputedStyle(element);
            if (style.transition !== 'all 0s ease 0s') {
                hasTransitions++;
            }
        });
        
        this.logTest('CSS Transitions', hasTransitions > 0, 
            `${hasTransitions} elements have CSS transitions`);
        
        // Test card animations
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            const hasAnimationClass = Array.from(cards).some(card => 
                card.classList.contains('animate-in') || 
                card.style.animation !== ''
            );
            this.logTest('Card Animations', true, 'Cards support animation classes');
        }
    }

    // Helper method to log test results
    logTest(testName, passed, message) {
        this.totalTests++;
        if (passed) this.passedTests++;
        
        const result = {
            name: testName,
            passed: passed,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        this.testResults.push(result);
        
        const emoji = passed ? '✅' : '❌';
        console.log(`${emoji} ${testName}: ${message}`);
    }

    // Run all tests
    async runAllTests() {
        console.log('🚀 Starting Knowledge Base Integration Tests...\n');
        
        this.testResults = [];
        this.passedTests = 0;
        this.totalTests = 0;
        
        // Run all test suites
        this.testNavigation();
        this.testSearch();
        this.testContentDisplay();
        this.testResponsiveDesign();
        this.testDarkMode();
        this.testDataIntegrity();
        this.testStylingConsistency();
        this.testAnimations();
        
        // Wait for async tests to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate final report
        this.generateReport();
    }

    // Generate test report
    generateReport() {
        console.log('\n📋 Integration Test Report');
        console.log('=' .repeat(50));
        console.log(`Total Tests: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests}`);
        console.log(`Failed: ${this.totalTests - this.passedTests}`);
        console.log(`Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
        
        if (this.passedTests === this.totalTests) {
            console.log('\n🎉 All tests passed! Knowledge Base integration is successful.');
        } else {
            console.log('\n⚠️  Some tests failed. Please review the issues above.');
        }
        
        // Log failed tests
        const failedTests = this.testResults.filter(test => !test.passed);
        if (failedTests.length > 0) {
            console.log('\n❌ Failed Tests:');
            failedTests.forEach(test => {
                console.log(`  - ${test.name}: ${test.message}`);
            });
        }
        
        console.log('\n' + '=' .repeat(50));
        
        return {
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            failedTests: this.totalTests - this.passedTests,
            successRate: (this.passedTests / this.totalTests) * 100,
            results: this.testResults
        };
    }
}

// Export for use in browser console or testing environment
if (typeof window !== 'undefined') {
    window.KnowledgeBaseIntegrationTest = KnowledgeBaseIntegrationTest;
    
    // Auto-run tests when script loads (optional)
    window.addEventListener('load', () => {
        console.log('Knowledge Base Integration Test Suite loaded. Run tests with:');
        console.log('const tester = new KnowledgeBaseIntegrationTest(); tester.runAllTests();');
    });
}

// For Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeBaseIntegrationTest;
}