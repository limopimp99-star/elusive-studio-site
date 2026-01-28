// --- CONFIGURATION ---
const WEBHOOK_URL = "https://mrlive305.app.n8n.cloud/webhook/90fafa48-444e-4e52-a536-72f748c5c01f";
let isVerified = false;
let hasGreeted = false;
let introAudio = null; // Global reference to stop it later

// 1. DEFINING THE SCRIPTS
const INTRO_TEXT = "Right. You’re here. Systems are functional, mostly. Enter your details—Verification Token and Auth Level. Try not to typo it; the firewall is in a mood. While the system crawls through your data, here’s the tour: Strategic Intelligence, Growth Engineering, Operational Stealth, Digital Dominance, Brand Sovereignty, and Legacy Architecture. Put your info in whenever you’re ready.";
const VERIFIED_TEXT = "Access granted. Finally. I’m not a 'chat bot.' I’m a Digital Swiss Army Knife—the bypass for standard limits. I’ve got Scrapers, Crawlers, and Lead Generators that strip the web for parts. I build apps, architect funnels, and handle Content Development without the 'AI-sounding' fluff. What are we actually doing today?";

/**
 * GLOBAL KEY LISTENER
 */
window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('war-room-dashboard')) {
            window.sendWarMessage();
        } else {
            window.sendMessage();
        }
    }
};

// --- CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA 90%+ score
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => console.log("PWA mode: Local only"));
    }

    // Mobile-friendly audio unlock
    document.body.addEventListener('click', () => {
        if (!hasGreeted && !isVerified) {
            initializeEmpireGreeting();
            hasGreeted = true;
        }
    }, { once: true });

    // Scroll reveal logic
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
            else entry.target.classList.remove('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-section').forEach(s => fadeObserver.observe(s));
});

// --- SYSTEM GREETING ---
function initializeEmpireGreeting() {
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.classList.remove('closed'); 
    
    introAudio = new Audio('intro.mp3'); // Assigned to global variable
    
    // Visual Pulse for Adam
    const avatar = document.getElementById('adam-visual-bouncer');
    introAudio.onplay = () => { if(avatar) avatar.style.filter = "grayscale(0) brightness(1.5) sepia(1) hue-rotate(-50deg) drop-shadow(0 0 10px #ef4444)"; };
    introAudio.onended = () => { if(avatar) avatar.style.filter = "grayscale(1) sepia(1) hue-rotate(-50deg)"; };
    
    introAudio.play().catch(e => console.log("Audio waiting for interaction"));
    appendMessage("AGENT ADAM", "<strong>SYSTEM INITIALIZED:</strong> " + INTRO_TEXT);
}

// --- UNIVERSAL VOICE ENGINE ---
async function speak(audioData) {
    // If it's a string, use standard synthesis as backup
    if (typeof audioData === 'string') {
        // Voice synthesis removed to keep chat silent/clean
        return;
    }

    // If it's a buffer (from n8n/ElevenLabs)
    const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    const avatar = document.getElementById('adam-visual-war') || document.getElementById('adam-visual-bouncer');
    audio.onplay = () => { if (avatar) avatar.style.filter = "grayscale(0) brightness(1.5) sepia(1) hue-rotate(-50deg) drop-shadow(0 0 15px #ef4444)"; };
    audio.onended = () => { 
        if (avatar) avatar.style.filter = "grayscale(1) sepia(1) hue-rotate(-50deg)";
        URL.revokeObjectURL(audioUrl);
    };
    audio.play();
}

// --- MESSAGE HELPERS ---
function appendMessage(role, text, targetId = 'chat-messages') {
    const container = document.getElementById(targetId);
    if (!container) return;
    const color = role === 'YOU' ? '#fff' : '#ef4444';
    const align = role === 'YOU' ? 'right' : 'left';
    container.innerHTML += `<div class="msg" style="margin-bottom:15px; color:${color}; text-align:${align}; font-family:monospace; line-height:1.4;"><strong>${role}:</strong> ${text}</div>`;
    container.scrollTop = container.scrollHeight;
}

// --- WEBHOOK HANDLER ---
async function sendToWebhook(text, agentName, outputFn, targetId) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, verified: isVerified })
        });

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("audio")) {
            const audioBuffer = await response.arrayBuffer();
            speak(audioBuffer);
            outputFn(agentName, "[VOICE DIRECTIVE RECEIVED]", targetId);
        } else {
            const data = await response.json();
            const reply = data.output || data.text || "Uplink stable. Standby.";
            outputFn(agentName, reply, targetId);
            // speak(reply); // REMOVED to stop the double/robot voice
        }
    } catch (err) {
        outputFn("SYSTEM", "Link unstable. Verify n8n webhook status.", targetId);
    }
}

