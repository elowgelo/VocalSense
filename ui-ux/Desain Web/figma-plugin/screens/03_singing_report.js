// =============================================================================
// VOCALSENSE AI — 03. DIAGNOSTIC SINGING REPORT & INTERACTIVE PIANO ROLL
// Use Cases Covered:
//   - UC-12: Menampilkan Rapor Evaluasi Bernyanyi (Scorecard & Piano Roll)
//   - UC-13: Pemutaran Audio Terikat Deteksi Nada Fals (Note-Sync Playback)
//   - UC-14: Menyimpan Rapor Nyanyi ke Riwayat Akun Pengguna (Save Report)
//   - UC-15: Mengekspor Lembar Rapor Evaluasi Format PDF & Sertifikat Vokal (Export)
//   - UC-16: Membandingkan Dua Sesi Rekaman Nyanyi (Side-by-Side Comparison)
//
// 100% ARCHITECTURAL & UX CONSISTENCY:
//   - Left DAW Sidebar Dock (72 x 960) strictly matching Screen 02 (Waveform active emerald squircle).
//   - Main Workspace Container (1368 x 960) at x=72.
//   - Professional DAW-grade Note-Sync Piano Roll (Melodyne / Flex Pitch style):
//       * NO distracting harsh green grid lines! Ultra-subtle studio semitone lanes.
//       * High-end studio pitch capsule blobs with note name, syllable, and cents.
//       * Smooth continuous pitch contour with organic vibrato.
//       * Authentic DAW loop transport region at 00:14 with sleek audio playback callout.
//   - 3 Balanced Diagnostic Cards below (Radar & Formants, Anomaly Log, Conservatory Certificate).
// =============================================================================

function buildReportScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 03. Diagnostic Singing Report & Piano Roll";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Background
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

  // Middle: 4 Nav items (Waveform active in emerald squircle for Screen 03!)
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
  const btnNavWave = createIconButton("waveform", "#00F5A0", 42, 18, true); // Active for Singing Report!
  btnNavWave.name = "Nav/Reports";
  const btnNavChart = createIconButton("bar-chart", "#8B9DAF", 42, 18, false);
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
  container.name = "Report Workspace Container";
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
  // 1. TOP SESSION BAR & CONTROLS (1312 x 46 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Session Audit TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 46);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  // Left: Session Title & Back button
  const tbLeft = figma.createFrame();
  tbLeft.layoutMode = "HORIZONTAL";
  tbLeft.primaryAxisSizingMode = "AUTO";
  tbLeft.counterAxisSizingMode = "AUTO";
  tbLeft.itemSpacing = 14;
  tbLeft.counterAxisAlignItems = "CENTER";
  tbLeft.fills = [];

  const backBtn = figma.createFrame();
  backBtn.name = "Button/Back to Studio";
  backBtn.layoutMode = "HORIZONTAL";
  backBtn.primaryAxisSizingMode = "AUTO";
  backBtn.counterAxisSizingMode = "AUTO";
  backBtn.itemSpacing = 6;
  backBtn.counterAxisAlignItems = "CENTER";
  backBtn.paddingLeft = 12; backBtn.paddingRight = 12; backBtn.paddingTop = 6; backBtn.paddingBottom = 6;
  backBtn.cornerRadius = 8; backBtn.fills = solid(C.glassElevated, 1);
  backBtn.strokes = solid(C.glassBorder, 1); backBtn.strokeWeight = 1;
  backBtn.appendChild(createText("← DAW Studio", 11, "Medium", C.textZinc300));
  tbLeft.appendChild(backBtn);

  const titleCol = figma.createFrame();
  titleCol.layoutMode = "VERTICAL";
  titleCol.primaryAxisSizingMode = "AUTO";
  titleCol.counterAxisSizingMode = "AUTO";
  titleCol.itemSpacing = 1;
  titleCol.fills = [];

  const titleRow = figma.createFrame();
  titleRow.layoutMode = "HORIZONTAL";
  titleRow.primaryAxisSizingMode = "AUTO";
  titleRow.counterAxisSizingMode = "AUTO";
  titleRow.itemSpacing = 8;
  titleRow.counterAxisAlignItems = "CENTER";
  titleRow.fills = [];
  titleRow.appendChild(createText("Bohemian Rhapsody — Take 04 (Verse 1)", 15, "Bold", C.textWhite));
  titleRow.appendChild(createBadge("48kHz WAV", "mint", 8));
  titleRow.appendChild(createBadge("YIN DSP CALIBRATED", "neutral", 8));
  titleCol.appendChild(titleRow);
  titleCol.appendChild(createText("Tenor C2–A4 • Recorded Today 14:20 • Key: Bb Major", 11, "Medium", C.textZinc400));
  tbLeft.appendChild(titleCol);
  topBar.appendChild(tbLeft);

  // Right: Score Badge + Actions
  const tbRight = figma.createFrame();
  tbRight.layoutMode = "HORIZONTAL";
  tbRight.primaryAxisSizingMode = "AUTO";
  tbRight.counterAxisSizingMode = "AUTO";
  tbRight.itemSpacing = 10;
  tbRight.counterAxisAlignItems = "CENTER";
  tbRight.fills = [];

  const scoreBadge = figma.createFrame();
  scoreBadge.layoutMode = "HORIZONTAL";
  scoreBadge.primaryAxisSizingMode = "AUTO";
  scoreBadge.counterAxisSizingMode = "AUTO";
  scoreBadge.itemSpacing = 8;
  scoreBadge.counterAxisAlignItems = "CENTER";
  scoreBadge.paddingLeft = 12; scoreBadge.paddingRight = 12; scoreBadge.paddingTop = 4; scoreBadge.paddingBottom = 4;
  scoreBadge.cornerRadius = 8; scoreBadge.fills = solid(C.forestBase, 0.95);
  scoreBadge.strokes = solid(C.mint, 0.6); scoreBadge.strokeWeight = 1;
  scoreBadge.appendChild(createText("94", 20, "Bold", C.mint));
  const scoreSub = figma.createFrame();
  scoreSub.layoutMode = "VERTICAL";
  scoreSub.primaryAxisSizingMode = "AUTO";
  scoreSub.counterAxisSizingMode = "AUTO";
  scoreSub.itemSpacing = 0;
  scoreSub.fills = [];
  scoreSub.appendChild(createText("/100 SCORE", 8, "Bold", C.textZinc400));
  scoreSub.appendChild(createText("VIRTUOSO", 8, "Bold", C.mint));
  scoreBadge.appendChild(scoreSub);
  tbRight.appendChild(scoreBadge);

  const btnCompare = createActionButton("Compare Take", "refresh", "secondary");
  btnCompare.name = "Report/Compare Take";
  tbRight.appendChild(btnCompare);

  const btnSave = createActionButton("Save Take", "document", "secondary");
  btnSave.name = "Report/Save Take";
  tbRight.appendChild(btnSave);

  const btnExport = createActionButton("Export PDF ↗", "arrow-up-right", "radiant");
  btnExport.name = "Report/Export PDF";
  tbRight.appendChild(btnExport);

  topBar.appendChild(tbRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. MAIN CENTERPIECE: HIGH-END NOTE-SYNC PIANO ROLL (1312 x 460 px)
  // Redesigned: NO HARSH GREEN LINES! Clean studio pitch lanes & melodyne capsules
  // -----------------------------------------------------------------------
  const pianoRollCard = figma.createFrame();
  pianoRollCard.name = "Studio Piano Roll Card";
  pianoRollCard.layoutMode = "VERTICAL";
  pianoRollCard.resize(1312, 460);
  pianoRollCard.paddingLeft = 20; pianoRollCard.paddingRight = 20; pianoRollCard.paddingTop = 14; pianoRollCard.paddingBottom = 14;
  pianoRollCard.itemSpacing = 10;
  pianoRollCard.cornerRadius = 14;
  pianoRollCard.clipsContent = false;
  applyCard1Glass(pianoRollCard);

  // Piano Roll Header Controls
  const prHead = figma.createFrame();
  prHead.layoutMode = "HORIZONTAL"; prHead.resize(1272, 28); prHead.primaryAxisAlignItems = "SPACE_BETWEEN"; prHead.counterAxisAlignItems = "CENTER"; prHead.fills = [];

  const prTitleGroup = figma.createFrame();
  prTitleGroup.layoutMode = "HORIZONTAL"; prTitleGroup.itemSpacing = 8; prTitleGroup.counterAxisAlignItems = "CENTER"; prTitleGroup.fills = [];
  prTitleGroup.primaryAxisSizingMode = "AUTO"; prTitleGroup.counterAxisSizingMode = "AUTO";
  prTitleGroup.appendChild(createText("NOTE-SYNC PIANO ROLL", 11, "Bold", C.mint));
  prTitleGroup.appendChild(createBadge("16 Bars • Synced Pitch Blobs", "neutral", 9));
  prHead.appendChild(prTitleGroup);

  // Audio Transport toolbar
  const audioBar = figma.createFrame();
  audioBar.layoutMode = "HORIZONTAL"; audioBar.itemSpacing = 8; audioBar.counterAxisAlignItems = "CENTER"; audioBar.fills = [];
  audioBar.primaryAxisSizingMode = "AUTO"; audioBar.counterAxisSizingMode = "AUTO";

  const btnLoop = figma.createFrame();
  btnLoop.name = "Button/Loop Playback";
  btnLoop.layoutMode = "HORIZONTAL";
  btnLoop.primaryAxisSizingMode = "AUTO";
  btnLoop.counterAxisSizingMode = "AUTO";
  btnLoop.itemSpacing = 6;
  btnLoop.counterAxisAlignItems = "CENTER";
  btnLoop.paddingLeft = 12; btnLoop.paddingRight = 12; btnLoop.paddingTop = 5; btnLoop.paddingBottom = 5;
  btnLoop.cornerRadius = 6;
  btnLoop.fills = solid(C.forestBase, 0.95);
  btnLoop.strokes = solid(C.mint, 0.7);
  btnLoop.strokeWeight = 1;
  btnLoop.appendChild(createSvgIcon("play", "#00F5A0", 11));
  btnLoop.appendChild(createText("Loop Region (00:14)", 11, "Bold", C.mint));
  audioBar.appendChild(btnLoop);

  audioBar.appendChild(createBadge("1.0X SPEED", "neutral", 9));
  audioBar.appendChild(createBadge("0c SHIFT", "neutral", 9));
  prHead.appendChild(audioBar);
  pianoRollCard.appendChild(prHead);

  // Piano Roll Canvas Area (1272 x 380 px)
  const prCanvas = figma.createFrame();
  prCanvas.name = "Piano Roll Canvas";
  prCanvas.resize(1272, 380);
  prCanvas.cornerRadius = 8;
  prCanvas.fills = solid({ r: 0.04, g: 0.05, b: 0.07 }, 1);
  prCanvas.strokes = solid({ r: 0.14, g: 0.18, b: 0.24 }, 1);
  prCanvas.strokeWeight = 1;
  prCanvas.clipsContent = true;

  // 12 Semitone Lanes (Height = 340 / 12 = 28.3px)
  const keyScale = ["C5", "B4", "A4", "G4", "F#4", "F4", "E4", "D4", "C4", "B3", "A3", "G3"];
  const keyH = 340 / keyScale.length;

  // Background Semitone Lanes: Subtle alternation, NO HARSH GREEN LINES!
  keyScale.forEach((noteName, idx) => {
    const isBlackKey = noteName.includes("#");
    const isTarget = noteName === "G4";

    // Subtle lane background
    const laneBg = figma.createFrame();
    laneBg.resize(1204, keyH); laneBg.x = 68; laneBg.y = idx * keyH;
    laneBg.fills = solid(
      isTarget ? { r: 0.00, g: 0.96, b: 0.63 } :
      (isBlackKey ? { r: 0.025, g: 0.032, b: 0.045 } : { r: 0.045, g: 0.055, b: 0.075 }),
      isTarget ? 0.04 : 1
    );
    laneBg.strokes = [];
    prCanvas.appendChild(laneBg);

    // Subtle muted grid line (faint zinc border, NO GREEN LINE!)
    const hLine = figma.createLine();
    hLine.resize(1204, 0); hLine.x = 68; hLine.y = (idx + 1) * keyH;
    hLine.strokes = solid({ r: 1, g: 1, b: 1 }, isTarget ? 0.08 : 0.035);
    hLine.strokeWeight = 1;
    if (isTarget) {
      hLine.dashPattern = [6, 6]; // Elegant dotted guideline for G4 target!
    }
    prCanvas.appendChild(hLine);
  });

  // Vertical Bar Lines (Bar 1.1 to Bar 4.4)
  for (let b = 0; b < 16; b++) {
    const vBar = figma.createLine();
    vBar.rotation = 90;
    vBar.resize(340, 0);
    vBar.x = 68 + (b * (1204 / 16));
    vBar.y = 0;
    vBar.strokes = solid({ r: 1, g: 1, b: 1 }, b % 4 === 0 ? 0.07 : 0.025);
    vBar.strokeWeight = 1;
    prCanvas.appendChild(vBar);
  }

  // DAW Loop Region Highlight at 00:12 - 00:16 (x = 230 to 350)
  const loopRegion = figma.createFrame();
  loopRegion.name = "DAW Loop Region Bracket";
  loopRegion.resize(120, 340);
  loopRegion.x = 235; loopRegion.y = 0;
  loopRegion.fills = solid(C.amber, 0.06);
  loopRegion.strokes = solid(C.amber, 0.35);
  loopRegion.strokeWeight = 1;
  loopRegion.dashPattern = [4, 4];
  prCanvas.appendChild(loopRegion);

  // Left Piano Keys Column (Width: 68px, Height: 340px)
  const pianoKeysCol = figma.createFrame();
  pianoKeysCol.resize(68, 340); pianoKeysCol.x = 0; pianoKeysCol.y = 0;
  pianoKeysCol.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  pianoKeysCol.strokes = solid(C.glassBorder, 0.3); pianoKeysCol.strokeWeight = 1;

  keyScale.forEach((noteName, idx) => {
    const isTarget = noteName === "G4";
    const isFlatAnomaly = noteName === "F#4";
    const isBlackKey = noteName.includes("#");

    const kFrame = figma.createFrame();
    kFrame.resize(68, keyH); kFrame.x = 0; kFrame.y = idx * keyH;
    kFrame.fills = solid(
      isBlackKey ? { r: 0.04, g: 0.05, b: 0.07 } : { r: 0.10, g: 0.12, b: 0.16 },
      1
    );

    const kDiv = figma.createLine();
    kDiv.resize(68, 0); kDiv.x = 0; kDiv.y = keyH;
    kDiv.strokes = solid(C.glassBorder, 0.15); kDiv.strokeWeight = 1;
    kFrame.appendChild(kDiv);

    const kText = createText(
      noteName, 9,
      isTarget ? "Bold" : (isBlackKey ? "Regular" : "Medium"),
      isTarget ? C.mint : (isFlatAnomaly ? C.amber : (isBlackKey ? C.textZinc500 : C.textZinc300))
    );
    kText.x = 10; kText.y = 4;
    kFrame.appendChild(kText);

    if (isTarget) {
      const dot = figma.createEllipse();
      dot.resize(4, 4); dot.x = 42; dot.y = 10;
      dot.fills = solid(C.mint, 1);
      kFrame.appendChild(dot);
    }

    pianoKeysCol.appendChild(kFrame);
  });
  prCanvas.appendChild(pianoKeysCol);

  // 16 High-End Melodyne Pitch Blobs
  const phraseData = [
    { lyric: "Ma-", note: "G4", y: 3 * keyH + 3, w: 56, x: 78, status: "mint", cents: "+2c" },
    { lyric: "ma,", note: "G4", y: 3 * keyH + 3, w: 58, x: 140, status: "mint", cents: "-1c" },
    { lyric: "just", note: "E4", y: 6 * keyH + 3, w: 52, x: 204, status: "mint", cents: "+4c" },
    { lyric: "killed", note: "F#4", y: 4 * keyH + 3, w: 68, x: 262, status: "amber", cents: "-18c", isTrigger: true },
    { lyric: "a", note: "G4", y: 3 * keyH + 3, w: 46, x: 338, status: "mint", cents: "0c" },
    { lyric: "man,", note: "B4", y: 1 * keyH + 3, w: 62, x: 390, status: "mint", cents: "+3c" },
    { lyric: "put", note: "C5", y: 0 * keyH + 3, w: 48, x: 458, status: "mint", cents: "-2c" },
    { lyric: "a", note: "B4", y: 1 * keyH + 3, w: 44, x: 512, status: "mint", cents: "0c" },
    { lyric: "gun", note: "A4", y: 2 * keyH + 3, w: 56, x: 562, status: "rose", cents: "+22c" },
    { lyric: "a-", note: "G4", y: 3 * keyH + 3, w: 48, x: 624, status: "mint", cents: "+1c" },
    { lyric: "gainst", note: "F#4", y: 4 * keyH + 3, w: 60, x: 678, status: "amber", cents: "-15c" },
    { lyric: "his", note: "E4", y: 6 * keyH + 3, w: 46, x: 744, status: "mint", cents: "0c" },
    { lyric: "head,", note: "D4", y: 7 * keyH + 3, w: 58, x: 796, status: "mint", cents: "0c" },
    { lyric: "pulled", note: "E4", y: 6 * keyH + 3, w: 54, x: 860, status: "mint", cents: "+2c" },
    { lyric: "my", note: "F#4", y: 4 * keyH + 3, w: 48, x: 920, status: "mint", cents: "+1c" },
    { lyric: "trig-ger", note: "G4", y: 3 * keyH + 3, w: 78, x: 974, status: "mint", cents: "0c" }
  ];

  phraseData.forEach(item => {
    const block = figma.createFrame();
    block.name = "Blob/" + item.note + "_" + item.lyric;
    block.resize(item.w, keyH - 6);
    block.x = item.x;
    block.y = item.y;
    block.cornerRadius = 6;
    block.layoutMode = "HORIZONTAL";
    block.primaryAxisAlignItems = "SPACE_BETWEEN";
    block.counterAxisAlignItems = "CENTER";
    block.paddingLeft = 6;
    block.paddingRight = 6;

    if (item.status === "mint") {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.02, g: 0.22, b: 0.15, a: 0.95 } },
          { position: 1.0, color: { r: 0.03, g: 0.14, b: 0.10, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.mint, 0.7);
      block.strokeWeight = 1.2;
    } else if (item.status === "amber") {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.28, g: 0.16, b: 0.02, a: 0.95 } },
          { position: 1.0, color: { r: 0.16, g: 0.09, b: 0.01, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.amber, 0.9);
      block.strokeWeight = 1.5;
    } else {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.32, g: 0.08, b: 0.12, a: 0.95 } },
          { position: 1.0, color: { r: 0.18, g: 0.04, b: 0.06, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.rose, 0.9);
      block.strokeWeight = 1.5;
    }

    const lText = createText(item.lyric, 10, "Bold", C.textWhite);
    block.appendChild(lText);

    const cText = createText(item.cents, 8, "Bold", item.status === "mint" ? C.mint : (item.status === "amber" ? C.amber : C.rose));
    block.appendChild(cText);

    prCanvas.appendChild(block);
  });

  // Smooth pitch spline gliding through the blocks
  const pitchCurve = figma.createVector();
  pitchCurve.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 78 102 C 132 98 172 165 204 185 C 230 200 244 158 262 142 C 290 115 320 102 338 102 C 368 102 378 62 390 48 C 416 22 436 18 458 18 C 484 18 499 38 512 48 C 532 62 546 72 562 72 C 590 72 610 95 624 102 C 648 112 668 128 678 140 C 706 168 726 185 744 190 C 768 200 782 215 796 220 C 822 225 842 205 860 190 C 890 170 910 152 920 142 C 958 115 988 102 1018 102"
  }];
  pitchCurve.strokes = solid(C.mint, 0.85);
  pitchCurve.strokeWeight = 2;
  prCanvas.appendChild(pitchCurve);

  // SLEEK DAW NOTE-SYNC AUDIO CALLOUT (Anchored at 00:14)
  const noteSyncBox = figma.createFrame();
  noteSyncBox.name = "UC-13 Note-Sync Audio Scrub";
  noteSyncBox.layoutMode = "HORIZONTAL";
  noteSyncBox.primaryAxisSizingMode = "AUTO";
  noteSyncBox.counterAxisSizingMode = "AUTO";
  noteSyncBox.paddingLeft = 10; noteSyncBox.paddingRight = 12; noteSyncBox.paddingTop = 6; noteSyncBox.paddingBottom = 6;
  noteSyncBox.itemSpacing = 8;
  noteSyncBox.counterAxisAlignItems = "CENTER";
  noteSyncBox.cornerRadius = 8;
  noteSyncBox.fills = solid({ r: 0.10, g: 0.13, b: 0.18 }, 0.98);
  noteSyncBox.strokes = solid(C.amber, 0.85); noteSyncBox.strokeWeight = 1.2;
  noteSyncBox.x = 240; noteSyncBox.y = 175;
  noteSyncBox.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0.96, g: 0.62, b: 0.04, a: 0.22 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
    showShadowBehindNode: false
  }];

  const playSq = figma.createFrame();
  playSq.resize(22, 22); playSq.cornerRadius = 5; playSq.fills = solid(C.amber, 0.2);
  playSq.layoutMode = "HORIZONTAL"; playSq.primaryAxisAlignItems = "CENTER"; playSq.counterAxisAlignItems = "CENTER";
  playSq.appendChild(createSvgIcon("play", "#F59E0B", 10));
  noteSyncBox.appendChild(playSq);

  const nsCol = figma.createFrame();
  nsCol.layoutMode = "VERTICAL"; nsCol.itemSpacing = 1; nsCol.fills = [];
  nsCol.primaryAxisSizingMode = "AUTO"; nsCol.counterAxisSizingMode = "AUTO";
  nsCol.appendChild(createText("NOTE-SYNC AUDIO: -18c FLAT", 9, "Bold", C.amber));
  nsCol.appendChild(createText("00:14 (F#4) • Click to Loop Audio", 9, "Regular", C.textZinc300));
  noteSyncBox.appendChild(nsCol);

  // Micro waveform bars inside callout
  const miniWf = figma.createFrame();
  miniWf.layoutMode = "HORIZONTAL"; miniWf.itemSpacing = 2; miniWf.counterAxisAlignItems = "CENTER"; miniWf.fills = [];
  [6, 12, 18, 10, 16, 8].forEach(h => {
    const b = figma.createFrame(); b.resize(2, h); b.cornerRadius = 1; b.fills = solid(C.amber, 0.8);
    miniWf.appendChild(b);
  });
  noteSyncBox.appendChild(miniWf);

  prCanvas.appendChild(noteSyncBox);

  // Playhead vertical scrubber at 00:14
  const pScrub = figma.createLine();
  pScrub.rotation = 90; pScrub.resize(340, 0); pScrub.x = 296; pScrub.y = 0;
  pScrub.strokes = solid(C.amber, 0.95); pScrub.strokeWeight = 1.5;
  prCanvas.appendChild(pScrub);

  // Time ruler labels at bottom (340 to 380 px)
  const ruler = figma.createFrame();
  ruler.layoutMode = "HORIZONTAL"; ruler.resize(1204, 32); ruler.x = 68; ruler.y = 345;
  ruler.primaryAxisAlignItems = "SPACE_BETWEEN"; ruler.counterAxisAlignItems = "CENTER"; ruler.fills = [];
  for (const t of ["00:00 (Bar 1)", "00:04", "00:08", "00:12", "00:16 (Bar 2)", "00:20", "00:24", "00:28", "00:32 (Bar 3)", "00:36", "00:40", "00:44", "00:48 (Bar 4)"]) {
    ruler.appendChild(createText(t, 9, t.includes("00:12") ? "Bold" : "Regular", t.includes("00:12") ? C.amber : C.textZinc500));
  }
  prCanvas.appendChild(ruler);

  pianoRollCard.appendChild(prCanvas);
  container.appendChild(pianoRollCard);

  // -----------------------------------------------------------------------
  // 3. BOTTOM DIAGNOSTICS BENTO (3 BALANCED CARDS - 1312 x 380 px)
  // -----------------------------------------------------------------------
  const bentoRow = figma.createFrame();
  bentoRow.name = "Diagnostic Bento Row";
  bentoRow.layoutMode = "HORIZONTAL";
  bentoRow.resize(1312, 380);
  bentoRow.itemSpacing = 16;
  bentoRow.fills = [];
  bentoRow.clipsContent = false;

  // -----------------------------------------------------------------------
  // CARD 1: 5-PILLAR BIO-ACOUSTIC RADAR & FORMANT SPECTRUM (424 x 380 px)
  // -----------------------------------------------------------------------
  const radarCard = figma.createFrame();
  radarCard.name = "5-Pillar Vocal Radar Card";
  radarCard.layoutMode = "VERTICAL";
  radarCard.resize(424, 380);
  radarCard.paddingLeft = 18; radarCard.paddingRight = 18; radarCard.paddingTop = 16; radarCard.paddingBottom = 16;
  radarCard.itemSpacing = 10;
  radarCard.cornerRadius = 14;
  radarCard.clipsContent = false;
  applyCard2Glass(radarCard);

  const radHead = figma.createFrame();
  radHead.layoutMode = "HORIZONTAL"; radHead.resize(388, 22); radHead.primaryAxisAlignItems = "SPACE_BETWEEN"; radHead.counterAxisAlignItems = "CENTER"; radHead.fills = [];
  radHead.appendChild(createText("5-Pillar Bio-Acoustic Radar", 13, "Bold", C.textWhite));
  radHead.appendChild(createBadge("EQUILATERAL MATRIX", "mint", 9));
  radarCard.appendChild(radHead);

  // Pentagon Radar Visualizer Canvas (388 x 195 px)
  const radarCanvas = figma.createFrame();
  radarCanvas.name = "Floating Radar Matrix";
  radarCanvas.resize(388, 195);
  radarCanvas.fills = [];
  radarCanvas.strokes = [];
  radarCanvas.clipsContent = false;

  const cx = 194, cy = 98;
  [0.2, 0.4, 0.6, 0.8, 1.0].forEach(scale => {
    const ring = figma.createVector();
    ring.vectorPaths = [{
      windingRule: "NONZERO",
      data: `M ${cx} ${cy - 75 * scale} L ${cx + 72 * scale} ${cy - 23 * scale} L ${cx + 45 * scale} ${cy + 60 * scale} L ${cx - 45 * scale} ${cy + 60 * scale} L ${cx - 72 * scale} ${cy - 23 * scale} Z`
    }];
    ring.fills = [];
    ring.strokes = solid(scale === 1.0 ? C.mint : { r: 1, g: 1, b: 1 }, scale === 1.0 ? 0.20 : 0.07);
    ring.strokeWeight = 1;
    radarCanvas.appendChild(ring);
  });

  // 5 Radial spokes
  const spokeAngles = [-90, -18, 54, 126, 198];
  spokeAngles.forEach(deg => {
    const spoke = figma.createLine();
    spoke.resize(72, 0); spoke.x = cx; spoke.y = cy;
    spoke.rotation = deg;
    spoke.strokes = solid({ r: 1, g: 1, b: 1 }, 0.05); spoke.strokeWeight = 1;
    radarCanvas.appendChild(spoke);
  });

  // Active vocalist polygon (Intonation 96%, Vibrato 91%, Timbre 88%, Dynamics 92%, Breath 89%)
  const activePoly = figma.createVector();
  activePoly.vectorPaths = [{
    windingRule: "NONZERO",
    data: `M ${cx} ${cy - 71} L ${cx + 65} ${cy - 21} L ${cx + 39} ${cy + 52} L ${cx - 41} ${cy + 54} L ${cx - 64} ${cy - 21} Z`
  }];
  activePoly.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.38 } },
      { position: 1.0, color: { r: 0.06, g: 0.72, b: 0.50, a: 0.10 } }
    ]
  }];
  activePoly.strokes = solid(C.mint, 1); activePoly.strokeWeight = 2;
  radarCanvas.appendChild(activePoly);

  // Glowing vertex marker dots
  const vertices = [
    { x: cx, y: cy - 71 },
    { x: cx + 65, y: cy - 21 },
    { x: cx + 39, y: cy + 52 },
    { x: cx - 41, y: cy + 54 },
    { x: cx - 64, y: cy - 21 }
  ];
  vertices.forEach(v => {
    const vd = figma.createEllipse();
    vd.resize(6, 6); vd.x = v.x - 3; vd.y = v.y - 3;
    vd.fills = solid(C.mint, 1);
    radarCanvas.appendChild(vd);
  });

  // Axis Labels with Scores: STRICT AUTO HUG, NO BULKY BOXES!
  function addRadarLabel(txt, score, x, y) {
    const lbl = figma.createFrame();
    lbl.layoutMode = "HORIZONTAL";
    lbl.primaryAxisSizingMode = "AUTO";
    lbl.counterAxisSizingMode = "AUTO";
    lbl.paddingLeft = 7; lbl.paddingRight = 7; lbl.paddingTop = 3; lbl.paddingBottom = 3;
    lbl.itemSpacing = 4;
    lbl.counterAxisAlignItems = "CENTER";
    lbl.cornerRadius = 6;
    lbl.fills = solid(C.glassElevated, 0.9);
    lbl.strokes = solid(C.glassBorder, 0.5);
    lbl.strokeWeight = 1;
    lbl.x = x; lbl.y = y;
    lbl.appendChild(createText(txt, 9, "Regular", C.textZinc300));
    lbl.appendChild(createText(score, 9, "Bold", C.mint));
    radarCanvas.appendChild(lbl);
  }

  addRadarLabel("Intonation", "96%", 150, 4);
  addRadarLabel("Vibrato", "91%", 276, 68);
  addRadarLabel("Timbre", "88%", 236, 160);
  addRadarLabel("Dynamics", "92%", 64, 160);
  addRadarLabel("Breath", "89%", 30, 68);

  radarCard.appendChild(radarCanvas);

  // Formant Resonance Spectrum Below Radar
  const formantBox = figma.createFrame();
  formantBox.layoutMode = "VERTICAL"; formantBox.resize(388, 64);
  formantBox.paddingLeft = 10; formantBox.paddingRight = 10; formantBox.paddingTop = 6; formantBox.paddingBottom = 6;
  formantBox.itemSpacing = 4;
  formantBox.cornerRadius = 8;
  formantBox.fills = solid(C.glassElevated, 0.7);
  formantBox.strokes = solid(C.glassBorder, 0.4); formantBox.strokeWeight = 1;

  const fHead = figma.createFrame();
  fHead.layoutMode = "HORIZONTAL"; fHead.resize(368, 14); fHead.primaryAxisAlignItems = "SPACE_BETWEEN"; fHead.counterAxisAlignItems = "CENTER"; fHead.fills = [];
  fHead.appendChild(createText("Formant Boost (F1–F4)", 10, "Bold", C.textWhite));
  fHead.appendChild(createText("+8.4 dB Singer's Ring", 10, "Bold", C.mint));
  formantBox.appendChild(fHead);

  function makeFormantBar(label, freq, pct, color) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(368, 14); row.counterAxisAlignItems = "CENTER"; row.fills = [];
    row.appendChild(createText(label + " (" + freq + ")", 9, "Regular", C.textZinc400));
    const track = figma.createFrame();
    track.resize(230, 4); track.cornerRadius = 2; track.fills = solid({ r: 0.15, g: 0.18, b: 0.22 }, 1);
    const fill = figma.createFrame();
    fill.resize(Math.round(230 * pct), 4); fill.cornerRadius = 2; fill.fills = solid(color, 1);
    track.appendChild(fill);
    row.appendChild(track);
    return row;
  }
  formantBox.appendChild(makeFormantBar("F1 Warmth", "520Hz", 0.92, C.cyan));
  formantBox.appendChild(makeFormantBar("F3 Ring", "2850Hz", 0.96, C.mint));
  radarCard.appendChild(formantBox);

  // Overall summary
  const radSummary = figma.createFrame();
  radSummary.layoutMode = "VERTICAL"; radSummary.resize(388, 44); radSummary.itemSpacing = 2; radSummary.fills = [];
  radSummary.appendChild(createText("Diagnostic Assessment: Virtuoso Grade", 10, "Bold", C.textWhite));
  radSummary.appendChild(createParagraph("Excellent intonation lock. Dynamic stability exceeds conservatory baseline (+8.4%).", 388, 10, "Regular", C.textZinc400, 15));
  radarCard.appendChild(radSummary);

  bentoRow.appendChild(radarCard);

  // -----------------------------------------------------------------------
  // CARD 2: DETECTED PITCH ANOMALIES & AUDIT SUITE (444 x 380 px)
  // -----------------------------------------------------------------------
  const errorCard = figma.createFrame();
  errorCard.name = "Pitch Anomaly Log Card";
  errorCard.layoutMode = "VERTICAL";
  errorCard.resize(444, 380);
  errorCard.paddingLeft = 18; errorCard.paddingRight = 18; errorCard.paddingTop = 16; errorCard.paddingBottom = 16;
  errorCard.itemSpacing = 8;
  errorCard.cornerRadius = 14;
  errorCard.clipsContent = false;
  applyCard2Glass(errorCard);

  const aHead = figma.createFrame();
  aHead.layoutMode = "HORIZONTAL"; aHead.resize(408, 22); aHead.primaryAxisAlignItems = "SPACE_BETWEEN"; aHead.counterAxisAlignItems = "CENTER"; aHead.fills = [];
  aHead.appendChild(createText("Detected Pitch Anomalies", 13, "Bold", C.textWhite));
  aHead.appendChild(createBadge("3 NOTES ISOLATED", "amber", 9));
  errorCard.appendChild(aHead);

  function makeAnomalyRow(timeStr, lyricStr, noteStr, centsStr, type) {
    const r = figma.createFrame();
    r.layoutMode = "HORIZONTAL"; r.resize(408, 42);
    r.paddingLeft = 10; r.paddingRight = 10;
    r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER";
    r.cornerRadius = 8; r.fills = solid(C.glassElevated, 0.7);
    r.strokes = solid(C.glassBorder, 0.4); r.strokeWeight = 1;

    const leftPart = figma.createFrame();
    leftPart.layoutMode = "HORIZONTAL"; leftPart.itemSpacing = 8; leftPart.counterAxisAlignItems = "CENTER"; leftPart.fills = [];
    leftPart.appendChild(createText(timeStr, 10, "Medium", C.textZinc400));
    leftPart.appendChild(createBadge(lyricStr, "neutral", 9));
    leftPart.appendChild(createText(noteStr, 11, "Bold", C.textWhite));
    leftPart.appendChild(createText(centsStr, 10, "Bold", type === "amber" ? C.amber : C.rose));
    r.appendChild(leftPart);

    const btnRep = createActionButton("Replay", "play", "secondary");
    btnRep.name = "Anomaly/Replay " + timeStr;
    r.appendChild(btnRep);
    return r;
  }

  errorCard.appendChild(makeAnomalyRow("00:14", "killed", "F#4", "-18c Flat", "amber"));
  errorCard.appendChild(makeAnomalyRow("00:26", "gun", "A4", "+22c Sharp", "rose"));
  errorCard.appendChild(makeAnomalyRow("00:33", "gainst", "F#4", "-15c Flat", "amber"));

  // Pedagogical Prescription Box
  const prescBox = figma.createFrame();
  prescBox.layoutMode = "VERTICAL"; prescBox.resize(408, 86);
  prescBox.paddingLeft = 12; prescBox.paddingRight = 12; prescBox.paddingTop = 8; prescBox.paddingBottom = 8;
  prescBox.itemSpacing = 4;
  prescBox.cornerRadius = 8;
  prescBox.fills = solid(C.glassElevated, 0.85);
  prescBox.strokes = solid(C.amber, 0.4); prescBox.strokeWeight = 1;

  const pTitle = figma.createFrame();
  pTitle.layoutMode = "HORIZONTAL"; pTitle.itemSpacing = 6; pTitle.counterAxisAlignItems = "CENTER"; pTitle.fills = [];
  pTitle.appendChild(createSvgIcon("sparkle", "#F59E0B", 13));
  pTitle.appendChild(createText("Passaggio Break Diagnosis at F#4", 10, "Bold", C.amber));
  prescBox.appendChild(pTitle);

  prescBox.appendChild(createParagraph(
    "Vocal fold adduction relaxes early during breath recovery. Recommended routine: 5-minute semi-occluded vocal tract (SOVT) straw phonation on vowel /u/.",
    384, 10, "Regular", C.textZinc300, 15
  ));
  errorCard.appendChild(prescBox);

  const btnLoopAll = createActionButton("Loop All Anomalies (00:45) ↗", "refresh", "radiant", 408);
  btnLoopAll.name = "Report/Loop All Anomalies";
  errorCard.appendChild(btnLoopAll);

  bentoRow.appendChild(errorCard);

  // -----------------------------------------------------------------------
  // CARD 3: CONSERVATORY CERTIFICATE & BIOMETRIC HASH (420 x 380 px)
  // -----------------------------------------------------------------------
  const certCard = figma.createFrame();
  certCard.name = "Conservatory Certificate Card";
  certCard.layoutMode = "VERTICAL";
  certCard.resize(420, 380);
  certCard.paddingLeft = 18; certCard.paddingRight = 18; certCard.paddingTop = 16; certCard.paddingBottom = 16;
  certCard.itemSpacing = 10;
  certCard.cornerRadius = 14;
  certCard.clipsContent = false;
  applyCard2Glass(certCard);

  const ctHead = figma.createFrame();
  ctHead.layoutMode = "HORIZONTAL"; ctHead.resize(384, 22); ctHead.primaryAxisAlignItems = "SPACE_BETWEEN"; ctHead.counterAxisAlignItems = "CENTER"; ctHead.fills = [];
  ctHead.appendChild(createText("Conservatory Diagnostic Sheet", 13, "Bold", C.textWhite));
  ctHead.appendChild(createBadge("VERIFIED AUDIT", "mint", 9));
  certCard.appendChild(ctHead);

  // Luxury Certificate Plate
  const certPlate = figma.createFrame();
  certPlate.layoutMode = "VERTICAL"; certPlate.resize(384, 230);
  certPlate.paddingLeft = 14; certPlate.paddingRight = 14; certPlate.paddingTop = 12; certPlate.paddingBottom = 12;
  certPlate.itemSpacing = 8;
  certPlate.cornerRadius = 10;
  certPlate.fills = solid({ r: 0.03, g: 0.10, b: 0.07 }, 0.95);
  certPlate.strokes = solid(C.mint, 0.45); certPlate.strokeWeight = 1.2;

  const cpTop = figma.createFrame();
  cpTop.layoutMode = "HORIZONTAL"; cpTop.resize(356, 18); cpTop.primaryAxisAlignItems = "SPACE_BETWEEN"; cpTop.counterAxisAlignItems = "CENTER"; cpTop.fills = [];
  cpTop.appendChild(createText("INTERNATIONAL CONSERVATORY STANDARD", 8, "Bold", C.mint));
  cpTop.appendChild(createText("GRADE: A+", 9, "Bold", C.textWhite));
  certPlate.appendChild(cpTop);

  certPlate.appendChild(createText("Vocal Performance Audit Certificate", 14, "Bold", C.textWhite));

  function makeCertItem(lbl, val) {
    const ci = figma.createFrame();
    ci.layoutMode = "HORIZONTAL"; ci.resize(356, 16); ci.primaryAxisAlignItems = "SPACE_BETWEEN"; ci.counterAxisAlignItems = "CENTER"; ci.fills = [];
    ci.appendChild(createText(lbl, 9, "Regular", C.textZinc400));
    ci.appendChild(createText(val, 9, "Bold", C.textWhite));
    return ci;
  }

  certPlate.appendChild(makeCertItem("Vocalist Identity:", "Ethan Reynolds • Tenor Lyrique"));
  certPlate.appendChild(makeCertItem("Acoustic Vocal Span:", "C2 (65.4Hz) — A4 (440.0Hz) • 2.8 Octaves"));
  certPlate.appendChild(makeCertItem("Intonation Lock Accuracy:", "94.2% Peak (Bohemian Rhapsody)"));
  certPlate.appendChild(makeCertItem("Audio Master Quality:", "48kHz / 24-bit PCM • Zero-Latency DSP"));

  const hashBox = figma.createFrame();
  hashBox.layoutMode = "HORIZONTAL"; hashBox.resize(356, 22);
  hashBox.paddingLeft = 8; hashBox.paddingRight = 8;
  hashBox.primaryAxisAlignItems = "SPACE_BETWEEN"; hashBox.counterAxisAlignItems = "CENTER";
  hashBox.cornerRadius = 4; hashBox.fills = solid({ r: 0.02, g: 0.06, b: 0.04 }, 1);
  hashBox.strokes = solid(C.mint, 0.3); hashBox.strokeWeight = 1;
  hashBox.appendChild(createText("HASH: #VS-8829-48K-TENOR-20261015", 8, "Bold", C.mint));
  hashBox.appendChild(createBadge("AUDIT LOCKED", "neutral", 7));
  certPlate.appendChild(hashBox);

  certCard.appendChild(certPlate);

  const btnCert = createActionButton("Download Certified PDF Sheet ↗", "arrow-up-right", "radiant", 384);
  btnCert.name = "Report/Download Certified PDF";
  certCard.appendChild(btnCert);

  bentoRow.appendChild(certCard);
  container.appendChild(bentoRow);

  return root;
}
