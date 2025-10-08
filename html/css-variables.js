// JavaScript for CSS Variables Interactive Demo

function updateVariable(property, value) {
    // Update the CSS custom property on the document root
    document.documentElement.style.setProperty(property, value);
    
    // Update display values for range inputs
    if (property === '--demo-font-size') {
        document.getElementById('font-size-value').textContent = value;
    }
    if (property === '--demo-border-radius') {
        document.getElementById('border-radius-value').textContent = value;
    }
}

// Initialize the demo when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial values for range input displays
    const fontSizeInput = document.getElementById('font-size');
    const borderRadiusInput = document.getElementById('border-radius');
    
    if (fontSizeInput) {
        document.getElementById('font-size-value').textContent = fontSizeInput.value + 'px';
    }
    
    if (borderRadiusInput) {
        document.getElementById('border-radius-value').textContent = borderRadiusInput.value + 'px';
    }
    
    // Add some interactive features
    addVariableInspector();
    addThemePresets();
});

// Function to inspect current CSS variables
function addVariableInspector() {
    const container = document.querySelector('.container');
    
    // Create a floating inspector button
    const inspectorBtn = document.createElement('button');
    inspectorBtn.textContent = '🔍 Inspect Variables';
    inspectorBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
    `;
    
    inspectorBtn.addEventListener('click', function() {
        showVariableInspector();
    });
    
    inspectorBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    inspectorBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(inspectorBtn);
}

function showVariableInspector() {
    // Get computed styles from root element
    const rootStyles = getComputedStyle(document.documentElement);
    const variables = [];
    
    // Extract CSS custom properties
    for (let property of document.styleSheets[0].cssRules[0].style) {
        if (property.startsWith('--')) {
            const value = rootStyles.getPropertyValue(property).trim();
            variables.push({ property, value });
        }
    }
    
    // Create inspector modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    let innerHTML = '<h2>CSS Variables Inspector</h2>';
    innerHTML += '<p>Current CSS custom properties defined in :root:</p>';
    innerHTML += '<div style="font-family: monospace; margin-top: 20px;">';
    
    variables.forEach(({ property, value }) => {
        innerHTML += `
            <div style="margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                <strong>${property}:</strong> ${value}
            </div>
        `;
    });
    
    innerHTML += '</div>';
    innerHTML += '<button id="close-inspector" style="position: absolute; top: 10px; right: 15px; background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">×</button>';
    
    content.innerHTML = innerHTML;
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close modal functionality
    document.getElementById('close-inspector').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function addThemePresets() {
    const controlsSection = document.querySelector('.controls');
    
    if (controlsSection) {
        const presetContainer = document.createElement('div');
        presetContainer.innerHTML = `
            <label>
                Theme Presets:
                <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                    <button onclick="applyPreset('default')" class="preset-btn">Default</button>
                    <button onclick="applyPreset('ocean')" class="preset-btn">Ocean</button>
                    <button onclick="applyPreset('sunset')" class="preset-btn">Sunset</button>
                    <button onclick="applyPreset('forest')" class="preset-btn">Forest</button>
                    <button onclick="applyPreset('purple')" class="preset-btn">Purple</button>
                </div>
            </label>
        `;
        
        // Add CSS for preset buttons
        const style = document.createElement('style');
        style.textContent = `
            .preset-btn {
                padding: 6px 12px;
                border: 1px solid #ddd;
                border-radius: 15px;
                background: white;
                cursor: pointer;
                font-size: 12px;
                font-weight: bold;
                transition: all 0.2s ease;
            }
            .preset-btn:hover {
                background: var(--primary-color);
                color: white;
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);
        
        controlsSection.appendChild(presetContainer);
    }
}

// Theme preset functions
function applyPreset(presetName) {
    const presets = {
        default: {
            primary: '#3498db',
            secondary: '#2ecc71',
            fontSize: '16px',
            borderRadius: '8px'
        },
        ocean: {
            primary: '#0077be',
            secondary: '#00a8cc',
            fontSize: '18px',
            borderRadius: '12px'
        },
        sunset: {
            primary: '#ff6b35',
            secondary: '#f7931e',
            fontSize: '17px',
            borderRadius: '20px'
        },
        forest: {
            primary: '#2d5a27',
            secondary: '#4caf50',
            fontSize: '16px',
            borderRadius: '6px'
        },
        purple: {
            primary: '#663399',
            secondary: '#9966cc',
            fontSize: '19px',
            borderRadius: '15px'
        }
    };
    
    const preset = presets[presetName];
    if (preset) {
        updateVariable('--demo-primary', preset.primary);
        updateVariable('--demo-secondary', preset.secondary);
        updateVariable('--demo-font-size', preset.fontSize);
        updateVariable('--demo-border-radius', preset.borderRadius);
        
        // Update input controls to match
        document.getElementById('primary-color').value = preset.primary;
        document.getElementById('secondary-color').value = preset.secondary;
        document.getElementById('font-size').value = parseInt(preset.fontSize);
        document.getElementById('border-radius').value = parseInt(preset.borderRadius);
        
        // Update display values
        document.getElementById('font-size-value').textContent = preset.fontSize;
        document.getElementById('border-radius-value').textContent = preset.borderRadius;
    }
}

// Add copy to clipboard functionality for CSS variables
function copyVariableCSS() {
    const rootStyles = getComputedStyle(document.documentElement);
    let cssText = ':root {\n';
    
    // Get all custom properties
    for (let property of document.styleSheets[0].cssRules[0].style) {
        if (property.startsWith('--')) {
            const value = rootStyles.getPropertyValue(property).trim();
            cssText += `  ${property}: ${value};\n`;
        }
    }
    
    cssText += '}';
    
    // Copy to clipboard
    navigator.clipboard.writeText(cssText).then(function() {
        alert('CSS variables copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Expose functions to global scope for onclick handlers
window.updateVariable = updateVariable;
window.applyPreset = applyPreset;
window.copyVariableCSS = copyVariableCSS;