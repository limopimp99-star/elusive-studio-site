// --- CONFIGURATION ---
// n8n is offline. Switched to "Manual Uplink" mode.
const CAL_LINK = "https://cal.com/mrlive305/war-room-kick-off"; 
let isVerified = false;
let hasGreeted = false;
let introAudio = null;

// --- 1. WAR ROOM DATA (The Graphics & Actions) ---
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

// 2. DEFINING THE SCRIPTS
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

window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('war-room-dashboard')) window.sendWarMessage();
        else window.sendMessage();
    }
};

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => console.log("Local Mode"));

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

    // IP Tracking (Preserved from your code)
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            const f = document.querySelector('input[name="user_ip"]');
            if (f) f.value = data.ip;
        })
        .catch(() => { /* Silent fail for ad-blockers */ });
});

// --- POPUP LOGIC ---
window.requestServiceDetail = function(serviceKey) {
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
            <h2 style="color:white; margin:10px 0 20px; font-size:2rem;">${data.title}</h2>
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
    appendMessage("AGENT ADAM", "<strong>SYSTEM INITIALIZED:</strong> " + INTRO_TEXT);
}

function appendMessage(role, text, targetId = 'chat-messages') {
    const container = document.getElementById(targetId);
    if (!container) return;
    const color = role === 'YOU' ? '#fff' : '#ef4444';
    const align = role === 'YOU' ? 'right' : 'left';
    container.innerHTML += `<div class="msg" style="margin-bottom:15px; color:${color}; text-align:${align}; font-family:monospace;"><strong>${role}:</strong> ${text}</div>`;
    container.scrollTop = container.scrollHeight;
}

