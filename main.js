import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initAudioControl();
    initNavigation();
});

function initAnimations() {
    // Hero section animations
    const tl = gsap.timeline();
    
    tl.from('.line-1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.line-2', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    }, '-=1')
    .from('.glowing-text', {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-awards', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-cta .cta-btn', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.3');

    // Scroll-triggered animations
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%'
        },
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.profile-frame', {
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 70%'
        },
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        rotation: 10,
        ease: 'power3.out'
    });

    // Portfolio items animation
    gsap.from('.portfolio-item', {
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 70%'
        },
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Timeline animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // Instagram posts animation
    gsap.from('.instagram-post', {
        scrollTrigger: {
            trigger: '.instagram-feed',
            start: 'top 70%'
        },
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Contact section animation
    gsap.from('.contact-title', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%'
        },
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    gsap.from('.contact-btn', {
        scrollTrigger: {
            trigger: '.contact-buttons',
            start: 'top 80%'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Continuous animations
    gsap.to('.lens-flare', {
        duration: 3,
        scale: 1.2,
        opacity: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
    });

    // Parallax effects
    gsap.to('.light-streaks', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        },
        x: '50px',
        ease: 'none'
    });
}

function initAudioControl() {
    const audio = document.getElementById('backgroundMusic');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = audioToggle.querySelector('.audio-icon');
    
    let isPlaying = false;
    
    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioIcon.textContent = '🎵';
            isPlaying = false;
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            audioIcon.textContent = '🔇';
            isPlaying = true;
        }
    });
}

function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .cta-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: target,
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });

    // Navigation background on scroll
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: '.nav'
        }
    });

    // Portfolio hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const frame = item.querySelector('.portfolio-frame');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(frame, {
                duration: 0.5,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255, 215, 0, 0.2)',
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(frame, {
                duration: 0.5,
                scale: 1,
                boxShadow: '0 0 0 rgba(255, 215, 0, 0)',
                ease: 'power2.out'
            });
        });
    });

    // Contact button hover effects
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.3,
                y: -5,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Intersection Observer for additional effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-title, .stat, .timeline-item').forEach(el => {
        observer.observe(el);
    });
});