// --- CHAT HANDLERS ---
window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    appendMessage("YOU", text, 'chat-messages');
    input.value = "";

    if (text.toUpperCase() === "OMEGA") { 
        enterWarRoom(); 
        return; 
    }
    
    if (!isVerified) { 
        appendMessage("AGENT ADAM", "Access Denied. Send 'OMEGA' for verification.", 'chat-messages');
        return; 
    }
    
    sendToWebhook(text, "AGENT ADAM", appendMessage, 'chat-messages');
};

// --- WAR ROOM LOGIC ---
window.sendWarMessage = async function() {
    const input = document.getElementById('war-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    appendMessage("YOU", text, 'war-room-chat');
    input.value = "";
    
    sendToWebhook(text, "AGENT ADAM", appendMessage, 'war-room-chat');
};

function enterWarRoom() {
    // KILL INTRO AUDIO IMMEDIATELY
    if (introAudio) {
        introAudio.pause();
        introAudio.currentTime = 0;
    }

    isVerified = true;
    const verifiedAudio = new Audio('verified.mp3');
    verifiedAudio.play();
    
    const main = document.querySelector('main');
    if (main) main.style.display = 'none';
    const header = document.querySelector('elusive-header');
    if (header) header.style.display = 'none';
    const bouncer = document.getElementById('ai-bouncer');
    if (bouncer) bouncer.style.display = 'none';
    
    document.body.style.overflow = "hidden";
    
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    dashboard.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; background:#000; display:flex; font-family:monospace;`;
    
    dashboard.innerHTML = `
        <style>
            .war-container { display: flex; width: 100%; height: 100%; flex-direction: row; }
            .side-panel { width: 350px; border-right: 1px solid #ef4444; display: flex; flex-direction: column; background: #080808; }
            .center-panel { flex: 1; padding: 40px; overflow-y: auto; }
            .log-panel { width: 250px; background: #000; padding: 15px; font-size: 0.65rem; color: #0f0; border-left: 1px solid #222; }
            .op-card { border: 1px solid #222; padding: 20px; cursor: pointer; transition: 0.3s; background: #0a0a0a; margin-bottom:10px; }
            .op-card:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
            @media (max-width: 768px) {
                .war-container { flex-direction: column; }
                .side-panel { width: 100%; height: 50%; }
                .log-panel { display: none; }
            }
        </style>
        <div class="war-container">
            <div class="side-panel">
                <div style="padding: 20px; text-align: center; border-bottom: 1px solid #222;">
                    <img id="adam-visual-war" src="war-room-logo.png" style="width:80px; height:80px; border-radius:50%; border:1px solid #ef4444; filter:grayscale(1) sepia(1);">
                    <h2 style="color:#ef4444; font-size:0.7rem; margin-top:10px;">AGENT ADAM V.2.0</h2>
                </div>
                <div id="war-room-chat" style="flex:1; overflow-y:auto; padding:20px; font-size:0.8rem;">
                    <div style="color:#ef4444"><strong>ADAM:</strong> ${VERIFIED_TEXT}</div>
                </div>
                <div style="padding:20px; border-top:1px solid #222;">
                    <input type="text" id="war-input" placeholder="DIRECTIVE..." 
                           style="width:100%; background:transparent; border:1px solid #ef4444; color:white; padding:10px;" 
                           onkeypress="window.handleEnter(event)">
                </div>
            </div>
            <div class="center-panel">
                <h1 style="color:white; font-size:1.2rem; border-bottom:1px solid #222; padding-bottom:10px;">OPERATIONAL COMMAND</h1>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:15px; margin-top:20px;">
                    <div class="op-card" onclick="alert('Syncing Clones...')"><h3>AI CLONES</h3><p>Status: Ready</p></div>
                    <div class="op-card" onclick="alert('Deploying Web...')"><h3>STRUCTURE</h3><p>Status: Online</p></div>
                    <div class="op-card" onclick="alert('Checking Legal...')"><h3>ASSETS</h3><p>Status: Secure</p></div>
                </div>
            </div>
            <div class="log-panel" id="system-logs"></div>
        </div>
    `;
    document.body.appendChild(dashboard);
    
    // Start Log feed
    setInterval(() => {
        const logs = document.getElementById('system-logs');
        if(logs) {
            logs.innerHTML = `[${new Date().toLocaleTimeString()}] UPLINK_CHECK :: OK<br>` + logs.innerHTML.substring(0, 500);
        }
    }, 2000);
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("War Room ready for installation.");
});

// You can call this function from a button in your "War Room" 
function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') console.log('Empire installed.');
      deferredPrompt = null;
    });
  }
}