// Initialisation de AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Gestion du menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Animation du bouton pendant l'envoi
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    try {
        // Ici, vous pouvez ajouter votre logique d'envoi de formulaire
        // Par exemple, utiliser fetch pour envoyer les données à un backend
        console.log('Données du formulaire:', data);
        
        // Simulation d'un délai d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Message de succès
        alert('Message envoyé avec succès !');
        contactForm.reset();
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
        // Restaurer le bouton
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Gestion du scroll pour la navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll vers le bas
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll vers le haut
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animation des compétences
const skillCategories = document.querySelectorAll('.skill-category');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'all 0.5s ease-out';
    observer.observe(category);
});

// Animation des projets au survol
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Function to switch language
    function switchLanguage(lang) {
        // Update active button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Show/hide language-specific elements
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.dataset.lang === lang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });

        // Update section IDs for navigation
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (lang === 'en') {
                if (link.getAttribute('href') === '#accueil') link.setAttribute('href', '#home');
                if (link.getAttribute('href') === '#competences') link.setAttribute('href', '#skills');
                if (link.getAttribute('href') === '#projets') link.setAttribute('href', '#projects');
            } else {
                if (link.getAttribute('href') === '#home') link.setAttribute('href', '#accueil');
                if (link.getAttribute('href') === '#skills') link.setAttribute('href', '#competences');
                if (link.getAttribute('href') === '#projects') link.setAttribute('href', '#projets');
            }
        });

        // Update form placeholders
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        formInputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (lang === 'en') {
                if (placeholder === 'Votre nom') input.setAttribute('placeholder', 'Your name');
                if (placeholder === 'Votre email') input.setAttribute('placeholder', 'Your email');
                if (placeholder === 'Votre message') input.setAttribute('placeholder', 'Your message');
            } else {
                if (placeholder === 'Your name') input.setAttribute('placeholder', 'Votre nom');
                if (placeholder === 'Your email') input.setAttribute('placeholder', 'Votre email');
                if (placeholder === 'Your message') input.setAttribute('placeholder', 'Votre message');
            }
        });
    }

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Set initial language (French)
    switchLanguage('fr');
}); 