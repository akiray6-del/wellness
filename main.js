
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

    // Mock analysis
    setTimeout(() => {
        const cities = ['Paris', 'Tokyo', 'New York', 'London', 'Seoul', 'Sydney', 'Rome', 'Cairo', 'Rio de Janeiro', 'Moscow'];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        resultDiv.textContent = `You look like you're from ${randomCity}!`;
    }, 2000);
});
