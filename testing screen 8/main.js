import * as UTILS from "./utils.js";
import * as SCENARIO from "./scenarios.js";
import { textTransition } from './transition.js';  // Import textTransition

let transitionDone = false; // Flag to ensure one-time transition
let rowCount = 20;
let currentInterface = 0;
let trains = [];
let isMoving = [];


export const getRowCount = () => rowCount;
export const getCurrentInterface = () => currentInterface;

export const setRowCount = (newRowCount) => {
    rowCount = newRowCount;
};

export const setCurrentInterface = (newCurrentInterface) => {
    currentInterface = newCurrentInterface;
};

export const createInterface = () => {
    document.body.innerHTML = ""; // Clear existing content
    trains = []; // Array to store train elements
    isMoving = []; // Array to track movement state of each train
    const rowHeight = window.innerHeight / getRowCount(); // Calculate row height based on total rows

    // Create train elements
    for (let i = 0; i < getRowCount(); i++) {
        let train = document.createElement("div");
        train.className = "train";
        train.textContent = `Train RegioExpress 18401 Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- `;
        train.style.top = `${i * rowHeight}px`;
        train.style.fontSize = `${rowHeight * 0.8}px`;
        train.style.lineHeight = `${rowHeight}px`;
        train.style.left = "100vw";
        document.body.appendChild(train);
        trains.push(train);
        isMoving.push(true);

        // Toggle movement on click
        train.onclick = function () {
            isMoving[i] = !isMoving[i];
        };
    }

    // Spacebar key event listener
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !transitionDone) {
            trains.forEach((train) => {
                textTransition(train, "Flight SkyJet 5819 Paris, Gate A7 05:15 Destination Rome 07:54 Gate B2 - Capacity 2/3 Tickets from EUR 95,50.-");
            });
            transitionDone = true; // Prevents further transitions
        }
    });
};

function updateTrains() {
    trains.forEach((train, index) => {
        if (isMoving[index]) {
            let rect = train.getBoundingClientRect();
            if (rect.right < 0) {
                train.style.left = "100vw";
            } else {
                train.style.left = `${rect.left - 10}px`;
            }
        }
    });
}

function updateFontWeight(currentTime) {
    trains.forEach((train) => {
        let weight = UTILS.map(Math.sin(currentTime * 0.001), -1, 1, 100, 600);
        UTILS.setVariable(train, { grid: weight });
    });
}

function update() {
    let currentTime = Date.now();
    updateTrains();
    updateFontWeight(currentTime);
    //SCENARIO.deleteWord(currentTime);
    requestAnimationFrame(update);
}
function simulateClicks() {
    const clickInterval = 500;

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * trains.length);
        const train = trains[randomIndex];

        if (train && train.onclick) {
            train.onclick(); // Trigger the click event on the train
        }
    }, clickInterval);
}

SCENARIO.setupToggleInterface();
createInterface();
update();
simulateClicks();