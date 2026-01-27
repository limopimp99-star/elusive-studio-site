document.addEventListener('DOMContentLoaded', () => {
    initLiquidBg();
    
    // Scroll Observer: Makes sections fade in as you scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-fade-section').forEach(s => observer.observe(s));
});

// --- AI CHAT LOGIC ---
const WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE"; // PASTE YOUR LINK HERE

window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    // Add user message to UI
    container.innerHTML += `<div class="msg user"><strong>YOU:</strong> ${text}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await response.json();
        // Add AI response (looking for 'output' from n8n)
        const reply = data.output || data.text || "Accessing database...";
        container.innerHTML += `<div class="msg ai"><strong>AGENT ADAM:</strong> ${reply}</div>`;
        container.scrollTop = container.scrollHeight;
    } catch (err) {
        container.innerHTML += `<div class="msg ai"><strong>SYSTEM:</strong> Connection failed. Check n8n webhook.</div>`;
    }
};

// --- BACKGROUND ANIMATION ---
function initLiquidBg() {
    const canvas = document.getElementById('liquid-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for(let i=0; i<40; i++) {
        particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random()-0.5) * 0.3, vy: (Math.random()-0.5) * 0.3,
            r: Math.random() * 2
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle = '#ef444433';
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>w) p.vx*=-1;
            if(p.y<0 || p.y>h) p.vy*=-1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}