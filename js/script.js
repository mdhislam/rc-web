// Video Background Cycling
document.addEventListener('DOMContentLoaded', function() {
    const videos = [
        'assets/videos/kitchen.mp4',
        'assets/videos/kitchen-2.mp4',
        'assets/videos/livingroom.mp4',
        'assets/videos/bathroom.mp4'
    ];
    
    let currentVideoIndex = 0;
    const videoElement = document.getElementById('background-video');
    
    function cycleVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videos[currentVideoIndex];
        
        // Create a new video element to preload
        const nextVideoElement = document.createElement('video');
        nextVideoElement.src = nextVideo;
        nextVideoElement.autoplay = true;
        nextVideoElement.muted = true;
        nextVideoElement.loop = false;
        nextVideoElement.style.position = 'absolute';
        nextVideoElement.style.top = '0';
        nextVideoElement.style.left = '0';
        nextVideoElement.style.width = '100%';
        nextVideoElement.style.height = '100%';
        nextVideoElement.style.objectFit = 'cover';
        nextVideoElement.style.opacity = '0';
        nextVideoElement.style.transition = 'opacity 1s ease-in-out';
        
        // Add the new video to the container
        videoElement.parentNode.appendChild(nextVideoElement);
        
        // Wait for the new video to load
        nextVideoElement.addEventListener('loadeddata', function() {
            // Fade in the new video
            setTimeout(() => {
                nextVideoElement.style.opacity = '0.3';
                videoElement.style.opacity = '0';
            }, 100);
            
            // Remove the old video after transition
            setTimeout(() => {
                videoElement.parentNode.removeChild(videoElement);
                nextVideoElement.id = 'background-video';
                // Set up the cycle for the next video
                nextVideoElement.addEventListener('ended', cycleVideo);
            }, 1100);
        });
        
        // Fallback in case video doesn't load
        setTimeout(() => {
            if (nextVideoElement.readyState < 2) {
                console.log('Video loading timeout, cycling to next');
                cycleVideo();
            }
        }, 5000);
    }
    
    // Start the cycling when the first video ends
    videoElement.addEventListener('ended', cycleVideo);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Quote form handling
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);
            
            // Basic form validation
            if (!data.name || !data.phone || !data.email || !data.service || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[\s\.\-\(\)]*([0-9][\s\.\-\(\)]*){10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // In a real application, you would send this data to your server
            console.log('Quote request data:', data);
            
            // Create mailto link as fallback
            const subject = encodeURIComponent(`Quote Request - ${data.service}`);
            const body = encodeURIComponent(`
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service: ${data.service}
Address: ${data.address || 'Not provided'}

Message:
${data.message}
            `);
            
            // Simulate processing time
            setTimeout(() => {
                // Try to open email client
                const mailtoLink = `mailto:info@akrealtyandconstruction.com?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
                
                // Show success message
                alert('Thank you for your quote request! We will contact you soon. If your email client didn\'t open automatically, please call us directly at (718) 986-8012.');
                
                // Reset form
                quoteForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.team-member, .service-category, .highlight-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Add mobile navigation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(241, 239, 236, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            backdrop-filter: blur(10px);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
            display: flex;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Modal functionality
const modal = document.getElementById('quoteModal');
const openQuoteModalBtn = document.getElementById('openQuoteModal');
const openQuoteModalCTABtn = document.getElementById('openQuoteModalCTA');
const closeModalBtn = document.querySelector('.close');

// Open modal functions
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for opening modal
openQuoteModalBtn.addEventListener('click', openModal);
openQuoteModalCTABtn.addEventListener('click', openModal);

// Event listeners for closing modal
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Quote form submission
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.service || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Show success message
    alert('Thank you for your quote request! We will contact you within 24 hours.');
    
    // Reset form and close modal
    this.reset();
    closeModal();
    
    // In a real application, you would send this data to your server
    console.log('Quote request submitted:', data);
});

// Lazy loading for images
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // This will trigger loading if not already loaded
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial video
    const videoElement = document.getElementById('background-video');
    videoElement.src = videos[0];
    
    // Add loading class removal after page load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}); 