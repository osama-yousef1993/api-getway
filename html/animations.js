// JavaScript for Animation Controls

function restartAnimation(elementId) {
    const element = document.getElementById(elementId);
    // Remove and re-add the element to restart CSS animations
    const parent = element.parentNode;
    const clone = element.cloneNode(true);
    parent.removeChild(element);
    parent.appendChild(clone);
}

function playAnimation() {
    const element = document.getElementById('controllable');
    element.style.animationPlayState = 'running';
}

function pauseAnimation() {
    const element = document.getElementById('controllable');
    element.style.animationPlayState = 'paused';
}

function reverseAnimation() {
    const element = document.getElementById('controllable');
    const currentDirection = element.style.animationDirection;
    element.style.animationDirection = currentDirection === 'reverse' ? 'normal' : 'reverse';
    element.style.animationPlayState = 'running';
}

function resetAnimation() {
    const element = document.getElementById('controllable');
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'slideIn 2s ease-out paused';
    }, 10);
}

// Add some interactive features when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to floating card for extra interaction
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.addEventListener('click', function() {
            this.style.animation = 'float 1s ease-in-out, rotate 1s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        });
    }
    
    // Add hover effects to animation boxes
    const animationBoxes = document.querySelectorAll('.animation-box');
    animationBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});