/*
 * Barbara Muller Mediation — first mobile web prototype
 *
 * This sketch keeps the Processing version untouched and recreates the core
 * mediation flow in p5.js with a mobile-first interface:
 * start → choose artwork → observe → choose interaction → interact →
 * choose word → final phrase → silent return.
 */

const TEXT = {
  fr: {
    session: "Session",
    startStep: "Mediation mobile",
    startTitle: "Regarder autrement",
    startCopy: "Un parcours lent autour de trois peintures abstraites. Prenez le temps d’observer, d’essayer un geste, puis de revenir à l’œuvre.",
    startAction: "Commencer",
    chooseArtworkStep: "1 / 7",
    chooseArtworkTitle: "Choisissez une œuvre",
    chooseArtworkCopy: "Commencez avec une seule peinture. Le parcours se dépliera ensuite pas à pas.",
    observeStep: "2 / 7",
    observeTitle: "Regardez en silence",
    observeCopy: "Prenez quelques secondes avant d’agir. Laissez d’abord l’image venir vers vous.",
    chooseInteractionStep: "3 / 7",
    chooseInteractionTitle: "Choisissez une interaction",
    chooseInteractionCopy: "Choisissez une manière de regarder, puis essayez-la doucement.",
    interactStep: "4 / 7",
    interactTitle: "Essayez le geste",
    interactCopy: "Touchez, déplacez ou ralentissez selon l’interaction choisie. Quand cela vous semble juste, passez au mot.",
    chooseWordStep: "5 / 7",
    chooseWordTitle: "Choisissez un mot sensible",
    chooseWordCopy: "Choisissez le mot qui nomme au plus près votre sensation.",
    finalStep: "6 / 7",
    finalTitle: "Formulez une phrase",
    finalCopy: "Laissez la phrase vous aider à revenir au tableau.",
    returnStep: "7 / 7",
    returnTitle: "Retour silencieux",
    returnCopy: "Revenez maintenant à l’œuvre sans toucher l’écran.",
    chooseWordAction: "Choisir un mot",
    chooseWordWait: "Prenez encore un instant",
    chooseWordWaitCopy: "Le mot viendra mieux après une courte expérience.",
    finalAction: "Générer la phrase",
    anotherWord: "Choisir un autre mot",
    continueLooking: "Continuer à regarder",
    silentReturn: "Retour silencieux",
    before: "Avant",
    after: "Après",
    tapToPlaceBefore: "Touchez l’image pour placer A",
    tapToPlaceAfter: "Touchez l’image pour placer B",
    summaryArtwork: "Œuvre",
    summaryInteraction: "Interaction",
    summaryWord: "Mot",
    summaryLanguage: "Langue",
    summaryDuration: "Durée",
    summaryTouches: "Touches",
    summaryBeforeAfter: "Avant / après",
    summaryPhase: "Étape",
    none: "—",
    marked: "placé",
    notMarked: "à faire",
    readyHint: "Quand vous êtes prêt, choisissez un mot.",
    phraseKicker: "Phrase finale",
    backToInteractions: "Reprendre avec une interaction",
    flowFinished: "Vous pouvez rester avec l’œuvre, ou choisir un autre geste.",
    clearPath: "Effacer le parcours",
    clearTrace: "Effacer la trace",
    useLayers: "Touchez les couches pour faire varier la peinture.",
    useVeil: "Glissez sur l’image pour déplacer l’équilibre entre voile et masse.",
    useSquare: "Déplacez le carré pour voir changer les relations de couleur.",
    usePath: "Touchez plusieurs points dans l’ordre de votre regard.",
    useSlow: "Gardez le doigt presque immobile pour laisser l’image se révéler.",
    useTrace: "Tracez une ligne lente sur l’image.",
    observationCountdown: "Encore un instant avant le geste",
  },
  de: {
    session: "Sitzung",
    startStep: "Mobile Vermittlung",
    startTitle: "Anders schauen",
    startCopy: "Ein langsamer Parcours durch drei abstrakte Gemälde. Nehmen Sie sich Zeit zum Schauen, probieren Sie eine Geste, und kehren Sie dann zum Werk zurück.",
    startAction: "Beginnen",
    chooseArtworkStep: "1 / 7",
    chooseArtworkTitle: "Wählen Sie ein Werk",
    chooseArtworkCopy: "Beginnen Sie mit einem einzigen Bild. Der Parcours entfaltet sich danach Schritt für Schritt.",
    observeStep: "2 / 7",
    observeTitle: "Schauen Sie still",
    observeCopy: "Nehmen Sie sich ein paar Sekunden, bevor Sie handeln. Lassen Sie das Bild zuerst zu Ihnen kommen.",
    chooseInteractionStep: "3 / 7",
    chooseInteractionTitle: "Wählen Sie eine Interaktion",
    chooseInteractionCopy: "Wählen Sie eine Art des Schauens und probieren Sie sie ruhig aus.",
    interactStep: "4 / 7",
    interactTitle: "Probieren Sie die Geste",
    interactCopy: "Berühren, verschieben oder verlangsamen Sie je nach gewählter Interaktion. Wenn es stimmig ist, gehen Sie zum Wort über.",
    chooseWordStep: "5 / 7",
    chooseWordTitle: "Wählen Sie ein sensibles Wort",
    chooseWordCopy: "Wählen Sie das Wort, das Ihrer Empfindung am nächsten kommt.",
    finalStep: "6 / 7",
    finalTitle: "Formulieren Sie einen Satz",
    finalCopy: "Lassen Sie sich von dem Satz wieder zum Werk führen.",
    returnStep: "7 / 7",
    returnTitle: "Stille Rückkehr",
    returnCopy: "Kehren Sie nun zum Werk zurück, ohne den Bildschirm zu berühren.",
    chooseWordAction: "Ein Wort wählen",
    chooseWordWait: "Bleiben Sie noch einen Moment",
    chooseWordWaitCopy: "Das Wort kommt besser nach einer kurzen Erfahrung.",
    finalAction: "Satz erzeugen",
    anotherWord: "Ein anderes Wort wählen",
    continueLooking: "Weiter schauen",
    silentReturn: "Stille Rückkehr",
    before: "Vorher",
    after: "Nachher",
    tapToPlaceBefore: "Berühren Sie das Bild, um A zu setzen",
    tapToPlaceAfter: "Berühren Sie das Bild, um B zu setzen",
    summaryArtwork: "Werk",
    summaryInteraction: "Interaktion",
    summaryWord: "Wort",
    summaryLanguage: "Sprache",
    summaryDuration: "Dauer",
    summaryTouches: "Berührungen",
    summaryBeforeAfter: "Vorher / Nachher",
    summaryPhase: "Phase",
    none: "—",
    marked: "gesetzt",
    notMarked: "offen",
    readyHint: "Wenn Sie bereit sind, wählen Sie ein Wort.",
    phraseKicker: "Schlusssatz",
    backToInteractions: "Zur Interaktion zurück",
    flowFinished: "Sie können beim Werk bleiben oder eine andere Geste wählen.",
    clearPath: "Blickweg löschen",
    clearTrace: "Spur löschen",
    useLayers: "Berühren Sie die Schichten, um das Bild zu verändern.",
    useVeil: "Streichen Sie über das Bild, um das Gleichgewicht zwischen Schleier und Masse zu verschieben.",
    useSquare: "Verschieben Sie das Quadrat, um Farbverhältnisse zu verändern.",
    usePath: "Setzen Sie mehrere Punkte in der Reihenfolge Ihres Blicks.",
    useSlow: "Halten Sie den Finger fast still, damit das Bild langsam erscheint.",
    useTrace: "Zeichnen Sie langsam eine Spur über das Bild.",
    observationCountdown: "Noch einen Moment vor der Geste",
  },
  en: {
    session: "Session",
    startStep: "Mobile mediation",
    startTitle: "Look differently",
    startCopy: "A slow path through three abstract paintings. Take time to look, try one gesture, then return to the work.",
    startAction: "Begin",
    chooseArtworkStep: "1 / 7",
    chooseArtworkTitle: "Choose one artwork",
    chooseArtworkCopy: "Start with a single painting. The flow will unfold step by step from there.",
    observeStep: "2 / 7",
    observeTitle: "Observe quietly",
    observeCopy: "Take a few seconds before acting. Let the image come toward you first.",
    chooseInteractionStep: "3 / 7",
    chooseInteractionTitle: "Choose one interaction",
    chooseInteractionCopy: "Choose one way of looking, then try it gently.",
    interactStep: "4 / 7",
    interactTitle: "Try the gesture",
    interactCopy: "Touch, move, or slow down according to the chosen interaction. When it feels right, move toward a word.",
    chooseWordStep: "5 / 7",
    chooseWordTitle: "Choose one sensitive word",
    chooseWordCopy: "Choose the word that comes closest to your sensation.",
    finalStep: "6 / 7",
    finalTitle: "Generate a phrase",
    finalCopy: "Let the phrase guide your return to the painting.",
    returnStep: "7 / 7",
    returnTitle: "Silent return",
    returnCopy: "Return now to the artwork without touching the screen.",
    chooseWordAction: "Choose a word",
    chooseWordWait: "Stay a little longer",
    chooseWordWaitCopy: "The word often comes after a short experience.",
    finalAction: "Generate phrase",
    anotherWord: "Choose another word",
    continueLooking: "Keep looking",
    silentReturn: "Silent return",
    before: "Before",
    after: "After",
    tapToPlaceBefore: "Tap the image to place A",
    tapToPlaceAfter: "Tap the image to place B",
    summaryArtwork: "Artwork",
    summaryInteraction: "Interaction",
    summaryWord: "Word",
    summaryLanguage: "Language",
    summaryDuration: "Duration",
    summaryTouches: "Touches",
    summaryBeforeAfter: "Before / after",
    summaryPhase: "Step",
    none: "—",
    marked: "marked",
    notMarked: "open",
    readyHint: "When you are ready, choose a word.",
    phraseKicker: "Final phrase",
    backToInteractions: "Return to interactions",
    flowFinished: "You can stay with the work, or choose another gesture.",
    clearPath: "Clear path",
    clearTrace: "Clear trace",
    useLayers: "Touch the layers to vary the painting.",
    useVeil: "Glide across the image to shift the balance between veil and mass.",
    useSquare: "Move the square to change color relations.",
    usePath: "Tap several points in the order of your looking.",
    useSlow: "Keep your finger almost still to let the image reveal itself.",
    useTrace: "Draw a slow line across the image.",
    observationCountdown: "One more moment before the gesture",
  },
};

