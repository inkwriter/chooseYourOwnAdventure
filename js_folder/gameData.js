export const gameState = {
    playerName: "",
    level: 1,
    hp: 100,
    xp: 0,
    gold: 30,
    stats: {
        attack: 1,
        defense: 1,
        speed: 1
    },
    inventory: {
        potions: 0,
        poison: 0
    },
    levelUpIncrements: {   // Initialize levelUpIncrements here
        attack: 0,
        defense: 0,
        speed: 0
    },
    // Corrected the reference to `stats.defense` instead of `state.defense`
    calculateAC() {
        return 10 + this.stats.defense + this.stats.speed;  // Corrected reference
    }
};

export const Bandit = {
    name: "Bandit",
    hp: 20,
    attack: 2,
    defense: 0,
    speed: 1,
    calculateAC() {
        return 10 + this.defense + this.speed;
    },
    attackPlayer(player) {
        const roll = Math.floor(Math.random() * 20) + 1;
        console.log(`Enemy rolls: ${roll}, Player AC: ${player.calculateAC()}`); // Log roll vs AC
        if (roll >= player.calculateAC()) {
            const damage = Math.floor(Math.random() * 4) + 1 + this.attack;
            console.log(`Enemy deals ${damage} damage to the player.`);
            player.hp = Math.max(0, player.hp - damage);
            console.log(`Player HP after attack: ${player.hp}`);
            return `The ${this.name} hits you for ${damage} damage!`;
        }
        console.log(`The ${this.name} misses!`);
        return `The ${this.name} misses!`;
    }
};

export function attackEnemy(enemy) {
    console.log(`rolling`);
    const roll = Math.floor(Math.random() * 20) + 1;
    console.log(`rolled`);
    if (roll >= enemy.calculateAC()) {
        const damage = Math.floor(Math.random() * 4) + 1 + gameState.stats.attack;
        enemy.hp -= damage;
        console.log(`Enemy HP after attack: ${enemy.name}!`)
        return `You hit the ${enemy.name} for ${damage} damage!`;
    }
    console.log(`Enemy HP after attack: ${enemy.name}!`)
    return `You miss the ${enemy.name}!`;
}

// Set the player's name
export function setPlayerName(name) {
    gameState.playerName = name;
    console.log("Player name set to:", name);
    savePlayerData();
}

// Save game state to localStorage
export function savePlayerData() {
    console.log("Saving gameSate to localStorage:", gameState);
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

// Load game state from localStorage
export function loadPlayerData() {
    const savedGameState = JSON.parse(localStorage.getItem("gameState"));
    if (savedGameState) {
        Object.assign(gameState, {
            ...gameState,
            ...savedGameState,
        });
        console.log("Loaded gameState:", gameState);
        localStorage.setItem("gameState", JSON.stringify(gameState));
    } else {
        console.warn("No saved gameState found in localStorage.");
    }

    // Load level-up increments separately to ensure persistence
    const savedIncrements = JSON.parse(localStorage.getItem("levelUpIncrements"));
    if (savedIncrements) {
        Object.assign(gameState.levelUpIncrements, savedIncrements);  // Now this will work since levelUpIncrements is initialized
    }

    console.log("GameState loaded:", gameState);
}

export const Potion = {
    name: "Hp Potion",
    price: 10,
    addToInventory() {
        gameState.inventory.potions++;
    },
};

export function buyItem(item) {
    if (gameState.gold >= item.price) {
        gameState.gold -= item.price;
        item.addToInventory();
        savePlayerData();
        return true;
    }
    return false;
}