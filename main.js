
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// Theme Toggle Logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Light Mode';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeBtn.textContent = 'Light Mode';
    } else {
        themeBtn.textContent = 'Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

const cityData = {
    'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&w=600&q=80',
    'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    'Seoul': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    'Sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    'Cairo': 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=600&q=80',
    'Rio de Janeiro': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
    'Moscow': 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?auto=format&fit=crop&w=600&q=80'
};

const soulmateData = {
    'Paris': {
        male: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', // Artistic male portrait
        female: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' // Artistic female portrait
    },
    'Tokyo': {
        male: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=600&q=80', // Sharp/Clean style
        female: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80' // Modern/Street style
    },
    'New York': {
        male: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', // Business/Urban style
        female: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80' // Urban chic
    },
    'London': {
        male: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', // Classic/Sophisticated
        female: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' // Classic beauty
    },
    'Seoul': {
        male: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', // Trendy/Modern
        female: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80' // K-style/Fashion
    },
    'Sydney': {
        male: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=600&q=80', // Surfer/Outdoorsy
        female: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' // Sunny/Vibrant
    },
    'Rome': {
        male: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80', // Mediterranean/Warm
        female: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' // Classic Italian vibe
    },
    'Cairo': {
        male: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?auto=format&fit=crop&w=600&q=80', // Intense/Desert vibe
        female: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80' // Mystic/Elegant
    },
    'Rio de Janeiro': {
        male: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=600&q=80', // Friendly/Warm
        female: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80' // Tropical/Lively
    },
    'Moscow': {
        male: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80', // Serious/Cold
        female: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' // Striking features
    }
};

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image preview">`;
        };
        reader.readAsDataURL(file);
    }
});

analyzeBtn.addEventListener('click', () => {
    if (!imageUpload.files[0]) {
        resultDiv.textContent = 'Please upload an image first!';
        return;
    }

    resultDiv.textContent = 'Analyzing...';
    resultDiv.style.opacity = '0.5';

    // Mock analysis
    setTimeout(() => {
        const cities = Object.keys(cityData);
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const imageUrl = cityData[randomCity];
        
        resultDiv.style.opacity = '1';
        resultDiv.innerHTML = `
            <p>You look like you're from ${randomCity}!</p>
            <img src="${imageUrl}" alt="${randomCity}" class="city-image">
            <div class="soulmate-container">
                <p>Curious about your soulmate in ${randomCity}?</p>
                <div class="soulmate-buttons">
                    <button class="soulmate-btn" onclick="showSoulmate('${randomCity}', 'male')">Show Him</button>
                    <button class="soulmate-btn" onclick="showSoulmate('${randomCity}', 'female')">Show Her</button>
                </div>
                <div id="soulmateResult"></div>
            </div>
        `;
    }, 2000);
});

window.showSoulmate = (city, gender) => {
    const soulmateResult = document.getElementById('soulmateResult');
    const imageUrl = soulmateData[city][gender];
    
    soulmateResult.innerHTML = `
        <p>Your soulmate in ${city}:</p>
        <img src="${imageUrl}" alt="Soulmate" class="city-image fade-in">
    `;
};