const ARTWORKS = [
  {
    id: "work-1",
    image: "./assets/oeuvre1.jpg",
    label: { fr: "Œuvre 1", de: "Werk 1", en: "Work 1" },
    title: {
      fr: "Voiles, appuis, masses",
      de: "Schleier, Stützen, Massen",
      en: "Veils, supports, masses",
    },
    words: {
      fr: ["voile", "poids", "appui", "tension", "seuil", "suspension"],
      de: ["Schleier", "Gewicht", "Stütze", "Spannung", "Schwelle", "Schweben"],
      en: ["veil", "weight", "support", "tension", "threshold", "suspension"],
    },
    layerLabels: {
      fr: ["vert", "jaune", "bleu", "masse"],
      de: ["Grün", "Gelb", "Blau", "Masse"],
      en: ["green", "yellow", "blue", "mass"],
    },
    interactions: [
      {
        id: "layers",
        label: { fr: "Calques", de: "Schichten", en: "Layers" },
        copy: {
          fr: "Activez ou retirez des couches colorées pour sentir la superposition.",
          de: "Schalten Sie farbige Schichten ein oder aus, um die Überlagerung zu spüren.",
          en: "Turn color layers on or off to feel the superposition.",
        },
        toolHint: { fr: "useLayers", de: "useLayers", en: "useLayers" },
      },
      {
        id: "veil",
        label: { fr: "Voile", de: "Schleier", en: "Veil" },
        copy: {
          fr: "Glissez de gauche à droite pour déplacer l’équilibre entre voile et masse.",
          de: "Streichen Sie von links nach rechts, um das Gleichgewicht zwischen Schleier und Masse zu verschieben.",
          en: "Glide left to right to shift the balance between veil and mass.",
        },
        toolHint: { fr: "useVeil", de: "useVeil", en: "useVeil" },
      },
    ],
  },
  {
    id: "work-2",
    image: "./assets/oeuvre2.jpg",
    label: { fr: "Œuvre 2", de: "Werk 2", en: "Work 2" },
    title: {
      fr: "Voisinages de couleur",
      de: "Farbnachbarschaften",
      en: "Color relations",
    },
    words: {
      fr: ["masse", "chaleur", "contraste", "bloc", "voisinage", "domination"],
      de: ["Masse", "Wärme", "Kontrast", "Block", "Umgebung", "Dominanz"],
      en: ["mass", "warmth", "contrast", "block", "neighboring", "dominance"],
    },
    interactions: [
      {
        id: "square",
        label: { fr: "Carré mobile", de: "Bewegtes Quadrat", en: "Movable square" },
        copy: {
          fr: "Déplacez le même carré de couleur pour sentir comment le voisinage transforme sa présence.",
          de: "Verschieben Sie dasselbe Farbquadrat, um zu spüren, wie die Umgebung seine Wirkung verändert.",
          en: "Move the same color square to feel how its surroundings transform it.",
        },
        toolHint: { fr: "useSquare", de: "useSquare", en: "useSquare" },
      },
      {
        id: "path",
        label: { fr: "Parcours", de: "Blickweg", en: "Path" },
        copy: {
          fr: "Touchez les points dans l’ordre où votre regard circule entre les masses.",
          de: "Berühren Sie Punkte in der Reihenfolge, in der Ihr Blick zwischen den Massen wandert.",
          en: "Tap points in the order your gaze moves between the masses.",
        },
        toolHint: { fr: "usePath", de: "usePath", en: "usePath" },
      },
    ],
  },
  {
    id: "work-3",
    image: "./assets/oeuvre3.jpg",
    label: { fr: "Œuvre 3", de: "Werk 3", en: "Work 3" },
    title: {
      fr: "Silence et apparition",
      de: "Stille und Erscheinung",
      en: "Silence and appearance",
    },
    words: {
      fr: ["trace", "souffle", "silence", "effacement", "fragilité", "apparition"],
      de: ["Spur", "Atem", "Stille", "Auslöschung", "Fragilität", "Erscheinen"],
      en: ["trace", "breath", "silence", "erasure", "fragility", "appearance"],
    },
    interactions: [
      {
        id: "slow",
        label: { fr: "Regard lent", de: "Langsames Schauen", en: "Slow looking" },
        copy: {
          fr: "Gardez le doigt presque immobile pour laisser l’image apparaître lentement.",
          de: "Halten Sie den Finger fast still, damit das Bild langsam erscheint.",
          en: "Keep your finger almost still to let the image appear slowly.",
        },
        toolHint: { fr: "useSlow", de: "useSlow", en: "useSlow" },
      },
      {
        id: "trace",
        label: { fr: "Trace", de: "Spur", en: "Trace" },
        copy: {
          fr: "Tracez une ligne douce pour suivre le souffle du geste.",
          de: "Ziehen Sie eine sanfte Linie, um der Spur der Geste zu folgen.",
          en: "Draw a soft line to follow the breath of the gesture.",
        },
        toolHint: { fr: "useTrace", de: "useTrace", en: "useTrace" },
      },
    ],
  },
];

let artworkImages = [];
let ui = {};

const state = {
  language: "fr",
  phase: "start",
  selectedArtwork: null,
  selectedInteraction: null,
  selectedWordIndex: null,
  finalPhrase: "",
  summaryOpen: false,
  pendingMark: null,
  beforePoint: null,
  afterPoint: null,
  taps: 0,
  sessionStart: Date.now(),
  observeStartedAt: 0,
  observeDuration: 4000,
  interactionStartedAt: 0,
  silentReturnStartedAt: 0,
  silentReturnDuration: 7000,
  interactionEvidence: false,
  uiDirty: true,
  layers: [true, true, true, true],
  veilBalance: 0.5,
  square: { x: 0.76, y: 0.3 },
  squareDragging: false,
  gazePath: [],
  tracePoints: [],
  stillness: 0,
  pointerDown: false,
  pointer: { x: 0, y: 0 },
  lastPointer: { x: 0, y: 0 },
};

function preload() {
  artworkImages = ARTWORKS.map((artwork) => loadImage(artwork.image));
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-shell");
  pixelDensity(1);
  textFont("Georgia");
  textAlign(LEFT, TOP);

  bindUi();
  renderUi();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  state.uiDirty = true;
}

function draw() {
  updateTimedFlow();
  updateStillnessModel();
  drawBackgroundField();

  if (state.phase === "start") {
    drawStartScreen();
  } else if (state.phase === "choose-artwork") {
    drawArtworkChoiceScreen();
  } else {
    drawArtworkView();
    drawBeforeAfterOverlay();
    drawPendingMarkerHint();
  }

  if (state.phase === "observe") {
    drawObservationOverlay();
  }

  if (state.phase === "silent-return") {
    drawSilentReturnOverlay();
  }

  if (frameCount % 8 === 0 || state.uiDirty) {
    renderUi();
    state.uiDirty = false;
  }
}

function bindUi() {
  ui.langButton = document.getElementById("lang-button");
  ui.summaryButton = document.getElementById("summary-button");
  ui.beforeButton = document.getElementById("before-button");
  ui.afterButton = document.getElementById("after-button");
  ui.summaryPanel = document.getElementById("summary-panel");
  ui.sheetStep = document.getElementById("sheet-step");
  ui.sheetTitle = document.getElementById("sheet-title");
  ui.sheetCopy = document.getElementById("sheet-copy");
  ui.controls = document.getElementById("controls");
  ui.modal = document.getElementById("modal");

  ui.langButton.addEventListener("click", cycleLanguage);
  ui.summaryButton.addEventListener("click", () => {
    state.summaryOpen = !state.summaryOpen;
    state.uiDirty = true;
  });
  ui.beforeButton.addEventListener("click", () => togglePendingMark("before"));
  ui.afterButton.addEventListener("click", () => togglePendingMark("after"));
  ui.controls.addEventListener("click", handleControlClick);
  ui.modal.addEventListener("click", handleControlClick);
}

