/*
 * Barbara Muller Mediation — mobile museum-facing web prototype
 *
 * The web experience keeps the Processing version untouched and focuses on a
 * calm, phone-first visitor flow:
 * arrival → choose artwork → observe → gesture → word → phrase → return.
 */

const STAGE_COUNT = 7;
const DEFAULT_SQUARE = { x: 0.76, y: 0.3 };
const GUIDED_PATH = [2, 0, 1];
const GUIDED_INTRO = {
  fr: [
    {
      title: "Ralentir",
      copy: "Ici, l’abstraction ne se déchiffre pas d’un coup. Elle vient d’abord par le temps.",
      hint: "Regardez avant de chercher à comprendre.",
    },
    {
      title: "Faire un geste",
      copy: "Le geste ne sert pas à contrôler l’œuvre. Il déplace légèrement votre manière de la voir.",
      hint: "Touchez peu. Laissez ensuite le regard poursuivre.",
    },
    {
      title: "Laisser venir l’attention",
      copy: "Une trace, une réserve ou un voisinage de couleur peuvent se préciser si vous leur donnez un peu d’attente.",
      hint: "Le parcours commence par l’œuvre 3.",
    },
  ],
  de: [
    {
      title: "Langsamer werden",
      copy: "Abstraktion muss hier nicht sofort entschlüsselt werden. Sie kommt zuerst über die Zeit.",
      hint: "Schauen Sie, bevor Sie verstehen wollen.",
    },
    {
      title: "Eine Geste machen",
      copy: "Die Geste soll das Werk nicht beherrschen. Sie verschiebt nur leicht die Art, wie Sie es sehen.",
      hint: "Berühren Sie wenig. Lassen Sie dann den Blick weitergehen.",
    },
    {
      title: "Aufmerksamkeit kommen lassen",
      copy: "Eine Spur, eine Reserve oder eine Farbnachbarschaft kann deutlicher werden, wenn Sie ihr etwas Zeit geben.",
      hint: "Der Parcours beginnt mit Werk 3.",
    },
  ],
  en: [
    {
      title: "Slow down",
      copy: "Here, abstraction does not need to be decoded at once. It comes first through time.",
      hint: "Look before trying to explain.",
    },
    {
      title: "Make one gesture",
      copy: "The gesture is not there to control the work. It only shifts the way you see it, a little.",
      hint: "Touch lightly. Then let the eye continue.",
    },
    {
      title: "Let attention gather",
      copy: "A trace, a reserve, or a color neighborhood can become clearer if you give it a little waiting.",
      hint: "The path begins with artwork 3.",
    },
  ],
};

