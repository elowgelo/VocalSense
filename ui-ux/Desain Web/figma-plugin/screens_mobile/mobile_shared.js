// =============================================================================
// VOCALSENSE AI — MOBILE RESPONSIVE WEB DESIGN SYSTEM & SHARED COMPONENTS
// iPhone 15/16 Pro 393 × 852 px Viewport Standard
// 100% "11/12" FAITHFUL TO DESKTOP WEB APP (01_homepage.js & patokan.png)
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Circular Avatars, Zero Collision)
// =============================================================================

function createMobileScreen(name, height = 852) {
  const screen = figma.createFrame();
  screen.name = name;
  screen.resize(393, height);
  screen.cornerRadius = 44; // Authentic iPhone 15/16 Pro display corner radius
  screen.clipsContent = true;
  screen.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } }, // #0A0C10
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }  // #050608
    ]
  }];
  screen.strokes = solid(C.glassBorder, 0.8);
  screen.strokeWeight = 1.5;
  return screen;
}

// -----------------------------------------------------------------------------
// MOBILE WEB BROWSER CHROME (Authentic Mobile Safari / Chrome Top Bar)
// Immediately anchors the interface as RESPONSIVE WEB (11/12 identical to Desktop)
// Height: 70 px (y = 0 to 70)
// -----------------------------------------------------------------------------
function createMobileBrowserBar(urlPath = "/studio", dspStatus = "48kHz Active") {
  const bar = figma.createFrame();
  bar.name = "Mobile Web Browser Bar (Safari/Chrome)";
  bar.resize(393, 70);
  bar.x = 0;
  bar.y = 0;
  bar.layoutMode = "VERTICAL";
  bar.primaryAxisSizingMode = "FIXED";
  bar.counterAxisSizingMode = "FIXED";
  bar.primaryAxisAlignItems = "MIN";
  bar.counterAxisAlignItems = "CENTER";
  bar.paddingTop = 8;
  bar.paddingBottom = 4;
  bar.itemSpacing = 4;
  bar.fills = solid({ r: 0.03, g: 0.04, b: 0.06 }, 0.98);
  bar.strokes = solid(C.glassBorder, 0.6);
  bar.strokeWeight = 1;

  // Row 1: iOS Status Bar with Dynamic Island (y = 8..34, h = 26)
  const statusRow = figma.createFrame();
  statusRow.name = "iOS Status Bar";
  statusRow.layoutMode = "HORIZONTAL";
  statusRow.resize(393, 24);
  statusRow.primaryAxisSizingMode = "FIXED";
  statusRow.counterAxisSizingMode = "FIXED";
  statusRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  statusRow.counterAxisAlignItems = "CENTER";
  statusRow.paddingLeft = 24;
  statusRow.paddingRight = 24;
  statusRow.fills = [];

  // Left: Clock Time
  statusRow.appendChild(createText("9:41", 12, "Bold", C.textWhite));

  // Center: iPhone Dynamic Island Pill
  const island = figma.createFrame();
  island.name = "Dynamic Island";
  island.resize(92, 22);
  island.cornerRadius = 11;
  island.fills = solid({ r: 0, g: 0, b: 0 }, 1);
  island.strokes = solid(C.glassBorder, 0.5);
  island.strokeWeight = 1;
  island.layoutMode = "HORIZONTAL";
  island.primaryAxisAlignItems = "CENTER";
  island.counterAxisAlignItems = "CENTER";
  island.itemSpacing = 6;

  // Camera lens dot
  const lens = figma.createFrame();
  lens.resize(8, 8);
  lens.cornerRadius = 4;
  lens.fills = solid({ r: 0.08, g: 0.12, b: 0.18 }, 1);
  island.appendChild(lens);
  statusRow.appendChild(island);

  // Right: Cellular + WiFi + Battery
  const sysIcons = createAutoRow(5);
  sysIcons.appendChild(createSvgIcon("waveform", "#8B9DAF", 10)); // signal indicator
  const batt = figma.createFrame();
  batt.resize(19, 10);
  batt.cornerRadius = 3;
  batt.strokes = solid(C.textZinc400, 1);
  batt.strokeWeight = 1;
  batt.fills = [];
  batt.paddingLeft = 1;
  batt.paddingTop = 1;
  batt.paddingBottom = 1;
  batt.paddingRight = 1;
  const battFill = figma.createFrame();
  battFill.resize(14, 6);
  battFill.cornerRadius = 1.5;
  battFill.fills = solid(C.mint, 1);
  batt.appendChild(battFill);
  sysIcons.appendChild(batt);
  statusRow.appendChild(sysIcons);

  bar.appendChild(statusRow);

  // Row 2: Mobile Browser URL Address Pill (h = 28)
  const urlRow = figma.createFrame();
  urlRow.name = "Browser URL Pill";
  urlRow.layoutMode = "HORIZONTAL";
  urlRow.resize(361, 28);
  urlRow.primaryAxisSizingMode = "FIXED";
  urlRow.counterAxisSizingMode = "FIXED";
  urlRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  urlRow.counterAxisAlignItems = "CENTER";
  urlRow.paddingLeft = 10;
  urlRow.paddingRight = 10;
  urlRow.cornerRadius = 8;
  urlRow.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 0.9);
  urlRow.strokes = solid(C.glassBorder, 0.7);
  urlRow.strokeWeight = 1;

  // URL Left (Lock + Host + Path)
  const urlL = createAutoRow(6);
  urlL.appendChild(createSvgIcon("shield", "#8B9DAF", 10));
  const fullUrl = "app.vocalsense.ai" + (urlPath.startsWith("/") ? urlPath : ("/" + urlPath));
  urlL.appendChild(createText(fullUrl, 9, "Medium", C.textZinc300));
  urlRow.appendChild(urlL);

  // URL Right (Live WebAudio DSP Status Indicator)
  const urlR = createAutoRow(4);
  const dot = figma.createFrame();
  dot.resize(5, 5);
  dot.cornerRadius = 2.5;
  dot.fills = solid(C.mint, 1);
  urlR.appendChild(dot);
  urlR.appendChild(createText(dspStatus, 8, "Bold", C.mint));
  urlRow.appendChild(urlR);

  bar.appendChild(urlRow);
  return bar;
}