function currentText() {
  return TEXT[state.language];
}

function currentArtwork() {
  if (state.selectedArtwork == null) return null;
  return ARTWORKS[state.selectedArtwork];
}

function currentInteraction() {
  const artwork = currentArtwork();
  if (!artwork || !state.selectedInteraction) return null;
  return artwork.interactions.find((interaction) => interaction.id === state.selectedInteraction) || null;
}

function currentSelectedWord() {
  const artwork = currentArtwork();
  if (!artwork || state.selectedWordIndex == null) return null;
  return artwork.words[state.language][state.selectedWordIndex] || null;
}

function cycleLanguage() {
  const order = ["fr", "de", "en"];
  const currentIndex = order.indexOf(state.language);
  state.language = order[(currentIndex + 1) % order.length];
  state.uiDirty = true;
}

function togglePendingMark(kind) {
  state.pendingMark = state.pendingMark === kind ? null : kind;
  state.uiDirty = true;
}

function handleControlClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  if (button.classList.contains("is-disabled")) return;

  switch (action) {
    case "start":
      state.phase = "choose-artwork";
      break;
    case "select-artwork":
      startArtworkFlow(Number(button.dataset.artwork));
      break;
    case "select-interaction":
      startInteractionFlow(button.dataset.interaction);
      break;
    case "advance-word":
      state.phase = "choose-word";
      break;
    case "select-word":
      state.selectedWordIndex = Number(button.dataset.wordIndex);
      break;
    case "generate-phrase":
      state.finalPhrase = buildFinalPhrase();
      state.phase = "final-phrase";
      break;
    case "close-phrase":
      state.phase = "choose-word";
      break;
    case "silent-return":
      state.phase = "silent-return";
      state.silentReturnStartedAt = millis();
      break;
    case "continue-looking":
      state.finalPhrase = "";
      state.phase = "choose-word";
      break;
    case "another-word":
      state.finalPhrase = "";
      state.phase = "choose-word";
      break;
    case "back-to-interactions":
      state.phase = "choose-interaction";
      state.selectedInteraction = null;
      state.selectedWordIndex = null;
      state.finalPhrase = "";
      resetInteractionState();
      break;
    case "toggle-layer":
      toggleLayer(Number(button.dataset.layer));
      break;
    case "clear-path":
      state.gazePath = [];
      state.interactionEvidence = true;
      break;
    case "clear-trace":
      state.tracePoints = [];
      break;
    default:
      break;
  }

  state.uiDirty = true;
}

function startArtworkFlow(index) {
  state.selectedArtwork = index;
  state.selectedInteraction = null;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.pendingMark = null;
  state.observeStartedAt = millis();
  state.phase = "observe";
  resetInteractionState();
}

function startInteractionFlow(interactionId) {
  state.selectedInteraction = interactionId;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.interactionStartedAt = millis();
  state.phase = "interact";
  resetInteractionState();
}

function resetInteractionState() {
  state.interactionEvidence = false;
  state.layers = [true, true, true, true];
  state.veilBalance = 0.5;
  state.square = { x: 0.76, y: 0.3 };
  state.squareDragging = false;
  state.gazePath = [];
  state.tracePoints = [];
  state.stillness = 0;
}

function updateTimedFlow() {
  if (state.phase === "observe" && millis() - state.observeStartedAt >= state.observeDuration) {
    state.phase = "choose-interaction";
    state.uiDirty = true;
  }

  if (state.phase === "silent-return" && millis() - state.silentReturnStartedAt >= state.silentReturnDuration) {
    state.phase = "choose-interaction";
    state.selectedInteraction = null;
    state.selectedWordIndex = null;
    state.finalPhrase = "";
    state.pendingMark = null;
    resetInteractionState();
    state.uiDirty = true;
  }
}

function updateStillnessModel() {
  if (state.phase !== "interact" || state.selectedInteraction !== "slow") {
    state.stillness = max(0, state.stillness - 0.01);
    return;
  }

  if (!state.pointerDown) {
    state.stillness = max(0, state.stillness - 0.004);
    return;
  }

  const dx = state.pointer.x - state.lastPointer.x;
  const dy = state.pointer.y - state.lastPointer.y;
  const movement = Math.sqrt(dx * dx + dy * dy);

  if (movement < 2) {
    state.stillness = min(1, state.stillness + 0.012);
    if (state.stillness > 0.22) state.interactionEvidence = true;
  } else {
    state.stillness = max(0, state.stillness - movement * 0.0025);
  }

  state.lastPointer.x = state.pointer.x;
  state.lastPointer.y = state.pointer.y;
}

function drawBackgroundField() {
  background(244, 240, 232);
  noStroke();

  for (let i = 0; i < 3; i += 1) {
    const alpha = 16 + i * 5;
    fill(255, 255, 255, alpha);
    ellipse(width * (0.2 + i * 0.28), height * 0.14, width * 0.42, width * 0.42);
  }
}

function drawStartScreen() {
  drawHeroTriptych(width * 0.12, height * 0.16, width * 0.76, min(height * 0.24, 220));

  fill(16, 16, 15);
  textAlign(LEFT, TOP);
  textSize(min(width * 0.11, 42));
  text(currentText().startTitle, width * 0.1, height * 0.5);

  fill(16, 16, 15, 170);
  textSize(min(width * 0.046, 18));
  textWrap(WORD);
  text(currentText().startCopy, width * 0.1, height * 0.59, width * 0.8);
}

function drawArtworkChoiceScreen() {
  drawHeroTriptych(width * 0.08, height * 0.14, width * 0.84, min(height * 0.35, 300));
}

function drawHeroTriptych(x, y, w, h) {
  const gap = 12;
  const thumbW = (w - gap * 2) / 3;

  for (let i = 0; i < ARTWORKS.length; i += 1) {
    const thumbX = x + i * (thumbW + gap);
    drawImageCover(artworkImages[i], thumbX, y, thumbW, h, 18);

    noFill();
    stroke(32, 32, 29, 36);
    strokeWeight(1);
    rect(thumbX, y, thumbW, h, 18);

    noStroke();
    fill(255, 250, 245, 226);
    rect(thumbX + 12, y + h - 42, 86, 28, 10);
    fill(32, 32, 29);
    textAlign(CENTER, CENTER);
    textSize(13);
    text(ARTWORKS[i].label[state.language], thumbX + 55, y + h - 28);
  }
}

function drawArtworkView() {
  const artwork = currentArtwork();
  if (!artwork) return;

  const rect = getArtworkRect();
  const image = artworkImages[state.selectedArtwork];

  if (state.selectedInteraction === "slow" && state.phase === "interact") {
    drawSlowLookingArtwork(image, rect);
  } else {
    drawImageContain(image, rect.x, rect.y, rect.w, rect.h);
  }

  if (state.selectedInteraction === "layers") {
    drawLayerInteraction(rect);
  }

  if (state.selectedInteraction === "veil") {
    drawVeilInteraction(rect);
  }

  if (state.selectedInteraction === "square") {
    drawSquareInteraction(rect);
  }

  if (state.selectedInteraction === "path") {
    drawPathInteraction(rect);
  }

  if (state.selectedInteraction === "trace") {
    drawTraceInteraction(rect);
  }
}

function drawObservationOverlay() {
  const remaining = max(0, state.observeDuration - (millis() - state.observeStartedAt));
  const progress = 1 - remaining / state.observeDuration;

  fill(250, 246, 240, 185);
  rect(18, height * 0.18, width - 36, 128, 24);

  fill(20, 20, 18);
  textAlign(CENTER, TOP);
  textSize(min(width * 0.07, 30));
  text(currentText().observeTitle, width / 2, height * 0.22);

  fill(20, 20, 18, 160);
  textSize(min(width * 0.038, 16));
  text(currentText().observeCopy, width * 0.12, height * 0.29, width * 0.76);

  noStroke();
  fill(255, 255, 255, 210);
  rect(width * 0.14, height * 0.35, width * 0.72, 8, 999);
  fill(107, 32, 48, 145);
  rect(width * 0.14, height * 0.35, width * 0.72 * progress, 8, 999);
}

function drawSilentReturnOverlay() {
  const remaining = max(0, state.silentReturnDuration - (millis() - state.silentReturnStartedAt));
  const seconds = max(1, Math.ceil(remaining / 1000));

  fill(250, 247, 241, 210);
  rect(22, height * 0.18, width - 44, 140, 24);

  fill(20, 20, 18);
  textAlign(CENTER, TOP);
  textSize(min(width * 0.072, 30));
  text(currentText().returnTitle, width / 2, height * 0.22);

  fill(20, 20, 18, 160);
  textSize(min(width * 0.04, 16));
  text(currentText().returnCopy, width * 0.12, height * 0.29, width * 0.76);

  textSize(14);
  text(`${seconds}s`, width / 2, height * 0.37);
}

function drawSlowLookingArtwork(image, rect) {
  const reveal = constrain(state.stillness, 0, 1);

  push();
  tint(255, map(reveal, 0, 1, 38, 255));
  drawImageContain(image, rect.x, rect.y, rect.w, rect.h);
  pop();

  noStroke();
  fill(250, 247, 241, map(reveal, 0, 1, 220, 0));
  rect(rect.x, rect.y, rect.w, rect.h, 18);

  fill(255, 255, 255, 230);
  rect(rect.x + 20, rect.y + 18, rect.w - 40, 10, 999);
  fill(107, 32, 48, 120);
  rect(rect.x + 20, rect.y + 18, (rect.w - 40) * reveal, 10, 999);
}

function drawLayerInteraction(rect) {
  const layers = [
    [49, 177, 118, 68, rect.x + rect.w * 0.21, rect.y + rect.h * 0.51, rect.w * 0.28, rect.h * 0.34],
    [215, 195, 115, 64, rect.x + rect.w * 0.54, rect.y + rect.h * 0.29, rect.w * 0.42, rect.h * 0.22],
    [140, 190, 185, 66, rect.x + rect.w * 0.77, rect.y + rect.h * 0.38, rect.w * 0.24, rect.h * 0.38],
    [85, 10, 35, 92, rect.x + rect.w * 0.44, rect.y + rect.h * 0.73, rect.w * 0.22, rect.h * 0.3],
  ];

  noStroke();
  for (let i = 0; i < layers.length; i += 1) {
    if (!state.layers[i]) continue;
    const [r, g, b, a, cx, cy, w, h] = layers[i];
    fill(r, g, b, a);
    ellipse(cx, cy, w, h);
  }
}

function drawVeilInteraction(rect) {
  const weight = state.veilBalance;
  const veil = 1 - weight;

  noStroke();
  fill(235, 225, 165, veil * 60);
  rect(rect.x, rect.y, rect.w, rect.h, 18);

  fill(170, 210, 205, veil * 48);
  ellipse(rect.x + rect.w * 0.72, rect.y + rect.h * 0.4, rect.w * 0.55, rect.h * 0.54);

  fill(70, 210, 130, veil * 44);
  ellipse(rect.x + rect.w * 0.18, rect.y + rect.h * 0.48, rect.w * 0.34, rect.h * 0.44);

  fill(85, 5, 30, weight * 140);
  ellipse(rect.x + rect.w * 0.43, rect.y + rect.h * 0.73, rect.w * 0.22, rect.h * 0.28);
}

function drawSquareInteraction(rect) {
  const point = denormalizeArtPoint(state.square, rect);

  push();
  rectMode(CENTER);
  noStroke();
  fill(0, 34);
  rect(point.x + 4, point.y + 6, 84, 84, 8);
  fill(135, 165, 190, 228);
  rect(point.x, point.y, 78, 78, 8);
  fill(135, 165, 190);
  rect(point.x, point.y, 48, 48, 6);
  noFill();
  stroke(255, 245);
  strokeWeight(4);
  rect(point.x, point.y, 86, 86, 8);
  pop();
}

function drawPathInteraction(rect) {
  if (state.gazePath.length < 1) return;

  noFill();
  stroke(107, 32, 48, 180);
  strokeWeight(3);
  beginShape();
  state.gazePath.forEach((point) => {
    const pixel = denormalizeArtPoint(point, rect);
    vertex(pixel.x, pixel.y);
  });
  endShape();

  state.gazePath.forEach((point, index) => {
    const pixel = denormalizeArtPoint(point, rect);
    noStroke();
    fill(107, 32, 48, 215);
    circle(pixel.x, pixel.y, 24);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(String(index + 1), pixel.x, pixel.y + 1);
  });
}

