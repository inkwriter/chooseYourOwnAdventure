import { gameState, Bandit, attackEnemy, savePlayerData, BanditKing } from "../js_folder/gameData.js";

// Create a copy of the Bandit for this encounter
let currentEnemy = { ...BanditKing };

// Initialize level-up increments for player stats
let levelUpIncrements = {
    attack: 0,
    defense: 0,
    speed: 0,
};

// Load the chosen increments from localStorage
function loadLevelUpIncrements() {
    const savedIncrements = JSON.parse(localStorage.getItem("levelUpIncrements"));
    if (savedIncrements) {
        Object.assign(levelUpIncrements, savedIncrements);
        console.log("Loaded level-up increments:", levelUpIncrements);
    }
}

// Save level-up increments to localStorage
function saveLevelUpIncrements() {
    localStorage.setItem("levelUpIncrements", JSON.stringify(levelUpIncrements));
    console.log("Saved level-up increments:", levelUpIncrements);
}

// Helper function: Enemy attacks the player
function enemyAttack() {
    const enemyAttackFeedback = document.getElementById("enemyAttackFeedback");

    if (currentEnemy.hp > 0) { // Enemy attacks only if it's alive
        const enemyMessage = currentEnemy.attackPlayer(gameState);
        enemyAttackFeedback.textContent = enemyMessage;

        // Log the damage dealt by the enemy
        console.log("Enemy's attack damage:", enemyMessage);

        // Check if player is defeated
        if (gameState.hp <= 0) {
            enemyAttackFeedback.textContent += " You have been defeated!";
            savePlayerData();
        }

        updateCombatUI(); // Refresh the UI
    }
}

// Function to update combat-related UI elements
function updateCombatUI() {
    updateElementTextContent("playerName", gameState.playerName || "Player");
    updateElementTextContent("hp", gameState.hp);
    updateElementTextContent("enemyHP", currentEnemy.hp > 0 ? currentEnemy.hp : "Defeated");
    updateElementTextContent("gold", gameState.gold);
    updateElementTextContent("healthPotions", gameState.inventory.potions);
    updateElementTextContent("playerAttackFeedback", "");
    updateElementTextContent("enemyAttackFeedback", "");
    updateElementTextContent("level", gameState.level);
}

// Utility function to update a single element's text content
function updateElementTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    } else {
        console.warn(`Element with ID "${id}" not found.`);
    }
}

function updateCombatFeedback(playerMessage, enemyMessage) {
    updateElementTextContent("playerAttackFeedback", playerMessage);
    updateElementTextContent("enemyAttackFeedback", enemyMessage);
}

// Player attack logic
function attack() {
    if (currentEnemy.hp > 0 && gameState.hp > 0) {
        const playerMessage = attackEnemy(currentEnemy); // Player attacks
        console.log("Player's attack damage:", playerMessage); // Log player attack

        // Enemy attacks if still alive
        const enemyMessage = currentEnemy.hp > 0 ? currentEnemy.attackPlayer(gameState) : "";

        // Update combat feedback
        updateCombatFeedback(playerMessage, enemyMessage);

        // Update enemy HP in UI
        updateElementTextContent("enemyHP", currentEnemy.hp > 0 ? currentEnemy.hp : "Defeated");

        // Check if enemy is defeated
        if (currentEnemy.hp <= 0) {
            alert(`You defeated the ${currentEnemy.name}!`);
            gameState.gold += 10; // Reward Gold
            grantXP(20); // Reward XP
            savePlayerData();
            updateCombatUI();
            return; // End combat
        }

        // Update player HP in UI
        updateElementTextContent("hp", gameState.hp);

        // Save state after updates
        savePlayerData();
    }
}

// Grant XP and handle leveling up
function grantXP(amount) {
    gameState.xp += amount;
    console.log("XP gained:", amount, "Total XP:", gameState.xp);

    if (gameState.xp >= 100) {
        gameState.xp -= 100; // Carry over excess XP
        gameState.level++;
        alert("You leveled up!");

        // Apply level-up increments to the stats
        gameState.stats.attack += Math.floor(levelUpIncrements.attack);
        gameState.stats.defense += Math.floor(levelUpIncrements.defense);
        gameState.stats.speed += Math.floor(levelUpIncrements.speed);

        console.log("Level-up applied:", gameState.stats); // Log stats after leveling up

        savePlayerData();
        updateCombatUI();
    } else {
        savePlayerData();
    }
}

function startBossBattle() {
    console.log("Boss battle with Bandit King started!");
    currentEnemy = {...BanditKing };
    console.log("Current enemy set to Bandit King:", currentEnemy);
    updateCombatUI;
    updateElementTextContent("enemyHP", currentEnemy.hp);
}

function checkGameOver() {
    if (gameState.hp <= 0) {
        alert("You have been defeated!");
        window.location.href = "../gameOver.html"; // Redirect to game over page
    }
}

// Update the `enemyAttack` function to include the game over check
function enemyAttack() {
    const enemyAttackFeedback = document.getElementById("enemyAttackFeedback");

    if (currentEnemy.hp > 0) {
        const enemyMessage = currentEnemy.attackPlayer(gameState);
        enemyAttackFeedback.textContent = enemyMessage;

        console.log("Enemy's attack damage:", enemyMessage);

        // Check if the player is defeated
        checkGameOver();

        updateCombatUI(); // Refresh the UI
    }
}

// Update `attack` function to include a game over check
function attack() {
    if (currentEnemy.hp > 0 && gameState.hp > 0) {
        const playerMessage = attackEnemy(currentEnemy);
        console.log("Player's attack damage:", playerMessage);

        // Enemy counter-attacks if still alive
        const enemyMessage = currentEnemy.hp > 0 ? currentEnemy.attackPlayer(gameState) : "";

        // Update combat feedback
        updateCombatFeedback(playerMessage, enemyMessage);

        // Update the UI
        updateCombatUI();

        // Check if the player is defeated
        checkGameOver();

        savePlayerData();
    }
}

// Add event listeners for combat actions
document.getElementById("attackBtn").addEventListener("click", attack);

document.getElementById("useItemBtn").addEventListener("click", () => {
    if (gameState.inventory.potions > 0) {
        gameState.hp += 10;
        gameState.inventory.potions--;
        alert("You used a potion and healed 10 HP!");
        updateCombatUI();
        savePlayerData();
    } else {
        alert("You have no potions!");
    }
});

// Load increments and update the UI at the start
loadLevelUpIncrements();
updateCombatUI();
window.startBossBattle = startBossBattle;