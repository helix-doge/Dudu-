// --- Global DOM & Config ---
const t = 100; // General delay in milliseconds for status updates
const STATUS_MESSAGES = [
    "Initializing System...", 
    "Establishing Secure Connection...", 
    "Loading AI Core Modules...",
    "Validating AI Checksum...",
    "System Operational."
];

let thicknessValue = 0;
let weightValue = 0;
let score = 0;

// DOM Elements
const startupScreen = document.getElementById('startup-screen');
const startupStatus = document.getElementById('startup-status');
const inputScreen = document.getElementById('input-screen');
const thicknessCard = document.getElementById('thickness-card');
const weightCard = document.getElementById('weight-card');
const resultScreen = document.getElementById('result-screen');
const reportBox = document.getElementById('report-box');
const problemSolver = document.getElementById('problem-solver');
const problemOutput = document.getElementById('problem-analysis-output');


// Utility Function to handle delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Core Application Stages ---

async function fakeStartupSequence() {
    for (let i = 0; i < STATUS_MESSAGES.length; i++) {
        startupStatus.textContent = STATUS_MESSAGES[i];
        await sleep(i < STATUS_MESSAGES.length - 1 ? 800 : 1500); // Longer delay for final step
    }
    
    // Transition to Input Screen
    startupScreen.classList.add('hidden');
    inputScreen.classList.remove('hidden');
    document.getElementById('thickness').focus();
}

async function processThickness() {
    thicknessValue = parseFloat(document.getElementById('thickness').value);
    
    if (isNaN(thicknessValue) || thicknessValue <= 0) {
        document.getElementById('thickness-status').innerHTML = `<span style="color:var(--error-color);"><i class="fas fa-exclamation-triangle"></i> Invalid value. Enter > 0.</span>`;
        return;
    }

    const statusElement = document.getElementById('thickness-status');
    statusElement.innerHTML = `<span style="color:var(--primary-color);"><i class="fas fa-sync fa-spin"></i> Analyzing Thickness...</span>`;
    
    // Simulate Processing Delay
    await sleep(t * 15); 
    
    statusElement.innerHTML = `<span style="color:var(--success-color);"><i class="fas fa-check-circle"></i> Thickness: ${thicknessValue} cm. Data acquired.</span>`;
    
    // Unlock next stage
    thicknessCard.classList.add('disabled');
    weightCard.classList.remove('disabled');
    document.getElementById('weight').disabled = false;
    document.querySelector('#weight-card button').disabled = false;
    document.getElementById('weight').focus();
}

async function processWeight() {
    weightValue = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(weightValue) || weightValue <= 0) {
        document.getElementById('weight-status').innerHTML = `<span style="color:var(--error-color);"><i class="fas fa-exclamation-triangle"></i> Invalid value. Enter > 0.</span>`;
        return;
    }
    
    const statusElement = document.getElementById('weight-status');
    statusElement.innerHTML = `<span style="color:var(--primary-color);"><i class="fas fa-sync fa-spin"></i> Analyzing Weight...</span>`;
    
    // Simulate Processing Delay
    await sleep(t * 12);
    
    statusElement.innerHTML = `<span style="color:var(--success-color);"><i class="fas fa-check-circle"></i> Weight: ${weightValue} grams. Data acquired.</span>`;
    
    // Transition to Results
    inputScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    await finalAILogic();
}

// --- AI Logic and Reporting ---

function calculateScore() {
    score = 0;

    // Thickness Scoring
    if (thicknessValue < 2) {
        score += 1;
    } else if (thicknessValue >= 2 && thicknessValue <= 3) {
        score += 2;
    } else if (thicknessValue > 3) {
        score += 3;
    }

    // Weight Scoring
    if (weightValue <= 10) {
        score += 1;
    } else if (weightValue >= 11 && weightValue <= 80) {
        score += 2;
    } else if (weightValue >= 81) {
        score += 3;
    }
}

async function finalAILogic() {
    reportBox.innerHTML = `<span style="color:var(--primary-color);"><i class="fas fa-sync fa-spin"></i> Connecting to AI Core...</span>`;
    await sleep(t * 10);
    
    calculateScore();
    
    let resultMessage;
    let resultClass;
    
    if (score === 6) {
        resultMessage = "AI Result: **HIGHLY DURABLE!** (Max Score)";
        resultClass = 'status-high';
    } else if (score >= 3 && score <= 5) {
        resultMessage = "AI Result: **MEDIUM DURABILITY.** Needs review.";
        resultClass = 'status-medium';
    } else {
        resultMessage = "AI Result: **LOW DURABILITY.** Critical improvement needed.";
        resultClass = 'status-low';
    }
    
    reportBox.className = `report-box ${resultClass}`;
    reportBox.innerHTML = resultMessage;

    // Display final stats
    document.getElementById('final-stats').innerHTML = `
        <div class="stat-item"><div class="stat-value">${thicknessValue} cm</div><div class="stat-label">Thickness</div></div>
        <div class="stat-item"><div class="stat-value">${weightValue} g</div><div class="stat-label">Weight</div></div>
        <div class="stat-item"><div class="stat-value">${score} / 6</div><div class="stat-label">Total Score</div></div>
    `;

    // Show problem solver if score is low
    if (score < 3) {
        problemSolver.classList.remove('hidden');
    }
}

// --- Deep-Dive Problem Analysis ---

async function startProblemAnalysis(option) {
    problemSolver.classList.add('hidden');
    
    if (option !== 'yes') {
        problemOutput.classList.remove('hidden');
        problemOutput.innerHTML = `<p style="color:var(--secondary-color);"><i class="fas fa-times-circle"></i> Analysis skipped by user.</p>`;
        return;
    }
    
    problemOutput.classList.remove('hidden');
    problemOutput.innerHTML = `<p style="color:var(--warning-color);"><i class="fas fa-dna"></i> Starting Deep-Dive Diagnostic...</p>`;
    await sleep(t * 10);

    let output = "--- FINAL DIAGNOSTIC REPORT ---\n";

    // Thickness Check
    output += "\n[1/2] Analyzing Thickness...\n";
    await sleep(t * 10);
    if (thicknessValue < 2) {
        output += "   - **PROBLEM:** Low Thickness (T < 2 cm). **ACTION:** Increase Thickness.\n";
    } else {
        output += "   - <span class='ok'>Thickness OK</span>.\n";
    }
    problemOutput.innerHTML = `<pre>${output}</pre>`; // Use pre tag for formatted output
    
    // Weight Check
    output += "\n[2/2] Analyzing Weight...\n";
    await sleep(t * 10);
    if (weightValue <= 10) {
        output += "   - **PROBLEM:** Low Weight (W <= 10 g). **ACTION:** Increase Weight.\n";
    } else {
        output += "   - <span class='ok'>Weight OK</span>.\n";
    }
    problemOutput.innerHTML = `<pre>${output}</pre>`;
    output += "\n-- Diagnostic Complete --\n";
    
    problemOutput.innerHTML = `<pre>${output}</pre><p style="color:var(--success-color);"><i class="fas fa-check-double"></i> Diagnostic Complete.</p>`;
}

// --- Reset Function ---
function resetApplication() {
    window.location.reload();
}

// --- Initialization ---
window.onload = () => {
    fakeStartupSequence();
};
