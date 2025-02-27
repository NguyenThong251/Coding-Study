// Navigation scrolling effect
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !e.target.closest('.menu-toggle') && !e.target.closest('.nav-menu')) {
        navMenu.classList.remove('active');
    }
});

// Offers slider functionality
const nextOfferBtn = document.getElementById('next-offer');
const prevOfferBtn = document.getElementById('prev-offer');
let currentOfferIndex = 0;
const offers = document.querySelectorAll('.offer');
const offerWidth = 100; // percentage width

// Hide all offers except the first one
for (let i = 1; i < offers.length; i++) {
    offers[i].style.display = 'none';
}

// Only add event listeners if there are multiple offers
if (offers.length > 1) {
    nextOfferBtn.addEventListener('click', () => {
        showOffer((currentOfferIndex + 1) % offers.length);
    });

    prevOfferBtn.addEventListener('click', () => {
        showOffer((currentOfferIndex - 1 + offers.length) % offers.length);
    });
}

function showOffer(index) {
    offers[currentOfferIndex].style.display = 'none';
    offers[index].style.display = 'flex';
    currentOfferIndex = index;
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.destination-card, .testimonial, .offer');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.destination-card, .testimonial, .offer').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run the animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();

// Form submission (for newsletter)
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() === '') {
            alert('Please enter your email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});