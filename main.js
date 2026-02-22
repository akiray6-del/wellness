
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
        `;
    }, 2000);
});
