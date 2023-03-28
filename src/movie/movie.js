const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const muteBtn = document.getElementById("mute");
const volumeSlider = document.getElementById("volume");
const fullScreenBtn = document.getElementById("full-screen");
const progressBar = document.getElementById("progress-bar");
const playlistItems = document.querySelectorAll("#playlist li");

let isPlaying = false;
let isMuted = false;
let isFullScreen = false;

function togglePlayPause() {
  if (isPlaying) {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

function toggleMute() {
  if (isMuted) {
    video.muted = false;
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeSlider.value = video.volume * 100;
  } else {
    video.muted = true;
    muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    volumeSlider.value = 0;
  }
  isMuted = !isMuted;
}

function toggleFullScreen() {
  if (!isFullScreen) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  }
  isFullScreen = !isFullScreen;
}

function updateProgressBar() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.value = percentage;
}

function setVideoProgress() {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
}

function togglePlaylistItem() {
  for (let i = 0; i < playlistItems.length; i++) {
    playlistItems[i].classList.remove("current");
  }
  this.classList.add("current");
  const videoSrc = this.getAttribute("data-src");
  video.src = videoSrc;
  video.load();
  video.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  isPlaying = true;
}

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
muteBtn.addEventListener("click", toggleMute);
fullScreenBtn.addEventListener("click", toggleFullScreen);
progressBar.addEventListener("change", setVideoProgress);

for (let i = 0; i < playlistItems.length; i++) {
  playlistItems[i].addEventListener("click", togglePlaylistItem);
}

const button = document.getElementById(signout_button);
button.onclick = () => {
  google.accounts.id.disableAutoSelect();
}
