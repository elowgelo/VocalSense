// =============================================================================
// VOCALSENSE AI — 08. VOCAL DIAGNOSTIC REPORTS & DOCUMENT ARCHIVE REPOSITORY
// Dedicated Document Maintenance & Certificate Archive Screen (1440 x 960 px)
// Covers:
//   - UC-14: Menyimpan Rapor Nyanyi ke Riwayat Akun Pengguna (Report Repository)
//   - UC-15: Mengekspor Lembar Rapor Evaluasi Format PDF & Sertifikat Vokal (Batch PDF)
//   - UC-16: Membandingkan Dua Sesi Rekaman Nyanyi (Side-by-Side Comparison Selector)
//
// 100% ARCHITECTURAL & UX CONSISTENCY:
//   - Left DAW Sidebar Dock (72 x 960) with Document Icon active in emerald squircle.
//   - Main Workspace Container (1368 x 960) at x=72.
//   - Complete document maintenance: Search, filter by song/drill, compare takes,
//     view verified conservatory certificates, batch export PDFs, and manage audio quota.
// =============================================================================

function buildDocumentsScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 08. Vocal Reports & Document Archive";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Dark studio gradient background
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

  // Middle: 4 Nav items (DOCUMENT ICON ACTIVE in emerald squircle!)
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
  const btnNavChart = createIconButton("bar-chart", "#8B9DAF", 42, 18, false);
  btnNavChart.name = "Nav/Analytics";
  const btnNavDoc = createIconButton("document", "#00F5A0", 42, 18, true); // Active for Document Archive!
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
  container.name = "Documents Workspace Container";
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
  // 1. TOP DOCUMENT ARCHIVE TOOLBAR (1312 x 46 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Archive TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 46);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const tbLeft = figma.createFrame();
  tbLeft.layoutMode = "HORIZONTAL";
  tbLeft.primaryAxisSizingMode = "AUTO";
  tbLeft.counterAxisSizingMode = "AUTO";
  tbLeft.itemSpacing = 12;
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
  titleCol.appendChild(createText("Vocal Diagnostic Reports & Document Archive", 15, "Bold", C.textWhite));
  titleCol.appendChild(createText("Maintenance repository of 48 singing evaluations, certified conservatory PDF sheets, and audio stems.", 11, "Regular", C.textZinc400));
  tbLeft.appendChild(titleCol);
  topBar.appendChild(tbLeft);

  const tbRight = figma.createFrame();
  tbRight.layoutMode = "HORIZONTAL";
  tbRight.primaryAxisSizingMode = "AUTO";
  tbRight.counterAxisSizingMode = "AUTO";
  tbRight.itemSpacing = 10;
  tbRight.counterAxisAlignItems = "CENTER";
  tbRight.fills = [];

  // Search input
  const searchInput = figma.createFrame();
  searchInput.name = "Search Reports Input";
  searchInput.layoutMode = "HORIZONTAL";
  searchInput.resize(220, 34);
  searchInput.paddingLeft = 10; searchInput.paddingRight = 10;
  searchInput.itemSpacing = 8;
  searchInput.counterAxisAlignItems = "CENTER";
  searchInput.cornerRadius = 8;
  searchInput.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  searchInput.strokes = solid(C.glassBorder, 0.7);
  searchInput.strokeWeight = 1;
  searchInput.appendChild(createSvgIcon("search", "#8B9DAF", 13));
  searchInput.appendChild(createText("Filter takes & songs...", 10, "Regular", C.textZinc500));
  tbRight.appendChild(searchInput);

  const btnCompare = createActionButton("Compare Takes (0/2)", "refresh", "secondary", null, "left", 34);
  btnCompare.name = "Archive/Compare Takes";
  tbRight.appendChild(btnCompare);

  const btnBatchPdf = createActionButton("Batch Export PDFs", "arrow-up-right", "radiant", null, "right", 34);
  btnBatchPdf.name = "Archive/Batch Export PDFs";
  tbRight.appendChild(btnBatchPdf);

  topBar.appendChild(tbRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. ARCHIVE TELEMETRY & MAINTENANCE STRIP (1312 x 70 px)
  // -----------------------------------------------------------------------
  const telStrip = figma.createFrame();
  telStrip.name = "Archive Telemetry Strip";
  telStrip.layoutMode = "HORIZONTAL";
  telStrip.primaryAxisSizingMode = "FIXED";
  telStrip.counterAxisSizingMode = "FIXED";
  telStrip.resize(1312, 70);
  telStrip.itemSpacing = 14;
  telStrip.fills = [];
  telStrip.clipsContent = false;

  function makeTelCard(title, val, sub, badgeTxt, badgeCol, width = 317) {
    const c = figma.createFrame();
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(width, 70);
    c.paddingLeft = 16; c.paddingRight = 16; c.paddingTop = 12; c.paddingBottom = 12;
    c.primaryAxisAlignItems = "SPACE_BETWEEN";
    c.counterAxisAlignItems = "CENTER";
    c.cornerRadius = 10;
    c.fills = solid(C.glassElevated, 0.85);
    c.strokes = solid(C.glassBorder, 0.55);
    c.strokeWeight = 1;

    const cLeft = figma.createFrame();
    cLeft.layoutMode = "VERTICAL";
    cLeft.primaryAxisSizingMode = "AUTO";
    cLeft.counterAxisSizingMode = "AUTO";
    cLeft.itemSpacing = 4;
    cLeft.counterAxisAlignItems = "MIN";
    cLeft.primaryAxisAlignItems = "CENTER";
    cLeft.fills = [];
    cLeft.appendChild(createText(title, 10, "Bold", C.textZinc400));
    
    const vRow = figma.createFrame();
    vRow.layoutMode = "HORIZONTAL";
    vRow.primaryAxisSizingMode = "AUTO";
    vRow.counterAxisSizingMode = "AUTO";
    vRow.itemSpacing = 8;
    vRow.counterAxisAlignItems = "CENTER";
    vRow.fills = [];
    vRow.appendChild(createText(val, 17, "Bold", C.textWhite));
    vRow.appendChild(createText(sub, 10, "Regular", C.textZinc500));
    cLeft.appendChild(vRow);
    c.appendChild(cLeft);

    c.appendChild(createBadge(badgeTxt, badgeCol, 9));
    return c;
  }

  telStrip.appendChild(makeTelCard("TOTAL DIAGNOSTIC TAKES", "48 Takes", "• 100% YIN DSP Analyzed", "+4 This Week", "mint"));
  telStrip.appendChild(makeTelCard("CERTIFIED CONSERVATORY SHEETS", "12 Sheets", "• Biometric Sealed", "GRADE A+", "mint"));
  telStrip.appendChild(makeTelCard("AVERAGE INTONATION LOCK", "94.2%", "• Peak: 98.0% (Take 04)", "VIRTUOSO", "mint"));
  telStrip.appendChild(makeTelCard("CLOUD AUDIO ARCHIVE STORAGE", "4.2 GB", "of 10.0 GB Limit", "42% USED", "neutral"));
  container.appendChild(telStrip);

  // -----------------------------------------------------------------------
  // 3. MAIN REPOSITORY: 2-COLUMN MANAGEMENT SUITE (1312 x 800 px)
  // -----------------------------------------------------------------------
  const gridRow = figma.createFrame();
  gridRow.name = "Repository Grid Row";
  gridRow.layoutMode = "HORIZONTAL";
  gridRow.resize(1312, 800);
  gridRow.itemSpacing = 20;
  gridRow.fills = [];
  gridRow.clipsContent = false;

  // COLUMN 1: DIAGNOSTIC REPORTS MANAGEMENT TABLE (840 x 800)
  const leftCol = figma.createFrame();
  leftCol.name = "Reports Table Column";
  leftCol.layoutMode = "VERTICAL";
  leftCol.resize(840, 800);
  leftCol.paddingLeft = 20; leftCol.paddingRight = 20; leftCol.paddingTop = 16; leftCol.paddingBottom = 16;
  leftCol.itemSpacing = 12;
  leftCol.cornerRadius = 14;
  applyCard1Glass(leftCol);

  // Filter Tabs Row
  const tabRow = figma.createFrame();
  tabRow.layoutMode = "HORIZONTAL";
  tabRow.primaryAxisSizingMode = "FIXED";
  tabRow.counterAxisSizingMode = "AUTO";
  tabRow.resize(800, 32);
  tabRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  tabRow.counterAxisAlignItems = "CENTER";
  tabRow.fills = [];

  const tabPills = figma.createFrame();
  tabPills.layoutMode = "HORIZONTAL";
  tabPills.primaryAxisSizingMode = "AUTO";
  tabPills.counterAxisSizingMode = "AUTO";
  tabPills.itemSpacing = 6;
  tabPills.counterAxisAlignItems = "CENTER";
  tabPills.fills = [];

  function makeFilterTab(label, count, active = false) {
    const t = figma.createFrame();
    t.layoutMode = "HORIZONTAL";
    t.primaryAxisSizingMode = "AUTO";
    t.counterAxisSizingMode = "AUTO";
    t.itemSpacing = 5;
    t.counterAxisAlignItems = "CENTER";
    t.paddingLeft = 10; t.paddingRight = 10; t.paddingTop = 5; t.paddingBottom = 5;
    t.cornerRadius = 6;
    t.fills = solid(active ? C.forestBase : C.glassElevated, active ? 0.95 : 0.6);
    t.strokes = solid(active ? C.mint : C.glassBorder, active ? 0.7 : 0.3);
    t.strokeWeight = 1;
    t.appendChild(createText(label, 10, active ? "Bold" : "Medium", active ? C.mint : C.textZinc300));
    t.appendChild(createBadge(String(count), active ? "mint" : "neutral", 8));
    return t;
  }
  tabPills.appendChild(makeFilterTab("All Takes", 48, true));
  tabPills.appendChild(makeFilterTab("Bohemian Rhapsody", 12));
  tabPills.appendChild(makeFilterTab("Solfeggio Drills", 18));
  tabPills.appendChild(makeFilterTab("Certified PDFs", 12));
  tabRow.appendChild(tabPills);

  const sortBox = figma.createFrame();
  sortBox.name = "Dropdown/Sort";
  sortBox.layoutMode = "HORIZONTAL";
  sortBox.primaryAxisSizingMode = "AUTO";
  sortBox.counterAxisSizingMode = "FIXED";
  sortBox.resize(130, 28);
  sortBox.paddingLeft = 10; sortBox.paddingRight = 10;
  sortBox.itemSpacing = 6;
  sortBox.counterAxisAlignItems = "CENTER";
  sortBox.cornerRadius = 6;
  sortBox.fills = solid(C.glassElevated, 1);
  sortBox.strokes = solid(C.glassBorder, 0.7);
  sortBox.strokeWeight = 1;
  sortBox.appendChild(createSvgIcon("sliders", "#8B9DAF", 11));
  sortBox.appendChild(createText("Date (Newest)", 10, "Medium", C.textZinc300));
  sortBox.appendChild(createSvgIcon("chevron-down", "#8B9DAF", 9));
  tabRow.appendChild(sortBox);
  leftCol.appendChild(tabRow);

  // 4 Detailed Interactive Take Cards
  function makeTakeRow(title, dateStr, duration, size, score, tags, isHighlighted = false) {
    const row = figma.createFrame();
    row.name = "TakeCard/" + title;
    row.layoutMode = "VERTICAL";
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "FIXED";
    row.resize(800, 102);
    row.paddingLeft = 16; row.paddingRight = 16; row.paddingTop = 12; row.paddingBottom = 12;
    row.itemSpacing = 10;
    row.cornerRadius = 10;
    row.fills = solid(isHighlighted ? C.forestBase : C.glassElevated, isHighlighted ? 0.85 : 0.65);
    row.strokes = solid(isHighlighted ? C.mint : C.glassBorder, isHighlighted ? 0.7 : 0.35);
    row.strokeWeight = 1;

    // Top Header: Checkbox + Title + Score Pill
    const rHead = figma.createFrame();
    rHead.layoutMode = "HORIZONTAL";
    rHead.primaryAxisSizingMode = "FIXED";
    rHead.counterAxisSizingMode = "AUTO";
    rHead.resize(768, 22);
    rHead.primaryAxisAlignItems = "SPACE_BETWEEN";
    rHead.counterAxisAlignItems = "CENTER";
    rHead.fills = [];

    const rHL = figma.createFrame();
    rHL.layoutMode = "HORIZONTAL";
    rHL.primaryAxisSizingMode = "AUTO";
    rHL.counterAxisSizingMode = "AUTO";
    rHL.itemSpacing = 8;
    rHL.counterAxisAlignItems = "CENTER";
    rHL.fills = [];
    
    // Checkbox
    const chk = figma.createFrame();
    chk.resize(14, 14);
    chk.cornerRadius = 3;
    chk.fills = solid(isHighlighted ? C.mint : { r: 0.10, g: 0.12, b: 0.16 }, 1);
    chk.strokes = solid(C.mint, isHighlighted ? 0.9 : 0.3);
    chk.strokeWeight = 1;
    chk.layoutMode = "HORIZONTAL";
    chk.primaryAxisAlignItems = "CENTER";
    chk.counterAxisAlignItems = "CENTER";
    if (isHighlighted) {
      chk.appendChild(createSvgIcon("check", "#050608", 10));
    }
    rHL.appendChild(chk);

    rHL.appendChild(createText(title, 12, "Bold", C.textWhite));
    rHL.appendChild(createText("• " + dateStr, 10, "Regular", C.textZinc400));
    rHead.appendChild(rHL);

    const scoreCol = figma.createFrame();
    scoreCol.layoutMode = "HORIZONTAL";
    scoreCol.primaryAxisSizingMode = "AUTO";
    scoreCol.counterAxisSizingMode = "AUTO";
    scoreCol.itemSpacing = 6;
    scoreCol.counterAxisAlignItems = "CENTER";
    scoreCol.fills = [];
    scoreCol.appendChild(createText(score + "/100", 12, "Bold", isHighlighted ? C.mint : C.textWhite));
    scoreCol.appendChild(createBadge(isHighlighted ? "VIRTUOSO" : "GRADED", isHighlighted ? "mint" : "neutral", 8));
    rHead.appendChild(scoreCol);
    row.appendChild(rHead);

    // Bottom Row: Audio metadata + Actions
    const rBot = figma.createFrame();
    rBot.layoutMode = "HORIZONTAL";
    rBot.primaryAxisSizingMode = "FIXED";
    rBot.counterAxisSizingMode = "AUTO";
    rBot.resize(768, 28);
    rBot.primaryAxisAlignItems = "SPACE_BETWEEN";
    rBot.counterAxisAlignItems = "CENTER";
    rBot.fills = [];

    const tagGroup = figma.createFrame();
    tagGroup.layoutMode = "HORIZONTAL";
    tagGroup.primaryAxisSizingMode = "AUTO";
    tagGroup.counterAxisSizingMode = "AUTO";
    tagGroup.itemSpacing = 6;
    tagGroup.counterAxisAlignItems = "CENTER";
    tagGroup.fills = [];
    tagGroup.appendChild(createText(duration + " • " + size, 10, "Medium", C.textZinc500));
    tags.forEach(t => tagGroup.appendChild(createBadge(t.label, t.col, 8)));
    rBot.appendChild(tagGroup);

    const actGroup = figma.createFrame();
    actGroup.layoutMode = "HORIZONTAL";
    actGroup.primaryAxisSizingMode = "AUTO";
    actGroup.counterAxisSizingMode = "AUTO";
    actGroup.itemSpacing = 8;
    actGroup.counterAxisAlignItems = "CENTER";
    actGroup.fills = [];

    const btnPlay = figma.createFrame();
    btnPlay.name = "Button/Play Take";
    btnPlay.layoutMode = "HORIZONTAL";
    btnPlay.primaryAxisSizingMode = "AUTO";
    btnPlay.counterAxisSizingMode = "FIXED";
    btnPlay.resize(62, 28);
    btnPlay.paddingLeft = 10; btnPlay.paddingRight = 10;
    btnPlay.itemSpacing = 5;
    btnPlay.counterAxisAlignItems = "CENTER";
    btnPlay.primaryAxisAlignItems = "CENTER";
    btnPlay.cornerRadius = 6;
    btnPlay.fills = solid(C.glassElevated, 1);
    btnPlay.strokes = solid(C.glassBorder, 0.7);
    btnPlay.strokeWeight = 1;
    btnPlay.appendChild(createSvgIcon("play", "#8B9DAF", 10));
    btnPlay.appendChild(createText("Play", 10, "Medium", C.textZinc300));
    actGroup.appendChild(btnPlay);

    const btnPdf = figma.createFrame();
    btnPdf.name = "Button/PDF " + title;
    btnPdf.layoutMode = "HORIZONTAL";
    btnPdf.primaryAxisSizingMode = "AUTO";
    btnPdf.counterAxisSizingMode = "FIXED";
    btnPdf.resize(60, 28);
    btnPdf.paddingLeft = 10; btnPdf.paddingRight = 10;
    btnPdf.itemSpacing = 5;
    btnPdf.counterAxisAlignItems = "CENTER";
    btnPdf.primaryAxisAlignItems = "CENTER";
    btnPdf.cornerRadius = 6;
    btnPdf.fills = solid(C.glassElevated, 1);
    btnPdf.strokes = solid(C.glassBorder, 0.7);
    btnPdf.strokeWeight = 1;
    btnPdf.appendChild(createSvgIcon("download", "#00F5A0", 10));
    btnPdf.appendChild(createText("PDF", 10, "Bold", C.mint));
    actGroup.appendChild(btnPdf);

    const btnOpen = createActionButton("View Report", "arrow-up-right", isHighlighted ? "radiant" : "secondary", null, "right", 28);
    btnOpen.name = "Archive/View " + title;
    actGroup.appendChild(btnOpen);

    rBot.appendChild(actGroup);
    row.appendChild(rBot);

    return row;
  }

  leftCol.appendChild(makeTakeRow(
    "Bohemian Rhapsody — Verse 1 (Take 04)",
    "Today 14:20", "01:45", "28.4 MB", "94",
    [{ label: "48kHz WAV", col: "mint" }, { label: "Passaggio F#4 Flagged", col: "amber" }, { label: "CERTIFIED", col: "mint" }],
    true
  ));

  leftCol.appendChild(makeTakeRow(
    "Bohemian Rhapsody — Verse 1 (Take 03)",
    "Yesterday 19:15", "01:42", "27.6 MB", "89",
    [{ label: "48kHz WAV", col: "neutral" }, { label: "-22c Flat Drift", col: "amber" }]
  ));

  leftCol.appendChild(makeTakeRow(
    "G Major 5-Tone Arpeggio Vocal Drill",
    "12 Oct 2026", "02:10", "34.1 MB", "96",
    [{ label: "Solfeggio Scale", col: "neutral" }, { label: "Perfect 5th Lock", col: "mint" }, { label: "CERTIFIED", col: "mint" }]
  ));

  leftCol.appendChild(makeTakeRow(
    "Initial Diagnostic Baseline & SATB Calibration",
    "14 Sep 2026", "03:15", "52.8 MB", "82",
    [{ label: "Baseline Take", col: "neutral" }, { label: "Tenor C2–E4", col: "neutral" }]
  ));

  // Bottom Pagination & Maintenance Toolbar
  const botBar = figma.createFrame();
  botBar.layoutMode = "HORIZONTAL"; botBar.resize(800, 36);
  botBar.primaryAxisAlignItems = "SPACE_BETWEEN"; botBar.counterAxisAlignItems = "CENTER"; botBar.fills = [];
  botBar.appendChild(createText("Showing 4 of 48 takes • 1 take selected (Take 04)", 10, "Medium", C.textZinc400));

  const botActs = figma.createFrame();
  botActs.layoutMode = "HORIZONTAL"; botActs.itemSpacing = 8; botActs.counterAxisAlignItems = "CENTER"; botActs.fills = [];
  botActs.appendChild(createActionButton("Archive Selected to ZIP", "download", "secondary"));
  botActs.appendChild(createActionButton("Delete Take", null, "secondary"));
  botBar.appendChild(botActs);
  leftCol.appendChild(botBar);

  gridRow.appendChild(leftCol);

  // COLUMN 2: DOCUMENT INSPECTOR & REPOSITORY MAINTENANCE (452 x 800)
  const rightCol = figma.createFrame();
  rightCol.name = "Inspector & Maintenance Column";
  rightCol.layoutMode = "VERTICAL";
  rightCol.resize(452, 800);
  rightCol.itemSpacing = 16;
  rightCol.fills = [];

  // Card A: Selected Take Official Certificate Preview (452 x 460 px)
  const certCard = figma.createFrame();
  certCard.name = "Selected Certificate Card";
  certCard.layoutMode = "VERTICAL";
  certCard.resize(452, 460);
  certCard.paddingLeft = 20; certCard.paddingRight = 20; certCard.paddingTop = 18; certCard.paddingBottom = 18;
  certCard.itemSpacing = 12;
  certCard.cornerRadius = 14;
  applyCard2Glass(certCard);

  const ctHead = figma.createFrame();
  ctHead.layoutMode = "HORIZONTAL"; ctHead.resize(412, 22); ctHead.primaryAxisAlignItems = "SPACE_BETWEEN"; ctHead.counterAxisAlignItems = "CENTER"; ctHead.fills = [];
  ctHead.appendChild(createText("Official Certificate: Take 04", 13, "Bold", C.textWhite));
  ctHead.appendChild(createBadge("VERIFIED GRADE A+", "mint", 9));
  certCard.appendChild(ctHead);

  // Luxury Certificate Plate
  const certPlate = figma.createFrame();
  certPlate.layoutMode = "VERTICAL"; certPlate.resize(412, 280);
  certPlate.paddingLeft = 16; certPlate.paddingRight = 16; certPlate.paddingTop = 14; certPlate.paddingBottom = 14;
  certPlate.itemSpacing = 10;
  certPlate.cornerRadius = 10;
  certPlate.fills = solid({ r: 0.03, g: 0.10, b: 0.07 }, 0.95);
  certPlate.strokes = solid(C.mint, 0.45); certPlate.strokeWeight = 1.2;

  const cpTop = figma.createFrame();
  cpTop.layoutMode = "HORIZONTAL"; cpTop.resize(380, 18); cpTop.primaryAxisAlignItems = "SPACE_BETWEEN"; cpTop.counterAxisAlignItems = "CENTER"; cpTop.fills = [];
  cpTop.appendChild(createText("INTERNATIONAL CONSERVATORY STANDARD", 8, "Bold", C.mint));
  cpTop.appendChild(createText("GRADE: A+ VIRTUOSO", 9, "Bold", C.textWhite));
  certPlate.appendChild(cpTop);

  certPlate.appendChild(createText("Vocal Performance Audit Certificate", 15, "Bold", C.textWhite));

  function makeCertItem(lbl, val) {
    const ci = figma.createFrame();
    ci.layoutMode = "HORIZONTAL"; ci.resize(380, 18); ci.primaryAxisAlignItems = "SPACE_BETWEEN"; ci.counterAxisAlignItems = "CENTER"; ci.fills = [];
    ci.appendChild(createText(lbl, 9, "Regular", C.textZinc400));
    ci.appendChild(createText(val, 9, "Bold", C.textWhite));
    return ci;
  }

  certPlate.appendChild(makeCertItem("Vocalist Identity:", "Ethan Reynolds • Tenor Lyrique"));
  certPlate.appendChild(makeCertItem("Song & Session:", "Bohemian Rhapsody (Take 04)"));
  certPlate.appendChild(makeCertItem("Acoustic Vocal Span:", "C2 (65.4Hz) — A4 (440Hz) • 2.8 Octaves"));
  certPlate.appendChild(makeCertItem("Pitch Lock Accuracy:", "94.2% Intonation Stability"));
  certPlate.appendChild(makeCertItem("Audio Master Quality:", "48kHz / 24-bit PCM • Zero-Latency DSP"));

  const hashBox = figma.createFrame();
  hashBox.layoutMode = "HORIZONTAL"; hashBox.resize(380, 22);
  hashBox.paddingLeft = 8; hashBox.paddingRight = 8;
  hashBox.primaryAxisAlignItems = "SPACE_BETWEEN"; hashBox.counterAxisAlignItems = "CENTER";
  hashBox.cornerRadius = 4; hashBox.fills = solid({ r: 0.02, g: 0.06, b: 0.04 }, 1);
  hashBox.strokes = solid(C.mint, 0.3); hashBox.strokeWeight = 1;
  hashBox.appendChild(createText("HASH: #VS-8829-48K-TENOR-20261015", 8, "Bold", C.mint));
  hashBox.appendChild(createBadge("SEALED", "neutral", 7));
  certPlate.appendChild(hashBox);

  certCard.appendChild(certPlate);

  const btnCertPdf = createActionButton("Download Official PDF Certificate", "arrow-up-right", "radiant", 412, "right", 36);
  btnCertPdf.name = "Archive/Download Certificate";
  certCard.appendChild(btnCertPdf);

  const btnPianoRoll = createActionButton("Open Detailed Note-Sync Piano Roll", "arrow-up-right", "secondary", 412, "right", 36);
  btnPianoRoll.name = "Archive/Open Piano Roll";
  certCard.appendChild(btnPianoRoll);

  rightCol.appendChild(certCard);

  // Card B: Storage Maintenance & Clean-Up (452 x 320 px)
  const maintCard = figma.createFrame();
  maintCard.name = "Storage Maintenance Card";
  maintCard.layoutMode = "VERTICAL";
  maintCard.resize(452, 320);
  maintCard.paddingLeft = 20; maintCard.paddingRight = 20; maintCard.paddingTop = 16; maintCard.paddingBottom = 16;
  maintCard.itemSpacing = 10;
  maintCard.cornerRadius = 14;
  applyCard2Glass(maintCard);

  const mtHead = figma.createFrame();
  mtHead.layoutMode = "HORIZONTAL"; mtHead.resize(412, 22); mtHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mtHead.counterAxisAlignItems = "CENTER"; mtHead.fills = [];
  mtHead.appendChild(createText("Cloud Storage & Archive Health", 13, "Bold", C.textWhite));
  mtHead.appendChild(createBadge("4.2 / 10 GB", "neutral", 9));
  maintCard.appendChild(mtHead);

  function makeStorageRow(label, size, color) {
    const sr = figma.createFrame();
    sr.layoutMode = "HORIZONTAL"; sr.resize(412, 18); sr.primaryAxisAlignItems = "SPACE_BETWEEN"; sr.counterAxisAlignItems = "CENTER"; sr.fills = [];
    const sL = figma.createFrame(); sL.layoutMode = "HORIZONTAL"; sL.itemSpacing = 6; sL.counterAxisAlignItems = "CENTER"; sL.fills = [];
    const dot = figma.createEllipse(); dot.resize(6, 6); dot.fills = solid(color, 1);
    sL.appendChild(dot);
    sL.appendChild(createText(label, 10, "Medium", C.textZinc300));
    sr.appendChild(sL);
    sr.appendChild(createText(size, 10, "Bold", C.textWhite));
    return sr;
  }

  maintCard.appendChild(makeStorageRow("Lossless 48kHz WAV Recordings", "3.4 GB", C.mint));
  maintCard.appendChild(makeStorageRow("Certified PDF Evaluation Sheets", "480 MB", C.cyan));
  maintCard.appendChild(makeStorageRow("Pitch Contour & YIN Vectors", "320 MB", C.amber));

  const btnClean = createActionButton("Clean Up Redundant Takes (Free ~1.2 GB)", "refresh", "secondary", 412, "right", 36);
  btnClean.name = "Archive/Clean Cache";
  maintCard.appendChild(btnClean);

  const btnSync = createActionButton("Sync Archive with Google Drive", "arrow-up-right", "secondary", 412, "right", 36);
  btnSync.name = "Archive/Sync Cloud";
  maintCard.appendChild(btnSync);

  rightCol.appendChild(maintCard);
  gridRow.appendChild(rightCol);
  container.appendChild(gridRow);

  return root;
}
