// =============================================================================
// VOCALSENSE AI — M06. MOBILE ACCOUNT SETTINGS & PREFERENCES (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 06
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

function buildMobileSettingsScreen() {
  const root = createMobileScreen("VocalSense AI — M06. Mobile Settings & Preferences", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/settings", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Account Settings", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Settings Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Profile Identity Card ---
  const profCard = makeMobileCard("User Profile Card", 10, 5);
  const pcRow = createFullRow(341, 8);
  const pcL = createAutoRow(10);

  // Centered circular avatar
  const av = createCircularAvatar(40, "ER", C.mint, C.forestBase, 14);
  pcL.appendChild(av);

  const pcTxt = createAutoCol(2);
  pcTxt.counterAxisSizingMode = "FIXED";
  pcTxt.resize(190, 34);
  pcTxt.appendChild(createText("Ethan Reynolds", 12, "Bold", C.textWhite));
  pcTxt.appendChild(createText("ethan.reynolds@conservatory.edu", 8, "Regular", C.textZinc400));
  pcL.appendChild(pcTxt);
  pcRow.appendChild(pcL);

  pcRow.appendChild(makePill("PRO ACTIVE", C.mint, C.forestBase, C.mint, 7));
  profCard.appendChild(pcRow);
  content.appendChild(profCard);

  // Helper for setting rows (Clean horizontal auto-layout)
  function makeSettingRow(iconName, title, desc, controlType, valueStr = "Enabled") {
    const row = createFullRow(341, 6);
    row.paddingTop = 2; row.paddingBottom = 2;
    const rL = createAutoRow(8);

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
    rL.appendChild(ic);

    const txt = createAutoCol(1);
    txt.counterAxisSizingMode = "FIXED";
    txt.resize(215, 24);
    txt.appendChild(createText(title, 8.5, "Bold", C.textWhite));
    txt.appendChild(createText(desc, 7, "Regular", C.textZinc400));
    rL.appendChild(txt);
    row.appendChild(rL);

    if (controlType === "toggle") {
      const tog = figma.createFrame();
      tog.resize(32, 17);
      tog.cornerRadius = 9;
      tog.fills = solid(valueStr === "ON" ? C.mint : { r: 0.14, g: 0.18, b: 0.24 }, 1);
      const thumb = figma.createFrame();
      thumb.resize(13, 13);
      thumb.cornerRadius = 6.5;
      thumb.x = valueStr === "ON" ? 17 : 2;
      thumb.y = 2;
      thumb.fills = solid({ r: 0.02, g: 0.12, b: 0.08 }, 1);
      tog.appendChild(thumb);
      row.appendChild(tog);
    } else {
      const chip = figma.createFrame();
      chip.layoutMode = "HORIZONTAL";
      chip.paddingLeft = 7; chip.paddingRight = 7; chip.paddingTop = 2.5; chip.paddingBottom = 2.5;
      chip.cornerRadius = 4;
      chip.fills = solid(C.glassElevated, 1);
      chip.strokes = solid(C.mint, 0.6);
      chip.strokeWeight = 1;
      chip.appendChild(createText(valueStr, 7.5, "Bold", C.mint));
      row.appendChild(chip);
    }
    return row;
  }

  // --- Security & Credentials Card ---
  const secCard = makeMobileCard("Security Card", 9, 4);
  const secHead = createFullRow(341, 6);
  secHead.appendChild(createText("SECURITY & CREDENTIALS", 8, "Bold", C.textZinc400));
  secHead.appendChild(makePill("2FA ON", C.mint, C.forestBase, C.mint, 7));
  secCard.appendChild(secHead);
  secCard.appendChild(makeSettingRow("shield", "Change Password", "Updated 42 days ago", "chip", "Update"));
  secCard.appendChild(makeSettingRow("shield", "Two-Factor Authentication", "TOTP Authenticator enabled", "toggle", "ON"));
  content.appendChild(secCard);

  // --- Audio DSP Engine Card ---
  const dspCard = makeMobileCard("Audio DSP Card", 9, 4);
  const dspHead = createFullRow(341, 6);
  dspHead.appendChild(createText("AUDIO DSP ENGINE", 8, "Bold", C.textZinc400));
  dspHead.appendChild(makePill("2.7ms LATENCY", C.mint, C.forestBase, C.mint, 7));
  dspCard.appendChild(dspHead);
  dspCard.appendChild(makeSettingRow("mic", "Input Microphone", "Studio USB Condenser (48kHz)", "chip", "Calibrated"));
  dspCard.appendChild(makeSettingRow("zap", "Audio Buffer & Latency", "64 samples zero-jitter buffer", "chip", "64 smp"));
  dspCard.appendChild(makeSettingRow("waveform", "Acoustic Noise Gate", "Filter ambient room resonance", "toggle", "ON"));
  content.appendChild(dspCard);

  // --- Vocal Biometrics Card ---
  const bioCard = makeMobileCard("Vocal Biometrics Card", 9, 4);
  const bioHead = createFullRow(341, 6);
  bioHead.appendChild(createText("VOCAL BIOMETRICS", 8, "Bold", C.textZinc400));
  bioHead.appendChild(makePill("A4 = 440 Hz", C.mint, C.forestBase, C.mint, 7));
  bioCard.appendChild(bioHead);
  bioCard.appendChild(makeSettingRow("user", "Voice Classification", "Tenor (C3–G5, Passaggio at F#4)", "chip", "Tenor"));
  bioCard.appendChild(makeSettingRow("waveform", "Real-Time Vibrato Sensing", "Track depth & rate in real-time", "toggle", "ON"));
  content.appendChild(bioCard);

  // --- Subscription Billing Card ---
  const subCard = makeMobileCard("Subscription Billing Card", 9, 4);
  const subHead = createFullRow(341, 6);
  subHead.appendChild(createText("SUBSCRIPTION & BILLING", 8, "Bold", C.textZinc400));
  subHead.appendChild(createText("Rp 79.000 / bln", 8, "Bold", C.mint));
  subCard.appendChild(subHead);
  subCard.appendChild(makeSettingRow("sparkle", "VocalSense Pro Member", "Renews Nov 14, 2026 via Midtrans", "chip", "Manage"));
  content.appendChild(subCard);

  // --- Logout Action ---
  const btnLogout = figma.createFrame();
  btnLogout.name = "Btn/Logout";
  btnLogout.layoutMode = "HORIZONTAL";
  btnLogout.resize(361, 30);
  btnLogout.primaryAxisSizingMode = "FIXED";
  btnLogout.counterAxisSizingMode = "FIXED";
  btnLogout.cornerRadius = 6;
  btnLogout.fills = solid(C.glassElevated, 1);
  btnLogout.strokes = solid(C.rose, 0.7);
  btnLogout.strokeWeight = 1;
  btnLogout.primaryAxisAlignItems = "CENTER";
  btnLogout.counterAxisAlignItems = "CENTER";
  btnLogout.appendChild(createText("Log Out Ethan Reynolds", 8.5, "Bold", C.rose));
  content.appendChild(btnLogout);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("profile");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileSettingsScreen };
