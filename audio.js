// Audio extension, https://github.com/schulle4u/yellow-audio

document.addEventListener("DOMContentLoaded", function() {
    var audioList = document.getElementById("audiolist").getElementsByTagName("a");
    var audioPlayer = document.getElementById("audioPlayer");
    var playPauseButton = document.getElementById("playPauseButton");
    var stopButton = document.getElementById("stopButton");
    var rewindButton = document.getElementById("rewindButton");
    var forwardButton = document.getElementById("forwardButton");
    var volumeControl = document.getElementById("volumeControl");
    var speedControl = document.getElementById("speedControl");

    var currentAudio = null;

    for (var i = 0; i < audioList.length; i++) {
        audioList[i].addEventListener("click", function(event) {
            event.preventDefault();
            var audioFile = this.getAttribute("href");

            if (currentAudio !== null) {
                currentAudio.pause();
            }

            currentAudio = new Audio(audioFile);
            currentAudio.volume = volumeControl.value;
            currentAudio.playbackRate = speedControl.value;
            currentAudio.play();
        });
    }

    playPauseButton.addEventListener("click", function() {
        if (currentAudio !== null) {
            if (currentAudio.paused) {
                currentAudio.play();
                playPauseButton.textContent = playPauseButton.getAttribute("data-pauseLabel");
            } else {
                currentAudio.pause();
                playPauseButton.textContent = playPauseButton.getAttribute("data-playLabel");
            }
        }
    });

    stopButton.addEventListener("click", function() {
        if (currentAudio !== null) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            playPauseButton.textContent = playPauseButton.getAttribute("data-PlayLabel");
        }
    });

    rewindButton.addEventListener("click", function() {
        if (currentAudio !== null) {
            currentAudio.currentTime -= 5; // Zurückspulen um 5 Sekunden (kann angepasst werden)
        }
    });

    forwardButton.addEventListener("click", function() {
        if (currentAudio !== null) {
            currentAudio.currentTime += 5; // Vorwärtsspulen um 5 Sekunden (kann angepasst werden)
        }
    });

    volumeControl.addEventListener("input", function() {
        if (currentAudio !== null) {
            currentAudio.volume = volumeControl.value;
        }
    });

    speedControl.addEventListener("input", function() {
        if (currentAudio !== null) {
            currentAudio.playbackRate = speedControl.value;
        }
    });
});
