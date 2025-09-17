// Emergency mobile menu toggle fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix script loaded');
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 1023;
    }
    
    // Create a visible mobile menu toggle
    function createVisibleMobileToggle() {
        if (!isMobile()) return;
        
        console.log('Creating visible mobile toggle');
        
        // Find the header
        const headerTop = document.querySelector('.dashboard-header-top');
        if (!headerTop) {
            console.log('Header not found');
            return;
        }
        
        // Remove existing toggle if it exists
        const existingToggle = document.getElementById('mobileMenuToggleVisible');
        if (existingToggle) {
            existingToggle.remove();
        }
        
        // Create new visible toggle
        const newToggle = document.createElement('button');
        newToggle.id = 'mobileMenuToggleVisible';
        newToggle.innerHTML = '☰';
        
        // Apply inline styles for maximum visibility
        newToggle.style.cssText = `
            display: flex !important;
            width: 50px !important;
            height: 50px !important;
            background: #000 !important;
            border: 3px solid #fff !important;
            color: #fff !important;
            font-size: 20px !important;
            font-weight: bold !important;
            border-radius: 8px !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            z-index: 99999 !important;
            position: relative !important;
            margin-right: 15px !important;
            flex-shrink: 0 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
            text-shadow: none !important;
            font-family: Arial, sans-serif !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin-left: 0 !important;
            order: -1 !important;
        `;
        
        // Add click handler
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Visible mobile toggle clicked');
            
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            
            if (sidebar) {
                sidebar.classList.toggle('active');
                sidebar.classList.toggle('open');
                console.log('Sidebar toggled');
            }
            
            if (overlay) {
                overlay.classList.toggle('active');
            }
            
            // Toggle button appearance
            if (newToggle.innerHTML === '☰') {
                newToggle.innerHTML = '✕';
            } else {
                newToggle.innerHTML = '☰';
            }
        });
        
        // Insert at the beginning of header
        headerTop.insertBefore(newToggle, headerTop.firstChild);
        
        console.log('Visible mobile toggle created and added');
        
        // Hide original toggle
        const originalToggle = document.getElementById('mobileMenuToggle');
        if (originalToggle) {
            originalToggle.style.display = 'none';
        }
    }
    
    // Run on load and resize
    createVisibleMobileToggle();
    window.addEventListener('resize', createVisibleMobileToggle);
    
    // Also try after a short delay in case DOM isn't fully ready
    setTimeout(createVisibleMobileToggle, 100);
    setTimeout(createVisibleMobileToggle, 500);
});