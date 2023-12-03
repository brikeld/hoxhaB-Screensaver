import * as UTILS from "./utils.js";
import * as SCENARIO from "./scenarios.js";

const mouse = UTILS.useMouse();
// un array è un contenitore di dati
// isMoving è un array di booleani
// let trains è un array di elementi del DOM
//
let trains = [];
let isMoving = [];
let rowCount = 20; // default
let currentInterface = 0; // 0 per 1 row, 1 per 9 rows, 2 per 50 rows

const createInterface = () => {
  document.body.innerHTML = ""; // Clear!
  trains = []; // reset
  isMoving = []; // reset
  const rowHeight = window.innerHeight / rowCount;

  for (let i = 0; i < rowCount; i++) {
    let train = document.createElement("div");
    train.className = "train";
    train.textContent = `Train RegioExpress 18401 Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- Train RegioExpress 18401 Genève, Voie 6 04;20 Direction Lausanne 06;59 Voie 3 - Occupation 1/3 Billets à partir de CHF 10,20.- ${
      i + 1
    }`;
    train.style.top = `${i * rowHeight}px`;
    train.style.fontSize = `${rowHeight * 0.8}px`; // fit text
    train.style.lineHeight = `${rowHeight}px`;
    train.style.left = "100vw";
    document.body.appendChild(train);
    trains.push(train);
    isMoving.push(true);

    if (i < rowCount - 1) {
      //ajouter les lignes entre les trains
      let line = document.createElement("div");
      line.className = "line";
      line.style.top = `${(i + 1) * rowHeight}px`;
      document.body.appendChild(line);
    }

    train.onclick = function () {
      console.log("yes");
      isMoving[i] = !isMoving[i];
      // background(255);
    };
  }
};
// Toggle between different row counts
document.addEventListener("keydown", function (event) {
  if (event.key === "v" || event.key === "V") {
    currentInterface = (currentInterface + 1) % 3;
    rowCount = currentInterface === 0 ? 1 : currentInterface === 1 ? 9 : 50; // cambiato da 4 ad 1
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
    let weight = UTILS.map(Math.sin(currentTime * 0.001), -1, 1, 100, 600);
    UTILS.setVariable(train, {
      grid: weight,
    });
  });
}



function update() {
  let currentTime = Date.now();
  updateTrains();
  updateFontWeight(currentTime);
  requestAnimationFrame(update);

  SCENARIO.deleteWord(currentTime);
}

createInterface();
update();
