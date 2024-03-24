// Coded by Corazon
/* ---------------- Slider Code here ------------------------ */
const images = [
    './Photos/slider1.jpg',
    './Photos/slider2.jpg',
    './Photos/slider3.jpg',
    './Photos/slider4.jpg'
];

let currentIndex = 0;
const slider = document.getElementById('slider');
const sliderIndicators = document.querySelector('.slider-indicators');
let intervalId;

function showImage(index) {
    if (index < 0) {
        index = images.length - 1;
    } else if (index >= images.length) {
        index = 0;
    }
    slider.src = images[index];
    currentIndex = index;
    updateIndicators();
}

function prev() {
    showImage(currentIndex - 1);
}

function next() {
    showImage(currentIndex + 1);
}

function createIndicator(index) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        showImage(index);
    });
    return dot;
}

function updateIndicators() {
    sliderIndicators.innerHTML = '';
    images.forEach((_, index) => {
        const dot = createIndicator(index);
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        sliderIndicators.appendChild(dot);
    });
}

function startSlider() {
    intervalId = setInterval(() => {
        next();
    }, 4000);
}

function stopSlider() {
    clearInterval(intervalId);
}

slider.addEventListener('mouseover', stopSlider);
slider.addEventListener('mouseleave', startSlider);

showImage(currentIndex);
startSlider();



/* ---------------- Slider Code here ------------------------ */
