import {gameState, loadPlayerData, savePlayerData} from './gameData.js';

loadPlayerData();

function updateGameUI() {

}
const playerNameElement = document.getElementById('playerName');
if (playerNameElement) {
    playerNameElement.textContent = gameState.playerName || "Player";
}

document.getElementById('xp').textContent = `${gameState.xp}/100`;
document.getElementById('hp').textContent = gameState.hp;
document.getElementById('level').textContent = gameState.level;
document.getElementById('gold').textContent = gameState.gold;
document.getElementById('healthPotions').textContent = textContent = gameState.inventory.potions;
document.getElementById('poison').textContent = textContent = gameState.inventory.poison;

window.addEventListener('beforeunload', savePlayerData);

updateGameUI();