import * as UTILS from "./utils.js";
import * as SCENARIO from "./scenarios.js";
import { textTransition } from './transition.js'; 
import { updateFontWeight } from "./timeFunctions.js";


const textContent = [
    "Train ICN 2000 Lausanne, Voie 1 00:00; Direction Bern - Arrive 00:45 Voie 4. Status: On Time, Service Class: First & Second.",
    "Train EC 4034 Lausanne, Voie 77 01:34; Direction Zürich - Arrive 01:59 Voie 6. Status: Delayed, Service Class: Business & Second.",
    "Train RE 5205 Lausanne, Voie 2 02:05; Direction Geneva - Arrive 02:37 Voie 2. Status: On Time, Service Class: Second Class Only.",
    "Train IC 3015 Lausanne, Voie 5 03:00; Direction Luzern - Arrive 03:22 Voie 5. Status: On Time, Service Class: First & Second.",
    "Train IR 4422 Lausanne, Voie 3 04:22; Direction Basel - Arrive 04:55 Voie 3. Status: Early, Service Class: Second Class Only.",
    "Train R 6530 Lausanne, Voie 4 05:30; Direction Neuchâtel - Arrive 05:44 Voie 1. Status: On Time, Service Class: Second Class Only.",
    "Train IC 7645 Lausanne, Voie 6 06:45; Direction St. Gallen - Arrive 07:26 Voie 4. Status: Delayed, Service Class: First & Second.",
    "Train IR 4756 Lausanne, Voie 9 07:56; Direction Lugano - Arrive 10:40 Voie 6. Status: On Time, Service Class: Second Class Only.",
    "Train R 6810 Lausanne, Voie 8 08:10; Direction Fribourg - Arrive 09:55 Voie 2. Status: Early, Service Class: Second Class Only.",
    "Train IC 7920 Lausanne, Voie 7 09:20; Direction Bellinzona - Arrive 12:05 Voie 1. Status: On Time, Service Class: First & Second.",
    "Train ICN 2033 Lausanne, Voie 1 10:33; Direction Biel/Bienne - Arrive 13:10 Voie 3. Status: Delayed, Service Class: First & Second.",
    "Train EC 4147 Lausanne, Voie 77 11:47; Direction La Chaux-de-Fonds - Arrive 14:20 Voie 1. Status: On Time, Service Class: Business & Second.",
    "Train RE 5200 Lausanne, Voie 2 12:00; Direction Chur - Arrive 15:35 Voie 5. Status: On Time, Service Class: Second Class Only.",
    "Train IR 4315 Lausanne, Voie 3 13:15; Direction Aarau - Arrive 16:00 Voie 2. Status: Delayed, Service Class: Second Class Only.",
    "Train R 6422 Lausanne, Voie 4 14:22; Direction Montreux - Arrive 15:55 Voie 4. Status: On Time, Service Class: Second Class Only.",
    "Train IC 7530 Lausanne, Voie 5 15:30; Direction Solothurn - Arrive 18:10 Voie 6. Status: Early, Service Class: First & Second.",
    "Train ICN 2044 Lausanne, Voie 6 16:44; Direction Yverdon-les-Bains - Arrive 18:20 Voie 7. Status: On Time, Service Class: First & Second.",
    "Train EC 4050 Lausanne, Voie 77 17:50; Direction Olten - Arrive 20:25 Voie 3. Status: Delayed, Service Class: Business & Second.",
    "Train IR 4830 Lausanne, Voie 9 18:30; Direction Sion - Arrive 21:05 Voie 2. Status: On Time, Service Class: Second Class Only.",
    "Train R 6944 Lausanne, Voie 8 19:44; Direction Brig - Arrive 22:20 Voie 1. Status: Early, Service Class: Second Class Only.",
    "Train IC 7215 Lausanne, Voie 7 20:15; Direction Schaffhausen - Arrive 23:00 Voie 4. Status: On Time, Service Class: First & Second.",
    "Train RE 5233 Lausanne, Voie 1 21:33; Direction Thun - Arrive 00:10 Voie 5. Status: Delayed, Service Class: Second Class Only.",
    "Train ICN 2046 Lausanne, Voie 2 22:46; Direction Zurich Airport - Arrive 01:20 Voie 6. Status: On Time, Service Class: First & Second.",
    "Train EC 4155 Lausanne, Voie 77 23:55; Direction St. Moritz - Arrive 03:30 Voie 1. Status: Delayed, Service Class: Business & Second."
];

let currentTextIndex = 0;
let transitionDone = false; 
let rowCount = 20;
let currentInterface = 0;
let trains = [];
let isMoving = [];

const interfaceStyles = {
    morning: { interfaceStyle: 0, rowCount: 24 }, //  6 - 12 
    afternoon: { interfaceStyle: 1, rowCount: 40 }, //  12- 18 
    night: { interfaceStyle: 2, rowCount: 9 } // 18 - 6 
};


export const getRowCount = () => rowCount;
export const getCurrentInterface = () => currentInterface;

export const setRowCount = (newRowCount) => {
    rowCount = newRowCount;
};

export const setCurrentInterface = (newCurrentInterface) => {
    currentInterface = newCurrentInterface;
};

export const createInterface = () => {
    document.body.innerHTML = ""; 
    trains = []; 
    isMoving = []; 
    const rowHeight = window.innerHeight / getRowCount(); 
    const currentHour = new Date().getHours(); 

    for (let i = 0; i < getRowCount(); i++) {
        let train = document.createElement("div");
        train.className = "train";
        train.textContent = textContent[currentHour]; 
        train.style.top = `${i * rowHeight}px`;
        train.style.fontSize = `${rowHeight * 0.8}px`;
        train.style.lineHeight = `${rowHeight}px`;
        train.style.left = "100vw";
        document.body.appendChild(train);
        trains.push(train);
        isMoving.push(true);

        train.onclick = function () {
            isMoving[i] = !isMoving[i];
        };
    }
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            currentTextIndex = (currentTextIndex + 1) % textContent.length;
            trains.forEach((train) => {
                textTransition(train, textContent[currentTextIndex]);
            });
        }
    });
};

function getCurrentInterfaceSettings() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
        return interfaceStyles.morning;
    } else if (hour >= 12 && hour < 18) {
        return interfaceStyles.afternoon;
    } else {
        return interfaceStyles.night;
    }
}

function updateInterfaceStyleAndRows() {
    const { interfaceStyle, rowCount } = getCurrentInterfaceSettings();
    
    if (getCurrentInterface() !== interfaceStyle || getRowCount() !== rowCount) {
        setCurrentInterface(interfaceStyle);
        setRowCount(rowCount);
        createInterface(); 
        console.log(`Updated to Interface Style: ${interfaceStyle}, Row Count: ${rowCount}`);
    }
}

setInterval(updateInterfaceStyleAndRows, 3600000);




function updateTrainText() {
    const currentHour = new Date().getHours();
    trains.forEach((train) => {
        train.textContent = textContent[currentHour];
        textTransition(train, textContent[currentTextIndex]); //shuffle works? 

        
    });
}



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



function update() {
    let currentTime = new Date();
    updateTrains();
    updateFontWeight(trains);
   

    //  updateTrainText chaque heure
    if (currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
        updateTrainText();
    }
     //SCENARIO.deleteWord();
    requestAnimationFrame(update);
   
}

function simulateClicks() {
    const clickInterval = 500;

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * trains.length);
        const train = trains[randomIndex];

        if (train && train.onclick) {
            train.onclick(); 
        }
    }, clickInterval);
}

updateInterfaceStyleAndRows();
SCENARIO.setupToggleInterface();
createInterface();
update();
simulateClicks();