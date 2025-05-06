// AOS Initialization
AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('header nav ul'); // Changed variable name for clarity

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
        document.body.classList.toggle('nav-open'); // For styling the hamburger icon
    });
}

// Smooth scrolling for anchor links (including Back to Top)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav if open and a link is clicked
            if (navMenu && navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                document.body.classList.remove('nav-open');
            }
        }
    });
});

// Update current year in footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Active navigation link highlighting on scroll
const mainSections = document.querySelectorAll('main section[id]');
const headerNavLinks = document.querySelectorAll('header nav ul li a');

function updateActiveNavLink() {
    if (!mainSections.length || !headerNavLinks.length) return; // Exit if no sections or links

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150; // Offset to trigger a bit earlier

    mainSections.forEach(section => {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            currentSectionId = section.getAttribute('id');
        }
    });

    headerNavLinks.forEach(link => {
        link.classList.remove('active');
        // href is like "#about", id is "about"
        if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
}

// Initial call and event listener for nav highlighting
if (mainSections.length > 0 && headerNavLinks.length > 0) {
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// Back to Top Button Visibility
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    // The click functionality (scrolling to #hero) is already handled by
    // the 'Smooth scrolling for anchor links' part above,
    // as .back-to-top is an a[href^="#"]
}