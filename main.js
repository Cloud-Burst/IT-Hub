
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
//addHoverEffect('', '.ctg-card');

