let veils = [];
let activeVeil = null;
let veilOffsetX = 0;
let veilOffsetY = 0;

function setup() {
  const canvas = createCanvas(...getVeilsSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
  createVeils();
}

function draw() {
  background("#f3eee5");
  drawVeilField();

  for (const veil of veils) {
    drawSingleVeil(veil);
  }

  fill(47, 41, 31, 118);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("Les voiles se chevauchent et modifient le poids de l'ensemble.", 18, 18);
}

function drawVeilField() {
  noStroke();
  fill(220, 202, 175, 170);
  rect(width * 0.08, height * 0.12, width * 0.42, height * 0.28, 20);
  fill(159, 174, 166, 120);
  rect(width * 0.42, height * 0.18, width * 0.44, height * 0.2, 28);
  fill(175, 98, 86, 118);
  rect(width * 0.54, height * 0.44, width * 0.24, height * 0.28, 16);
  fill(240, 235, 225, 180);
  rect(width * 0.16, height * 0.48, width * 0.34, height * 0.2, 22);

  stroke(90, 82, 74, 36);
  strokeWeight(1);
  noFill();
  for (let i = 0; i < 7; i += 1) {
    const y = height * 0.18 + i * height * 0.1;
    bezier(width * 0.08, y, width * 0.26, y - 10, width * 0.58, y + 16, width * 0.9, y - 6);
  }
}

function drawSingleVeil(veil) {
  push();
  translate(veil.x, veil.y);
  if (activeVeil === veil) {
    drawingContext.shadowColor = "rgba(50, 36, 24, 0.18)";
    drawingContext.shadowBlur = 18;
  }

  noStroke();
  for (let i = 0; i < 9; i += 1) {
    const alpha = map(i, 0, 8, veil.alpha * 0.4, veil.alpha);
    fill(red(veil.tint), green(veil.tint), blue(veil.tint), alpha);
    rect(0, i * (veil.h / 9), veil.w, veil.h / 9 + 1, 18);
  }

  noFill();
  stroke(255, 110);
  strokeWeight(1);
  rect(0, 0, veil.w, veil.h, 18);
  pop();
}

function createVeils() {
  veils = [
    { x: width * 0.14, y: height * 0.18, w: width * 0.28, h: height * 0.46, tint: color("#d4c8b4"), alpha: 72 },
    { x: width * 0.34, y: height * 0.28, w: width * 0.24, h: height * 0.38, tint: color("#9cafad"), alpha: 78 },
    { x: width * 0.57, y: height * 0.16, w: width * 0.22, h: height * 0.5, tint: color("#b26e61"), alpha: 66 },
  ];
}

function pointerPressedVeils() {
  for (let i = veils.length - 1; i >= 0; i -= 1) {
    const veil = veils[i];
    if (mouseX >= veil.x && mouseX <= veil.x + veil.w && mouseY >= veil.y && mouseY <= veil.y + veil.h) {
      activeVeil = veil;
      veilOffsetX = mouseX - veil.x;
      veilOffsetY = mouseY - veil.y;
      veils.splice(i, 1);
      veils.push(veil);
      return;
    }
  }
}

function pointerDraggedVeils() {
  if (!activeVeil) {
    return;
  }
  activeVeil.x = constrain(mouseX - veilOffsetX, 8, width - activeVeil.w - 8);
  activeVeil.y = constrain(mouseY - veilOffsetY, 8, height - activeVeil.h - 8);
}

function mousePressed() {
  pointerPressedVeils();
  return false;
}

function mouseDragged() {
  pointerDraggedVeils();
  return false;
}

function mouseReleased() {
  activeVeil = null;
  return false;
}

function touchStarted() {
  pointerPressedVeils();
  return false;
}

function touchMoved() {
  pointerDraggedVeils();
  return false;
}

function touchEnded() {
  activeVeil = null;
  return false;
}

function windowResized() {
  resizeCanvas(...getVeilsSize());
  createVeils();
}

function getVeilsSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}
