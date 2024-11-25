import { gameState, loadPlayerData, savePlayerData } from "../js_folder/gameData.js"

loadPlayerData();

function updateStatsUI() {
    document.getElementById("att").textContent = gameState.stats.attack;
    document.getElementById("def").textContent = gameState.stats.defense;
    document.getElementById("spd").textContent = gameState.stats.speed;
}

function updateGeneralUI() {
    const playerNameElement = document.getElementById("playerName");
    const goldElement = document.getElementById("gold");

    if (playerNameElement) {
        playerNameElement.textContent = gameState.playerName || "Player";
    }
    if (goldElement) {
        goldElement.textContent = gameState.gold;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateGeneralUI();
    updateStatsUI();
});

function disableButtons() {
    const buttons = document.querySelectorAll(".choice-buttons button, #resetStats");
    buttons.forEach(button => (button.disabled = true));
    document.querySelector(".buttons a button").classList.remove("hidden");
}

function doubleStat(stat) {
    gameState.stats[stat] += 2;
    savePlayerData();
    updateStatsUI();
    alert(`${stat.charAt(0).toUpperCase() + stat.slice(1)} doubled`);
    disableButtons();
}

function splitStat(stat1, stat2) {
    gameState.stats[stat1]++;
    gameState.stats[stat2]++;
    savePlayerData();
    updateStatsUI();
    alert(`${stat1.charAt(0).toUpperCase() + stat1.slice(1)} and ${stat2.charAt(0).toUpperCase() + stat2.slice(1)} increased by 1!`);
    disableButtons();
}

function resetStats() {
    gameState.stats.attack =1;
    gameState.stats.defense =1;
    gameState.stats.speed =1;
    savePlayerData();
    updateStatsUI();
    alert("Stats have been reset to their defaults.");
}

document.getElementById("doubleAttack").addEventListener("click", () => doubleStat("attack"));
document.getElementById("doubleDefense").addEventListener("click", () => doubleStat("defense"));
document.getElementById("doubleSpeed").addEventListener("click", () => doubleStat("speed"));

document.getElementById("splitAttackDefense").addEventListener("click", () => splitStat("attack", "defense"));
document.getElementById("splitAttackSpeed").addEventListener("click", () => splitStat("attack", "speed"));
document.getElementById("splitDefenseSpeed").addEventListener("click", () => splitStat("defense", "speed"));

document.getElementById("resetStats").addEventListener("click", resetStats);

updateStatsUI();
updateGeneralUI();