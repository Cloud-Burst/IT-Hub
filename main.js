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
import { getDatabase, ref, push, onValue, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cardDB = ref(database, "progList");
const sugDB = ref(database, "suggestionProfiles");

const title = "";

const youtubeLink = '<iframe width="560" height="315" src="https://www.youtube.com/embed/n-PgPuFhrEY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

const text = "This is a new video.";

let newDataRef;
newDataRef = ({
  title: title,
  youtubeLink: youtubeLink,
  text: text
});

//push(cardDB, newDataRef)

// Initialize index to 0 to start at the first element
let i;

// Get all .ctg-card elements
const ctgCards = document.querySelectorAll('.ctg-card');

// Attach a click event listener to each .ctg-card element
ctgCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    i = index;
    // Retrieve data from the database based on the data-key attribute
    const dataKey = card.getAttribute('data-key');
    const specificDataRef = child(cardDB, dataKey);
    onValue(specificDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const youtubeLink = data.youtubeLink;
        //console.log(youtubeLink)
        const text = data.text;
        const title = data.title;

        // Update the HTML with the retrieved data
        const youtubeLinkDiv = document.getElementById("youtube-link");
        youtubeLinkDiv.innerHTML = `
          ${youtubeLink}
        `;

        const titleEl = document.getElementById("title");
        titleEl.innerText = title;

        const summaryEl = document.getElementById("summary");
        summaryEl.innerText = text;
        

        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
        
        shuffleData();
      } else {
        alert(`No Content yet.`);
      }
    });
  });
});


// Function to display the next card in the modal
function nextCard() {
  shuffleData();
  // Get all .ctg-card elements
  const ctgCards = document.querySelectorAll('.ctg-card');
  
  // Increment index and wrap around if it exceeds the number of cards
  i = (i + 1) % ctgCards.length;
  
  // Retrieve data from the database based on the data-key attribute of the next card
  const dataKey = ctgCards[i].getAttribute('data-key');
  const specificDataRef = child(cardDB, dataKey);
  onValue(specificDataRef, (snapshot) => {
    const data = snapshot.val();
    const youtubeLink = data.youtubeLink;
    const text = data.text;
    const title = data.title;

    // Update the HTML with the retrieved data
    const youtubeLinkDiv = document.getElementById("youtube-link");
    youtubeLinkDiv.innerHTML = `
      ${youtubeLink}
    `;
  
    const titleEl = document.getElementById("title");
    titleEl.innerText = title;
  
    const summaryEl = document.getElementById("summary");
    summaryEl.innerText = text;
    
  });
}

// Function to display the previous card in the modal
function prevCard() {
  shuffleData();
  // Get all .ctg-card elements
  const ctgCards = document.querySelectorAll('.ctg-card');
  
  // Decrement index and wrap around if it goes below 0
  i = (i - 1 + ctgCards.length) % ctgCards.length;
  
  // Retrieve data from the database based on the data-key attribute of the previous card
  const dataKey = ctgCards[i].getAttribute('data-key');
  const specificDataRef = child(cardDB, dataKey);
  onValue(specificDataRef, (snapshot) => {
    const data = snapshot.val();
    const youtubeLink = data.youtubeLink;
    const text = data.text;
    const title = data.title;

    // Update the HTML with the retrieved data
    const youtubeLinkDiv = document.getElementById("youtube-link");
    youtubeLinkDiv.innerHTML = `
      ${youtubeLink}
    `;
  
    const titleEl = document.getElementById("title");
    titleEl.innerText = title;
  
    const summaryEl = document.getElementById("summary");
    summaryEl.innerText = text;
    
  });
}


const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');

nextBtn.addEventListener('click', nextCard);
backBtn.addEventListener('click', prevCard);


const modal = document.querySelector('.modal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    shuffleData();
  }
}

const sugImgList = document.querySelectorAll("#sug-img");
const sugAccList = document.querySelectorAll("#sug-acc");

function shuffleData() {
  onValue(sugDB, (snapshot) => {
    const data = snapshot.val();
    const dataKeys = Object.keys(data);

    if (dataKeys.length > 0) {
      let uniqueDataKeys = [...dataKeys];
      let shuffledDataKeys = [];

      // Shuffle the data keys
      while (uniqueDataKeys.length) {
        const randomIndex = Math.floor(Math.random() * uniqueDataKeys.length);
        shuffledDataKeys.push(uniqueDataKeys[randomIndex]);
        uniqueDataKeys.splice(randomIndex, 1);
      }

      // Update the HTML with the shuffled data
      for (let i = 0; i < 3; i++) {
        const specificDataRef = child(sugDB, shuffledDataKeys[i]);

        onValue(specificDataRef, (snapshot) => {
          const data = snapshot.val();
          const imgLink = data.imgLink;
          const accountName = data.accountName;

          sugImgList[i].src = imgLink;
          sugAccList[i].textContent = accountName;
        });
      }
    }
  });
}

