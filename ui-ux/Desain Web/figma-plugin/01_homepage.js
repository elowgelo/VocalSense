// =============================================================================
// VOCALSENSE AI — 01. OFFICIAL HOMEPAGE (MASTER STUDIO EDITION)
// 100% Faithful to patokan.png: Authentic Glassmorphism Gradients, Studio DNA,
// Double-Bezel Specular Highlights, and the Real 5-Card DAW Workbench.
// =============================================================================

(async function () {
  try {
    if (figma.editorType === "dev") {
      try { figma.notify("⚠️ Harap beralih ke Design Mode (tekan Shift + D)!", { timeout: 8000 }); } catch (e) {}
      return;
    }

    // -------------------------------------------------------------------------
    // 1. SAFE FONT LOADING (Inter Family)
    // -------------------------------------------------------------------------
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

    // -------------------------------------------------------------------------
    // 2. LUXURY CURATED PALETTE (Directly from patokan.png / part1_core.js)
    // -------------------------------------------------------------------------
    const C = {
      canvasTop:     { r: 0.038, g: 0.046, b: 0.062 }, // #0A0C10
      canvasBot:     { r: 0.018, g: 0.022, b: 0.030 }, // #050608
      gridLine:      { r: 1.0,   g: 1.0,   b: 1.0 },

      glassBg:        { r: 0.055, g: 0.063, b: 0.082 }, // #0E1015
      cardBg:         { r: 0.055, g: 0.063, b: 0.082 }, // #0E1015
      glassElevated:  { r: 0.078, g: 0.088, b: 0.118 }, // #14161E
      glassHighlight: { r: 0.120, g: 0.137, b: 0.180 }, // #1F232E
      glassBorder:    { r: 1.0,   g: 1.0,   b: 1.0 },
      glassBorderHi:  { r: 0.0,   g: 0.96,  b: 0.628 },

      mint:          { r: 0.0,   g: 0.96,  b: 0.628 }, // #00F5A0 radiant emerald
      emerald:       { r: 0.063, g: 0.725, b: 0.506 }, // #10B981
      forestBase:    { r: 0.027, g: 0.165, b: 0.118 }, // #072A1E
      forestDark:    { r: 0.015, g: 0.085, b: 0.060 }, // #04160F

      amber:         { r: 0.96,  g: 0.62,  b: 0.04 },  // #F59E0B Head Voice
      rose:          { r: 0.957, g: 0.247, b: 0.369 }, // #F43F5E REC / Danger
      cyan:          { r: 0.024, g: 0.714, b: 0.831 }, // #06B6D4 Mixed Voice

      textWhite:     { r: 0.98,  g: 0.98,  b: 0.99 },
      textZinc300:   { r: 0.82,  g: 0.84,  b: 0.88 },
      textZinc400:   { r: 0.64,  g: 0.66,  b: 0.72 },
      textZinc500:   { r: 0.46,  g: 0.50,  b: 0.58 }
    };

    function solid(color, opacity = 1) {
      const clamped = Math.max(0, Math.min(1, typeof opacity === "number" ? opacity : 1));
      return [{ type: 'SOLID', color: { r: color.r, g: color.g, b: color.b }, opacity: clamped }];
    }

    // -------------------------------------------------------------------------
    // 3. THE SIGNATURE patokan.png GLASS GRADIENT FUNCTIONS
    // -------------------------------------------------------------------------
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
      } catch (e) {
        frame.effects = [{
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.50 },
          offset: { x: 0, y: 16 },
          radius: 36,
          spread: 0,
          visible: true,
          blendMode: "NORMAL",
          showShadowBehindNode: false
        }];
      }
    }

    // The signature angled luxury gradients from patokan.png!
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

    function applyCard3Glass(frame) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0.6, 0.8, 0], [-0.8, 0.6, 0.4]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.00, g: 0.96, b: 0.63, a: 0.16 } },
          { position: 0.35, color: { r: 0.035, g: 0.18, b: 0.13, a: 0.78 } },
          { position: 0.75, color: { r: 0.055, g: 0.065, b: 0.085, a: 0.84 } },
          { position: 1.0,  color: { r: 0.03, g: 0.035, b: 0.045, a: 0.92 } }
        ]
      }];
      applyGlassEffects(frame, 0.12, false);
    }

    function applyCard4Glass(frame) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0.7071, -0.7071, 0.3], [0.7071, 0.7071, 0]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.11, g: 0.13, b: 0.18, a: 0.78 } },
          { position: 0.32, color: { r: 0.03, g: 0.14, b: 0.10, a: 0.72 } },
          { position: 0.75, color: { r: 0.055, g: 0.065, b: 0.085, a: 0.84 } },
          { position: 1.0,  color: { r: 0.03, g: 0.035, b: 0.045, a: 0.90 } }
        ]
      }];
      applyGlassEffects(frame, 0.09, false);
    }

    function applyCard5Glass(frame) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.09, g: 0.12, b: 0.16, a: 0.80 } },
          { position: 0.35, color: { r: 0.03, g: 0.12, b: 0.09, a: 0.72 } },
          { position: 0.75, color: { r: 0.055, g: 0.065, b: 0.085, a: 0.84 } },
          { position: 1.0,  color: { r: 0.025, g: 0.035, b: 0.045, a: 0.90 } }
        ]
      }];
      applyGlassEffects(frame, 0.09, false);
    }

    function applyGlassmorphism(frame, emeraldIntensity = 0.08, borderOpacity = 0.08, hasGreenBorder = false) {
      frame.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0.5]],
        gradientStops: [
          { position: 0.0, color: { r: 0.04 + (C.mint.r * emeraldIntensity), g: 0.08 + (C.mint.g * emeraldIntensity), b: 0.08 + (C.mint.b * emeraldIntensity), a: 0.75 } },
          { position: 0.5, color: { r: C.glassElevated.r, g: C.glassElevated.g, b: C.glassElevated.b, a: 0.80 } },
          { position: 1.0, color: { r: C.glassBg.r, g: C.glassBg.g, b: C.glassBg.b, a: 0.85 } }
        ]
      }];
      applyGlassEffects(frame, borderOpacity, hasGreenBorder);
    }

    // -------------------------------------------------------------------------
    // 4. TYPOGRAPHY & SVG ICONS (ANTI-TRUNCATION GUARANTEE)
    // -------------------------------------------------------------------------
    function createText(chars, size = 13, weight = "Regular", color = C.textWhite, opacity = 1) {
      let actualSize = typeof size === "number" ? size : (parseInt(size, 10) || 13);
      let actualWeight = typeof weight === "string" ? weight : "Regular";
      let actualColor = (typeof color === "object" && color !== null && "r" in color) ? color : C.textWhite;

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
      let actualWidth = typeof width === "number" ? width : (parseInt(width, 10) || 320);
      let actualSize = typeof size === "number" ? size : (parseInt(size, 10) || 13);
      let actualWeight = typeof weight === "string" ? weight : "Regular";
      let actualColor = (typeof color === "object" && color !== null && "r" in color) ? color : C.textZinc400;
      let actualLineHeight = typeof lineHeight === "number" ? lineHeight : (parseInt(lineHeight, 10) || 20);
      let actualAlign = typeof textAlign === "string" ? textAlign : "LEFT";

      // If width and size were inverted: e.g. createParagraph(text, 11, "Regular", color, width)
      if (typeof width === "number" && typeof size === "string" && isNaN(Number(size))) {
        actualSize = width;
        actualWeight = size;
        if (typeof color === "number") actualWidth = color;
        if (typeof weight === "object" && weight !== null && "r" in weight) actualColor = weight;
      }

      const node = figma.createText();
      const styleToUse = loadedStyles.has(actualWeight) ? actualWeight : "Regular";
      node.fontName = { family: "Inter", style: styleToUse };
      node.characters = String(chars != null ? chars : "");
      node.fontSize = actualSize;
      node.lineHeight = { value: actualLineHeight, unit: "PIXELS" };
      node.fills = solid(actualColor, 1);
      node.textAlignHorizontal = actualAlign;
      node.textAutoResize = "NONE";
      node.resize(actualWidth, 10);
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
        } else if (type === "arrow-down-right") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/></svg>`;
        } else if (type === "check") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (type === "play") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
        } else if (type === "pause") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
        } else if (type === "stop") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`;
        } else if (type === "wave") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2l3-6 4 12 3-8 3 5 3-3h2"/></svg>`;
        } else if (type === "mic") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
        } else if (type === "chip") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
        } else if (type === "zap") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        } else if (type === "download") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
        } else if (type === "lock") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        } else if (type === "search") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
        } else if (type === "bell") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
        } else if (type === "moon") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        } else if (type === "home") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
        } else if (type === "chart") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
        } else if (type === "file") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
        } else if (type === "gear") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
        } else if (type === "chevron-down") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
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

    // Modern Squircle Action Button (cornerRadius: 8, STRICTLY ZERO CAPSULES, ICON ON LEFT AS IN patokan.png!)
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
      btn.cornerRadius = 8; // SQUIRCLE FROM patokan.png
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
        btn.effects = [
          {
            type: 'DROP_SHADOW',
            color: { r: 0.0, g: 0.96, b: 0.628, a: 0.35 },
            offset: { x: 0, y: 4 },
            radius: 16,
            spread: 0,
            visible: true,
            blendMode: "NORMAL",
            showShadowBehindNode: false
          }
        ];
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
        btn.strokes = solid(C.glassBorder, 0.12);
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
      b.cornerRadius = 6; // SQUIRCLE

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
      } else if (variant === "cyan") {
        b.fills = solid({ r: 0.02, g: 0.12, b: 0.15 }, 1);
        b.strokes = solid(C.cyan, 0.45);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Bold", C.cyan));
      } else {
        b.fills = solid(C.glassElevated, 1);
        b.strokes = solid(C.glassBorder, 0.10);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Medium", C.textZinc300));
      }
      return b;
    }

    // -------------------------------------------------------------------------
    // 5. EMBEDDABLE patokan.png STUDIO WORKSPACE (THE EXACT 5 CARDS & METERS)
    // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------
    // 5. EMBEDDABLE patokan.png STUDIO WORKSPACE (THE EXACT 1308px 5-CARD DAW)
    // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------
    // 5. EMBEDDABLE patokan.png STUDIO WORKSPACE (THE EXACT 1308px 5-CARD DAW)
    // -------------------------------------------------------------------------
    function createExactStudioWorkspace() {
      const workspace = figma.createFrame();
      workspace.name = "Web App Live Workspace";
      workspace.layoutMode = "VERTICAL";
      workspace.primaryAxisSizingMode = "AUTO";
      workspace.counterAxisSizingMode = "FIXED";
      workspace.resize(1308, 930);
      workspace.fills = [];
      workspace.itemSpacing = 16;

      const topBar = figma.createFrame();
      topBar.layoutMode = "HORIZONTAL";
      topBar.resize(1308, 48);
      topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
      topBar.counterAxisAlignItems = "CENTER";
      topBar.fills = [];

      const headerLeft = figma.createFrame();
      headerLeft.layoutMode = "HORIZONTAL";
      headerLeft.itemSpacing = 16;
      headerLeft.counterAxisAlignItems = "CENTER";
      headerLeft.fills = [];

      // Search Input
      const searchInput = figma.createFrame();
      searchInput.layoutMode = "HORIZONTAL";
      searchInput.resize(260, 38);
      searchInput.cornerRadius = 10;
      searchInput.fills = solid(C.glassElevated, 0.9);
      searchInput.strokes = solid(C.glassBorder, 0.09);
      searchInput.strokeWeight = 1;
      searchInput.paddingLeft = 12;
      searchInput.paddingRight = 10;
      searchInput.itemSpacing = 10;
      searchInput.counterAxisAlignItems = "CENTER";
      searchInput.primaryAxisAlignItems = "SPACE_BETWEEN";
      const sLeft = figma.createFrame();
      sLeft.layoutMode = "HORIZONTAL"; sLeft.itemSpacing = 8; sLeft.counterAxisAlignItems = "CENTER"; sLeft.fills = [];
      sLeft.appendChild(createSvgIcon("search", "#71717A", 15));
      sLeft.appendChild(createText("Search vocal scales, songs...", 12, "Regular", C.textZinc500));
      searchInput.appendChild(sLeft);
      searchInput.appendChild(createBadge("⌘K", "neutral", 9));

      // Micro Hardware active indicator (Clean dot + text directly, zero capsule container!)
      const micStatus = figma.createFrame();
      micStatus.name = "Hardware Indicator";
      micStatus.layoutMode = "HORIZONTAL";
      micStatus.primaryAxisSizingMode = "AUTO";
      micStatus.counterAxisSizingMode = "AUTO";
      micStatus.itemSpacing = 8;
      micStatus.counterAxisAlignItems = "CENTER";
      micStatus.fills = [];
      micStatus.strokes = [];
      const micDot = figma.createEllipse();
      micDot.resize(7, 7);
      micDot.fills = solid(C.mint, 1);
      micStatus.appendChild(micDot);
      micStatus.appendChild(createText("Shure MV7 (48kHz YIN Engine)", 12, "Medium", C.textZinc300));

      headerLeft.appendChild(searchInput);
      headerLeft.appendChild(micStatus);

      const headerRight = figma.createFrame();
      headerRight.layoutMode = "HORIZONTAL";
      headerRight.itemSpacing = 12;
      headerRight.counterAxisAlignItems = "CENTER";
      headerRight.fills = [];

      // Square Bell Button Tile (cornerRadius: 10, crisp visible border!)
      const bellBtn = figma.createFrame();
      bellBtn.resize(38, 38); bellBtn.cornerRadius = 10;
      bellBtn.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
      bellBtn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
      bellBtn.strokeWeight = 1;
      bellBtn.layoutMode = "HORIZONTAL"; bellBtn.primaryAxisAlignItems = "CENTER"; bellBtn.counterAxisAlignItems = "CENTER";
      bellBtn.appendChild(createSvgIcon("bell", "#A1A1AA", 16));
      headerRight.appendChild(bellBtn);

      // Square Moon/Theme Button Tile (cornerRadius: 10, crisp visible border!)
      const moonBtn = figma.createFrame();
      moonBtn.resize(38, 38); moonBtn.cornerRadius = 10;
      moonBtn.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
      moonBtn.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
      moonBtn.strokeWeight = 1;
      moonBtn.layoutMode = "HORIZONTAL"; moonBtn.primaryAxisAlignItems = "CENTER"; moonBtn.counterAxisAlignItems = "CENTER";
      moonBtn.appendChild(createSvgIcon("moon", "#A1A1AA", 15));
      headerRight.appendChild(moonBtn);

      // Squircle User Profile Tile (cornerRadius: 10, NOT 99!)
      const profileChip = figma.createFrame();
      profileChip.layoutMode = "HORIZONTAL";
      profileChip.primaryAxisSizingMode = "AUTO";
      profileChip.counterAxisSizingMode = "AUTO";
      profileChip.itemSpacing = 10;
      profileChip.counterAxisAlignItems = "CENTER";
      profileChip.paddingLeft = 8; profileChip.paddingRight = 14; profileChip.paddingTop = 4; profileChip.paddingBottom = 4;
      profileChip.cornerRadius = 10; // CLEAN SQUIRCLE FROM patokan.png!
      profileChip.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
      profileChip.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1);
      profileChip.strokeWeight = 1;
      const chipAvatar = figma.createEllipse();
      chipAvatar.resize(28, 28); chipAvatar.fills = solid(C.forestBase, 1); chipAvatar.strokes = solid(C.mint, 0.6); chipAvatar.strokeWeight = 1;
      profileChip.appendChild(chipAvatar);
      const userTextCol = figma.createFrame();
      userTextCol.layoutMode = "VERTICAL";
      userTextCol.primaryAxisSizingMode = "AUTO";
      userTextCol.counterAxisSizingMode = "AUTO";
      userTextCol.itemSpacing = 1; userTextCol.fills = [];
      userTextCol.appendChild(createText("Ethan Reynolds", 12, "Bold", C.textWhite));
      userTextCol.appendChild(createText("PRO SINGER", 9, "Bold", C.mint));
      profileChip.appendChild(userTextCol);
      headerRight.appendChild(profileChip);

      headerRight.appendChild(createActionButton("New Session", "arrow-up-right", "radiant"));
      topBar.appendChild(headerLeft);
      topBar.appendChild(headerRight);
      workspace.appendChild(topBar);

      // Bento Container (1308 x 860)
      const bento = figma.createFrame();
      bento.name = "Bento Grid Dashboard";
      bento.layoutMode = "VERTICAL";
      bento.resize(1308, 860);
      bento.fills = [];
      bento.itemSpacing = 16;
      workspace.appendChild(bento);

      // -----------------------------------------------------------------------
      // ROW 1: Card 1 (Pitch Studio: 852 x 450) + Card 2 (Vocal Registers: 440 x 450)
      // -----------------------------------------------------------------------
      const row1 = figma.createFrame();
      row1.layoutMode = "HORIZONTAL";
      row1.resize(1308, 450);
      row1.fills = [];
      row1.itemSpacing = 16;
      bento.appendChild(row1);

      // CARD 1: LIVE PITCH & FORMANT TRACKER (852 x 450)
      const cardPitch = figma.createFrame();
      cardPitch.name = "Card 1: Live Pitch Studio";
      cardPitch.layoutMode = "VERTICAL";
      cardPitch.resize(852, 450);
      cardPitch.cornerRadius = 24;
      applyCard1Glass(cardPitch);
      cardPitch.paddingLeft = 28; cardPitch.paddingRight = 28; cardPitch.paddingTop = 20; cardPitch.paddingBottom = 20;
      cardPitch.itemSpacing = 10;
      cardPitch.clipsContent = true;

      const c1Header = figma.createFrame();
      c1Header.layoutMode = "HORIZONTAL";
      c1Header.resize(796, 30);
      c1Header.primaryAxisAlignItems = "SPACE_BETWEEN";
      c1Header.counterAxisAlignItems = "CENTER";
      c1Header.fills = [];

      const c1TitleGroup = figma.createFrame();
      c1TitleGroup.layoutMode = "HORIZONTAL";
      c1TitleGroup.itemSpacing = 8;
      c1TitleGroup.counterAxisAlignItems = "CENTER";
      c1TitleGroup.fills = [];
      const activeDot = figma.createEllipse();
      activeDot.resize(6, 6);
      activeDot.fills = solid(C.mint, 1);
      c1TitleGroup.appendChild(activeDot);
      c1TitleGroup.appendChild(createText("LIVE PITCH & FORMANT TRACKER", 11, "Bold", C.textZinc400));
      c1TitleGroup.appendChild(createText("• YIN DSP Active", 11, "Medium", C.mint));
      c1Header.appendChild(c1TitleGroup);

      const scaleTabs = figma.createFrame();
      scaleTabs.layoutMode = "HORIZONTAL";
      scaleTabs.primaryAxisSizingMode = "AUTO";
      scaleTabs.counterAxisSizingMode = "AUTO";
      scaleTabs.itemSpacing = 4;
      scaleTabs.paddingLeft = 4; scaleTabs.paddingRight = 4; scaleTabs.paddingTop = 4; scaleTabs.paddingBottom = 4;
      scaleTabs.cornerRadius = 8;
      scaleTabs.fills = solid(C.glassElevated, 1);
      scaleTabs.strokes = solid(C.glassBorder, 0.08);
      scaleTabs.strokeWeight = 1;
      [{ name: "C Major", active: false }, { name: "G Major (Active)", active: true }, { name: "Pentatonic", active: false }].forEach(tb => {
        const tItem = figma.createFrame();
        tItem.layoutMode = "HORIZONTAL";
        tItem.primaryAxisSizingMode = "AUTO";
        tItem.counterAxisSizingMode = "AUTO";
        tItem.paddingLeft = 10; tItem.paddingRight = 10; tItem.paddingTop = 4; tItem.paddingBottom = 4;
        tItem.cornerRadius = 6;
        if (tb.active) {
          tItem.fills = solid(C.forestBase, 1);
          tItem.strokes = solid(C.mint, 0.4);
          tItem.strokeWeight = 1;
          tItem.appendChild(createText(tb.name, 10, "Bold", C.mint));
        } else {
          tItem.fills = [];
          tItem.appendChild(createText(tb.name, 10, "Medium", C.textZinc500));
        }
        scaleTabs.appendChild(tItem);
      });
      c1Header.appendChild(scaleTabs);
      cardPitch.appendChild(c1Header);

      // Hero Pitch Readout Row (796 x 60)
      const heroPitch = figma.createFrame();
      heroPitch.layoutMode = "HORIZONTAL";
      heroPitch.resize(796, 60);
      heroPitch.primaryAxisAlignItems = "SPACE_BETWEEN";
      heroPitch.counterAxisAlignItems = "CENTER";
      heroPitch.fills = [];

      const pitchCol = figma.createFrame();
      pitchCol.layoutMode = "VERTICAL";
      pitchCol.resize(520, 56);
      pitchCol.itemSpacing = 4;
      pitchCol.fills = [];

      const pitchRow = figma.createFrame();
      pitchRow.layoutMode = "HORIZONTAL";
      pitchRow.primaryAxisSizingMode = "AUTO";
      pitchRow.counterAxisSizingMode = "AUTO";
      pitchRow.itemSpacing = 12;
      pitchRow.counterAxisAlignItems = "CENTER";
      pitchRow.fills = [];

      pitchRow.appendChild(createText("G4", 36, "Bold", C.textWhite));
      pitchRow.appendChild(createText("392.00 Hz", 20, "Medium", C.mint));

      const centsBadge = figma.createFrame();
      centsBadge.layoutMode = "HORIZONTAL";
      centsBadge.primaryAxisSizingMode = "AUTO";
      centsBadge.counterAxisSizingMode = "AUTO";
      centsBadge.paddingLeft = 10; centsBadge.paddingRight = 10; centsBadge.paddingTop = 4; centsBadge.paddingBottom = 4;
      centsBadge.cornerRadius = 6;
      centsBadge.fills = solid(C.forestBase, 0.95);
      centsBadge.strokes = solid(C.mint, 0.5);
      centsBadge.strokeWeight = 1;
      centsBadge.appendChild(createText("IN-TUNE (+1.8 CENTS)", 10, "Bold", C.mint));
      pitchRow.appendChild(centsBadge);
      pitchCol.appendChild(pitchRow);

      // Ribbon: C3 — D4 — G4 (Target) — C5
      const ribbonRow = figma.createFrame();
      ribbonRow.layoutMode = "HORIZONTAL";
      ribbonRow.primaryAxisSizingMode = "AUTO";
      ribbonRow.counterAxisSizingMode = "AUTO";
      ribbonRow.itemSpacing = 8;
      ribbonRow.counterAxisAlignItems = "CENTER";
      ribbonRow.fills = [];
      ribbonRow.appendChild(createText("Scale Target: G Major Arpeggio", 11, "Regular", C.textZinc400));
      ribbonRow.appendChild(createText("•", 11, "Regular", C.textZinc500));
      ribbonRow.appendChild(createText("C3", 11, "Medium", C.textZinc400));
      ribbonRow.appendChild(createText("—", 11, "Regular", C.textZinc500));
      ribbonRow.appendChild(createText("D4", 11, "Medium", C.textZinc400));
      ribbonRow.appendChild(createText("—", 11, "Regular", C.textZinc500));
      ribbonRow.appendChild(createText("G4 (Target)", 11, "Bold", C.mint));
      ribbonRow.appendChild(createText("—", 11, "Regular", C.textZinc500));
      ribbonRow.appendChild(createText("C5", 11, "Medium", C.textZinc400));
      pitchCol.appendChild(ribbonRow);
      heroPitch.appendChild(pitchCol);

      const recRow = figma.createFrame();
      recRow.layoutMode = "HORIZONTAL";
      recRow.primaryAxisSizingMode = "AUTO";
      recRow.counterAxisSizingMode = "AUTO";
      recRow.itemSpacing = 8;
      recRow.paddingLeft = 14; recRow.paddingRight = 14; recRow.paddingTop = 6; recRow.paddingBottom = 6;
      recRow.cornerRadius = 8;
      recRow.fills = solid(C.glassElevated, 1);
      recRow.strokes = solid(C.rose, 0.5);
      recRow.strokeWeight = 1;
      recRow.counterAxisAlignItems = "CENTER";
      const recDot = figma.createEllipse();
      recDot.resize(8, 8);
      recDot.fills = solid(C.rose, 1);
      recRow.appendChild(recDot);
      recRow.appendChild(createText("REC 00:42 / 05:00", 11, "Bold", C.rose));
      heroPitch.appendChild(recRow);
      cardPitch.appendChild(heroPitch);

      // Spline Canvas (796 x 260)
      const curveBox = figma.createFrame();
      curveBox.resize(796, 260);
      curveBox.cornerRadius = 16;
      curveBox.fills = solid({ r: 0.025, g: 0.035, b: 0.048 }, 0.95);
      curveBox.strokes = solid(C.glassBorder, 0.08);
      curveBox.strokeWeight = 1;
      curveBox.clipsContent = true;

      // Pitch Guidelines
      const guideFrequencies = [
        { note: "A4 (440Hz)", y: 38, target: false },
        { note: "G4 Target (392Hz)", y: 88, target: true },
        { note: "F4 (349Hz)", y: 148, target: false },
        { note: "E4 (330Hz)", y: 208, target: false }
      ];
      guideFrequencies.forEach(g => {
        const line = figma.createRectangle();
        line.resize(796, 1); line.x = 0; line.y = g.y;
        line.fills = solid(g.target ? C.mint : C.gridLine, g.target ? 0.35 : 0.04);
        curveBox.appendChild(line);

        const lbl = createText(g.note, 10, g.target ? "Bold" : "Regular", g.target ? C.mint : C.textZinc500);
        lbl.x = 16; lbl.y = g.y - 16;
        curveBox.appendChild(lbl);
      });

      // Flowing Pitch Spline Waveform
      const splineSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="796" height="260" viewBox="0 0 796 260" fill="none">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#00F5A0" stop-opacity="0.28"/>
              <stop offset="70%" stop-color="#00F5A0" stop-opacity="0.05"/>
              <stop offset="100%" stop-color="#00F5A0" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#10B981" stop-opacity="0.7"/>
              <stop offset="40%" stop-color="#00F5A0" stop-opacity="1"/>
              <stop offset="85%" stop-color="#00F5A0" stop-opacity="1"/>
              <stop offset="100%" stop-color="#10B981" stop-opacity="0.5"/>
            </linearGradient>
          </defs>
          <path d="M 0 210 Q 140 215 240 145 T 480 135 T 620 90 T 796 90 L 796 260 L 0 260 Z" fill="url(#curveGradient)"/>
          <path d="M 0 210 Q 140 215 240 145 T 480 135 T 620 90 T 796 90" stroke="url(#strokeGradient)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `;
      try {
        const svgNode = figma.createNodeFromSvg(splineSvg);
        svgNode.resize(796, 260); svgNode.x = 0; svgNode.y = 0;
        curveBox.appendChild(svgNode);
      } catch (e) {}

      // Crosshair & Active Pitch Node at 392Hz
      const crossLine = figma.createRectangle();
      crossLine.resize(1, 260); crossLine.x = 620; crossLine.y = 0; crossLine.fills = solid(C.mint, 0.45);
      curveBox.appendChild(crossLine);

      const targetRing = figma.createEllipse();
      targetRing.resize(14, 14); targetRing.x = 613; targetRing.y = 83;
      targetRing.fills = solid(C.mint, 0.3); targetRing.strokes = solid(C.mint, 0.9); targetRing.strokeWeight = 1.5;
      curveBox.appendChild(targetRing);

      const targetDot = figma.createEllipse();
      targetDot.resize(6, 6); targetDot.x = 617; targetDot.y = 87; targetDot.fills = solid(C.textWhite, 1);
      curveBox.appendChild(targetDot);

      // Interactive Precision Tooltip
      const tooltip = figma.createFrame();
      tooltip.resize(156, 44); tooltip.x = 450; tooltip.y = 56; tooltip.cornerRadius = 8;
      tooltip.fills = solid(C.textWhite, 0.98); tooltip.paddingLeft = 10; tooltip.paddingRight = 10; tooltip.paddingTop = 6;
      tooltip.layoutMode = "VERTICAL"; tooltip.itemSpacing = 2;
      tooltip.appendChild(createText("09 Dec • G4 (392.2 Hz) ↗", 11, "Bold", { r: 0.05, g: 0.07, b: 0.1 }));
      tooltip.appendChild(createText("In-Tune Accuracy 99.4% (+2c)", 9, "Medium", { r: 0.04, g: 0.55, b: 0.35 }));
      curveBox.appendChild(tooltip);

      // Time Markers Axis
      const timeAxis = figma.createFrame();
      timeAxis.layoutMode = "HORIZONTAL"; timeAxis.resize(764, 16); timeAxis.x = 16; timeAxis.y = 236;
      timeAxis.primaryAxisAlignItems = "SPACE_BETWEEN"; timeAxis.fills = [];
      ["00:00", "00:02", "00:04", "00:06", "00:08", "00:10"].forEach(tm => {
        timeAxis.appendChild(createText(tm, 9, "Regular", C.textZinc500));
      });
      curveBox.appendChild(timeAxis);
      cardPitch.appendChild(curveBox);

      // Bottom Studio Transport & Metering Bar (796 x 34)
      const c1Bottom = figma.createFrame();
      c1Bottom.layoutMode = "HORIZONTAL";
      c1Bottom.resize(796, 34);
      c1Bottom.primaryAxisAlignItems = "SPACE_BETWEEN";
      c1Bottom.counterAxisAlignItems = "CENTER";
      c1Bottom.fills = [];

      const transLeft = figma.createFrame();
      transLeft.layoutMode = "HORIZONTAL"; transLeft.itemSpacing = 8; transLeft.counterAxisAlignItems = "CENTER"; transLeft.fills = [];
      const btnPause = createActionButton("Pause", "pause", "secondary");
      btnPause.resize(78, 30);
      const btnStop = createActionButton("Stop & Analyze", "stop", "secondary");
      btnStop.resize(120, 30);
      transLeft.appendChild(btnPause);
      transLeft.appendChild(btnStop);

      transLeft.appendChild(createBadge("120 BPM", "neutral", 10));

      // Stereo VU Level meters
      const vuMeter = figma.createFrame();
      vuMeter.layoutMode = "HORIZONTAL"; vuMeter.itemSpacing = 8; vuMeter.counterAxisAlignItems = "CENTER";
      vuMeter.primaryAxisSizingMode = "AUTO"; vuMeter.counterAxisSizingMode = "AUTO";
      vuMeter.fills = solid(C.glassElevated, 1); vuMeter.cornerRadius = 6;
      vuMeter.paddingLeft = 8; vuMeter.paddingRight = 8; vuMeter.paddingTop = 4; vuMeter.paddingBottom = 4;

      const vuL = figma.createFrame(); vuL.layoutMode = "HORIZONTAL"; vuL.resize(40, 16); vuL.itemSpacing = 4; vuL.counterAxisAlignItems = "CENTER"; vuL.fills = [];
      vuL.appendChild(createText("L", 8, "Bold", C.textZinc500));
      const barL = figma.createRectangle(); barL.resize(26, 4); barL.cornerRadius = 2; barL.fills = solid(C.mint, 1);
      vuL.appendChild(barL);
      vuMeter.appendChild(vuL);

      const vuR = figma.createFrame(); vuR.layoutMode = "HORIZONTAL"; vuR.resize(40, 16); vuR.itemSpacing = 4; vuR.counterAxisAlignItems = "CENTER"; vuR.fills = [];
      vuR.appendChild(createText("R", 8, "Bold", C.textZinc500));
      const barR = figma.createRectangle(); barR.resize(22, 4); barR.cornerRadius = 2; barR.fills = solid(C.mint, 1);
      vuR.appendChild(barR);
      vuMeter.appendChild(vuR);
      transLeft.appendChild(vuMeter);
      c1Bottom.appendChild(transLeft);

      c1Bottom.appendChild(createText("Noise Floor: -48 dB • RMS: -14.2 dB • Jitter: 0.12%", 11, "Regular", C.textZinc400));
      cardPitch.appendChild(c1Bottom);
      row1.appendChild(cardPitch);

      // -----------------------------------------------------------------------
      // CARD 2: VOCAL REGISTERS & SPAN (440 x 450)
      // -----------------------------------------------------------------------
      const cardRange = figma.createFrame();
      cardRange.name = "Card 2: Vocal Registers Deck";
      cardRange.layoutMode = "VERTICAL";
      cardRange.resize(440, 450);
      cardRange.cornerRadius = 24;
      applyCard2Glass(cardRange);
      cardRange.paddingLeft = 24; cardRange.paddingRight = 24; cardRange.paddingTop = 20; cardRange.paddingBottom = 20;
      cardRange.itemSpacing = 12;
      cardRange.clipsContent = true;

      const c2Header = figma.createFrame();
      c2Header.layoutMode = "HORIZONTAL";
      c2Header.resize(392, 32);
      c2Header.primaryAxisAlignItems = "SPACE_BETWEEN";
      c2Header.counterAxisAlignItems = "CENTER";
      c2Header.fills = [];
      c2Header.appendChild(createText("Vocal Registers & Span", 15, "Bold", C.textWhite));
      c2Header.appendChild(createActionButton("Retest", "arrow-up-right", "secondary"));
      cardRange.appendChild(c2Header);

      // Stacked Wallet Deck (392 x 314)
      const deckBox = figma.createFrame();
      deckBox.resize(392, 314);
      deckBox.fills = [];

      // Layer 3 (Head Voice Background Card)
      const backCard1 = figma.createFrame();
      backCard1.resize(392, 110); backCard1.x = 0; backCard1.y = 0;
      backCard1.cornerRadius = 18;
      backCard1.fills = solid({ r: 0.06, g: 0.08, b: 0.11 }, 0.95);
      backCard1.strokes = solid(C.glassBorder, 0.08); backCard1.strokeWeight = 1;
      backCard1.layoutMode = "VERTICAL";
      backCard1.paddingLeft = 20; backCard1.paddingRight = 20; backCard1.paddingTop = 10;
      const b1Header = figma.createFrame();
      b1Header.layoutMode = "HORIZONTAL"; b1Header.resize(352, 20);
      b1Header.primaryAxisAlignItems = "SPACE_BETWEEN"; b1Header.fills = [];
      b1Header.appendChild(createText("HEAD VOICE (2k–5k Hz)", 11, "Bold", C.amber));
      b1Header.appendChild(createText("72% Formant", 11, "Bold", C.amber));
      backCard1.appendChild(b1Header);
      deckBox.appendChild(backCard1);

      // Layer 2 (Mixed Voice Mid Card)
      const backCard2 = figma.createFrame();
      backCard2.resize(392, 110); backCard2.x = 0; backCard2.y = 38;
      backCard2.cornerRadius = 18;
      backCard2.fills = solid({ r: 0.05, g: 0.07, b: 0.10 }, 0.95);
      backCard2.strokes = solid(C.glassBorder, 0.08); backCard2.strokeWeight = 1;
      backCard2.layoutMode = "VERTICAL";
      backCard2.paddingLeft = 20; backCard2.paddingRight = 20; backCard2.paddingTop = 10;
      const b2Header = figma.createFrame();
      b2Header.layoutMode = "HORIZONTAL"; b2Header.resize(352, 20);
      b2Header.primaryAxisAlignItems = "SPACE_BETWEEN"; b2Header.fills = [];
      b2Header.appendChild(createText("MIXED VOICE (400–2k Hz)", 11, "Bold", C.textWhite));
      b2Header.appendChild(createText("84% Balance", 11, "Bold", C.mint));
      backCard2.appendChild(b2Header);
      deckBox.appendChild(backCard2);

      // Layer 1 (Chest Voice Hero Card)
      const frontCard = figma.createFrame();
      frontCard.resize(392, 238); frontCard.x = 0; frontCard.y = 76;
      frontCard.cornerRadius = 18;
      frontCard.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0.5]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.0,   g: 0.96, b: 0.628, a: 0.22 } },
          { position: 0.35, color: { r: 0.035, g: 0.20, b: 0.14,  a: 0.95 } },
          { position: 1.0,  color: { r: 0.045, g: 0.065, b: 0.09,  a: 0.98 } }
        ]
      }];
      frontCard.strokes = solid(C.mint, 0.55);
      frontCard.strokeWeight = 1;
      frontCard.layoutMode = "VERTICAL";
      frontCard.paddingLeft = 20; frontCard.paddingRight = 20; frontCard.paddingTop = 16; frontCard.paddingBottom = 16;
      frontCard.primaryAxisAlignItems = "SPACE_BETWEEN";

      const fTop = figma.createFrame();
      fTop.layoutMode = "HORIZONTAL"; fTop.resize(352, 22);
      fTop.primaryAxisAlignItems = "SPACE_BETWEEN"; fTop.counterAxisAlignItems = "CENTER"; fTop.fills = [];
      fTop.appendChild(createText("CHEST VOICE FOUNDATION", 11, "Bold", C.mint));
      fTop.appendChild(createSvgIcon("chip", "#00F5A0", 20));
      frontCard.appendChild(fTop);

      // Sized container for Span display so text is NEVER clipped!
      const fMid = figma.createFrame();
      fMid.layoutMode = "VERTICAL";
      fMid.resize(352, 60);
      fMid.itemSpacing = 4;
      fMid.fills = [];
      fMid.appendChild(createText("C2 — A4", 32, "Bold", C.textWhite));
      fMid.appendChild(createText("Span: 2.8 Octaves (Tenor Range)", 12, "Medium", C.textZinc300));
      frontCard.appendChild(fMid);

      const fBottom = figma.createFrame();
      fBottom.layoutMode = "VERTICAL"; fBottom.resize(352, 54); fBottom.itemSpacing = 6; fBottom.fills = [];
      const fBottomText = figma.createFrame();
      fBottomText.layoutMode = "HORIZONTAL"; fBottomText.resize(352, 16);
      fBottomText.primaryAxisAlignItems = "SPACE_BETWEEN"; fBottomText.fills = [];
      fBottomText.appendChild(createText("Resonance Power: 94%", 12, "Bold", C.textWhite));
      fBottomText.appendChild(createText("↑ Top 8% Singer", 11, "Bold", C.mint));
      fBottom.appendChild(fBottomText);

      const resTrack = figma.createFrame();
      resTrack.resize(352, 6); resTrack.cornerRadius = 99;
      resTrack.fills = solid(C.glassElevated, 1);
      const resFill = figma.createRectangle();
      resFill.resize(330, 6); resFill.cornerRadius = 99; resFill.fills = solid(C.mint, 1);
      resTrack.appendChild(resFill);
      fBottom.appendChild(resTrack);
      fBottom.appendChild(createText("Acoustic Formant: 730 Hz • Optimal Core Resonance", 10, "Regular", C.textZinc500));
      frontCard.appendChild(fBottom);

      deckBox.appendChild(frontCard);
      cardRange.appendChild(deckBox);

      const deckActions = figma.createFrame();
      deckActions.layoutMode = "HORIZONTAL"; deckActions.resize(392, 40); deckActions.itemSpacing = 12;
      deckActions.primaryAxisAlignItems = "SPACE_BETWEEN"; deckActions.fills = [];
      const btnExpand = createActionButton("Expand Range", "arrow-down-right", "secondary");
      btnExpand.resize(190, 40); btnExpand.primaryAxisAlignItems = "CENTER";
      const btnDrill = createActionButton("Practice Scales", "arrow-up-right", "radiant");
      btnDrill.resize(190, 40); btnDrill.primaryAxisAlignItems = "CENTER";
      deckActions.appendChild(btnExpand);
      deckActions.appendChild(btnDrill);
      cardRange.appendChild(deckActions);

      row1.appendChild(cardRange);

      // -----------------------------------------------------------------------
      // ROW 2: Card 3 (Coach: 380), Card 4 (Trend: 456), Card 5 (Takes: 440)
      // -----------------------------------------------------------------------
      const row2 = figma.createFrame();
      row2.layoutMode = "HORIZONTAL";
      row2.resize(1308, 380);
      row2.fills = [];
      row2.itemSpacing = 16;
      bento.appendChild(row2);

      // CARD 3: GEMINI AI VOCAL COACH (380 x 380) — EXACT MATCH TO patokan.png!
      const cardCoach = figma.createFrame();
      cardCoach.name = "Card 3: AI Vocal Coach";
      cardCoach.layoutMode = "VERTICAL";
      cardCoach.resize(380, 380);
      cardCoach.cornerRadius = 24;
      applyCard3Glass(cardCoach);
      cardCoach.paddingLeft = 24; cardCoach.paddingRight = 24; cardCoach.paddingTop = 20; cardCoach.paddingBottom = 20;
      cardCoach.itemSpacing = 10;
      cardCoach.clipsContent = false;

      const coachTagRow = figma.createFrame();
      coachTagRow.layoutMode = "HORIZONTAL"; coachTagRow.itemSpacing = 8; coachTagRow.counterAxisAlignItems = "CENTER"; coachTagRow.fills = [];
      coachTagRow.appendChild(createSvgIcon("sparkle", "#00F5A0", 15));
      coachTagRow.appendChild(createText("GEMINI AI VOCAL COACH", 11, "Bold", C.mint));
      cardCoach.appendChild(coachTagRow);

      cardCoach.appendChild(createText("Bridge Mix-Voice Smoothly", 17, "Bold", C.textWhite));
      cardCoach.appendChild(createParagraph(
        "\"Resonance power is strong on chest tones (94%). Smooth the F#4 to G4 bridge to eliminate the slight flat drift (-18c) during breath recovery.\"",
        332,
        11,
        "Regular",
        C.textZinc300,
        16,
        "LEFT"
      ));

      // Take Analysis EQ Pod from VA.png
      const takePod = figma.createFrame();
      takePod.layoutMode = "HORIZONTAL";
      takePod.resize(332, 48);
      takePod.cornerRadius = 10;
      takePod.paddingLeft = 14; takePod.paddingRight = 14;
      takePod.primaryAxisAlignItems = "SPACE_BETWEEN";
      takePod.counterAxisAlignItems = "CENTER";
      takePod.fills = solid(C.glassElevated, 0.9);
      takePod.strokes = solid(C.glassBorder, 0.08);
      takePod.strokeWeight = 1;

      const takePodLeft = figma.createFrame();
      takePodLeft.layoutMode = "VERTICAL";
      takePodLeft.primaryAxisSizingMode = "AUTO";
      takePodLeft.counterAxisSizingMode = "AUTO";
      takePodLeft.itemSpacing = 2;
      takePodLeft.fills = [];
      takePodLeft.appendChild(createText("Take Analysis: F#4–G4 Shift", 11, "Bold", C.textWhite));
      takePodLeft.appendChild(createText("Mild Flatness Detected at 00:23", 9, "Regular", C.amber));
      takePod.appendChild(takePodLeft);

      // Mini EQ bars
      const eqBarRow = figma.createFrame();
      eqBarRow.layoutMode = "HORIZONTAL";
      eqBarRow.itemSpacing = 4;
      eqBarRow.counterAxisAlignItems = "MAX";
      eqBarRow.resize(50, 26);
      eqBarRow.fills = [];
      [14, 24, 18, 28, 16].forEach(bh => {
        const eb = figma.createRectangle();
        eb.resize(6, bh);
        eb.cornerRadius = 3;
        eb.fills = solid(C.mint, 1);
        eqBarRow.appendChild(eb);
      });
      takePod.appendChild(eqBarRow);
      cardCoach.appendChild(takePod);

      // Social Proof & Avatars Row (+1.4k singers trained today) - Exactly matching patokan.png colored circles!
      const proofRow = figma.createFrame();
      proofRow.layoutMode = "HORIZONTAL";
      proofRow.resize(332, 28);
      proofRow.counterAxisAlignItems = "CENTER";
      proofRow.itemSpacing = 12;
      proofRow.fills = [];

      const avatarGroup = figma.createFrame();
      avatarGroup.resize(76, 22);
      avatarGroup.fills = [];
      const userAvatars = [
        { x: 0,  bg: C.mint },
        { x: 14, bg: C.amber },
        { x: 28, bg: { r: 0.98, g: 0.57, b: 0.24 } },
        { x: 42, bg: C.rose }
      ];
      userAvatars.forEach(av => {
        const aDot = figma.createEllipse();
        aDot.resize(20, 20);
        aDot.x = av.x; aDot.y = 1;
        aDot.fills = solid(av.bg, 1);
        aDot.strokes = solid(C.glassBg, 1);
        aDot.strokeWeight = 1.5;
        avatarGroup.appendChild(aDot);
      });
      proofRow.appendChild(avatarGroup);
      proofRow.appendChild(createText("+1.4k singers trained today", 11, "Medium", C.textZinc400));
      cardCoach.appendChild(proofRow);

      // Radiant Button: Start 5-Min Drill (Full height 40px, zero clipping!)
      const startDrillBtn = createActionButton("Start 5-Min Drill", "arrow-up-right", "radiant");
      startDrillBtn.resize(332, 40);
      startDrillBtn.primaryAxisAlignItems = "CENTER";
      cardCoach.appendChild(startDrillBtn);
      row2.appendChild(cardCoach);

      // CARD 4: SESSION ACCURACY TREND (456 x 380)
      const cardAccuracy = figma.createFrame();
      cardAccuracy.name = "Card 4: Session Accuracy Bars";
      cardAccuracy.layoutMode = "VERTICAL";
      cardAccuracy.resize(456, 380);
      cardAccuracy.cornerRadius = 24;
      applyCard4Glass(cardAccuracy);
      cardAccuracy.paddingLeft = 24; cardAccuracy.paddingRight = 24; cardAccuracy.paddingTop = 20; cardAccuracy.paddingBottom = 20;
      cardAccuracy.itemSpacing = 12;
      cardAccuracy.clipsContent = false;

      const c4Header = figma.createFrame();
      c4Header.layoutMode = "HORIZONTAL";
      c4Header.resize(408, 32);
      c4Header.primaryAxisAlignItems = "SPACE_BETWEEN";
      c4Header.counterAxisAlignItems = "CENTER";
      c4Header.fills = [];

      const c4Left = figma.createFrame();
      c4Left.layoutMode = "HORIZONTAL";
      c4Left.primaryAxisSizingMode = "AUTO";
      c4Left.counterAxisSizingMode = "AUTO";
      c4Left.itemSpacing = 10;
      c4Left.counterAxisAlignItems = "CENTER";
      c4Left.fills = [];
      c4Left.appendChild(createText("Accuracy Trend", 15, "Bold", C.textWhite));
      c4Left.appendChild(createText("94.2%", 15, "Bold", C.mint));

      const upPill = figma.createFrame();
      upPill.layoutMode = "HORIZONTAL";
      upPill.primaryAxisSizingMode = "AUTO";
      upPill.counterAxisSizingMode = "AUTO";
      upPill.paddingLeft = 8; upPill.paddingRight = 8; upPill.paddingTop = 3; upPill.paddingBottom = 3;
      upPill.cornerRadius = 6;
      upPill.fills = solid(C.forestBase, 0.9);
      upPill.appendChild(createText("↑ 3.8%", 10, "Bold", C.mint));
      c4Left.appendChild(upPill);
      c4Header.appendChild(c4Left);

      const filterDrop = figma.createFrame();
      filterDrop.layoutMode = "HORIZONTAL";
      filterDrop.primaryAxisSizingMode = "AUTO";
      filterDrop.counterAxisSizingMode = "AUTO";
      filterDrop.paddingLeft = 10; filterDrop.paddingRight = 10; filterDrop.paddingTop = 5; filterDrop.paddingBottom = 5;
      filterDrop.cornerRadius = 8;
      applyGlassmorphism(filterDrop, 0.05, 0.08);
      filterDrop.itemSpacing = 6;
      filterDrop.counterAxisAlignItems = "CENTER";
      filterDrop.appendChild(createText("Weekly", 11, "Medium", C.textZinc300));
      filterDrop.appendChild(createSvgIcon("chevron-down", "#A1A1AA", 12));
      c4Header.appendChild(filterDrop);
      cardAccuracy.appendChild(c4Header);

      // Accuracy 7-Day Bar Chart (408 x 210)
      const chartBox = figma.createFrame();
      chartBox.resize(408, 206);
      chartBox.fills = [];
      chartBox.clipsContent = false;

      // Subtle horizontal reference grid lines
      [40, 90, 140].forEach(gy => {
        const gLine = figma.createRectangle();
        gLine.resize(408, 1); gLine.x = 0; gLine.y = gy;
        gLine.fills = solid(C.gridLine, 0.035);
        chartBox.appendChild(gLine);
      });

      const days = [
        { d: "Mon", val: 82, h: 105, peak: false },
        { d: "Tue", val: 88, h: 125, peak: false },
        { d: "Wed", val: 85, h: 118, peak: false },
        { d: "Thu", val: 91, h: 135, peak: false },
        { d: "Fri", val: 94, h: 145, peak: false },
        { d: "Sat", val: 98, h: 160, peak: true },
        { d: "Sun", val: 92, h: 138, peak: false }
      ];

      const barWidth = 32;
      const barSpacing = (408 - (days.length * barWidth)) / (days.length - 1);

      days.forEach((item, idx) => {
        const xPos = idx * (barWidth + barSpacing);
        const yPos = 175 - item.h;

        // Background Track Slot
        const slot = figma.createRectangle();
        slot.resize(barWidth, 160);
        slot.x = xPos; slot.y = 15;
        slot.cornerRadius = 8;
        slot.fills = solid(C.glassElevated, 0.6);
        chartBox.appendChild(slot);

        // Filled Bar
        const bar = figma.createRectangle();
        bar.resize(barWidth, item.h);
        bar.x = xPos; bar.y = yPos;
        bar.cornerRadius = 8;
        if (item.peak) {
          bar.fills = [{
            type: "GRADIENT_LINEAR",
            gradientTransform: [[0, 1, 0], [-1, 0, 1]],
            gradientStops: [
              { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 1 } },
              { position: 1.0, color: { r: C.emerald.r, g: C.emerald.g, b: C.emerald.b, a: 0.85 } }
            ]
          }];
          bar.strokes = solid(C.mint, 0.7);
          bar.strokeWeight = 1;

          // Peak floating badge
          const peakBadge = figma.createFrame();
          peakBadge.layoutMode = "HORIZONTAL";
          peakBadge.primaryAxisSizingMode = "AUTO";
          peakBadge.counterAxisSizingMode = "AUTO";
          peakBadge.paddingLeft = 7; peakBadge.paddingRight = 7; peakBadge.paddingTop = 3; peakBadge.paddingBottom = 3;
          peakBadge.cornerRadius = 6;
          peakBadge.fills = solid(C.glassElevated, 1);
          peakBadge.strokes = solid(C.mint, 0.6);
          peakBadge.strokeWeight = 1;
          peakBadge.x = xPos - 12; peakBadge.y = yPos - 26;
          peakBadge.appendChild(createText("98% Peak", 9, "Bold", C.mint));
          chartBox.appendChild(peakBadge);
        } else {
          bar.fills = [{
            type: "GRADIENT_LINEAR",
            gradientTransform: [[0, 1, 0], [-1, 0, 1]],
            gradientStops: [
              { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 0.65 } },
              { position: 1.0, color: { r: 0.08, g: 0.16, b: 0.14, a: 0.75 } }
            ]
          }];
        }
        chartBox.appendChild(bar);

        // Day Label
        const dayLbl = createText(item.d, 10, item.peak ? "Bold" : "Medium", item.peak ? C.mint : C.textZinc500);
        dayLbl.x = xPos + 4; dayLbl.y = 184;
        chartBox.appendChild(dayLbl);
      });
      cardAccuracy.appendChild(chartBox);

      // Bottom Metrics: Vibrato Rate & Steady Breath
      const c4Footer = figma.createFrame();
      c4Footer.layoutMode = "HORIZONTAL";
      c4Footer.resize(408, 28);
      c4Footer.primaryAxisAlignItems = "SPACE_BETWEEN";
      c4Footer.counterAxisAlignItems = "CENTER";
      c4Footer.fills = [];
      c4Footer.appendChild(createText("Vibrato Rate: 6.1 Hz (Natural)", 11, "Medium", C.textZinc400));
      c4Footer.appendChild(createText("Steady Breath: 88.4%", 11, "Bold", C.mint));
      cardAccuracy.appendChild(c4Footer);
      row2.appendChild(cardAccuracy);

      // CARD 5: RECENT SINGING TAKES (440 x 380)
      const cardHistory = figma.createFrame();
      cardHistory.name = "Card 5: Recent Singing Takes";
      cardHistory.layoutMode = "VERTICAL";
      cardHistory.resize(440, 380);
      cardHistory.cornerRadius = 24;
      applyCard5Glass(cardHistory);
      cardHistory.paddingLeft = 24; cardHistory.paddingRight = 24; cardHistory.paddingTop = 20; cardHistory.paddingBottom = 20;
      cardHistory.itemSpacing = 10;
      cardHistory.clipsContent = false;

      const c5Header = figma.createFrame();
      c5Header.layoutMode = "HORIZONTAL";
      c5Header.resize(392, 32);
      c5Header.primaryAxisAlignItems = "SPACE_BETWEEN";
      c5Header.counterAxisAlignItems = "CENTER";
      c5Header.fills = [];
      c5Header.appendChild(createText("Recent Singing Takes", 15, "Bold", C.textWhite));
      c5Header.appendChild(createActionButton("View All", "arrow-up-right", "secondary"));
      cardHistory.appendChild(c5Header);

      [
        {
          title: "Bohemian Rhapsody (G4)",
          meta: "Take 04 • Today 14:20 • 96% Acc",
          badge: "+15 pts",
          isFals: false,
          borderMint: true
        },
        {
          title: "Solfeggio Scale Drill",
          meta: "Take 03 • Today 11:05 • 82% Acc",
          badge: "00:23",
          isFals: true,
          borderMint: false
        },
        {
          title: "Vocal Range Assessment",
          meta: "Baseline • Yesterday • C2–A4 Span",
          badge: "PDF Ready",
          isFals: false,
          borderMint: false
        }
      ].forEach(tk => {
        const rowItem = figma.createFrame();
        rowItem.layoutMode = "HORIZONTAL"; rowItem.resize(392, 74);
        rowItem.primaryAxisAlignItems = "SPACE_BETWEEN"; rowItem.counterAxisAlignItems = "CENTER"; rowItem.cornerRadius = 14;
        applyGlassmorphism(rowItem, tk.borderMint ? 0.08 : 0.04, tk.borderMint ? 0.20 : 0.06, tk.borderMint);
        rowItem.paddingLeft = 14; rowItem.paddingRight = 14;

        const rLeft = figma.createFrame();
        rLeft.layoutMode = "HORIZONTAL"; rLeft.resize(260, 48);
        rLeft.itemSpacing = 12;
        rLeft.counterAxisAlignItems = "CENTER";
        rLeft.fills = [];

        const iconCircle = figma.createFrame();
        iconCircle.resize(38, 38); iconCircle.cornerRadius = 99;
        iconCircle.fills = solid(tk.isFals ? C.glassHighlight : C.forestBase, 1);
        iconCircle.strokes = solid(tk.isFals ? C.rose : C.mint, 0.4);
        iconCircle.strokeWeight = 1;
        iconCircle.layoutMode = "HORIZONTAL"; iconCircle.primaryAxisAlignItems = "CENTER"; iconCircle.counterAxisAlignItems = "CENTER";
        iconCircle.appendChild(createSvgIcon(tk.isFals ? "wave" : "mic", tk.isFals ? "#F43F5E" : "#00F5A0", 17));
        rLeft.appendChild(iconCircle);

        const colTxt = figma.createFrame();
        colTxt.layoutMode = "VERTICAL"; colTxt.resize(210, 38);
        colTxt.itemSpacing = 3; colTxt.fills = [];
        colTxt.appendChild(createText(tk.title, 12, "Bold", C.textWhite));
        colTxt.appendChild(createText(tk.meta, 10, "Regular", C.textZinc500));
        rLeft.appendChild(colTxt);
        rowItem.appendChild(rLeft);

        if (tk.isFals) {
          const replayBtn = figma.createFrame();
          replayBtn.layoutMode = "HORIZONTAL";
          replayBtn.primaryAxisSizingMode = "AUTO";
          replayBtn.counterAxisSizingMode = "AUTO";
          replayBtn.paddingLeft = 10; replayBtn.paddingRight = 10; replayBtn.paddingTop = 6; replayBtn.paddingBottom = 6;
          replayBtn.itemSpacing = 6; replayBtn.cornerRadius = 8;
          replayBtn.fills = solid(C.glassElevated, 1);
          replayBtn.strokes = solid(C.rose, 0.45);
          replayBtn.strokeWeight = 1;
          replayBtn.counterAxisAlignItems = "CENTER";
          replayBtn.appendChild(createSvgIcon("play", "#F43F5E", 10));
          replayBtn.appendChild(createText("Replay " + tk.badge, 11, "Bold", C.rose));
          rowItem.appendChild(replayBtn);
        } else {
          const badgePill = figma.createFrame();
          badgePill.layoutMode = "HORIZONTAL";
          badgePill.primaryAxisSizingMode = "AUTO";
          badgePill.counterAxisSizingMode = "AUTO";
          badgePill.paddingLeft = 8; badgePill.paddingRight = 8; badgePill.paddingTop = 4; badgePill.paddingBottom = 4;
          badgePill.cornerRadius = 6;
          badgePill.fills = solid(tk.borderMint ? C.forestBase : C.glassElevated, 1);
          badgePill.strokes = solid(tk.borderMint ? C.mint : C.glassBorder, tk.borderMint ? 0.4 : 0.08);
          badgePill.strokeWeight = 1;
          badgePill.appendChild(createText(tk.badge, 11, "Bold", tk.borderMint ? C.mint : C.textZinc300));
          rowItem.appendChild(badgePill);
        }
        cardHistory.appendChild(rowItem);
      });
      row2.appendChild(cardHistory);

      return workspace;
    }

    // -------------------------------------------------------------------------
    // 6. VOCAL AUDIT & SCORING CARDS (Benefit-Driven Selling Architecture)
    // -------------------------------------------------------------------------
    function renderVocalAuditCards(container) {
      const fHeader = figma.createFrame();
      fHeader.layoutMode = "VERTICAL"; fHeader.primaryAxisSizingMode = "AUTO"; fHeader.counterAxisSizingMode = "FIXED";
      fHeader.resize(900, 110); fHeader.primaryAxisAlignItems = "CENTER"; fHeader.counterAxisAlignItems = "CENTER"; fHeader.itemSpacing = 8; fHeader.fills = [];

      const fTag = createText("INSTANT VOCAL AUDIT & SCORING", 11, "Bold", C.mint);
      fTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      fHeader.appendChild(fTag);

      fHeader.appendChild(createParagraph("Know Exactly How Good Your Singing Really Is", 900, 34, "Bold", C.textWhite, 42, "CENTER"));
      fHeader.appendChild(createParagraph("Stop guessing if you're in tune. VocalSense listens in real time, grades your pitch down to the cent, and highlights every vocal flaw instantly.", 720, 14, "Regular", C.textZinc400, 22, "CENTER"));
      container.appendChild(fHeader);

      // Bento Row 1: Two Large Cards with applyCard1Glass and applyCard2Glass!
      const bRow1 = figma.createFrame();
      bRow1.layoutMode = "HORIZONTAL"; bRow1.resize(1140, 460); bRow1.itemSpacing = 24; bRow1.fills = [];

      // Card 1: Honest Pitch Grading, Down to the Cent
      const c1Feat = figma.createFrame();
      c1Feat.name = "Bento/Honest Pitch Grading";
      c1Feat.resize(558, 460); c1Feat.cornerRadius = 20;
      applyCard1Glass(c1Feat);
      c1Feat.paddingLeft = 28; c1Feat.paddingRight = 28; c1Feat.paddingTop = 26; c1Feat.paddingBottom = 26;
      c1Feat.itemSpacing = 12; c1Feat.layoutMode = "VERTICAL";

      const c1Top = figma.createFrame();
      c1Top.layoutMode = "HORIZONTAL"; c1Top.resize(502, 22); c1Top.counterAxisAlignItems = "CENTER"; c1Top.primaryAxisAlignItems = "SPACE_BETWEEN"; c1Top.fills = [];
      c1Top.appendChild(createText("INSTANT PITCH AUDIT", 10, "Bold", C.mint));
      c1Top.appendChild(createBadge("REAL-TIME DETECTOR", "mint", 9));
      c1Feat.appendChild(c1Top);

      c1Feat.appendChild(createText("Honest Pitch Grading, Down to the Cent", 18, "Bold", C.textWhite));
      c1Feat.appendChild(createParagraph(
        "Sing into your microphone and get an objective verdict immediately. Detects micro-flats, sharps, and vocal wavering that human ears miss.",
        502, 13, "Regular", C.textZinc400, 20, "LEFT"
      ));

      const dspBox = figma.createFrame();
      dspBox.resize(502, 270); dspBox.cornerRadius = 12;
      dspBox.paddingLeft = 16; dspBox.paddingRight = 16; dspBox.paddingTop = 14; dspBox.paddingBottom = 14;
      dspBox.layoutMode = "VERTICAL"; dspBox.itemSpacing = 12;
      dspBox.fills = solid(C.canvasBot, 0.95); dspBox.strokes = solid(C.glassBorder, 0.08); dspBox.strokeWeight = 1;

      const specFrame = figma.createFrame();
      specFrame.resize(470, 148); specFrame.fills = solid(C.glassElevated, 0.5);
      specFrame.cornerRadius = 8; specFrame.strokes = solid(C.glassBorder, 0.06); specFrame.strokeWeight = 1;

      const targetLine = figma.createRectangle();
      targetLine.resize(450, 1); targetLine.x = 10; targetLine.y = 74;
      targetLine.fills = solid(C.cyan, 0.45);
      specFrame.appendChild(targetLine);

      const targetLabel = createText("TARGET PITCH: G4 (392.0 Hz)", 9, "Bold", C.cyan);
      targetLabel.x = 14; targetLabel.y = 56;
      specFrame.appendChild(targetLabel);

      const curvePoints = [
        { x: 14, h: 36, y: 56, col: C.mint, ok: true },
        { x: 34, h: 42, y: 53, col: C.mint, ok: true },
        { x: 54, h: 48, y: 50, col: C.mint, ok: true },
        { x: 74, h: 44, y: 52, col: C.mint, ok: true },
        { x: 94, h: 38, y: 55, col: C.mint, ok: true },
        { x: 134, h: 28, y: 90, col: C.rose, ok: false },
        { x: 154, h: 26, y: 92, col: C.rose, ok: false },
        { x: 174, h: 28, y: 90, col: C.rose, ok: false },
        { x: 194, h: 32, y: 86, col: C.amber, ok: false },
        { x: 234, h: 46, y: 51, col: C.mint, ok: true },
        { x: 254, h: 52, y: 48, col: C.mint, ok: true },
        { x: 274, h: 56, y: 46, col: C.mint, ok: true },
        { x: 294, h: 50, y: 49, col: C.mint, ok: true },
        { x: 314, h: 44, y: 52, col: C.mint, ok: true },
        { x: 354, h: 48, y: 50, col: C.mint, ok: true },
        { x: 374, h: 54, y: 47, col: C.mint, ok: true },
        { x: 394, h: 58, y: 45, col: C.mint, ok: true },
        { x: 414, h: 52, y: 48, col: C.mint, ok: true },
        { x: 434, h: 46, y: 51, col: C.mint, ok: true }
      ];
      curvePoints.forEach(pt => {
        const bar = figma.createRectangle();
        bar.resize(10, pt.h); bar.x = pt.x; bar.y = pt.y; bar.cornerRadius = 2;
        bar.fills = solid(pt.col, pt.ok ? 0.75 : 0.95);
        specFrame.appendChild(bar);
      });

      const flawCallout = figma.createFrame();
      flawCallout.layoutMode = "HORIZONTAL";
      flawCallout.paddingLeft = 8; flawCallout.paddingRight = 8; flawCallout.paddingTop = 3; flawCallout.paddingBottom = 3;
      flawCallout.cornerRadius = 4;
      flawCallout.fills = solid(C.rose, 0.2); flawCallout.strokes = solid(C.rose, 0.7); flawCallout.strokeWeight = 1;
      flawCallout.x = 120; flawCallout.y = 12;
      flawCallout.counterAxisAlignItems = "CENTER";
      flawCallout.appendChild(createText("-24 CENTS FLAT ⚠️", 8, "Bold", C.rose));
      specFrame.appendChild(flawCallout);

      const okCallout = figma.createFrame();
      okCallout.layoutMode = "HORIZONTAL";
      okCallout.paddingLeft = 8; okCallout.paddingRight = 8; okCallout.paddingTop = 3; okCallout.paddingBottom = 3;
      okCallout.cornerRadius = 4;
      okCallout.fills = solid(C.mint, 0.2); okCallout.strokes = solid(C.mint, 0.7); okCallout.strokeWeight = 1;
      okCallout.x = 260; okCallout.y = 12;
      okCallout.counterAxisAlignItems = "CENTER";
      okCallout.appendChild(createText("IN-TUNE: 0.2c DEV ✓", 8, "Bold", C.mint));
      specFrame.appendChild(okCallout);

      dspBox.appendChild(specFrame);

      const dspGrid = figma.createFrame();
      dspGrid.layoutMode = "HORIZONTAL"; dspGrid.resize(470, 60); dspGrid.itemSpacing = 10; dspGrid.fills = [];

      function makeDspStat(label, val, valCol = C.mint) {
        const f = figma.createFrame();
        f.resize(110, 60); f.cornerRadius = 8; f.paddingLeft = 10; f.paddingTop = 8; f.layoutMode = "VERTICAL"; f.itemSpacing = 2;
        f.fills = solid(C.glassElevated, 0.85); f.strokes = solid(C.glassBorder, 0.08); f.strokeWeight = 1;
        f.appendChild(createText(label, 9, "Bold", C.textZinc500));
        f.appendChild(createText(val, 12, "Bold", valCol));
        return f;
      }
      dspGrid.appendChild(makeDspStat("VERDICT", "INSTANT AUDIT", C.textWhite));
      dspGrid.appendChild(makeDspStat("PITCH STATUS", "98.4% IN-TUNE", C.mint));
      dspGrid.appendChild(makeDspStat("SENSITIVITY", "0.1 CENT", C.cyan));
      dspGrid.appendChild(makeDspStat("LATENCY", "ZERO DELAY", C.mint));
      dspBox.appendChild(dspGrid);

      c1Feat.appendChild(dspBox);
      bRow1.appendChild(c1Feat);

      // Card 2: Vocal Tone, Strain & Break Detection
      const c2Feat = figma.createFrame();
      c2Feat.name = "Bento/Vocal Tone & Strain";
      c2Feat.resize(558, 460); c2Feat.cornerRadius = 20;
      applyCard2Glass(c2Feat);
      c2Feat.paddingLeft = 28; c2Feat.paddingRight = 28; c2Feat.paddingTop = 26; c2Feat.paddingBottom = 26;
      c2Feat.itemSpacing = 12; c2Feat.layoutMode = "VERTICAL";

      const c2Top = figma.createFrame();
      c2Top.layoutMode = "HORIZONTAL"; c2Top.resize(502, 22); c2Top.counterAxisAlignItems = "CENTER"; c2Top.primaryAxisAlignItems = "SPACE_BETWEEN"; c2Top.fills = [];
      c2Top.appendChild(createText("VOICE QUALITY DIAGNOSTIC", 10, "Bold", C.cyan));
      c2Top.appendChild(createBadge("ACOUSTIC AUDIT", "cyan", 9));
      c2Feat.appendChild(c2Top);

      c2Feat.appendChild(createText("Vocal Tone, Strain & Break Detection", 18, "Bold", C.textWhite));
      c2Feat.appendChild(createParagraph(
        "It doesn't just check if you hit the note—it evaluates how your voice sounds. Identifies vocal tension, breathiness, and seamless mix-voice balance.",
        502, 13, "Regular", C.textZinc400, 20, "LEFT"
      ));

      const formBox = figma.createFrame();
      formBox.resize(502, 270); formBox.cornerRadius = 12;
      formBox.paddingLeft = 18; formBox.paddingRight = 18; formBox.paddingTop = 16; formBox.paddingBottom = 16;
      formBox.layoutMode = "VERTICAL"; formBox.itemSpacing = 12;
      formBox.fills = solid(C.canvasBot, 0.95); formBox.strokes = solid(C.glassBorder, 0.08); formBox.strokeWeight = 1;

      function makeFBarRow(name, statStr, pct, col) {
        const fr = figma.createFrame(); fr.layoutMode = "VERTICAL"; fr.resize(466, 36); fr.itemSpacing = 4; fr.fills = [];
        const top = figma.createFrame(); top.layoutMode = "HORIZONTAL"; top.resize(466, 16); top.counterAxisAlignItems = "CENTER"; top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.fills = [];
        top.appendChild(createText(name, 11, "Medium", C.textWhite));
        top.appendChild(createText(statStr, 11, "Bold", col));
        fr.appendChild(top);

        const track = figma.createFrame(); track.resize(466, 6); track.cornerRadius = 3; track.fills = solid(C.glassElevated, 1);
        const fill = figma.createRectangle(); fill.resize(Math.round(466 * pct), 6); fill.cornerRadius = 3; fill.fills = solid(col, 1);
        track.appendChild(fill);
        fr.appendChild(track);
        return fr;
      }
      formBox.appendChild(makeFBarRow("Chest Resonance (Fullness & Warmth)", "85% (Solid Core)", 0.85, C.mint));
      formBox.appendChild(makeFBarRow("High Note Tension / Strain Level", "Low / Relaxed", 0.92, C.cyan));
      formBox.appendChild(makeFBarRow("Acoustic Clarity & Breath Seal", "94% (Zero Air Leaks)", 0.94, C.amber));

      const pasRow = figma.createFrame();
      pasRow.layoutMode = "HORIZONTAL"; pasRow.resize(466, 44); pasRow.counterAxisAlignItems = "CENTER"; pasRow.primaryAxisAlignItems = "SPACE_BETWEEN";
      pasRow.paddingLeft = 14; pasRow.paddingRight = 14; pasRow.cornerRadius = 8;
      pasRow.fills = solid(C.forestDark, 1); pasRow.strokes = solid(C.mint, 0.35); pasRow.strokeWeight = 1;
      const pasL = figma.createFrame(); pasL.layoutMode = "HORIZONTAL"; pasL.itemSpacing = 8; pasL.counterAxisAlignItems = "CENTER"; pasL.fills = [];
      pasL.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
      pasL.appendChild(createText("High Note Passaggio: F#4 / G4", 11, "Bold", C.textWhite));
      pasRow.appendChild(pasL);
      pasRow.appendChild(createBadge("CLEAN & UNSTRAINED", "mint", 9));
      formBox.appendChild(pasRow);

      c2Feat.appendChild(formBox);
      bRow1.appendChild(c2Feat);
      container.appendChild(bRow1);

      // Bento Row 2: 3 Cards (364 x 330)
      const bRow2 = figma.createFrame();
      bRow2.layoutMode = "HORIZONTAL"; bRow2.resize(1140, 330); bRow2.primaryAxisSizingMode = "AUTO"; bRow2.itemSpacing = 24; bRow2.fills = [];
      bRow2.clipsContent = false;

      function makeMiniFeature(title, desc, iconName, statTxt, glassFn, customWidget) {
        const mc = figma.createFrame();
        mc.resize(364, 330); mc.cornerRadius = 20;
        mc.primaryAxisSizingMode = "AUTO"; mc.counterAxisSizingMode = "FIXED";
        mc.clipsContent = false;
        glassFn(mc);
        mc.paddingLeft = 24; mc.paddingRight = 24; mc.paddingTop = 22; mc.paddingBottom = 24;
        mc.layoutMode = "VERTICAL"; mc.primaryAxisAlignItems = "SPACE_BETWEEN";

        const mTop = figma.createFrame();
        mTop.layoutMode = "VERTICAL"; mTop.resize(316, 120); mTop.itemSpacing = 10; mTop.fills = [];
        
        mTop.appendChild(createSvgIcon(iconName, "#00F5A0", 22));
        mTop.appendChild(createText(title, 16, "Bold", C.textWhite));
        mTop.appendChild(createParagraph(desc, 316, 12, "Regular", C.textZinc400, 18, "LEFT"));
        mc.appendChild(mTop);

        if (customWidget) {
          mc.appendChild(customWidget);
        }

        const bF = figma.createFrame();
        bF.layoutMode = "HORIZONTAL"; bF.itemSpacing = 8; bF.counterAxisAlignItems = "CENTER"; bF.fills = [];
        bF.appendChild(createText("PRECISION METRIC:", 10, "Bold", C.textZinc500));
        bF.appendChild(createText(statTxt, 11, "Bold", C.mint));
        mc.appendChild(bF);

        return mc;
      }

      // Widget 1: Word-by-word syllable chip tags
      const wSyllables = figma.createFrame();
      wSyllables.layoutMode = "HORIZONTAL"; wSyllables.resize(316, 32); wSyllables.cornerRadius = 6;
      wSyllables.fills = solid(C.canvasBot, 0.95); wSyllables.strokes = solid(C.glassBorder, 0.08); wSyllables.strokeWeight = 1;
      wSyllables.paddingLeft = 8; wSyllables.paddingRight = 8; wSyllables.itemSpacing = 6; wSyllables.counterAxisAlignItems = "CENTER";
      [
        { w: "\"Cause\"", s: "100%", c: C.mint, bg: 0.15 },
        { w: "\"You\"", s: "-18c Flat ⚠️", c: C.rose, bg: 0.25 },
        { w: "\"Loved\"", s: "In-Tune", c: C.mint, bg: 0.15 },
        { w: "\"Me\"", s: "Solid", c: C.cyan, bg: 0.15 }
      ].forEach(item => {
        const chip = figma.createFrame(); chip.layoutMode = "HORIZONTAL"; chip.itemSpacing = 4; chip.counterAxisAlignItems = "CENTER";
        chip.paddingLeft = 6; chip.paddingRight = 6; chip.paddingTop = 4; chip.paddingBottom = 4; chip.cornerRadius = 4;
        chip.fills = solid(item.c, item.bg); chip.strokes = solid(item.c, 0.6); chip.strokeWeight = 1;
        chip.appendChild(createText(item.w + " " + item.s, 8, "Bold", item.c));
        wSyllables.appendChild(chip);
      });

      // Widget 2: 5-Pillar Scorecard
      const wRadar = figma.createFrame();
      wRadar.layoutMode = "HORIZONTAL"; wRadar.resize(316, 32); wRadar.cornerRadius = 6;
      wRadar.fills = solid(C.canvasBot, 0.95); wRadar.strokes = solid(C.glassBorder, 0.08); wRadar.strokeWeight = 1;
      wRadar.paddingLeft = 10; wRadar.paddingRight = 10; wRadar.counterAxisAlignItems = "CENTER"; wRadar.primaryAxisAlignItems = "SPACE_BETWEEN";
      [
        { l: "PITCH", v: "98%" },
        { l: "VIB", v: "94%" },
        { l: "TIMBRE", v: "90%" },
        { l: "BREATH", v: "92%" },
        { l: "DYNAMICS", v: "88%" }
      ].forEach(ax => {
        const af = figma.createFrame(); af.layoutMode = "VERTICAL"; af.itemSpacing = 1; af.counterAxisAlignItems = "CENTER"; af.fills = [];
        af.appendChild(createText(ax.l, 7, "Bold", C.textZinc500));
        af.appendChild(createText(ax.v, 9, "Bold", C.mint));
        wRadar.appendChild(af);
      });

      // Widget 3: Format Badges
      const wExport = figma.createFrame();
      wExport.layoutMode = "HORIZONTAL"; wExport.resize(316, 32); wExport.cornerRadius = 6;
      wExport.fills = solid(C.canvasBot, 0.95); wExport.strokes = solid(C.glassBorder, 0.08); wExport.strokeWeight = 1;
      wExport.paddingLeft = 8; wExport.paddingRight = 8; wExport.itemSpacing = 8; wExport.counterAxisAlignItems = "CENTER";
      [
        { t: "VERIFIED PDF", c: C.mint },
        { t: "STEMS (WAV)", c: C.cyan },
        { t: "MIDI ROLL", c: C.amber }
      ].forEach(fp => {
        const chip = figma.createFrame(); chip.layoutMode = "HORIZONTAL"; chip.itemSpacing = 4; chip.counterAxisAlignItems = "CENTER";
        chip.paddingLeft = 8; chip.paddingRight = 8; chip.paddingTop = 4; chip.paddingBottom = 4; chip.cornerRadius = 4;
        chip.fills = solid(fp.c, 0.15); chip.strokes = solid(fp.c, 0.45); chip.strokeWeight = 1;
        chip.appendChild(createText(fp.t, 8, "Bold", fp.c));
        wExport.appendChild(chip);
      });

      bRow2.appendChild(makeMiniFeature(
        "Second-by-Second Flaw Highlighter",
        "Never wonder which part sounded bad. Color-coded flags mark every flat syllable instantly so you know exactly which word to polish.",
        "sparkle", "Word-by-Word Marking", applyCard3Glass, wSyllables
      ));
      bRow2.appendChild(makeMiniFeature(
        "5-Pillar Vocal Scorecard",
        "Holistic grading across 5 core disciplines: Pitch Intonation, Vibrato Stability, Timbre Richness, Breath Stamina, and Dynamics.",
        "zap", "Grade A (Conservatory)", applyCard4Glass, wRadar
      ));
      bRow2.appendChild(makeMiniFeature(
        "Audition-Ready Vocal Certificates",
        "Download official PDF score reports and pure audio stems to verify your vocal capability for auditions, classes, or personal proof.",
        "download", "Lossless PDF & Audio", applyCard5Glass, wExport
      ));

      container.appendChild(bRow2);
    }

    function createVocalAuditCardsFrame(originX = 0, originY = 0) {
      const cardsRoot = figma.createFrame();
      cardsRoot.name = "VocalSense AI — Vocal Quality Audit Cards (Finishing Canvas)";
      cardsRoot.x = originX;
      cardsRoot.y = originY;
      cardsRoot.layoutMode = "VERTICAL";
      cardsRoot.primaryAxisSizingMode = "AUTO";
      cardsRoot.counterAxisSizingMode = "FIXED";
      cardsRoot.resize(1260, 960);
      cardsRoot.primaryAxisAlignItems = "MIN";
      cardsRoot.counterAxisAlignItems = "CENTER";
      cardsRoot.paddingTop = 60;
      cardsRoot.paddingBottom = 60;
      cardsRoot.paddingLeft = 60;
      cardsRoot.paddingRight = 60;
      cardsRoot.itemSpacing = 32;
      cardsRoot.cornerRadius = 24;
      cardsRoot.fills = solid(C.canvasTop, 1);
      cardsRoot.strokes = solid(C.glassBorder, 0.08);
      cardsRoot.strokeWeight = 1;
      applyGlassEffects(cardsRoot, 0.08, false);

      renderVocalAuditCards(cardsRoot);

      return cardsRoot;
    }

    function createHomepage(offsetX = 0, offsetY = 0) {
      const homeRoot = figma.createFrame();
      homeRoot.name = "VocalSense AI — 01. Official Homepage (Full Desktop Experience)";
      homeRoot.x = offsetX;
      homeRoot.y = offsetY;
      homeRoot.resize(1440, 5200);
      homeRoot.fills = solid(C.canvasTop, 1);
      homeRoot.clipsContent = false;

      // Subtle Background Grid
      const gridCanvas = figma.createFrame();
      gridCanvas.name = "Studio Acoustic Grid";
      gridCanvas.resize(1440, 5200);
      gridCanvas.fills = [];
      gridCanvas.clipsContent = true;

      for (let y = 0; y < 5200; y += 80) {
        const hl = figma.createRectangle();
        hl.resize(1440, 1); hl.x = 0; hl.y = y;
        hl.fills = solid(C.gridLine, 0.04);
        gridCanvas.appendChild(hl);
      }
      for (let x = 0; x < 1440; x += 80) {
        const vl = figma.createRectangle();
        vl.resize(1, 5200); vl.x = x; vl.y = 0;
        vl.fills = solid(C.gridLine, 0.04);
        gridCanvas.appendChild(vl);
      }
      homeRoot.appendChild(gridCanvas);

      // Ambient Bloom Glows
      function addHomeBloom(cx, cy, w, h, col, op) {
        const aura = figma.createEllipse();
        aura.resize(w, h); aura.x = cx; aura.y = cy;
        aura.fills = [{
          type: "GRADIENT_RADIAL",
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0.0, color: { r: col.r, g: col.g, b: col.b, a: op } },
            { position: 0.55, color: { r: col.r, g: col.g, b: col.b, a: op * 0.3 } },
            { position: 1.0, color: { r: col.r, g: col.g, b: col.b, a: 0.0 } }
          ]
        }];
        homeRoot.appendChild(aura);
      }
      addHomeBloom(100, 240, 750, 520, C.mint, 0.16);
      addHomeBloom(760, 240, 680, 500, { r: 0.65, g: 0.35, b: 0.85 }, 0.13);
      addHomeBloom(300, 1600, 850, 500, C.emerald, 0.10);
      addHomeBloom(350, 2700, 800, 480, C.mint, 0.08);

      // Master Vertical Auto-Layout Stack
      const stack = figma.createFrame();
      stack.name = "Homepage Sections Stack";
      stack.layoutMode = "VERTICAL";
      stack.resize(1440, 5200);
      stack.fills = [];
      stack.primaryAxisSizingMode = "AUTO";
      stack.counterAxisSizingMode = "FIXED";
      stack.counterAxisAlignItems = "CENTER";
      stack.itemSpacing = 0;
      homeRoot.appendChild(stack);

      // -----------------------------------------------------------------------
      // 1. TOP NAVBAR (CLEAN VECTOR LOGO, NO GREEN CAPSULE BOX)
      // -----------------------------------------------------------------------
      const navContainer = figma.createFrame();
      navContainer.name = "1. Top Navbar";
      navContainer.layoutMode = "HORIZONTAL";
      navContainer.resize(1440, 80);
      navContainer.primaryAxisSizingMode = "FIXED";
      navContainer.counterAxisSizingMode = "FIXED";
      navContainer.layoutAlign = "STRETCH";
      navContainer.paddingLeft = 80;
      navContainer.paddingRight = 80;
      navContainer.paddingTop = 20;
      navContainer.paddingBottom = 20;
      navContainer.counterAxisAlignItems = "CENTER";
      navContainer.primaryAxisAlignItems = "SPACE_BETWEEN";
      navContainer.fills = solid(C.canvasTop, 0.92);
      navContainer.strokes = solid(C.glassBorder, 0.08);
      navContainer.strokeWeight = 1;

      // Clean Brand Mark: Direct Vector Sparkle Icon + Title (NO container box!)
      const brandRow = figma.createFrame();
      brandRow.layoutMode = "HORIZONTAL"; brandRow.itemSpacing = 10; brandRow.counterAxisAlignItems = "CENTER"; brandRow.fills = [];
      brandRow.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
      brandRow.appendChild(createText("VocalSense AI", 16, "Bold", C.textWhite));
      navContainer.appendChild(brandRow);

      // Center Navigation Links
      const navLinks = figma.createFrame();
      navLinks.layoutMode = "HORIZONTAL"; navLinks.itemSpacing = 32; navLinks.counterAxisAlignItems = "CENTER"; navLinks.fills = [];
      navLinks.appendChild(createText("Features", 13, "Medium", C.textZinc400));
      navLinks.appendChild(createText("Web Studio", 13, "Bold", C.mint));
      navLinks.appendChild(createText("Formant DSP", 13, "Medium", C.textZinc400));
      navLinks.appendChild(createText("Gemini Pedagogy", 13, "Medium", C.textZinc400));
      navLinks.appendChild(createText("Pricing", 13, "Medium", C.textZinc400));
      navContainer.appendChild(navLinks);

      // Right CTA: Squircle Action Button (cornerRadius: 8)
      const navRight = figma.createFrame();
      navRight.layoutMode = "HORIZONTAL"; navRight.itemSpacing = 18; navRight.counterAxisAlignItems = "CENTER"; navRight.fills = [];
      navRight.appendChild(createText("Sign In", 13, "Medium", C.textZinc400));
      navRight.appendChild(createActionButton("Launch Studio", "arrow-up-right", "radiant"));
      navContainer.appendChild(navRight);

      stack.appendChild(navContainer);

      // -----------------------------------------------------------------------
      // 2. HERO SECTION (EDITORIAL, CLEAN TRACKED TAG, NO BOX CONTAINER)
      // -----------------------------------------------------------------------
      const heroSection = figma.createFrame();
      heroSection.name = "2. Hero Section";
      heroSection.layoutMode = "VERTICAL";
      heroSection.primaryAxisSizingMode = "AUTO";
      heroSection.counterAxisSizingMode = "FIXED";
      heroSection.resize(1440, 1180);
      heroSection.primaryAxisAlignItems = "CENTER";
      heroSection.counterAxisAlignItems = "CENTER";
      heroSection.paddingTop = 64;
      heroSection.paddingBottom = 60;
      heroSection.layoutAlign = "STRETCH";
      heroSection.itemSpacing = 0;
      heroSection.fills = [];

      // Clean Eyebrow Text: Direct Tracked Typography (NO green container box!)
      const heroTag = createText("BIO-ACOUSTIC PITCH DIAGNOSTIC WEB PLATFORM", 11, "Bold", C.mint);
      heroTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      heroSection.appendChild(heroTag);

      const sp1 = figma.createFrame(); sp1.resize(1, 16); sp1.fills = []; heroSection.appendChild(sp1);

      // Master Headline (Wrapped 2 lines, tight tracking, ZERO truncation!)
      const h1Node = createParagraph(
        "Precision Bio-Acoustic Studio &\\nReal-Time Vocal Diagnostics",
        960, 50, "Bold", C.textWhite, 58, "CENTER"
      );
      h1Node.letterSpacing = { value: -1.5, unit: "PIXELS" };
      heroSection.appendChild(h1Node);

      const sp2 = figma.createFrame(); sp2.resize(1, 16); sp2.fills = []; heroSection.appendChild(sp2);

      // Subtitle
      const subNode = createParagraph(
        "Sub-millisecond YIN pitch detection, formant resonance tracking, and personalized vocal pedagogy powered by Gemini AI — zero latency, directly in your web browser.",
        720, 15, "Regular", C.textZinc400, 24, "CENTER"
      );
      heroSection.appendChild(subNode);

      const sp3 = figma.createFrame(); sp3.resize(1, 28); sp3.fills = []; heroSection.appendChild(sp3);

      // Dual Action Buttons: SQUIRCLES (cornerRadius: 8)
      const ctaRow = figma.createFrame();
      ctaRow.layoutMode = "HORIZONTAL"; ctaRow.itemSpacing = 16; ctaRow.counterAxisAlignItems = "CENTER"; ctaRow.fills = [];
      ctaRow.appendChild(createActionButton("Start Vocal Analysis", "arrow-up-right", "radiant"));
      ctaRow.appendChild(createActionButton("Explore Live Console", "arrow-down-right", "secondary"));
      heroSection.appendChild(ctaRow);

      const sp4 = figma.createFrame(); sp4.resize(1, 36); sp4.fills = []; heroSection.appendChild(sp4);

      // -----------------------------------------------------------------------
      // 3. THE GRAND SHOWCASE: WEB APPLICATION BROWSER WINDOW FRAME
      // -----------------------------------------------------------------------
      const showcaseFrame = figma.createFrame();
      showcaseFrame.name = "Hero Showcase Web App Window";
      showcaseFrame.resize(1356, 960);
      showcaseFrame.cornerRadius = 20; // SQUIRCLE FRAME
      showcaseFrame.clipsContent = false; // ZERO CLIPPING!
      showcaseFrame.fills = solid(C.canvasBot, 0.96);
      showcaseFrame.strokes = solid(C.glassBorder, 0.12);
      showcaseFrame.strokeWeight = 1.2;
      showcaseFrame.layoutMode = "VERTICAL";
      showcaseFrame.primaryAxisSizingMode = "AUTO";
      showcaseFrame.counterAxisSizingMode = "FIXED";
      showcaseFrame.paddingLeft = 24; showcaseFrame.paddingRight = 24; showcaseFrame.paddingTop = 16; showcaseFrame.paddingBottom = 24;
      showcaseFrame.itemSpacing = 14;
      showcaseFrame.primaryAxisAlignItems = "CENTER"; showcaseFrame.counterAxisAlignItems = "CENTER";

      // Glow Shadow
      showcaseFrame.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.75 },
          offset: { x: 0, y: 32 },
          radius: 72,
          spread: -8,
          visible: true,
          blendMode: "NORMAL",
          showShadowBehindNode: false
        }
      ];

      // Authentic Modern Web Browser Bar
      const browserBar = figma.createFrame();
      browserBar.layoutMode = "HORIZONTAL";
      browserBar.resize(1308, 32);
      browserBar.primaryAxisAlignItems = "SPACE_BETWEEN";
      browserBar.counterAxisAlignItems = "CENTER";
      browserBar.fills = [];

      // Left: 3 macOS browser control dots
      const bDots = figma.createFrame();
      bDots.layoutMode = "HORIZONTAL"; bDots.itemSpacing = 8; bDots.counterAxisAlignItems = "CENTER"; bDots.fills = [];
      [{ c: { r: 1.0, g: 0.36, b: 0.34 } }, { c: { r: 1.0, g: 0.75, b: 0.20 } }, { c: { r: 0.16, g: 0.80, b: 0.25 } }].forEach(d => {
        const dot = figma.createEllipse(); dot.resize(10, 10); dot.fills = solid(d.c, 1); bDots.appendChild(dot);
      });
      browserBar.appendChild(bDots);

      // Center: Web URL Address Pill
      const urlPill = figma.createFrame();
      urlPill.layoutMode = "HORIZONTAL"; urlPill.resize(480, 26); urlPill.cornerRadius = 6;
      urlPill.fills = solid(C.glassElevated, 0.95); urlPill.strokes = solid(C.glassBorder, 0.10); urlPill.strokeWeight = 1;
      urlPill.counterAxisAlignItems = "CENTER"; urlPill.primaryAxisAlignItems = "CENTER"; urlPill.itemSpacing = 8;
      urlPill.appendChild(createSvgIcon("lock", "#00F5A0", 12));
      urlPill.appendChild(createText("https://app.vocalsense.ai/diagnostics/live-studio", 11, "Medium", C.textZinc300));
      browserBar.appendChild(urlPill);

      // Right: WebAudio status
      const bStat = figma.createFrame();
      bStat.layoutMode = "HORIZONTAL"; bStat.itemSpacing = 6; bStat.counterAxisAlignItems = "CENTER"; bStat.fills = [];
      const bD = figma.createEllipse(); bD.resize(6, 6); bD.fills = solid(C.mint, 1); bStat.appendChild(bD);
      bStat.appendChild(createText("WebAudio DSP • 48kHz (Active)", 10, "Bold", C.mint));
      browserBar.appendChild(bStat);

      showcaseFrame.appendChild(browserBar);

      // Embed the EXACT Studio Workspace from patokan.png!
      const studioWorkbench = createExactStudioWorkspace();
      showcaseFrame.appendChild(studioWorkbench);

      heroSection.appendChild(showcaseFrame);
      stack.appendChild(heroSection);

      // -----------------------------------------------------------------------
      // 4. FEATURES BENTO GRID (WITH patokan.png SIGNATURE GRADIENTS)
      // -----------------------------------------------------------------------
      const featSection = figma.createFrame();
      featSection.name = "4. Features Bento Grid";
      featSection.layoutMode = "VERTICAL";
      featSection.primaryAxisSizingMode = "AUTO";
      featSection.counterAxisSizingMode = "FIXED";
      featSection.resize(1440, 1160);
      featSection.primaryAxisAlignItems = "CENTER";
      featSection.counterAxisAlignItems = "CENTER";
      featSection.paddingTop = 60;
      featSection.paddingBottom = 60;
      featSection.itemSpacing = 28;
      featSection.fills = [];

      renderVocalAuditCards(featSection);
      stack.appendChild(featSection);

      // -----------------------------------------------------------------------
      // 5. 3-STEP JOURNEY ("HOW IT WORKS")
      // -----------------------------------------------------------------------
      const stepSection = figma.createFrame();
      stepSection.name = "5. 3-Step Journey";
      stepSection.layoutMode = "VERTICAL";
      stepSection.primaryAxisSizingMode = "AUTO";
      stepSection.counterAxisSizingMode = "FIXED";
      stepSection.resize(1440, 470);
      stepSection.primaryAxisAlignItems = "CENTER";
      stepSection.counterAxisAlignItems = "CENTER";
      stepSection.paddingTop = 50;
      stepSection.paddingBottom = 40;
      stepSection.itemSpacing = 28;
      stepSection.fills = [];

      const sHeader = figma.createFrame();
      sHeader.layoutMode = "VERTICAL"; sHeader.primaryAxisSizingMode = "AUTO"; sHeader.counterAxisSizingMode = "FIXED";
      sHeader.resize(800, 70); sHeader.primaryAxisAlignItems = "CENTER"; sHeader.counterAxisAlignItems = "CENTER"; sHeader.itemSpacing = 8; sHeader.fills = [];

      // Clean Tracked Typography (NO container box!)
      const sTag = createText("FRICTIONLESS WEB WORKFLOW", 11, "Bold", C.mint);
      sTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      sHeader.appendChild(sTag);

      sHeader.appendChild(createParagraph("From First Note to Full Diagnostics in 3 Steps", 800, 28, "Bold", C.textWhite, 36, "CENTER"));
      stepSection.appendChild(sHeader);

      const stepsRow = figma.createFrame();
      stepsRow.layoutMode = "HORIZONTAL"; stepsRow.resize(1140, 260); stepsRow.itemSpacing = 24; stepsRow.fills = [];

      function makeStepCard(num, title, desc, tagTxt, glassFn, statusTxt) {
        const sc = figma.createFrame();
        sc.resize(364, 260); sc.cornerRadius = 20;
        glassFn(sc); // applyCard1Glass, applyCard2Glass, applyCard3Glass!
        sc.paddingLeft = 24; sc.paddingRight = 24; sc.paddingTop = 22; sc.paddingBottom = 20;
        sc.layoutMode = "VERTICAL"; sc.itemSpacing = 12;

        const sTop = figma.createFrame();
        sTop.layoutMode = "HORIZONTAL"; sTop.resize(316, 28); sTop.counterAxisAlignItems = "CENTER"; sTop.primaryAxisAlignItems = "SPACE_BETWEEN"; sTop.fills = [];
        sTop.appendChild(createText(num, 24, "Bold", C.mint));
        sTop.appendChild(createBadge(tagTxt, "mint", 9));
        sc.appendChild(sTop);

        sc.appendChild(createText(title, 16, "Bold", C.textWhite));
        sc.appendChild(createParagraph(desc, 316, 12, "Regular", C.textZinc400, 18, "LEFT"));

        // Live Telemetry status bar inside step
        const sBar = figma.createFrame();
        sBar.layoutMode = "HORIZONTAL"; sBar.resize(316, 32); sBar.cornerRadius = 6;
        sBar.paddingLeft = 10; sBar.paddingRight = 10; sBar.counterAxisAlignItems = "CENTER"; sBar.itemSpacing = 8;
        sBar.fills = solid(C.canvasBot, 0.95); sBar.strokes = solid(C.glassBorder, 0.08); sBar.strokeWeight = 1;
        const sDot = figma.createEllipse(); sDot.resize(6, 6); sDot.fills = solid(C.mint, 1);
        sBar.appendChild(sDot);
        sBar.appendChild(createText(statusTxt, 9, "Bold", C.mint));
        sc.appendChild(sBar);

        return sc;
      }
      stepsRow.appendChild(makeStepCard(
        "01", "Connect & Calibrate",
        "Plug in your microphone. WebAudio automatically calibrates input gain and room noise floor with zero driver install.",
        "Auto-Gain", applyCard1Glass, "WebAudio Calibrated • -12 dBFS Active"
      ));
      stepsRow.appendChild(makeStepCard(
        "02", "Sing Your Exercise",
        "Sing any scale, phrase, or vocal warm-up. Watch your pitch curve trace in sub-cent precision with harmonic analysis.",
        "Live Tracking", applyCard2Glass, "YIN DSP Extraction • 0.1 Cents Precision"
      ));
      stepsRow.appendChild(makeStepCard(
        "03", "Receive AI Diagnostics",
        "Review formant acoustic scores, passaggio break points, and receive targeted drill recommendations from Gemini AI.",
        "Actionable Drills", applyCard3Glass, "Gemini Multimodal Pedagogy • Instant Drills"
      ));

      stepSection.appendChild(stepsRow);
      stack.appendChild(stepSection);

      // -----------------------------------------------------------------------
      // 6. TRANSPARENT PRICING (ZERO TEXT OVERLAPPING)
      // -----------------------------------------------------------------------
      const priceSection = figma.createFrame();
      priceSection.name = "6. Transparent Pricing";
      priceSection.layoutMode = "VERTICAL";
      priceSection.primaryAxisSizingMode = "AUTO";
      priceSection.counterAxisSizingMode = "FIXED";
      priceSection.resize(1440, 780);
      priceSection.primaryAxisAlignItems = "CENTER";
      priceSection.counterAxisAlignItems = "CENTER";
      priceSection.paddingTop = 50;
      priceSection.paddingBottom = 50;
      priceSection.itemSpacing = 28;
      priceSection.fills = [];

      const pHeader = figma.createFrame();
      pHeader.layoutMode = "VERTICAL"; pHeader.primaryAxisSizingMode = "AUTO"; pHeader.counterAxisSizingMode = "FIXED";
      pHeader.resize(800, 110); pHeader.primaryAxisAlignItems = "CENTER"; pHeader.counterAxisAlignItems = "CENTER"; pHeader.itemSpacing = 8; pHeader.fills = [];

      // Clean Tracked Typography (NO container box!)
      const pTag = createText("TRANSPARENT PRICING", 11, "Bold", C.mint);
      pTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      pHeader.appendChild(pTag);

      pHeader.appendChild(createParagraph("Invest in Your Voice. Cancel Anytime.", 800, 32, "Bold", C.textWhite, 40, "CENTER"));
      pHeader.appendChild(createParagraph("Direct local Indonesian payment via Midtrans (QRIS, GoPay, BCA, Mandiri) and global cards.", 720, 14, "Regular", C.textZinc400, 22, "CENTER"));
      priceSection.appendChild(pHeader);

      const priceRow = figma.createFrame();
      priceRow.layoutMode = "HORIZONTAL"; priceRow.resize(1140, 520); priceRow.itemSpacing = 24; priceRow.fills = [];

      function makeFeatureRow(txt) {
        const fi = figma.createFrame();
        fi.layoutMode = "HORIZONTAL"; fi.resize(308, 22); fi.counterAxisAlignItems = "CENTER"; fi.itemSpacing = 10; fi.fills = [];
        fi.appendChild(createSvgIcon("check", "#00F5A0", 14));
        fi.appendChild(createText(txt, 12, "Medium", C.textZinc300));
        return fi;
      }

      // Plan 1: Free Explorer
      const p1 = figma.createFrame();
      p1.resize(364, 520); p1.cornerRadius = 20;
      applyCard2Glass(p1);
      p1.paddingLeft = 28; p1.paddingRight = 28; p1.paddingTop = 28; p1.paddingBottom = 24;
      p1.layoutMode = "VERTICAL"; p1.primaryAxisAlignItems = "SPACE_BETWEEN";

      const p1Top = figma.createFrame(); p1Top.layoutMode = "VERTICAL"; p1Top.resize(308, 380); p1Top.itemSpacing = 14; p1Top.fills = [];
      p1Top.appendChild(createText("Free Explorer", 18, "Bold", C.textWhite));
      p1Top.appendChild(createParagraph("Essential pitch feedback for everyday vocal warm-ups.", 308, 12, "Regular", C.textZinc400, 18, "LEFT"));

      const pr1 = figma.createFrame(); pr1.layoutMode = "HORIZONTAL"; pr1.itemSpacing = 6; pr1.counterAxisAlignItems = "BASELINE"; pr1.fills = [];
      pr1.appendChild(createText("Rp 0", 32, "Bold", C.textWhite));
      pr1.appendChild(createText("free forever", 12, "Regular", C.textZinc500));
      p1Top.appendChild(pr1);

      p1Top.appendChild(makeFeatureRow("10-Second recording analysis window"));
      p1Top.appendChild(makeFeatureRow("Real-time chromatic tuner"));
      p1Top.appendChild(makeFeatureRow("Basic pitch accuracy scoring"));
      p1Top.appendChild(makeFeatureRow("Standard microphone calibration"));
      p1.appendChild(p1Top);

      p1.appendChild(createActionButton("Start Free Session", null, "secondary", 308));
      priceRow.appendChild(p1);

      // Plan 2: Pro Vocalist (Featured)
      const p2 = figma.createFrame();
      p2.resize(364, 520); p2.cornerRadius = 20;
      applyCard1Glass(p2); // SIGNATURE MINT ACCENT!
      p2.paddingLeft = 28; p2.paddingRight = 28; p2.paddingTop = 28; p2.paddingBottom = 24;
      p2.layoutMode = "VERTICAL"; p2.primaryAxisAlignItems = "SPACE_BETWEEN";
      p2.strokes = solid(C.mint, 0.65); p2.strokeWeight = 1.5;

      const p2Top = figma.createFrame(); p2Top.layoutMode = "VERTICAL"; p2Top.resize(308, 380); p2Top.itemSpacing = 14; p2Top.fills = [];
      const p2H = figma.createFrame(); p2H.layoutMode = "HORIZONTAL"; p2H.resize(308, 24); p2H.primaryAxisAlignItems = "SPACE_BETWEEN"; p2H.counterAxisAlignItems = "CENTER"; p2H.fills = [];
      p2H.appendChild(createText("Pro Vocalist", 18, "Bold", C.textWhite));
      p2H.appendChild(createBadge("MOST POPULAR", "mint", 9));
      p2Top.appendChild(p2H);

      p2Top.appendChild(createParagraph("Complete bio-acoustic studio for serious singers & artists.", 308, 12, "Regular", C.textZinc400, 18, "LEFT"));

      const pr2 = figma.createFrame(); pr2.layoutMode = "HORIZONTAL"; pr2.itemSpacing = 6; pr2.counterAxisAlignItems = "BASELINE"; pr2.fills = [];
      pr2.appendChild(createText("Rp 79.000", 32, "Bold", C.textWhite));
      pr2.appendChild(createText("/ month", 12, "Regular", C.textZinc500));
      p2Top.appendChild(pr2);

      p2Top.appendChild(makeFeatureRow("60-Second continuous studio takes"));
      p2Top.appendChild(makeFeatureRow("Full Gemini AI vocal coaching"));
      p2Top.appendChild(makeFeatureRow("Formant resonance & passaggio tracking"));
      p2Top.appendChild(makeFeatureRow("Interactive Note-Sync Piano Roll"));
      p2Top.appendChild(makeFeatureRow("Permanent cloud audio take library"));
      p2.appendChild(p2Top);

      p2.appendChild(createActionButton("Upgrade to Pro via Midtrans", "arrow-up-right", "radiant", 308));
      priceRow.appendChild(p2);

      // Plan 3: Conservatory Studio
      const p3 = figma.createFrame();
      p3.resize(364, 520); p3.cornerRadius = 20;
      applyCard2Glass(p3);
      p3.paddingLeft = 28; p3.paddingRight = 28; p3.paddingTop = 28; p3.paddingBottom = 24;
      p3.layoutMode = "VERTICAL"; p3.primaryAxisAlignItems = "SPACE_BETWEEN";

      const p3Top = figma.createFrame(); p3Top.layoutMode = "VERTICAL"; p3Top.resize(308, 380); p3Top.itemSpacing = 14; p3Top.fills = [];
      p3Top.appendChild(createText("Conservatory Studio", 18, "Bold", C.textWhite));
      p3Top.appendChild(createParagraph("Designed for vocal teachers, academies, and choirs.", 308, 12, "Regular", C.textZinc400, 18, "LEFT"));

      const pr3 = figma.createFrame(); pr3.layoutMode = "HORIZONTAL"; pr3.itemSpacing = 6; pr3.counterAxisAlignItems = "BASELINE"; pr3.fills = [];
      pr3.appendChild(createText("Rp 149.000", 32, "Bold", C.textWhite));
      pr3.appendChild(createText("/ month", 12, "Regular", C.textZinc500));
      p3Top.appendChild(pr3);

      p3Top.appendChild(makeFeatureRow("Unlimited full song takes (180s+)"));
      p3Top.appendChild(makeFeatureRow("Multi-student roster & progress"));
      p3Top.appendChild(makeFeatureRow("Lossless WAV & biometric PDF exports"));
      p3Top.appendChild(makeFeatureRow("White-label studio PDF reports"));
      p3Top.appendChild(makeFeatureRow("Priority DSP server processing"));
      p3.appendChild(p3Top);

      p3.appendChild(createActionButton("Contact Studio Sales", null, "secondary", 308));
      priceRow.appendChild(p3);

      priceSection.appendChild(priceRow);
      stack.appendChild(priceSection);

      // -----------------------------------------------------------------------
      // 7. FAQ ACCORDION
      // -----------------------------------------------------------------------
      const faqSection = figma.createFrame();
      faqSection.name = "7. FAQ Accordion";
      faqSection.layoutMode = "VERTICAL";
      faqSection.primaryAxisSizingMode = "AUTO";
      faqSection.counterAxisSizingMode = "FIXED";
      faqSection.resize(1440, 480);
      faqSection.primaryAxisAlignItems = "CENTER";
      faqSection.counterAxisAlignItems = "CENTER";
      faqSection.paddingTop = 40;
      faqSection.paddingBottom = 40;
      faqSection.itemSpacing = 24;
      faqSection.fills = [];

      const faqH = figma.createFrame();
      faqH.layoutMode = "VERTICAL"; faqH.primaryAxisSizingMode = "AUTO"; faqH.counterAxisSizingMode = "FIXED";
      faqH.resize(800, 70); faqH.primaryAxisAlignItems = "CENTER"; faqH.counterAxisAlignItems = "CENTER"; faqH.itemSpacing = 8; faqH.fills = [];

      // Clean Tracked Typography (NO container box!)
      const faqTag = createText("CLEAR ANSWERS", 11, "Bold", C.mint);
      faqTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      faqH.appendChild(faqTag);

      faqH.appendChild(createParagraph("Frequently Asked Questions", 800, 28, "Bold", C.textWhite, 36, "CENTER"));
      faqSection.appendChild(faqH);

      const faqList = figma.createFrame();
      faqList.layoutMode = "VERTICAL";
      faqList.primaryAxisSizingMode = "AUTO"; faqList.counterAxisSizingMode = "FIXED";
      faqList.resize(900, 320);
      faqList.itemSpacing = 12; faqList.counterAxisAlignItems = "CENTER"; faqList.fills = [];

      function makeFaqItem(q, isExp = false, a = "") {
        const it = figma.createFrame();
        it.layoutMode = "VERTICAL";
        it.primaryAxisSizingMode = "AUTO"; it.counterAxisSizingMode = "FIXED";
        it.resize(900, isExp ? 90 : 50);
        it.cornerRadius = 10;
        it.paddingLeft = 20; it.paddingRight = 20; it.paddingTop = 14; it.paddingBottom = 14;
        it.itemSpacing = 8;
        it.fills = solid(C.glassElevated, 0.85);
        it.strokes = solid(C.glassBorder, 0.08);
        it.strokeWeight = 1;

        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL"; row.resize(860, 22); row.counterAxisAlignItems = "CENTER"; row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.fills = [];
        row.appendChild(createText(q, 13, "Medium", C.textWhite));
        row.appendChild(createSvgIcon("chevron-down", isExp ? "#00F5A0" : "#A1A1AA", 14));
        it.appendChild(row);

        if (isExp && a) {
          it.appendChild(createParagraph(a, 860, 11, "Regular", C.textZinc400, 16, "LEFT"));
        }
        return it;
      }
      faqList.appendChild(makeFaqItem("Do I need an expensive studio microphone to get accurate pitch tracking?", true, "No! VocalSense AI includes automatic ambient noise subtraction and mic gain calibration, allowing high accuracy even on standard phone or laptop microphones."));
      faqList.appendChild(makeFaqItem("How does Gemini AI provide personalized vocal coaching advice?"));
      faqList.appendChild(makeFaqItem("What payment methods are supported in Indonesia (Midtrans)?"));
      faqList.appendChild(makeFaqItem("Can I export diagnostic reports and piano rolls for my vocal teacher?"));

      faqSection.appendChild(faqList);
      stack.appendChild(faqSection);

      // -----------------------------------------------------------------------
      // 8. FINAL CTA BANNER (SPACIOUS, LUXURIOUS, ZERO CLIPPING)
      // -----------------------------------------------------------------------
      const ctaSection = figma.createFrame();
      ctaSection.name = "8. Final CTA Banner";
      ctaSection.layoutMode = "VERTICAL";
      ctaSection.primaryAxisSizingMode = "AUTO";
      ctaSection.counterAxisSizingMode = "FIXED";
      ctaSection.resize(1440, 380);
      ctaSection.primaryAxisAlignItems = "CENTER";
      ctaSection.counterAxisAlignItems = "CENTER";
      ctaSection.paddingTop = 40;
      ctaSection.paddingBottom = 50;
      ctaSection.fills = [];

      const ctaBanner = figma.createFrame();
      ctaBanner.name = "CTA Banner Frame";
      ctaBanner.resize(1140, 280);
      ctaBanner.cornerRadius = 24;
      ctaBanner.layoutMode = "VERTICAL";
      ctaBanner.primaryAxisSizingMode = "AUTO";
      ctaBanner.counterAxisSizingMode = "FIXED";
      ctaBanner.primaryAxisAlignItems = "CENTER";
      ctaBanner.counterAxisAlignItems = "CENTER";
      ctaBanner.paddingTop = 52;
      ctaBanner.paddingBottom = 52;
      ctaBanner.paddingLeft = 60;
      ctaBanner.paddingRight = 60;
      ctaBanner.itemSpacing = 16;
      applyCard1Glass(ctaBanner); // THE SIGNATURE LUXURY GRADIENT!
      ctaBanner.strokes = solid(C.mint, 0.45); ctaBanner.strokeWeight = 1.2;

      // Glow Shadow
      ctaBanner.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0.0, g: 0.96, b: 0.63, a: 0.20 },
          offset: { x: 0, y: 16 },
          radius: 48,
          spread: -8,
          visible: true,
          blendMode: "NORMAL",
          showShadowBehindNode: false
        }
      ];

      const ctaTag = createText("START YOUR VOCAL TRANSFORMATION TODAY", 11, "Bold", C.mint);
      ctaTag.letterSpacing = { value: 1.5, unit: "PIXELS" };
      ctaBanner.appendChild(ctaTag);

      const ctaH1 = createParagraph("Your Vocal Breakthrough Starts With Your Next Note.", 860, 32, "Bold", C.textWhite, 42, "CENTER");
      ctaBanner.appendChild(ctaH1);

      const ctaSub = createParagraph("Join vocalists diagnosing pitch accuracy, formant resonance, and passaggio transitions directly in their web browser — zero latency, zero setup.", 700, 13, "Regular", C.textZinc400, 22, "CENTER");
      ctaBanner.appendChild(ctaSub);

      const ctaBtn = createActionButton("Get Started for Free — Zero Setup", "arrow-up-right", "radiant");
      ctaBanner.appendChild(ctaBtn);

      const ctaMicro = createText("Instant WebAccess • No Credit Card Required • Works on Chrome, Edge & Safari", 10, "Medium", C.textZinc500);
      ctaBanner.appendChild(ctaMicro);

      ctaSection.appendChild(ctaBanner);
      stack.appendChild(ctaSection);

      // -----------------------------------------------------------------------
      // 9. STUDIO FOOTER (4-COLUMN BALANCED)
      // -----------------------------------------------------------------------
      const footSection = figma.createFrame();
      footSection.name = "9. Studio Footer";
      footSection.layoutMode = "VERTICAL";
      footSection.primaryAxisSizingMode = "AUTO";
      footSection.counterAxisSizingMode = "FIXED";
      footSection.resize(1440, 260);
      footSection.primaryAxisAlignItems = "CENTER";
      footSection.counterAxisAlignItems = "CENTER";
      footSection.paddingTop = 40;
      footSection.paddingBottom = 30;
      footSection.itemSpacing = 24;
      footSection.fills = solid(C.canvasBot, 0.98);
      footSection.strokes = solid(C.glassBorder, 0.06);
      footSection.strokeWeight = 1;

      const fCols = figma.createFrame();
      fCols.layoutMode = "HORIZONTAL"; fCols.resize(1140, 130); fCols.primaryAxisAlignItems = "SPACE_BETWEEN"; fCols.fills = [];

      // Col 1: Brand & Bio
      const fc1 = figma.createFrame();
      fc1.layoutMode = "VERTICAL"; fc1.resize(320, 130); fc1.itemSpacing = 10; fc1.fills = [];
      const fBrand = figma.createFrame();
      fBrand.layoutMode = "HORIZONTAL"; fBrand.itemSpacing = 8; fBrand.counterAxisAlignItems = "CENTER"; fBrand.fills = [];
      fBrand.appendChild(createSvgIcon("sparkle", "#00F5A0", 16));
      fBrand.appendChild(createText("VocalSense AI", 15, "Bold", C.textWhite));
      fc1.appendChild(fBrand);
      fc1.appendChild(createParagraph("Precision bio-acoustic vocal training and real-time pitch diagnostic engine powered by Gemini AI.", 300, 11, "Regular", C.textZinc400, 16, "LEFT"));
      fc1.appendChild(createText("© 2026 VocalSense AI Technologies Inc. All rights reserved.", 10, "Regular", C.textZinc500));
      fCols.appendChild(fc1);

      function makeFootCol(heading, links) {
        const col = figma.createFrame();
        col.layoutMode = "VERTICAL"; col.resize(180, 130); col.itemSpacing = 8; col.fills = [];
        col.appendChild(createText(heading, 11, "Bold", C.textWhite));
        for (const l of links) {
          col.appendChild(createText(l, 11, "Medium", C.textZinc400));
        }
        return col;
      }
      fCols.appendChild(makeFootCol("PRODUCT", ["Live Studio Tuner", "Interactive Piano Roll", "Gemini AI Vocal Coach", "Solfeggio Trainer", "Vocal Range Finder"]));
      fCols.appendChild(makeFootCol("RESOURCES", ["Acoustic DSP Research", "YIN Pitch Algorithm", "Formant Analysis Guide", "Warm-Up Drill Library", "Developer API"]));
      fCols.appendChild(makeFootCol("LEGAL & TRUST", ["Privacy Policy", "Audio Data Protection", "Terms of Service", "Midtrans Security Audit", "Contact Support"]));

      footSection.appendChild(fCols);

      const fBotBar = figma.createFrame();
      fBotBar.layoutMode = "HORIZONTAL"; fBotBar.resize(1140, 24); fBotBar.counterAxisAlignItems = "CENTER"; fBotBar.primaryAxisAlignItems = "SPACE_BETWEEN"; fBotBar.fills = [];
      fBotBar.appendChild(createText("Built with WebAudio DSP & Gemini Multimodal Pedagogy", 10, "Regular", C.textZinc500));
      fBotBar.appendChild(createText("Twitter / X  •  GitHub  •  Discord  •  YouTube", 10, "Medium", C.textZinc400));
      footSection.appendChild(fBotBar);

      stack.appendChild(footSection);

      // Snug-fit canvas height dynamically to content
      const finalH = Math.ceil(stack.height);
      if (finalH > 1000) {
        homeRoot.resize(1440, finalH);
        gridCanvas.resize(1440, finalH);
      }

      return homeRoot;
    }

    // -------------------------------------------------------------------------
    // 7. RUNNER: EXECUTE SPECIFICALLY VOCAL AUDIT CARDS (FINISHING CANVAS)
    // -------------------------------------------------------------------------
    const existingCards = figma.currentPage.children.filter(c => 
      c.name.startsWith("VocalSense AI — Vocal Quality Audit Cards")
    );
    existingCards.forEach(n => n.remove());

    figma.notify("✨ Generating Vocal Quality Audit Cards...", { timeout: 2000 });

    // Place safely next to existing homepage if present, or at (0, 0)
    const existingHomepage = figma.currentPage.children.find(c => 
      c.name.startsWith("VocalSense AI — 01. Official Homepage")
    );
    const originX = existingHomepage ? existingHomepage.x + existingHomepage.width + 120 : 0;
    const originY = existingHomepage ? existingHomepage.y : 0;

    const cardsFrame = createVocalAuditCardsFrame(originX, originY);

    figma.currentPage.selection = [cardsFrame];
    figma.viewport.scrollAndZoomIntoView([cardsFrame]);

    figma.notify("🚀 Vocal Quality Audit Cards generated! Ready for finishing touches.", { timeout: 4000 });
  } catch (err) {
    console.error("VocalSense Plugin Error:", err);
    try {
      figma.notify("❌ Error: " + (err && err.message ? err.message : String(err)), { error: true, timeout: 8000 });
    } catch (e) {}
  }
})();
