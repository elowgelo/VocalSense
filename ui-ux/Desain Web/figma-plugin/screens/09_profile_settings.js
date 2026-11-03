// =============================================================================
// VOCALSENSE AI — 09. VOCALIST PERSONAL PROFILE
// Authentic Musician & Vocalist Personal Profile Page (1440 x 960 px)
//
// 100% PURE PERSONAL PROFILE (ZERO ANOMALIES & ANTI-SLOP):
//   - 100% Exact Circular Avatar (84x84 fixed dimensions, mathematically round, zero oval stretch)
//   - All Buttons with Crisp Modern Squircle Radius (r=6px, strictly FIXED heights, ZERO lonjong/capsule deformation)
//   - Personal Account Owner Actions: "Share Profile ↗" and "Edit Bio & Fach" (NO "Follow Vocalist" on own account!)
//   - Zero Text Gap: Tightly stacked identity typography with exactly 5px spacing between name, bio, and stats
//   - Section 1: Top Recorded Takes (Vocal performance showcase with exact 28x28 square play buttons)
//   - Section 2: Vocal Practice & Calibration Activity (GitHub-Style 52x7 Contribution Matrix with 14-day streak)
//   - Section 3: About Ethan Reynolds & Vocal Fach Classification (Conservatory credentials & acoustic specs)
//   - Section 4: Vocal Mastery Milestones (4 Biometric achievements verified by audio engine)
//
// 100% ARCHITECTURAL & UX CONSISTENCY:
//   - Left DAW Sidebar Dock (72 x 960) with Bottom Avatar "ER" active in emerald squircle.
//   - Main Workspace Container (1368 x 960) at x=72.
//   - Zero form bloat, zero oversized empty boxes, zero generic icon slop.
// =============================================================================

function buildProfileScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 09. Vocalist Personal Profile";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Dark studio canvas gradient
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
  logoSquircle.cornerRadius = 10;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (Home, Reports, Training, Documents)
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
  const btnNavDoc = createIconButton("document", "#8B9DAF", 42, 18, false);
  btnNavDoc.name = "Nav/Documents";

  navGroup.appendChild(btnNavHome);
  navGroup.appendChild(btnNavWave);
  navGroup.appendChild(btnNavChart);
  navGroup.appendChild(btnNavDoc);
  sidebar.appendChild(navGroup);

  // Bottom: Settings + ACTIVE User Avatar ER (Highlighting Personal Profile Screen!)
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
  avatarFrame.resize(42, 42);
  avatarFrame.cornerRadius = 10;
  avatarFrame.fills = solid(C.forestBase, 1);
  avatarFrame.strokes = solid(C.mint, 1);
  avatarFrame.strokeWeight = 1.8;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 13, "Bold", C.mint));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN WORKSPACE CONTAINER (1368 x 960) AT x=72
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Personal Profile Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 36;
  container.paddingRight = 36;
  container.paddingTop = 18;
  container.paddingBottom = 20;
  container.itemSpacing = 16;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP TOOLBAR & BREADCRUMB (1296 x 34 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Profile TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.primaryAxisSizingMode = "FIXED";
  topBar.counterAxisSizingMode = "AUTO";
  topBar.resize(1296, 34);
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

  // Crisp rectangular Back Button (r=6)
  const backBtn = figma.createFrame();
  backBtn.name = "Button/Back to Studio";
  backBtn.layoutMode = "HORIZONTAL";
  backBtn.primaryAxisSizingMode = "FIXED";
  backBtn.counterAxisSizingMode = "FIXED";
  backBtn.resize(114, 30);
  backBtn.primaryAxisAlignItems = "CENTER";
  backBtn.counterAxisAlignItems = "CENTER";
  backBtn.cornerRadius = 6;
  backBtn.fills = solid(C.glassElevated, 1);
  backBtn.strokes = solid(C.glassBorder, 1); backBtn.strokeWeight = 1;
  backBtn.appendChild(createText("← DAW Studio", 11, "Medium", C.textZinc300));
  tbLeft.appendChild(backBtn);

  const breadcrumb = figma.createFrame();
  breadcrumb.layoutMode = "HORIZONTAL";
  breadcrumb.itemSpacing = 6;
  breadcrumb.counterAxisAlignItems = "CENTER";
  breadcrumb.fills = [];
  breadcrumb.appendChild(createText("VocalSense AI", 11, "Medium", C.textZinc500));
  breadcrumb.appendChild(createText("•", 10, "Regular", C.textZinc600));
  breadcrumb.appendChild(createText("Ethan Reynolds Profile", 11, "Medium", C.textZinc400));
  tbLeft.appendChild(breadcrumb);
  topBar.appendChild(tbLeft);

  const tbRight = figma.createFrame();
  tbRight.layoutMode = "HORIZONTAL";
  tbRight.primaryAxisSizingMode = "AUTO";
  tbRight.counterAxisSizingMode = "AUTO";
  tbRight.itemSpacing = 10;
  tbRight.counterAxisAlignItems = "CENTER";
  tbRight.fills = [];

  // Crisp rectangular Edit Profile Button (r=6)
  const btnEditProf = figma.createFrame();
  btnEditProf.name = "Profile/Edit Profile";
  btnEditProf.layoutMode = "HORIZONTAL";
  btnEditProf.primaryAxisSizingMode = "FIXED";
  btnEditProf.counterAxisSizingMode = "FIXED";
  btnEditProf.resize(100, 30);
  btnEditProf.primaryAxisAlignItems = "CENTER";
  btnEditProf.counterAxisAlignItems = "CENTER";
  btnEditProf.cornerRadius = 6;
  btnEditProf.fills = solid(C.glassElevated, 1);
  btnEditProf.strokes = solid(C.glassBorder, 0.8); btnEditProf.strokeWeight = 1;
  btnEditProf.appendChild(createText("Edit Profile", 11, "Medium", C.textZinc300));
  tbRight.appendChild(btnEditProf);

  // Crisp rectangular Settings Button (r=6)
  const btnGoSettings = figma.createFrame();
  btnGoSettings.name = "Profile/Go to Settings";
  btnGoSettings.layoutMode = "HORIZONTAL";
  btnGoSettings.primaryAxisSizingMode = "FIXED";
  btnGoSettings.counterAxisSizingMode = "FIXED";
  btnGoSettings.resize(136, 30);
  btnGoSettings.primaryAxisAlignItems = "CENTER";
  btnGoSettings.counterAxisAlignItems = "CENTER";
  btnGoSettings.cornerRadius = 6;
  btnGoSettings.fills = solid(C.glassElevated, 1);
  btnGoSettings.strokes = solid(C.glassBorder, 0.8); btnGoSettings.strokeWeight = 1;
  btnGoSettings.appendChild(createText("Account Settings", 11, "Medium", C.textZinc300));
  tbRight.appendChild(btnGoSettings);

  topBar.appendChild(tbRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. VOCALIST PROFILE HERO BANNER (1296 x 132 px)
  // Tight typography, ZERO empty gaps, NO "Follow Vocalist" (Own Account)
  // -----------------------------------------------------------------------
  const heroCard = figma.createFrame();
  heroCard.name = "Vocalist Profile Hero Banner";
  heroCard.layoutMode = "HORIZONTAL";
  heroCard.primaryAxisSizingMode = "FIXED";
  heroCard.counterAxisSizingMode = "FIXED";
  heroCard.resize(1296, 132);
  heroCard.paddingLeft = 24; heroCard.paddingRight = 24; heroCard.paddingTop = 16; heroCard.paddingBottom = 16;
  heroCard.primaryAxisAlignItems = "SPACE_BETWEEN";
  heroCard.counterAxisAlignItems = "CENTER";
  heroCard.cornerRadius = 12;
  applyCard1Glass(heroCard);

  const heroLeft = figma.createFrame();
  heroLeft.layoutMode = "HORIZONTAL";
  heroLeft.primaryAxisSizingMode = "AUTO";
  heroLeft.counterAxisSizingMode = "AUTO";
  heroLeft.itemSpacing = 20;
  heroLeft.counterAxisAlignItems = "CENTER";
  heroLeft.fills = [];

  // GUARANTEED 100% PERFECT CIRCLE AVATAR (84x84, strictly FIXED on both axes)
  const bigAvatar = figma.createFrame();
  bigAvatar.name = "Avatar/Circular Photo";
  bigAvatar.layoutMode = "HORIZONTAL";
  bigAvatar.primaryAxisSizingMode = "FIXED";
  bigAvatar.counterAxisSizingMode = "FIXED";
  bigAvatar.layoutAlign = "INHERIT";
  bigAvatar.layoutGrow = 0;
  bigAvatar.resize(84, 84);
  bigAvatar.cornerRadius = 42; // EXACT mathematical circle!
  bigAvatar.primaryAxisAlignItems = "CENTER";
  bigAvatar.counterAxisAlignItems = "CENTER";
  bigAvatar.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.32, b: 0.20, a: 1 } },
      { position: 1.0, color: { r: 0.05, g: 0.12, b: 0.18, a: 1 } }
    ]
  }];
  bigAvatar.strokes = solid(C.mint, 0.9);
  bigAvatar.strokeWeight = 2;
  bigAvatar.appendChild(createText("ER", 28, "Bold", C.mint));
  heroLeft.appendChild(bigAvatar);

  // Vocalist Identity Typography & Details (ZERO vertical stretching, strictly MIN aligned)
  const idCol = figma.createFrame();
  idCol.name = "Profile Identity Block";
  idCol.layoutMode = "VERTICAL";
  idCol.primaryAxisSizingMode = "AUTO";
  idCol.counterAxisSizingMode = "AUTO";
  idCol.primaryAxisAlignItems = "MIN"; // Crucial: NO SPACE_BETWEEN!
  idCol.counterAxisAlignItems = "MIN";
  idCol.itemSpacing = 5; // Exactly 5px tight spacing between lines!
  idCol.fills = [];

  // Row 1: Profile badge & verified status
  const preRow = figma.createFrame();
  preRow.layoutMode = "HORIZONTAL";
  preRow.itemSpacing = 8;
  preRow.counterAxisAlignItems = "CENTER";
  preRow.fills = [];
  preRow.appendChild(createText("PERSONAL VOCALIST PROFILE", 9, "Bold", C.mint));
  preRow.appendChild(createBadge("VERIFIED VIRTUOSO", "mint", 8));
  idCol.appendChild(preRow);

  // Row 2: Name & Handle
  const nameRow = figma.createFrame();
  nameRow.layoutMode = "HORIZONTAL";
  nameRow.itemSpacing = 10;
  nameRow.counterAxisAlignItems = "BASELINE";
  nameRow.fills = [];
  nameRow.appendChild(createText("Ethan Reynolds", 26, "Bold", C.textWhite));
  nameRow.appendChild(createText("(@ethan.reynolds)", 12, "Regular", C.textZinc400));
  idCol.appendChild(nameRow);

  // Row 3: Conservatory Credentials & Fach
  idCol.appendChild(createText("The Juilliard School • Vocal Arts Division • Tenore Lirico (C2 — A4)", 11, "Regular", C.textZinc300));

  // Row 4: Quick stats strip
  const statRow = figma.createFrame();
  statRow.layoutMode = "HORIZONTAL";
  statRow.itemSpacing = 10;
  statRow.counterAxisAlignItems = "CENTER";
  statRow.fills = [];

  function makeQuickStat(label, val) {
    const s = figma.createFrame();
    s.layoutMode = "HORIZONTAL"; s.itemSpacing = 4; s.counterAxisAlignItems = "BASELINE"; s.fills = [];
    s.appendChild(createText(val, 11, "Bold", C.textWhite));
    s.appendChild(createText(label, 10, "Regular", C.textZinc500));
    return s;
  }
  statRow.appendChild(makeQuickStat("Practice Takes", "48"));
  statRow.appendChild(createText("•", 10, "Regular", C.textZinc600));
  statRow.appendChild(makeQuickStat("Mean Pitch Stability", "94.2%"));
  statRow.appendChild(createText("•", 10, "Regular", C.textZinc600));
  statRow.appendChild(makeQuickStat("Current Streak", "14 Days"));
  statRow.appendChild(createText("•", 10, "Regular", C.textZinc600));
  statRow.appendChild(makeQuickStat("Conservatory Rank", "Level 8"));
  idCol.appendChild(statRow);

  heroLeft.appendChild(idCol);
  heroCard.appendChild(heroLeft);

  // Right side: Personal Profile Actions (NO "Follow Vocalist" - own account!)
  const heroActs = figma.createFrame();
  heroActs.layoutMode = "HORIZONTAL";
  heroActs.itemSpacing = 10;
  heroActs.counterAxisAlignItems = "CENTER";
  heroActs.fills = [];

  // Primary Action: Share Profile
  const btnShare = figma.createFrame();
  btnShare.name = "Profile/Share Profile";
  btnShare.layoutMode = "HORIZONTAL";
  btnShare.primaryAxisSizingMode = "FIXED";
  btnShare.counterAxisSizingMode = "FIXED";
  btnShare.layoutAlign = "INHERIT";
  btnShare.layoutGrow = 0;
  btnShare.resize(120, 32);
  btnShare.cornerRadius = 6;
  btnShare.primaryAxisAlignItems = "CENTER";
  btnShare.counterAxisAlignItems = "CENTER";
  btnShare.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 1 } },
      { position: 1.0, color: { r: C.emerald.r, g: C.emerald.g, b: C.emerald.b, a: 1 } }
    ]
  }];
  btnShare.strokes = solid(C.mint, 0.9); btnShare.strokeWeight = 1;
  btnShare.appendChild(createText("Share Profile ↗", 11, "Bold", { r: 0.02, g: 0.08, b: 0.05 }));
  heroActs.appendChild(btnShare);

  // Secondary Action: Edit Bio & Fach
  const btnEditFach = figma.createFrame();
  btnEditFach.name = "Profile/Edit Bio";
  btnEditFach.layoutMode = "HORIZONTAL";
  btnEditFach.primaryAxisSizingMode = "FIXED";
  btnEditFach.counterAxisSizingMode = "FIXED";
  btnEditFach.layoutAlign = "INHERIT";
  btnEditFach.layoutGrow = 0;
  btnEditFach.resize(130, 32);
  btnEditFach.cornerRadius = 6;
  btnEditFach.primaryAxisAlignItems = "CENTER";
  btnEditFach.counterAxisAlignItems = "CENTER";
  btnEditFach.fills = solid(C.glassElevated, 1);
  btnEditFach.strokes = solid(C.glassBorder, 0.8); btnEditFach.strokeWeight = 1;
  btnEditFach.appendChild(createText("Edit Bio & Fach", 11, "Medium", C.textZinc300));
  heroActs.appendChild(btnEditFach);

  heroCard.appendChild(heroActs);
  container.appendChild(heroCard);

  // -----------------------------------------------------------------------
  // 3. MAIN 2-COLUMN PROFILE CONTENT BODY (1296 x 720 px)
  // -----------------------------------------------------------------------
  const contentRow = figma.createFrame();
  contentRow.name = "Profile Content Split";
  contentRow.layoutMode = "HORIZONTAL";
  contentRow.primaryAxisSizingMode = "FIXED";
  contentRow.counterAxisSizingMode = "FIXED";
  contentRow.resize(1296, 720);
  contentRow.itemSpacing = 24;
  contentRow.fills = [];
  contentRow.clipsContent = false;

  // =======================================================================
  // LEFT COLUMN: TOP TAKES & GITHUB-STYLE VOCAL PRACTICE HEATMAP (760 px)
  // =======================================================================
  const leftCol = figma.createFrame();
  leftCol.name = "Vocalist Takes & Activity Column";
  leftCol.layoutMode = "VERTICAL";
  leftCol.primaryAxisSizingMode = "FIXED";
  leftCol.counterAxisSizingMode = "FIXED";
  leftCol.resize(760, 720);
  leftCol.itemSpacing = 16;
  leftCol.fills = [];

  // -----------------------------------------------------------------------
  // SECTION 1: TOP RECORDED TAKES (PERFORMANCE SHOWCASE)
  // -----------------------------------------------------------------------
  const takesSection = figma.createFrame();
  takesSection.name = "Top Recorded Takes Section";
  takesSection.layoutMode = "VERTICAL";
  takesSection.primaryAxisSizingMode = "AUTO";
  takesSection.counterAxisSizingMode = "FIXED";
  takesSection.resize(760, 260);
  takesSection.itemSpacing = 8;
  takesSection.fills = [];

  const takesHead = figma.createFrame();
  takesHead.layoutMode = "HORIZONTAL";
  takesHead.resize(760, 22);
  takesHead.primaryAxisAlignItems = "SPACE_BETWEEN";
  takesHead.counterAxisAlignItems = "CENTER";
  takesHead.fills = [];

  const thL = figma.createFrame();
  thL.layoutMode = "HORIZONTAL"; thL.itemSpacing = 8; thL.counterAxisAlignItems = "BASELINE"; thL.fills = [];
  thL.appendChild(createText("Top Recorded Takes", 14, "Bold", C.textWhite));
  thL.appendChild(createText("Highest pitch stability & biometric accuracy", 10, "Regular", C.textZinc500));
  takesHead.appendChild(thL);

  takesHead.appendChild(createText("Show All 48 Takes ↗", 10, "Bold", C.mint));
  takesSection.appendChild(takesHead);

  // Clean track row with guaranteed 28x28 square squircle play button
  function makeSpotifyTrackRow(rank, title, subtitle, accuracyStr, rangeStr, duration) {
    const row = figma.createFrame();
    row.name = "Track/" + title;
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "FIXED";
    row.resize(760, 48);
    row.paddingLeft = 14; row.paddingRight = 16;
    row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER";
    row.cornerRadius = 6;
    row.fills = solid(C.glassElevated, 0.5);
    row.strokes = solid(C.glassBorder, 0.3);
    row.strokeWeight = 1;

    // Left block: Rank + Play button + Title/Subtitle (width 420px)
    const rowL = figma.createFrame();
    rowL.layoutMode = "HORIZONTAL";
    rowL.primaryAxisSizingMode = "FIXED";
    rowL.counterAxisSizingMode = "AUTO";
    rowL.resize(420, 32);
    rowL.itemSpacing = 12;
    rowL.counterAxisAlignItems = "CENTER";
    rowL.fills = [];

    // Rank Number
    const rankTxt = createText(String(rank), 12, "Bold", rank === 1 ? C.mint : C.textZinc500);
    rankTxt.resize(18, 16);
    rowL.appendChild(rankTxt);

    // GUARANTEED EXACT 28x28 SQUARE PLAY BUTTON (Zero lonjong/capsule!)
    const btnPlay = figma.createFrame();
    btnPlay.name = "Button/Play Take " + rank;
    btnPlay.layoutMode = "HORIZONTAL";
    btnPlay.primaryAxisSizingMode = "FIXED";
    btnPlay.counterAxisSizingMode = "FIXED";
    btnPlay.layoutAlign = "INHERIT";
    btnPlay.layoutGrow = 0;
    btnPlay.resize(28, 28);
    btnPlay.cornerRadius = 6; // Crisp square squircle!
    btnPlay.fills = solid(C.forestBase, 1);
    btnPlay.strokes = solid(C.mint, 0.7);
    btnPlay.strokeWeight = 1;
    btnPlay.primaryAxisAlignItems = "CENTER";
    btnPlay.counterAxisAlignItems = "CENTER";
    btnPlay.appendChild(createSvgIcon("play", "#00F5A0", 11));
    rowL.appendChild(btnPlay);

    // Title & Subtitle block
    const infoCol = figma.createFrame();
    infoCol.layoutMode = "VERTICAL";
    infoCol.primaryAxisSizingMode = "AUTO";
    infoCol.counterAxisSizingMode = "AUTO";
    infoCol.itemSpacing = 1;
    infoCol.fills = [];
    infoCol.appendChild(createText(title, 12, "Bold", C.textWhite));
    infoCol.appendChild(createText(subtitle, 10, "Regular", C.textZinc400));
    rowL.appendChild(infoCol);

    row.appendChild(rowL);

    // Right block: Accuracy + Range + Duration (width 280px)
    const rowR = figma.createFrame();
    rowR.layoutMode = "HORIZONTAL";
    rowR.primaryAxisSizingMode = "FIXED";
    rowR.counterAxisSizingMode = "AUTO";
    rowR.resize(280, 24);
    rowR.primaryAxisAlignItems = "SPACE_BETWEEN";
    rowR.counterAxisAlignItems = "CENTER";
    rowR.fills = [];

    const accTxt = createText(accuracyStr, 11, "Bold", C.mint);
    rowR.appendChild(accTxt);

    const rangeTxt = createText(rangeStr, 11, "Medium", C.textZinc300);
    rowR.appendChild(rangeTxt);

    const durTxt = createText(duration, 11, "Regular", C.textZinc400);
    rowR.appendChild(durTxt);

    row.appendChild(rowR);
    return row;
  }

  takesSection.appendChild(makeSpotifyTrackRow(1, "Bohemian Rhapsody", "Take 04 • Verse 1 • Pop/Rock Mix", "96.4% Accuracy", "Peak: A4 (440Hz)", "3:42"));
  takesSection.appendChild(makeSpotifyTrackRow(2, "Nessun Dorma", "Puccini Aria • Bel Canto Tenor", "94.8% Accuracy", "Peak: B4 (493Hz)", "2:18"));
  takesSection.appendChild(makeSpotifyTrackRow(3, "Queen of the Night", "Mozart • Staccato Drill", "92.1% Accuracy", "Peak: F4 (349Hz)", "1:45"));
  takesSection.appendChild(makeSpotifyTrackRow(4, "Bel Canto Solfeggio 12", "Daily Warmup • 5-Vowel Arpeggio", "95.2% Accuracy", "Peak: G4 (392Hz)", "4:10"));

  leftCol.appendChild(takesSection);

  // -----------------------------------------------------------------------
  // SECTION 2: VOCAL TRAINING & PRACTICE ACTIVITY (GITHUB-STYLE HEATMAP)
  // Replaces the awkward Spotify playlist cards with an authentic vocal activity matrix!
  // -----------------------------------------------------------------------
  const heatCard = figma.createFrame();
  heatCard.name = "Vocal Practice Activity Heatmap Card";
  heatCard.layoutMode = "VERTICAL";
  heatCard.primaryAxisSizingMode = "FIXED";
  heatCard.counterAxisSizingMode = "FIXED";
  heatCard.resize(760, 285);
  heatCard.paddingLeft = 18; heatCard.paddingRight = 18; heatCard.paddingTop = 14; heatCard.paddingBottom = 14;
  heatCard.itemSpacing = 10;
  heatCard.cornerRadius = 10;
  applyCard2Glass(heatCard);

  // Header of Activity Card
  const heatHead = figma.createFrame();
  heatHead.layoutMode = "HORIZONTAL";
  heatHead.resize(724, 22);
  heatHead.primaryAxisAlignItems = "SPACE_BETWEEN";
  heatHead.counterAxisAlignItems = "CENTER";
  heatHead.fills = [];

  const hHeadL = figma.createFrame();
  hHeadL.layoutMode = "HORIZONTAL"; hHeadL.itemSpacing = 8; hHeadL.counterAxisAlignItems = "BASELINE"; hHeadL.fills = [];
  hHeadL.appendChild(createText("Vocal Training & Practice Activity", 14, "Bold", C.textWhite));
  hHeadL.appendChild(createText("348 takes logged in 2026", 10, "Regular", C.textZinc500));
  heatHead.appendChild(hHeadL);

  const hHeadR = figma.createFrame();
  hHeadR.layoutMode = "HORIZONTAL"; hHeadR.itemSpacing = 6; hHeadR.counterAxisAlignItems = "CENTER"; hHeadR.fills = [];

  // Year selector pills
  const pill2026 = figma.createFrame();
  pill2026.layoutMode = "HORIZONTAL"; pill2026.paddingLeft = 8; pill2026.paddingRight = 8; pill2026.paddingTop = 2; pill2026.paddingBottom = 2;
  pill2026.cornerRadius = 4; pill2026.fills = solid(C.forestBase, 1);
  pill2026.strokes = solid(C.mint, 0.8); pill2026.strokeWeight = 1;
  pill2026.appendChild(createText("2026 (Active)", 9, "Bold", C.mint));
  hHeadR.appendChild(pill2026);

  const pill2025 = figma.createFrame();
  pill2025.layoutMode = "HORIZONTAL"; pill2025.paddingLeft = 8; pill2025.paddingRight = 8; pill2025.paddingTop = 2; pill2025.paddingBottom = 2;
  pill2025.cornerRadius = 4; pill2025.fills = solid(C.glassElevated, 0.4);
  pill2025.strokes = solid(C.glassBorder, 0.4); pill2025.strokeWeight = 1;
  pill2025.appendChild(createText("2025", 9, "Medium", C.textZinc500));
  hHeadR.appendChild(pill2025);

  heatHead.appendChild(hHeadR);
  heatCard.appendChild(heatHead);

  // Top stats strip (4 quick metrics)
  const metricStrip = figma.createFrame();
  metricStrip.layoutMode = "HORIZONTAL";
  metricStrip.resize(724, 26);
  metricStrip.itemSpacing = 16;
  metricStrip.counterAxisAlignItems = "CENTER";
  metricStrip.fills = [];

  function makeHeatMetric(label, val, isMint = false) {
    const m = figma.createFrame();
    m.layoutMode = "HORIZONTAL"; m.itemSpacing = 4; m.counterAxisAlignItems = "BASELINE"; m.fills = [];
    m.appendChild(createText(val, 11, "Bold", isMint ? C.mint : C.textWhite));
    m.appendChild(createText(label, 10, "Regular", C.textZinc400));
    return m;
  }
  metricStrip.appendChild(makeHeatMetric("Total Takes:", "348"));
  metricStrip.appendChild(createText("•", 10, "Regular", C.textZinc600));
  metricStrip.appendChild(makeHeatMetric("Current Streak:", "14 Days", true));
  metricStrip.appendChild(createText("•", 10, "Regular", C.textZinc600));
  metricStrip.appendChild(makeHeatMetric("Longest Streak:", "42 Days"));
  metricStrip.appendChild(createText("•", 10, "Regular", C.textZinc600));
  metricStrip.appendChild(makeHeatMetric("Acoustic Consistency:", "94.8%"));
  heatCard.appendChild(metricStrip);

  // Month labels header (Jan ... Dec)
  const monthsRow = figma.createFrame();
  monthsRow.layoutMode = "HORIZONTAL";
  monthsRow.resize(724, 14);
  monthsRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  monthsRow.counterAxisAlignItems = "CENTER";
  monthsRow.paddingLeft = 32; // Offset for day labels
  monthsRow.paddingRight = 10;
  monthsRow.fills = [];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (const m of monthNames) {
    monthsRow.appendChild(createText(m, 9, "Medium", C.textZinc500));
  }
  heatCard.appendChild(monthsRow);

  // Heatmap Grid + Day labels container
  const gridWithDays = figma.createFrame();
  gridWithDays.name = "Contribution Matrix Container";
  gridWithDays.layoutMode = "HORIZONTAL";
  gridWithDays.resize(724, 90);
  gridWithDays.itemSpacing = 8;
  gridWithDays.counterAxisAlignItems = "CENTER";
  gridWithDays.fills = [];

  // Day labels column (Mon, Wed, Fri)
  const dayCol = figma.createFrame();
  dayCol.layoutMode = "VERTICAL";
  dayCol.resize(24, 88);
  dayCol.primaryAxisAlignItems = "SPACE_BETWEEN";
  dayCol.counterAxisAlignItems = "MIN";
  dayCol.fills = [];
  dayCol.appendChild(createText("Mon", 8, "Medium", C.textZinc500));
  dayCol.appendChild(createText("Wed", 8, "Medium", C.textZinc500));
  dayCol.appendChild(createText("Fri", 8, "Medium", C.textZinc500));
  gridWithDays.appendChild(dayCol);

  // 52 columns of 7 days
  const heatGrid = figma.createFrame();
  heatGrid.name = "Heatmap Matrix 52x7";
  heatGrid.layoutMode = "HORIZONTAL";
  heatGrid.resize(680, 88);
  heatGrid.itemSpacing = 3;
  heatGrid.counterAxisAlignItems = "CENTER";
  heatGrid.fills = [];

  // 5 intensity levels: 0=Rest, 1=Light, 2=Regular, 3=Intensive, 4=Peak calibration
  const activityLevels = [
    solid({ r: 1, g: 1, b: 1 }, 0.05),              // 0: Rest day
    solid({ r: 0.02, g: 0.28, b: 0.18 }, 0.9),       // 1: 1 take
    solid({ r: 0.03, g: 0.52, b: 0.35 }, 1.0),       // 2: 2-3 takes
    solid({ r: 0.04, g: 0.74, b: 0.50 }, 1.0),       // 3: 4-5 takes
    solid(C.mint, 1.0)                                // 4: 6+ takes (Peak drill)
  ];

  for (let w = 0; w < 52; w++) {
    const col = figma.createFrame();
    col.name = "Week " + (w + 1);
    col.layoutMode = "VERTICAL";
    col.resize(10, 88);
    col.itemSpacing = 3;
    col.primaryAxisAlignItems = "CENTER";
    col.counterAxisAlignItems = "CENTER";
    col.fills = [];

    for (let d = 0; d < 7; d++) {
      const cell = figma.createFrame();
      cell.resize(10, 10);
      cell.cornerRadius = 2;

      // Realistic activity distribution
      let lvl = 0;
      if (w >= 50) {
        // Last 2 weeks = 14-day current streak (all active!)
        lvl = ((w * 7 + d) % 3) + 2; // levels 2, 3, or 4
      } else {
        const seed = (w * 13 + d * 7 + 11) % 100;
        if (d === 0 || d === 6) {
          lvl = seed < 60 ? 0 : (seed < 85 ? 1 : 2);
        } else {
          lvl = seed < 20 ? 0 : (seed < 55 ? 1 : (seed < 80 ? 2 : (seed < 95 ? 3 : 4)));
        }
      }

      cell.fills = activityLevels[lvl];
      col.appendChild(cell);
    }
    heatGrid.appendChild(col);
  }

  gridWithDays.appendChild(heatGrid);
  heatCard.appendChild(gridWithDays);

  // Footer: Legend (Less ... More) + Recent activity status
  const heatFoot = figma.createFrame();
  heatFoot.layoutMode = "HORIZONTAL";
  heatFoot.resize(724, 20);
  heatFoot.primaryAxisAlignItems = "SPACE_BETWEEN";
  heatFoot.counterAxisAlignItems = "CENTER";
  heatFoot.fills = [];

  const footL = figma.createFrame();
  footL.layoutMode = "HORIZONTAL"; footL.itemSpacing = 6; footL.counterAxisAlignItems = "CENTER"; footL.fills = [];
  footL.appendChild(createText("Latest Session: Oct 14 • 4 Takes (96.4% pitch accuracy)", 10, "Medium", C.mint));
  heatFoot.appendChild(footL);

  const legend = figma.createFrame();
  legend.layoutMode = "HORIZONTAL";
  legend.itemSpacing = 4;
  legend.counterAxisAlignItems = "CENTER";
  legend.fills = [];
  legend.appendChild(createText("Less", 9, "Regular", C.textZinc500));

  for (let i = 0; i < 5; i++) {
    const sw = figma.createFrame();
    sw.resize(9, 9);
    sw.cornerRadius = 2;
    sw.fills = activityLevels[i];
    legend.appendChild(sw);
  }
  legend.appendChild(createText("More", 9, "Regular", C.textZinc500));
  heatFoot.appendChild(legend);

  heatCard.appendChild(heatFoot);
  leftCol.appendChild(heatCard);

  contentRow.appendChild(leftCol);

  // =======================================================================
  // RIGHT COLUMN: ABOUT VOCALIST & VOCAL MASTERY MILESTONES (508 px)
  // 100% RELEVANT TO IPPL VOCALSENSE AI ACADEMIC VOCAL TRAINING!
  // =======================================================================
  const rightCol = figma.createFrame();
  rightCol.name = "Vocalist Identity Column";
  rightCol.layoutMode = "VERTICAL";
  rightCol.primaryAxisSizingMode = "FIXED";
  rightCol.counterAxisSizingMode = "FIXED";
  rightCol.resize(508, 720);
  rightCol.itemSpacing = 16;
  rightCol.fills = [];

  // -----------------------------------------------------------------------
  // CARD 1: ABOUT VOCALIST & CONSERVATORY CREDENTIALS (508 x 330 px)
  // -----------------------------------------------------------------------
  const aboutCard = figma.createFrame();
  aboutCard.name = "About Vocalist Card";
  aboutCard.layoutMode = "VERTICAL";
  aboutCard.primaryAxisSizingMode = "FIXED";
  aboutCard.counterAxisSizingMode = "FIXED";
  aboutCard.resize(508, 330);
  aboutCard.paddingLeft = 20; aboutCard.paddingRight = 20; aboutCard.paddingTop = 18; aboutCard.paddingBottom = 18;
  aboutCard.itemSpacing = 12;
  aboutCard.cornerRadius = 12;
  applyCard2Glass(aboutCard);

  const abHead = figma.createFrame();
  abHead.layoutMode = "HORIZONTAL"; abHead.resize(468, 22); abHead.primaryAxisAlignItems = "SPACE_BETWEEN"; abHead.counterAxisAlignItems = "CENTER"; abHead.fills = [];
  abHead.appendChild(createText("About Ethan Reynolds", 14, "Bold", C.textWhite));
  abHead.appendChild(createBadge("CONSERVATORY VIRTUOSO", "mint", 8));
  aboutCard.appendChild(abHead);

  aboutCard.appendChild(createParagraph(
    "Classical lyric tenor based in New York, NY. Currently training at The Juilliard School (Vocal Arts Division). Focusing on Bel Canto acoustic resonance, Italian solfeggio vowel alignment, and seamless passaggio transitions across the upper break (F#4–A4). Recording daily calibrations via VocalSense AI.",
    468, 11, "Regular", C.textZinc300, 18
  ));

  // Clean 5-row technical credentials table
  const credBox = figma.createFrame();
  credBox.layoutMode = "VERTICAL";
  credBox.itemSpacing = 6;
  credBox.resize(468, 164);
  credBox.fills = [];

  function makeCredRow(label, value) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(468, 28);
    row.paddingLeft = 10; row.paddingRight = 10;
    row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER";
    row.cornerRadius = 6;
    row.fills = solid(C.glassElevated, 0.4);
    row.strokes = solid(C.glassBorder, 0.3); row.strokeWeight = 1;
    row.appendChild(createText(label, 10, "Medium", C.textZinc400));
    row.appendChild(createText(value, 10, "Bold", C.textWhite));
    return row;
  }

  credBox.appendChild(makeCredRow("Vocal Fach Classification", "Lyric Tenor (Tenore Lirico)"));
  credBox.appendChild(makeCredRow("Calibrated Pitch Range", "C2 — A4 (2.8 Octaves)"));
  credBox.appendChild(makeCredRow("Concert Tuning Standard", "Concert A4 = 440 Hz (Solfeggio)"));
  credBox.appendChild(makeCredRow("Studio Audio Hardware", "Shure SM7B • Focusrite Scarlett 2i2"));
  credBox.appendChild(makeCredRow("Vocal Mix Balance", "68% Modal / 32% Head Resonant"));

  aboutCard.appendChild(credBox);
  rightCol.appendChild(aboutCard);

  // -----------------------------------------------------------------------
  // CARD 2: VOCAL MASTERY MILESTONES & BADGES (508 x 330 px)
  // -----------------------------------------------------------------------
  const badgeCard = figma.createFrame();
  badgeCard.name = "Vocal Mastery Milestones Card";
  badgeCard.layoutMode = "VERTICAL";
  badgeCard.primaryAxisSizingMode = "FIXED";
  badgeCard.counterAxisSizingMode = "FIXED";
  badgeCard.resize(508, 330);
  badgeCard.paddingLeft = 20; badgeCard.paddingRight = 20; badgeCard.paddingTop = 16; badgeCard.paddingBottom = 16;
  badgeCard.itemSpacing = 10;
  badgeCard.cornerRadius = 12;
  applyCard3Glass(badgeCard);

  const bHead = figma.createFrame();
  bHead.layoutMode = "HORIZONTAL"; bHead.resize(468, 22); bHead.primaryAxisAlignItems = "SPACE_BETWEEN"; bHead.counterAxisAlignItems = "CENTER"; bHead.fills = [];
  bHead.appendChild(createText("Vocal Mastery Milestones", 14, "Bold", C.textWhite));
  bHead.appendChild(createBadge("4 UNLOCKED", "mint", 8));
  badgeCard.appendChild(bHead);

  function makeMilestoneRow(title, desc, statusBadge, dateStr) {
    const mr = figma.createFrame();
    mr.layoutMode = "HORIZONTAL"; mr.resize(468, 52);
    mr.paddingLeft = 12; mr.paddingRight = 12;
    mr.primaryAxisAlignItems = "SPACE_BETWEEN"; mr.counterAxisAlignItems = "CENTER";
    mr.cornerRadius = 6;
    mr.fills = solid(C.glassElevated, 0.5);
    mr.strokes = solid(C.glassBorder, 0.35); mr.strokeWeight = 1;

    const mL = figma.createFrame();
    mL.layoutMode = "VERTICAL"; mL.itemSpacing = 2; mL.counterAxisAlignItems = "MIN"; mL.fills = [];
    
    const titleRow = figma.createFrame();
    titleRow.layoutMode = "HORIZONTAL"; titleRow.itemSpacing = 6; titleRow.counterAxisAlignItems = "CENTER"; titleRow.fills = [];
    titleRow.appendChild(createText(title, 11, "Bold", C.textWhite));
    titleRow.appendChild(createBadge(statusBadge, "mint", 7));
    mL.appendChild(titleRow);

    mL.appendChild(createText(desc, 10, "Regular", C.textZinc400));
    mr.appendChild(mL);

    const mR = figma.createFrame();
    mR.layoutMode = "HORIZONTAL"; mR.fills = [];
    mR.appendChild(createText(dateStr, 9, "Regular", C.textZinc500));
    mr.appendChild(mR);

    return mr;
  }

  badgeCard.appendChild(makeMilestoneRow("Passaggio Bridge Master", "Sustained F#4 with < 4.2 cents pitch drift", "TIER 1", "Oct 14"));
  badgeCard.appendChild(makeMilestoneRow("Vibrato Uniformity 5.8Hz", "Natural vocal oscillation stability achieved", "GRADE A+", "Oct 12"));
  badgeCard.appendChild(makeMilestoneRow("14-Day Consistency Streak", "Daily vocalizations completed consecutively", "ACTIVE", "Oct 10"));
  badgeCard.appendChild(makeMilestoneRow("Singer's Formant Peak", "Harmonic boost > 2.8 kHz verified across takes", "MASTERY", "Oct 08"));

  rightCol.appendChild(badgeCard);
  contentRow.appendChild(rightCol);

  container.appendChild(contentRow);

  return root;
}
