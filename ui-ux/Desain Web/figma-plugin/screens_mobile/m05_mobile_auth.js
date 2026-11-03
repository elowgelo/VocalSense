// =============================================================================
// VOCALSENSE AI — M05. MOBILE AUTHENTICATION & CONSERVATORY LOGIN (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 05
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

function buildMobileAuthScreen() {
  const root = createMobileScreen("VocalSense AI — M05. Mobile Authentication", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/login", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header (Clean auth header with NO profile avatar/gear)
  const header = createMobileWebHeader("VocalSense AI", null, false);
  root.appendChild(header);

  // 3. Centered Content Container (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Auth Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 10;
  content.counterAxisAlignItems = "CENTER";
  content.fills = [];
  content.clipsContent = false;

  // --- Auth Card ---
  const authCard = makeMobileCard("Authentication Card", 14, 8);

  const brandRow = createFullRow(333, 6);
  const brandL = createAutoRow(6);
  brandL.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
  brandL.appendChild(createText("Sign In to Studio", 13, "Bold", C.textWhite));
  brandRow.appendChild(brandL);
  brandRow.appendChild(makePill("CONSERVATORY AUTH", C.mint, C.forestBase, C.mint, 7));
  authCard.appendChild(brandRow);

  authCard.appendChild(createParagraph("Sign in to access your bio-acoustic studio, pitch archives, and personalized AI vocal training syllabus.", 333, 8, "Regular", C.textZinc400, 12));

  // Google OAuth Button
  const btnGoogle = figma.createFrame();
  btnGoogle.name = "Btn/Google OAuth";
  btnGoogle.layoutMode = "HORIZONTAL";
  btnGoogle.resize(333, 34);
  btnGoogle.primaryAxisSizingMode = "FIXED";
  btnGoogle.counterAxisSizingMode = "FIXED";
  btnGoogle.cornerRadius = 6;
  btnGoogle.fills = solid(C.glassElevated, 1);
  btnGoogle.strokes = solid(C.glassBorder, 0.9);
  btnGoogle.strokeWeight = 1;
  btnGoogle.primaryAxisAlignItems = "CENTER";
  btnGoogle.counterAxisAlignItems = "CENTER";
  btnGoogle.itemSpacing = 8;
  btnGoogle.appendChild(createSvgIcon("globe", "#8B9DAF", 13));
  btnGoogle.appendChild(createText("Continue with Google", 9.5, "Medium", C.textWhite));
  authCard.appendChild(btnGoogle);

  // Divider
  const divRow = createFullRow(333, 6);
  const l1 = figma.createLine(); l1.resize(115, 0); l1.strokes = solid(C.glassBorder, 0.8);
  const l2 = figma.createLine(); l2.resize(115, 0); l2.strokes = solid(C.glassBorder, 0.8);
  divRow.appendChild(l1);
  divRow.appendChild(createText("or email", 8, "Regular", C.textZinc500));
  divRow.appendChild(l2);
  authCard.appendChild(divRow);

  // Email Field
  const emCol = createAutoCol(3);
  emCol.appendChild(createText("CONSERVATORY EMAIL", 7.5, "Bold", C.textZinc400));
  const emInput = figma.createFrame();
  emInput.resize(333, 32);
  emInput.cornerRadius = 6;
  emInput.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  emInput.strokes = solid(C.glassBorder, 0.8);
  emInput.strokeWeight = 1;
  emInput.paddingLeft = 10;
  emInput.paddingRight = 10;
  emInput.layoutMode = "HORIZONTAL";
  emInput.primaryAxisAlignItems = "MIN";
  emInput.counterAxisAlignItems = "CENTER";
  emInput.appendChild(createText("ethan.reynolds@conservatory.edu", 9, "Regular", C.textWhite));
  emCol.appendChild(emInput);
  authCard.appendChild(emCol);

  // Password Field
  const pwCol = createAutoCol(3);
  const pwHead = createFullRow(333, 6);
  pwHead.appendChild(createText("PASSWORD", 7.5, "Bold", C.textZinc400));
  pwHead.appendChild(createText("Forgot?", 8, "Bold", C.mint));
  pwCol.appendChild(pwHead);

  const pwInput = figma.createFrame();
  pwInput.resize(333, 32);
  pwInput.cornerRadius = 6;
  pwInput.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  pwInput.strokes = solid(C.glassBorder, 0.8);
  pwInput.strokeWeight = 1;
  pwInput.paddingLeft = 10;
  pwInput.paddingRight = 10;
  pwInput.layoutMode = "HORIZONTAL";
  pwInput.primaryAxisAlignItems = "MIN";
  pwInput.counterAxisAlignItems = "CENTER";
  pwInput.appendChild(createText("••••••••••••", 10, "Bold", C.textZinc400));
  pwCol.appendChild(pwInput);
  authCard.appendChild(pwCol);

  // Submit Button
  const btnSubmit = figma.createFrame();
  btnSubmit.name = "Btn/Sign In";
  btnSubmit.layoutMode = "HORIZONTAL";
  btnSubmit.resize(333, 34);
  btnSubmit.primaryAxisSizingMode = "FIXED";
  btnSubmit.counterAxisSizingMode = "FIXED";
  btnSubmit.cornerRadius = 6;
  btnSubmit.primaryAxisAlignItems = "CENTER";
  btnSubmit.counterAxisAlignItems = "CENTER";
  btnSubmit.fills = solid(C.mint, 1);
  btnSubmit.appendChild(createText("Sign In to VocalSense Studio ↗", 9.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  authCard.appendChild(btnSubmit);
  content.appendChild(authCard);

  // Demo Credentials Card
  const demoCard = makeMobileCard("Demo Credentials", 9, 3);
  const dcHead = createFullRow(333, 6);
  dcHead.appendChild(createText("DEMO CREDENTIALS", 7.5, "Bold", C.textZinc400));
  dcHead.appendChild(makePill("STUDIO READY", C.mint, C.forestBase, C.mint, 7));
  demoCard.appendChild(dcHead);
  demoCard.appendChild(createText("Role: Conservatory Tenor (Ethan Reynolds)", 8, "Medium", C.textWhite));
  demoCard.appendChild(createText("Password: any password works for dev mode", 7.5, "Regular", C.textZinc500));
  content.appendChild(demoCard);

  content.appendChild(createText("Protected by 256-bit TLS • WebAudio DSP Biometrics", 7.5, "Regular", C.textZinc600));

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}

module.exports = { buildMobileAuthScreen };
