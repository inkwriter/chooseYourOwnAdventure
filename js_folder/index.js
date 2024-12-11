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
        const nameRegex = /^[a-zA-Z\s]{1,50}$/; // Regex for name validation

        // Checks to make sure you entered a valid name using regex
        if (!nameRegex.test(name)) {
            alert("Please enter a valid name (only letters and spaces, max 50 characters).");
            return;
        }

        // Save the player's name in the game state and localStorage 
        setPlayerName(name);
        console.log("name is set.");

        // Update the UI to show the player's name
        introMessage.classList.remove('hidden');
        playerNameSpan.textContent = name;
        choiceBtn.classList.remove('hidden');
    });
}