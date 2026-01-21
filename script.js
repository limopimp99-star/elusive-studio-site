// CrimsonPulse NoirScape - Main JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CrimsonPulse NoirScape loaded 🚀');
    
    // Activate Feather Icons after a small delay to ensure DOM is ready
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, 100);
    
    // Dark mode toggle logic (though we start in dark mode)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            // Store preference in localStorage
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            // Add feedback animation
            darkModeToggle.classList.add('animate-spin');
            setTimeout(() => {
                darkModeToggle.classList.remove('animate-spin');
            }, 300);
        });
    }
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        if (savedDarkMode === 'true') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    // Intersection Observer for scroll animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add hover effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Handle click animations on interactive elements
    document.querySelectorAll('.interactive').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            // Style the ripple
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.pointerEvents = 'none';
            
            // Position the ripple at click location
            const rect = element.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 50) + 'px';
            ripple.style.top = (e.clientY - rect.top - 50) + 'px';
            
            // Add to element
            element.appendChild(ripple);
            
            // Remove after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
 class CrimsonFeatures extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Reuse your card styles, added grid tweaks */
                :host { display: block; width: 100%; background: #050505; }
                .features { padding: 5rem 2rem; max-width: 1400px; margin: 0 auto; }
                .section-header { text-align: center; margin-bottom: 4rem; }
                .section-title { 
                    font-size: 2.5rem; color: #fff; margin-bottom: 1rem; 
                    text-transform: uppercase; letter-spacing: 2px;
                }
                .section-desc { color: #888; max-width: 600px; margin: 0 auto; }
                
                .grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                    gap: 2rem; 
                }
                
                .card {
                    background: #111; border: 1px solid #333; padding: 2rem;
                    border-radius: 12px; transition: all 0.3s ease;
                    position: relative; overflow: hidden;
                }
                .card:hover { border-color: #ef4444; transform: translateY(-5px); }
                .card::after {
                    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                    background: #ef4444; transform: scaleX(0); transform-origin: left;
                    transition: transform 0.3s ease;
                }
                .card:hover::after { transform: scaleX(1); }
                
                .icon { font-size: 2rem; margin-bottom: 1rem; color: #ef4444; }
                .card-title { font-size: 1.25rem; color: #fff; margin-bottom: 0.5rem; font-weight: bold; }
                .card-text { color: #aaa; font-size: 0.9rem; line-height: 1.6; }
            </style>
            
            <section class="features">
                <div class="section-header">
                    <h2 class="section-title">The Management Suite</h2>
                    <p class="section-desc">Full-stack digital management. We handle the boring stuff, the technical stuff, and the impossible stuff.</p>
                </div>
                
                <div class="grid">
                    <div class="card">
                        <div class="icon">⚖️</div>
                        <h3 class="card-title">LLC & Business Formation</h3>
                        <p class="card-text">We build your fortress. Complete LLC creation, EIN registration, and business banking setup to protect your assets.</p>
                    </div>

                    <div class="card">
                        <div class="icon">🧬</div>
                        <h3 class="card-title">Digital Cloning & AI</h3>
                        <p class="card-text">Be everywhere at once. We create your AI Avatar (Digital Twin) for 24/7 content generation and interaction.</p>
                    </div>

                    <div class="card">
                        <div class="icon">📡</div>
                        <h3 class="card-title">Multi-Platform Restreaming</h3>
                        <p class="card-text">One signal, everywhere. Broadcast live to Twitch, YouTube, Kick, and TikTok simultaneously with our custom server setup.</p>
                    </div>

                    <div class="card">
                        <div class="icon">🕸️</div>
                        <h3 class="card-title">Web & App Development</h3>
                        <p class="card-text">Custom storefronts, mobile apps, and high-conversion landing pages designed to capture your traffic.</p>
                    </div>

                    <div class="card">
                        <div class="icon">🎬</div>
                        <h3 class="card-title">Production & Editing</h3>
                        <p class="card-text">Professional video editing, sound engineering, and content clipping teams at your disposal.</p>
                    </div>

                    <div class="card">
                        <div class="icon">📈</div>
                        <h3 class="card-title">Growth & SEO</h3>
                        <p class="card-text">Aggressive SEO strategies and community management to scale your audience organically.</p>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('crimson-features', CrimsonFeatures);