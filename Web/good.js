// Double-click registration script
let isDoubleClickEnabled = false;
let asteriskPressCount = 0;
let asteriskTimer = null;

function createPopup(message, isEnabled) {
    // Remove any existing popups
    const existingPopup = document.getElementById('double-click-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement('div');
    popup.id = 'double-click-popup';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = isEnabled ? 'green' : 'red';
    popup.style.color = 'white';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.transition = 'opacity 0.3s ease-in-out';
    popup.textContent = message;

    // Add to body
    document.body.appendChild(popup);

    // Automatically remove popup after 2 seconds
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 2000);
}

function toggleDoubleClickRegistration() {
    if (isDoubleClickEnabled) {
        // Disable double-click registration
        document.removeEventListener('click', handleDoubleClick);
        console.log('Double-click registration DISABLED');
        createPopup('Double-Click OFF', false);
        isDoubleClickEnabled = false;
    } else {
        // Enable double-click registration
        document.addEventListener('click', handleDoubleClick);
        console.log('Double-click registration ENABLED');
        createPopup('Double-Click ON', true);
        isDoubleClickEnabled = true;
    }
}

function handleDoubleClick(event) {
    console.log('First click registration:', event);
    console.log('Second click registration:', event);
    
    // Optional: Additional information about the click
    console.log('Click coordinates:', {
        x: event.clientX,
        y: event.clientY
    });
}

// Modify the existing event listener to add asterisk toggle
document.addEventListener('keydown', function(event) {
    // Existing Alt key handler for Sparx overlay
    if (event.key === 'Alt') {
        event.preventDefault();
        toggleSparxOverlay();
    }
    
    // New asterisk key handler for double-click toggle
    if (event.key === '*') {
        // Reset timer if more than 2 seconds have passed
        if (asteriskTimer) {
            clearTimeout(asteriskTimer);
        }
        
        asteriskPressCount++;
        
        // Set a timer to reset the count after 2 seconds
        asteriskTimer = setTimeout(() => {
            asteriskPressCount = 0;
        }, 2000);
        
        // Toggle if asterisk is pressed 5 times within 2 seconds
        if (asteriskPressCount === 5) {
            toggleDoubleClickRegistration();
            asteriskPressCount = 0;
            clearTimeout(asteriskTimer);
        }
    }
});

console.log('Script loaded. Press Alt to toggle Sparx overlay.');
console.log('Press * 5 times within 2 seconds to toggle double-click registration.');
console.log('Currently double-click registration is OFF');
