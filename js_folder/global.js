import { gameState, loadPlayerData, savePlayerData } from "./gameData.js";

loadPlayerData();

function updateGlobalUI() {
    const playerNameElement = document.getElementById('playerName');
    const goldElement = document.getElementById('gold');
    const xpElement = document.getElementById('xp');
    const hpElement = document.getElementById('hp');
    const attElement = document.getElementById('att');
    const defElement = document.getElementById('def');
    const spdElement = document.getElementById('spd');


    if (playerNameElement) {
        playerNameElement.textContent = gameState.playerName || "Player";
    }
    if (goldElement) {
        goldElement.textContent = gameState.gold
    }
}

window.addEventListener("beforeunload", savePlayerData);

document.addEventListener("DOMContentLoaded", updateGlobalUI);