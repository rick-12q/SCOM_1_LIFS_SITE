const video = document.getElementById('lab-video');
const volumeButton = document.getElementById('video-volume');
const pauseButton = document.getElementById('video-pause');
const restartButton = document.getElementById('video-restart');

if (video && volumeButton && pauseButton && restartButton) {

  volumeButton.addEventListener('click', () => {
    video.muted = !video.muted;

    if (video.muted) {
      volumeButton.textContent = '🔇';
    } else {
      volumeButton.textContent = '🔊';
    }
  });

  pauseButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      pauseButton.textContent = '⏸';
    } else {
      video.pause();
      pauseButton.textContent = '▶';
    }
  });

  restartButton.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
    pauseButton.textContent = '⏸';
  });

}

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  },
  {
    threshold: 0.5
  }
);

if (video) {
  videoObserver.observe(video);
}