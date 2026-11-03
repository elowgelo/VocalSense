// =============================================================================
// VOCALSENSE AI — M07. MOBILE ADMINISTRATOR TELEMETRY CONSOLE (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 07
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
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

function buildMobileAdminScreen() {
  const root = createMobileScreen("VocalSense AI — M07. Mobile Admin Telemetry", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/admin/telemetry", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Admin Telemetry", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Admin Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Cluster Health Status Banner ---
  const statCard = makeMobileCard("Cluster Status Banner", 9, 4);
  const scRow = createFullRow(341, 6);
  const scL = createAutoRow(6);
  const dot = figma.createFrame();
  dot.resize(6, 6);
  dot.cornerRadius = 3;
  dot.fills = solid(C.mint, 1);
  scL.appendChild(dot);
  scL.appendChild(createText("All Systems Operational (99.98% Uptime)", 8.5, "Bold", C.mint));
  scRow.appendChild(scL);
  scRow.appendChild(makePill("AP-SOUTHEAST-3", C.mint, C.forestBase, C.mint, 7));
  statCard.appendChild(scRow);
  content.appendChild(statCard);

  // --- 4 KPI Metric Cards (2x2 Grid) ---
  const kpiRow1 = createFullRow(361, 6);
  const kpiRow2 = createFullRow(361, 6);

  function makeKpiCard(label, val, delta, isGood = true) {
    const k = figma.createFrame();
    k.layoutMode = "VERTICAL";
    k.resize(177, 44);
    k.primaryAxisSizingMode = "FIXED";
    k.counterAxisSizingMode = "FIXED";
    k.paddingLeft = 8;
    k.paddingRight = 8;
    k.paddingTop = 4;
    k.paddingBottom = 4;
    k.cornerRadius = 6;
    k.fills = solid(C.glassElevated, 1);
    k.strokes = solid(C.glassBorder, 0.7);
    k.strokeWeight = 1;
    k.itemSpacing = 1;

    k.appendChild(createText(label, 7, "Bold", C.textZinc400));
    k.appendChild(createText(val, 12, "Bold", C.textWhite));

    const dRow = createAutoRow(4);
    dRow.appendChild(createText(delta, 7.5, "Medium", isGood ? C.mint : C.rose));
    k.appendChild(dRow);
    return k;
  }

  kpiRow1.appendChild(makeKpiCard("ACTIVE VOCALISTS", "12,840", "+12.4% this week", true));
  kpiRow1.appendChild(makeKpiCard("DSP AUDIO LATENCY", "2.4 ms", "Zero jitter measured", true));
  content.appendChild(kpiRow1);

  kpiRow2.appendChild(makeKpiCard("GPU CLUSTER LOAD", "42%", "A100 Tensor Cluster", true));
  kpiRow2.appendChild(makeKpiCard("DAILY REVENUE", "Rp 18.4M", "Midtrans auto-settled", true));
  content.appendChild(kpiRow2);

  // --- Audio Engine Pipeline Health Card ---
  const pipeCard = makeMobileCard("Audio Pipeline Health", 9, 4);
  const pHead = createFullRow(341, 6);
  pHead.appendChild(createText("AUDIO PIPELINE TELEMETRY", 8, "Bold", C.textZinc400));
  pHead.appendChild(makePill("12 NODES HEALTHY", C.mint, C.forestBase, C.mint, 7));
  pipeCard.appendChild(pHead);

  function makeNodeRow(name, stat, ping) {
    const r = createFullRow(341, 6);
    r.paddingTop = 1; r.paddingBottom = 1;
    const rL = createAutoRow(6);
    const d = figma.createFrame(); d.resize(5, 5); d.cornerRadius = 2.5; d.fills = solid(C.mint, 1);
    rL.appendChild(d);
    rL.appendChild(createText(name, 8, "Bold", C.textWhite));
    r.appendChild(rL);

    const rR = createAutoRow(6);
    rR.appendChild(createText(stat, 7.5, "Regular", C.textZinc400));
    rR.appendChild(createText(ping, 7.5, "Bold", C.mint));
    r.appendChild(rR);
    return r;
  }

  pipeCard.appendChild(makeNodeRow("WebAudio Worklet Engine", "Streaming 48kHz", "1.8 ms"));
  pipeCard.appendChild(makeNodeRow("YIN Pitch Detection Worker", "Auto-scaled (8 instances)", "2.4 ms"));
  pipeCard.appendChild(makeNodeRow("Formant Q Acoustic Classifier", "GPU inference", "4.1 ms"));
  content.appendChild(pipeCard);

  // --- Active Vocal Sessions Real-Time Stream Card ---
  const sessCard = makeMobileCard("Live Vocalist Sessions", 9, 4);
  const seHead = createFullRow(341, 6);
  seHead.appendChild(createText("ACTIVE VOCAL SESSIONS", 8, "Bold", C.textZinc400));
  seHead.appendChild(createText("2,481 Live", 8, "Bold", C.mint));
  sessCard.appendChild(seHead);

  function makeSessRow(user, song, key, time) {
    const r = createFullRow(341, 6);
    r.paddingTop = 1; r.paddingBottom = 1;
    const rL = createAutoCol(1);
    rL.counterAxisSizingMode = "FIXED";
    rL.resize(240, 20);
    rL.appendChild(createText(user + " • " + song, 8, "Bold", C.textWhite));
    rL.appendChild(createText("Key: " + key + " • " + time, 7, "Regular", C.textZinc400));
    r.appendChild(rL);
    r.appendChild(makePill("REC", C.rose, { r: 0.25, g: 0.05, b: 0.08 }, C.rose, 6.5));
    return r;
  }

  sessCard.appendChild(makeSessRow("Ethan Reynolds", "Bohemian Rhapsody", "Bb Major", "00:42"));
  sessCard.appendChild(makeSessRow("Elena Rostova", "Queen of the Night", "F Major", "01:14"));
  content.appendChild(sessCard);

  // Purge Buffer Cache Button
  const btnPurge = figma.createFrame();
  btnPurge.name = "Btn/Purge DSP Cache";
  btnPurge.layoutMode = "HORIZONTAL";
  btnPurge.resize(361, 28);
  btnPurge.primaryAxisSizingMode = "FIXED";
  btnPurge.counterAxisSizingMode = "FIXED";
  btnPurge.cornerRadius = 6;
  btnPurge.primaryAxisAlignItems = "CENTER";
  btnPurge.counterAxisAlignItems = "CENTER";
  btnPurge.fills = solid(C.glassElevated, 1);
  btnPurge.strokes = solid(C.mint, 0.6);
  btnPurge.strokeWeight = 1;
  btnPurge.appendChild(createText("Purge Audio Worklet Buffer Cache", 8, "Bold", C.mint));
  content.appendChild(btnPurge);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("studio");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileAdminScreen };
