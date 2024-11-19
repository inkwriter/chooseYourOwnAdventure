import {gameState, setPlayerName} from './gameData.js';

// This handles the name submit
const form = document.getElementById('nameForm');
const choiceBtn = document.getElementById('choiceBtn');
const playerNameSpan = document.getElementById('playerName')
const introMessage = document.getElementById('introMessage');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;

        if (!name) {
            alert("Please enter your name.");
            return;
        }

        setPlayerName(name);

        introMessage.classList.remove('hidden');
        playerNameSpan.textContent = name;
        choiceBtn.classList.remove('hidden');

    });
}