# animate-slider

A customizable animation slider component for web projects.

## Description

`animate-slider` allows you to create responsive sliders with customizable animations, navigation options, and touch support. It offers flexible configuration for animations, transition timings, and more.

## Features

- Smooth Performance: Because it doesn't use heavy animations or require a continuous slide, it will likely perform well on all devices, including mobile, without complex calculations or frequent re-renders.

- Unique Presentation: The animation options (spin, flip, scale) add a lively, modern look that can make your component stand out.

## Installation

Install via npm:

```bash
npm install animate-slider
npm install webpack webpack-cli css-loader style-loader --save-dev
npm run build



import { initializeSlider } from 'animate-slider';
import 'animate-slider/src/slider.css';

initializeSlider({
  sliderContainerClass: 'my-slider-container',
  animation: 'rotate', // Options: 'rotate', 'scale', 'fade', 'mirror', 'pop-up'
  duration: 1, // Duration in seconds
  timingFunction: 'ease-in-out', // Options:  'linear','ease', 'ease-in', 'ease-out', 'ease-in-out'
  dots: true,
  dotColor: '#ff0000' // Customize dot color HEX color
});
```

### Options

- **sliderContainerClass**: The CSS class of the container element.
- **animation**: The animation type (`rotate`, `scale`, `fade`, `mirror`, `pop-up`).
- **duration**: Duration of the animation in seconds.
- **timingFunction**: Timing function for animation (`ease`, `ease-in`, `ease-out`, `ease-in-out`).
- **dots**: Show navigation dots (`true` or `false`).
- **dotColor**: Color of the navigation dots "HEX Color".

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

## Webpack Configuration
Add a webpack.config.js file in the root of your project if it doesn’t exist yet. The following configuration will bundle animate-slider correctly, allowing you to import it along with its CSS and image assets:

```bash
const path = require('path');

module.exports = {
  entry: './src/index.js', // Update with your main JS file path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
```

