function textRow(inputText, rowNum, xPosition) {
  const rowCount = 4;
  const rowHeight = windowHeight / (rowCount + 1);
  const yPosition = rowNum * rowHeight;

  fill(255);
  textFont(myFont);
  textSize(rowHeight - 100);
  textAlign(CENTER, CENTER);

  text(inputText, xPosition, yPosition - rowHeight / 2);
}
