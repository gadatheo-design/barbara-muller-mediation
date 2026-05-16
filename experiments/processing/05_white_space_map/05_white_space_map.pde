// 05_white_space_map
// Le visiteur revele des zones blanches actives.
// Les zones se cartographient progressivement a mesure que l'on les parcourt.

ArrayList<WhiteZone> whiteZones = new ArrayList<WhiteZone>();
ArrayList<PVector> whiteMapPoints = new ArrayList<PVector>();
boolean whiteShowText = true;
boolean whiteShowGuides = false;

void settings() {
  size(960, 640);
  smooth(8);
}

void setup() {
  frameRate(60);
  createWhiteZones();
}

void draw() {
  background(244, 239, 232);
  drawWhiteMapField();

  float brushRadius = 42;
  for (WhiteZone zone : whiteZones) {
    if (zone.contains(mouseX, mouseY)) {
      zone.coverage = min(1.0, zone.coverage + 0.008);
      for (int i = 0; i < 4; i++) {
        float px = mouseX + random(-brushRadius, brushRadius);
        float py = mouseY + random(-brushRadius, brushRadius);
        if (zone.contains(px, py)) {
          whiteMapPoints.add(new PVector(px, py));
        }
      }
    }

    zone.display();
    if (whiteShowGuides) {
      zone.displayGuide();
    }
  }

  noStroke();
  fill(255, 230);
  for (PVector point : whiteMapPoints) {
    ellipse(point.x, point.y, 4, 4);
  }

  noFill();
  stroke(78, 71, 63, 48);
  ellipse(mouseX, mouseY, brushRadius * 2.0, brushRadius * 2.0);

  if (whiteShowText) {
    fill(46, 39, 33, 180);
    textSize(14);
    text("cartographier le blanc comme structure active", 18, 24);
    text("o = guides, r = recommencer, h = texte", 18, 44);
    text("zones revelees : " + nf(averageCoverage() * 100.0, 1, 0) + "%", 18, 64);
  }
}

void drawWhiteMapField() {
  noStroke();
  fill(223, 209, 184, 132);
  rect(width * 0.14, height * 0.16, width * 0.32, height * 0.24, 22);
  fill(160, 177, 171, 110);
  rect(width * 0.44, height * 0.32, width * 0.3, height * 0.18, 20);
  fill(178, 110, 94, 92);
  rect(width * 0.62, height * 0.5, width * 0.18, height * 0.21, 16);
}

float averageCoverage() {
  float total = 0;
  for (WhiteZone zone : whiteZones) {
    total += zone.coverage;
  }
  return total / max(1, whiteZones.size());
}

void createWhiteZones() {
  whiteZones.clear();
  whiteMapPoints.clear();
  whiteZones.add(new WhiteZone(width * 0.28, height * 0.28, 110, 72));
  whiteZones.add(new WhiteZone(width * 0.57, height * 0.26, 86, 56));
  whiteZones.add(new WhiteZone(width * 0.36, height * 0.62, 94, 70));
  whiteZones.add(new WhiteZone(width * 0.74, height * 0.6, 74, 58));
}

void keyPressed() {
  if (key == 'o' || key == 'O') {
    whiteShowGuides = !whiteShowGuides;
  } else if (key == 'r' || key == 'R') {
    createWhiteZones();
  } else if (key == 'h' || key == 'H') {
    whiteShowText = !whiteShowText;
  }
}

class WhiteZone {
  float x;
  float y;
  float rx;
  float ry;
  float coverage = 0.0;

  WhiteZone(float centerX, float centerY, float radiusX, float radiusY) {
    x = centerX;
    y = centerY;
    rx = radiusX;
    ry = radiusY;
  }

  boolean contains(float px, float py) {
    float dx = (px - x) / rx;
    float dy = (py - y) / ry;
    return dx * dx + dy * dy <= 1.0;
  }

  void display() {
    noStroke();
    fill(252, 249, 244, 210 * coverage);
    ellipse(x, y, rx * 2.0, ry * 2.0);
  }

  void displayGuide() {
    noFill();
    stroke(73, 67, 61, 52);
    strokeWeight(1.0);
    ellipse(x, y, rx * 2.0, ry * 2.0);
  }
}
