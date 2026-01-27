class ElusiveHero extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .hero {
                    min-height: 85vh; display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; text-align: center;
                    position: relative; overflow: hidden;
                    padding: 0 1.5rem;
                    background: transparent; 
                }
                
                /* Floating Plus Signs */
                .plus {
                    position: absolute; color: #ef4444; font-weight: 900;
                    font-family: sans-serif; user-select: none; pointer-events: none;
                    animation: float-plus 8s ease-in-out infinite;
                    z-index: 1;
                }
                @keyframes float-plus {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
                    50% { transform: translateY(-40px) rotate(45deg); opacity: 0.5; }
                }

                h1 { 
                    font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 900; line-height: 1.1; 
                    margin-bottom: 1.5rem; text-transform: uppercase; color: white;
                    position: relative; z-index: 2;
                }
                
                .rainbow {
                    background: linear-gradient(90deg, #ef4444, #ff7f00, #ffff00, #ef4444);
                    background-size: 300%; -webkit-background-clip: text;
                    background-clip: text; color: transparent;
                    animation: rainbow-move 4s linear infinite;
                }
                @keyframes rainbow-move { from { background-position: 0% 50%; } to { background-position: 300% 50%; } }
                
                p { 
                    color: #ddd; 
                    font-size: clamp(1rem, 4vw, 1.3rem); 
                    max-width: 700px; 
                    margin: 0 auto 3rem auto; 
                    font-weight: 500; 
                    position: relative; 
                    z-index: 2;
                    line-height: 1.5;
                }
                
                .btn {
                    padding: 1.2rem 4rem; background: #ef4444; color: white;
                    text-decoration: none; border-radius: 50px; font-weight: 900; text-transform: uppercase;
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.5); transition: 0.3s;
                    position: relative; z-index: 2;
                    display: inline-block;
                }
                .btn:hover { transform: scale(1.05); background: white; color: #ef4444; }

                /* Mobile Adjustment for Traffic Optimization */
                @media (max-width: 600px) {
                    .plus { display: none; } /* Keeps it clean for 300+ viewers */
                    .hero { padding-top: 4rem; }
                }
            </style>
            
            <section class="hero">
                <div class="plus" style="top: 15%; left: 10%; font-size: 4rem; animation-delay: 0s;">+</div>
                <div class="plus" style="top: 25%; right: 15%; font-size: 3rem; animation-delay: 2s;">+</div>
                <div class="plus" style="bottom: 20%; left: 20%; font-size: 5rem; animation-delay: 4s;">+</div>
                <div class="plus" style="bottom: 30%; right: 5%; font-size: 2rem; animation-delay: 1s;">+</div>

                <h1 class="rainbow">Ignite your social life</h1>
                
                <p>THE JERRY MAGUIRE FOR CONTENT CREATORS AND ARTISTS. WE DON'T JUST MANAGE; WE BUILD EMPIRES, LLC SETUP, AND 24/7 SUPPORT ON ALL PLATFORMS.</p>
                
                <a href="#pricing" class="btn" onclick="document.getElementById('pricing').scrollIntoView({behavior: 'smooth'}); return false;">JOIN NOW</a>
            </section>
        `;
    }
}
customElements.define('elusive-hero', ElusiveHero);
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