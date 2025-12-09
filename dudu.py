import time
import sys

# --- Reusable Small Progress Bar Function ---
def inline_progress_update(current_step, total_steps, message="Processing..."):
    """
    Displays a small, single-line progress bar update.
    """
    
    # Configuration for the bar
    BAR_LENGTH = 25
    
    # Calculate progress components
    percent = ("{0:.1f}").format(100 * (current_step / float(total_steps)))
    filled_length = int(BAR_LENGTH * current_step // total_steps)
    bar = '█' * filled_length + '░' * (BAR_LENGTH - filled_length)

    # Create the display string
    display = f'\r{message:<15} |{bar}| {percent}%'
    
    # Write and flush
    sys.stdout.write(display)
    sys.stdout.flush()


# --- Large Startup Progress Bar Function ---
def fake_startup_progress():
    """Simulates a loading sequence with distinct status messages."""
    
    STATUS_MESSAGES = {
        0: "Starting up...",
        20: "Server on...",
        40: "AI server up...",
        60: "AI activated...",
        80: "AI online..."
    }
    
    TOTAL_STEPS = 100
    BAR_LENGTH = 50
    current_status = STATUS_MESSAGES.get(0, "")

    for i in range(TOTAL_STEPS + 1):
        if i in STATUS_MESSAGES:
            current_status = STATUS_MESSAGES[i]
        
        percent = ("{0:.1f}").format(100 * (i / float(TOTAL_STEPS)))
        filled_length = int(BAR_LENGTH * i // TOTAL_STEPS)
        bar = '#' * filled_length + '-' * (BAR_LENGTH - filled_length)
        
        display = f'\rStatus: {current_status:<20} |{bar}| {percent}%'
        
        sys.stdout.write(display)
        sys.stdout.flush()
        
        time.sleep(0.05)

    print("\n\n✅ AI ready to use!")

# ===============================================
# --- MAIN PROGRAM EXECUTION ---
# ===============================================

print("Project Name")
print("\nWELCOME to --- \n\n")

# --- 1. Run the Startup Sequence ---
fake_startup_progress()

# --- 2. Input 1 (Thickness) & Processing 1 (Analysis) ---
thickness = float(input("\nEnter thickness of shell (cm): "))

TOTAL_THICKNESS_STEPS = 50 
print("\nTHICKNESS CALCULATING...")

for i in range(1, TOTAL_THICKNESS_STEPS + 1):
    inline_progress_update(i, TOTAL_THICKNESS_STEPS, message="Analyzing Thickness")
    time.sleep(0.02)

inline_progress_update(TOTAL_THICKNESS_STEPS, TOTAL_THICKNESS_STEPS, message="Thickness Done!")
print("\n✅ Thickness analysis complete.")


# --- 3. Input 2 (Weight) & Processing 2 (Server/Communication) ---
weight = float(input("\nEnter weight of bottle (grams): "))

TOTAL_WEIGHT_STEPS = 40
print("\nWEIGHT DATA PROCESSING...")

for i in range(1, TOTAL_WEIGHT_STEPS + 1):
    # This is the new progress bar for weight input
    inline_progress_update(i, TOTAL_WEIGHT_STEPS, message="Analyzing Weight")
    time.sleep(0.05) 

# Final cleanup
inline_progress_update(TOTAL_WEIGHT_STEPS, TOTAL_WEIGHT_STEPS, message="Weight Done!")
print("\n🎉 Weight data acquisition finished.")


# --- 4. Final AI Logic and Output ---
print("\nConnecting to AI Core...")

TOTAL_COMMUNICATION_STEPS = 20
for i in range(1, TOTAL_COMMUNICATION_STEPS + 1):
    inline_progress_update(i, TOTAL_COMMUNICATION_STEPS, message="Final Sync")
    time.sleep(0.1) 

inline_progress_update(TOTAL_COMMUNICATION_STEPS, TOTAL_COMMUNICATION_STEPS, message="Evaluation...")
print("\n\n--- AI DURABILITY ASSESSMENT ---\n")

score = 0

# Durability scoring logic
if thickness < 2:
    score += 1

elif thickness >= 2 and thickness <= 3:
    score +=2

elif thickness > 3:
    score +=3

if weight <= 10:
    score += 1

elif weight >=11 and weight <=80:
    score += 2

elif weight >= 81:
    score += 3

# Output result based on score
if score == 6:
    print("\033[1;32mAI Result: The bottle is **highly durable!** (Max Score)\033[0m")
elif score >= 3 and score <= 5:
    print("\033[33mAI Result: Durability is medium. One criterion met.\033[0m")
else:
    print("\033[31mAI Result: **Low durability.** Improve material thickness and/or weight.\033[0m")
    
#ai analysis 

if score < 3:
    print("\n\nTo Find Problem -- \nEnter - 'yes' to start ai to find problem -- \nEnter - 'no' to stop the ai  ")
    problem=input("Enter Option - ")

    if problem == "yes":
        print("\n\nAI ANALYIZING.....")

        TOTAL_THICKNESS_STEPS = 50
        print("\n\nTHICKNESS CALCULATING...\n")

        for i in range(1, TOTAL_THICKNESS_STEPS + 1):
            inline_progress_update(i, TOTAL_THICKNESS_STEPS, message="Analyzing Thickness")
            time.sleep(0.2)

            inline_progress_update(TOTAL_THICKNESS_STEPS,TOTAL_THICKNESS_STEPS, message="Thickness Done!")
            print("\n\033[33m✅ Thickness Analysis Complete ... \033[0m")

            if thickness < 2:
                print("\n\033[31mProblem Found At Thickness -- \n\n Low thickness - Increase Thickness --\033[0m")
            
            else:
                print("\n\033[33mThickness OK -- No Problem Found At Thickness \033[0m")

        print("\n\n\033[34mAI Trying to check problem in Weight... \033[0m")

        