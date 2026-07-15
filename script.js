// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
}
navSlide();

// Typewriter Effect
const texts = ["Data Analyst", "Machine Learning Enthusiast", "BI Dashboard Developer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const speed = 80;
const eraseSpeed = 40;

function type() {
    if (count === texts.length) { count = 0; }
    currentText = texts[count];
    
    if(index < currentText.length) {
        letter = currentText.slice(0, ++index);
        document.querySelector('.typewriter').textContent = letter;
        setTimeout(type, speed);
    } else {
        setTimeout(erase, 2500);
    }
}

function erase() {
    if(index > 0) {
        letter = currentText.slice(0, --index);
        document.querySelector('.typewriter').textContent = letter;
        setTimeout(erase, eraseSpeed);
    } else {
        count++;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if(document.querySelector('.typewriter')) type();
});

// Scroll Reveal & Active Links & Progress Bars & Counters
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const progressFills = document.querySelectorAll('.progress-fill');
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const scrollObserver = () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Reveal Elements
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });

    // Active Nav Links
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(a => {
                a.classList.remove('active');
                if(a.getAttribute('href').includes(sectionId)) {
                    a.classList.add('active');
                }
            });
        }
    });

    // Animate Progress Bars
    progressFills.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if(barTop < windowHeight - 50) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });

    // Animate Counters
    if(document.querySelector('.achievements-section')) {
        const achTop = document.querySelector('.achievements-section').getBoundingClientRect().top;
        if(achTop < windowHeight - 100 && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (counter.hasAttribute('data-plus') ? '+' : '');
                    }
                };
                updateCounter();
            });
        }
    }
}

window.addEventListener('scroll', scrollObserver);
scrollObserver(); // Trigger once on load

// Initialize Particles.js (subtle grid/dots for premium feel)
if(typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#94A3B8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": false },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": true, "distance": 200, "color": "#3B82F6", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": false },
                "resize": true
            },
            "modes": { "grab": { "distance": 150, "line_linked": { "opacity": 0.3 } } }
        },
        "retina_detect": true
    });
}