// -----------------------------------------------------------------------------
// iOS HOME INDICATOR BAR (Height: 14 px, y = 838 to 852)
// -----------------------------------------------------------------------------
function createMobileHomeIndicator() {
  const homeFrame = figma.createFrame();
  homeFrame.name = "iOS Home Indicator Container";
  homeFrame.resize(393, 14);
  homeFrame.x = 0;
  homeFrame.y = 838;
  homeFrame.layoutMode = "HORIZONTAL";
  homeFrame.primaryAxisAlignItems = "CENTER";
  homeFrame.counterAxisAlignItems = "CENTER";
  homeFrame.fills = [];

  const pill = figma.createFrame();
  pill.name = "Home Indicator Pill";
  pill.resize(134, 4);
  pill.cornerRadius = 2;
  pill.fills = solid(C.textWhite, 0.35);
  homeFrame.appendChild(pill);
  return homeFrame;
}

// -----------------------------------------------------------------------------
// MATHEMATICALLY PERFECT CIRCULAR AVATAR (100% Guaranteed Centered Text & Zero Oval)
// -----------------------------------------------------------------------------
function createCircularAvatar(size = 40, initials = "ER", strokeColor = C.mint, bgFill = C.forestBase, fontSize = null) {
  const frame = figma.createFrame();
  frame.name = "Avatar/" + initials;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisSizingMode = "FIXED";
  frame.counterAxisSizingMode = "FIXED";
  frame.resize(size, size);
  frame.cornerRadius = Math.round(size / 2); // Exact mathematical radius
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.32, b: 0.20, a: 1 } },
      { position: 1.0, color: { r: 0.05, g: 0.12, b: 0.18, a: 1 } }
    ]
  }];
  frame.strokes = solid(strokeColor, 0.9);
  frame.strokeWeight = size > 40 ? 2 : 1.5;

  const fSize = fontSize || Math.max(8, Math.round(size * 0.38));
  const txt = createText(initials, fSize, "Bold", strokeColor);
  txt.textAlignHorizontal = "CENTER";
  txt.textAlignVertical = "CENTER";
  frame.appendChild(txt);
  return frame;
}

