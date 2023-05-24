
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