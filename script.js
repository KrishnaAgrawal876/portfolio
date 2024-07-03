document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const carouselInner = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showNextSlide() {
  items[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % items.length;
  items[currentIndex].classList.add("active");
}

setInterval(showNextSlide, 4000); // Change slide every 4 seconds

const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

leftBtn.addEventListener("click", () => {
  items[currentIndex].classList.remove("active");
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  items[currentIndex].classList.add("active");
});

rightBtn.addEventListener("click", () => {
  items[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % items.length;
  items[currentIndex].classList.add("active");
});

// ---------------------------------------
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const updateButtons = (currentSlideIndex) => {
  if (currentSlideIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentSlideIndex === slides.length - 3) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  const newSlideIndex = slides.indexOf(targetSlide);
  updateButtons(newSlideIndex);
};

// Move left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide") || slides[0];
  const prevSlide = currentSlide.previousElementSibling;

  if (prevSlide) {
    moveToSlide(track, currentSlide, prevSlide);
  }
});

// Move right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide") || slides[0];
  const nextSlide = currentSlide.nextElementSibling;

  if (nextSlide) {
    moveToSlide(track, currentSlide, nextSlide);
  }
});

updateButtons(0); // Initialize buttons on load
