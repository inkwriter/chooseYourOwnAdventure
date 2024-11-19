export const gameState = {
    playerName: "",
    level: 1,
    hp: 100,
    xp: 0,
    gold: 30,
    inventory: {
        potions: 0,
        poison: 0
    },
};

export function setPlayerName(name) {
    gameState.playerName = name;
    savePlayerData();
}

export function savePlayerData() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

export function loadPlayerData() {
    const savedGameState = JSON.parse(localStorage.getItem("gameState"));
    if (savedGameState) {
        Object.assign(gameState, {
            ...gameState,
            ...savedGameState,
        });
        console.log("Saving gameState:",gameState)
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
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
