document.querySelectorAll('.category').forEach(category => {
    const generateBtn = category.querySelector('.generate');
    const retryBtn = category.querySelector('.retry');
    const result = category.querySelector('.result');
    const retries = category.querySelector('.retries');
    let retryCount = 0;
    
    generateBtn.addEventListener('click', () => {
        const type = category.dataset.type;
        const lang = document.getElementById("language-selector").value;
        
        if (type === 'color-palette') {
            generateColors(category);
        } else {
            result.textContent = getRandom(categories[lang][type]);  // FIXED
        }

        generateBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        retries.classList.remove('hidden');
        retryCount = 0;
        retries.textContent = translations[lang].retries + retryCount;
    });
    
    retryBtn.addEventListener('click', () => {
        const type = category.dataset.type;
        const lang = document.getElementById("language-selector").value;
        
        if (type === 'color-palette') {
            generateColors(category);
        } else {
            result.textContent = getRandom(categories[lang][type]);  // FIXED
        }

        retryCount++;
        retries.textContent = translations[lang].retries + retryCount;
    });
});

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}



function generateColors(category) {
    const colorInput = document.getElementById('colorCount');
    if (!colorInput) return;

    const count = parseInt(colorInput.value) || 6;
    const paletteDiv = category.querySelector('.palette');
    paletteDiv.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        const colorDiv = document.createElement('div');
        colorDiv.style.background = color;
        colorDiv.style.width = '30px';
        colorDiv.style.height = '30px';
        colorDiv.style.borderRadius = '4px';
        colorDiv.style.cursor = 'pointer';
        colorDiv.setAttribute('title', color);
        
        colorDiv.addEventListener('click', () => {
            navigator.clipboard.writeText(color);
        });
        
        paletteDiv.appendChild(colorDiv);
    }

    // Update or create .copy-text with the correct language
    let copyText = category.querySelector('.copy-text');
    const lang = document.getElementById("language-selector").value; // Get selected language
    if (!copyText) {
        copyText = document.createElement('div');
        copyText.classList.add('copy-text');
        copyText.style.marginTop = '5px';
        copyText.style.fontSize = '12px';
        copyText.style.color = '#555';
        paletteDiv.insertAdjacentElement('afterend', copyText);
    }
    copyText.textContent = translations[lang].copyText; // Apply correct language
}