import { getWeather, adjustPlayerStatsBasedOnWeather } from "./weather.js";
import { gameState, loadPlayerData, savePlayerData } from "./gameData.js";

loadPlayerData();

// Update the global UI with player stats and inventory
function updateGlobalUI(weatherCondition = "Loading weather...") {
    const playerNameElement = document.getElementById("playerName");
    const levelElement = document.getElementById("level");
    const goldElement = document.getElementById("gold");
    const xpElement = document.getElementById("xp");
    const hpElement = document.getElementById("hp");
    const attElement = document.getElementById("att");
    const defElement = document.getElementById("def");
    const spdElement = document.getElementById("spd");
    const healthPotionsElement = document.getElementById("healthPotions");
    const poisonElement = document.getElementById("poison");
    const weatherElement = document.getElementById("weatherMessage");

    // Update elements with game state values
    if (playerNameElement) playerNameElement.textContent = gameState.playerName || "Player";
    if (levelElement) levelElement.textContent = gameState.level;
    if (goldElement) goldElement.textContent = gameState.gold;
    if (xpElement) xpElement.textContent = `${gameState.xp}/100`;
    if (hpElement) hpElement.textContent = gameState.hp;
    if (attElement) attElement.textContent = gameState.stats.attack;
    if (defElement) defElement.textContent = gameState.stats.defense;
    if (spdElement) spdElement.textContent = gameState.stats.speed;
    if (healthPotionsElement) healthPotionsElement.textContent = gameState.inventory.potions;
    if (poisonElement) poisonElement.textContent = gameState.inventory.poison;

    // Update weather display
    if (weatherElement) {
        weatherElement.textContent = weatherCondition;
        console.log("Weather condition updated in UI:", weatherCondition);
    } else {
        console.warn("Weather message element not found.");
    }
}

function fetchWeatherAndAdjustStats() {
    const weatherElement = document.getElementById("weatherMessage");
    if (navigator.geolocation) {
        console.log("Requesting geolocation...");
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Geolocation successful. Latitude: ${latitude}, Longitude: ${longitude}`);
            const weatherData = await getWeather(latitude, longitude);

            if (weatherData) {
                const weatherCondition = weatherData.weather[0]?.description || "Unknown";
                adjustPlayerStatsBasedOnWeather(weatherData, gameState);
                savePlayerData();
                console.log("Player stats after weather adjustment:", gameState.stats);

                // Update UI
                updateGlobalUI(weatherCondition);
            } else {
                console.warn("Weather data is null.");
                updateGlobalUI("Unable to fetch weather.");
            }
        }, (error) => {
            console.error("Geolocation error:", error.message);
            updateGlobalUI("Unable to retrieve location.");
        });
    } else {
        console.warn("Geolocation is not supported by this browser.");
        updateGlobalUI("Geolocation not supported.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Global UI loading...");
    fetchWeatherAndAdjustStats(); // Fetch weather on load
    updateGlobalUI(); // Ensure UI is initialized
});
window.addEventListener("beforeunload", savePlayerData);