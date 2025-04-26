# Safe Help - Emergency Web Hotline

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Safe Help is a web application designed to quickly and discreetly activate emergency protocols in situations where a user might not be able to make a phone call. By simply saying a predefined safe word ("help" by default) or pressing the Ctrl key, the application simulates contacting emergency services, shares the user's approximate location, and activates their device's webcam and microphone to provide a live feed.

**Please note:** This is a project for demonstration and educational purposes. It does **not** actually contact emergency services. It simulates the process by displaying messages and playing a recorded audio.

## Features

* **Voice Activation:** Triggers emergency protocol upon detecting the safe word "help".
* **Keyboard Activation:** Activates emergency protocol by pressing the Ctrl key.
* **Simulated Emergency Call:** Displays a visual simulation of contacting a hotline.
* **Audio Feedback:** Plays a recorded message (`safe help.flac`) to simulate communication with the hotline.
* **Approximate Location Sharing:** Attempts to retrieve and display the user's approximate location using the browser's geolocation API.
* **Live Video and Audio Feed:** Attempts to activate the user's webcam and microphone to provide a live feed within the application.

## Technologies Used

* HTML
* CSS (Tailwind CSS)
* JavaScript
* Web Speech API
* Geolocation API
* WebRTC API (`getUserMedia`)
* OpenStreetMap Nominatim API (for reverse geocoding - optional for address display)

## Setup and Usage

1.  **Clone the repository** (if you have the code in a repository).
2.  **Ensure you have a local web server set up.** Due to browser security restrictions (especially for geolocation and media devices), it's recommended to serve the `hotline.html` file via HTTPS or `localhost`. You can use tools like Python's `http.server`:
    ```bash
    python -m http.server 8000
    ```
    or `npm http-server`.
3.  **Place the `safe help.flac` audio file in the same directory as your `hotline.html` file.**
4.  **Open your web browser and navigate to the URL of your local server** (e.g., `http://localhost:8000/hotline.html`).
5.  **Grant microphone, location, and webcam permissions** when prompted by your browser.
6.  **To activate the emergency protocol:**
    * Say the word "**help**" clearly.
    * Press the **Ctrl** key.
7.  Observe the application simulate the emergency call, display your approximate location, and show the live video feed area.

## Important Notes

* **This application is a simulation and does not contact real emergency services.**
* The accuracy of the location depends on the user's device and browser capabilities.
* Webcam and microphone access require user permission.
* For the voice recognition to work, your browser needs to support the Web Speech API (most modern Chrome and Edge browsers do).
* Reverse geocoding to display a readable address relies on the OpenStreetMap Nominatim API, which is a public service and might have usage limitations.

## Potential Future Enhancements

* Allow users to configure different safe words.
* Implement a more robust method for handling location data.
* Explore options for securely transmitting (simulated) data.
* Add user interface improvements and customization.
* Consider alternative audio feedback mechanisms.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Emmanuel_the_Great]

---