function drawTraceInteraction(rect) {
  if (state.tracePoints.length < 2) return;

  noFill();
  stroke(60, 112, 95, 115);
  strokeWeight(2);
  beginShape();
  state.tracePoints.forEach((point) => {
    const pixel = denormalizeArtPoint(point, rect);
    curveVertex(pixel.x, pixel.y);
  });
  endShape();
}

function drawBeforeAfterOverlay() {
  const rect = getArtworkRect();

  if (state.beforePoint && state.afterPoint) {
    const beforePixel = denormalizeArtPoint(state.beforePoint, rect);
    const afterPixel = denormalizeArtPoint(state.afterPoint, rect);
    stroke(107, 32, 48, 160);
    strokeWeight(2);
    line(beforePixel.x, beforePixel.y, afterPixel.x, afterPixel.y);
  }

  if (state.beforePoint) {
    drawMarker(state.beforePoint, rect, "A", color(20, 20, 18));
  }

  if (state.afterPoint) {
    drawMarker(state.afterPoint, rect, "B", color(107, 32, 48));
  }
}

function drawMarker(point, rect, label, strokeColor) {
  const pixel = denormalizeArtPoint(point, rect);
  stroke(strokeColor);
  strokeWeight(2);
  fill(255, 246, 242, 235);
  circle(pixel.x, pixel.y, 32);
  noStroke();
  fill(strokeColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, pixel.x, pixel.y + 1);
}

function drawPendingMarkerHint() {
  if (!state.pendingMark) return;

  noStroke();
  fill(255, 251, 245, 230);
  rect(width * 0.18, height * 0.12, width * 0.64, 44, 16);

  fill(20, 20, 18, 180);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(
    state.pendingMark === "before" ? currentText().tapToPlaceBefore : currentText().tapToPlaceAfter,
    width / 2,
    height * 0.12 + 22,
  );
}

function renderUi() {
  ui.langButton.textContent = state.language.toUpperCase();
  ui.summaryButton.textContent = currentText().session;
  ui.beforeButton.textContent = "A";
  ui.afterButton.textContent = "B";
  ui.beforeButton.classList.toggle("is-active", state.pendingMark === "before");
  ui.afterButton.classList.toggle("is-active", state.pendingMark === "after");

  renderSummaryPanel();
  renderSheet();
  renderModal();
}

function renderSummaryPanel() {
  ui.summaryPanel.classList.toggle("is-hidden", !state.summaryOpen);
  if (!state.summaryOpen) return;

  const artwork = currentArtwork();
  const interaction = currentInteraction();

  ui.summaryPanel.innerHTML = `
    <div class="summary-grid">
      ${renderSummaryRow(currentText().summaryArtwork, artwork ? artwork.label[state.language] : currentText().none)}
      ${renderSummaryRow(currentText().summaryInteraction, interaction ? interaction.label[state.language] : currentText().none)}
      ${renderSummaryRow(currentText().summaryWord, currentSelectedWord() || currentText().none)}
      ${renderSummaryRow(currentText().summaryLanguage, state.language.toUpperCase())}
      ${renderSummaryRow(currentText().summaryDuration, formatDuration())}
      ${renderSummaryRow(currentText().summaryTouches, String(state.taps))}
      ${renderSummaryRow(
        currentText().summaryBeforeAfter,
        `${state.beforePoint ? currentText().marked : currentText().notMarked} / ${state.afterPoint ? currentText().marked : currentText().notMarked}`,
      )}
      ${renderSummaryRow(currentText().summaryPhase, currentPhaseLabel())}
    </div>
  `;
}

function renderSummaryRow(label, value) {
  return `
    <div class="summary-row">
      <span class="summary-label">${label}</span>
      <span class="summary-value">${value}</span>
    </div>
  `;
}

function renderSheet() {
  const copy = sheetContent();
  ui.sheetStep.textContent = copy.step;
  ui.sheetTitle.textContent = copy.title;
  ui.sheetCopy.textContent = copy.copy;
  ui.controls.innerHTML = controlsMarkup();
}

