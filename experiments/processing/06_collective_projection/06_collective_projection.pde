// 06_collective_projection
// Simulation d'une projection collective de traces d'attention.
// Plusieurs visiteurs virtuels laissent des trajectoires, des points et des mots.

ArrayList<AttentionVisitor> visitors = new ArrayList<AttentionVisitor>();
PVector[] anchors = new PVector[3];
String[] projectionWords = {
  "trace", "voile", "masse", "silence", "reserve", "voisinage", "tension"
};

boolean projectionShowText = true;
boolean projectionShowWords = true;
boolean projectionPaused = false;

void settings() {
  size(1100, 700);
  smooth(8);
}

void setup() {
  frameRate(60);
  createProjectionAnchors();
  resetProjectionVisitors();
}

void draw() {
  background(243, 238, 231);
  drawProjectionAnchors();

  if (!projectionPaused) {
    for (AttentionVisitor visitor : visitors) {
      visitor.update();
    }
  }

  for (AttentionVisitor visitor : visitors) {
    visitor.display();
  }

  if (projectionShowText) {
    fill(48, 41, 34, 180);
    textSize(14);
    text("projection collective : trajectoires, points, mots", 18, 24);
    text("espace = pause, w = mots, r = regenerer, h = texte", 18, 44);
  }
}

void createProjectionAnchors() {
  anchors[0] = new PVector(width * 0.24, height * 0.32);
  anchors[1] = new PVector(width * 0.54, height * 0.58);
  anchors[2] = new PVector(width * 0.78, height * 0.28);
}

void drawProjectionAnchors() {
  noStroke();
  fill(220, 208, 185, 130);
  ellipse(anchors[0].x, anchors[0].y, 220, 150);
  fill(159, 177, 171, 118);
  ellipse(anchors[1].x, anchors[1].y, 250, 180);
  fill(181, 112, 96, 96);
  ellipse(anchors[2].x, anchors[2].y, 180, 160);
}

void resetProjectionVisitors() {
  visitors.clear();
  for (int i = 0; i < 7; i++) {
    visitors.add(new AttentionVisitor(i));
  }
}

void keyPressed() {
  if (key == ' ') {
    projectionPaused = !projectionPaused;
  } else if (key == 'w' || key == 'W') {
    projectionShowWords = !projectionShowWords;
  } else if (key == 'r' || key == 'R') {
    resetProjectionVisitors();
  } else if (key == 'h' || key == 'H') {
    projectionShowText = !projectionShowText;
  }
}

class AttentionVisitor {
  PVector pos;
  PVector vel;
  PVector target;
  ArrayList<PVector> trail;
  color tone;
  String word;
  int anchorIndex;
  float wordAlpha;

  AttentionVisitor(int index) {
    anchorIndex = index % anchors.length;
    pos = anchors[anchorIndex].copy().add(random(-60, 60), random(-60, 60));
    vel = PVector.random2D().mult(random(0.4, 1.4));
    target = anchors[anchorIndex].copy();
    trail = new ArrayList<PVector>();
    tone = color(random(90, 180), random(95, 150), random(110, 170), 120);
    word = projectionWords[(int)random(projectionWords.length)];
    wordAlpha = random(80, 150);
  }

  void chooseNextTarget() {
    anchorIndex = (anchorIndex + 1 + (int)random(anchors.length - 1)) % anchors.length;
    target = anchors[anchorIndex].copy().add(random(-70, 70), random(-60, 60));
    word = projectionWords[(int)random(projectionWords.length)];
    wordAlpha = 140;
  }

  void update() {
    PVector desired = PVector.sub(target, pos);
    float distanceToTarget = desired.mag();
    desired.normalize();
    desired.mult(0.08);
    vel.add(desired);

    // La souris peut legerement attirer les trajectoires, comme un public present.
    PVector audience = new PVector(mouseX, mouseY);
    PVector toAudience = PVector.sub(audience, pos);
    float audienceDistance = max(80, toAudience.mag());
    toAudience.normalize();
    toAudience.mult(1.2 / audienceDistance);
    vel.add(toAudience);

    vel.limit(2.2);
    pos.add(vel);

    if (frameCount % 3 == 0) {
      trail.add(pos.copy());
      if (trail.size() > 120) {
        trail.remove(0);
      }
    }

    wordAlpha = max(28, wordAlpha - 0.18);

    if (distanceToTarget < 18) {
      chooseNextTarget();
    }
  }

  void display() {
    noFill();
    stroke(tone, 90);
    strokeWeight(1.5);
    beginShape();
    for (PVector p : trail) {
      curveVertex(p.x, p.y);
    }
    endShape();

    noStroke();
    fill(tone, 160);
    ellipse(pos.x, pos.y, 8, 8);

    if (projectionShowWords) {
      fill(56, 48, 40, wordAlpha);
      textSize(13);
      text(word, pos.x + 10, pos.y - 10);
    }
  }
}
