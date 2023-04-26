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


// Get the form element
const form = document.querySelector("form");

// Add a submit event listener to the form element
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the values of the input fields
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Check if any of the fields are empty
  if (name === "" || email === "" || message === "") {
    // Show an alert message if any of the fields are empty
    alert("All fields are required.");
  } else {
    // Show a thank you message and reset the form
    alert(`Thank you! ${name} We have received your message.`);
    form.reset();
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cardDB = ref(database, "progList");

const youtubeLink = "https://www.youtube.com/watch?v=abcd1234";
const text = "This is a new video.";
let newDataRef;
newDataRef = ({
  youtubeLink: youtubeLink,
  text: text
});

//push(cardDB, newDataRef)
