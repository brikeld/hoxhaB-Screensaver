function baseGrid(rowCount) {
  const rowHeight = windowHeight / (rowCount + 1);
  for (let i = 1; i <= rowCount; i++) {
    const yPosition = i * rowHeight;
    line(0, yPosition, windowWidth, yPosition);
  }
}
