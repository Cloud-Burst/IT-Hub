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
import { initializeApp } from "https://wwww.gstatic.com/firebasejs/9.15.0/firebase-app-js";
import { getDatabase, ref, push} from "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app/";

const appSetting = {
  databaseURL: "https://proposal-db-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cardDB = ref(database, "progList");

console.log(cardDB);
