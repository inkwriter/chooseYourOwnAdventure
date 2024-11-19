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
    localStorage.setItem('playerName', name);
}

export function loadPlayerData() {
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
        gameState.playerName = storedName;
        console.log(`Loaded player name: ${storedName}`);
    }
}