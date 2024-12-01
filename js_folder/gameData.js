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
        console.log(`Enemy rolls: ${roll}, Player AC: ${player.calculateAC()}`); // Debug log

        if (roll >= player.calculateAC()) {
            // Base damage
            const baseDamage = Math.floor(Math.random() * 4) + 1 + this.attack;

            // Critical hit logic
            let damage = baseDamage;
            if (roll === 20) {
                const critBonus = Math.floor(Math.random() * 4) + 1; // Extra roll for crit
                damage += critBonus;
                console.log(`Critical Hit! Enemy Damage: ${damage}`);
            } else {
                console.log(`Hit! Enemy Damage: ${damage}`);
            }

            player.hp = Math.max(0, player.hp - damage); // Deduct player HP
            return roll === 20 
                ? `Critical hit! The ${this.name} deals ${damage} damage to you!` 
                : `The ${this.name} hits you for ${damage} damage!`;
        }

        console.log("Enemy Misses!");
        return `The ${this.name} misses!`;
    }
};

export function attackEnemy(enemy) {
    const roll = Math.floor(Math.random() * 20) + 1; // Roll d20
    console.log(`Player rolls: ${roll}, Enemy AC: ${enemy.calculateAC()}`); // Debug log

    if (roll >= enemy.calculateAC()) {
        // Base damage
        const baseDamage = Math.floor(Math.random() * 4) + 1 + gameState.stats.attack;

        // Critical hit logic
        let damage = baseDamage;
        if (roll === 20) {
            const critBonus = Math.floor(Math.random() * 4) + 1; // Extra roll for crit
            damage += critBonus;
            console.log(`Critical Hit! Base Damage: ${baseDamage}, Crit Bonus: ${critBonus}, Total: ${damage}`);
        } else {
            console.log(`Hit! Damage: ${damage}`);
        }

        enemy.hp -= damage; // Deduct enemy HP
        console.log(`Enemy HP after attack: ${enemy.hp}`);
        return roll === 20 
            ? `Critical hit! You deal ${damage} damage to the ${enemy.name}!` 
            : `You hit the ${enemy.name} for ${damage} damage!`;
    } 

    console.log("Miss!");
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

export const BanditKing = {
    name: "Bandit King",
    hp: 150, // Higher HP to make him a boss
    attack: 10, // Strong attack damage
    defense: 8, // Decent defense
    speed: 7, // Faster than regular bandits but slower than some
    specialAbilityUsed: false, // Track if War Cry has been used

    calculateAC() {
        return 10 + this.defense + this.speed; // Simple AC formula
    },

    attackPlayer(player) {
        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll >= player.calculateAC()) {
            const damage = Math.floor(Math.random() * 10) + 1 + this.attack; // Higher damage range
            player.hp = Math.max(0, player.hp - damage);
            console.log(`Bandit King hits for ${damage} damage. Player HP: ${player.hp}`);
            return `The Bandit King hits you for ${damage} damage!`;
        }
        console.log(`Bandit King misses!`);
        return `The Bandit King misses!`;
    },

    useWarCry(player) {
        if (!this.specialAbilityUsed) {
            this.specialAbilityUsed = true;
            console.log(`Bandit King uses War Cry! Attack power increased!`);
            this.attack += 2; // Boost attack for a limited time
            return `The Bandit King roars fiercely, boosting his attack!`;
        }
        return `The Bandit King has already used War Cry.`;
    }
};