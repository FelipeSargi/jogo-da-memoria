const grid = document.getElementById('grid');
const restartButton = document.getElementById('restart');

const cards = [
    'A', 'A', 'B', 'B', 'C', 'C',
    'D', 'D', 'E', 'E', 'F', 'F'
];

let cardValues = [];
let cardElements = [];
let matches = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (cardValues.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        cardValues.push(this.dataset.value);
        cardElements.push(this);

        if (cardValues.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [first, second] = cardValues;

    if (first === second) {
        matches += 1;
        cardValues = [];
        cardElements = [];

        if (matches === cards.length / 2) {
            setTimeout(() => {
                alert('Você venceu!');
                restartButton.classList.remove('hidden');
            }, 500);
        }
    } else {
        cardElements.forEach(card => {
            card.classList.remove('flipped');
            card.innerText = '';
        });
        cardValues = [];
        cardElements = [];
    }
}

function startGame() {
    shuffle(cards);
    grid.innerHTML = '';
    matches = 0;
    cards.forEach(value => {
        const card = createCard(value);
        grid.appendChild(card);
    });
    restartButton.classList.add('hidden');
}

restartButton.addEventListener('click', startGame);

startGame();
