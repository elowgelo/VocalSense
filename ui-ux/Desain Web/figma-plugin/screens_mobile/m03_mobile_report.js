// =============================================================================
// VOCALSENSE AI — M03. MOBILE DIAGNOSTIC SINGING REPORT & PIANO ROLL (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Report Screen 03
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createMobileWebHeader,
  createMobileBottomNav,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

function buildMobileReportScreen() {
  const root = createMobileScreen("VocalSense AI — M03. Mobile Singing Report & Piano Roll", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/report/take-04", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Singing Report", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Report Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Score Hero Banner Card ---
  const scoreCard = makeMobileCard("Score Card", 10, 5);
  const scTop = createFullRow(341, 8);

  // Mathematically Centered 56x56 Score Ring
  const ring = figma.createFrame();
  ring.name = "Score Ring Frame";
  ring.layoutMode = "VERTICAL";
  ring.primaryAxisSizingMode = "FIXED";
  ring.counterAxisSizingMode = "FIXED";
  ring.resize(56, 56);
  ring.cornerRadius = 28;
  ring.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.28, b: 0.18, a: 1 } },
      { position: 1.0, color: { r: 0.04, g: 0.10, b: 0.14, a: 1 } }
    ]
  }];
  ring.strokes = solid(C.mint, 1);
  ring.strokeWeight = 2;
  ring.primaryAxisAlignItems = "CENTER";
  ring.counterAxisAlignItems = "CENTER";
  ring.itemSpacing = 0;
  ring.paddingLeft = 0;
  ring.paddingRight = 0;
  ring.paddingTop = 0;
  ring.paddingBottom = 0;

  const scoreNum = createText("96", 18, "Bold", C.mint);
  scoreNum.textAlignHorizontal = "CENTER";
  scoreNum.textAlignVertical = "CENTER";
  ring.appendChild(scoreNum);

  const scoreLbl = createText("SCORE", 7, "Bold", C.mint);
  scoreLbl.textAlignHorizontal = "CENTER";
  scoreLbl.textAlignVertical = "CENTER";
  ring.appendChild(scoreLbl);
  scTop.appendChild(ring);

  const scoreTxt = createAutoCol(2);
  scoreTxt.counterAxisSizingMode = "FIXED";
  scoreTxt.resize(270, 46);

  const badgeRow = createAutoRow(6);
  badgeRow.appendChild(makePill("CONSERVATORY VIRTUOSO", C.mint, C.forestBase, C.mint, 7));
  badgeRow.appendChild(createText("Top 2% Globally", 8, "Regular", C.textZinc400));
  scoreTxt.appendChild(badgeRow);

  scoreTxt.appendChild(createText("S-Tier Intonation & Resonance", 11, "Bold", C.textWhite));
  scoreTxt.appendChild(createText("96% note accuracy with uniform 5.8Hz vibrato.", 8, "Regular", C.textZinc400));
  scTop.appendChild(scoreTxt);
  scoreCard.appendChild(scTop);

  // 3-Pill Metric Bento Row
  const mcRow = createFullRow(341, 4);
  function makeMetricPill(label, val, status) {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL";
    p.resize(109, 34);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.paddingLeft = 6;
    p.paddingRight = 6;
    p.paddingTop = 2;
    p.paddingBottom = 2;
    p.cornerRadius = 5;
    p.fills = solid(C.forestBase, 0.8);
    p.strokes = solid(C.mint, 0.5);
    p.strokeWeight = 1;
    p.itemSpacing = 1;
    p.appendChild(createText(label, 7, "Bold", C.textZinc400));
    p.appendChild(createText(val, 10, "Bold", C.mint));
    p.appendChild(createText(status, 7, "Medium", C.emerald));
    return p;
  }
  mcRow.appendChild(makeMetricPill("PITCH PRECISION", "96%", "±2 cents stable"));
  mcRow.appendChild(makeMetricPill("VIBRATO RATE", "5.8 Hz", "Ideal Oscillation"));
  mcRow.appendChild(makeMetricPill("FORMANT Q", "4.2", "Warm Pharyngeal"));
  scoreCard.appendChild(mcRow);
  content.appendChild(scoreCard);

  // --- 16-Bar Piano Roll Synchronization Card ---
  const rollCard = makeMobileCard("Piano Roll Card", 9, 5);
  const rcHead = createFullRow(341, 6);
  rcHead.appendChild(createText("PIANO ROLL SYNCHRONIZATION", 8, "Bold", C.textZinc400));
  rcHead.appendChild(makePill("BARS 1–16", C.mint, C.forestBase, C.mint, 7));
  rollCard.appendChild(rcHead);

  // Grid Canvas with Notes
  const gridBox = figma.createFrame();
  gridBox.resize(341, 56);
  gridBox.cornerRadius = 6;
  gridBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  gridBox.strokes = solid(C.glassBorder, 0.7);
  gridBox.strokeWeight = 1;
  gridBox.clipsContent = true;

  // Horizontal pitch guidelines
  for (let y = 14; y < 56; y += 14) {
    const line = figma.createLine();
    line.resize(341, 0); line.x = 0; line.y = y;
    line.strokes = solid(C.glassBorder, 0.35);
    gridBox.appendChild(line);
  }

  // Note Blocks (Bohemian Rhapsody motif)
  function makeNote(pitch, x, y, w, color = C.mint) {
    const note = figma.createFrame();
    note.resize(w, 11); note.x = x; note.y = y;
    note.cornerRadius = 3;
    note.fills = solid(color, 1);
    note.layoutMode = "HORIZONTAL";
    note.primaryAxisAlignItems = "CENTER";
    note.counterAxisAlignItems = "CENTER";
    note.appendChild(createText(pitch, 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
    return note;
  }

  gridBox.appendChild(makeNote("F4", 10, 36, 32));
  gridBox.appendChild(makeNote("G4", 48, 24, 38));
  gridBox.appendChild(makeNote("Bb4", 92, 10, 46));
  gridBox.appendChild(makeNote("G4", 144, 24, 34));
  gridBox.appendChild(makeNote("F4", 184, 36, 42));
  gridBox.appendChild(makeNote("Bb4", 232, 10, 38));
  gridBox.appendChild(makeNote("G4", 276, 24, 34));
  rollCard.appendChild(gridBox);
  content.appendChild(rollCard);

  // --- Gemini AI Prescription Card ---
  const aiCard = makeMobileCard("AI Prescription Card", 9, 4);
  const acHead = createFullRow(341, 6);
  const acL = createAutoRow(5);
  acL.appendChild(createSvgIcon("sparkle", "#00F5A0", 11));
  acL.appendChild(createText("GEMINI AI VOICE PRESCRIPTION", 8, "Bold", C.mint));
  acHead.appendChild(acL);
  acHead.appendChild(makePill("CLINICAL ANALYSIS", C.mint, C.forestBase, C.mint, 7));
  aiCard.appendChild(acHead);

  aiCard.appendChild(createText("Smooth Transition across Passaggio (F#4–G4)", 9.5, "Bold", C.textWhite));
  aiCard.appendChild(createParagraph("Your intonation was pristine across bars 1–10. On bar 12, subglottic pressure dropped by 8% during sustained vowel /i/, causing a slight pitch flutter.", 341, 7.5, "Regular", C.textZinc400, 11));
  content.appendChild(aiCard);

  // --- Audio Player Scrub Bar ---
  const playerCard = makeMobileCard("Audio Player Scrub Card", 8, 4);
  const plyRow = createFullRow(341, 8);
  const btnPlay = createCenteredIconButton("mic", "#00F5A0", 24, 12, 12, C.forestBase, C.mint);
  plyRow.appendChild(btnPlay);

  const barTrack = figma.createFrame();
  barTrack.resize(250, 4);
  barTrack.cornerRadius = 2;
  barTrack.fills = solid({ r: 0.12, g: 0.16, b: 0.22 }, 1);
  const barProg = figma.createFrame();
  barProg.resize(150, 4);
  barProg.cornerRadius = 2;
  barProg.fills = solid(C.mint, 1);
  barTrack.appendChild(barProg);
  plyRow.appendChild(barTrack);

  plyRow.appendChild(createText("02:18", 8, "Bold", C.textZinc300));
  playerCard.appendChild(plyRow);
  content.appendChild(playerCard);

  // Dual Action Buttons (Export PDF & Retake)
  const ctaRow = createFullRow(361, 8);
  const btnPdf = figma.createFrame();
  btnPdf.name = "Btn/Export Conservatory PDF";
  btnPdf.layoutMode = "HORIZONTAL";
  btnPdf.resize(176, 32);
  btnPdf.primaryAxisSizingMode = "FIXED";
  btnPdf.counterAxisSizingMode = "FIXED";
  btnPdf.cornerRadius = 6;
  btnPdf.primaryAxisAlignItems = "CENTER";
  btnPdf.counterAxisAlignItems = "CENTER";
  btnPdf.fills = solid(C.forestBase, 1);
  btnPdf.strokes = solid(C.mint, 0.9);
  btnPdf.strokeWeight = 1;
  btnPdf.appendChild(createText("Export Conservatory PDF", 8.5, "Bold", C.mint));
  ctaRow.appendChild(btnPdf);

  const btnReTake = figma.createFrame();
  btnReTake.name = "Btn/Re-Take Song";
  btnReTake.layoutMode = "HORIZONTAL";
  btnReTake.resize(176, 32);
  btnReTake.primaryAxisSizingMode = "FIXED";
  btnReTake.counterAxisSizingMode = "FIXED";
  btnReTake.cornerRadius = 6;
  btnReTake.primaryAxisAlignItems = "CENTER";
  btnReTake.counterAxisAlignItems = "CENTER";
  btnReTake.fills = solid(C.glassElevated, 1);
  btnReTake.strokes = solid(C.glassBorder, 0.8);
  btnReTake.strokeWeight = 1;
  btnReTake.appendChild(createText("Re-Take Song", 8.5, "Bold", C.textZinc300));
  ctaRow.appendChild(btnReTake);
  content.appendChild(ctaRow);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("reports");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileReportScreen };
