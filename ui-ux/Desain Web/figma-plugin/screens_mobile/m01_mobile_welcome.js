// =============================================================================
// VOCALSENSE AI — M01. MOBILE OFFICIAL HOMEPAGE & WELCOME (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Homepage (01_homepage.js)
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createAvatarStack,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

function buildMobileWelcomeScreen() {
  const root = createMobileScreen("VocalSense AI — M01. Mobile Welcome & Experience", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("vocalsense.ai", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header with Sign In CTA (y = 70, h = 46)
  const header = figma.createFrame();
  header.name = "Mobile Web Header";
  header.layoutMode = "HORIZONTAL";
  header.resize(393, 46);
  header.x = 0;
  header.y = 70;
  header.primaryAxisSizingMode = "FIXED";
  header.counterAxisSizingMode = "FIXED";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = 16;
  header.paddingRight = 16;
  header.fills = solid({ r: 0.04, g: 0.05, b: 0.08 }, 0.95);
  header.strokes = solid(C.glassBorder, 0.6);
  header.strokeWeight = 1;

  const hLeft = createAutoRow(8);
  const logoSquircle = figma.createFrame();
  logoSquircle.layoutMode = "HORIZONTAL";
  logoSquircle.primaryAxisSizingMode = "FIXED";
  logoSquircle.counterAxisSizingMode = "FIXED";
  logoSquircle.resize(24, 24);
  logoSquircle.cornerRadius = 6;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.paddingLeft = 0;
  logoSquircle.paddingRight = 0;
  logoSquircle.paddingTop = 0;
  logoSquircle.paddingBottom = 0;
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 13));
  hLeft.appendChild(logoSquircle);
  hLeft.appendChild(createText("VocalSense AI", 13, "Bold", C.textWhite));
  header.appendChild(hLeft);

  const btnSignIn = figma.createFrame();
  btnSignIn.name = "Btn/Sign In";
  btnSignIn.layoutMode = "HORIZONTAL";
  btnSignIn.primaryAxisSizingMode = "AUTO";
  btnSignIn.counterAxisSizingMode = "AUTO";
  btnSignIn.paddingLeft = 10;
  btnSignIn.paddingRight = 10;
  btnSignIn.paddingTop = 4;
  btnSignIn.paddingBottom = 4;
  btnSignIn.cornerRadius = 6;
  btnSignIn.fills = solid(C.glassElevated, 1);
  btnSignIn.strokes = solid(C.mint, 0.7);
  btnSignIn.strokeWeight = 1;
  btnSignIn.appendChild(createText("Sign In", 9, "Bold", C.mint));
  header.appendChild(btnSignIn);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Welcome Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 7;
  content.fills = [];
  content.clipsContent = false;

  // --- Hero Card (Matching Desktop 01 Homepage verbatim) ---
  const heroCard = makeMobileCard("Hero Card", 11, 5);
  heroCard.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.03, g: 0.18, b: 0.12, a: 0.95 } },
      { position: 1.0, color: { r: 0.05, g: 0.08, b: 0.11, a: 0.85 } }
    ]
  }];
  heroCard.strokes = solid(C.mint, 0.45);

  const hcTop = createFullRow(339, 6);
  hcTop.appendChild(makePill("BIO-ACOUSTIC PITCH DIAGNOSTIC", C.mint, C.forestBase, C.mint, 7));
  hcTop.appendChild(makePill("0.02s LATENCY", C.emerald, C.glassElevated, C.glassBorder, 7));
  heroCard.appendChild(hcTop);

  heroCard.appendChild(createText("Precision Bio-Acoustic Studio &\nReal-Time Vocal Diagnostics", 15, "Bold", C.textWhite));
  heroCard.appendChild(createParagraph("Sub-millisecond YIN pitch detection, formant resonance tracking, and personalized vocal pedagogy powered by Gemini AI — zero latency, directly in your web browser.", 339, 8, "Regular", C.textZinc400, 12));

  // Live Biometric Readout Chip
  const readout = createFullRow(339, 6);
  readout.paddingLeft = 8;
  readout.paddingRight = 8;
  readout.paddingTop = 4;
  readout.paddingBottom = 4;
  readout.cornerRadius = 6;
  readout.fills = solid(C.forestBase, 0.9);
  readout.strokes = solid(C.mint, 0.5);
  readout.strokeWeight = 1;

  const rL = createAutoRow(6);
  rL.appendChild(createSvgIcon("mic", "#00F5A0", 11));
  rL.appendChild(createText("Live Note Detected", 8, "Medium", C.textZinc300));
  readout.appendChild(rL);

  const rR = createAutoRow(6);
  rR.appendChild(createText("G4 (392.0 Hz)", 9, "Bold", C.mint));
  rR.appendChild(makePill("±2 ct", C.mint, C.forestBase, C.mint, 7));
  readout.appendChild(rR);
  heroCard.appendChild(readout);

  // Dual Action Buttons (Matching Desktop 01)
  const ctaRow = createFullRow(339, 6);
  const btnStart = figma.createFrame();
  btnStart.name = "Button/Start Vocal Analysis";
  btnStart.layoutMode = "HORIZONTAL";
  btnStart.resize(165, 32);
  btnStart.primaryAxisSizingMode = "FIXED";
  btnStart.counterAxisSizingMode = "FIXED";
  btnStart.cornerRadius = 6;
  btnStart.primaryAxisAlignItems = "CENTER";
  btnStart.counterAxisAlignItems = "CENTER";
  btnStart.fills = solid(C.mint, 1);
  btnStart.appendChild(createText("Start Vocal Analysis ↗", 9, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  ctaRow.appendChild(btnStart);

  const btnExplore = figma.createFrame();
  btnExplore.name = "Button/Explore Live Console";
  btnExplore.layoutMode = "HORIZONTAL";
  btnExplore.resize(165, 32);
  btnExplore.primaryAxisSizingMode = "FIXED";
  btnExplore.counterAxisSizingMode = "FIXED";
  btnExplore.cornerRadius = 6;
  btnExplore.primaryAxisAlignItems = "CENTER";
  btnExplore.counterAxisAlignItems = "CENTER";
  btnExplore.fills = solid(C.glassElevated, 1);
  btnExplore.strokes = solid(C.glassBorder, 0.8);
  btnExplore.strokeWeight = 1;
  btnExplore.appendChild(createText("Explore Console ↘", 9, "Bold", C.textZinc300));
  ctaRow.appendChild(btnExplore);
  heroCard.appendChild(ctaRow);

  // Social Proof Avatar Stack
  heroCard.appendChild(createAvatarStack(4, "Join 12,400+ vocalists worldwide"));

  content.appendChild(heroCard);

  // --- Live Pitch Visualizer Demo Card ---
  const demoCard = makeMobileCard("Live Visualizer Demo", 9, 5);
  const dcHead = createFullRow(339, 6);
  dcHead.appendChild(createText("BIO-ACOUSTIC PITCH CONTOUR", 8, "Bold", C.textZinc400));
  dcHead.appendChild(makePill("IN-TUNE G4", C.mint, C.forestBase, C.mint, 7));
  demoCard.appendChild(dcHead);

  const waveBox = figma.createFrame();
  waveBox.resize(339, 36);
  waveBox.cornerRadius = 6;
  waveBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  waveBox.strokes = solid(C.glassBorder, 0.7);
  waveBox.strokeWeight = 1;

  const waveVec = figma.createVector();
  waveVec.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 28 C 30 14 50 14 80 26 C 110 38 140 38 170 20 C 200 6 220 6 250 20 C 280 34 310 26 337 18"
  }];
  waveVec.resize(339, 26);
  waveVec.strokes = solid(C.mint, 1);
  waveVec.strokeWeight = 1.8;
  waveVec.x = 0; waveVec.y = 4;
  waveBox.appendChild(waveVec);
  demoCard.appendChild(waveBox);
  content.appendChild(demoCard);

  // --- Bento Feature Cards (2 Cards matching Desktop 01) ---
  function makeBentoCard(iconName, title, desc) {
    const card = makeMobileCard("Feature/" + title, 8, 3);
    const row = createAutoRow(8);

    const ic = figma.createFrame();
    ic.layoutMode = "HORIZONTAL";
    ic.primaryAxisSizingMode = "FIXED";
    ic.counterAxisSizingMode = "FIXED";
    ic.resize(22, 22);
    ic.cornerRadius = 5;
    ic.fills = solid(C.forestBase, 1);
    ic.strokes = solid(C.mint, 0.5);
    ic.strokeWeight = 1;
    ic.primaryAxisAlignItems = "CENTER";
    ic.counterAxisAlignItems = "CENTER";
    ic.paddingLeft = 0;
    ic.paddingRight = 0;
    ic.paddingTop = 0;
    ic.paddingBottom = 0;
    ic.appendChild(createSvgIcon(iconName, "#00F5A0", 11));
    row.appendChild(ic);

    const txt = createAutoCol(1);
    txt.counterAxisSizingMode = "FIXED";
    txt.resize(295, 24);
    txt.appendChild(createText(title, 9, "Bold", C.textWhite));
    txt.appendChild(createText(desc, 7, "Regular", C.textZinc400));
    row.appendChild(txt);
    card.appendChild(row);
    return card;
  }

  content.appendChild(makeBentoCard("zap", "Sub-Millisecond Pitch Tracking", "2.7 ms latency YIN algorithm for zero-lag detection."));
  content.appendChild(makeBentoCard("waveform", "16-Bar Harmonic Piano Roll", "Automatic singing transcript with live intonation heatmap."));

  // --- Vocal Range Calibration Chips (SATB) ---
  const satbCard = makeMobileCard("Vocal Range Calibration", 9, 4);
  const scHead = createFullRow(339, 6);
  scHead.appendChild(createText("VOCAL RANGE CALIBRATION", 8, "Bold", C.textZinc400));
  scHead.appendChild(makePill("5 VOICE TYPES", C.mint, C.forestBase, C.mint, 7));
  satbCard.appendChild(scHead);

  const satbRow = createFullRow(339, 4);
  const types = [
    { name: "Bass", range: "E2-E4", active: false },
    { name: "Baritone", range: "A2-F4", active: false },
    { name: "Tenor", range: "C3-A4", active: true },
    { name: "Mezzo", range: "A3-F#5", active: false },
    { name: "Soprano", range: "C4-A5", active: false }
  ];
  types.forEach(t => {
    const b = figma.createFrame();
    b.layoutMode = "VERTICAL";
    b.resize(63, 32);
    b.primaryAxisSizingMode = "FIXED";
    b.counterAxisSizingMode = "FIXED";
    b.paddingTop = 2; b.paddingBottom = 2;
    b.cornerRadius = 5;
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    b.fills = solid(t.active ? C.forestBase : C.glassElevated, 1);
    b.strokes = solid(t.active ? C.mint : C.glassBorder, t.active ? 1 : 0.6);
    b.strokeWeight = 1;
    b.appendChild(createText(t.name, 8, t.active ? "Bold" : "Medium", t.active ? C.mint : C.textWhite));
    b.appendChild(createText(t.range, 7, "Regular", C.textZinc400));
    satbRow.appendChild(b);
  });
  satbCard.appendChild(satbRow);
  content.appendChild(satbCard);

  content.appendChild(createText("VocalSense AI • Responsive Web Edition • London • Tokyo • Jakarta", 8, "Regular", C.textZinc600));

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileWelcomeScreen };
