class ElusivePricing extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    background: #000; 
                    padding: 8rem 2rem; 
                    position: relative;
                    overflow: hidden;
                }

                /* Radiating Pulse Background */
                .pulse-bg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                }

                .ripple {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border: 2px solid rgba(239, 68, 68, 0.15);
                    border-radius: 50%;
                    animation: ripple-out 6s linear infinite;
                }

                @keyframes ripple-out {
                    0% { width: 0; height: 0; opacity: 1; }
                    100% { width: 1500px; height: 1500px; opacity: 0; }
                }

                h2 { 
                    color: white; 
                    font-size: clamp(2rem, 5vw, 3.5rem); 
                    margin-bottom: 4rem; 
                    position: relative; 
                    z-index: 10;
                    text-align: center;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                }
                h2 span { color: #ef4444; }

                .pricing-container { 
                    display: flex; 
                    flex-wrap: wrap; 
                    justify-content: center; 
                    align-items: stretch;
                    gap: 2.5rem; 
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .plan {
                    background: rgba(15, 15, 15, 0.8); 
                    backdrop-filter: blur(10px);
                    padding: 3rem 2rem; 
                    border-radius: 24px; 
                    border: 1px solid #222;
                    width: 340px; 
                    text-align: left; 
                    display: flex; 
                    flex-direction: column;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                /* MOBILE OPTIMIZATION */
                @media (max-width: 768px) {
                    .pricing-container { flex-direction: column; align-items: center; }
                    .plan { width: 100%; max-width: 340px; }
                    .plan.featured { transform: scale(1); } /* Prevent mobile clipping */
                }

                .plan:hover {
                    transform: translateY(-15px);
                    border-color: #ef4444;
                    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.2);
                }

                .plan.featured { 
                    border: 2px solid #ef4444; 
                    background: rgba(30, 5, 5, 0.9); 
                    transform: scale(1.05); 
                    z-index: 11;
                }

                h3 { color: #fff; font-size: 1.8rem; margin: 0; font-weight: 800; }
                .price { font-size: 2.8rem; color: #fff; font-weight: 900; margin: 1.5rem 0; }
                .price span { font-size: 1rem; color: #666; }

                .features { list-style: none; padding: 0; margin-bottom: 2.5rem; color: #999; flex-grow: 1; }
                .features li { margin-bottom: 12px; display: flex; gap: 12px; line-height: 1.4; }
                .features li::before { content: '→'; color: #ef4444; font-weight: bold; }

                .btn {
                    display: block; 
                    text-align: center; 
                    background: #ef4444; 
                    color: white;
                    padding: 1.2rem; 
                    border-radius: 12px; 
                    text-decoration: none; 
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: 0.3s;
                    margin-top: auto; /* Pushes button to bottom */
                }
                .btn:hover { background: #fff; color: #000; }
                .btn-outline { background: transparent; border: 2px solid #ef4444; }

                .secure-tag {
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 0.7rem;
                    color: #555;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .secure-tag svg { width: 12px; fill: #555; }
            </style>

            <div class="pulse-bg">
                <div class="ripple" style="animation-delay: 0s"></div>
                <div class="ripple" style="animation-delay: 2s"></div>
                <div class="ripple" style="animation-delay: 4s"></div>
            </div>

            <h2 id="pricing">Select Your <span>Protocol</span></h2>
            
            <div class="pricing-container">
                <div class="plan">
                    <h3>The Hustler</h3>
                    <div class="price">$499<span>/mo</span></div>
                    <ul class="features">
                        <li>LLC Business Formation</li>
                        <li>The Jerry Maguire SEO Audit</li>
                        <li>Foundation Content Production</li>
                        <li>Direct Strategy Line</li>
                    </ul>
                    <a href="https://buy.stripe.com/3cI5kw9zi7Tu1He9fdd7q00" class="btn">Start Day 1</a>
                    <div class="secure-tag">
                        <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
                        Secure Encrypted Checkout
                    </div>
                </div>

                <div class="plan featured">
                    <h3>The Boss</h3>
                    <div class="price">$1,499<span>/mo</span></div>
                    <ul class="features">
                        <li><strong>AI Digital Twin Setup</strong></li>
                        <li>Daily Workflow Cloning</li>
                        <li>24/7 Multi-Platform Restreaming</li>
                        <li>Global Likeness Management</li>
                        <li>Priority War Room Access</li>
                    </ul>
                    <a href="https://buy.stripe.com/28E14gcLu7Tu2Li1MLd7q01" class="btn">Own The Board</a>
                    <div class="secure-tag" style="color: #ef4444;">
                        <svg style="fill: #ef4444;" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
                        Verified Elite Protocol
                    </div>
                </div>

                <div class="plan">
                    <h3>The Empire</h3>
                    <div class="price">Custom</div>
                    <ul class="features">
                        <li>Dedicated Management Team</li>
                        <li>Global Ad Campaigns</li>
                        <li>Legal & IP Protection Defense</li>
                        <li>Complete Empire Scaling</li>
                    </ul>
                    <a href="mailto:manager@elusive.studio" class="btn btn-outline">Contact Elite</a>
                </div>
            </div>
        `;
    }
}
customElements.define('elusive-pricing', ElusivePricing);