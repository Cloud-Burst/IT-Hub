import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { checkSignIn, handleCourseClick, courseList } from "./utils.js";

courseList.addEventListener('click', handleCourseClick);

// Event listener for the Submit button
const submitButton = document.querySelector('.note-saves button[type="submit"]');
submitButton.addEventListener('click', saveNote);

// Event listener for the Clear All button
const clearButton = document.querySelector('.note-saves button[type="reset"]');
clearButton.addEventListener('click', clearAllNotes);

// Event delegation for removing list items
const noteList = document.querySelector('.note-content ul');
noteList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const listItem = event.target;
    removeListItem(listItem);
  }
});

// Load saved notes on page load
loadNotes();


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBzcramTbR5xW1ldGAq1m0Qk6Sjkhu89t0",
  authDomain: "proposal-db.firebaseapp.com",
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "proposal-db",
  storageBucket: "proposal-db.appspot.com",
  messagingSenderId: "295239881286",
  appId: "1:295239881286:web:4fe111a1c755839f41f047"
};

const app = initializeApp(firebaseConfig, {});
const auth = getAuth();

//checkSignIn(auth);


const imgs = document.querySelectorAll("#img-container");
let currentImg = 0;
let timerId;

imgs[currentImg].classList.add("slide");

// Image function
const nextImage = () => {
  imgs[currentImg].classList.remove("slide");
  currentImg = (currentImg + 1) % imgs.length;
  imgs[currentImg].style.display = "none";
  imgs[currentImg].style.display = "flex";
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


const ctgBlock = document.querySelectorAll(".ctg-block");

ctgBlock.forEach(block => {
  block.addEventListener("click", () => {
    window.location.href = "./learn.html";
  });
});

