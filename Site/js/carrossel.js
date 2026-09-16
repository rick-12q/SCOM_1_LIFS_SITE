const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let index = 0;

//AJUDA DE IA, no caso nesse trecho usei o GPT no modo PENSAR.
function update() {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    }
  });
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  update();
});
prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  update();
});

// parametro que foca na acessibilidade. Para melhorar o trecho, usei o GEMINI PRO.
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  setInterval(() => nextBtn.click(), 6000);
}
update();