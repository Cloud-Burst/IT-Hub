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

