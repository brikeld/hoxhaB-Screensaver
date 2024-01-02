import { createInterface, getRowCount, getCurrentInterface, setRowCount, setCurrentInterface } from './main.js';

let nextTime = Date.now() + 2000;


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

export function deleteWord(currentTime) {
    let interval = 0; 
    
    if(nextTime <= currentTime) {
        nextTime = currentTime + interval;
        const trains = document.querySelectorAll('.train');
        const train = trains[Math.floor(Math.random() * trains.length)];
        train.textContent = train.textContent.slice(0, -2);
    }
}
