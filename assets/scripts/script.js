// Toggle navigation menu display on hamburger icon click
function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Declare variables for audio player elements
const skipBackwardButton = document.getElementById('skipBackwardButton');
const skipForwardButton = document.getElementById('skipForwardButton');
const playPauseButton = document.getElementById('playPauseButton');
const progressBar = document.getElementById('progressBar');
const audioPlayer = document.getElementById('audioPlayer');
const closeButton = document.querySelectorAll(".closeButton");
const rectangles = document.querySelectorAll(".podCard");
const stopButton = document.getElementById('stopButton');
const popupText = document.getElementById("popupText");
const featured = document.querySelectorAll(".featuredPod");
const popup = document.getElementById("popup");

// Update play/pause button icon
function updatePlayPauseButton() {
    const icon = playPauseButton.querySelector('i');
    if (audioPlayer.paused) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
}

// Skip forward in audio
function skipForward() {
    skipForwardButton.classList.add('active');
    setTimeout(() => skipForwardButton.classList.remove('active'), 200);
    audioPlayer.currentTime += 10;
}

// Skip backward in audio
function skipBackward() {
    skipBackwardButton.classList.add('active');
    setTimeout(() => skipBackwardButton.classList.remove('active'), 200);
    audioPlayer.currentTime -= 10;
}

// Animate button on click
function animateButton() {
    playPauseButton.classList.add('active');
    setTimeout(() => playPauseButton.classList.remove('active'), 200);
}

// Play audio
function playAudio() {
    audioPlayer.play();
    updatePlayPauseButton();
}

// Pause audio
function pauseAudio() {
    audioPlayer.pause();
    updatePlayPauseButton();
}

// Stop audio
function stopAudio() {
    stopButton.classList.add('active');
    setTimeout(() => stopButton.classList.remove('active'), 200);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    updatePlayPauseButton();
}

// Update progress bar
function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const totalLength = audioPlayer.duration;
    const progress = (currentTime / totalLength) * 95;
    progressBar.style.width = progress+'%';
}

// Show popup window with audio information
function showPopup(rectangle) {
    document.body.style.overflow = "hidden";
    audioPlayer.src = rectangle.dataset.audio;
    popupText.querySelector("img").src = rectangle.dataset.image;
    popupText.querySelector("h2").innerHTML = rectangle.dataset.text;
    popupText.querySelector("h3").innerHTML = rectangle.dataset.beskrivning;
    popup.classList.remove("closed");
    popup.style.display = "block";
}

// Hide popup window
function hidePopup() {
    stopAudio();
    document.body.style.overflow = "auto";
    popup.classList.add("closed");
    setTimeout(() => {
        popup.style.display = "none";
        popup.classList.remove("closed");
    }, 50);
}

// Add event listeners for buttons
playPauseButton.addEventListener('click', animateButton);
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
});

stopButton.addEventListener('click', stopAudio);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
setInterval(updateProgressBar, 50);
skipForwardButton.addEventListener('click', skipForward);
skipBackwardButton.addEventListener('click', skipBackward);

// Add event listeners for rectangles to show popup
rectangles.forEach((rectangle) => {
    rectangle.addEventListener('click', () => {
        showPopup(rectangle);
    });
});

// Add event listeners for close buttons to hide popup
closeButton.forEach((close) => {
    close.addEventListener('click', hidePopup);
});

// Add event listeners for featured audio to show popup
featured.forEach((rectangle) => {
    rectangle.addEventListener('click', () => {
        showPopup(rectangle);
    });
});