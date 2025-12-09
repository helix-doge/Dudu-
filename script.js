// --- Global Configuration ---
const t = 50; // Delay in milliseconds for small progress bar updates
const tl = 80; // Delay in milliseconds for large startup progress bar

const log = document.getElementById('output-log');
const progressBarContainer = document.getElementById('progress-bar-container');
const thicknessInputGroup = document.getElementById('thickness-input-group');
const weightInputGroup = document.getElementById('weight-input-group');
const problemSolver = document.getElementById('problem-solver');

let thicknessValue = 0;
let weightValue = 0;
let score = 0;

// Utility function to print a message to the terminal log
function logMessage(message, className = 'status-green') {
    const p = document.createElement('span');
    p.innerHTML = message;
    p.className = className;
    log.appendChild(p);
    // Auto-scroll to the bottom
    log.scrollTop = log.scrollHeight;
}

// Utility function to update the progress bar display
function updateProgressBar(currentStep, totalSteps, message, barLength = 25) {
    const percent = ((currentStep / totalSteps) * 100).toFixed(1);
    const filledLength = Math.floor((barLength * currentStep) / totalSteps);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

    progressBarContainer.innerHTML = `
        <div class="progress-bar">
            <span>${message}</span>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${percent}%"></div>
            </div>
            <span>${percent}%</span>
        </div>
    `;
}

// Function to clear the progress bar display
function clearProgressBar() {
    progressBarContainer.innerHTML = '';
}

// --- Large Startup Progress Bar Function (Async) ---
async function fakeStartupProgress() {
    const STATUS_MESSAGES = {
        0: "Starting up...",
        20: "Server on...",
        40: "AI server up...",
        60: "AI activated...",
        80: "AI online..."
    };
    
    const TOTAL_STEPS = 100;

    for (let i = 0; i <= TOTAL_STEPS; i++) {
        const currentStatus = STATUS_MESSAGES[i] || progressBarContainer.querySelector('span')?.textContent || STATUS_MESSAGES[0];

        // Update the bar using the large bar style (# and -)
        const barLength = 50;
        const percent = ((i / TOTAL_STEPS) * 100).toFixed(1);
        const filledLength = Math.floor((barLength * i) / TOTAL_STEPS);
        const bar = '#'.repeat(filledLength) + '-'.repeat(barLength - filledLength);

        progressBarContainer.innerHTML = `
            <div class="progress-bar">
                <span class="status-green">Status: ${currentStatus.padEnd(20, ' ')} |${bar}| ${percent}%</span>
            </div>
        `;
        
        if (i === 0) logMessage(STATUS_MESSAGES[0], 'status-green');
        if (STATUS_MESSAGES[i]) logMessage(`Status Update: ${STATUS_MESSAGES[i]}`);
        
        await new Promise(resolve => setTimeout(resolve, tl));
    }

    clearProgressBar();
    logMessage("\n✅ AI ready to use!");
    weightInputGroup.classList.remove('hidden'); // Show first input
}

// --- Main Program Execution Flow ---

// 1. Initial Startup
window.onload = () => {
    // Hide all inputs initially
    thicknessInputGroup.classList.remove('hidden'); 
    weightInputGroup.classList.add('hidden'); 
    fakeStartupProgress();
};


// 2. Thickness Processing
async function processThickness() {
    thicknessValue = parseFloat(document.getElementById('thickness').value);
    if (isNaN(thicknessValue) || thicknessValue < 0) {
        logMessage("ERROR: Please enter a valid thickness.", 'status-red');
        return;
    }

    thicknessInputGroup.classList.add('hidden');
    logMessage(`\nEnter thickness of shell (cm): ${thicknessValue}`);
    logMessage("\nTHICKNESS CALCULATING...");

    const TOTAL_STEPS = 50;
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        updateProgressBar(i, TOTAL_STEPS, "Analyzing Thickness");
        await new Promise(resolve => setTimeout(resolve, t));
    }

    clearProgressBar();
    logMessage("✅ Thickness analysis complete.", 'status-blue');
    
    weightInputGroup.classList.remove('hidden'); // Show next input
    document.getElementById('weight').focus();
}


// 3. Weight Processing and Scoring
async function processWeight() {
    weightValue = parseFloat(document.getElementById('weight').value);
    if (isNaN(weightValue) || weightValue < 0) {
        logMessage("ERROR: Please enter a valid weight.", 'status-red');
        return;
    }

    weightInputGroup.classList.add('hidden');
    logMessage(`\nEnter weight of bottle (grams): ${weightValue}`);
    logMessage("\nWEIGHT DATA PROCESSING...");

    const TOTAL_STEPS = 40;
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        updateProgressBar(i, TOTAL_STEPS, "Analyzing Weight");
        await new Promise(resolve => setTimeout(resolve, t));
    }

    clearProgressBar();
    logMessage("🎉 Weight data acquisition finished.", 'status-blue');
    
    // Continue to Final AI Logic
    await finalAILogic();
}