function renderModal() {
  if (state.phase !== "final-phrase") {
    ui.modal.classList.add("is-hidden");
    ui.modal.innerHTML = "";
    return;
  }

  ui.modal.classList.remove("is-hidden");
  ui.modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-kicker">${currentText().phraseKicker}</div>
      <h2 class="modal-title">${currentText().finalTitle}</h2>
      <p class="modal-copy">${state.finalPhrase}</p>
      <div class="modal-actions">
        <button class="action-button is-primary" type="button" data-action="silent-return">
          <strong>${currentText().silentReturn}</strong>
          <span>${currentText().returnCopy}</span>
        </button>
        <button class="action-button" type="button" data-action="continue-looking">
          <strong>${currentText().continueLooking}</strong>
          <span>${currentText().flowFinished}</span>
        </button>
        <button class="action-button" type="button" data-action="another-word">
          <strong>${currentText().anotherWord}</strong>
          <span>${currentText().chooseWordCopy}</span>
        </button>
      </div>
    </div>
  `;
}

function sheetContent() {
  const artwork = currentArtwork();
  const interaction = currentInteraction();

  if (state.phase === "start") {
    return {
      step: currentText().startStep,
      title: currentText().startTitle,
      copy: currentText().startCopy,
    };
  }

  if (state.phase === "choose-artwork") {
    return {
      step: currentText().chooseArtworkStep,
      title: currentText().chooseArtworkTitle,
      copy: currentText().chooseArtworkCopy,
    };
  }

  if (state.phase === "observe") {
    return {
      step: currentText().observeStep,
      title: artwork ? artwork.label[state.language] : currentText().observeTitle,
      copy: currentText().observeCopy,
    };
  }

  if (state.phase === "choose-interaction") {
    return {
      step: currentText().chooseInteractionStep,
      title: artwork ? artwork.title[state.language] : currentText().chooseInteractionTitle,
      copy: currentText().chooseInteractionCopy,
    };
  }

  if (state.phase === "interact") {
    return {
      step: currentText().interactStep,
      title: interaction ? interaction.label[state.language] : currentText().interactTitle,
      copy: interaction ? interaction.copy[state.language] : currentText().interactCopy,
    };
  }

  if (state.phase === "choose-word" || state.phase === "final-phrase") {
    return {
      step: currentText().chooseWordStep,
      title: currentText().chooseWordTitle,
      copy: currentText().chooseWordCopy,
    };
  }

  return {
    step: currentText().returnStep,
    title: currentText().returnTitle,
    copy: currentText().returnCopy,
  };
}

function controlsMarkup() {
  if (state.phase === "start") {
    return `
      <div class="button-row">
        <button class="action-button is-primary" type="button" data-action="start">
          <strong>${currentText().startAction}</strong>
          <span>${currentText().chooseArtworkCopy}</span>
        </button>
      </div>
    `;
  }

  if (state.phase === "choose-artwork") {
    return `
      <div class="button-row">
        ${ARTWORKS.map(
          (artwork, index) => `
            <button class="action-button is-primary" type="button" data-action="select-artwork" data-artwork="${index}">
              <strong>${artwork.label[state.language]}</strong>
              <span>${artwork.title[state.language]}</span>
            </button>
          `,
        ).join("")}
      </div>
    `;
  }

  if (state.phase === "observe") {
    const seconds = max(1, Math.ceil((state.observeDuration - (millis() - state.observeStartedAt)) / 1000));
    return `<div class="mini-note">${currentText().observationCountdown} · ${seconds}s</div>`;
  }

  if (state.phase === "choose-interaction") {
    const artwork = currentArtwork();
    return `
      <div class="button-row">
        ${artwork.interactions
          .map(
            (interaction) => `
              <button class="action-button is-primary" type="button" data-action="select-interaction" data-interaction="${interaction.id}">
                <strong>${interaction.label[state.language]}</strong>
                <span>${interaction.copy[state.language]}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (state.phase === "interact") {
    const readyForWord = state.interactionEvidence || millis() - state.interactionStartedAt > 5000;
    return `
      ${interactionToolsMarkup()}
      <div class="button-row">
        <button class="action-button is-primary ${readyForWord ? "" : "is-disabled"}" type="button" data-action="advance-word">
          <strong>${readyForWord ? currentText().chooseWordAction : currentText().chooseWordWait}</strong>
          <span>${readyForWord ? currentText().readyHint : currentText().chooseWordWaitCopy}</span>
        </button>
      </div>
    `;
  }

  if (state.phase === "choose-word" || state.phase === "final-phrase") {
    const words = currentArtwork().words[state.language];
    return `
      <div class="word-grid">
        ${words
          .map(
            (word, index) => `
              <button class="word-button ${state.selectedWordIndex === index ? "is-active" : ""}" type="button" data-action="select-word" data-word-index="${index}">
                <strong>${word}</strong>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="button-row">
        <button class="action-button is-primary ${state.selectedWordIndex != null ? "" : "is-disabled"}" type="button" data-action="generate-phrase">
          <strong>${currentText().finalAction}</strong>
          <span>${currentText().finalCopy}</span>
        </button>
        <button class="action-button" type="button" data-action="back-to-interactions">
          <strong>${currentText().backToInteractions}</strong>
          <span>${currentText().flowFinished}</span>
        </button>
      </div>
    `;
  }

  return `<div class="mini-note">${currentText().returnCopy}</div>`;
}

function interactionToolsMarkup() {
  const interaction = currentInteraction();
  const artwork = currentArtwork();
  if (!interaction) return "";

  if (interaction.id === "layers") {
    return `
      <div class="mini-tools">
        ${artwork.layerLabels[state.language]
          .map(
            (label, index) => `
              <button class="toggle-button ${state.layers[index] ? "is-active" : ""}" type="button" data-action="toggle-layer" data-layer="${index}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="mini-note">${currentText().useLayers}</div>
    `;
  }

  if (interaction.id === "path") {
    return `
      <div class="mini-tools">
        <button class="toggle-button" type="button" data-action="clear-path">${currentText().clearPath}</button>
      </div>
      <div class="mini-note">${currentText().usePath}</div>
    `;
  }

  if (interaction.id === "trace") {
    return `
      <div class="mini-tools">
        <button class="toggle-button" type="button" data-action="clear-trace">${currentText().clearTrace}</button>
      </div>
      <div class="mini-note">${currentText().useTrace}</div>
    `;
  }

  if (interaction.id === "veil") {
    return `<div class="mini-note">${currentText().useVeil}</div>`;
  }

  if (interaction.id === "square") {
    return `<div class="mini-note">${currentText().useSquare}</div>`;
  }

  if (interaction.id === "slow") {
    return `<div class="mini-note">${currentText().useSlow}</div>`;
  }

  return "";
}

function buildFinalPhrase() {
  const artwork = currentArtwork();
  const word = currentSelectedWord();

  if (!artwork || !word) return "";

  if (state.language === "fr") {
    if (artwork.id === "work-1") return `Vous avez choisi « ${word} ». Revenez à la peinture: où ce mot circule-t-il entre les voiles pâles et la masse sombre ?`;
    if (artwork.id === "work-2") return `Vous avez choisi « ${word} ». Regardez encore: quelle relation de couleur fait naître cette sensation le plus nettement ?`;
    return `Vous avez choisi « ${word} ». Regardez sans toucher: où ce mot apparaît-il le plus discrètement dans l’image ?`;
  }

  if (state.language === "de") {
    if (artwork.id === "work-1") return `Sie haben « ${word} » gewählt. Kehren Sie zum Bild zurück: Wo wandert dieses Wort zwischen den hellen Schleiern und der dunklen Masse?`;
    if (artwork.id === "work-2") return `Sie haben « ${word} » gewählt. Schauen Sie weiter: Welche Farbbeziehung ruft dieses Gefühl am deutlichsten hervor?`;
    return `Sie haben « ${word} » gewählt. Schauen Sie ohne Berührung: Wo erscheint dieses Wort am leisesten im Bild?`;
  }

  if (artwork.id === "work-1") return `You chose “${word}”. Return to the painting: where does this word travel between the pale veils and the darker mass?`;
  if (artwork.id === "work-2") return `You chose “${word}”. Look again: which color relation brings this sensation forward most clearly?`;
  return `You chose “${word}”. Look without touching: where does this word appear most quietly in the image?`;
}

function currentPhaseLabel() {
  const map = {
    start: currentText().startStep,
    "choose-artwork": currentText().chooseArtworkStep,
    observe: currentText().observeStep,
    "choose-interaction": currentText().chooseInteractionStep,
    interact: currentText().interactStep,
    "choose-word": currentText().chooseWordStep,
    "final-phrase": currentText().finalStep,
    "silent-return": currentText().returnStep,
  };

  return map[state.phase] || currentText().none;
}

function formatDuration() {
  const elapsedMs = Date.now() - state.sessionStart;
  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getArtworkRect() {
  const top = min(height * 0.12, 98);
  const bottom = min(height * 0.36, 250);
  const side = min(width * 0.06, 28);
  const availableW = width - side * 2;
  const availableH = height - top - bottom;
  const image = artworkImages[state.selectedArtwork || 0];
  const ratio = image.width / image.height;

  let w = availableW;
  let h = w / ratio;

  if (h > availableH) {
    h = availableH;
    w = h * ratio;
  }

  return {
    x: (width - w) / 2,
    y: top + (availableH - h) / 2,
    w,
    h,
  };
}

function drawImageContain(img, x, y, w, h) {
  imageMode(CORNER);
  image(img, x, y, w, h);
}

function drawImageCover(img, x, y, w, h, radius) {
  push();
  drawingContext.save();
  roundedClip(x, y, w, h, radius);

  const scale = max(w / img.width, h / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const drawX = x + (w - drawW) / 2;
  const drawY = y + (h - drawH) / 2;

  image(img, drawX, drawY, drawW, drawH);
  drawingContext.restore();
  pop();
}

function roundedClip(x, y, w, h, radius) {
  drawingContext.beginPath();
  drawingContext.moveTo(x + radius, y);
  drawingContext.arcTo(x + w, y, x + w, y + h, radius);
  drawingContext.arcTo(x + w, y + h, x, y + h, radius);
  drawingContext.arcTo(x, y + h, x, y, radius);
  drawingContext.arcTo(x, y, x + w, y, radius);
  drawingContext.closePath();
  drawingContext.clip();
}

function normalizeArtPoint(x, y) {
  const rect = getArtworkRect();
  if (x < rect.x || x > rect.x + rect.w || y < rect.y || y > rect.y + rect.h) return null;
  return {
    x: (x - rect.x) / rect.w,
    y: (y - rect.y) / rect.h,
  };
}

function denormalizeArtPoint(point, rect = getArtworkRect()) {
  return {
    x: rect.x + point.x * rect.w,
    y: rect.y + point.y * rect.h,
  };
}

function toggleLayer(index) {
  state.layers[index] = !state.layers[index];
  state.interactionEvidence = true;
}

function handleCanvasPress(px, py) {
  state.pointerDown = true;
  state.pointer.x = px;
  state.pointer.y = py;
  state.lastPointer.x = px;
  state.lastPointer.y = py;
  state.squareDragging = false;

  if (state.phase === "observe" || state.phase === "silent-return" || state.phase === "start" || state.phase === "choose-artwork") return;

  const point = normalizeArtPoint(px, py);
  if (!point) return;

  state.taps += 1;

  if (state.pendingMark) {
    if (state.pendingMark === "before") state.beforePoint = point;
    if (state.pendingMark === "after") state.afterPoint = point;
    state.pendingMark = null;
    state.uiDirty = true;
    return;
  }

  if (state.phase !== "interact") return;

  const interaction = currentInteraction();
  if (!interaction) return;

  if (interaction.id === "path") {
    state.gazePath.push(point);
    state.interactionEvidence = true;
  }

  if (interaction.id === "trace") {
    state.tracePoints.push(point);
    state.interactionEvidence = true;
  }

  if (interaction.id === "square") {
    const rect = getArtworkRect();
    const chip = denormalizeArtPoint(state.square, rect);
    if (dist(px, py, chip.x, chip.y) < 56) {
      state.squareDragging = true;
    }
    state.interactionEvidence = true;
  }

  if (interaction.id === "veil") {
    state.veilBalance = constrain((px - getArtworkRect().x) / getArtworkRect().w, 0, 1);
    state.interactionEvidence = true;
  }

  if (interaction.id === "slow") {
    state.interactionEvidence = true;
  }
}

function handleCanvasDrag(px, py) {
  state.pointer.x = px;
  state.pointer.y = py;

  if (state.phase !== "interact") return;

  const point = normalizeArtPoint(px, py);
  if (!point) return;

  const interaction = currentInteraction();
  if (!interaction) return;

  if (interaction.id === "veil") {
    state.veilBalance = constrain(point.x, 0, 1);
    state.interactionEvidence = true;
  }

  if (interaction.id === "square" && state.squareDragging) {
    state.square = {
      x: constrain(point.x, 0.08, 0.92),
      y: constrain(point.y, 0.08, 0.92),
    };
    state.interactionEvidence = true;
  }

  if (interaction.id === "trace") {
    const last = state.tracePoints[state.tracePoints.length - 1];
    if (!last || dist(last.x, last.y, point.x, point.y) > 0.01) {
      state.tracePoints.push(point);
    }
    state.interactionEvidence = true;
  }
}

function handleCanvasRelease() {
  state.pointerDown = false;
  state.squareDragging = false;
}

function touchStarted() {
  if (touches.length > 0) {
    handleCanvasPress(touches[0].x, touches[0].y);
  }
  return false;
}

function touchMoved() {
  if (touches.length > 0) {
    handleCanvasDrag(touches[0].x, touches[0].y);
  }
  return false;
}

function touchEnded() {
  handleCanvasRelease();
  return false;
}

function mousePressed() {
  handleCanvasPress(mouseX, mouseY);
}

function mouseDragged() {
  handleCanvasDrag(mouseX, mouseY);
}

function mouseReleased() {
  handleCanvasRelease();
}
