let voiceEnabled = true; // Track if the voice is enabled

function getAdvice() {
    const chatbot = document.getElementById('chatbot');
    chatbot.innerHTML = ''; // Clear the chatbot div before typing

    // Test text for speech synthesis
    const advice = "Hello, this is a test of the speech synthesis.";

    let i = 0;

    // Typing effect function
    function typeText() {
        if (i < advice.length) {
            chatbot.innerHTML += advice.charAt(i); // Append each character one by one
            i++;
            setTimeout(typeText, 50); // Control the typing speed (50ms delay)
        } else {
            // Speak the text after typing is complete
            if (voiceEnabled) {
                speakText(advice);
            }
        }
    }

    // Voice narration function
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const speechSynthesisInstance = new SpeechSynthesisUtterance(text);
            speechSynthesisInstance.pitch = 1; // Adjust pitch and rate
            speechSynthesisInstance.rate = 1;

            // Speak the text
            window.speechSynthesis.speak(speechSynthesisInstance);
        } else {
            console.error("Speech Synthesis not supported in this browser.");
        }
    }

    // Start typing the text
    typeText();
}

// Toggle voice on/off
function toggleVoice() {
    voiceEnabled = !voiceEnabled; // Toggle the voice state
    const toggleButton = document.getElementById('toggleSoundButton');
    
    // Update button text based on current state
    if (voiceEnabled) {
        toggleButton.innerText = "Turn Off Sound";
    } else {
        toggleButton.innerText = "Turn On Sound";
        window.speechSynthesis.cancel(); // Stop any ongoing speech
    }
}
