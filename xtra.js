import { addHoverEffect, handleFormSubmit, checkSignIn, handleCourseClick, courseList, saveNote, loadNotes, clearAllNotes, createListItem, noteBtn, handleNoteBtnClick, handleClose } from "./utils.js";

const noteX = document.querySelector(".close");
noteX.addEventListener('click', handleClose);
noteBtn.addEventListener('click', handleNoteBtnClick);

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

courseList.addEventListener('click', handleCourseClick);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Get all the card containers
const cardContainers = document.querySelectorAll('.card-container');
const ctgCards = document.querySelectorAll('.ctg-card');

// Get the search bar and filter button
const searchBar = document.querySelector('#search');

// Listen for input in the search bar
searchBar.addEventListener('input', () => {
  const filterText = searchBar.value.toLowerCase().trim();
  filterCards(filterText);
});

// Filter the cards based on the search bar text or filter button data
function filterCards(filterText) {
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.ctg-card');
    let visibleCards = 0;

    cards.forEach(card => {
      const title = card.querySelector('h3');
      if (filterText === '' || title.textContent.toLowerCase().includes(filterText)) {
        card.style.display = 'flex';
        visibleCards++;
      } else {
        card.style.display = 'none';
      }
    });

    // If there are no visible cards in the container, hide the container
    if (visibleCards === 0) {
      container.style.display = 'none';
    } else {
      container.style.display = 'flex';
    }
  });
}

addHoverEffect('.card-container', '.ctg-card');

handleFormSubmit();

const appSetting = {
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cardDB = ref(database, "progList");
const sugDB = ref(database, "suggestionProfiles");

let i;

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
        alert(`No Content yet. Coming Soon`);
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
    // Stop video from playing
    const youtubeLinkDiv = document.getElementById("youtube-link");
    const video = youtubeLinkDiv.querySelector('iframe');
    if (video) {
      const videoSrc = video.getAttribute('src');
      video.setAttribute('src', '');
      video.setAttribute('src', videoSrc);
    }

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

