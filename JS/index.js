// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- COLOR FEATURE ----------
    const colorBox = document.getElementById('colorBox');
    const colorCodeSpan = document.getElementById('colorCode');
    const randomColorBtn = document.getElementById('randomColorBtn');
    const resetColorBtn = document.getElementById('resetColorBtn');

    // Helper: generate random HEX color
    function getRandomHexColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Update color box background and display text
    function setBoxColor(color) {
        colorBox.style.backgroundColor = color;
        colorCodeSpan.textContent = color;
    }

    // Random color handler
    function applyRandomColor() {
        const newColor = getRandomHexColor();
        setBoxColor(newColor);
    }

    // Reset to default blue (#3b82f6)
    function resetToDefaultColor() {
        setBoxColor('#3b82f6');
    }

    // Event listeners for color controls
    randomColorBtn.addEventListener('click', applyRandomColor);
    resetColorBtn.addEventListener('click', resetToDefaultColor);
    
    // Bonus: clicking the color box also triggers random color (fun & intuitive)
    colorBox.addEventListener('click', applyRandomColor);

    // ---------- COUNTER FEATURE ----------
    let counter = 0;
    const countDisplay = document.getElementById('countDisplay');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetCountBtn = document.getElementById('resetCountBtn');

    // Update the counter display
    function updateCounterDisplay() {
        countDisplay.textContent = counter;
    }

    // Increment counter
    function incrementCounter() {
        counter++;
        updateCounterDisplay();
    }

    // Decrement counter (but no negative numbers - keeps it simple & friendly)
    function decrementCounter() {
        if (counter > 0) {
            counter--;
            updateCounterDisplay();
        } else {
            // Optional subtle feedback: just a tiny console log, but visually we can also flash? 
            // But we keep ultra simple, no alert to stay clean.
            // However we add a very light visual hint (no popup, just a tiny style pulse if you want minimal)
            // I'll keep it silent, but you could add a short class effect — but simple is better.
            // For better UX, we simply prevent negative numbers.
        }
    }

    // Reset counter to zero
    function resetCounter() {
        counter = 0;
        updateCounterDisplay();
    }

    // Attach event listeners for counter buttons
    incrementBtn.addEventListener('click', incrementCounter);
    decrementBtn.addEventListener('click', decrementCounter);
    resetCountBtn.addEventListener('click', resetCounter);

    // Initialize counter display
    updateCounterDisplay();

    // Optional: add a tiny "no negative" feedback effect on decrement if already zero
    // but not intrusive — gives a gentle border flash when trying to go below 0.
    // (It's a small detail that makes it feel responsive without being annoying)
    function addNoNegativeHint() {
        if (counter === 0) {
            decrementBtn.style.transform = 'scale(0.96)';
            setTimeout(() => {
                decrementBtn.style.transform = '';
            }, 150);
        }
    }
    
    // Override decrement with hint
    const originalDecrement = decrementCounter;
    window.decrementCounter = function() {
        if (counter === 0) {
            addNoNegativeHint();
        } else {
            originalDecrement();
        }
    };
    // rebind safely
    decrementBtn.removeEventListener('click', decrementCounter);
    decrementBtn.addEventListener('click', () => {
        if (counter === 0) {
            addNoNegativeHint();
        } else {
            decrementCounter();
        }
    });
    
    // Also make sure the counter never goes negative via any other means
    // everything is solid.
    
    // small extra: the color code text can be clicked to copy (tiny bonus but keeps useful)
    colorCodeSpan.style.cursor = 'pointer';
    colorCodeSpan.addEventListener('click', function() {
        const colorText = colorCodeSpan.textContent;
        navigator.clipboard.writeText(colorText).then(() => {
            // Temporary feedback: change background of color-code briefly
            const originalBg = colorCodeSpan.style.backgroundColor;
            colorCodeSpan.style.backgroundColor = '#d9f0e6';
            setTimeout(() => {
                colorCodeSpan.style.backgroundColor = '';
            }, 200);
        }).catch(() => {
            // silent fallback
        });
    });
    
    // one more: provide initial state consistency
    setBoxColor('#3b82f6');   // ensure default matches CSS
});