document.addEventListener('DOMContentLoaded', () => {
    initLiquidBg();
    
    // Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-fade-section').forEach(s => observer.observe(s));
});

// MASTER LOGIN & BOUNCER LOGIC
function handleEnter(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('user-input');
        const val = input.value.trim();

        // MASTER CREDENTIAL CHECK
        if (val === "Elitename Elitepassword") {
            grantMasterAccess();
            input.value = "";
        } else {
            sendMessage();
        }
    }
}

function grantMasterAccess() {
    localStorage.setItem('empire_auth', 'true');
    const chat = document.getElementById('chat-messages');
    const level = document.getElementById('security-level');
    
    level.innerHTML = `<i class="fas fa-skull"></i> SECURITY LEVEL: OMEGA`;
    level.style.color = "#ff4444";

    addMessage("ai", "MASTER ACCESS GRANTED. Initializing advanced toolsets... Agent Adam standing by for OMEGA commands.");
}

// LIQUID BACKGROUND LOGIC
function initLiquidBg() {
    const canvas = document.getElementById('liquid-bg');
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

// Existing toggleChat and sendMessage functions go here...