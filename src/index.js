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

let isXLargeScreen = null;
let isLargeScreen = null;
let isMediumScreen = null;
let isSmallScreen = null;
let isXSmallScreen = null;
let visibleSlides = null;
let slidesToShow = null;
let animationMode = "fade";
let timingFunctionMode = "ease-in-out";
let dotsMode = true;
let dotsArray = [];
let dotsColor = "#03a9f4";
let durationTime = 1;
let initialIndex = 0;
let currentIndex = 0;
let startX = 0;
let endX = 0;
let isTouching = false;

const sliderPrevBtn = document.createElement("button");
sliderPrevBtn.className = "slider-prev-btn";
sliderPrevBtn.style.backgroundImage = `url(${prevBtnImg})`;

const sliderNextBtn = document.createElement("button");
sliderNextBtn.className = "slider-next-btn";
sliderNextBtn.style.backgroundImage = `url(${nextBtnImg})`;

const dotsContainer = document.createElement("div");
dotsContainer.classList.add("dots-container");

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
  if (!duration) {
    duration = durationTime;
  }
  if (!dots) {
    dotsMode = false;
  }
  if (!dotColor) {
    dotColor = dotsColor;
  }

  sliderContainer.style.setProperty("--duration", `${duration}s`);
  sliderContainer.style.setProperty("--timing-function", timingFunction);
  sliderContainer.style.setProperty("--dot-color", `${dotColor}5e`);
  sliderContainer.style.setProperty("--active-dot", dotColor);

  function setCardsNumber() {
    if (isXLargeScreen) {
      slidesToShow = 5;
    } else if (isLargeScreen) {
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
    if (dotsMode) {
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

  function setVisibleCards(startIndex, lastIndex) {
    sliderContainer.innerHTML = "";
    sliderContainer.appendChild(sliderPrevBtn);
    visibleSlides = slidesArray.slice(startIndex, lastIndex);
    visibleSlides.forEach((slide) => {
      sliderContainer.appendChild(slide);
      slide.classList.add(`${animation}-out-animate`);
    });
    sliderContainer.appendChild(sliderNextBtn);
    setDots();
  }

  function setSize() {
    isXLargeScreen = window.innerWidth >= 1800;
    isLargeScreen = window.innerWidth >= 1600;
    isMediumScreen = window.innerWidth >= 1100 && window.innerWidth < 1600;
    isSmallScreen = window.innerWidth >= 700 && window.innerWidth < 1100;
    isXSmallScreen = window.innerWidth < 700;
    setCardsNumber();
    sliderPrevBtn.style.width = `${
      (window.innerWidth * 0.15) / slidesToShow
    }px`;
    sliderNextBtn.style.width = `${
      (window.innerWidth * 0.15) / slidesToShow
    }px`;

    setVisibleCards(initialIndex, initialIndex + slidesToShow);
  }
  setSize();
  window.addEventListener("resize", setSize);

  sliderNextBtn.onclick = () => {
    if (!isTouching) {
      currentIndex += slidesToShow;
      if (currentIndex >= slidesArray.length) {
        currentIndex = 0;
      }
      setVisibleCards(currentIndex, currentIndex + slidesToShow);
      updateActiveDot();
    }
  };

  sliderPrevBtn.onclick = () => {
    if (!isTouching) {
      currentIndex -= slidesToShow;
      if (currentIndex < 0) {
        currentIndex = slidesArray.length - slidesToShow;
      }
      setVisibleCards(currentIndex, currentIndex + slidesToShow);
      updateActiveDot();
    }
  };

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
