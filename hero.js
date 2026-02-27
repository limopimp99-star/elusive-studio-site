class ElusiveHero extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; width: 100%; }
                
                .hero {
                    min-height: 100vh; display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; text-align: center;
                    position: relative; overflow: hidden; padding: 0 1.5rem;
                    background: #000;
                }

                .hero-bg-img {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    object-fit: cover; z-index: 0;
                    opacity: 0.65; filter: brightness(0.7) contrast(1.2);
                }
                
                .plus {
                    position: absolute; color: #ef4444; font-weight: 900;
                    font-family: sans-serif; animation: float-plus 8s infinite; z-index: 1;
                }
                @keyframes float-plus { 0%, 100% { transform: translateY(0); opacity: 0.2; } 50% { transform: translateY(-30px); opacity: 0.6; } }

                .hero-content { position: relative; z-index: 2; max-width: 900px; }

                h1 { 
                    font-size: clamp(3rem, 9vw, 6.5rem); font-weight: 900; line-height: 1; 
                    margin-bottom: 1.5rem; text-transform: uppercase; margin-top: 0;
                }
                .rainbow {
                    background: linear-gradient(90deg, #ef4444, #ff7f00, #ffff00, #ef4444);
                    background-size: 300%; -webkit-background-clip: text; background-clip: text; color: transparent;
                    animation: rainbow-move 4s linear infinite;
                    filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6));
                }
                @keyframes rainbow-move { from { background-position: 0% 50%; } to { background-position: 300% 50%; } }
                
                p { 
                    color: #fff; font-size: clamp(1rem, 3vw, 1.2rem); max-width: 800px; margin: 0 auto 3rem; 
                    font-weight: 600; line-height: 1.6; text-shadow: 2px 2px 10px black;
                }
                
                .btn-group {
                    display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;
                }

                .btn {
                    padding: 1.2rem 3.5rem; background: #ef4444; color: white; display: inline-flex; align-items: center; justify-content: center;
                    text-decoration: none; border-radius: 50px; font-weight: 900; 
                    text-transform: uppercase; border: none; cursor: pointer;
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); transition: 0.3s;
                    animation: pulse-shadow 2s infinite;
                }
                .btn:hover { transform: scale(1.05); background: white; color: #ef4444; }
                
                .btn-gold {
                    background: #d4af37; color: #000; 
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
                    animation: pulse-gold 2s infinite;
                }
                .btn-gold:hover { background: white; color: #aa7c11; }

                @keyframes pulse-shadow { 0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); } 50% { box-shadow: 0 0 45px rgba(239, 68, 68, 1); } }
                @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.6); } 50% { box-shadow: 0 0 45px rgba(212, 175, 55, 1); } }

                @media (max-width: 600px) { .plus { display: none; } }
            </style>
            
            <section class="hero">
                <img src="https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2564&auto=format&fit=crop" class="hero-bg-img">

                <div class="plus" style="top: 15%; left: 10%; font-size: 4rem;">+</div>
                <div class="plus" style="bottom: 20%; right: 10%; font-size: 5rem;">+</div>

                <div class="hero-content">
                    <h1 class="rainbow">ROOT ACCESS</h1>
                    <p>Hacking the Streets, the Mind, and the Matrix</p>
                    
                    <div class="btn-group">
                        <h1 class="rainbow">PREORDER SPECIAL</h1>
                        <a href="https://don305choppa.gumroad.com/l/fuorrj?_gl=1*20aghs*_ga*MTgxMzk4NDgyOC4xNzcxODc2NTYw*_ga_6LJN6D94N6*czE3NzIyMDc4NDAkbzExJGcwJHQxNzcyMjA3ODQwJGo2MCRsMCRoMA.." target="_blank" class="btn">CLEAN EDITION – $19</a>
                        <a href="https://gumroad.com/discover?a=933339027" target="_blank" class="btn btn-gold">RAW & UNFILTERED – $39</a>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('elusive-hero', ElusiveHero);