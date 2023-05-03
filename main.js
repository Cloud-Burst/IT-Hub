import { addHoverEffect, handleFormSubmit } from './utils.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

handleFormSubmit();


const imgs = document.querySelectorAll("#img-container");
let currentImg = 0;
let timerId;

imgs[currentImg].classList.add("slide");

// Image function
const nextImage = () => {
  imgs[currentImg].classList.remove("slide");
  currentImg = (currentImg + 1) % imgs.length;
  imgs[currentImg].classList.add("slide");
};

// Start the timer
const startTimer = () => {
  timerId = setInterval(nextImage, 5000);
};

// Stop the timer
const stopTimer = () => {
  clearInterval(timerId);
};

// Attach event listener to each image
imgs.forEach(img => {
  img.addEventListener("mouseover", stopTimer);
  img.addEventListener("mouseout", startTimer);
});

// Start the timer initially
startTimer();
