import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { checkSignIn } from "./utils.js";

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

checkSignIn(auth);

const database = getDatabase(app);
const msgDB = ref(database, "messages");

// Function to save the user's data to Firebase
function saveData() {
  let storedUser = localStorage.getItem('user');
  let user = JSON.parse(storedUser);
  var name = user.name;
  var email = user.email;
  var message = document.getElementById('message').value;

  // Get the current timestamp
  var timestamp = new Date().toISOString();

  push(msgDB, {
    name: name,
    email: email,
    message: message,
    timestamp: timestamp
  });

  // Clear the input field
  document.getElementById('message').value = '';
}

window.onload = function() {
  var postButton = document.getElementById('post-btn');
  postButton.addEventListener('click', saveData);

  // Function to display the messages from Firebase
  onValue(msgDB, function(snapshot) {
    var displayDiv = document.getElementById('messageDisplay');
    displayDiv.innerHTML = '';

    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var name = childData.name;
      var email = childData.email;
      var message = childData.message;
      var timestamp = childData.timestamp;

      // Format the timestamp as per your requirements
      var formattedTimestamp = new Date(timestamp).toLocaleString();

      // Create the message container element
      var messageContainer = document.createElement('div');
      messageContainer.classList.add('post');

      // Create the post info element
      var postInfo = document.createElement('div');
      postInfo.classList.add('post-info');
      postInfo.innerHTML = '<span><strong>' + name + '</strong></span><span>(' + email + ')</span><span>' + '<br>' + formattedTimestamp + '</span>';

      // Create the message element
      var messageElement = document.createElement('p');
      messageElement.innerText = message;

      // Append the post info and message to the message container
      messageContainer.appendChild(postInfo);
      messageContainer.appendChild(messageElement);

      // Append the message container to the display div
      displayDiv.appendChild(messageContainer);
    });
  });
};
