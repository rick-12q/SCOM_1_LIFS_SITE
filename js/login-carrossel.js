const loginSlides = Array.from(
  document.querySelectorAll('.login-bg-slide')
);

let loginSlideIndex = 0;

function updateLoginBackground() {
  loginSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === loginSlideIndex);
  });
}

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (loginSlides.length > 1 && !prefersReducedMotion) {
  setInterval(() => {
    loginSlideIndex = (loginSlideIndex + 1) % loginSlides.length;
    updateLoginBackground();
  }, 6000);
}

updateLoginBackground();