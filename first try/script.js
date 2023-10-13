let myFont;
let textPosition = [];
let speeds = [];
let isMoving = [];

function preload() {
  myFont = loadFont("fonts/Helvetica-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  pixelDensity(2);
  for (let i = 1; i <= 4; i++) {
    textPosition.push(windowWidth);
    speeds.push(random(17, 30));
    isMoving.push(true);
  }
  loop(); 
}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(255);
  baseGrid(4);
  textFont(myFont);
  textSize(32);
  fill(255);
  textAlign(RIGHT, CENTER);
  
  for (let i = 1; i <= 5; i++) {
    if (isMoving[i-1]) {
      textPosition[i-1] -= speeds[i-1];
      if (textPosition[i-1] < 0) {
        textPosition[i-1] = windowWidth;
      }
    }
    textRow(`train  N${i}`, i, textPosition[i-1]);
  }
}

function mousePressed() {
  const clickedRow = Math.floor(mouseY / (windowHeight / 5));
  isMoving[clickedRow] = !isMoving[clickedRow];
}
