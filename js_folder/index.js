let xp = 0;
let hp = 100;
let gold = 30;
let potions = 0;
let poison = 0;

// Function to update the gold
function updateGoldDisplay() {
    document.getElementById('gold').textContent = gold;
}

// Function to update the invetory
function updateInventoryDisplay() {
    document.getElementById('healthPotions').textContent = potions;
    document.getElementById('poison').textContent = poison;
}

// This handles the name submit
const form = document.getElementById('nameForm');
const startButton = document.getElementById('startButton');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;

    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem('userName', name);
    console.log(`Name stored in localStorage:`, localStorage.getItem('userName'));

    startButton.classList.remove('hidden');
});

// Function to buy a potion
function buyPotion() {
    const potionCost = 10;
    if (gold >= potionCost) {
        gold -= potionCost;
        potions++;
        updateGoldDisplay();
        updateInventoryDisplay();
        console.log(`You bought a potion! Gold: ${gold}, Potions: ${potions}`);
    } else {
        console.log(`Not enough gold! Gold ${gold}, Potions: ${potions}`);
    }
}

// Event listener for buying potions
const buyPotionBtn = document.getElementById('buyPotionsBtn');
if (buyPotionBtn) {
    buyPotionBtn.addEventListener('click', buyPotion);
}

updateGoldDisplay();
updateInventoryDisplay();