// 4. Final AI Logic
async function finalAILogic() {
    logMessage("\nConnecting to AI Core...");

    const TOTAL_STEPS = 20;
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        updateProgressBar(i, TOTAL_STEPS, "Final Sync");
        await new Promise(resolve => setTimeout(resolve, t));
    }

    clearProgressBar();
    logMessage("--- AI DURABILITY ASSESSMENT ---", 'status-highlight');
    
    score = 0;

    // Durability scoring logic
    if (thicknessValue < 2) {
        score += 1;
    } else if (thicknessValue >= 2 && thicknessValue <= 3) {
        score += 2;
    } else if (thicknessValue > 3) {
        score += 3;
    }

    if (weightValue <= 10) {
        score += 1;
    } else if (weightValue >= 11 && weightValue <= 80) {
        score += 2;
    } else if (weightValue >= 81) {
        score += 3;
    }
    
    logMessage(`Thickness = ${thicknessValue} cm`);
    logMessage(`Weight = ${weightValue} grams`);

    // Output result based on score
    if (score === 6) {
        logMessage("AI Result: The bottle is **highly durable!** (Max Score)", 'status-green');
    } else if (score >= 3 && score <= 5) {
        logMessage("AI Result: Durability is medium. Needs improvement.", 'status-yellow');
    } else {
        logMessage("AI Result: **Low durability.** Improve material thickness and/or weight.", 'status-red');
    }

    // AI Analysis Trigger
    if (score < 3) {
        problemSolver.classList.remove('hidden');
    } else {
        logMessage("\nAnalysis complete. No further problem solving needed.");
    }
}


// 5. AI Problem-Solving Logic
async function startProblemAnalysis(option) {
    problemSolver.classList.add('hidden');
    
    if (option !== 'yes') {
        logMessage("\nAI problem analysis stopped.", 'status-blue');
        return;
    }

    logMessage("\n\nAI ANALYZING.....", 'status-yellow');

    // --- Thickness Analysis ---
    logMessage("\nTHICKNESS CALCULATING...", 'status-yellow');
    
    const TOTAL_THICKNESS_STEPS = 50;
    for (let i = 1; i <= TOTAL_THICKNESS_STEPS; i++) {
        updateProgressBar(i, TOTAL_THICKNESS_STEPS, "Analyzing Thickness");
        await new Promise(resolve => setTimeout(resolve, t));
    }
    clearProgressBar();
    logMessage("✅ Thickness Analysis Complete ...", 'status-yellow');

    if (thicknessValue < 2) {
        logMessage("\nProblem Found At Thickness -- ", 'status-red');
        logMessage("Low Thickness - Increase Thickness --", 'status-highlight');
    } else {
        logMessage("\nThickness OK -- No Problem Found At Thickness", 'status-green');
    }

    // --- Weight Analysis ---
    logMessage("\nAI Trying to check problem in Weight... ", 'status-yellow');
    logMessage("\nWEIGHT DATA PROCESSING...", 'status-blue');

    const TOTAL_WEIGHT_STEPS = 40;
    for (let i = 1; i <= TOTAL_WEIGHT_STEPS; i++) {
        updateProgressBar(i, TOTAL_WEIGHT_STEPS, "Analyzing Weight");
        await new Promise(resolve => setTimeout(resolve, t));
    }
    clearProgressBar();
    logMessage("🎉 Weight data acquisition finished.", 'status-yellow');

    if (weightValue <= 10) {
        logMessage("\nProblem Found At Weight --", 'status-red');
        logMessage("Low Weight - Increase Weight -- ", 'status-highlight');
    } else {
        logMessage("\nWeight OK -- No Problem Found At Weight", 'status-green');
    }

    // --- Final Output ---
    logMessage("\n\nFINAL OUTPUT", 'status-highlight');

    if (thicknessValue < 2) {
        logMessage("LOW THICKNESS - Increase thickness", 'status-red');
    } else {
        logMessage("THICKNESS OK", 'status-green');
    }

    if (weightValue <= 10) {
        logMessage("LOW WEIGHT - Increase weight", 'status-red');
    } else {
        logMessage("WEIGHT OK", 'status-green');
    }
}