// -----------------------------------------------------------------------------
// AVATAR STACK (Identical with patokan.png / coach cards & social proof)
// -----------------------------------------------------------------------------
function createAvatarStack(count = 4, label = "+1.4k singers trained today") {
  const row = createAutoRow(8);
  const stack = figma.createFrame();
  stack.name = "Avatar Stack Container";
  stack.resize(60, 20);
  stack.fills = [];

  const colors = [
    { r: 0.0, g: 0.96, b: 0.63 }, // Mint
    { r: 0.10, g: 0.72, b: 0.51 }, // Emerald
    { r: 0.23, g: 0.51, b: 0.96 }, // Blue
    { r: 0.96, g: 0.65, b: 0.14 }  // Amber
  ];

  for (let i = 0; i < Math.min(count, 4); i++) {
    const dot = figma.createFrame();
    dot.name = "Avatar/" + (i + 1);
    dot.resize(18, 18);
    dot.cornerRadius = 9;
    dot.x = i * 13;
    dot.y = 1;
    dot.fills = solid(colors[i], 1);
    dot.strokes = solid({ r: 0.04, g: 0.06, b: 0.08 }, 1);
    dot.strokeWeight = 1.5;
    stack.appendChild(dot);
  }
  row.appendChild(stack);
  row.appendChild(createText(label, 8, "Regular", C.textZinc400));
  return row;
}

// -----------------------------------------------------------------------------
// CENTERED ICON BUTTON (Crisp Squircle, Mathematically Centered)
// -----------------------------------------------------------------------------
function createCenteredIconButton(iconName, iconColor = "#8B9DAF", size = 28, iconSize = 14, cornerRadius = 7, bg = C.glassElevated, border = C.glassBorder) {
  const btn = figma.createFrame();
  btn.name = "Btn/" + iconName;
  btn.layoutMode = "HORIZONTAL";
  btn.primaryAxisSizingMode = "FIXED";
  btn.counterAxisSizingMode = "FIXED";
  btn.resize(size, size);
  btn.cornerRadius = cornerRadius;
  btn.fills = solid(bg, 1);
  btn.strokes = solid(border, 0.7);
  btn.strokeWeight = 1;
  btn.primaryAxisAlignItems = "CENTER";
  btn.counterAxisAlignItems = "CENTER";
  btn.paddingLeft = 0;
  btn.paddingRight = 0;
  btn.paddingTop = 0;
  btn.paddingBottom = 0;
  btn.appendChild(createSvgIcon(iconName, iconColor, iconSize));
  return btn;
}

