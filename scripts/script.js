/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

const skipBackwardButton = document.getElementById('skipBackwardButton');
const skipForwardButton = document.getElementById('skipForwardButton');
const playPauseButton = document.getElementById('playPauseButton');
const progressBar2 = document.getElementById('progressBarLine');
const progressBar = document.getElementById('progressBar');
const audioPlayer = document.getElementById('audioPlayer');
const closeButton = document.querySelectorAll(".closeButton");
const rectangles = document.querySelectorAll(".podCard");
const stopButton = document.getElementById('stopButton');
const popupText = document.getElementById("popupText");
const featured = document.querySelectorAll(".featuredPod");
const popup = document.getElementById("popup");

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

function skipForward() {
    skipForwardButton.classList.add('active');
    setTimeout(() => skipForwardButton.classList.remove('active'), 200);
    audioPlayer.currentTime += 10;
}

function skipBackward() {
    skipBackwardButton.classList.add('active');
    setTimeout(() => skipBackwardButton.classList.remove('active'), 200);
    audioPlayer.currentTime -= 10;
}

function animateButton() {
    playPauseButton.classList.add('active');
    setTimeout(() => playPauseButton.classList.remove('active'), 200);
}

function playAudio() {
    audioPlayer.play();
    updatePlayPauseButton();
}

function pauseAudio() {
    audioPlayer.pause();
    updatePlayPauseButton();
}

function stopAudio() {
    stopButton.classList.add('active');
    setTimeout(() => stopButton.classList.remove('active'), 200);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    updatePlayPauseButton();
}

function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const totalLength = audioPlayer.duration;
    const progress = (currentTime / totalLength) * 95;
    progressBar2.style.width = `${progress}%`;
}

function showPopup(rectangle) {
    document.body.style.overflow = "hidden";
    audioPlayer.src = rectangle.dataset.audio;
    popupText.querySelector("img").src = rectangle.dataset.image;
    popupText.querySelector("h2").innerHTML = rectangle.dataset.text;
    popupText.querySelector("h3").innerHTML = rectangle.dataset.beskrivning;
    popup.classList.remove("closed");
    popup.style.display = "block";
}

function hidePopup() {
    stopAudio();
    document.body.style.overflow = "auto";
    popup.classList.add("closed");
    setTimeout(() => {
        popup.style.display = "none";
        popup.classList.remove("closed");
    }, 50);
}

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

featured.forEach(rectangle => rectangle.addEventListener("click", () => showPopup(rectangle)));
rectangles.forEach(rectangle => rectangle.addEventListener("click", () => showPopup(rectangle)));

popup.addEventListener("click", event => {
    if (event.target === popup) {
        hidePopup();
    }
});

closeButton.forEach(rectangle => rectangle.addEventListener("click", () => hidePopup()));