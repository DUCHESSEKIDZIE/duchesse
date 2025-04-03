const playButton = document.getElementById('play-button');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const wordDisplay = document.getElementById('word');
const figureParts = [
    document.getElementById('line1'),
    document.getElementById('line2'),
    document.getElementById('line3'),
    document.getElementById('line4'),
    document.getElementById('head'),
    document.getElementById('body'),
    document.getElementById('leftarm'),
    document.getElementById('rightarm'),
    document.getElementById('leftleg'),
    document.getElementById('rightleg')
];
const wrongLettersE1 = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');

const words = ['lookism', '', 'gamification', 'altruism'];
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];
let figureIndex = 0;

function chooseWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordDisplay.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : '_'}
            </span>
        `).join('')}
    `;

    const innerWord = wordDisplay.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Félicitations ! Tu as gagné !';
        popup.style.display = 'block';
    }
}

function updateWrongLetters() {
    wrongLettersE1.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Erreurs :</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        part.style.display = index < errors ? 'block' : 'none';
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Dommage ! Tu as perdu.';
        popup.style.display = 'block';
    }
}

function resetGame() {
    chooseWord();
    correctLetters = [];
    wrongLetters = [];
    figureIndex = 0;
    figureParts.forEach(part => part.style.display = 'none');
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
    playButton.style.display = 'none';
}

playButton.addEventListener('click', () => {
    resetGame();
});

guessButton.addEventListener('click', () => {
  const letter = letterInput.value.toLowerCase();

  if (letter.length === 1 && letter.match(/[a-z]/i)) {
      if (!correctLetters.includes(letter) && !wrongLetters.includes(letter)) {
          if (selectedWord.includes(letter)) {
              correctLetters.push(letter);
              displayWord();
          } else {
              wrongLetters.push(letter);
              updateWrongLetters(); // Appel de la fonction ici !
          }
      }
      letterInput.value = '';
  } else {
      alert("Veuillez entrer une seule lettre valide.");
  }
});

chooseWord();
displayWord();
updateWrongLetters();