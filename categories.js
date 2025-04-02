const categories = {
    en: {
        background: ["Forest", "Sea", "Desert", "Mountains", "City", "Space"],
        foreground1: ["Tree", "Rock", "House", "Statue", "Bridge", "Vehicle"],
        foreground2: ["Animal", "Person", "Robot", "Fountain", "Bench", "Sign"],
        sky: ["Sun", "Moon", "Clouds", "Stars", "Birds", "Rainbow"],
        land: ["Grass", "Dirt", "Sand", "Snow", "Flowers", "Path"],
        water: ["Lake", "River", "Pond", "Waterfall", "Fountain", "Ocean"]
    },
    es: {
        background: ["Bosque", "Mar", "Desierto", "Montañas", "Ciudad", "Espacio"],
        foreground1: ["Árbol", "Roca", "Casa", "Estatua", "Puente", "Vehículo"],
        foreground2: ["Animal", "Persona", "Robot", "Fuente", "Banco", "Señal"],
        sky: ["Sol", "Luna", "Nubes", "Estrellas", "Pájaros", "Arcoíris"],
        land: ["Césped", "Tierra", "Arena", "Nieve", "Flores", "Camino"],
        water: ["Lago", "Río", "Estanque", "Cascada", "Fuente", "Océano"]
    }
};



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


const translations = {
    en: {
        title: "Drawing Generator",
        background: "Background:",
        foreground1: "Foreground Element 1:",
        foreground2: "Foreground Element 2:",
        sky: "Sky Element:",
        land: "Land Element:",
        water: "Water Element:",
        colorPalette: "Color Palette:",
        generate: "Generate!",
        retry: "Retry",
        retries: "Nº of retries: ",
        copyText: "Click a color to copy its Hex"
    },
    es: {
        title: "Generador de Dibujos",
        background: "Fondo:",
        foreground1: "Elemento de Primer Plano 1:",
        foreground2: "Elemento de Primer Plano 2:",
        sky: "Elemento del Cielo:",
        land: "Elemento del Suelo:",
        water: "Elemento del Agua:",
        colorPalette: "Paleta de Colores:",
        generate: "¡Generar!",
        retry: "Reintentar",
        retries: "Nº de reintentos: ",
        copyText: "Haz clic en un color para copiar su Hex"
    }
};

function changeLanguage(lang) {
    document.getElementById("title").textContent = translations[lang].title;

    document.querySelectorAll(".category").forEach(category => {
        const type = category.dataset.type;
        
        // Update category labels and buttons
        category.querySelector("span").textContent = translations[lang][type];
        category.querySelector(".generate").textContent = translations[lang].generate;
        category.querySelector(".retry").textContent = translations[lang].retry;

        // Update retry count text
        const retries = category.querySelector(".retries");
        const retryNumber = retries.textContent.match(/\d+/)?.[0] || "0"; // Extract current retry count
        retries.textContent = translations[lang].retries + retryNumber;

        // Translate the existing result instead of generating a new one
        const result = category.querySelector(".result");
        const previousText = result.textContent.trim();
        
        if (previousText !== "") {
            let index = categories.en[type].indexOf(previousText); // Check English list
            if (index === -1) {
                index = categories.es[type].indexOf(previousText); // Check Spanish list
            }
            if (index !== -1) {
                result.textContent = categories[lang][type][index]; // Apply correct translation
            }
        }
    });

    // Update color palette copy text
    const copyText = document.querySelector(".copy-text");
    if (copyText) copyText.textContent = translations[lang].copyText;
}

// Initialize the language selector
document.getElementById("language-selector").addEventListener("change", (e) => {
    changeLanguage(e.target.value);
});


