// random start and stop
import * as UTILS from "./utils.js";

let nextTime = Date.now() + 2000;

export function randomStartStop(currentTime) {
    let interval = 100;

    if(nextTime <= currentTime) {
        nextTime = currentTime + interval;
        const trains = document.querySelectorAll('.train');
        UTILS.random(trains).click();
    }
}

export function deleteWord(currentTime) {
    let interval = 1;
    
    if(nextTime <= currentTime) {
        nextTime = currentTime + interval;
        const trains = document.querySelectorAll('.train');
        const train = UTILS.random(trains);
        train.textContent = train.textContent.slice(0, -1);
    }
}