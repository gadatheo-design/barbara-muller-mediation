// 02_erasure_by_speed
// Les gestes lents revelent des traces.
// Les gestes rapides les brouillent ou les effacent.

boolean erasureShowText = true;

void settings() {
  size(960, 640);
  smooth(8);
}

void setup() {
  frameRate(60);
  clearErasureSurface();
}

void draw() {
  noStroke();
  fill(244, 239, 232, 12);
  rect(0, 0, width, height);

  drawErasureAtmosphere();

  if (mousePressed) {
    float speed = dist(mouseX, mouseY, pmouseX, pmouseY);

    if (speed < 4.0) {
      drawSlowTrace();
    } else {
      drawFastErasure(speed);
    }
  }

  if (erasureShowText) {
    fill(48, 41, 33, 180);
    textSize(14);
    text("lent = apparition des traces", 18, 24);
    text("rapide = effacement ou flou", 18, 44);
    text("r = effacer, h = texte", 18, 64);
  }
}

void drawErasureAtmosphere() {
  noFill();
  stroke(86, 80, 74, 24);
  strokeWeight(1.0);
  for (int i = 0; i < 6; i++) {
    float y = height * 0.18 + i * height * 0.1;
    bezier(width * 0.08, y, width * 0.26, y - 12, width * 0.62, y + 16, width * 0.9, y - 5);
  }
}

void drawSlowTrace() {
  stroke(120, 154, 149, 84);
  strokeWeight(2.0);
  line(pmouseX, pmouseY, mouseX, mouseY);

  noStroke();
  fill(183, 127, 112, 78);
  ellipse(mouseX, mouseY, 28, 28);
  fill(250, 247, 240, 68);
  ellipse(mouseX, mouseY, 12, 12);
}

void drawFastErasure(float speed) {
  float brush = map(constrain(speed, 4.0, 28.0), 4.0, 28.0, 30.0, 90.0);
  noStroke();
  fill(244, 239, 232, 36);
  ellipse(mouseX, mouseY, brush, brush * 0.8);
  fill(244, 239, 232, 28);
  ellipse(lerp(mouseX, pmouseX, 0.5), lerp(mouseY, pmouseY, 0.5), brush * 0.75, brush * 0.55);
}

void clearErasureSurface() {
  background(244, 239, 232);
}

void keyPressed() {
  if (key == 'r' || key == 'R') {
    clearErasureSurface();
  } else if (key == 'h' || key == 'H') {
    erasureShowText = !erasureShowText;
  }
}
