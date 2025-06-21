const images = [
    'images/cat_1.jpeg',
    'images/cat_2.jpeg',
    'images/desigin.jpeg',
];

let currentIndex = 0;
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const dots = document.querySelectorAll('.dot');
let showingSlide1 = true;

function updateIndicators() {
    dots.forEach((dot, index)=> {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
function changeImage(nextIndex) {
    const nextImage = images[(nextIndex + images.length ) % images.length];


if (showingSlide1) {
    slide2.src = nextImage;
    slide2.classList.add('active');
    slide1.classList.remove('active');
} else {
    slide1.src = nextImage;
    slide1.classList.add('active');
    slide2.classList.remove('active');
}

currentIndex = (nextIndex + images.length) % images.length;
showingSlide1 = !showingSlide1;
updateIndicators();
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeImage(index);
    });
});

setInterval(() => {
    changeImage(currentIndex + 1);
}, 5000);

document.getElementById('prev').addEventListener('click', () => {
    changeImage(currentIndex - 1);
});

document.getElementById('next').addEventListener('click', () => {
    changeImage(currentIndex + 1);
});

