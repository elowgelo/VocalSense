// =============================================================================
// VOCALSENSE AI — 04. VOCALIST TRAINING CENTER & PROGRESS DASHBOARD
// Use Cases Covered:
//   - UC-17: Memantau Dasbor Analitik Progres Vokal & Perluasan Jangkauan Nada
//   - UC-18: Melacak Konsistensi Streak Latihan Bernyanyi dan Mengklaim Lencana
//   - UC-19: Menghasilkan Kurikulum Latihan Bernyanyi Personal AI (Gemini Planner)
//   - UC-20: Menjalankan Sesi Latihan Tangga Nada & Vokal Terpandu (Solfeggio Drills)
//
// 100% ARCHITECTURAL & UX CONSISTENCY:
//   - Left DAW Sidebar Dock (72 x 960) strictly matching Screen 02 (Bar-Chart active emerald squircle).
//   - Main Workspace Container (1368 x 960) at x=72.
//   - High-End Conservatory Pedagogy Center:
//       1. Acoustic Vocal Register Keyboard (3.5 octaves, white & black keys, color-coded register zones, Passaggio markers)
//       2. Bel Canto Bio-Acoustic Agility Matrix (Pitch Jitter, Amplitude Shimmer, Formant Ring +9.2dB, Closed Quotient 48%)
//       3. Gemini AI Multi-Track Conservatory Curriculum with vowel targets & metronome
//       4. Interactive Guided Solfeggio Studio with live microtonal pitch tolerance grading
// =============================================================================

function buildTrainingScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 04. Gamified Vocalist Training Center";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } },
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }
    ]
  }];

  const grid = figma.createLine();
  grid.resize(1440, 0); grid.x = 0; grid.y = 64;
  grid.strokes = solid({ r: 1, g: 1, b: 1 }, 0.04);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // -----------------------------------------------------------------------
  // LEFT DAW SIDEBAR DOCK (72 x 960) — 100% CONSISTENT WITH SCREEN 02
  // -----------------------------------------------------------------------
  const sidebar = figma.createFrame();
  sidebar.name = "DAW Sidebar Dock";
  sidebar.resize(72, 960);
  sidebar.x = 0;
  sidebar.y = 0;
  sidebar.fills = solid(C.sidebarBg, 1);
  sidebar.strokes = solid(C.sidebarBorder, 1);
  sidebar.strokeWeight = 1;
  sidebar.layoutMode = "VERTICAL";
  sidebar.primaryAxisSizingMode = "FIXED";
  sidebar.counterAxisSizingMode = "FIXED";
  sidebar.primaryAxisAlignItems = "SPACE_BETWEEN";
  sidebar.counterAxisAlignItems = "CENTER";
  sidebar.paddingTop = 20;
  sidebar.paddingBottom = 20;

  // Top: App Sparkle Logo Squircle (44x44)
  const logoSquircle = figma.createFrame();
  logoSquircle.name = "Brand Logo Dock Button";
  logoSquircle.layoutMode = "HORIZONTAL";
  logoSquircle.primaryAxisSizingMode = "FIXED";
  logoSquircle.counterAxisSizingMode = "FIXED";
  logoSquircle.resize(44, 44);
  logoSquircle.cornerRadius = 12;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (Bar-Chart active in emerald squircle for Screen 04!)
  const navGroup = figma.createFrame();
  navGroup.name = "Nav Icons Group";
  navGroup.layoutMode = "VERTICAL";
  navGroup.primaryAxisSizingMode = "AUTO";
  navGroup.counterAxisSizingMode = "AUTO";
  navGroup.itemSpacing = 16;
  navGroup.counterAxisAlignItems = "CENTER";
  navGroup.fills = [];

  const btnNavHome = createIconButton("home", "#8B9DAF", 42, 18, false);
  btnNavHome.name = "Nav/Home";
  const btnNavWave = createIconButton("waveform", "#8B9DAF", 42, 18, false);
  btnNavWave.name = "Nav/Reports";
  const btnNavChart = createIconButton("bar-chart", "#00F5A0", 42, 18, true); // Active for Training Center!
  btnNavChart.name = "Nav/Analytics";
  const btnNavDoc = createIconButton("document", "#8B9DAF", 42, 18, false);
  btnNavDoc.name = "Nav/Documents";

  navGroup.appendChild(btnNavHome);
  navGroup.appendChild(btnNavWave);
  navGroup.appendChild(btnNavChart);
  navGroup.appendChild(btnNavDoc);
  sidebar.appendChild(navGroup);

  // Bottom: Settings + ER Profile avatar
  const bottomGroup = figma.createFrame();
  bottomGroup.name = "Bottom Dock Group";
  bottomGroup.layoutMode = "VERTICAL";
  bottomGroup.primaryAxisSizingMode = "AUTO";
  bottomGroup.counterAxisSizingMode = "AUTO";
  bottomGroup.itemSpacing = 16;
  bottomGroup.counterAxisAlignItems = "CENTER";
  bottomGroup.fills = [];

  const btnSettings = createIconButton("settings", "#8B9DAF", 42, 18, false);
  btnSettings.name = "Nav/Settings";
  bottomGroup.appendChild(btnSettings);

  const avatarFrame = figma.createFrame();
  avatarFrame.name = "Nav/Avatar ER";
  avatarFrame.layoutMode = "HORIZONTAL";
  avatarFrame.primaryAxisSizingMode = "FIXED";
  avatarFrame.counterAxisSizingMode = "FIXED";
  avatarFrame.resize(36, 36);
  avatarFrame.cornerRadius = 18;
  avatarFrame.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  avatarFrame.strokes = solid(C.glassBorder, 1);
  avatarFrame.strokeWeight = 1.5;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 11, "Bold", C.textWhite));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN WORKSPACE CONTAINER (1368 x 960) AT x=72
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Training Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 14;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP OVERVIEW TOOLBAR (1312 x 46 px)
  // -----------------------------------------------------------------------
  const subBar = figma.createFrame();
  subBar.name = "Masterclass Overview Bar";
  subBar.layoutMode = "HORIZONTAL";
  subBar.resize(1312, 46);
  subBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  subBar.counterAxisAlignItems = "CENTER";
  subBar.fills = [];

  const sbLeft = figma.createFrame();
  sbLeft.layoutMode = "VERTICAL";
  sbLeft.primaryAxisSizingMode = "AUTO";
  sbLeft.counterAxisSizingMode = "AUTO";
  sbLeft.itemSpacing = 1;
  sbLeft.fills = [];

  const sbTitleRow = figma.createFrame();
  sbTitleRow.layoutMode = "HORIZONTAL";
  sbTitleRow.primaryAxisSizingMode = "AUTO";
  sbTitleRow.counterAxisSizingMode = "AUTO";
  sbTitleRow.itemSpacing = 8;
  sbTitleRow.counterAxisAlignItems = "CENTER";
  sbTitleRow.fills = [];
  sbTitleRow.appendChild(createText("Conservatory Vocal Pedagogy & Agility Center", 15, "Bold", C.textWhite));
  sbTitleRow.appendChild(createBadge("BEL CANTO DSP", "mint", 8));
  sbTitleRow.appendChild(createBadge("WEEK 2 OF 4", "neutral", 8));
  sbLeft.appendChild(sbTitleRow);
  sbLeft.appendChild(createText("Bel Canto Acoustic Calibration • Passaggio Bridge Mastery • Real-time YIN Pitch Accuracy", 11, "Medium", C.textZinc400));
  subBar.appendChild(sbLeft);

  const sbRight = figma.createFrame();
  sbRight.layoutMode = "HORIZONTAL";
  sbRight.primaryAxisSizingMode = "AUTO";
  sbRight.counterAxisSizingMode = "AUTO";
  sbRight.itemSpacing = 10;
  sbRight.counterAxisAlignItems = "CENTER";
  sbRight.fills = [];

  // Streak Badge
  const bStreak = figma.createFrame();
  bStreak.name = "Streak Badge";
  bStreak.layoutMode = "HORIZONTAL";
  bStreak.primaryAxisSizingMode = "AUTO";
  bStreak.counterAxisSizingMode = "AUTO";
  bStreak.itemSpacing = 6;
  bStreak.counterAxisAlignItems = "CENTER";
  bStreak.paddingLeft = 10; bStreak.paddingRight = 10; bStreak.paddingTop = 5; bStreak.paddingBottom = 5;
  bStreak.cornerRadius = 6;
  bStreak.fills = solid({ r: 0.18, g: 0.10, b: 0.02 }, 0.95);
  bStreak.strokes = solid(C.amber, 0.6); bStreak.strokeWeight = 1;
  bStreak.appendChild(createSvgIcon("sparkle", "#F59E0B", 13));
  bStreak.appendChild(createText("14-DAY STREAK (80%)", 10, "Bold", C.amber));
  sbRight.appendChild(bStreak);

  // Level XP
  const bLvl = figma.createFrame();
  bLvl.layoutMode = "HORIZONTAL";
  bLvl.primaryAxisSizingMode = "AUTO";
  bLvl.counterAxisSizingMode = "AUTO";
  bLvl.itemSpacing = 6;
  bLvl.counterAxisAlignItems = "CENTER";
  bLvl.paddingLeft = 10; bLvl.paddingRight = 10; bLvl.paddingTop = 5; bLvl.paddingBottom = 5;
  bLvl.cornerRadius = 6;
  bLvl.fills = solid(C.glassElevated, 1);
  bLvl.strokes = solid(C.glassBorder, 0.8);
  bLvl.strokeWeight = 1;
  bLvl.appendChild(createText("Level 8 (2,450 XP)", 10, "Bold", C.textZinc300));
  sbRight.appendChild(bLvl);

  const btnLesson = createActionButton("Launch Live Drill Session ↗", "arrow-up-right", "radiant");
  btnLesson.name = "Training/Launch Lesson";
  sbRight.appendChild(btnLesson);

  subBar.appendChild(sbRight);
  container.appendChild(subBar);

  // -----------------------------------------------------------------------
  // 2. BENTO ROW 1: ACOUSTIC VOCAL REGISTER MAP + BEL CANTO MATRIX (1312 x 400 px)
  // -----------------------------------------------------------------------
  const row1 = figma.createFrame();
  row1.name = "Row 1: Range & Bio-Acoustics";
  row1.layoutMode = "HORIZONTAL";
  row1.resize(1312, 400);
  row1.itemSpacing = 16;
  row1.fills = [];
  row1.clipsContent = false;

  // CARD 1: ACOUSTIC VOCAL REGISTER KEYBOARD (680 x 400 px)
  const rangeCard = figma.createFrame();
  rangeCard.name = "Acoustic Vocal Register Map Card";
  rangeCard.layoutMode = "VERTICAL";
  rangeCard.resize(680, 400);
  rangeCard.paddingLeft = 20; rangeCard.paddingRight = 20; rangeCard.paddingTop = 16; rangeCard.paddingBottom = 16;
  rangeCard.itemSpacing = 10;
  rangeCard.cornerRadius = 14;
  rangeCard.clipsContent = false;
  applyCard1Glass(rangeCard);

  const rgHead = figma.createFrame();
  rgHead.layoutMode = "HORIZONTAL"; rgHead.resize(640, 22); rgHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rgHead.counterAxisAlignItems = "CENTER"; rgHead.fills = [];
  rgHead.appendChild(createText("Acoustic Vocal Register Keyboard & Resonance Map", 13, "Bold", C.textWhite));
  rgHead.appendChild(createBadge("3.5-OCTAVE SPAN (C2–F5)", "mint", 9));
  rangeCard.appendChild(rgHead);

  // Authentic Ebony & Ivory Piano Keyboard (640 x 86 px)
  const kbBox = figma.createFrame();
  kbBox.resize(640, 86);
  kbBox.cornerRadius = 8;
  kbBox.fills = solid({ r: 0.04, g: 0.06, b: 0.08 }, 1);
  kbBox.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); kbBox.strokeWeight = 1;
  kbBox.clipsContent = true;

  // 24 Ivory Keys (Width 26.5px)
  const whiteKeyW = 26.5;
  for (let i = 0; i < 24; i++) {
    const wk = figma.createFrame();
    wk.resize(whiteKeyW - 2, 84); wk.x = 2 + (i * whiteKeyW); wk.y = 1;
    const inTestedRange = i >= 4 && i <= 17;
    const isPassaggioZone = i >= 11 && i <= 15;
    wk.fills = solid(
      isPassaggioZone ? { r: 0.03, g: 0.20, b: 0.14 } :
      (inTestedRange ? { r: 0.08, g: 0.14, b: 0.20 } : { r: 0.14, g: 0.17, b: 0.22 }),
      1
    );
    wk.strokes = solid(isPassaggioZone ? C.mint : (inTestedRange ? C.cyan : C.glassBorder), isPassaggioZone ? 0.7 : 0.2);
    wk.strokeWeight = 1;
    kbBox.appendChild(wk);
  }

  // 17 Ebony Black Keys
  const blackKeyIndices = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19, 21, 22];
  blackKeyIndices.forEach(idx => {
    const bk = figma.createFrame();
    bk.resize(15, 52); bk.x = 2 + (idx * whiteKeyW) + 18; bk.y = 1;
    bk.cornerRadius = 2;
    const inPassaggio = idx >= 11 && idx <= 15;
    bk.fills = solid(inPassaggio ? { r: 0.02, g: 0.12, b: 0.08 } : { r: 0.03, g: 0.04, b: 0.05 }, 1);
    bk.strokes = solid(inPassaggio ? C.mint : { r: 0.25, g: 0.30, b: 0.38 }, inPassaggio ? 0.6 : 0.4);
    bk.strokeWeight = 1;
    kbBox.appendChild(bk);
  });

  // Glowing Passaggio Marker at G4
  const g4Marker = figma.createFrame();
  g4Marker.resize(22, 16); g4Marker.x = 2 + (14 * whiteKeyW) + 2; g4Marker.y = 66;
  g4Marker.cornerRadius = 4;
  g4Marker.fills = solid(C.forestBase, 1);
  g4Marker.strokes = solid(C.mint, 1); g4Marker.strokeWeight = 1.2;
  g4Marker.layoutMode = "HORIZONTAL"; g4Marker.primaryAxisAlignItems = "CENTER"; g4Marker.counterAxisAlignItems = "CENTER";
  g4Marker.appendChild(createText("G4", 8, "Bold", C.mint));
  kbBox.appendChild(g4Marker);

  rangeCard.appendChild(kbBox);

  // 4 Color-Coded Register Span Badges
  const regBar = figma.createFrame();
  regBar.layoutMode = "HORIZONTAL"; regBar.resize(640, 24);
  regBar.primaryAxisAlignItems = "SPACE_BETWEEN"; regBar.counterAxisAlignItems = "CENTER"; regBar.fills = [];

  function makeRegPill(name, span, color, isActive = false) {
    const rp = figma.createFrame();
    rp.layoutMode = "HORIZONTAL"; rp.itemSpacing = 4; rp.counterAxisAlignItems = "CENTER";
    rp.paddingLeft = 7; rp.paddingRight = 7; rp.paddingTop = 2; rp.paddingBottom = 2;
    rp.cornerRadius = 5;
    rp.fills = solid(isActive ? C.forestBase : C.glassElevated, isActive ? 0.95 : 0.6);
    rp.strokes = solid(color, isActive ? 0.7 : 0.25); rp.strokeWeight = 1;
    rp.appendChild(createText(name, 9, "Bold", color));
    rp.appendChild(createText(span, 9, "Regular", C.textZinc300));
    return rp;
  }

  regBar.appendChild(makeRegPill("Chest Voice:", "C2–D4 (65–293Hz)", C.cyan));
  regBar.appendChild(makeRegPill("Passaggio Bridge:", "D4–G4 (293–392Hz)", C.mint, true));
  regBar.appendChild(makeRegPill("Head Voice:", "G4–C5 (392–523Hz)", C.amber));
  regBar.appendChild(makeRegPill("Whistle/Upper:", "C5–F5 (523–698Hz)", { r: 0.70, g: 0.50, b: 0.95 }));
  rangeCard.appendChild(regBar);

  // Tested Range Metrics
  function makeRangeMetric(label, range, gain, color) {
    const rm = figma.createFrame();
    rm.layoutMode = "HORIZONTAL"; rm.resize(640, 26);
    rm.primaryAxisAlignItems = "SPACE_BETWEEN"; rm.counterAxisAlignItems = "CENTER"; rm.fills = [];
    rm.appendChild(createText(label, 11, "Medium", C.textZinc300));
    const rVal = figma.createFrame();
    rVal.layoutMode = "HORIZONTAL"; rVal.itemSpacing = 8; rVal.counterAxisAlignItems = "CENTER"; rVal.fills = [];
    rVal.appendChild(createText(range, 12, "Bold", C.textWhite));
    rVal.appendChild(createBadge(gain, color, 8));
    rm.appendChild(rVal);
    return rm;
  }

  rangeCard.appendChild(makeRangeMetric("Initial Diagnostic Baseline (Sep 14):", "C2 — E4 (2.2 Octaves)", "Baseline", "neutral"));
  rangeCard.appendChild(makeRangeMetric("Current Tested Singing Range (Today):", "C2 — A4 (2.8 Octaves)", "+5 Semitones Gained", "mint"));
  rangeCard.appendChild(makeRangeMetric("Gemini Projected Full Span Target:", "C2 — C5 (3.0 Octaves)", "High C Goal", "amber"));

  // Passaggio Acoustic Transition Box
  const passBox = figma.createFrame();
  passBox.layoutMode = "HORIZONTAL"; passBox.resize(640, 42);
  passBox.primaryAxisAlignItems = "SPACE_BETWEEN"; passBox.counterAxisAlignItems = "CENTER";
  passBox.paddingLeft = 12; passBox.paddingRight = 12;
  passBox.cornerRadius = 8; passBox.fills = solid(C.glassElevated, 1);
  passBox.strokes = solid(C.glassBorder, 0.8); passBox.strokeWeight = 1;
  passBox.appendChild(createText("Primo Passaggio: D4 (293Hz) • Cricothyroid Tilt Locked", 11, "Bold", C.cyan));
  passBox.appendChild(createText("Secondo Passaggio: G4 (392Hz) • F1/F2 Formant Coupling Active", 11, "Bold", C.amber));
  rangeCard.appendChild(passBox);

  row1.appendChild(rangeCard);

  // CARD 2: BEL CANTO BIO-ACOUSTIC AGILITY MATRIX (616 x 400 px)
  const matrixCard = figma.createFrame();
  matrixCard.name = "Bel Canto Bio-Acoustic Matrix Card";
  matrixCard.layoutMode = "VERTICAL";
  matrixCard.resize(616, 400);
  matrixCard.paddingLeft = 20; matrixCard.paddingRight = 20; matrixCard.paddingTop = 16; matrixCard.paddingBottom = 16;
  matrixCard.itemSpacing = 10;
  matrixCard.cornerRadius = 14;
  matrixCard.clipsContent = false;
  applyCard2Glass(matrixCard);

  const mxHead = figma.createFrame();
  mxHead.layoutMode = "HORIZONTAL"; mxHead.resize(576, 22); mxHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mxHead.counterAxisAlignItems = "CENTER"; mxHead.fills = [];
  mxHead.appendChild(createText("Bel Canto Bio-Acoustic Agility Matrix", 13, "Bold", C.textWhite));
  mxHead.appendChild(createBadge("STUDIO LAB DSP", "mint", 9));
  matrixCard.appendChild(mxHead);

  matrixCard.appendChild(createText("Laboratory-grade vocal tract stability & phonation measurements:", 10, "Medium", C.textZinc400));

  function makeLabMeter(title, value, norm, rating, pct, color) {
    const mb = figma.createFrame();
    mb.layoutMode = "VERTICAL"; mb.resize(576, 48); mb.itemSpacing = 4;
    mb.paddingLeft = 10; mb.paddingRight = 10; mb.paddingTop = 6; mb.paddingBottom = 6;
    mb.cornerRadius = 8;
    mb.fills = solid(C.glassElevated, 0.7);
    mb.strokes = solid(C.glassBorder, 0.35); mb.strokeWeight = 1;

    const top = figma.createFrame();
    top.layoutMode = "HORIZONTAL"; top.resize(556, 15); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER"; top.fills = [];
    const tL = figma.createFrame(); tL.layoutMode = "HORIZONTAL"; tL.itemSpacing = 8; tL.counterAxisAlignItems = "CENTER"; tL.fills = [];
    tL.appendChild(createText(title, 11, "Bold", C.textWhite));
    tL.appendChild(createText(norm, 9, "Regular", C.textZinc500));
    top.appendChild(tL);

    const tR = figma.createFrame(); tR.layoutMode = "HORIZONTAL"; tR.itemSpacing = 8; tR.counterAxisAlignItems = "CENTER"; tR.fills = [];
    tR.appendChild(createText(value, 11, "Bold", color));
    tR.appendChild(createBadge(rating, color === C.mint ? "mint" : (color === C.amber ? "amber" : "neutral"), 8));
    top.appendChild(tR);
    mb.appendChild(top);

    const track = figma.createFrame();
    track.resize(556, 4); track.cornerRadius = 2; track.fills = solid({ r: 0.12, g: 0.15, b: 0.20 }, 1);
    const fill = figma.createFrame();
    fill.resize(Math.round(556 * pct), 4); fill.cornerRadius = 2; fill.fills = solid(color, 1);
    track.appendChild(fill);
    mb.appendChild(track);

    return mb;
  }

  matrixCard.appendChild(makeLabMeter("Pitch Jitter (Perturbation)", "0.18%", "Norm < 0.50%", "Virtuoso Stability", 0.92, C.mint));
  matrixCard.appendChild(makeLabMeter("Amplitude Shimmer (Intensity Fluctuation)", "1.42%", "Norm < 3.0%", "Smooth Breath Flow", 0.88, C.cyan));
  matrixCard.appendChild(makeLabMeter("Singer's Formant Ring (F3/F4 2.8k–3.2k)", "+9.2 dB", "Chiaroscuro Acoustic Peak", "Resonant Projection", 0.94, C.mint));
  matrixCard.appendChild(makeLabMeter("Vocal Fold Closed Phase Quotient (CQ)", "48%", "Optimal: 45–55%", "Zero Strain", 0.85, C.amber));

  // Vocal Stamina Monitor Bar
  const stamBox = figma.createFrame();
  stamBox.layoutMode = "HORIZONTAL"; stamBox.resize(576, 36);
  stamBox.primaryAxisAlignItems = "SPACE_BETWEEN"; stamBox.counterAxisAlignItems = "CENTER";
  stamBox.paddingLeft = 12; stamBox.paddingRight = 12;
  stamBox.cornerRadius = 8;
  stamBox.fills = solid(C.forestBase, 0.7);
  stamBox.strokes = solid(C.mint, 0.35); stamBox.strokeWeight = 1;
  stamBox.appendChild(createText("Vocal Stamina Remaining: 92% (Safe Window: 42 mins today)", 10, "Bold", C.mint));
  
  const btnCalib = createActionButton("Acoustic Recalibration ↗", "refresh", "radiant");
  btnCalib.name = "Training/Recalibration";
  stamBox.appendChild(btnCalib);
  matrixCard.appendChild(stamBox);

  row1.appendChild(matrixCard);
  container.appendChild(row1);

  // -----------------------------------------------------------------------
  // 3. BENTO ROW 2: ADAPTIVE AI CURRICULUM + SOLFEGGIO STUDIO (1312 x 430 px)
  // -----------------------------------------------------------------------
  const row2 = figma.createFrame();
  row2.name = "Row 2: Curriculum & Guided Drills";
  row2.layoutMode = "HORIZONTAL";
  row2.resize(1312, 430);
  row2.itemSpacing = 16;
  row2.fills = [];
  row2.clipsContent = false;

  // CARD 3: GEMINI AI MULTI-TRACK CURRICULUM (648 x 430 px)
  const planCard = figma.createFrame();
  planCard.name = "Gemini AI Vocal Curriculum Card";
  planCard.layoutMode = "VERTICAL";
  planCard.resize(648, 430);
  planCard.paddingLeft = 20; planCard.paddingRight = 20; planCard.paddingTop = 16; planCard.paddingBottom = 16;
  planCard.itemSpacing = 8;
  planCard.cornerRadius = 14;
  planCard.clipsContent = false;
  applyCard1Glass(planCard);

  const plHead = figma.createFrame();
  plHead.layoutMode = "HORIZONTAL"; plHead.resize(608, 22); plHead.primaryAxisAlignItems = "SPACE_BETWEEN"; plHead.counterAxisAlignItems = "CENTER"; plHead.fills = [];
  const plTitle = figma.createFrame();
  plTitle.layoutMode = "HORIZONTAL"; plTitle.itemSpacing = 6; plTitle.counterAxisAlignItems = "CENTER"; plTitle.fills = [];
  plTitle.appendChild(createSvgIcon("sparkle", "#00F5A0", 15));
  plTitle.appendChild(createText("Gemini AI Adaptive Masterclass Curriculum", 13, "Bold", C.mint));
  plHead.appendChild(plTitle);
  plHead.appendChild(createBadge("WEEK 2 OF 4", "neutral", 9));
  planCard.appendChild(plHead);

  planCard.appendChild(createText("Focus: Conquering the F#4 to G4 Passaggio Transition", 14, "Bold", C.textWhite));
  planCard.appendChild(createParagraph("Generated adaptively from your last 12 diagnostic takes. Target vowel articulators with BPM metronome.", 608, 10, "Regular", C.textZinc300, 15));

  function makePlanItem(day, title, duration, vowel, status) {
    const item = figma.createFrame();
    item.layoutMode = "HORIZONTAL"; item.resize(608, 44);
    item.primaryAxisAlignItems = "SPACE_BETWEEN"; item.counterAxisAlignItems = "CENTER";
    item.paddingLeft = 12; item.paddingRight = 12;
    item.cornerRadius = 8;
    const isActive = status === "active";
    const isDone = status === "done";
    item.fills = solid(isActive ? C.forestBase : C.glassElevated, isActive ? 0.9 : 0.7);
    item.strokes = solid(isActive ? C.mint : (isDone ? C.emerald : C.glassBorder), isActive ? 0.7 : 0.3);
    item.strokeWeight = 1;

    const leftGroup = figma.createFrame();
    leftGroup.layoutMode = "HORIZONTAL"; leftGroup.itemSpacing = 8; leftGroup.counterAxisAlignItems = "CENTER"; leftGroup.fills = [];
    leftGroup.appendChild(createBadge(day, isActive ? "mint" : (isDone ? "emerald" : "neutral"), 8));
    leftGroup.appendChild(createText(title, 11, "Bold", isDone ? C.textZinc400 : C.textWhite));
    leftGroup.appendChild(createBadge(vowel, "neutral", 8));
    leftGroup.appendChild(createText("• " + duration, 10, "Medium", C.textZinc500));
    item.appendChild(leftGroup);

    if (isDone) {
      item.appendChild(createBadge("COMPLETED", "emerald", 8));
    } else if (isActive) {
      const btnStart = createActionButton("Start Drill ↗", null, "radiant");
      btnStart.name = "Curriculum/Start Now";
      item.appendChild(btnStart);
    } else {
      item.appendChild(createBadge("UPCOMING", "neutral", 8));
    }
    return item;
  }

  planCard.appendChild(makePlanItem("DAY 1", "SOVT Straw Phonation & Lip Trills", "8 mins", "/u/ Vowel", "done"));
  planCard.appendChild(makePlanItem("DAY 2", "5-Tone Ascending Scale Stability", "10 mins", "/o/ Vowel", "done"));
  planCard.appendChild(makePlanItem("DAY 3", "Arpeggio Mix-Voice Transition (F#4 Bridge)", "12 mins", "/i/ Vowel", "active"));
  planCard.appendChild(makePlanItem("DAY 4", "Vibrato & Chiaroscuro Ring Sustains", "15 mins", "/a/ Vowel", "pending"));

  const planFoot = figma.createFrame();
  planFoot.layoutMode = "HORIZONTAL"; planFoot.resize(608, 34);
  planFoot.primaryAxisAlignItems = "SPACE_BETWEEN"; planFoot.counterAxisAlignItems = "CENTER";
  planFoot.paddingLeft = 12; planFoot.paddingRight = 12;
  planFoot.cornerRadius = 6; planFoot.fills = solid(C.glassElevated, 0.8);
  planFoot.strokes = solid(C.glassBorder, 0.4); planFoot.strokeWeight = 1;
  planFoot.appendChild(createText("Tempo: 120 BPM • Meter: 4/4 • Acoustic Guide Tone: G4 (392Hz)", 10, "Medium", C.textZinc400));
  planFoot.appendChild(createBadge("AI PEDAGOGY SYNCED", "mint", 8));
  planCard.appendChild(planFoot);

  row2.appendChild(planCard);

  // CARD 4: INTERACTIVE GUIDED SOLFEGGIO STUDIO (648 x 430 px)
  const scaleCard = figma.createFrame();
  scaleCard.name = "Guided Scales Solfeggio Card";
  scaleCard.layoutMode = "VERTICAL";
  scaleCard.resize(648, 430);
  scaleCard.paddingLeft = 20; scaleCard.paddingRight = 20; scaleCard.paddingTop = 16; scaleCard.paddingBottom = 16;
  scaleCard.itemSpacing = 8;
  scaleCard.cornerRadius = 14;
  scaleCard.clipsContent = false;
  applyCard2Glass(scaleCard);

  const scHead = figma.createFrame();
  scHead.layoutMode = "HORIZONTAL"; scHead.resize(608, 22); scHead.primaryAxisAlignItems = "SPACE_BETWEEN"; scHead.counterAxisAlignItems = "CENTER"; scHead.fills = [];
  scHead.appendChild(createText("Guided Solfeggio & Microtonal Agility Studio", 13, "Bold", C.textWhite));
  scHead.appendChild(createBadge("LIVE YIN PITCH TRACKER", "mint", 9));
  scaleCard.appendChild(scHead);

  scaleCard.appendChild(createText("Exercise: G Major 5-Tone Solfeggio Arpeggio", 14, "Bold", C.textWhite));
  scaleCard.appendChild(createParagraph("Sing each tone into your microphone. VocalSense performs sub-cent harmonic DSP grading in real-time.", 608, 10, "Regular", C.textZinc300, 15));

  // 8 Solfeggio Pads
  const solfRow = figma.createFrame();
  solfRow.layoutMode = "HORIZONTAL"; solfRow.resize(608, 72);
  solfRow.primaryAxisAlignItems = "SPACE_BETWEEN"; solfRow.counterAxisAlignItems = "CENTER"; solfRow.fills = [];

  const notes = [
    { sol: "Do", pitch: "C4", score: "99%", active: false },
    { sol: "Re", pitch: "D4", score: "96%", active: false },
    { sol: "Mi", pitch: "E4", score: "95%", active: false },
    { sol: "Fa", pitch: "F4", score: "92%", active: false },
    { sol: "Sol", pitch: "G4", score: "98%", active: true },
    { sol: "La", pitch: "A4", score: "--", active: false },
    { sol: "Ti", pitch: "B4", score: "--", active: false },
    { sol: "Do", pitch: "C5", score: "--", active: false }
  ];

  notes.forEach(n => {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL"; p.resize(68, 68);
    p.primaryAxisAlignItems = "CENTER"; p.counterAxisAlignItems = "CENTER";
    p.itemSpacing = 2;
    p.cornerRadius = 8;
    p.fills = solid(n.active ? C.forestBase : C.glassElevated, n.active ? 1 : 0.85);
    p.strokes = solid(n.active ? C.mint : C.glassBorder, n.active ? 0.9 : 0.3);
    p.strokeWeight = n.active ? 1.5 : 1;

    p.appendChild(createText(n.sol, 13, "Bold", n.active ? C.mint : C.textWhite));
    p.appendChild(createText(n.pitch, 9, "Medium", C.textZinc400));
    p.appendChild(createBadge(n.score, n.active ? "mint" : "neutral", 8));
    solfRow.appendChild(p);
  });
  scaleCard.appendChild(solfRow);

  // Realtime Audio DSP Pitch Imitation Box
  const imitBox = figma.createFrame();
  imitBox.layoutMode = "HORIZONTAL"; imitBox.resize(608, 48);
  imitBox.primaryAxisAlignItems = "SPACE_BETWEEN"; imitBox.counterAxisAlignItems = "CENTER";
  imitBox.paddingLeft = 12; imitBox.paddingRight = 12;
  imitBox.cornerRadius = 8;
  imitBox.fills = solid(C.forestBase, 0.75);
  imitBox.strokes = solid(C.mint, 0.45); imitBox.strokeWeight = 1;

  const imitLeft = figma.createFrame();
  imitLeft.layoutMode = "HORIZONTAL"; imitLeft.itemSpacing = 8; imitLeft.counterAxisAlignItems = "CENTER"; imitLeft.fills = [];
  const recDot = figma.createEllipse(); recDot.resize(8, 8); recDot.fills = solid(C.mint, 1);
  imitLeft.appendChild(recDot);
  imitLeft.appendChild(createText("Listening: Voice locked at G4 (392.2 Hz) • In-Tune (+1.8 cents)", 11, "Bold", C.mint));
  imitBox.appendChild(imitLeft);

  imitBox.appendChild(createBadge("ACCURACY: 98.4%", "mint", 9));
  scaleCard.appendChild(imitBox);

  // Action toolbar
  const scAct = figma.createFrame();
  scAct.layoutMode = "HORIZONTAL"; scAct.resize(608, 36);
  scAct.primaryAxisAlignItems = "SPACE_BETWEEN"; scAct.counterAxisAlignItems = "CENTER"; scAct.fills = [];
  
  const scActL = figma.createFrame();
  scActL.layoutMode = "HORIZONTAL"; scActL.itemSpacing = 8; scActL.counterAxisAlignItems = "CENTER"; scActL.fills = [];
  scActL.appendChild(createActionButton("Play Piano Guide", "play", "secondary"));
  scActL.appendChild(createActionButton("Metronome 120 BPM", null, "secondary"));
  scAct.appendChild(scActL);

  const btnNext = createActionButton("Next Exercise: Octave Leap ↗", "arrow-up-right", "radiant");
  btnNext.name = "Scale/Next Scale";
  scAct.appendChild(btnNext);
  scaleCard.appendChild(scAct);

  row2.appendChild(scaleCard);
  container.appendChild(row2);

  return root;
}
