class ElusiveFAQ extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 6rem 2rem; background: #050505; }
                .container { max-width: 800px; margin: 0 auto; }
                h2 { color: white; text-align: center; font-size: 3rem; margin-bottom: 4rem; text-transform: uppercase; }
                h2 span { color: #ef4444; }
                
                .faq-item { border-bottom: 1px solid #222; padding: 1.5rem 0; cursor: pointer; }
                .question { 
                    display: flex; justify-content: space-between; align-items: center;
                    color: white; font-size: 1.2rem; font-weight: 700; transition: 0.3s;
                }
                .question:hover { color: #ef4444; }
                .answer { 
                    color: #888; max-height: 0; overflow: hidden; 
                    transition: max-height 0.5s ease-out; line-height: 1.6; margin-top: 0;
                }
                .faq-item.active .answer { max-height: 200px; margin-top: 1rem; }
                .faq-item.active .icon { transform: rotate(45deg); color: #ef4444; }
                .icon { transition: 0.3s; color: #444; font-size: 1.5rem; }
            </style>
            <div class="container" id="faq">
                <h2>The <span>Intel</span></h2>
                <div class="faq-inner">
                    <div class="faq-item">
                        <div class="question">How does the "Digital Twin" work? <span class="icon">+</span></div>
                        <div class="answer">We capture your voice and likeness using proprietary AI models. This allows us to generate daily content and maintain your presence even when you're off-camera.</div>
                    </div>
                    <div class="faq-item">
                        <div class="question">What happens on "Day 1"? <span class="icon">+</span></div>
                        <div class="answer">On Day 1, we execute the Talent Protocol. We begin your LLC formation, perform a deep-dive SEO audit, and establish your dedicated production pipeline.</div>
                    </div>
                    <div class="faq-item">
                        <div class="question">Is the LLC formation included? <span class="icon">+</span></div>
                        <div class="answer">Yes. For both the Hustler and Boss tiers, we assist with the technical filing and structural setup of your business entity.</div>
                    </div>
                    <div class="faq-item">
                        <div class="question">Can I cancel my protocol? <span class="icon">+</span></div>
                        <div class="answer">The Hustler tier includes a 7-day money-back guarantee. The Boss and Empire tiers are commitment-based protocols designed for long-term growth.</div>
                    </div>
                </div>
            </div>
        `;

        // Logic for opening accordion
        this.shadowRoot.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
}
customElements.define('elusive-faq', ElusiveFAQ);