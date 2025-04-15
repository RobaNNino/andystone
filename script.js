/**
 * Andystone Website JavaScript
 * Interactivity and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTop = document.querySelector('.scroll-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sliderDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .reveal-card');

    // Variables
    let currentSlide = 0;
    let isScrolling = false;

    // Initialize
    filterProducts('all');
    checkScroll();
    revealOnScroll();

    /**
     * Mobile Navigation
     */
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    /**
     * Sticky Header on Scroll
     */
    window.addEventListener('scroll', function() {
        checkScroll();
        revealOnScroll();
        animateOnScroll();
        
        // Throttle scroll event
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(function() {
                isScrolling = false;
            }, 100);
        }
    });

    function checkScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollToTop.classList.remove('active');
        }
    }

    /**
     * Scroll to Top Button
     */
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /**
     * Product Filtering
     */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('active');
                }, 100);
            } else {
                card.classList.remove('active');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    /**
     * Testimonial Slider
     */
    function updateSlider() {
        // Reset all slides
        testimonialCards.forEach((card, index) => {
            card.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
        
        // Update dots
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });

    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    });

    // Auto slide every 5 seconds
    setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);

    /**
     * Contact Form Submission
     */
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission (in a real project, you would send data to a server)
        setTimeout(function() {
            formSuccess.classList.add('active');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formSuccess.classList.remove('active');
            }, 5000);
        }, 1000);
    });

    /**
     * Scroll Reveal Animations
     */
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    /**
     * Scroll-triggered Animations for Cards
     */
    function animateOnScroll() {
        const cards = document.querySelectorAll('.product-card.active, .testimonial-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const scrollPosition = window.scrollY;
            
            // Calculate rotation based on scroll position
            const rotationX = Math.min(10, Math.max(-10, (cardTop - (window.innerHeight / 2)) / 20));
            const rotationY = Math.min(10, Math.max(-10, (card.offsetLeft - (window.innerWidth / 2)) / 40));
            
            // Apply transform with subtle rotation
            card.style.transform = `translateY(-${Math.min(15, Math.max(0, (window.innerHeight - cardTop) / 40))}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
    }

    /**
     * Smooth Scroll for Navigation Links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Parallax Effect for Sections
     */
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrollPosition = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
        
        // Parallax effect for shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed') || 0.1);
            const yPos = -(window.scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    /**
     * Adds an interactive hover effect to product cards
     */
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateY = (mouseX - cardCenterX) / 15;
            const rotateX = (cardCenterY - mouseY) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    /**
     * Animated Counter for Stats
     */
    const stats = document.querySelectorAll('.stat h3');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 20); // Update every 20ms
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toString().includes('+') ? 
                    target + '+' : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString().includes('+') ? 
                    Math.floor(current) + '+' : Math.floor(current);
            }
        }, 20);
    }
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });

    /**
     * Dynamic content loading on scroll
     */
    const processSteps = document.querySelectorAll('.process-step');
    let stepsLoaded = 0;
    
    function loadProcessSteps() {
        if (stepsLoaded < processSteps.length) {
            const currentStep = processSteps[stepsLoaded];
            
            if (currentStep.getBoundingClientRect().top < window.innerHeight - 100) {
                setTimeout(() => {
                    currentStep.classList.add('active');
                    stepsLoaded++;
                    loadProcessSteps();
                }, 300);
            }
        }
    }
    
    window.addEventListener('scroll', loadProcessSteps);
    loadProcessSteps(); // Initial check

    /**
     * 3D Tilt Effect on Hero Image
     */
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        document.addEventListener('mouseleave', function() {
            heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});