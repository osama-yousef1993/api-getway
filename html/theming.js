// Theming JavaScript

// Initialize theme system
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    updateThemeVariables();
    setupThemeEvents();
});

// Initialize theme from localStorage or default to light
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Set theme and update UI
function setTheme(themeName) {
    // Remove existing theme data attributes
    document.documentElement.removeAttribute('data-theme');
    
    // Set new theme (except for light which is default)
    if (themeName !== 'light') {
        document.documentElement.setAttribute('data-theme', themeName);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', themeName);
    
    // Update active button
    updateActiveThemeButton(themeName);
    
    // Update theme information display
    setTimeout(updateThemeVariables, 100); // Small delay to ensure CSS has updated
    
    // Announce theme change for accessibility
    announceThemeChange(themeName);
}

// Update active theme button
function updateActiveThemeButton(activeTheme) {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const themeMap = {
        'light': '☀️',
        'dark': '🌙',
        'blue': '💙',
        'green': '💚',
        'purple': '💜',
        'high-contrast': '⚫'
    };
    
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === themeMap[activeTheme]) {
            btn.classList.add('active');
        }
    });
}

// Update theme variables display
function updateThemeVariables() {
    const variablesList = document.querySelector('.variables-list');
    if (!variablesList) return;
    
    const computedStyle = getComputedStyle(document.documentElement);
    
    // Key theme variables to display
    const keyVariables = [
        '--bg-primary',
        '--surface',
        '--text-primary',
        '--primary',
        '--secondary',
        '--accent',
        '--success',
        '--warning',
        '--danger'
    ];
    
    let html = '';
    keyVariables.forEach(varName => {
        const value = computedStyle.getPropertyValue(varName).trim();
        if (value) {
            html += `
                <div class="variable-item">
                    <span class="variable-name">${varName}</span>
                    <span class="variable-value">${value}</span>
                </div>
            `;
        }
    });
    
    variablesList.innerHTML = html;
}

// Setup theme-related event listeners
function setupThemeEvents() {
    // Auto theme detection
    setupAutoTheme();
    
    // Keyboard shortcuts for theme switching
    setupKeyboardShortcuts();
    
    // Form submission prevention
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Form submission prevented (demo only)', 'info');
        });
    }
    
    // Interactive progress bar
    setupProgressBarDemo();
    
    // Star rating interaction
    setupStarRating();
}

// Auto theme detection based on system preference
function setupAutoTheme() {
    // Check if browser supports prefers-color-scheme
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Add "Auto" button if not already present
        addAutoThemeButton();
        
        // Listen for changes in system preference
        mediaQuery.addEventListener('change', function(e) {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'auto') {
                setTheme(e.matches ? 'dark' : 'light');
                localStorage.setItem('theme', 'auto'); // Keep auto preference
            }
        });
    }
}

// Add auto theme button
function addAutoThemeButton() {
    const themeControls = document.querySelector('.theme-controls');
    if (themeControls && !document.querySelector('[data-theme="auto"]')) {
        const autoBtn = document.createElement('button');
        autoBtn.className = 'theme-btn';
        autoBtn.textContent = '🌓';
        autoBtn.title = 'Auto Theme';
        autoBtn.setAttribute('data-theme', 'auto');
        autoBtn.onclick = () => setAutoTheme();
        themeControls.appendChild(autoBtn);
    }
}

// Set auto theme based on system preference
function setAutoTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    localStorage.setItem('theme', 'auto');
    updateActiveThemeButton('auto');
}

// Keyboard shortcuts for accessibility
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + T for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Ctrl/Cmd + Shift + H for high contrast
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
            e.preventDefault();
            setTheme('high-contrast');
        }
    });
}

// Toggle between light and dark theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Announce theme change for screen readers
function announceThemeChange(themeName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    announcement.textContent = `Theme changed to ${themeName}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: bold;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        info: 'var(--primary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--danger)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Trigger slide-in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Interactive progress bar demo
function setupProgressBarDemo() {
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        let progress = 70;
        let increasing = false;
        
        progressBar.style.cursor = 'pointer';
        progressBar.addEventListener('click', function() {
            increasing = !increasing;
            animateProgress();
        });
        
        function animateProgress() {
            const interval = setInterval(() => {
                if (increasing) {
                    progress += 2;
                    if (progress >= 100) {
                        progress = 100;
                        increasing = false;
                        clearInterval(interval);
                    }
                } else {
                    progress -= 2;
                    if (progress <= 0) {
                        progress = 0;
                        increasing = true;
                        clearInterval(interval);
                    }
                }
                progressBar.style.width = progress + '%';
            }, 50);
        }
    }
}

// Star rating interaction
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // Fill stars up to clicked star
            stars.forEach((s, i) => {
                s.textContent = i <= index ? '⭐' : '☆';
            });
            
            showNotification(`Rated ${index + 1} star${index > 0 ? 's' : ''}!`, 'success');
        });
        
        star.addEventListener('mouseenter', function() {
            // Preview rating on hover
            stars.forEach((s, i) => {
                s.style.opacity = i <= index ? '1' : '0.3';
            });
        });
    });
    
    const ratingContainer = document.querySelector('.rating');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            // Reset opacity when leaving rating area
            stars.forEach(s => {
                s.style.opacity = '1';
            });
        });
    }
}

// Export theme functions for use in HTML onclick handlers
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;

// Theme persistence and system integration
function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
    
    // Also save to sessionStorage for immediate access
    sessionStorage.setItem('currentTheme', theme);
    
    // Dispatch custom event for other scripts that might need to know
    window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: theme }
    }));
}

// Listen for theme changes from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
        setTheme(e.newValue);
    }
});

// Detect reduced motion preference
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Adjust animations based on user preference
if (respectsReducedMotion()) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}

// Print styles consideration
window.addEventListener('beforeprint', function() {
    // Temporarily switch to light theme for printing
    const currentTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-print-theme', currentTheme);
    setTheme('light');
});

window.addEventListener('afterprint', function() {
    // Restore original theme after printing
    const originalTheme = document.documentElement.getAttribute('data-print-theme');
    if (originalTheme) {
        setTheme(originalTheme);
        document.documentElement.removeAttribute('data-print-theme');
    }
});