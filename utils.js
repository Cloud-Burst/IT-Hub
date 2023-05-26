
function addHoverEffect(parentSelector, cardSelector) {
  const cardSections = document.querySelectorAll(parentSelector);

  cardSections.forEach(cardSection => {
    const cards = cardSection.querySelectorAll(cardSelector);

    cards.forEach(card => {
      card.addEventListener('mouseover', () => {
        cards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.add('blur');
          }
        });
      });
      
      card.addEventListener('mouseout', () => {
        cards.forEach(otherCard => {
          otherCard.classList.remove('blur');
        });
      });
    });
  });
}

addHoverEffect('.card-container', '.ctg-card');

export { addHoverEffect };

function handleFormSubmit() {
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
}

export { handleFormSubmit };

// Function to check if the user is signed in
function checkSignIn(auth) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, continue with your logic
      console.log("User is signed in");
    } else {
      // User is not signed in, redirect to index.html
      window.location.href = "./index.html";
    }
  });
}

export { checkSignIn };


export const handleCourseClick = (event) => {
  const clickedCourse = event.target;
  if (clickedCourse.tagName === 'LI') {
    window.location.href = './Learn.html';
  }
};

export const courseList = document.getElementById('course-list');

// Function to save user input in local storage
export function saveNote() {
  const textarea = document.querySelector('.note-input');
  const input = textarea.value.trim();
  
  if (input !== '') {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(input);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    createListItem(input);
    textarea.value = '';
  }
}

// Function to create a new list item
export function createListItem(input) {
  const ul = document.querySelector('.note-content ul');
  const li = document.createElement('li');
  li.textContent = input;
  ul.appendChild(li);

  // Add event listener to remove the list item on click
  li.addEventListener('click', () => {
    removeListItem(li);
  });
}

// Function to remove a list item
function removeListItem(li) {
  const ul = li.parentNode;
  ul.removeChild(li);
  
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const text = li.textContent;
  const index = notes.indexOf(text);
  
  if (index !== -1) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

// Function to load saved notes from local storage
export function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note) => {
    createListItem(note);
  });
}

// Function to clear all notes
export function clearAllNotes() {
  const ul = document.querySelector('.note-content ul');
  ul.innerHTML = '';
  localStorage.removeItem('notes');
}

export const noteBtn = document.querySelector('.note-btn');

export function handleNoteBtnClick() {
  const notes = document.querySelector('.notes');
  noteBtn.classList.add('off');
  notes.style.right = "200px";
}

export function handleClose() {
  const notes = document.querySelector('.notes');
  noteBtn.classList.remove('off');
  notes.style.right = "-200px";
}
