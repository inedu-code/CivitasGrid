document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Dropdown menu for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                menu.classList.toggle('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.modern-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Image slider
    const images = document.querySelectorAll('.image-container img');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showImage(index));
    });
    
    // Auto slide change
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }, 5000);
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in:not(.animated)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});





// Animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize counters when section is in view
const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

if(statsSection) {
    statsObserver.observe(statsSection);
}

// Case study carousel
let currentCase = 0;
const cases = document.querySelectorAll('.case-study');
const caseDots = document.querySelectorAll('.case-studies .dot');

function showCase(index) {
    cases.forEach(caseStudy => caseStudy.classList.remove('active'));
    caseDots.forEach(dot => dot.classList.remove('active'));
    
    cases[index].classList.add('active');
    caseDots[index].classList.add('active');
    currentCase = index;
}

caseDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showCase(index));
});

document.querySelector('.case-studies .prev').addEventListener('click', () => {
    currentCase = (currentCase - 1 + cases.length) % cases.length;
    showCase(currentCase);
});

document.querySelector('.case-studies .next').addEventListener('click', () => {
    currentCase = (currentCase + 1) % cases.length;
    showCase(currentCase);
});

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonials-section .dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

document.querySelector('.testimonials-section .prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.querySelector('.testimonials-section .next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-rotate carousels
setInterval(() => {
    currentCase = (currentCase + 1) % cases.length;
    showCase(currentCase);
}, 8000);

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 10000);
