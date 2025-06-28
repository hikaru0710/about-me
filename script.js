const images = [
    'images/cat_1.jpeg',
    'images/cat_2.jpeg',
    'images/design.jpeg', 
];

let currentIndex = 0;
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const dots = document.querySelectorAll('.dot');
let showingSlide1 = true;

function updateIndicators() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function changeImage(nextIndex) {
    nextIndex = (nextIndex + images.length) % images.length;
    const nextImage = images[nextIndex];

    if (showingSlide1) {
        slide2.src = nextImage;
        slide2.classList.add('active');
        slide1.classList.remove('active');
    } else {
        slide1.src = nextImage;
        slide1.classList.add('active');
        slide2.classList.remove('active');
    }

    currentIndex = nextIndex;
    showingSlide1 = !showingSlide1;
    updateIndicators();
}

function initializeSlideshow() {
    slide1.src = images[0];
    if (images.length > 1) {
        slide2.src = images[1];
    }
    updateIndicators();
}

// ハンバーガーメニュー
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
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

document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow();
    initializeHamburgerMenu();
});

