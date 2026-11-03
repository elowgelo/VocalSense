// =============================================================================
// VOCALSENSE AI — 05. AUTH & VOCALIST ONBOARDING SYSTEM
// Use Cases Covered:
//   - UC-01: Registrasi Akun Pengguna (Registration Form & Validation)
//   - UC-02: Masuk ke Sistem (Login Credentials)
//   - UC-03: Masuk via Google OAuth (SSO Integration)
//   - UC-04: Pemulihan Kata Sandi (Forgot Password Flow)
//   - UC-05: Mengelola Profil Vokal & Preferensi Bernyanyi (Voice Classification)
// =============================================================================

(async function () {
  try {
    if (figma.editorType === "dev") {
      try { figma.notify("Harap beralih ke Design Mode (tekan Shift + D)!", { timeout: 8000 }); } catch (e) {}
      return;
    }

    // 1. SAFE FONT LOADING
    const loadedStyles = new Set();
    for (const style of ["Regular", "Medium", "Semi Bold", "Bold"]) {
      try {
        await figma.loadFontAsync({ family: "Inter", style });
        loadedStyles.add(style);
      } catch (e) {}
    }
    if (!loadedStyles.has("Regular")) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      loadedStyles.add("Regular");
    }

    // 2. CURATED PALETTE (patokan.png)
    const C = {
      canvasTop:     { r: 0.038, g: 0.046, b: 0.062 }, // #0A0C10
      canvasBot:     { r: 0.018, g: 0.022, b: 0.030 }, // #050608
      gridLine:      { r: 1.0,   g: 1.0,   b: 1.0 },

      glassBg:        { r: 0.055, g: 0.063, b: 0.082 }, // #0E1015
      glassElevated:  { r: 0.078, g: 0.088, b: 0.118 }, // #14161E
      glassBorder:    { r: 1.0,   g: 1.0,   b: 1.0 },

      mint:          { r: 0.0,   g: 0.96,  b: 0.628 }, // #00F5A0 radiant emerald
      emerald:       { r: 0.063, g: 0.725, b: 0.506 }, // #10B981
      forestBase:    { r: 0.027, g: 0.165, b: 0.118 }, // #072A1E

      amber:         { r: 0.96,  g: 0.62,  b: 0.04 },  // #F59E0B
      rose:          { r: 0.957, g: 0.247, b: 0.369 }, // #F43F5E
      cyan:          { r: 0.024, g: 0.714, b: 0.831 }, // #06B6D4

      textWhite:     { r: 0.98,  g: 0.98,  b: 0.99 },
      textZinc300:   { r: 0.82,  g: 0.84,  b: 0.88 },
      textZinc400:   { r: 0.64,  g: 0.66,  b: 0.72 },
      textZinc500:   { r: 0.46,  g: 0.50,  b: 0.58 }
    };

    function solid(color, opacity = 1) {
      const clamped = Math.max(0, Math.min(1, typeof opacity === "number" ? opacity : 1));
      return [{ type: 'SOLID', color: { r: color.r, g: color.g, b: color.b }, opacity: clamped }];
    }

    function applyGlassEffects(frame, borderOpacity = 0.09, hasGreenBorder = false) {
      frame.strokes = solid(hasGreenBorder ? C.mint : C.glassBorder, hasGreenBorder ? 0.45 : borderOpacity);
      frame.strokeWeight = 1;
      try {
        frame.effects = [
          {
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: 0.50 },
            offset: { x: 0, y: 16 },
            radius: 36,
            spread: -4,
            visible: true,
            blendMode: "NORMAL",
            showShadowBehindNode: false
          },
          {
            type: 'INNER_SHADOW',
            color: { r: 1, g: 1, b: 1, a: hasGreenBorder ? 0.16 : 0.07 },
            offset: { x: 0, y: 1 },
            radius: 0,
            spread: 0,
            visible: true,
            blendMode: "NORMAL"
          }
        ];
      } catch (e) {}
    }

    function applyCard1Glass(frame) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0.5]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.00, g: 0.96, b: 0.63, a: 0.18 } },
          { position: 0.28, color: { r: 0.03, g: 0.16, b: 0.11, a: 0.72 } },
          { position: 0.65, color: { r: 0.055, g: 0.063, b: 0.082, a: 0.85 } },
          { position: 1.0,  color: { r: 0.034, g: 0.040, b: 0.052, a: 0.94 } }
        ]
      }];
      applyGlassEffects(frame, 0.10, false);
    }

    function applyCard2Glass(frame) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0, 1, 0], [-1, 0, 1]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.10, g: 0.13, b: 0.18, a: 0.78 } },
          { position: 0.24, color: { r: 0.035, g: 0.14, b: 0.10, a: 0.74 } },
          { position: 0.68, color: { r: 0.055, g: 0.065, b: 0.085, a: 0.84 } },
          { position: 1.0,  color: { r: 0.030, g: 0.036, b: 0.048, a: 0.92 } }
        ]
      }];
      applyGlassEffects(frame, 0.09, false);
    }

    function createText(chars, size = 13, weight = "Regular", color = C.textWhite, opacity = 1) {
      const actualSize = typeof size === "number" ? size : (parseInt(size, 10) || 13);
      const actualWeight = typeof weight === "string" ? weight : "Regular";
      const actualColor = (typeof color === "object" && color !== null && "r" in color) ? color : C.textWhite;

      const node = figma.createText();
      const styleToUse = loadedStyles.has(actualWeight) ? actualWeight : "Regular";
      node.fontName = { family: "Inter", style: styleToUse };
      node.characters = String(chars != null ? chars : "");
      node.fontSize = actualSize;
      node.fills = solid(actualColor, opacity);
      node.textAutoResize = "WIDTH_AND_HEIGHT";
      return node;
    }

    function createParagraph(chars, width, size = 13, weight = "Regular", color = C.textZinc400, lineHeight = 20, textAlign = "LEFT") {
      const node = figma.createText();
      const styleToUse = loadedStyles.has(weight) ? weight : "Regular";
      node.fontName = { family: "Inter", style: styleToUse };
      node.characters = String(chars != null ? chars : "");
      node.fontSize = size;
      node.lineHeight = { value: lineHeight, unit: "PIXELS" };
      node.fills = solid(color, 1);
      node.textAlignHorizontal = textAlign;
      node.textAutoResize = "NONE";
      node.resize(width, 10);
      node.textAutoResize = "HEIGHT";
      return node;
    }

    function createSvgIcon(type, colorHex = "#FFFFFF", size = 16) {
      try {
        let svgBody = "";
        if (type === "sparkle") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>`;
        } else if (type === "arrow-up-right") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
        } else if (type === "google") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`;
        } else if (type === "shield") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        } else if (type === "check") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><circle cx="12" cy="12" r="5"/></svg>`;
        }
        const node = figma.createNodeFromSvg(svgBody);
        node.name = "Icon/" + type;
        return node;
      } catch (e) {
        const fallback = figma.createFrame();
        fallback.resize(size, size);
        fallback.fills = [];
        return fallback;
      }
    }

    // STRICTLY NO CAPSULES: cornerRadius: 8, icon on LEFT!
    function createActionButton(label, iconType = null, variant = "secondary", width = null) {
      const btn = figma.createFrame();
      btn.name = "Button/" + label;
      btn.layoutMode = "HORIZONTAL";
      if (width) {
        btn.resize(width, 42);
        btn.primaryAxisAlignItems = "CENTER";
      } else {
        btn.primaryAxisSizingMode = "AUTO";
        btn.paddingLeft = 18; btn.paddingRight = 18;
      }
      btn.counterAxisSizingMode = "AUTO";
      btn.paddingTop = 11; btn.paddingBottom = 11;
      btn.itemSpacing = 8;
      btn.cornerRadius = 8;
      btn.counterAxisAlignItems = "CENTER";

      if (variant === "radiant") {
        btn.fills = [{
          type: 'GRADIENT_LINEAR',
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 1 } },
            { position: 1.0, color: { r: C.emerald.r, g: C.emerald.g, b: C.emerald.b, a: 1 } }
          ]
        }];
        btn.strokes = solid(C.mint, 0.9);
        btn.strokeWeight = 1;
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#04160F", 16));
        btn.appendChild(createText(label, 13, "Bold", { r: 0.02, g: 0.08, b: 0.05 }));
      } else if (variant === "primary") {
        btn.fills = solid(C.forestBase, 0.95);
        btn.strokes = solid(C.mint, 0.45);
        btn.strokeWeight = 1;
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#00F5A0", 15));
        btn.appendChild(createText(label, 13, "Bold", C.mint));
      } else {
        btn.fills = solid(C.glassElevated, 0.95);
        btn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
        btn.strokeWeight = 1;
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#A1A1AA", 15));
        btn.appendChild(createText(label, 13, "Medium", C.textZinc300));
      }
      return btn;
    }

    function createBadge(text, variant = "mint", size = 9) {
      const b = figma.createFrame();
      b.name = "Badge/" + text;
      b.layoutMode = "HORIZONTAL";
      b.primaryAxisSizingMode = "AUTO";
      b.counterAxisSizingMode = "AUTO";
      b.counterAxisAlignItems = "CENTER";
      b.paddingLeft = 8; b.paddingRight = 8; b.paddingTop = 3; b.paddingBottom = 3;
      b.cornerRadius = 6;

      if (variant === "mint") {
        b.fills = solid(C.forestBase, 1);
        b.strokes = solid(C.mint, 0.45);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Bold", C.mint));
      } else if (variant === "amber") {
        b.fills = solid({ r: 0.16, g: 0.10, b: 0.02 }, 1);
        b.strokes = solid(C.amber, 0.45);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Bold", C.amber));
      } else {
        b.fills = solid(C.glassElevated, 1);
        b.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Medium", C.textZinc300));
      }
      return b;
    }

    // -------------------------------------------------------------------------
    // BUILD SCREEN 5: AUTH & VOCALIST ONBOARDING SYSTEM (1440 x 900)
    // -------------------------------------------------------------------------
    function buildAuthScreen(originX = 0, originY = 0) {
      const root = figma.createFrame();
      root.name = "VocalSense AI — 05. Auth & Vocalist Onboarding System";
      root.resize(1440, 900);
      root.x = originX;
      root.y = originY;
      root.clipsContent = true;

      // Canvas gradient
      root.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0, 1, 0], [-1, 0, 1]],
        gradientStops: [
          { position: 0.0, color: { r: C.canvasTop.r, g: C.canvasTop.g, b: C.canvasTop.b, a: 1 } },
          { position: 1.0, color: { r: C.canvasBot.r, g: C.canvasBot.g, b: C.canvasBot.b, a: 1 } }
        ]
      }];

      // Background grid
      const grid = figma.createFrame();
      grid.resize(1440, 900); grid.fills = []; grid.strokes = solid(C.gridLine, 0.035);
      grid.strokeWeight = 1; grid.dashPattern = [2, 6];
      root.appendChild(grid);

      // Main Split Layout Container
      const mainContainer = figma.createFrame();
      mainContainer.layoutMode = "HORIZONTAL";
      mainContainer.resize(1440, 900);
      mainContainer.paddingLeft = 70;
      mainContainer.paddingRight = 70;
      mainContainer.paddingTop = 40;
      mainContainer.paddingBottom = 40;
      mainContainer.itemSpacing = 50;
      mainContainer.primaryAxisAlignItems = "SPACE_BETWEEN";
      mainContainer.counterAxisAlignItems = "CENTER";
      mainContainer.fills = [];
      mainContainer.clipsContent = false;

      // -----------------------------------------------------------------------
      // LEFT PANEL: BRAND & BIO-ACOUSTIC SHOWCASE (580 x 820)
      // -----------------------------------------------------------------------
      const leftPanel = figma.createFrame();
      leftPanel.layoutMode = "VERTICAL";
      leftPanel.resize(580, 820);
      leftPanel.itemSpacing = 24;
      leftPanel.fills = [];
      leftPanel.clipsContent = false;

      // Brand Logo & Return
      const logoRow = figma.createFrame();
      logoRow.name = "Brand Logo / Return to Homepage";
      logoRow.layoutMode = "HORIZONTAL"; logoRow.itemSpacing = 14; logoRow.counterAxisAlignItems = "CENTER"; logoRow.fills = [];
      logoRow.appendChild(createSvgIcon("sparkle", "#00F5A0", 22));
      logoRow.appendChild(createText("VocalSense AI", 20, "Bold", C.textWhite));

      const backHomeBtn = figma.createFrame();
      backHomeBtn.name = "Button/Return to Homepage";
      backHomeBtn.layoutMode = "HORIZONTAL"; backHomeBtn.itemSpacing = 6; backHomeBtn.counterAxisAlignItems = "CENTER";
      backHomeBtn.paddingLeft = 10; backHomeBtn.paddingRight = 10; backHomeBtn.paddingTop = 4; backHomeBtn.paddingBottom = 4;
      backHomeBtn.cornerRadius = 6; backHomeBtn.fills = solid(C.glassElevated, 1);
      backHomeBtn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); backHomeBtn.strokeWeight = 1;
      backHomeBtn.appendChild(createText("← Back to Home", 10, "Medium", C.textZinc400));
      logoRow.appendChild(backHomeBtn);

      leftPanel.appendChild(logoRow);

      leftPanel.appendChild(createBadge("BIO-ACOUSTIC PITCH DIAGNOSTIC PLATFORM", "mint", 10));

      leftPanel.appendChild(createParagraph("Step Into the Next Generation of Bio-Acoustic Vocal Intelligence.", 540, 32, "Bold", C.textWhite, 40));
      leftPanel.appendChild(createParagraph("Experience zero-latency WebAudio DSP pitch extraction, real-time formant tracking, and personalized Gemini AI pedagogical drills right in your browser.", 520, 13, "Regular", C.textZinc400, 22));

      // Frequency Wave Visual Box (540 x 200 px)
      const waveBox = figma.createFrame();
      waveBox.resize(540, 200);
      waveBox.cornerRadius = 14;
      applyCard1Glass(waveBox);
      waveBox.clipsContent = true;

      // Floating wave lines (Cubic Bezier: M and C only)
      for (let i = 0; i < 5; i++) {
        const wv = figma.createVector();
        const yStart = 70 + i * 20;
        const yMid = 100 + i * 10;
        const yEnd = 60 + i * 22;
        wv.vectorPaths = [{
          windingRule: "NONZERO",
          data: "M 0 " + yStart + " C 130 " + (40 + i * 15) + " 200 " + yMid + " 270 " + yMid + " C 340 " + yMid + " 420 " + (30 + i * 18) + " 540 " + yEnd
        }];
        wv.strokes = solid(C.mint, 0.2 + (i * 0.15));
        wv.strokeWeight = 1.5;
        waveBox.appendChild(wv);
      }

      const waveBadge = figma.createFrame();
      waveBadge.layoutMode = "HORIZONTAL"; waveBadge.itemSpacing = 8; waveBadge.counterAxisAlignItems = "CENTER";
      waveBadge.paddingLeft = 12; waveBadge.paddingRight = 12; waveBadge.paddingTop = 6; waveBadge.paddingBottom = 6;
      waveBadge.cornerRadius = 6; waveBadge.fills = solid(C.forestBase, 0.9);
      waveBadge.strokes = solid(C.mint, 0.5); waveBadge.strokeWeight = 1;
      waveBadge.x = 20; waveBadge.y = 148;
      const wDot = figma.createEllipse(); wDot.resize(6, 6); wDot.fills = solid(C.mint, 1);
      waveBadge.appendChild(wDot);
      waveBadge.appendChild(createText("WebAudio YIN Engine • 48,000 Samples / sec", 10, "Bold", C.mint));
      waveBox.appendChild(waveBadge);
      leftPanel.appendChild(waveBox);

      // 3 Architectural Highlights
      function makeHighlightRow(title, sub) {
        const h = figma.createFrame();
        h.layoutMode = "HORIZONTAL"; h.itemSpacing = 12; h.counterAxisAlignItems = "CENTER"; h.fills = [];
        const checkIcon = figma.createFrame();
        checkIcon.resize(22, 22); checkIcon.cornerRadius = 6;
        checkIcon.fills = solid(C.forestBase, 1); checkIcon.strokes = solid(C.mint, 0.6); checkIcon.strokeWeight = 1;
        checkIcon.layoutMode = "HORIZONTAL"; checkIcon.primaryAxisAlignItems = "CENTER"; checkIcon.counterAxisAlignItems = "CENTER";
        checkIcon.appendChild(createSvgIcon("check", "#00F5A0", 12));
        h.appendChild(checkIcon);

        const col = figma.createFrame();
        col.layoutMode = "VERTICAL"; col.itemSpacing = 2; col.fills = [];
        col.appendChild(createText(title, 12, "Bold", C.textWhite));
        col.appendChild(createText(sub, 10, "Regular", C.textZinc400));
        h.appendChild(col);
        return h;
      }
      leftPanel.appendChild(makeHighlightRow("Sub-Cent Intonation Precision", "Accurate pitch tracking down to ±1 cent with microtonal variance detection."));
      leftPanel.appendChild(makeHighlightRow("Gemini Multimodal Pedagogical Advice", "Personalized daily vocal drills tailored to your unique anatomical range."));
      leftPanel.appendChild(makeHighlightRow("100% Client-Side Privacy First", "DSP calculations occur inside your browser. Audio stems never saved without permission."));

      mainContainer.appendChild(leftPanel);

      // -----------------------------------------------------------------------
      // RIGHT CARD: AUTH & VOCAL ONBOARDING (670 x 820)
      // Covers UC-01, UC-02, UC-03, UC-04, UC-05
      // -----------------------------------------------------------------------
      const authCard = figma.createFrame();
      authCard.name = "Auth & Onboarding Card";
      authCard.layoutMode = "VERTICAL";
      authCard.resize(670, 820);
      authCard.paddingLeft = 32; authCard.paddingRight = 32; authCard.paddingTop = 26; authCard.paddingBottom = 26;
      authCard.itemSpacing = 14;
      authCard.cornerRadius = 18;
      authCard.clipsContent = false;
      applyCard2Glass(authCard);

      // Top Tab Switcher: Sign In vs Create Account
      const tabRow = figma.createFrame();
      tabRow.layoutMode = "HORIZONTAL";
      tabRow.resize(606, 42);
      tabRow.paddingLeft = 4; tabRow.paddingRight = 4; tabRow.paddingTop = 4; tabRow.paddingBottom = 4;
      tabRow.cornerRadius = 8;
      tabRow.fills = solid(C.glassElevated, 1);
      tabRow.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); tabRow.strokeWeight = 1;

      const tab1 = figma.createFrame();
      tab1.layoutMode = "HORIZONTAL"; tab1.resize(299, 34); tab1.primaryAxisAlignItems = "CENTER"; tab1.counterAxisAlignItems = "CENTER";
      tab1.cornerRadius = 6; tab1.fills = solid(C.forestBase, 1); tab1.strokes = solid(C.mint, 0.45); tab1.strokeWeight = 1;
      tab1.appendChild(createText("Create Free Account (UC-01)", 12, "Bold", C.mint));
      tabRow.appendChild(tab1);

      const tab2 = figma.createFrame();
      tab2.layoutMode = "HORIZONTAL"; tab2.resize(299, 34); tab2.primaryAxisAlignItems = "CENTER"; tab2.counterAxisAlignItems = "CENTER";
      tab2.cornerRadius = 6; tab2.fills = [];
      tab2.appendChild(createText("Sign In (UC-02)", 12, "Medium", C.textZinc400));
      tabRow.appendChild(tab2);

      authCard.appendChild(tabRow);

      // Google SSO Button (UC-03)
      const googleBtn = figma.createFrame();
      googleBtn.layoutMode = "HORIZONTAL";
      googleBtn.resize(606, 42);
      googleBtn.primaryAxisAlignItems = "CENTER";
      googleBtn.counterAxisAlignItems = "CENTER";
      googleBtn.itemSpacing = 10;
      googleBtn.cornerRadius = 8;
      googleBtn.fills = solid(C.glassElevated, 1);
      googleBtn.strokes = solid({ r: 0.22, g: 0.26, b: 0.32 }, 1); googleBtn.strokeWeight = 1;
      googleBtn.appendChild(createSvgIcon("google", "#FFFFFF", 18));
      googleBtn.appendChild(createText("Continue with Google (UC-03 SSO)", 12, "Bold", C.textWhite));
      authCard.appendChild(googleBtn);

      // Divider
      const divRow = figma.createFrame();
      divRow.layoutMode = "HORIZONTAL"; divRow.resize(606, 16);
      divRow.primaryAxisAlignItems = "SPACE_BETWEEN"; divRow.counterAxisAlignItems = "CENTER"; divRow.fills = [];
      const divLine1 = figma.createLine(); divLine1.resize(240, 0); divLine1.strokes = solid(C.glassBorder, 0.1); divLine1.strokeWeight = 1; divRow.appendChild(divLine1);
      divRow.appendChild(createText("Or enter email", 10, "Regular", C.textZinc500));
      const divLine2 = figma.createLine(); divLine2.resize(240, 0); divLine2.strokes = solid(C.glassBorder, 0.1); divLine2.strokeWeight = 1; divRow.appendChild(divLine2);
      authCard.appendChild(divRow);

      // Form Field Helper
      function makeInputField(label, placeholder, value = "") {
        const f = figma.createFrame();
        f.layoutMode = "VERTICAL"; f.resize(606, 62); f.itemSpacing = 5; f.fills = [];
        f.appendChild(createText(label, 11, "Medium", C.textZinc300));
        const input = figma.createFrame();
        input.layoutMode = "HORIZONTAL"; input.resize(606, 38); input.counterAxisAlignItems = "CENTER";
        input.paddingLeft = 12; input.paddingRight = 12;
        input.cornerRadius = 8;
        input.fills = solid(C.glassElevated, 0.9);
        input.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); input.strokeWeight = 1;
        input.appendChild(createText(value || placeholder, 11, value ? "Bold" : "Regular", value ? C.textWhite : C.textZinc500));
        f.appendChild(input);
        return f;
      }

      authCard.appendChild(makeInputField("Full Name", "e.g. Ethan Reynolds", "Ethan Reynolds"));
      authCard.appendChild(makeInputField("Conservatory / Personal Email (UC-01)", "name@example.com", "ethan.singer@conservatory.edu"));

      // Password Field with Real-Time Strength Meter
      const passGroup = figma.createFrame();
      passGroup.layoutMode = "VERTICAL"; passGroup.resize(606, 80); passGroup.itemSpacing = 5; passGroup.fills = [];
      const passLabelRow = figma.createFrame();
      passLabelRow.layoutMode = "HORIZONTAL"; passLabelRow.resize(606, 16); passLabelRow.primaryAxisAlignItems = "SPACE_BETWEEN"; passLabelRow.fills = [];
      passLabelRow.appendChild(createText("Create Password", 11, "Medium", C.textZinc300));
      passLabelRow.appendChild(createText("Forgot Password? (UC-04)", 10, "Medium", C.mint));
      passGroup.appendChild(passLabelRow);

      const passInput = figma.createFrame();
      passInput.layoutMode = "HORIZONTAL"; passInput.resize(606, 38); passInput.counterAxisAlignItems = "CENTER";
      passInput.paddingLeft = 12; passInput.paddingRight = 12;
      passInput.cornerRadius = 8;
      passInput.fills = solid(C.glassElevated, 0.9);
      passInput.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); passInput.strokeWeight = 1;
      passInput.appendChild(createText("••••••••••••••••", 14, "Bold", C.textWhite));
      passGroup.appendChild(passInput);

      // Password strength bar
      const pStrRow = figma.createFrame();
      pStrRow.layoutMode = "HORIZONTAL"; pStrRow.resize(606, 14); pStrRow.primaryAxisAlignItems = "SPACE_BETWEEN"; pStrRow.counterAxisAlignItems = "CENTER"; pStrRow.fills = [];
      const pBar = figma.createFrame();
      pBar.resize(440, 4); pBar.cornerRadius = 2; pBar.fills = solid(C.mint, 1);
      pStrRow.appendChild(pBar);
      pStrRow.appendChild(createText("Strong (Entropy 84b)", 9, "Bold", C.mint));
      passGroup.appendChild(pStrRow);
      authCard.appendChild(passGroup);

      // VOCAL PROFILE QUESTIONNAIRE (UC-05)
      const qGroup = figma.createFrame();
      qGroup.layoutMode = "VERTICAL"; qGroup.resize(606, 150); qGroup.itemSpacing = 8; qGroup.fills = [];
      qGroup.appendChild(createText("Vocal Profile & Voice Classification Setup (UC-05)", 11, "Bold", C.mint));

      // Voice Type Chips
      const voiceRow = figma.createFrame();
      voiceRow.layoutMode = "HORIZONTAL"; voiceRow.resize(606, 32); voiceRow.itemSpacing = 6; voiceRow.fills = [];
      const voiceTypes = [
        { label: "Soprano", active: false },
        { label: "Mezzo", active: false },
        { label: "Alto", active: false },
        { label: "Tenor", active: true },
        { label: "Baritone", active: false },
        { label: "Bass", active: false }
      ];
      voiceTypes.forEach(vt => {
        const chip = figma.createFrame();
        chip.layoutMode = "HORIZONTAL"; chip.paddingLeft = 14; chip.paddingRight = 14; chip.paddingTop = 6; chip.paddingBottom = 6;
        chip.cornerRadius = 6;
        chip.fills = solid(vt.active ? C.forestBase : C.glassElevated, vt.active ? 1 : 0.8);
        chip.strokes = solid(vt.active ? C.mint : { r: 0.18, g: 0.22, b: 0.28 }, vt.active ? 0.9 : 0.3); chip.strokeWeight = 1;
        chip.appendChild(createText(vt.label, 10, vt.active ? "Bold" : "Medium", vt.active ? C.mint : C.textZinc300));
        voiceRow.appendChild(chip);
      });
      qGroup.appendChild(voiceRow);

      // Primary Musical Genre Chips
      const genreRow = figma.createFrame();
      genreRow.layoutMode = "HORIZONTAL"; genreRow.resize(606, 32); genreRow.itemSpacing = 6; genreRow.fills = [];
      const genres = [
        { label: "Pop", active: false },
        { label: "Classical", active: false },
        { label: "R&B / Soul", active: true },
        { label: "Rock", active: false },
        { label: "Jazz", active: false },
        { label: "Musical Theater", active: false }
      ];
      genres.forEach(g => {
        const chip = figma.createFrame();
        chip.layoutMode = "HORIZONTAL"; chip.paddingLeft = 12; chip.paddingRight = 12; chip.paddingTop = 6; chip.paddingBottom = 6;
        chip.cornerRadius = 6;
        chip.fills = solid(g.active ? C.forestBase : C.glassElevated, g.active ? 1 : 0.8);
        chip.strokes = solid(g.active ? C.mint : { r: 0.18, g: 0.22, b: 0.28 }, g.active ? 0.9 : 0.3); chip.strokeWeight = 1;
        chip.appendChild(createText(g.label, 10, g.active ? "Bold" : "Medium", g.active ? C.mint : C.textZinc300));
        genreRow.appendChild(chip);
      });
      qGroup.appendChild(genreRow);

      // Hardware mic preview
      const hwRow = figma.createFrame();
      hwRow.layoutMode = "HORIZONTAL"; hwRow.resize(606, 34);
      hwRow.primaryAxisAlignItems = "SPACE_BETWEEN"; hwRow.counterAxisAlignItems = "CENTER";
      hwRow.paddingLeft = 12; hwRow.paddingRight = 12;
      hwRow.cornerRadius = 6;
      hwRow.fills = solid(C.glassElevated, 1);
      hwRow.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); hwRow.strokeWeight = 1;
      const hwLeft = figma.createFrame();
      hwLeft.layoutMode = "HORIZONTAL"; hwLeft.itemSpacing = 8; hwLeft.counterAxisAlignItems = "CENTER"; hwLeft.fills = [];
      const hDot = figma.createEllipse(); hDot.resize(6, 6); hDot.fills = solid(C.mint, 1); hwLeft.appendChild(hDot);
      hwLeft.appendChild(createText("Microphone: Shure MV7 USB Dynamic (48kHz)", 10, "Medium", C.textZinc300));
      hwRow.appendChild(hwLeft);
      hwRow.appendChild(createBadge("CALIBRATE MIC", "neutral", 8));
      qGroup.appendChild(hwRow);

      authCard.appendChild(qGroup);

      // Main CTA: Register & Calibrate Studio
      authCard.appendChild(createActionButton("Create Free Account & Calibrate Studio (UC-01)", "arrow-up-right", "radiant", 606));

      // Legal & Trust
      const footLegal = figma.createFrame();
      footLegal.layoutMode = "HORIZONTAL"; footLegal.resize(606, 18);
      footLegal.primaryAxisAlignItems = "CENTER"; footLegal.counterAxisAlignItems = "CENTER"; footLegal.fills = [];
      footLegal.appendChild(createText("By registering, you agree to our Terms of Service & Privacy Policy.", 10, "Regular", C.textZinc500));
      authCard.appendChild(footLegal);

      mainContainer.appendChild(authCard);
      root.appendChild(mainContainer);

      return root;
    }

    // -------------------------------------------------------------------------
    // EXECUTION
    // -------------------------------------------------------------------------
    const existing = figma.currentPage.children.filter(c => 
      c.name.startsWith("VocalSense AI — 05. Auth & Vocalist")
    );
    existing.forEach(n => n.remove());

    const screen4 = figma.currentPage.children.find(c => 
      c.name.startsWith("VocalSense AI — 04. Vocalist Training Center")
    );
    const screen3 = figma.currentPage.children.find(c => 
      c.name.startsWith("VocalSense AI — 03. Diagnostic Singing Report")
    );
    const prev = screen4 || screen3;
    const ox = prev ? prev.x + prev.width + 120 : 0;
    const oy = prev ? prev.y : 0;

    const screen = buildAuthScreen(ox, oy);
    figma.currentPage.selection = [screen];
    figma.viewport.scrollAndZoomIntoView([screen]);
    figma.notify("Screen 05: Auth & Vocalist Onboarding System generated successfully!", { timeout: 4000 });
  } catch (err) {
    console.error(err);
    try { figma.notify("Error: " + (err && err.message ? err.message : String(err)), { error: true }); } catch (e) {}
  }
})();
