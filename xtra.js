import { addHoverEffect } from './utils.js';
// Get all the card containers
const cardContainers = document.querySelectorAll('.card-container');

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
