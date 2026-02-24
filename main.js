// --- CONFIGURATION ---
const CAL_LINK = "https://cal.com/mrlive305/war-room-kick-off"; 
let isVerified = false;
let hasGreeted = false;
let introAudio = null;

// --- WAR ROOM DATA ---
const WAR_DATA = {
    'CLONES': {
        title: "NEURAL NETWORK",
        status: "ONLINE",
        icon: "fa-brain",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        desc: "Active AI Digital Twins. Voice modulation & interaction logs.",
        actions: ["Train New Model", "Voice Calibration", "Sync Memory"]
    },
    'WEB': {
        title: "EMPIRE INFRASTRUCTURE",
        status: "STABLE",
        icon: "fa-server",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        desc: "Real-time PWA surveillance. Server load & heatmaps.",
        actions: ["Deploy Update", "Purge Cache", "Run SEO Audit"]
    },
    'ASSETS': {
        title: "ASSET VAULT",
        status: "SECURE",
        icon: "fa-lock",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
        desc: "Encrypted storage for LLC docs and banking keys.",
        actions: ["View Documents", "Verify Compliance", "Legal Audit"]
    },
    'COMMS': {
        title: "SIGNAL TOWER",
        status: "LIVE",
        icon: "fa-satellite-dish",
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        desc: "Global distribution command. Push content to all nodes.",
        actions: ["Start Stream", "Sync Social Feeds", "Clip Highlights"]
    }
};

// --- INTRO TEXT ---
const INTRO_TEXT = "Right. You’re here. Systems are functional. Enter your details—Verification Token and Auth Level. While the system crawls through your data, here’s the tour: Strategic Intelligence, Growth Engineering, and Digital Dominance. Put your info in whenever you’re ready.";
const VERIFIED_TEXT = "Access granted. Finally. I’m not a 'chat bot.' I’m a Digital Swiss Army Knife—the bypass for standard limits. I’ve got Scrapers, Crawlers, and Lead Generators that strip the web for parts. I build apps, architect funnels, and handle Content Development without the 'AI-sounding' fluff. What are we actually doing today?";

// --- SERVICE BRIEFING DATA ---
const SERVICE_BRIEFS = {
    'LLC': { title: "CORPORATE INFRASTRUCTURE", subtitle: "DAY 1 ASSET PROTECTION", text: "We don't just 'file paperwork.' We structure your entity for maximum tax efficiency and liability shielding. Includes EIN procurement and banking setup.", keywords: "LLC Formation, Tax Strategy" },
    'AI': { title: "AI DIGITAL TWINS", subtitle: "SCALE YOURSELF INFINITELY", text: "Clone your likeness. Your digital twin handles ad reads and content generation while you sleep.", keywords: "AI Cloning, Deepfake Tech" },
    'DISTRO': { title: "GLOBAL DISTRIBUTION", subtitle: "OMNIPRESENCE PROTOCOL", text: "One video, everywhere. Simultaneous restreaming to Twitch, YouTube, Kick, and X.", keywords: "Multi-streaming, Virality" },
    'PROD': { title: "ELITE PRODUCTION", subtitle: "RETENTION ENGINEERING", text: "Cinema-grade color grading and pacing algorithms designed to reset dopamine triggers.", keywords: "Video Editing, Viral Hooks" },
    'WEB': { title: "WEB & APP CREATION", subtitle: "OWNED PLATFORM ARCHITECTURE", text: "Stop renting land. We build custom PWAs and membership portals you actually own.", keywords: "PWA, Web Development" },
    'DESIGN': { title: "VISUAL DESIGN", subtitle: "BRAND SOVEREIGNTY", text: "Aggressive digital brutalism. Visual identity that signals 'High Net Worth' immediately.", keywords: "UI/UX, Branding" }
};

// --- MATRIX RAIN EFFECT (New) ---
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.12';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
}

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();   // ← MATRIX RAIN ADDED HERE

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

    document.body.addEventListener('click', () => {
        if (!hasGreeted && !isVerified) {
            initializeEmpireGreeting();
            hasGreeted = true;
        }
    }, { once: true });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-fade-section').forEach(s => fadeObserver.observe(s));

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            const f = document.querySelector('input[name="user_ip"]');
            if (f) f.value = data.ip;
        })
        .catch(() => {});
});

window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('war-room-dashboard')) window.sendWarMessage();
        else window.sendMessage();
    }
};

