let deckId = '';
let playerCards = [];
let dealerCards = [];
let playerPoints = 0;
let dealerPoints = 0;

function showMenu() {
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('help').style.display = 'none'; // Aseguramos que la ayuda se oculte al volver al menú
}

function showGame() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('help').style.display = 'none'; // Aseguramos que la ayuda se oculte al comenzar el juego
}

async function createDeck() {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const data = await res.json();
  deckId = data.deck_id;
}

async function drawCards(count) {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
  const data = await res.json();
  return data.cards;
}

function calculatePoints(cards) {
  let points = 0;
  let aces = 0;

  cards.forEach(card => {
    if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      points += 10;
    } else if (card.value === 'ACE') {
      aces++;
      points += 11;
    } else {
      points += parseInt(card.value);
    }
  });

  while (points > 21 && aces > 0) {
    points -= 10;
    aces--;
  }

  return points;
}

function displayCards(containerId, cards) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Limpiar las cartas anteriores
  cards.forEach((card, index) => {
    const img = document.createElement('img');
    img.src = card.image;
    img.style.animationDelay = `${index * 0.2}s`; // Retrasar ligeramente cada carta
    container.appendChild(img);
  });
}

async function hit() {
  const newCard = await drawCards(1);
  playerCards.push(...newCard);
  playerPoints = calculatePoints(playerCards);
  displayCards('player-cards', playerCards);

  if (playerPoints > 21) {
    alert('¡Te pasaste! Pierdes.');
    restartGame();
  }
}

async function stand() {
  displayCards('dealer-cards', dealerCards);
  dealerPoints = calculatePoints(dealerCards);

  while (dealerPoints < 17) {
    const newCard = await drawCards(1);
    dealerCards.push(...newCard);
    dealerPoints = calculatePoints(dealerCards);
    displayCards('dealer-cards', dealerCards);
  }

  let result = '';

  if (dealerPoints > 21 || playerPoints > dealerPoints) {
    result = '¡Ganaste!';
  } else if (dealerPoints === playerPoints) {
    result = 'Empate.';
  } else {
    result = 'Perdiste.';
  }

  alert(result);
  restartGame();
}

async function restartGame() {
  await createDeck();
  const initialCards = await drawCards(4);

  playerCards = [initialCards[0], initialCards[2]];
  dealerCards = [initialCards[1], initialCards[3]];

  playerPoints = calculatePoints(playerCards);
  dealerPoints = calculatePoints([dealerCards[0]]);

  displayCards('player-cards', playerCards);
  displayCards('dealer-cards', [dealerCards[0]]);
}

async function startGame() {
  showGame();
  await createDeck();
  await restartGame();
}

function showHelp() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'none';
  document.getElementById('help').style.display = 'block';
}
