// =============================================================================
// VOCALSENSE AI — 05B. VOCALIST ONBOARDING & HARDWARE SETUP WIZARD
// Dedicated 3-Step Pedagogical Calibration Experience (1440 x 960 px)
// Covers UC-02 (SATB Vocal Range), UC-03 (Repertoire), UC-04 (Mic Calibration)
//
// ENHANCEMENTS:
//   - Eliminated all box-in-box slop (no clunky border around "Step 3 of 3").
//   - Clean editorial typography for section titles.
//   - Zero text collisions or clippings across all 3 wizard cards.
//   - Perfectly sized genre chips (2 per row) with zero overflow.
// =============================================================================

function buildOnboardingScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 05B. Vocalist Onboarding & Hardware Setup";
  root.resize(1440, 960);
  root.x = originX;
  root.y = originY;
  root.clipsContent = true;

  // Dark canvas gradient
  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } },
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }
    ]
  }];

  const grid = figma.createFrame();
  grid.resize(1440, 960); grid.fills = []; grid.strokes = solid(C.gridLine, 0.035);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  const stack = figma.createFrame();
  stack.name = "Onboarding Stack";
  stack.layoutMode = "VERTICAL";
  stack.resize(1440, 960);
  stack.paddingLeft = 60; stack.paddingRight = 60;
  stack.paddingTop = 28; stack.paddingBottom = 36;
  stack.itemSpacing = 20;
  stack.fills = [];
  stack.clipsContent = false;
  root.appendChild(stack);

  // ---------------------------------------------------------------------------
  // 1. TOP HEADER & STEPPER (1320 x 48 px)
  // ---------------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.layoutMode = "HORIZONTAL"; topBar.resize(1320, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN"; topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const bLogo = figma.createFrame();
  bLogo.layoutMode = "HORIZONTAL"; bLogo.itemSpacing = 10; bLogo.counterAxisAlignItems = "CENTER"; bLogo.fills = [];
  bLogo.primaryAxisSizingMode = "AUTO"; bLogo.counterAxisSizingMode = "AUTO";
  bLogo.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  bLogo.appendChild(createText("VocalSense AI", 16, "Bold", C.textWhite));
  bLogo.appendChild(createBadge("VOCALIST ONBOARDING WIZARD", "mint", 9));
  topBar.appendChild(bLogo);

  // Clean, minimal stepper indicator in Center (NO clunky double boxes!)
  const stepper = figma.createFrame();
  stepper.layoutMode = "HORIZONTAL"; stepper.itemSpacing = 14; stepper.counterAxisAlignItems = "CENTER"; stepper.fills = [];
  stepper.primaryAxisSizingMode = "AUTO"; stepper.counterAxisSizingMode = "AUTO";

  function makeStep(num, label, state = "upcoming") {
    const s = figma.createFrame();
    s.layoutMode = "HORIZONTAL"; s.itemSpacing = 6; s.counterAxisAlignItems = "CENTER";
    s.primaryAxisSizingMode = "AUTO"; s.counterAxisSizingMode = "AUTO";
    s.paddingLeft = 10; s.paddingRight = 10; s.paddingTop = 5; s.paddingBottom = 5;
    s.cornerRadius = 6;
    if (state === "active") {
      s.fills = solid(C.forestBase, 1);
      s.strokes = solid(C.mint, 0.7); s.strokeWeight = 1;
      s.appendChild(createText(String(num), 10, "Bold", C.mint));
      s.appendChild(createText(label, 11, "Bold", C.mint));
    } else if (state === "done") {
      s.fills = solid(C.glassElevated, 1);
      s.strokes = solid(C.mint, 0.35); s.strokeWeight = 1;
      s.appendChild(createSvgIcon("check", "#00F5A0", 11));
      s.appendChild(createText(label, 11, "Medium", C.textWhite));
    } else {
      s.fills = [];
      s.appendChild(createText(String(num), 10, "Medium", C.textZinc500));
      s.appendChild(createText(label, 11, "Regular", C.textZinc400));
    }
    return s;
  }
  stepper.appendChild(makeStep(1, "Vocal Range", "done"));
  stepper.appendChild(createText("—", 11, "Regular", C.textZinc500));
  stepper.appendChild(makeStep(2, "Repertoire", "done"));
  stepper.appendChild(createText("—", 11, "Regular", C.textZinc500));
  stepper.appendChild(makeStep(3, "Mic Calibration", "active"));
  topBar.appendChild(stepper);

  const skipBtn = figma.createFrame();
  skipBtn.name = "Button/Skip Setup";
  skipBtn.layoutMode = "HORIZONTAL"; skipBtn.itemSpacing = 6; skipBtn.counterAxisAlignItems = "CENTER";
  skipBtn.primaryAxisSizingMode = "AUTO"; skipBtn.counterAxisSizingMode = "AUTO";
  skipBtn.paddingLeft = 14; skipBtn.paddingRight = 14; skipBtn.paddingTop = 7; skipBtn.paddingBottom = 7;
  skipBtn.cornerRadius = 8; skipBtn.fills = solid(C.glassElevated, 1);
  skipBtn.strokes = solid(C.glassBorder, 1); skipBtn.strokeWeight = 1;
  skipBtn.appendChild(createText("Skip to Studio DAW ↗", 11, "Medium", C.textZinc300));
  topBar.appendChild(skipBtn);

  stack.appendChild(topBar);

  // ---------------------------------------------------------------------------
  // 2. CLEAN EDITORIAL HEADER (NO SLOPPY BOX!)
  // ---------------------------------------------------------------------------
  const titleHeader = figma.createFrame();
  titleHeader.name = "Editorial Title Header";
  titleHeader.layoutMode = "VERTICAL";
  titleHeader.resize(1320, 60);
  titleHeader.itemSpacing = 4;
  titleHeader.fills = [];

  titleHeader.appendChild(createText("Final Calibration & Acoustic Profile", 22, "Bold", C.textWhite));
  titleHeader.appendChild(createText("Step 3 of 3 • Tailoring your bio-acoustic feedback engine and noise floor to your studio hardware.", 13, "Regular", C.textZinc400));
  stack.appendChild(titleHeader);

  // ---------------------------------------------------------------------------
  // 3. THREE COLUMNS WIZARD CARDS (1320 x 740 px)
  // ---------------------------------------------------------------------------
  const wizardRow = figma.createFrame();
  wizardRow.name = "Wizard Cards Row";
  wizardRow.layoutMode = "HORIZONTAL";
  wizardRow.resize(1320, 740);
  wizardRow.itemSpacing = 24;
  wizardRow.fills = [];
  wizardRow.clipsContent = false;

  // CARD 1: SATB VOCAL CLASSIFICATION (424 x 740)
  const card1 = figma.createFrame();
  card1.name = "Card 1: Voice Classification";
  card1.layoutMode = "VERTICAL";
  card1.resize(424, 740);
  card1.paddingLeft = 22; card1.paddingRight = 22; card1.paddingTop = 22; card1.paddingBottom = 22;
  card1.itemSpacing = 14;
  card1.cornerRadius = 16;
  applyCard2Glass(card1);

  const c1Head = figma.createFrame();
  c1Head.layoutMode = "HORIZONTAL"; c1Head.resize(380, 24); c1Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c1Head.counterAxisAlignItems = "CENTER"; c1Head.fills = [];
  c1Head.appendChild(createText("1. Voice Classification (SATB)", 13, "Bold", C.textWhite));
  c1Head.appendChild(createBadge("TENOR SELECTED", "mint", 9));
  card1.appendChild(c1Head);

  card1.appendChild(createText("Select your primary vocal tessitura for piano roll lines.", 11, "Regular", C.textZinc400));

  const satbList = [
    { type: "Soprano", range: "C4 – C6", desc: "High Female / Head Voice Focus", active: false },
    { type: "Mezzo-Soprano", range: "A3 – A5", desc: "Middle Female / Rich Core Resonance", active: false },
    { type: "Contralto / Alto", range: "F3 – F5", desc: "Deep Female / Low Chest Tessitura", active: false },
    { type: "Tenor", range: "C3 – A4", desc: "High Male / Leggero & Lyrico (Active)", active: true },
    { type: "Baritone", range: "A2 – F4", desc: "Middle Male / Warm Robust Resonance", active: false },
    { type: "Bass", range: "E2 – E4", desc: "Low Male / Sub-Chest Foundation", active: false }
  ];

  satbList.forEach(item => {
    const tile = figma.createFrame();
    tile.layoutMode = "HORIZONTAL"; tile.resize(380, 58); tile.cornerRadius = 8;
    tile.primaryAxisAlignItems = "SPACE_BETWEEN"; tile.counterAxisAlignItems = "CENTER";
    tile.paddingLeft = 14; tile.paddingRight = 14;
    tile.fills = solid(item.active ? C.forestBase : C.glassElevated, item.active ? 1 : 0.65);
    tile.strokes = solid(item.active ? C.mint : C.glassBorder, item.active ? 0.9 : 0.25);
    tile.strokeWeight = item.active ? 1.5 : 1;

    const tLeft = figma.createFrame(); tLeft.layoutMode = "VERTICAL"; tLeft.itemSpacing = 2; tLeft.fills = [];
    tLeft.appendChild(createText(item.type, 12, item.active ? "Bold" : "Medium", item.active ? C.mint : C.textWhite));
    tLeft.appendChild(createText(item.desc, 10, "Regular", item.active ? C.textZinc300 : C.textZinc500));
    tile.appendChild(tLeft);

    tile.appendChild(createBadge(item.range, item.active ? "mint" : "neutral", 9));
    card1.appendChild(tile);
  });
  wizardRow.appendChild(card1);

  // CARD 2: REPERTOIRE & PEDAGOGICAL GOALS (424 x 740)
  const card2 = figma.createFrame();
  card2.name = "Card 2: Repertoire & Goals";
  card2.layoutMode = "VERTICAL";
  card2.resize(424, 740);
  card2.paddingLeft = 22; card2.paddingRight = 22; card2.paddingTop = 22; card2.paddingBottom = 22;
  card2.itemSpacing = 14;
  card2.cornerRadius = 16;
  applyCard2Glass(card2);

  const c2Head = figma.createFrame();
  c2Head.layoutMode = "HORIZONTAL"; c2Head.resize(380, 24); c2Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c2Head.counterAxisAlignItems = "CENTER"; c2Head.fills = [];
  c2Head.appendChild(createText("2. Pedagogical Goals & Genre", 13, "Bold", C.textWhite));
  c2Head.appendChild(createBadge("2 SELECTED", "mint", 9));
  card2.appendChild(c2Head);

  card2.appendChild(createText("Choose focus genres to calibrate Gemini AI feedback.", 11, "Regular", C.textZinc400));

  // Genre Chips: Exactly 2 per row, perfectly fitting 380px without collision
  const genreGrid = figma.createFrame();
  genreGrid.name = "Genre Chips Grid";
  genreGrid.layoutMode = "VERTICAL"; genreGrid.itemSpacing = 8; genreGrid.resize(380, 116); genreGrid.fills = [];

  function makeGenreRow(item1, active1, item2, active2) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(380, 32); row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.fills = [];

    function makeGenreBadge(lbl, active) {
      const b = figma.createFrame();
      b.layoutMode = "HORIZONTAL"; b.resize(184, 32); b.cornerRadius = 6;
      b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER";
      b.fills = solid(active ? C.forestBase : C.glassElevated, active ? 0.95 : 0.7);
      b.strokes = solid(active ? C.mint : C.glassBorder, active ? 0.7 : 0.25);
      b.strokeWeight = 1;
      b.appendChild(createText(lbl, 10, active ? "Bold" : "Medium", active ? C.mint : C.textZinc300));
      return b;
    }
    row.appendChild(makeGenreBadge(item1, active1));
    row.appendChild(makeGenreBadge(item2, active2));
    return row;
  }

  genreGrid.appendChild(makeGenreRow("Pop / Contemporary", true, "Classical / Opera", false));
  genreGrid.appendChild(makeGenreRow("R&B / Soul (Active)", true, "Rock / Belting", false));
  genreGrid.appendChild(makeGenreRow("Jazz / Theatre", false, "Gospel / Choral", false));
  card2.appendChild(genreGrid);

  card2.appendChild(createText("Primary Focus Technique:", 12, "Bold", C.textWhite));

  const goals = [
    { title: "Bridge Passaggio Smoothly (F#4–G4)", desc: "Eliminate register breaks during chest-to-mix transition.", active: true },
    { title: "Vibrato Stability & Rate (5.8–6.5 Hz)", desc: "Cultivate consistent relaxed laryngeal oscillations.", active: false },
    { title: "Vowel Formant Tuning (F1 / F2)", desc: "Maximize acoustic resonance without vocal strain.", active: false }
  ];

  goals.forEach(g => {
    const gBox = figma.createFrame();
    gBox.layoutMode = "VERTICAL"; gBox.resize(380, 68); gBox.cornerRadius = 8;
    gBox.paddingLeft = 14; gBox.paddingRight = 14; gBox.paddingTop = 10; gBox.paddingBottom = 10;
    gBox.itemSpacing = 3;
    gBox.fills = solid(g.active ? C.forestBase : C.glassElevated, g.active ? 1 : 0.6);
    gBox.strokes = solid(g.active ? C.mint : C.glassBorder, g.active ? 0.9 : 0.25);
    gBox.strokeWeight = 1;

    gBox.appendChild(createText(g.title, 11, "Bold", g.active ? C.mint : C.textWhite));
    gBox.appendChild(createText(g.desc, 10, "Regular", C.textZinc400));
    card2.appendChild(gBox);
  });
  wizardRow.appendChild(card2);

  // CARD 3: HARDWARE & NOISE CALIBRATION (424 x 740)
  const card3 = figma.createFrame();
  card3.name = "Card 3: Hardware Calibration";
  card3.layoutMode = "VERTICAL";
  card3.resize(424, 740);
  card3.paddingLeft = 22; card3.paddingRight = 22; card3.paddingTop = 22; card3.paddingBottom = 22;
  card3.itemSpacing = 16;
  card3.cornerRadius = 16;
  applyCard2Glass(card3);

  const c3Head = figma.createFrame();
  c3Head.layoutMode = "HORIZONTAL"; c3Head.resize(380, 24); c3Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c3Head.counterAxisAlignItems = "CENTER"; c3Head.fills = [];
  c3Head.appendChild(createText("3. Hardware & Noise Calibration", 13, "Bold", C.textWhite));
  c3Head.appendChild(createBadge("CONNECTED", "mint", 9));
  card3.appendChild(c3Head);

  card3.appendChild(createText("Calibrate microphone gain & measure ambient noise floor.", 11, "Regular", C.textZinc400));

  // Device Info Box
  const devBox = figma.createFrame();
  devBox.layoutMode = "HORIZONTAL"; devBox.resize(380, 58); devBox.cornerRadius = 8;
  devBox.primaryAxisAlignItems = "SPACE_BETWEEN"; devBox.counterAxisAlignItems = "CENTER";
  devBox.paddingLeft = 14; devBox.paddingRight = 14;
  devBox.fills = solid(C.glassElevated, 1);
  devBox.strokes = solid(C.glassBorder, 0.7); devBox.strokeWeight = 1;

  const devL = figma.createFrame(); devL.layoutMode = "VERTICAL"; devL.itemSpacing = 2; devL.fills = [];
  devL.appendChild(createText("Shure MV7 USB Dynamic Mic", 12, "Bold", C.textWhite));
  devL.appendChild(createText("Sampling Rate: 48,000 Hz • Lossless PCM", 10, "Regular", C.textZinc400));
  devBox.appendChild(devL);
  devBox.appendChild(createBadge("48kHz DSP", "mint", 9));
  card3.appendChild(devBox);

  // Meter 1: Live Input Level
  const m1 = figma.createFrame(); m1.layoutMode = "VERTICAL"; m1.itemSpacing = 6; m1.resize(380, 60); m1.fills = [];
  const m1Head = figma.createFrame(); m1Head.layoutMode = "HORIZONTAL"; m1Head.resize(380, 16); m1Head.primaryAxisAlignItems = "SPACE_BETWEEN"; m1Head.fills = [];
  m1Head.appendChild(createText("Input Gain Level (Optimal)", 11, "Medium", C.textZinc300));
  m1Head.appendChild(createText("-18.4 dB RMS", 11, "Bold", C.mint));
  m1.appendChild(m1Head);

  const bar1 = figma.createFrame(); bar1.resize(380, 10); bar1.cornerRadius = 5; bar1.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  const fill1 = figma.createFrame(); fill1.resize(270, 10); fill1.cornerRadius = 5;
  fill1.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.06, g: 0.72, b: 0.50, a: 1 } }] }];
  bar1.appendChild(fill1);
  m1.appendChild(bar1);
  card3.appendChild(m1);

  // Meter 2: Room Noise Floor
  const m2 = figma.createFrame(); m2.layoutMode = "VERTICAL"; m2.itemSpacing = 6; m2.resize(380, 60); m2.fills = [];
  const m2Head = figma.createFrame(); m2Head.layoutMode = "HORIZONTAL"; m2Head.resize(380, 16); m2Head.primaryAxisAlignItems = "SPACE_BETWEEN"; m2Head.fills = [];
  m2Head.appendChild(createText("Ambient Noise Floor", 11, "Medium", C.textZinc300));
  m2Head.appendChild(createText("-54.2 dB (Studio Quiet)", 11, "Bold", C.mint));
  m2.appendChild(m2Head);

  const bar2 = figma.createFrame(); bar2.resize(380, 10); bar2.cornerRadius = 5; bar2.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  const fill2 = figma.createFrame(); fill2.resize(80, 10); fill2.cornerRadius = 5; fill2.fills = solid(C.mint, 0.7);
  bar2.appendChild(fill2);
  m2.appendChild(bar2);
  card3.appendChild(m2);

  // Soundcheck button
  const btnTest = createActionButton("Test Mic Input (Say 'Ah')", "play", "secondary", 380);
  btnTest.name = "Button/Test Mic Input";
  card3.appendChild(btnTest);

  // Complete Onboarding CTA
  const btnDone = createActionButton("Complete Calibration & Enter Studio ↗", "arrow-up-right", "radiant", 380);
  btnDone.name = "Button/Complete Onboarding";
  card3.appendChild(btnDone);

  wizardRow.appendChild(card3);
  stack.appendChild(wizardRow);

  return root;
}
