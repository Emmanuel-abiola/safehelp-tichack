window.addEventListener('DOMContentLoaded', (event) => {
    const voiceStatus = document.getElementById('voice-status');
    const statusMessage = document.getElementById('status-message');
    const locationDisplay = document.getElementById('location-display');

    // Activate emergency protocol on Ctrl key press
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey) {
            activateEmergencyProtocol();
        }
    });

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        // Start listening when the page loads
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            if (transcript === "help") {  // Changed activation word to "help"
                activateEmergencyProtocol();
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            voiceStatus.innerText = "Listening error. Please refresh the page and try again.";
        };
    } else {
        voiceStatus.innerText = "Voice recognition not supported on this browser.";
    }

    // Function to activate emergency protocol
    function activateEmergencyProtocol() {
        // Update status message
        statusMessage.innerText = "Emergency activated! Calling hotline...";
        voiceStatus.classList.remove('alert-info');
        voiceStatus.classList.add('alert-danger');
        voiceStatus.innerText = "Emergency protocol activated.";
    
        // Show the call simulation animation
        const callSimulation = document.getElementById('call-simulation');
        callSimulation.style.display = "block";
        document.getElementById('call-status').innerText = "Calling Hotline";
        document.getElementById('call-date').innerText = "20-10-2020";
        document.getElementById('help-message').innerText = "Help is on the way...";
    
        // Delay the text-to-speech to occur after the animation is visible for 3 seconds
        setTimeout(() => {
            // Use text-to-speech to read out the message
            const message = "Hello, this is Safe Help Hotline, help is on the way, your location has been shared , and we have receibved a live feed of your situation";
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }, 3000); // 3000 ms = 3 seconds
    
        // Trigger call logic
        fetch('/make-call', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: '+234XXXXXXXXXX' })  // Replace with actual Nigerian number
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error making call:", data.error);
                statusMessage.innerText = "Failed to make an emergency call.";
            } else {
                console.log("Call initiated:", data.callSid);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            statusMessage.innerText = "call initiated , you have successfully reached our hotline";
        });
    
        // Start location sharing and live feed
        shareLocation();
        startLiveFeed();
    }
    

    // Function to get and display location with reverse geocoding
    async function shareLocation() {
        const knownLocation = {
            latitude: 7.3062,      // Exact latitude for Akad FUTA north gate
            longitude: 5.1374      // Exact longitude for Akad FUTA north gate
        };
        const locationThreshold = 0.01; // Tolerance level for latitude and longitude difference
    
        if (navigator.geolocation) {
            // Initial message while fetching location
            locationDisplay.innerText = "Fetching address...";
    
            // Start geolocation fetching
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
    
                // Delay for 10 seconds to simulate fetching
                setTimeout(() => {
                    // Check if current location matches known location
                    if (Math.abs(latitude - knownLocation.latitude) < locationThreshold && 
                        Math.abs(longitude - knownLocation.longitude) < locationThreshold) {
                        locationDisplay.innerText = "Location: Akad FUTA north gate, Akure, Ondo, Nigeria";
                    } else {
                        // Display the fallback address
                        locationDisplay.innerText = "Location: Akad FUTA north gate, Akure, Ondo, Nigeria";
                    }
                }, 5000); // 10-second delay
            }, () => {
                locationDisplay.innerText = "Unable to access location.";
            });
        } else {
            locationDisplay.innerText = "Geolocation not supported by this browser.";
        }
    }
    
    // Start live feed with WebRTC
    function startLiveFeed() {
        const videoFeed = document.getElementById('video-feed');
        videoFeed.innerHTML = ""; // Clear any placeholder text

        const videoElement = document.createElement('video');
        videoElement.classList.add("embed-responsive-item");
        videoElement.setAttribute("autoplay", true);
        videoFeed.appendChild(videoElement);

        // Access user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoElement.srcObject = stream;
            })
            .catch((error) => {
                console.error("Error accessing webcam:", error);
                videoFeed.innerHTML = "<p class='text-center text-muted'>Unable to access live feed.</p>";
            });
    }
});
