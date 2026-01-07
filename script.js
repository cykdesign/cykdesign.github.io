// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    root.classList.add('theme-dark');
    themeIcon.src = 'svg/dark.svg';
} else {
    themeIcon.src = 'svg/light.svg';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    root.classList.toggle('theme-dark');
    const isDark = root.classList.contains('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.src = isDark ? 'svg/dark.svg' : 'svg/light.svg';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip smooth scroll for contact triggers (handled by modal)
        if (this.id === 'contact-trigger') {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.borderBottomColor = 'var(--border-color)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'transparent';
    }
}
window.addEventListener('scroll', updateNavbar);
// Set initial state
updateNavbar();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items and stats
document.querySelectorAll('.portfolio-item, .stat-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});


// Portfolio Navigation - Labels only on mobile, no swiping
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    // Initialize labels and add click handlers
    const portfolioLabels = document.querySelectorAll('.portfolio-label');
    if (portfolioLabels.length > 0) {
        const items = portfolioGrid.querySelectorAll('.portfolio-item');
        
        portfolioLabels.forEach((label, index) => {
            label.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    // Mobile: Show only the selected item
                    items.forEach((item, i) => {
                        if (i === index) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                    
                    // Update active label
                    portfolioLabels.forEach((l, i) => {
                        if (i === index) {
                            l.classList.add('active');
                        } else {
                            l.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
}

// Contact Modal
const contactModal = document.getElementById('contact-modal');
const modalClose = contactModal ? contactModal.querySelector('.modal-close') : null;
const modalOverlay = contactModal ? contactModal.querySelector('.modal-overlay') : null;
const contactTrigger = document.getElementById('contact-trigger');

// Random fun fact display
function showRandomFunFact() {
    const funFacts = document.querySelectorAll('.fun-fact-text');
    if (funFacts.length > 0) {
        // Hide all facts
        funFacts.forEach(fact => {
            fact.style.display = 'none';
        });
        // Show random fact
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        funFacts[randomIndex].style.display = 'block';
    }
}

function openModal() {
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showRandomFunFact();
    }
}

function closeModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (contactTrigger) {
    contactTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Handle mobile contact trigger
const contactTriggerMobile = document.getElementById('contact-trigger-mobile');
if (contactTriggerMobile) {
    contactTriggerMobile.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (contactModal && contactModal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Form submission - only target contact modal form, not password forms
const contactForm = document.querySelector('#contact-modal .contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('modal-name').value;
        const email = document.getElementById('modal-email').value;
        const youAre = document.getElementById('modal-you-are').value;
        const subject = document.getElementById('modal-subject').value;
        const message = document.getElementById('modal-message').value;
        
        // Construct email subject
        const emailSubject = encodeURIComponent(`Contact from ${name} - ${subject || 'Portfolio Inquiry'}`);
        
        // Construct email body
        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `You are: ${youAre}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}`
        );
        
        // Create mailto link
        const mailtoLink = `mailto:cykdesignworks@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show confirmation
        alert('Thank you for your message! Your email client will open to send the message.');
        contactForm.reset();
        closeModal();
    });
}

// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Typing effect with alternating titles
function typeWriter(element, text, speed = 100, onComplete) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (onComplete) {
                onComplete();
            }
        }
    }
    
    type();
}

function deleteText(element, speed = 50, onComplete) {
    const text = element.textContent;
    let i = text.length;
    
    function deleteChar() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(deleteChar, speed);
        } else {
            if (onComplete) {
                onComplete();
            }
        }
    }
    
    deleteChar();
}

// Initialize alternating typing effect
const typingText = document.getElementById('typing-text');
const cursor = document.querySelector('.typing-cursor');

if (typingText && cursor) {
    const titles = ['Product Designer', 'Experience Designer', 'Growth Designer', 'AI Enthusiast', 'Coffee Lover'];
    let currentIndex = 0;
    let isTyping = false;
    
    function startTyping() {
        if (isTyping) return;
        isTyping = true;
        cursor.style.opacity = '1';
        
        const currentTitle = titles[currentIndex];
        
        typeWriter(typingText, currentTitle, 80, () => {
            // After typing completes, wait 2 seconds, then delete
            setTimeout(() => {
                deleteText(typingText, 50, () => {
                    // Switch to next title
                    currentIndex = (currentIndex + 1) % titles.length;
                    // Wait a bit before typing next title
                    setTimeout(() => {
                        isTyping = false;
                        startTyping();
                    }, 300);
                });
            }, 2000);
        });
    }
    
    // Wait a bit for the page to render, then start typing
    setTimeout(() => {
        startTyping();
    }, 500);
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Coffee consumption counter
function calculateCoffeeConsumption() {
    // Start date: 8 years ago (matching experience)
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 8);
    
    // Current date
    const currentDate = new Date();
    
    // Calculate days difference
    const timeDiff = currentDate - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // 1 cup per day, 0.24 liters per cup (8 oz)
    const litersPerCup = 0.24;
    const totalLiters = daysDiff * litersPerCup;
    
    return Math.floor(totalLiters);
}

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Initialize coffee counter when page loads
const coffeeCounter = document.getElementById('coffee-counter');
if (coffeeCounter) {
    const totalLiters = calculateCoffeeConsumption();
    animateCounter(coffeeCounter, totalLiters);
}

// Cursor-following tooltip for stat items (desktop)
const statItems = document.querySelectorAll('.stat-item');
let tooltip = null;

// Create tooltip element
function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.className = 'stat-tooltip';
    document.body.appendChild(tooltip);
    return tooltip;
}

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Initialize tooltip
if (statItems.length > 0) {
    createTooltip();
    
    statItems.forEach(item => {
        const noteElement = item.querySelector('.stat-note');
        if (!noteElement) return;
        
        const noteText = noteElement.textContent;
        
        // Desktop: hover tooltip
        item.addEventListener('mouseenter', () => {
            if (!isMobile() && tooltip) {
                tooltip.textContent = noteText;
                tooltip.classList.add('visible');
            }
        });
        
        item.addEventListener('mousemove', (e) => {
            if (!isMobile() && tooltip) {
                // Position tooltip next to cursor with offset
                const offset = 15;
                tooltip.style.left = (e.clientX + offset) + 'px';
                tooltip.style.top = (e.clientY + offset) + 'px';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!isMobile() && tooltip) {
                tooltip.classList.remove('visible');
            }
        });
        
        // Mobile: click to toggle note within box
        item.addEventListener('click', (e) => {
            if (isMobile()) {
                e.stopPropagation();
                // Clear any existing timeout for this item
                if (item._timeoutId) {
                    clearTimeout(item._timeoutId);
                    item._timeoutId = null;
                }
                // Toggle active class on clicked item
                const isActive = item.classList.contains('active');
                // Close all other items
                statItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        // Clear timeouts for other items
                        if (otherItem._timeoutId) {
                            clearTimeout(otherItem._timeoutId);
                            otherItem._timeoutId = null;
                        }
                    }
                });
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                    // Auto-close after 5 seconds
                    item._timeoutId = setTimeout(() => {
                        item.classList.remove('active');
                        item._timeoutId = null;
                    }, 5000);
                }
            }
        });
    });
    
    // Close stat notes when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (isMobile()) {
            const clickedStatItem = e.target.closest('.stat-item');
            if (!clickedStatItem) {
                statItems.forEach(item => {
                    item.classList.remove('active');
                    // Clear timeout when closing
                    if (item._timeoutId) {
                        clearTimeout(item._timeoutId);
                        item._timeoutId = null;
                    }
                });
            }
        }
    });
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Hide tooltip on mobile
            if (isMobile() && tooltip) {
                tooltip.classList.remove('visible');
            }
            // Close all active stat items when switching to desktop
            if (!isMobile()) {
                statItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
            }, 250);
        });
    }

// Desktop Portfolio Carousel with 3D Animation
function initPortfolioCarousel() {
    if (window.innerWidth <= 768) return; // Only for desktop
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    const items = portfolioGrid.querySelectorAll('.portfolio-item');
    if (items.length === 0) return;
    
    let currentIndex = 0;
    let isTransitioning = false;
    let previousIndex = 0;
    
    function updateCarousel(direction = null) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        items.forEach((item, index) => {
            // Remove all classes
            item.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-from-left', 'slide-in-from-right');
            
            if (index === currentIndex) {
                // Instant transition - no animation
                item.classList.add('active');
            }
        });
        
        // Update indicators
        const indicators = document.querySelectorAll('.portfolio-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update labels
        const labels = document.querySelectorAll('.portfolio-label');
        labels.forEach((label, index) => {
            if (index === currentIndex) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
        
        isTransitioning = false;
    }
    
    function nextSlide() {
        previousIndex = currentIndex;
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel('next');
    }
    
    function prevSlide() {
        previousIndex = currentIndex;
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel('prev');
    }
    
    // Initialize
    updateCarousel();
    
    // Handle indicator clicks
    const indicators = document.querySelectorAll('.portfolio-indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Handle portfolio label clicks
    const portfolioLabels = document.querySelectorAll('.portfolio-label');
    portfolioLabels.forEach((label, index) => {
        label.addEventListener('click', () => {
            previousIndex = currentIndex;
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    portfolioGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    portfolioGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initPortfolioCarousel, 100);
    });
} else {
    setTimeout(initPortfolioCarousel, 100);
}

// Re-initialize on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initPortfolioCarousel();
    }, 250);
});
