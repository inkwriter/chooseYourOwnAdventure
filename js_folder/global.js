import { gameState, loadPlayerData, savePlayerData } from "./gameData.js";

loadPlayerData();

window.addEventListener("beforeunload", savePlayerData);

document.getElementById('playerName').textContent = gameState.playerName || "Player";
document.getElementById('gold').textContent = gameState.gold;