// =============================================================================
// VOCALSENSE AI — M05B. MOBILE ONBOARDING & VOCAL CALIBRATION WIZARD (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 05B
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createMobileWebHeader,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

function buildMobileOnboardingScreen() {
  const root = createMobileScreen("VocalSense AI — M05B. Mobile Onboarding Wizard", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/onboarding", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header
  const header = createMobileWebHeader("Onboarding Wizard", "Auth", false);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Onboarding Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Step Indicator Header ---
  const stepRow = createFullRow(361, 4);
  function makeStepPill(num, lbl, active, done) {
    const p = figma.createFrame();
    p.layoutMode = "HORIZONTAL";
    p.resize(117, 26);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.primaryAxisAlignItems = "CENTER";
    p.counterAxisAlignItems = "CENTER";
    p.cornerRadius = 5;
    p.fills = solid(active ? C.forestBase : C.glassElevated, 1);
    p.strokes = solid(active ? C.mint : (done ? C.emerald : C.glassBorder), active || done ? 1 : 0.6);
    p.strokeWeight = 1;
    p.appendChild(createText(num + ". " + lbl, 7.5, active ? "Bold" : "Medium", active ? C.mint : (done ? C.emerald : C.textZinc400)));
    return p;
  }
  stepRow.appendChild(makeStepPill("1", "Mic Check", false, true));
  stepRow.appendChild(makeStepPill("2", "Vocal Range", true, false));
  stepRow.appendChild(makeStepPill("3", "Choose Goal", false, false));
  content.appendChild(stepRow);

  // --- Mic Status Card ---
  const micCard = makeMobileCard("Mic Status Card", 9, 4);
  const mcRow = createFullRow(341, 6);
  const mcL = createAutoRow(6);
  mcL.appendChild(createSvgIcon("mic", "#00F5A0", 12));
  mcL.appendChild(createText("Smartphone / Studio Mic Calibrated", 8.5, "Bold", C.textWhite));
  mcRow.appendChild(mcL);
  mcRow.appendChild(makePill("48 kHz • 2.7ms", C.mint, C.forestBase, C.mint, 7));
  micCard.appendChild(mcRow);
  content.appendChild(micCard);

  // --- Vocal Classification Selector Card ---
  const classCard = makeMobileCard("Vocal Classification Card", 9, 5);
  const ccHead = createFullRow(341, 6);
  ccHead.appendChild(createText("SELECT YOUR VOCAL CLASSIFICATION", 8, "Bold", C.textZinc400));
  ccHead.appendChild(createText("Detected: F3 (174.8 Hz)", 8, "Bold", C.mint));
  classCard.appendChild(ccHead);

  classCard.appendChild(createParagraph("Hum your comfortable lowest and highest pitch into your mic. We detected Tenor range characteristics.", 341, 7.5, "Regular", C.textZinc400, 11));

  function makeVoiceOption(name, range, desc, selected) {
    const opt = figma.createFrame();
    opt.layoutMode = "HORIZONTAL";
    opt.resize(341, 34);
    opt.primaryAxisSizingMode = "FIXED";
    opt.counterAxisSizingMode = "FIXED";
    opt.paddingLeft = 8;
    opt.paddingRight = 8;
    opt.primaryAxisAlignItems = "SPACE_BETWEEN";
    opt.counterAxisAlignItems = "CENTER";
    opt.cornerRadius = 6;
    opt.fills = solid(selected ? C.forestBase : C.glassElevated, 1);
    opt.strokes = solid(selected ? C.mint : C.glassBorder, selected ? 1 : 0.6);
    opt.strokeWeight = 1;

    const opL = createAutoCol(1);
    opL.counterAxisSizingMode = "FIXED";
    opL.resize(280, 24);
    opL.appendChild(createText(name + " (" + range + ")", 8.5, selected ? "Bold" : "Medium", selected ? C.mint : C.textWhite));
    opL.appendChild(createText(desc, 7, "Regular", C.textZinc400));
    opL.paddingLeft = 0;
    opL.paddingRight = 0;
    opL.paddingTop = 0;
    opL.paddingBottom = 0;
    opt.appendChild(opL);

    const rad = figma.createFrame();
    rad.resize(12, 12);
    rad.cornerRadius = 6;
    rad.fills = solid(selected ? C.mint : { r: 0.12, g: 0.16, b: 0.22 }, 1);
    rad.strokes = solid(selected ? C.mint : C.glassBorder, 1);
    rad.strokeWeight = 1;
    opt.appendChild(rad);
    return opt;
  }

  classCard.appendChild(makeVoiceOption("Tenor", "C3–A4", "High male vocal range with mix passaggio • Recommended", true));
  classCard.appendChild(makeVoiceOption("Baritone", "A2–F4", "Medium men's timbre with solid voice timbre", false));
  classCard.appendChild(makeVoiceOption("Bass", "E2–E4", "Deep resonance chest voice foundation", false));
  content.appendChild(classCard);

  // --- Goal Card ---
  const goalCard = makeMobileCard("Goal Card", 9, 4);
  const gcHead = createFullRow(341, 6);
  gcHead.appendChild(createText("CHOSEN SYLLABUS GOAL", 8, "Bold", C.textZinc400));
  gcHead.appendChild(makePill("CONSERVATORY", C.mint, C.forestBase, C.mint, 7));
  goalCard.appendChild(gcHead);
  goalCard.appendChild(createText("Mixed Voice Agility & Passaggio Intonation Stability", 9.5, "Bold", C.textWhite));
  content.appendChild(goalCard);

  // --- Real-time Pitch Test Strip ---
  const testCard = makeMobileCard("Live Calibration Strip", 9, 4);
  const tcHead = createFullRow(341, 6);
  tcHead.appendChild(createText("LIVE SPECTROGRAM SAMPLING", 8, "Bold", C.textZinc400));
  tcHead.appendChild(createText("DSP ACTIVE", 8, "Bold", C.mint));
  testCard.appendChild(tcHead);

  const specBar = figma.createFrame();
  specBar.resize(341, 18);
  specBar.cornerRadius = 4;
  specBar.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  specBar.strokes = solid(C.glassBorder, 0.7);
  specBar.strokeWeight = 1;

  const miniWave = figma.createVector();
  miniWave.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 10 C 60 4 120 16 180 10 C 240 4 300 16 341 10"
  }];
  miniWave.resize(341, 12);
  miniWave.strokes = solid(C.mint, 1);
  miniWave.strokeWeight = 1.5;
  miniWave.x = 0; miniWave.y = 3;
  specBar.appendChild(miniWave);
  testCard.appendChild(specBar);
  content.appendChild(testCard);

  // Primary Action CTA
  const btnEnter = figma.createFrame();
  btnEnter.name = "Btn/Complete Calibration";
  btnEnter.layoutMode = "HORIZONTAL";
  btnEnter.resize(361, 34);
  btnEnter.primaryAxisSizingMode = "FIXED";
  btnEnter.counterAxisSizingMode = "FIXED";
  btnEnter.cornerRadius = 6;
  btnEnter.primaryAxisAlignItems = "CENTER";
  btnEnter.counterAxisAlignItems = "CENTER";
  btnEnter.fills = solid(C.mint, 1);
  btnEnter.appendChild(createText("Complete Calibration & Enter Studio ↗", 9.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  content.appendChild(btnEnter);

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileOnboardingScreen };
