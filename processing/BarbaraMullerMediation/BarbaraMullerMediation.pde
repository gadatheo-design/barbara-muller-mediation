
/*
  Barbara Müller — Prototype Processing V6 FINAL
  Version finale — exposition, médiation, documentation

  Compile V5 + ajouts avancés :
  1. Mode kiosk / exposition.
  2. Archive visuelle finale.
  3. Comparaison avant / après.
  4. Version FR / DE / EN.
  5. Fiches low-tech.
  6. Mode sans texte / minimal.
  7. Micro-questions contextuelles.
  8. Trace fantôme du mouvement.
  9. Respiration globale de l’interface.
 10. Feedback visuel au choix d’un mot.
 11. Analyse de déplacement de l’attention.
 12. Cartel poétique.
 13. Mode score / partition de regard.
 14. Timer de regard lent.
 15. Reset doux par fondu blanc.

  Images dans /data :
  - oeuvre1.jpg
  - oeuvre2.jpg
  - oeuvre3.jpg

  Touches :
  ESPACE : commencer
  1/2/3 : œuvre
  A/Z/E : interaction
  B : changer langue FR/DE/EN
  K : mode kiosk ON/OFF
  O : accueil
  T : retour silencieux à l’œuvre
  D : dashboard médiateur
  V : afficher avant/après
  N : marquer point AVANT
  F : marquer point APRÈS
  G : générer archive visuelle finale
  X : exporter points de regard CSV
  W : mots ON/OFF
  M : carte regard ON/OFF
  L : résumé session
  R : reset
  S : capture
*/

PImage[] oeuvres = new PImage[3];

int currentWork = 0;
int currentInteraction = 0;

boolean publicMode = true;
boolean showOnboarding = true;
boolean showWords = true;
boolean showLookMap = false;
boolean finalPhraseVisible = false;
boolean returnToArtworkMode = false;
boolean dashboardVisible = false;
boolean kioskMode = false;
boolean showBeforeAfter = false;
boolean cursorHidden = false;

// V6 — modes avancés
boolean minimalTextMode = false;
boolean showMouseTrail = true;
boolean showPoeticLabel = false;
boolean scoreMode = false;
boolean softResetActive = false;

int wordPulseStart = -10000;
int softResetStart = 0;

int observationStart = 0;
boolean observationStarted = false;
int requiredObservationTime = 10000; // 10 secondes

ArrayList<PVector> mouseTrail = new ArrayList<PVector>();
int maxTrailLength = 80;


int returnStart = 0;
int returnDuration = 20000;

// Kiosk
int lastActivity;
int inactivityLimit = 120000; // 2 minutes

// Langues : 0 FR, 1 DE, 2 EN
int lang = 0;
String[] langCodes = {"FR", "DE", "EN"};

// V6 — micro-questions contextuelles
String[][] microQuestionsFR = {
  {
    "Quelle couche semble la plus fragile ?",
    "Quelle zone soutient l’ensemble ?",
    "Où la masse devient-elle trop présente ?"
  },
  {
    "Quelle couleur domine d’abord ?",
    "Le carré semble-t-il changer ?",
    "Votre regard suit-il une ligne ou saute-t-il ?"
  },
  {
    "Qu’est-ce qui apparaît lentement ?",
    "Où commence le geste ?",
    "Que reste-t-il quand l’image s’efface ?"
  }
};

String[][] microQuestionsDE = {
  {
    "Welche Schicht wirkt am fragilsten?",
    "Welche Zone stützt das Ganze?",
    "Wo wird die Masse zu präsent?"
  },
  {
    "Welche Farbe dominiert zuerst?",
    "Scheint sich das Quadrat zu verändern?",
    "Folgt Ihr Blick einer Linie oder springt er?"
  },
  {
    "Was erscheint langsam?",
    "Wo beginnt die Geste?",
    "Was bleibt, wenn das Bild verschwindet?"
  }
};

String[][] microQuestionsEN = {
  {
    "Which layer feels most fragile?",
    "Which zone seems to support the whole?",
    "Where does the mass become too present?"
  },
  {
    "Which color dominates first?",
    "Does the square seem to change?",
    "Does your gaze follow a line or jump?"
  },
  {
    "What slowly appears?",
    "Where does the gesture begin?",
    "What remains when the image fades?"
  }
};

// V6 — score / partition de regard
String[] scoreFR = {
  "Regardez sans toucher.",
  "Cherchez une zone légère.",
  "Cherchez une zone lourde.",
  "Suivez un bord.",
  "Choisissez un mot.",
  "Revenez à l’œuvre."
};

String[] scoreDE = {
  "Schauen Sie, ohne zu berühren.",
  "Suchen Sie eine leichte Zone.",
  "Suchen Sie eine schwere Zone.",
  "Folgen Sie einem Rand.",
  "Wählen Sie ein Wort.",
  "Kehren Sie zum Werk zurück."
};

String[] scoreEN = {
  "Look without touching.",
  "Find a light zone.",
  "Find a heavy zone.",
  "Follow an edge.",
  "Choose a word.",
  "Return to the work."
};


ArrayList<PVector> lookPoints = new ArrayList<PVector>();
ArrayList<PVector> regardPath = new ArrayList<PVector>();

PVector beforePoint = null;
PVector afterPoint = null;

PVector draggableChip;
boolean draggingChip = false;

PGraphics revealMask;

// Silence / immobilité
PVector lastMouse;
float stillness = 0;

// Calques œuvre 1
boolean[] layerActive = {true, true, true, true, true};
String[][] layerNames = {
  {"vert", "jaune", "bleu", "bordeaux", "fond"},
  {"Grün", "Gelb", "Blau", "Bordeaux", "Grund"},
  {"green", "yellow", "blue", "burgundy", "ground"}
};

// Mots / phrase finale
String selectedWord = "";
String finalPhrase = "";

// Dashboard / stats
int[] workVisits = {0, 0, 0};
int[][] interactionVisits = new int[3][3];
StringList chosenWords = new StringList();

// Log
PrintWriter logFile;
int sessionStart;
int interactionStart;
String sessionId;
int clickCount = 0;

String[][][] titles = {
  {
    {
      "Œuvre 1 — Calques activables",
      "Œuvre 1 — Points d’appui",
      "Œuvre 1 — Masse contre voile"
    },
    {
      "Werk 1 — Aktivierbare Schichten",
      "Werk 1 — Stützpunkte",
      "Werk 1 — Masse gegen Schleier"
    },
    {
      "Work 1 — Active layers",
      "Work 1 — Support points",
      "Work 1 — Mass against veil"
    }
  },
  {
    {
      "Œuvre 2 — Déplacer une couleur",
      "Œuvre 2 — Carte de dominance",
      "Œuvre 2 — Parcours du regard"
    },
    {
      "Werk 2 — Eine Farbe verschieben",
      "Werk 2 — Karte der Dominanz",
      "Werk 2 — Blickverlauf"
    },
    {
      "Work 2 — Move a color",
      "Work 2 — Dominance map",
      "Work 2 — Path of looking"
    }
  },
  {
    {
      "Œuvre 3 — Silence actif",
      "Œuvre 3 — Suivre un geste",
      "Œuvre 3 — Effacement lent"
    },
    {
      "Werk 3 — Aktive Stille",
      "Werk 3 — Einer Geste folgen",
      "Werk 3 — Langsames Verschwinden"
    },
    {
      "Work 3 — Active silence",
      "Work 3 — Follow a gesture",
      "Work 3 — Slow erasure"
    }
  }
};

String[][][] subtitles = {
  {
    {
      "Activez ou désactivez des couches pour lire la superposition.",
      "Les lignes signalent des relations possibles entre formes, appuis et déséquilibres.",
      "Déplacez la souris horizontalement : à gauche le voile domine, à droite la masse s’intensifie."
    },
    {
      "Aktivieren oder deaktivieren Sie Schichten, um die Überlagerung zu lesen.",
      "Linien zeigen mögliche Beziehungen zwischen Formen, Stützen und Ungleichgewichten.",
      "Bewegen Sie die Maus horizontal: links dominiert der Schleier, rechts verdichtet sich die Masse."
    },
    {
      "Turn layers on or off to read the superposition.",
      "Lines suggest possible relations between forms, supports and imbalance.",
      "Move horizontally: veil dominates on the left, mass intensifies on the right."
    }
  },
  {
    {
      "Glissez le carré : la couleur reste identique, mais sa perception change selon le voisinage.",
      "Les masses s’allument une à une pour faire lire la composition par blocs.",
      "Cliquez les zones dans l’ordre où votre regard circule."
    },
    {
      "Verschieben Sie das Quadrat: Die Farbe bleibt gleich, wirkt aber je nach Umgebung anders.",
      "Die Farbmassen leuchten nacheinander auf, um die Komposition als Blöcke zu lesen.",
      "Klicken Sie die Bereiche in der Reihenfolge an, in der Ihr Blick wandert."
    },
    {
      "Drag the square: the color stays the same, but perception changes with its surroundings.",
      "Color masses light up one by one to read the composition as blocks.",
      "Click areas in the order your gaze moves through them."
    }
  },
  {
    {
      "Restez immobile : l’image apparaît quand le regard ralentit.",
      "Suivez les lignes : elles proposent une lecture possible des gestes et directions.",
      "L’image oscille entre apparition et effacement."
    },
    {
      "Bleiben Sie ruhig: Das Bild erscheint, wenn der Blick langsamer wird.",
      "Folgen Sie den Linien: Sie schlagen eine Lesart der Gesten und Richtungen vor.",
      "Das Bild schwankt zwischen Erscheinen und Verschwinden."
    },
    {
      "Stay still: the image appears when looking slows down.",
      "Follow the lines: they suggest one possible reading of gestures and directions.",
      "The image oscillates between appearance and erasure."
    }
  }
};

String[][][] sensitiveWords = {
  {
    {"voile", "poids", "appui", "tension", "seuil", "suspension"},
    {"Schleier", "Gewicht", "Stütze", "Spannung", "Schwelle", "Schweben"},
    {"veil", "weight", "support", "tension", "threshold", "suspension"}
  },
  {
    {"masse", "chaleur", "contraste", "bloc", "voisinage", "domination"},
    {"Masse", "Wärme", "Kontrast", "Block", "Umgebung", "Dominanz"},
    {"mass", "warmth", "contrast", "block", "neighboring", "dominance"}
  },
  {
    {"trace", "souffle", "silence", "effacement", "fragilité", "apparition"},
    {"Spur", "Atem", "Stille", "Auslöschung", "Fragilität", "Erscheinen"},
    {"trace", "breath", "silence", "erasure", "fragility", "appearance"}
  }
};

void setup() {
  size(950, 1100);
  // Pour installation réelle, remplacer size(...) par :
  // fullScreen();

  smooth(8);

  oeuvres[0] = loadImage("oeuvre1.jpg");
  oeuvres[1] = loadImage("oeuvre2.jpg");
  oeuvres[2] = loadImage("oeuvre3.jpg");

  for (int i = 0; i < oeuvres.length; i++) {
    oeuvres[i] = fitImageToCanvas(oeuvres[i], width, height);
  }

  draggableChip = new PVector(width * 0.78, height * 0.25);

  revealMask = createGraphics(width, height);
  resetRevealMask();

  lastMouse = new PVector(mouseX, mouseY);

  textFont(createFont("Helvetica", 18));

  sessionStart = millis();
  interactionStart = millis();
  lastActivity = millis();
  sessionId = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "_" + nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);

  logFile = createWriter("test_log_" + sessionId + ".csv");
  logFile.println("time_ms;event;work;interaction;x;y;word;duration_ms;details");
  logEvent("session_start", "", -1, -1, "v5");

  workVisits[currentWork]++;
  interactionVisits[currentWork][currentInteraction]++;
}

void draw() {
  background(248);

  handleKioskInactivity();

  if (showOnboarding) {
    drawOnboarding();
    return;
  }

  drawCurrentArtworkInteraction();

  // V6 — trace fantôme du mouvement
  updateMouseTrail();
  if (showMouseTrail && !minimalTextMode) drawMouseTrail();

  // V6 — cartel poétique optionnel
  drawPoeticLabel();

  if (returnToArtworkMode) {
    drawReturnToArtworkOverlay();
    return;
  }

  if (showLookMap) drawLookMap();
  if (showBeforeAfter) {
    drawBeforeAfterOverlay();
    drawAttentionShiftStatement();
  }

  if (publicMode) drawPublicNavigation();
  else drawTestNavigation();

  if (showWords && !finalPhraseVisible) drawWordButtons();

  if (finalPhraseVisible) drawFinalPhraseCard();

  if (dashboardVisible) drawMediatorDashboard();

  drawLanguageButton();

  // V6 — feedbacks et modes transversaux
  drawWordPulse();
  drawScoreMode();
  updateSoftReset();
}

void drawCurrentArtworkInteraction() {
  if (currentWork == 0) {
    if (currentInteraction == 0) work1LayerMode();
    if (currentInteraction == 1) work1SupportPoints();
    if (currentInteraction == 2) work1MassVsVeil();
  }

  if (currentWork == 1) {
    if (currentInteraction == 0) work2MoveColor();
    if (currentInteraction == 1) work2DominanceMap();
    if (currentInteraction == 2) work2RegardPath();
  }

  if (currentWork == 2) {
    if (currentInteraction == 0) work3SilenceReveal();
    if (currentInteraction == 1) work3FollowGesture();
    if (currentInteraction == 2) work3SlowErasure();
  }
}

// ----------------------------------------------------
// V5.1 MODE KIOSK / EXPOSITION
// ----------------------------------------------------

void handleKioskInactivity() {
  if (!kioskMode) return;

  if (millis() - lastActivity > inactivityLimit) {
    resetForKiosk();
    logEvent("kiosk_auto_reset", selectedWord, -1, -1, "inactivity");
  }
}

void resetForKiosk() {
  showOnboarding = true;
  currentWork = 0;
  currentInteraction = 0;
  finalPhraseVisible = false;
  returnToArtworkMode = false;
  dashboardVisible = false;
  showLookMap = false;
  showBeforeAfter = false;
  selectedWord = "";
  beforePoint = null;
  afterPoint = null;
  regardPath.clear();
  stillness = 0;
  lastActivity = millis();
}

void toggleKioskMode() {
  kioskMode = !kioskMode;
  if (kioskMode && !cursorHidden) {
    noCursor();
    cursorHidden = true;
  } else if (!kioskMode && cursorHidden) {
    cursor();
    cursorHidden = false;
  }
  logEvent("toggle_kiosk", selectedWord, -1, -1, "kiosk=" + kioskMode);
}

// ----------------------------------------------------
// V5.2 ARCHIVE VISUELLE FINALE
// ----------------------------------------------------

void generateVisualArchive() {
  PGraphics archive = createGraphics(1400, 1800);
  archive.beginDraw();
  archive.background(250);
  archive.smooth(8);

  archive.textFont(createFont("Helvetica", 24));

  archive.fill(0);
  archive.textSize(54);
  archive.textAlign(LEFT, BASELINE);
  archive.text(t("Archive visuelle", "Visuelles Archiv", "Visual archive"), 90, 110);

  archive.textSize(26);
  archive.fill(0, 170);
  archive.text(t("Session de médiation interactive", "Interaktive Vermittlungssitzung", "Interactive mediation session"), 90, 155);

  // Artwork
  PImage art = oeuvres[currentWork];
  archive.image(art, 90, 220, 820, 950);

  // Look points
  archive.noStroke();
  for (PVector p : lookPoints) {
    float ax = map(p.x, 0, width, 90, 90 + 820);
    float ay = map(p.y, 0, height, 220, 220 + 950);
    archive.fill(120, 20, 45, 28);
    archive.ellipse(ax, ay, 72, 72);
    archive.fill(120, 20, 45, 45);
    archive.ellipse(ax, ay, 26, 26);
  }

  // Before after points
  if (beforePoint != null) {
    float bx = map(beforePoint.x, 0, width, 90, 90 + 820);
    float by = map(beforePoint.y, 0, height, 220, 220 + 950);
    archive.stroke(0);
    archive.strokeWeight(4);
    archive.fill(255);
    archive.ellipse(bx, by, 46, 46);
    archive.fill(0);
    archive.textSize(22);
    archive.textAlign(CENTER, CENTER);
    archive.text("A", bx, by);
  }

  if (afterPoint != null) {
    float ax = map(afterPoint.x, 0, width, 90, 90 + 820);
    float ay = map(afterPoint.y, 0, height, 220, 220 + 950);
    archive.stroke(120, 20, 45);
    archive.strokeWeight(4);
    archive.fill(255);
    archive.ellipse(ax, ay, 46, 46);
    archive.fill(120, 20, 45);
    archive.textSize(22);
    archive.textAlign(CENTER, CENTER);
    archive.text("B", ax, ay);
  }

  if (beforePoint != null && afterPoint != null) {
    float bx = map(beforePoint.x, 0, width, 90, 90 + 820);
    float by = map(beforePoint.y, 0, height, 220, 220 + 950);
    float ax = map(afterPoint.x, 0, width, 90, 90 + 820);
    float ay = map(afterPoint.y, 0, height, 220, 220 + 950);
    archive.stroke(120, 20, 45, 170);
    archive.strokeWeight(3);
    archive.line(bx, by, ax, ay);
  }

  // Text panel
  archive.noStroke();
  archive.fill(255);
  archive.rect(960, 220, 350, 950, 28);

  archive.fill(0);
  archive.textAlign(LEFT, BASELINE);
  archive.textSize(28);
  archive.text(titles[currentWork][lang][currentInteraction], 1000, 285);

  archive.textSize(20);
  archive.fill(0, 170);
  archive.textWrapped(subtitles[currentWork][lang][currentInteraction], 1000, 325, 270, 26);

  archive.fill(0);
  archive.textSize(24);
  archive.text(t("Mot choisi", "Gewähltes Wort", "Chosen word"), 1000, 480);

  archive.fill(120, 20, 45);
  archive.textSize(34);
  archive.text(selectedWord.equals("") ? "—" : selectedWord, 1000, 525);

  archive.fill(0);
  archive.textSize(24);
  archive.text(t("Phrase finale", "Schlusssatz", "Final sentence"), 1000, 605);

  archive.fill(0, 180);
  archive.textSize(18);
  archive.textWrapped(finalPhrase.equals("") ? buildArchiveFallbackPhrase() : finalPhrase, 1000, 640, 270, 26);

  archive.fill(0);
  archive.textSize(24);
  archive.text(t("Données", "Daten", "Data"), 1000, 820);

  archive.fill(0, 170);
  archive.textSize(18);
  archive.text(t("Clics", "Klicks", "Clicks") + " : " + clickCount, 1000, 860);
  archive.text(t("Points", "Punkte", "Points") + " : " + lookPoints.size(), 1000, 890);
  archive.text(t("Durée", "Dauer", "Duration") + " : " + nf((millis() - sessionStart)/1000.0, 0, 1) + " s", 1000, 920);
  archive.text("Session : " + sessionId, 1000, 950);

  // Footer
  archive.stroke(0);
  archive.strokeWeight(1);
  archive.line(90, 1700, 1310, 1700);
  archive.noStroke();
  archive.fill(0, 150);
  archive.textSize(18);
  archive.textAlign(LEFT, BASELINE);
  archive.text("Barbara Müller — prototype de médiation interactive / Processing V6 FINAL", 90, 1745);

  archive.endDraw();

  String filename = "archive_visuelle_" + sessionId + ".png";
  archive.save(filename);
  logEvent("generate_visual_archive", selectedWord, -1, -1, filename);
}