// --- FAKE WEBHOOK (The Fix) ---
// Replaces n8n with a simulated response that opens your Cal.com link
async function sendToWebhook(text, outputFn, targetId) {
    // 1. Simulate "Thinking" delay
    const replyDelay = Math.random() * 1000 + 1000;
    
    setTimeout(() => {
        // 2. Generic "Smart" Reply
        const reply = "AUTOMATED RESPONSE: My neural uplink is currently undergoing maintenance. To proceed with this request immediately, please access the Human Command Interface below.";
        outputFn("AGENT ADAM", reply, targetId);
        
        // 3. Follow up with the link
        setTimeout(() => {
            outputFn("SYSTEM", `<strong><a href="${CAL_LINK}" target="_blank" style="color:#ef4444; text-decoration:underline;">>> CLICK TO INITIALIZE MANUAL OVERRIDE <<</a></strong>`, targetId);
            // Optional: window.open(CAL_LINK, '_blank');
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
    
    // Bypass verification to allow lead capture even if unverified
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

    // Simulate Success then redirect to Booking
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
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    appendMessage("YOU", text, 'war-room-chat');
    input.value = "";
    sendToWebhook(text, appendMessage, 'war-room-chat');
};

// --- PREMIUM WAR ROOM (Preserved) ---
function constructWarRoom() {
    if (introAudio) { introAudio.pause(); introAudio.currentTime = 0; }
    isVerified = true;
    new Audio('verified.mp3').play();

    ['main', 'elusive-header', 'ai-bouncer'].forEach(id => {
        const el = document.querySelector(id) || document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.body.style.overflow = "hidden";

    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";

    let cardsHTML = '';
    for (const [key, data] of Object.entries(WAR_DATA)) {
        cardsHTML += `
            <div class="war-card" onclick="window.openModule('${key}')">
                <div class="reticle"></div> <div class="card-bg" style="background-image: url('${data.img}')"></div>
                <div class="card-overlay"></div>
                <div class="card-status"><div class="dot"></div>${data.status}</div>
                <div class="card-content"><h3><i class="fas ${data.icon}"></i> ${data.title}</h3><p>${data.desc}</p></div>
            </div>
        `;
    }

    dashboard.innerHTML = `
        <style>
            #war-room-dashboard { position: fixed; top:0; left:0; width:100vw; height:100vh; background:#050505; color:#ddd; font-family:'Courier New', monospace; display:flex; z-index:9999; cursor: crosshair; }
            .side-panel { width:300px; border-right:1px solid #333; background:#080808; display:flex; flex-direction:column; z-index:2; }
            .center-panel { flex:1; padding:40px; background:radial-gradient(circle at center, #111 0%, #000 100%); z-index:1; overflow-y:auto; }
            .ops-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:25px; margin-top:20px; }
            .war-card { position:relative; height:220px; border:1px solid #333; border-radius:4px; overflow:hidden; cursor:pointer; transition:0.3s; background:#000; }
            .reticle { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:20; opacity:0; transition:0.3s; border: 1px solid rgba(239,68,68,0); }
            .reticle::before, .reticle::after { content:''; position:absolute; width:20px; height:20px; border-color:#ef4444; transition:0.3s; }
            .reticle::before { top:5px; left:5px; border-top:2px solid #ef4444; border-left:2px solid #ef4444; }
            .reticle::after { bottom:5px; right:5px; border-bottom:2px solid #ef4444; border-right:2px solid #ef4444; }
            .war-card:hover .reticle { opacity:1; }
            .war-card:hover .reticle::before { top:0; left:0; width:30px; height:30px; }
            .war-card:hover .reticle::after { bottom:0; right:0; width:30px; height:30px; }
            .war-card:hover { transform:scale(1.02); box-shadow: 0 0 20px rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.5); }
            .card-bg { position:absolute; top:0; left:0; width:100%; height:100%; background-size:cover; background-position:center; opacity:0.4; filter:grayscale(100%); transition:0.5s; }
            .war-card:hover .card-bg { opacity:0.7; filter:grayscale(0%); }
            .card-overlay { position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(to top, #000 10%, transparent 90%); }
            .card-content { position:absolute; bottom:0; left:0; width:100%; padding:20px; z-index:10; }
            .card-content h3 { margin:0; color:#fff; font-size:1rem; letter-spacing:1px; text-shadow:0 2px 5px black; }
            .card-content p { font-size:0.7rem; color:#aaa; margin-top:5px; }
            .card-status { position:absolute; top:10px; right:10px; font-size:0.6rem; background:black; border:1px solid #ef4444; color:#ef4444; padding:4px 8px; display:flex; align-items:center; gap:6px; z-index:10; }
            .dot { width:6px; height:6px; background:#ef4444; border-radius:50%; animation:blink 1s infinite; }
            @keyframes blink { 50% { opacity:0; } }
            @media (max-width: 768px) { .side-panel { display:none; } }
        </style>

        <div class="side-panel">
            <div style="padding:20px; text-align:center; border-bottom:1px solid #333;">
                <img src="war-room-logo.png" style="width:80px; height:80px; border-radius:50%; border:2px solid #ef4444; filter:grayscale(1);">
                <h3 style="color:#ef4444; font-size:0.8rem; margin-top:15px;">ADAM V2.0</h3>
            </div>
            <div id="war-room-chat" style="flex:1; padding:20px; font-size:0.8rem; overflow-y:auto; color:#ef4444;">
                <div><strong>SYSTEM:</strong> UPLINK ESTABLISHED.</div>
                <div style="margin-top:10px;"><strong>ADAM:</strong> Welcome to command. Select a target.</div>
            </div>
            <div style="padding:20px; border-top:1px solid #333;">
                <input type="text" id="war-input" placeholder="COMMAND..." onkeypress="window.handleEnter(event)" style="width:100%; background:transparent; border:1px solid #ef4444; color:white; padding:10px; font-family:monospace;">
            </div>
        </div>
        <div class="center-panel">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding-bottom:15px;">
                <h1 style="margin:0; font-size:1.5rem; color:white;">OPERATIONAL COMMAND</h1>
                <button onclick="window.installApp()" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:8px 20px; font-weight:bold; cursor:pointer;">INSTALL APP</button>
            </div>
            <div class="ops-grid">${cardsHTML}</div>
        </div>
    `;
    document.body.appendChild(dashboard);
}

// --- NEW MODULE MODAL ---
window.openModule = function(key) {
    const data = WAR_DATA[key];
    const modalId = 'war-module-modal';
    if (document.getElementById(modalId)) document.getElementById(modalId).remove();

    const buttons = data.actions.map(act =>
        `<button onclick="window.triggerAgentAction('${data.title}', '${act}', this)" style="display:block; width:100%; text-align:left; background:#111; color:#aaa; border:1px solid #333; padding:12px; margin-bottom:8px; cursor:pointer; transition:0.2s;" onmouseover="this.style.borderColor='#ef4444'; this.style.color='white'">> ${act}</button>`
    ).join('');

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10001; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(5px);`;

    modal.innerHTML = `
        <div style="width:500px; background:#000; border:1px solid #ef4444; box-shadow:0 0 50px rgba(239,68,68,0.2); font-family:'Courier New';">
            <div style="background:url('${data.img}') center/cover; height:120px; opacity:0.6; border-bottom:1px solid #ef4444; position:relative;">
                <button onclick="document.getElementById('${modalId}').remove()" style="position:absolute; top:10px; right:10px; background:black; color:white; border:1px solid white; cursor:pointer;">X</button>
            </div>
            <div style="padding:30px;">
                <h2 style="color:#ef4444; margin:0 0 10px 0;">${data.title}</h2>
                <div style="color:#fff; font-size:0.8rem; margin-bottom:20px; padding-bottom:10px; border-bottom:1px solid #333;">STATUS: ${data.status} // PING: 12ms</div>
                <p style="color:#aaa; font-size:0.9rem; margin-bottom:20px;">${data.desc}</p>
                <div style="font-size:0.7rem; color:#666; margin-bottom:10px;">AVAILABLE ACTIONS:</div>
                ${buttons}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// PWA Install
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
window.installApp = function() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => { if (choice.outcome === 'accepted') deferredPrompt = null; });
    } else alert("Install via browser menu.");
}

// --- TALLY FORM INTEGRATION ---
window.openTallyForm = function() {
    if (typeof Tally !== 'undefined') {
        Tally.openPopup('Y5aXxB', { layout: 'modal', width: 700, emoji: { text: '👋', animation: 'wave' }, autoClose: 3000 });
    } else {
        console.error("Tally script not loaded.");
        window.open('https://tally.so/r/Y5aXxB', '_blank');
    }
}