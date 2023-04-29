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


const appSetting = {
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cardDB = ref(database, "progList");
const sugDB = ref(database, "suggestionProfiles");

let i;

const ctgCards = document.querySelectorAll('.ctg-card');

// click event listener to each .ctg-card element
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


function nextCard() {
  shuffleData();
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

function prevCard() {
  shuffleData();
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

