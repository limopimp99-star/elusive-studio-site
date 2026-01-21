class ElusiveTestimonials extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; padding: 6rem 2rem; background: #000; }
                .container { max-width: 1200px; margin: 0 auto; text-align: center; }
                h2 { color: white; font-size: 3rem; margin-bottom: 4rem; text-transform: uppercase; letter-spacing: 2px; }
                h2 span { color: #ef4444; }
                
                .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
                .card { 
                    background: #0a0a0a; border: 1px solid #222; padding: 2.5rem; 
                    border-radius: 20px; text-align: left; transition: 0.4s;
                }
                .card:hover { border-color: #ef4444; transform: translateY(-10px); box-shadow: 0 10px 30px rgba(239, 68, 68, 0.1); }
                
                .quote-icon { color: #ef4444; font-size: 3rem; line-height: 1; margin-bottom: 1rem; }
                p { color: #888; font-style: italic; line-height: 1.6; margin-bottom: 2rem; }
                .author { display: flex; align-items: center; gap: 1rem; }
                .avatar { width: 50px; height: 50px; border-radius: 50%; background: #222; border: 2px solid #ef4444; }
                .info h4 { color: white; margin: 0; }
                .info span { color: #ef4444; font-size: 0.8rem; }
            </style>
            <div class="container">
                <h2>The <span>Roster</span> Speaks</h2>
                <div class="grid">
                    <div class="card">
                        <div class="quote-icon">“</div>
                        <p>Elusive Studio didn't just edit my videos; they cloned my entire workflow. I'm literally in two places at once now.</p>
                        <div class="author">
                            <div class="avatar"></div>
                            <div class="info">
                                <h4>Marcus V.</h4>
                                <span>Elite Streamer</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="quote-icon">“</div>
                        <p>The Jerry Maguire approach is real. They handle the LLC and the tech, I just show up and be the talent. Game changer.</p>
                        <div class="author">
                            <div class="avatar"></div>
                            <div class="info">
                                <h4>Sarah J.</h4>
                                <span>Lifestyle Creator</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="quote-icon">“</div>
                        <p>From 0 to 24/7 restreaming in a week. My brand is finally working as hard as I do. Show me the money!</p>
                        <div class="author">
                            <div class="avatar"></div>
                            <div class="info">
                                <h4>Donny C.</h4>
                                <span>Tech Influencer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('elusive-testimonials', ElusiveTestimonials);