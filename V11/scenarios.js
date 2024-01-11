import { createInterface, getRowCount, getCurrentInterface, setRowCount, setCurrentInterface } from './main.js';

let nextTime = Date.now() + 2000;
let lastHourTriggered = null;



export function setupToggleInterface() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "v" || event.key === "V") {
            const current = getCurrentInterface(); 
            const newInterface = (current + 1) % 3;         // useless now
            setCurrentInterface(newInterface); 
            
            let newRowCount;
            if (newInterface === 0) {
                newRowCount = 10;
            } else if (newInterface === 10) {
                newRowCount = 20;
            } else {
                newRowCount = 50;
            }
            
            setRowCount(newRowCount); 
            createInterface(); 
        }
    });
}



export function deleteWord() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();


    if (currentMinute === 50 && lastHourTriggered !== currentHour) {                    // ???
        lastHourTriggered = currentHour; 

        const trains = document.querySelectorAll('.train');
        if (trains.length > 0) {
            const randomIndex = Math.floor(Math.random() * trains.length);
            const train = trains[randomIndex];
            if (train.textContent.length > 2) {
                train.textContent = train.textContent.slice(0, -2); 
            } else {
            }
        }
    }
}