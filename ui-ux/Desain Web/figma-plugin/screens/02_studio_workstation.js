// =============================================================================
// VOCALSENSE AI — 02. LIVE RECORDING STUDIO & AUDIO WORKSTATION (DESKTOP DAW)
// Use Cases Covered:
//   - UC-06: Kalibrasi & Tuner Deteksi Nada Dasar (Chromatic Tuner / YIN DSP)
//   - UC-07: Tes Jangkauan Vokal Mandiri (Vocal Registers & Span Finder)
//   - UC-08: Perekaman Suara Bernyanyi Langsung (Live Singing & Rolling Pitch Visualizer)
//   - UC-10: Pemutaran Ulang & Pemangkasan Audio Nyanyi (Transport & Analysis Trigger)
//   - UC-11: Menganalisis Suara Bernyanyi Berbasis AI (AI DSP Extraction Trigger)
//
// 100% FAITHFUL TO patokan.png:
//   - Left DAW Sidebar (72 x 960) with SPACE_BETWEEN:
//       Top: Sparkle logo button (44x44)
//       Middle: 4 Nav icons (Home [active emerald squircle], Waveform, Bar-Chart, Document)
//       Bottom: Settings icon + ER profile avatar (36x36)
//   - TopBar (1312 x 48): Search Bar (260px) + Mic status | Bell + Moon + User Chip + "New Session" CTA
//   - Bento Row 1 (Top, 1312 x 490):
//       Card 1 (Left, 852 x 490): Live Pitch & Formant Tracker (Rolling curve, Target G4, Clean Transport Bar: Pause, Stop & Analyze, 120 BPM mint text, L/R segmented VU meters, zero clipped boxes!)
//       Card 2 (Right, 444 x 490): Vocal Registers & Span (↗ Retest, Head/Mixed Voice, Chest Voice Foundation box C2-A4, Expand Range & Practice Scales)
//   - Bento Row 2 (Bottom, 1312 x 340):
//       Card 3 (Left, 416 x 340): GEMINI AI VOCAL COACH (Bridge Mix-Voice Smoothly, audio chip Take Analysis: F#4-G4 Shift + mini waveform, 4 avatars + +1.4k singers, ↗ Start 5-Min Drill)
//       Card 4 (Middle, 444 x 340): Accuracy Trend (94.2% ↑ 3.8%, Weekly dropdown, 7 vertical bars Mon-Sun with glowing 98% Peak today, Vibrato / Steady Breath footer)
//       Card 5 (Right, 420 x 340): Recent Singing Takes (View All, Bohemian Rhapsody +15pts, Solfeggio Scale Drill Replay, Vocal Range Assessment PDF Ready)
// =============================================================================

function buildStudioScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 02. Live Recording Studio & Audio Workstation";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Background gradient: Dark studio canvas
  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } }, // #0A0C10
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }  // #050608
    ]
  }];

  // Subtle studio grid line accent
  const grid = figma.createLine();
  grid.resize(1440, 0); grid.x = 0; grid.y = 64;
  grid.strokes = solid({ r: 1, g: 1, b: 1 }, 0.04);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // -----------------------------------------------------------------------
  // LEFT DAW SIDEBAR DOCK (72 x 960) — STRICTLY FROM patokan.png
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

  // Middle: 4 Nav items (Home active, Waveform, Bar chart, Document)
  const navGroup = figma.createFrame();
  navGroup.name = "Nav Icons Group";
  navGroup.layoutMode = "VERTICAL";
  navGroup.primaryAxisSizingMode = "AUTO";
  navGroup.counterAxisSizingMode = "AUTO";
  navGroup.itemSpacing = 16;
  navGroup.counterAxisAlignItems = "CENTER";
  navGroup.fills = [];

  const btnNavHome = createIconButton("home", "#00F5A0", 42, 18, true); // Active green squircle in patokan.png!
  btnNavHome.name = "Nav/Home";
  const btnNavWave = createIconButton("waveform", "#8B9DAF", 42, 18, false);
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
  // MAIN STUDIO CONTENT CONTAINER (1368 x 960)
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Studio Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 16;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP STUDIO DAW HEADER (1312 x 48) — ULTRA-CLEAN STUDIO TOOLBAR
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Studio DAW TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.paddingLeft = 16;
  topBar.paddingRight = 16;
  topBar.cornerRadius = 10;
  topBar.fills = solid(C.glassElevated, 0.55);
  topBar.strokes = solid(C.glassBorder, 0.08);
  topBar.strokeWeight = 1;

  // Left: Search Bar (260px) + Mic Status Text
  const hLeft = figma.createFrame();
  hLeft.layoutMode = "HORIZONTAL";
  hLeft.primaryAxisSizingMode = "AUTO";
  hLeft.counterAxisSizingMode = "AUTO";
  hLeft.itemSpacing = 16;
  hLeft.counterAxisAlignItems = "CENTER";
  hLeft.fills = [];

  const searchInput = figma.createFrame();
  searchInput.name = "Global Search Bar";
  searchInput.layoutMode = "HORIZONTAL";
  searchInput.primaryAxisSizingMode = "FIXED";
  searchInput.counterAxisSizingMode = "FIXED";
  searchInput.resize(260, 34);
  searchInput.cornerRadius = 8;
  searchInput.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  searchInput.strokes = solid(C.glassBorder, 0.8);
  searchInput.strokeWeight = 1;
  searchInput.paddingLeft = 12;
  searchInput.paddingRight = 10;
  searchInput.itemSpacing = 10;
  searchInput.counterAxisAlignItems = "CENTER";
  searchInput.primaryAxisAlignItems = "SPACE_BETWEEN";

  const sLeft = figma.createFrame();
  sLeft.layoutMode = "HORIZONTAL"; sLeft.itemSpacing = 8; sLeft.counterAxisAlignItems = "CENTER"; sLeft.fills = [];
  sLeft.appendChild(createSvgIcon("search", "#8B9DAF", 14));
  sLeft.appendChild(createText("Search vocal scales, songs...", 11, "Regular", C.textZinc400));
  searchInput.appendChild(sLeft);
  searchInput.appendChild(createBadge("⌘K", "neutral", 9));
  hLeft.appendChild(searchInput);

  const vSepL = figma.createFrame();
  vSepL.resize(1, 18);
  vSepL.fills = solid(C.glassBorder, 0.12);
  hLeft.appendChild(vSepL);

  const micStatus = figma.createFrame();
  micStatus.name = "Hardware Mic Indicator";
  micStatus.layoutMode = "HORIZONTAL";
  micStatus.primaryAxisSizingMode = "AUTO";
  micStatus.counterAxisSizingMode = "AUTO";
  micStatus.itemSpacing = 8;
  micStatus.counterAxisAlignItems = "CENTER";
  micStatus.fills = [];
  const micDot = figma.createEllipse(); micDot.resize(7, 7); micDot.fills = solid(C.mint, 1);
  micStatus.appendChild(micDot);
  micStatus.appendChild(createText("Shure MV7 (48kHz YIN Engine)", 11, "Medium", C.textZinc300));
  hLeft.appendChild(micStatus);

  topBar.appendChild(hLeft);

  // Right: Bell, Moon, Profile Chip, New Session Action Button
  const hRight = figma.createFrame();
  hRight.layoutMode = "HORIZONTAL";
  hRight.primaryAxisSizingMode = "AUTO";
  hRight.counterAxisSizingMode = "AUTO";
  hRight.itemSpacing = 12;
  hRight.counterAxisAlignItems = "CENTER";
  hRight.fills = [];

  const bellBtn = createIconButton("bell", "#8B9DAF", 34, 15);
  bellBtn.name = "TopBar/Bell Notifications";
  hRight.appendChild(bellBtn);

  const moonBtn = createIconButton("moon", "#8B9DAF", 34, 15);
  moonBtn.name = "TopBar/Theme Switcher";
  hRight.appendChild(moonBtn);

  const vSepR = figma.createFrame();
  vSepR.resize(1, 18);
  vSepR.fills = solid(C.glassBorder, 0.12);
  hRight.appendChild(vSepR);

  const profileChip = figma.createFrame();
  profileChip.name = "TopBar/User Profile Chip";
  profileChip.layoutMode = "HORIZONTAL";
  profileChip.primaryAxisSizingMode = "AUTO";
  profileChip.counterAxisSizingMode = "AUTO";
  profileChip.itemSpacing = 8;
  profileChip.counterAxisAlignItems = "CENTER";
  profileChip.paddingLeft = 8; profileChip.paddingRight = 14; profileChip.paddingTop = 5; profileChip.paddingBottom = 5;
  profileChip.cornerRadius = 8;
  profileChip.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  profileChip.strokes = solid(C.glassBorder, 0.8);
  profileChip.strokeWeight = 1;

  const chipAvatar = figma.createEllipse();
  chipAvatar.resize(26, 26); chipAvatar.fills = solid(C.forestBase, 1); chipAvatar.strokes = solid(C.mint, 0.6); chipAvatar.strokeWeight = 1;
  profileChip.appendChild(chipAvatar);

  const userTextCol = figma.createFrame();
  userTextCol.layoutMode = "VERTICAL"; userTextCol.itemSpacing = 1; userTextCol.fills = [];
  userTextCol.primaryAxisSizingMode = "AUTO"; userTextCol.counterAxisSizingMode = "AUTO";
  userTextCol.appendChild(createText("Ethan Reynolds", 11, "Bold", C.textWhite));
  userTextCol.appendChild(createText("PRO SINGER", 8, "Bold", C.mint));
  profileChip.appendChild(userTextCol);
  hRight.appendChild(profileChip);

  const btnNewSession = createActionButton("New Session", "arrow-up-right", "radiant");
  btnNewSession.name = "TopBar/New Session CTA";
  hRight.appendChild(btnNewSession);

  topBar.appendChild(hRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. TOP BENTO ROW (1312 x 490): CARD 1 (LEFT 852px) + CARD 2 (RIGHT 444px)
  // -----------------------------------------------------------------------
  const topBentoRow = figma.createFrame();
  topBentoRow.name = "Top Bento Row";
  topBentoRow.layoutMode = "HORIZONTAL";
  topBentoRow.resize(1312, 490);
  topBentoRow.itemSpacing = 16;
  topBentoRow.fills = [];
  topBentoRow.clipsContent = false;

  // CARD 1: LIVE PITCH & FORMANT TRACKER (852 x 490 px) — UC-08 & UC-11
  const pitchCard = figma.createFrame();
  pitchCard.name = "Card 1: Live Pitch & Formant Tracker (UC-08)";
  pitchCard.layoutMode = "VERTICAL";
  pitchCard.resize(852, 490);
  pitchCard.paddingLeft = 24; pitchCard.paddingRight = 24; pitchCard.paddingTop = 18; pitchCard.paddingBottom = 16;
  pitchCard.itemSpacing = 8;
  pitchCard.cornerRadius = 16;
  pitchCard.clipsContent = true;
  applyCard1Glass(pitchCard);

  // Header row
  const pHead = figma.createFrame();
  pHead.layoutMode = "HORIZONTAL"; pHead.resize(804, 26); pHead.primaryAxisAlignItems = "SPACE_BETWEEN"; pHead.counterAxisAlignItems = "CENTER"; pHead.fills = [];
  const pTag = figma.createFrame();
  pTag.layoutMode = "HORIZONTAL"; pTag.itemSpacing = 8; pTag.counterAxisAlignItems = "CENTER"; pTag.fills = [];
  pTag.primaryAxisSizingMode = "AUTO"; pTag.counterAxisSizingMode = "AUTO";
  const pDot = figma.createEllipse(); pDot.resize(7, 7); pDot.fills = solid(C.mint, 1);
  pTag.appendChild(pDot);
  pTag.appendChild(createText("LIVE PITCH & FORMANT TRACKER • YIN DSP Active", 11, "Bold", C.mint));
  pHead.appendChild(pTag);

  const scaleTabs = figma.createFrame();
  scaleTabs.layoutMode = "HORIZONTAL"; scaleTabs.itemSpacing = 6; scaleTabs.counterAxisAlignItems = "CENTER"; scaleTabs.fills = [];
  scaleTabs.primaryAxisSizingMode = "AUTO"; scaleTabs.counterAxisSizingMode = "AUTO";
  scaleTabs.appendChild(createBadge("C Major", "neutral", 9));
  scaleTabs.appendChild(createBadge("G Major (Active)", "mint", 9));
  scaleTabs.appendChild(createBadge("F# Pentatonic", "neutral", 9));
  pHead.appendChild(scaleTabs);
  pitchCard.appendChild(pHead);

  // Frequency readout & REC status
  const pStats = figma.createFrame();
  pStats.name = "Frequency Readout Bar";
  pStats.layoutMode = "HORIZONTAL";
  pStats.resize(804, 48);
  pStats.primaryAxisAlignItems = "SPACE_BETWEEN";
  pStats.counterAxisAlignItems = "CENTER";
  pStats.fills = [];
  pStats.clipsContent = false;

  const pLeftStats = figma.createFrame();
  pLeftStats.layoutMode = "HORIZONTAL";
  pLeftStats.primaryAxisSizingMode = "AUTO";
  pLeftStats.counterAxisSizingMode = "AUTO";
  pLeftStats.itemSpacing = 12;
  pLeftStats.counterAxisAlignItems = "CENTER";
  pLeftStats.fills = [];
  pLeftStats.clipsContent = false;

  pLeftStats.appendChild(createText("G4", 36, "Bold", C.textWhite));
  pLeftStats.appendChild(createText("392.00 Hz", 20, "Bold", C.mint));
  pLeftStats.appendChild(createBadge("IN-TUNE (+2 CENTS)", "mint", 10));

  const ribbon = figma.createFrame();
  ribbon.layoutMode = "HORIZONTAL";
  ribbon.primaryAxisSizingMode = "AUTO";
  ribbon.counterAxisSizingMode = "AUTO";
  ribbon.itemSpacing = 6;
  ribbon.counterAxisAlignItems = "CENTER";
  ribbon.fills = [];
  ribbon.appendChild(createText("C3 — D4 —", 10, "Regular", C.textZinc500));
  ribbon.appendChild(createText("G4 (Target)", 10, "Bold", C.mint));
  ribbon.appendChild(createText("— C5", 10, "Regular", C.textZinc500));
  pLeftStats.appendChild(ribbon);
  pStats.appendChild(pLeftStats);

  // Red REC Pill Badge
  const recBadge = figma.createFrame();
  recBadge.name = "Recording Status Badge";
  recBadge.layoutMode = "HORIZONTAL";
  recBadge.primaryAxisSizingMode = "AUTO";
  recBadge.counterAxisSizingMode = "AUTO";
  recBadge.itemSpacing = 6;
  recBadge.counterAxisAlignItems = "CENTER";
  recBadge.paddingLeft = 10; recBadge.paddingRight = 10; recBadge.paddingTop = 4; recBadge.paddingBottom = 4;
  recBadge.cornerRadius = 6;
  recBadge.fills = solid({ r: 0.16, g: 0.04, b: 0.06 }, 1);
  recBadge.strokes = solid(C.rose, 0.4);
  recBadge.strokeWeight = 1;
  const recDot = figma.createEllipse(); recDot.resize(6, 6); recDot.fills = solid(C.rose, 1);
  recBadge.appendChild(recDot);
  recBadge.appendChild(createText("REC 00:42 / 05:00", 10, "Bold", C.rose));
  pStats.appendChild(recBadge);
  pitchCard.appendChild(pStats);

  // Subtitle line
  pitchCard.appendChild(createText("Scale Target: G Major Arpeggio • Vibrato 6.2 Hz (Stable)", 11, "Medium", C.textZinc400));

  // Rolling pitch canvas (804 x 260)
  const canvasBox = figma.createFrame();
  canvasBox.name = "Rolling Pitch Canvas";
  canvasBox.resize(804, 260);
  canvasBox.cornerRadius = 10;
  canvasBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.9);
  canvasBox.strokes = solid(C.glassBorder, 0.8);
  canvasBox.strokeWeight = 1;
  canvasBox.clipsContent = true;

  // Grid lines
  const gridRows = [
    { label: "A4 (440Hz)", y: 44, color: C.textZinc500 },
    { label: "G4 Target (392Hz)", y: 100, color: C.mint },
    { label: "F4 (349Hz)", y: 160, color: C.textZinc500 },
    { label: "E4 (330Hz)", y: 216, color: C.textZinc500 }
  ];

  for (const gr of gridRows) {
    const gl = figma.createLine();
    gl.resize(804, 0); gl.x = 0; gl.y = gr.y;
    gl.strokes = solid(gr.color, gr.color === C.mint ? 0.35 : 0.08);
    gl.strokeWeight = gr.color === C.mint ? 1.5 : 1;
    canvasBox.appendChild(gl);

    const lbl = createText(gr.label, 9, gr.color === C.mint ? "Bold" : "Regular", gr.color);
    lbl.x = 12; lbl.y = gr.y - 14;
    canvasBox.appendChild(lbl);
  }

  // Time markers
  const times = ["00:00", "00:02", "00:04", "00:06", "00:08", "00:10"];
  times.forEach((t, i) => {
    const tl = createText(t, 9, "Regular", C.textZinc500);
    tl.x = 14 + i * 148; tl.y = 242;
    canvasBox.appendChild(tl);
  });

  // Smooth Pitch Curve
  const pitchVector = figma.createVector();
  pitchVector.name = "Live Pitch Trajectory Curve";
  pitchVector.vectorPaths = [{
    windingRule: "NONE",
    data: "M 10 240 C 90 220 180 160 270 148 C 360 136 460 165 550 130 C 600 110 650 100 700 102 C 750 104 770 115 800 125"
  }];
  pitchVector.fills = [];
  pitchVector.strokes = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.3 } },
      { position: 0.6, color: { r: 0.0, g: 0.96, b: 0.628, a: 1 } },
      { position: 1.0, color: { r: 0.063, g: 0.725, b: 0.506, a: 0.9 } }
    ]
  }];
  pitchVector.strokeWeight = 3;
  canvasBox.appendChild(pitchVector);

  // Target Tooltip Callout Pill (09 Dec • G4 (392.2 Hz) ↗)
  const targetTooltip = figma.createFrame();
  targetTooltip.name = "Target Callout Tooltip";
  targetTooltip.layoutMode = "VERTICAL";
  targetTooltip.primaryAxisSizingMode = "AUTO";
  targetTooltip.counterAxisSizingMode = "AUTO";
  targetTooltip.paddingLeft = 10; targetTooltip.paddingRight = 10; targetTooltip.paddingTop = 6; targetTooltip.paddingBottom = 6;
  targetTooltip.itemSpacing = 2;
  targetTooltip.cornerRadius = 8;
  targetTooltip.fills = solid(C.glassElevated, 0.95);
  targetTooltip.strokes = solid(C.mint, 0.7);
  targetTooltip.strokeWeight = 1;
  targetTooltip.x = 420; targetTooltip.y = 70;
  targetTooltip.appendChild(createText("09 Dec • G4 (392.2 Hz) ↗", 10, "Bold", C.textWhite));
  targetTooltip.appendChild(createText("In-Tune Accuracy 99.4% (+2c)", 9, "Bold", C.mint));
  canvasBox.appendChild(targetTooltip);

  // Crosshair vertical line
  const crosshair = figma.createLine();
  crosshair.rotation = 90; crosshair.resize(180, 0); crosshair.x = 550; crosshair.y = 50;
  crosshair.strokes = solid(C.mint, 0.4); crosshair.strokeWeight = 1;
  canvasBox.appendChild(crosshair);

  // Crosshair dot
  const dot = figma.createEllipse();
  dot.resize(8, 8); dot.x = 546; dot.y = 126;
  dot.fills = solid(C.mint, 1);
  canvasBox.appendChild(dot);

  pitchCard.appendChild(canvasBox);

  // Clean Transport Controls Bar (Zero clipped boxes!)
  const transBar = figma.createFrame();
  transBar.name = "Transport Controls Bar";
  transBar.layoutMode = "HORIZONTAL";
  transBar.resize(804, 42);
  transBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  transBar.counterAxisAlignItems = "CENTER";
  transBar.fills = [];
  transBar.clipsContent = false;

  const transLeft = figma.createFrame();
  transLeft.layoutMode = "HORIZONTAL";
  transLeft.itemSpacing = 12;
  transLeft.counterAxisAlignItems = "CENTER";
  transLeft.fills = [];

  const btnPause = createActionButton("Pause", "pause", "secondary");
  btnPause.name = "Transport/Pause";
  const btnStopAnalyze = createActionButton("Stop & Analyze", "stop", "radiant");
  btnStopAnalyze.name = "Transport/Stop & Analyze";
  transLeft.appendChild(btnPause);
  transLeft.appendChild(btnStopAnalyze);

  // 120 BPM: Clean text directly on transport bar (NO nested clipped box!)
  const bpmText = createText("120 BPM", 12, "Bold", C.mint);
  bpmText.name = "Transport/120 BPM";
  transLeft.appendChild(bpmText);

  // Stereo VU meter: Clean segmented LED bars (NO nested clipped box!)
  const vuMeter = figma.createFrame();
  vuMeter.name = "Stereo VU Meter";
  vuMeter.layoutMode = "HORIZONTAL";
  vuMeter.itemSpacing = 6;
  vuMeter.counterAxisAlignItems = "CENTER";
  vuMeter.fills = [];

  vuMeter.appendChild(createText("L", 10, "Bold", C.textZinc500));
  const vuBarL = figma.createFrame(); vuBarL.resize(46, 6); vuBarL.cornerRadius = 3;
  vuBarL.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.024, g: 0.714, b: 0.831, a: 1 } }] }];
  vuMeter.appendChild(vuBarL);

  vuMeter.appendChild(createText("R", 10, "Bold", C.textZinc500));
  const vuBarR = figma.createFrame(); vuBarR.resize(46, 6); vuBarR.cornerRadius = 3;
  vuBarR.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.96, g: 0.62, b: 0.04, a: 1 } }] }];
  vuMeter.appendChild(vuBarR);

  transLeft.appendChild(vuMeter);
  transBar.appendChild(transLeft);

  const transRight = figma.createFrame();
  transRight.layoutMode = "HORIZONTAL"; transRight.itemSpacing = 12; transRight.counterAxisAlignItems = "CENTER"; transRight.fills = [];
  transRight.appendChild(createText("Noise Floor: -48 dB • RMS: -14.2 dB", 11, "Medium", C.textZinc400));
  transBar.appendChild(transRight);
  pitchCard.appendChild(transBar);

  topBentoRow.appendChild(pitchCard);

  // CARD 2: VOCAL REGISTERS & SPAN (444 x 490 px) — UC-07
  const regCard = figma.createFrame();
  regCard.name = "Card 2: Vocal Registers & Span";
  regCard.layoutMode = "VERTICAL";
  regCard.resize(444, 490);
  regCard.paddingLeft = 20; regCard.paddingRight = 20; regCard.paddingTop = 18; regCard.paddingBottom = 16;
  regCard.itemSpacing = 12;
  regCard.cornerRadius = 16;
  regCard.clipsContent = false;
  applyCard2Glass(regCard);

  // Header row: Vocal Registers & Span + ↗ Retest (clean auto-layout button!)
  const rgHead = figma.createFrame();
  rgHead.layoutMode = "HORIZONTAL"; rgHead.resize(404, 32); rgHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rgHead.counterAxisAlignItems = "CENTER"; rgHead.fills = [];
  rgHead.appendChild(createText("Vocal Registers & Span", 14, "Bold", C.textWhite));

  const btnRetest = createActionButton("Retest", "arrow-up-right", "secondary");
  btnRetest.name = "Registers/Retest";
  rgHead.appendChild(btnRetest);
  regCard.appendChild(rgHead);

  // Register Rows
  function makeRegisterRow(name, freq, percent, color) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(404, 24); row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER"; row.fills = [];
    row.appendChild(createText(name + " (" + freq + ")", 11, "Bold", color));
    row.appendChild(createText(percent, 11, "Bold", color));
    return row;
  }
  regCard.appendChild(makeRegisterRow("HEAD VOICE", "2k–5k Hz", "72% Formant", C.amber));
  regCard.appendChild(makeRegisterRow("MIXED VOICE", "400–2k Hz", "84% Balance", C.mint));

  // Chest Voice Foundation Box (404 x 260 px)
  const rangeBox = figma.createFrame();
  rangeBox.name = "Chest Voice Foundation Box";
  rangeBox.layoutMode = "VERTICAL";
  rangeBox.resize(404, 260);
  rangeBox.paddingLeft = 18; rangeBox.paddingRight = 18; rangeBox.paddingTop = 16; rangeBox.paddingBottom = 16;
  rangeBox.itemSpacing = 10;
  rangeBox.cornerRadius = 12;
  rangeBox.fills = solid(C.forestBase, 0.7);
  rangeBox.strokes = solid(C.mint, 0.35);
  rangeBox.strokeWeight = 1;

  const rfHead = figma.createFrame();
  rfHead.layoutMode = "HORIZONTAL"; rfHead.resize(368, 20); rfHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rfHead.counterAxisAlignItems = "CENTER"; rfHead.fills = [];
  rfHead.appendChild(createText("CHEST VOICE FOUNDATION", 10, "Bold", C.mint));
  rfHead.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
  rangeBox.appendChild(rfHead);

  // Big range headline C2 — A4
  const rangeTitleCol = figma.createFrame();
  rangeTitleCol.layoutMode = "VERTICAL"; rangeTitleCol.itemSpacing = 2; rangeTitleCol.fills = [];
  rangeTitleCol.appendChild(createText("C2 — A4", 32, "Bold", C.textWhite));
  rangeTitleCol.appendChild(createText("Span: 2.8 Octaves (Tenor Range)", 12, "Medium", C.textZinc300));
  rangeBox.appendChild(rangeTitleCol);

  // Resonance power stats row
  const rStatsRow = figma.createFrame();
  rStatsRow.layoutMode = "HORIZONTAL"; rStatsRow.resize(368, 20); rStatsRow.primaryAxisAlignItems = "SPACE_BETWEEN"; rStatsRow.counterAxisAlignItems = "CENTER"; rStatsRow.fills = [];
  rStatsRow.appendChild(createText("Resonance Power: 94%", 11, "Bold", C.mint));
  rStatsRow.appendChild(createText("↑ Top 8% Singer", 11, "Bold", C.mint));
  rangeBox.appendChild(rStatsRow);

  // Glowing progress bar
  const pBarBg = figma.createFrame();
  pBarBg.resize(368, 6); pBarBg.cornerRadius = 3; pBarBg.fills = solid({ r: 0.05, g: 0.10, b: 0.12 }, 1);
  const pBarFill = figma.createFrame();
  pBarFill.resize(346, 6); pBarFill.cornerRadius = 3;
  pBarFill.fills = solid(C.mint, 1);
  pBarBg.appendChild(pBarFill);
  rangeBox.appendChild(pBarBg);

  rangeBox.appendChild(createText("Acoustic Formant: 730 Hz • Optimal Core Resonance", 10, "Medium", C.textZinc400));
  regCard.appendChild(rangeBox);

  // Action row: Expand Range (secondary) + Practice Scales (radiant)
  const regActRow = figma.createFrame();
  regActRow.layoutMode = "HORIZONTAL"; regActRow.resize(404, 38); regActRow.primaryAxisAlignItems = "SPACE_BETWEEN"; regActRow.fills = [];
  const btnExpand = createActionButton("Expand Range", "arrow-down-right", "secondary", 192);
  btnExpand.name = "Registers/Expand Range";
  const btnPractice = createActionButton("Practice Scales", "arrow-up-right", "radiant", 202);
  btnPractice.name = "Registers/Practice Scales";
  regActRow.appendChild(btnExpand);
  regActRow.appendChild(btnPractice);
  regCard.appendChild(regActRow);

  topBentoRow.appendChild(regCard);
  container.appendChild(topBentoRow);

  // -----------------------------------------------------------------------
  // 3. BOTTOM BENTO ROW (1312 x 340): 3 BALANCED CARDS FROM patokan.png!
  //    Card 3 (416px): Gemini AI Vocal Coach
  //    Card 4 (444px): Accuracy Trend (Weekly bar chart)
  //    Card 5 (420px): Recent Singing Takes
  // -----------------------------------------------------------------------
  const botBentoRow = figma.createFrame();
  botBentoRow.name = "Bottom Bento Row";
  botBentoRow.layoutMode = "HORIZONTAL";
  botBentoRow.resize(1312, 340);
  botBentoRow.itemSpacing = 16;
  botBentoRow.fills = [];
  botBentoRow.clipsContent = false;

  // CARD 3: GEMINI AI VOCAL COACH (416 x 340 px) — STRICTLY FROM patokan.png
  const coachCard = figma.createFrame();
  coachCard.name = "Card 3: Gemini AI Vocal Coach";
  coachCard.layoutMode = "VERTICAL";
  coachCard.resize(416, 340);
  coachCard.paddingLeft = 20; coachCard.paddingRight = 20; coachCard.paddingTop = 16; coachCard.paddingBottom = 16;
  coachCard.itemSpacing = 10;
  coachCard.cornerRadius = 16;
  coachCard.clipsContent = false;
  applyCard1Glass(coachCard);

  // Coach Badge header
  const cBadgeRow = figma.createFrame();
  cBadgeRow.layoutMode = "HORIZONTAL"; cBadgeRow.itemSpacing = 6; cBadgeRow.counterAxisAlignItems = "CENTER"; cBadgeRow.fills = [];
  cBadgeRow.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
  cBadgeRow.appendChild(createText("GEMINI AI VOCAL COACH", 11, "Bold", C.mint));
  coachCard.appendChild(cBadgeRow);

  // Title
  coachCard.appendChild(createText("Bridge Mix-Voice Smoothly", 16, "Bold", C.textWhite));

  // Quote
  const quoteText = createParagraph(
    `"Great resonance on chest tones! Smooth the F#4 to G4 bridge to eliminate the slight flat drift during breath recovery."`,
    376, 11, "Regular", C.textZinc300, 17
  );
  coachCard.appendChild(quoteText);

  // Audio Chip: Take Analysis: F#4–G4 Shift + mini waveform bars
  const audioChip = figma.createFrame();
  audioChip.name = "Audio Chip Analysis";
  audioChip.layoutMode = "HORIZONTAL";
  audioChip.resize(376, 44);
  audioChip.paddingLeft = 12; audioChip.paddingRight = 12;
  audioChip.primaryAxisAlignItems = "SPACE_BETWEEN";
  audioChip.counterAxisAlignItems = "CENTER";
  audioChip.cornerRadius = 8;
  audioChip.fills = solid(C.glassElevated, 0.9);
  audioChip.strokes = solid(C.glassBorder, 0.6);
  audioChip.strokeWeight = 1;

  const acLeft = figma.createFrame();
  acLeft.layoutMode = "VERTICAL"; acLeft.itemSpacing = 1; acLeft.fills = [];
  acLeft.appendChild(createText("Take Analysis: F#4–G4 Shift", 11, "Bold", C.textWhite));
  acLeft.appendChild(createText("Mild Flatness Detected at 00:23", 9, "Regular", C.textZinc500));
  audioChip.appendChild(acLeft);

  // Mini EQ bars
  const miniEq = figma.createFrame();
  miniEq.layoutMode = "HORIZONTAL"; miniEq.itemSpacing = 3; miniEq.counterAxisAlignItems = "CENTER"; miniEq.fills = [];
  const eqHeights = [8, 16, 24, 14, 20, 12, 18, 10];
  for (const eh of eqHeights) {
    const b = figma.createFrame();
    b.resize(3, eh); b.cornerRadius = 1.5;
    b.fills = solid(C.mint, 0.85);
    miniEq.appendChild(b);
  }
  audioChip.appendChild(miniEq);
  coachCard.appendChild(audioChip);

  // Social proof: 4 colored overlapping avatar circles + +1.4k singers
  const socialRow = figma.createFrame();
  socialRow.layoutMode = "HORIZONTAL"; socialRow.itemSpacing = 8; socialRow.counterAxisAlignItems = "CENTER"; socialRow.fills = [];

  const avGroup = figma.createFrame();
  avGroup.resize(60, 20); avGroup.fills = [];
  const avColors = [
    { r: 0.0, g: 0.96, b: 0.628 },
    { r: 0.96, g: 0.62, b: 0.04 },
    { r: 0.024, g: 0.714, b: 0.831 },
    { r: 0.957, g: 0.247, b: 0.369 }
  ];
  avColors.forEach((col, idx) => {
    const av = figma.createEllipse();
    av.resize(18, 18); av.x = idx * 13; av.y = 1;
    av.fills = solid(col, 1);
    av.strokes = solid(C.canvasTop, 1); av.strokeWeight = 1.5;
    avGroup.appendChild(av);
  });
  socialRow.appendChild(avGroup);
  socialRow.appendChild(createText("+1.4k singers trained today", 10, "Medium", C.textZinc400));
  coachCard.appendChild(socialRow);

  // Primary Action Button: ↗ Start 5-Min Drill
  const btnStartDrill = createActionButton("Start 5-Min Drill", "arrow-up-right", "radiant", 376);
  btnStartDrill.name = "Coach/Start 5-Min Drill";
  coachCard.appendChild(btnStartDrill);

  botBentoRow.appendChild(coachCard);

  // CARD 4: ACCURACY TREND (444 x 340 px) — STRICTLY FROM patokan.png
  const trendCard = figma.createFrame();
  trendCard.name = "Card 4: Accuracy Trend";
  trendCard.layoutMode = "VERTICAL";
  trendCard.resize(444, 340);
  trendCard.paddingLeft = 20; trendCard.paddingRight = 20; trendCard.paddingTop = 16; trendCard.paddingBottom = 16;
  trendCard.itemSpacing = 12;
  trendCard.cornerRadius = 16;
  trendCard.clipsContent = false;
  applyCard2Glass(trendCard);

  // Header: Accuracy Trend 94.2% ↑ 3.8% on left, Weekly dropdown on right
  const trHead = figma.createFrame();
  trHead.layoutMode = "HORIZONTAL"; trHead.resize(404, 26); trHead.primaryAxisAlignItems = "SPACE_BETWEEN"; trHead.counterAxisAlignItems = "CENTER"; trHead.fills = [];

  const trHeadLeft = figma.createFrame();
  trHeadLeft.layoutMode = "HORIZONTAL"; trHeadLeft.itemSpacing = 8; trHeadLeft.counterAxisAlignItems = "CENTER"; trHeadLeft.fills = [];
  trHeadLeft.appendChild(createText("Accuracy Trend", 13, "Bold", C.textWhite));
  trHeadLeft.appendChild(createText("94.2%", 15, "Bold", C.mint));
  trHeadLeft.appendChild(createText("↑ 3.8%", 11, "Bold", C.mint));
  trHead.appendChild(trHeadLeft);

  const trDropdown = figma.createFrame();
  trDropdown.layoutMode = "HORIZONTAL"; trDropdown.itemSpacing = 4; trDropdown.counterAxisAlignItems = "CENTER";
  trDropdown.paddingLeft = 8; trDropdown.paddingRight = 8; trDropdown.paddingTop = 3; trDropdown.paddingBottom = 3;
  trDropdown.cornerRadius = 6; trDropdown.fills = solid(C.glassElevated, 0.8);
  trDropdown.strokes = solid(C.glassBorder, 0.6); trDropdown.strokeWeight = 1;
  trDropdown.appendChild(createText("Weekly ˅", 10, "Medium", C.textZinc300));
  trHead.appendChild(trDropdown);
  trendCard.appendChild(trHead);

  // 7 Vertical Bars Chart (Mon - Today)
  const barChartBox = figma.createFrame();
  barChartBox.name = "Weekly 7-Day Bar Chart";
  barChartBox.resize(404, 190);
  barChartBox.fills = [];
  barChartBox.clipsContent = false;

  const barData = [
    { day: "Mon", pct: 72, h: 90 },
    { day: "Tue", pct: 84, h: 105 },
    { day: "Wed", pct: 88, h: 110 },
    { day: "Thu", pct: 86, h: 108 },
    { day: "Fri", pct: 92, h: 115 },
    { day: "Sat", pct: 95, h: 120 },
    { day: "Today", pct: 98, h: 128, peak: true }
  ];

  barData.forEach((d, i) => {
    const x = 10 + i * 56;

    // Background track bar
    const track = figma.createFrame();
    track.resize(36, 136); track.x = x; track.y = 28; track.cornerRadius = 6;
    track.fills = solid(C.glassElevated, 0.4);
    barChartBox.appendChild(track);

    // Filled bar
    const filled = figma.createFrame();
    filled.resize(36, d.h); filled.x = x; filled.y = 28 + (136 - d.h); filled.cornerRadius = 6;
    if (d.peak) {
      filled.fills = solid(C.mint, 1);
      // Peak badge
      const peakBadge = createBadge("98% Peak", "mint", 8);
      peakBadge.x = x - 6; peakBadge.y = 6;
      barChartBox.appendChild(peakBadge);
    } else {
      filled.fills = solid({ r: 0.08, g: 0.16, b: 0.18 }, 0.85);
      // Percentage text above bar
      const pText = createText(d.pct + "%", 9, "Regular", C.textZinc400);
      pText.x = x + 6; pText.y = 12;
      barChartBox.appendChild(pText);
    }
    barChartBox.appendChild(filled);

    // Day label below
    const dayLabel = createText(d.day, 10, d.peak ? "Bold" : "Regular", d.peak ? C.mint : C.textZinc500);
    dayLabel.x = x + (d.day === "Today" ? 2 : 7); dayLabel.y = 172;
    barChartBox.appendChild(dayLabel);
  });
  trendCard.appendChild(barChartBox);

  // Footer: Vibrato Rate & Steady Breath
  const trFooter = figma.createFrame();
  trFooter.layoutMode = "HORIZONTAL"; trFooter.resize(404, 20); trFooter.primaryAxisAlignItems = "SPACE_BETWEEN"; trFooter.counterAxisAlignItems = "CENTER"; trFooter.fills = [];
  trFooter.appendChild(createText("Vibrato Rate: 6.1 Hz (Natural)", 10, "Regular", C.textZinc400));
  trFooter.appendChild(createText("Steady Breath: 88.4%", 10, "Bold", C.mint));
  trendCard.appendChild(trFooter);

  botBentoRow.appendChild(trendCard);

  // CARD 5: RECENT SINGING TAKES (420 x 340 px) — STRICTLY FROM patokan.png
  const takesCard = figma.createFrame();
  takesCard.name = "Card 5: Recent Singing Takes";
  takesCard.layoutMode = "VERTICAL";
  takesCard.resize(420, 340);
  takesCard.paddingLeft = 20; takesCard.paddingRight = 20; takesCard.paddingTop = 16; takesCard.paddingBottom = 16;
  takesCard.itemSpacing = 10;
  takesCard.cornerRadius = 16;
  takesCard.clipsContent = false;
  applyCard2Glass(takesCard);

  // Header: Recent Singing Takes on left, View All on right
  const tkHead = figma.createFrame();
  tkHead.layoutMode = "HORIZONTAL"; tkHead.resize(380, 24); tkHead.primaryAxisAlignItems = "SPACE_BETWEEN"; tkHead.counterAxisAlignItems = "CENTER"; tkHead.fills = [];
  tkHead.appendChild(createText("Recent Singing Takes", 13, "Bold", C.textWhite));
  const tkViewAll = createText("View All", 11, "Medium", C.textZinc400);
  tkViewAll.name = "Takes/View All";
  tkHead.appendChild(tkViewAll);
  takesCard.appendChild(tkHead);

  // 3 Take Rows
  function makeTakeRow(title, subtext, iconType, badgeType, badgeLabel) {
    const row = figma.createFrame();
    row.name = "Take Row/" + title;
    row.layoutMode = "HORIZONTAL";
    row.resize(380, 68);
    row.paddingLeft = 14; row.paddingRight = 14;
    row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER";
    row.cornerRadius = 10;
    row.fills = solid(C.glassElevated, 0.6);
    row.strokes = solid(C.glassBorder, 0.6);
    row.strokeWeight = 1;

    const leftPart = figma.createFrame();
    leftPart.layoutMode = "HORIZONTAL"; leftPart.itemSpacing = 12; leftPart.counterAxisAlignItems = "CENTER"; leftPart.fills = [];

    // Icon Circle (34x34)
    const icCircle = figma.createEllipse();
    icCircle.resize(34, 34); icCircle.fills = solid({ r: 0.05, g: 0.12, b: 0.10 }, 1);
    icCircle.strokes = solid(C.mint, 0.5); icCircle.strokeWeight = 1;

    const icBox = figma.createFrame();
    icBox.resize(34, 34); icBox.fills = [];
    icBox.appendChild(icCircle);
    const icSvg = createSvgIcon(iconType === "mic" ? "sparkle" : "waveform", "#00F5A0", 16);
    icSvg.x = 9; icSvg.y = 9;
    icBox.appendChild(icSvg);
    leftPart.appendChild(icBox);

    const txtCol = figma.createFrame();
    txtCol.layoutMode = "VERTICAL"; txtCol.itemSpacing = 2; txtCol.fills = [];
    txtCol.appendChild(createText(title, 12, "Bold", C.textWhite));
    txtCol.appendChild(createText(subtext, 10, "Regular", C.textZinc400));
    leftPart.appendChild(txtCol);
    row.appendChild(leftPart);

    if (badgeType === "replay") {
      const btnReplay = createActionButton(badgeLabel, "play", "secondary");
      btnReplay.name = "Takes/Replay";
      row.appendChild(btnReplay);
    } else {
      const bd = createBadge(badgeLabel, "mint", 10);
      row.appendChild(bd);
    }
    return row;
  }

  takesCard.appendChild(makeTakeRow("Bohemian Rhapsody (G4)", "2 min ago • 96% In-Tune", "mic", "badge", "+15 pts"));
  takesCard.appendChild(makeTakeRow("Solfeggio Scale Drill", "Yesterday • F4 Sharp Fals", "wave", "replay", "Replay 00:23"));
  takesCard.appendChild(makeTakeRow("Vocal Range Assessment", "3 days ago • C2 to A4 Span", "mic", "badge", "PDF Ready"));

  botBentoRow.appendChild(takesCard);
  container.appendChild(botBentoRow);

  return root;
}
