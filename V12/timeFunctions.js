import * as UTILS from "./utils.js";

export function updateFontWeight(trains) {
    let hour = new Date().getHours();
    hour = Clock.getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();


    let weight;

    if (hour <= 12) {
        weight = UTILS.map(hour, 0, 12, 100, 700);
    } else {
        weight = UTILS.map(hour, 12, 24, 700, 100);
    }

    trains.forEach((train) => {
        UTILS.setVariable(train, { grid: weight });
    });
    console.log(weight);

   /* if(minute === 50) {
        deleteWord();
        console.log("delete word");
    }
}
*/
}