const TEXT = {
  fr: {
    session: "Session",
    skipLink: "Aller à la guidance",
    topbarAria: "Commandes visiteur",
    experienceAria: "Expérience de médiation muséale",
    testSummaryButton: "Note locale",
    sessionAria: "Ouvrir ou fermer le résumé de séance",
    testSummaryAria: "Ouvrir la note locale de médiation",
    languageAria: "Changer la langue",
    markLookingAction: "Marquer le regard",
    markLookingAria: "Ouvrir ou fermer le marquage du regard",
    beforeAria: "Placer A, le premier point du regard",
    afterAria: "Placer B, le point où le regard revient",
    progressLabel: "Parcours",
    startStep: "1 / 7 · Arrivée",
    chooseArtworkStep: "2 / 7 · Œuvre",
    observeStep: "3 / 7 · Observation",
    interactStep: "4 / 7 · Geste",
    chooseWordStep: "5 / 7 · Mot",
    finalStep: "6 / 7 · Phrase",
    returnStep: "7 / 7 · Retour",
    startTitle: "Regarder autrement",
    startCopy:
      "Trois peintures, un léger déplacement du regard. Choisissez une œuvre, laissez-la agir, faites un geste, puis nommez ce qui reste.",
    startHint: "Choisissez une entrée.",
    startAction: "Entrer dans l’expérience",
    guidedStartAction: "Parcours guidé",
    guidedStartCopy: "Suivre l’ordre proposé : 3 → 1 → 2.",
    freeStartAction: "Explorer librement",
    freeStartCopy: "Choisir directement une œuvre.",
    guidedIntroStep: "Préambule guidé",
    guidedModeLabel: "Parcours guidé",
    freeModeLabel: "Exploration libre",
    introContinueAction: "Continuer",
    introContinueCopy: "Avancer d’un pas.",
    beginGuidedPathAction: "Commencer le parcours",
    beginGuidedPathCopy: "Entrer d’abord dans l’œuvre 3.",
    leaveGuidedPathAction: "Quitter le parcours guidé",
    leaveGuidedPathCopy: "Passer à l’exploration libre.",
    continueNextArtworkAction: "Continuer vers l’œuvre suivante",
    continueNextArtworkCopy: "Passer doucement à l’œuvre suivante.",
    guidedTransitionTitle: "Restez encore un instant avec l’œuvre",
    guidedTransitionHint: "Quand le regard s’est reposé, poursuivez ou arrêtez ici.",
    guidedSynthesisTitle: "Laissez le parcours retomber",
    guidedSynthesisCopy: "Gardez encore un instant leurs écarts et leurs retours.",
    guidedSynthesisHint: "Ne revenez que si vous voulez prolonger.",
    guidedExploreAfterAction: "Choisir une autre œuvre",
    guidedExploreAfterCopy: "Revenir à un parcours libre entre les œuvres.",
    chooseArtworkTitle: "Choisissez une œuvre",
    chooseArtworkCopy:
      "Prenez l’œuvre qui vous retient d’abord.",
    chooseArtworkHint: "Une autre pourra venir ensuite.",
    observeTitle: "Regardez en silence",
    observeCopy:
      "Donnez d’abord quelques secondes à l’œuvre. Le regard trouve souvent son rythme avant la main.",
    observeHint: "Laissez l’œuvre venir avant le geste.",
    observeTransition: "Le geste s’ouvrira ensuite.",
    chooseInteractionTitle: "Choisissez un seul geste",
    chooseInteractionCopy:
      "Approchez l’œuvre par un seul geste, simple et lent.",
    chooseInteractionHint: "Touchez peu. Regardez beaucoup.",
    interactReadyHint: "Quand une relation devient plus nette, passez au mot.",
    chooseWordTitle: "Nommez ce qui reste",
    chooseWordCopy:
      "Quel mot reste après le geste ?",
    chooseWordHint: "Prenez le plus juste, pas le plus savant.",
    finalTitle: "Laissez venir une phrase",
    finalCopy: "Une phrase brève peut reconduire le regard vers la peinture.",
    finalHint: "Puis laissez l’écran se retirer.",
    returnTitle: "Retour à l’œuvre",
    returnCopy:
      "Baissez le téléphone. Regardez encore la peinture.",
    returnHint: "Laissez l’écran se retirer quelques secondes.",
    afterReturnTitle: "Gardez encore l’œuvre devant vous",
    afterReturnCopy:
      "Restez encore un instant avec elle. Revenez seulement si vous voulez poursuivre.",
    afterReturnHint: "La note locale reste en retrait.",
    chooseWordAction: "Choisir un mot",
    chooseWordActionAria: "Choisir un mot pour passer à l’étape suivante",
    chooseWordDisabledHint: "Continue encore un peu. Le mot viendra quand la relation sera plus nette.",
    chooseWordReadyCopy: "Nomme maintenant ce qui reste.",
    chooseWordWait: "Attendre encore",
    chooseWordWaitCopy: "Laissez encore la relation se former.",
    finalAction: "Générer la phrase",
    returnToArtworkAction: "Retourner à l’œuvre",
    returnToArtworkCopy: "Revenez d’abord à la peinture.",
    chooseAnotherWordAction: "Choisir un autre mot",
    chooseAnotherWordCopy: "Revenir si un autre mot insiste.",
    chooseAnotherGestureAction: "Choisir un autre geste",
    chooseAnotherGestureCopy: "Essayer une autre approche de cette œuvre.",
    chooseAnotherArtworkAction: "Choisir une autre œuvre",
    chooseAnotherArtworkCopy: "Prolonger le regard avec une autre œuvre.",
    restartAction: "Recommencer l’expérience",
    restartCopy: "Reprendre depuis le début.",
    before: "Avant",
    after: "Après",
    beforeMeaning: "A = premier endroit qui retient votre regard",
    afterMeaning: "B = endroit où votre regard revient après le geste",
    gazeTitle: "Marquer le regard",
    gazeCopy:
      "Optionnel. Ce n’est pas un suivi du regard.",
    gazeInlineCopy: "Optionnel · A avant, B après.",
    gazeStepA:
      "Avant le geste, touche la zone qui attire d’abord ton regard.",
    gazeStepB:
      "Après le geste, touche la zone vers laquelle ton regard revient.",
    gazePlaceAAction: "Placer A",
    gazePlaceBAction: "Placer B",
    gazeCloseAction: "Fermer",
    gazeRestartAction: "Recommencer A/B",
    gazeNotMarked: "non marqué",
    gazeStatusBoth: "A et B marqués",
    gazeStatusBeforeOnly: "A marqué",
    gazeStatusAfterOnly: "B marqué",
    gazeInterpretationShift:
      "Le geste a déplacé ton attention d’une zone à une autre.",
    gazeInterpretationReturn:
      "Ton regard est revenu près de son premier point.",
    tapToPlaceBefore: "Touchez l’image pour placer A",
    tapToPlaceAfter: "Touchez l’image pour placer B",
    summaryArtwork: "Œuvre",
    summarySessionId: "Session",
    summaryInteraction: "Geste",
    summaryInteractionCompleted: "Geste accompli",
    summaryInteractionDuration: "Temps du geste",
    summaryRegionsCrossed: "Zones de couleur",
    summaryHighestStillness: "Pic d’immobilité",
    summaryWord: "Mot",
    summaryLanguage: "Langue",
    summaryDuration: "Durée",
    summaryTouches: "Touches",
    summaryGuidedMode: "Mode guidé",
    summaryPathStep: "Étape du parcours",
    summaryVisitedArtworks: "Œuvres visitées",
    summaryCompletedArtworks: "Œuvres terminées",
    summaryGaze: "Repère A/B",
    summaryPoints: "Points A/B",
    summaryPointA: "Point A",
    summaryPointB: "Point B",
    summaryShift: "Déplacement",
    summaryPhase: "Étape",
    summaryReturned: "Retour accompli",
    summaryRestarted: "Reprise",
    summaryAnotherArtwork: "Nouvelle œuvre",
    summaryFinalPhrase: "Phrase de retour",
    summaryGuidedSynthesis: "Synthèse du parcours",
    summaryInterpretation: "Lecture brève",
    summaryNote:
      "A et B sont des repères volontaires d’attention, jamais des données de suivi du regard.",
    summaryModeKicker: "Hors parcours visiteur",
    summaryReadyTitle: "Note locale de médiation",
    summaryReadyCopy:
      "Repère local pour documenter un essai de visite. Visible ici seulement, sans donnée personnelle.",
    closeSummaryAction: "Fermer",
    copySummaryAction: "Copier le résumé test",
    copySummaryCopy: "Copier une note texte de ce parcours.",
    downloadJsonAction: "Télécharger JSON",
    downloadJsonCopy: "Télécharger les données locales de ce parcours.",
    openSummaryAction: "Ouvrir la note locale",
    openSummaryCopy: "Afficher la note de documentation locale.",
    copiedNotice: "Résumé copié dans le presse-papiers.",
    downloadedNotice: "JSON téléchargé localement.",
    copyFailedNotice: "Copie impossible sur cet appareil.",
    privacyNote:
      "Ce prototype stocke les données uniquement localement dans cette session du navigateur. Aucun nom, e-mail, IP ou donnée personnelle n’est collecté.",
    none: "—",
    marked: "placé",
    open: "à placer",
    yes: "oui",
    no: "non",
    shiftMissing: "non mesuré",
    shiftSoft: "léger",
    shiftClear: "net",
    shiftStrong: "marqué",
    observationCountdown: "Laisser venir l’œuvre",
    returnCountdown: "Laisser revenir le regard",
    tryThisLabel: "Essaie ceci",
    interactionProgressLabel: "Progression",
    interactionObserveLabel: "Laisser agir",
    interactionCompletedLabel: "Prêt",
    interactionKeepGoing: "Continue lentement. Le changement vient avec le geste.",
    layersKeepGoing: "Reste encore là où la réserve pâle s’éclaircit face à la masse.",
    veilKeepGoing: "Glisse encore pour sentir le voile céder sans faire disparaître la masse.",
    squareKeepGoingOne: "Traverse encore un voisinage.",
    squareKeepGoingMany: "Traverse encore {count} voisinages.",
    squareComparePromptStart: "Pose le carré une première fois, puis ailleurs.",
    squareComparePromptSecond: "Garde cette première pose, puis cherche un autre voisinage.",
    squareComparePromptObserve: "Compare les deux poses : le carré reste fixe, le voisinage agit.",
    pathKeepGoing: "Pose encore un ou deux arrêts du regard.",
    slowKeepGoing: "Reste encore un instant immobile.",
    traceKeepGoing: "Suis encore un peu. La trace se précise.",
    useLayers:
      "Touchez là où la réserve pâle s’ouvre et où la masse plus dense retient encore le regard.",
    useVeil:
      "Glissez lentement. Le voile se déplace, la masse garde son contrepoids.",
    useSquare:
      "Le carré reste fixe. Déplace-le pour sentir son voisinage agir.",
    sameColourNotice: "Le carré garde exactement la même couleur ; seul le champ autour en déplace la perception.",
    squareConstancy: "Même couleur. Autre voisinage.",
    sameColourTag: "couleur fixe",
    squareFixedCue: "Carré : couleur fixe",
    squareSurroundingCue: "Autour : change",
    squareRegionChanged: "Le voisinage a changé.",
    squarePlacementOne: "Pose 1",
    squarePlacementTwo: "Pose 2",
    usePath: "Posez quelques haltes du regard entre les blocs et les densités.",
    useSlow:
      "L’attente fait venir les traces. Bouger trop vite les éloigne à nouveau.",
    waitingIsAction: "Reste immobile quelques secondes.",
    slowSettling: "Pose le doigt. Laisse l’image revenir.",
    slowTraceComing: "Reste encore. Une trace commence à venir.",
    slowTracePresent: "Encore un peu. La trace devient plus présente.",
    slowTooFast: "Trop vite: la trace se retire.",
    slowReturnTouch: "Relâche, puis reviens si tu veux reprendre l’attente.",
    useTrace: "Suis une marque presque effacée jusqu’à ce qu’elle prenne un peu de présence.",
    traceSettling: "Pose le geste sur une trace presque effacée.",
    traceFollowing: "Suis-la encore un peu. Elle se précise.",
    traceEmerging: "Encore un peu. La trace prend corps.",
    traceReturnTouch: "Relâche, puis reprends si tu veux refaire le trajet.",
    completeLayers: "La réserve s’est un peu ouverte, la masse a tenu. Choisissez un mot.",
    completeVeil: "Le voile a cédé, la masse a gardé son poids. Choisissez un mot.",
    completeSquare: "Le carré est resté fixe ; c’est le voisinage qui a changé. Choisissez un mot.",
    completePath: "Le parcours du regard s’est dessiné. Choisissez un mot.",
    completeSlow: "Les traces ont répondu à l’attente. Choisissez un mot.",
    completeTrace: "La trace s’est éclaircie sous votre geste. Choisissez un mot.",
    clearPath: "Effacer le parcours",
    clearTrace: "Effacer la trace",
    squareHint: "Faire glisser le carré",
    layersCanvasHint: "Touchez entre réserve pâle et masse",
    veilCanvasHint: "Glissez entre voile et masse",
    slowCanvasHint: "Posez le doigt. Restez.",
    traceCanvasHint: "Suivez ici",
    stillnessMeter: "Tenue du regard",
    stillnessLow: "diffus",
    stillnessHigh: "présent",
    slowWaitPole: "attente",
    slowTracePole: "trace",
    traceFaintPole: "effacement",
    traceVisiblePole: "trace",
    regionLight: "clair",
    regionWarm: "chaud",
    regionCool: "frais",
    regionDeep: "dense",
    regionField: "champ",
    reserveSide: "réserve",
    veilSide: "voile",
    massSide: "masse",
  },
  de: {
    session: "Sitzung",
    skipLink: "Zur Begleitung springen",
    topbarAria: "Besuchersteuerung",
    experienceAria: "Museale Vermittlungserfahrung",
    testSummaryButton: "Lokale Notiz",
    sessionAria: "Sitzungsübersicht öffnen oder schließen",
    testSummaryAria: "Lokale Notiz für die Vermittlung öffnen",
    languageAria: "Sprache wechseln",
    markLookingAction: "Blick markieren",
    markLookingAria: "Blickmarkierung öffnen oder schließen",
    beforeAria: "A setzen, der erste Blickpunkt",
    afterAria: "B setzen, der Rückkehrpunkt des Blicks",
    progressLabel: "Weg",
    startStep: "1 / 7 · Ankunft",
    chooseArtworkStep: "2 / 7 · Werk",
    observeStep: "3 / 7 · Beobachtung",
    interactStep: "4 / 7 · Geste",
    chooseWordStep: "5 / 7 · Wort",
    finalStep: "6 / 7 · Satz",
    returnStep: "7 / 7 · Rückkehr",
    startTitle: "Anders schauen",
    startCopy:
      "Drei Gemälde, eine leichte Verschiebung des Blicks. Wählen Sie ein Werk, lassen Sie es wirken, machen Sie eine Geste und benennen Sie dann, was bleibt.",
    startHint: "Wählen Sie einen Einstieg.",
    startAction: "Erfahrung beginnen",
    guidedStartAction: "Geführter Parcours",
    guidedStartCopy: "Der vorgeschlagenen Folge folgen: 3 → 1 → 2.",
    freeStartAction: "Frei erkunden",
    freeStartCopy: "Direkt ein Werk wählen.",
    guidedIntroStep: "Geführter Auftakt",
    guidedModeLabel: "Geführter Parcours",
    freeModeLabel: "Freie Erkundung",
    introContinueAction: "Weiter",
    introContinueCopy: "Einen Schritt weitergehen.",
    beginGuidedPathAction: "Parcours beginnen",
    beginGuidedPathCopy: "Mit Werk 3 beginnen.",
    leaveGuidedPathAction: "Geführten Parcours verlassen",
    leaveGuidedPathCopy: "Zur freien Erkundung wechseln.",
    continueNextArtworkAction: "Zum nächsten Werk weitergehen",
    continueNextArtworkCopy: "Ruhig zum nächsten Werk weitergehen.",
    guidedTransitionTitle: "Bleiben Sie noch einen Moment beim Werk",
    guidedTransitionHint: "Wenn der Blick sich gesetzt hat, gehen Sie weiter oder hören hier auf.",
    guidedSynthesisTitle: "Lassen Sie den Parcours nachklingen",
    guidedSynthesisCopy: "Halten Sie ihre Abstände und ihre Rückkehr noch einen Moment zusammen.",
    guidedSynthesisHint: "Kehren Sie nur zurück, wenn Sie verlängern möchten.",
    guidedExploreAfterAction: "Ein anderes Werk wählen",
    guidedExploreAfterCopy: "In eine freie Bewegung zwischen den Werken zurückkehren.",
    chooseArtworkTitle: "Wählen Sie ein Werk",
    chooseArtworkCopy:
      "Nehmen Sie das Werk, das Sie zuerst hält.",
    chooseArtworkHint: "Ein anderes kann später folgen.",
    observeTitle: "Schauen Sie still",
    observeCopy:
      "Geben Sie dem Werk zuerst ein paar Sekunden. Oft findet der Blick seinen Rhythmus vor der Hand.",
    observeHint: "Lassen Sie das Werk vor der Geste noch zu Ihnen kommen.",
    observeTransition: "Danach öffnet sich die Geste.",
    chooseInteractionTitle: "Wählen Sie eine Geste",
    chooseInteractionCopy:
      "Nähern Sie sich dem Werk über eine einzige, einfache und langsame Handlung.",
    chooseInteractionHint: "Wenig berühren. Viel sehen.",
    interactReadyHint: "Wenn eine Beziehung klarer wird, gehen Sie zum Wort.",
    chooseWordTitle: "Benennen Sie, was bleibt",
    chooseWordCopy:
      "Welches Wort bleibt nach der Geste zurück?",
    chooseWordHint: "Nehmen Sie das treffendere, nicht das gelehrtere Wort.",
    finalTitle: "Lassen Sie einen Satz entstehen",
    finalCopy: "Ein kurzer Satz kann den Blick wieder zum Bild zurückführen.",
    finalHint: "Dann lassen Sie den Bildschirm zurückweichen.",
    returnTitle: "Zum Werk zurückkehren",
    returnCopy:
      "Nehmen Sie das Telefon herunter. Schauen Sie noch einmal auf das Werk.",
    returnHint: "Lassen Sie den Bildschirm einige Sekunden zurückweichen.",
    afterReturnTitle: "Lassen Sie das Werk noch vor sich",
    afterReturnCopy:
      "Bleiben Sie noch einen Moment bei ihm. Kehren Sie nur zurück, wenn Sie fortsetzen möchten.",
    afterReturnHint: "Die lokale Notiz bleibt im Hintergrund.",
    chooseWordAction: "Ein Wort wählen",
    chooseWordActionAria: "Ein Wort wählen und zur nächsten Phase gehen",
    chooseWordDisabledHint: "Bleiben Sie noch kurz dabei. Das Wort kommt leichter, wenn die Beziehung klarer wird.",
    chooseWordReadyCopy: "Benennen Sie jetzt, was bleibt.",
    chooseWordWait: "Noch warten",
    chooseWordWaitCopy: "Lassen Sie die Beziehung noch etwas klarer werden.",
    finalAction: "Satz erzeugen",
    returnToArtworkAction: "Zum Werk zurück",
    returnToArtworkCopy: "Kehren Sie zuerst zum Werk zurück.",
    chooseAnotherWordAction: "Ein anderes Wort wählen",
    chooseAnotherWordCopy: "Kehren Sie zurück, wenn ein anderes Wort näher rückt.",
    chooseAnotherGestureAction: "Eine andere Geste wählen",
    chooseAnotherGestureCopy: "Eine andere Annäherung an dasselbe Werk versuchen.",
    chooseAnotherArtworkAction: "Ein anderes Werk wählen",
    chooseAnotherArtworkCopy: "Den Blick mit einem anderen Werk weiterführen.",
    restartAction: "Erfahrung neu beginnen",
    restartCopy: "Noch einmal von vorn beginnen.",
    before: "Vorher",
    after: "Nachher",
    beforeMeaning: "A = erster Ort, an dem Ihr Blick verweilt",
    afterMeaning: "B = Ort, an den Ihr Blick nach der Geste zurückkehrt",
    gazeTitle: "Blick markieren",
    gazeCopy:
      "Optional. Kein Eye-Tracking.",
    gazeInlineCopy: "Optional · A davor, B danach.",
    gazeStepA:
      "Berühre vor der Geste die Stelle, die deinen Blick zuerst anzieht.",
    gazeStepB:
      "Berühre nach der Geste die Stelle, zu der dein Blick zurückkehrt.",
    gazePlaceAAction: "A setzen",
    gazePlaceBAction: "B setzen",
    gazeCloseAction: "Schließen",
    gazeRestartAction: "A/B neu setzen",
    gazeNotMarked: "nicht markiert",
    gazeStatusBoth: "A und B markiert",
    gazeStatusBeforeOnly: "A markiert",
    gazeStatusAfterOnly: "B markiert",
    gazeInterpretationShift:
      "Die Geste hat deinen Blick von einer Stelle zu einer anderen verschoben.",
    gazeInterpretationReturn:
      "Dein Blick ist nahe zum ersten Punkt zurückgekehrt.",
    tapToPlaceBefore: "Berühren Sie das Bild, um A zu setzen",
    tapToPlaceAfter: "Berühren Sie das Bild, um B zu setzen",
    summaryArtwork: "Werk",
    summarySessionId: "Sitzung",
    summaryInteraction: "Geste",
    summaryInteractionCompleted: "Geste erfüllt",
    summaryInteractionDuration: "Dauer der Geste",
    summaryRegionsCrossed: "Farbzonen",
    summaryHighestStillness: "Höchste Stillheit",
    summaryWord: "Wort",
    summaryLanguage: "Sprache",
    summaryDuration: "Dauer",
    summaryTouches: "Berührungen",
    summaryGuidedMode: "Geführter Modus",
    summaryPathStep: "Parcours-Schritt",
    summaryVisitedArtworks: "Besuchte Werke",
    summaryCompletedArtworks: "Abgeschlossene Werke",
    summaryGaze: "A/B-Marke",
    summaryPoints: "Punkte A/B",
    summaryPointA: "Punkt A",
    summaryPointB: "Punkt B",
    summaryShift: "Verschiebung",
    summaryPhase: "Phase",
    summaryReturned: "Rückkehr vollzogen",
    summaryRestarted: "Neustart",
    summaryAnotherArtwork: "Neues Werk",
    summaryFinalPhrase: "Rückkehrsatz",
    summaryGuidedSynthesis: "Parcours-Synthese",
    summaryInterpretation: "Kurze Lesart",
    summaryNote:
      "A und B sind freiwillige Aufmerksamkeitsmarken, niemals Eye-Tracking-Daten.",
    summaryModeKicker: "Außerhalb des Besucherparcours",
    summaryReadyTitle: "Lokale Vermittlungsnotiz",
    summaryReadyCopy:
      "Lokale Notiz, um einen Besuchsversuch zu dokumentieren. Nur hier sichtbar und ohne persönliche Daten.",
    closeSummaryAction: "Schließen",
    copySummaryAction: "Testübersicht kopieren",
    copySummaryCopy: "Eine Textnotiz dieses Durchgangs kopieren.",
    downloadJsonAction: "JSON herunterladen",
    downloadJsonCopy: "Die lokalen Daten dieses Durchgangs herunterladen.",
    openSummaryAction: "Lokale Notiz öffnen",
    openSummaryCopy: "Die lokale Dokumentationsnotiz anzeigen.",
    copiedNotice: "Zusammenfassung in die Zwischenablage kopiert.",
    downloadedNotice: "JSON lokal heruntergeladen.",
    copyFailedNotice: "Kopieren auf diesem Gerät nicht möglich.",
    privacyNote:
      "Dieser Prototyp speichert Daten nur lokal in dieser Browser-Sitzung. Es werden keine Namen, E-Mails, IP-Adressen oder persönlichen Daten erhoben.",
    none: "—",
    marked: "gesetzt",
    open: "offen",
    yes: "ja",
    no: "nein",
    shiftMissing: "nicht gemessen",
    shiftSoft: "leicht",
    shiftClear: "deutlich",
    shiftStrong: "markant",
    observationCountdown: "Das Werk kommen lassen",
    returnCountdown: "Den Blick zurückkehren lassen",
    tryThisLabel: "Versuchen Sie dies",
    interactionProgressLabel: "Annäherung",
    interactionObserveLabel: "Wirken lassen",
    interactionCompletedLabel: "Bereit",
    interactionKeepGoing: "Bleiben Sie langsam dabei. Die Veränderung kommt mit der Geste.",
    layersKeepGoing: "Bleiben Sie noch dort, wo die helle Reserve sich gegen die Masse aufhellt.",
    veilKeepGoing: "Streichen Sie noch etwas weiter, damit der Schleier nachgibt, ohne die Masse aufzulösen.",
    squareKeepGoingOne: "Durchqueren Sie noch ein Umfeld.",
    squareKeepGoingMany: "Durchqueren Sie noch {count} Umfelder.",
    squareComparePromptStart: "Setzen Sie das Quadrat erst an einen Ort, dann an einen anderen.",
    squareComparePromptSecond: "Behalten Sie die erste Setzung im Blick und suchen Sie ein anderes Umfeld.",
    squareComparePromptObserve: "Vergleichen Sie beide Setzungen: Das Quadrat bleibt gleich, das Umfeld wirkt.",
    pathKeepGoing: "Setzen Sie noch ein oder zwei Haltepunkte des Blicks.",
    slowKeepGoing: "Bleiben Sie noch einen Moment still.",
    traceKeepGoing: "Folgen Sie noch etwas weiter. Die Spur wird deutlicher.",
    useLayers:
      "Berühren Sie dort, wo sich die helle Reserve öffnet und wo die dichtere Masse den Blick noch hält.",
    useVeil:
      "Streichen Sie langsam. Der Schleier verschiebt sich, die Masse behält ihr Gegengewicht.",
    useSquare:
      "Das Quadrat bleibt fest. Bewegen Sie es, um seine Umgebung wirken zu lassen.",
    sameColourNotice: "Das Quadrat behält exakt dieselbe Farbe; nur das Feld darum verschiebt die Wahrnehmung.",
    squareConstancy: "Gleiche Farbe. Andere Nachbarschaft.",
    sameColourTag: "feste Farbe",
    squareFixedCue: "Quadrat: feste Farbe",
    squareSurroundingCue: "Umfeld: verändert sich",
    squareRegionChanged: "Das Umfeld hat sich verändert.",
    squarePlacementOne: "Setzung 1",
    squarePlacementTwo: "Setzung 2",
    usePath: "Setzen Sie einige Haltepunkte des Blicks zwischen Blöcken und Dichten.",
    useSlow:
      "Warten lässt die Spuren hervortreten. Zu viel Bewegung rückt sie wieder fort.",
    waitingIsAction: "Bleiben Sie einige Sekunden still.",
    slowSettling: "Legen Sie den Finger auf. Lassen Sie das Bild zurückkommen.",
    slowTraceComing: "Bleiben Sie noch. Eine Spur beginnt hervorzutreten.",
    slowTracePresent: "Noch einen Moment. Die Spur wird gegenwärtiger.",
    slowTooFast: "Zu schnell: die Spur zieht sich zurück.",
    slowReturnTouch: "Lösen Sie sich kurz und kehren Sie zurück, wenn Sie das Warten wieder aufnehmen wollen.",
    useTrace: "Folgen Sie einer fast ausgelöschten Markierung, bis sie etwas präsenter wird.",
    traceSettling: "Setzen Sie die Geste auf eine fast ausgelöschte Spur.",
    traceFollowing: "Folgen Sie ihr noch etwas weiter. Sie klärt sich.",
    traceEmerging: "Noch ein wenig. Die Spur gewinnt an Körper.",
    traceReturnTouch: "Lösen Sie kurz und beginnen Sie den Weg erneut, wenn Sie möchten.",
    completeLayers: "Die Reserve hat sich etwas geöffnet, die Masse blieb. Wählen Sie ein Wort.",
    completeVeil: "Der Schleier hat nachgegeben, die Masse behielt ihr Gewicht. Wählen Sie ein Wort.",
    completeSquare: "Das Quadrat blieb fest; verändert hat sich nur seine Umgebung. Wählen Sie ein Wort.",
    completePath: "Der Blickweg hat eine Form bekommen. Wählen Sie ein Wort.",
    completeSlow: "Die Spuren haben auf das Warten geantwortet. Wählen Sie ein Wort.",
    completeTrace: "Die Spur wurde unter Ihrer Geste deutlicher. Wählen Sie ein Wort.",
    clearPath: "Blickweg löschen",
    clearTrace: "Spur löschen",
    squareHint: "Quadrat verschieben",
    layersCanvasHint: "Zwischen heller Reserve und Masse berühren",
    veilCanvasHint: "Zwischen Schleier und Masse streichen",
    slowCanvasHint: "Finger auflegen. Still bleiben.",
    traceCanvasHint: "Hier der Spur folgen",
    stillnessMeter: "Halten des Blicks",
    stillnessLow: "fern",
    stillnessHigh: "gegenwärtig",
    slowWaitPole: "Warten",
    slowTracePole: "Spur",
    traceFaintPole: "Auslöschung",
    traceVisiblePole: "Spur",
    regionLight: "hell",
    regionWarm: "warm",
    regionCool: "kühl",
    regionDeep: "dicht",
    regionField: "Feld",
    reserveSide: "Reserve",
    veilSide: "Schleier",
    massSide: "Masse",
  },
  en: {
    session: "Session",
    skipLink: "Skip to guidance",
    topbarAria: "Visitor controls",
    experienceAria: "Museum mediation experience",
    testSummaryButton: "Local note",
    sessionAria: "Open or close the session summary",
    testSummaryAria: "Open the local mediator note",
    languageAria: "Change language",
    markLookingAction: "Mark looking",
    markLookingAria: "Open or close look marking",
    beforeAria: "Place A, the first gaze point",
    afterAria: "Place B, the returning gaze point",
    progressLabel: "Path",
    startStep: "1 / 7 · Arrival",
    chooseArtworkStep: "2 / 7 · Artwork",
    observeStep: "3 / 7 · Observation",
    interactStep: "4 / 7 · Gesture",
    chooseWordStep: "5 / 7 · Word",
    finalStep: "6 / 7 · Phrase",
    returnStep: "7 / 7 · Return",
    startTitle: "Look differently",
    startCopy:
      "Three paintings, one slight shift of attention. Choose one work, let it act on you, make one gesture, then name what remains.",
    startHint: "Choose a way in.",
    startAction: "Enter the experience",
    guidedStartAction: "Guided path",
    guidedStartCopy: "Follow the proposed order: 3 → 1 → 2.",
    freeStartAction: "Explore freely",
    freeStartCopy: "Choose an artwork directly.",
    guidedIntroStep: "Guided prelude",
    guidedModeLabel: "Guided path",
    freeModeLabel: "Free exploration",
    introContinueAction: "Continue",
    introContinueCopy: "Take one step further.",
    beginGuidedPathAction: "Begin the path",
    beginGuidedPathCopy: "Enter artwork 3 first.",
    leaveGuidedPathAction: "Leave guided path",
    leaveGuidedPathCopy: "Switch to free exploration.",
    continueNextArtworkAction: "Continue to the next artwork",
    continueNextArtworkCopy: "Move gently to the next artwork.",
    guidedTransitionTitle: "Stay with the artwork a little longer",
    guidedTransitionHint: "When the gaze has settled again, continue or stop here.",
    guidedSynthesisTitle: "Let the path fall quiet",
    guidedSynthesisCopy: "Hold their distances and returns together a little longer.",
    guidedSynthesisHint: "Return only if you want to continue a little further.",
    guidedExploreAfterAction: "Choose another artwork",
    guidedExploreAfterCopy: "Return to a freer movement between the works.",
    chooseArtworkTitle: "Choose one artwork",
    chooseArtworkCopy:
      "Begin with the work that catches you first.",
    chooseArtworkHint: "Another can follow later.",
    observeTitle: "Observe quietly",
    observeCopy:
      "Give the work a few seconds first. The eye often finds its rhythm before the hand.",
    observeHint: "Let the work arrive before the gesture.",
    observeTransition: "The gesture opens next.",
    chooseInteractionTitle: "Choose one gesture",
    chooseInteractionCopy:
      "Approach the work through one simple, slow action.",
    chooseInteractionHint: "Touch less. Notice more.",
    interactReadyHint: "When a relation becomes clearer, move toward a word.",
    chooseWordTitle: "Name what remains",
    chooseWordCopy:
      "Which word stays after the gesture?",
    chooseWordHint: "Choose the more exact word, not the more learned one.",
    finalTitle: "Let a phrase arrive",
    finalCopy: "A brief phrase can lead the eye back to the painting.",
    finalHint: "Then let the screen withdraw.",
    returnTitle: "Return to the artwork",
    returnCopy:
      "Lower the phone. Look again at the artwork.",
    returnHint: "Let the screen withdraw for a few seconds.",
    afterReturnTitle: "Leave the artwork in front of you a little longer",
    afterReturnCopy:
      "Stay with it a little longer. Return only if you want to continue.",
    afterReturnHint: "The local note stays in the background.",
    chooseWordAction: "Choose a word",
    chooseWordActionAria: "Choose a word and move to the next stage",
    chooseWordDisabledHint: "Stay with it a little longer. The word will come more easily when the relation is clearer.",
    chooseWordReadyCopy: "Name what remains now.",
    chooseWordWait: "Wait a little longer",
    chooseWordWaitCopy: "Let the relation settle a little longer.",
    finalAction: "Generate the phrase",
    returnToArtworkAction: "Return to artwork",
    returnToArtworkCopy: "Return to the artwork first.",
    chooseAnotherWordAction: "Choose another word",
    chooseAnotherWordCopy: "Return if another word feels closer.",
    chooseAnotherGestureAction: "Choose another gesture",
    chooseAnotherGestureCopy: "Try another approach to the same work.",
    chooseAnotherArtworkAction: "Choose another artwork",
    chooseAnotherArtworkCopy: "Carry the looking onward with another artwork.",
    restartAction: "Restart the experience",
    restartCopy: "Begin again from the start.",
    before: "Before",
    after: "After",
    beforeMeaning: "A = the first place that held your eye",
    afterMeaning: "B = the place your eye returns after the gesture",
    gazeTitle: "Mark looking",
    gazeCopy:
      "Optional. This is not eye tracking.",
    gazeInlineCopy: "Optional · A before, B after.",
    gazeStepA:
      "Before the gesture, touch the area that first attracts your eye.",
    gazeStepB:
      "After the gesture, touch the area your eye returns to.",
    gazePlaceAAction: "Place A",
    gazePlaceBAction: "Place B",
    gazeCloseAction: "Close",
    gazeRestartAction: "Mark A/B again",
    gazeNotMarked: "not marked",
    gazeStatusBoth: "A and B marked",
    gazeStatusBeforeOnly: "A marked",
    gazeStatusAfterOnly: "B marked",
    gazeInterpretationShift:
      "The gesture shifted your attention from one area to another.",
    gazeInterpretationReturn:
      "Your eye returned close to its first point.",
    tapToPlaceBefore: "Tap the image to place A",
    tapToPlaceAfter: "Tap the image to place B",
    summaryArtwork: "Artwork",
    summarySessionId: "Session",
    summaryInteraction: "Gesture",
    summaryInteractionCompleted: "Gesture completed",
    summaryInteractionDuration: "Gesture duration",
    summaryRegionsCrossed: "Color regions",
    summaryHighestStillness: "Highest stillness",
    summaryWord: "Word",
    summaryLanguage: "Language",
    summaryDuration: "Duration",
    summaryTouches: "Touches",
    summaryGuidedMode: "Guided mode",
    summaryPathStep: "Path step",
    summaryVisitedArtworks: "Visited artworks",
    summaryCompletedArtworks: "Completed artworks",
    summaryGaze: "A/B marker",
    summaryPoints: "A/B points",
    summaryPointA: "A point",
    summaryPointB: "B point",
    summaryShift: "Shift",
    summaryPhase: "Stage",
    summaryReturned: "Return completed",
    summaryRestarted: "Restart",
    summaryAnotherArtwork: "New artwork",
    summaryFinalPhrase: "Return phrase",
    summaryGuidedSynthesis: "Path synthesis",
    summaryInterpretation: "Brief reading",
    summaryNote:
      "A and B are voluntary attention markers, never eye-tracking data.",
    summaryModeKicker: "Outside visitor flow",
    summaryReadyTitle: "Local mediation note",
    summaryReadyCopy:
      "A local note for documenting a trial visit. Visible here only, with no personal data.",
    closeSummaryAction: "Close",
    copySummaryAction: "Copy test summary",
    copySummaryCopy: "Copy a plain-text note from this visit.",
    downloadJsonAction: "Download JSON",
    downloadJsonCopy: "Download the local data from this visit.",
    openSummaryAction: "Open local note",
    openSummaryCopy: "Show the local documentation note from this visit.",
    copiedNotice: "Summary copied to the clipboard.",
    downloadedNotice: "JSON downloaded locally.",
    copyFailedNotice: "Copy was not available on this device.",
    privacyNote:
      "This prototype stores data only locally in this browser session. No names, emails, IPs, or personal data are collected.",
    none: "—",
    marked: "placed",
    open: "open",
    yes: "yes",
    no: "no",
    shiftMissing: "not measured",
    shiftSoft: "subtle",
    shiftClear: "clear",
    shiftStrong: "marked",
    observationCountdown: "Let the work arrive",
    returnCountdown: "Let the gaze return",
    tryThisLabel: "Try this",
    interactionProgressLabel: "Progress",
    interactionObserveLabel: "Let it work",
    interactionCompletedLabel: "Ready",
    interactionKeepGoing: "Keep going slowly. The change arrives with the gesture.",
    layersKeepGoing: "Stay a little longer where the pale reserve lightens against the mass.",
    veilKeepGoing: "Glide a little longer to feel the veil yield without dissolving the mass.",
    squareKeepGoingOne: "Cross one more surrounding.",
    squareKeepGoingMany: "Cross {count} more surroundings.",
    squareComparePromptStart: "Place the square once, then move it elsewhere.",
    squareComparePromptSecond: "Keep that first placement in mind, then find another surrounding.",
    squareComparePromptObserve: "Compare both placements: the square stays fixed while the surroundings act.",
    pathKeepGoing: "Set one or two more pauses of the gaze.",
    slowKeepGoing: "Stay still a little longer.",
    traceKeepGoing: "Follow a little further. The trace is clarifying.",
    useLayers:
      "Touch where the pale reserve opens and where the denser mass still holds the eye.",
    useVeil:
      "Glide slowly. The veil shifts while the mass keeps its counterweight.",
    useSquare:
      "The square stays fixed. Move it to feel its surroundings act.",
    sameColourNotice: "The square keeps exactly the same color; only the field around it shifts how you see it.",
    squareConstancy: "Same color. Different neighborhood.",
    sameColourTag: "fixed colour",
    squareFixedCue: "Square: unchanged",
    squareSurroundingCue: "Surroundings: changing",
    squareRegionChanged: "The surroundings shifted.",
    squarePlacementOne: "Placement 1",
    squarePlacementTwo: "Placement 2",
    usePath: "Set a few pauses of the gaze between blocks and densities.",
    useSlow:
      "Waiting lets the traces come forward. Moving too quickly lets them fade back.",
    waitingIsAction: "Stay still for a few seconds.",
    slowSettling: "Place a finger. Let the image come back.",
    slowTraceComing: "Stay a little longer. A trace is beginning to appear.",
    slowTracePresent: "A little longer. The trace is becoming more present.",
    slowTooFast: "Too fast: the trace withdraws again.",
    slowReturnTouch: "Lift away, then return if you want to begin the waiting again.",
    useTrace: "Follow a mark close to erasure until it gains a little more presence.",
    traceSettling: "Place the gesture on a trace that is barely there.",
    traceFollowing: "Follow it a little further. It is becoming clearer.",
    traceEmerging: "A little further. The trace is gaining presence.",
    traceReturnTouch: "Lift away, then begin the path again if you want to.",
    completeLayers: "The reserve opened a little and the mass held. Choose a word.",
    completeVeil: "The veil yielded and the mass kept its weight. Choose a word.",
    completeSquare: "The square stayed fixed; only its surroundings changed. Choose a word.",
    completePath: "The path of the gaze has taken shape. Choose a word.",
    completeSlow: "The traces answered your waiting. Choose a word.",
    completeTrace: "The trace grew clearer under your gesture. Choose a word.",
    clearPath: "Clear path",
    clearTrace: "Clear trace",
    squareHint: "Move the square",
    layersCanvasHint: "Touch between pale reserve and mass",
    veilCanvasHint: "Glide between veil and mass",
    slowCanvasHint: "Place a finger. Stay still.",
    traceCanvasHint: "Follow here",
    stillnessMeter: "Hold of attention",
    stillnessLow: "diffuse",
    stillnessHigh: "present",
    slowWaitPole: "waiting",
    slowTracePole: "trace",
    traceFaintPole: "erasure",
    traceVisiblePole: "trace",
    regionLight: "light",
    regionWarm: "warm",
    regionCool: "cool",
    regionDeep: "dense",
    regionField: "field",
    reserveSide: "reserve",
    veilSide: "veil",
    massSide: "mass",
  },
};

