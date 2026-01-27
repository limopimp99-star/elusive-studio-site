class ElusiveHero extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; width: 100%; }
                
                .hero {
                    min-height: 100vh; display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; text-align: center;
                    position: relative; overflow: hidden;
                    padding: 0 1.5rem;
                    background: #000; 
                }

                /* High-Res Background Image */
                .hero-bg-img {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    object-fit: cover;
                    z-index: 0;
                    opacity: 0.5;
                    filter: brightness(0.5) contrast(1.2);
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
                    50% { transform: translateY(-40px) rotate(45deg); opacity: 0.6; }
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 900px;
                }

                h1 { 
                    font-size: clamp(2.5rem, 8vw, 6.5rem); font-weight: 900; line-height: 1; 
                    margin-bottom: 1.5rem; text-transform: uppercase; color: white;
                    margin-top: 0;
                }
                
                /* Rainbow + Glow Animation */
                .rainbow {
                    background: linear-gradient(90deg, #ef4444, #ff7f00, #ffff00, #ef4444);
                    background-size: 300%; -webkit-background-clip: text;
                    background-clip: text; color: transparent;
                    animation: rainbow-move 4s linear infinite;
                    filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.5));
                }
                @keyframes rainbow-move { from { background-position: 0% 50%; } to { background-position: 300% 50%; } }
                
                p { 
                    color: #fff; 
                    font-size: clamp(1rem, 4vw, 1.2rem); 
                    max-width: 750px; 
                    margin: 0 auto 3rem auto; 
                    font-weight: 600; 
                    line-height: 1.6;
                    letter-spacing: 1px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
                
                .btn {
                    padding: 1.2rem 3.5rem; background: #ef4444; color: white;
                    text-decoration: none; border-radius: 50px; font-weight: 900; 
                    text-transform: uppercase; border: none; cursor: pointer;
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); transition: 0.3s;
                    display: inline-block;
                    animation: pulse-shadow 2s infinite;
                }
                .btn:hover { transform: scale(1.05); background: white; color: #ef4444; }

                @keyframes pulse-shadow {
                    0% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
                    50% { box-shadow: 0 0 45px rgba(239, 68, 68, 0.9); }
                    100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
                }

                @media (max-width: 600px) {
                    .plus { display: none; }
                    h1 { font-size: 3.5rem; }
                }
            </style>
            
            <section class="hero">
                <img src="https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2564&auto=format&fit=crop" class="hero-bg-img">

                <div class="plus" style="top: 15%; left: 10%; font-size: 4rem; animation-delay: 0s;">+</div>
                <div class="plus" style="top: 25%; right: 15%; font-size: 3rem; animation-delay: 2s;">+</div>
                <div class="plus" style="bottom: 20%; left: 20%; font-size: 5rem; animation-delay: 4s;">+</div>
                <div class="plus" style="bottom: 30%; right: 5%; font-size: 2rem; animation-delay: 1s;">+</div>

                <div class="hero-content">
                    <h1 class="rainbow">Ignite your <br> social life</h1>
                    <p>THE MANAGEMENT SERVICE FOR CONTENT CREATORS AND ARTISTS. WE DON'T JUST MANAGE PEOPLE; WE BUILD EMPIRES, LLC SETUP, WEB/APP CREATION, AND 24/7 SUPPORT ON ALL PLATFORMS.</p>
                    <button class="btn" onclick="window.openWarRoom()">JOIN THE WAR ROOM</button>
                </div>
            </section>
        `;
    }
}
customElements.define('elusive-hero', ElusiveHero);

// --- Background Particle System Fix ---
const canvas = document.getElementById('liquid-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function initParticles() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = [];
        for(let i=0; i<40; i++) particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
            r: Math.random() * 2 + 1
        });
    }

    function drawParticles() {
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x < 0 || p.x > w) p.vx *= -1;
            if(p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', initParticles);
    initParticles(); 
    drawParticles();
}