// -----------------------------------------------------------------------------
// MOBILE WEB APP TOPBAR (Identik Header Web Desktop)
// Positioned safely under the browser bar at y = 70 (Height: 46 px, y = 70 to 116)
// Zero clipping from iPhone display corners!
// -----------------------------------------------------------------------------
function createMobileWebHeader(currentTitle = "Studio Workstation", backTarget = null, showProfile = true) {
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

  // Left Section
  const left = figma.createFrame();
  left.name = "Header Left";
  left.layoutMode = "HORIZONTAL";
  left.primaryAxisSizingMode = "AUTO";
  left.counterAxisSizingMode = "AUTO";
  left.itemSpacing = 8;
  left.counterAxisAlignItems = "CENTER";
  left.fills = [];

  if (backTarget) {
    const btnBack = figma.createFrame();
    btnBack.name = "Btn/Back";
    btnBack.layoutMode = "HORIZONTAL";
    btnBack.primaryAxisSizingMode = "AUTO";
    btnBack.counterAxisSizingMode = "AUTO";
    btnBack.paddingLeft = 8;
    btnBack.paddingRight = 8;
    btnBack.paddingTop = 4;
    btnBack.paddingBottom = 4;
    btnBack.cornerRadius = 6;
    btnBack.fills = solid(C.glassElevated, 1);
    btnBack.strokes = solid(C.glassBorder, 0.7);
    btnBack.strokeWeight = 1;
    btnBack.appendChild(createText("‹ " + backTarget, 9, "Medium", C.textZinc300));
    left.appendChild(btnBack);
  } else {
    // App Sparkle Logo Squircle (identik dock desktop)
    const logoSquircle = figma.createFrame();
    logoSquircle.name = "App Logo Squircle";
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
    left.appendChild(logoSquircle);
  }

  // Title
  left.appendChild(createText(currentTitle, 12, "Bold", C.textWhite));
  header.appendChild(left);

  // Right Section (Mic status + Settings + Profile chip)
  const right = figma.createFrame();
  right.name = "Header Right";
  right.layoutMode = "HORIZONTAL";
  right.primaryAxisSizingMode = "AUTO";
  right.counterAxisSizingMode = "AUTO";
  right.itemSpacing = 8;
  right.counterAxisAlignItems = "CENTER";
  right.fills = [];

  if (showProfile) {
    // Hardware indicator badge (Shure MV7 connected)
    const micBadge = figma.createFrame();
    micBadge.name = "Mic Hardware Badge";
    micBadge.layoutMode = "HORIZONTAL";
    micBadge.primaryAxisSizingMode = "AUTO";
    micBadge.counterAxisSizingMode = "AUTO";
    micBadge.paddingLeft = 6;
    micBadge.paddingRight = 6;
    micBadge.paddingTop = 3;
    micBadge.paddingBottom = 3;
    micBadge.cornerRadius = 5;
    micBadge.fills = solid(C.glassElevated, 1);
    micBadge.strokes = solid(C.glassBorder, 0.7);
    micBadge.strokeWeight = 1;
    micBadge.itemSpacing = 4;
    micBadge.counterAxisAlignItems = "CENTER";
    const dot = figma.createFrame();
    dot.resize(5, 5);
    dot.cornerRadius = 2.5;
    dot.fills = solid(C.mint, 1);
    micBadge.appendChild(dot);
    micBadge.appendChild(createText("Shure MV7", 8, "Bold", C.textZinc300));
    right.appendChild(micBadge);

    // Settings icon button
    const btnGear = createCenteredIconButton("settings", "#8B9DAF", 24, 12, 6);
    right.appendChild(btnGear);

    // User Avatar Chip ER (circular, 100% mathematically centered)
    const av = createCircularAvatar(24, "ER", C.mint, C.forestBase, 9);
    right.appendChild(av);
  }

  header.appendChild(right);
  return header;
}

// -----------------------------------------------------------------------------
// MOBILE WEB BOTTOM NAVIGATION DOCK (The Responsive Counterpart to Left DAW Sidebar)
// Height: 54 px (y = 784 to 838)
// -----------------------------------------------------------------------------
function createMobileBottomNav(activeTab = "studio") {
  const dock = figma.createFrame();
  dock.name = "Mobile Web Bottom Dock";
  dock.layoutMode = "HORIZONTAL";
  dock.resize(393, 54);
  dock.x = 0;
  dock.y = 784;
  dock.primaryAxisSizingMode = "FIXED";
  dock.counterAxisSizingMode = "FIXED";
  dock.primaryAxisAlignItems = "SPACE_AROUND";
  dock.counterAxisAlignItems = "CENTER";
  dock.paddingLeft = 12;
  dock.paddingRight = 12;
  dock.paddingTop = 4;
  dock.paddingBottom = 4;
  dock.fills = solid({ r: 0.04, g: 0.05, b: 0.08 }, 0.98);
  dock.strokes = solid(C.glassBorder, 0.8);
  dock.strokeWeight = 1;

  const tabs = [
    { id: "studio", icon: "home", label: "Studio" },
    { id: "reports", icon: "waveform", label: "Reports" },
    { id: "training", icon: "bar-chart", label: "Training" },
    { id: "archive", icon: "document", label: "Archive" },
    { id: "profile", isAvatar: true, label: "Profile" }
  ];

  for (const t of tabs) {
    const item = figma.createFrame();
    item.name = "Tab/" + t.label;
    item.layoutMode = "VERTICAL";
    item.primaryAxisSizingMode = "FIXED";
    item.counterAxisSizingMode = "FIXED";
    item.resize(58, 44);
    item.primaryAxisAlignItems = "CENTER";
    item.counterAxisAlignItems = "CENTER";
    item.itemSpacing = 2;
    const isActive = (activeTab === t.id);

    if (isActive) {
      item.fills = solid(C.forestBase, 0.65);
      item.cornerRadius = 8;
      item.strokes = solid(C.mint, 0.4);
      item.strokeWeight = 1;
    } else {
      item.fills = [];
    }

    if (t.isAvatar) {
      const av = createCircularAvatar(18, "ER", isActive ? C.mint : C.textZinc400, C.forestBase, 8);
      item.appendChild(av);
    } else {
      item.appendChild(createSvgIcon(t.icon, isActive ? C.mint : "#8B9DAF", 15));
    }

    item.appendChild(createText(t.label, 8, isActive ? "Bold" : "Medium", isActive ? C.mint : "#8B9DAF"));
    dock.appendChild(item);
  }

  return dock;
}

