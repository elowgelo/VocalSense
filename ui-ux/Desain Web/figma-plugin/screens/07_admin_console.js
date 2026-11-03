// =============================================================================
// VOCALSENSE AI — 07. ADMINISTRATOR CONSOLE & SYSTEM TELEMETRY
// Use Cases Covered:
//   - UC-23: Manajemen Pengguna dan Penyesuaian Tier oleh Administrator
//   - UC-24: Pemantauan Analitik Finansial, Utilisasi AI Engine dan Konfigurasi
//
// ENHANCEMENTS:
//   - Replaced simplistic histogram blocks with professional SVG latency telemetry spline & area curve.
//   - High-density enterprise operations console with live cluster monitors and percentile tickers.
//   - Clean typography without overused border wrappers.
// =============================================================================

function buildAdminScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 07. Administrator Console & System Telemetry";
  root.resize(1440, 960);
  root.x = originX;
  root.y = originY;
  root.clipsContent = true;

  // Dark canvas gradient
  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } },
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }
    ]
  }];

  const grid = figma.createFrame();
  grid.resize(1440, 960); grid.fills = []; grid.strokes = solid(C.gridLine, 0.035);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  const stack = figma.createFrame();
  stack.name = "Admin Content Stack";
  stack.layoutMode = "VERTICAL";
  stack.resize(1440, 960);
  stack.paddingLeft = 42; stack.paddingRight = 42;
  stack.paddingTop = 20; stack.paddingBottom = 28;
  stack.itemSpacing = 16;
  stack.fills = [];
  stack.clipsContent = false;
  root.appendChild(stack);

  // ---------------------------------------------------------------------------
  // 1. TOP HEADER TOOLBAR (1356 x 48 px)
  // ---------------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.layoutMode = "HORIZONTAL"; topBar.resize(1356, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN"; topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const hLeft = figma.createFrame();
  hLeft.layoutMode = "HORIZONTAL";
  hLeft.primaryAxisSizingMode = "AUTO";
  hLeft.counterAxisSizingMode = "AUTO";
  hLeft.itemSpacing = 10;
  hLeft.counterAxisAlignItems = "CENTER";
  hLeft.fills = [];
  hLeft.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  hLeft.appendChild(createText("VocalSense AI", 16, "Bold", C.textWhite));
  hLeft.appendChild(createBadge("ROOT OPERATIONS & INFRASTRUCTURE CONSOLE", "mint", 9));
  topBar.appendChild(hLeft);

  const hRight = figma.createFrame();
  hRight.layoutMode = "HORIZONTAL";
  hRight.primaryAxisSizingMode = "AUTO";
  hRight.counterAxisSizingMode = "AUTO";
  hRight.itemSpacing = 12;
  hRight.counterAxisAlignItems = "CENTER";
  hRight.fills = [];

  const cStatus = figma.createFrame();
  cStatus.layoutMode = "HORIZONTAL"; cStatus.itemSpacing = 8; cStatus.counterAxisAlignItems = "CENTER";
  cStatus.paddingLeft = 10; cStatus.paddingRight = 10; cStatus.paddingTop = 5; cStatus.paddingBottom = 5;
  cStatus.cornerRadius = 6; cStatus.fills = solid(C.forestBase, 0.9);
  cStatus.strokes = solid(C.mint, 0.5); cStatus.strokeWeight = 1;
  const sDot = figma.createEllipse(); sDot.resize(6, 6); sDot.fills = solid(C.mint, 1);
  cStatus.appendChild(sDot);
  cStatus.appendChild(createText("Cluster: ap-southeast-1 (Jakarta) • All Systems Green", 11, "Medium", C.textWhite));
  hRight.appendChild(cStatus);

  hRight.appendChild(createBadge("SYSADMIN: ROOT", "neutral", 9));

  const exitBtn = createActionButton("Exit Admin ↗", "arrow-up-right", "radiant");
  exitBtn.name = "Button/Exit Admin";
  hRight.appendChild(exitBtn);

  topBar.appendChild(hRight);
  stack.appendChild(topBar);

  // ---------------------------------------------------------------------------
  // 2. 4 EXECUTIVE KPI METRIC BENTO CARDS (1356 x 96 px)
  // ---------------------------------------------------------------------------
  const kpiRow = figma.createFrame();
  kpiRow.name = "KPI Bento Cards Row";
  kpiRow.layoutMode = "HORIZONTAL";
  kpiRow.resize(1356, 96);
  kpiRow.itemSpacing = 16;
  kpiRow.fills = [];
  kpiRow.clipsContent = false;

  function makeKpiCard(title, value, badgeText, badgeColor, subtext) {
    const card = figma.createFrame();
    card.layoutMode = "VERTICAL"; card.resize(327, 96);
    card.paddingLeft = 16; card.paddingRight = 16; card.paddingTop = 12; card.paddingBottom = 12;
    card.itemSpacing = 4; card.cornerRadius = 12;
    applyCard2Glass(card);

    const top = figma.createFrame();
    top.layoutMode = "HORIZONTAL"; top.resize(295, 20);
    top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER"; top.fills = [];
    top.appendChild(createText(title, 11, "Medium", C.textZinc400));
    top.appendChild(createBadge(badgeText, badgeColor, 8));
    card.appendChild(top);

    card.appendChild(createText(value, 24, "Bold", C.textWhite));
    card.appendChild(createText(subtext, 10, "Regular", C.textZinc400));
    return card;
  }

  kpiRow.appendChild(makeKpiCard("Total Registered Vocalists", "14,820", "+12.4% MoM", "mint", "8,410 Free • 5,120 Pro • 1,290 Premium"));
  kpiRow.appendChild(makeKpiCard("Monthly Recurring Revenue (MRR)", "Rp 84.500.000", "+18.2% Growth", "mint", "Midtrans Net: Rp 82.810.000 (after PPN)"));
  kpiRow.appendChild(makeKpiCard("Gemini AI API Tokens Consumed", "1.42M Tokens", "0.01% Error", "neutral", "Avg: 240 tok/take • Est. Cost: $18.40/mo"));
  kpiRow.appendChild(makeKpiCard("Audio DSP Latency & Engine", "4.2 ms", "P99 < 8.1ms", "mint", "WebAudio YIN 48kHz • Zero Buffer Drops"));
  stack.appendChild(kpiRow);

  // ---------------------------------------------------------------------------
  // 3. USER DIRECTORY & TIER OVERRIDE (UC-23) (1356 x 370 px)
  // ---------------------------------------------------------------------------
  const userCard = figma.createFrame();
  userCard.name = "User Directory & Tier Override Card";
  userCard.layoutMode = "VERTICAL";
  userCard.resize(1356, 370);
  userCard.paddingLeft = 24; userCard.paddingRight = 24; userCard.paddingTop = 16; userCard.paddingBottom = 16;
  userCard.itemSpacing = 10;
  userCard.cornerRadius = 16;
  applyCard2Glass(userCard);

  const uHead = figma.createFrame();
  uHead.layoutMode = "HORIZONTAL"; uHead.resize(1308, 36);
  uHead.primaryAxisAlignItems = "SPACE_BETWEEN"; uHead.counterAxisAlignItems = "CENTER"; uHead.fills = [];
  uHead.appendChild(createText("User Directory & Tier Override (UC-23)", 13, "Bold", C.textWhite));

  const uSearch = figma.createFrame();
  uSearch.layoutMode = "HORIZONTAL"; uSearch.resize(320, 32); uSearch.cornerRadius = 6;
  uSearch.paddingLeft = 10; uSearch.paddingRight = 10; uSearch.itemSpacing = 8; uSearch.counterAxisAlignItems = "CENTER";
  uSearch.fills = solid(C.glassElevated, 1); uSearch.strokes = solid(C.glassBorder, 0.8); uSearch.strokeWeight = 1;
  uSearch.appendChild(createSvgIcon("search", "#8B9DAF", 13));
  uSearch.appendChild(createText("Search vocalists by name or email...", 11, "Regular", C.textZinc400));
  uHead.appendChild(uSearch);
  userCard.appendChild(uHead);

  // Table Column Headers with Fixed Column Cells
  function makeHeaderCell(title, width, align = "MIN") {
    const c = figma.createFrame();
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(width, 22);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = align;
    c.fills = [];
    c.appendChild(createText(title, 9, "Bold", C.textZinc500));
    return c;
  }

  const thRow = figma.createFrame();
  thRow.name = "Table Headers Row";
  thRow.layoutMode = "HORIZONTAL";
  thRow.resize(1308, 22);
  thRow.counterAxisAlignItems = "CENTER";
  thRow.paddingLeft = 16; thRow.paddingRight = 16;
  thRow.itemSpacing = 6;
  thRow.fills = [];

  thRow.appendChild(makeHeaderCell("VOCALIST / USER", 250));
  thRow.appendChild(makeHeaderCell("VOICE TYPE", 130));
  thRow.appendChild(makeHeaderCell("CURRENT MEMBERSHIP TIER", 145));
  thRow.appendChild(makeHeaderCell("SESSIONS LOGGED", 130));
  thRow.appendChild(makeHeaderCell("LIFETIME SPEND", 120));
  thRow.appendChild(makeHeaderCell("STATUS", 120));
  thRow.appendChild(makeHeaderCell("ADMIN ACTION (UC-23)", 360, "MAX"));
  userCard.appendChild(thRow);

  function makeTableCell(node, width, align = "MIN") {
    const c = figma.createFrame();
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(width, 40);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = align;
    c.fills = [];
    c.clipsContent = false;
    if (node) c.appendChild(node);
    return c;
  }

  // Table User Rows with Strict Column Grid Alignment
  function makeUserRow(name, email, voice, tier, tierVar, takes, spend, status, statVar, isSuspended = false) {
    const row = figma.createFrame();
    row.name = "User Row / " + name;
    row.layoutMode = "HORIZONTAL";
    row.resize(1308, 54);
    row.counterAxisAlignItems = "CENTER";
    row.paddingLeft = 16; row.paddingRight = 16;
    row.itemSpacing = 6;
    row.cornerRadius = 8;
    row.fills = solid(C.glassElevated, 0.85);
    row.strokes = solid(C.glassBorder, 0.4);
    row.strokeWeight = 1;

    // Col 1: Vocalist / User (250px)
    const uCol = figma.createFrame();
    uCol.layoutMode = "VERTICAL";
    uCol.resize(250, 36);
    uCol.itemSpacing = 2;
    uCol.fills = [];
    uCol.appendChild(createText(name, 12, "Bold", C.textWhite));
    uCol.appendChild(createText(email, 10, "Regular", C.textZinc400));
    row.appendChild(makeTableCell(uCol, 250));

    // Col 2: Voice Type (130px)
    row.appendChild(makeTableCell(createText(voice, 11, "Medium", C.textZinc300), 130));

    // Col 3: Membership Tier (145px)
    row.appendChild(makeTableCell(createBadge(tier, tierVar, 9), 145));

    // Col 4: Sessions Logged (130px)
    row.appendChild(makeTableCell(createText(takes, 11, "Medium", C.textWhite), 130));

    // Col 5: Lifetime Spend (120px)
    row.appendChild(makeTableCell(createText(spend, 11, "Bold", C.mint), 120));

    // Col 6: Status (120px)
    row.appendChild(makeTableCell(createBadge(status, statVar, 8), 120));

    // Col 7: Admin Actions (360px, right-aligned)
    const actCol = figma.createFrame();
    actCol.layoutMode = "HORIZONTAL";
    actCol.itemSpacing = 8;
    actCol.counterAxisAlignItems = "CENTER";
    actCol.primaryAxisAlignItems = "MAX";
    actCol.fills = [];
    if (isSuspended) {
      const btnUn = createActionButton("Unsuspend Account", null, "primary");
      btnUn.name = "User/Unsuspend " + name;
      actCol.appendChild(btnUn);
    } else {
      const btnEdit = createActionButton("Edit Tier", null, "secondary");
      btnEdit.name = "User/Edit Tier " + name;
      const btnAudit = createActionButton("Audit Logs", null, "secondary");
      btnAudit.name = "User/Audit Logs " + name;
      const btnSusp = createActionButton("Suspend", null, "danger");
      btnSusp.name = "User/Suspend " + name;
      actCol.appendChild(btnEdit);
      actCol.appendChild(btnAudit);
      actCol.appendChild(btnSusp);
    }
    row.appendChild(makeTableCell(actCol, 360, "MAX"));

    return row;
  }

  userCard.appendChild(makeUserRow("Ethan Reynolds", "ethan.singer@conservatory.edu", "Tenor (C2–A4)", "PRO VOCALIST", "mint", "48 takes (184m)", "Rp 237.000", "ACTIVE", "mint"));
  userCard.appendChild(makeUserRow("Siti Nurhaliza", "siti.vocalist@indonesia.art", "Soprano (A3–C6)", "PREMIUM STUDIO", "mint", "124 takes (490m)", "Rp 447.000", "ACTIVE", "mint"));
  userCard.appendChild(makeUserRow("Budi Santoso", "budi.santoso@gmail.com", "Baritone (A1–F4)", "FREE EXPLORER", "neutral", "3 takes (8m)", "Rp 0", "ACTIVE", "mint"));
  userCard.appendChild(makeUserRow("Alex Turner", "alex.turner@arctic.io", "Tenor (B2–G4)", "SUSPENDED", "rose", "1 take (2m)", "Rp 0", "SUSPENDED", "rose", true));

  stack.appendChild(userCard);

  // ---------------------------------------------------------------------------
  // 4. BOTTOM ENGINE TELEMETRY & LATENCY CURVE (1356 x 340 px)
  // ---------------------------------------------------------------------------
  const telemRow = figma.createFrame();
  telemRow.name = "Telemetry Bento Row";
  telemRow.layoutMode = "HORIZONTAL";
  telemRow.resize(1356, 340);
  telemRow.itemSpacing = 16;
  telemRow.fills = [];
  telemRow.clipsContent = false;

  // Card 1: WebAudio DSP Latency Telemetry (670 x 340 px) — PROFESSIONAL SVG SPLINE
  const dspCard = figma.createFrame();
  dspCard.name = "DSP Latency Telemetry Card";
  dspCard.layoutMode = "VERTICAL";
  dspCard.resize(670, 340);
  dspCard.paddingLeft = 22; dspCard.paddingRight = 22; dspCard.paddingTop = 18; dspCard.paddingBottom = 18;
  dspCard.itemSpacing = 12;
  dspCard.cornerRadius = 16;
  applyCard1Glass(dspCard);

  const dspHead = figma.createFrame();
  dspHead.layoutMode = "HORIZONTAL"; dspHead.resize(626, 24); dspHead.primaryAxisAlignItems = "SPACE_BETWEEN"; dspHead.counterAxisAlignItems = "CENTER"; dspHead.fills = [];
  dspHead.appendChild(createText("Real-Time WebAudio YIN Latency Telemetry (UC-24)", 13, "Bold", C.textWhite));
  dspHead.appendChild(createBadge("48,000 SAMPLES/SEC", "mint", 9));
  dspCard.appendChild(dspHead);

  // Latency Spline Area Canvas (626 x 190 px)
  const chartCanvas = figma.createFrame();
  chartCanvas.resize(626, 190);
  chartCanvas.cornerRadius = 10;
  chartCanvas.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.95);
  chartCanvas.strokes = solid({ r: 0.16, g: 0.20, b: 0.26 }, 1); chartCanvas.strokeWeight = 1;
  chartCanvas.clipsContent = true;

  // Horizontal latency threshold grid lines (2ms, 4ms, 6ms, 8ms)
  for (const [yPos, val] of [[35, "8ms (Threshold)"], [75, "6ms"], [115, "4ms (Target)"], [155, "2ms"]]) {
    const gl = figma.createLine();
    gl.resize(626, 0); gl.x = 0; gl.y = yPos;
    gl.strokes = solid(val.includes("Target") ? C.mint : C.glassBorder, val.includes("Target") ? 0.35 : 0.06);
    gl.strokeWeight = 1; gl.dashPattern = [4, 4];
    chartCanvas.appendChild(gl);

    const lbl = createText(val, 9, val.includes("Target") ? "Bold" : "Regular", val.includes("Target") ? C.mint : C.textZinc500);
    lbl.x = 12; lbl.y = yPos - 13;
    chartCanvas.appendChild(lbl);
  }

  // Smooth Latency Area Polygon
  const latArea = figma.createVector();
  latArea.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 20 120 C 70 115 120 130 170 118 C 220 106 270 125 320 115 C 370 105 420 112 470 110 C 520 108 570 116 610 112 L 610 190 L 20 190 Z"
  }];
  latArea.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.35 } },
      { position: 1.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.02 } }
    ]
  }];
  latArea.strokes = [];
  chartCanvas.appendChild(latArea);

  // Spline line
  const latLine = figma.createVector();
  latLine.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 20 120 C 70 115 120 130 170 118 C 220 106 270 125 320 115 C 370 105 420 112 470 110 C 520 108 570 116 610 112"
  }];
  latLine.fills = [];
  latLine.strokes = solid(C.mint, 1); latLine.strokeWeight = 2.5;
  chartCanvas.appendChild(latLine);

  // Time markers
  const timesRow = figma.createFrame();
  timesRow.layoutMode = "HORIZONTAL"; timesRow.resize(600, 16); timesRow.x = 14; timesRow.y = 168;
  timesRow.primaryAxisAlignItems = "SPACE_BETWEEN"; timesRow.fills = [];
  ["-60s", "-50s", "-40s", "-30s", "-20s", "-10s", "Live Now"].forEach(t => {
    timesRow.appendChild(createText(t, 9, t === "Live Now" ? "Bold" : "Regular", t === "Live Now" ? C.mint : C.textZinc500));
  });
  chartCanvas.appendChild(timesRow);
  dspCard.appendChild(chartCanvas);

  // Percentile Distribution Ticker
  const ticker = figma.createFrame();
  ticker.layoutMode = "HORIZONTAL"; ticker.resize(626, 24); ticker.primaryAxisAlignItems = "SPACE_BETWEEN"; ticker.counterAxisAlignItems = "CENTER"; ticker.fills = [];
  ticker.appendChild(createText("P50: 3.2 ms (Optimal)", 10, "Medium", C.mint));
  ticker.appendChild(createText("P90: 4.8 ms (Stable)", 10, "Medium", C.mint));
  ticker.appendChild(createText("P99: 7.4 ms (Sub-Threshold)", 10, "Medium", C.textZinc300));
  ticker.appendChild(createText("Buffer Underruns: 0.00%", 10, "Bold", C.mint));
  dspCard.appendChild(ticker);

  telemRow.appendChild(dspCard);

  // Card 2: Gemini AI Engine Telemetry (670 x 340 px)
  const gemCard = figma.createFrame();
  gemCard.name = "Gemini AI Engine Telemetry Card";
  gemCard.layoutMode = "VERTICAL";
  gemCard.resize(670, 340);
  gemCard.paddingLeft = 22; gemCard.paddingRight = 22; gemCard.paddingTop = 18; gemCard.paddingBottom = 18;
  gemCard.itemSpacing = 12;
  gemCard.cornerRadius = 16;
  applyCard2Glass(gemCard);

  const gmHead = figma.createFrame();
  gmHead.layoutMode = "HORIZONTAL"; gmHead.resize(626, 24); gmHead.primaryAxisAlignItems = "SPACE_BETWEEN"; gmHead.counterAxisAlignItems = "CENTER"; gmHead.fills = [];
  const gmLeft = figma.createFrame();
  gmLeft.layoutMode = "HORIZONTAL"; gmLeft.itemSpacing = 8; gmLeft.counterAxisAlignItems = "CENTER"; gmLeft.fills = [];
  gmLeft.appendChild(createSvgIcon("sparkle", "#00F5A0", 16));
  gmLeft.appendChild(createText("Gemini AI Multimodal Diagnostic Health (UC-24)", 13, "Bold", C.mint));
  gmHead.appendChild(gmLeft);
  gmHead.appendChild(createBadge("API UPTIME: 99.99%", "mint", 9));
  gemCard.appendChild(gmHead);

  function makeTelemRow(metric, val, status, color) {
    const r = figma.createFrame();
    r.layoutMode = "HORIZONTAL"; r.resize(626, 44);
    r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER";
    r.paddingLeft = 14; r.paddingRight = 14;
    r.cornerRadius = 8;
    r.fills = solid(C.glassElevated, 0.85);
    r.strokes = solid(C.glassBorder, 0.5); r.strokeWeight = 1;
    r.appendChild(createText(metric, 11, "Medium", C.textZinc300));

    const rRight = figma.createFrame();
    rRight.layoutMode = "HORIZONTAL"; rRight.itemSpacing = 10; rRight.counterAxisAlignItems = "CENTER"; rRight.fills = [];
    rRight.appendChild(createText(val, 12, "Bold", C.textWhite));
    rRight.appendChild(createBadge(status, color, 8));
    r.appendChild(rRight);
    return r;
  }

  gemCard.appendChild(makeTelemRow("Average Diagnostic Generation Latency", "180 ms", "Sub-Second", "mint"));
  gemCard.appendChild(makeTelemRow("Pedagogical Reasoning Accuracy Rate", "99.4%", "Calibrated", "mint"));
  gemCard.appendChild(makeTelemRow("Gemini 2.5 Flash Quota Remaining", "84.2%", "Healthy", "mint"));
  gemCard.appendChild(makeTelemRow("Regional Edge Cache Hit Rate", "92.8%", "Fast Edge", "mint"));

  // Cluster Memory & CPU Progress Bar
  const clusterBox = figma.createFrame();
  clusterBox.layoutMode = "VERTICAL"; clusterBox.itemSpacing = 6; clusterBox.resize(626, 42); clusterBox.fills = [];
  const cHeadRow = figma.createFrame(); cHeadRow.layoutMode = "HORIZONTAL"; cHeadRow.resize(626, 16); cHeadRow.primaryAxisAlignItems = "SPACE_BETWEEN"; cHeadRow.fills = [];
  cHeadRow.appendChild(createText("Cluster Memory Load (Jakarta Node)", 10, "Medium", C.textZinc400));
  cHeadRow.appendChild(createText("3.4 GB / 8.0 GB (42.5%)", 10, "Bold", C.mint));
  clusterBox.appendChild(cHeadRow);

  const cBar = figma.createFrame(); cBar.resize(626, 8); cBar.cornerRadius = 4; cBar.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  const cFill = figma.createFrame(); cFill.resize(266, 8); cFill.cornerRadius = 4; cFill.fills = solid(C.mint, 1);
  cBar.appendChild(cFill);
  clusterBox.appendChild(cBar);
  gemCard.appendChild(clusterBox);

  telemRow.appendChild(gemCard);
  stack.appendChild(telemRow);

  return root;
}