String buildArchiveFallbackPhrase() {
  buildFinalPhrase();
  return finalPhrase;
}

// ----------------------------------------------------
// V5.3 COMPARAISON AVANT / APRÈS
// ----------------------------------------------------

void markBeforePoint() {
  beforePoint = new PVector(mouseX, mouseY);
  logEvent("mark_before_point", selectedWord, mouseX, mouseY, "");
}

void markAfterPoint() {
  afterPoint = new PVector(mouseX, mouseY);
  logEvent("mark_after_point", selectedWord, mouseX, mouseY, "");
}

void drawBeforeAfterOverlay() {
  if (beforePoint == null && afterPoint == null) return;

  if (beforePoint != null && afterPoint != null) {
    stroke(120, 20, 45, 170);
    strokeWeight(3);
    line(beforePoint.x, beforePoint.y, afterPoint.x, afterPoint.y);
  }

  if (beforePoint != null) {
    stroke(0);
    strokeWeight(3);
    fill(255, 230);
    ellipse(beforePoint.x, beforePoint.y, 42, 42);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("A", beforePoint.x, beforePoint.y);
  }

  if (afterPoint != null) {
    stroke(120, 20, 45);
    strokeWeight(3);
    fill(255, 230);
    ellipse(afterPoint.x, afterPoint.y, 42, 42);
    fill(120, 20, 45);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("B", afterPoint.x, afterPoint.y);
  }

  textAlign(LEFT, BASELINE);
  drawMiniLabel(t("A = avant / B = après", "A = vorher / B = nachher", "A = before / B = after"), 52, 196);
}

// ----------------------------------------------------
// V5.4 LANGUES FR / DE / EN
// ----------------------------------------------------

String t(String fr, String de, String en) {
  if (lang == 1) return de;
  if (lang == 2) return en;
  return fr;
}

void nextLanguage() {
  lang = (lang + 1) % 3;
  buildFinalPhrase();
  logEvent("change_language", selectedWord, -1, -1, "lang=" + langCodes[lang]);
}

void drawLanguageButton() {
  float x = width - 92;
  float y = 140;
  float w = 58;
  float h = 34;

  stroke(0, 100);
  strokeWeight(1);
  fill(255, 225);
  rect(x, y, w, h, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(langCodes[lang], x + w/2, y + h/2);
  textAlign(LEFT, BASELINE);
}

boolean clickLanguageButton() {
  float x = width - 92;
  float y = 140;
  float w = 58;
  float h = 34;
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    nextLanguage();
    return true;
  }
  return false;
}

// ----------------------------------------------------
// ACCUEIL
// ----------------------------------------------------

void drawOnboarding() {
  background(250);

  int thumbW = 250;
  int thumbH = 300;
  int y = 145;
  for (int i = 0; i < 3; i++) {
    int x = 70 + i * 290;
    noStroke();
    fill(255);
    rect(x, y, thumbW, thumbH, 18);
    image(cropCenter(oeuvres[i], thumbW, thumbH), x, y, thumbW, thumbH);
  }

  fill(0);
  textAlign(LEFT, BASELINE);
  textSize(42);
  text(t("Regarder autrement", "Anders schauen", "Look differently"), 70, 530);

  textSize(22);
  fill(0, 190);
  text(t("Une médiation lente autour de trois peintures abstraites.",
         "Eine langsame Vermittlung zu drei abstrakten Gemälden.",
         "A slow mediation around three abstract paintings."), 70, 570);

  textSize(19);
  fill(0, 170);
  text(t("Choisissez une œuvre, testez un geste simple, puis revenez à la peinture.",
         "Wählen Sie ein Werk, testen Sie eine einfache Geste und kehren Sie zum Bild zurück.",
         "Choose a work, test a simple gesture, then return to the painting."), 70, 620);

  drawPrincipleCard(70, 685, "1", t("observer", "beobachten", "observe"), t("prendre le temps avant d’agir", "Zeit nehmen vor dem Handeln", "take time before acting"));
  drawPrincipleCard(350, 685, "2", t("toucher", "berühren", "touch"), t("révéler une relation visuelle", "eine visuelle Beziehung zeigen", "reveal a visual relation"));
  drawPrincipleCard(630, 685, "3", t("nommer", "benennen", "name"), t("choisir un mot et revenir à l’œuvre", "ein Wort wählen und zurück zum Werk", "choose a word and return to the work"));

  drawBigButton(width/2 - 150, 880, 300, 58, t("commencer", "beginnen", "start"));

  fill(0, 120);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(t("Espace ou clic pour commencer", "Leertaste oder Klick zum Start", "Space or click to start"), width/2, 960);

  drawLanguageButton();
  textAlign(LEFT, BASELINE);
}

void drawPrincipleCard(float x, float y, String num, String title, String desc) {
  stroke(0, 70);
  strokeWeight(1);
  fill(255);
  rect(x, y, 235, 128, 18);

  noStroke();
  fill(230, 240, 220);
  ellipse(x + 46, y + 48, 52, 52);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(num, x + 46, y + 48);

  textAlign(LEFT, BASELINE);
  textSize(20);
  text(title, x + 86, y + 45);

  textSize(14);
  fill(0, 165);
  text(desc, x + 86, y + 75);
}

void drawBigButton(float x, float y, float w, float h, String label) {
  stroke(0, 120);
  strokeWeight(1.4);
  fill(255);
  rect(x, y, w, h, 16);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(label, x + w/2, y + h/2);
  textAlign(LEFT, BASELINE);
}

// ----------------------------------------------------
// RETOUR À L’ŒUVRE
// ----------------------------------------------------

void startReturnToArtwork() {
  returnToArtworkMode = true;
  returnStart = millis();
  finalPhraseVisible = false;
  logEvent("start_return_to_artwork", selectedWord, -1, -1, "duration=" + returnDuration);
}

void drawReturnToArtworkOverlay() {
  int elapsed = millis() - returnStart;
  int remaining = max(0, returnDuration - elapsed);

  noStroke();
  fill(255, 215);
  rect(70, height - 140, width - 140, 88, 18);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(t("Regardez maintenant l’œuvre sans toucher l’écran.",
         "Betrachten Sie nun das Werk, ohne den Bildschirm zu berühren.",
         "Now look at the work without touching the screen."), width/2, height - 105);

  textSize(15);
  fill(0, 150);
  text(t("retour dans ", "zurück in ", "back in ") + ceil(remaining / 1000.0) + " s", width/2, height - 76);

  if (elapsed >= returnDuration) {
    returnToArtworkMode = false;
    logEvent("end_return_to_artwork", selectedWord, -1, -1, "");
  }
  textAlign(LEFT, BASELINE);
}

// ----------------------------------------------------
// DASHBOARD
// ----------------------------------------------------

void drawMediatorDashboard() {
  noStroke();
  fill(255, 247);
  rect(50, 145, width - 100, 720, 24);

  fill(0);
  textSize(28);
  text(t("Tableau médiateur", "Vermittlungsübersicht", "Mediator dashboard"), 85, 195);

  textSize(15);
  fill(0, 160);
  text(t("Résumé rapide de la session en cours", "Kurze Zusammenfassung der aktuellen Sitzung", "Quick summary of current session"), 85, 225);

  fill(0);
  textSize(18);
  text(t("Œuvres explorées", "Erkundete Werke", "Explored works"), 85, 280);

  for (int i = 0; i < 3; i++) {
    drawBar(85, 305 + i * 42, 250, 22, workVisits[i], max(1, maxWorkVisits()), t("Œuvre ", "Werk ", "Work ") + (i+1));
  }

  text(t("Interactions", "Interaktionen", "Interactions"), 410, 280);
  for (int i = 0; i < 3; i++) {
    int total = interactionVisits[i][0] + interactionVisits[i][1] + interactionVisits[i][2];
    drawBar(410, 305 + i * 42, 250, 22, total, max(1, maxInteractionVisits()), t("Œuvre ", "Werk ", "Work ") + (i+1));
  }

  text(t("Session", "Sitzung", "Session"), 85, 470);
  textSize(16);
  fill(0, 180);
  text(t("Durée", "Dauer", "Duration") + " : " + nf((millis() - sessionStart) / 1000.0, 0, 1) + " s", 85, 505);
  text(t("Clics", "Klicks", "Clicks") + " : " + clickCount, 85, 535);
  text(t("Points de regard", "Blickpunkte", "Look points") + " : " + lookPoints.size(), 85, 565);
  text(t("Mot choisi", "Gewähltes Wort", "Chosen word") + " : " + (selectedWord.equals("") ? "—" : selectedWord), 85, 595);
  text("Kiosk : " + kioskMode, 85, 625);
  text("Langue : " + langCodes[lang], 85, 655);

  fill(0);
  textSize(18);
  text(t("Mots choisis", "Gewählte Wörter", "Chosen words"), 410, 470);

  textSize(16);
  fill(0, 180);
  String words = "";
  for (int i = 0; i < chosenWords.size(); i++) {
    words += chosenWords.get(i);
    if (i < chosenWords.size() - 1) words += " · ";
  }
  if (words.equals("")) words = t("aucun mot choisi pour l’instant", "noch kein Wort gewählt", "no word chosen yet");
  textWrapped(words, 410, 505, 360, 100);

  drawSmallActionButton(85, 760, 150, 42, t("export points", "Punkte exportieren", "export points"), "export");
  drawSmallActionButton(250, 760, 150, 42, t("résumé", "Zusammenfassung", "summary"), "summary");
  drawSmallActionButton(415, 760, 150, 42, t("archive PNG", "PNG Archiv", "PNG archive"), "archive");
  drawSmallActionButton(580, 760, 120, 42, t("fermer", "schließen", "close"), "close");
}

