const slides = document.querySelectorAll('.slider img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let isAnimating = false;
const slideWidth = 800; // px
const autoPlayDelay = 3000; // ms
let autoPlayInterval = null;

function showSlide(index, direction = 1) {
  if (isAnimating || index === currentIndex) return;
  isAnimating = true;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[index];

  gsap.set(nextSlide, { x: direction * slideWidth });
  gsap.timeline({
    onComplete: () => {
      currentIndex = index;
      isAnimating = false;
    }
  })
  .to(currentSlide, { x: -direction * slideWidth, duration: 0.6, ease: "power2.inOut" }, 0)
  .to(nextSlide, { x: 0, duration: 0.6, ease: "power2.inOut" }, 0);
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex, 1);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex, -1);
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  startAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  startAutoPlay();
});

// Initialize first slide position
gsap.set(slides, { x: slideWidth });
gsap.set(slides[0], { x: 0 });

// Start autoplay
startAutoPlay();