// -----------------------------------------------------------------------------
// MOBILE CARD HELPER (Width: 361 px, height HUGS content, NO OVERLAP)
// -----------------------------------------------------------------------------
function makeMobileCard(name, pad = 10, spacing = 6) {
  const card = figma.createFrame();
  card.name = name;
  card.layoutMode = "VERTICAL";
  card.resize(361, 30);
  card.counterAxisSizingMode = "FIXED"; // width fixed at 361
  card.primaryAxisSizingMode = "AUTO";  // height HUGS children!
  card.paddingLeft = pad;
  card.paddingRight = pad;
  card.paddingTop = pad;
  card.paddingBottom = pad;
  card.itemSpacing = spacing;
  card.cornerRadius = 10;
  card.fills = solid(C.glassElevated, 0.92);
  card.strokes = solid(C.glassBorder, 0.7);
  card.strokeWeight = 1;
  card.clipsContent = false;
  return card;
}

// -----------------------------------------------------------------------------
// PILL / BADGE BUILDER (Zero Emoji, Clean High-End Typography)
// -----------------------------------------------------------------------------
function makePill(text, textColor = C.mint, bgColor = C.forestBase, strokeColor = C.mint, fontSize = 8) {
  const p = figma.createFrame();
  p.layoutMode = "HORIZONTAL";
  p.primaryAxisSizingMode = "AUTO";
  p.counterAxisSizingMode = "AUTO";
  p.paddingLeft = 7;
  p.paddingRight = 7;
  p.paddingTop = 2.5;
  p.paddingBottom = 2.5;
  p.cornerRadius = 5;
  p.fills = solid(bgColor, 1);
  p.strokes = solid(strokeColor, 0.7);
  p.strokeWeight = 1;
  p.primaryAxisAlignItems = "CENTER";
  p.counterAxisAlignItems = "CENTER";
  p.appendChild(createText(text, fontSize, "Bold", textColor));
  return p;
}

// -----------------------------------------------------------------------------
// AUTO-LAYOUT ROW & COL UTILITIES (Anti-Truncation, Zero Collision)
// -----------------------------------------------------------------------------
function createAutoRow(spacing = 8) {
  const f = figma.createFrame();
  f.layoutMode = "HORIZONTAL";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = spacing;
  f.counterAxisAlignItems = "CENTER";
  f.fills = [];
  f.clipsContent = false;
  return f;
}

function createAutoCol(spacing = 4) {
  const f = figma.createFrame();
  f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = spacing;
  f.fills = [];
  f.clipsContent = false;
  return f;
}

function createFullRow(width = 341, spacing = 6) {
  const f = figma.createFrame();
  f.layoutMode = "HORIZONTAL";
  f.resize(width, 24);
  f.primaryAxisSizingMode = "FIXED";  // width fixed
  f.counterAxisSizingMode = "AUTO";   // height HUGS children
  f.itemSpacing = spacing;
  f.primaryAxisAlignItems = "SPACE_BETWEEN";
  f.counterAxisAlignItems = "CENTER";
  f.fills = [];
  f.clipsContent = false;
  return f;
}

module.exports = {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createCircularAvatar,
  createAvatarStack,
  createCenteredIconButton,
  createMobileWebHeader,
  createMobileBottomNav,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
};
