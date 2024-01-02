import { createInterface, getRowCount, getCurrentInterface, setRowCount, setCurrentInterface } from './main.js';

let nextTime = Date.now() + 2000;
let lastHourTriggered = null;



export function setupToggleInterface() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "v" || event.key === "V") {
            const current = getCurrentInterface();
            const newInterface = (current + 1) % 3;
            setCurrentInterface(newInterface);
            
            const newRowCount = newInterface === 0 ? 1 : newInterface === 1 ? 9 : 50;
            setRowCount(newRowCount);
            createInterface();
        }
    });
}

export function deleteWord() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Check if it's 50 minutes past the hour and if this hour hasn't triggered the function yet
    if (currentMinute === 50 && lastHourTriggered !== currentHour) {
        lastHourTriggered = currentHour; // Update the last triggered hour

        const trains = document.querySelectorAll('.train');
        if (trains.length > 0) {
            const randomIndex = Math.floor(Math.random() * trains.length);
            const train = trains[randomIndex];
            if (train.textContent.length > 2) {
                train.textContent = train.textContent.slice(0, -2); // Delete last two characters
            } else {
                // Optional: Handle the case when text content becomes too short
            }
        }
    }
}