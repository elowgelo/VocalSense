// =============================================================================
// VOCALSENSE AI — M02. MOBILE VOCAL STUDIO WORKSTATION (DAW) (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Studio DAW (patokan.png)
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createMobileWebHeader,
  createMobileBottomNav,
  createAvatarStack,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

function buildMobileStudioScreen() {
  const root = createMobileScreen("VocalSense AI — M02. Mobile Studio Workstation", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/studio", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header (y = 70, h = 46)
  const header = createMobileWebHeader("Studio Workstation", null, true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Studio Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Session Metadata Row ---
  const sessionHead = createFullRow(361, 6);
  const sHL = createAutoCol(1);
  sHL.appendChild(createText("Bohemian Rhapsody", 12, "Bold", C.textWhite));
  sHL.appendChild(createText("Take #04 • Queen (Key: Bb Major)", 8, "Regular", C.textZinc400));
  sessionHead.appendChild(sHL);

  const sHR = createAutoRow(6);
  sHR.appendChild(makePill("48 kHz FLAC", C.mint, C.forestBase, C.mint, 7));
  const btnNew = figma.createFrame();
  btnNew.name = "Btn/New Take";
  btnNew.layoutMode = "HORIZONTAL";
  btnNew.primaryAxisSizingMode = "AUTO";
  btnNew.counterAxisSizingMode = "AUTO";
  btnNew.paddingLeft = 7;
  btnNew.paddingRight = 7;
  btnNew.paddingTop = 3;
  btnNew.paddingBottom = 3;
  btnNew.cornerRadius = 5;
  btnNew.fills = solid(C.forestBase, 1);
  btnNew.strokes = solid(C.mint, 0.7);
  btnNew.strokeWeight = 1;
  btnNew.primaryAxisAlignItems = "CENTER";
  btnNew.counterAxisAlignItems = "CENTER";
  btnNew.appendChild(createText("+ New Take", 8, "Bold", C.mint));
  sHR.appendChild(btnNew);
  sessionHead.appendChild(sHR);
  content.appendChild(sessionHead);

  // --- Bento Card 1: Real-Time Pitch Tuner Dial & Waveform ---
  const tunerCard = makeMobileCard("Acoustic Tuner Card", 9, 5);
  tunerCard.counterAxisAlignItems = "CENTER";

  const tcHead = createFullRow(341, 6);
  tcHead.appendChild(createText("LIVE PITCH & FORMANT TRACKER", 8, "Bold", C.textZinc400));
  tcHead.appendChild(makePill("120 BPM • 4/4", C.mint, C.forestBase, C.mint, 7));
  tunerCard.appendChild(tcHead);

  // Mathematically Centered Pitch Tuner Dial (70 × 70 px)
  const dial = figma.createFrame();
  dial.name = "Pitch Tuner Dial";
  dial.layoutMode = "VERTICAL";
  dial.primaryAxisSizingMode = "FIXED";
  dial.counterAxisSizingMode = "FIXED";
  dial.resize(68, 68);
  dial.cornerRadius = 34;
  dial.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.25, b: 0.16, a: 1 } },
      { position: 1.0, color: { r: 0.04, g: 0.10, b: 0.14, a: 1 } }
    ]
  }];
  dial.strokes = solid(C.mint, 0.9);
  dial.strokeWeight = 2;
  dial.primaryAxisAlignItems = "CENTER";
  dial.counterAxisAlignItems = "CENTER";
  dial.itemSpacing = 1;
  dial.paddingLeft = 0;
  dial.paddingRight = 0;
  dial.paddingTop = 0;
  dial.paddingBottom = 0;

  dial.appendChild(createText("TARGET", 7, "Bold", C.textZinc400));
  dial.appendChild(createText("G4", 20, "Bold", C.textWhite));
  dial.appendChild(createText("392.0 Hz • ±0 ct", 7, "Medium", C.mint));
  tunerCard.appendChild(dial);

  // Live Audio Pitch Waveform
  const waveBox = figma.createFrame();
  waveBox.resize(341, 32);
  waveBox.cornerRadius = 6;
  waveBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.95);
  waveBox.strokes = solid(C.glassBorder, 0.7);
  waveBox.strokeWeight = 1;

  const waveVec = figma.createVector();
  waveVec.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 24 C 40 20 70 8 110 12 C 150 14 180 28 220 16 C 260 4 290 20 341 10"
  }];
  waveVec.resize(341, 24);
  waveVec.strokes = solid(C.mint, 1);
  waveVec.strokeWeight = 1.8;
  waveVec.x = 0; waveVec.y = 4;
  waveBox.appendChild(waveVec);
  tunerCard.appendChild(waveBox);

  // Transport Bar (Record dot, Timer, VU meter, Stop & Analyze)
  const transport = createFullRow(341, 6);
  const tL = createAutoRow(5);

  const btnRec = figma.createFrame();
  btnRec.layoutMode = "HORIZONTAL";
  btnRec.primaryAxisSizingMode = "FIXED";
  btnRec.counterAxisSizingMode = "FIXED";
  btnRec.resize(20, 20);
  btnRec.cornerRadius = 10;
  btnRec.fills = solid(C.rose, 1);
  btnRec.primaryAxisAlignItems = "CENTER";
  btnRec.counterAxisAlignItems = "CENTER";
  const recDot = figma.createFrame();
  recDot.resize(6, 6);
  recDot.cornerRadius = 3;
  recDot.fills = solid(C.textWhite, 1);
  btnRec.appendChild(recDot);
  tL.appendChild(btnRec);

  tL.appendChild(createText("00:42 / 03:45", 8, "Bold", C.textWhite));
  transport.appendChild(tL);

  const btnStop = figma.createFrame();
  btnStop.name = "Btn/Stop & Analyze";
  btnStop.layoutMode = "HORIZONTAL";
  btnStop.primaryAxisSizingMode = "AUTO";
  btnStop.counterAxisSizingMode = "AUTO";
  btnStop.paddingLeft = 8;
  btnStop.paddingRight = 8;
  btnStop.paddingTop = 3;
  btnStop.paddingBottom = 3;
  btnStop.cornerRadius = 5;
  btnStop.fills = solid(C.forestBase, 1);
  btnStop.strokes = solid(C.mint, 0.9);
  btnStop.strokeWeight = 1;
  btnStop.primaryAxisAlignItems = "CENTER";
  btnStop.counterAxisAlignItems = "CENTER";
  btnStop.appendChild(createText("Stop & Analyze", 8, "Bold", C.mint));
  transport.appendChild(btnStop);
  tunerCard.appendChild(transport);
  content.appendChild(tunerCard);

  // --- Bento Card 2: Vocal Registers & Span ---
  const regCard = makeMobileCard("Vocal Registers Card", 9, 4);
  const rcHead = createFullRow(341, 6);
  rcHead.appendChild(createText("VOCAL REGISTERS & SPAN", 8, "Bold", C.textZinc400));
  rcHead.appendChild(createText("Retest ↗", 8, "Bold", C.mint));
  regCard.appendChild(rcHead);

  const regBar = createFullRow(341, 4);
  function makeRegBlock(name, range, pct, active) {
    const b = figma.createFrame();
    b.layoutMode = "VERTICAL";
    b.resize(109, 34);
    b.primaryAxisSizingMode = "FIXED";
    b.counterAxisSizingMode = "FIXED";
    b.paddingLeft = 6;
    b.paddingRight = 6;
    b.paddingTop = 2;
    b.paddingBottom = 2;
    b.cornerRadius = 5;
    b.fills = solid(active ? C.forestBase : C.glassElevated, 1);
    b.strokes = solid(active ? C.mint : C.glassBorder, active ? 1 : 0.6);
    b.strokeWeight = 1;
    b.itemSpacing = 1;
    b.appendChild(createText(name, 7, active ? "Bold" : "Medium", active ? C.mint : C.textWhite));
    b.appendChild(createText(range, 7, "Regular", C.textZinc400));
    b.appendChild(createText(pct, 7, "Bold", active ? C.mint : C.textZinc300));
    return b;
  }
  regBar.appendChild(makeRegBlock("Chest Voice", "C2–A4", "94%", false));
  regBar.appendChild(makeRegBlock("Mixed Voice", "A#4–E5", "88%", true));
  regBar.appendChild(makeRegBlock("Head Voice", "F5–G5", "76%", false));
  regCard.appendChild(regBar);
  content.appendChild(regCard);

  // --- Bento Card 3: Gemini AI Vocal Coach Card ---
  const aiCard = makeMobileCard("Gemini AI Coach Card", 9, 4);
  const aiHead = createFullRow(341, 6);
  const aiHeadL = createAutoRow(5);
  aiHeadL.appendChild(createSvgIcon("sparkle", "#00F5A0", 11));
  aiHeadL.appendChild(createText("GEMINI AI VOCAL COACH", 8, "Bold", C.mint));
  aiHead.appendChild(aiHeadL);
  aiHead.appendChild(makePill("INTELLIGENT DSP", C.mint, C.forestBase, C.mint, 7));
  aiCard.appendChild(aiHead);

  aiCard.appendChild(createText("Bridge Mix-Voice Smoothly at F#4", 9, "Bold", C.textWhite));
  aiCard.appendChild(createParagraph("Great resonance on chest tones! Smooth the F#4 to G4 bridge to eliminate the slight flat drift during breath recovery.", 341, 7.5, "Regular", C.textZinc400, 11));

  // Avatar Stack (Matching patokan.png coach card)
  aiCard.appendChild(createAvatarStack(4, "+1.4k singers trained today"));

  const btnDrill = figma.createFrame();
  btnDrill.name = "Btn/Start 5-Min Drill";
  btnDrill.layoutMode = "HORIZONTAL";
  btnDrill.resize(341, 24);
  btnDrill.primaryAxisSizingMode = "FIXED";
  btnDrill.counterAxisSizingMode = "FIXED";
  btnDrill.cornerRadius = 5;
  btnDrill.primaryAxisAlignItems = "CENTER";
  btnDrill.counterAxisAlignItems = "CENTER";
  btnDrill.fills = solid(C.forestBase, 1);
  btnDrill.strokes = solid(C.mint, 0.7);
  btnDrill.strokeWeight = 1;
  btnDrill.appendChild(createText("Start 5-Min Transition Drill ↗", 8, "Bold", C.mint));
  aiCard.appendChild(btnDrill);
  content.appendChild(aiCard);

  // --- Bento Card 4: 7-Day Accuracy Trend Chart (Matching patokan.png) ---
  const trendCard = makeMobileCard("Accuracy Trend Card", 9, 4);
  const trHead = createFullRow(341, 6);
  trHead.appendChild(createText("ACCURACY TREND", 8, "Bold", C.textZinc400));
  trHead.appendChild(createText("94.2%  ↑ 3.8%", 8, "Bold", C.mint));
  trendCard.appendChild(trHead);

  const barChart = createFullRow(341, 4);
  const days = [
    { day: "Mon", val: 30, pct: "72%" },
    { day: "Tue", val: 42, pct: "84%" },
    { day: "Wed", val: 48, pct: "88%" },
    { day: "Thu", val: 44, pct: "86%" },
    { day: "Fri", val: 52, pct: "92%" },
    { day: "Sat", val: 56, pct: "95%" },
    { day: "Today", val: 62, pct: "98%", active: true }
  ];

  for (const d of days) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.resize(44, 42);
    col.primaryAxisSizingMode = "FIXED";
    col.counterAxisSizingMode = "FIXED";
    col.primaryAxisAlignItems = "MAX";
    col.counterAxisAlignItems = "CENTER";
    col.itemSpacing = 2;
    col.fills = [];

    const bar = figma.createFrame();
    bar.resize(22, Math.round(d.val * 0.40));
    bar.cornerRadius = 3;
    bar.fills = solid(d.active ? C.mint : { r: 0.12, g: 0.16, b: 0.22 }, 1);
    col.appendChild(bar);

    col.appendChild(createText(d.day, 7, d.active ? "Bold" : "Regular", d.active ? C.mint : C.textZinc400));
    barChart.appendChild(col);
  }
  trendCard.appendChild(barChart);
  content.appendChild(trendCard);

  // --- Bento Card 5: Recent Singing Takes ---
  const takesCard = makeMobileCard("Recent Singing Takes Card", 9, 4);
  const tkHead = createFullRow(341, 6);
  tkHead.appendChild(createText("RECENT SINGING TAKES", 8, "Bold", C.textZinc400));
  tkHead.appendChild(createText("View All", 8, "Bold", C.mint));
  takesCard.appendChild(tkHead);

  function makeTakeRow(title, sub, score) {
    const row = createFullRow(341, 6);
    row.paddingTop = 1; row.paddingBottom = 1;

    const tL = createAutoCol(1);
    tL.counterAxisSizingMode = "FIXED";
    tL.resize(250, 22);
    tL.appendChild(createText(title, 8, "Bold", C.textWhite));
    tL.appendChild(createText(sub, 7, "Regular", C.textZinc400));
    row.appendChild(tL);

    row.appendChild(makePill(score, C.mint, C.forestBase, C.mint, 7));
    return row;
  }

  takesCard.appendChild(makeTakeRow("Bohemian Rhapsody", "2 min ago • 96% In-Tune", "+15 pts"));
  takesCard.appendChild(makeTakeRow("Nessun Dorma", "Yesterday • Key G • F4 Sharp Fals", "98 / 100"));
  content.appendChild(takesCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("studio");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileStudioScreen };
