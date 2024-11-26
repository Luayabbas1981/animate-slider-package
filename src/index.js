import "./animate-slider.css";
import nextBtnImg from "./images/slider-next-btn.png";
import prevBtnImg from "./images/slider-prev-btn.png";

// Variables and initial states
const animationArray = ["scale", "fade", "rotate", "mirror", "pop-up"];
const timingFunctionArray = [
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
];

let isLargeScreen = null;
let isMediumScreen = null;
let isSmallScreen = null;
let isXSmallScreen = null;
let visibleSlides = null;
let slidesToShow = null;
let animationMode = "fade";
let timingFunctionMode = "ease-in-out";
let dotsArray = [];
let initialIndex = 0;
let currentIndex = 0;
let startX = 0;
let endX = 0;
let isTouching = false;

function initializeSlider({
  sliderContainerClass,
  animation,
  duration,
  timingFunction,
  dots,
  dotColor,
} = {}) {
  const sliderContainer = document.querySelector(`.${sliderContainerClass}`);
  if (!sliderContainer) {
    console.error(
      `No element found with class name "${sliderContainerClass}".`
    );
    return;
  }
  sliderContainer.classList.add("animate-slider-container");
  const slidesArray = Array.from(sliderContainer.children).filter(
    (child) => child.tagName === "DIV"
  );
  if (!animationArray.includes(animation)) {
    animation = animationMode;
  } else {
    animationMode = animation;
  }
  if (!timingFunctionArray.includes(timingFunction)) {
    timingFunction = timingFunctionMode;
  } else {
    timingFunctionMode = timingFunction;
  }

  // Slider elements
  const animateSlider = document.createElement("div");
  animateSlider.classList.add("animate-slider");
  const sliderPrevBtn = document.createElement("button");
  sliderPrevBtn.className = "slider-prev-btn";
  sliderPrevBtn.style.backgroundImage = `url(${prevBtnImg})`;

  const sliderNextBtn = document.createElement("button");
  sliderNextBtn.className = "slider-next-btn";
  sliderNextBtn.style.backgroundImage = `url(${nextBtnImg})`;

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");

  animateSlider.style.setProperty("--duration", `${duration}s`);
  animateSlider.style.setProperty("--timing-function", timingFunction);
  sliderContainer.style.setProperty("--dot-color", `${dotColor}5e`);
  sliderContainer.style.setProperty("--active-dot", dotColor);

  function setSlidesNumber() {
    if (isLargeScreen) {
      slidesToShow = 4;
    } else if (isMediumScreen) {
      slidesToShow = 3;
    } else if (isSmallScreen) {
      slidesToShow = 2;
    } else if (isXSmallScreen) {
      slidesToShow = 1;
    }
    sliderContainer.style.setProperty("--slides", slidesToShow);
  }

  function setDots() {
    if (dots) {
      dotsContainer.innerHTML = "";
      dotsArray = [];
      const dotsNumber = Math.ceil(slidesArray.length / slidesToShow);
      for (let index = 0; index < dotsNumber; index++) {
        const dot = document.createElement("div");
        dotsArray.push(dot);
        dot.classList.add("dot");
        dotsContainer.appendChild(dot);
        if (index === 0) dot.classList.add("active-dot");
      }
      sliderContainer.appendChild(dotsContainer);
    }
  }

  function updateActiveDot() {
    dotsArray.forEach((dot, index) => {
      dot.classList.toggle(
        "active-dot",
        index === Math.floor(currentIndex / slidesToShow)
      );
    });
  }

  function setVisibleSlides(startIndex, lastIndex) {
    sliderContainer.innerHTML = "";
    animateSlider.innerHTML = "";
    visibleSlides = slidesArray.slice(startIndex, lastIndex);
    visibleSlides.forEach((slide) => {
      animateSlider.appendChild(slide);
      slide.classList.add(`${animation}-out-animate`);
    });
    sliderContainer.appendChild(animateSlider);
    let sliderBtnWidth = (sliderContainer.clientWidth * 0.1) / slidesToShow;
    isXSmallScreen
      ? (sliderBtnWidth = sliderBtnWidth + "px")
      : (sliderBtnWidth = sliderBtnWidth * 1.3 + "px");
    sliderPrevBtn.style.width = sliderBtnWidth;
    sliderNextBtn.style.width = sliderBtnWidth;
    sliderContainer.appendChild(sliderPrevBtn);
    sliderContainer.appendChild(sliderNextBtn);
    sliderContainer.style.setProperty("--btn-width", sliderBtnWidth);
    setDots();
  }

  function setSize() {
    isLargeScreen = sliderContainer.clientWidth >= 1280;
    isMediumScreen =
      sliderContainer.clientWidth >= 1024 && sliderContainer.clientWidth < 1280;
    isSmallScreen =
      sliderContainer.clientWidth >= 768 && sliderContainer.clientWidth < 1024;
    isXSmallScreen = sliderContainer.clientWidth < 768;
    setSlidesNumber();
    setVisibleSlides(initialIndex, initialIndex + slidesToShow);
  }
  setSize();

  function handleSlideChange(direction) {
    if (!isTouching) {
      currentIndex += direction * slidesToShow;
      if (currentIndex >= slidesArray.length) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex =
          slidesArray.length -
          (slidesArray.length % slidesToShow || slidesToShow);
      }
      setVisibleSlides(currentIndex, currentIndex + slidesToShow);
      updateActiveDot();
    }
  }

  // Slider events
  window.addEventListener("resize", setSize);
  sliderNextBtn.addEventListener("click", () => handleSlideChange(1));
  sliderPrevBtn.addEventListener("click", () => handleSlideChange(-1));

  sliderContainer.addEventListener("touchstart", (e) => {
    isTouching = true;
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener("touchend", () => {
    if (endX !== 0) {
      const swipeDistance = endX - startX;
      const minSwipeDistance = 50;

      if (swipeDistance > minSwipeDistance) {
        sliderPrevBtn.onclick();
      } else if (swipeDistance < -minSwipeDistance) {
        sliderNextBtn.onclick();
      }
      startX = 0;
      endX = 0;
    }
    isTouching = false;
  });
}
export { initializeSlider };
k