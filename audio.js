// Audio extension, https://github.com/schulle4u/yellow-audio

document.addEventListener("DOMContentLoaded", function() {
    var audioLists = document.getElementsByClassName("audiolist");

    Array.prototype.forEach.call(audioLists, function(container) {
        var audioLinks = container.getElementsByTagName("a");

        // Make every link an audio link
        Array.prototype.forEach.call(audioLinks, function(link) {
            link.setAttribute("data-role", "audio-link");
        });

        var playPauseButton = container.querySelector('[data-role="playPauseButton"]');
        var stopButton = container.querySelector('[data-role="stopButton"]');
        var rewindButton = container.querySelector('[data-role="rewindButton"]');
        var forwardButton = container.querySelector('[data-role="forwardButton"]');
        var volumeControl = container.querySelector('[data-role="volumeControl"]');
        var speedControl = container.querySelector('[data-role="speedControl"]');

        var currentAudio = null;

        Array.prototype.forEach.call(audioLinks, function(link) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                var audioFile = this.getAttribute("href");

                if (currentAudio !== null) {
                    currentAudio.pause();
                }

                currentAudio = new Audio(audioFile);
                currentAudio.volume = volumeControl.value;
                currentAudio.playbackRate = speedControl.value;
                currentAudio.preload = "none";
                currentAudio.play();
            });
        });

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
                playPauseButton.textContent = playPauseButton.getAttribute("data-playLabel");
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
});
