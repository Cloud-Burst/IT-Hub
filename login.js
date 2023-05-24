import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, ref, push, onValue, child, set, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";


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

const database = getDatabase(app);
const accDB = ref(database, "accounts");
const gaccDB = ref(database, "google accounts"); 

// elements
const authForm = document.querySelector('#auth-form');

// Sign-in form inputs
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Registration form inputs
const registerForm = document.querySelector('#register-form');
const registerNameInput = document.querySelector('#register-name');
const registerEmailInput = document.querySelector('#register-email');
const registerPasswordInput = document.querySelector('#register-password');

// Other elements
const signInLink = document.querySelector('#sign-in-link');
const regLink = document.querySelector('#register-link');
const googleSignInButton = document.querySelector('#google-sign-in');

authForm.classList.add('hidden');

signInLink.addEventListener('click', () => {
  authForm.classList.remove('hidden')
  registerForm.classList.add('hidden')
})

regLink.addEventListener('click', () => {
  authForm.classList.add('hidden')
  registerForm.classList.remove('hidden')
})

// Check if the user has exceeded the maximum number of login attempts
function hasExceededMaxLoginAttempts() {
  const maxAttempts = 5;
  const expiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  const localStorageKey = 'loginAttempts';
  const loginAttempts = localStorage.getItem(localStorageKey);
  if (loginAttempts) {
    const { count, expiry } = JSON.parse(loginAttempts);
    if (count >= maxAttempts && Date.now() < expiry) {
      return true;
    } else if (Date.now() >= expiry) {
      localStorage.removeItem(localStorageKey); // clear the localStorage item if the expiry time has passed
      return false;
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify({ count: count + 1, expiry: expiryTime + Date.now() }));
      return false;
    }
  } else {
    localStorage.setItem(localStorageKey, JSON.stringify({ count: 1, expiry: expiryTime + Date.now() }));
    return false;
  }
}

// Check if the user has exceeded the maximum number of registration attempts
function hasExceededMaxRegisterAttempts() {
  const maxAttempts = 3;
  const expiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds
  const localStorageKey = 'registerAttempts';
  const registerAttempts = localStorage.getItem(localStorageKey);
  if (registerAttempts) {
    const { count, expiry } = JSON.parse(registerAttempts);
    if (count >= maxAttempts && Date.now() < expiry) {
      return true;
    } else if (Date.now() >= expiry) {
      localStorage.removeItem(localStorageKey); // clear the localStorage item if the expiry time has passed
      return false;
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify({ count: count + 1, expiry: expiryTime + Date.now() }));
      return false;
    }
  } else {
    localStorage.setItem(localStorageKey, JSON.stringify({ count: 1, expiry: expiryTime + Date.now() }));
    return false;
  }
}


// Sign in with email and password
authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (hasExceededMaxLoginAttempts()) {
    alert('You have exceeded the maximum number of login attempts. Please try again later.');
    return;
  }
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const name = nameInput.value;
      const email = user.email;
      const newUser = { name, email };
      localStorage.setItem('user', JSON.stringify(newUser));
      window.location.href = 'main.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});






registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (hasExceededMaxRegisterAttempts()) {
    alert('You have exceeded the maximum number of registration attempts. Please try again later.');
    return;
  }
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const name = registerNameInput.value;

  // Check if email or name already exists in database
  const snapshot = await get(child(accDB, 'users'));
  if (snapshot.exists()) {
    const users = Object.values(snapshot.val());
    const emailExists = users.some(user => user.email === email);
    const nameExists = users.some(user => user.name === name);
    if (emailExists) {
      alert('An account with this email already exists.');
      return;
    }
    if (nameExists) {
      alert('This name is already taken.');
      return;
    }
  }

  // Create new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Store the user's name in the database
      const newUserRef = push(child(accDB, 'users'));
      let userRef = ({
        uid: user.uid,
        name: name,
        email: email,
        password: password
      });
      set(newUserRef, userRef);
      
      authForm.classList.remove('hidden')
      registerForm.classList.add('hidden')
      console.log("Account successfully created")
    })
    .catch((error) => {
  alert('An error occurred during registration. Please try again later.');
  });

});

// Sign in with Google
const provider = new GoogleAuthProvider();
googleSignInButton.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const name = user.displayName;
    const email = user.email;

    // Check if user already exists in database
    const snapshot = await get(child(gaccDB, 'users'));
    const users = snapshot.val() || {};
    const existingUser = Object.values(users).find((user) => user.email === email && user.name === name);
    if (existingUser) {
      // Store user information in local storage
      console.log("successful")
      localStorage.setItem('user', JSON.stringify(existingUser));
      window.location.href = 'main.html';
      return;
    }

    // Create new user
    const newUserRef = push(child(gaccDB, 'users'));
    const userRef = {
      name: name,
      email: email,
    };
    set(newUserRef, userRef);

    // Store user information in local storage
    const newUser = { key: newUserRef.key, ...userRef };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert(newUser);
    window.location.href = 'main.html';
  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert('An error occurred while signing in with Google. Please try again later.');
  }
});
