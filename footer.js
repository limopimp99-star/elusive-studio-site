class ElusiveFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                :host { display: block; background: #020202; border-top: 1px solid #111; padding: 4rem 2rem; color: white; position: relative; z-index: 2; }
                .container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; }
                h4 { color: #ef4444; letter-spacing: 2px; margin-bottom: 1.5rem; text-transform: uppercase; font-size: 0.9rem; }
                ul { list-style: none; padding: 0; margin: 0; }
                li { margin-bottom: 0.8rem; }
                a { color: #666; text-decoration: none; font-size: 0.9rem; transition: 0.3s; }
                a:hover { color: white; padding-left: 5px; }
                .socials { display: flex; gap: 15px; margin-top: 1rem; }
                .socials a { font-size: 1.2rem; }
                .socials a:hover { color: #ef4444; padding: 0; transform: scale(1.2); }
                .coffee-link { color: #FFDD00 !important; } 
                .copyright { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #111; color: #444; font-size: 0.8rem; }
            </style>
            <footer>
                <div class="container">
                    <div>
                        <h4>Elusive Studio</h4>
                        <p style="color:#666; font-size:0.9rem; line-height:1.6;">High-performance digital architecture for the 1% of founders who demand total market dominance.</p>
                        <div class="socials">
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="https://buymeacoffee.com/mrlive305" target="_blank" class="coffee-link" title="Fuel the War Room"><i class="fas fa-coffee"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4>Sectors</h4>
                        <ul>
                            <li><a href="#">Corporate Structure</a></li>
                            <li><a href="#">AI Automation</a></li>
                            <li><a href="#">Media Empire</a></li>
                            <li><a href="#">Asset Protection</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Partners</h4>
                        <ul>
                            <li><a href="#">Google Cloud</a></li>
                            <li><a href="https://www.insta360.com/sal/x5?utm_source=AffiliateCenter&utm_medium=copylink&utm_term=INRVI5H" target="_blank">Insta360</a></li>
                            <li><a href="#">OpenAI</a></li>
                            <li><a href="#">Stripe Atlas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Direct Uplink</h4>
                        <ul>
                            <li><a href="https://cal.com/mrlive305/war-room-kick-off" target="_blank">Book Strategy Call</a></li>
                            <li><a href="mailto:access@elusivestudio.com">Secure Email</a></li>
                            <li><a href="https://buymeacoffee.com/mrlive305" target="_blank">Support Ops</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    © 2024 ELUSIVE STUDIO. ALL RIGHTS RESERVED. // PROTOCOL V2.0
                </div>
            </footer>
        `;
    }
}
customElements.define('elusive-footer', ElusiveFooter);