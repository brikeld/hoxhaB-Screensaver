
import * as UTILS from './utils.js'

const mouse = UTILS.useMouse();

let trains = [];
let isMoving = [];
let rowCount = 4; // Default row count
let currentInterface = 0; // 0 for 4 rows, 1 for 9 rows, 2 for 50 rows

const createInterface = () => {
    document.body.innerHTML = ''; // Clear existing content
    trains = []; // Reset trains array
    isMoving = []; // Reset moving state array
    const rowHeight = window.innerHeight / rowCount;

    for (let i = 0; i < rowCount; i++) {
        let train = document.createElement("div");
        train.className = "train";
        train.textContent = `Train RegioExpress 18401 Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- Train RegioExpress 18401 Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- ${i + 1}`;
        train.style.top = `${i * rowHeight}px`;
        train.style.fontSize = `${rowHeight * 0.8}px`; // Adjusted for fitting
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
};

// Toggle between different row counts
document.addEventListener('keydown', function (event) {
    if (event.key === 'v' || event.key === 'V') {
        currentInterface = (currentInterface + 1) % 3;
        rowCount = currentInterface === 0 ? 4 : currentInterface === 1 ? 9 : 50;
        createInterface();
    }
});

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
        let weight = UTILS.map(Math.sin(currentTime * 0.001), -1, 1, 100, 700);
        UTILS.setVariable(train, {
            grid: weight,
        });
    });
}

function update() {
    let currentTime = Date.now();
    updateTrains();
    updateFontWeight(currentTime);
    requestAnimationFrame(update)
}

createInterface(); // Initialize interface
update();