void handleDashboardClick() {
  float y = 760;

  if (mouseX > 85 && mouseX < 235 && mouseY > y && mouseY < y + 42) {
    exportLookPoints();
  } else if (mouseX > 250 && mouseX < 400 && mouseY > y && mouseY < y + 42) {
    saveSessionSummary();
  } else if (mouseX > 415 && mouseX < 565 && mouseY > y && mouseY < y + 42) {
    generateVisualArchive();
  } else if (mouseX > 580 && mouseX < 700 && mouseY > y && mouseY < y + 42) {
    dashboardVisible = false;
    logEvent("close_dashboard", selectedWord, mouseX, mouseY, "");
  }
}

void drawBar(float x, float y, float w, float h, int value, int maxVal, String label) {
  fill(0, 40);
  rect(x, y, w, h, 7);

  fill(120, 20, 45, 145);
  float bw = map(value, 0, maxVal, 0, w);
  rect(x, y, bw, h, 7);

  fill(0);
  textSize(13);
  textAlign(LEFT, CENTER);
  text(label + " : " + value, x + 8, y + h/2);
  textAlign(LEFT, BASELINE);
}

int maxWorkVisits() {
  return max(workVisits[0], max(workVisits[1], workVisits[2]));
}

int maxInteractionVisits() {
  int m = 0;
  for (int i = 0; i < 3; i++) {
    int total = interactionVisits[i][0] + interactionVisits[i][1] + interactionVisits[i][2];
    m = max(m, total);
  }
  return m;
}

// ----------------------------------------------------
// EXPORTS
// ----------------------------------------------------

void exportLookPoints() {
  PrintWriter pw = createWriter("look_points_" + sessionId + ".csv");
  pw.println("index;x;y;work;interaction;selected_word;before_after");
  for (int i = 0; i < lookPoints.size(); i++) {
    PVector p = lookPoints.get(i);
    pw.println(i + ";" + p.x + ";" + p.y + ";" + currentWork + ";" + currentInteraction + ";" + selectedWord + ";look");
  }
  if (beforePoint != null) pw.println("before;" + beforePoint.x + ";" + beforePoint.y + ";" + currentWork + ";" + currentInteraction + ";" + selectedWord + ";before");
  if (afterPoint != null) pw.println("after;" + afterPoint.x + ";" + afterPoint.y + ";" + currentWork + ";" + currentInteraction + ";" + selectedWord + ";after");
  pw.flush();
  pw.close();

  logEvent("export_look_points", selectedWord, -1, -1, "count=" + lookPoints.size());
}

// ----------------------------------------------------
// PUBLIC NAVIGATION
// ----------------------------------------------------

void drawPublicNavigation() {
  // V6 — mode public minimal, presque sans texte
  if (minimalTextMode) {
    drawMinimalPublicNavigation();
    return;
  }

  noStroke();
  fill(255, uiBreath());
  rect(24, 22, width - 48, 104, 16);

  fill(0);
  textAlign(LEFT, BASELINE);
  textSize(25);
  text(titles[currentWork][lang][currentInteraction], 50, 60);

  fill(0, 165);
  textSize(15);
  text(subtitles[currentWork][lang][currentInteraction], 50, 94);

  drawStatusDots(width - 160, 58);

  float y = height - 154;
  drawSegmentedButtons(36, y, 260, 38, new String[]{t("Œuvre 1","Werk 1","Work 1"), t("Œuvre 2","Werk 2","Work 2"), t("Œuvre 3","Werk 3","Work 3")}, currentWork);
  drawSegmentedButtons(320, y, 590, 38, getInteractionNames(), currentInteraction);

  fill(255, 232);
  noStroke();
  rect(24, height - 96, width - 48, 74, 16);

  fill(0);
  textAlign(LEFT, BASELINE);
  textSize(16);
  text(getInstruction(), 50, height - 58);

  // V6 — micro-question contextuelle, plus légère que l’explication
  fill(0, 145);
  textSize(14);
  text(getMicroQuestion(), 50, height - 34);

  drawSmallActionButton(width - 190, height - 84, 140, 40, t("phrase finale", "Schlusssatz", "final phrase"), "final");
}

String[] getInteractionNames() {
  if (currentWork == 0) return new String[]{t("calques","Schichten","layers"), t("appuis","Stützen","supports"), t("masse","Masse","mass")};
  if (currentWork == 1) return new String[]{t("couleur","Farbe","color"), t("dominance","Dominanz","dominance"), t("parcours","Blickweg","path")};
  return new String[]{t("silence","Stille","silence"), t("geste","Geste","gesture"), t("effacement","Verschwinden","erasure")};
}

