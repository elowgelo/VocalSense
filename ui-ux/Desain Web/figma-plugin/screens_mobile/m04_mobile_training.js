// =============================================================================
// VOCALSENSE AI — M04. MOBILE VOCALIST TRAINING CENTER (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Training Screen 04
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createMobileWebHeader,
  createMobileBottomNav,
  createCircularAvatar,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

function buildMobileTrainingScreen() {
  const root = createMobileScreen("VocalSense AI — M04. Mobile Training Center", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/training", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Training Center", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Training Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Vocalist Header Card ---
  const userCard = makeMobileCard("Vocalist Header Card", 10, 5);
  const ucRow = createFullRow(341, 8);
  const ucL = createAutoRow(10);

  // Centered circular avatar
  const av = createCircularAvatar(40, "ER", C.mint, C.forestBase, 14);
  ucL.appendChild(av);

  const uTxt = createAutoCol(2);
  uTxt.counterAxisSizingMode = "FIXED";
  uTxt.resize(190, 34);
  uTxt.appendChild(createText("Ethan Reynolds", 12, "Bold", C.textWhite));
  uTxt.appendChild(createText("Classical Tenor • Daily Goal: 20 Mins", 8, "Regular", C.textZinc400));
  ucL.appendChild(uTxt);
  ucRow.appendChild(ucL);

  ucRow.appendChild(makePill("WEEK 4 OF 12", C.mint, C.forestBase, C.mint, 7));
  userCard.appendChild(ucRow);
  content.appendChild(userCard);

  // --- Consistency Streak Tracker Card: 14-Day Streak (Calendar Mon-Sun) ---
  const streakCard = makeMobileCard("Consistency Streak Card", 9, 5);
  const stHead = createFullRow(341, 6);
  stHead.appendChild(createText("CONSISTENCY TRACKER", 8, "Bold", C.textZinc400));
  stHead.appendChild(createText("14-Day Streak Active", 8, "Bold", C.mint));
  streakCard.appendChild(stHead);

  const calRow = createFullRow(341, 4);
  const week = [
    { day: "Mon", done: true },
    { day: "Tue", done: true },
    { day: "Wed", done: true },
    { day: "Thu", done: true },
    { day: "Fri", done: true },
    { day: "Sat", done: true },
    { day: "Sun", today: true }
  ];
  week.forEach(w => {
    const dBox = figma.createFrame();
    dBox.layoutMode = "VERTICAL";
    dBox.resize(44, 36);
    dBox.primaryAxisSizingMode = "FIXED";
    dBox.counterAxisSizingMode = "FIXED";
    dBox.paddingTop = 3;
    dBox.paddingBottom = 3;
    dBox.counterAxisAlignItems = "CENTER";
    dBox.primaryAxisAlignItems = "CENTER";
    dBox.itemSpacing = 2;
    dBox.cornerRadius = 5;
    const isToday = w.today;
    dBox.fills = solid(isToday ? C.forestBase : C.glassElevated, 1);
    dBox.strokes = solid(isToday ? C.mint : C.glassBorder, isToday ? 1 : 0.6);
    dBox.strokeWeight = 1;
    dBox.appendChild(createText(w.day, 7, "Medium", isToday ? C.mint : C.textZinc400));
    dBox.appendChild(createSvgIcon("check", isToday ? "#00F5A0" : "#10B981", 10));
    calRow.appendChild(dBox);
  });
  streakCard.appendChild(calRow);
  content.appendChild(streakCard);

  // --- Daily Prescribed Drills Card (3 Drills) ---
  const drillCard = makeMobileCard("Daily Prescribed Drills", 9, 5);
  const drHead = createFullRow(341, 6);
  drHead.appendChild(createText("TODAY'S VOCAL DRILLS", 8, "Bold", C.textZinc400));
  drHead.appendChild(createText("3 Modules (23 Mins)", 8, "Bold", C.mint));
  drillCard.appendChild(drHead);

  function makeDrillItem(title, dur, level, isHot) {
    const item = createFullRow(341, 6);
    item.paddingTop = 2; item.paddingBottom = 2;
    const itL = createAutoRow(7);

    const ic = figma.createFrame();
    ic.layoutMode = "HORIZONTAL";
    ic.primaryAxisSizingMode = "FIXED";
    ic.counterAxisSizingMode = "FIXED";
    ic.resize(22, 22);
    ic.cornerRadius = 5;
    ic.fills = solid(isHot ? C.forestBase : C.glassElevated, 1);
    ic.strokes = solid(isHot ? C.mint : C.glassBorder, isHot ? 1 : 0.6);
    ic.strokeWeight = 1;
    ic.primaryAxisAlignItems = "CENTER";
    ic.counterAxisAlignItems = "CENTER";
    ic.paddingLeft = 0;
    ic.paddingRight = 0;
    ic.paddingTop = 0;
    ic.paddingBottom = 0;
    ic.appendChild(createSvgIcon("zap", isHot ? "#00F5A0" : "#8B9DAF", 11));
    itL.appendChild(ic);

    const itTxt = createAutoCol(1);
    itTxt.counterAxisSizingMode = "FIXED";
    itTxt.resize(220, 24);
    itTxt.appendChild(createText(title, 8.5, "Bold", C.textWhite));
    itTxt.appendChild(createText(dur + " • " + level, 7, "Regular", C.textZinc400));
    itL.appendChild(itTxt);
    item.appendChild(itL);

    const btn = figma.createFrame();
    btn.layoutMode = "HORIZONTAL";
    btn.primaryAxisSizingMode = "AUTO";
    btn.counterAxisSizingMode = "AUTO";
    btn.paddingLeft = 8;
    btn.paddingRight = 8;
    btn.paddingTop = 3;
    btn.paddingBottom = 3;
    btn.cornerRadius = 4;
    btn.fills = solid(isHot ? C.mint : C.glassElevated, 1);
    btn.appendChild(createText(isHot ? "Start" : "Play", 8, "Bold", isHot ? { r: 0.02, g: 0.12, b: 0.08 } : C.textWhite));
    item.appendChild(btn);
    return item;
  }

  drillCard.appendChild(makeDrillItem("Pitch Agility & Solfeggio Arpeggios", "10 min", "Advanced", true));
  drillCard.appendChild(makeDrillItem("Octave Glide & Mix-Voice Transition", "8 min", "Intermediate", false));
  drillCard.appendChild(makeDrillItem("Vocal Cord Compression & Resonance", "5 min", "Foundation", false));
  content.appendChild(drillCard);

  // --- Agility Benchmark Card ---
  const benchCard = makeMobileCard("Agility Benchmark", 9, 4);
  const bcHead = createFullRow(341, 6);
  bcHead.appendChild(createText("AGILITY BENCHMARK", 8, "Bold", C.textZinc400));
  bcHead.appendChild(makePill("+14.8% IMPROVED", C.mint, C.forestBase, C.mint, 7));
  benchCard.appendChild(bcHead);

  benchCard.appendChild(createText("Interval Latency: 180ms → 112ms", 9.5, "Bold", C.textWhite));
  benchCard.appendChild(createParagraph("Your vocal agility between C4 and G4 has improved by 68 milliseconds compared to Week 1 baseline.", 341, 7.5, "Regular", C.textZinc400, 11));

  const btnWorkout = figma.createFrame();
  btnWorkout.name = "Btn/Start Workout";
  btnWorkout.layoutMode = "HORIZONTAL";
  btnWorkout.resize(341, 28);
  btnWorkout.primaryAxisSizingMode = "FIXED";
  btnWorkout.counterAxisSizingMode = "FIXED";
  btnWorkout.cornerRadius = 6;
  btnWorkout.fills = solid(C.forestBase, 1);
  btnWorkout.strokes = solid(C.mint, 0.9);
  btnWorkout.strokeWeight = 1;
  btnWorkout.primaryAxisAlignItems = "CENTER";
  btnWorkout.counterAxisAlignItems = "CENTER";
  btnWorkout.appendChild(createText("Start Today's 15-Min Workout ↗", 9, "Bold", C.mint));
  benchCard.appendChild(btnWorkout);
  content.appendChild(benchCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("training");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileTrainingScreen };
