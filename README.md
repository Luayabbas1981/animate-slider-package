# animate-slider

A customizable animation slider component for web projects.

## Description

`animate-slider` allows you to create responsive sliders with customizable animations, navigation options, and touch support. It offers flexible configuration for animations, transition timings, and more.

## Features

- Smooth Performance: Because it doesn't use heavy animations or require a continuous slide, it will likely perform well on all devices, including mobile, without complex calculations or frequent re-renders.

- Unique Presentation: The animation options (rotateX, rotateY, scale, fade) add a lively, modern look that can make your component stand out.

## Installation

Install via npm:

```bash
npm install animate-slider
```

```bash
import { initializeSlider } from 'animate-slider';
import 'animate-slider/src/slider.css';

initializeSlider({
  sliderContainerClass: 'your-slider-container-class',
  animation: 'rotate', // Options: 'rotate', 'scale', 'fade', 'mirror', 'pop-up'
  duration: 1, // Duration in seconds
  timingFunction: 'ease-in-out', // Options:  'linear','ease', 'ease-in', 'ease-out', 'ease-in-out'
  dots: true,
  dotColor: '#ff0000' // Customize dot color HEX color 6 digit
});
```

### Options

- **sliderContainerClass**: The CSS class of the container element.
- **animation**: The animation type (`rotate`, `scale`, `fade`, `mirror`, `pop-up`).
- **duration**: Duration of the animation in seconds.
- **timingFunction**: Timing function for animation (`linear`,`ease`, `ease-in`, `ease-out`, `ease-in-out`).
- **dots**: Show navigation dots (`true` or `false`).
- **dotColor**: Color of the navigation dots "HEX Color 6 digit".

## Dependencies
This version of animate-slider has no external dependencies, making it lightweight and easy to use. No additional packages are required to run the slider.

## HTML

```bash
<body>
  <div class="your-slider-container-class">
    <div>card-1</div>
    <div>card-2</div>
    <div>card-3</div>
  </div>
</body>
```

## Library demo

[Library demo link...](<https://luayabbas1981.github.io/virtual-slider/>)

## Other links

[Portfolio link...](<https://luayabbas1981.github.io/portfolio-last/>)