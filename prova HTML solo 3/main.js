import * as UTILS from './utils.js'

const mouse = UTILS.useMouse();

let trains = [];
let isMoving = [];
const rowCount = 4;
const rowHeight = window.innerHeight / rowCount;

for (let i = 0; i < rowCount; i++) {
    let train = document.createElement("div");
    train.className = "train";
    train.textContent = `Train RegioExpress 18401  Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- Train RegioExpress 18401  Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.-    ${i + 1
        }`;
    train.style.top = `${i * rowHeight}px`;
    train.style.fontSize = `${rowHeight * 1}px`;

    // font-variation-settings: "grid" 336.588;

    train.style.lineHeight = `${rowHeight}px`;
    train.style.left = "100vw";
    document.body.appendChild(train);
    trains.push(train);
    isMoving.push(true);

    if (i < rowCount - 1) {
        let line = document.createElement("div");
        line.className = "line";
        line.style.top = `${(i + 1) * rowHeight}px`;
        document.body.appendChild(line);
    }

    train.onclick = function () {
        isMoving[i] = !isMoving[i];
    };
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

function updateFontWeight(currentTime) {

    trains.forEach((train) => {
        // const grid = UTILS.map(i, 0, rowCount - 1, 100, 700);
        //   console.log(weight, mouse.x);
        let weight = UTILS.map(Math.sin(currentTime * 0.005), -1, 1, 100, 700); // 500 - 900
        UTILS.setVariable(train, {
            grid: weight,
        });
        // train.style.fontWeight = weight;
    });
}

function update() {
    let currentTime = Date.now();
    updateTrains();
    updateFontWeight(currentTime);
    requestAnimationFrame(update)
}

update()