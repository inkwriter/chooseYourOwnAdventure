import { gameState, loadPlayerData, savePlayerData } from "./gameData.js";

loadPlayerData();

// Update the global UI with player stats and inventory
function updateGlobalUI() {
    const playerNameElement = document.getElementById('playerName');
    const levelElement = document.getElementById('level');
    const goldElement = document.getElementById('gold');
    const xpElement = document.getElementById('xp');
    const hpElement = document.getElementById('hp');
    const attElement = document.getElementById('att');
    const defElement = document.getElementById('def');
    const spdElement = document.getElementById('spd');
    const healthPotionsElement = document.getElementById('healthPotions');
    const poisonElement = document.getElementById('poison');

    // Check if player name is loaded correctly
    if (playerNameElement) {
        console.log("Updating playerNameElement with:", gameState.playerName);
        playerNameElement.textContent = gameState.playerName || "Player";
    } else {
        console.warn("playerName element missing.");
    }
    if (goldElement) {
        goldElement.textContent = gameState.gold;
    } else {
        console.warn("gold element missing.");
    }
    if (xpElement) {
        xpElement.textContent = `${gameState.xp}/100`;
    }
    if (levelElement) {
        levelElement.textContent = gameState.level;
    }
    if (hpElement) {
        hpElement.textContent = gameState.hp;
    }
    if (attElement) {
        attElement.textContent = gameState.stats.attack;
    }
    if (defElement) {
        defElement.textContent = gameState.stats.defense;
    }
    if (spdElement) {
        spdElement.textContent = gameState.stats.speed;
    }

    if (healthPotionsElement) {
        healthPotionsElement.textContent = gameState.inventory.potions;
    } else {
        console.warn("healthPotions element missing.");
    }
    if (poisonElement) {
        poisonElement.textContent = gameState.inventory.poison;
    } else {
        console.warn("poison element missing.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Global UI loading...");
    updateGlobalUI();
});
window.addEventListener("beforeunload", savePlayerData);