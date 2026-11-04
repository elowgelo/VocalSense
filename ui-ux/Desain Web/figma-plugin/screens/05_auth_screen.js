// =============================================================================
// VOCALSENSE AI — 05. AUTHENTICATION SYSTEM (SIGN IN & REGISTER)
// Dedicated, studio-grade authentication interface (1440 x 960 px)
// Covers UC-01 (Account Creation), UC-05 (Google OAuth SSO & Session Auth)
//
// ENHANCEMENTS:
//   - Dedicated Top Bar: "← Back to Homepage" neatly in top-left, Brand on right.
//   - Zero text overlap between headline and subtext (explicit line calculations).
//   - Zero text clipping on feature bullets (clean multi-line wrapping).
//   - Fixed 408x44px input fields with ample space for full email and password.
// =============================================================================

function buildAuthScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 05. Dedicated Authentication Screen";
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

  // Background grid
  const grid = figma.createFrame();
  grid.resize(1440, 960); grid.fills = []; grid.strokes = solid(C.gridLine, 0.035);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // Content Stack (Vertical, full page)
  const pageStack = figma.createFrame();
  pageStack.name = "Auth Page Stack";
  pageStack.layoutMode = "VERTICAL";
  pageStack.resize(1440, 960);
  pageStack.paddingLeft = 70; pageStack.paddingRight = 70;
  pageStack.paddingTop = 32; pageStack.paddingBottom = 40;
  pageStack.itemSpacing = 36;
  pageStack.fills = [];
  pageStack.clipsContent = false;
  root.appendChild(pageStack);

  // ---------------------------------------------------------------------------
  // 1. TOP BAR: "← Back to Homepage" on Top-Left + Brand Logo on Right
  // ---------------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Auth Top Bar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1300, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const backHome = figma.createFrame();
  backHome.name = "Button/Back to Homepage";
  backHome.layoutMode = "HORIZONTAL";
  backHome.primaryAxisSizingMode = "AUTO";
  backHome.counterAxisSizingMode = "AUTO";
  backHome.itemSpacing = 8;
  backHome.counterAxisAlignItems = "CENTER";
  backHome.paddingLeft = 14; backHome.paddingRight = 14; backHome.paddingTop = 8; backHome.paddingBottom = 8;
  backHome.cornerRadius = 8;
  backHome.fills = solid(C.glassElevated, 1);
  backHome.strokes = solid(C.glassBorder, 1);
  backHome.strokeWeight = 1;
  backHome.appendChild(createText("← Back to Homepage", 12, "Medium", C.textZinc300));
  topBar.appendChild(backHome);

  const brandGroup = figma.createFrame();
  brandGroup.name = "Brand Logo Group";
  brandGroup.layoutMode = "HORIZONTAL";
  brandGroup.primaryAxisSizingMode = "AUTO";
  brandGroup.counterAxisSizingMode = "AUTO";
  brandGroup.itemSpacing = 10;
  brandGroup.counterAxisAlignItems = "CENTER";
  brandGroup.fills = [];
  brandGroup.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  brandGroup.appendChild(createText("VocalSense AI", 18, "Bold", C.textWhite));
  brandGroup.appendChild(createBadge("SECURE CONSERVATORY AUTH", "mint", 9));
  topBar.appendChild(brandGroup);

  pageStack.appendChild(topBar);

  // ---------------------------------------------------------------------------
  // 2. TWO-COLUMN SPLIT: LEFT SHOWCASE (680px) + RIGHT AUTH CARD (500px)
  // ---------------------------------------------------------------------------
  const mainSplit = figma.createFrame();
  mainSplit.name = "Auth Main Split";
  mainSplit.fills = [];
  pageStack.appendChild(mainSplit);
  mainSplit.layoutMode = "HORIZONTAL";
  mainSplit.resize(1300, 780);
  mainSplit.itemSpacing = 80;
  mainSplit.primaryAxisAlignItems = "SPACE_BETWEEN";
  mainSplit.counterAxisAlignItems = "MIN";
  mainSplit.clipsContent = false;

  // ---------------------------------------------------------------------------
  // LEFT COLUMN: VALUE PROPOSITION & BIO-ACOUSTIC ENGINE
  // ---------------------------------------------------------------------------
  const leftCol = figma.createFrame();
  leftCol.name = "Left Showcase Column";
  leftCol.layoutMode = "VERTICAL";
  leftCol.resize(680, 760);
  leftCol.itemSpacing = 20;
  leftCol.fills = [];
  leftCol.clipsContent = false;

  leftCol.appendChild(createBadge("BIO-ACOUSTIC PITCH DIAGNOSTIC PLATFORM", "mint", 10));

  // Big Headline with ample room (auto-layout height)
  const titleBox = figma.createFrame();
  titleBox.layoutMode = "VERTICAL";
  titleBox.primaryAxisSizingMode = "AUTO";
  titleBox.counterAxisSizingMode = "AUTO";
  titleBox.itemSpacing = 12;
  titleBox.fills = [];

  const h1 = createParagraph("Step Into the Next Generation of Bio-Acoustic Vocal Intelligence.", 640, 32, "Bold", C.textWhite, 42);
  titleBox.appendChild(h1);

  const sub = createParagraph("Experience zero-latency WebAudio DSP pitch extraction, real-time formant tracking, and personalized Gemini AI pedagogical drills right in your browser.", 620, 13, "Regular", C.textZinc400, 22);
  titleBox.appendChild(sub);
  leftCol.appendChild(titleBox);

  // Frequency Wave Visual Box (640 x 160 px)
  const waveBox = figma.createFrame();
  waveBox.name = "Frequency Wave Visualizer";
  waveBox.resize(640, 160);
  waveBox.cornerRadius = 14;
  applyCard1Glass(waveBox);
  waveBox.clipsContent = true;

  for (let i = 0; i < 5; i++) {
    const wv = figma.createVector();
    const yStart = 50 + i * 16;
    const yMid = 75 + i * 10;
    const yEnd = 45 + i * 18;
    wv.vectorPaths = [{
      windingRule: "NONZERO",
      data: `M 0 ${yStart} C 150 ${35 + i * 14} 240 ${yMid} 330 ${yMid} C 420 ${yMid} 510 ${25 + i * 16} 640 ${yEnd}`
    }];
    wv.fills = [];
    wv.strokes = solid(C.mint, 0.2 + (i * 0.16));
    wv.strokeWeight = 1.5;
    waveBox.appendChild(wv);
  }

  const waveBadge = figma.createFrame();
  waveBadge.layoutMode = "HORIZONTAL"; waveBadge.itemSpacing = 8; waveBadge.counterAxisAlignItems = "CENTER";
  waveBadge.paddingLeft = 12; waveBadge.paddingRight = 12; waveBadge.paddingTop = 6; waveBadge.paddingBottom = 6;
  waveBadge.cornerRadius = 6; waveBadge.fills = solid(C.forestBase, 0.9);
  waveBadge.strokes = solid(C.mint, 0.5); waveBadge.strokeWeight = 1;
  waveBadge.x = 20; waveBadge.y = 114;
  const wDot = figma.createEllipse(); wDot.resize(6, 6); wDot.fills = solid(C.mint, 1);
  waveBadge.appendChild(wDot);
  waveBadge.appendChild(createText("YIN DSP 48kHz • Sub-Cent Resolution Active", 10, "Bold", C.mint));
  waveBox.appendChild(waveBadge);
  leftCol.appendChild(waveBox);

  // 3 Feature Bullet Points (Clean multi-line wrapping, ZERO CLIPPING!)
  const featCol = figma.createFrame();
  featCol.name = "Feature Bullets Group";
  featCol.layoutMode = "VERTICAL";
  featCol.itemSpacing = 14;
  featCol.fills = [];

  function makeBullet(title, desc) {
    const r = figma.createFrame();
    r.layoutMode = "HORIZONTAL";
    r.primaryAxisSizingMode = "FIXED";
    r.counterAxisSizingMode = "AUTO";
    r.resize(640, 56);
    r.itemSpacing = 14;
    r.counterAxisAlignItems = "MIN";
    r.fills = [];

    const iconB = figma.createFrame();
    iconB.resize(26, 26);
    iconB.cornerRadius = 6;
    iconB.fills = solid(C.forestBase, 1);
    iconB.strokes = solid(C.mint, 0.5);
    iconB.strokeWeight = 1;
    iconB.layoutMode = "HORIZONTAL";
    iconB.primaryAxisAlignItems = "CENTER";
    iconB.counterAxisAlignItems = "CENTER";
    iconB.appendChild(createSvgIcon("check", "#00F5A0", 12));
    r.appendChild(iconB);

    const tc = figma.createFrame();
    tc.layoutMode = "VERTICAL";
    tc.primaryAxisSizingMode = "AUTO";
    tc.counterAxisSizingMode = "FIXED";
    tc.resize(580, 48);
    tc.layoutGrow = 1;
    tc.itemSpacing = 2;
    tc.fills = [];
    tc.appendChild(createText(title, 12, "Bold", C.textWhite));
    tc.appendChild(createParagraph(desc, 580, 11, "Regular", C.textZinc400, 16));
    r.appendChild(tc);

    return r;
  }

  featCol.appendChild(makeBullet("Sub-Cent Pitch Precision", "Instant acoustic feedback on every note with mathematical YIN stability down to 0.1Hz."));
  featCol.appendChild(makeBullet("Gemini Multimodal Pedagogical AI", "Personalized vocal drills tailored to your exact passaggio anomalies and breath recovery."));
  featCol.appendChild(makeBullet("100% Client-Side WebAudio Privacy", "Zero-latency recording. Your raw vocal audio stays encrypted inside your browser."));
  leftCol.appendChild(featCol);

  mainSplit.appendChild(leftCol);

  // ---------------------------------------------------------------------------
  // RIGHT COLUMN: AUTHENTICATION CARD (500px wide)
  // ---------------------------------------------------------------------------
  const authCard = figma.createFrame();
  authCard.name = "Authentication Card";
  authCard.layoutMode = "VERTICAL";
  authCard.resize(500, 680);
  authCard.paddingLeft = 38; authCard.paddingRight = 38; authCard.paddingTop = 32; authCard.paddingBottom = 32;
  authCard.itemSpacing = 18;
  authCard.cornerRadius = 16;
  authCard.clipsContent = false;
  applyCard2Glass(authCard);

  // Tab Switcher: Sign In vs Create Account
  const tabRow = figma.createFrame();
  tabRow.layoutMode = "HORIZONTAL"; tabRow.resize(424, 42); tabRow.cornerRadius = 8;
  tabRow.fills = solid(C.glassElevated, 1); tabRow.strokes = solid(C.glassBorder, 0.6); tabRow.strokeWeight = 1;
  tabRow.paddingLeft = 4; tabRow.paddingRight = 4; tabRow.paddingTop = 4; tabRow.paddingBottom = 4;

  const tab1 = figma.createFrame();
  tab1.layoutMode = "HORIZONTAL"; tab1.resize(208, 34); tab1.cornerRadius = 6;
  tab1.fills = solid(C.forestBase, 1); tab1.strokes = solid(C.mint, 0.5); tab1.strokeWeight = 1;
  tab1.primaryAxisAlignItems = "CENTER"; tab1.counterAxisAlignItems = "CENTER";
  tab1.appendChild(createText("Sign In", 12, "Bold", C.mint));
  tabRow.appendChild(tab1);

  const tab2 = figma.createFrame();
  tab2.name = "Button/Create Free Account";
  tab2.layoutMode = "HORIZONTAL"; tab2.resize(208, 34); tab2.cornerRadius = 6; tab2.fills = [];
  tab2.primaryAxisAlignItems = "CENTER"; tab2.counterAxisAlignItems = "CENTER";
  tab2.appendChild(createText("Create Free Account", 12, "Medium", C.textZinc400));
  tabRow.appendChild(tab2);
  authCard.appendChild(tabRow);

  // Google OAuth SSO Button (UC-05)
  const btnGoogle = figma.createFrame();
  btnGoogle.name = "Button/Google SSO";
  btnGoogle.layoutMode = "HORIZONTAL"; btnGoogle.resize(424, 44);
  btnGoogle.primaryAxisAlignItems = "CENTER"; btnGoogle.counterAxisAlignItems = "CENTER";
  btnGoogle.itemSpacing = 10;
  btnGoogle.cornerRadius = 8;
  btnGoogle.fills = solid(C.glassElevated, 1);
  btnGoogle.strokes = solid(C.glassBorder, 1); btnGoogle.strokeWeight = 1;
  btnGoogle.appendChild(createSvgIcon("google", "#FFFFFF", 16));
  btnGoogle.appendChild(createText("Continue with Google", 13, "Bold", C.textWhite));
  authCard.appendChild(btnGoogle);

  // Divider: OR WITH EMAIL
  const divRow = figma.createFrame();
  divRow.layoutMode = "HORIZONTAL"; divRow.resize(424, 16);
  divRow.primaryAxisAlignItems = "CENTER"; divRow.counterAxisAlignItems = "CENTER"; divRow.itemSpacing = 12; divRow.fills = [];
  const line1 = figma.createLine(); line1.resize(136, 0); line1.strokes = solid(C.glassBorder, 0.2); line1.strokeWeight = 1;
  const line2 = figma.createLine(); line2.resize(136, 0); line2.strokes = solid(C.glassBorder, 0.2); line2.strokeWeight = 1;
  divRow.appendChild(line1);
  divRow.appendChild(createText("OR WITH EMAIL", 9, "Bold", C.textZinc500));
  divRow.appendChild(line2);
  authCard.appendChild(divRow);

  // Form Fields (Fixed 424 x 46 px, ample breathing room)
  function makeInput(label, placeholder, value = "") {
    const box = figma.createFrame();
    box.layoutMode = "VERTICAL"; box.itemSpacing = 6; box.fills = [];
    box.primaryAxisSizingMode = "AUTO"; box.counterAxisSizingMode = "AUTO";
    box.appendChild(createText(label, 11, "Medium", C.textZinc300));

    const input = figma.createFrame();
    input.layoutMode = "HORIZONTAL";
    input.primaryAxisSizingMode = "FIXED";
    input.counterAxisSizingMode = "FIXED";
    input.resize(424, 46);
    input.paddingLeft = 14; input.paddingRight = 14;
    input.counterAxisAlignItems = "CENTER";
    input.cornerRadius = 8;
    input.fills = solid(C.glassElevated, 1);
    input.strokes = solid(C.glassBorder, 1);
    input.strokeWeight = 1;
    input.appendChild(createText(value || placeholder, 12, value ? "Bold" : "Regular", value ? C.textWhite : C.textZinc500));
    box.appendChild(input);
    return box;
  }
  authCard.appendChild(makeInput("Conservatory / Personal Email", "vocalist@conservatory.edu", "ethan.singer@conservatory.edu"));
  authCard.appendChild(makeInput("Password", "••••••••••••", "••••••••••••••••"));

  // Options row: Remember Me + Forgot Password
  const optRow = figma.createFrame();
  optRow.layoutMode = "HORIZONTAL"; optRow.resize(424, 20);
  optRow.primaryAxisAlignItems = "SPACE_BETWEEN"; optRow.counterAxisAlignItems = "CENTER"; optRow.fills = [];
  const remLeft = figma.createFrame();
  remLeft.layoutMode = "HORIZONTAL"; remLeft.itemSpacing = 8; remLeft.counterAxisAlignItems = "CENTER"; remLeft.fills = [];
  
  const chk = figma.createFrame();
  chk.name = "Checkbox";
  chk.layoutMode = "HORIZONTAL";
  chk.primaryAxisSizingMode = "FIXED";
  chk.counterAxisSizingMode = "FIXED";
  chk.resize(16, 16);
  chk.cornerRadius = 4;
  chk.fills = solid(C.forestBase, 1);
  chk.strokes = solid(C.mint, 0.8);
  chk.strokeWeight = 1.5;
  chk.primaryAxisAlignItems = "CENTER";
  chk.counterAxisAlignItems = "CENTER";
  chk.appendChild(createSvgIcon("check", "#00F5A0", 10));
  remLeft.appendChild(chk);
  remLeft.appendChild(createText("Remember this session", 11, "Medium", C.textZinc400));
  optRow.appendChild(remLeft);
  optRow.appendChild(createText("Forgot password?", 11, "Medium", C.mint));
  authCard.appendChild(optRow);

  // Primary CTA Button
  const btnSubmit = createActionButton("Sign In to Studio ↗", "arrow-up-right", "radiant", 424);
  btnSubmit.name = "Button/Sign In to Studio";
  authCard.appendChild(btnSubmit);

  // Footer Note
  const footNote = figma.createFrame();
  footNote.layoutMode = "VERTICAL"; footNote.itemSpacing = 4; footNote.primaryAxisAlignItems = "CENTER"; footNote.counterAxisAlignItems = "CENTER"; footNote.resize(424, 36); footNote.fills = [];
  footNote.appendChild(createText("New to VocalSense? Start your 14-day conservatory trial.", 11, "Medium", C.textZinc400));
  footNote.appendChild(createText("By signing in, you agree to our Terms of Service & Privacy Policy.", 10, "Regular", C.textZinc500));
  authCard.appendChild(footNote);

  mainSplit.appendChild(authCard);

  return root;
}