void drawSegmentedButtons(float x, float y, float totalW, float h, String[] labels, int activeIndex) {
  float gap = 8;
  float w = (totalW - gap * (labels.length - 1)) / labels.length;

  for (int i = 0; i < labels.length; i++) {
    float bx = x + i * (w + gap);
    boolean active = i == activeIndex;

    stroke(0, active ? 190 : 90);
    strokeWeight(active ? 2 : 1.1);
    fill(active ? color(35) : color(255, 232));
    rect(bx, y, w, h, 10);

    fill(active ? 255 : 0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(labels[i], bx + w/2, y + h/2);
  }
  textAlign(LEFT, BASELINE);
}

void handlePublicNavigationClick() {
  float y = height - 154;

  if (mouseY > y && mouseY < y + 38) {
    float x = 36;
    float totalW = 260;
    float gap = 8;
    float w = (totalW - gap * 2) / 3;

    for (int i = 0; i < 3; i++) {
      float bx = x + i * (w + gap);
      if (mouseX > bx && mouseX < bx + w) {
        setWork(i);
        logEvent("select_work_public", "", mouseX, mouseY, "work=" + i);
        return;
      }
    }

    x = 320;
    totalW = 590;
    w = (totalW - gap * 2) / 3;

    for (int i = 0; i < 3; i++) {
      float bx = x + i * (w + gap);
      if (mouseX > bx && mouseX < bx + w) {
        setInteraction(i);
        logEvent("select_interaction_public", "", mouseX, mouseY, "interaction=" + i);
        return;
      }
    }
  }

  if (mouseX > width - 190 && mouseX < width - 50 && mouseY > height - 84 && mouseY < height - 44) {
    buildFinalPhrase();
    finalPhraseVisible = true;
    logEvent("show_final_phrase", selectedWord, mouseX, mouseY, finalPhrase);
  }
}

// ----------------------------------------------------
// INTERACTIONS ŒUVRES
// ----------------------------------------------------

void work1LayerMode() {
  image(oeuvres[0], 0, 0);

  noStroke();
  fill(255, 82);
  rect(0, 0, width, height);

  if (layerActive[4]) {
    fill(255, 235);
    rect(0, 0, width, height);
    tint(255, 170);
    image(oeuvres[0], 0, 0);
    noTint();
  }

  blendMode(MULTIPLY);

  if (layerActive[0]) {
    fill(35, 190, 115, 105);
    organicBlob(width * 0.18, height * 0.48, 330, 430, 1.2);
  }

  if (layerActive[1]) {
    fill(215, 195, 115, 105);
    organicBlob(width * 0.54, height * 0.30, 540, 330, 2.1);
  }

  if (layerActive[2]) {
    fill(140, 190, 185, 105);
    organicBlob(width * 0.77, height * 0.39, 350, 520, 3.2);
  }

  if (layerActive[3]) {
    fill(85, 10, 35, 150);
    organicBlob(width * 0.42, height * 0.73, 285, 430, 4.3);
  }

  blendMode(BLEND);

  drawLayerButtons();
}

void drawLayerButtons() {
  float x = 42;
  float y = 148;
  float w = 116;
  float h = 36;
  float gap = 8;

  for (int i = 0; i < layerNames[lang].length; i++) {
    float bx = x + i * (w + gap);
    boolean active = layerActive[i];

    stroke(0, active ? 180 : 80);
    strokeWeight(active ? 2 : 1);
    fill(active ? color(255, 235) : color(255, 165));
    rect(bx, y, w, h, 10);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(layerNames[lang][i], bx + w/2, y + h/2);
  }
  textAlign(LEFT, BASELINE);
}

void handleLayerButtonClick() {
  if (currentWork != 0 || currentInteraction != 0) return;

  float x = 42;
  float y = 148;
  float w = 116;
  float h = 36;
  float gap = 8;

  if (mouseY > y && mouseY < y + h) {
    for (int i = 0; i < layerNames[lang].length; i++) {
      float bx = x + i * (w + gap);
      if (mouseX > bx && mouseX < bx + w) {
        layerActive[i] = !layerActive[i];
        logEvent("toggle_layer", layerNames[lang][i], mouseX, mouseY, "active=" + layerActive[i]);
      }
    }
  }
}

void work1SupportPoints() {
  image(oeuvres[0], 0, 0);

  PVector green = new PVector(width * 0.20, height * 0.47);
  PVector yellow = new PVector(width * 0.55, height * 0.29);
  PVector blue = new PVector(width * 0.78, height * 0.42);
  PVector burgundy = new PVector(width * 0.43, height * 0.72);

  float proximity = dist(mouseX, mouseY, width/2, height/2);
  float alpha = map(proximity, 0, width * 0.8, 185, 35);
  alpha = constrain(alpha, 35, 185);

  drawSoftConnection(green, yellow, color(60, 160, 100, alpha));
  drawSoftConnection(yellow, blue, color(190, 160, 70, alpha));
  drawSoftConnection(yellow, burgundy, color(110, 30, 50, alpha));
  drawSoftConnection(green, burgundy, color(90, 100, 80, alpha));

  drawPoint(green, t("vert","grün","green"));
  drawPoint(yellow, t("voile","Schleier","veil"));
  drawPoint(blue, t("bleu","blau","blue"));
  drawPoint(burgundy, t("masse","Masse","mass"));
}

void work1MassVsVeil() {
  image(oeuvres[0], 0, 0);

  float weight = map(mouseX, 0, width, 0, 145);
  float veil = 145 - weight;

  noStroke();

  fill(235, 225, 165, veil * 0.32);
  rect(0, 0, width, height);

  fill(170, 210, 205, veil * 0.25);
  organicBlob(width * 0.72, height * 0.40, 520, 600, 1.1);

  fill(70, 210, 130, veil * 0.25);
  organicBlob(width * 0.17, height * 0.48, 360, 500, 2.2);

  fill(85, 5, 30, weight * 0.72);
  organicBlob(width * 0.42, height * 0.73, 270, 420, 3.3);

  drawHorizontalGauge(t("voile","Schleier","veil"), t("masse","Masse","mass"), mouseX);
}

void work2MoveColor() {
  image(oeuvres[1], 0, 0);

  if (!draggingChip) {
    drawMiniLabel(t("glissez ce carré", "Quadrat verschieben", "drag this square"), draggableChip.x - 72, draggableChip.y - 80);
  }

  rectMode(CENTER);

  noStroke();
  fill(0, 40);
  rect(draggableChip.x + 6, draggableChip.y + 7, 104, 104, 8);

  fill(135, 165, 190, 230);
  rect(draggableChip.x, draggableChip.y, 96, 96, 6);

  fill(135, 165, 190);
  rect(draggableChip.x, draggableChip.y, 62, 62, 4);

  noFill();
  stroke(255, 245);
  strokeWeight(5);
  rect(draggableChip.x, draggableChip.y, 102, 102, 6);

  stroke(0, 170);
  strokeWeight(1.5);
  rect(draggableChip.x, draggableChip.y, 112, 112, 6);

  rectMode(CORNER);
  drawMiniLabel(t("même couleur", "gleiche Farbe", "same color"), draggableChip.x - 70, draggableChip.y + 68);
}

void work2DominanceMap() {
  image(oeuvres[1], 0, 0);

  int phase = (frameCount / 120) % 5;
  noStroke();

  if (phase == 0) {
    fill(235, 200, 95, 72);
    rect(width * 0.02, height * 0.33, width * 0.55, height * 0.42);
    labelInImage(t("masse claire / jaune", "helle / gelbe Masse", "light / yellow mass"));
  } else if (phase == 1) {
    fill(185, 92, 32, 78);
    rect(width * 0.38, height * 0.04, width * 0.45, height * 0.34);
    labelInImage(t("masse orange / chaude", "orange / warme Masse", "orange / warm mass"));
  } else if (phase == 2) {
    fill(10, 10, 10, 92);
    organicBlob(width * 0.33, height * 0.22, 380, 330, 2.0);
    labelInImage(t("masse sombre / lourde", "dunkle / schwere Masse", "dark / heavy mass"));
  } else if (phase == 3) {
    fill(115, 210, 150, 76);
    organicBlob(width * 0.78, height * 0.42, 300, 310, 3.0);
    labelInImage(t("zone verte / respiration", "grüne Zone / Atmung", "green zone / breathing"));
  } else {
    fill(220, 150, 190, 68);
    organicBlob(width * 0.60, height * 0.74, 520, 280, 4.0);
    labelInImage(t("zone rose / glissement", "rosa Zone / Gleiten", "pink zone / sliding"));
  }
}

void work2RegardPath() {
  image(oeuvres[1], 0, 0);

  stroke(120, 20, 35, 175);
  strokeWeight(3);
  noFill();
  beginShape();
  for (PVector p : regardPath) vertex(p.x, p.y);
  endShape();

  for (int i = 0; i < regardPath.size(); i++) {
    PVector p = regardPath.get(i);
    noStroke();
    fill(120, 20, 35, 210);
    ellipse(p.x, p.y, 30, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(str(i + 1), p.x, p.y + 1);
  }
  textAlign(LEFT, BASELINE);
}

void work3SilenceReveal() {
  updateStillness();

  // V6 — timer de regard lent : l’image ne se livre pas immédiatement
  updateObservationTimer();
  float slow = observationProgress();

  background(250);

  float alpha = map(stillness * slow, 0, 255, 18, 255);
  alpha = constrain(alpha, 18, 255);

  tint(255, alpha);
  image(oeuvres[2], 0, 0);
  noTint();

  float whiteVeil = map(stillness, 0, 255, 210, 0);
  noStroke();
  fill(250, whiteVeil);
  rect(0, 0, width, height);

  float meterW = map(stillness, 0, 255, 0, width - 120);
  fill(255, 230);
  rect(60, 148, width - 120, 38, 12);
  fill(70, 135, 100, 160);
  rect(60, 148, meterW, 38, 12);

  fill(0, 185);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(t("Restez immobile pour laisser apparaître l’image",
         "Bleiben Sie ruhig, damit das Bild erscheinen kann",
         "Stay still to let the image appear"), width/2, 167);
  textAlign(LEFT, BASELINE);
}

void updateStillness() {
  float movement = dist(mouseX, mouseY, lastMouse.x, lastMouse.y);

  if (movement < 1.8) stillness += 2.4;
  else if (movement < 6) stillness += 0.5;
  else stillness -= movement * 2.0;

  stillness = constrain(stillness, 0, 255);
  lastMouse.set(mouseX, mouseY);
}

void work3FollowGesture() {
  image(oeuvres[2], 0, 0);

  float pulse = map(sin(frameCount * 0.022), -1, 1, 0.20, 1.0);

  drawGestureLine(width*0.22, height*0.55, width*0.40, height*0.52, pulse, color(40, 130, 95, 135));
  drawGestureLine(width*0.50, height*0.25, width*0.58, height*0.12, pulse, color(140, 90, 45, 135));
  drawGestureLine(width*0.63, height*0.22, width*0.68, height*0.12, pulse, color(140, 80, 40, 135));
  drawGestureLine(width*0.80, height*0.48, width*0.84, height*0.72, pulse, color(40, 140, 100, 130));
  drawGestureLine(width*0.32, height*0.76, width*0.58, height*0.74, pulse, color(40, 125, 120, 130));
}

void work3SlowErasure() {
  image(oeuvres[2], 0, 0);

  float fade = map(sin(frameCount * 0.007), -1, 1, 25, 155);

  noStroke();
  fill(250, fade);
  rect(0, 0, width, height);

  tint(255, 112);
  image(oeuvres[2], 0, 0);
  noTint();

  noStroke();
  fill(45, 150, 105, 28);
  organicBlob(width*0.25, height*0.56, 280, 100, 1.2);

  fill(55, 130, 140, 28);
  organicBlob(width*0.45, height*0.74, 300, 90, 2.4);
}

// ----------------------------------------------------
// MOTS / PHRASE FINALE
// ----------------------------------------------------

void drawWordButtons() {
  String[] words = sensitiveWords[currentWork][lang];

  float margin = 34;
  float y = height - 206;
  float gap = 12;
  float bw = (width - margin * 2 - gap * (words.length - 1)) / words.length;
  float bh = 38;

  for (int i = 0; i < words.length; i++) {
    float x = margin + i * (bw + gap);
    boolean selected = selectedWord.equals(words[i]);

    stroke(0, selected ? 190 : 110);
    strokeWeight(selected ? 2.2 : 1.2);
    fill(selected ? color(120, 20, 45) : color(255, 230));
    rect(x, y, bw, bh, 10);

    fill(selected ? 255 : 0);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(words[i], x + bw / 2, y + bh / 2 + 1);
  }
  textAlign(LEFT, BASELINE);
}

void buildFinalPhrase() {
  if (selectedWord.equals("")) selectedWord = sensitiveWords[currentWork][lang][0];

  if (lang == 0) {
    if (currentWork == 0) finalPhrase = "Vous avez choisi « " + selectedWord + " ». Regardez maintenant comment ce mot circule entre les voiles pâles et la masse bordeaux.";
    else if (currentWork == 1) finalPhrase = "Vous avez choisi « " + selectedWord + " ». Revenez à l’image : quelle masse colorée produit le plus fortement cette sensation ?";
    else finalPhrase = "Vous avez choisi « " + selectedWord + " ». Regardez l’œuvre sans toucher l’écran : où ce mot apparaît-il le plus discrètement ?";
  } else if (lang == 1) {
    if (currentWork == 0) finalPhrase = "Sie haben « " + selectedWord + " » gewählt. Schauen Sie nun, wie dieses Wort zwischen den hellen Schleiern und der Bordeaux-Masse zirkuliert.";
    else if (currentWork == 1) finalPhrase = "Sie haben « " + selectedWord + " » gewählt. Kehren Sie zum Bild zurück: Welche Farbmasse erzeugt dieses Gefühl am stärksten?";
    else finalPhrase = "Sie haben « " + selectedWord + " » gewählt. Betrachten Sie das Werk ohne den Bildschirm zu berühren: Wo erscheint dieses Wort am leisesten?";
  } else {
    if (currentWork == 0) finalPhrase = "You chose “" + selectedWord + "”. Now look at how this word moves between the pale veils and the burgundy mass.";
    else if (currentWork == 1) finalPhrase = "You chose “" + selectedWord + "”. Return to the image: which color mass produces this sensation most strongly?";
    else finalPhrase = "You chose “" + selectedWord + "”. Look at the work without touching the screen: where does this word appear most discreetly?";
  }
}

void drawFinalPhraseCard() {
  noStroke();
  fill(255, 246);
  rect(60, height * 0.34, width - 120, 285, 24);

  fill(0);
  textAlign(LEFT, BASELINE);
  textSize(25);
  text(t("Retour à l’œuvre", "Zurück zum Werk", "Return to the work"), 95, height * 0.34 + 55);

  textSize(20);
  fill(0, 210);
  textWrapped(finalPhrase, 95, height * 0.34 + 100, width - 190, 110);

  float y = height * 0.34 + 218;
  drawSmallActionButton(width/2 - 290, y, 160, 42, t("continuer", "weiter", "continue"), "closeFinal");
  drawSmallActionButton(width/2 - 105, y, 210, 42, t("retour silencieux", "stille Rückkehr", "silent return"), "return");
  drawSmallActionButton(width/2 + 130, y, 180, 42, t("archive PNG", "PNG Archiv", "PNG archive"), "archive");
  textAlign(LEFT, BASELINE);
}


// ----------------------------------------------------
// V6 — MODES AVANCÉS
// ----------------------------------------------------

float uiBreath() {
  return map(sin(frameCount * 0.018), -1, 1, 215, 245);
}

void drawMinimalPublicNavigation() {
  noStroke();
  fill(255, uiBreath());
  rect(28, 28, width - 56, 72, 18);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(22);

  String symbol = "○";
  if (currentInteraction == 0) symbol = t("observer", "beobachten", "observe");
  if (currentInteraction == 1) symbol = t("suivre", "folgen", "follow");
  if (currentInteraction == 2) symbol = t("comparer", "vergleichen", "compare");

  text(symbol, 55, 64);

  textAlign(RIGHT, CENTER);
  text(langCodes[lang], width - 60, 64);

  // Navigation discrète en bas : œuvre active
  float y = height - 78;
  for (int i = 0; i < 3; i++) {
    noStroke();
    fill(i == currentWork ? 0 : color(0, 55));
    ellipse(width/2 - 38 + i * 38, y, 14, 14);
  }

  // Interaction active
  for (int i = 0; i < 3; i++) {
    noStroke();
    fill(i == currentInteraction ? color(120, 20, 45) : color(0, 35));
    rect(width/2 - 48 + i * 38, y + 25, 20, 4, 3);
  }

  textAlign(LEFT, BASELINE);
}

void updateObservationTimer() {
  if (!observationStarted) {
    observationStarted = true;
    observationStart = millis();
  }
}

float observationProgress() {
  if (!observationStarted) return 0;
  return constrain((millis() - observationStart) / float(requiredObservationTime), 0, 1);
}

void resetObservationTimer() {
  observationStarted = false;
  observationStart = millis();
}

String getMicroQuestion() {
  int index = (millis() / 7000) % 3;

  if (lang == 1) return microQuestionsDE[currentWork][index];
  if (lang == 2) return microQuestionsEN[currentWork][index];
  return microQuestionsFR[currentWork][index];
}

void updateMouseTrail() {
  mouseTrail.add(new PVector(mouseX, mouseY));

  if (mouseTrail.size() > maxTrailLength) {
    mouseTrail.remove(0);
  }
}

void drawMouseTrail() {
  noFill();

  for (int i = 1; i < mouseTrail.size(); i++) {
    PVector a = mouseTrail.get(i - 1);
    PVector b = mouseTrail.get(i);

    float alpha = map(i, 0, mouseTrail.size(), 0, 80);
    stroke(40, 80, 70, alpha);
    strokeWeight(map(i, 0, mouseTrail.size(), 0.5, 3));
    line(a.x, a.y, b.x, b.y);
  }
}

void drawWordPulse() {
  int elapsed = millis() - wordPulseStart;
  if (elapsed > 900) return;

  float alpha = map(elapsed, 0, 900, 90, 0);
  float radius = map(elapsed, 0, 900, 80, 420);

  noFill();
  stroke(120, 20, 45, alpha);
  strokeWeight(3);
  ellipse(width/2, height/2, radius, radius);
}

void drawAttentionShiftStatement() {
  if (beforePoint == null || afterPoint == null) return;

  float distanceMoved = dist(beforePoint.x, beforePoint.y, afterPoint.x, afterPoint.y);

  String statementFR;
  String statementDE;
  String statementEN;

  if (distanceMoved < 80) {
    statementFR = "Votre regard est resté proche du point initial.";
    statementDE = "Ihr Blick blieb nahe am ersten Punkt.";
    statementEN = "Your gaze stayed close to the initial point.";
  } else if (distanceMoved < 250) {
    statementFR = "Votre regard s’est légèrement déplacé.";
    statementDE = "Ihr Blick hat sich leicht verschoben.";
    statementEN = "Your gaze shifted slightly.";
  } else {
    statementFR = "Votre regard s’est fortement déplacé.";
    statementDE = "Ihr Blick hat sich deutlich verschoben.";
    statementEN = "Your gaze shifted strongly.";
  }

  String statement = t(statementFR, statementDE, statementEN);

  noStroke();
  fill(255, 235);
  rect(70, 210, width - 140, 52, 14);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(statement, width/2, 236);
  textAlign(LEFT, BASELINE);
}

void drawPoeticLabel() {
  if (!showPoeticLabel) return;

  String label = "";

  if (currentWork == 0) {
    label = t(
      "Une peinture d’équilibre : les voiles semblent flotter, mais une masse les retient.",
      "Ein Gleichgewicht: Schleier scheinen zu schweben, doch eine Masse hält sie zurück.",
      "A painting of balance: veils seem to float, yet a mass holds them back."
    );
  } else if (currentWork == 1) {
    label = t(
      "Une peinture de voisinages : chaque couleur change au contact d’une autre.",
      "Ein Bild der Nachbarschaften: Jede Farbe verändert sich durch die nächste.",
      "A painting of neighboring colors: each color changes through contact with another."
    );
  } else {
    label = t(
      "Une peinture presque silencieuse : les traces apparaissent quand le regard ralentit.",
      "Ein fast stilles Bild: Spuren erscheinen, wenn der Blick langsamer wird.",
      "An almost silent painting: traces appear when looking slows down."
    );
  }

  noStroke();
  fill(255, 238);
  rect(70, 145, width - 140, 90, 18);

  fill(0);
  textSize(19);
  textWrapped(label, 100, 185, width - 200, 26);
}

void drawScoreMode() {
  if (!scoreMode) return;

  int index = (millis() / 8000) % 6;

  String instruction;
  if (lang == 1) instruction = scoreDE[index];
  else if (lang == 2) instruction = scoreEN[index];
  else instruction = scoreFR[index];

  noStroke();
  fill(255, 240);
  rect(90, height/2 - 45, width - 180, 90, 22);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(26);
  text(instruction, width/2, height/2);

  textSize(13);
  fill(0, 130);
  text((index + 1) + " / 6", width/2, height/2 + 32);

  textAlign(LEFT, BASELINE);
}

void startSoftReset() {
  softResetActive = true;
  softResetStart = millis();
  logEvent("start_soft_reset", selectedWord, -1, -1, "");
}

void updateSoftReset() {
  if (!softResetActive) return;

  int elapsed = millis() - softResetStart;
  float alpha = map(elapsed, 0, 1200, 0, 255);
  alpha = constrain(alpha, 0, 255);

  noStroke();
  fill(250, alpha);
  rect(0, 0, width, height);

  if (elapsed > 1200) {
    softResetActive = false;
    resetCurrentMode();
  }
}

// ----------------------------------------------------
// EVENTS
// ----------------------------------------------------

void mousePressed() {
  lastActivity = millis();
  clickCount++;

  if (showOnboarding) {
    if (clickLanguageButton()) return;
    showOnboarding = false;
    logEvent("start_from_onboarding", "", mouseX, mouseY, "");
    return;
  }

  if (clickLanguageButton()) return;

  if (dashboardVisible) {
    handleDashboardClick();
    return;
  }

  if (returnToArtworkMode) {
    returnToArtworkMode = false;
    logEvent("interrupt_return_to_artwork", selectedWord, mouseX, mouseY, "");
    return;
  }

  if (finalPhraseVisible) {
    float y = height * 0.34 + 218;

    if (mouseX > width/2 - 290 && mouseX < width/2 - 130 && mouseY > y && mouseY < y + 42) {
      finalPhraseVisible = false;
      logEvent("close_final_phrase", selectedWord, mouseX, mouseY, "");
      return;
    }

    if (mouseX > width/2 - 105 && mouseX < width/2 + 105 && mouseY > y && mouseY < y + 42) {
      startReturnToArtwork();
      return;
    }

    if (mouseX > width/2 + 130 && mouseX < width/2 + 310 && mouseY > y && mouseY < y + 42) {
      generateVisualArchive();
      return;
    }
  }

  if (publicMode) handlePublicNavigationClick();

  checkWordButtons();
  handleLayerButtonClick();

  if (currentWork == 1 && currentInteraction == 0) {
    if (dist(mouseX, mouseY, draggableChip.x, draggableChip.y) < 80) {
      draggingChip = true;
      logEvent("start_drag_chip", selectedWord, mouseX, mouseY, "");
    }
  }

  if (currentWork == 1 && currentInteraction == 2) {
    regardPath.add(new PVector(mouseX, mouseY));
    lookPoints.add(new PVector(mouseX, mouseY));
    logEvent("add_regard_path_point", selectedWord, mouseX, mouseY, "point_index=" + regardPath.size());
  } else {
    lookPoints.add(new PVector(mouseX, mouseY));
    logEvent("click_artwork", selectedWord, mouseX, mouseY, "");
  }
}

void handleDashboardClick() {
  float y = 760;

  if (mouseX > 85 && mouseX < 235 && mouseY > y && mouseY < y + 42) {
    exportLookPoints();
  } else if (mouseX > 250 && mouseX < 400 && mouseY > y && mouseY < y + 42) {
    saveSessionSummary();
  } else if (mouseX > 415 && mouseX < 565 && mouseY > y && mouseY < y + 42) {
    generateVisualArchive();
  } else if (mouseX > 580 && mouseX < 700 && mouseY > y && mouseY < y + 42) {
    dashboardVisible = false;
    logEvent("close_dashboard", selectedWord, mouseX, mouseY, "");
  }
}

void mouseDragged() {
  lastActivity = millis();

  if (currentWork == 1 && currentInteraction == 0 && draggingChip) {
    draggableChip.x = constrain(mouseX, 50, width - 50);
    draggableChip.y = constrain(mouseY, 150, height - 250);
  }
}

void mouseReleased() {
  lastActivity = millis();

  if (draggingChip) {
    logEvent("end_drag_chip", selectedWord, mouseX, mouseY, "chip_x=" + draggableChip.x + ",chip_y=" + draggableChip.y);
  }
  draggingChip = false;
}

void keyPressed() {
  lastActivity = millis();

  if (key == ' ') {
    showOnboarding = false;
    logEvent("space_start", "", -1, -1, "");
  }

  if (key == '1') setWork(0);
  if (key == '2') setWork(1);
  if (key == '3') setWork(2);

  if (key == 'a' || key == 'A') setInteraction(0);
  if (key == 'z' || key == 'Z') setInteraction(1);
  if (key == 'e' || key == 'E') setInteraction(2);

  if (key == 'b' || key == 'B') nextLanguage();

  // V6 — modes avancés
  if (key == 'i' || key == 'I') {
    minimalTextMode = !minimalTextMode;
    logEvent("toggle_minimal_text", selectedWord, -1, -1, "minimalTextMode=" + minimalTextMode);
  }

  if (key == 'q' || key == 'Q') {
    showMouseTrail = !showMouseTrail;
    logEvent("toggle_mouse_trail", selectedWord, -1, -1, "showMouseTrail=" + showMouseTrail);
  }

  if (key == 'y' || key == 'Y') {
    showPoeticLabel = !showPoeticLabel;
    logEvent("toggle_poetic_label", selectedWord, -1, -1, "showPoeticLabel=" + showPoeticLabel);
  }

  if (key == 'u' || key == 'U') {
    scoreMode = !scoreMode;
    logEvent("toggle_score_mode", selectedWord, -1, -1, "scoreMode=" + scoreMode);
  }

  if (key == 'k' || key == 'K') toggleKioskMode();

  if (key == 'o' || key == 'O') {
    showOnboarding = !showOnboarding;
    logEvent("toggle_onboarding", "", -1, -1, "showOnboarding=" + showOnboarding);
  }

  if (key == 't' || key == 'T') startReturnToArtwork();

  if (key == 'd' || key == 'D') {
    dashboardVisible = !dashboardVisible;
    logEvent("toggle_dashboard", selectedWord, -1, -1, "dashboard=" + dashboardVisible);
  }

  if (key == 'v' || key == 'V') {
    showBeforeAfter = !showBeforeAfter;
    logEvent("toggle_before_after", selectedWord, -1, -1, "show=" + showBeforeAfter);
  }

  if (key == 'n' || key == 'N') markBeforePoint();
  if (key == 'f' || key == 'F') markAfterPoint();

  if (key == 'g' || key == 'G') generateVisualArchive();

  if (key == 'w' || key == 'W') {
    showWords = !showWords;
    logEvent("toggle_words", "", -1, -1, "showWords=" + showWords);
  }

  if (key == 'm' || key == 'M') {
    showLookMap = !showLookMap;
    logEvent("toggle_look_map", "", -1, -1, "showLookMap=" + showLookMap);
  }

  if (key == 'x' || key == 'X') exportLookPoints();

  if (key == 'l' || key == 'L') saveSessionSummary();

  if (key == 'r' || key == 'R') startSoftReset();

  if (key == 's' || key == 'S') {
    String filename = "capture_" + sessionId + "_####.png";
    saveFrame(filename);
    logEvent("save_capture", selectedWord, -1, -1, filename);
  }

  if (key == 'p' || key == 'P') {
    publicMode = !publicMode;
    logEvent("toggle_public_mode", "", -1, -1, "publicMode=" + publicMode);
  }
}

void checkWordButtons() {
  String[] words = sensitiveWords[currentWork][lang];

  float margin = 34;
  float y = height - 206;
  float gap = 12;
  float bw = (width - margin * 2 - gap * (words.length - 1)) / words.length;
  float bh = 38;

  if (mouseY < y || mouseY > y + bh) return;

  for (int i = 0; i < words.length; i++) {
    float x = margin + i * (bw + gap);
    if (mouseX > x && mouseX < x + bw) {
      selectedWord = words[i];
      wordPulseStart = millis(); // V6 — résonance visuelle du mot
      chosenWords.append(selectedWord);
      buildFinalPhrase();
      logEvent("select_word", selectedWord, mouseX, mouseY, "word_button");
    }
  }
}

void setWork(int index) {
  if (index < 0 || index > 2) return;
  currentWork = index;
  currentInteraction = 0;
  selectedWord = "";
  finalPhraseVisible = false;
  interactionStart = millis();
  resetObservationTimer();
  workVisits[currentWork]++;
  interactionVisits[currentWork][currentInteraction]++;
  logEvent("select_work", "", -1, -1, "work=" + index);
}

void setInteraction(int index) {
  if (index < 0 || index > 2) return;
  currentInteraction = index;
  finalPhraseVisible = false;
  interactionStart = millis();
  resetObservationTimer();
  interactionVisits[currentWork][currentInteraction]++;
  logEvent("select_interaction", selectedWord, -1, -1, "interaction=" + index);
}

void resetCurrentMode() {
  regardPath.clear();
  draggableChip = new PVector(width * 0.78, height * 0.25);
  resetRevealMask();
  stillness = 0;
  selectedWord = "";
  finalPhraseVisible = false;
  returnToArtworkMode = false;
  beforePoint = null;
  afterPoint = null;
  resetObservationTimer();
  mouseTrail.clear();
  logEvent("reset", "", -1, -1, "");
}

// ----------------------------------------------------
// LOG
// ----------------------------------------------------

void logEvent(String event, String word, float x, float y, String details) {
  if (logFile == null) return;
  int now = millis();
  int duration = now - interactionStart;
  logFile.println(now + ";" + event + ";" + currentWork + ";" + currentInteraction + ";" + x + ";" + y + ";" + word + ";" + duration + ";" + details);
  logFile.flush();
}

void saveSessionSummary() {
  PrintWriter summary = createWriter("session_summary_" + sessionId + ".txt");
  summary.println("Barbara Müller — Session de test V6 FINAL");
  summary.println("Session ID: " + sessionId);
  summary.println("Durée totale ms: " + (millis() - sessionStart));
  summary.println("Œuvre actuelle: " + currentWork);
  summary.println("Interaction actuelle: " + currentInteraction);
  summary.println("Mot choisi: " + selectedWord);
  summary.println("Nombre de clics: " + clickCount);
  summary.println("Points de regard: " + lookPoints.size());
  summary.println("Avant: " + (beforePoint == null ? "—" : beforePoint.x + "," + beforePoint.y));
  summary.println("Après: " + (afterPoint == null ? "—" : afterPoint.x + "," + afterPoint.y));
  summary.println("Mode public: " + publicMode);
  summary.println("Mode kiosk: " + kioskMode);
  summary.println("Langue: " + langCodes[lang]);
  summary.println("Mots choisis:");
  for (int i = 0; i < chosenWords.size(); i++) summary.println("- " + chosenWords.get(i));
  summary.flush();
  summary.close();
  logEvent("session_summary_saved", selectedWord, -1, -1, "summary_txt_created");
}

// ----------------------------------------------------
// UI TEST / HELPERS
// ----------------------------------------------------

void drawTestNavigation() {
  noStroke();
  fill(255, 224);
  rect(24, 22, width - 48, 104, 16);

  fill(0);
  textSize(25);
  text(titles[currentWork][lang][currentInteraction], 50, 60);

  fill(0, 165);
  textSize(15);
  text(subtitles[currentWork][lang][currentInteraction], 50, 94);

  drawStatusDots(width - 160, 58);

  noStroke();
  fill(255, 232);
  rect(24, height - 112, width - 48, 90, 16);

  fill(0);
  textSize(12);
  text("1/2/3 œuvres  A/Z/E interactions  B langue  K kiosk  O accueil  T retour  D dashboard  V avant/après  N avant  F après  G archive  X export", 50, height - 78);
  textSize(15);
  text(getInstruction(), 50, height - 43);
}

String getInstruction() {
  if (currentWork == 0 && currentInteraction == 0) return t("Touchez les boutons de calques pour faire apparaître ou disparaître les zones.",
    "Berühren Sie die Schicht-Tasten, um Bereiche erscheinen oder verschwinden zu lassen.",
    "Touch the layer buttons to show or hide zones.");
  if (currentWork == 0 && currentInteraction == 1) return t("Approchez la souris du centre : les relations entre zones deviennent plus visibles.",
    "Nähern Sie die Maus der Mitte: Beziehungen zwischen Zonen werden sichtbarer.",
    "Move near the center: relations between zones become more visible.");
  if (currentWork == 0 && currentInteraction == 2) return t("Déplacez la souris de gauche à droite pour faire varier voile et masse.",
    "Bewegen Sie die Maus von links nach rechts, um Schleier und Masse zu variieren.",
    "Move left to right to vary veil and mass.");

  if (currentWork == 1 && currentInteraction == 0) return t("Glissez le carré : la même couleur paraît changer selon le fond.",
    "Verschieben Sie das Quadrat: Dieselbe Farbe wirkt je nach Grund anders.",
    "Drag the square: the same color appears to change depending on the background.");
  if (currentWork == 1 && currentInteraction == 1) return t("Regardez les masses s’allumer une par une : quel bloc domine votre perception ?",
    "Sehen Sie, wie die Massen nacheinander aufleuchten: Welcher Block dominiert?",
    "Watch the masses light up one by one: which block dominates your perception?");
  if (currentWork == 1 && currentInteraction == 2) return t("Cliquez dans l’ordre où votre regard circule entre les masses.",
    "Klicken Sie in der Reihenfolge, in der Ihr Blick zwischen den Massen wandert.",
    "Click in the order your gaze moves between the masses.");

  if (currentWork == 2 && currentInteraction == 0) return t("Restez immobile : l’image se révèle quand le regard ralentit.",
    "Bleiben Sie ruhig: Das Bild zeigt sich, wenn der Blick langsamer wird.",
    "Stay still: the image reveals itself when looking slows down.");
  if (currentWork == 2 && currentInteraction == 1) return t("Suivez les lignes : elles suggèrent des directions possibles du geste.",
    "Folgen Sie den Linien: Sie deuten mögliche Richtungen der Geste an.",
    "Follow the lines: they suggest possible directions of gesture.");
  return t("Regardez l’image apparaître et s’effacer : que reste-t-il dans le blanc ?",
    "Sehen Sie, wie das Bild erscheint und verschwindet: Was bleibt im Weiß?",
    "Watch the image appear and fade: what remains in the white?");
}

void drawLookMap() {
  noStroke();
  for (PVector p : lookPoints) {
    fill(120, 20, 45, 16);
    ellipse(p.x, p.y, 58, 58);
    fill(120, 20, 45, 24);
    ellipse(p.x, p.y, 24, 24);
  }
}

void drawStatusDots(float x, float y) {
  for (int i = 0; i < 3; i++) {
    noStroke();
    fill(i == currentWork ? 0 : color(0, 45));
    ellipse(x + i * 24, y, 11, 11);
  }

  for (int i = 0; i < 3; i++) {
    noStroke();
    fill(i == currentInteraction ? color(120, 20, 45) : color(0, 45));
    ellipse(x + i * 24, y + 28, 11, 11);
  }
}

void drawSmallActionButton(float x, float y, float w, float h, String label, String id) {
  stroke(0, 120);
  strokeWeight(1.2);
  fill(255);
  rect(x, y, w, h, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, x + w/2, y + h/2);
  textAlign(LEFT, BASELINE);
}

void drawSoftConnection(PVector a, PVector b, color c) {
  stroke(c);
  strokeWeight(2);
  line(a.x, a.y, b.x, b.y);
}

void drawPoint(PVector p, String label) {
  noStroke();
  fill(255, 230);
  ellipse(p.x, p.y, 36, 36);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text(label, p.x, p.y);
  textAlign(LEFT, BASELINE);
}

void drawHorizontalGauge(String leftLabel, String rightLabel, float valueX) {
  float gx = 60;
  float gy = height - 250;
  float gw = width - 120;

  noStroke();
  fill(255, 230);
  rect(gx - 20, gy - 26, gw + 40, 55, 12);

  stroke(0, 120);
  strokeWeight(2);
  line(gx, gy, gx + gw, gy);

  noStroke();
  fill(120, 20, 40);
  ellipse(constrain(valueX, gx, gx + gw), gy, 18, 18);

  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(leftLabel, gx, gy + 25);
  textAlign(RIGHT, CENTER);
  text(rightLabel, gx + gw, gy + 25);
  textAlign(LEFT, BASELINE);
}

void labelInImage(String label) {
  fill(255, 230);
  noStroke();
  rect(40, 148, 345, 48, 12);

  fill(0);
  textSize(20);
  text(label, 58, 179);
}

void drawMiniLabel(String label, float x, float y) {
  textSize(13);
  float tw = textWidth(label) + 22;
  noStroke();
  fill(255, 225);
  rect(x, y, tw, 30, 8);
  fill(0, 170);
  textAlign(LEFT, CENTER);
  text(label, x + 11, y + 15);
  textAlign(LEFT, BASELINE);
}

void drawGestureLine(float x1, float y1, float x2, float y2, float t, color c) {
  PVector a = new PVector(x1, y1);
  PVector b = new PVector(x2, y2);
  float x = lerp(a.x, b.x, t);
  float y = lerp(a.y, b.y, t);

  stroke(c);
  strokeWeight(2.5);
  line(a.x, a.y, x, y);

  noStroke();
  fill(c);
  ellipse(x, y, 12, 12);
}

void resetRevealMask() {
  revealMask.beginDraw();
  revealMask.background(0);
  revealMask.endDraw();
}

void organicBlob(float cx, float cy, float w, float h, float seedOffset) {
  beginShape();
  for (float a = 0; a < TWO_PI; a += 0.18) {
    float n = noise(cos(a) * 0.8 + seedOffset, sin(a) * 0.8 + seedOffset, frameCount * 0.003);
    float r = map(n, 0, 1, 0.82, 1.12);
    float x = cx + cos(a) * w * 0.5 * r;
    float y = cy + sin(a) * h * 0.5 * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

void textWrapped(String s, float x, float y, float w, float lineH) {
  String[] words = split(s, ' ');
  String line = "";
  float yy = y;

  for (int i = 0; i < words.length; i++) {
    String test = line + words[i] + " ";
    if (textWidth(test) > w) {
      text(line, x, yy);
      line = words[i] + " ";
      yy += lineH;
    } else {
      line = test;
    }
  }
  text(line, x, yy);
}

PImage fitImageToCanvas(PImage source, int targetW, int targetH) {
  PGraphics pg = createGraphics(targetW, targetH);
  pg.beginDraw();
  pg.background(248);

  float scale = max((float)targetW / source.width, (float)targetH / source.height);
  float newW = source.width * scale;
  float newH = source.height * scale;
  float x = (targetW - newW) / 2;
  float y = (targetH - newH) / 2;

  pg.image(source, x, y, newW, newH);
  pg.endDraw();

  return pg.get();
}

PImage cropCenter(PImage source, int targetW, int targetH) {
  PGraphics pg = createGraphics(targetW, targetH);
  pg.beginDraw();
  pg.background(248);

  float scale = max((float)targetW / source.width, (float)targetH / source.height);
  float newW = source.width * scale;
  float newH = source.height * scale;
  float x = (targetW - newW) / 2;
  float y = (targetH - newH) / 2;

  pg.image(source, x, y, newW, newH);
  pg.endDraw();
  return pg.get();
}
