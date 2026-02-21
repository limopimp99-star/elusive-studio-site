class ElusiveHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; }
                
                /* HEADER BASE STYLES */
                header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 20px 40px; 
                    background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent);
                    backdrop-filter: blur(2px); 
                    transition: all 0.4s ease;
                }

                /* SCROLLED STATE (Solid Black) */
                header.scrolled {
                    background: #000000;
                    padding: 15px 40px;
                    border-bottom: 1px solid #222;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                }

                /* "GHOST PROTOCOL" ANIMATION */
                .logo { 
                    font-weight: 900; 
                    letter-spacing: 3px; 
                    color: white; 
                    text-decoration: none; 
                    font-size: 1.2rem; 
                    text-transform: uppercase; 
                    /* 4s cycle: Fades out, waits, fades in */
                    animation: ghost-fade 4s infinite ease-in-out;
                }
                .logo span { color: #ef4444; }

                @keyframes ghost-fade {
                    0% { 
                        opacity: 1; 
                        text-shadow: 0 0 20px rgba(239, 68, 68, 0.8); 
                        filter: blur(0px);
                    }
                    45% { 
                        opacity: 0.1; /* Almost invisible */
                        text-shadow: none; 
                        filter: blur(2px); /* Slight blur as it vanishes */
                    }
                    55% {
                        opacity: 0.1; /* Stay invisible for a moment */
                    }
                    100% { 
                        opacity: 1; 
                        text-shadow: 0 0 20px rgba(239, 68, 68, 0.8); 
                        filter: blur(0px);
                    }
                }

                nav { display: flex; gap: 30px; align-items: center; }
                nav a { color: #ccc; text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s; font-weight: 600; }
                nav a:hover { color: white; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
                
                /* SPECIAL LINKS */
                .gear-link { color: #ef4444 !important; }
                .deploy-btn { 
                    border: 1px solid #ef4444; padding: 8px 20px; color: #ef4444 !important; 
                    border-radius: 4px; transition: 0.3s; background: rgba(239, 68, 68, 0.1);
                }
                .deploy-btn:hover { background: #ef4444; color: black !important; box-shadow: 0 0 15px #ef4444; }
                
                /* GAME LINK */
                .game-link { color: #d4af37 !important; font-weight: 900 !important; }
                .game-link:hover { color: #ffe55c !important; text-shadow: 0 0 15px rgba(212,175,55,0.8) !important; }

                @media (max-width: 768px) { nav { display: none; } }
            </style>
            
            <header id="main-header">
                <a href="#" class="logo">ELUSIVE<span>STUDIO</span></a>
                <nav>
                    <a href="/uz-game/" target="_blank" class="game-link">THE PATIENCE OF UZ</a>
                    <a href="#services">Protocols</a>
                    <a href="#tools">Arsenal</a>
                    <a href="https://www.insta360.com/sal/x5?utm_source=AffiliateCenter&utm_medium=copylink&utm_term=INRVI5H" target="_blank" class="gear-link">GEAR</a>
                    <a href="https://cal.com/mrlive305/war-room-kick-off" target="_blank" class="deploy-btn">DEPLOY</a>
                </nav>
            </header>
        `;

        const header = this.shadowRoot.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}
customElements.define('elusive-header', ElusiveHeader);