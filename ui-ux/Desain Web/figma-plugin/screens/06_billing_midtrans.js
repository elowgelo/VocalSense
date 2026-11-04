// =============================================================================
// VOCALSENSE AI — 06. ACCOUNT, BILLING & MIDTRANS PAYMENT MODAL
// Use Cases Covered:
//   - UC-21: Memilih Paket dan Membayar Langganan (Midtrans Snap Payment UI)
//   - UC-22: Melihat Riwayat Tagihan dan Mengelola Langganan (Invoices & Quota)
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
        } else if (type === "lock") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        } else if (type === "download") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
        } else if (type === "check") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (type === "qr") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
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
        btn.resize(width, 40);
        btn.primaryAxisAlignItems = "CENTER";
      } else {
        btn.primaryAxisSizingMode = "AUTO";
        btn.paddingLeft = 16; btn.paddingRight = 16;
      }
      btn.counterAxisSizingMode = "AUTO";
      btn.paddingTop = 10; btn.paddingBottom = 10;
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
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#04160F", 14));
        btn.appendChild(createText(label, 12, "Bold", { r: 0.02, g: 0.08, b: 0.05 }));
      } else if (variant === "primary") {
        btn.fills = solid(C.forestBase, 0.95);
        btn.strokes = solid(C.mint, 0.45);
        btn.strokeWeight = 1;
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#00F5A0", 14));
        btn.appendChild(createText(label, 12, "Bold", C.mint));
      } else {
        btn.fills = solid(C.glassElevated, 0.95);
        btn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
        btn.strokeWeight = 1;
        if (iconType) btn.appendChild(createSvgIcon(iconType, "#A1A1AA", 14));
        btn.appendChild(createText(label, 12, "Medium", C.textZinc300));
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
    // BUILD SCREEN 6: ACCOUNT, BILLING & MIDTRANS PAYMENT MODAL (1440 x 960)
    // -------------------------------------------------------------------------
    function buildBillingScreen(originX = 0, originY = 0) {
      const root = figma.createFrame();
      root.name = "VocalSense AI — 06. Account, Billing & Midtrans Payment Modal";
      root.resize(1440, 960);
      root.x = originX;
      root.y = originY;
      root.clipsContent = true;

      // Dark gradient canvas
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
      grid.resize(1440, 960); grid.fills = []; grid.strokes = solid(C.gridLine, 0.035);
      grid.strokeWeight = 1; grid.dashPattern = [2, 6];
      root.appendChild(grid);

      // Stack
      const stack = figma.createFrame();
      stack.name = "Billing Stack";
      stack.layoutMode = "VERTICAL";
      stack.resize(1440, 960);
      stack.paddingLeft = 42;
      stack.paddingRight = 42;
      stack.paddingTop = 18;
      stack.paddingBottom = 24;
      stack.itemSpacing = 16;
      stack.fills = [];
      stack.clipsContent = false;

      // -----------------------------------------------------------------------
      // 1. TOP HEADER (1356 x 48)
      // -----------------------------------------------------------------------
      const topBar = figma.createFrame();
      topBar.layoutMode = "HORIZONTAL";
      topBar.resize(1356, 48);
      topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
      topBar.counterAxisAlignItems = "CENTER";
      topBar.fills = [];

      const bLeft = figma.createFrame();
      bLeft.layoutMode = "HORIZONTAL"; bLeft.itemSpacing = 10; bLeft.counterAxisAlignItems = "CENTER"; bLeft.fills = [];
      bLeft.appendChild(createSvgIcon("sparkle", "#00F5A0", 18));
      bLeft.appendChild(createText("VocalSense AI", 15, "Bold", C.textWhite));
      bLeft.appendChild(createBadge("ACCOUNT & BILLING", "mint", 9));
      topBar.appendChild(bLeft);

      // Nav Tabs
      const navTabs = figma.createFrame();
      navTabs.layoutMode = "HORIZONTAL"; navTabs.itemSpacing = 6; navTabs.fills = [];
      navTabs.appendChild(createBadge("Overview", "neutral", 9));
      navTabs.appendChild(createBadge("Singing Takes", "neutral", 9));
      navTabs.appendChild(createBadge("Billing & Subscriptions (Active)", "mint", 9));
      navTabs.appendChild(createBadge("Hardware I/O", "neutral", 9));
      topBar.appendChild(navTabs);

      const bRight = figma.createFrame();
      bRight.layoutMode = "HORIZONTAL"; bRight.itemSpacing = 10; bRight.counterAxisAlignItems = "CENTER"; bRight.fills = [];
      bRight.appendChild(createText("Ethan Reynolds (Tenor)", 12, "Medium", C.textZinc300));
      bRight.appendChild(createBadge("PRO ACTIVE", "mint", 9));
      topBar.appendChild(bRight);

      stack.appendChild(topBar);

      // -----------------------------------------------------------------------
      // 2. MAIN WORKSPACE (SPLIT: LEFT 520px + RIGHT MIDTRANS 820px = 1356px)
      // -----------------------------------------------------------------------
      const splitRow = figma.createFrame();
      splitRow.layoutMode = "HORIZONTAL";
      splitRow.resize(1356, 850);
      splitRow.itemSpacing = 16;
      splitRow.fills = [];
      splitRow.clipsContent = false;

      // -----------------------------------------------------------------------
      // LEFT SECTION: SUBSCRIPTION & INVOICE HISTORY (UC-22) (520 x 850)
      // -----------------------------------------------------------------------
      const leftCol = figma.createFrame();
      leftCol.layoutMode = "VERTICAL";
      leftCol.resize(520, 850);
      leftCol.itemSpacing = 16;
      leftCol.fills = [];
      leftCol.clipsContent = false;

      // Card 1: Current Plan Summary (520 x 390 px)
      const planCard = figma.createFrame();
      planCard.name = "Plan Summary Card";
      planCard.layoutMode = "VERTICAL";
      planCard.resize(520, 390);
      planCard.paddingLeft = 24; planCard.paddingRight = 24; planCard.paddingTop = 20; planCard.paddingBottom = 20;
      planCard.itemSpacing = 12;
      planCard.cornerRadius = 16;
      planCard.clipsContent = false;
      applyCard1Glass(planCard);

      const plHead = figma.createFrame();
      plHead.layoutMode = "HORIZONTAL"; plHead.resize(472, 24); plHead.primaryAxisAlignItems = "SPACE_BETWEEN"; plHead.counterAxisAlignItems = "CENTER"; plHead.fills = [];
      plHead.appendChild(createText("Current Membership Status", 13, "Bold", C.textWhite));
      plHead.appendChild(createBadge("AUTO-RENEW ACTIVE", "mint", 9));
      planCard.appendChild(plHead);

      const prcRow = figma.createFrame();
      prcRow.layoutMode = "HORIZONTAL"; prcRow.itemSpacing = 8; prcRow.counterAxisAlignItems = "CENTER"; prcRow.fills = [];
      prcRow.appendChild(createText("Rp 79.000", 30, "Bold", C.textWhite));
      prcRow.appendChild(createText("/ month (Pro Vocalist)", 12, "Medium", C.mint));
      planCard.appendChild(prcRow);

      planCard.appendChild(createParagraph("Billed monthly via Midtrans. Next scheduled payment: 14 November 2026.", 472, 11, "Regular", C.textZinc400, 16));

      // Quota progress bar
      const qBox = figma.createFrame();
      qBox.layoutMode = "VERTICAL"; qBox.resize(472, 60); qBox.itemSpacing = 6; qBox.fills = [];
      const qTop = figma.createFrame();
      qTop.layoutMode = "HORIZONTAL"; qTop.resize(472, 16); qTop.primaryAxisAlignItems = "SPACE_BETWEEN"; qTop.fills = [];
      qTop.appendChild(createText("Cloud Audio Storage Quota", 11, "Medium", C.textZinc300));
      qTop.appendChild(createText("4.2 GB / 10 GB (42 Takes)", 11, "Bold", C.mint));
      qBox.appendChild(qTop);
      const qBar = figma.createFrame();
      qBar.resize(472, 6); qBar.cornerRadius = 3; qBar.fills = solid(C.glassElevated, 1);
      const qFill = figma.createFrame();
      qFill.resize(200, 6); qFill.cornerRadius = 3; qFill.fills = solid(C.mint, 1);
      qBar.appendChild(qFill);
      qBox.appendChild(qBar);
      planCard.appendChild(qBox);

      // Feature bullet points
      function makePerkItem(txt) {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL"; row.itemSpacing = 8; row.counterAxisAlignItems = "CENTER"; row.fills = [];
        row.appendChild(createSvgIcon("check", "#00F5A0", 12));
        row.appendChild(createText(txt, 11, "Medium", C.textZinc300));
        return row;
      }
      planCard.appendChild(makePerkItem("60-Second continuous studio takes (WebAudio 48kHz)"));
      planCard.appendChild(makePerkItem("Gemini AI multimodal coaching & weekly curriculum"));
      planCard.appendChild(makePerkItem("Interactive Note-Sync piano roll with stem playback"));
      planCard.appendChild(makePerkItem("Lossless WAV & Official Conservatory PDF export"));

      leftCol.appendChild(planCard);

      // Card 2: Billing & Invoice History Table (UC-22) (520 x 444 px)
      const invCard = figma.createFrame();
      invCard.name = "Invoice History Card";
      invCard.layoutMode = "VERTICAL";
      invCard.resize(520, 444);
      invCard.paddingLeft = 24; invCard.paddingRight = 24; invCard.paddingTop = 18; invCard.paddingBottom = 18;
      invCard.itemSpacing = 12;
      invCard.cornerRadius = 16;
      invCard.clipsContent = false;
      applyCard2Glass(invCard);

      const invHead = figma.createFrame();
      invHead.layoutMode = "HORIZONTAL"; invHead.resize(472, 24); invHead.primaryAxisAlignItems = "SPACE_BETWEEN"; invHead.counterAxisAlignItems = "CENTER"; invHead.fills = [];
      invHead.appendChild(createText("Billing History & Tax Invoices (UC-22)", 13, "Bold", C.textWhite));
      invHead.appendChild(createBadge("MIDTRANS SNAP", "neutral", 9));
      invCard.appendChild(invHead);

      function makeInvoiceRow(date, invNo, amount, status = "Paid") {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL"; row.resize(472, 54);
        row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER";
        row.paddingLeft = 12; row.paddingRight = 12;
        row.cornerRadius = 8;
        row.fills = solid(C.glassElevated, 0.85);
        row.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); row.strokeWeight = 1;

        const leftCol = figma.createFrame();
        leftCol.layoutMode = "VERTICAL"; leftCol.itemSpacing = 2; leftCol.fills = [];
        const topRow = figma.createFrame();
        topRow.layoutMode = "HORIZONTAL"; topRow.itemSpacing = 6; topRow.counterAxisAlignItems = "CENTER"; topRow.fills = [];
        topRow.appendChild(createText(invNo, 11, "Bold", C.textWhite));
        topRow.appendChild(createBadge(status, "mint", 8));
        leftCol.appendChild(topRow);
        leftCol.appendChild(createText(date + " • Pro Vocalist (1 Month)", 10, "Medium", C.textZinc400));
        row.appendChild(leftCol);

        const rightCol = figma.createFrame();
        rightCol.layoutMode = "HORIZONTAL"; rightCol.itemSpacing = 10; rightCol.counterAxisAlignItems = "CENTER"; rightCol.fills = [];
        rightCol.appendChild(createText(amount, 11, "Bold", C.mint));
        rightCol.appendChild(createActionButton("PDF", "download", "secondary"));
        row.appendChild(rightCol);

        return row;
      }

      invCard.appendChild(makeInvoiceRow("14 Oct 2026", "#VS-INV-2026-1014", "Rp 87.690"));
      invCard.appendChild(makeInvoiceRow("14 Sep 2026", "#VS-INV-2026-0914", "Rp 87.690"));
      invCard.appendChild(makeInvoiceRow("14 Aug 2026", "#VS-INV-2026-0814", "Rp 87.690"));
      invCard.appendChild(makeInvoiceRow("14 Jul 2026", "#VS-INV-2026-0714", "Rp 87.690"));

      leftCol.appendChild(invCard);
      splitRow.appendChild(leftCol);

      // -----------------------------------------------------------------------
      // RIGHT SECTION: ACTIVE MIDTRANS SNAP MODAL (UC-21) (820 x 850)
      // -----------------------------------------------------------------------
      const midtransModal = figma.createFrame();
      midtransModal.name = "Midtrans Snap Payment Modal";
      midtransModal.layoutMode = "VERTICAL";
      midtransModal.resize(820, 850);
      midtransModal.paddingLeft = 32; midtransModal.paddingRight = 32; midtransModal.paddingTop = 24; midtransModal.paddingBottom = 24;
      midtransModal.itemSpacing = 16;
      midtransModal.cornerRadius = 18;
      midtransModal.clipsContent = false;
      applyCard1Glass(midtransModal);

      // Midtrans Gateway Header
      const mdHead = figma.createFrame();
      mdHead.layoutMode = "HORIZONTAL"; mdHead.resize(756, 36);
      mdHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mdHead.counterAxisAlignItems = "CENTER"; mdHead.fills = [];

      const mdLeft = figma.createFrame();
      mdLeft.layoutMode = "HORIZONTAL"; mdLeft.itemSpacing = 10; mdLeft.counterAxisAlignItems = "CENTER"; mdLeft.fills = [];
      mdLeft.appendChild(createSvgIcon("lock", "#00F5A0", 18));
      const mdCol = figma.createFrame();
      mdCol.layoutMode = "VERTICAL"; mdCol.itemSpacing = 2; mdCol.fills = [];
      mdCol.appendChild(createText("Midtrans Snap Payment Gateway (UC-21)", 14, "Bold", C.textWhite));
      mdCol.appendChild(createText("Official Bank Indonesia Licensed Payment Infrastructure", 10, "Regular", C.textZinc400));
      mdLeft.appendChild(mdCol);
      mdHead.appendChild(mdLeft);

      const mdRight = figma.createFrame();
      mdRight.layoutMode = "HORIZONTAL"; mdRight.itemSpacing = 10; mdRight.counterAxisAlignItems = "CENTER"; mdRight.fills = [];
      mdRight.appendChild(createBadge("256-BIT SSL SECURE", "mint", 9));

      const closeBtn = figma.createFrame();
      closeBtn.name = "Button/Close Modal";
      closeBtn.layoutMode = "HORIZONTAL"; closeBtn.itemSpacing = 4; closeBtn.counterAxisAlignItems = "CENTER";
      closeBtn.paddingLeft = 8; closeBtn.paddingRight = 8; closeBtn.paddingTop = 4; closeBtn.paddingBottom = 4;
      closeBtn.cornerRadius = 6; closeBtn.fills = solid(C.glassElevated, 1);
      closeBtn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); closeBtn.strokeWeight = 1;
      closeBtn.appendChild(createText("Close", 10, "Bold", C.rose));
      mdRight.appendChild(closeBtn);

      mdHead.appendChild(mdRight);
      midtransModal.appendChild(mdHead);

      // Order Summary Card
      const orderBox = figma.createFrame();
      orderBox.layoutMode = "VERTICAL"; orderBox.resize(756, 100);
      orderBox.paddingLeft = 16; orderBox.paddingRight = 16; orderBox.paddingTop = 12; orderBox.paddingBottom = 12;
      orderBox.itemSpacing = 6;
      orderBox.cornerRadius = 10;
      orderBox.fills = solid(C.glassElevated, 0.9);
      orderBox.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); orderBox.strokeWeight = 1;

      function makeOrderRow(item, price, isTotal = false) {
        const r = figma.createFrame();
        r.layoutMode = "HORIZONTAL"; r.resize(724, 20);
        r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER"; r.fills = [];
        r.appendChild(createText(item, isTotal ? 12 : 11, isTotal ? "Bold" : "Regular", isTotal ? C.textWhite : C.textZinc300));
        r.appendChild(createText(price, isTotal ? 14 : 11, "Bold", isTotal ? C.mint : C.textWhite));
        return r;
      }
      orderBox.appendChild(makeOrderRow("VocalSense AI — Pro Vocalist Plan (1 Month)", "Rp 79.000"));
      orderBox.appendChild(makeOrderRow("PPN (Pajak Pertambahan Nilai 11%)", "Rp 8.690"));
      const divO = figma.createLine(); divO.resize(724, 0); divO.strokes = solid(C.glassBorder, 0.1); divO.strokeWeight = 1; orderBox.appendChild(divO);
      orderBox.appendChild(makeOrderRow("TOTAL TAGIHAN (IDR)", "Rp 87.690", true));
      midtransModal.appendChild(orderBox);

      // Payment Method Tabs
      const payTabs = figma.createFrame();
      payTabs.layoutMode = "HORIZONTAL"; payTabs.resize(756, 40); payTabs.itemSpacing = 8; payTabs.fills = [];
      payTabs.appendChild(createBadge("QRIS (All Indonesian E-Wallets)", "mint", 10));
      payTabs.appendChild(createBadge("GoPay Deeplink", "neutral", 10));
      payTabs.appendChild(createBadge("BCA Virtual Account", "neutral", 10));
      payTabs.appendChild(createBadge("Mandiri Bill", "neutral", 10));
      midtransModal.appendChild(payTabs);

      // QRIS Main Payment Container (756 x 440 px)
      const qrisBox = figma.createFrame();
      qrisBox.layoutMode = "HORIZONTAL"; qrisBox.resize(756, 440);
      qrisBox.paddingLeft = 24; qrisBox.paddingRight = 24; qrisBox.paddingTop = 20; qrisBox.paddingBottom = 20;
      qrisBox.itemSpacing = 24;
      qrisBox.cornerRadius = 14;
      qrisBox.fills = solid(C.forestBase, 0.5);
      qrisBox.strokes = solid(C.mint, 0.45); qrisBox.strokeWeight = 1;

      // QR Code frame on left (240 x 240)
      const qrFrame = figma.createFrame();
      qrFrame.resize(250, 400);
      qrFrame.layoutMode = "VERTICAL"; qrFrame.primaryAxisAlignItems = "CENTER"; qrFrame.counterAxisAlignItems = "CENTER";
      qrFrame.itemSpacing = 12; qrFrame.fills = [];

      // QR Graphic
      const qrCode = figma.createFrame();
      qrCode.resize(220, 220);
      qrCode.cornerRadius = 12;
      qrCode.fills = solid(C.textWhite, 1);
      qrCode.paddingLeft = 14; qrCode.paddingRight = 14; qrCode.paddingTop = 14; qrCode.paddingBottom = 14;

      // Inner fake QR matrix dots
      const qrInner = figma.createFrame();
      qrInner.resize(192, 192); qrInner.cornerRadius = 6;
      qrInner.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
      qrInner.layoutMode = "VERTICAL"; qrInner.primaryAxisAlignItems = "CENTER"; qrInner.counterAxisAlignItems = "CENTER";
      qrInner.appendChild(createSvgIcon("qr", "#00F5A0", 120));
      qrCode.appendChild(qrInner);
      qrFrame.appendChild(qrCode);

      // Expiry countdown timer
      const timeBox = figma.createFrame();
      timeBox.layoutMode = "HORIZONTAL"; timeBox.itemSpacing = 6; timeBox.counterAxisAlignItems = "CENTER";
      timeBox.paddingLeft = 12; timeBox.paddingRight = 12; timeBox.paddingTop = 6; timeBox.paddingBottom = 6;
      timeBox.cornerRadius = 6; timeBox.fills = solid({ r: 0.18, g: 0.04, b: 0.06 }, 1);
      timeBox.strokes = solid(C.rose, 0.5); timeBox.strokeWeight = 1;
      const tDot = figma.createEllipse(); tDot.resize(6, 6); tDot.fills = solid(C.rose, 1); timeBox.appendChild(tDot);
      timeBox.appendChild(createText("Sisa Waktu Bayar: 14:59", 11, "Bold", C.rose));
      qrFrame.appendChild(timeBox);

      qrisBox.appendChild(qrFrame);

      // Instructions on right side
      const instrCol = figma.createFrame();
      instrCol.layoutMode = "VERTICAL"; instrCol.resize(450, 400);
      instrCol.itemSpacing = 12; instrCol.fills = [];

      instrCol.appendChild(createText("Cara Pembayaran QRIS Standar Nasional:", 13, "Bold", C.textWhite));

      function makeStepInstruction(num, title, sub) {
        const step = figma.createFrame();
        step.layoutMode = "HORIZONTAL"; step.itemSpacing = 10; step.fills = [];
        const numCircle = figma.createFrame();
        numCircle.resize(22, 22); numCircle.cornerRadius = 11;
        numCircle.fills = solid(C.forestBase, 1); numCircle.strokes = solid(C.mint, 0.6); numCircle.strokeWeight = 1;
        numCircle.layoutMode = "HORIZONTAL"; numCircle.primaryAxisAlignItems = "CENTER"; numCircle.counterAxisAlignItems = "CENTER";
        numCircle.appendChild(createText(num, 10, "Bold", C.mint));
        step.appendChild(numCircle);

        const col = figma.createFrame();
        col.layoutMode = "VERTICAL"; col.itemSpacing = 2; col.fills = [];
        col.appendChild(createText(title, 11, "Bold", C.textWhite));
        col.appendChild(createText(sub, 10, "Regular", C.textZinc400));
        step.appendChild(col);
        return step;
      }

      instrCol.appendChild(makeStepInstruction("1", "Buka Aplikasi E-Wallet / Mobile Banking", "BCA Mobile, Livin Mandiri, GoPay, OVO, Dana, ShopeePay, dll."));
      instrCol.appendChild(makeStepInstruction("2", "Pilih Menu 'Scan / Bayar' QR", "Arahkan kamera ponsel Anda ke kode QRIS di sebelah kiri."));
      instrCol.appendChild(makeStepInstruction("3", "Periksa Nama Merchant & Total Tagihan", "Pastikan nama 'VocalSense AI' dengan nominal Rp 87.690."));
      instrCol.appendChild(makeStepInstruction("4", "Selesaikan Pembayaran & Tunggu Notifikasi", "Akun akan seketika di-upgrade ke Pro Vocalist secara otomatis."));

      // BCA Virtual Account Alternative Quick Box
      const vaBox = figma.createFrame();
      vaBox.layoutMode = "HORIZONTAL"; vaBox.resize(450, 48);
      vaBox.primaryAxisAlignItems = "SPACE_BETWEEN"; vaBox.counterAxisAlignItems = "CENTER";
      vaBox.paddingLeft = 14; vaBox.paddingRight = 14;
      vaBox.cornerRadius = 8;
      vaBox.fills = solid(C.glassElevated, 1);
      vaBox.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); vaBox.strokeWeight = 1;

      const vaLeft = figma.createFrame();
      vaLeft.layoutMode = "VERTICAL"; vaLeft.itemSpacing = 2; vaLeft.fills = [];
      vaLeft.appendChild(createText("BCA Virtual Account Alternatif:", 9, "Bold", C.textZinc400));
      vaLeft.appendChild(createText("8271 0812 3456 7890", 12, "Bold", C.mint));
      vaBox.appendChild(vaLeft);
      vaBox.appendChild(createBadge("SALIN NOMOR", "neutral", 9));
      instrCol.appendChild(vaBox);

      // Buttons
      const actRow = figma.createFrame();
      actRow.layoutMode = "HORIZONTAL"; actRow.itemSpacing = 10; actRow.fills = [];
      actRow.appendChild(createActionButton("Saya Sudah Bayar (Check Status)", "check", "radiant", 280));
      actRow.appendChild(createActionButton("Batal", null, "secondary", 150));
      instrCol.appendChild(actRow);

      qrisBox.appendChild(instrCol);
      midtransModal.appendChild(qrisBox);

      splitRow.appendChild(midtransModal);
      stack.appendChild(splitRow);

      root.appendChild(stack);
      return root;
    }

    // -------------------------------------------------------------------------
    // EXECUTION
    // -------------------------------------------------------------------------
    const existing = figma.currentPage.children.filter(c => 
      c.name.startsWith("VocalSense AI — 06. Account, Billing")
    );
    existing.forEach(n => n.remove());

    const screen5 = figma.currentPage.children.find(c => 
      c.name.startsWith("VocalSense AI — 05. Auth & Vocalist")
    );
    const screen4 = figma.currentPage.children.find(c => 
      c.name.startsWith("VocalSense AI — 04. Vocalist Training Center")
    );
    const prev = screen5 || screen4;
    const ox = prev ? prev.x + prev.width + 120 : 0;
    const oy = prev ? prev.y : 0;

    const screen = buildBillingScreen(ox, oy);
    figma.currentPage.selection = [screen];
    figma.viewport.scrollAndZoomIntoView([screen]);
    figma.notify("Screen 06: Account, Billing & Midtrans Payment Modal generated successfully!", { timeout: 4000 });
  } catch (err) {
    console.error(err);
    try { figma.notify("Error: " + (err && err.message ? err.message : String(err)), { error: true }); } catch (e) {}
  }
})();
