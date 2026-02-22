
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');

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
