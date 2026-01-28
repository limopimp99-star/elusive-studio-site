// --- CONFIGURATION ---
const WEBHOOK_URL = "https://mrlive305.app.n8n.cloud/webhook/90fafa48-444e-4e52-a536-72f748c5c01f";
let isVerified = false;
let hasGreeted = false;

// --- AUDIO HANDLER ---
// We manage audio here to prevent overlap
function stopIntroAudio() {
    const intro = document.getElementById('audio-intro');
    if (intro) {
        intro.pause();
        intro.currentTime = 0; // Reset to start
    }
}

// --- WEBHOOK HANDLER (SILENT TEXT MODE) ---
async function sendToWebhook(text, agentName, outputFn, targetId) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, verified: isVerified })
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const reply = data.output || data.text || "Directive logged. Provisioning...";
        
        outputFn(agentName, reply, targetId);
        // Robot voice is REMOVED here. Total silence for text.

    } catch (err) {
        console.error(err);
        outputFn("SYSTEM", "Link unstable. Verify n8n webhook status.", targetId);
    }
}

// --- WAR ROOM LOGIC ---
function enterWarRoom() {
    isVerified = true;
    
    // 1. KILL THE INTRO AUDIO IMMEDIATELY
    stopIntroAudio();

    // 2. PLAY VERIFIED AUDIO
    const verifiedAudio = document.getElementById('audio-verified');
    if (verifiedAudio) verifiedAudio.play().catch(e => console.log("Audio blocked"));

    // 3. HIDE MAIN UI
    ['main', 'elusive-header', 'ai-bouncer'].forEach(id => {
        const el = document.querySelector(id) || document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 4. BUILD DASHBOARD
    document.body.style.overflow = "hidden";
    const dashboard = document.createElement('div');
    dashboard.id = "war-room-dashboard";
    // ... [Insert your existing dashboard HTML/CSS here] ...
    // For brevity, I am keeping the logic flow. Paste your dashboard HTML string here.
    dashboard.innerHTML = `
        <div style="color:white; font-family:monospace; padding:20px;">
           <h1 style="color:#ef4444">ACCESS GRANTED: OMEGA LEVEL</h1>
           <p>Welcome to the War Room.</p>
           <div id="war-room-chat" style="margin-top:20px; border:1px solid #333; height:300px; padding:10px;"></div>
           <input id="war-input" type="text" style="width:100%; margin-top:10px; padding:10px;" placeholder="Command..." onkeypress="window.handleEnter(event)">
        </div>
    `; 
    document.body.appendChild(dashboard);
}

// --- GLOBAL LISTENERS ---
window.handleEnter = function(event) {
    if (event.key === 'Enter') {
        const warInput = document.getElementById('war-input');
        if (warInput) {
             // War Room Logic
             const text = warInput.value;
             warInput.value = "";
             // Append YOU message
             // Send to Webhook
        } else {
             window.sendMessage();
        }
    }
};

window.sendMessage = function() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    
    // UI Update
    const container = document.getElementById('chat-messages');
    container.innerHTML += `<div class="msg" style="text-align:right; color:white; margin-bottom:10px;">${text}</div>`;
    input.value = "";

    // OMEGA CHECK
    if (text.toUpperCase() === "OMEGA") {
        enterWarRoom();
        return;
    }

    sendToWebhook(text, "AGENT ADAM", (role, msg, target) => {
        const box = document.getElementById(target);
        if(box) box.innerHTML += `<div class="msg" style="text-align:left; color:#ef4444; margin-bottom:10px;"><strong>${role}:</strong> ${msg}</div>`;
    }, 'chat-messages');
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }

    // Click-to-start interaction
    document.body.addEventListener('click', () => {
        if (!hasGreeted && !isVerified) {
            const intro = document.getElementById('audio-intro');
            if(intro) intro.play();
            hasGreeted = true;
            const bouncer = document.getElementById('ai-bouncer');
            if(bouncer) bouncer.classList.remove('closed');
        }
    }, { once: true });
});