# Bandit's Bane

## Description

**Bandit's Bane** is a thrilling browser-based game that immerses players in the quest to rid the peaceful village of Woodhurst from the menace of the Crimson Wolves. This interactive text-based adventure combines dynamic combat mechanics, character customization, and an engaging narrative to create a memorable gaming experience. Built using HTML, CSS, and modular JavaScript, this game is designed to run seamlessly on both desktop and mobile browsers.

---

## Features

### Required Features
1. **Data Management with Arrays, Objects, Sets or Maps**:
   - **Implementation**: We use JavaScript arrays to manage inventories, character stats, and dialogue (e.g., for bandits). Objects are used for character data, providing easy access to attributes like health, attack, and defense.

2. **User Input Validation with Regular Expressions**:
   - **Implementation**: Player names are validated using a regular expression to ensure only valid characters are accepted. Invalid input is prevented from being saved, and users are informed via an alert if their input doesn't meet the criteria (e.g., only letters and spaces allowed, with a character limit).

3. **Integration with a Third-Party API**:
   - **Implementation**: The OpenWeather API is used to fetch real-time weather data based on the player's location. This data influences game mechanics, like altering combat conditions based on whether it's raining or snowing.

4. **Responsive Design**: 
   - The game uses CSS Flexbox for layout management and includes media queries for responsiveness on various screen sizes, ensuring a seamless experience across devices.


### Core Features
1. **Dynamic Combat System**: Inspired by Dungeons & Dragons, the game uses dice rolls for attacks, enhancing the unpredictability of battles.
2. **Character Progression**: Upgrade your character's stats (Attack, Defense, Speed) and manage an inventory system to gain an edge in combat.
3. **Unique Dialogue**: Unique dialogue from shopkeepers, bandits, and the formidable Bandit King.

### Bonus Features
4. **Stat-Based Choices**: Players can strategize their upgrades and playstyles for varied outcomes.
5. **Customizable Experience**: Players start their journey by entering their name and customizing their character stats.

---

## Technologies Used

- **HTML**: Provides the structure of the game.
- **CSS**: Ensures a visually appealing and responsive design.
- **JavaScript**: Implements core game logic, interactions, and modular architecture.
- **OpenWeather API**: Fetches real-time weather data to enhance immersion.

---

## Requirements To Run

To run this project, ensure:
1. An OpenWeather API key.
2. To demo this project, please use **Live Server** in Visual Studio Code or another local server setup to run the application. Live Server provides a local development server with live reload functionality.

---

## Installation

### Steps to Run Locally:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/inkwriter/BanditsBane.git