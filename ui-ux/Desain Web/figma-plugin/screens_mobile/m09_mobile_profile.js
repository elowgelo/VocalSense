// =============================================================================
// VOCALSENSE AI — M09. MOBILE VOCALIST PERSONAL PROFILE (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 09
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Circular Avatar, Zero Overlap)
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

function buildMobileProfileScreen() {
  const root = createMobileScreen("VocalSense AI — M09. Mobile Vocalist Profile", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/profile/ethan-reynolds", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Vocalist Profile", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Profile Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Hero Card (Matching Desktop 09 Profile Banner) ---
  const heroCard = makeMobileCard("Vocalist Profile Hero", 10, 6);
  heroCard.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.20, b: 0.14, a: 0.95 } },
      { position: 1.0, color: { r: 0.05, g: 0.09, b: 0.14, a: 0.90 } }
    ]
  }];
  heroCard.strokes = solid(C.mint, 0.45);

  const heroTop = createFullRow(341, 8);
  const avGroup = createAutoRow(10);

  // Mathematically perfect circular avatar (50x50, perfectly centered)
  const av = createCircularAvatar(50, "ER", C.mint, C.forestBase, 17);
  avGroup.appendChild(av);

  const idCol = createAutoCol(2);
  idCol.counterAxisSizingMode = "FIXED";
  idCol.resize(175, 46);

  const preRow = createAutoRow(5);
  preRow.appendChild(createText("PERSONAL PROFILE", 7, "Bold", C.mint));
  preRow.appendChild(makePill("VERIFIED", C.mint, C.forestBase, C.mint, 6.5));
  idCol.appendChild(preRow);

  idCol.appendChild(createText("Ethan Reynolds", 13, "Bold", C.textWhite));
  idCol.appendChild(createText("Tenor • Royal Conservatory London", 7.5, "Medium", C.textZinc300));
  avGroup.appendChild(idCol);
  heroTop.appendChild(avGroup);

  // Edit Profile Action
  const btnEdit = figma.createFrame();
  btnEdit.name = "Btn/Edit Profile";
  btnEdit.layoutMode = "HORIZONTAL";
  btnEdit.primaryAxisSizingMode = "AUTO";
  btnEdit.counterAxisSizingMode = "AUTO";
  btnEdit.paddingLeft = 8;
  btnEdit.paddingRight = 8;
  btnEdit.paddingTop = 4;
  btnEdit.paddingBottom = 4;
  btnEdit.cornerRadius = 5;
  btnEdit.fills = solid(C.forestBase, 1);
  btnEdit.strokes = solid(C.mint, 0.8);
  btnEdit.strokeWeight = 1;
  btnEdit.primaryAxisAlignItems = "CENTER";
  btnEdit.counterAxisAlignItems = "CENTER";
  btnEdit.appendChild(createText("Edit Profile", 8.5, "Bold", C.mint));
  heroTop.appendChild(btnEdit);
  heroCard.appendChild(heroTop);

  heroCard.appendChild(createParagraph("Classical crossover tenor exploring vocal biomechanics, passaggio stabilization, and microtonal intonation precision with VocalSense AI.", 341, 7.5, "Regular", C.textZinc300, 11));
  content.appendChild(heroCard);

  // --- 4 KPI Stats Row ---
  const statsRow = createFullRow(361, 5);
  function makeStatPill(val, lbl) {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL";
    p.resize(86, 36);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.paddingTop = 3;
    p.paddingBottom = 3;
    p.counterAxisAlignItems = "CENTER";
    p.primaryAxisAlignItems = "CENTER";
    p.itemSpacing = 1;
    p.cornerRadius = 6;
    p.fills = solid(C.glassElevated, 1);
    p.strokes = solid(C.glassBorder, 0.7);
    p.strokeWeight = 1;
    p.appendChild(createText(val, 11, "Bold", C.mint));
    p.appendChild(createText(lbl, 7, "Regular", C.textZinc400));
    return p;
  }
  statsRow.appendChild(makeStatPill("348", "Takes"));
  statsRow.appendChild(makeStatPill("C3–G5", "Span"));
  statsRow.appendChild(makeStatPill("94.2%", "Accuracy"));
  statsRow.appendChild(makeStatPill("14 Days", "Streak"));
  content.appendChild(statsRow);

  // --- Vocal Practice Activity Card (Contribution Heatmap) ---
  const actCard = makeMobileCard("Vocal Activity Heatmap", 9, 4);
  const actHead = createFullRow(341, 6);
  actHead.appendChild(createText("VOCAL PRACTICE ACTIVITY", 8, "Bold", C.textZinc400));
  actHead.appendChild(createText("284 Hours Sung", 8, "Bold", C.mint));
  actCard.appendChild(actHead);

  const matFrame = figma.createFrame();
  matFrame.name = "Contribution Matrix";
  matFrame.layoutMode = "VERTICAL";
  matFrame.resize(341, 38);
  matFrame.itemSpacing = 3;
  matFrame.fills = [];

  const alphaLevels = [
    [0.1, 0.3, 0.8, 1.0, 0.3, 0.6, 0.9, 0.2, 0.5, 0.8, 1.0, 0.4, 0.9],
    [0.3, 0.7, 0.9, 1.0, 0.4, 0.8, 1.0, 0.3, 0.7, 0.9, 0.8, 0.6, 1.0],
    [0.1, 0.2, 0.1, 0.6, 0.9, 0.2, 0.5, 0.8, 0.3, 0.6, 0.5, 0.7, 0.9],
    [0.7, 1.0, 0.4, 0.8, 0.5, 1.0, 1.0, 0.4, 0.9, 0.7, 1.0, 1.0, 0.6]
  ];

  for (const rowArr of alphaLevels) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.resize(341, 7);
    row.itemSpacing = 3;
    row.fills = [];
    for (const a of rowArr) {
      const cell = figma.createFrame();
      cell.resize(23, 7);
      cell.cornerRadius = 2;
      cell.fills = solid(C.mint, a);
      row.appendChild(cell);
    }
    matFrame.appendChild(row);
  }
  actCard.appendChild(matFrame);
  content.appendChild(actCard);

  // --- Acoustic Register Span Bar Card ---
  const spanCard = makeMobileCard("Acoustic Register Span", 9, 4);
  const spHead = createFullRow(341, 6);
  spHead.appendChild(createText("ACOUSTIC REGISTER SPAN", 8, "Bold", C.textZinc400));
  spHead.appendChild(createText("2.6 Octaves (C3–G5)", 8, "Bold", C.mint));
  spanCard.appendChild(spHead);

  const spanTrack = figma.createFrame();
  spanTrack.resize(341, 16);
  spanTrack.cornerRadius = 4;
  spanTrack.clipsContent = true;
  spanTrack.layoutMode = "HORIZONTAL";

  const blk1 = figma.createFrame(); blk1.resize(110, 16); blk1.fills = solid({ r: 0.10, g: 0.72, b: 0.51 }, 1);
  blk1.layoutMode = "HORIZONTAL"; blk1.counterAxisAlignItems = "CENTER"; blk1.paddingLeft = 4;
  blk1.appendChild(createText("Chest: C3–F4", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk1);

  const blk2 = figma.createFrame(); blk2.resize(125, 16); blk2.fills = solid(C.mint, 1);
  blk2.layoutMode = "HORIZONTAL"; blk2.counterAxisAlignItems = "CENTER"; blk2.paddingLeft = 4;
  blk2.appendChild(createText("Mix: F#4–B4", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk2);

  const blk3 = figma.createFrame(); blk3.resize(106, 16); blk3.fills = solid({ r: 0.23, g: 0.71, b: 0.96 }, 1);
  blk3.layoutMode = "HORIZONTAL"; blk3.counterAxisAlignItems = "CENTER"; blk3.paddingLeft = 4;
  blk3.appendChild(createText("Head: C5–G5", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk3);

  spanCard.appendChild(spanTrack);
  content.appendChild(spanCard);

  // --- Top Singing Takes Card ---
  const takesCard = makeMobileCard("Top Recorded Takes", 9, 3);
  const tkHead = createFullRow(341, 6);
  tkHead.appendChild(createText("TOP SINGING TAKES", 8, "Bold", C.textZinc400));
  tkHead.appendChild(createText("348 Takes", 8, "Bold", C.mint));
  takesCard.appendChild(tkHead);

  function makeTakeRow(num, title, meta, score) {
    const row = createFullRow(341, 6);
    row.paddingTop = 1; row.paddingBottom = 1;
    const rL = createAutoRow(6);
    rL.appendChild(createText(num, 8, "Bold", C.textZinc500));

    const tTxt = createAutoCol(1);
    tTxt.counterAxisSizingMode = "FIXED";
    tTxt.resize(230, 20);
    tTxt.appendChild(createText(title, 8, "Bold", C.textWhite));
    tTxt.appendChild(createText(meta, 7, "Regular", C.textZinc400));
    rL.appendChild(tTxt);
    row.appendChild(rL);

    row.appendChild(makePill(score, C.mint, C.forestBase, C.mint, 7));
    return row;
  }

  takesCard.appendChild(makeTakeRow("1", "Bohemian Rhapsody", "Take #04 • Queen • 3:45", "96 / 100"));
  takesCard.appendChild(makeTakeRow("2", "Nessun Dorma", "Take #02 • Puccini • 2:58", "98 / 100"));
  takesCard.appendChild(makeTakeRow("3", "Caro Mio Ben", "Take #05 • Giordani • 2:15", "92 / 100"));
  content.appendChild(takesCard);

  // --- Vocal Biometric Credentials Card (Matching Desktop 09 Milestones) ---
  const credCard = makeMobileCard("Vocal Credentials", 8, 4);
  const credHead = createFullRow(341, 6);
  credHead.appendChild(createText("CONSERVATORY VERIFIED SPECS", 7.5, "Bold", C.textZinc400));
  credHead.appendChild(createText("S-Tier", 7.5, "Bold", C.mint));
  credCard.appendChild(credHead);

  const credRow = createFullRow(341, 6);
  function makeCredChip(title, sub) {
    const chip = figma.createFrame();
    chip.layoutMode = "VERTICAL";
    chip.resize(165, 26);
    chip.primaryAxisSizingMode = "FIXED";
    chip.counterAxisSizingMode = "FIXED";
    chip.paddingLeft = 8;
    chip.paddingRight = 8;
    chip.primaryAxisAlignItems = "CENTER";
    chip.counterAxisAlignItems = "MIN";
    chip.cornerRadius = 5;
    chip.fills = solid(C.glassElevated, 1);
    chip.strokes = solid(C.glassBorder, 0.7);
    chip.strokeWeight = 1;
    chip.appendChild(createText(title, 7.5, "Bold", C.mint));
    chip.appendChild(createText(sub, 6.5, "Regular", C.textZinc400));
    return chip;
  }
  credRow.appendChild(makeCredChip("Sub-Cent Precision", "±2 Cents YIN Stability"));
  credRow.appendChild(makeCredChip("Royal Conservatory", "Virtuoso Vocal Fach"));
  credCard.appendChild(credRow);
  content.appendChild(credCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("profile");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileProfileScreen };
