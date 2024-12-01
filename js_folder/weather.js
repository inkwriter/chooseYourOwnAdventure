export async function getWeather(latitude, longitude) {
    const apiKey = "02365765999f015851e74a6f03d1a093"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather: ${response.statusText}`);
        }
        const weatherData = await response.json();
        console.log("Weather data fetched successfully:", weatherData);
        return weatherData;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}

export function adjustPlayerStatsBasedOnWeather(weatherData, gameState) {
    if (!weatherData) return;

    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    console.log(`Weather condition detected: ${weatherCondition}`);

    if (weatherCondition.includes("rain")) {
        console.log("Rain detected: Reducing speed by 1.");
        gameState.stats.speed = Math.max(1, gameState.stats.speed - 1);
    } else if (weatherCondition.includes("snow")) {
        console.log("Snow detected: Reducing speed by 2.");
        gameState.stats.speed = Math.max(1, gameState.stats.speed - 2);
    } else {
        console.log("Weather has no effect on player stats.");
    }
}