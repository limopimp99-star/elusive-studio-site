class ElusiveFeatures extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; background: #050505; padding: 6rem 2rem; }
                .grid { 
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                    gap: 2rem; max-width: 1400px; margin: 0 auto;
                }
                .card {
                    background: #111; border: 1px solid #222; padding: 2.5rem;
                    border-radius: 12px; transition: 0.3s;
                }
                .card:hover { border-color: #ef4444; transform: translateY(-5px); }
                .icon { font-size: 2rem; margin-bottom: 1rem; }
                h3 { color: white; margin-bottom: 0.5rem; font-size: 1.5rem; }
                p { color: #888; line-height: 1.5; }
            </style>
            
            <div class="grid" id="services">
                <div class="card">
                    <div class="icon">🧬</div>
                    <h3>AI Cloning</h3>
                    <p>We build your digital twin. Content generation that looks, sounds, and thinks like you, running 24/7.</p>
                </div>
                <div class="card">
                    <div class="icon">⚖️</div>
                    <h3>LLC & Legal</h3>
                    <p>Full business formation. We handle the LLC filing, EIN, and structure so you own your IP properly.</p>
                </div>
                <div class="card">
                    <div class="icon">📡</div>
                    <h3>Multi-Restreaming</h3>
                    <p>Broadcast your feed to Twitch, Kick, YouTube, and TikTok simultaneously. One input, infinite reach.</p>
                </div>
                <div class="card">
                    <div class="icon">🛍️</div>
                    <h3>Storefronts</h3>
                    <p>Custom e-commerce setups designed for high-conversion social traffic. We build the shop, you sell the dream.</p>
                </div>
                <div class="card">
                    <div class="icon">🎥</div>
                    <h3>Production & Editing</h3>
                    <p>Our team chops your VODs into viral shorts/reels daily. You record once, we edit forever.</p>
                </div>
                <div class="card">
                    <div class="icon">🤝</div>
                    <h3>Team Building</h3>
                    <p>We recruit and train your mods, admins, and personal assistants.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('elusive-features', ElusiveFeatures);
const canvas = document.getElementById('liquid-bg');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i=0; i<30; i++) particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
        r: Math.random() * 2 + 1
    });
}

function draw() {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > w) p.vx *= -1;
        if(p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if(window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

init(); draw();