const ARTWORKS = [
  {
    id: "work-1",
    image: "./assets/oeuvre1.jpg",
    label: { fr: "Œuvre 1", de: "Werk 1", en: "Work 1" },
    title: {
      fr: "Voiles, réserve, contrepoids",
      de: "Schleier, Reserve, Gegengewicht",
      en: "Veils, reserve, counterweight",
    },
    words: {
      fr: ["voile", "poids", "appui", "tension", "seuil", "suspension"],
      de: ["Schleier", "Gewicht", "Stütze", "Spannung", "Schwelle", "Schweben"],
      en: ["veil", "weight", "support", "tension", "threshold", "suspension"],
    },
    layerLabels: {
      fr: ["voile vert", "réserve pâle", "voile bleu", "masse"],
      de: ["grüner Schleier", "helle Reserve", "blauer Schleier", "Masse"],
      en: ["green veil", "pale reserve", "blue veil", "mass"],
    },
    interactions: [
      {
        id: "layers",
        label: { fr: "Couches", de: "Schichten", en: "Layers" },
        copy: {
          fr: "Touchez entre réserve pâle et masse plus dense.",
          de: "Berühren Sie zwischen heller Reserve und dichterer Masse.",
          en: "Touch between pale reserve and denser mass.",
        },
        hintKey: "useLayers",
      },
      {
        id: "veil",
        label: { fr: "Voile", de: "Schleier", en: "Veil" },
        copy: {
          fr: "Glissez lentement entre voile et masse.",
          de: "Streichen Sie langsam zwischen Schleier und Masse.",
          en: "Glide slowly between veil and mass.",
        },
        hintKey: "useVeil",
      },
    ],
  },
  {
    id: "work-2",
    image: "./assets/oeuvre2.jpg",
    label: { fr: "Œuvre 2", de: "Werk 2", en: "Work 2" },
    title: {
      fr: "Voisinage, chaleur, densité",
      de: "Nachbarschaft, Wärme, Dichte",
      en: "Color neighborhood, warmth, density",
    },
    words: {
      fr: ["masse", "chaleur", "contraste", "bloc", "voisinage", "domination"],
      de: ["Masse", "Wärme", "Kontrast", "Block", "Nähe", "Dominanz"],
      en: ["mass", "warmth", "contrast", "block", "proximity", "dominance"],
    },
    interactions: [
      {
        id: "square",
        label: { fr: "Carré mobile", de: "Bewegtes Quadrat", en: "Movable square" },
        copy: {
          fr: "Déplace le carré. Sa couleur reste fixe.",
          de: "Verschieben Sie das Quadrat. Seine Farbe bleibt fest.",
          en: "Move the square. Its color stays fixed.",
        },
        hintKey: "useSquare",
      },
      {
        id: "path",
        label: { fr: "Parcours du regard", de: "Blickweg", en: "Gaze path" },
        copy: {
          fr: "Pose quelques haltes du regard.",
          de: "Setzen Sie einige Haltepunkte des Blicks.",
          en: "Place a few pauses of the gaze.",
        },
        hintKey: "usePath",
      },
    ],
  },
  {
    id: "work-3",
    image: "./assets/oeuvre3.jpg",
    label: { fr: "Œuvre 3", de: "Werk 3", en: "Work 3" },
    title: {
      fr: "Silence, effacement, apparition",
      de: "Stille, Auslöschung, Erscheinung",
      en: "Silence, erasure, appearance",
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
          fr: "Reste immobile quelques secondes.",
          de: "Bleiben Sie einige Sekunden still.",
          en: "Stay still for a few seconds.",
        },
        hintKey: "useSlow",
      },
      {
        id: "trace",
        label: { fr: "Trace", de: "Spur", en: "Trace" },
        copy: {
          fr: "Suis une trace presque effacée.",
          de: "Folgen Sie einer fast ausgelöschten Spur.",
          en: "Follow a trace close to erasure.",
        },
        hintKey: "useTrace",
      },
    ],
  },
];

let artworkImages = [];
let ui = {};
let motionQuery = null;
let summaryNoticeTimer = null;
let observePhaseTimer = null;
let silentReturnPhaseTimer = null;

