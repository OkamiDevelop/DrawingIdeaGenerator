
const translations = {
    en: {
        title: "𝓓𝓡𝓐𝓦𝓘𝓝𝓖 𝓘𝓓𝓔𝓐 𝓖𝓔𝓝𝓔𝓡𝓐𝓣𝓞𝓡",
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
        title: "𝓖𝓔𝓝𝓔𝓡𝓐𝓓𝓞𝓡 𝓓𝓔 𝓘𝓓𝓔𝓐𝓢 𝓓𝓔 𝓓𝓘𝓑𝓤𝓙𝓞𝓢",
        background: "Fondo:",
        foreground1: "Elemento de Primer Plano 1:",
        foreground2: "Elemento de Primer Plano 2:",
        sky: "Elemento en el Cielo:",
        land: "Elemento en el Suelo:",
        water: "Elemento en el Agua:",
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

        // Handle the "color-palette" category separately
        if (type === "color-palette") {
            category.querySelector("span").textContent = translations[lang].colorPalette;
            
            // Update or create the copyText for color palette here
            let copyText = category.querySelector('.copy-text');
            if (!copyText) {
                copyText = document.createElement('div');
                copyText.classList.add('copy-text');
                copyText.style.marginTop = '5px';
                copyText.style.fontSize = '12px';
                copyText.style.color = '#555';
                category.querySelector('.palette').insertAdjacentElement('afterend', copyText);
            }
            copyText.textContent = translations[lang].copyText; // Apply correct language
        } else {
            // Update category labels and buttons
            category.querySelector("span").textContent = translations[lang][type];
        }

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
            let index = categories.en[type]?.indexOf(previousText); // Check English list
            if (index === -1) {
                index = categories.es[type]?.indexOf(previousText); // Check Spanish list
            }
            if (index !== -1) {
                result.textContent = categories[lang][type][index]; // Apply correct translation
            }
        }
    });
}


// Initialize the language selector
document.getElementById("language-selector").addEventListener("change", (e) => {
    changeLanguage(e.target.value);
});
