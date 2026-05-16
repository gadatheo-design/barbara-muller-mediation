const magneticWordData = [
  { label: "trace", polarity: 1, color: "#7c978f" },
  { label: "voile", polarity: 1, color: "#b69f81" },
  { label: "masse", polarity: -1, color: "#b1695b" },
  { label: "silence", polarity: 1, color: "#a4b3bc" },
  { label: "tension", polarity: -1, color: "#93594d" },
  { label: "reserve", polarity: 1, color: "#c2b7a8" },
  { label: "voisinage", polarity: -1, color: "#7486a0" },
];

let magneticWords = [];
let magneticPointerActive = false;

function setup() {
  const canvas = createCanvas(...getMagneticWordsSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
  resetMagneticWords();
}

function draw() {
  background("#f2ede4");
  drawMagneticField();

  const pointer = createVector(mouseX, mouseY);
  for (const word of magneticWords) {
    if (magneticPointerActive) {
      const direction = p5.Vector.sub(pointer, word.position);
      const distance = max(50, direction.mag());
      direction.normalize();
      direction.mult((word.polarity * 110) / distance);
      word.velocity.add(direction);
    } else {
      const home = p5.Vector.sub(word.base, word.position).mult(0.02);
      word.velocity.add(home);
    }

    word.velocity.mult(0.92);
    word.position.add(word.velocity);

    noStroke();
    fill(255, 130);
    ellipse(word.position.x, word.position.y + 2, textWidth(word.label) + 26, 30);
    fill(word.color);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(word.label, word.position.x, word.position.y);
  }

  if (magneticPointerActive) {
    noFill();
    stroke(76, 70, 64, 52);
    ellipse(mouseX, mouseY, 92);
  }

  fill(48, 42, 34, 120);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("Le vocabulaire se reorganise autour du geste.", 18, 18);
}

function drawMagneticField() {
  noStroke();
  fill(224, 210, 186, 140);
  ellipse(width * 0.24, height * 0.34, width * 0.38, height * 0.28);
  fill(168, 180, 173, 110);
  ellipse(width * 0.65, height * 0.6, width * 0.42, height * 0.34);
  fill(188, 124, 103, 86);
  rect(width * 0.5, height * 0.2, width * 0.2, height * 0.16, 18);
}

function resetMagneticWords() {
  magneticWords = magneticWordData.map((entry, index) => {
    const angle = (TWO_PI / magneticWordData.length) * index - HALF_PI;
    const radiusX = width * 0.25;
    const radiusY = height * 0.22;
    const base = createVector(width * 0.5 + cos(angle) * radiusX, height * 0.52 + sin(angle) * radiusY);
    return {
      label: entry.label,
      polarity: entry.polarity,
      color: entry.color,
      base,
      position: base.copy(),
      velocity: createVector(),
    };
  });
}

function mousePressed() {
  magneticPointerActive = true;
  return false;
}

function mouseReleased() {
  magneticPointerActive = false;
  return false;
}

function touchStarted() {
  magneticPointerActive = true;
  return false;
}

function touchEnded() {
  magneticPointerActive = false;
  return false;
}

function windowResized() {
  resizeCanvas(...getMagneticWordsSize());
  resetMagneticWords();
}

function getMagneticWordsSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}