function createSessionId() {
  const year = new Date().getFullYear();
  const token = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BM-${year}-${token}`;
}

const state = {
  sessionId: createSessionId(),
  language: "fr",
  phase: "start",
  journeyMode: null,
  guidedModeUsed: false,
  guidedIntroIndex: 0,
  guidedPathStep: 0,
  guidedVisitedArtworks: [],
  guidedCompletedArtworks: [],
  guidedArtworkRecords: [],
  guidedFinalSynthesis: "",
  selectedArtwork: null,
  selectedInteraction: null,
  selectedWordIndex: null,
  finalPhrase: "",
  summaryOpen: false,
  summaryNotice: "",
  gazePanelOpen: false,
  pendingMark: null,
  beforePoint: null,
  afterPoint: null,
  taps: 0,
  sessionStart: Date.now(),
  usedReturnToArtwork: false,
  choseAnotherArtwork: false,
  restartedExperience: false,
  lastCompletedRecord: null,
  observeStartedAt: 0,
  observeDuration: 5600,
  interactionStartedAt: 0,
  silentReturnStartedAt: 0,
  silentReturnDuration: 5200,
  interactionEvidence: false,
  interactionCompleted: false,
  interactionCompletionAt: 0,
  interactionCompletionMessage: "",
  interactionFirstTouchAt: 0,
  interactionCuePulse: 0,
  uiDirty: true,
  sheetScrollToBottomPending: false,
  reducedMotion: false,
  layers: [true, true, true, true],
  veilBalance: 0.5,
  artworkOneCharge: 0,
  square: { ...DEFAULT_SQUARE },
  squareDragging: false,
  squareHintDismissed: false,
  squareRegionKey: "field",
  squareRegionPulse: 0,
  squareVisitedRegions: [],
  squareComparisonPoints: [],
  gazePath: [],
  tracePoints: [],
  stillness: 0,
  highestStillness: 0,
  slowMovement: 0,
  slowFocusPoint: null,
  artTouchPoint: null,
  touchCanvasActive: false,
  lastTouchAt: 0,
  lastHandledTouchStamp: -1,
  nativeTouchBound: false,
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
  textFont("Helvetica Neue");
  textAlign(LEFT, TOP);
  textWrap(WORD);

  state.squareRegionKey = getSquareRegion(state.square).key;
  bindCanvasTouch(canvas);
  bindUi();
  setupMotionPreference();
  renderUi();
}

function setupMotionPreference() {
  if (!window.matchMedia) return;

  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const applyMotionPreference = () => {
    state.reducedMotion = motionQuery.matches;
    document.body.classList.toggle("reduced-motion", state.reducedMotion);
    state.uiDirty = true;
  };

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", applyMotionPreference);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(applyMotionPreference);
  }

  applyMotionPreference();
}

function bindUi() {
  ui.skipLink = document.querySelector(".skip-link");
  ui.topbar = document.querySelector(".topbar");
  ui.experienceShell = document.querySelector(".experience-shell");
  ui.langButton = document.getElementById("lang-button");
  ui.summaryButton = document.getElementById("summary-button");
  ui.markLookingButton = document.getElementById("mark-looking-button");
  ui.markLookingGroup = ui.markLookingButton.closest(".topbar-group");
  ui.summaryPanel = document.getElementById("summary-panel");
  ui.sheet = document.getElementById("sheet");
  ui.sheetStep = document.getElementById("sheet-step");
  ui.sheetProgressLabel = document.getElementById("sheet-progress-label");
  ui.progressFill = document.getElementById("progress-fill");
  ui.progressNotes = document.getElementById("progress-notes");
  ui.sheetContext = document.getElementById("sheet-context");
  ui.sheetTitle = document.getElementById("sheet-title");
  ui.sheetCopy = document.getElementById("sheet-copy");
  ui.sheetHint = document.getElementById("sheet-hint");
  ui.controls = document.getElementById("controls");
  ui.privacyNote = document.getElementById("privacy-note");
  ui.modal = document.getElementById("modal");

  ui.langButton.addEventListener("click", cycleLanguage);
  ui.summaryButton.addEventListener("click", () => {
    state.summaryOpen = !state.summaryOpen;
    requestUiRender();
  });
  ui.markLookingButton.addEventListener("click", toggleGazePanel);
  document.addEventListener("keydown", handleKeydown);
}

function requestUiRender() {
  state.uiDirty = true;
  renderUi();
  state.uiDirty = false;
}

function handleKeydown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey || isEditableTarget(event.target)) return;

  const key = event.key.toLowerCase();

  if (key === "l") {
    event.preventDefault();
    cycleLanguage();
    return;
  }

  if (key === "a") {
    event.preventDefault();
    armPendingMark("before");
    return;
  }

  if (key === "b") {
    event.preventDefault();
    armPendingMark("after");
    return;
  }

  if (key === "s" && hasMediatorSummary()) {
    event.preventDefault();
    state.summaryOpen = !state.summaryOpen;
    state.uiDirty = true;
    return;
  }

  if (event.key === "Escape" && state.summaryOpen) {
    event.preventDefault();
    state.summaryOpen = false;
    state.uiDirty = true;
    return;
  }

  if (state.phase === "interact" && state.selectedInteraction === "square") {
    let dx = 0;
    let dy = 0;

    if (event.key === "ArrowLeft") dx = -0.025;
    if (event.key === "ArrowRight") dx = 0.025;
    if (event.key === "ArrowUp") dy = -0.025;
    if (event.key === "ArrowDown") dy = 0.025;

    if (dx !== 0 || dy !== 0) {
      event.preventDefault();
      moveSquareToPoint({
        x: state.square.x + dx,
        y: state.square.y + dy,
      });
      state.interactionEvidence = true;
      state.uiDirty = true;
    }
  }
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  state.uiDirty = true;
}

function draw() {
  updateTimedFlow();
  updateStillnessModel();
  updateSquareRegionPulse();
  updateInteractionCompletionModel();
  drawBackgroundField();

  if (state.phase === "start" || state.phase === "guided-intro") {
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

  if (shouldRenderUiThisFrame()) {
    renderUi();
    state.uiDirty = false;
  }
}

function shouldRenderUiThisFrame() {
  if (state.uiDirty) return true;
  return ["observe", "interact", "silent-return"].includes(state.phase) && frameCount % 6 === 0;
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

function currentGuidedIntroSlide() {
  return GUIDED_INTRO[state.language][state.guidedIntroIndex] || GUIDED_INTRO[state.language][0];
}

function isGuidedJourneyActive() {
  return state.journeyMode === "guided";
}

function hasGuidedJourneyData() {
  return state.guidedModeUsed || state.guidedArtworkRecords.length > 0;
}

function guidedStepNumber() {
  if (!hasGuidedJourneyData() && !isGuidedJourneyActive()) return null;
  if (state.phase === "guided-synthesis") return GUIDED_PATH.length;
  return min(state.guidedPathStep + 1, GUIDED_PATH.length);
}

function guidedPathStepText() {
  const stepNumber = guidedStepNumber();
  if (stepNumber == null) return currentText().none;
  return `${stepNumber}/${GUIDED_PATH.length}`;
}

function currentGuidedArtworkIndex() {
  return GUIDED_PATH[min(state.guidedPathStep, GUIDED_PATH.length - 1)];
}

function hasNextGuidedArtwork() {
  return state.guidedPathStep < GUIDED_PATH.length - 1;
}

function guidedArtworkLabels(indices) {
  if (!indices || indices.length === 0) return currentText().none;
  return indices.map((index) => ARTWORKS[index].label[state.language]).join(" · ");
}

function clearCurrentArtworkState() {
  clearPhaseTimers();
  state.selectedArtwork = null;
  state.selectedInteraction = null;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.observeStartedAt = 0;
  state.interactionStartedAt = 0;
  state.silentReturnStartedAt = 0;
  clearGazeMarks();
  resetInteractionState();
}

function resetGuidedJourneyState() {
  state.journeyMode = null;
  state.guidedModeUsed = false;
  state.guidedIntroIndex = 0;
  state.guidedPathStep = 0;
  state.guidedVisitedArtworks = [];
  state.guidedCompletedArtworks = [];
  state.guidedArtworkRecords = [];
  state.guidedFinalSynthesis = "";
}

function clearPhaseTimers() {
  if (observePhaseTimer != null) {
    window.clearTimeout(observePhaseTimer);
    observePhaseTimer = null;
  }

  if (silentReturnPhaseTimer != null) {
    window.clearTimeout(silentReturnPhaseTimer);
    silentReturnPhaseTimer = null;
  }
}

function scheduleObservePhaseTransition() {
  if (observePhaseTimer != null) {
    window.clearTimeout(observePhaseTimer);
  }

  observePhaseTimer = window.setTimeout(() => {
    observePhaseTimer = null;
    advanceObservePhase();
  }, state.observeDuration);
}

function scheduleSilentReturnCompletion() {
  if (silentReturnPhaseTimer != null) {
    window.clearTimeout(silentReturnPhaseTimer);
  }

  silentReturnPhaseTimer = window.setTimeout(() => {
    silentReturnPhaseTimer = null;
    completeSilentReturnPhase();
  }, state.silentReturnDuration);
}

function advanceObservePhase() {
  if (state.phase !== "observe") return;
  if (observePhaseTimer != null) {
    window.clearTimeout(observePhaseTimer);
    observePhaseTimer = null;
  }
  state.phase = "choose-interaction";
  requestUiRender();
}

function completeSilentReturnPhase() {
  if (state.phase !== "silent-return") return;
  if (silentReturnPhaseTimer != null) {
    window.clearTimeout(silentReturnPhaseTimer);
    silentReturnPhaseTimer = null;
  }

  const completedRecord = snapshotCurrentSession();

  if (isGuidedJourneyActive()) {
    registerGuidedArtworkRecord(completedRecord);
  }

  state.lastCompletedRecord = finalizeSessionRecord(completedRecord);
  state.selectedInteraction = null;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.pendingMark = null;
  resetInteractionState();

  if (isGuidedJourneyActive() && state.guidedCompletedArtworks.length >= GUIDED_PATH.length) {
    state.guidedFinalSynthesis = buildGuidedSynthesis();
    state.lastCompletedRecord = finalizeSessionRecord(completedRecord, {
      guidedFinalSynthesis: state.guidedFinalSynthesis,
    });
    state.phase = "guided-synthesis";
  } else {
    state.phase = "after-return";
  }

  requestUiRender();
}

function beginGuidedJourney() {
  resetGuidedJourneyState();
  state.journeyMode = "guided";
  state.guidedModeUsed = true;
  state.summaryOpen = false;
  clearCurrentArtworkState();
  state.phase = "guided-intro";
  requestUiRender();
}

function beginFreeExploration() {
  state.journeyMode = "free";
  state.summaryOpen = false;
  clearCurrentArtworkState();
  state.phase = "choose-artwork";
  requestUiRender();
}

function continueGuidedIntro() {
  if (state.guidedIntroIndex < GUIDED_INTRO[state.language].length - 1) {
    state.guidedIntroIndex += 1;
    requestUiRender();
    return;
  }

  startCurrentGuidedArtwork();
}

function startCurrentGuidedArtwork() {
  state.journeyMode = "guided";
  state.guidedModeUsed = true;
  startArtworkFlow(currentGuidedArtworkIndex());
}

function continueToNextGuidedArtwork() {
  if (!hasNextGuidedArtwork()) return;
  state.guidedPathStep += 1;
  startCurrentGuidedArtwork();
}

function leaveGuidedPath() {
  state.journeyMode = "free";

  if (state.phase === "guided-intro" || state.phase === "guided-synthesis" || state.phase === "after-return") {
    chooseAnotherArtwork();
    return;
  }

  requestUiRender();
}

function hasLiveSessionOutcome() {
  return Boolean(state.finalPhrase) || state.phase === "silent-return";
}

function hasMediatorSummary() {
  return Boolean(activeMediatorRecord());
}

function activeMediatorRecord() {
  if (hasLiveSessionOutcome()) {
    return snapshotCurrentSession();
  }

  if (state.lastCompletedRecord) {
    return state.lastCompletedRecord;
  }

  return null;
}

function clonePoint(point) {
  return point ? { ...point } : null;
}

function cloneGuidedArtworkRecords(records = state.guidedArtworkRecords) {
  return records.map((record) => ({
    ...record,
    beforePoint: clonePoint(record.beforePoint),
    afterPoint: clonePoint(record.afterPoint),
  }));
}

function formatShortDuration(totalSeconds) {
  if (totalSeconds == null || Number.isNaN(totalSeconds)) return currentText().none;
  const safeSeconds = max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function currentInteractionDurationSeconds() {
  if (!state.interactionStartedAt) return null;
  const endAt = state.interactionCompletedAt || millis();
  return max(0, Math.floor((endAt - state.interactionStartedAt) / 1000));
}

function squareRegionsCrossedCount() {
  return state.squareVisitedRegions.length;
}

function highestStillnessValue() {
  return Math.round(constrain(state.highestStillness, 0, 1) * 100) / 100;
}

function markInteractionContact() {
  if (!state.interactionFirstTouchAt) {
    state.interactionFirstTouchAt = millis();
  }
  state.interactionEvidence = true;
  state.interactionCuePulse = 1;
}

function completeInteraction(message) {
  if (state.interactionCompleted) return;
  state.interactionCompleted = true;
  state.interactionCompletionAt = millis();
  state.interactionCompletionMessage = message;
  state.interactionEvidence = true;
  state.interactionCuePulse = 1;
  state.uiDirty = true;
}

function currentInteractionProgress() {
  const interaction = currentInteraction();
  if (!interaction) return 0;

  if (interaction.id === "layers" || interaction.id === "veil") {
    return constrain(state.artworkOneCharge, 0, 1);
  }

  if (interaction.id === "square") {
    return constrain(squareRegionsCrossedCount() / 3, 0, 1);
  }

  if (interaction.id === "path") {
    return constrain(state.gazePath.length / 4, 0, 1);
  }

  if (interaction.id === "slow") {
    return constrain(state.highestStillness / 0.78, 0, 1);
  }

  if (interaction.id === "trace") {
    return constrain(state.tracePoints.length / 12, 0, 1);
  }

  return 0;
}

function interactionCompletionCopy(interactionId = state.selectedInteraction) {
  const text = currentText();

  if (interactionId === "layers") return text.completeLayers;
  if (interactionId === "veil") return text.completeVeil;
  if (interactionId === "square") return text.completeSquare;
  if (interactionId === "path") return text.completePath;
  if (interactionId === "slow") return text.completeSlow;
  if (interactionId === "trace") return text.completeTrace;
  return text.interactReadyHint;
}

function snapshotCurrentSession(overrides = {}) {
  const artwork = currentArtwork();
  const interaction = currentInteraction();
  const word = currentSelectedWord();

  const record = {
    sessionId: state.sessionId,
    language: state.language.toUpperCase(),
    journeyMode: state.journeyMode || "free",
    guidedMode: hasGuidedJourneyData(),
    guidedPathStep: guidedPathStepText(),
    guidedVisitedArtworks: guidedArtworkLabels(state.guidedVisitedArtworks),
    guidedCompletedArtworks: guidedArtworkLabels(state.guidedCompletedArtworks),
    guidedArtworkRecords: cloneGuidedArtworkRecords(),
    guidedFinalSynthesis: state.guidedFinalSynthesis || null,
    artworkNumber: artwork ? state.selectedArtwork + 1 : null,
    artworkLabel: artwork ? artwork.label[state.language] : null,
    gestureId: interaction ? interaction.id : null,
    gestureLabel: interaction ? interaction.label[state.language] : null,
    interactionCompleted: state.interactionCompleted,
    interactionDurationSeconds: currentInteractionDurationSeconds(),
    interactionDurationFormatted: formatShortDuration(currentInteractionDurationSeconds()),
    squareRegionsCrossed: interaction?.id === "square" ? squareRegionsCrossedCount() : null,
    highestStillness: interaction?.id === "slow" ? highestStillnessValue() : null,
    word: word || null,
    beforePoint: serializePoint(state.beforePoint),
    afterPoint: serializePoint(state.afterPoint),
    gazeStatus: gazeStatusText(),
    gazeInterpretation: gazeInterpretationText(),
    touches: state.taps,
    durationSeconds: Math.floor((Date.now() - state.sessionStart) / 1000),
    durationFormatted: formatDuration(),
    finalPhrase: state.finalPhrase || null,
    usedReturnToArtwork: state.usedReturnToArtwork,
    restartedExperience: state.restartedExperience,
    choseAnotherArtwork: state.choseAnotherArtwork,
    phaseLabel: phaseMeta().step,
    shiftLabel: gazeShiftText(),
    timestamp: new Date().toISOString(),
    ...overrides,
  };

  record.interpretation = interpretationSentence(record);
  return record;
}

function finalizeSessionRecord(record, overrides = {}) {
  const nextRecord = {
    ...record,
    journeyMode: state.journeyMode || "free",
    guidedMode: hasGuidedJourneyData(),
    guidedPathStep: guidedPathStepText(),
    guidedVisitedArtworks: guidedArtworkLabels(state.guidedVisitedArtworks),
    guidedCompletedArtworks: guidedArtworkLabels(state.guidedCompletedArtworks),
    guidedArtworkRecords: cloneGuidedArtworkRecords(),
    guidedFinalSynthesis: state.guidedFinalSynthesis || null,
    ...overrides,
  };

  nextRecord.gazeStatus = gazeStatusText(nextRecord);
  nextRecord.gazeInterpretation = gazeInterpretationText(nextRecord);
  nextRecord.interpretation = interpretationSentence(nextRecord);
  return nextRecord;
}

function createGuidedArtworkRecord(record) {
  return {
    artworkIndex: record.artworkNumber != null ? record.artworkNumber - 1 : null,
    artworkNumber: record.artworkNumber,
    artworkLabel: record.artworkLabel,
    gestureId: record.gestureId,
    gestureLabel: record.gestureLabel,
    word: record.word,
    finalPhrase: record.finalPhrase,
    shiftLabel: record.shiftLabel,
    gazeInterpretation: record.gazeInterpretation,
    beforePoint: record.beforePoint,
    afterPoint: record.afterPoint,
  };
}

function registerGuidedArtworkRecord(record) {
  const artworkIndex = record.artworkNumber != null ? record.artworkNumber - 1 : null;
  if (artworkIndex == null) return;

  if (!state.guidedVisitedArtworks.includes(artworkIndex)) {
    state.guidedVisitedArtworks.push(artworkIndex);
  }

  if (!state.guidedCompletedArtworks.includes(artworkIndex)) {
    state.guidedCompletedArtworks.push(artworkIndex);
  }

  const existingIndex = state.guidedArtworkRecords.findIndex(
    (item) => item.artworkIndex === artworkIndex,
  );
  const nextRecord = createGuidedArtworkRecord(record);

  if (existingIndex >= 0) {
    state.guidedArtworkRecords[existingIndex] = nextRecord;
  } else {
    state.guidedArtworkRecords.push(nextRecord);
  }
}

function serializePoint(point) {
  if (!point) return null;
  return {
    x: round(point.x * 1000) / 1000,
    y: round(point.y * 1000) / 1000,
  };
}

function formatPointText(point) {
  if (!point) return currentText().none;
  return `x=${point.x.toFixed(3)}, y=${point.y.toFixed(3)}`;
}

function interpretationSentence(record = activeMediatorRecord()) {
  const text = currentText();
  if (!record) return text.none;

  const artwork = record.artworkNumber ? `${record.artworkNumber}` : text.none;
  const gesture = record.gestureLabel || text.none;
  const word = record.word || text.none;
  const shift = record.shiftLabel || text.shiftMissing;
  const focus =
    record.artworkNumber === 1
      ? {
          fr: "le jeu entre réserve pâle et masse plus dense",
          de: "das Spiel zwischen heller Reserve und dichterer Masse",
          en: "the play between pale reserve and denser mass",
        }
      : record.artworkNumber === 2
        ? {
            fr: "des voisinages de couleur, de la chaleur et de la densité",
            de: "Farbnachbarschaft, Wärme und Dichte",
            en: "color neighborhood, warmth, and density",
          }
        : record.artworkNumber === 3
          ? {
              fr: "la trace discrète, l’effacement et l’attente",
              de: "leise Spur, Auslöschung und Warten",
              en: "quiet trace, erasure, and waiting",
            }
          : {
              fr: "l’attention portée à l’œuvre",
              de: "die Aufmerksamkeit für das Werk",
              en: "the attention brought to the work",
            };
  const returnClause =
    record.usedReturnToArtwork
      ? {
          fr: "le regard est revenu à l’œuvre",
          de: "der Blick ist zum Werk zurückgekehrt",
          en: "the gaze returned to the artwork",
        }
      : {
          fr: "le retour à l’œuvre est resté en suspens",
          de: "die Rückkehr zum Werk blieb offen",
          en: "the return to the artwork remained open",
        };

  if (state.language === "fr") {
    return `Sur l’œuvre ${artwork}, le parcours s’est attaché à ${focus.fr}, avec le geste « ${gesture} » et le mot « ${word} ». Le déplacement du regard est ${shift}, et ${returnClause.fr}.`;
  }

  if (state.language === "de") {
    return `Bei Werk ${artwork} blieb der Parcours bei ${focus.de}, mit der Geste « ${gesture} » und dem Wort « ${word} ». Die Blickverschiebung ist ${shift}, und ${returnClause.de}.`;
  }

  return `On artwork ${artwork}, the visit stayed with ${focus.en}, through the gesture “${gesture}” and the word “${word}”. The gaze shift reads as ${shift}, and ${returnClause.en}.`;
}

function buildGuidedSynthesis(records = state.guidedArtworkRecords) {
  if (!records || records.length === 0) return currentText().guidedSynthesisCopy;

  const words = records.map((record) => record.word).filter(Boolean);
  const phrases = records.map((record) => record.finalPhrase).filter(Boolean);
  const shifts = records.map((record) => record.shiftLabel).filter((shift) => shift && shift !== currentText().shiftMissing);

  const joinWords = words.length > 0 ? words.map((word) => `« ${word} »`).join(", ") : currentText().none;
  const phraseTail =
    phrases.length > 0
      ? {
          fr: ` Les phrases retenues gardent encore ceci: ${phrases.join(" / ")}.`,
          de: ` Die entstandenen Sätze tragen dies weiter: ${phrases.join(" / ")}.`,
          en: ` The return phrases keep carrying this forward: ${phrases.join(" / ")}.`,
        }
      : {
          fr: "",
          de: "",
          en: "",
        };
  const shiftTail =
    shifts.length > 0
      ? {
          fr: ` Les retours du regard sont restés ${shifts.join(", ")}.`,
          de: ` Die Rückkehrbewegungen des Blicks blieben ${shifts.join(", ")}.`,
          en: ` The returns of the gaze remained ${shifts.join(", ")}.`,
        }
      : {
          fr: "",
          de: "",
          en: "",
        };

  if (state.language === "fr") {
    return `Du presque invisible de l’œuvre 3 à la réserve de l’œuvre 1, puis aux voisinages de couleur de l’œuvre 2, le parcours a déplacé l’attention par étapes. Les mots retenus, ${joinWords}, gardent une même ligne: attendre, sentir un contrepoids, puis laisser la couleur agir.${phraseTail.fr}${shiftTail.fr}`;
  }

  if (state.language === "de") {
    return `Vom Fast-Unsichtbaren in Werk 3 über die Reserve in Werk 1 bis zu den Farbnachbarschaften von Werk 2 hat der Parcours die Aufmerksamkeit schrittweise verschoben. Die gewählten Wörter, ${joinWords}, halten eine gemeinsame Linie: warten, ein Gegengewicht spüren und dann die Farbe wirken lassen.${phraseTail.de}${shiftTail.de}`;
  }

  return `From the almost invisible marks of artwork 3 to the reserve of artwork 1, then to the color neighborhoods of artwork 2, the path shifted attention step by step. The chosen words, ${joinWords}, keep one line of looking: wait, feel a counterweight, then let color act.${phraseTail.en}${shiftTail.en}`;
}

function buildSummaryText(record = activeMediatorRecord()) {
  const text = currentText();
  if (!record) return "";

  return [
    `${text.summarySessionId}: ${record.sessionId}`,
    `${text.summaryLanguage}: ${record.language}`,
    `${text.summaryGuidedMode}: ${record.guidedMode ? text.yes : text.no}`,
    `${text.summaryPathStep}: ${record.guidedPathStep || text.none}`,
    `${text.summaryVisitedArtworks}: ${record.guidedVisitedArtworks || text.none}`,
    `${text.summaryCompletedArtworks}: ${record.guidedCompletedArtworks || text.none}`,
    `${text.summaryArtwork}: ${
      record.artworkNumber != null
        ? `${record.artworkNumber}${record.artworkLabel ? ` · ${record.artworkLabel}` : ""}`
        : text.none
    }`,
    `${text.summaryInteraction}: ${record.gestureLabel || text.none}`,
    `${text.summaryInteractionCompleted}: ${record.interactionCompleted ? text.yes : text.no}`,
    `${text.summaryInteractionDuration}: ${record.interactionDurationFormatted || text.none}`,
    `${text.summaryRegionsCrossed}: ${
      record.squareRegionsCrossed != null ? String(record.squareRegionsCrossed) : text.none
    }`,
    `${text.summaryHighestStillness}: ${
      record.highestStillness != null ? `${Math.round(record.highestStillness * 100)}%` : text.none
    }`,
    `${text.summaryWord}: ${record.word || text.none}`,
    `${text.summaryDuration}: ${record.durationFormatted}`,
    `${text.summaryTouches}: ${record.touches}`,
    `${text.summaryGaze}: ${record.gazeStatus || text.gazeNotMarked}`,
    `${text.summaryPointA}: ${formatPointText(record.beforePoint)}`,
    `${text.summaryPointB}: ${formatPointText(record.afterPoint)}`,
    `${text.summaryShift}: ${record.gazeInterpretation || text.gazeNotMarked}`,
    `${text.summaryFinalPhrase}: ${record.finalPhrase || text.none}`,
    `${text.summaryReturned}: ${record.usedReturnToArtwork ? text.yes : text.no}`,
    `${text.summaryRestarted}: ${record.restartedExperience ? text.yes : text.no}`,
    `${text.summaryAnotherArtwork}: ${record.choseAnotherArtwork ? text.yes : text.no}`,
    `${text.summaryGuidedSynthesis}: ${record.guidedFinalSynthesis || text.none}`,
    `${text.summaryInterpretation}: ${record.interpretation || text.none}`,
  ].join("\n");
}

function setSummaryNotice(message) {
  state.summaryNotice = message;
  state.uiDirty = true;

  if (summaryNoticeTimer) {
    clearTimeout(summaryNoticeTimer);
  }

  summaryNoticeTimer = window.setTimeout(() => {
    state.summaryNotice = "";
    state.uiDirty = true;
  }, 2600);
}

async function copySummaryToClipboard() {
  const text = currentText();
  const summary = buildSummaryText();
  if (!summary) return;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(summary);
    } else {
      const field = document.createElement("textarea");
      field.value = summary;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setSummaryNotice(text.copiedNotice);
  } catch (error) {
    setSummaryNotice(text.copyFailedNotice);
  }
}

function downloadSummaryJson() {
  const text = currentText();
  const record = activeMediatorRecord();
  if (!record) return;

  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${record.sessionId.toLowerCase()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setSummaryNotice(text.downloadedNotice);
}

function phaseMeta() {
  const text = currentText();
  const artwork = currentArtwork();
  const interaction = currentInteraction();
  const introSlide = currentGuidedIntroSlide();

  if (state.phase === "start") {
    return {
      progress: 1,
      step: text.startStep,
      title: text.startTitle,
      copy: text.startCopy,
      hint: text.startHint,
    };
  }

  if (state.phase === "guided-intro") {
    return {
      progress: 1,
      step: `${text.guidedIntroStep} ${state.guidedIntroIndex + 1}/${GUIDED_INTRO[state.language].length}`,
      title: introSlide.title,
      copy: introSlide.copy,
      hint: introSlide.hint,
    };
  }

  if (state.phase === "choose-artwork") {
    return {
      progress: 2,
      step: text.chooseArtworkStep,
      title: text.chooseArtworkTitle,
      copy: text.chooseArtworkCopy,
      hint: text.chooseArtworkHint,
    };
  }

  if (state.phase === "observe") {
    return {
      progress: 3,
      step: text.observeStep,
      title: artwork ? artwork.title[state.language] : text.observeTitle,
      copy: artworkObserveCopy(),
      hint: text.observeHint,
    };
  }

  if (state.phase === "choose-interaction") {
    return {
      progress: 4,
      step: text.interactStep,
      title: artwork ? artwork.title[state.language] : text.chooseInteractionTitle,
      copy: text.chooseInteractionCopy,
      hint: text.chooseInteractionHint,
    };
  }

  if (state.phase === "interact") {
    return {
      progress: 4,
      step: text.interactStep,
      title: interaction ? interaction.label[state.language] : text.chooseInteractionTitle,
      copy: interaction ? text[interaction.hintKey] : text.chooseInteractionCopy,
      hint: interaction && state.interactionCompleted ? state.interactionCompletionMessage : "",
    };
  }

  if (state.phase === "choose-word") {
    return {
      progress: 5,
      step: text.chooseWordStep,
      title: text.chooseWordTitle,
      copy: text.chooseWordCopy,
      hint: text.chooseWordHint,
    };
  }

  if (state.phase === "final-phrase") {
    return {
      progress: 6,
      step: text.finalStep,
      title: text.finalTitle,
      copy: text.finalCopy,
      hint: text.finalHint,
    };
  }

  if (state.phase === "silent-return") {
    return {
      progress: 7,
      step: text.returnStep,
      title: text.returnTitle,
      copy: text.returnCopy,
      hint: text.returnHint,
    };
  }

  if (state.phase === "guided-synthesis") {
    return {
      progress: 7,
      step: text.returnStep,
      title: text.guidedSynthesisTitle,
      copy: state.guidedFinalSynthesis || text.guidedSynthesisCopy,
      hint: text.guidedSynthesisHint,
    };
  }

  if (isGuidedJourneyActive() && hasNextGuidedArtwork()) {
    const nextArtwork = ARTWORKS[GUIDED_PATH[state.guidedPathStep + 1]];
    return {
      progress: 7,
      step: text.returnStep,
      title: text.guidedTransitionTitle,
      copy: `${artworkAfterReturnCopy()} ${text.continueNextArtworkCopy} ${nextArtwork.label[state.language]}.`,
      hint: text.guidedTransitionHint,
    };
  }

  return {
    progress: 7,
    step: text.returnStep,
    title: text.afterReturnTitle,
    copy: artworkAfterReturnCopy(),
    hint: text.afterReturnHint,
  };
}

function artworkAfterReturnCopy() {
  const artwork = currentArtwork();
  const text = currentText();

  if (!artwork) return text.afterReturnCopy;

  if (state.language === "fr") {
    if (artwork.id === "work-1") {
      return "Regardez encore où la réserve pâle respire et où la masse tient encore.";
    }
    if (artwork.id === "work-2") {
      return "Regardez encore comment le voisinage change, alors que le carré reste fixe.";
    }
    return "Regardez encore ce qui apparaît presque sans se montrer.";
  }

  if (state.language === "de") {
    if (artwork.id === "work-1") {
      return "Schauen Sie noch einmal, wo die helle Reserve atmet und wo die Masse noch hält.";
    }
    if (artwork.id === "work-2") {
      return "Schauen Sie noch einmal, wie sich das Umfeld verändert, während das Quadrat gleich bleibt.";
    }
    return "Schauen Sie noch einmal auf das, was fast erscheint, ohne sich ganz zu zeigen.";
  }

  if (artwork.id === "work-1") {
    return "Look again for where the pale reserve breathes and where the mass still holds.";
  }
  if (artwork.id === "work-2") {
    return "Look again at how the surroundings change while the square stays the same.";
  }
  return "Look again for what appears almost without showing itself.";
}

function artworkObserveCopy() {
  const artwork = currentArtwork();
  const text = currentText();

  if (!artwork) return text.observeCopy;

  if (state.language === "fr") {
    if (artwork.id === "work-1") {
      return "Laissez d’abord venir la réserve pâle, les voiles et la masse plus dense.";
    }
    if (artwork.id === "work-2") {
      return "Laissez d’abord les voisinages de couleur, la chaleur et les densités se poser.";
    }
    return "Laissez d’abord apparaître les traces les plus discrètes, presque effacées.";
  }

  if (state.language === "de") {
    if (artwork.id === "work-1") {
      return "Lassen Sie zuerst die helle Reserve, die Schleier und die dichtere Masse hervortreten.";
    }
    if (artwork.id === "work-2") {
      return "Lassen Sie zuerst Farbnachbarschaft, Wärme und Dichte sich setzen.";
    }
    return "Lassen Sie zuerst die leisesten, fast ausgelöschten Spuren erscheinen.";
  }

  if (artwork.id === "work-1") {
    return "Let the pale reserve, the veils, and the denser mass come forward first.";
  }
  if (artwork.id === "work-2") {
    return "Let the color neighborhoods, warmth, and densities settle first.";
  }
  return "Let the faintest, almost erased traces appear first.";
}

function cycleLanguage() {
  const order = ["fr", "de", "en"];
  const currentIndex = order.indexOf(state.language);
  state.language = order[(currentIndex + 1) % order.length];
  requestUiRender();
}

function canMarkLooking() {
  return (
    currentArtwork() &&
    !["start", "guided-intro", "choose-artwork", "final-phrase", "silent-return", "guided-synthesis"].includes(
      state.phase,
    )
  );
}

function toggleGazePanel() {
  if (!canMarkLooking()) return;
  state.gazePanelOpen = !state.gazePanelOpen;
  if (state.gazePanelOpen) {
    state.sheetScrollToBottomPending = true;
  }
  if (!state.gazePanelOpen) {
    state.pendingMark = null;
  }
  requestUiRender();
}

function closeGazePanel() {
  state.gazePanelOpen = false;
  state.pendingMark = null;
  requestUiRender();
}

function armPendingMark(kind) {
  if (!currentArtwork()) return;
  state.gazePanelOpen = true;
  state.pendingMark = state.pendingMark === kind ? null : kind;
  state.sheetScrollToBottomPending = true;
  requestUiRender();
}

function restartGazeMarking() {
  state.beforePoint = null;
  state.afterPoint = null;
  state.gazePanelOpen = true;
  state.pendingMark = "before";
  state.sheetScrollToBottomPending = true;
  requestUiRender();
}

function updateSquareRegionPulse() {
  if (state.squareRegionPulse <= 0) return;
  const decay = state.reducedMotion ? 0.14 : 0.06;
  state.squareRegionPulse = max(0, state.squareRegionPulse - decay);
}

function updateInteractionCuePulse() {
  if (state.interactionCuePulse <= 0) return;
  const decay = state.reducedMotion ? 0.12 : 0.045;
  state.interactionCuePulse = max(0, state.interactionCuePulse - decay);
}

function rememberSquareComparisonPoint(point, regionKey) {
  if (!point || !regionKey || regionKey === "field") return;

  const existingIndex = state.squareComparisonPoints.findIndex(
    (entry) => entry.regionKey === regionKey,
  );
  if (existingIndex !== -1) return;

  const nextEntry = {
    point: { x: point.x, y: point.y },
    regionKey,
    baseline: false,
  };

  if (state.squareComparisonPoints.length < 2) {
    state.squareComparisonPoints.push(nextEntry);
  } else if (state.squareComparisonPoints[0]?.baseline) {
    state.squareComparisonPoints = [state.squareComparisonPoints[0], nextEntry];
  } else {
    state.squareComparisonPoints = [state.squareComparisonPoints[1], nextEntry];
  }

  state.uiDirty = true;
}

function updateInteractionCompletionModel() {
  updateInteractionCuePulse();

  if (state.phase !== "interact") return;

  const interaction = currentInteraction();
  if (!interaction) return;

  if (interaction.id === "layers" || interaction.id === "veil") {
    if (state.pointerDown && state.artTouchPoint) {
      state.artworkOneCharge = min(1, state.artworkOneCharge + (state.reducedMotion ? 0.012 : 0.018));
      if (state.artworkOneCharge > 0.16) {
        state.interactionEvidence = true;
      }
    } else {
      state.artworkOneCharge = max(0, state.artworkOneCharge - 0.006);
    }

    if (state.artworkOneCharge >= 1) {
      completeInteraction(interactionCompletionCopy(interaction.id));
    }
    return;
  }

  if (interaction.id === "square") {
    if (state.squareVisitedRegions.length >= 3) {
      completeInteraction(interactionCompletionCopy(interaction.id));
    }
    return;
  }

  if (interaction.id === "path") {
    if (state.gazePath.length >= 4) {
      completeInteraction(interactionCompletionCopy(interaction.id));
    }
    return;
  }

  if (interaction.id === "slow") {
    state.highestStillness = max(state.highestStillness, state.stillness);
    if (state.highestStillness >= 0.78) {
      completeInteraction(interactionCompletionCopy(interaction.id));
    }
    return;
  }

  if (interaction.id === "trace" && state.tracePoints.length >= 12) {
    completeInteraction(interactionCompletionCopy(interaction.id));
  }
}

function focusInfluence(anchor, focus, spread = 0.34) {
  if (!focus) return 0;
  const dx = anchor.x - focus.x;
  const dy = anchor.y - focus.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return constrain(1 - distance / spread, 0, 1);
}

function moveSquareToPoint(point) {
  const nextPoint = {
    x: constrain(point.x, 0.08, 0.92),
    y: constrain(point.y, 0.08, 0.92),
  };

  state.square = nextPoint;
  state.squareHintDismissed = true;
  markInteractionContact();

  const nextRegion = getSquareRegion(nextPoint);
  if (nextRegion.key !== state.squareRegionKey) {
    state.squareRegionKey = nextRegion.key;
    state.squareRegionPulse = 1;
    rememberSquareComparisonPoint(nextPoint, nextRegion.key);
  }

  if (state.squareVisitedRegions.length === 0) {
    state.squareVisitedRegions.push(nextRegion.key);
  } else if (!state.squareVisitedRegions.includes(nextRegion.key)) {
    state.squareVisitedRegions.push(nextRegion.key);
    state.uiDirty = true;
  }
}

function getSquareRegion(point = state.square) {
  if (point.y < 0.28) {
    return { key: "light", aura: [225, 210, 162], glow: [255, 246, 225], captionAlpha: 0.72 };
  }

  if (point.x < 0.35 && point.y > 0.48) {
    return { key: "warm", aura: [176, 118, 82], glow: [230, 184, 153], captionAlpha: 0.8 };
  }

  if (point.x > 0.62 && point.y < 0.54) {
    return { key: "cool", aura: [103, 138, 175], glow: [189, 214, 233], captionAlpha: 0.84 };
  }

  if (point.y > 0.62) {
    return { key: "deep", aura: [88, 54, 68], glow: [167, 124, 148], captionAlpha: 0.9 };
  }

  return { key: "field", aura: [156, 132, 108], glow: [221, 200, 180], captionAlpha: 0.76 };
}

function handleControlClick(event) {
  const current = event.currentTarget;
  const target = event.target;
  const button =
    current instanceof Element && current.hasAttribute("data-action")
      ? current
      : target instanceof Element
        ? target.closest("[data-action]")
        : null;
  if (!button || button.classList.contains("is-disabled")) return;

  event.preventDefault();

  switch (button.dataset.action) {
    case "mark-before":
      armPendingMark("before");
      break;
    case "toggle-gaze-panel":
      toggleGazePanel();
      break;
    case "mark-after":
      armPendingMark("after");
      break;
    case "restart-gaze":
      restartGazeMarking();
      break;
    case "close-gaze-panel":
      closeGazePanel();
      break;
    case "start-guided":
      beginGuidedJourney();
      break;
    case "start-free":
      beginFreeExploration();
      break;
    case "continue-guided-intro":
      continueGuidedIntro();
      break;
    case "begin-guided-path":
      startCurrentGuidedArtwork();
      break;
    case "leave-guided-path":
      leaveGuidedPath();
      break;
    case "continue-next-artwork":
      continueToNextGuidedArtwork();
      break;
    case "guided-explore-after":
      leaveGuidedPath();
      break;
    case "select-artwork":
      state.journeyMode = state.journeyMode || "free";
      startArtworkFlow(Number(button.dataset.artwork));
      break;
    case "select-interaction":
      startInteractionFlow(button.dataset.interaction);
      break;
    case "advance-word":
      if (!state.interactionCompleted) break;
      state.phase = "choose-word";
      break;
    case "select-word":
      state.selectedWordIndex = Number(button.dataset.wordIndex);
      break;
    case "generate-phrase":
      state.finalPhrase = buildFinalPhrase();
      state.phase = "final-phrase";
      break;
    case "open-summary":
      state.summaryOpen = true;
      break;
    case "close-summary":
      state.summaryOpen = false;
      break;
    case "return-to-artwork":
      state.usedReturnToArtwork = true;
      state.phase = "silent-return";
      state.silentReturnStartedAt = millis();
      scheduleSilentReturnCompletion();
      break;
    case "choose-another-word":
      state.finalPhrase = "";
      state.phase = "choose-word";
      break;
    case "choose-another-gesture":
      chooseAnotherGesture();
      break;
    case "choose-another-artwork":
      state.choseAnotherArtwork = true;
      state.lastCompletedRecord = {
        ...(activeMediatorRecord() || snapshotCurrentSession()),
        choseAnotherArtwork: true,
      };
      chooseAnotherArtwork();
      break;
    case "restart":
      state.restartedExperience = true;
      state.lastCompletedRecord = {
        ...(activeMediatorRecord() || snapshotCurrentSession()),
        restartedExperience: true,
      };
      restartExperience();
      break;
    case "copy-test-summary":
      copySummaryToClipboard();
      break;
    case "download-json":
      downloadSummaryJson();
      break;
    case "toggle-layer":
      toggleLayer(Number(button.dataset.layer));
      break;
    case "clear-path":
      state.gazePath = [];
      state.interactionCompleted = false;
      state.interactionCompletionAt = 0;
      state.interactionCompletionMessage = "";
      break;
    case "clear-trace":
      state.tracePoints = [];
      state.interactionCompleted = false;
      state.interactionCompletionAt = 0;
      state.interactionCompletionMessage = "";
      break;
    default:
      break;
  }

  requestUiRender();
}

function startArtworkFlow(index) {
  state.selectedArtwork = index;
  state.selectedInteraction = null;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.summaryOpen = false;
  clearGazeMarks();
  resetInteractionState();
  if (isGuidedJourneyActive() && !state.guidedVisitedArtworks.includes(index)) {
    state.guidedVisitedArtworks.push(index);
  }
  state.observeStartedAt = millis();
  state.phase = "observe";
  scheduleObservePhaseTransition();
  state.uiDirty = true;
}

function startInteractionFlow(interactionId) {
  state.selectedInteraction = interactionId;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.summaryOpen = false;
  state.gazePanelOpen = false;
  state.pendingMark = null;
  resetInteractionState();
  state.interactionStartedAt = millis();
  state.interactionCuePulse = 1;
  if (interactionId === "square") {
    state.squareVisitedRegions = [state.squareRegionKey];
    state.squareComparisonPoints = [
      {
        point: { ...DEFAULT_SQUARE },
        regionKey: state.squareRegionKey,
        baseline: true,
      },
    ];
  }
  state.phase = "interact";
  state.uiDirty = true;
}

function chooseAnotherGesture() {
  state.phase = "choose-interaction";
  state.selectedInteraction = null;
  state.selectedWordIndex = null;
  state.finalPhrase = "";
  state.gazePanelOpen = false;
  state.pendingMark = null;
  resetInteractionState();
  state.uiDirty = true;
}

function chooseAnotherArtwork() {
  state.summaryOpen = false;
  clearCurrentArtworkState();
  state.phase = "choose-artwork";
  state.uiDirty = true;
}

function restartExperience() {
  state.summaryOpen = false;
  resetGuidedJourneyState();
  state.phase = "start";
  clearCurrentArtworkState();
  state.uiDirty = true;
}

function clearGazeMarks() {
  state.gazePanelOpen = false;
  state.pendingMark = null;
  state.beforePoint = null;
  state.afterPoint = null;
}

function resetInteractionState() {
  state.interactionEvidence = false;
  state.interactionCompleted = false;
  state.interactionCompletionAt = 0;
  state.interactionCompletionMessage = "";
  state.interactionFirstTouchAt = 0;
  state.interactionCuePulse = 0;
  state.layers = [true, true, true, true];
  state.veilBalance = 0.5;
  state.artworkOneCharge = 0;
  state.square = { ...DEFAULT_SQUARE };
  state.squareDragging = false;
  state.squareHintDismissed = false;
  state.squareRegionKey = getSquareRegion(DEFAULT_SQUARE).key;
  state.squareRegionPulse = 0;
  state.squareVisitedRegions = [];
  state.squareComparisonPoints = [];
  state.gazePath = [];
  state.tracePoints = [];
  state.stillness = 0;
  state.highestStillness = 0;
  state.slowMovement = 0;
  state.slowFocusPoint = null;
  state.artTouchPoint = null;
}

function updateTimedFlow() {
  if (state.phase === "observe" && millis() - state.observeStartedAt >= state.observeDuration) {
    advanceObservePhase();
  }

  if (
    state.phase === "silent-return" &&
    millis() - state.silentReturnStartedAt >= state.silentReturnDuration
  ) {
    completeSilentReturnPhase();
  }
}

function updateStillnessModel() {
  if (state.phase !== "interact" || state.selectedInteraction !== "slow") {
    state.stillness = max(0, state.stillness - 0.018);
    state.slowMovement *= 0.82;
    return;
  }

  if (!state.pointerDown) {
    state.stillness = max(0, state.stillness - 0.006);
    state.slowMovement *= 0.76;
    return;
  }

  const dx = state.pointer.x - state.lastPointer.x;
  const dy = state.pointer.y - state.lastPointer.y;
  const movement = Math.sqrt(dx * dx + dy * dy);
  state.slowMovement = state.slowMovement * 0.68 + movement * 0.32;

  if (movement < 1.7) {
    state.stillness = min(1, state.stillness + 0.016);
    if (state.stillness > 0.24) state.interactionEvidence = true;
  } else {
    state.stillness = max(0, state.stillness - movement * 0.0036);
  }

  state.lastPointer.x = state.pointer.x;
  state.lastPointer.y = state.pointer.y;
}

function drawBackgroundField() {
  background(242, 237, 229);

  const drift = state.reducedMotion ? 0 : Math.sin(frameCount * 0.006) * 16;
  noStroke();

  fill(255, 255, 255, 40);
  rect(width * 0.08, height * 0.08, width * 0.44, height * 0.15, 28);
  fill(255, 249, 243, 58);
  rect(width * 0.56 + drift * 0.08, height * 0.12, width * 0.24, height * 0.12, 22);
  fill(245, 238, 229, 120);
  rect(width * 0.18 - drift * 0.04, height * 0.31, width * 0.22, height * 0.095, 18);

  stroke(92, 80, 67, 12);
  strokeWeight(1);
  line(width * 0.08, height * 0.24, width * 0.46, height * 0.24);
  line(width * 0.56, height * 0.275, width * 0.86, height * 0.275);
  line(width * 0.22, height * 0.415, width * 0.62, height * 0.415);
}

function drawStartScreen() {
  drawHeroTriptych(getHeroTriptychLayout("start"), {
    muted: true,
    showLabels: false,
  });
}

function drawArtworkChoiceScreen() {
  drawHeroTriptych(getHeroTriptychLayout("choose-artwork"), {
    muted: false,
    showLabels: true,
  });
}

function getHeroTriptychLayout(mode) {
  const gap = min(width * 0.025, 14);
  const sideMargin = mode === "choose-artwork" ? width * 0.07 : width * 0.12;
  const triptychWidth = width - sideMargin * 2;
  const triptychHeight = mode === "choose-artwork" ? min(height * 0.3, 260) : min(height * 0.22, 210);
  const x = sideMargin;
  const y = mode === "choose-artwork" ? min(height * 0.16, 126) : min(height * 0.18, 144);
  const thumbWidth = (triptychWidth - gap * 2) / 3;
  return { x, y, w: triptychWidth, h: triptychHeight, gap, thumbWidth };
}

function drawHeroTriptych(layout, options = {}) {
  const { muted = false, showLabels = true } = options;

  for (let index = 0; index < ARTWORKS.length; index += 1) {
    const thumbX = layout.x + index * (layout.thumbWidth + layout.gap);
    drawMountedFrame(thumbX, layout.y, layout.thumbWidth, layout.h, 18, min(layout.thumbWidth * 0.06, 8));
    drawImageCover(artworkImages[index], thumbX, layout.y, layout.thumbWidth, layout.h, 18);

    if (muted) {
      noStroke();
      fill(247, 243, 236, 82);
      rect(thumbX, layout.y, layout.thumbWidth, layout.h, 18);
    }

    noFill();
    stroke(255, 255, 255, 120);
    strokeWeight(1);
    rect(thumbX + 1.5, layout.y + 1.5, layout.thumbWidth - 3, layout.h - 3, 17);
    stroke(44, 36, 28, 34);
    strokeWeight(1);
    rect(thumbX, layout.y, layout.thumbWidth, layout.h, 18);

    if (showLabels) {
      noStroke();
      fill(251, 248, 242, 236);
      rect(thumbX + 10, layout.y + 12, min(layout.thumbWidth - 20, 74), 24, 999);
      fill(23, 20, 17);
      textAlign(CENTER, CENTER);
      textSize(11.5);
      text(
        ARTWORKS[index].label[state.language],
        thumbX + min(layout.thumbWidth - 20, 74) / 2 + 10,
        layout.y + 24,
      );
    }
  }
}

function getArtworkChoiceHit(px, py) {
  const layout = getHeroTriptychLayout("choose-artwork");
  if (py < layout.y || py > layout.y + layout.h) return null;

  for (let index = 0; index < ARTWORKS.length; index += 1) {
    const thumbX = layout.x + index * (layout.thumbWidth + layout.gap);
    if (px >= thumbX && px <= thumbX + layout.thumbWidth) {
      return index;
    }
  }

  return null;
}

function drawArtworkView() {
  const artwork = currentArtwork();
  if (!artwork) return;

  const artRect = getArtworkRect();
  const image = artworkImages[state.selectedArtwork];
  drawMountedFrame(artRect.x, artRect.y, artRect.w, artRect.h, 18, min(width * 0.03, 13));

  if (state.selectedInteraction === "slow" && state.phase === "interact") {
    drawSlowLookingArtwork(image, artRect);
  } else {
    drawImageContain(image, artRect.x, artRect.y, artRect.w, artRect.h);
  }

  if (state.selectedInteraction === "layers") drawLayerInteraction(artRect);
  if (state.selectedInteraction === "veil") drawVeilInteraction(artRect);
  if (state.selectedInteraction === "square") drawSquareInteraction(artRect);
  if (state.selectedInteraction === "path") drawPathInteraction(artRect);
  if (state.selectedInteraction === "trace") drawTraceInteraction(artRect);
  drawInteractionCue(artRect);
  drawInteractionCompletionWhisper(artRect);

  noFill();
  stroke(255, 255, 255, 130);
  strokeWeight(1);
  rect(artRect.x + 1.5, artRect.y + 1.5, artRect.w - 3, artRect.h - 3, 17);
  stroke(32, 28, 23, 36);
  strokeWeight(1);
  rect(artRect.x, artRect.y, artRect.w, artRect.h, 18);
}

function drawMountedFrame(x, y, w, h, radius, pad) {
  const frameX = x - pad;
  const frameY = y - pad;
  const frameW = w + pad * 2;
  const frameH = h + pad * 2;

  push();
  drawingContext.save();
  drawingContext.shadowColor = "rgba(43, 34, 27, 0.08)";
  drawingContext.shadowBlur = 24;
  drawingContext.shadowOffsetY = 10;
  noStroke();
  fill(252, 249, 244, 246);
  rect(frameX, frameY, frameW, frameH, radius + 7);
  drawingContext.restore();

  noFill();
  stroke(255, 255, 255, 135);
  strokeWeight(1);
  rect(frameX + 2, frameY + 2, frameW - 4, frameH - 4, radius + 6);
  stroke(45, 38, 28, 22);
  rect(frameX, frameY, frameW, frameH, radius + 7);
  pop();
}

function drawObservationOverlay() {
  const remaining = max(0, state.observeDuration - (millis() - state.observeStartedAt));
  const progress = 1 - remaining / state.observeDuration;
  drawOverlayCard(
    currentText().observeTitle,
    `${currentText().observationCountdown} · ${max(1, Math.ceil(remaining / 1000))}s`,
    progress,
  );
}

function drawSilentReturnOverlay() {
  const remaining = max(0, state.silentReturnDuration - (millis() - state.silentReturnStartedAt));
  const progress = 1 - remaining / state.silentReturnDuration;
  drawOverlayCard(
    currentText().returnTitle,
    `${currentText().returnCountdown} · ${max(1, Math.ceil(remaining / 1000))}s`,
    progress,
    true,
  );
}

function drawOverlayCard(title, subtitle, progress, closing = false) {
  const cardWidth = closing ? min(width * 0.76, 320) : min(width * 0.68, 300);
  const cardHeight = closing ? 84 : 78;
  const x = (width - cardWidth) / 2;
  const y = closing ? min(height * 0.16, 126) : min(height * 0.14, 112);

  push();
  drawingContext.save();
  drawingContext.shadowColor = closing ? "rgba(43, 34, 27, 0.045)" : "rgba(43, 34, 27, 0.06)";
  drawingContext.shadowBlur = closing ? 16 : 20;
  drawingContext.shadowOffsetY = closing ? 6 : 8;
  noStroke();
  fill(252, 249, 244, closing ? 242 : 234);
  rect(x, y, cardWidth, cardHeight, 18);
  drawingContext.restore();

  noFill();
  stroke(255, 255, 255, closing ? 138 : 120);
  strokeWeight(1);
  rect(x + 1.5, y + 1.5, cardWidth - 3, cardHeight - 3, 17);
  stroke(44, 36, 28, closing ? 20 : 28);
  rect(x, y, cardWidth, cardHeight, 18);

  fill(23, 20, 17);
  textAlign(CENTER, TOP);
  textSize(closing ? 13.6 : 14.5);
  text(title, x + cardWidth / 2, y + (closing ? 11 : 12));

  fill(89, 82, 71);
  textSize(closing ? 11.4 : 12);
  text(subtitle, x + cardWidth / 2, y + (closing ? 33 : 35));

  const noteCount = 5;
  const noteGap = 10;
  const noteWidth = (cardWidth - 76 - noteGap * (noteCount - 1)) / noteCount;
  const noteHeights = [5, 11, 7, 13, 6];
  const activeCount = constrain(progress, 0, 1) * noteCount;

  noStroke();
  for (let i = 0; i < noteCount; i += 1) {
    const noteX = x + 38 + i * (noteWidth + noteGap);
    const noteH = closing ? max(4, noteHeights[i] - 1) : noteHeights[i];
    const noteY = y + cardHeight - (closing ? 13 : 14) - noteH;
    fill(i < activeCount ? color(106, 40, 52, closing ? 144 : 175) : color(60, 51, 40, closing ? 24 : 34));
    rect(noteX, noteY, noteWidth, noteH, 999);
  }
  pop();
}

function drawInteractionCue(artRect) {
  if (state.phase !== "interact") return;

  const interaction = currentInteraction();
  if (!interaction) return;

  const cueStrength = state.interactionEvidence ? 0.22 + state.interactionCuePulse * 0.18 : 0.68 + state.interactionCuePulse * 0.28;
  const drift = state.reducedMotion ? 0 : (Math.sin(frameCount * 0.06) + 1) * 0.5;

  push();
  if (interaction.id === "layers" || interaction.id === "veil") {
    if (interaction.id === "layers") {
      noStroke();
      fill(255, 252, 247, 20 * cueStrength);
      ellipse(
        artRect.x + artRect.w * 0.5,
        artRect.y + artRect.h * 0.48,
        artRect.w * 0.42,
        artRect.h * (0.52 + drift * 0.06),
      );
    }

    noFill();
    stroke(255, 252, 247, 54 * cueStrength);
    strokeWeight(1.6);
    const seamX = artRect.x + artRect.w * (interaction.id === "veil" ? state.veilBalance : 0.54);
    line(seamX, artRect.y + 20, seamX, artRect.y + artRect.h - 20);
    stroke(107, 36, 50, 44 * cueStrength);
    circle(seamX, artRect.y + artRect.h * (0.44 + drift * 0.08), 54 + drift * 18);
    if (interaction.id === "layers") {
      noFill();
      stroke(107, 36, 50, 28 * cueStrength);
      circle(artRect.x + artRect.w * 0.44, artRect.y + artRect.h * 0.75, 44 + drift * 14);
    }

    if (!state.interactionEvidence) {
      drawCanvasHintBubble(
        seamX,
        artRect.y + 28,
        interaction.id === "veil" ? currentText().veilCanvasHint : currentText().layersCanvasHint,
        166,
      );
    }
  }

  if (interaction.id === "square") {
    const point = denormalizeArtPoint(state.square, artRect);
    noFill();
    stroke(107, 36, 50, 56 * cueStrength);
    strokeWeight(1.8);
    circle(point.x, point.y, 120 + drift * 18);
    stroke(255, 252, 247, 78 * cueStrength);
    circle(point.x, point.y, 98 + drift * 10);
  }

  if (interaction.id === "slow") {
    const cx = artRect.x + artRect.w * 0.5;
    const cy = artRect.y + artRect.h * 0.52;
    noFill();
    stroke(255, 252, 247, 76 * cueStrength);
    strokeWeight(1.6);
    circle(cx, cy, 54 + drift * 16);
    stroke(107, 36, 50, 44 * cueStrength);
    circle(cx, cy, 96 + drift * 18);

    if (!state.interactionEvidence) {
      drawCanvasHintBubble(cx, artRect.y + 26, currentText().slowCanvasHint, 176);
    } else if (state.pointerDown && state.slowMovement > 4.2) {
      drawCanvasHintBubble(cx, artRect.y + 26, currentText().slowTooFast, 176);
    }
  }

  if (interaction.id === "path") {
    noFill();
    stroke(107, 36, 50, 38 * cueStrength);
    strokeWeight(1.6);
    beginShape();
    curveVertex(artRect.x + artRect.w * 0.22, artRect.y + artRect.h * 0.32);
    curveVertex(artRect.x + artRect.w * 0.22, artRect.y + artRect.h * 0.32);
    curveVertex(artRect.x + artRect.w * 0.34, artRect.y + artRect.h * 0.42);
    curveVertex(artRect.x + artRect.w * 0.54, artRect.y + artRect.h * 0.52);
    curveVertex(artRect.x + artRect.w * 0.72, artRect.y + artRect.h * 0.64);
    curveVertex(artRect.x + artRect.w * 0.72, artRect.y + artRect.h * 0.64);
    endShape();
  }

  if (interaction.id === "trace") {
    noFill();
    stroke(65, 111, 98, 40 * cueStrength);
    strokeWeight(1.8);
    beginShape();
    curveVertex(artRect.x + artRect.w * 0.24, artRect.y + artRect.h * 0.68);
    curveVertex(artRect.x + artRect.w * 0.24, artRect.y + artRect.h * 0.68);
    curveVertex(artRect.x + artRect.w * 0.34, artRect.y + artRect.h * 0.63);
    curveVertex(artRect.x + artRect.w * 0.46, artRect.y + artRect.h * 0.58);
    curveVertex(artRect.x + artRect.w * 0.56, artRect.y + artRect.h * 0.5);
    curveVertex(artRect.x + artRect.w * 0.66, artRect.y + artRect.h * 0.4);
    curveVertex(artRect.x + artRect.w * 0.66, artRect.y + artRect.h * 0.4);
    endShape();

    if (!state.interactionEvidence) {
      drawCanvasHintBubble(
        artRect.x + artRect.w * 0.48,
        artRect.y + artRect.h * 0.7,
        currentText().traceCanvasHint,
        110,
      );
    }
  }
  pop();
}

function drawCanvasHintBubble(cx, y, label, maxWidth = 160) {
  const bubbleWidth = min(maxWidth, width * 0.56);
  const x = constrain(cx - bubbleWidth / 2, 18, width - bubbleWidth - 18);

  noStroke();
  fill(255, 252, 247, 228);
  rect(x, y, bubbleWidth, 28, 999);
  fill(23, 20, 17, 220);
  textAlign(CENTER, CENTER);
  textSize(11.5);
  text(label, x + bubbleWidth / 2, y + 14);
}

function drawInteractionCompletionWhisper(artRect) {
  if (!state.interactionCompleted || !state.interactionCompletionAt) return;

  const elapsed = millis() - state.interactionCompletionAt;
  if (elapsed > 2600) return;

  const fade = 1 - elapsed / 2600;
  const widthLimit = min(artRect.w - 24, 286);
  const x = artRect.x + (artRect.w - widthLimit) / 2;
  const y = artRect.y + 16;

  push();
  noStroke();
  fill(252, 249, 244, 194 * fade);
  rect(x, y, widthLimit, 42, 18);
  fill(23, 20, 17, 210 * fade);
  textAlign(LEFT, TOP);
  textSize(11.5);
  text(state.interactionCompletionMessage, x + 12, y + 9, widthLimit - 24, 26);
  pop();
}

function drawSlowLookingArtwork(image, artRect) {
  const reveal = constrain(state.stillness, 0, 1);
  const fadeBack = 1 - reveal;
  const fastFactor = constrain(map(state.slowMovement, 1.8, 11.5, 0, 1), 0, 1);
  const scale = map(reveal, 0, 1, 0.952, 1.004) - fastFactor * 0.018;
  const drawW = artRect.w * scale;
  const drawH = artRect.h * scale;
  const drawX = artRect.x + (artRect.w - drawW) / 2;
  const drawY = artRect.y + (artRect.h - drawH) / 2;

  push();
  tint(255, map(reveal, 0, 1, 106, 255) - fastFactor * 34);
  drawImageContain(image, drawX, drawY, drawW, drawH);
  pop();

  noStroke();
  fill(247, 243, 236, map(reveal, 0, 1, 178, 8) + fastFactor * 42);
  rect(artRect.x, artRect.y, artRect.w, artRect.h, 18);

  if (state.pointerDown && reveal < 0.32) {
    fill(247, 243, 236, 28 + fadeBack * 36);
    rect(artRect.x, artRect.y, artRect.w, artRect.h, 18);
  }

  if (!state.interactionEvidence) {
    noFill();
    stroke(255, 252, 247, 108);
    strokeWeight(1.4);
    circle(artRect.x + artRect.w * 0.5, artRect.y + artRect.h * 0.52, 60);
    stroke(107, 36, 50, 38);
    circle(artRect.x + artRect.w * 0.5, artRect.y + artRect.h * 0.52, 102);
  }

  if (reveal > 0.08) {
    drawSlowTraceReveals(artRect, reveal);
  }

  if (state.slowFocusPoint) {
    const pixel = denormalizeArtPoint(state.slowFocusPoint, artRect);
    noStroke();
    fill(255, 252, 247, 18 + reveal * 26);
    ellipse(pixel.x, pixel.y, 42 + reveal * 18, 42 + reveal * 18);
    noFill();
    stroke(255, 250, 242, 74 + reveal * 86);
    strokeWeight(2);
    circle(pixel.x, pixel.y, 42 + reveal * 24 - fastFactor * 10);
    stroke(107, 36, 50, 20 + reveal * 58);
    circle(pixel.x, pixel.y, 82 + reveal * 28 - fastFactor * 12);
    stroke(255, 252, 247, 18 + fadeBack * 36 + fastFactor * 18);
    circle(pixel.x, pixel.y, 116 + fadeBack * 24 + fastFactor * 12);
  }

  noStroke();
  fill(255, 252, 247, 204);
  rect(artRect.x + 12, artRect.y + 12, 72, 22, 999);
  fill(23, 20, 17, 216);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(currentText().slowWaitPole, artRect.x + 48, artRect.y + 23);

  if (reveal > 0.34) {
    fill(255, 252, 247, 212);
    rect(artRect.x + artRect.w - 84, artRect.y + 12, 72, 22, 999);
    fill(23, 20, 17, 216);
    text(currentText().slowTracePole, artRect.x + artRect.w - 48, artRect.y + 23);
  }

  noStroke();
  fill(255, 255, 255, 226);
  rect(artRect.x + 18, artRect.y + 18, artRect.w - 36, 10, 999);
  fill(107, 36, 50, 118);
  rect(artRect.x + 18, artRect.y + 18, (artRect.w - 36) * reveal, 10, 999);
}

function drawSlowTraceReveals(artRect, reveal) {
  const alpha = map(reveal, 0.08, 1, 0, 118);
  if (alpha <= 0) return;

  noFill();
  strokeWeight(1.8);
  stroke(255, 252, 247, alpha * 0.65);
  beginShape();
  curveVertex(artRect.x + artRect.w * 0.22, artRect.y + artRect.h * 0.24);
  curveVertex(artRect.x + artRect.w * 0.22, artRect.y + artRect.h * 0.24);
  curveVertex(artRect.x + artRect.w * 0.34, artRect.y + artRect.h * 0.31);
  curveVertex(artRect.x + artRect.w * 0.48, artRect.y + artRect.h * 0.42);
  curveVertex(artRect.x + artRect.w * 0.58, artRect.y + artRect.h * 0.56);
  curveVertex(artRect.x + artRect.w * 0.71, artRect.y + artRect.h * 0.63);
  curveVertex(artRect.x + artRect.w * 0.71, artRect.y + artRect.h * 0.63);
  endShape();

  stroke(107, 36, 50, alpha * 0.42);
  beginShape();
  curveVertex(artRect.x + artRect.w * 0.28, artRect.y + artRect.h * 0.72);
  curveVertex(artRect.x + artRect.w * 0.28, artRect.y + artRect.h * 0.72);
  curveVertex(artRect.x + artRect.w * 0.4, artRect.y + artRect.h * 0.66);
  curveVertex(artRect.x + artRect.w * 0.5, artRect.y + artRect.h * 0.58);
  curveVertex(artRect.x + artRect.w * 0.6, artRect.y + artRect.h * 0.48);
  curveVertex(artRect.x + artRect.w * 0.68, artRect.y + artRect.h * 0.34);
  curveVertex(artRect.x + artRect.w * 0.68, artRect.y + artRect.h * 0.34);
  endShape();

  if (reveal > 0.42) {
    stroke(255, 252, 247, alpha * 0.34);
    strokeWeight(1.1);
    line(
      artRect.x + artRect.w * 0.43,
      artRect.y + artRect.h * 0.18,
      artRect.x + artRect.w * 0.52,
      artRect.y + artRect.h * 0.32,
    );
    line(
      artRect.x + artRect.w * 0.58,
      artRect.y + artRect.h * 0.24,
      artRect.x + artRect.w * 0.66,
      artRect.y + artRect.h * 0.42,
    );
  }

  if (reveal > 0.66) {
    stroke(107, 36, 50, alpha * 0.26);
    strokeWeight(1);
    line(
      artRect.x + artRect.w * 0.3,
      artRect.y + artRect.h * 0.58,
      artRect.x + artRect.w * 0.37,
      artRect.y + artRect.h * 0.49,
    );
    line(
      artRect.x + artRect.w * 0.63,
      artRect.y + artRect.h * 0.68,
      artRect.x + artRect.w * 0.72,
      artRect.y + artRect.h * 0.58,
    );
  }
}

function drawLayerInteraction(artRect) {
  const focus = state.artTouchPoint;
  const charge = constrain(state.artworkOneCharge, 0, 1);
  const reserveActive = state.layers[1];
  const massActive = state.layers[3];
  const massOpacity = massActive ? 1 : 0.24;
  const forms = [
    {
      active: state.layers[0],
      anchor: { x: 0.2, y: 0.52 },
      color: [74, 169, 123],
      alpha: 52,
      blur: 11,
      width: artRect.w * 0.35,
      height: artRect.h * 0.46,
      rotation: -0.28,
    },
    {
      active: state.layers[1],
      anchor: { x: 0.56, y: 0.28 },
      color: [214, 196, 123],
      alpha: 46,
      blur: 13,
      width: artRect.w * 0.56,
      height: artRect.h * 0.24,
      rotation: 0.04,
    },
    {
      active: state.layers[2],
      anchor: { x: 0.78, y: 0.39 },
      color: [150, 190, 191],
      alpha: 44,
      blur: 12,
      width: artRect.w * 0.28,
      height: artRect.h * 0.48,
      rotation: 0.34,
    },
  ];

  push();
  drawingContext.save();
  roundedClip(artRect.x, artRect.y, artRect.w, artRect.h, 18);

  forms.forEach((form) => {
    if (!form.active) return;
    const influence = focusInfluence(form.anchor, focus, 0.4);
    const px = artRect.x + artRect.w * form.anchor.x;
    const py = artRect.y + artRect.h * form.anchor.y;
    const driftX = focus ? (focus.x - form.anchor.x) * artRect.w * 0.06 * influence : 0;
    const driftY = focus ? (focus.y - form.anchor.y) * artRect.h * 0.04 * influence : 0;
    const alpha = form.alpha * (0.72 + influence * 0.9);

    drawingContext.filter = `blur(${form.blur}px)`;
    drawSoftVeilForm(
      px + driftX,
      py + driftY,
      form.width * (1 + influence * 0.08),
      form.height * (1 + influence * 0.08),
      form.rotation,
      form.color,
      alpha,
    );
    drawingContext.filter = "none";

    noFill();
    stroke(255, 252, 247, 12 + influence * 38 + charge * 18);
    strokeWeight(1);
    ellipse(px + driftX, py + driftY, form.width * 0.92, form.height * 0.92);
  });

  if (reserveActive) {
    const reserveX = artRect.x + artRect.w * 0.5;
    const reserveY = artRect.y + artRect.h * 0.47;
    const reservePullX = focus ? (focus.x - 0.5) * artRect.w * 0.12 * charge : 0;
    const reservePullY = focus ? (focus.y - 0.46) * artRect.h * 0.08 * charge : 0;

    drawingContext.filter = "blur(12px)";
    fill(255, 249, 237, 18 + charge * 36);
    ellipse(
      reserveX + reservePullX * 0.6,
      reserveY + reservePullY * 0.4,
      artRect.w * (0.34 + charge * 0.08),
      artRect.h * (0.2 + charge * 0.07),
    );
    fill(248, 236, 205, 12 + charge * 24);
    ellipse(
      reserveX - artRect.w * 0.05 + reservePullX,
      reserveY + artRect.h * 0.02 + reservePullY,
      artRect.w * (0.24 + charge * 0.06),
      artRect.h * (0.12 + charge * 0.05),
    );
    drawingContext.filter = "none";
  }

  const massInfluence = (focus ? map(focus.y, 0, 1, 0.2, 1) : 0.34) + charge * 0.5;
  drawingContext.filter = "blur(4px)";
  fill(87, 16, 36, (52 + massInfluence * 116) * massOpacity);
  noStroke();
  ellipse(
    artRect.x + artRect.w * 0.44,
    artRect.y + artRect.h * 0.75,
    artRect.w * (0.22 + charge * 0.03),
    artRect.h * (0.3 + charge * 0.04),
  );
  drawingContext.filter = "none";
  fill(78, 14, 34, (82 + massInfluence * 74) * massOpacity);
  ellipse(
    artRect.x + artRect.w * 0.44,
    artRect.y + artRect.h * 0.75,
    artRect.w * (0.16 + charge * 0.026),
    artRect.h * (0.22 + charge * 0.03),
  );

  if (massActive) {
    fill(58, 10, 24, 16 + charge * 26);
    ellipse(
      artRect.x + artRect.w * 0.46,
      artRect.y + artRect.h * 0.81,
      artRect.w * (0.11 + charge * 0.02),
      artRect.h * (0.08 + charge * 0.02),
    );
  }

  if (focus) {
    const massX = artRect.x + artRect.w * 0.44;
    const massY = artRect.y + artRect.h * 0.75;
    noFill();
    stroke(107, 36, 50, (18 + charge * 48) * massOpacity);
    strokeWeight(1.2);
    beginShape();
    curveVertex(artRect.x + artRect.w * focus.x, artRect.y + artRect.h * focus.y);
    curveVertex(artRect.x + artRect.w * focus.x, artRect.y + artRect.h * focus.y);
    curveVertex(artRect.x + artRect.w * (focus.x * 0.78 + 0.22), artRect.y + artRect.h * (focus.y * 0.76 + 0.24));
    curveVertex(artRect.x + artRect.w * 0.39, artRect.y + artRect.h * 0.62);
    curveVertex(massX, massY);
    curveVertex(massX, massY);
    endShape();

    noStroke();
    fill(255, 252, 247, 18 + focus.y * 34 + charge * 28);
    ellipse(
      artRect.x + artRect.w * focus.x,
      artRect.y + artRect.h * focus.y,
      artRect.w * (0.18 + charge * 0.14),
      artRect.h * (0.18 + charge * 0.14),
    );
    noFill();
    stroke(255, 252, 247, 32 + charge * 52);
    strokeWeight(1.3);
    ellipse(
      artRect.x + artRect.w * focus.x,
      artRect.y + artRect.h * focus.y,
      artRect.w * (0.12 + charge * 0.09),
      artRect.h * (0.12 + charge * 0.09),
    );
  }

  drawingContext.restore();
  pop();
  drawWorkOneEdgeLabels(artRect, currentText().reserveSide, currentText().massSide);
}

function drawWorkOneEdgeLabels(artRect, leftLabel, rightLabel) {
  noStroke();
  fill(255, 252, 247, 206);
  rect(artRect.x + 12, artRect.y + 12, 72, 22, 999);
  rect(artRect.x + artRect.w - 84, artRect.y + 12, 72, 22, 999);

  fill(23, 20, 17);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(leftLabel, artRect.x + 48, artRect.y + 23);
  text(rightLabel, artRect.x + artRect.w - 48, artRect.y + 23);
}

function drawSoftVeilForm(cx, cy, w, h, rotation, colorValues, alpha) {
  const [r, g, b] = colorValues;
  push();
  translate(cx, cy);
  rotate(rotation);
  noStroke();
  fill(r, g, b, alpha);
  beginShape();
  curveVertex(-w * 0.52, -h * 0.08);
  curveVertex(-w * 0.52, -h * 0.08);
  curveVertex(-w * 0.42, -h * 0.42);
  curveVertex(-w * 0.08, -h * 0.52);
  curveVertex(w * 0.34, -h * 0.26);
  curveVertex(w * 0.52, h * 0.02);
  curveVertex(w * 0.32, h * 0.4);
  curveVertex(-w * 0.02, h * 0.5);
  curveVertex(-w * 0.46, h * 0.28);
  curveVertex(-w * 0.52, -h * 0.08);
  curveVertex(-w * 0.52, -h * 0.08);
  endShape(CLOSE);
  pop();
}

function drawVeilInteraction(artRect) {
  const focus = state.artTouchPoint;
  const charge = constrain(state.artworkOneCharge, 0, 1);
  const seamX = artRect.x + artRect.w * state.veilBalance;
  const veilWeight = 1 - state.veilBalance;
  const massWeight = state.veilBalance;

  push();
  drawingContext.save();
  roundedClip(artRect.x, artRect.y, artRect.w, artRect.h, 18);

  noStroke();
  fill(244, 236, 208, 20 + veilWeight * 54);
  rect(artRect.x, artRect.y, artRect.w, artRect.h);

  drawingContext.filter = "blur(10px)";
  fill(255, 248, 240, 18 + veilWeight * 30);
  for (let offset = -4; offset <= 4; offset += 1) {
    const sway = focus ? (focus.x - 0.5) * artRect.w * (0.02 + charge * 0.03) : 0;
    ellipse(
      seamX + sway + offset * 14,
      artRect.y + artRect.h * 0.5,
      artRect.w * (0.18 + charge * 0.04),
      artRect.h * (1.12 + charge * 0.06),
    );
  }

  if (focus) {
    const focusX = artRect.x + artRect.w * focus.x;
    const focusY = artRect.y + artRect.h * focus.y;
    fill(255, 252, 246, 16 + charge * 32);
    ellipse(
      lerp(seamX, focusX, 0.48),
      focusY,
      artRect.w * (0.17 + charge * 0.07),
      artRect.h * (0.52 + charge * 0.12),
    );
    fill(246, 236, 213, 14 + charge * 26);
    ellipse(
      lerp(seamX, focusX, 0.22),
      focusY,
      artRect.w * (0.09 + charge * 0.04),
      artRect.h * (0.38 + charge * 0.08),
    );
  }

  fill(170, 209, 201, 18 + veilWeight * 24);
  ellipse(artRect.x + artRect.w * 0.73, artRect.y + artRect.h * 0.38, artRect.w * 0.54, artRect.h * 0.54);
  fill(78, 200, 138, 14 + veilWeight * 28);
  ellipse(artRect.x + artRect.w * 0.18, artRect.y + artRect.h * 0.49, artRect.w * 0.32, artRect.h * 0.44);
  drawingContext.filter = "none";

  fill(86, 12, 34, 28 + massWeight * 136 + charge * 24);
  ellipse(
    artRect.x + artRect.w * 0.44,
    artRect.y + artRect.h * 0.75,
    artRect.w * (0.2 + charge * 0.04),
    artRect.h * (0.27 + charge * 0.04),
  );
  fill(72, 10, 29, 38 + massWeight * 98 + charge * 24);
  ellipse(
    artRect.x + artRect.w * 0.44,
    artRect.y + artRect.h * 0.75,
    artRect.w * (0.13 + charge * 0.03),
    artRect.h * (0.18 + charge * 0.03),
  );

  if (focus) {
    noFill();
    stroke(96, 22, 42, 18 + charge * 34);
    strokeWeight(1.2);
    beginShape();
    curveVertex(seamX, artRect.y + artRect.h * 0.18);
    curveVertex(seamX, artRect.y + artRect.h * 0.18);
    curveVertex(lerp(seamX, artRect.x + artRect.w * focus.x, 0.42), artRect.y + artRect.h * focus.y);
    curveVertex(artRect.x + artRect.w * 0.43, artRect.y + artRect.h * 0.64);
    curveVertex(artRect.x + artRect.w * 0.44, artRect.y + artRect.h * 0.75);
    curveVertex(artRect.x + artRect.w * 0.44, artRect.y + artRect.h * 0.75);
    endShape();
  }

  stroke(255, 252, 247, 108 + veilWeight * 40);
  strokeWeight(1.2);
  line(seamX, artRect.y + 16, seamX, artRect.y + artRect.h - 16);
  if (focus) {
    stroke(255, 255, 255, 34);
    line(artRect.x + artRect.w * focus.x, artRect.y + 24, artRect.x + artRect.w * focus.x, artRect.y + artRect.h - 24);
    noStroke();
    fill(255, 252, 247, 18 + charge * 38);
    ellipse(
      artRect.x + artRect.w * focus.x,
      artRect.y + artRect.h * focus.y,
      artRect.w * (0.1 + charge * 0.08),
      artRect.h * (0.12 + charge * 0.08),
    );
  }

  drawingContext.restore();
  pop();

  drawWorkOneEdgeLabels(artRect, currentText().veilSide, currentText().massSide);
}

function drawSquareInteraction(artRect) {
  const origin = denormalizeArtPoint(DEFAULT_SQUARE, artRect);
  const point = denormalizeArtPoint(state.square, artRect);
  const moved = dist(origin.x, origin.y, point.x, point.y) > 6;
  const region = getSquareRegion(state.square);
  const pulse = state.squareRegionPulse;
  const cuePulse = !state.interactionEvidence ? (state.reducedMotion ? 0.18 : (Math.sin(frameCount * 0.08) + 1) * 0.5) : 0;
  const comparisonPoints = state.squareComparisonPoints
    .map((entry) => ({
      ...entry,
      pixel: denormalizeArtPoint(entry.point, artRect),
    }))
    .filter((entry) => dist(entry.pixel.x, entry.pixel.y, point.x, point.y) > 18);

  push();
  rectMode(CENTER);

  if (moved) {
    stroke(107, 36, 50, 44);
    strokeWeight(1.5);
    line(origin.x, origin.y, point.x, point.y);
  }

  if (comparisonPoints.length >= 2) {
    stroke(107, 36, 50, 26);
    strokeWeight(1.1);
    line(
      comparisonPoints[0].pixel.x,
      comparisonPoints[0].pixel.y,
      comparisonPoints[1].pixel.x,
      comparisonPoints[1].pixel.y,
    );
  }

  comparisonPoints.forEach((entry, index) => {
    const ghostRegion = getSquareRegion(entry.point);
    noFill();
    stroke(ghostRegion.aura[0], ghostRegion.aura[1], ghostRegion.aura[2], 42 + index * 18);
    strokeWeight(1.5);
    rect(entry.pixel.x, entry.pixel.y, 74, 74, 10);
    stroke(255, 250, 244, 88);
    rect(entry.pixel.x, entry.pixel.y, 42, 42, 8);
    noStroke();
    fill(255, 252, 247, 220);
    circle(entry.pixel.x, entry.pixel.y - 38, 21);
    fill(23, 20, 17, 196);
    textAlign(CENTER, CENTER);
    textSize(10.5);
    text(String(index + 1), entry.pixel.x, entry.pixel.y - 37);
  });

  noStroke();
  fill(region.glow[0], region.glow[1], region.glow[2], 30 + pulse * 54 + cuePulse * 32);
  ellipse(point.x, point.y, 128 + pulse * 22 + cuePulse * 18, 128 + pulse * 22 + cuePulse * 18);
  noFill();
  stroke(region.aura[0], region.aura[1], region.aura[2], 58 + pulse * 78 + cuePulse * 54);
  strokeWeight(2);
  ellipse(point.x, point.y, 116 + pulse * 12 + cuePulse * 20, 116 + pulse * 12 + cuePulse * 20);
  fill(135, 165, 190, 40);
  rect(origin.x, origin.y, 82, 82, 11);
  fill(255, 255, 255, 148);
  rect(origin.x, origin.y, 44, 44, 8);

  fill(0, 26);
  rect(point.x + 5, point.y + 7, 94, 94, 12);
  fill(139, 171, 199, 228);
  rect(point.x, point.y, 88, 88, 12);
  fill(139, 171, 199);
  rect(point.x, point.y, 54, 54, 8);
  fill(255, 255, 255, 212);
  circle(point.x - 18, point.y - 18, 8);
  circle(point.x + 18, point.y - 18, 8);
  circle(point.x - 18, point.y + 18, 8);
  circle(point.x + 18, point.y + 18, 8);
  noFill();
  stroke(255, 248);
  strokeWeight(4);
  rect(point.x, point.y, 92, 92, 12);
  stroke(region.aura[0], region.aura[1], region.aura[2], 46 + pulse * 64);
  strokeWeight(2);
  rect(point.x, point.y, 108 + pulse * 8, 108 + pulse * 8, 16);
  pop();

  const tagWidth = min(artRect.w * 0.34, 118);
  const tagX = constrain(point.x - tagWidth / 2, artRect.x + 12, artRect.x + artRect.w - tagWidth - 12);
  const tagY = min(artRect.y + artRect.h - 40, point.y + 56);
  noStroke();
  fill(255, 252, 247, 232);
  rect(tagX, tagY, tagWidth, 24, 999);
  fill(23, 20, 17, 220);
  textAlign(CENTER, CENTER);
  textSize(11.5);
  text(currentText().sameColourTag, tagX + tagWidth / 2, tagY + 12);

  if (!state.squareHintDismissed) {
    const hintWidth = 152;
    const bubbleX = constrain(point.x - hintWidth / 2, artRect.x + 10, artRect.x + artRect.w - hintWidth - 10);
    const bubbleY = max(artRect.y + 12, point.y - 70);
    noStroke();
    fill(255, 252, 247, 232);
    rect(bubbleX, bubbleY, hintWidth, 30, 999);
    fill(23, 20, 17);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(currentText().squareHint, bubbleX + hintWidth / 2, bubbleY + 15);
  }

}

function drawPathInteraction(artRect) {
  if (state.gazePath.length < 1) return;

  noFill();
  stroke(107, 36, 50, 158);
  strokeWeight(2.6);
  beginShape();
  state.gazePath.forEach((point) => {
    const pixel = denormalizeArtPoint(point, artRect);
    vertex(pixel.x, pixel.y);
  });
  endShape();

  state.gazePath.forEach((point, index) => {
    const pixel = denormalizeArtPoint(point, artRect);
    noStroke();
    fill(107, 36, 50, 208);
    circle(pixel.x, pixel.y, 24);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(String(index + 1), pixel.x, pixel.y + 1);
  });
}

function drawTraceInteraction(artRect) {
  const guide = [
    { x: 0.24, y: 0.68 },
    { x: 0.34, y: 0.63 },
    { x: 0.46, y: 0.58 },
    { x: 0.56, y: 0.5 },
    { x: 0.66, y: 0.4 },
  ];

  noFill();
  stroke(255, 252, 247, 44);
  strokeWeight(1.3);
  beginShape();
  guide.forEach((point) => {
    vertex(artRect.x + artRect.w * point.x, artRect.y + artRect.h * point.y);
  });
  endShape();

  noStroke();
  guide.forEach((point, index) => {
    const px = artRect.x + artRect.w * point.x;
    const py = artRect.y + artRect.h * point.y;
    fill(255, 252, 247, 42 + index * 8);
    circle(px, py, 8 + index * 0.8);
  });

  drawWorkOneEdgeLabels(artRect, currentText().traceFaintPole, currentText().traceVisiblePole);

  if (state.tracePoints.length < 2) return;

  noFill();
  stroke(255, 252, 247, 38);
  strokeWeight(5.6);
  beginShape();
  state.tracePoints.forEach((point) => {
    const pixel = denormalizeArtPoint(point, artRect);
    curveVertex(pixel.x, pixel.y);
  });
  endShape();

  noFill();
  stroke(65, 111, 98, 148);
  strokeWeight(2.8);
  beginShape();
  state.tracePoints.forEach((point) => {
    const pixel = denormalizeArtPoint(point, artRect);
    curveVertex(pixel.x, pixel.y);
  });
  endShape();

  const first = denormalizeArtPoint(state.tracePoints[0], artRect);
  const last = denormalizeArtPoint(state.tracePoints[state.tracePoints.length - 1], artRect);
  noStroke();
  fill(255, 252, 247, 214);
  circle(first.x, first.y, 12);
  fill(65, 111, 98, 180);
  circle(last.x, last.y, 14);
}

function drawBeforeAfterOverlay() {
  const rect = getArtworkRect();

  if (state.beforePoint && state.afterPoint) {
    const beforePixel = denormalizeArtPoint(state.beforePoint, rect);
    const afterPixel = denormalizeArtPoint(state.afterPoint, rect);
    stroke(107, 36, 50, 54);
    strokeWeight(1.5);
    line(beforePixel.x, beforePixel.y, afterPixel.x, afterPixel.y);

    noStroke();
    for (let step = 1; step < 6; step += 1) {
      const amount = step / 6;
      const dotColor = lerpColor(color(23, 20, 17, 46), color(107, 36, 50, 128), amount);
      fill(dotColor);
      const x = lerp(beforePixel.x, afterPixel.x, amount);
      const y = lerp(beforePixel.y, afterPixel.y, amount) - Math.sin(amount * Math.PI) * 6;
      circle(x, y, 7);
    }
  }

  if (state.beforePoint) drawMarker(state.beforePoint, rect, "A", color(23, 20, 17));
  if (state.afterPoint) drawMarker(state.afterPoint, rect, "B", color(107, 36, 50));
}

function drawMarker(point, rect, label, accentColor) {
  const pixel = denormalizeArtPoint(point, rect);
  noStroke();
  fill(red(accentColor), green(accentColor), blue(accentColor), 32);
  circle(pixel.x, pixel.y, 46);
  fill(255, 252, 247, 242);
  circle(pixel.x, pixel.y, 32);
  fill(accentColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, pixel.x, pixel.y + 1);
}

function drawPendingMarkerHint() {
  if (!state.pendingMark) return;

  const label =
    state.pendingMark === "before"
      ? currentText().tapToPlaceBefore
      : currentText().tapToPlaceAfter;

  const pillWidth = min(width * 0.64, 280);
  const x = (width - pillWidth) / 2;
  const y = min(height * 0.09, 74);

  noStroke();
  fill(255, 252, 247, 236);
  rect(x, y, pillWidth, 38, 999);
  fill(23, 20, 17);
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, x + pillWidth / 2, y + 19);
}

function shouldShowInlinePrivacy() {
  return state.phase === "start" || state.phase === "guided-intro";
}

function renderUi() {
  const text = currentText();
  const meta = phaseMeta();
  const testingReady = hasMediatorSummary();

  document.documentElement.lang = state.language;
  document.documentElement.setAttribute("data-language", state.language);
  ui.skipLink.textContent = text.skipLink;
  ui.topbar.setAttribute("aria-label", text.topbarAria);
  ui.experienceShell.setAttribute("aria-label", text.experienceAria);

  ui.langButton.textContent = state.language.toUpperCase();
  ui.langButton.setAttribute("aria-label", text.languageAria);

  ui.summaryButton.textContent = testingReady ? text.testSummaryButton : text.session;
  ui.summaryButton.setAttribute("aria-label", testingReady ? text.testSummaryAria : text.sessionAria);
  ui.summaryButton.setAttribute("aria-expanded", String(state.summaryOpen));
  ui.summaryButton.disabled = !testingReady;
  ui.summaryButton.classList.toggle("is-hidden", !testingReady);
  ui.summaryPanel.setAttribute("aria-label", text.summaryReadyTitle);
  ui.modal.setAttribute("aria-label", text.finalTitle);

  ui.markLookingButton.textContent = text.markLookingAction;
  ui.markLookingButton.setAttribute("aria-label", text.markLookingAria);
  ui.markLookingButton.setAttribute("aria-expanded", String(state.gazePanelOpen));
  ui.markLookingButton.disabled = !canMarkLooking();
  ui.markLookingButton.classList.toggle("is-active", state.gazePanelOpen || Boolean(state.pendingMark));
  ui.markLookingGroup.classList.add("is-hidden");

  ui.sheetStep.textContent = meta.step;
  ui.sheetProgressLabel.textContent = sheetProgressLabelText(meta.progress);
  ui.progressFill.style.width = `${((meta.progress - 1) / (STAGE_COUNT - 1)) * 100}%`;
  ui.progressNotes.innerHTML = progressNotesMarkup(meta.progress);
  ui.sheetContext.innerHTML = sheetContextMarkup();
  ui.sheetContext.classList.toggle("is-empty", ui.sheetContext.innerHTML.trim() === "");
  ui.sheet.dataset.phase = state.phase;
  ui.sheetTitle.textContent = meta.title;
  ui.sheetCopy.textContent = meta.copy;
  ui.sheetHint.textContent = meta.hint || "";
  ui.sheetHint.hidden = !meta.hint;
  ui.privacyNote.hidden = !shouldShowInlinePrivacy();
  ui.privacyNote.textContent = shouldShowInlinePrivacy() ? text.privacyNote : "";

  renderSummaryPanel();
  ui.controls.innerHTML = controlsMarkup();
  ui.controls.classList.toggle("is-empty", ui.controls.innerHTML.trim() === "");
  renderModal();
  wireActionButtons(ui.controls);
  wireActionButtons(ui.summaryPanel);
  wireActionButtons(ui.modal);
  flushSheetScrollRequest();
}

function wireActionButtons(root) {
  if (!root) return;

  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", handleControlClick);
  });
}

function flushSheetScrollRequest() {
  if (!state.sheetScrollToBottomPending || !ui.sheet) return;
  state.sheetScrollToBottomPending = false;
  ui.sheet.scrollTo({
    top: ui.sheet.scrollHeight,
    behavior: state.reducedMotion ? "auto" : "smooth",
  });
}

function sheetProgressLabelText(progress) {
  const text = currentText();
  if (isGuidedJourneyActive() || state.phase === "guided-synthesis") {
    return `${text.guidedModeLabel} ${guidedPathStepText()}`;
  }

  return `${text.progressLabel} ${progress}/${STAGE_COUNT}`;
}

function progressNotesMarkup(currentStep) {
  return Array.from({ length: STAGE_COUNT }, (_, index) => {
    const stepNumber = index + 1;
    const classes = [
      "progress-note",
      stepNumber < currentStep ? "is-done" : "",
      stepNumber === currentStep ? "is-active" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `<span class="${classes}"></span>`;
  }).join("");
}

function sheetContextMarkup() {
  const items = [];
  const artwork = currentArtwork();
  const interaction = currentInteraction();
  const word = currentSelectedWord();

  if (isGuidedJourneyActive() || state.phase === "guided-synthesis") {
    items.push(`<span class="context-chip is-journey">${currentText().guidedModeLabel}</span>`);

    items.push(`<span class="context-chip is-journey is-step">${guidedPathStepText()}</span>`);

    GUIDED_PATH.forEach((artworkIndex, orderIndex) => {
      const classes = ["context-chip", "is-journey"];
      if (state.guidedCompletedArtworks.includes(artworkIndex)) {
        classes.push("is-done");
      } else if (isGuidedJourneyActive() && orderIndex === state.guidedPathStep) {
        classes.push("is-current");
      }

      items.push(
        `<span class="${classes.join(" ")}">${ARTWORKS[artworkIndex].label[state.language]}</span>`,
      );
    });
  }

  if (artwork && !(isGuidedJourneyActive() || state.phase === "guided-synthesis")) {
    items.push(`<span class="context-chip">${artwork.label[state.language]}</span>`);
  }

  if (interaction && state.phase !== "choose-interaction") {
    items.push(`<span class="context-chip">${interaction.label[state.language]}</span>`);
  }

  if (word && ["final-phrase", "silent-return", "after-return"].includes(state.phase)) {
    items.push(`<span class="context-chip">“${word}”</span>`);
  }

  return items.join("");
}

function renderSummaryPanel() {
  const text = currentText();
  const record = activeMediatorRecord();

  ui.summaryPanel.classList.toggle("is-hidden", !state.summaryOpen);
  if (!state.summaryOpen) return;

  if (!record) {
    ui.summaryPanel.innerHTML = `
      <div class="summary-header">
        <div>
          <p class="summary-kicker summary-kicker-backstage">${text.summaryModeKicker}</p>
          <h2 class="summary-title">${text.summaryReadyTitle}</h2>
        </div>
        <button class="summary-close" type="button" data-action="close-summary">
          ${text.closeSummaryAction}
        </button>
      </div>
      <p class="summary-note">${text.summaryReadyCopy}</p>
      <p class="summary-note">${text.privacyNote}</p>
    `;
    return;
  }

  ui.summaryPanel.innerHTML = `
    <div class="summary-header">
      <div>
        <p class="summary-kicker summary-kicker-backstage">${text.summaryModeKicker}</p>
        <h2 class="summary-title">${text.summaryReadyTitle}</h2>
      </div>
      <div class="summary-header-actions">
        <p class="summary-kicker">${record.sessionId}</p>
        <button class="summary-close" type="button" data-action="close-summary">
          ${text.closeSummaryAction}
        </button>
      </div>
    </div>
    <p class="summary-note">${text.summaryReadyCopy}</p>
    <div class="summary-grid">
      ${renderSummaryRow(text.summarySessionId, record.sessionId)}
      ${renderSummaryRow(text.summaryGuidedMode, record.guidedMode ? text.yes : text.no)}
      ${renderSummaryRow(text.summaryPathStep, record.guidedPathStep || text.none)}
      ${renderSummaryRow(
        text.summaryArtwork,
        record.artworkNumber != null
          ? `${record.artworkNumber} · ${record.artworkLabel || text.none}`
          : text.none,
      )}
      ${renderSummaryRow(text.summaryVisitedArtworks, record.guidedVisitedArtworks || text.none)}
      ${renderSummaryRow(text.summaryCompletedArtworks, record.guidedCompletedArtworks || text.none)}
      ${renderSummaryRow(text.summaryInteraction, record.gestureLabel || text.none)}
      ${renderSummaryRow(text.summaryInteractionCompleted, record.interactionCompleted ? text.yes : text.no)}
      ${renderSummaryRow(text.summaryInteractionDuration, record.interactionDurationFormatted || text.none)}
      ${renderSummaryRow(
        text.summaryRegionsCrossed,
        record.squareRegionsCrossed != null ? String(record.squareRegionsCrossed) : text.none,
      )}
      ${renderSummaryRow(
        text.summaryHighestStillness,
        record.highestStillness != null ? `${Math.round(record.highestStillness * 100)}%` : text.none,
      )}
      ${renderSummaryRow(text.summaryWord, record.word || text.none)}
      ${renderSummaryRow(text.summaryLanguage, record.language)}
      ${renderSummaryRow(text.summaryDuration, record.durationFormatted)}
      ${renderSummaryRow(text.summaryTouches, String(record.touches))}
      ${renderSummaryRow(text.summaryGaze, record.gazeStatus || text.gazeNotMarked)}
      ${renderSummaryRow(text.summaryPoints, pointPairText(record))}
      ${renderSummaryRow(text.summaryShift, record.gazeInterpretation || text.gazeNotMarked)}
      ${renderSummaryRow(text.summaryReturned, record.usedReturnToArtwork ? text.yes : text.no)}
      ${renderSummaryRow(text.summaryRestarted, record.restartedExperience ? text.yes : text.no)}
      ${renderSummaryRow(text.summaryAnotherArtwork, record.choseAnotherArtwork ? text.yes : text.no)}
    </div>
    <div class="summary-card">
      <p class="summary-card-title">${text.summaryFinalPhrase}</p>
      <p class="summary-card-copy">${record.finalPhrase || text.none}</p>
    </div>
    ${
      record.guidedFinalSynthesis
        ? `
    <div class="summary-card">
      <p class="summary-card-title">${text.summaryGuidedSynthesis}</p>
      <p class="summary-card-copy">${record.guidedFinalSynthesis}</p>
    </div>`
        : ""
    }
    <div class="summary-card">
      <p class="summary-card-title">${text.summaryInterpretation}</p>
      <p class="summary-card-copy">${record.interpretation || text.none}</p>
    </div>
    <div class="summary-actions">
      ${actionButtonHtml("copy-test-summary", text.copySummaryAction, text.copySummaryCopy, false)}
      ${actionButtonHtml("download-json", text.downloadJsonAction, text.downloadJsonCopy, false)}
    </div>
    ${state.summaryNotice ? `<p class="summary-notice">${state.summaryNotice}</p>` : ""}
    <p class="summary-note">${text.summaryNote}</p>
    <p class="summary-note">${text.privacyNote}</p>
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

function renderModal() {
  if (state.phase !== "final-phrase") {
    ui.modal.classList.add("is-hidden");
    ui.modal.innerHTML = "";
    return;
  }

  const text = currentText();
  ui.modal.classList.remove("is-hidden");
  ui.modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-kicker">${text.finalStep}</div>
      <h2 id="modal-title" class="modal-title">${text.finalTitle}</h2>
      <p class="modal-copy">${state.finalPhrase}</p>
      <p class="modal-note">${text.returnToArtworkCopy}</p>
      <div class="modal-actions">
        ${actionButtonHtml(
          "return-to-artwork",
          text.returnToArtworkAction,
          "",
          true,
        )}
      </div>
      <div class="modal-secondary">
        ${subtleActionHtml("choose-another-word", text.chooseAnotherWordAction)}
        ${subtleActionHtml("choose-another-gesture", text.chooseAnotherGestureAction)}
        ${isGuidedJourneyActive() ? subtleActionHtml("leave-guided-path", text.leaveGuidedPathAction) : ""}
      </div>
    </div>
  `;
}

function controlsMarkup() {
  const text = currentText();

  if (state.phase === "start") {
    return `
      <div class="button-row is-single">
        ${actionButtonHtml("start-guided", text.guidedStartAction, text.guidedStartCopy, true)}
      </div>
      <div class="button-row is-single">
        ${actionButtonHtml("start-free", text.freeStartAction, text.freeStartCopy, false)}
      </div>
    `;
  }

  if (state.phase === "guided-intro") {
    const isLastIntro = state.guidedIntroIndex === GUIDED_INTRO[state.language].length - 1;
    return `
      <div class="button-row is-single">
        ${
          isLastIntro
            ? actionButtonHtml("begin-guided-path", text.beginGuidedPathAction, text.beginGuidedPathCopy, true)
            : actionButtonHtml("continue-guided-intro", text.introContinueAction, text.introContinueCopy, true)
        }
      </div>
      <div class="button-row is-single">
        ${actionButtonHtml("start-free", text.freeStartAction, text.freeStartCopy, false)}
      </div>
    `;
  }

  if (state.phase === "choose-artwork") {
    return `
      <div class="button-row">
        ${ARTWORKS.map(
          (artwork, index) =>
            actionButtonHtml(
              "select-artwork",
              artwork.label[state.language],
              artwork.title[state.language],
              false,
              false,
              `data-artwork="${index}"`,
            ),
        ).join("")}
      </div>
    `;
  }

  if (state.phase === "observe") {
    const seconds = max(
      1,
      Math.ceil((state.observeDuration - (millis() - state.observeStartedAt)) / 1000),
    );
    return `
      <div class="helper-card">
        <p class="helper-title">${text.observationCountdown}</p>
        <p class="helper-copy">${seconds}s · ${text.observeTransition}</p>
      </div>
      ${gazeToolsMarkup()}
      ${guidedLeaveMarkup()}
    `;
  }

  if (state.phase === "choose-interaction") {
    const artwork = currentArtwork();
    return `
      <div class="button-row">
        ${artwork.interactions
          .map((interaction) =>
            actionButtonHtml(
              "select-interaction",
              interaction.label[state.language],
              interaction.copy[state.language],
              false,
              false,
              `data-interaction="${interaction.id}"`,
            ),
          )
          .join("")}
      </div>
      ${gazeToolsMarkup()}
      ${guidedLeaveMarkup()}
    `;
  }

  if (state.phase === "interact") {
    const readyForWord = state.interactionCompleted;
    return `
      ${interactionStatusMarkup()}
      ${interactionToolsMarkup()}
      <div class="button-row is-single">
        ${actionButtonHtml(
          "advance-word",
          text.chooseWordAction,
          "",
          true,
          !readyForWord,
          `aria-label="${text.chooseWordActionAria}"`,
        )}
      </div>
      ${gazeToolsMarkup()}
      ${guidedLeaveMarkup()}
    `;
  }

  if (state.phase === "choose-word") {
    const artwork = currentArtwork();
    const words = artwork.words[state.language];

    return `
      <div class="word-grid">
        ${words
          .map(
            (word, index) => `
              <button
                class="word-button ${state.selectedWordIndex === index ? "is-active" : ""}"
                type="button"
                data-action="select-word"
                data-word-index="${index}"
                aria-pressed="${state.selectedWordIndex === index ? "true" : "false"}"
              >
                <strong>${word}</strong>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="button-row">
        ${actionButtonHtml(
          "generate-phrase",
          text.finalAction,
          text.finalCopy,
          true,
          state.selectedWordIndex == null,
        )}
        ${actionButtonHtml(
          "choose-another-gesture",
          text.chooseAnotherGestureAction,
          text.chooseAnotherGestureCopy,
        )}
      </div>
      ${gazeToolsMarkup()}
      ${guidedLeaveMarkup()}
    `;
  }

  if (state.phase === "silent-return") {
    return "";
  }

  if (state.phase === "guided-synthesis") {
    return `
      <div class="button-row is-single">
        ${actionButtonHtml("guided-explore-after", text.guidedExploreAfterAction, text.guidedExploreAfterCopy, true)}
      </div>
      <div class="closing-secondary">
        ${subtleActionHtml("open-summary", text.openSummaryAction)}
        ${subtleActionHtml("restart", text.restartAction)}
      </div>
    `;
  }

  if (isGuidedJourneyActive() && hasNextGuidedArtwork()) {
    return `
      <div class="button-row is-single">
        ${actionButtonHtml("continue-next-artwork", text.continueNextArtworkAction, "", true)}
      </div>
      <div class="closing-secondary">
        ${subtleActionHtml("leave-guided-path", text.leaveGuidedPathAction)}
        ${subtleActionHtml("open-summary", text.openSummaryAction)}
        ${subtleActionHtml("restart", text.restartAction)}
      </div>
    `;
  }

  return `
    <div class="button-row is-single">
      ${actionButtonHtml(
        "choose-another-artwork",
        text.chooseAnotherArtworkAction,
        text.chooseAnotherArtworkCopy,
        true,
      )}
    </div>
    <div class="closing-secondary">
      ${subtleActionHtml("open-summary", text.openSummaryAction)}
      ${subtleActionHtml("restart", text.restartAction)}
    </div>
  `;
}

function guidedLeaveMarkup() {
  if (!isGuidedJourneyActive()) return "";

  const text = currentText();
  return `
    <div class="button-row is-single">
      ${actionButtonHtml("leave-guided-path", text.leaveGuidedPathAction, text.leaveGuidedPathCopy, false)}
    </div>
  `;
}

function interactionNoticeCopy(interactionId) {
  const text = currentText();
  if (interactionId === "layers") return text.useLayers;
  if (interactionId === "veil") return text.useVeil;
  if (interactionId === "square") return text.useSquare;
  if (interactionId === "path") return text.usePath;
  if (interactionId === "slow") return text.useSlow;
  if (interactionId === "trace") return text.useTrace;
  return text.chooseInteractionHint;
}

function subtleActionHtml(action, title, attrs = "") {
  return `
    <button
      class="subtle-button subtle-button-inline"
      type="button"
      data-action="${action}"
      ${attrs}
    >
      ${title}
    </button>
  `;
}

function interactionMetricText(interactionId = state.selectedInteraction) {
  const text = currentText();
  if (state.interactionCompleted) return text.interactionCompletedLabel;
  return text.interactionObserveLabel;
}

function squareRemainingCopy() {
  const text = currentText();
  const remaining = max(0, 3 - squareRegionsCrossedCount());
  if (remaining <= 1) return text.squareKeepGoingOne;
  return text.squareKeepGoingMany.replace("{count}", String(remaining));
}

function squareRegionLabel(regionKey) {
  const text = currentText();
  if (regionKey === "light") return text.regionLight;
  if (regionKey === "warm") return text.regionWarm;
  if (regionKey === "cool") return text.regionCool;
  if (regionKey === "deep") return text.regionDeep;
  return text.regionField;
}

function squareComparePromptCopy() {
  const text = currentText();
  if (!state.interactionEvidence) return text.squareComparePromptStart;
  if (state.squareComparisonPoints.length === 1) return text.squareComparePromptSecond;
  return text.squareComparePromptObserve;
}

function squareComparisonMarkup() {
  const text = currentText();
  const placements = state.squareComparisonPoints;

  const chips = [0, 1]
    .map((index) => {
      const placement = placements[index];
      const title = index === 0 ? text.squarePlacementOne : text.squarePlacementTwo;
      const copy = placement ? `${title} · ${squareRegionLabel(placement.regionKey)}` : title;
      const classes = ["status-chip", "is-memory"];
      if (!placement) classes.push("is-empty");
      return `<span class="${classes.join(" ")}">${copy}</span>`;
    })
    .join("");

  return `
    <div class="status-row status-row-memory">
      ${chips}
    </div>
    <p class="mini-note">${squareComparePromptCopy()}</p>
  `;
}

function slowFeedbackCopy() {
  const text = currentText();

  if (!state.pointerDown) {
    return state.highestStillness > 0.28 ? text.slowReturnTouch : text.waitingIsAction;
  }

  if (state.slowMovement > 4.2) return text.slowTooFast;
  if (state.stillness < 0.22) return text.slowSettling;
  if (state.stillness < 0.62) return text.slowTraceComing;
  return text.slowTracePresent;
}

function traceFeedbackCopy() {
  const text = currentText();

  if (!state.pointerDown && state.tracePoints.length >= 5) {
    return text.traceReturnTouch;
  }

  if (state.tracePoints.length < 2) return text.traceSettling;
  if (state.tracePoints.length < 7) return text.traceFollowing;
  return text.traceEmerging;
}

function interactionKeepGoingCopy(interactionId = state.selectedInteraction) {
  const text = currentText();
  if (interactionId === "layers") return text.layersKeepGoing;
  if (interactionId === "veil") return text.veilKeepGoing;
  if (interactionId === "square") return squareRemainingCopy();
  if (interactionId === "path") return text.pathKeepGoing;
  if (interactionId === "slow") return text.slowKeepGoing;
  if (interactionId === "trace") return traceFeedbackCopy();
  return text.chooseWordDisabledHint;
}

function interactionStatusMarkup() {
  const interaction = currentInteraction();
  if (!interaction) return "";

  const text = currentText();
  const progress = max(8, round(currentInteractionProgress() * 100));
  const metricText = interactionMetricText(interaction.id);
  const lineText = state.interactionCompleted
    ? state.interactionCompletionMessage
    : interactionKeepGoingCopy(interaction.id);
  let conceptCueMarkup = "";

  if (interaction.id === "layers") {
    conceptCueMarkup = `
      <div class="status-row">
        <span class="status-chip">${text.reserveSide}</span>
        <span class="status-chip is-accent">${text.massSide}</span>
      </div>`;
  } else if (interaction.id === "veil") {
    conceptCueMarkup = `
      <div class="status-row">
        <span class="status-chip">${text.veilSide}</span>
        <span class="status-chip is-accent">${text.massSide}</span>
      </div>`;
  } else if (interaction.id === "square") {
    conceptCueMarkup = `
      <div class="status-row">
        <span class="status-chip is-accent">${text.squareFixedCue}</span>
        <span class="status-chip">${text.squareSurroundingCue}</span>
      </div>
      ${squareComparisonMarkup()}
      ${
        state.interactionEvidence && state.squareRegionPulse > 0.14
          ? `<p class="mini-note">${text.squareRegionChanged}</p>`
          : ""
      }`;
  } else if (interaction.id === "slow") {
    conceptCueMarkup = `
      <div class="status-row">
        <span class="status-chip">${text.slowWaitPole}</span>
        <span class="status-chip is-accent">${text.slowTracePole}</span>
      </div>`;
  } else if (interaction.id === "trace") {
    conceptCueMarkup = `
      <div class="status-row">
        <span class="status-chip">${text.traceFaintPole}</span>
        <span class="status-chip is-accent">${text.traceVisiblePole}</span>
      </div>`;
  }

  return `
    <div class="meter-card ${state.interactionCompleted ? "is-ready" : ""}">
      <div class="helper-row helper-row-compact">
        <p class="interaction-lead">${interaction.copy[state.language]}</p>
        <span class="status-chip ${state.interactionCompleted ? "is-accent" : ""}">
          ${metricText}
        </span>
      </div>
      <div class="meter-track" aria-hidden="true">
        <span class="meter-fill ${state.interactionCompleted ? "is-ready" : ""}" style="width: ${progress}%"></span>
      </div>
      <p class="completion-line ${state.interactionCompleted ? "is-ready" : ""}">${lineText}</p>
      ${conceptCueMarkup}
    </div>
  `;
}

function interactionToolsMarkup() {
  const text = currentText();
  const interaction = currentInteraction();
  const artwork = currentArtwork();

  if (!interaction) return "";

  if (interaction.id === "layers") {
    return `
      <div class="mini-tools">
        ${artwork.layerLabels[state.language]
          .map(
            (label, index) => `
              <button
                class="toggle-button ${state.layers[index] ? "is-active" : ""}"
                type="button"
                data-action="toggle-layer"
                data-layer="${index}"
                aria-pressed="${state.layers[index] ? "true" : "false"}"
              >
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (interaction.id === "veil") {
    return "";
  }

  if (interaction.id === "square") {
    return "";
  }

  if (interaction.id === "path") {
    return `
      <div class="mini-tools">
        <button class="toggle-button" type="button" data-action="clear-path">
          ${text.clearPath}
        </button>
      </div>
    `;
  }

  if (interaction.id === "slow") {
    const stillnessWidth = round(constrain(state.stillness, 0, 1) * 100);
    return `
      <div class="meter-card">
        <div class="meter-label">${text.stillnessMeter}</div>
        <div class="meter-track" aria-hidden="true">
          <span class="meter-fill" style="width: ${stillnessWidth}%"></span>
        </div>
        <div class="meter-scale" aria-hidden="true">
          <span>${text.stillnessLow}</span>
          <span>${text.stillnessHigh}</span>
        </div>
        <p class="helper-copy">${slowFeedbackCopy()}</p>
      </div>
    `;
  }

  if (interaction.id === "trace") {
    return `
      <div class="mini-tools">
        <button class="toggle-button" type="button" data-action="clear-trace">
          ${text.clearTrace}
        </button>
      </div>
    `;
  }

  return "";
}

function gazeInlineNoteText() {
  const text = currentText();

  if (state.beforePoint && state.afterPoint) return gazeInterpretationText();
  if (state.pendingMark === "before") return text.tapToPlaceBefore;
  if (state.pendingMark === "after") return text.tapToPlaceAfter;
  if (state.beforePoint && !state.afterPoint) {
    return `${text.gazeStatusBeforeOnly} · ${text.gazePlaceBAction}`;
  }
  if (!state.beforePoint && state.afterPoint) {
    return `${text.gazeStatusAfterOnly} · ${text.gazePlaceAAction}`;
  }
  return text.gazeInlineCopy;
}

function gazeToggleMarkup() {
  if (!canMarkLooking() || state.gazePanelOpen) return "";

  const text = currentText();

  return `
    <div class="inline-optional">
      <button
        class="subtle-button ${state.beforePoint || state.afterPoint ? "is-active" : ""}"
        type="button"
        data-action="toggle-gaze-panel"
        aria-label="${text.markLookingAria}"
        aria-expanded="false"
      >
        ${text.markLookingAction}
      </button>
      <p class="inline-optional-copy">${gazeInlineNoteText()}</p>
    </div>
  `;
}

function gazeToolsMarkup() {
  if (!canMarkLooking()) return "";
  return `${gazeToggleMarkup()}${gazePanelMarkup()}`;
}

function gazePanelMarkup() {
  if (!state.gazePanelOpen || !canMarkLooking()) return "";

  const text = currentText();
  const isStepA = !state.beforePoint;
  const isStepB = state.beforePoint && !state.afterPoint;
  const pendingText =
    state.pendingMark === "before"
      ? text.tapToPlaceBefore
      : state.pendingMark === "after"
        ? text.tapToPlaceAfter
        : "";

  return `
    <div class="helper-card gaze-panel">
      <p class="helper-title">${text.gazeTitle}</p>
      <p class="helper-copy">${text.gazeCopy}</p>
      ${
        isStepA
          ? `
      <p class="gaze-panel-step">A</p>
      <p class="gaze-panel-copy">${text.gazeStepA}</p>
      <div class="button-row is-single">
        ${actionButtonHtml(
          "mark-before",
          text.gazePlaceAAction,
          pendingText || text.beforeMeaning,
          false,
          false,
          `aria-label="${text.beforeAria}"`,
        )}
      </div>`
          : ""
      }
      ${
        isStepB
          ? `
      <p class="gaze-panel-step">B</p>
      <p class="gaze-panel-copy">${text.gazeStepB}</p>
      <div class="button-row is-single">
        ${actionButtonHtml(
          "mark-after",
          text.gazePlaceBAction,
          pendingText || text.afterMeaning,
          false,
          false,
          `aria-label="${text.afterAria}"`,
        )}
      </div>`
          : ""
      }
      <div class="status-row">
        <span class="status-chip ${state.beforePoint ? "is-accent" : ""}">
          A · ${state.beforePoint ? text.marked : text.gazeNotMarked}
        </span>
        <span class="status-chip ${state.afterPoint ? "is-accent" : ""}">
          B · ${state.afterPoint ? text.marked : text.gazeNotMarked}
        </span>
      </div>
      ${
        state.beforePoint && state.afterPoint
          ? `<p class="gaze-panel-note">${gazeInterpretationText()}</p>`
          : pendingText
            ? `<p class="gaze-panel-note">${pendingText}</p>`
            : ""
      }
      <div class="button-row ${state.beforePoint && state.afterPoint ? "is-duo" : "is-single"}">
        ${
          state.beforePoint && state.afterPoint
            ? actionButtonHtml("restart-gaze", text.gazeRestartAction, "", false)
            : ""
        }
        ${actionButtonHtml("close-gaze-panel", text.gazeCloseAction, "", false)}
      </div>
    </div>
  `;
}

function actionButtonHtml(action, title, copy, primary = false, disabled = false, attrs = "") {
  const classes = [
    "action-button",
    primary ? "is-primary" : "is-quiet",
    copy ? "" : "is-label-only",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const disabledAttrs = disabled ? 'disabled aria-disabled="true"' : "";

  return `
    <button
      class="${classes}"
      type="button"
      data-action="${action}"
      ${disabledAttrs}
      ${attrs}
    >
      <strong>${title}</strong>
      ${copy ? `<span>${copy}</span>` : ""}
    </button>
  `;
}

function buildFinalPhrase() {
  const artwork = currentArtwork();
  const word = currentSelectedWord();

  if (!artwork || !word) return "";

  if (state.language === "fr") {
    if (artwork.id === "work-1") {
      return `« ${word} » circule peut-être entre réserve pâle et masse plus dense. Revenez à l’œuvre et voyez où cela s’ouvre un peu, où cela tient encore.`;
    }
    if (artwork.id === "work-2") {
      return `« ${word} » se déplace peut-être avec la chaleur, la fraîcheur et la densité autour du carré fixe. Revenez à l’œuvre et voyez où il prend le plus de corps.`;
    }
    return `« ${word} » tient peut-être dans une trace presque effacée. Revenez à l’œuvre et laissez-le apparaître sans le chercher.`;
  }

  if (state.language === "de") {
    if (artwork.id === "work-1") {
      return `« ${word} » bewegt sich vielleicht zwischen heller Reserve und dichterer Masse. Kehren Sie zum Werk zurück und sehen Sie, wo es sich etwas öffnet und wo es noch hält.`;
    }
    if (artwork.id === "work-2") {
      return `« ${word} » verschiebt sich vielleicht mit Wärme, Kühle und Dichte um das feste Quadrat. Kehren Sie zum Werk zurück und sehen Sie, wo es am meisten Körper bekommt.`;
    }
    return `« ${word} » liegt vielleicht in einer fast ausgelöschten Spur. Kehren Sie zum Werk zurück und lassen Sie es erscheinen, ohne es zu suchen.`;
  }

  if (artwork.id === "work-1") {
    return `“${word}” may now pass between pale reserve and denser mass. Return to the artwork and see where it opens a little, where it still holds.`;
  }
  if (artwork.id === "work-2") {
    return `“${word}” may shift with warmth, coolness, and the density around the fixed square. Return to the artwork and see where it gathers most force.`;
  }
  return `“${word}” may rest in a trace near erasure. Return to the artwork and let it appear without chasing it.`;
}

function formatDuration() {
  const elapsedMs = Date.now() - state.sessionStart;
  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function gazeStatusText(record = state) {
  const text = currentText();
  if (!record || (!record.beforePoint && !record.afterPoint)) return text.gazeNotMarked;
  if (record.beforePoint && record.afterPoint) return text.gazeStatusBoth;
  if (record.beforePoint) return text.gazeStatusBeforeOnly;
  return text.gazeStatusAfterOnly;
}

function pointPairText(record = state) {
  const text = currentText();
  if (!record || (!record.beforePoint && !record.afterPoint)) return text.none;
  return `${text.summaryPointA}: ${formatPointText(record.beforePoint)} · ${text.summaryPointB}: ${formatPointText(record.afterPoint)}`;
}

function gazeShiftText(record = state) {
  const text = currentText();
  if (!record.beforePoint || !record.afterPoint) return text.shiftMissing;

  const dx = record.afterPoint.x - record.beforePoint.x;
  const dy = record.afterPoint.y - record.beforePoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 0.08) return text.shiftSoft;
  if (distance < 0.18) return text.shiftClear;
  return text.shiftStrong;
}

function gazeInterpretationText(record = state) {
  const text = currentText();
  if (!record.beforePoint || !record.afterPoint) return text.gazeNotMarked;

  const dx = record.afterPoint.x - record.beforePoint.x;
  const dy = record.afterPoint.y - record.beforePoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 0.08 ? text.gazeInterpretationReturn : text.gazeInterpretationShift;
}

function getArtworkRect() {
  const top = min(height * 0.135, 108);
  const bottom = constrain(height * 0.39, 232, 360);
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
  markInteractionContact();
  state.uiDirty = true;
}

function isUiInteractiveTarget(target) {
  return (
    target instanceof Element &&
    Boolean(target.closest(".skip-link, .topbar, #sheet, #summary-panel, #modal"))
  );
}

function isCanvasTarget(target) {
  return target instanceof Element && (target.tagName === "CANVAS" || Boolean(target.closest("#canvas-shell")));
}

function elementAtViewportPoint(x, y) {
  if (!document.elementFromPoint || !Number.isFinite(x) || !Number.isFinite(y)) return null;
  return document.elementFromPoint(x, y);
}

function shouldHandleCanvasPointerEvent(event, px, py) {
  const target = event?.target ?? null;
  if (isUiInteractiveTarget(target)) return false;

  const topElement = elementAtViewportPoint(px, py);
  if (isUiInteractiveTarget(topElement)) return false;

  if (isCanvasTarget(target)) return true;
  if (isCanvasTarget(topElement)) return true;
  return false;
}

function touchPointFromEvent(event) {
  const touch = event?.touches?.[0] ?? event?.changedTouches?.[0] ?? null;
  if (touch) {
    return { x: touch.clientX, y: touch.clientY };
  }

  if (touches.length > 0) {
    return { x: touches[0].x, y: touches[0].y };
  }

  return null;
}

function isSyntheticMouseAfterTouch() {
  return Date.now() - state.lastTouchAt < 650;
}

function isRepeatedNativeTouchEvent(event) {
  return (
    event != null &&
    state.lastHandledTouchStamp >= 0 &&
    Math.abs(state.lastHandledTouchStamp - event.timeStamp) < 1
  );
}

function applyCanvasTouchStart(event) {
  state.lastTouchAt = Date.now();
  const point = touchPointFromEvent(event);
  if (!point || !shouldHandleCanvasPointerEvent(event, point.x, point.y)) {
    state.touchCanvasActive = false;
    return false;
  }

  state.touchCanvasActive = handleCanvasPress(point.x, point.y);
  return state.touchCanvasActive;
}

function applyCanvasTouchMove(event) {
  state.lastTouchAt = Date.now();
  if (!state.touchCanvasActive) return false;

  const point = touchPointFromEvent(event);
  if (!point) return false;

  return handleCanvasDrag(point.x, point.y);
}

function applyCanvasTouchEnd() {
  state.lastTouchAt = Date.now();
  if (!state.touchCanvasActive) return false;

  state.touchCanvasActive = false;
  return handleCanvasRelease();
}

function bindCanvasTouch(canvas) {
  if (!canvas?.elt || state.nativeTouchBound) return;

  const options = { passive: false };

  canvas.elt.addEventListener(
    "touchstart",
    (event) => {
      state.lastHandledTouchStamp = event.timeStamp;
      if (applyCanvasTouchStart(event)) event.preventDefault();
    },
    options,
  );

  canvas.elt.addEventListener(
    "touchmove",
    (event) => {
      state.lastHandledTouchStamp = event.timeStamp;
      if (applyCanvasTouchMove(event)) event.preventDefault();
    },
    options,
  );

  canvas.elt.addEventListener(
    "touchend",
    (event) => {
      state.lastHandledTouchStamp = event.timeStamp;
      if (applyCanvasTouchEnd()) event.preventDefault();
    },
    options,
  );

  canvas.elt.addEventListener(
    "touchcancel",
    (event) => {
      state.lastHandledTouchStamp = event.timeStamp;
      if (applyCanvasTouchEnd()) event.preventDefault();
    },
    options,
  );

  state.nativeTouchBound = true;
}

function handleCanvasPress(px, py) {
  state.pointerDown = true;
  state.pointer.x = px;
  state.pointer.y = py;
  state.lastPointer.x = px;
  state.lastPointer.y = py;
  state.squareDragging = false;

  if (state.phase === "choose-artwork") {
    const hit = getArtworkChoiceHit(px, py);
    if (hit != null) {
      startArtworkFlow(hit);
      return true;
    }
    state.pointerDown = false;
    return false;
  }

  if (state.phase === "start" || state.phase === "silent-return") {
    state.pointerDown = false;
    return false;
  }

  const point = normalizeArtPoint(px, py);
  if (!point) {
    state.pointerDown = false;
    return false;
  }

  state.taps += 1;

  if (state.pendingMark) {
    if (state.pendingMark === "before") state.beforePoint = point;
    if (state.pendingMark === "after") state.afterPoint = point;
    state.pendingMark = null;
    state.uiDirty = true;
    return true;
  }

  if (state.phase !== "interact") return false;

  const interaction = currentInteraction();
  if (!interaction) return false;

  state.artTouchPoint = point;

  if (interaction.id === "layers") {
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "path") {
    markInteractionContact();
    state.gazePath.push(point);
    return true;
  }

  if (interaction.id === "trace") {
    markInteractionContact();
    state.tracePoints.push(point);
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "square") {
    const rect = getArtworkRect();
    const chip = denormalizeArtPoint(state.square, rect);
    state.squareHintDismissed = true;
    if (dist(px, py, chip.x, chip.y) >= 72) {
      moveSquareToPoint(point);
    }
    state.squareDragging = true;
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "veil") {
    state.veilBalance = constrain(point.x, 0, 1);
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "slow") {
    state.slowFocusPoint = point;
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  return false;
}

function handleCanvasDrag(px, py) {
  state.pointer.x = px;
  state.pointer.y = py;

  if (state.phase !== "interact") return false;

  const interaction = currentInteraction();
  if (!interaction) return false;

  const point = normalizeArtPoint(px, py);
  if (!point) {
    if (interaction.id === "square" && state.squareDragging) {
      state.artTouchPoint = null;
      return true;
    }
    return false;
  }

  state.artTouchPoint = point;

  if (interaction.id === "layers") {
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "square" && state.squareDragging) {
    moveSquareToPoint(point);
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "veil") {
    state.veilBalance = constrain(point.x, 0, 1);
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  if (interaction.id === "trace") {
    const last = state.tracePoints[state.tracePoints.length - 1];
    if (!last || dist(last.x, last.y, point.x, point.y) > 0.008) {
      state.tracePoints.push(point);
      state.uiDirty = true;
    }
    markInteractionContact();
    return true;
  }

  if (interaction.id === "slow") {
    state.slowFocusPoint = point;
    markInteractionContact();
    state.uiDirty = true;
    return true;
  }

  return false;
}

function handleCanvasRelease() {
  const wasActive = state.pointerDown || state.squareDragging || state.artTouchPoint != null;
  state.pointerDown = false;
  state.squareDragging = false;
  state.artTouchPoint = null;
  return wasActive;
}

function touchStarted(event) {
  if (isRepeatedNativeTouchEvent(event)) return false;
  if (applyCanvasTouchStart(event)) return false;
}

function touchMoved(event) {
  if (isRepeatedNativeTouchEvent(event)) return false;
  if (applyCanvasTouchMove(event)) return false;
}

function touchEnded(event) {
  if (isRepeatedNativeTouchEvent(event)) return false;
  if (applyCanvasTouchEnd()) return false;
}

function mousePressed(event) {
  if (isSyntheticMouseAfterTouch()) return;
  if (!shouldHandleCanvasPointerEvent(event, mouseX, mouseY)) return;
  handleCanvasPress(mouseX, mouseY);
}

function mouseDragged(event) {
  if (isSyntheticMouseAfterTouch()) return;
  if (!state.pointerDown) return;
  if (event && !shouldHandleCanvasPointerEvent(event, mouseX, mouseY)) return;
  handleCanvasDrag(mouseX, mouseY);
}

function mouseReleased() {
  if (isSyntheticMouseAfterTouch()) return;
  handleCanvasRelease();
}
