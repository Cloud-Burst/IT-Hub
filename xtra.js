// Get all the card containers
const cardContainers = document.querySelectorAll('.card-container');

// Get the search bar and filter buttons
const searchBar = document.querySelector('#search-bar');
const filterButtons = document.querySelectorAll('.filter-button');

// Listen for input in the search bar
searchBar.addEventListener('keyup', () => {
  const filterText = searchBar.value.toLowerCase().trim();
  filterCards(filterText);
});

// Listen for clicks on the filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterText = button.getAttribute('data-filter').toLowerCase().trim();
    filterCards(filterText);
  });
});

// Filter the cards based on the search bar text or filter button data
function filterCards(filterText) {
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.ctg-card');
    let visibleCards = 0;

    cards.forEach(card => {
      const title = card.querySelector('h3');
      if (title.textContent.toLowerCase().includes(filterText)) {
        card.style.display = 'block';
        visibleCards++;
      } else {
        card.style.display = 'none';
      }
    });

    // If there are no visible cards in the container, hide the container
    if (visibleCards === 0) {
      container.style.display = 'none';
    } else {
      container.style.display = 'block';
    }
  });
}
