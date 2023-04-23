const imgs = document.querySelectorAll("#img-container");
let currentImg = 0
imgs[currentImg].classList.add("slide");

// Image function
const nextImage = () => {
  imgs[currentImg].classList.remove("slide");
  currentImg++;
  if (currentImg >= imgs.length) {
    currentImg = 0;
  }
  imgs[currentImg].classList.add("slide");
};

setInterval(nextImage, 5000);

import { addHoverEffect } from './utils.js';


const mt = document.getElementById("mouse-tracker");

document.body.onpointermove = event => {
  const { clientX, clientY } = event;

  mt.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}