// --- POPUP LOGIC ---
window.requestServiceDetail = function(serviceKey) {
    // ... (your original modal code - kept full)
    const data = SERVICE_BRIEFS[serviceKey];
    if (!data) return;

    const modalId = 'service-intel-modal';
    if (document.getElementById(modalId)) document.getElementById(modalId).remove();

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(5px);`;

    modal.innerHTML = `
        <div style="background:#0a0a0a; border:1px solid #ef4444; padding:40px; max-width:600px; width:90%; position:relative; box-shadow:0 0 40px rgba(239,68,68,0.2);">
            <button onclick="document.getElementById('${modalId}').remove()" style="position:absolute; top:10px; right:15px; background:none; border:none; color:#555; font-size:1.5rem; cursor:pointer;">✕</button>
            <h4 style="color:#ef4444; margin:0; letter-spacing:2px; font-size:0.8rem;">${data.subtitle}</h4>
            <h2 style="color:white; margin:10px 0 20px 0;">${data.title}</h2>
            <p style="color:#ccc; line-height:1.6;">${data.text}</p>
            <button onclick="window.sendMessageFromBrief('${data.title}'); document.getElementById('${modalId}').remove()" style="margin-top:20px; width:100%; padding:15px; background:#ef4444; border:none; color:white; font-weight:bold; cursor:pointer;">INITIATE</button>
        </div>
    `;
    document.body.appendChild(modal);
};

window.sendMessageFromBrief = function(serviceName) {
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.classList.remove('closed');
    const input = document.getElementById('user-input');
    if (input) {
        input.value = `I'm interested in ${serviceName}.`;
        window.sendMessage();
    }
};

// --- CHAT LOGIC ---
function initializeEmpireGreeting() {
    document.getElementById('ai-bouncer').classList.remove('closed');
    introAudio = new Audio('intro.mp3');
    introAudio.play().catch(e => console.log("Audio blocked"));
    appendMessage("AGENT ADAM", "<strong>SYSTEM:</strong> " + INTRO_TEXT);
}

function appendMessage(role, text, targetId = 'chat-messages') {
    const container = document.getElementById(targetId);
    if (!container) return;
    const color = role === 'YOU' ? '#fff' : '#ef4444';
    const align = role === 'YOU' ? 'right' : 'left';
    container.innerHTML += `<div class="msg" style="margin-bottom:15px; color:${color}; text-align:${align}; font-family:monospace;"><strong>${role}:</strong> ${text}</div>`;
    container.scrollTop = container.scrollHeight;
}

// --- WEBHOOK SIMULATION ---
async function sendToWebhook(text, outputFn, targetId) {
    const replyDelay = Math.random() * 1000 + 1000;
    
    setTimeout(() => {
        const reply = "AUTOMATED RESPONSE: My neural uplink is currently undergoing maintenance. To proceed with this request immediately, please access the Human Command Interface below.";
        outputFn("AGENT ADAM", reply, targetId);
        
        setTimeout(() => {
            outputFn("SYSTEM", `<strong><a href="${CAL_LINK}" target="_blank" style="color:#ef4444; text-decoration:underline;">>> CLICK TO INITIALIZE MANUAL OVERRIDE <<</a></strong>`, targetId);
        }, 800);
    }, replyDelay);
}

window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    appendMessage("YOU", text, 'chat-messages');
    input.value = "";

    if (text.toUpperCase() === "OMEGA") { constructWarRoom(); return; }
    
    sendToWebhook(text, appendMessage, 'chat-messages');
};

window.openWarRoom = function() {
    if (isVerified) constructWarRoom();
    else {
        document.getElementById('ai-bouncer').classList.remove('closed');
        appendMessage("AGENT ADAM", "SECURITY ALERT: Enter 'OMEGA' to access War Room.");
        setTimeout(() => document.getElementById('user-input').focus(), 100);
    }
};

window.triggerAgentAction = async function(module, action, btnElement) {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = `> <i class="fas fa-spinner fa-spin"></i> TRANSMITTING...`;
    btnElement.style.color = "#ef4444";

    setTimeout(() => {
        btnElement.innerHTML = `> <i class="fas fa-check"></i> UPLINK REQUIRED`;
        appendMessage("SYSTEM", `Action '${action}' requires manual authorization. Opening secure channel...`, 'war-room-chat');
        setTimeout(() => {
             window.open(CAL_LINK, '_blank');
             btnElement.innerHTML = originalText;
             btnElement.style.color = "#aaa";
        }, 1500);
    }, 1500);
};

window.sendWarMessage = async function() {
    const input = document.getElementById('war-input');
    if (!input || !input