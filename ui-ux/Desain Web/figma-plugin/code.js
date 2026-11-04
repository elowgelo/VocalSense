// =============================================================================
// VOCALSENSE AI — COMPLETE PRODUCTION DESIGN SYSTEM & MASTER SUITE (100% USE CASES)
// Generated modular suite supporting individual menu commands, batch generation,
// and FULL INTERACTIVE PROTOTYPING (bisa ditekan-tekan / shift + space di Figma).
// 100% faithful to patokan.png: No capsules, strict squircle borders, zero clipping.
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

    // 2. CURATED PALETTE (STRICTLY FROM patokan.png)
    const C = {
      canvasTop:     { r: 0.038, g: 0.046, b: 0.062 }, // #0A0C10
      canvasBot:     { r: 0.018, g: 0.022, b: 0.030 }, // #050608
      sidebarBg:     { r: 0.024, g: 0.031, b: 0.043 }, // #06080B
      sidebarBorder: { r: 0.10,  g: 0.13,  b: 0.18 },
      gridLine:      { r: 1.0,   g: 1.0,   b: 1.0 },

      glassBg:        { r: 0.055, g: 0.063, b: 0.082 }, // #0E1015
      glassElevated:  { r: 0.078, g: 0.088, b: 0.118 }, // #14161E
      glassHighlight: { r: 0.120, g: 0.137, b: 0.180 }, // #1F232E
      glassBorder:    { r: 0.18,  g: 0.22,  b: 0.28 },  // #2E3846 crisp visible border

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

    function hexToRgb(hex) {
      let c = String(hex || "").replace("#", "");
      if (c.length === 3) c = c.split("").map(x => x + x).join("");
      const num = parseInt(c, 16);
      if (isNaN(num)) return { r: 1, g: 1, b: 1 };
      return {
        r: ((num >> 16) & 255) / 255,
        g: ((num >> 8) & 255) / 255,
        b: (num & 255) / 255
      };
    }

    function solid(color, opacity = 1) {
      let rgb = color;
      if (typeof color === "string") {
        rgb = hexToRgb(color);
      } else if (!color || typeof color.r !== "number" || typeof color.g !== "number" || typeof color.b !== "number") {
        rgb = { r: 1, g: 1, b: 1 };
      }
      const clamped = Math.max(0, Math.min(1, typeof opacity === "number" ? opacity : 1));
      return [{ type: 'SOLID', color: { r: rgb.r, g: rgb.g, b: rgb.b }, opacity: clamped }];
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
        gradientTransform: [[0, 1, 0], [-1, 0, 1]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.00, g: 0.96, b: 0.63, a: 0.15 } },
          { position: 0.25, color: { r: 0.03, g: 0.14, b: 0.10, a: 0.78 } },
          { position: 0.68, color: { r: 0.055, g: 0.063, b: 0.082, a: 0.88 } },
          { position: 1.0,  color: { r: 0.034, g: 0.040, b: 0.052, a: 0.95 } }
        ]
      }];
      applyGlassEffects(frame, 0.10, true);
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
        gradientTransform: [[0, 1, 0], [-1, 0, 1]],
        gradientStops: [
          { position: 0.0,  color: { r: 0.00, g: 0.96, b: 0.63, a: 0.14 } },
          { position: 0.32, color: { r: 0.035, g: 0.16, b: 0.12, a: 0.76 } },
          { position: 0.72, color: { r: 0.055, g: 0.065, b: 0.085, a: 0.85 } },
          { position: 1.0,  color: { r: 0.03, g: 0.035, b: 0.045, a: 0.93 } }
        ]
      }];
      applyGlassEffects(frame, 0.12, false);
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
      let actualWidth = typeof width === "number" ? width : (parseInt(width, 10) || 320);
      let actualSize = typeof size === "number" ? size : (parseInt(size, 10) || 13);
      let actualWeight = typeof weight === "string" ? weight : "Regular";
      let actualColor = (typeof color === "object" && color !== null && "r" in color) ? color : C.textZinc400;
      let actualLineHeight = typeof lineHeight === "number" ? lineHeight : (parseInt(lineHeight, 10) || 20);
      let actualAlign = typeof textAlign === "string" ? textAlign : "LEFT";

      const node = figma.createText();
      const styleToUse = loadedStyles.has(actualWeight) ? actualWeight : "Regular";
      node.fontName = { family: "Inter", style: styleToUse };
      node.characters = String(chars != null ? chars : "");
      node.fontSize = actualSize;
      node.lineHeight = { value: actualLineHeight, unit: "PIXELS" };
      node.fills = solid(actualColor, 1);
      node.textAlignHorizontal = actualAlign;
      const strLen = String(chars != null ? chars : "").length;
      const estLines = Math.max(1, Math.ceil((strLen * actualSize * 0.58) / actualWidth));
      try {
        node.textAutoResize = "NONE";
        node.resize(actualWidth, Math.max(actualLineHeight, estLines * actualLineHeight));
        node.textAutoResize = "HEIGHT";
      } catch (e) {
        try {
          node.textAutoResize = "HEIGHT";
        } catch (e2) {}
      }
      return node;
    }

    function createSvgIcon(type, colorHex = "#A1A1AA", size = 16) {
      try {
        let svgBody = "";
        if (type === "search") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
        } else if (type === "bell") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
        } else if (type === "moon") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        } else if (type === "sparkle") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>`;
        } else if (type === "arrow-up-right") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
        } else if (type === "arrow-down-right") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/></svg>`;
        } else if (type === "pause") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
        } else if (type === "stop") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>`;
        } else if (type === "play") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        } else if (type === "check") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (type === "download") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
        } else if (type === "lock") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        } else if (type === "trophy") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/></svg>`;
        } else if (type === "fire") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${colorHex}"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
        } else if (type === "shield") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        } else if (type === "home") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
        } else if (type === "waveform") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10v4"/><path d="M6 6v12"/><path d="M10 3v18"/><path d="M14 8v8"/><path d="M18 5v14"/><path d="M22 10v4"/></svg>`;
        } else if (type === "bar-chart") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
        } else if (type === "document") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
        } else if (type === "settings") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
        } else if (type === "refresh") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
        } else if (type === "compare") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>`;
        } else if (type === "save") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`;
        } else if (type === "chevron-down") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
        } else if (type === "sliders") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`;
        } else if (type === "camera") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
        } else if (type === "copy") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        } else if (type === "user") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
        } else if (type === "mic") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
        } else if (type === "globe") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
        } else if (type === "spotify") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1DB954"/><path d="M8 15c2.5-.5 5-.3 7 .5M7.5 12.5c3-.7 6.5-.5 9 .5M7 10c3.5-.9 8-.7 11 .7" stroke="#000" stroke-width="1.8" stroke-linecap="round"/></svg>`;
        } else if (type === "google") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.4-.4-2.2z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>`;
        } else if (type === "wifi") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`;
        } else if (type === "zap") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
        } else if (type === "folder") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
        } else if (type === "file-text") {
          svgBody = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
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

    function createIconButton(iconName, iconColor = "#A1A1AA", size = 36, iconSize = 15, active = false) {
      const btn = figma.createFrame();
      btn.name = "IconButton/" + iconName;
      btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisSizingMode = "FIXED";
      btn.counterAxisSizingMode = "FIXED";
      btn.resize(size, size);
      btn.cornerRadius = 8;
      if (active) {
        btn.fills = solid(C.forestBase, 1);
        btn.strokes = solid(C.mint, 0.8);
        btn.strokeWeight = 1.5;
      } else {
        btn.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
        btn.strokes = solid(C.glassBorder, 0.8);
        btn.strokeWeight = 1;
      }
      btn.primaryAxisAlignItems = "CENTER";
      btn.counterAxisAlignItems = "CENTER";
      btn.appendChild(createSvgIcon(iconName, active ? "#00F5A0" : iconColor, iconSize));
      return btn;
    }

    function createActionButton(label, iconType = null, variant = "secondary", width = null, iconPos = "left", customHeight = 36) {
      const btn = figma.createFrame();
      btn.name = "Button/" + label;
      btn.layoutMode = "HORIZONTAL";
      btn.itemSpacing = 6;
      if (width) {
        btn.primaryAxisSizingMode = "FIXED";
        btn.counterAxisSizingMode = "FIXED";
        btn.resize(width, customHeight);
        btn.primaryAxisAlignItems = "CENTER";
      } else {
        btn.primaryAxisSizingMode = "AUTO";
        btn.counterAxisSizingMode = "FIXED";
        btn.resize(100, customHeight);
        btn.paddingLeft = 14; btn.paddingRight = 14;
      }
      btn.counterAxisAlignItems = "CENTER";
      btn.cornerRadius = 8;

      let iconColor = "#A1A1AA";
      let textObj;

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
        iconColor = "#04160F";
        textObj = createText(label, 12, "Bold", { r: 0.02, g: 0.08, b: 0.05 });
      } else if (variant === "primary") {
        btn.fills = solid(C.forestBase, 0.95);
        btn.strokes = solid(C.mint, 0.45);
        btn.strokeWeight = 1;
        iconColor = "#00F5A0";
        textObj = createText(label, 12, "Bold", C.mint);
      } else if (variant === "danger") {
        btn.fills = solid({ r: 0.20, g: 0.04, b: 0.06 }, 0.95);
        btn.strokes = solid(C.rose, 0.45);
        btn.strokeWeight = 1;
        iconColor = "#F43F5E";
        textObj = createText(label, 12, "Bold", C.rose);
      } else {
        btn.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
        btn.strokes = solid(C.glassBorder, 0.8);
        btn.strokeWeight = 1;
        iconColor = "#A1A1AA";
        textObj = createText(label, 11, "Medium", C.textZinc300);
      }

      if (iconType && iconPos === "left") {
        btn.appendChild(createSvgIcon(iconType, iconColor, 13));
      }
      btn.appendChild(textObj);
      if (iconType && iconPos === "right") {
        btn.appendChild(createSvgIcon(iconType, iconColor, 13));
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
      } else if (variant === "rose") {
        b.fills = solid({ r: 0.18, g: 0.04, b: 0.06 }, 1);
        b.strokes = solid(C.rose, 0.45);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Bold", C.rose));
      } else {
        b.fills = solid(C.glassElevated, 1);
        b.strokes = solid(C.glassBorder, 0.5);
        b.strokeWeight = 1;
        b.appendChild(createText(text, size, "Medium", C.textZinc300));
      }
      return b;
    }

    // -------------------------------------------------------------------------
    // ROBUST INTERACTIVE PROTOTYPING ENGINE (Figma Reactions & Hotspots)
    // -------------------------------------------------------------------------
    async function linkPrototype(sourceNode, targetNode, transitionType = 'DISSOLVE') {
      if (!sourceNode || !targetNode) return;
      const reaction = {
        trigger: { type: 'ON_CLICK' },
        actions: [
          {
            type: 'NODE',
            destinationId: targetNode.id,
            navigation: 'NAVIGATE',
            transition: transitionType ? {
              type: transitionType,
              easing: { type: 'EASE_OUT' },
              duration: 0.25
            } : null,
            preserveScrollPosition: false
          }
        ]
      };

      try {
        if (typeof sourceNode.setReactionsAsync === 'function') {
          await sourceNode.setReactionsAsync([reaction]);
        } else {
          sourceNode.reactions = [reaction];
        }
      } catch (e) {
        try { sourceNode.reactions = [reaction]; } catch (e2) {}
      }
    }

    function nodeMatches(node, query) {
      if (!node) return false;
      const q = query.toLowerCase();
      if (node.name && node.name.toLowerCase().includes(q)) return true;
      if (node.type === "TEXT" && node.characters && node.characters.toLowerCase().includes(q)) return true;
      return false;
    }

    function findAllInteractiveNodes(root, query, acc = []) {
      if (!root) return acc;
      if (nodeMatches(root, query)) acc.push(root);
      if ('children' in root && root.children) {
        for (const child of root.children) {
          findAllInteractiveNodes(child, query, acc);
        }
      }
      return acc;
    }

    async function linkButtonsByQuery(root, query, targetScreen, transition = 'DISSOLVE') {
      if (!root || !targetScreen) return;
      const nodes = findAllInteractiveNodes(root, query);
      for (const n of nodes) {
        await linkPrototype(n, targetScreen, transition);
        if (n.type === "TEXT" && n.parent && n.parent.type === "FRAME") {
          await linkPrototype(n.parent, targetScreen, transition);
        }
      }
    }

    function findScreen(keywords) {
      return figma.currentPage.children.find(c => {
        if (!c.name || c.type !== "FRAME") return false;
        const n = c.name.toLowerCase();
        return keywords.some(k => n.includes(k.toLowerCase()));
      });
    }

    async function setupMasterInteractions(screensMap) {
      let { s1, s2, s3, s4, s5, s5b, s6, s6b, s7, s8, s9 } = screensMap;

      // Fallback search across canvas if any screen is undefined
      if (!s1) s1 = findScreen(["01. official homepage", "01. homepage", "homepage"]);
      if (!s2) s2 = findScreen(["02. live recording", "02. studio", "studio workstation", "desktop daw"]);
      if (!s3) s3 = findScreen(["03. diagnostic", "03. singing report", "singing report", "piano roll"]);
      if (!s4) s4 = findScreen(["04. gamified", "04. vocalist training", "training center", "training dashboard"]);
      if (!s5) s5 = findScreen(["05. auth screen", "05. authentication", "05. auth & vocalist"]);
      if (!s5b) s5b = findScreen(["05b. vocalist onboarding", "onboarding wizard", "calibration wizard"]);
      if (!s6) s6 = findScreen(["06. account", "06. billing", "account & billing", "account center"]);
      if (!s6b) s6b = findScreen(["06b. midtrans", "snap payment modal", "midtrans snap"]);
      if (!s7) s7 = findScreen(["07. administrator", "07. admin", "telemetry"]);
      if (!s8) s8 = findScreen(["08. vocal reports", "document archive", "vocal reports & document archive"]);
      if (!s9) s9 = findScreen(["09. vocalist profile", "profile settings", "artist profile", "vocalist profile"]);

      // 1. Flow Starting Points
      try {
        const flows = [];
        if (s1) flows.push({ nodeId: s1.id, name: "01. Homepage & Marketing Journey" });
        if (s2) flows.push({ nodeId: s2.id, name: "02. Studio DAW & Live Diagnostics" });
        if (flows.length > 0) {
          figma.currentPage.flowStartingPoints = flows;
        }
      } catch (e) {}

      // 2. Screen 01 (Homepage) Interactive Links
      if (s1) {
        if (s2) {
          await linkButtonsByQuery(s1, "Launch", s2);
          await linkButtonsByQuery(s1, "Web Studio", s2);
          await linkButtonsByQuery(s1, "Studio DAW", s2);
          await linkButtonsByQuery(s1, "Start Vocal Analysis", s2);
          await linkButtonsByQuery(s1, "Explore Live Console", s2);
          await linkButtonsByQuery(s1, "New Session", s2);
        }
        if (s3) {
          await linkButtonsByQuery(s1, "Stop & Analyze", s3);
        }
        if (s4) {
          await linkButtonsByQuery(s1, "Practice Scales", s4);
          await linkButtonsByQuery(s1, "Start 5-Min Drill", s4);
        }
        if (s8) {
          await linkButtonsByQuery(s1, "Archive", s8);
          await linkButtonsByQuery(s1, "Reports Archive", s8);
        }
        if (s5) {
          await linkButtonsByQuery(s1, "Sign In", s5);
          await linkButtonsByQuery(s1, "Get Started", s5);
          await linkButtonsByQuery(s1, "Start Free Session", s5);
        }
        if (s6b || s6) {
          await linkButtonsByQuery(s1, "Upgrade to Pro", s6b || s6);
          await linkButtonsByQuery(s1, "Rp 79.000", s6b || s6);
        }
      }

      // 3. Screen 02 (Studio DAW) Interactive Links
      if (s2) {
        if (s3) {
          await linkButtonsByQuery(s2, "Stop & Analyze", s3);
          await linkButtonsByQuery(s2, "Analyze Take", s3);
          await linkButtonsByQuery(s2, "Proceed to AI Diagnostics", s3);
          await linkButtonsByQuery(s2, "Nav/Reports", s3);
        }
        if (s4) {
          await linkButtonsByQuery(s2, "Practice Scales", s4);
          await linkButtonsByQuery(s2, "Start 5-Min Drill", s4);
          await linkButtonsByQuery(s2, "Nav/Analytics", s4);
        }
        if (s8) {
          await linkButtonsByQuery(s2, "Nav/Documents", s8);
          await linkButtonsByQuery(s2, "Recent Singing Takes", s8);
          await linkButtonsByQuery(s2, "Bohemian Rhapsody", s8);
        }
        if (s9) {
          await linkButtonsByQuery(s2, "User Profile Chip", s9);
          await linkButtonsByQuery(s2, "Ethan Reynolds", s9);
          await linkButtonsByQuery(s2, "Nav/Avatar ER", s9);
        } else if (s6) {
          await linkButtonsByQuery(s2, "User Profile Chip", s6);
          await linkButtonsByQuery(s2, "Ethan Reynolds", s6);
          await linkButtonsByQuery(s2, "Nav/Avatar ER", s6);
        }
        if (s6) {
          await linkButtonsByQuery(s2, "Nav/Settings", s6);
        }
        if (s7) {
          await linkButtonsByQuery(s2, "Nav/Admin", s7);
        }
        if (s1) {
          await linkButtonsByQuery(s2, "Nav/Home", s1);
          await linkButtonsByQuery(s2, "Brand Logo Dock Button", s1);
        }
      }

      // 4. Screen 03 (Diagnostic Singing Report) Interactive Links
      if (s3) {
        if (s2) {
          await linkButtonsByQuery(s3, "Studio", s2);
          await linkButtonsByQuery(s3, "Back to Studio", s2);
          await linkButtonsByQuery(s3, "DAW Studio", s2);
          await linkButtonsByQuery(s3, "Nav/Home", s2);
        }
        if (s4) {
          await linkButtonsByQuery(s3, "Nav/Analytics", s4);
          await linkButtonsByQuery(s3, "Start 5-Min Drill", s4);
        }
        if (s8) {
          await linkButtonsByQuery(s3, "Nav/Documents", s8);
          await linkButtonsByQuery(s3, "View Historical Takes", s8);
          await linkButtonsByQuery(s3, "Archive", s8);
        }
        if (s9) {
          await linkButtonsByQuery(s3, "Nav/Avatar ER", s9);
        }
        if (s6) {
          await linkButtonsByQuery(s3, "Nav/Billing", s6);
          await linkButtonsByQuery(s3, "Nav/Settings", s6);
          if (!s9) await linkButtonsByQuery(s3, "Nav/Avatar ER", s6);
          await linkButtonsByQuery(s3, "Export PDF", s6);
          await linkButtonsByQuery(s3, "Download Conservatory PDF", s6);
        }
        if (s1) {
          await linkButtonsByQuery(s3, "Brand Logo Dock Button", s1);
        }
      }

      // 5. Screen 04 (Training Center & Gamified Drills) Interactive Links
      if (s4) {
        if (s2) {
          await linkButtonsByQuery(s4, "Studio", s2);
          await linkButtonsByQuery(s4, "Back to Studio", s2);
          await linkButtonsByQuery(s4, "DAW Studio", s2);
          await linkButtonsByQuery(s4, "Nav/Home", s2);
          await linkButtonsByQuery(s4, "Start Lesson", s2);
        }
        if (s3) {
          await linkButtonsByQuery(s4, "Nav/Reports", s3);
        }
        if (s8) {
          await linkButtonsByQuery(s4, "Nav/Documents", s8);
        }
        if (s9) {
          await linkButtonsByQuery(s4, "Nav/Avatar ER", s9);
        }
        if (s6) {
          await linkButtonsByQuery(s4, "Nav/Billing", s6);
          await linkButtonsByQuery(s4, "Nav/Settings", s6);
          if (!s9) await linkButtonsByQuery(s4, "Nav/Avatar ER", s6);
          await linkButtonsByQuery(s4, "Level 8", s6);
        }
        if (s1) {
          await linkButtonsByQuery(s4, "Brand Logo Dock Button", s1);
        }
      }

      // 6. Screen 05 (Auth Screen) Interactive Links
      if (s5) {
        if (s5b) {
          await linkButtonsByQuery(s5, "Create Free Account", s5b);
          await linkButtonsByQuery(s5, "Sign In to Studio", s5b);
        } else if (s2) {
          await linkButtonsByQuery(s5, "Sign In to Studio", s2);
        }
        if (s2) {
          await linkButtonsByQuery(s5, "Google", s2);
        }
        if (s1) {
          await linkButtonsByQuery(s5, "Return to Homepage", s1);
          await linkButtonsByQuery(s5, "Back to Homepage", s1);
        }
      }

      // 6B. Screen 05B (Onboarding Wizard) Interactive Links
      if (s5b) {
        if (s2) {
          await linkButtonsByQuery(s5b, "Complete Calibration", s2);
          await linkButtonsByQuery(s5b, "Skip to Studio", s2);
        }
      }

      // 7. Screen 06 (Account & Billing Center) Interactive Links
      if (s6) {
        if (s2) {
          await linkButtonsByQuery(s6, "Studio", s2);
          await linkButtonsByQuery(s6, "Back to Studio", s2);
          await linkButtonsByQuery(s6, "DAW Studio", s2);
          await linkButtonsByQuery(s6, "Nav/Home", s2);
        }
        if (s3) {
          await linkButtonsByQuery(s6, "Nav/Reports", s3);
        }
        if (s4) {
          await linkButtonsByQuery(s6, "Nav/Analytics", s4);
        }
        if (s8) {
          await linkButtonsByQuery(s6, "Nav/Documents", s8);
        }
        if (s9) {
          await linkButtonsByQuery(s6, "Nav/Avatar ER", s9);
          await linkButtonsByQuery(s6, "Profile & Identity", s9);
          await linkButtonsByQuery(s6, "User Profile Chip", s9);
        }
        if (s6b) {
          await linkButtonsByQuery(s6, "Upgrade to Annual Pro", s6b);
          await linkButtonsByQuery(s6, "Open Midtrans Modal", s6b);
        }
        if (s1) {
          await linkButtonsByQuery(s6, "Brand Logo Dock Button", s1);
        }
      }

      // 7B. Screen 06B (Midtrans Modal Overlay) Interactive Links
      if (s6b) {
        if (s6) {
          await linkButtonsByQuery(s6b, "Saya Sudah Bayar", s6);
          await linkButtonsByQuery(s6b, "Batal Transaksi", s6);
          await linkButtonsByQuery(s6b, "Close", s6);
        } else if (s2) {
          await linkButtonsByQuery(s6b, "Saya Sudah Bayar", s2);
          await linkButtonsByQuery(s6b, "Batal Transaksi", s2);
        }
      }

      // 8. Screen 07 (Admin Console) Interactive Links
      if (s7) {
        if (s2) {
          await linkButtonsByQuery(s7, "Exit Admin", s2);
        }
      }

      // 9. Screen 08 (Vocal Reports & Document Archive) Interactive Links
      if (s8) {
        if (s2) {
          await linkButtonsByQuery(s8, "DAW Studio", s2);
          await linkButtonsByQuery(s8, "Back to Studio", s2);
          await linkButtonsByQuery(s8, "Nav/Home", s2);
          await linkButtonsByQuery(s8, "Button/Play Take", s2);
        }
        if (s3) {
          await linkButtonsByQuery(s8, "Nav/Reports", s3);
          await linkButtonsByQuery(s8, "View Report", s3);
          await linkButtonsByQuery(s8, "Open Detailed Note-Sync Piano Roll", s3);
          await linkButtonsByQuery(s8, "TakeCard/Bohemian Rhapsody", s3);
        }
        if (s4) {
          await linkButtonsByQuery(s8, "Nav/Analytics", s4);
        }
        if (s9) {
          await linkButtonsByQuery(s8, "Nav/Avatar ER", s9);
        }
        if (s6) {
          await linkButtonsByQuery(s8, "Nav/Settings", s6);
          if (!s9) await linkButtonsByQuery(s8, "Nav/Avatar ER", s6);
          await linkButtonsByQuery(s8, "Batch Export PDFs", s6);
          await linkButtonsByQuery(s8, "Download Official PDF Certificate", s6);
        }
        if (s1) {
          await linkButtonsByQuery(s8, "Brand Logo Dock Button", s1);
        }
      }

      // 10. Screen 09 (Vocalist Personal Profile) Interactive Links
      if (s9) {
        if (s2) {
          await linkButtonsByQuery(s9, "DAW Studio", s2);
          await linkButtonsByQuery(s9, "Back to Studio", s2);
          await linkButtonsByQuery(s9, "Nav/Home", s2);
          await linkButtonsByQuery(s9, "Button/Play Take", s2);
        }
        if (s3) {
          await linkButtonsByQuery(s9, "Nav/Reports", s3);
          await linkButtonsByQuery(s9, "View Report", s3);
          await linkButtonsByQuery(s9, "Bohemian Rhapsody", s3);
          await linkButtonsByQuery(s9, "Nessun Dorma", s3);
        }
        if (s4) {
          await linkButtonsByQuery(s9, "Nav/Analytics", s4);
          await linkButtonsByQuery(s9, "Bel Canto Warmups", s4);
          await linkButtonsByQuery(s9, "Passaggio Agility", s4);
        }
        if (s8) {
          await linkButtonsByQuery(s9, "Nav/Documents", s8);
          await linkButtonsByQuery(s9, "Show All 48 Takes", s8);
        }
        if (s6) {
          await linkButtonsByQuery(s9, "Nav/Settings", s6);
          await linkButtonsByQuery(s9, "Account Settings", s6);
          await linkButtonsByQuery(s9, "Profile/Go to Settings", s6);
        }
        if (s1) {
          await linkButtonsByQuery(s9, "Brand Logo Dock Button", s1);
        }
      }
    }

    // -------------------------------------------------------------------------
    // 3. SCREEN BUILDERS
    // -------------------------------------------------------------------------
    function buildStudioScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 02. Live Recording Studio & Audio Workstation";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Background gradient: Dark studio canvas
  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } }, // #0A0C10
      { position: 1.0, color: { r: 0.018, g: 0.022, b: 0.030, a: 1 } }  // #050608
    ]
  }];

  // Subtle studio grid line accent
  const grid = figma.createLine();
  grid.resize(1440, 0); grid.x = 0; grid.y = 64;
  grid.strokes = solid({ r: 1, g: 1, b: 1 }, 0.04);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // -----------------------------------------------------------------------
  // LEFT DAW SIDEBAR DOCK (72 x 960) — STRICTLY FROM patokan.png
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
  logoSquircle.cornerRadius = 12;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (Home active, Waveform, Bar chart, Document)
  const navGroup = figma.createFrame();
  navGroup.name = "Nav Icons Group";
  navGroup.layoutMode = "VERTICAL";
  navGroup.primaryAxisSizingMode = "AUTO";
  navGroup.counterAxisSizingMode = "AUTO";
  navGroup.itemSpacing = 16;
  navGroup.counterAxisAlignItems = "CENTER";
  navGroup.fills = [];

  const btnNavHome = createIconButton("home", "#00F5A0", 42, 18, true); // Active green squircle in patokan.png!
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

  // Bottom: Settings + ER Profile avatar
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
  avatarFrame.resize(36, 36);
  avatarFrame.cornerRadius = 18;
  avatarFrame.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  avatarFrame.strokes = solid(C.glassBorder, 1);
  avatarFrame.strokeWeight = 1.5;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 11, "Bold", C.textWhite));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN STUDIO CONTENT CONTAINER (1368 x 960)
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Studio Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 16;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP STUDIO DAW HEADER (1312 x 48) — ULTRA-CLEAN STUDIO TOOLBAR
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Studio DAW TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.paddingLeft = 16;
  topBar.paddingRight = 16;
  topBar.cornerRadius = 10;
  topBar.fills = solid(C.glassElevated, 0.55);
  topBar.strokes = solid(C.glassBorder, 0.08);
  topBar.strokeWeight = 1;

  // Left: Search Bar (260px) + Mic Status Text
  const hLeft = figma.createFrame();
  hLeft.layoutMode = "HORIZONTAL";
  hLeft.primaryAxisSizingMode = "AUTO";
  hLeft.counterAxisSizingMode = "AUTO";
  hLeft.itemSpacing = 16;
  hLeft.counterAxisAlignItems = "CENTER";
  hLeft.fills = [];

  const searchInput = figma.createFrame();
  searchInput.name = "Global Search Bar";
  searchInput.layoutMode = "HORIZONTAL";
  searchInput.primaryAxisSizingMode = "FIXED";
  searchInput.counterAxisSizingMode = "FIXED";
  searchInput.resize(260, 34);
  searchInput.cornerRadius = 8;
  searchInput.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  searchInput.strokes = solid(C.glassBorder, 0.8);
  searchInput.strokeWeight = 1;
  searchInput.paddingLeft = 12;
  searchInput.paddingRight = 10;
  searchInput.itemSpacing = 10;
  searchInput.counterAxisAlignItems = "CENTER";
  searchInput.primaryAxisAlignItems = "SPACE_BETWEEN";

  const sLeft = figma.createFrame();
  sLeft.layoutMode = "HORIZONTAL"; sLeft.itemSpacing = 8; sLeft.counterAxisAlignItems = "CENTER"; sLeft.fills = [];
  sLeft.appendChild(createSvgIcon("search", "#8B9DAF", 14));
  sLeft.appendChild(createText("Search vocal scales, songs...", 11, "Regular", C.textZinc400));
  searchInput.appendChild(sLeft);
  searchInput.appendChild(createBadge("⌘K", "neutral", 9));
  hLeft.appendChild(searchInput);

  const vSepL = figma.createFrame();
  vSepL.resize(1, 18);
  vSepL.fills = solid(C.glassBorder, 0.12);
  hLeft.appendChild(vSepL);

  const micStatus = figma.createFrame();
  micStatus.name = "Hardware Mic Indicator";
  micStatus.layoutMode = "HORIZONTAL";
  micStatus.primaryAxisSizingMode = "AUTO";
  micStatus.counterAxisSizingMode = "AUTO";
  micStatus.itemSpacing = 8;
  micStatus.counterAxisAlignItems = "CENTER";
  micStatus.fills = [];
  const micDot = figma.createEllipse(); micDot.resize(7, 7); micDot.fills = solid(C.mint, 1);
  micStatus.appendChild(micDot);
  micStatus.appendChild(createText("Shure MV7 (48kHz YIN Engine)", 11, "Medium", C.textZinc300));
  hLeft.appendChild(micStatus);

  topBar.appendChild(hLeft);

  // Right: Bell, Moon, Profile Chip, New Session Action Button
  const hRight = figma.createFrame();
  hRight.layoutMode = "HORIZONTAL";
  hRight.primaryAxisSizingMode = "AUTO";
  hRight.counterAxisSizingMode = "AUTO";
  hRight.itemSpacing = 12;
  hRight.counterAxisAlignItems = "CENTER";
  hRight.fills = [];

  const bellBtn = createIconButton("bell", "#8B9DAF", 34, 15);
  bellBtn.name = "TopBar/Bell Notifications";
  hRight.appendChild(bellBtn);

  const moonBtn = createIconButton("moon", "#8B9DAF", 34, 15);
  moonBtn.name = "TopBar/Theme Switcher";
  hRight.appendChild(moonBtn);

  const vSepR = figma.createFrame();
  vSepR.resize(1, 18);
  vSepR.fills = solid(C.glassBorder, 0.12);
  hRight.appendChild(vSepR);

  const profileChip = figma.createFrame();
  profileChip.name = "TopBar/User Profile Chip";
  profileChip.layoutMode = "HORIZONTAL";
  profileChip.primaryAxisSizingMode = "AUTO";
  profileChip.counterAxisSizingMode = "AUTO";
  profileChip.itemSpacing = 8;
  profileChip.counterAxisAlignItems = "CENTER";
  profileChip.paddingLeft = 8; profileChip.paddingRight = 14; profileChip.paddingTop = 5; profileChip.paddingBottom = 5;
  profileChip.cornerRadius = 8;
  profileChip.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  profileChip.strokes = solid(C.glassBorder, 0.8);
  profileChip.strokeWeight = 1;

  const chipAvatar = figma.createEllipse();
  chipAvatar.resize(26, 26); chipAvatar.fills = solid(C.forestBase, 1); chipAvatar.strokes = solid(C.mint, 0.6); chipAvatar.strokeWeight = 1;
  profileChip.appendChild(chipAvatar);

  const userTextCol = figma.createFrame();
  userTextCol.layoutMode = "VERTICAL"; userTextCol.itemSpacing = 1; userTextCol.fills = [];
  userTextCol.primaryAxisSizingMode = "AUTO"; userTextCol.counterAxisSizingMode = "AUTO";
  userTextCol.appendChild(createText("Ethan Reynolds", 11, "Bold", C.textWhite));
  userTextCol.appendChild(createText("PRO SINGER", 8, "Bold", C.mint));
  profileChip.appendChild(userTextCol);
  hRight.appendChild(profileChip);

  const btnNewSession = createActionButton("New Session", "arrow-up-right", "radiant");
  btnNewSession.name = "TopBar/New Session CTA";
  hRight.appendChild(btnNewSession);

  topBar.appendChild(hRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. TOP BENTO ROW (1312 x 490): CARD 1 (LEFT 852px) + CARD 2 (RIGHT 444px)
  // -----------------------------------------------------------------------
  const topBentoRow = figma.createFrame();
  topBentoRow.name = "Top Bento Row";
  topBentoRow.layoutMode = "HORIZONTAL";
  topBentoRow.resize(1312, 490);
  topBentoRow.itemSpacing = 16;
  topBentoRow.fills = [];
  topBentoRow.clipsContent = false;

  // CARD 1: LIVE PITCH & FORMANT TRACKER (852 x 490 px) — UC-08 & UC-11
  const pitchCard = figma.createFrame();
  pitchCard.name = "Card 1: Live Pitch & Formant Tracker (UC-08)";
  pitchCard.layoutMode = "VERTICAL";
  pitchCard.resize(852, 490);
  pitchCard.paddingLeft = 24; pitchCard.paddingRight = 24; pitchCard.paddingTop = 18; pitchCard.paddingBottom = 16;
  pitchCard.itemSpacing = 8;
  pitchCard.cornerRadius = 16;
  pitchCard.clipsContent = true;
  applyCard1Glass(pitchCard);

  // Header row
  const pHead = figma.createFrame();
  pHead.layoutMode = "HORIZONTAL"; pHead.resize(804, 26); pHead.primaryAxisAlignItems = "SPACE_BETWEEN"; pHead.counterAxisAlignItems = "CENTER"; pHead.fills = [];
  const pTag = figma.createFrame();
  pTag.layoutMode = "HORIZONTAL"; pTag.itemSpacing = 8; pTag.counterAxisAlignItems = "CENTER"; pTag.fills = [];
  pTag.primaryAxisSizingMode = "AUTO"; pTag.counterAxisSizingMode = "AUTO";
  const pDot = figma.createEllipse(); pDot.resize(7, 7); pDot.fills = solid(C.mint, 1);
  pTag.appendChild(pDot);
  pTag.appendChild(createText("LIVE PITCH & FORMANT TRACKER • YIN DSP Active", 11, "Bold", C.mint));
  pHead.appendChild(pTag);

  const scaleTabs = figma.createFrame();
  scaleTabs.layoutMode = "HORIZONTAL"; scaleTabs.itemSpacing = 6; scaleTabs.counterAxisAlignItems = "CENTER"; scaleTabs.fills = [];
  scaleTabs.primaryAxisSizingMode = "AUTO"; scaleTabs.counterAxisSizingMode = "AUTO";
  scaleTabs.appendChild(createBadge("C Major", "neutral", 9));
  scaleTabs.appendChild(createBadge("G Major (Active)", "mint", 9));
  scaleTabs.appendChild(createBadge("F# Pentatonic", "neutral", 9));
  pHead.appendChild(scaleTabs);
  pitchCard.appendChild(pHead);

  // Frequency readout & REC status
  const pStats = figma.createFrame();
  pStats.name = "Frequency Readout Bar";
  pStats.layoutMode = "HORIZONTAL";
  pStats.resize(804, 48);
  pStats.primaryAxisAlignItems = "SPACE_BETWEEN";
  pStats.counterAxisAlignItems = "CENTER";
  pStats.fills = [];
  pStats.clipsContent = false;

  const pLeftStats = figma.createFrame();
  pLeftStats.layoutMode = "HORIZONTAL";
  pLeftStats.primaryAxisSizingMode = "AUTO";
  pLeftStats.counterAxisSizingMode = "AUTO";
  pLeftStats.itemSpacing = 12;
  pLeftStats.counterAxisAlignItems = "CENTER";
  pLeftStats.fills = [];
  pLeftStats.clipsContent = false;

  pLeftStats.appendChild(createText("G4", 36, "Bold", C.textWhite));
  pLeftStats.appendChild(createText("392.00 Hz", 20, "Bold", C.mint));
  pLeftStats.appendChild(createBadge("IN-TUNE (+2 CENTS)", "mint", 10));

  const ribbon = figma.createFrame();
  ribbon.layoutMode = "HORIZONTAL";
  ribbon.primaryAxisSizingMode = "AUTO";
  ribbon.counterAxisSizingMode = "AUTO";
  ribbon.itemSpacing = 6;
  ribbon.counterAxisAlignItems = "CENTER";
  ribbon.fills = [];
  ribbon.appendChild(createText("C3 — D4 —", 10, "Regular", C.textZinc500));
  ribbon.appendChild(createText("G4 (Target)", 10, "Bold", C.mint));
  ribbon.appendChild(createText("— C5", 10, "Regular", C.textZinc500));
  pLeftStats.appendChild(ribbon);
  pStats.appendChild(pLeftStats);

  // Red REC Pill Badge
  const recBadge = figma.createFrame();
  recBadge.name = "Recording Status Badge";
  recBadge.layoutMode = "HORIZONTAL";
  recBadge.primaryAxisSizingMode = "AUTO";
  recBadge.counterAxisSizingMode = "AUTO";
  recBadge.itemSpacing = 6;
  recBadge.counterAxisAlignItems = "CENTER";
  recBadge.paddingLeft = 10; recBadge.paddingRight = 10; recBadge.paddingTop = 4; recBadge.paddingBottom = 4;
  recBadge.cornerRadius = 6;
  recBadge.fills = solid({ r: 0.16, g: 0.04, b: 0.06 }, 1);
  recBadge.strokes = solid(C.rose, 0.4);
  recBadge.strokeWeight = 1;
  const recDot = figma.createEllipse(); recDot.resize(6, 6); recDot.fills = solid(C.rose, 1);
  recBadge.appendChild(recDot);
  recBadge.appendChild(createText("REC 00:42 / 05:00", 10, "Bold", C.rose));
  pStats.appendChild(recBadge);
  pitchCard.appendChild(pStats);

  // Subtitle line
  pitchCard.appendChild(createText("Scale Target: G Major Arpeggio • Vibrato 6.2 Hz (Stable)", 11, "Medium", C.textZinc400));

  // Rolling pitch canvas (804 x 260)
  const canvasBox = figma.createFrame();
  canvasBox.name = "Rolling Pitch Canvas";
  canvasBox.resize(804, 260);
  canvasBox.cornerRadius = 10;
  canvasBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.9);
  canvasBox.strokes = solid(C.glassBorder, 0.8);
  canvasBox.strokeWeight = 1;
  canvasBox.clipsContent = true;

  // Grid lines
  const gridRows = [
    { label: "A4 (440Hz)", y: 44, color: C.textZinc500 },
    { label: "G4 Target (392Hz)", y: 100, color: C.mint },
    { label: "F4 (349Hz)", y: 160, color: C.textZinc500 },
    { label: "E4 (330Hz)", y: 216, color: C.textZinc500 }
  ];

  for (const gr of gridRows) {
    const gl = figma.createLine();
    gl.resize(804, 0); gl.x = 0; gl.y = gr.y;
    gl.strokes = solid(gr.color, gr.color === C.mint ? 0.35 : 0.08);
    gl.strokeWeight = gr.color === C.mint ? 1.5 : 1;
    canvasBox.appendChild(gl);

    const lbl = createText(gr.label, 9, gr.color === C.mint ? "Bold" : "Regular", gr.color);
    lbl.x = 12; lbl.y = gr.y - 14;
    canvasBox.appendChild(lbl);
  }

  // Time markers
  const times = ["00:00", "00:02", "00:04", "00:06", "00:08", "00:10"];
  times.forEach((t, i) => {
    const tl = createText(t, 9, "Regular", C.textZinc500);
    tl.x = 14 + i * 148; tl.y = 242;
    canvasBox.appendChild(tl);
  });

  // Smooth Pitch Curve
  const pitchVector = figma.createVector();
  pitchVector.name = "Live Pitch Trajectory Curve";
  pitchVector.vectorPaths = [{
    windingRule: "NONE",
    data: "M 10 240 C 90 220 180 160 270 148 C 360 136 460 165 550 130 C 600 110 650 100 700 102 C 750 104 770 115 800 125"
  }];
  pitchVector.fills = [];
  pitchVector.strokes = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.3 } },
      { position: 0.6, color: { r: 0.0, g: 0.96, b: 0.628, a: 1 } },
      { position: 1.0, color: { r: 0.063, g: 0.725, b: 0.506, a: 0.9 } }
    ]
  }];
  pitchVector.strokeWeight = 3;
  canvasBox.appendChild(pitchVector);

  // Target Tooltip Callout Pill (09 Dec • G4 (392.2 Hz) ↗)
  const targetTooltip = figma.createFrame();
  targetTooltip.name = "Target Callout Tooltip";
  targetTooltip.layoutMode = "VERTICAL";
  targetTooltip.primaryAxisSizingMode = "AUTO";
  targetTooltip.counterAxisSizingMode = "AUTO";
  targetTooltip.paddingLeft = 10; targetTooltip.paddingRight = 10; targetTooltip.paddingTop = 6; targetTooltip.paddingBottom = 6;
  targetTooltip.itemSpacing = 2;
  targetTooltip.cornerRadius = 8;
  targetTooltip.fills = solid(C.glassElevated, 0.95);
  targetTooltip.strokes = solid(C.mint, 0.7);
  targetTooltip.strokeWeight = 1;
  targetTooltip.x = 420; targetTooltip.y = 70;
  targetTooltip.appendChild(createText("09 Dec • G4 (392.2 Hz) ↗", 10, "Bold", C.textWhite));
  targetTooltip.appendChild(createText("In-Tune Accuracy 99.4% (+2c)", 9, "Bold", C.mint));
  canvasBox.appendChild(targetTooltip);

  // Crosshair vertical line
  const crosshair = figma.createLine();
  crosshair.rotation = 90; crosshair.resize(180, 0); crosshair.x = 550; crosshair.y = 50;
  crosshair.strokes = solid(C.mint, 0.4); crosshair.strokeWeight = 1;
  canvasBox.appendChild(crosshair);

  // Crosshair dot
  const dot = figma.createEllipse();
  dot.resize(8, 8); dot.x = 546; dot.y = 126;
  dot.fills = solid(C.mint, 1);
  canvasBox.appendChild(dot);

  pitchCard.appendChild(canvasBox);

  // Clean Transport Controls Bar (Zero clipped boxes!)
  const transBar = figma.createFrame();
  transBar.name = "Transport Controls Bar";
  transBar.layoutMode = "HORIZONTAL";
  transBar.resize(804, 42);
  transBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  transBar.counterAxisAlignItems = "CENTER";
  transBar.fills = [];
  transBar.clipsContent = false;

  const transLeft = figma.createFrame();
  transLeft.layoutMode = "HORIZONTAL";
  transLeft.itemSpacing = 12;
  transLeft.counterAxisAlignItems = "CENTER";
  transLeft.fills = [];

  const btnPause = createActionButton("Pause", "pause", "secondary");
  btnPause.name = "Transport/Pause";
  const btnStopAnalyze = createActionButton("Stop & Analyze", "stop", "radiant");
  btnStopAnalyze.name = "Transport/Stop & Analyze";
  transLeft.appendChild(btnPause);
  transLeft.appendChild(btnStopAnalyze);

  // 120 BPM: Clean text directly on transport bar (NO nested clipped box!)
  const bpmText = createText("120 BPM", 12, "Bold", C.mint);
  bpmText.name = "Transport/120 BPM";
  transLeft.appendChild(bpmText);

  // Stereo VU meter: Clean segmented LED bars (NO nested clipped box!)
  const vuMeter = figma.createFrame();
  vuMeter.name = "Stereo VU Meter";
  vuMeter.layoutMode = "HORIZONTAL";
  vuMeter.itemSpacing = 6;
  vuMeter.counterAxisAlignItems = "CENTER";
  vuMeter.fills = [];

  vuMeter.appendChild(createText("L", 10, "Bold", C.textZinc500));
  const vuBarL = figma.createFrame(); vuBarL.resize(46, 6); vuBarL.cornerRadius = 3;
  vuBarL.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.024, g: 0.714, b: 0.831, a: 1 } }] }];
  vuMeter.appendChild(vuBarL);

  vuMeter.appendChild(createText("R", 10, "Bold", C.textZinc500));
  const vuBarR = figma.createFrame(); vuBarR.resize(46, 6); vuBarR.cornerRadius = 3;
  vuBarR.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.96, g: 0.62, b: 0.04, a: 1 } }] }];
  vuMeter.appendChild(vuBarR);

  transLeft.appendChild(vuMeter);
  transBar.appendChild(transLeft);

  const transRight = figma.createFrame();
  transRight.layoutMode = "HORIZONTAL"; transRight.itemSpacing = 12; transRight.counterAxisAlignItems = "CENTER"; transRight.fills = [];
  transRight.appendChild(createText("Noise Floor: -48 dB • RMS: -14.2 dB", 11, "Medium", C.textZinc400));
  transBar.appendChild(transRight);
  pitchCard.appendChild(transBar);

  topBentoRow.appendChild(pitchCard);

  // CARD 2: VOCAL REGISTERS & SPAN (444 x 490 px) — UC-07
  const regCard = figma.createFrame();
  regCard.name = "Card 2: Vocal Registers & Span";
  regCard.layoutMode = "VERTICAL";
  regCard.resize(444, 490);
  regCard.paddingLeft = 20; regCard.paddingRight = 20; regCard.paddingTop = 18; regCard.paddingBottom = 16;
  regCard.itemSpacing = 12;
  regCard.cornerRadius = 16;
  regCard.clipsContent = false;
  applyCard2Glass(regCard);

  // Header row: Vocal Registers & Span + ↗ Retest (clean auto-layout button!)
  const rgHead = figma.createFrame();
  rgHead.layoutMode = "HORIZONTAL"; rgHead.resize(404, 32); rgHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rgHead.counterAxisAlignItems = "CENTER"; rgHead.fills = [];
  rgHead.appendChild(createText("Vocal Registers & Span", 14, "Bold", C.textWhite));

  const btnRetest = createActionButton("Retest", "arrow-up-right", "secondary");
  btnRetest.name = "Registers/Retest";
  rgHead.appendChild(btnRetest);
  regCard.appendChild(rgHead);

  // Register Rows
  function makeRegisterRow(name, freq, percent, color) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(404, 24); row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER"; row.fills = [];
    row.appendChild(createText(name + " (" + freq + ")", 11, "Bold", color));
    row.appendChild(createText(percent, 11, "Bold", color));
    return row;
  }
  regCard.appendChild(makeRegisterRow("HEAD VOICE", "2k–5k Hz", "72% Formant", C.amber));
  regCard.appendChild(makeRegisterRow("MIXED VOICE", "400–2k Hz", "84% Balance", C.mint));

  // Chest Voice Foundation Box (404 x 260 px)
  const rangeBox = figma.createFrame();
  rangeBox.name = "Chest Voice Foundation Box";
  rangeBox.layoutMode = "VERTICAL";
  rangeBox.resize(404, 260);
  rangeBox.paddingLeft = 18; rangeBox.paddingRight = 18; rangeBox.paddingTop = 16; rangeBox.paddingBottom = 16;
  rangeBox.itemSpacing = 10;
  rangeBox.cornerRadius = 12;
  rangeBox.fills = solid(C.forestBase, 0.7);
  rangeBox.strokes = solid(C.mint, 0.35);
  rangeBox.strokeWeight = 1;

  const rfHead = figma.createFrame();
  rfHead.layoutMode = "HORIZONTAL"; rfHead.resize(368, 20); rfHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rfHead.counterAxisAlignItems = "CENTER"; rfHead.fills = [];
  rfHead.appendChild(createText("CHEST VOICE FOUNDATION", 10, "Bold", C.mint));
  rfHead.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
  rangeBox.appendChild(rfHead);

  // Big range headline C2 — A4
  const rangeTitleCol = figma.createFrame();
  rangeTitleCol.layoutMode = "VERTICAL"; rangeTitleCol.itemSpacing = 2; rangeTitleCol.fills = [];
  rangeTitleCol.appendChild(createText("C2 — A4", 32, "Bold", C.textWhite));
  rangeTitleCol.appendChild(createText("Span: 2.8 Octaves (Tenor Range)", 12, "Medium", C.textZinc300));
  rangeBox.appendChild(rangeTitleCol);

  // Resonance power stats row
  const rStatsRow = figma.createFrame();
  rStatsRow.layoutMode = "HORIZONTAL"; rStatsRow.resize(368, 20); rStatsRow.primaryAxisAlignItems = "SPACE_BETWEEN"; rStatsRow.counterAxisAlignItems = "CENTER"; rStatsRow.fills = [];
  rStatsRow.appendChild(createText("Resonance Power: 94%", 11, "Bold", C.mint));
  rStatsRow.appendChild(createText("↑ Top 8% Singer", 11, "Bold", C.mint));
  rangeBox.appendChild(rStatsRow);

  // Glowing progress bar
  const pBarBg = figma.createFrame();
  pBarBg.resize(368, 6); pBarBg.cornerRadius = 3; pBarBg.fills = solid({ r: 0.05, g: 0.10, b: 0.12 }, 1);
  const pBarFill = figma.createFrame();
  pBarFill.resize(346, 6); pBarFill.cornerRadius = 3;
  pBarFill.fills = solid(C.mint, 1);
  pBarBg.appendChild(pBarFill);
  rangeBox.appendChild(pBarBg);

  rangeBox.appendChild(createText("Acoustic Formant: 730 Hz • Optimal Core Resonance", 10, "Medium", C.textZinc400));
  regCard.appendChild(rangeBox);

  // Action row: Expand Range (secondary) + Practice Scales (radiant)
  const regActRow = figma.createFrame();
  regActRow.layoutMode = "HORIZONTAL"; regActRow.resize(404, 38); regActRow.primaryAxisAlignItems = "SPACE_BETWEEN"; regActRow.fills = [];
  const btnExpand = createActionButton("Expand Range", "arrow-down-right", "secondary", 192);
  btnExpand.name = "Registers/Expand Range";
  const btnPractice = createActionButton("Practice Scales", "arrow-up-right", "radiant", 202);
  btnPractice.name = "Registers/Practice Scales";
  regActRow.appendChild(btnExpand);
  regActRow.appendChild(btnPractice);
  regCard.appendChild(regActRow);

  topBentoRow.appendChild(regCard);
  container.appendChild(topBentoRow);

  // -----------------------------------------------------------------------
  // 3. BOTTOM BENTO ROW (1312 x 340): 3 BALANCED CARDS FROM patokan.png!
  //    Card 3 (416px): Gemini AI Vocal Coach
  //    Card 4 (444px): Accuracy Trend (Weekly bar chart)
  //    Card 5 (420px): Recent Singing Takes
  // -----------------------------------------------------------------------
  const botBentoRow = figma.createFrame();
  botBentoRow.name = "Bottom Bento Row";
  botBentoRow.layoutMode = "HORIZONTAL";
  botBentoRow.resize(1312, 340);
  botBentoRow.itemSpacing = 16;
  botBentoRow.fills = [];
  botBentoRow.clipsContent = false;

  // CARD 3: GEMINI AI VOCAL COACH (416 x 340 px) — STRICTLY FROM patokan.png
  const coachCard = figma.createFrame();
  coachCard.name = "Card 3: Gemini AI Vocal Coach";
  coachCard.layoutMode = "VERTICAL";
  coachCard.resize(416, 340);
  coachCard.paddingLeft = 20; coachCard.paddingRight = 20; coachCard.paddingTop = 16; coachCard.paddingBottom = 16;
  coachCard.itemSpacing = 10;
  coachCard.cornerRadius = 16;
  coachCard.clipsContent = false;
  applyCard1Glass(coachCard);

  // Coach Badge header
  const cBadgeRow = figma.createFrame();
  cBadgeRow.layoutMode = "HORIZONTAL"; cBadgeRow.itemSpacing = 6; cBadgeRow.counterAxisAlignItems = "CENTER"; cBadgeRow.fills = [];
  cBadgeRow.appendChild(createSvgIcon("sparkle", "#00F5A0", 14));
  cBadgeRow.appendChild(createText("GEMINI AI VOCAL COACH", 11, "Bold", C.mint));
  coachCard.appendChild(cBadgeRow);

  // Title
  coachCard.appendChild(createText("Bridge Mix-Voice Smoothly", 16, "Bold", C.textWhite));

  // Quote
  const quoteText = createParagraph(
    `"Great resonance on chest tones! Smooth the F#4 to G4 bridge to eliminate the slight flat drift during breath recovery."`,
    376, 11, "Regular", C.textZinc300, 17
  );
  coachCard.appendChild(quoteText);

  // Audio Chip: Take Analysis: F#4–G4 Shift + mini waveform bars
  const audioChip = figma.createFrame();
  audioChip.name = "Audio Chip Analysis";
  audioChip.layoutMode = "HORIZONTAL";
  audioChip.resize(376, 44);
  audioChip.paddingLeft = 12; audioChip.paddingRight = 12;
  audioChip.primaryAxisAlignItems = "SPACE_BETWEEN";
  audioChip.counterAxisAlignItems = "CENTER";
  audioChip.cornerRadius = 8;
  audioChip.fills = solid(C.glassElevated, 0.9);
  audioChip.strokes = solid(C.glassBorder, 0.6);
  audioChip.strokeWeight = 1;

  const acLeft = figma.createFrame();
  acLeft.layoutMode = "VERTICAL"; acLeft.itemSpacing = 1; acLeft.fills = [];
  acLeft.appendChild(createText("Take Analysis: F#4–G4 Shift", 11, "Bold", C.textWhite));
  acLeft.appendChild(createText("Mild Flatness Detected at 00:23", 9, "Regular", C.textZinc500));
  audioChip.appendChild(acLeft);

  // Mini EQ bars
  const miniEq = figma.createFrame();
  miniEq.layoutMode = "HORIZONTAL"; miniEq.itemSpacing = 3; miniEq.counterAxisAlignItems = "CENTER"; miniEq.fills = [];
  const eqHeights = [8, 16, 24, 14, 20, 12, 18, 10];
  for (const eh of eqHeights) {
    const b = figma.createFrame();
    b.resize(3, eh); b.cornerRadius = 1.5;
    b.fills = solid(C.mint, 0.85);
    miniEq.appendChild(b);
  }
  audioChip.appendChild(miniEq);
  coachCard.appendChild(audioChip);

  // Social proof: 4 colored overlapping avatar circles + +1.4k singers
  const socialRow = figma.createFrame();
  socialRow.layoutMode = "HORIZONTAL"; socialRow.itemSpacing = 8; socialRow.counterAxisAlignItems = "CENTER"; socialRow.fills = [];

  const avGroup = figma.createFrame();
  avGroup.resize(60, 20); avGroup.fills = [];
  const avColors = [
    { r: 0.0, g: 0.96, b: 0.628 },
    { r: 0.96, g: 0.62, b: 0.04 },
    { r: 0.024, g: 0.714, b: 0.831 },
    { r: 0.957, g: 0.247, b: 0.369 }
  ];
  avColors.forEach((col, idx) => {
    const av = figma.createEllipse();
    av.resize(18, 18); av.x = idx * 13; av.y = 1;
    av.fills = solid(col, 1);
    av.strokes = solid(C.canvasTop, 1); av.strokeWeight = 1.5;
    avGroup.appendChild(av);
  });
  socialRow.appendChild(avGroup);
  socialRow.appendChild(createText("+1.4k singers trained today", 10, "Medium", C.textZinc400));
  coachCard.appendChild(socialRow);

  // Primary Action Button: ↗ Start 5-Min Drill
  const btnStartDrill = createActionButton("Start 5-Min Drill", "arrow-up-right", "radiant", 376);
  btnStartDrill.name = "Coach/Start 5-Min Drill";
  coachCard.appendChild(btnStartDrill);

  botBentoRow.appendChild(coachCard);

  // CARD 4: ACCURACY TREND (444 x 340 px) — STRICTLY FROM patokan.png
  const trendCard = figma.createFrame();
  trendCard.name = "Card 4: Accuracy Trend";
  trendCard.layoutMode = "VERTICAL";
  trendCard.resize(444, 340);
  trendCard.paddingLeft = 20; trendCard.paddingRight = 20; trendCard.paddingTop = 16; trendCard.paddingBottom = 16;
  trendCard.itemSpacing = 12;
  trendCard.cornerRadius = 16;
  trendCard.clipsContent = false;
  applyCard2Glass(trendCard);

  // Header: Accuracy Trend 94.2% ↑ 3.8% on left, Weekly dropdown on right
  const trHead = figma.createFrame();
  trHead.layoutMode = "HORIZONTAL"; trHead.resize(404, 26); trHead.primaryAxisAlignItems = "SPACE_BETWEEN"; trHead.counterAxisAlignItems = "CENTER"; trHead.fills = [];

  const trHeadLeft = figma.createFrame();
  trHeadLeft.layoutMode = "HORIZONTAL"; trHeadLeft.itemSpacing = 8; trHeadLeft.counterAxisAlignItems = "CENTER"; trHeadLeft.fills = [];
  trHeadLeft.appendChild(createText("Accuracy Trend", 13, "Bold", C.textWhite));
  trHeadLeft.appendChild(createText("94.2%", 15, "Bold", C.mint));
  trHeadLeft.appendChild(createText("↑ 3.8%", 11, "Bold", C.mint));
  trHead.appendChild(trHeadLeft);

  const trDropdown = figma.createFrame();
  trDropdown.layoutMode = "HORIZONTAL"; trDropdown.itemSpacing = 4; trDropdown.counterAxisAlignItems = "CENTER";
  trDropdown.paddingLeft = 8; trDropdown.paddingRight = 8; trDropdown.paddingTop = 3; trDropdown.paddingBottom = 3;
  trDropdown.cornerRadius = 6; trDropdown.fills = solid(C.glassElevated, 0.8);
  trDropdown.strokes = solid(C.glassBorder, 0.6); trDropdown.strokeWeight = 1;
  trDropdown.appendChild(createText("Weekly ˅", 10, "Medium", C.textZinc300));
  trHead.appendChild(trDropdown);
  trendCard.appendChild(trHead);

  // 7 Vertical Bars Chart (Mon - Today)
  const barChartBox = figma.createFrame();
  barChartBox.name = "Weekly 7-Day Bar Chart";
  barChartBox.resize(404, 190);
  barChartBox.fills = [];
  barChartBox.clipsContent = false;

  const barData = [
    { day: "Mon", pct: 72, h: 90 },
    { day: "Tue", pct: 84, h: 105 },
    { day: "Wed", pct: 88, h: 110 },
    { day: "Thu", pct: 86, h: 108 },
    { day: "Fri", pct: 92, h: 115 },
    { day: "Sat", pct: 95, h: 120 },
    { day: "Today", pct: 98, h: 128, peak: true }
  ];

  barData.forEach((d, i) => {
    const x = 10 + i * 56;

    // Background track bar
    const track = figma.createFrame();
    track.resize(36, 136); track.x = x; track.y = 28; track.cornerRadius = 6;
    track.fills = solid(C.glassElevated, 0.4);
    barChartBox.appendChild(track);

    // Filled bar
    const filled = figma.createFrame();
    filled.resize(36, d.h); filled.x = x; filled.y = 28 + (136 - d.h); filled.cornerRadius = 6;
    if (d.peak) {
      filled.fills = solid(C.mint, 1);
      // Peak badge
      const peakBadge = createBadge("98% Peak", "mint", 8);
      peakBadge.x = x - 6; peakBadge.y = 6;
      barChartBox.appendChild(peakBadge);
    } else {
      filled.fills = solid({ r: 0.08, g: 0.16, b: 0.18 }, 0.85);
      // Percentage text above bar
      const pText = createText(d.pct + "%", 9, "Regular", C.textZinc400);
      pText.x = x + 6; pText.y = 12;
      barChartBox.appendChild(pText);
    }
    barChartBox.appendChild(filled);

    // Day label below
    const dayLabel = createText(d.day, 10, d.peak ? "Bold" : "Regular", d.peak ? C.mint : C.textZinc500);
    dayLabel.x = x + (d.day === "Today" ? 2 : 7); dayLabel.y = 172;
    barChartBox.appendChild(dayLabel);
  });
  trendCard.appendChild(barChartBox);

  // Footer: Vibrato Rate & Steady Breath
  const trFooter = figma.createFrame();
  trFooter.layoutMode = "HORIZONTAL"; trFooter.resize(404, 20); trFooter.primaryAxisAlignItems = "SPACE_BETWEEN"; trFooter.counterAxisAlignItems = "CENTER"; trFooter.fills = [];
  trFooter.appendChild(createText("Vibrato Rate: 6.1 Hz (Natural)", 10, "Regular", C.textZinc400));
  trFooter.appendChild(createText("Steady Breath: 88.4%", 10, "Bold", C.mint));
  trendCard.appendChild(trFooter);

  botBentoRow.appendChild(trendCard);

  // CARD 5: RECENT SINGING TAKES (420 x 340 px) — STRICTLY FROM patokan.png
  const takesCard = figma.createFrame();
  takesCard.name = "Card 5: Recent Singing Takes";
  takesCard.layoutMode = "VERTICAL";
  takesCard.resize(420, 340);
  takesCard.paddingLeft = 20; takesCard.paddingRight = 20; takesCard.paddingTop = 16; takesCard.paddingBottom = 16;
  takesCard.itemSpacing = 10;
  takesCard.cornerRadius = 16;
  takesCard.clipsContent = false;
  applyCard2Glass(takesCard);

  // Header: Recent Singing Takes on left, View All on right
  const tkHead = figma.createFrame();
  tkHead.layoutMode = "HORIZONTAL"; tkHead.resize(380, 24); tkHead.primaryAxisAlignItems = "SPACE_BETWEEN"; tkHead.counterAxisAlignItems = "CENTER"; tkHead.fills = [];
  tkHead.appendChild(createText("Recent Singing Takes", 13, "Bold", C.textWhite));
  const tkViewAll = createText("View All", 11, "Medium", C.textZinc400);
  tkViewAll.name = "Takes/View All";
  tkHead.appendChild(tkViewAll);
  takesCard.appendChild(tkHead);

  // 3 Take Rows
  function makeTakeRow(title, subtext, iconType, badgeType, badgeLabel) {
    const row = figma.createFrame();
    row.name = "Take Row/" + title;
    row.layoutMode = "HORIZONTAL";
    row.resize(380, 68);
    row.paddingLeft = 14; row.paddingRight = 14;
    row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER";
    row.cornerRadius = 10;
    row.fills = solid(C.glassElevated, 0.6);
    row.strokes = solid(C.glassBorder, 0.6);
    row.strokeWeight = 1;

    const leftPart = figma.createFrame();
    leftPart.layoutMode = "HORIZONTAL"; leftPart.itemSpacing = 12; leftPart.counterAxisAlignItems = "CENTER"; leftPart.fills = [];

    // Icon Circle (34x34)
    const icCircle = figma.createEllipse();
    icCircle.resize(34, 34); icCircle.fills = solid({ r: 0.05, g: 0.12, b: 0.10 }, 1);
    icCircle.strokes = solid(C.mint, 0.5); icCircle.strokeWeight = 1;

    const icBox = figma.createFrame();
    icBox.resize(34, 34); icBox.fills = [];
    icBox.appendChild(icCircle);
    const icSvg = createSvgIcon(iconType === "mic" ? "sparkle" : "waveform", "#00F5A0", 16);
    icSvg.x = 9; icSvg.y = 9;
    icBox.appendChild(icSvg);
    leftPart.appendChild(icBox);

    const txtCol = figma.createFrame();
    txtCol.layoutMode = "VERTICAL"; txtCol.itemSpacing = 2; txtCol.fills = [];
    txtCol.appendChild(createText(title, 12, "Bold", C.textWhite));
    txtCol.appendChild(createText(subtext, 10, "Regular", C.textZinc400));
    leftPart.appendChild(txtCol);
    row.appendChild(leftPart);

    if (badgeType === "replay") {
      const btnReplay = createActionButton(badgeLabel, "play", "secondary");
      btnReplay.name = "Takes/Replay";
      row.appendChild(btnReplay);
    } else {
      const bd = createBadge(badgeLabel, "mint", 10);
      row.appendChild(bd);
    }
    return row;
  }

  takesCard.appendChild(makeTakeRow("Bohemian Rhapsody (G4)", "2 min ago • 96% In-Tune", "mic", "badge", "+15 pts"));
  takesCard.appendChild(makeTakeRow("Solfeggio Scale Drill", "Yesterday • F4 Sharp Fals", "wave", "replay", "Replay 00:23"));
  takesCard.appendChild(makeTakeRow("Vocal Range Assessment", "3 days ago • C2 to A4 Span", "mic", "badge", "PDF Ready"));

  botBentoRow.appendChild(takesCard);
  container.appendChild(botBentoRow);

  return root;
}

    function buildReportScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 03. Diagnostic Singing Report & Piano Roll";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Background
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
  logoSquircle.cornerRadius = 12;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (Waveform active in emerald squircle for Screen 03!)
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
  const btnNavWave = createIconButton("waveform", "#00F5A0", 42, 18, true); // Active for Singing Report!
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

  // Bottom: Settings + ER Profile avatar
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
  avatarFrame.resize(36, 36);
  avatarFrame.cornerRadius = 18;
  avatarFrame.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  avatarFrame.strokes = solid(C.glassBorder, 1);
  avatarFrame.strokeWeight = 1.5;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 11, "Bold", C.textWhite));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN WORKSPACE CONTAINER (1368 x 960) AT x=72
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Report Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 14;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP SESSION BAR & CONTROLS (1312 x 46 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Session Audit TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 46);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  // Left: Session Title & Back button
  const tbLeft = figma.createFrame();
  tbLeft.layoutMode = "HORIZONTAL";
  tbLeft.primaryAxisSizingMode = "AUTO";
  tbLeft.counterAxisSizingMode = "AUTO";
  tbLeft.itemSpacing = 14;
  tbLeft.counterAxisAlignItems = "CENTER";
  tbLeft.fills = [];

  const backBtn = figma.createFrame();
  backBtn.name = "Button/Back to Studio";
  backBtn.layoutMode = "HORIZONTAL";
  backBtn.primaryAxisSizingMode = "AUTO";
  backBtn.counterAxisSizingMode = "AUTO";
  backBtn.itemSpacing = 6;
  backBtn.counterAxisAlignItems = "CENTER";
  backBtn.paddingLeft = 12; backBtn.paddingRight = 12; backBtn.paddingTop = 6; backBtn.paddingBottom = 6;
  backBtn.cornerRadius = 8; backBtn.fills = solid(C.glassElevated, 1);
  backBtn.strokes = solid(C.glassBorder, 1); backBtn.strokeWeight = 1;
  backBtn.appendChild(createText("← DAW Studio", 11, "Medium", C.textZinc300));
  tbLeft.appendChild(backBtn);

  const titleCol = figma.createFrame();
  titleCol.layoutMode = "VERTICAL";
  titleCol.primaryAxisSizingMode = "AUTO";
  titleCol.counterAxisSizingMode = "AUTO";
  titleCol.itemSpacing = 1;
  titleCol.fills = [];

  const titleRow = figma.createFrame();
  titleRow.layoutMode = "HORIZONTAL";
  titleRow.primaryAxisSizingMode = "AUTO";
  titleRow.counterAxisSizingMode = "AUTO";
  titleRow.itemSpacing = 8;
  titleRow.counterAxisAlignItems = "CENTER";
  titleRow.fills = [];
  titleRow.appendChild(createText("Bohemian Rhapsody — Take 04 (Verse 1)", 15, "Bold", C.textWhite));
  titleRow.appendChild(createBadge("48kHz WAV", "mint", 8));
  titleRow.appendChild(createBadge("YIN DSP CALIBRATED", "neutral", 8));
  titleCol.appendChild(titleRow);
  titleCol.appendChild(createText("Tenor C2–A4 • Recorded Today 14:20 • Key: Bb Major", 11, "Medium", C.textZinc400));
  tbLeft.appendChild(titleCol);
  topBar.appendChild(tbLeft);

  // Right: Score Badge + Actions
  const tbRight = figma.createFrame();
  tbRight.layoutMode = "HORIZONTAL";
  tbRight.primaryAxisSizingMode = "AUTO";
  tbRight.counterAxisSizingMode = "AUTO";
  tbRight.itemSpacing = 10;
  tbRight.counterAxisAlignItems = "CENTER";
  tbRight.fills = [];

  const scoreBadge = figma.createFrame();
  scoreBadge.layoutMode = "HORIZONTAL";
  scoreBadge.primaryAxisSizingMode = "AUTO";
  scoreBadge.counterAxisSizingMode = "AUTO";
  scoreBadge.itemSpacing = 8;
  scoreBadge.counterAxisAlignItems = "CENTER";
  scoreBadge.paddingLeft = 12; scoreBadge.paddingRight = 12; scoreBadge.paddingTop = 4; scoreBadge.paddingBottom = 4;
  scoreBadge.cornerRadius = 8; scoreBadge.fills = solid(C.forestBase, 0.95);
  scoreBadge.strokes = solid(C.mint, 0.6); scoreBadge.strokeWeight = 1;
  scoreBadge.appendChild(createText("94", 20, "Bold", C.mint));
  const scoreSub = figma.createFrame();
  scoreSub.layoutMode = "VERTICAL";
  scoreSub.primaryAxisSizingMode = "AUTO";
  scoreSub.counterAxisSizingMode = "AUTO";
  scoreSub.itemSpacing = 0;
  scoreSub.fills = [];
  scoreSub.appendChild(createText("/100 SCORE", 8, "Bold", C.textZinc400));
  scoreSub.appendChild(createText("VIRTUOSO", 8, "Bold", C.mint));
  scoreBadge.appendChild(scoreSub);
  tbRight.appendChild(scoreBadge);

  const btnCompare = createActionButton("Compare Take", "refresh", "secondary");
  btnCompare.name = "Report/Compare Take";
  tbRight.appendChild(btnCompare);

  const btnSave = createActionButton("Save Take", "document", "secondary");
  btnSave.name = "Report/Save Take";
  tbRight.appendChild(btnSave);

  const btnExport = createActionButton("Export PDF ↗", "arrow-up-right", "radiant");
  btnExport.name = "Report/Export PDF";
  tbRight.appendChild(btnExport);

  topBar.appendChild(tbRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. MAIN CENTERPIECE: HIGH-END NOTE-SYNC PIANO ROLL (1312 x 460 px)
  // Redesigned: NO HARSH GREEN LINES! Clean studio pitch lanes & melodyne capsules
  // -----------------------------------------------------------------------
  const pianoRollCard = figma.createFrame();
  pianoRollCard.name = "Studio Piano Roll Card";
  pianoRollCard.layoutMode = "VERTICAL";
  pianoRollCard.resize(1312, 460);
  pianoRollCard.paddingLeft = 20; pianoRollCard.paddingRight = 20; pianoRollCard.paddingTop = 14; pianoRollCard.paddingBottom = 14;
  pianoRollCard.itemSpacing = 10;
  pianoRollCard.cornerRadius = 14;
  pianoRollCard.clipsContent = false;
  applyCard1Glass(pianoRollCard);

  // Piano Roll Header Controls
  const prHead = figma.createFrame();
  prHead.layoutMode = "HORIZONTAL"; prHead.resize(1272, 28); prHead.primaryAxisAlignItems = "SPACE_BETWEEN"; prHead.counterAxisAlignItems = "CENTER"; prHead.fills = [];

  const prTitleGroup = figma.createFrame();
  prTitleGroup.layoutMode = "HORIZONTAL"; prTitleGroup.itemSpacing = 8; prTitleGroup.counterAxisAlignItems = "CENTER"; prTitleGroup.fills = [];
  prTitleGroup.primaryAxisSizingMode = "AUTO"; prTitleGroup.counterAxisSizingMode = "AUTO";
  prTitleGroup.appendChild(createText("NOTE-SYNC PIANO ROLL", 11, "Bold", C.mint));
  prTitleGroup.appendChild(createBadge("16 Bars • Synced Pitch Blobs", "neutral", 9));
  prHead.appendChild(prTitleGroup);

  // Audio Transport toolbar
  const audioBar = figma.createFrame();
  audioBar.layoutMode = "HORIZONTAL"; audioBar.itemSpacing = 8; audioBar.counterAxisAlignItems = "CENTER"; audioBar.fills = [];
  audioBar.primaryAxisSizingMode = "AUTO"; audioBar.counterAxisSizingMode = "AUTO";

  const btnLoop = figma.createFrame();
  btnLoop.name = "Button/Loop Playback";
  btnLoop.layoutMode = "HORIZONTAL";
  btnLoop.primaryAxisSizingMode = "AUTO";
  btnLoop.counterAxisSizingMode = "AUTO";
  btnLoop.itemSpacing = 6;
  btnLoop.counterAxisAlignItems = "CENTER";
  btnLoop.paddingLeft = 12; btnLoop.paddingRight = 12; btnLoop.paddingTop = 5; btnLoop.paddingBottom = 5;
  btnLoop.cornerRadius = 6;
  btnLoop.fills = solid(C.forestBase, 0.95);
  btnLoop.strokes = solid(C.mint, 0.7);
  btnLoop.strokeWeight = 1;
  btnLoop.appendChild(createSvgIcon("play", "#00F5A0", 11));
  btnLoop.appendChild(createText("Loop Region (00:14)", 11, "Bold", C.mint));
  audioBar.appendChild(btnLoop);

  audioBar.appendChild(createBadge("1.0X SPEED", "neutral", 9));
  audioBar.appendChild(createBadge("0c SHIFT", "neutral", 9));
  prHead.appendChild(audioBar);
  pianoRollCard.appendChild(prHead);

  // Piano Roll Canvas Area (1272 x 380 px)
  const prCanvas = figma.createFrame();
  prCanvas.name = "Piano Roll Canvas";
  prCanvas.resize(1272, 380);
  prCanvas.cornerRadius = 8;
  prCanvas.fills = solid({ r: 0.04, g: 0.05, b: 0.07 }, 1);
  prCanvas.strokes = solid({ r: 0.14, g: 0.18, b: 0.24 }, 1);
  prCanvas.strokeWeight = 1;
  prCanvas.clipsContent = true;

  // 12 Semitone Lanes (Height = 340 / 12 = 28.3px)
  const keyScale = ["C5", "B4", "A4", "G4", "F#4", "F4", "E4", "D4", "C4", "B3", "A3", "G3"];
  const keyH = 340 / keyScale.length;

  // Background Semitone Lanes: Subtle alternation, NO HARSH GREEN LINES!
  keyScale.forEach((noteName, idx) => {
    const isBlackKey = noteName.includes("#");
    const isTarget = noteName === "G4";

    // Subtle lane background
    const laneBg = figma.createFrame();
    laneBg.resize(1204, keyH); laneBg.x = 68; laneBg.y = idx * keyH;
    laneBg.fills = solid(
      isTarget ? { r: 0.00, g: 0.96, b: 0.63 } :
      (isBlackKey ? { r: 0.025, g: 0.032, b: 0.045 } : { r: 0.045, g: 0.055, b: 0.075 }),
      isTarget ? 0.04 : 1
    );
    laneBg.strokes = [];
    prCanvas.appendChild(laneBg);

    // Subtle muted grid line (faint zinc border, NO GREEN LINE!)
    const hLine = figma.createLine();
    hLine.resize(1204, 0); hLine.x = 68; hLine.y = (idx + 1) * keyH;
    hLine.strokes = solid({ r: 1, g: 1, b: 1 }, isTarget ? 0.08 : 0.035);
    hLine.strokeWeight = 1;
    if (isTarget) {
      hLine.dashPattern = [6, 6]; // Elegant dotted guideline for G4 target!
    }
    prCanvas.appendChild(hLine);
  });

  // Vertical Bar Lines (Bar 1.1 to Bar 4.4)
  for (let b = 0; b < 16; b++) {
    const vBar = figma.createLine();
    vBar.rotation = 90;
    vBar.resize(340, 0);
    vBar.x = 68 + (b * (1204 / 16));
    vBar.y = 0;
    vBar.strokes = solid({ r: 1, g: 1, b: 1 }, b % 4 === 0 ? 0.07 : 0.025);
    vBar.strokeWeight = 1;
    prCanvas.appendChild(vBar);
  }

  // DAW Loop Region Highlight at 00:12 - 00:16 (x = 230 to 350)
  const loopRegion = figma.createFrame();
  loopRegion.name = "DAW Loop Region Bracket";
  loopRegion.resize(120, 340);
  loopRegion.x = 235; loopRegion.y = 0;
  loopRegion.fills = solid(C.amber, 0.06);
  loopRegion.strokes = solid(C.amber, 0.35);
  loopRegion.strokeWeight = 1;
  loopRegion.dashPattern = [4, 4];
  prCanvas.appendChild(loopRegion);

  // Left Piano Keys Column (Width: 68px, Height: 340px)
  const pianoKeysCol = figma.createFrame();
  pianoKeysCol.resize(68, 340); pianoKeysCol.x = 0; pianoKeysCol.y = 0;
  pianoKeysCol.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  pianoKeysCol.strokes = solid(C.glassBorder, 0.3); pianoKeysCol.strokeWeight = 1;

  keyScale.forEach((noteName, idx) => {
    const isTarget = noteName === "G4";
    const isFlatAnomaly = noteName === "F#4";
    const isBlackKey = noteName.includes("#");

    const kFrame = figma.createFrame();
    kFrame.resize(68, keyH); kFrame.x = 0; kFrame.y = idx * keyH;
    kFrame.fills = solid(
      isBlackKey ? { r: 0.04, g: 0.05, b: 0.07 } : { r: 0.10, g: 0.12, b: 0.16 },
      1
    );

    const kDiv = figma.createLine();
    kDiv.resize(68, 0); kDiv.x = 0; kDiv.y = keyH;
    kDiv.strokes = solid(C.glassBorder, 0.15); kDiv.strokeWeight = 1;
    kFrame.appendChild(kDiv);

    const kText = createText(
      noteName, 9,
      isTarget ? "Bold" : (isBlackKey ? "Regular" : "Medium"),
      isTarget ? C.mint : (isFlatAnomaly ? C.amber : (isBlackKey ? C.textZinc500 : C.textZinc300))
    );
    kText.x = 10; kText.y = 4;
    kFrame.appendChild(kText);

    if (isTarget) {
      const dot = figma.createEllipse();
      dot.resize(4, 4); dot.x = 42; dot.y = 10;
      dot.fills = solid(C.mint, 1);
      kFrame.appendChild(dot);
    }

    pianoKeysCol.appendChild(kFrame);
  });
  prCanvas.appendChild(pianoKeysCol);

  // 16 High-End Melodyne Pitch Blobs
  const phraseData = [
    { lyric: "Ma-", note: "G4", y: 3 * keyH + 3, w: 56, x: 78, status: "mint", cents: "+2c" },
    { lyric: "ma,", note: "G4", y: 3 * keyH + 3, w: 58, x: 140, status: "mint", cents: "-1c" },
    { lyric: "just", note: "E4", y: 6 * keyH + 3, w: 52, x: 204, status: "mint", cents: "+4c" },
    { lyric: "killed", note: "F#4", y: 4 * keyH + 3, w: 68, x: 262, status: "amber", cents: "-18c", isTrigger: true },
    { lyric: "a", note: "G4", y: 3 * keyH + 3, w: 46, x: 338, status: "mint", cents: "0c" },
    { lyric: "man,", note: "B4", y: 1 * keyH + 3, w: 62, x: 390, status: "mint", cents: "+3c" },
    { lyric: "put", note: "C5", y: 0 * keyH + 3, w: 48, x: 458, status: "mint", cents: "-2c" },
    { lyric: "a", note: "B4", y: 1 * keyH + 3, w: 44, x: 512, status: "mint", cents: "0c" },
    { lyric: "gun", note: "A4", y: 2 * keyH + 3, w: 56, x: 562, status: "rose", cents: "+22c" },
    { lyric: "a-", note: "G4", y: 3 * keyH + 3, w: 48, x: 624, status: "mint", cents: "+1c" },
    { lyric: "gainst", note: "F#4", y: 4 * keyH + 3, w: 60, x: 678, status: "amber", cents: "-15c" },
    { lyric: "his", note: "E4", y: 6 * keyH + 3, w: 46, x: 744, status: "mint", cents: "0c" },
    { lyric: "head,", note: "D4", y: 7 * keyH + 3, w: 58, x: 796, status: "mint", cents: "0c" },
    { lyric: "pulled", note: "E4", y: 6 * keyH + 3, w: 54, x: 860, status: "mint", cents: "+2c" },
    { lyric: "my", note: "F#4", y: 4 * keyH + 3, w: 48, x: 920, status: "mint", cents: "+1c" },
    { lyric: "trig-ger", note: "G4", y: 3 * keyH + 3, w: 78, x: 974, status: "mint", cents: "0c" }
  ];

  phraseData.forEach(item => {
    const block = figma.createFrame();
    block.name = "Blob/" + item.note + "_" + item.lyric;
    block.resize(item.w, keyH - 6);
    block.x = item.x;
    block.y = item.y;
    block.cornerRadius = 6;
    block.layoutMode = "HORIZONTAL";
    block.primaryAxisAlignItems = "SPACE_BETWEEN";
    block.counterAxisAlignItems = "CENTER";
    block.paddingLeft = 6;
    block.paddingRight = 6;

    if (item.status === "mint") {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.02, g: 0.22, b: 0.15, a: 0.95 } },
          { position: 1.0, color: { r: 0.03, g: 0.14, b: 0.10, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.mint, 0.7);
      block.strokeWeight = 1.2;
    } else if (item.status === "amber") {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.28, g: 0.16, b: 0.02, a: 0.95 } },
          { position: 1.0, color: { r: 0.16, g: 0.09, b: 0.01, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.amber, 0.9);
      block.strokeWeight = 1.5;
    } else {
      block.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: [
          { position: 0.0, color: { r: 0.32, g: 0.08, b: 0.12, a: 0.95 } },
          { position: 1.0, color: { r: 0.18, g: 0.04, b: 0.06, a: 0.90 } }
        ]
      }];
      block.strokes = solid(C.rose, 0.9);
      block.strokeWeight = 1.5;
    }

    const lText = createText(item.lyric, 10, "Bold", C.textWhite);
    block.appendChild(lText);

    const cText = createText(item.cents, 8, "Bold", item.status === "mint" ? C.mint : (item.status === "amber" ? C.amber : C.rose));
    block.appendChild(cText);

    prCanvas.appendChild(block);
  });

  // Smooth pitch spline gliding through the blocks
  const pitchCurve = figma.createVector();
  pitchCurve.vectorPaths = [{
    windingRule: "NONZERO",
    data: "M 78 102 C 132 98 172 165 204 185 C 230 200 244 158 262 142 C 290 115 320 102 338 102 C 368 102 378 62 390 48 C 416 22 436 18 458 18 C 484 18 499 38 512 48 C 532 62 546 72 562 72 C 590 72 610 95 624 102 C 648 112 668 128 678 140 C 706 168 726 185 744 190 C 768 200 782 215 796 220 C 822 225 842 205 860 190 C 890 170 910 152 920 142 C 958 115 988 102 1018 102"
  }];
  pitchCurve.strokes = solid(C.mint, 0.85);
  pitchCurve.strokeWeight = 2;
  prCanvas.appendChild(pitchCurve);

  // SLEEK DAW NOTE-SYNC AUDIO CALLOUT (Anchored at 00:14)
  const noteSyncBox = figma.createFrame();
  noteSyncBox.name = "UC-13 Note-Sync Audio Scrub";
  noteSyncBox.layoutMode = "HORIZONTAL";
  noteSyncBox.primaryAxisSizingMode = "AUTO";
  noteSyncBox.counterAxisSizingMode = "AUTO";
  noteSyncBox.paddingLeft = 10; noteSyncBox.paddingRight = 12; noteSyncBox.paddingTop = 6; noteSyncBox.paddingBottom = 6;
  noteSyncBox.itemSpacing = 8;
  noteSyncBox.counterAxisAlignItems = "CENTER";
  noteSyncBox.cornerRadius = 8;
  noteSyncBox.fills = solid({ r: 0.10, g: 0.13, b: 0.18 }, 0.98);
  noteSyncBox.strokes = solid(C.amber, 0.85); noteSyncBox.strokeWeight = 1.2;
  noteSyncBox.x = 240; noteSyncBox.y = 175;
  noteSyncBox.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0.96, g: 0.62, b: 0.04, a: 0.22 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
    showShadowBehindNode: false
  }];

  const playSq = figma.createFrame();
  playSq.resize(22, 22); playSq.cornerRadius = 5; playSq.fills = solid(C.amber, 0.2);
  playSq.layoutMode = "HORIZONTAL"; playSq.primaryAxisAlignItems = "CENTER"; playSq.counterAxisAlignItems = "CENTER";
  playSq.appendChild(createSvgIcon("play", "#F59E0B", 10));
  noteSyncBox.appendChild(playSq);

  const nsCol = figma.createFrame();
  nsCol.layoutMode = "VERTICAL"; nsCol.itemSpacing = 1; nsCol.fills = [];
  nsCol.primaryAxisSizingMode = "AUTO"; nsCol.counterAxisSizingMode = "AUTO";
  nsCol.appendChild(createText("NOTE-SYNC AUDIO: -18c FLAT", 9, "Bold", C.amber));
  nsCol.appendChild(createText("00:14 (F#4) • Click to Loop Audio", 9, "Regular", C.textZinc300));
  noteSyncBox.appendChild(nsCol);

  // Micro waveform bars inside callout
  const miniWf = figma.createFrame();
  miniWf.layoutMode = "HORIZONTAL"; miniWf.itemSpacing = 2; miniWf.counterAxisAlignItems = "CENTER"; miniWf.fills = [];
  [6, 12, 18, 10, 16, 8].forEach(h => {
    const b = figma.createFrame(); b.resize(2, h); b.cornerRadius = 1; b.fills = solid(C.amber, 0.8);
    miniWf.appendChild(b);
  });
  noteSyncBox.appendChild(miniWf);

  prCanvas.appendChild(noteSyncBox);

  // Playhead vertical scrubber at 00:14
  const pScrub = figma.createLine();
  pScrub.rotation = 90; pScrub.resize(340, 0); pScrub.x = 296; pScrub.y = 0;
  pScrub.strokes = solid(C.amber, 0.95); pScrub.strokeWeight = 1.5;
  prCanvas.appendChild(pScrub);

  // Time ruler labels at bottom (340 to 380 px)
  const ruler = figma.createFrame();
  ruler.layoutMode = "HORIZONTAL"; ruler.resize(1204, 32); ruler.x = 68; ruler.y = 345;
  ruler.primaryAxisAlignItems = "SPACE_BETWEEN"; ruler.counterAxisAlignItems = "CENTER"; ruler.fills = [];
  for (const t of ["00:00 (Bar 1)", "00:04", "00:08", "00:12", "00:16 (Bar 2)", "00:20", "00:24", "00:28", "00:32 (Bar 3)", "00:36", "00:40", "00:44", "00:48 (Bar 4)"]) {
    ruler.appendChild(createText(t, 9, t.includes("00:12") ? "Bold" : "Regular", t.includes("00:12") ? C.amber : C.textZinc500));
  }
  prCanvas.appendChild(ruler);

  pianoRollCard.appendChild(prCanvas);
  container.appendChild(pianoRollCard);

  // -----------------------------------------------------------------------
  // 3. BOTTOM DIAGNOSTICS BENTO (3 BALANCED CARDS - 1312 x 380 px)
  // -----------------------------------------------------------------------
  const bentoRow = figma.createFrame();
  bentoRow.name = "Diagnostic Bento Row";
  bentoRow.layoutMode = "HORIZONTAL";
  bentoRow.resize(1312, 380);
  bentoRow.itemSpacing = 16;
  bentoRow.fills = [];
  bentoRow.clipsContent = false;

  // -----------------------------------------------------------------------
  // CARD 1: 5-PILLAR BIO-ACOUSTIC RADAR & FORMANT SPECTRUM (424 x 380 px)
  // -----------------------------------------------------------------------
  const radarCard = figma.createFrame();
  radarCard.name = "5-Pillar Vocal Radar Card";
  radarCard.layoutMode = "VERTICAL";
  radarCard.resize(424, 380);
  radarCard.paddingLeft = 18; radarCard.paddingRight = 18; radarCard.paddingTop = 16; radarCard.paddingBottom = 16;
  radarCard.itemSpacing = 10;
  radarCard.cornerRadius = 14;
  radarCard.clipsContent = false;
  applyCard2Glass(radarCard);

  const radHead = figma.createFrame();
  radHead.layoutMode = "HORIZONTAL"; radHead.resize(388, 22); radHead.primaryAxisAlignItems = "SPACE_BETWEEN"; radHead.counterAxisAlignItems = "CENTER"; radHead.fills = [];
  radHead.appendChild(createText("5-Pillar Bio-Acoustic Radar", 13, "Bold", C.textWhite));
  radHead.appendChild(createBadge("EQUILATERAL MATRIX", "mint", 9));
  radarCard.appendChild(radHead);

  // Pentagon Radar Visualizer Canvas (388 x 195 px)
  const radarCanvas = figma.createFrame();
  radarCanvas.name = "Floating Radar Matrix";
  radarCanvas.resize(388, 195);
  radarCanvas.fills = [];
  radarCanvas.strokes = [];
  radarCanvas.clipsContent = false;

  const cx = 194, cy = 98;
  [0.2, 0.4, 0.6, 0.8, 1.0].forEach(scale => {
    const ring = figma.createVector();
    ring.vectorPaths = [{
      windingRule: "NONZERO",
      data: `M ${cx} ${cy - 75 * scale} L ${cx + 72 * scale} ${cy - 23 * scale} L ${cx + 45 * scale} ${cy + 60 * scale} L ${cx - 45 * scale} ${cy + 60 * scale} L ${cx - 72 * scale} ${cy - 23 * scale} Z`
    }];
    ring.fills = [];
    ring.strokes = solid(scale === 1.0 ? C.mint : { r: 1, g: 1, b: 1 }, scale === 1.0 ? 0.20 : 0.07);
    ring.strokeWeight = 1;
    radarCanvas.appendChild(ring);
  });

  // 5 Radial spokes
  const spokeAngles = [-90, -18, 54, 126, 198];
  spokeAngles.forEach(deg => {
    const spoke = figma.createLine();
    spoke.resize(72, 0); spoke.x = cx; spoke.y = cy;
    spoke.rotation = deg;
    spoke.strokes = solid({ r: 1, g: 1, b: 1 }, 0.05); spoke.strokeWeight = 1;
    radarCanvas.appendChild(spoke);
  });

  // Active vocalist polygon (Intonation 96%, Vibrato 91%, Timbre 88%, Dynamics 92%, Breath 89%)
  const activePoly = figma.createVector();
  activePoly.vectorPaths = [{
    windingRule: "NONZERO",
    data: `M ${cx} ${cy - 71} L ${cx + 65} ${cy - 21} L ${cx + 39} ${cy + 52} L ${cx - 41} ${cy + 54} L ${cx - 64} ${cy - 21} Z`
  }];
  activePoly.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.0, g: 0.96, b: 0.628, a: 0.38 } },
      { position: 1.0, color: { r: 0.06, g: 0.72, b: 0.50, a: 0.10 } }
    ]
  }];
  activePoly.strokes = solid(C.mint, 1); activePoly.strokeWeight = 2;
  radarCanvas.appendChild(activePoly);

  // Glowing vertex marker dots
  const vertices = [
    { x: cx, y: cy - 71 },
    { x: cx + 65, y: cy - 21 },
    { x: cx + 39, y: cy + 52 },
    { x: cx - 41, y: cy + 54 },
    { x: cx - 64, y: cy - 21 }
  ];
  vertices.forEach(v => {
    const vd = figma.createEllipse();
    vd.resize(6, 6); vd.x = v.x - 3; vd.y = v.y - 3;
    vd.fills = solid(C.mint, 1);
    radarCanvas.appendChild(vd);
  });

  // Axis Labels with Scores: STRICT AUTO HUG, NO BULKY BOXES!
  function addRadarLabel(txt, score, x, y) {
    const lbl = figma.createFrame();
    lbl.layoutMode = "HORIZONTAL";
    lbl.primaryAxisSizingMode = "AUTO";
    lbl.counterAxisSizingMode = "AUTO";
    lbl.paddingLeft = 7; lbl.paddingRight = 7; lbl.paddingTop = 3; lbl.paddingBottom = 3;
    lbl.itemSpacing = 4;
    lbl.counterAxisAlignItems = "CENTER";
    lbl.cornerRadius = 6;
    lbl.fills = solid(C.glassElevated, 0.9);
    lbl.strokes = solid(C.glassBorder, 0.5);
    lbl.strokeWeight = 1;
    lbl.x = x; lbl.y = y;
    lbl.appendChild(createText(txt, 9, "Regular", C.textZinc300));
    lbl.appendChild(createText(score, 9, "Bold", C.mint));
    radarCanvas.appendChild(lbl);
  }

  addRadarLabel("Intonation", "96%", 150, 4);
  addRadarLabel("Vibrato", "91%", 276, 68);
  addRadarLabel("Timbre", "88%", 236, 160);
  addRadarLabel("Dynamics", "92%", 64, 160);
  addRadarLabel("Breath", "89%", 30, 68);

  radarCard.appendChild(radarCanvas);

  // Formant Resonance Spectrum Below Radar
  const formantBox = figma.createFrame();
  formantBox.layoutMode = "VERTICAL"; formantBox.resize(388, 64);
  formantBox.paddingLeft = 10; formantBox.paddingRight = 10; formantBox.paddingTop = 6; formantBox.paddingBottom = 6;
  formantBox.itemSpacing = 4;
  formantBox.cornerRadius = 8;
  formantBox.fills = solid(C.glassElevated, 0.7);
  formantBox.strokes = solid(C.glassBorder, 0.4); formantBox.strokeWeight = 1;

  const fHead = figma.createFrame();
  fHead.layoutMode = "HORIZONTAL"; fHead.resize(368, 14); fHead.primaryAxisAlignItems = "SPACE_BETWEEN"; fHead.counterAxisAlignItems = "CENTER"; fHead.fills = [];
  fHead.appendChild(createText("Formant Boost (F1–F4)", 10, "Bold", C.textWhite));
  fHead.appendChild(createText("+8.4 dB Singer's Ring", 10, "Bold", C.mint));
  formantBox.appendChild(fHead);

  function makeFormantBar(label, freq, pct, color) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(368, 14); row.counterAxisAlignItems = "CENTER"; row.fills = [];
    row.appendChild(createText(label + " (" + freq + ")", 9, "Regular", C.textZinc400));
    const track = figma.createFrame();
    track.resize(230, 4); track.cornerRadius = 2; track.fills = solid({ r: 0.15, g: 0.18, b: 0.22 }, 1);
    const fill = figma.createFrame();
    fill.resize(Math.round(230 * pct), 4); fill.cornerRadius = 2; fill.fills = solid(color, 1);
    track.appendChild(fill);
    row.appendChild(track);
    return row;
  }
  formantBox.appendChild(makeFormantBar("F1 Warmth", "520Hz", 0.92, C.cyan));
  formantBox.appendChild(makeFormantBar("F3 Ring", "2850Hz", 0.96, C.mint));
  radarCard.appendChild(formantBox);

  // Overall summary
  const radSummary = figma.createFrame();
  radSummary.layoutMode = "VERTICAL"; radSummary.resize(388, 44); radSummary.itemSpacing = 2; radSummary.fills = [];
  radSummary.appendChild(createText("Diagnostic Assessment: Virtuoso Grade", 10, "Bold", C.textWhite));
  radSummary.appendChild(createParagraph("Excellent intonation lock. Dynamic stability exceeds conservatory baseline (+8.4%).", 388, 10, "Regular", C.textZinc400, 15));
  radarCard.appendChild(radSummary);

  bentoRow.appendChild(radarCard);

  // -----------------------------------------------------------------------
  // CARD 2: DETECTED PITCH ANOMALIES & AUDIT SUITE (444 x 380 px)
  // -----------------------------------------------------------------------
  const errorCard = figma.createFrame();
  errorCard.name = "Pitch Anomaly Log Card";
  errorCard.layoutMode = "VERTICAL";
  errorCard.resize(444, 380);
  errorCard.paddingLeft = 18; errorCard.paddingRight = 18; errorCard.paddingTop = 16; errorCard.paddingBottom = 16;
  errorCard.itemSpacing = 8;
  errorCard.cornerRadius = 14;
  errorCard.clipsContent = false;
  applyCard2Glass(errorCard);

  const aHead = figma.createFrame();
  aHead.layoutMode = "HORIZONTAL"; aHead.resize(408, 22); aHead.primaryAxisAlignItems = "SPACE_BETWEEN"; aHead.counterAxisAlignItems = "CENTER"; aHead.fills = [];
  aHead.appendChild(createText("Detected Pitch Anomalies", 13, "Bold", C.textWhite));
  aHead.appendChild(createBadge("3 NOTES ISOLATED", "amber", 9));
  errorCard.appendChild(aHead);

  function makeAnomalyRow(timeStr, lyricStr, noteStr, centsStr, type) {
    const r = figma.createFrame();
    r.layoutMode = "HORIZONTAL"; r.resize(408, 42);
    r.paddingLeft = 10; r.paddingRight = 10;
    r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER";
    r.cornerRadius = 8; r.fills = solid(C.glassElevated, 0.7);
    r.strokes = solid(C.glassBorder, 0.4); r.strokeWeight = 1;

    const leftPart = figma.createFrame();
    leftPart.layoutMode = "HORIZONTAL"; leftPart.itemSpacing = 8; leftPart.counterAxisAlignItems = "CENTER"; leftPart.fills = [];
    leftPart.appendChild(createText(timeStr, 10, "Medium", C.textZinc400));
    leftPart.appendChild(createBadge(lyricStr, "neutral", 9));
    leftPart.appendChild(createText(noteStr, 11, "Bold", C.textWhite));
    leftPart.appendChild(createText(centsStr, 10, "Bold", type === "amber" ? C.amber : C.rose));
    r.appendChild(leftPart);

    const btnRep = createActionButton("Replay", "play", "secondary");
    btnRep.name = "Anomaly/Replay " + timeStr;
    r.appendChild(btnRep);
    return r;
  }

  errorCard.appendChild(makeAnomalyRow("00:14", "killed", "F#4", "-18c Flat", "amber"));
  errorCard.appendChild(makeAnomalyRow("00:26", "gun", "A4", "+22c Sharp", "rose"));
  errorCard.appendChild(makeAnomalyRow("00:33", "gainst", "F#4", "-15c Flat", "amber"));

  // Pedagogical Prescription Box
  const prescBox = figma.createFrame();
  prescBox.layoutMode = "VERTICAL"; prescBox.resize(408, 86);
  prescBox.paddingLeft = 12; prescBox.paddingRight = 12; prescBox.paddingTop = 8; prescBox.paddingBottom = 8;
  prescBox.itemSpacing = 4;
  prescBox.cornerRadius = 8;
  prescBox.fills = solid(C.glassElevated, 0.85);
  prescBox.strokes = solid(C.amber, 0.4); prescBox.strokeWeight = 1;

  const pTitle = figma.createFrame();
  pTitle.layoutMode = "HORIZONTAL"; pTitle.itemSpacing = 6; pTitle.counterAxisAlignItems = "CENTER"; pTitle.fills = [];
  pTitle.appendChild(createSvgIcon("sparkle", "#F59E0B", 13));
  pTitle.appendChild(createText("Passaggio Break Diagnosis at F#4", 10, "Bold", C.amber));
  prescBox.appendChild(pTitle);

  prescBox.appendChild(createParagraph(
    "Vocal fold adduction relaxes early during breath recovery. Recommended routine: 5-minute semi-occluded vocal tract (SOVT) straw phonation on vowel /u/.",
    384, 10, "Regular", C.textZinc300, 15
  ));
  errorCard.appendChild(prescBox);

  const btnLoopAll = createActionButton("Loop All Anomalies (00:45) ↗", "refresh", "radiant", 408);
  btnLoopAll.name = "Report/Loop All Anomalies";
  errorCard.appendChild(btnLoopAll);

  bentoRow.appendChild(errorCard);

  // -----------------------------------------------------------------------
  // CARD 3: CONSERVATORY CERTIFICATE & BIOMETRIC HASH (420 x 380 px)
  // -----------------------------------------------------------------------
  const certCard = figma.createFrame();
  certCard.name = "Conservatory Certificate Card";
  certCard.layoutMode = "VERTICAL";
  certCard.resize(420, 380);
  certCard.paddingLeft = 18; certCard.paddingRight = 18; certCard.paddingTop = 16; certCard.paddingBottom = 16;
  certCard.itemSpacing = 10;
  certCard.cornerRadius = 14;
  certCard.clipsContent = false;
  applyCard2Glass(certCard);

  const ctHead = figma.createFrame();
  ctHead.layoutMode = "HORIZONTAL"; ctHead.resize(384, 22); ctHead.primaryAxisAlignItems = "SPACE_BETWEEN"; ctHead.counterAxisAlignItems = "CENTER"; ctHead.fills = [];
  ctHead.appendChild(createText("Conservatory Diagnostic Sheet", 13, "Bold", C.textWhite));
  ctHead.appendChild(createBadge("VERIFIED AUDIT", "mint", 9));
  certCard.appendChild(ctHead);

  // Luxury Certificate Plate
  const certPlate = figma.createFrame();
  certPlate.layoutMode = "VERTICAL"; certPlate.resize(384, 230);
  certPlate.paddingLeft = 14; certPlate.paddingRight = 14; certPlate.paddingTop = 12; certPlate.paddingBottom = 12;
  certPlate.itemSpacing = 8;
  certPlate.cornerRadius = 10;
  certPlate.fills = solid({ r: 0.03, g: 0.10, b: 0.07 }, 0.95);
  certPlate.strokes = solid(C.mint, 0.45); certPlate.strokeWeight = 1.2;

  const cpTop = figma.createFrame();
  cpTop.layoutMode = "HORIZONTAL"; cpTop.resize(356, 18); cpTop.primaryAxisAlignItems = "SPACE_BETWEEN"; cpTop.counterAxisAlignItems = "CENTER"; cpTop.fills = [];
  cpTop.appendChild(createText("INTERNATIONAL CONSERVATORY STANDARD", 8, "Bold", C.mint));
  cpTop.appendChild(createText("GRADE: A+", 9, "Bold", C.textWhite));
  certPlate.appendChild(cpTop);

  certPlate.appendChild(createText("Vocal Performance Audit Certificate", 14, "Bold", C.textWhite));

  function makeCertItem(lbl, val) {
    const ci = figma.createFrame();
    ci.layoutMode = "HORIZONTAL"; ci.resize(356, 16); ci.primaryAxisAlignItems = "SPACE_BETWEEN"; ci.counterAxisAlignItems = "CENTER"; ci.fills = [];
    ci.appendChild(createText(lbl, 9, "Regular", C.textZinc400));
    ci.appendChild(createText(val, 9, "Bold", C.textWhite));
    return ci;
  }

  certPlate.appendChild(makeCertItem("Vocalist Identity:", "Ethan Reynolds • Tenor Lyrique"));
  certPlate.appendChild(makeCertItem("Acoustic Vocal Span:", "C2 (65.4Hz) — A4 (440.0Hz) • 2.8 Octaves"));
  certPlate.appendChild(makeCertItem("Intonation Lock Accuracy:", "94.2% Peak (Bohemian Rhapsody)"));
  certPlate.appendChild(makeCertItem("Audio Master Quality:", "48kHz / 24-bit PCM • Zero-Latency DSP"));

  const hashBox = figma.createFrame();
  hashBox.layoutMode = "HORIZONTAL"; hashBox.resize(356, 22);
  hashBox.paddingLeft = 8; hashBox.paddingRight = 8;
  hashBox.primaryAxisAlignItems = "SPACE_BETWEEN"; hashBox.counterAxisAlignItems = "CENTER";
  hashBox.cornerRadius = 4; hashBox.fills = solid({ r: 0.02, g: 0.06, b: 0.04 }, 1);
  hashBox.strokes = solid(C.mint, 0.3); hashBox.strokeWeight = 1;
  hashBox.appendChild(createText("HASH: #VS-8829-48K-TENOR-20261015", 8, "Bold", C.mint));
  hashBox.appendChild(createBadge("AUDIT LOCKED", "neutral", 7));
  certPlate.appendChild(hashBox);

  certCard.appendChild(certPlate);

  const btnCert = createActionButton("Download Certified PDF Sheet ↗", "arrow-up-right", "radiant", 384);
  btnCert.name = "Report/Download Certified PDF";
  certCard.appendChild(btnCert);

  bentoRow.appendChild(certCard);
  container.appendChild(bentoRow);

  return root;
}

    function buildTrainingScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 04. Gamified Vocalist Training Center";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

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
  logoSquircle.cornerRadius = 12;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (Bar-Chart active in emerald squircle for Screen 04!)
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
  const btnNavChart = createIconButton("bar-chart", "#00F5A0", 42, 18, true); // Active for Training Center!
  btnNavChart.name = "Nav/Analytics";
  const btnNavDoc = createIconButton("document", "#8B9DAF", 42, 18, false);
  btnNavDoc.name = "Nav/Documents";

  navGroup.appendChild(btnNavHome);
  navGroup.appendChild(btnNavWave);
  navGroup.appendChild(btnNavChart);
  navGroup.appendChild(btnNavDoc);
  sidebar.appendChild(navGroup);

  // Bottom: Settings + ER Profile avatar
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
  avatarFrame.resize(36, 36);
  avatarFrame.cornerRadius = 18;
  avatarFrame.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  avatarFrame.strokes = solid(C.glassBorder, 1);
  avatarFrame.strokeWeight = 1.5;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 11, "Bold", C.textWhite));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN WORKSPACE CONTAINER (1368 x 960) AT x=72
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Training Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 14;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP OVERVIEW TOOLBAR (1312 x 46 px)
  // -----------------------------------------------------------------------
  const subBar = figma.createFrame();
  subBar.name = "Masterclass Overview Bar";
  subBar.layoutMode = "HORIZONTAL";
  subBar.resize(1312, 46);
  subBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  subBar.counterAxisAlignItems = "CENTER";
  subBar.fills = [];

  const sbLeft = figma.createFrame();
  sbLeft.layoutMode = "VERTICAL";
  sbLeft.primaryAxisSizingMode = "AUTO";
  sbLeft.counterAxisSizingMode = "AUTO";
  sbLeft.itemSpacing = 1;
  sbLeft.fills = [];

  const sbTitleRow = figma.createFrame();
  sbTitleRow.layoutMode = "HORIZONTAL";
  sbTitleRow.primaryAxisSizingMode = "AUTO";
  sbTitleRow.counterAxisSizingMode = "AUTO";
  sbTitleRow.itemSpacing = 8;
  sbTitleRow.counterAxisAlignItems = "CENTER";
  sbTitleRow.fills = [];
  sbTitleRow.appendChild(createText("Conservatory Vocal Pedagogy & Agility Center", 15, "Bold", C.textWhite));
  sbTitleRow.appendChild(createBadge("BEL CANTO DSP", "mint", 8));
  sbTitleRow.appendChild(createBadge("WEEK 2 OF 4", "neutral", 8));
  sbLeft.appendChild(sbTitleRow);
  sbLeft.appendChild(createText("Bel Canto Acoustic Calibration • Passaggio Bridge Mastery • Real-time YIN Pitch Accuracy", 11, "Medium", C.textZinc400));
  subBar.appendChild(sbLeft);

  const sbRight = figma.createFrame();
  sbRight.layoutMode = "HORIZONTAL";
  sbRight.primaryAxisSizingMode = "AUTO";
  sbRight.counterAxisSizingMode = "AUTO";
  sbRight.itemSpacing = 10;
  sbRight.counterAxisAlignItems = "CENTER";
  sbRight.fills = [];

  // Streak Badge
  const bStreak = figma.createFrame();
  bStreak.name = "Streak Badge";
  bStreak.layoutMode = "HORIZONTAL";
  bStreak.primaryAxisSizingMode = "AUTO";
  bStreak.counterAxisSizingMode = "AUTO";
  bStreak.itemSpacing = 6;
  bStreak.counterAxisAlignItems = "CENTER";
  bStreak.paddingLeft = 10; bStreak.paddingRight = 10; bStreak.paddingTop = 5; bStreak.paddingBottom = 5;
  bStreak.cornerRadius = 6;
  bStreak.fills = solid({ r: 0.18, g: 0.10, b: 0.02 }, 0.95);
  bStreak.strokes = solid(C.amber, 0.6); bStreak.strokeWeight = 1;
  bStreak.appendChild(createSvgIcon("sparkle", "#F59E0B", 13));
  bStreak.appendChild(createText("14-DAY STREAK (80%)", 10, "Bold", C.amber));
  sbRight.appendChild(bStreak);

  // Level XP
  const bLvl = figma.createFrame();
  bLvl.layoutMode = "HORIZONTAL";
  bLvl.primaryAxisSizingMode = "AUTO";
  bLvl.counterAxisSizingMode = "AUTO";
  bLvl.itemSpacing = 6;
  bLvl.counterAxisAlignItems = "CENTER";
  bLvl.paddingLeft = 10; bLvl.paddingRight = 10; bLvl.paddingTop = 5; bLvl.paddingBottom = 5;
  bLvl.cornerRadius = 6;
  bLvl.fills = solid(C.glassElevated, 1);
  bLvl.strokes = solid(C.glassBorder, 0.8);
  bLvl.strokeWeight = 1;
  bLvl.appendChild(createText("Level 8 (2,450 XP)", 10, "Bold", C.textZinc300));
  sbRight.appendChild(bLvl);

  const btnLesson = createActionButton("Launch Live Drill Session ↗", "arrow-up-right", "radiant");
  btnLesson.name = "Training/Launch Lesson";
  sbRight.appendChild(btnLesson);

  subBar.appendChild(sbRight);
  container.appendChild(subBar);

  // -----------------------------------------------------------------------
  // 2. BENTO ROW 1: ACOUSTIC VOCAL REGISTER MAP + BEL CANTO MATRIX (1312 x 400 px)
  // -----------------------------------------------------------------------
  const row1 = figma.createFrame();
  row1.name = "Row 1: Range & Bio-Acoustics";
  row1.layoutMode = "HORIZONTAL";
  row1.resize(1312, 400);
  row1.itemSpacing = 16;
  row1.fills = [];
  row1.clipsContent = false;

  // CARD 1: ACOUSTIC VOCAL REGISTER KEYBOARD (680 x 400 px)
  const rangeCard = figma.createFrame();
  rangeCard.name = "Acoustic Vocal Register Map Card";
  rangeCard.layoutMode = "VERTICAL";
  rangeCard.resize(680, 400);
  rangeCard.paddingLeft = 20; rangeCard.paddingRight = 20; rangeCard.paddingTop = 16; rangeCard.paddingBottom = 16;
  rangeCard.itemSpacing = 10;
  rangeCard.cornerRadius = 14;
  rangeCard.clipsContent = false;
  applyCard1Glass(rangeCard);

  const rgHead = figma.createFrame();
  rgHead.layoutMode = "HORIZONTAL"; rgHead.resize(640, 22); rgHead.primaryAxisAlignItems = "SPACE_BETWEEN"; rgHead.counterAxisAlignItems = "CENTER"; rgHead.fills = [];
  rgHead.appendChild(createText("Acoustic Vocal Register Keyboard & Resonance Map", 13, "Bold", C.textWhite));
  rgHead.appendChild(createBadge("3.5-OCTAVE SPAN (C2–F5)", "mint", 9));
  rangeCard.appendChild(rgHead);

  // Authentic Ebony & Ivory Piano Keyboard (640 x 86 px)
  const kbBox = figma.createFrame();
  kbBox.resize(640, 86);
  kbBox.cornerRadius = 8;
  kbBox.fills = solid({ r: 0.04, g: 0.06, b: 0.08 }, 1);
  kbBox.strokes = solid({ r: 0.18, g: 0.22, b: 0.28 }, 1); kbBox.strokeWeight = 1;
  kbBox.clipsContent = true;

  // 24 Ivory Keys (Width 26.5px)
  const whiteKeyW = 26.5;
  for (let i = 0; i < 24; i++) {
    const wk = figma.createFrame();
    wk.resize(whiteKeyW - 2, 84); wk.x = 2 + (i * whiteKeyW); wk.y = 1;
    const inTestedRange = i >= 4 && i <= 17;
    const isPassaggioZone = i >= 11 && i <= 15;
    wk.fills = solid(
      isPassaggioZone ? { r: 0.03, g: 0.20, b: 0.14 } :
      (inTestedRange ? { r: 0.08, g: 0.14, b: 0.20 } : { r: 0.14, g: 0.17, b: 0.22 }),
      1
    );
    wk.strokes = solid(isPassaggioZone ? C.mint : (inTestedRange ? C.cyan : C.glassBorder), isPassaggioZone ? 0.7 : 0.2);
    wk.strokeWeight = 1;
    kbBox.appendChild(wk);
  }

  // 17 Ebony Black Keys
  const blackKeyIndices = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19, 21, 22];
  blackKeyIndices.forEach(idx => {
    const bk = figma.createFrame();
    bk.resize(15, 52); bk.x = 2 + (idx * whiteKeyW) + 18; bk.y = 1;
    bk.cornerRadius = 2;
    const inPassaggio = idx >= 11 && idx <= 15;
    bk.fills = solid(inPassaggio ? { r: 0.02, g: 0.12, b: 0.08 } : { r: 0.03, g: 0.04, b: 0.05 }, 1);
    bk.strokes = solid(inPassaggio ? C.mint : { r: 0.25, g: 0.30, b: 0.38 }, inPassaggio ? 0.6 : 0.4);
    bk.strokeWeight = 1;
    kbBox.appendChild(bk);
  });

  // Glowing Passaggio Marker at G4
  const g4Marker = figma.createFrame();
  g4Marker.resize(22, 16); g4Marker.x = 2 + (14 * whiteKeyW) + 2; g4Marker.y = 66;
  g4Marker.cornerRadius = 4;
  g4Marker.fills = solid(C.forestBase, 1);
  g4Marker.strokes = solid(C.mint, 1); g4Marker.strokeWeight = 1.2;
  g4Marker.layoutMode = "HORIZONTAL"; g4Marker.primaryAxisAlignItems = "CENTER"; g4Marker.counterAxisAlignItems = "CENTER";
  g4Marker.appendChild(createText("G4", 8, "Bold", C.mint));
  kbBox.appendChild(g4Marker);

  rangeCard.appendChild(kbBox);

  // 4 Color-Coded Register Span Badges
  const regBar = figma.createFrame();
  regBar.layoutMode = "HORIZONTAL"; regBar.resize(640, 24);
  regBar.primaryAxisAlignItems = "SPACE_BETWEEN"; regBar.counterAxisAlignItems = "CENTER"; regBar.fills = [];

  function makeRegPill(name, span, color, isActive = false) {
    const rp = figma.createFrame();
    rp.layoutMode = "HORIZONTAL"; rp.itemSpacing = 4; rp.counterAxisAlignItems = "CENTER";
    rp.paddingLeft = 7; rp.paddingRight = 7; rp.paddingTop = 2; rp.paddingBottom = 2;
    rp.cornerRadius = 5;
    rp.fills = solid(isActive ? C.forestBase : C.glassElevated, isActive ? 0.95 : 0.6);
    rp.strokes = solid(color, isActive ? 0.7 : 0.25); rp.strokeWeight = 1;
    rp.appendChild(createText(name, 9, "Bold", color));
    rp.appendChild(createText(span, 9, "Regular", C.textZinc300));
    return rp;
  }

  regBar.appendChild(makeRegPill("Chest Voice:", "C2–D4 (65–293Hz)", C.cyan));
  regBar.appendChild(makeRegPill("Passaggio Bridge:", "D4–G4 (293–392Hz)", C.mint, true));
  regBar.appendChild(makeRegPill("Head Voice:", "G4–C5 (392–523Hz)", C.amber));
  regBar.appendChild(makeRegPill("Whistle/Upper:", "C5–F5 (523–698Hz)", { r: 0.70, g: 0.50, b: 0.95 }));
  rangeCard.appendChild(regBar);

  // Tested Range Metrics
  function makeRangeMetric(label, range, gain, color) {
    const rm = figma.createFrame();
    rm.layoutMode = "HORIZONTAL"; rm.resize(640, 26);
    rm.primaryAxisAlignItems = "SPACE_BETWEEN"; rm.counterAxisAlignItems = "CENTER"; rm.fills = [];
    rm.appendChild(createText(label, 11, "Medium", C.textZinc300));
    const rVal = figma.createFrame();
    rVal.layoutMode = "HORIZONTAL"; rVal.itemSpacing = 8; rVal.counterAxisAlignItems = "CENTER"; rVal.fills = [];
    rVal.appendChild(createText(range, 12, "Bold", C.textWhite));
    rVal.appendChild(createBadge(gain, color, 8));
    rm.appendChild(rVal);
    return rm;
  }

  rangeCard.appendChild(makeRangeMetric("Initial Diagnostic Baseline (Sep 14):", "C2 — E4 (2.2 Octaves)", "Baseline", "neutral"));
  rangeCard.appendChild(makeRangeMetric("Current Tested Singing Range (Today):", "C2 — A4 (2.8 Octaves)", "+5 Semitones Gained", "mint"));
  rangeCard.appendChild(makeRangeMetric("Gemini Projected Full Span Target:", "C2 — C5 (3.0 Octaves)", "High C Goal", "amber"));

  // Passaggio Acoustic Transition Box
  const passBox = figma.createFrame();
  passBox.layoutMode = "HORIZONTAL"; passBox.resize(640, 42);
  passBox.primaryAxisAlignItems = "SPACE_BETWEEN"; passBox.counterAxisAlignItems = "CENTER";
  passBox.paddingLeft = 12; passBox.paddingRight = 12;
  passBox.cornerRadius = 8; passBox.fills = solid(C.glassElevated, 1);
  passBox.strokes = solid(C.glassBorder, 0.8); passBox.strokeWeight = 1;
  passBox.appendChild(createText("Primo Passaggio: D4 (293Hz) • Cricothyroid Tilt Locked", 11, "Bold", C.cyan));
  passBox.appendChild(createText("Secondo Passaggio: G4 (392Hz) • F1/F2 Formant Coupling Active", 11, "Bold", C.amber));
  rangeCard.appendChild(passBox);

  row1.appendChild(rangeCard);

  // CARD 2: BEL CANTO BIO-ACOUSTIC AGILITY MATRIX (616 x 400 px)
  const matrixCard = figma.createFrame();
  matrixCard.name = "Bel Canto Bio-Acoustic Matrix Card";
  matrixCard.layoutMode = "VERTICAL";
  matrixCard.resize(616, 400);
  matrixCard.paddingLeft = 20; matrixCard.paddingRight = 20; matrixCard.paddingTop = 16; matrixCard.paddingBottom = 16;
  matrixCard.itemSpacing = 10;
  matrixCard.cornerRadius = 14;
  matrixCard.clipsContent = false;
  applyCard2Glass(matrixCard);

  const mxHead = figma.createFrame();
  mxHead.layoutMode = "HORIZONTAL"; mxHead.resize(576, 22); mxHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mxHead.counterAxisAlignItems = "CENTER"; mxHead.fills = [];
  mxHead.appendChild(createText("Bel Canto Bio-Acoustic Agility Matrix", 13, "Bold", C.textWhite));
  mxHead.appendChild(createBadge("STUDIO LAB DSP", "mint", 9));
  matrixCard.appendChild(mxHead);

  matrixCard.appendChild(createText("Laboratory-grade vocal tract stability & phonation measurements:", 10, "Medium", C.textZinc400));

  function makeLabMeter(title, value, norm, rating, pct, color) {
    const mb = figma.createFrame();
    mb.layoutMode = "VERTICAL"; mb.resize(576, 48); mb.itemSpacing = 4;
    mb.paddingLeft = 10; mb.paddingRight = 10; mb.paddingTop = 6; mb.paddingBottom = 6;
    mb.cornerRadius = 8;
    mb.fills = solid(C.glassElevated, 0.7);
    mb.strokes = solid(C.glassBorder, 0.35); mb.strokeWeight = 1;

    const top = figma.createFrame();
    top.layoutMode = "HORIZONTAL"; top.resize(556, 15); top.primaryAxisAlignItems = "SPACE_BETWEEN"; top.counterAxisAlignItems = "CENTER"; top.fills = [];
    const tL = figma.createFrame(); tL.layoutMode = "HORIZONTAL"; tL.itemSpacing = 8; tL.counterAxisAlignItems = "CENTER"; tL.fills = [];
    tL.appendChild(createText(title, 11, "Bold", C.textWhite));
    tL.appendChild(createText(norm, 9, "Regular", C.textZinc500));
    top.appendChild(tL);

    const tR = figma.createFrame(); tR.layoutMode = "HORIZONTAL"; tR.itemSpacing = 8; tR.counterAxisAlignItems = "CENTER"; tR.fills = [];
    tR.appendChild(createText(value, 11, "Bold", color));
    tR.appendChild(createBadge(rating, color === C.mint ? "mint" : (color === C.amber ? "amber" : "neutral"), 8));
    top.appendChild(tR);
    mb.appendChild(top);

    const track = figma.createFrame();
    track.resize(556, 4); track.cornerRadius = 2; track.fills = solid({ r: 0.12, g: 0.15, b: 0.20 }, 1);
    const fill = figma.createFrame();
    fill.resize(Math.round(556 * pct), 4); fill.cornerRadius = 2; fill.fills = solid(color, 1);
    track.appendChild(fill);
    mb.appendChild(track);

    return mb;
  }

  matrixCard.appendChild(makeLabMeter("Pitch Jitter (Perturbation)", "0.18%", "Norm < 0.50%", "Virtuoso Stability", 0.92, C.mint));
  matrixCard.appendChild(makeLabMeter("Amplitude Shimmer (Intensity Fluctuation)", "1.42%", "Norm < 3.0%", "Smooth Breath Flow", 0.88, C.cyan));
  matrixCard.appendChild(makeLabMeter("Singer's Formant Ring (F3/F4 2.8k–3.2k)", "+9.2 dB", "Chiaroscuro Acoustic Peak", "Resonant Projection", 0.94, C.mint));
  matrixCard.appendChild(makeLabMeter("Vocal Fold Closed Phase Quotient (CQ)", "48%", "Optimal: 45–55%", "Zero Strain", 0.85, C.amber));

  // Vocal Stamina Monitor Bar
  const stamBox = figma.createFrame();
  stamBox.layoutMode = "HORIZONTAL"; stamBox.resize(576, 36);
  stamBox.primaryAxisAlignItems = "SPACE_BETWEEN"; stamBox.counterAxisAlignItems = "CENTER";
  stamBox.paddingLeft = 12; stamBox.paddingRight = 12;
  stamBox.cornerRadius = 8;
  stamBox.fills = solid(C.forestBase, 0.7);
  stamBox.strokes = solid(C.mint, 0.35); stamBox.strokeWeight = 1;
  stamBox.appendChild(createText("Vocal Stamina Remaining: 92% (Safe Window: 42 mins today)", 10, "Bold", C.mint));
  
  const btnCalib = createActionButton("Acoustic Recalibration ↗", "refresh", "radiant");
  btnCalib.name = "Training/Recalibration";
  stamBox.appendChild(btnCalib);
  matrixCard.appendChild(stamBox);

  row1.appendChild(matrixCard);
  container.appendChild(row1);

  // -----------------------------------------------------------------------
  // 3. BENTO ROW 2: ADAPTIVE AI CURRICULUM + SOLFEGGIO STUDIO (1312 x 430 px)
  // -----------------------------------------------------------------------
  const row2 = figma.createFrame();
  row2.name = "Row 2: Curriculum & Guided Drills";
  row2.layoutMode = "HORIZONTAL";
  row2.resize(1312, 430);
  row2.itemSpacing = 16;
  row2.fills = [];
  row2.clipsContent = false;

  // CARD 3: GEMINI AI MULTI-TRACK CURRICULUM (648 x 430 px)
  const planCard = figma.createFrame();
  planCard.name = "Gemini AI Vocal Curriculum Card";
  planCard.layoutMode = "VERTICAL";
  planCard.resize(648, 430);
  planCard.paddingLeft = 20; planCard.paddingRight = 20; planCard.paddingTop = 16; planCard.paddingBottom = 16;
  planCard.itemSpacing = 8;
  planCard.cornerRadius = 14;
  planCard.clipsContent = false;
  applyCard1Glass(planCard);

  const plHead = figma.createFrame();
  plHead.layoutMode = "HORIZONTAL"; plHead.resize(608, 22); plHead.primaryAxisAlignItems = "SPACE_BETWEEN"; plHead.counterAxisAlignItems = "CENTER"; plHead.fills = [];
  const plTitle = figma.createFrame();
  plTitle.layoutMode = "HORIZONTAL"; plTitle.itemSpacing = 6; plTitle.counterAxisAlignItems = "CENTER"; plTitle.fills = [];
  plTitle.appendChild(createSvgIcon("sparkle", "#00F5A0", 15));
  plTitle.appendChild(createText("Gemini AI Adaptive Masterclass Curriculum", 13, "Bold", C.mint));
  plHead.appendChild(plTitle);
  plHead.appendChild(createBadge("WEEK 2 OF 4", "neutral", 9));
  planCard.appendChild(plHead);

  planCard.appendChild(createText("Focus: Conquering the F#4 to G4 Passaggio Transition", 14, "Bold", C.textWhite));
  planCard.appendChild(createParagraph("Generated adaptively from your last 12 diagnostic takes. Target vowel articulators with BPM metronome.", 608, 10, "Regular", C.textZinc300, 15));

  function makePlanItem(day, title, duration, vowel, status) {
    const item = figma.createFrame();
    item.layoutMode = "HORIZONTAL"; item.resize(608, 44);
    item.primaryAxisAlignItems = "SPACE_BETWEEN"; item.counterAxisAlignItems = "CENTER";
    item.paddingLeft = 12; item.paddingRight = 12;
    item.cornerRadius = 8;
    const isActive = status === "active";
    const isDone = status === "done";
    item.fills = solid(isActive ? C.forestBase : C.glassElevated, isActive ? 0.9 : 0.7);
    item.strokes = solid(isActive ? C.mint : (isDone ? C.emerald : C.glassBorder), isActive ? 0.7 : 0.3);
    item.strokeWeight = 1;

    const leftGroup = figma.createFrame();
    leftGroup.layoutMode = "HORIZONTAL"; leftGroup.itemSpacing = 8; leftGroup.counterAxisAlignItems = "CENTER"; leftGroup.fills = [];
    leftGroup.appendChild(createBadge(day, isActive ? "mint" : (isDone ? "emerald" : "neutral"), 8));
    leftGroup.appendChild(createText(title, 11, "Bold", isDone ? C.textZinc400 : C.textWhite));
    leftGroup.appendChild(createBadge(vowel, "neutral", 8));
    leftGroup.appendChild(createText("• " + duration, 10, "Medium", C.textZinc500));
    item.appendChild(leftGroup);

    if (isDone) {
      item.appendChild(createBadge("COMPLETED", "emerald", 8));
    } else if (isActive) {
      const btnStart = createActionButton("Start Drill ↗", null, "radiant");
      btnStart.name = "Curriculum/Start Now";
      item.appendChild(btnStart);
    } else {
      item.appendChild(createBadge("UPCOMING", "neutral", 8));
    }
    return item;
  }

  planCard.appendChild(makePlanItem("DAY 1", "SOVT Straw Phonation & Lip Trills", "8 mins", "/u/ Vowel", "done"));
  planCard.appendChild(makePlanItem("DAY 2", "5-Tone Ascending Scale Stability", "10 mins", "/o/ Vowel", "done"));
  planCard.appendChild(makePlanItem("DAY 3", "Arpeggio Mix-Voice Transition (F#4 Bridge)", "12 mins", "/i/ Vowel", "active"));
  planCard.appendChild(makePlanItem("DAY 4", "Vibrato & Chiaroscuro Ring Sustains", "15 mins", "/a/ Vowel", "pending"));

  const planFoot = figma.createFrame();
  planFoot.layoutMode = "HORIZONTAL"; planFoot.resize(608, 34);
  planFoot.primaryAxisAlignItems = "SPACE_BETWEEN"; planFoot.counterAxisAlignItems = "CENTER";
  planFoot.paddingLeft = 12; planFoot.paddingRight = 12;
  planFoot.cornerRadius = 6; planFoot.fills = solid(C.glassElevated, 0.8);
  planFoot.strokes = solid(C.glassBorder, 0.4); planFoot.strokeWeight = 1;
  planFoot.appendChild(createText("Tempo: 120 BPM • Meter: 4/4 • Acoustic Guide Tone: G4 (392Hz)", 10, "Medium", C.textZinc400));
  planFoot.appendChild(createBadge("AI PEDAGOGY SYNCED", "mint", 8));
  planCard.appendChild(planFoot);

  row2.appendChild(planCard);

  // CARD 4: INTERACTIVE GUIDED SOLFEGGIO STUDIO (648 x 430 px)
  const scaleCard = figma.createFrame();
  scaleCard.name = "Guided Scales Solfeggio Card";
  scaleCard.layoutMode = "VERTICAL";
  scaleCard.resize(648, 430);
  scaleCard.paddingLeft = 20; scaleCard.paddingRight = 20; scaleCard.paddingTop = 16; scaleCard.paddingBottom = 16;
  scaleCard.itemSpacing = 8;
  scaleCard.cornerRadius = 14;
  scaleCard.clipsContent = false;
  applyCard2Glass(scaleCard);

  const scHead = figma.createFrame();
  scHead.layoutMode = "HORIZONTAL"; scHead.resize(608, 22); scHead.primaryAxisAlignItems = "SPACE_BETWEEN"; scHead.counterAxisAlignItems = "CENTER"; scHead.fills = [];
  scHead.appendChild(createText("Guided Solfeggio & Microtonal Agility Studio", 13, "Bold", C.textWhite));
  scHead.appendChild(createBadge("LIVE YIN PITCH TRACKER", "mint", 9));
  scaleCard.appendChild(scHead);

  scaleCard.appendChild(createText("Exercise: G Major 5-Tone Solfeggio Arpeggio", 14, "Bold", C.textWhite));
  scaleCard.appendChild(createParagraph("Sing each tone into your microphone. VocalSense performs sub-cent harmonic DSP grading in real-time.", 608, 10, "Regular", C.textZinc300, 15));

  // 8 Solfeggio Pads
  const solfRow = figma.createFrame();
  solfRow.layoutMode = "HORIZONTAL"; solfRow.resize(608, 72);
  solfRow.primaryAxisAlignItems = "SPACE_BETWEEN"; solfRow.counterAxisAlignItems = "CENTER"; solfRow.fills = [];

  const notes = [
    { sol: "Do", pitch: "C4", score: "99%", active: false },
    { sol: "Re", pitch: "D4", score: "96%", active: false },
    { sol: "Mi", pitch: "E4", score: "95%", active: false },
    { sol: "Fa", pitch: "F4", score: "92%", active: false },
    { sol: "Sol", pitch: "G4", score: "98%", active: true },
    { sol: "La", pitch: "A4", score: "--", active: false },
    { sol: "Ti", pitch: "B4", score: "--", active: false },
    { sol: "Do", pitch: "C5", score: "--", active: false }
  ];

  notes.forEach(n => {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL"; p.resize(68, 68);
    p.primaryAxisAlignItems = "CENTER"; p.counterAxisAlignItems = "CENTER";
    p.itemSpacing = 2;
    p.cornerRadius = 8;
    p.fills = solid(n.active ? C.forestBase : C.glassElevated, n.active ? 1 : 0.85);
    p.strokes = solid(n.active ? C.mint : C.glassBorder, n.active ? 0.9 : 0.3);
    p.strokeWeight = n.active ? 1.5 : 1;

    p.appendChild(createText(n.sol, 13, "Bold", n.active ? C.mint : C.textWhite));
    p.appendChild(createText(n.pitch, 9, "Medium", C.textZinc400));
    p.appendChild(createBadge(n.score, n.active ? "mint" : "neutral", 8));
    solfRow.appendChild(p);
  });
  scaleCard.appendChild(solfRow);

  // Realtime Audio DSP Pitch Imitation Box
  const imitBox = figma.createFrame();
  imitBox.layoutMode = "HORIZONTAL"; imitBox.resize(608, 48);
  imitBox.primaryAxisAlignItems = "SPACE_BETWEEN"; imitBox.counterAxisAlignItems = "CENTER";
  imitBox.paddingLeft = 12; imitBox.paddingRight = 12;
  imitBox.cornerRadius = 8;
  imitBox.fills = solid(C.forestBase, 0.75);
  imitBox.strokes = solid(C.mint, 0.45); imitBox.strokeWeight = 1;

  const imitLeft = figma.createFrame();
  imitLeft.layoutMode = "HORIZONTAL"; imitLeft.itemSpacing = 8; imitLeft.counterAxisAlignItems = "CENTER"; imitLeft.fills = [];
  const recDot = figma.createEllipse(); recDot.resize(8, 8); recDot.fills = solid(C.mint, 1);
  imitLeft.appendChild(recDot);
  imitLeft.appendChild(createText("Listening: Voice locked at G4 (392.2 Hz) • In-Tune (+1.8 cents)", 11, "Bold", C.mint));
  imitBox.appendChild(imitLeft);

  imitBox.appendChild(createBadge("ACCURACY: 98.4%", "mint", 9));
  scaleCard.appendChild(imitBox);

  // Action toolbar
  const scAct = figma.createFrame();
  scAct.layoutMode = "HORIZONTAL"; scAct.resize(608, 36);
  scAct.primaryAxisAlignItems = "SPACE_BETWEEN"; scAct.counterAxisAlignItems = "CENTER"; scAct.fills = [];
  
  const scActL = figma.createFrame();
  scActL.layoutMode = "HORIZONTAL"; scActL.itemSpacing = 8; scActL.counterAxisAlignItems = "CENTER"; scActL.fills = [];
  scActL.appendChild(createActionButton("Play Piano Guide", "play", "secondary"));
  scActL.appendChild(createActionButton("Metronome 120 BPM", null, "secondary"));
  scAct.appendChild(scActL);

  const btnNext = createActionButton("Next Exercise: Octave Leap ↗", "arrow-up-right", "radiant");
  btnNext.name = "Scale/Next Scale";
  scAct.appendChild(btnNext);
  scaleCard.appendChild(scAct);

  row2.appendChild(scaleCard);
  container.appendChild(row2);

  return root;
}

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

    function buildOnboardingScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 05B. Vocalist Onboarding & Hardware Setup";
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
  stack.name = "Onboarding Stack";
  stack.layoutMode = "VERTICAL";
  stack.resize(1440, 960);
  stack.paddingLeft = 60; stack.paddingRight = 60;
  stack.paddingTop = 28; stack.paddingBottom = 36;
  stack.itemSpacing = 20;
  stack.fills = [];
  stack.clipsContent = false;
  root.appendChild(stack);

  // ---------------------------------------------------------------------------
  // 1. TOP HEADER & STEPPER (1320 x 48 px)
  // ---------------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.layoutMode = "HORIZONTAL"; topBar.resize(1320, 48);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN"; topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const bLogo = figma.createFrame();
  bLogo.layoutMode = "HORIZONTAL"; bLogo.itemSpacing = 10; bLogo.counterAxisAlignItems = "CENTER"; bLogo.fills = [];
  bLogo.primaryAxisSizingMode = "AUTO"; bLogo.counterAxisSizingMode = "AUTO";
  bLogo.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  bLogo.appendChild(createText("VocalSense AI", 16, "Bold", C.textWhite));
  bLogo.appendChild(createBadge("VOCALIST ONBOARDING WIZARD", "mint", 9));
  topBar.appendChild(bLogo);

  // Clean, minimal stepper indicator in Center (NO clunky double boxes!)
  const stepper = figma.createFrame();
  stepper.layoutMode = "HORIZONTAL"; stepper.itemSpacing = 14; stepper.counterAxisAlignItems = "CENTER"; stepper.fills = [];
  stepper.primaryAxisSizingMode = "AUTO"; stepper.counterAxisSizingMode = "AUTO";

  function makeStep(num, label, state = "upcoming") {
    const s = figma.createFrame();
    s.layoutMode = "HORIZONTAL"; s.itemSpacing = 6; s.counterAxisAlignItems = "CENTER";
    s.primaryAxisSizingMode = "AUTO"; s.counterAxisSizingMode = "AUTO";
    s.paddingLeft = 10; s.paddingRight = 10; s.paddingTop = 5; s.paddingBottom = 5;
    s.cornerRadius = 6;
    if (state === "active") {
      s.fills = solid(C.forestBase, 1);
      s.strokes = solid(C.mint, 0.7); s.strokeWeight = 1;
      s.appendChild(createText(String(num), 10, "Bold", C.mint));
      s.appendChild(createText(label, 11, "Bold", C.mint));
    } else if (state === "done") {
      s.fills = solid(C.glassElevated, 1);
      s.strokes = solid(C.mint, 0.35); s.strokeWeight = 1;
      s.appendChild(createSvgIcon("check", "#00F5A0", 11));
      s.appendChild(createText(label, 11, "Medium", C.textWhite));
    } else {
      s.fills = [];
      s.appendChild(createText(String(num), 10, "Medium", C.textZinc500));
      s.appendChild(createText(label, 11, "Regular", C.textZinc400));
    }
    return s;
  }
  stepper.appendChild(makeStep(1, "Vocal Range", "done"));
  stepper.appendChild(createText("—", 11, "Regular", C.textZinc500));
  stepper.appendChild(makeStep(2, "Repertoire", "done"));
  stepper.appendChild(createText("—", 11, "Regular", C.textZinc500));
  stepper.appendChild(makeStep(3, "Mic Calibration", "active"));
  topBar.appendChild(stepper);

  const skipBtn = figma.createFrame();
  skipBtn.name = "Button/Skip Setup";
  skipBtn.layoutMode = "HORIZONTAL"; skipBtn.itemSpacing = 6; skipBtn.counterAxisAlignItems = "CENTER";
  skipBtn.primaryAxisSizingMode = "AUTO"; skipBtn.counterAxisSizingMode = "AUTO";
  skipBtn.paddingLeft = 14; skipBtn.paddingRight = 14; skipBtn.paddingTop = 7; skipBtn.paddingBottom = 7;
  skipBtn.cornerRadius = 8; skipBtn.fills = solid(C.glassElevated, 1);
  skipBtn.strokes = solid(C.glassBorder, 1); skipBtn.strokeWeight = 1;
  skipBtn.appendChild(createText("Skip to Studio DAW ↗", 11, "Medium", C.textZinc300));
  topBar.appendChild(skipBtn);

  stack.appendChild(topBar);

  // ---------------------------------------------------------------------------
  // 2. CLEAN EDITORIAL HEADER (NO SLOPPY BOX!)
  // ---------------------------------------------------------------------------
  const titleHeader = figma.createFrame();
  titleHeader.name = "Editorial Title Header";
  titleHeader.layoutMode = "VERTICAL";
  titleHeader.resize(1320, 60);
  titleHeader.itemSpacing = 4;
  titleHeader.fills = [];

  titleHeader.appendChild(createText("Final Calibration & Acoustic Profile", 22, "Bold", C.textWhite));
  titleHeader.appendChild(createText("Step 3 of 3 • Tailoring your bio-acoustic feedback engine and noise floor to your studio hardware.", 13, "Regular", C.textZinc400));
  stack.appendChild(titleHeader);

  // ---------------------------------------------------------------------------
  // 3. THREE COLUMNS WIZARD CARDS (1320 x 740 px)
  // ---------------------------------------------------------------------------
  const wizardRow = figma.createFrame();
  wizardRow.name = "Wizard Cards Row";
  wizardRow.layoutMode = "HORIZONTAL";
  wizardRow.resize(1320, 740);
  wizardRow.itemSpacing = 24;
  wizardRow.fills = [];
  wizardRow.clipsContent = false;

  // CARD 1: SATB VOCAL CLASSIFICATION (424 x 740)
  const card1 = figma.createFrame();
  card1.name = "Card 1: Voice Classification";
  card1.layoutMode = "VERTICAL";
  card1.resize(424, 740);
  card1.paddingLeft = 22; card1.paddingRight = 22; card1.paddingTop = 22; card1.paddingBottom = 22;
  card1.itemSpacing = 14;
  card1.cornerRadius = 16;
  applyCard2Glass(card1);

  const c1Head = figma.createFrame();
  c1Head.layoutMode = "HORIZONTAL"; c1Head.resize(380, 24); c1Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c1Head.counterAxisAlignItems = "CENTER"; c1Head.fills = [];
  c1Head.appendChild(createText("1. Voice Classification (SATB)", 13, "Bold", C.textWhite));
  c1Head.appendChild(createBadge("TENOR SELECTED", "mint", 9));
  card1.appendChild(c1Head);

  card1.appendChild(createText("Select your primary vocal tessitura for piano roll lines.", 11, "Regular", C.textZinc400));

  const satbList = [
    { type: "Soprano", range: "C4 – C6", desc: "High Female / Head Voice Focus", active: false },
    { type: "Mezzo-Soprano", range: "A3 – A5", desc: "Middle Female / Rich Core Resonance", active: false },
    { type: "Contralto / Alto", range: "F3 – F5", desc: "Deep Female / Low Chest Tessitura", active: false },
    { type: "Tenor", range: "C3 – A4", desc: "High Male / Leggero & Lyrico (Active)", active: true },
    { type: "Baritone", range: "A2 – F4", desc: "Middle Male / Warm Robust Resonance", active: false },
    { type: "Bass", range: "E2 – E4", desc: "Low Male / Sub-Chest Foundation", active: false }
  ];

  satbList.forEach(item => {
    const tile = figma.createFrame();
    tile.layoutMode = "HORIZONTAL"; tile.resize(380, 58); tile.cornerRadius = 8;
    tile.primaryAxisAlignItems = "SPACE_BETWEEN"; tile.counterAxisAlignItems = "CENTER";
    tile.paddingLeft = 14; tile.paddingRight = 14;
    tile.fills = solid(item.active ? C.forestBase : C.glassElevated, item.active ? 1 : 0.65);
    tile.strokes = solid(item.active ? C.mint : C.glassBorder, item.active ? 0.9 : 0.25);
    tile.strokeWeight = item.active ? 1.5 : 1;

    const tLeft = figma.createFrame(); tLeft.layoutMode = "VERTICAL"; tLeft.itemSpacing = 2; tLeft.fills = [];
    tLeft.appendChild(createText(item.type, 12, item.active ? "Bold" : "Medium", item.active ? C.mint : C.textWhite));
    tLeft.appendChild(createText(item.desc, 10, "Regular", item.active ? C.textZinc300 : C.textZinc500));
    tile.appendChild(tLeft);

    tile.appendChild(createBadge(item.range, item.active ? "mint" : "neutral", 9));
    card1.appendChild(tile);
  });
  wizardRow.appendChild(card1);

  // CARD 2: REPERTOIRE & PEDAGOGICAL GOALS (424 x 740)
  const card2 = figma.createFrame();
  card2.name = "Card 2: Repertoire & Goals";
  card2.layoutMode = "VERTICAL";
  card2.resize(424, 740);
  card2.paddingLeft = 22; card2.paddingRight = 22; card2.paddingTop = 22; card2.paddingBottom = 22;
  card2.itemSpacing = 14;
  card2.cornerRadius = 16;
  applyCard2Glass(card2);

  const c2Head = figma.createFrame();
  c2Head.layoutMode = "HORIZONTAL"; c2Head.resize(380, 24); c2Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c2Head.counterAxisAlignItems = "CENTER"; c2Head.fills = [];
  c2Head.appendChild(createText("2. Pedagogical Goals & Genre", 13, "Bold", C.textWhite));
  c2Head.appendChild(createBadge("2 SELECTED", "mint", 9));
  card2.appendChild(c2Head);

  card2.appendChild(createText("Choose focus genres to calibrate Gemini AI feedback.", 11, "Regular", C.textZinc400));

  // Genre Chips: Exactly 2 per row, perfectly fitting 380px without collision
  const genreGrid = figma.createFrame();
  genreGrid.name = "Genre Chips Grid";
  genreGrid.layoutMode = "VERTICAL"; genreGrid.itemSpacing = 8; genreGrid.resize(380, 116); genreGrid.fills = [];

  function makeGenreRow(item1, active1, item2, active2) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.resize(380, 32); row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.fills = [];

    function makeGenreBadge(lbl, active) {
      const b = figma.createFrame();
      b.layoutMode = "HORIZONTAL"; b.resize(184, 32); b.cornerRadius = 6;
      b.primaryAxisAlignItems = "CENTER"; b.counterAxisAlignItems = "CENTER";
      b.fills = solid(active ? C.forestBase : C.glassElevated, active ? 0.95 : 0.7);
      b.strokes = solid(active ? C.mint : C.glassBorder, active ? 0.7 : 0.25);
      b.strokeWeight = 1;
      b.appendChild(createText(lbl, 10, active ? "Bold" : "Medium", active ? C.mint : C.textZinc300));
      return b;
    }
    row.appendChild(makeGenreBadge(item1, active1));
    row.appendChild(makeGenreBadge(item2, active2));
    return row;
  }

  genreGrid.appendChild(makeGenreRow("Pop / Contemporary", true, "Classical / Opera", false));
  genreGrid.appendChild(makeGenreRow("R&B / Soul (Active)", true, "Rock / Belting", false));
  genreGrid.appendChild(makeGenreRow("Jazz / Theatre", false, "Gospel / Choral", false));
  card2.appendChild(genreGrid);

  card2.appendChild(createText("Primary Focus Technique:", 12, "Bold", C.textWhite));

  const goals = [
    { title: "Bridge Passaggio Smoothly (F#4–G4)", desc: "Eliminate register breaks during chest-to-mix transition.", active: true },
    { title: "Vibrato Stability & Rate (5.8–6.5 Hz)", desc: "Cultivate consistent relaxed laryngeal oscillations.", active: false },
    { title: "Vowel Formant Tuning (F1 / F2)", desc: "Maximize acoustic resonance without vocal strain.", active: false }
  ];

  goals.forEach(g => {
    const gBox = figma.createFrame();
    gBox.layoutMode = "VERTICAL"; gBox.resize(380, 68); gBox.cornerRadius = 8;
    gBox.paddingLeft = 14; gBox.paddingRight = 14; gBox.paddingTop = 10; gBox.paddingBottom = 10;
    gBox.itemSpacing = 3;
    gBox.fills = solid(g.active ? C.forestBase : C.glassElevated, g.active ? 1 : 0.6);
    gBox.strokes = solid(g.active ? C.mint : C.glassBorder, g.active ? 0.9 : 0.25);
    gBox.strokeWeight = 1;

    gBox.appendChild(createText(g.title, 11, "Bold", g.active ? C.mint : C.textWhite));
    gBox.appendChild(createText(g.desc, 10, "Regular", C.textZinc400));
    card2.appendChild(gBox);
  });
  wizardRow.appendChild(card2);

  // CARD 3: HARDWARE & NOISE CALIBRATION (424 x 740)
  const card3 = figma.createFrame();
  card3.name = "Card 3: Hardware Calibration";
  card3.layoutMode = "VERTICAL";
  card3.resize(424, 740);
  card3.paddingLeft = 22; card3.paddingRight = 22; card3.paddingTop = 22; card3.paddingBottom = 22;
  card3.itemSpacing = 16;
  card3.cornerRadius = 16;
  applyCard2Glass(card3);

  const c3Head = figma.createFrame();
  c3Head.layoutMode = "HORIZONTAL"; c3Head.resize(380, 24); c3Head.primaryAxisAlignItems = "SPACE_BETWEEN"; c3Head.counterAxisAlignItems = "CENTER"; c3Head.fills = [];
  c3Head.appendChild(createText("3. Hardware & Noise Calibration", 13, "Bold", C.textWhite));
  c3Head.appendChild(createBadge("CONNECTED", "mint", 9));
  card3.appendChild(c3Head);

  card3.appendChild(createText("Calibrate microphone gain & measure ambient noise floor.", 11, "Regular", C.textZinc400));

  // Device Info Box
  const devBox = figma.createFrame();
  devBox.layoutMode = "HORIZONTAL"; devBox.resize(380, 58); devBox.cornerRadius = 8;
  devBox.primaryAxisAlignItems = "SPACE_BETWEEN"; devBox.counterAxisAlignItems = "CENTER";
  devBox.paddingLeft = 14; devBox.paddingRight = 14;
  devBox.fills = solid(C.glassElevated, 1);
  devBox.strokes = solid(C.glassBorder, 0.7); devBox.strokeWeight = 1;

  const devL = figma.createFrame(); devL.layoutMode = "VERTICAL"; devL.itemSpacing = 2; devL.fills = [];
  devL.appendChild(createText("Shure MV7 USB Dynamic Mic", 12, "Bold", C.textWhite));
  devL.appendChild(createText("Sampling Rate: 48,000 Hz • Lossless PCM", 10, "Regular", C.textZinc400));
  devBox.appendChild(devL);
  devBox.appendChild(createBadge("48kHz DSP", "mint", 9));
  card3.appendChild(devBox);

  // Meter 1: Live Input Level
  const m1 = figma.createFrame(); m1.layoutMode = "VERTICAL"; m1.itemSpacing = 6; m1.resize(380, 60); m1.fills = [];
  const m1Head = figma.createFrame(); m1Head.layoutMode = "HORIZONTAL"; m1Head.resize(380, 16); m1Head.primaryAxisAlignItems = "SPACE_BETWEEN"; m1Head.fills = [];
  m1Head.appendChild(createText("Input Gain Level (Optimal)", 11, "Medium", C.textZinc300));
  m1Head.appendChild(createText("-18.4 dB RMS", 11, "Bold", C.mint));
  m1.appendChild(m1Head);

  const bar1 = figma.createFrame(); bar1.resize(380, 10); bar1.cornerRadius = 5; bar1.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  const fill1 = figma.createFrame(); fill1.resize(270, 10); fill1.cornerRadius = 5;
  fill1.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 0, g: 0.96, b: 0.628, a: 1 } }, { position: 1, color: { r: 0.06, g: 0.72, b: 0.50, a: 1 } }] }];
  bar1.appendChild(fill1);
  m1.appendChild(bar1);
  card3.appendChild(m1);

  // Meter 2: Room Noise Floor
  const m2 = figma.createFrame(); m2.layoutMode = "VERTICAL"; m2.itemSpacing = 6; m2.resize(380, 60); m2.fills = [];
  const m2Head = figma.createFrame(); m2Head.layoutMode = "HORIZONTAL"; m2Head.resize(380, 16); m2Head.primaryAxisAlignItems = "SPACE_BETWEEN"; m2Head.fills = [];
  m2Head.appendChild(createText("Ambient Noise Floor", 11, "Medium", C.textZinc300));
  m2Head.appendChild(createText("-54.2 dB (Studio Quiet)", 11, "Bold", C.mint));
  m2.appendChild(m2Head);

  const bar2 = figma.createFrame(); bar2.resize(380, 10); bar2.cornerRadius = 5; bar2.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  const fill2 = figma.createFrame(); fill2.resize(80, 10); fill2.cornerRadius = 5; fill2.fills = solid(C.mint, 0.7);
  bar2.appendChild(fill2);
  m2.appendChild(bar2);
  card3.appendChild(m2);

  // Soundcheck button
  const btnTest = createActionButton("Test Mic Input (Say 'Ah')", "play", "secondary", 380);
  btnTest.name = "Button/Test Mic Input";
  card3.appendChild(btnTest);

  // Complete Onboarding CTA
  const btnDone = createActionButton("Complete Calibration & Enter Studio ↗", "arrow-up-right", "radiant", 380);
  btnDone.name = "Button/Complete Onboarding";
  card3.appendChild(btnDone);

  wizardRow.appendChild(card3);
  stack.appendChild(wizardRow);

  return root;
}

    function buildBillingScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 06. Account Settings & System Preferences";
  root.resize(1440, 2600);
  root.x = originX;
  root.y = originY;
  root.clipsContent = true;

  // Dark studio canvas gradient
  root.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.038, g: 0.046, b: 0.062, a: 1 } },
      { position: 0.5, color: { r: 0.024, g: 0.029, b: 0.038, a: 1 } },
      { position: 1.0, color: { r: 0.015, g: 0.018, b: 0.024, a: 1 } }
    ]
  }];

  const grid = figma.createLine();
  grid.resize(1440, 0); grid.x = 0; grid.y = 64;
  grid.strokes = solid({ r: 1, g: 1, b: 1 }, 0.04);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // -----------------------------------------------------------------------
  // LEFT DAW SIDEBAR DOCK (72 x 2600 px) — RUNS FULL HEIGHT, GEAR ACTIVE!
  // -----------------------------------------------------------------------
  const sidebar = figma.createFrame();
  sidebar.name = "DAW Sidebar Dock";
  sidebar.resize(72, 2600);
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
  navGroup.itemSpacing = 18;
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

  // Bottom: ACTIVE GEAR ICON IN RADIANT EMERALD SQUIRCLE + User Avatar ER
  const bottomGroup = figma.createFrame();
  bottomGroup.name = "Bottom Dock Group";
  bottomGroup.layoutMode = "VERTICAL";
  bottomGroup.primaryAxisSizingMode = "AUTO";
  bottomGroup.counterAxisSizingMode = "AUTO";
  bottomGroup.itemSpacing = 16;
  bottomGroup.counterAxisAlignItems = "CENTER";
  bottomGroup.fills = [];

  const btnSettings = figma.createFrame();
  btnSettings.name = "Nav/Settings";
  btnSettings.layoutMode = "HORIZONTAL";
  btnSettings.primaryAxisSizingMode = "FIXED";
  btnSettings.counterAxisSizingMode = "FIXED";
  btnSettings.resize(42, 42);
  btnSettings.cornerRadius = 10;
  btnSettings.fills = solid(C.forestBase, 1);
  btnSettings.strokes = solid(C.mint, 1);
  btnSettings.strokeWeight = 1.8;
  btnSettings.primaryAxisAlignItems = "CENTER";
  btnSettings.counterAxisAlignItems = "CENTER";
  btnSettings.appendChild(createSvgIcon("settings", "#00F5A0", 18));
  bottomGroup.appendChild(btnSettings);

  const avatarFrame = figma.createFrame();
  avatarFrame.name = "Nav/Avatar ER";
  avatarFrame.layoutMode = "HORIZONTAL";
  avatarFrame.primaryAxisSizingMode = "FIXED";
  avatarFrame.counterAxisSizingMode = "FIXED";
  avatarFrame.resize(40, 40);
  avatarFrame.cornerRadius = 10;
  avatarFrame.fills = solid(C.glassElevated, 1);
  avatarFrame.strokes = solid(C.glassBorder, 0.7);
  avatarFrame.strokeWeight = 1;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 12, "Bold", C.textZinc400));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // LEFT SETTINGS CATEGORY SUB-SIDEBAR (230 x 860 px) AT x=96
  // Provides instant category navigation without excessive width
  // -----------------------------------------------------------------------
  const subNav = figma.createFrame();
  subNav.name = "Settings Sub-Navigation";
  subNav.layoutMode = "VERTICAL";
  subNav.primaryAxisSizingMode = "FIXED";
  subNav.counterAxisSizingMode = "FIXED";
  subNav.resize(230, 860);
  subNav.x = 96;
  subNav.y = 20;
  subNav.paddingLeft = 14; subNav.paddingRight = 14; subNav.paddingTop = 16; subNav.paddingBottom = 16;
  subNav.itemSpacing = 14;
  subNav.cornerRadius = 12;
  applyCard2Glass(subNav);

  // User Mini-Profile Card in Sub-nav
  const userMini = figma.createFrame();
  userMini.layoutMode = "HORIZONTAL";
  userMini.primaryAxisSizingMode = "FIXED";
  userMini.counterAxisSizingMode = "AUTO";
  userMini.resize(202, 48);
  userMini.itemSpacing = 10;
  userMini.counterAxisAlignItems = "CENTER";
  userMini.fills = [];

  const avMini = figma.createFrame();
  avMini.layoutMode = "HORIZONTAL";
  avMini.primaryAxisSizingMode = "FIXED";
  avMini.counterAxisSizingMode = "FIXED";
  avMini.resize(38, 38);
  avMini.cornerRadius = 19;
  avMini.fills = solid(C.forestBase, 1);
  avMini.strokes = solid(C.mint, 0.8);
  avMini.strokeWeight = 1.5;
  avMini.primaryAxisAlignItems = "CENTER";
  avMini.counterAxisAlignItems = "CENTER";
  avMini.appendChild(createText("ER", 12, "Bold", C.mint));
  userMini.appendChild(avMini);

  const uTxt = figma.createFrame();
  uTxt.layoutMode = "VERTICAL"; uTxt.itemSpacing = 2; uTxt.fills = [];
  uTxt.appendChild(createText("Ethan Reynolds", 12, "Bold", C.textWhite));
  uTxt.appendChild(createText("Tenor • Juilliard Div.", 9, "Regular", C.textZinc400));
  userMini.appendChild(uTxt);
  subNav.appendChild(userMini);

  const div1 = figma.createLine();
  div1.resize(202, 0); div1.strokes = solid(C.glassBorder, 0.5); div1.strokeWeight = 1;
  subNav.appendChild(div1);

  // 6 Nav Items
  const menuList = figma.createFrame();
  menuList.layoutMode = "VERTICAL";
  menuList.primaryAxisSizingMode = "AUTO";
  menuList.counterAxisSizingMode = "FIXED";
  menuList.resize(202, 280);
  menuList.itemSpacing = 6;
  menuList.fills = [];

  function makeSubNavItem(iconName, label, isActive = false) {
    const item = figma.createFrame();
    item.layoutMode = "HORIZONTAL";
    item.primaryAxisSizingMode = "FIXED";
    item.counterAxisSizingMode = "FIXED";
    item.resize(202, 38);
    item.paddingLeft = 12; item.paddingRight = 12;
    item.itemSpacing = 10;
    item.counterAxisAlignItems = "CENTER";
    item.cornerRadius = 6;
    item.fills = solid(isActive ? C.forestBase : C.glassElevated, isActive ? 1 : 0.4);
    item.strokes = solid(isActive ? C.mint : C.glassBorder, isActive ? 0.7 : 0.3);
    item.strokeWeight = 1;
    item.appendChild(createSvgIcon(iconName, isActive ? "#00F5A0" : "#8B9DAF", 14));
    item.appendChild(createText(label, 11, isActive ? "Bold" : "Medium", isActive ? C.mint : C.textZinc300));
    return item;
  }

  menuList.appendChild(makeSubNavItem("user", "Vocalist Identity", false));
  menuList.appendChild(makeSubNavItem("lock", "Password & Security", true));
  menuList.appendChild(makeSubNavItem("mic", "Hardware & Audio DSP", false));
  menuList.appendChild(makeSubNavItem("sliders", "Practice & AI Coach", false));
  menuList.appendChild(makeSubNavItem("globe", "Privacy & Community", false));
  menuList.appendChild(makeSubNavItem("sparkle", "Plan & Cloud Billing", false));
  subNav.appendChild(menuList);

  const div2 = figma.createLine();
  div2.resize(202, 0); div2.strokes = solid(C.glassBorder, 0.5); div2.strokeWeight = 1;
  subNav.appendChild(div2);

  // Status Summary Card in Sub-nav
  const sysCard = figma.createFrame();
  sysCard.layoutMode = "VERTICAL";
  sysCard.primaryAxisSizingMode = "AUTO";
  sysCard.counterAxisSizingMode = "FIXED";
  sysCard.resize(202, 130);
  sysCard.paddingLeft = 10; sysCard.paddingRight = 10; sysCard.paddingTop = 10; sysCard.paddingBottom = 10;
  sysCard.itemSpacing = 6;
  sysCard.cornerRadius = 8;
  sysCard.fills = solid({ r: 0.05, g: 0.07, b: 0.10 }, 1);
  sysCard.strokes = solid(C.glassBorder, 0.4); sysCard.strokeWeight = 1;

  sysCard.appendChild(createText("SYSTEM STATUS", 9, "Bold", C.mint));
  
  function makeStatusItem(label, val) {
    const r = figma.createFrame();
    r.layoutMode = "HORIZONTAL"; r.resize(182, 16);
    r.primaryAxisAlignItems = "SPACE_BETWEEN"; r.counterAxisAlignItems = "CENTER"; r.fills = [];
    r.appendChild(createText(label, 9, "Regular", C.textZinc400));
    r.appendChild(createText(val, 9, "Bold", C.textWhite));
    return r;
  }
  sysCard.appendChild(makeStatusItem("CoreAudio DSP", "48kHz Calibrated"));
  sysCard.appendChild(makeStatusItem("Roundtrip Latency", "2.7 ms"));
  sysCard.appendChild(makeStatusItem("Storage Quota", "4.2 / 10 GB"));
  sysCard.appendChild(makeStatusItem("Membership", "Pro Active"));
  subNav.appendChild(sysCard);

  root.appendChild(subNav);

  // -----------------------------------------------------------------------
  // MAIN SETTINGS COLUMN (1018 px) AT x=350 — PROPORTIONAL, COMFORTABLE!
  // -----------------------------------------------------------------------
  const mainCol = figma.createFrame();
  mainCol.name = "Settings Main Content";
  mainCol.layoutMode = "VERTICAL";
  mainCol.primaryAxisSizingMode = "AUTO";
  mainCol.counterAxisSizingMode = "FIXED";
  mainCol.resize(1018, 2550);
  mainCol.x = 350;
  mainCol.y = 20;
  mainCol.itemSpacing = 20;
  mainCol.fills = [];
  mainCol.clipsContent = false;

  // -----------------------------------------------------------------------
  // TOP BAR (1018 x 40 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.layoutMode = "HORIZONTAL";
  topBar.primaryAxisSizingMode = "FIXED";
  topBar.counterAxisSizingMode = "AUTO";
  topBar.resize(1018, 40);
  topBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  topBar.counterAxisAlignItems = "CENTER";
  topBar.fills = [];

  const tbL = figma.createFrame();
  tbL.layoutMode = "HORIZONTAL"; tbL.itemSpacing = 12; tbL.counterAxisAlignItems = "CENTER"; tbL.fills = [];
  
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
  tbL.appendChild(backBtn);

  const breadcrumb = figma.createFrame();
  breadcrumb.layoutMode = "HORIZONTAL"; breadcrumb.itemSpacing = 6; breadcrumb.counterAxisAlignItems = "CENTER"; breadcrumb.fills = [];
  breadcrumb.appendChild(createText("VocalSense AI", 11, "Medium", C.textZinc500));
  breadcrumb.appendChild(createText("•", 10, "Regular", C.textZinc600));
  breadcrumb.appendChild(createText("System Settings & Preferences", 11, "Medium", C.textZinc300));
  tbL.appendChild(breadcrumb);
  topBar.appendChild(tbL);

  const tbR = figma.createFrame();
  tbR.layoutMode = "HORIZONTAL"; tbR.itemSpacing = 10; tbR.counterAxisAlignItems = "CENTER"; tbR.fills = [];
  tbR.appendChild(createBadge("AUTO-SAVED", "mint", 8));

  const btnSave = figma.createFrame();
  btnSave.name = "Button/Save Changes";
  btnSave.layoutMode = "HORIZONTAL";
  btnSave.primaryAxisSizingMode = "FIXED";
  btnSave.counterAxisSizingMode = "FIXED";
  btnSave.resize(116, 30);
  btnSave.cornerRadius = 6;
  btnSave.primaryAxisAlignItems = "CENTER";
  btnSave.counterAxisAlignItems = "CENTER";
  btnSave.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 1 } },
      { position: 1.0, color: { r: C.emerald.r, g: C.emerald.g, b: C.emerald.b, a: 1 } }
    ]
  }];
  btnSave.strokes = solid(C.mint, 0.9); btnSave.strokeWeight = 1;
  btnSave.appendChild(createText("Save Changes", 11, "Bold", { r: 0.02, g: 0.08, b: 0.05 }));
  tbR.appendChild(btnSave);
  topBar.appendChild(tbR);
  mainCol.appendChild(topBar);

  // Title Banner
  const titleBanner = figma.createFrame();
  titleBanner.layoutMode = "VERTICAL";
  titleBanner.primaryAxisSizingMode = "AUTO";
  titleBanner.counterAxisSizingMode = "FIXED";
  titleBanner.resize(1018, 50);
  titleBanner.itemSpacing = 2;
  titleBanner.fills = [];
  titleBanner.appendChild(createText("System Settings & Preferences", 22, "Bold", C.textWhite));
  titleBanner.appendChild(createText("Manage your conservatory profile, password security, audio DSP hardware, AI coaching, and billing.", 11, "Regular", C.textZinc400));
  mainCol.appendChild(titleBanner);

  // Helper to create a standardized Section Card (Width: 1018 px, Inner width: 970 px)
  function makeSectionCard(title, iconName, badgeText, badgeScheme = "mint") {
    const card = figma.createFrame();
    card.name = "Card/" + title;
    card.layoutMode = "VERTICAL";
    card.primaryAxisSizingMode = "AUTO"; // Expands naturally, NEVER cuts off content!
    card.counterAxisSizingMode = "FIXED";
    card.resize(1018, 100);
    card.paddingLeft = 24; card.paddingRight = 24; card.paddingTop = 20; card.paddingBottom = 22;
    card.itemSpacing = 16;
    card.cornerRadius = 12;
    applyCard2Glass(card);

    const head = figma.createFrame();
    head.layoutMode = "HORIZONTAL";
    head.primaryAxisSizingMode = "FIXED";
    head.counterAxisSizingMode = "AUTO";
    head.resize(970, 24);
    head.primaryAxisAlignItems = "SPACE_BETWEEN";
    head.counterAxisAlignItems = "CENTER";
    head.fills = [];

    const hL = figma.createFrame();
    hL.layoutMode = "HORIZONTAL"; hL.itemSpacing = 8; hL.counterAxisAlignItems = "CENTER"; hL.fills = [];
    hL.appendChild(createSvgIcon(iconName, "#00F5A0", 16));
    hL.appendChild(createText(title, 14, "Bold", C.textWhite));
    head.appendChild(hL);

    if (badgeText) {
      head.appendChild(createBadge(badgeText, badgeScheme, 8));
    }
    card.appendChild(head);
    return card;
  }

  // -----------------------------------------------------------------------
  // CARD 1: VOCALIST IDENTITY & CONSERVATORY PROFILE
  // -----------------------------------------------------------------------
  const card1 = makeSectionCard("Vocalist Identity & Conservatory Profile", "user", "VERIFIED ARTIST", "mint");
  
  const c1Row = figma.createFrame();
  c1Row.layoutMode = "HORIZONTAL";
  c1Row.primaryAxisSizingMode = "FIXED";
  c1Row.counterAxisSizingMode = "AUTO";
  c1Row.resize(970, 72);
  c1Row.itemSpacing = 16;
  c1Row.counterAxisAlignItems = "CENTER";
  c1Row.fills = [];

  const bigAv = figma.createFrame();
  bigAv.layoutMode = "HORIZONTAL";
  bigAv.primaryAxisSizingMode = "FIXED";
  bigAv.counterAxisSizingMode = "FIXED";
  bigAv.resize(56, 56);
  bigAv.cornerRadius = 28;
  bigAv.fills = solid(C.forestBase, 1);
  bigAv.strokes = solid(C.mint, 1);
  bigAv.strokeWeight = 1.8;
  bigAv.primaryAxisAlignItems = "CENTER";
  bigAv.counterAxisAlignItems = "CENTER";
  bigAv.appendChild(createText("ER", 18, "Bold", C.mint));
  c1Row.appendChild(bigAv);

  const avInfo = figma.createFrame();
  avInfo.layoutMode = "VERTICAL"; avInfo.itemSpacing = 4; avInfo.fills = [];
  avInfo.appendChild(createText("Ethan Reynolds Profile Avatar", 12, "Bold", C.textWhite));
  avInfo.appendChild(createText("PNG, JPG or WebP up to 5MB. Recommended square 400x400 px.", 10, "Regular", C.textZinc400));
  
  const avBtnRow = figma.createFrame();
  avBtnRow.layoutMode = "HORIZONTAL"; avBtnRow.itemSpacing = 8; avBtnRow.fills = [];
  
  const btnChgAv = figma.createFrame();
  btnChgAv.layoutMode = "HORIZONTAL";
  btnChgAv.paddingLeft = 10; btnChgAv.paddingRight = 10; btnChgAv.paddingTop = 4; btnChgAv.paddingBottom = 4;
  btnChgAv.cornerRadius = 5;
  btnChgAv.fills = solid(C.glassElevated, 1);
  btnChgAv.strokes = solid(C.glassBorder, 0.7); btnChgAv.strokeWeight = 1;
  btnChgAv.appendChild(createText("Upload New Photo", 10, "Medium", C.textWhite));
  avBtnRow.appendChild(btnChgAv);

  const btnRemAv = figma.createFrame();
  btnRemAv.layoutMode = "HORIZONTAL";
  btnRemAv.paddingLeft = 10; btnRemAv.paddingRight = 10; btnRemAv.paddingTop = 4; btnRemAv.paddingBottom = 4;
  btnRemAv.cornerRadius = 5;
  btnRemAv.fills = solid(C.glassElevated, 0.5);
  btnRemAv.strokes = solid(C.glassBorder, 0.4); btnRemAv.strokeWeight = 1;
  btnRemAv.appendChild(createText("Remove", 10, "Regular", C.textZinc400));
  avBtnRow.appendChild(btnRemAv);

  avInfo.appendChild(avBtnRow);
  c1Row.appendChild(avInfo);
  card1.appendChild(c1Row);

  // 2-Column Fields: Display Name & Vocal Fach
  function makeFormField(label, val, width = 475, hasDropdown = false) {
    const f = figma.createFrame();
    f.layoutMode = "VERTICAL";
    f.primaryAxisSizingMode = "FIXED";
    f.counterAxisSizingMode = "FIXED";
    f.resize(width, 56);
    f.itemSpacing = 4;
    f.fills = [];
    f.appendChild(createText(label, 10, "Medium", C.textZinc400));

    const inp = figma.createFrame();
    inp.layoutMode = "HORIZONTAL";
    inp.primaryAxisSizingMode = "FIXED";
    inp.counterAxisSizingMode = "FIXED";
    inp.resize(width, 36);
    inp.paddingLeft = 12; inp.paddingRight = 12;
    inp.primaryAxisAlignItems = hasDropdown ? "SPACE_BETWEEN" : "MIN";
    inp.counterAxisAlignItems = "CENTER";
    inp.cornerRadius = 6;
    inp.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
    inp.strokes = solid(C.glassBorder, 0.8); inp.strokeWeight = 1;
    inp.appendChild(createText(val, 11, "Regular", C.textWhite));
    if (hasDropdown) {
      inp.appendChild(createText("▼", 9, "Medium", C.textZinc400));
    }
    f.appendChild(inp);
    return f;
  }

  const c1Fields = figma.createFrame();
  c1Fields.layoutMode = "HORIZONTAL";
  c1Fields.primaryAxisSizingMode = "FIXED";
  c1Fields.counterAxisSizingMode = "AUTO";
  c1Fields.resize(970, 56);
  c1Fields.primaryAxisAlignItems = "SPACE_BETWEEN";
  c1Fields.fills = [];
  c1Fields.appendChild(makeFormField("Full Vocalist Name", "Ethan Reynolds", 475, false));
  c1Fields.appendChild(makeFormField("Vocal Fach Classification", "Lyric Tenor (Tenore Lirico • C2 — A4)", 475, true));
  card1.appendChild(c1Fields);

  const c1Fields2 = figma.createFrame();
  c1Fields2.layoutMode = "HORIZONTAL";
  c1Fields2.primaryAxisSizingMode = "FIXED";
  c1Fields2.counterAxisSizingMode = "AUTO";
  c1Fields2.resize(970, 56);
  c1Fields2.primaryAxisAlignItems = "SPACE_BETWEEN";
  c1Fields2.fills = [];
  c1Fields2.appendChild(makeFormField("Primary Conservatory Email", "ethan.reynolds@juilliard.edu (Verified)", 475, false));
  c1Fields2.appendChild(makeFormField("Conservatory Institution & Division", "The Juilliard School • Vocal Arts Division", 475, false));
  card1.appendChild(c1Fields2);

  mainCol.appendChild(card1);

  // -----------------------------------------------------------------------
  // CARD 2: PASSWORD & AUTHENTICATION SECURITY
  // -----------------------------------------------------------------------
  const card2 = makeSectionCard("Password & Authentication Security", "lock", "2FA ACTIVE", "mint");

  const pwdFormRow = figma.createFrame();
  pwdFormRow.layoutMode = "HORIZONTAL";
  pwdFormRow.primaryAxisSizingMode = "FIXED";
  pwdFormRow.counterAxisSizingMode = "AUTO";
  pwdFormRow.resize(970, 56);
  pwdFormRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  pwdFormRow.fills = [];
  pwdFormRow.appendChild(makeFormField("Current Password", "••••••••••••", 475, false));
  pwdFormRow.appendChild(makeFormField("New Password (Min. 12 Chars)", "••••••••••••••••", 475, false));
  card2.appendChild(pwdFormRow);

  const pwdFormRow2 = figma.createFrame();
  pwdFormRow2.layoutMode = "HORIZONTAL";
  pwdFormRow2.primaryAxisSizingMode = "FIXED";
  pwdFormRow2.counterAxisSizingMode = "AUTO";
  pwdFormRow2.resize(970, 56);
  pwdFormRow2.primaryAxisAlignItems = "SPACE_BETWEEN";
  pwdFormRow2.fills = [];
  pwdFormRow2.appendChild(makeFormField("Confirm New Password", "••••••••••••••••", 475, false));

  // Password strength meter block
  const strBox = figma.createFrame();
  strBox.layoutMode = "VERTICAL";
  strBox.primaryAxisSizingMode = "FIXED";
  strBox.counterAxisSizingMode = "FIXED";
  strBox.resize(475, 56);
  strBox.itemSpacing = 6;
  strBox.fills = [];
  strBox.appendChild(createText("Password Strength Meter", 10, "Medium", C.textZinc400));
  
  const barLine = figma.createFrame();
  barLine.layoutMode = "HORIZONTAL"; barLine.itemSpacing = 4; barLine.counterAxisAlignItems = "CENTER"; barLine.fills = [];
  for (let i = 0; i < 4; i++) {
    const b = figma.createFrame(); b.resize(36, 6); b.cornerRadius = 2; b.fills = solid(C.mint, 0.95);
    barLine.appendChild(b);
  }
  barLine.appendChild(createText("Very Strong (88 bits entropy)", 10, "Bold", C.mint));
  strBox.appendChild(barLine);
  strBox.appendChild(createText("Meets conservatory encryption & audio stem confidentiality policies.", 9, "Regular", C.textZinc500));
  pwdFormRow2.appendChild(strBox);

  card2.appendChild(pwdFormRow2);

  // Update Password Action Button (140x34) — GUARANTEED FULLY VISIBLE!
  const btnPwdRow = figma.createFrame();
  btnPwdRow.layoutMode = "HORIZONTAL";
  btnPwdRow.primaryAxisSizingMode = "FIXED";
  btnPwdRow.counterAxisSizingMode = "AUTO";
  btnPwdRow.resize(970, 36);
  btnPwdRow.itemSpacing = 14;
  btnPwdRow.counterAxisAlignItems = "CENTER";
  btnPwdRow.fills = [];

  const btnUpdatePwd = figma.createFrame();
  btnUpdatePwd.name = "Button/Update Password";
  btnUpdatePwd.layoutMode = "HORIZONTAL";
  btnUpdatePwd.primaryAxisSizingMode = "FIXED";
  btnUpdatePwd.counterAxisSizingMode = "FIXED";
  btnUpdatePwd.resize(140, 34);
  btnUpdatePwd.cornerRadius = 6;
  btnUpdatePwd.primaryAxisAlignItems = "CENTER";
  btnUpdatePwd.counterAxisAlignItems = "CENTER";
  btnUpdatePwd.fills = solid(C.forestBase, 1);
  btnUpdatePwd.strokes = solid(C.mint, 0.9); btnUpdatePwd.strokeWeight = 1;
  btnUpdatePwd.appendChild(createText("Update Password", 11, "Bold", C.mint));
  btnPwdRow.appendChild(btnUpdatePwd);

  btnPwdRow.appendChild(createText("Forgot current password?", 10, "Medium", C.textZinc400));
  card2.appendChild(btnPwdRow);

  // 2FA & Passkey Rows
  const tfaBox = figma.createFrame();
  tfaBox.layoutMode = "HORIZONTAL";
  tfaBox.primaryAxisSizingMode = "FIXED";
  tfaBox.counterAxisSizingMode = "FIXED";
  tfaBox.resize(970, 50);
  tfaBox.paddingLeft = 14; tfaBox.paddingRight = 14;
  tfaBox.primaryAxisAlignItems = "SPACE_BETWEEN";
  tfaBox.counterAxisAlignItems = "CENTER";
  tfaBox.cornerRadius = 8;
  tfaBox.fills = solid(C.glassElevated, 0.6);
  tfaBox.strokes = solid(C.glassBorder, 0.4); tfaBox.strokeWeight = 1;

  const tfaL = figma.createFrame();
  tfaL.layoutMode = "HORIZONTAL"; tfaL.itemSpacing = 10; tfaL.counterAxisAlignItems = "CENTER"; tfaL.fills = [];
  tfaL.appendChild(createSvgIcon("shield", "#00F5A0", 16));
  const tfaTxt = figma.createFrame(); tfaTxt.layoutMode = "VERTICAL"; tfaTxt.itemSpacing = 2; tfaTxt.fills = [];
  tfaTxt.appendChild(createText("Two-Factor Authentication (TOTP Authenticator)", 11, "Bold", C.textWhite));
  tfaTxt.appendChild(createText("Google Authenticator connected • 8 Emergency backup codes generated", 9, "Regular", C.textZinc400));
  tfaL.appendChild(tfaTxt);
  tfaBox.appendChild(tfaL);

  const tfaBtns = figma.createFrame();
  tfaBtns.layoutMode = "HORIZONTAL"; tfaBtns.itemSpacing = 8; tfaBtns.fills = [];
  
  const btnCfg2fa = figma.createFrame();
  btnCfg2fa.layoutMode = "HORIZONTAL";
  btnCfg2fa.paddingLeft = 10; btnCfg2fa.paddingRight = 10; btnCfg2fa.paddingTop = 4; btnCfg2fa.paddingBottom = 4;
  btnCfg2fa.cornerRadius = 5;
  btnCfg2fa.fills = solid(C.glassElevated, 1);
  btnCfg2fa.strokes = solid(C.glassBorder, 0.6); btnCfg2fa.strokeWeight = 1;
  btnCfg2fa.appendChild(createText("Reconfigure 2FA", 10, "Medium", C.textZinc300));
  tfaBtns.appendChild(btnCfg2fa);

  const btnCodes = figma.createFrame();
  btnCodes.layoutMode = "HORIZONTAL";
  btnCodes.paddingLeft = 10; btnCodes.paddingRight = 10; btnCodes.paddingTop = 4; btnCodes.paddingBottom = 4;
  btnCodes.cornerRadius = 5;
  btnCodes.fills = solid(C.glassElevated, 1);
  btnCodes.strokes = solid(C.glassBorder, 0.6); btnCodes.strokeWeight = 1;
  btnCodes.appendChild(createText("Backup Codes", 10, "Medium", C.textZinc300));
  tfaBtns.appendChild(btnCodes);
  tfaBox.appendChild(tfaBtns);
  card2.appendChild(tfaBox);

  mainCol.appendChild(card2);

  // -----------------------------------------------------------------------
  // CARD 3: AUDIO HARDWARE & STUDIO ENGINE DSP
  // -----------------------------------------------------------------------
  const card3 = makeSectionCard("Audio Hardware & Studio Engine Calibration", "mic", "CORE AUDIO 48kHz", "mint");

  const micRow = figma.createFrame();
  micRow.layoutMode = "HORIZONTAL";
  micRow.primaryAxisSizingMode = "FIXED";
  micRow.counterAxisSizingMode = "AUTO";
  micRow.resize(970, 56);
  micRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  micRow.fills = [];
  micRow.appendChild(makeFormField("Primary Vocal Input Device (Microphone)", "Shure SM7B (Focusrite Scarlett 2i2 USB Audio)", 475, true));
  micRow.appendChild(makeFormField("Audio Output / Direct Monitor Device", "Headphones (Focusrite Scarlett 2i2 Direct)", 475, true));
  card3.appendChild(micRow);

  const dspRow = figma.createFrame();
  dspRow.layoutMode = "HORIZONTAL";
  dspRow.primaryAxisSizingMode = "FIXED";
  dspRow.counterAxisSizingMode = "AUTO";
  dspRow.resize(970, 56);
  dspRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  dspRow.fills = [];
  dspRow.appendChild(makeFormField("Studio Sample Rate Format", "48,000 Hz (Master 24-bit FLAC)", 475, true));
  dspRow.appendChild(makeFormField("Audio Buffer Size & Hardware Latency", "128 Samples (2.7 ms Ultra-Low Latency)", 475, true));
  card3.appendChild(dspRow);

  // Pitch Engine & Noise Gate Row
  const engRow = figma.createFrame();
  engRow.layoutMode = "HORIZONTAL";
  engRow.primaryAxisSizingMode = "FIXED";
  engRow.counterAxisSizingMode = "AUTO";
  engRow.resize(970, 84);
  engRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  engRow.fills = [];

  // Pitch Detection Algorithm
  const pEng = figma.createFrame();
  pEng.layoutMode = "VERTICAL";
  pEng.primaryAxisSizingMode = "FIXED";
  pEng.counterAxisSizingMode = "FIXED";
  pEng.resize(475, 84);
  pEng.paddingLeft = 14; pEng.paddingRight = 14; pEng.paddingTop = 10; pEng.paddingBottom = 10;
  pEng.itemSpacing = 6;
  pEng.cornerRadius = 8;
  pEng.fills = solid(C.glassElevated, 0.5);
  pEng.strokes = solid(C.glassBorder, 0.4); pEng.strokeWeight = 1;

  const peH = figma.createFrame();
  peH.layoutMode = "HORIZONTAL"; peH.resize(447, 18); peH.primaryAxisAlignItems = "SPACE_BETWEEN"; peH.fills = [];
  peH.appendChild(createText("Pitch Engine: YIN Fast Auto-Correlation", 11, "Bold", C.textWhite));
  peH.appendChild(createText("±3 cents", 10, "Bold", C.mint));
  pEng.appendChild(peH);
  pEng.appendChild(createParagraph("Sub-cent fundamental frequency tracker calibrated for lyric tenor modal and mixed registers (C2–A4).", 447, 10, "Regular", C.textZinc400, 16));
  engRow.appendChild(pEng);

  // Noise Floor Gate
  const ngBox = figma.createFrame();
  ngBox.layoutMode = "VERTICAL";
  ngBox.primaryAxisSizingMode = "FIXED";
  ngBox.counterAxisSizingMode = "FIXED";
  ngBox.resize(475, 84);
  ngBox.paddingLeft = 14; ngBox.paddingRight = 14; ngBox.paddingTop = 10; ngBox.paddingBottom = 10;
  ngBox.itemSpacing = 6;
  ngBox.cornerRadius = 8;
  ngBox.fills = solid(C.glassElevated, 0.5);
  ngBox.strokes = solid(C.glassBorder, 0.4); ngBox.strokeWeight = 1;

  const ngH = figma.createFrame();
  ngH.layoutMode = "HORIZONTAL"; ngH.resize(447, 18); ngH.primaryAxisAlignItems = "SPACE_BETWEEN"; ngH.fills = [];
  ngH.appendChild(createText("Software Noise Floor Gate Threshold", 11, "Bold", C.textWhite));
  ngH.appendChild(createText("-42 dB RMS", 10, "Bold", C.mint));
  ngBox.appendChild(ngH);

  const ngTrack = figma.createFrame();
  ngTrack.resize(447, 6); ngTrack.cornerRadius = 3; ngTrack.fills = solid({ r: 0.12, g: 0.15, b: 0.20 }, 1);
  const ngFill = figma.createFrame();
  ngFill.resize(Math.round(447 * 0.68), 6); ngFill.cornerRadius = 3; ngFill.fills = solid(C.mint, 1);
  ngTrack.appendChild(ngFill);
  ngBox.appendChild(ngTrack);

  ngBox.appendChild(createText("Room ambient suppression calibrated against -54 dB studio floor.", 9, "Regular", C.textZinc400));
  engRow.appendChild(ngBox);

  card3.appendChild(engRow);

  // Status diagnostics strip
  const latStrip = figma.createFrame();
  latStrip.layoutMode = "HORIZONTAL";
  latStrip.primaryAxisSizingMode = "FIXED";
  latStrip.counterAxisSizingMode = "FIXED";
  latStrip.resize(970, 32);
  latStrip.paddingLeft = 12; latStrip.paddingRight = 12;
  latStrip.primaryAxisAlignItems = "SPACE_BETWEEN";
  latStrip.counterAxisAlignItems = "CENTER";
  latStrip.cornerRadius = 6;
  latStrip.fills = solid(C.forestBase, 0.7);
  latStrip.strokes = solid(C.mint, 0.4); latStrip.strokeWeight = 1;
  latStrip.appendChild(createText("Roundtrip Hardware Latency: 2.7 ms • 0 Dropped Buffer Packets", 10, "Regular", C.textZinc300));
  latStrip.appendChild(createText("CoreAudio Engine: 100% Calibrated", 10, "Bold", C.mint));
  card3.appendChild(latStrip);

  mainCol.appendChild(card3);

  // -----------------------------------------------------------------------
  // CARD 4: PRACTICE GOALS & GEMINI AI VOCAL COACH PREFERENCES
  // -----------------------------------------------------------------------
  const card4 = makeSectionCard("Practice Goals & Gemini AI Vocal Coach", "sliders", "CONSERVATORY SYLLABUS", "mint");

  const c4Fields = figma.createFrame();
  c4Fields.layoutMode = "HORIZONTAL";
  c4Fields.primaryAxisSizingMode = "FIXED";
  c4Fields.counterAxisSizingMode = "AUTO";
  c4Fields.resize(970, 56);
  c4Fields.primaryAxisAlignItems = "SPACE_BETWEEN";
  c4Fields.fills = [];
  c4Fields.appendChild(makeFormField("Daily Vocal Practice Goal", "30 Minutes / Day (Recommended for Lyric Tenor)", 475, true));
  c4Fields.appendChild(makeFormField("Daily Push Reminder Time", "19:00 WIB (Evening Calisthenics)", 475, true));
  card4.appendChild(c4Fields);

  const c4Fields2 = figma.createFrame();
  c4Fields2.layoutMode = "HORIZONTAL";
  c4Fields2.primaryAxisSizingMode = "FIXED";
  c4Fields2.counterAxisSizingMode = "AUTO";
  c4Fields2.resize(970, 56);
  c4Fields2.primaryAxisAlignItems = "SPACE_BETWEEN";
  c4Fields2.fills = [];
  c4Fields2.appendChild(makeFormField("Gemini AI Coach Evaluation Strictness", "Conservatory Virtuoso (Strict pitch drift & vowel format)", 475, true));
  c4Fields2.appendChild(makeFormField("Concert Tuning Standard Reference", "A4 = 440 Hz (International Solfeggio)", 475, true));
  card4.appendChild(c4Fields2);

  mainCol.appendChild(card4);

  // -----------------------------------------------------------------------
  // CARD 5: PRIVACY & COMMUNITY PREFERENCES
  // -----------------------------------------------------------------------
  const card5 = makeSectionCard("Privacy & Community Visibility", "globe", "STUDIO PRIVACY", "neutral");

  function makeCleanToggle(title, desc, isOn = true) {
    const tr = figma.createFrame();
    tr.layoutMode = "HORIZONTAL";
    tr.primaryAxisSizingMode = "FIXED";
    tr.counterAxisSizingMode = "FIXED";
    tr.resize(970, 48);
    tr.paddingLeft = 14; tr.paddingRight = 14;
    tr.primaryAxisAlignItems = "SPACE_BETWEEN";
    tr.counterAxisAlignItems = "CENTER";
    tr.cornerRadius = 6;
    tr.fills = solid(C.glassElevated, 0.5);
    tr.strokes = solid(C.glassBorder, 0.35); tr.strokeWeight = 1;

    // Left info block with ample 860px room! ZERO CUTOFF!
    const tL = figma.createFrame();
    tL.layoutMode = "VERTICAL";
    tL.primaryAxisSizingMode = "AUTO";
    tL.counterAxisSizingMode = "FIXED";
    tL.resize(860, 36);
    tL.itemSpacing = 2;
    tL.fills = [];
    tL.appendChild(createText(title, 11, "Bold", C.textWhite));
    tL.appendChild(createText(desc, 10, "Regular", C.textZinc400));
    tr.appendChild(tL);

    // Toggle switch (36x20)
    const sw = figma.createFrame();
    sw.resize(36, 20); sw.cornerRadius = 10;
    sw.fills = solid(isOn ? C.mint : { r: 0.12, g: 0.14, b: 0.18 }, 1);
    sw.layoutMode = "HORIZONTAL";
    sw.counterAxisAlignItems = "CENTER";
    sw.paddingLeft = isOn ? 18 : 2; sw.paddingRight = isOn ? 2 : 18;

    const knob = figma.createEllipse();
    knob.resize(16, 16);
    knob.fills = solid(isOn ? { r: 0.02, g: 0.08, b: 0.05 } : { r: 0.7, g: 0.7, b: 0.75 }, 1);
    sw.appendChild(knob);
    tr.appendChild(sw);
    return tr;
  }

  card5.appendChild(makeCleanToggle(
    "Public Profile Discovery",
    "Allow conservatory mentors & vocal peers to discover your public profile, vocal fach, and top takes.",
    true
  ));
  card5.appendChild(makeCleanToggle(
    "Live Singing Activity Sharing",
    "Broadcast real-time Solfeggio scale accuracy to the conservatory community feed.",
    false
  ));
  card5.appendChild(makeCleanToggle(
    "Gemini AI Biometric Audio Calibration Consent",
    "Allow anonymized pitch stem telemetry to personalize acoustic drill recommendations.",
    true
  ));

  // Active Sessions Row
  const sesRow = figma.createFrame();
  sesRow.layoutMode = "HORIZONTAL";
  sesRow.primaryAxisSizingMode = "FIXED";
  sesRow.counterAxisSizingMode = "FIXED";
  sesRow.resize(970, 50);
  sesRow.paddingLeft = 14; sesRow.paddingRight = 14;
  sesRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  sesRow.counterAxisAlignItems = "CENTER";
  sesRow.cornerRadius = 6;
  sesRow.fills = solid(C.glassElevated, 0.6);
  sesRow.strokes = solid(C.glassBorder, 0.4); sesRow.strokeWeight = 1;

  const sesL = figma.createFrame();
  sesL.layoutMode = "HORIZONTAL"; sesL.itemSpacing = 8; sesL.counterAxisAlignItems = "CENTER"; sesL.fills = [];
  sesL.appendChild(createSvgIcon("home", "#8B9DAF", 14));
  const sTxt = figma.createFrame(); sTxt.layoutMode = "VERTICAL"; sTxt.itemSpacing = 1; sTxt.fills = [];
  sTxt.appendChild(createText("Active Studio Sessions", 11, "Bold", C.textWhite));
  sTxt.appendChild(createText("Chrome DAW Studio • Jakarta, ID • Active Now (This device)", 9, "Regular", C.textZinc400));
  sesL.appendChild(sTxt);
  sesRow.appendChild(sesL);

  const btnLogOutAll = figma.createFrame();
  btnLogOutAll.name = "Security/Log Out Others";
  btnLogOutAll.layoutMode = "HORIZONTAL";
  btnLogOutAll.paddingLeft = 12; btnLogOutAll.paddingRight = 12; btnLogOutAll.paddingTop = 5; btnLogOutAll.paddingBottom = 5;
  btnLogOutAll.cornerRadius = 5;
  btnLogOutAll.fills = solid({ r: 0.20, g: 0.04, b: 0.06 }, 0.95);
  btnLogOutAll.strokes = solid(C.rose, 0.5); btnLogOutAll.strokeWeight = 1;
  btnLogOutAll.appendChild(createText("Log Out All Other Devices", 10, "Bold", C.rose));
  sesRow.appendChild(btnLogOutAll);
  card5.appendChild(sesRow);

  mainCol.appendChild(card5);

  // -----------------------------------------------------------------------
  // CARD 6: VOCALSENSE PRO PLAN, CLOUD STORAGE & INVOICES
  // -----------------------------------------------------------------------
  const card6 = makeSectionCard("VocalSense Pro Membership, Cloud Storage & Tax Invoices", "sparkle", "PRO TIER ACTIVE", "mint");

  // Plan row
  const planRow = figma.createFrame();
  planRow.layoutMode = "HORIZONTAL";
  planRow.primaryAxisSizingMode = "FIXED";
  planRow.counterAxisSizingMode = "AUTO";
  planRow.resize(970, 44);
  planRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  planRow.counterAxisAlignItems = "CENTER";
  planRow.fills = [];

  const plL = figma.createFrame();
  plL.layoutMode = "HORIZONTAL"; plL.itemSpacing = 8; plL.counterAxisAlignItems = "BASELINE"; plL.fills = [];
  plL.appendChild(createText("Rp 79.000", 22, "Bold", C.textWhite));
  plL.appendChild(createText("/ month (Pro Vocalist Tier • Auto-renews 14 Nov 2026)", 11, "Medium", C.textZinc400));
  planRow.appendChild(plL);

  const btnUp = figma.createFrame();
  btnUp.name = "Billing/Upgrade to Annual Pro";
  btnUp.layoutMode = "HORIZONTAL";
  btnUp.paddingLeft = 14; btnUp.paddingRight = 14; btnUp.paddingTop = 6; btnUp.paddingBottom = 6;
  btnUp.cornerRadius = 6;
  btnUp.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0.0, color: { r: C.mint.r, g: C.mint.g, b: C.mint.b, a: 1 } },
      { position: 1.0, color: { r: C.emerald.r, g: C.emerald.g, b: C.emerald.b, a: 1 } }
    ]
  }];
  btnUp.strokes = solid(C.mint, 0.9); btnUp.strokeWeight = 1;
  btnUp.appendChild(createText("Upgrade Annual (Save 20%) ↗", 10, "Bold", { r: 0.02, g: 0.08, b: 0.05 }));
  planRow.appendChild(btnUp);
  card6.appendChild(planRow);

  // Cloud Storage Bar
  const stBox = figma.createFrame();
  stBox.layoutMode = "VERTICAL";
  stBox.primaryAxisSizingMode = "FIXED";
  stBox.counterAxisSizingMode = "FIXED";
  stBox.resize(970, 52);
  stBox.itemSpacing = 4;
  stBox.fills = [];

  const stH = figma.createFrame();
  stH.layoutMode = "HORIZONTAL"; stH.resize(970, 16); stH.primaryAxisAlignItems = "SPACE_BETWEEN"; stH.fills = [];
  stH.appendChild(createText("Cloud Audio Storage (48kHz FLAC Stems & Diagnostic Reports)", 10, "Medium", C.textZinc300));
  stH.appendChild(createText("4.2 GB / 10 GB (42% Used)", 10, "Bold", C.mint));
  stBox.appendChild(stH);

  const stTrk = figma.createFrame();
  stTrk.resize(970, 8); stTrk.cornerRadius = 4; stTrk.fills = solid({ r: 0.12, g: 0.15, b: 0.20 }, 1);
  const stFil = figma.createFrame();
  stFil.resize(Math.round(970 * 0.42), 8); stFil.cornerRadius = 4; stFil.fills = solid(C.mint, 1);
  stTrk.appendChild(stFil);
  stBox.appendChild(stTrk);
  card6.appendChild(stBox);

  // Linked Payment
  const pmBox = figma.createFrame();
  pmBox.layoutMode = "HORIZONTAL";
  pmBox.primaryAxisSizingMode = "FIXED";
  pmBox.counterAxisSizingMode = "FIXED";
  pmBox.resize(970, 46);
  pmBox.paddingLeft = 14; pmBox.paddingRight = 14;
  pmBox.primaryAxisAlignItems = "SPACE_BETWEEN";
  pmBox.counterAxisAlignItems = "CENTER";
  pmBox.cornerRadius = 6;
  pmBox.fills = solid(C.forestBase, 0.7);
  pmBox.strokes = solid(C.mint, 0.4); pmBox.strokeWeight = 1;

  const pmL = figma.createFrame();
  pmL.layoutMode = "HORIZONTAL"; pmL.itemSpacing = 8; pmL.counterAxisAlignItems = "CENTER"; pmL.fills = [];
  pmL.appendChild(createSvgIcon("shield", "#00F5A0", 14));
  const pmTxt = figma.createFrame(); pmTxt.layoutMode = "VERTICAL"; pmTxt.itemSpacing = 1; pmTxt.fills = [];
  pmTxt.appendChild(createText("GoPay Auto-Debit • 0812-****-8829", 11, "Bold", C.textWhite));
  pmTxt.appendChild(createText("Primary linked payment method via Midtrans SNAP gateway", 9, "Regular", C.textZinc400));
  pmL.appendChild(pmTxt);
  pmBox.appendChild(pmL);

  const btnEditPay = figma.createFrame();
  btnEditPay.name = "Billing/Edit Payment";
  btnEditPay.layoutMode = "HORIZONTAL";
  btnEditPay.paddingLeft = 10; btnEditPay.paddingRight = 10; btnEditPay.paddingTop = 4; btnEditPay.paddingBottom = 4;
  btnEditPay.cornerRadius = 5;
  btnEditPay.fills = solid(C.glassElevated, 1);
  btnEditPay.strokes = solid(C.glassBorder, 0.6); btnEditPay.strokeWeight = 1;
  btnEditPay.appendChild(createText("Change Method", 10, "Medium", C.textZinc300));
  pmBox.appendChild(btnEditPay);
  card6.appendChild(pmBox);

  // Invoices Table Header
  const invHead = figma.createFrame();
  invHead.layoutMode = "HORIZONTAL"; invHead.resize(970, 20); invHead.primaryAxisAlignItems = "SPACE_BETWEEN"; invHead.counterAxisAlignItems = "CENTER"; invHead.fills = [];
  invHead.appendChild(createText("Official Tax Invoices (e-Faktur PPN 11%)", 11, "Bold", C.textWhite));
  invHead.appendChild(createBadge("TAX COMPLIANT", "mint", 7));
  card6.appendChild(invHead);

  function makeInvRow(invNo, dateStr, amount, status) {
    const row = figma.createFrame();
    row.name = "Invoice/" + invNo;
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "FIXED";
    row.resize(970, 38);
    row.paddingLeft = 12; row.paddingRight = 12;
    row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER";
    row.cornerRadius = 6;
    row.fills = solid(C.glassElevated, 0.5);
    row.strokes = solid(C.glassBorder, 0.35); row.strokeWeight = 1;

    const rL = figma.createFrame();
    rL.layoutMode = "HORIZONTAL"; rL.itemSpacing = 8; rL.counterAxisAlignItems = "CENTER"; rL.fills = [];
    rL.appendChild(createText(invNo, 10, "Bold", C.textWhite));
    rL.appendChild(createBadge(status, "mint", 7));
    rL.appendChild(createText("• " + dateStr, 9, "Regular", C.textZinc400));
    row.appendChild(rL);

    const rR = figma.createFrame();
    rR.layoutMode = "HORIZONTAL"; rR.itemSpacing = 10; rR.counterAxisAlignItems = "CENTER"; rR.fills = [];
    rR.appendChild(createText(amount, 10, "Bold", C.textWhite));

    // PDF Download Button (Zero Cutoff!)
    const btnPdf = figma.createFrame();
    btnPdf.name = "Button/Download " + invNo;
    btnPdf.layoutMode = "HORIZONTAL";
    btnPdf.primaryAxisSizingMode = "FIXED";
    btnPdf.counterAxisSizingMode = "FIXED";
    btnPdf.resize(68, 26);
    btnPdf.cornerRadius = 4;
    btnPdf.fills = solid(C.glassElevated, 1);
    btnPdf.strokes = solid(C.glassBorder, 0.7); btnPdf.strokeWeight = 1;
    btnPdf.primaryAxisAlignItems = "CENTER";
    btnPdf.counterAxisAlignItems = "CENTER";
    btnPdf.appendChild(createText("PDF", 9, "Bold", C.mint));
    rR.appendChild(btnPdf);

    row.appendChild(rR);
    return row;
  }

  card6.appendChild(makeInvRow("INV-2026-10-8829", "14 Oct 2026", "Rp 87.690", "PAID"));
  card6.appendChild(makeInvRow("INV-2026-09-7712", "14 Sep 2026", "Rp 87.690", "PAID"));
  card6.appendChild(makeInvRow("INV-2026-08-6601", "14 Aug 2026", "Rp 87.690", "PAID"));

  const dlAll = figma.createFrame();
  dlAll.layoutMode = "HORIZONTAL"; dlAll.resize(970, 20); dlAll.primaryAxisAlignItems = "MAX"; dlAll.counterAxisAlignItems = "CENTER"; dlAll.fills = [];
  dlAll.appendChild(createText("Download All Invoices (.ZIP) ↗", 10, "Bold", C.mint));
  card6.appendChild(dlAll);

  mainCol.appendChild(card6);

  root.appendChild(mainCol);

  return root;
}

    function buildMidtransModalScreen(originX = 0, originY = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 06B. Midtrans Snap Payment Gateway Modal";
  root.resize(1440, 960);
  root.x = originX;
  root.y = originY;
  root.clipsContent = true;

  // Darkened Blur Backdrop Overlay (Simulates real modal backdrop in Figma!)
  root.fills = solid({ r: 0.02, g: 0.025, b: 0.035 }, 0.88);

  const grid = figma.createFrame();
  grid.resize(1440, 960); grid.fills = []; grid.strokes = solid(C.gridLine, 0.03);
  grid.strokeWeight = 1;
  root.appendChild(grid);

  // ---------------------------------------------------------------------------
  // CENTERED MIDTRANS POPUP WINDOW (780 x 860 px)
  // ---------------------------------------------------------------------------
  const modal = figma.createFrame();
  modal.name = "Midtrans Snap Modal Window";
  modal.layoutMode = "VERTICAL";
  modal.resize(780, 860);
  modal.x = (1440 - 780) / 2;
  modal.y = (960 - 860) / 2;
  modal.paddingLeft = 32; modal.paddingRight = 32; modal.paddingTop = 24; modal.paddingBottom = 26;
  modal.itemSpacing = 16;
  modal.cornerRadius = 18;
  modal.clipsContent = false;
  applyCard1Glass(modal);
  root.appendChild(modal);

  // 1. Modal Topbar: Brand, SSL Badge, and Close Button
  const mHead = figma.createFrame();
  mHead.layoutMode = "HORIZONTAL"; mHead.resize(716, 36);
  mHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mHead.counterAxisAlignItems = "CENTER";
  mHead.fills = [];

  const hLeft = figma.createFrame();
  hLeft.layoutMode = "HORIZONTAL";
  hLeft.primaryAxisSizingMode = "AUTO";
  hLeft.counterAxisSizingMode = "AUTO";
  hLeft.itemSpacing = 10;
  hLeft.counterAxisAlignItems = "CENTER";
  hLeft.fills = [];
  hLeft.appendChild(createSvgIcon("sparkle", "#00F5A0", 18));

  const hTitles = figma.createFrame();
  hTitles.layoutMode = "VERTICAL";
  hTitles.primaryAxisSizingMode = "AUTO";
  hTitles.counterAxisSizingMode = "AUTO";
  hTitles.itemSpacing = 2;
  hTitles.fills = [];
  hTitles.appendChild(createText("Midtrans Snap Payment Gateway (UC-21)", 14, "Bold", C.textWhite));
  hTitles.appendChild(createText("Bank Indonesia Licensed Payment Infrastructure", 10, "Regular", C.textZinc400));
  hLeft.appendChild(hTitles);
  mHead.appendChild(hLeft);

  const hRight = figma.createFrame();
  hRight.layoutMode = "HORIZONTAL";
  hRight.primaryAxisSizingMode = "AUTO";
  hRight.counterAxisSizingMode = "AUTO";
  hRight.itemSpacing = 10;
  hRight.counterAxisAlignItems = "CENTER";
  hRight.fills = [];
  hRight.appendChild(createBadge("256-BIT SSL SECURE", "mint", 9));

  // Close X Button
  const closeBtn = figma.createFrame();
  closeBtn.name = "Button/Close Modal";
  closeBtn.layoutMode = "HORIZONTAL";
  closeBtn.primaryAxisSizingMode = "AUTO";
  closeBtn.counterAxisSizingMode = "AUTO";
  closeBtn.itemSpacing = 4;
  closeBtn.counterAxisAlignItems = "CENTER";
  closeBtn.paddingLeft = 12; closeBtn.paddingRight = 12; closeBtn.paddingTop = 6; closeBtn.paddingBottom = 6;
  closeBtn.cornerRadius = 6; closeBtn.fills = solid(C.glassElevated, 1);
  closeBtn.strokes = solid(C.glassBorder, 0.7); closeBtn.strokeWeight = 1;
  closeBtn.appendChild(createText("Close", 11, "Bold", C.rose));
  hRight.appendChild(closeBtn);

  mHead.appendChild(hRight);
  modal.appendChild(mHead);

  // 2. Order Summary Card (716 x 104 px)
  const sumCard = figma.createFrame();
  sumCard.name = "Order Summary Card";
  sumCard.layoutMode = "VERTICAL";
  sumCard.resize(716, 104);
  sumCard.paddingLeft = 20; sumCard.paddingRight = 20; sumCard.paddingTop = 14; sumCard.paddingBottom = 14;
  sumCard.itemSpacing = 8;
  sumCard.cornerRadius = 10;
  sumCard.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.95);
  sumCard.strokes = solid(C.glassBorder, 0.6); sumCard.strokeWeight = 1;

  const sRow1 = figma.createFrame();
  sRow1.layoutMode = "HORIZONTAL"; sRow1.resize(676, 20); sRow1.primaryAxisAlignItems = "SPACE_BETWEEN"; sRow1.counterAxisAlignItems = "CENTER"; sRow1.fills = [];
  sRow1.appendChild(createText("VocalSense Pro Tier — 1 Month Vocalist Access", 12, "Bold", C.textWhite));
  sRow1.appendChild(createText("Rp 79.000", 12, "Medium", C.textZinc300));
  sumCard.appendChild(sRow1);

  const sRow2 = figma.createFrame();
  sRow2.layoutMode = "HORIZONTAL"; sRow2.resize(676, 16); sRow2.primaryAxisAlignItems = "SPACE_BETWEEN"; sRow2.counterAxisAlignItems = "CENTER"; sRow2.fills = [];
  sRow2.appendChild(createText("Indonesian VAT / PPN (11%)", 11, "Regular", C.textZinc400));
  sRow2.appendChild(createText("Rp 8.690", 11, "Regular", C.textZinc400));
  sumCard.appendChild(sRow2);

  const sDiv = figma.createLine(); sDiv.resize(676, 0); sDiv.strokes = solid(C.glassBorder, 0.15); sDiv.strokeWeight = 1;
  sumCard.appendChild(sDiv);

  const sRow3 = figma.createFrame();
  sRow3.layoutMode = "HORIZONTAL"; sRow3.resize(676, 22); sRow3.primaryAxisAlignItems = "SPACE_BETWEEN"; sRow3.counterAxisAlignItems = "CENTER"; sRow3.fills = [];
  sRow3.appendChild(createText("TOTAL PAYMENT (IDR)", 12, "Bold", C.mint));
  sRow3.appendChild(createText("Rp 87.690", 16, "Bold", C.mint));
  sumCard.appendChild(sRow3);

  modal.appendChild(sumCard);

  // 3. Payment Method Tabs (716 x 40 px) — ZERO CLIPPING!
  const tabRow = figma.createFrame();
  tabRow.name = "Payment Method Tabs";
  tabRow.layoutMode = "HORIZONTAL";
  tabRow.resize(716, 40);
  tabRow.itemSpacing = 8;
  tabRow.fills = [];

  function makeMethodTab(label, active = false) {
    const t = figma.createFrame();
    t.layoutMode = "HORIZONTAL";
    t.primaryAxisSizingMode = "FIXED";
    t.counterAxisSizingMode = "FIXED";
    t.resize(173, 40);
    t.primaryAxisAlignItems = "CENTER";
    t.counterAxisAlignItems = "CENTER";
    t.cornerRadius = 8;
    t.fills = solid(active ? C.forestBase : C.glassElevated, active ? 1 : 0.7);
    t.strokes = solid(active ? C.mint : C.glassBorder, active ? 0.9 : 0.4);
    t.strokeWeight = 1;
    t.appendChild(createText(label, 11, active ? "Bold" : "Medium", active ? C.mint : C.textZinc300));
    return t;
  }
  tabRow.appendChild(makeMethodTab("● QRIS Instant", true));
  tabRow.appendChild(makeMethodTab("BCA Virtual Account", false));
  tabRow.appendChild(makeMethodTab("Mandiri Bill", false));
  tabRow.appendChild(makeMethodTab("GoPay / OVO", false));
  modal.appendChild(tabRow);

  // 4. Dynamic QRIS Code Showcase Area (716 x 480 px)
  const qrisArea = figma.createFrame();
  qrisArea.name = "QRIS Showcase Area";
  qrisArea.layoutMode = "HORIZONTAL";
  qrisArea.resize(716, 480);
  qrisArea.itemSpacing = 24;
  qrisArea.fills = [];

  // Left: White QR Code Plate (280 x 460)
  const qrPlate = figma.createFrame();
  qrPlate.name = "QR Code Plate";
  qrPlate.layoutMode = "VERTICAL";
  qrPlate.resize(280, 460);
  qrPlate.paddingLeft = 18; qrPlate.paddingRight = 18; qrPlate.paddingTop = 18; qrPlate.paddingBottom = 18;
  qrPlate.itemSpacing = 12;
  qrPlate.primaryAxisAlignItems = "CENTER";
  qrPlate.counterAxisAlignItems = "CENTER";
  qrPlate.cornerRadius = 14;
  qrPlate.fills = solid(C.textWhite, 1);
  qrPlate.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.35 },
    offset: { x: 0, y: 12 },
    radius: 24,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
    showShadowBehindNode: false
  }];

  const qrTop = figma.createFrame();
  qrTop.layoutMode = "HORIZONTAL"; qrTop.resize(244, 24); qrTop.primaryAxisAlignItems = "SPACE_BETWEEN"; qrTop.counterAxisAlignItems = "CENTER"; qrTop.fills = [];
  qrTop.appendChild(createText("QRIS", 15, "Bold", { r: 0.05, g: 0.05, b: 0.05 }));
  qrTop.appendChild(createText("GPN", 12, "Bold", { r: 0.85, g: 0.10, b: 0.15 }));
  qrPlate.appendChild(qrTop);

  // Authentic QR Pattern Box (240 x 240)
  const qrBox = figma.createFrame();
  qrBox.resize(240, 240); qrBox.cornerRadius = 8; qrBox.fills = solid({ r: 0.96, g: 0.97, b: 0.99 }, 1);
  qrBox.strokes = solid({ r: 0.85, g: 0.88, b: 0.92 }, 1); qrBox.strokeWeight = 1;

  function makeFinder(x, y) {
    const f = figma.createFrame();
    f.resize(54, 54); f.x = x; f.y = y; f.cornerRadius = 6;
    f.fills = solid({ r: 0.05, g: 0.05, b: 0.05 }, 1);
    const inner = figma.createFrame(); inner.resize(36, 36); inner.x = 9; inner.y = 9; inner.cornerRadius = 4; inner.fills = solid(C.textWhite, 1);
    const dot = figma.createFrame(); dot.resize(18, 18); dot.x = 9; dot.y = 9; dot.cornerRadius = 2; dot.fills = solid(C.mint, 1);
    inner.appendChild(dot); f.appendChild(inner);
    return f;
  }
  qrBox.appendChild(makeFinder(12, 12));
  qrBox.appendChild(makeFinder(174, 12));
  qrBox.appendChild(makeFinder(12, 174));

  // Dense QR Modules Grid simulation
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if ((r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3) || (r === 4 && c === 4)) continue;
      const mod = figma.createFrame();
      mod.resize(8, 8);
      mod.x = 40 + c * 18;
      mod.y = 40 + r * 18;
      mod.cornerRadius = 1.5;
      mod.fills = solid({ r: 0.10, g: 0.12, b: 0.15 }, (r + c) % 2 === 0 ? 0.9 : 0.2);
      qrBox.appendChild(mod);
    }
  }

  // Middle VocalSense sparkle emblem
  const qrWatermark = figma.createFrame();
  qrWatermark.resize(40, 40); qrWatermark.x = 100; qrWatermark.y = 100; qrWatermark.cornerRadius = 8;
  qrWatermark.fills = solid(C.forestBase, 1); qrWatermark.strokes = solid(C.mint, 0.9); qrWatermark.strokeWeight = 1.5;
  qrWatermark.primaryAxisAlignItems = "CENTER"; qrWatermark.counterAxisAlignItems = "CENTER";
  qrWatermark.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  qrBox.appendChild(qrWatermark);
  qrPlate.appendChild(qrBox);

  // Merchant info
  qrPlate.appendChild(createText("NMID: ID1026884920482", 10, "Bold", { r: 0.35, g: 0.40, b: 0.45 }));
  qrPlate.appendChild(createText("VocalSense Conservatory Indonesia", 11, "Bold", { r: 0.08, g: 0.10, b: 0.14 }));
  qrPlate.appendChild(createText("Verified Midtrans Merchant • Dynamic QRIS", 9, "Regular", { r: 0.45, g: 0.50, b: 0.55 }));
  qrisArea.appendChild(qrPlate);

  // Right: Countdown & Instructions (412 x 460)
  const qRight = figma.createFrame();
  qRight.name = "Instructions Column";
  qRight.layoutMode = "VERTICAL";
  qRight.resize(412, 460);
  qRight.itemSpacing = 14;
  qRight.fills = [];

  // Countdown timer card
  const timeBox = figma.createFrame();
  timeBox.layoutMode = "HORIZONTAL"; timeBox.resize(412, 46);
  timeBox.primaryAxisAlignItems = "SPACE_BETWEEN"; timeBox.counterAxisAlignItems = "CENTER";
  timeBox.paddingLeft = 16; timeBox.paddingRight = 16;
  timeBox.cornerRadius = 10;
  timeBox.fills = solid({ r: 0.18, g: 0.10, b: 0.02 }, 0.95);
  timeBox.strokes = solid(C.amber, 0.6); timeBox.strokeWeight = 1;

  const tL = figma.createFrame(); tL.layoutMode = "HORIZONTAL"; tL.itemSpacing = 8; tL.counterAxisAlignItems = "CENTER"; tL.fills = [];
  tL.appendChild(createSvgIcon("sparkle", "#F59E0B", 16));
  tL.appendChild(createText("Sisa Waktu Pembayaran:", 11, "Medium", C.textZinc300));
  timeBox.appendChild(tL);
  timeBox.appendChild(createText("14:59", 16, "Bold", C.amber));
  qRight.appendChild(timeBox);

  // 4 Steps instructions (Clean multi-line auto-layout, ZERO CLIPPING!)
  const stepsCol = figma.createFrame();
  stepsCol.name = "Instruction Steps";
  stepsCol.layoutMode = "VERTICAL";
  stepsCol.itemSpacing = 10;
  stepsCol.fills = [];
  stepsCol.primaryAxisSizingMode = "AUTO";
  stepsCol.counterAxisSizingMode = "AUTO";

  function makeInst(num, title, sub) {
    const r = figma.createFrame();
    r.name = "Step " + num;
    r.layoutMode = "HORIZONTAL";
    r.primaryAxisSizingMode = "FIXED";
    r.counterAxisSizingMode = "AUTO";
    r.resize(412, 54);
    r.paddingLeft = 12;
    r.paddingRight = 12;
    r.paddingTop = 7;
    r.paddingBottom = 7;
    r.itemSpacing = 12;
    r.counterAxisAlignItems = "CENTER";
    r.cornerRadius = 8;
    r.fills = solid(C.glassElevated, 0.7);
    r.strokes = solid(C.glassBorder, 0.4);
    r.strokeWeight = 1;

    const numBadge = figma.createFrame();
    numBadge.resize(24, 24);
    numBadge.cornerRadius = 6;
    numBadge.fills = solid(C.forestBase, 1);
    numBadge.strokes = solid(C.mint, 0.6);
    numBadge.strokeWeight = 1;
    numBadge.layoutMode = "HORIZONTAL";
    numBadge.primaryAxisAlignItems = "CENTER";
    numBadge.counterAxisAlignItems = "CENTER";
    numBadge.appendChild(createText(String(num), 11, "Bold", C.mint));
    r.appendChild(numBadge);

    const tc = figma.createFrame();
    tc.layoutMode = "VERTICAL";
    tc.itemSpacing = 2;
    tc.fills = [];
    tc.primaryAxisSizingMode = "AUTO";
    tc.counterAxisSizingMode = "FIXED";
    tc.resize(350, 36);
    tc.layoutGrow = 1;
    tc.appendChild(createText(title, 11, "Bold", C.textWhite));
    tc.appendChild(createParagraph(sub, 350, 10, "Regular", C.textZinc400, 15));
    r.appendChild(tc);
    return r;
  }

  stepsCol.appendChild(makeInst(1, "Buka Aplikasi Mobile Banking / E-Wallet", "BCA Mobile, Livin Mandiri, GoPay, OVO, Dana, ShopeePay"));
  stepsCol.appendChild(makeInst(2, "Pilih Menu 'Scan QRIS'", "Arahkan kamera ponsel Anda ke kode QRIS di samping"));
  stepsCol.appendChild(makeInst(3, "Periksa Jumlah Tagihan & Penerima", "Pastikan total tagihan tepat Rp 87.690 untuk VocalSense"));
  stepsCol.appendChild(makeInst(4, "Konfirmasi Pembayaran & Selesai", "Akun Pro Vocalist akan aktif otomatis dalam hitungan detik"));
  qRight.appendChild(stepsCol);

  // E-Wallet badges row
  const logRow = figma.createFrame();
  logRow.layoutMode = "HORIZONTAL"; logRow.itemSpacing = 6; logRow.fills = [];
  logRow.appendChild(createBadge("GOPAY", "mint", 9));
  logRow.appendChild(createBadge("OVO", "neutral", 9));
  logRow.appendChild(createBadge("DANA", "neutral", 9));
  logRow.appendChild(createBadge("SHOPEEPAY", "neutral", 9));
  logRow.appendChild(createBadge("BCA MOBILE", "neutral", 9));
  qRight.appendChild(logRow);

  qrisArea.appendChild(qRight);
  modal.appendChild(qrisArea);

  // 5. Action Buttons (Check Status & Cancel)
  const actRow = figma.createFrame();
  actRow.name = "Modal Action Row";
  actRow.layoutMode = "HORIZONTAL";
  actRow.resize(716, 46);
  actRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  actRow.counterAxisAlignItems = "CENTER";
  actRow.fills = [];

  const btnCheck = createActionButton("Saya Sudah Bayar (Check Status) ↗", "arrow-up-right", "radiant", 450);
  btnCheck.name = "Button/Saya Sudah Bayar";
  actRow.appendChild(btnCheck);

  const btnCancel = createActionButton("Batal Transaksi", null, "secondary", 250);
  btnCancel.name = "Button/Batal Transaksi";
  actRow.appendChild(btnCancel);

  modal.appendChild(actRow);

  return root;
}

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

    function buildDocumentsScreen(ox = 0, oy = 0) {
  const root = figma.createFrame();
  root.name = "VocalSense AI — 08. Vocal Reports & Document Archive";
  root.resize(1440, 960);
  root.x = ox;
  root.y = oy;
  root.clipsContent = true;

  // Dark studio gradient background
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
  logoSquircle.cornerRadius = 12;
  logoSquircle.fills = solid(C.forestBase, 1);
  logoSquircle.strokes = solid(C.mint, 0.8);
  logoSquircle.strokeWeight = 1.5;
  logoSquircle.primaryAxisAlignItems = "CENTER";
  logoSquircle.counterAxisAlignItems = "CENTER";
  logoSquircle.appendChild(createSvgIcon("sparkle", "#00F5A0", 20));
  sidebar.appendChild(logoSquircle);

  // Middle: 4 Nav items (DOCUMENT ICON ACTIVE in emerald squircle!)
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
  const btnNavDoc = createIconButton("document", "#00F5A0", 42, 18, true); // Active for Document Archive!
  btnNavDoc.name = "Nav/Documents";

  navGroup.appendChild(btnNavHome);
  navGroup.appendChild(btnNavWave);
  navGroup.appendChild(btnNavChart);
  navGroup.appendChild(btnNavDoc);
  sidebar.appendChild(navGroup);

  // Bottom: Settings + ER Profile avatar
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
  avatarFrame.resize(36, 36);
  avatarFrame.cornerRadius = 18;
  avatarFrame.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  avatarFrame.strokes = solid(C.glassBorder, 1);
  avatarFrame.strokeWeight = 1.5;
  avatarFrame.primaryAxisAlignItems = "CENTER";
  avatarFrame.counterAxisAlignItems = "CENTER";
  avatarFrame.appendChild(createText("ER", 11, "Bold", C.textWhite));
  bottomGroup.appendChild(avatarFrame);

  sidebar.appendChild(bottomGroup);
  root.appendChild(sidebar);

  // -----------------------------------------------------------------------
  // MAIN WORKSPACE CONTAINER (1368 x 960) AT x=72
  // -----------------------------------------------------------------------
  const container = figma.createFrame();
  container.name = "Documents Workspace Container";
  container.layoutMode = "VERTICAL";
  container.resize(1368, 960);
  container.x = 72;
  container.y = 0;
  container.paddingLeft = 28;
  container.paddingRight = 28;
  container.paddingTop = 16;
  container.paddingBottom = 20;
  container.itemSpacing = 14;
  container.fills = [];
  container.clipsContent = false;
  root.appendChild(container);

  // -----------------------------------------------------------------------
  // 1. TOP DOCUMENT ARCHIVE TOOLBAR (1312 x 46 px)
  // -----------------------------------------------------------------------
  const topBar = figma.createFrame();
  topBar.name = "Archive TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.resize(1312, 46);
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

  const backBtn = figma.createFrame();
  backBtn.name = "Button/Back to Studio";
  backBtn.layoutMode = "HORIZONTAL";
  backBtn.primaryAxisSizingMode = "AUTO";
  backBtn.counterAxisSizingMode = "AUTO";
  backBtn.itemSpacing = 6;
  backBtn.counterAxisAlignItems = "CENTER";
  backBtn.paddingLeft = 12; backBtn.paddingRight = 12; backBtn.paddingTop = 6; backBtn.paddingBottom = 6;
  backBtn.cornerRadius = 8; backBtn.fills = solid(C.glassElevated, 1);
  backBtn.strokes = solid(C.glassBorder, 1); backBtn.strokeWeight = 1;
  backBtn.appendChild(createText("← DAW Studio", 11, "Medium", C.textZinc300));
  tbLeft.appendChild(backBtn);

  const titleCol = figma.createFrame();
  titleCol.layoutMode = "VERTICAL";
  titleCol.primaryAxisSizingMode = "AUTO";
  titleCol.counterAxisSizingMode = "AUTO";
  titleCol.itemSpacing = 1;
  titleCol.fills = [];
  titleCol.appendChild(createText("Vocal Diagnostic Reports & Document Archive", 15, "Bold", C.textWhite));
  titleCol.appendChild(createText("Maintenance repository of 48 singing evaluations, certified conservatory PDF sheets, and audio stems.", 11, "Regular", C.textZinc400));
  tbLeft.appendChild(titleCol);
  topBar.appendChild(tbLeft);

  const tbRight = figma.createFrame();
  tbRight.layoutMode = "HORIZONTAL";
  tbRight.primaryAxisSizingMode = "AUTO";
  tbRight.counterAxisSizingMode = "AUTO";
  tbRight.itemSpacing = 10;
  tbRight.counterAxisAlignItems = "CENTER";
  tbRight.fills = [];

  // Search input
  const searchInput = figma.createFrame();
  searchInput.name = "Search Reports Input";
  searchInput.layoutMode = "HORIZONTAL";
  searchInput.resize(220, 34);
  searchInput.paddingLeft = 10; searchInput.paddingRight = 10;
  searchInput.itemSpacing = 8;
  searchInput.counterAxisAlignItems = "CENTER";
  searchInput.cornerRadius = 8;
  searchInput.fills = solid({ r: 0.08, g: 0.10, b: 0.13 }, 1);
  searchInput.strokes = solid(C.glassBorder, 0.7);
  searchInput.strokeWeight = 1;
  searchInput.appendChild(createSvgIcon("search", "#8B9DAF", 13));
  searchInput.appendChild(createText("Filter takes & songs...", 10, "Regular", C.textZinc500));
  tbRight.appendChild(searchInput);

  const btnCompare = createActionButton("Compare Takes (0/2)", "refresh", "secondary", null, "left", 34);
  btnCompare.name = "Archive/Compare Takes";
  tbRight.appendChild(btnCompare);

  const btnBatchPdf = createActionButton("Batch Export PDFs", "arrow-up-right", "radiant", null, "right", 34);
  btnBatchPdf.name = "Archive/Batch Export PDFs";
  tbRight.appendChild(btnBatchPdf);

  topBar.appendChild(tbRight);
  container.appendChild(topBar);

  // -----------------------------------------------------------------------
  // 2. ARCHIVE TELEMETRY & MAINTENANCE STRIP (1312 x 70 px)
  // -----------------------------------------------------------------------
  const telStrip = figma.createFrame();
  telStrip.name = "Archive Telemetry Strip";
  telStrip.layoutMode = "HORIZONTAL";
  telStrip.primaryAxisSizingMode = "FIXED";
  telStrip.counterAxisSizingMode = "FIXED";
  telStrip.resize(1312, 70);
  telStrip.itemSpacing = 14;
  telStrip.fills = [];
  telStrip.clipsContent = false;

  function makeTelCard(title, val, sub, badgeTxt, badgeCol, width = 317) {
    const c = figma.createFrame();
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(width, 70);
    c.paddingLeft = 16; c.paddingRight = 16; c.paddingTop = 12; c.paddingBottom = 12;
    c.primaryAxisAlignItems = "SPACE_BETWEEN";
    c.counterAxisAlignItems = "CENTER";
    c.cornerRadius = 10;
    c.fills = solid(C.glassElevated, 0.85);
    c.strokes = solid(C.glassBorder, 0.55);
    c.strokeWeight = 1;

    const cLeft = figma.createFrame();
    cLeft.layoutMode = "VERTICAL";
    cLeft.primaryAxisSizingMode = "AUTO";
    cLeft.counterAxisSizingMode = "AUTO";
    cLeft.itemSpacing = 4;
    cLeft.counterAxisAlignItems = "MIN";
    cLeft.primaryAxisAlignItems = "CENTER";
    cLeft.fills = [];
    cLeft.appendChild(createText(title, 10, "Bold", C.textZinc400));
    
    const vRow = figma.createFrame();
    vRow.layoutMode = "HORIZONTAL";
    vRow.primaryAxisSizingMode = "AUTO";
    vRow.counterAxisSizingMode = "AUTO";
    vRow.itemSpacing = 8;
    vRow.counterAxisAlignItems = "CENTER";
    vRow.fills = [];
    vRow.appendChild(createText(val, 17, "Bold", C.textWhite));
    vRow.appendChild(createText(sub, 10, "Regular", C.textZinc500));
    cLeft.appendChild(vRow);
    c.appendChild(cLeft);

    c.appendChild(createBadge(badgeTxt, badgeCol, 9));
    return c;
  }

  telStrip.appendChild(makeTelCard("TOTAL DIAGNOSTIC TAKES", "48 Takes", "• 100% YIN DSP Analyzed", "+4 This Week", "mint"));
  telStrip.appendChild(makeTelCard("CERTIFIED CONSERVATORY SHEETS", "12 Sheets", "• Biometric Sealed", "GRADE A+", "mint"));
  telStrip.appendChild(makeTelCard("AVERAGE INTONATION LOCK", "94.2%", "• Peak: 98.0% (Take 04)", "VIRTUOSO", "mint"));
  telStrip.appendChild(makeTelCard("CLOUD AUDIO ARCHIVE STORAGE", "4.2 GB", "of 10.0 GB Limit", "42% USED", "neutral"));
  container.appendChild(telStrip);

  // -----------------------------------------------------------------------
  // 3. MAIN REPOSITORY: 2-COLUMN MANAGEMENT SUITE (1312 x 800 px)
  // -----------------------------------------------------------------------
  const gridRow = figma.createFrame();
  gridRow.name = "Repository Grid Row";
  gridRow.layoutMode = "HORIZONTAL";
  gridRow.resize(1312, 800);
  gridRow.itemSpacing = 20;
  gridRow.fills = [];
  gridRow.clipsContent = false;

  // COLUMN 1: DIAGNOSTIC REPORTS MANAGEMENT TABLE (840 x 800)
  const leftCol = figma.createFrame();
  leftCol.name = "Reports Table Column";
  leftCol.layoutMode = "VERTICAL";
  leftCol.resize(840, 800);
  leftCol.paddingLeft = 20; leftCol.paddingRight = 20; leftCol.paddingTop = 16; leftCol.paddingBottom = 16;
  leftCol.itemSpacing = 12;
  leftCol.cornerRadius = 14;
  applyCard1Glass(leftCol);

  // Filter Tabs Row
  const tabRow = figma.createFrame();
  tabRow.layoutMode = "HORIZONTAL";
  tabRow.primaryAxisSizingMode = "FIXED";
  tabRow.counterAxisSizingMode = "AUTO";
  tabRow.resize(800, 32);
  tabRow.primaryAxisAlignItems = "SPACE_BETWEEN";
  tabRow.counterAxisAlignItems = "CENTER";
  tabRow.fills = [];

  const tabPills = figma.createFrame();
  tabPills.layoutMode = "HORIZONTAL";
  tabPills.primaryAxisSizingMode = "AUTO";
  tabPills.counterAxisSizingMode = "AUTO";
  tabPills.itemSpacing = 6;
  tabPills.counterAxisAlignItems = "CENTER";
  tabPills.fills = [];

  function makeFilterTab(label, count, active = false) {
    const t = figma.createFrame();
    t.layoutMode = "HORIZONTAL";
    t.primaryAxisSizingMode = "AUTO";
    t.counterAxisSizingMode = "AUTO";
    t.itemSpacing = 5;
    t.counterAxisAlignItems = "CENTER";
    t.paddingLeft = 10; t.paddingRight = 10; t.paddingTop = 5; t.paddingBottom = 5;
    t.cornerRadius = 6;
    t.fills = solid(active ? C.forestBase : C.glassElevated, active ? 0.95 : 0.6);
    t.strokes = solid(active ? C.mint : C.glassBorder, active ? 0.7 : 0.3);
    t.strokeWeight = 1;
    t.appendChild(createText(label, 10, active ? "Bold" : "Medium", active ? C.mint : C.textZinc300));
    t.appendChild(createBadge(String(count), active ? "mint" : "neutral", 8));
    return t;
  }
  tabPills.appendChild(makeFilterTab("All Takes", 48, true));
  tabPills.appendChild(makeFilterTab("Bohemian Rhapsody", 12));
  tabPills.appendChild(makeFilterTab("Solfeggio Drills", 18));
  tabPills.appendChild(makeFilterTab("Certified PDFs", 12));
  tabRow.appendChild(tabPills);

  const sortBox = figma.createFrame();
  sortBox.name = "Dropdown/Sort";
  sortBox.layoutMode = "HORIZONTAL";
  sortBox.primaryAxisSizingMode = "AUTO";
  sortBox.counterAxisSizingMode = "FIXED";
  sortBox.resize(130, 28);
  sortBox.paddingLeft = 10; sortBox.paddingRight = 10;
  sortBox.itemSpacing = 6;
  sortBox.counterAxisAlignItems = "CENTER";
  sortBox.cornerRadius = 6;
  sortBox.fills = solid(C.glassElevated, 1);
  sortBox.strokes = solid(C.glassBorder, 0.7);
  sortBox.strokeWeight = 1;
  sortBox.appendChild(createSvgIcon("sliders", "#8B9DAF", 11));
  sortBox.appendChild(createText("Date (Newest)", 10, "Medium", C.textZinc300));
  sortBox.appendChild(createSvgIcon("chevron-down", "#8B9DAF", 9));
  tabRow.appendChild(sortBox);
  leftCol.appendChild(tabRow);

  // 4 Detailed Interactive Take Cards
  function makeTakeRow(title, dateStr, duration, size, score, tags, isHighlighted = false) {
    const row = figma.createFrame();
    row.name = "TakeCard/" + title;
    row.layoutMode = "VERTICAL";
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "FIXED";
    row.resize(800, 102);
    row.paddingLeft = 16; row.paddingRight = 16; row.paddingTop = 12; row.paddingBottom = 12;
    row.itemSpacing = 10;
    row.cornerRadius = 10;
    row.fills = solid(isHighlighted ? C.forestBase : C.glassElevated, isHighlighted ? 0.85 : 0.65);
    row.strokes = solid(isHighlighted ? C.mint : C.glassBorder, isHighlighted ? 0.7 : 0.35);
    row.strokeWeight = 1;

    // Top Header: Checkbox + Title + Score Pill
    const rHead = figma.createFrame();
    rHead.layoutMode = "HORIZONTAL";
    rHead.primaryAxisSizingMode = "FIXED";
    rHead.counterAxisSizingMode = "AUTO";
    rHead.resize(768, 22);
    rHead.primaryAxisAlignItems = "SPACE_BETWEEN";
    rHead.counterAxisAlignItems = "CENTER";
    rHead.fills = [];

    const rHL = figma.createFrame();
    rHL.layoutMode = "HORIZONTAL";
    rHL.primaryAxisSizingMode = "AUTO";
    rHL.counterAxisSizingMode = "AUTO";
    rHL.itemSpacing = 8;
    rHL.counterAxisAlignItems = "CENTER";
    rHL.fills = [];
    
    // Checkbox
    const chk = figma.createFrame();
    chk.resize(14, 14);
    chk.cornerRadius = 3;
    chk.fills = solid(isHighlighted ? C.mint : { r: 0.10, g: 0.12, b: 0.16 }, 1);
    chk.strokes = solid(C.mint, isHighlighted ? 0.9 : 0.3);
    chk.strokeWeight = 1;
    chk.layoutMode = "HORIZONTAL";
    chk.primaryAxisAlignItems = "CENTER";
    chk.counterAxisAlignItems = "CENTER";
    if (isHighlighted) {
      chk.appendChild(createSvgIcon("check", "#050608", 10));
    }
    rHL.appendChild(chk);

    rHL.appendChild(createText(title, 12, "Bold", C.textWhite));
    rHL.appendChild(createText("• " + dateStr, 10, "Regular", C.textZinc400));
    rHead.appendChild(rHL);

    const scoreCol = figma.createFrame();
    scoreCol.layoutMode = "HORIZONTAL";
    scoreCol.primaryAxisSizingMode = "AUTO";
    scoreCol.counterAxisSizingMode = "AUTO";
    scoreCol.itemSpacing = 6;
    scoreCol.counterAxisAlignItems = "CENTER";
    scoreCol.fills = [];
    scoreCol.appendChild(createText(score + "/100", 12, "Bold", isHighlighted ? C.mint : C.textWhite));
    scoreCol.appendChild(createBadge(isHighlighted ? "VIRTUOSO" : "GRADED", isHighlighted ? "mint" : "neutral", 8));
    rHead.appendChild(scoreCol);
    row.appendChild(rHead);

    // Bottom Row: Audio metadata + Actions
    const rBot = figma.createFrame();
    rBot.layoutMode = "HORIZONTAL";
    rBot.primaryAxisSizingMode = "FIXED";
    rBot.counterAxisSizingMode = "AUTO";
    rBot.resize(768, 28);
    rBot.primaryAxisAlignItems = "SPACE_BETWEEN";
    rBot.counterAxisAlignItems = "CENTER";
    rBot.fills = [];

    const tagGroup = figma.createFrame();
    tagGroup.layoutMode = "HORIZONTAL";
    tagGroup.primaryAxisSizingMode = "AUTO";
    tagGroup.counterAxisSizingMode = "AUTO";
    tagGroup.itemSpacing = 6;
    tagGroup.counterAxisAlignItems = "CENTER";
    tagGroup.fills = [];
    tagGroup.appendChild(createText(duration + " • " + size, 10, "Medium", C.textZinc500));
    tags.forEach(t => tagGroup.appendChild(createBadge(t.label, t.col, 8)));
    rBot.appendChild(tagGroup);

    const actGroup = figma.createFrame();
    actGroup.layoutMode = "HORIZONTAL";
    actGroup.primaryAxisSizingMode = "AUTO";
    actGroup.counterAxisSizingMode = "AUTO";
    actGroup.itemSpacing = 8;
    actGroup.counterAxisAlignItems = "CENTER";
    actGroup.fills = [];

    const btnPlay = figma.createFrame();
    btnPlay.name = "Button/Play Take";
    btnPlay.layoutMode = "HORIZONTAL";
    btnPlay.primaryAxisSizingMode = "AUTO";
    btnPlay.counterAxisSizingMode = "FIXED";
    btnPlay.resize(62, 28);
    btnPlay.paddingLeft = 10; btnPlay.paddingRight = 10;
    btnPlay.itemSpacing = 5;
    btnPlay.counterAxisAlignItems = "CENTER";
    btnPlay.primaryAxisAlignItems = "CENTER";
    btnPlay.cornerRadius = 6;
    btnPlay.fills = solid(C.glassElevated, 1);
    btnPlay.strokes = solid(C.glassBorder, 0.7);
    btnPlay.strokeWeight = 1;
    btnPlay.appendChild(createSvgIcon("play", "#8B9DAF", 10));
    btnPlay.appendChild(createText("Play", 10, "Medium", C.textZinc300));
    actGroup.appendChild(btnPlay);

    const btnPdf = figma.createFrame();
    btnPdf.name = "Button/PDF " + title;
    btnPdf.layoutMode = "HORIZONTAL";
    btnPdf.primaryAxisSizingMode = "AUTO";
    btnPdf.counterAxisSizingMode = "FIXED";
    btnPdf.resize(60, 28);
    btnPdf.paddingLeft = 10; btnPdf.paddingRight = 10;
    btnPdf.itemSpacing = 5;
    btnPdf.counterAxisAlignItems = "CENTER";
    btnPdf.primaryAxisAlignItems = "CENTER";
    btnPdf.cornerRadius = 6;
    btnPdf.fills = solid(C.glassElevated, 1);
    btnPdf.strokes = solid(C.glassBorder, 0.7);
    btnPdf.strokeWeight = 1;
    btnPdf.appendChild(createSvgIcon("download", "#00F5A0", 10));
    btnPdf.appendChild(createText("PDF", 10, "Bold", C.mint));
    actGroup.appendChild(btnPdf);

    const btnOpen = createActionButton("View Report", "arrow-up-right", isHighlighted ? "radiant" : "secondary", null, "right", 28);
    btnOpen.name = "Archive/View " + title;
    actGroup.appendChild(btnOpen);

    rBot.appendChild(actGroup);
    row.appendChild(rBot);

    return row;
  }

  leftCol.appendChild(makeTakeRow(
    "Bohemian Rhapsody — Verse 1 (Take 04)",
    "Today 14:20", "01:45", "28.4 MB", "94",
    [{ label: "48kHz WAV", col: "mint" }, { label: "Passaggio F#4 Flagged", col: "amber" }, { label: "CERTIFIED", col: "mint" }],
    true
  ));

  leftCol.appendChild(makeTakeRow(
    "Bohemian Rhapsody — Verse 1 (Take 03)",
    "Yesterday 19:15", "01:42", "27.6 MB", "89",
    [{ label: "48kHz WAV", col: "neutral" }, { label: "-22c Flat Drift", col: "amber" }]
  ));

  leftCol.appendChild(makeTakeRow(
    "G Major 5-Tone Arpeggio Vocal Drill",
    "12 Oct 2026", "02:10", "34.1 MB", "96",
    [{ label: "Solfeggio Scale", col: "neutral" }, { label: "Perfect 5th Lock", col: "mint" }, { label: "CERTIFIED", col: "mint" }]
  ));

  leftCol.appendChild(makeTakeRow(
    "Initial Diagnostic Baseline & SATB Calibration",
    "14 Sep 2026", "03:15", "52.8 MB", "82",
    [{ label: "Baseline Take", col: "neutral" }, { label: "Tenor C2–E4", col: "neutral" }]
  ));

  // Bottom Pagination & Maintenance Toolbar
  const botBar = figma.createFrame();
  botBar.layoutMode = "HORIZONTAL"; botBar.resize(800, 36);
  botBar.primaryAxisAlignItems = "SPACE_BETWEEN"; botBar.counterAxisAlignItems = "CENTER"; botBar.fills = [];
  botBar.appendChild(createText("Showing 4 of 48 takes • 1 take selected (Take 04)", 10, "Medium", C.textZinc400));

  const botActs = figma.createFrame();
  botActs.layoutMode = "HORIZONTAL"; botActs.itemSpacing = 8; botActs.counterAxisAlignItems = "CENTER"; botActs.fills = [];
  botActs.appendChild(createActionButton("Archive Selected to ZIP", "download", "secondary"));
  botActs.appendChild(createActionButton("Delete Take", null, "secondary"));
  botBar.appendChild(botActs);
  leftCol.appendChild(botBar);

  gridRow.appendChild(leftCol);

  // COLUMN 2: DOCUMENT INSPECTOR & REPOSITORY MAINTENANCE (452 x 800)
  const rightCol = figma.createFrame();
  rightCol.name = "Inspector & Maintenance Column";
  rightCol.layoutMode = "VERTICAL";
  rightCol.resize(452, 800);
  rightCol.itemSpacing = 16;
  rightCol.fills = [];

  // Card A: Selected Take Official Certificate Preview (452 x 460 px)
  const certCard = figma.createFrame();
  certCard.name = "Selected Certificate Card";
  certCard.layoutMode = "VERTICAL";
  certCard.resize(452, 460);
  certCard.paddingLeft = 20; certCard.paddingRight = 20; certCard.paddingTop = 18; certCard.paddingBottom = 18;
  certCard.itemSpacing = 12;
  certCard.cornerRadius = 14;
  applyCard2Glass(certCard);

  const ctHead = figma.createFrame();
  ctHead.layoutMode = "HORIZONTAL"; ctHead.resize(412, 22); ctHead.primaryAxisAlignItems = "SPACE_BETWEEN"; ctHead.counterAxisAlignItems = "CENTER"; ctHead.fills = [];
  ctHead.appendChild(createText("Official Certificate: Take 04", 13, "Bold", C.textWhite));
  ctHead.appendChild(createBadge("VERIFIED GRADE A+", "mint", 9));
  certCard.appendChild(ctHead);

  // Luxury Certificate Plate
  const certPlate = figma.createFrame();
  certPlate.layoutMode = "VERTICAL"; certPlate.resize(412, 280);
  certPlate.paddingLeft = 16; certPlate.paddingRight = 16; certPlate.paddingTop = 14; certPlate.paddingBottom = 14;
  certPlate.itemSpacing = 10;
  certPlate.cornerRadius = 10;
  certPlate.fills = solid({ r: 0.03, g: 0.10, b: 0.07 }, 0.95);
  certPlate.strokes = solid(C.mint, 0.45); certPlate.strokeWeight = 1.2;

  const cpTop = figma.createFrame();
  cpTop.layoutMode = "HORIZONTAL"; cpTop.resize(380, 18); cpTop.primaryAxisAlignItems = "SPACE_BETWEEN"; cpTop.counterAxisAlignItems = "CENTER"; cpTop.fills = [];
  cpTop.appendChild(createText("INTERNATIONAL CONSERVATORY STANDARD", 8, "Bold", C.mint));
  cpTop.appendChild(createText("GRADE: A+ VIRTUOSO", 9, "Bold", C.textWhite));
  certPlate.appendChild(cpTop);

  certPlate.appendChild(createText("Vocal Performance Audit Certificate", 15, "Bold", C.textWhite));

  function makeCertItem(lbl, val) {
    const ci = figma.createFrame();
    ci.layoutMode = "HORIZONTAL"; ci.resize(380, 18); ci.primaryAxisAlignItems = "SPACE_BETWEEN"; ci.counterAxisAlignItems = "CENTER"; ci.fills = [];
    ci.appendChild(createText(lbl, 9, "Regular", C.textZinc400));
    ci.appendChild(createText(val, 9, "Bold", C.textWhite));
    return ci;
  }

  certPlate.appendChild(makeCertItem("Vocalist Identity:", "Ethan Reynolds • Tenor Lyrique"));
  certPlate.appendChild(makeCertItem("Song & Session:", "Bohemian Rhapsody (Take 04)"));
  certPlate.appendChild(makeCertItem("Acoustic Vocal Span:", "C2 (65.4Hz) — A4 (440Hz) • 2.8 Octaves"));
  certPlate.appendChild(makeCertItem("Pitch Lock Accuracy:", "94.2% Intonation Stability"));
  certPlate.appendChild(makeCertItem("Audio Master Quality:", "48kHz / 24-bit PCM • Zero-Latency DSP"));

  const hashBox = figma.createFrame();
  hashBox.layoutMode = "HORIZONTAL"; hashBox.resize(380, 22);
  hashBox.paddingLeft = 8; hashBox.paddingRight = 8;
  hashBox.primaryAxisAlignItems = "SPACE_BETWEEN"; hashBox.counterAxisAlignItems = "CENTER";
  hashBox.cornerRadius = 4; hashBox.fills = solid({ r: 0.02, g: 0.06, b: 0.04 }, 1);
  hashBox.strokes = solid(C.mint, 0.3); hashBox.strokeWeight = 1;
  hashBox.appendChild(createText("HASH: #VS-8829-48K-TENOR-20261015", 8, "Bold", C.mint));
  hashBox.appendChild(createBadge("SEALED", "neutral", 7));
  certPlate.appendChild(hashBox);

  certCard.appendChild(certPlate);

  const btnCertPdf = createActionButton("Download Official PDF Certificate", "arrow-up-right", "radiant", 412, "right", 36);
  btnCertPdf.name = "Archive/Download Certificate";
  certCard.appendChild(btnCertPdf);

  const btnPianoRoll = createActionButton("Open Detailed Note-Sync Piano Roll", "arrow-up-right", "secondary", 412, "right", 36);
  btnPianoRoll.name = "Archive/Open Piano Roll";
  certCard.appendChild(btnPianoRoll);

  rightCol.appendChild(certCard);

  // Card B: Storage Maintenance & Clean-Up (452 x 320 px)
  const maintCard = figma.createFrame();
  maintCard.name = "Storage Maintenance Card";
  maintCard.layoutMode = "VERTICAL";
  maintCard.resize(452, 320);
  maintCard.paddingLeft = 20; maintCard.paddingRight = 20; maintCard.paddingTop = 16; maintCard.paddingBottom = 16;
  maintCard.itemSpacing = 10;
  maintCard.cornerRadius = 14;
  applyCard2Glass(maintCard);

  const mtHead = figma.createFrame();
  mtHead.layoutMode = "HORIZONTAL"; mtHead.resize(412, 22); mtHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mtHead.counterAxisAlignItems = "CENTER"; mtHead.fills = [];
  mtHead.appendChild(createText("Cloud Storage & Archive Health", 13, "Bold", C.textWhite));
  mtHead.appendChild(createBadge("4.2 / 10 GB", "neutral", 9));
  maintCard.appendChild(mtHead);

  function makeStorageRow(label, size, color) {
    const sr = figma.createFrame();
    sr.layoutMode = "HORIZONTAL"; sr.resize(412, 18); sr.primaryAxisAlignItems = "SPACE_BETWEEN"; sr.counterAxisAlignItems = "CENTER"; sr.fills = [];
    const sL = figma.createFrame(); sL.layoutMode = "HORIZONTAL"; sL.itemSpacing = 6; sL.counterAxisAlignItems = "CENTER"; sL.fills = [];
    const dot = figma.createEllipse(); dot.resize(6, 6); dot.fills = solid(color, 1);
    sL.appendChild(dot);
    sL.appendChild(createText(label, 10, "Medium", C.textZinc300));
    sr.appendChild(sL);
    sr.appendChild(createText(size, 10, "Bold", C.textWhite));
    return sr;
  }

  maintCard.appendChild(makeStorageRow("Lossless 48kHz WAV Recordings", "3.4 GB", C.mint));
  maintCard.appendChild(makeStorageRow("Certified PDF Evaluation Sheets", "480 MB", C.cyan));
  maintCard.appendChild(makeStorageRow("Pitch Contour & YIN Vectors", "320 MB", C.amber));

  const btnClean = createActionButton("Clean Up Redundant Takes (Free ~1.2 GB)", "refresh", "secondary", 412, "right", 36);
  btnClean.name = "Archive/Clean Cache";
  maintCard.appendChild(btnClean);

  const btnSync = createActionButton("Sync Archive with Google Drive", "arrow-up-right", "secondary", 412, "right", 36);
  btnSync.name = "Archive/Sync Cloud";
  maintCard.appendChild(btnSync);

  rightCol.appendChild(maintCard);
  gridRow.appendChild(rightCol);
  container.appendChild(gridRow);

  return root;
}

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
    // 3B. MOBILE SCREEN BUILDERS (iPhone 15/16 Pro 393x852)
    // -------------------------------------------------------------------------
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




    // =============================================================================
// VOCALSENSE AI — M01. MOBILE OFFICIAL HOMEPAGE & WELCOME (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Homepage (01_homepage.js)
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



function buildMobileWelcomeScreen() {
  const root = createMobileScreen("VocalSense AI — M01. Mobile Welcome & Experience", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("vocalsense.ai", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header with Sign In CTA (y = 70, h = 46)
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

  const hLeft = createAutoRow(8);
  const logoSquircle = figma.createFrame();
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
  hLeft.appendChild(logoSquircle);
  hLeft.appendChild(createText("VocalSense AI", 13, "Bold", C.textWhite));
  header.appendChild(hLeft);

  const btnSignIn = figma.createFrame();
  btnSignIn.name = "Btn/Sign In";
  btnSignIn.layoutMode = "HORIZONTAL";
  btnSignIn.primaryAxisSizingMode = "AUTO";
  btnSignIn.counterAxisSizingMode = "AUTO";
  btnSignIn.paddingLeft = 10;
  btnSignIn.paddingRight = 10;
  btnSignIn.paddingTop = 4;
  btnSignIn.paddingBottom = 4;
  btnSignIn.cornerRadius = 6;
  btnSignIn.fills = solid(C.glassElevated, 1);
  btnSignIn.strokes = solid(C.mint, 0.7);
  btnSignIn.strokeWeight = 1;
  btnSignIn.appendChild(createText("Sign In", 9, "Bold", C.mint));
  header.appendChild(btnSignIn);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Welcome Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 7;
  content.fills = [];
  content.clipsContent = false;

  // --- Hero Card (Matching Desktop 01 Homepage verbatim) ---
  const heroCard = makeMobileCard("Hero Card", 11, 5);
  heroCard.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.03, g: 0.18, b: 0.12, a: 0.95 } },
      { position: 1.0, color: { r: 0.05, g: 0.08, b: 0.11, a: 0.85 } }
    ]
  }];
  heroCard.strokes = solid(C.mint, 0.45);

  const hcTop = createFullRow(339, 6);
  hcTop.appendChild(makePill("BIO-ACOUSTIC PITCH DIAGNOSTIC", C.mint, C.forestBase, C.mint, 7));
  hcTop.appendChild(makePill("0.02s LATENCY", C.emerald, C.glassElevated, C.glassBorder, 7));
  heroCard.appendChild(hcTop);

  heroCard.appendChild(createText("Precision Bio-Acoustic Studio &\nReal-Time Vocal Diagnostics", 15, "Bold", C.textWhite));
  heroCard.appendChild(createParagraph("Sub-millisecond YIN pitch detection, formant resonance tracking, and personalized vocal pedagogy powered by Gemini AI — zero latency, directly in your web browser.", 339, 8, "Regular", C.textZinc400, 12));

  // Live Biometric Readout Chip
  const readout = createFullRow(339, 6);
  readout.paddingLeft = 8;
  readout.paddingRight = 8;
  readout.paddingTop = 4;
  readout.paddingBottom = 4;
  readout.cornerRadius = 6;
  readout.fills = solid(C.forestBase, 0.9);
  readout.strokes = solid(C.mint, 0.5);
  readout.strokeWeight = 1;

  const rL = createAutoRow(6);
  rL.appendChild(createSvgIcon("mic", "#00F5A0", 11));
  rL.appendChild(createText("Live Note Detected", 8, "Medium", C.textZinc300));
  readout.appendChild(rL);

  const rR = createAutoRow(6);
  rR.appendChild(createText("G4 (392.0 Hz)", 9, "Bold", C.mint));
  rR.appendChild(makePill("±2 ct", C.mint, C.forestBase, C.mint, 7));
  readout.appendChild(rR);
  heroCard.appendChild(readout);

  // Dual Action Buttons (Matching Desktop 01)
  const ctaRow = createFullRow(339, 6);
  const btnStart = figma.createFrame();
  btnStart.name = "Button/Start Vocal Analysis";
  btnStart.layoutMode = "HORIZONTAL";
  btnStart.resize(165, 32);
  btnStart.primaryAxisSizingMode = "FIXED";
  btnStart.counterAxisSizingMode = "FIXED";
  btnStart.cornerRadius = 6;
  btnStart.primaryAxisAlignItems = "CENTER";
  btnStart.counterAxisAlignItems = "CENTER";
  btnStart.fills = solid(C.mint, 1);
  btnStart.appendChild(createText("Start Vocal Analysis ↗", 9, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  ctaRow.appendChild(btnStart);

  const btnExplore = figma.createFrame();
  btnExplore.name = "Button/Explore Live Console";
  btnExplore.layoutMode = "HORIZONTAL";
  btnExplore.resize(165, 32);
  btnExplore.primaryAxisSizingMode = "FIXED";
  btnExplore.counterAxisSizingMode = "FIXED";
  btnExplore.cornerRadius = 6;
  btnExplore.primaryAxisAlignItems = "CENTER";
  btnExplore.counterAxisAlignItems = "CENTER";
  btnExplore.fills = solid(C.glassElevated, 1);
  btnExplore.strokes = solid(C.glassBorder, 0.8);
  btnExplore.strokeWeight = 1;
  btnExplore.appendChild(createText("Explore Console ↘", 9, "Bold", C.textZinc300));
  ctaRow.appendChild(btnExplore);
  heroCard.appendChild(ctaRow);

  // Social Proof Avatar Stack
  heroCard.appendChild(createAvatarStack(4, "Join 12,400+ vocalists worldwide"));

  content.appendChild(heroCard);

  // --- Live Pitch Visualizer Demo Card ---
  const demoCard = makeMobileCard("Live Visualizer Demo", 9, 5);
  const dcHead = createFullRow(339, 6);
  dcHead.appendChild(createText("BIO-ACOUSTIC PITCH CONTOUR", 8, "Bold", C.textZinc400));
  dcHead.appendChild(makePill("IN-TUNE G4", C.mint, C.forestBase, C.mint, 7));
  demoCard.appendChild(dcHead);

  const waveBox = figma.createFrame();
  waveBox.resize(339, 36);
  waveBox.cornerRadius = 6;
  waveBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  waveBox.strokes = solid(C.glassBorder, 0.7);
  waveBox.strokeWeight = 1;

  const waveVec = figma.createVector();
  waveVec.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 28 C 30 14 50 14 80 26 C 110 38 140 38 170 20 C 200 6 220 6 250 20 C 280 34 310 26 337 18"
  }];
  waveVec.resize(339, 26);
  waveVec.strokes = solid(C.mint, 1);
  waveVec.strokeWeight = 1.8;
  waveVec.x = 0; waveVec.y = 4;
  waveBox.appendChild(waveVec);
  demoCard.appendChild(waveBox);
  content.appendChild(demoCard);

  // --- Bento Feature Cards (2 Cards matching Desktop 01) ---
  function makeBentoCard(iconName, title, desc) {
    const card = makeMobileCard("Feature/" + title, 8, 3);
    const row = createAutoRow(8);

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
    row.appendChild(ic);

    const txt = createAutoCol(1);
    txt.counterAxisSizingMode = "FIXED";
    txt.resize(295, 24);
    txt.appendChild(createText(title, 9, "Bold", C.textWhite));
    txt.appendChild(createText(desc, 7, "Regular", C.textZinc400));
    row.appendChild(txt);
    card.appendChild(row);
    return card;
  }

  content.appendChild(makeBentoCard("zap", "Sub-Millisecond Pitch Tracking", "2.7 ms latency YIN algorithm for zero-lag detection."));
  content.appendChild(makeBentoCard("waveform", "16-Bar Harmonic Piano Roll", "Automatic singing transcript with live intonation heatmap."));

  // --- Vocal Range Calibration Chips (SATB) ---
  const satbCard = makeMobileCard("Vocal Range Calibration", 9, 4);
  const scHead = createFullRow(339, 6);
  scHead.appendChild(createText("VOCAL RANGE CALIBRATION", 8, "Bold", C.textZinc400));
  scHead.appendChild(makePill("5 VOICE TYPES", C.mint, C.forestBase, C.mint, 7));
  satbCard.appendChild(scHead);

  const satbRow = createFullRow(339, 4);
  const types = [
    { name: "Bass", range: "E2-E4", active: false },
    { name: "Baritone", range: "A2-F4", active: false },
    { name: "Tenor", range: "C3-A4", active: true },
    { name: "Mezzo", range: "A3-F#5", active: false },
    { name: "Soprano", range: "C4-A5", active: false }
  ];
  types.forEach(t => {
    const b = figma.createFrame();
    b.layoutMode = "VERTICAL";
    b.resize(63, 32);
    b.primaryAxisSizingMode = "FIXED";
    b.counterAxisSizingMode = "FIXED";
    b.paddingTop = 2; b.paddingBottom = 2;
    b.cornerRadius = 5;
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    b.fills = solid(t.active ? C.forestBase : C.glassElevated, 1);
    b.strokes = solid(t.active ? C.mint : C.glassBorder, t.active ? 1 : 0.6);
    b.strokeWeight = 1;
    b.appendChild(createText(t.name, 8, t.active ? "Bold" : "Medium", t.active ? C.mint : C.textWhite));
    b.appendChild(createText(t.range, 7, "Regular", C.textZinc400));
    satbRow.appendChild(b);
  });
  satbCard.appendChild(satbRow);
  content.appendChild(satbCard);

  content.appendChild(createText("VocalSense AI • Responsive Web Edition • London • Tokyo • Jakarta", 8, "Regular", C.textZinc600));

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M02. MOBILE VOCAL STUDIO WORKSTATION (DAW) (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Studio DAW (patokan.png)
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================



function buildMobileStudioScreen() {
  const root = createMobileScreen("VocalSense AI — M02. Mobile Studio Workstation", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/studio", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header (y = 70, h = 46)
  const header = createMobileWebHeader("Studio Workstation", null, true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Studio Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Session Metadata Row ---
  const sessionHead = createFullRow(361, 6);
  const sHL = createAutoCol(1);
  sHL.appendChild(createText("Bohemian Rhapsody", 12, "Bold", C.textWhite));
  sHL.appendChild(createText("Take #04 • Queen (Key: Bb Major)", 8, "Regular", C.textZinc400));
  sessionHead.appendChild(sHL);

  const sHR = createAutoRow(6);
  sHR.appendChild(makePill("48 kHz FLAC", C.mint, C.forestBase, C.mint, 7));
  const btnNew = figma.createFrame();
  btnNew.name = "Btn/New Take";
  btnNew.layoutMode = "HORIZONTAL";
  btnNew.primaryAxisSizingMode = "AUTO";
  btnNew.counterAxisSizingMode = "AUTO";
  btnNew.paddingLeft = 7;
  btnNew.paddingRight = 7;
  btnNew.paddingTop = 3;
  btnNew.paddingBottom = 3;
  btnNew.cornerRadius = 5;
  btnNew.fills = solid(C.forestBase, 1);
  btnNew.strokes = solid(C.mint, 0.7);
  btnNew.strokeWeight = 1;
  btnNew.primaryAxisAlignItems = "CENTER";
  btnNew.counterAxisAlignItems = "CENTER";
  btnNew.appendChild(createText("+ New Take", 8, "Bold", C.mint));
  sHR.appendChild(btnNew);
  sessionHead.appendChild(sHR);
  content.appendChild(sessionHead);

  // --- Bento Card 1: Real-Time Pitch Tuner Dial & Waveform ---
  const tunerCard = makeMobileCard("Acoustic Tuner Card", 9, 5);
  tunerCard.counterAxisAlignItems = "CENTER";

  const tcHead = createFullRow(341, 6);
  tcHead.appendChild(createText("LIVE PITCH & FORMANT TRACKER", 8, "Bold", C.textZinc400));
  tcHead.appendChild(makePill("120 BPM • 4/4", C.mint, C.forestBase, C.mint, 7));
  tunerCard.appendChild(tcHead);

  // Mathematically Centered Pitch Tuner Dial (70 × 70 px)
  const dial = figma.createFrame();
  dial.name = "Pitch Tuner Dial";
  dial.layoutMode = "VERTICAL";
  dial.primaryAxisSizingMode = "FIXED";
  dial.counterAxisSizingMode = "FIXED";
  dial.resize(68, 68);
  dial.cornerRadius = 34;
  dial.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.25, b: 0.16, a: 1 } },
      { position: 1.0, color: { r: 0.04, g: 0.10, b: 0.14, a: 1 } }
    ]
  }];
  dial.strokes = solid(C.mint, 0.9);
  dial.strokeWeight = 2;
  dial.primaryAxisAlignItems = "CENTER";
  dial.counterAxisAlignItems = "CENTER";
  dial.itemSpacing = 1;
  dial.paddingLeft = 0;
  dial.paddingRight = 0;
  dial.paddingTop = 0;
  dial.paddingBottom = 0;

  dial.appendChild(createText("TARGET", 7, "Bold", C.textZinc400));
  dial.appendChild(createText("G4", 20, "Bold", C.textWhite));
  dial.appendChild(createText("392.0 Hz • ±0 ct", 7, "Medium", C.mint));
  tunerCard.appendChild(dial);

  // Live Audio Pitch Waveform
  const waveBox = figma.createFrame();
  waveBox.resize(341, 32);
  waveBox.cornerRadius = 6;
  waveBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 0.95);
  waveBox.strokes = solid(C.glassBorder, 0.7);
  waveBox.strokeWeight = 1;

  const waveVec = figma.createVector();
  waveVec.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 24 C 40 20 70 8 110 12 C 150 14 180 28 220 16 C 260 4 290 20 341 10"
  }];
  waveVec.resize(341, 24);
  waveVec.strokes = solid(C.mint, 1);
  waveVec.strokeWeight = 1.8;
  waveVec.x = 0; waveVec.y = 4;
  waveBox.appendChild(waveVec);
  tunerCard.appendChild(waveBox);

  // Transport Bar (Record dot, Timer, VU meter, Stop & Analyze)
  const transport = createFullRow(341, 6);
  const tL = createAutoRow(5);

  const btnRec = figma.createFrame();
  btnRec.layoutMode = "HORIZONTAL";
  btnRec.primaryAxisSizingMode = "FIXED";
  btnRec.counterAxisSizingMode = "FIXED";
  btnRec.resize(20, 20);
  btnRec.cornerRadius = 10;
  btnRec.fills = solid(C.rose, 1);
  btnRec.primaryAxisAlignItems = "CENTER";
  btnRec.counterAxisAlignItems = "CENTER";
  const recDot = figma.createFrame();
  recDot.resize(6, 6);
  recDot.cornerRadius = 3;
  recDot.fills = solid(C.textWhite, 1);
  btnRec.appendChild(recDot);
  tL.appendChild(btnRec);

  tL.appendChild(createText("00:42 / 03:45", 8, "Bold", C.textWhite));
  transport.appendChild(tL);

  const btnStop = figma.createFrame();
  btnStop.name = "Btn/Stop & Analyze";
  btnStop.layoutMode = "HORIZONTAL";
  btnStop.primaryAxisSizingMode = "AUTO";
  btnStop.counterAxisSizingMode = "AUTO";
  btnStop.paddingLeft = 8;
  btnStop.paddingRight = 8;
  btnStop.paddingTop = 3;
  btnStop.paddingBottom = 3;
  btnStop.cornerRadius = 5;
  btnStop.fills = solid(C.forestBase, 1);
  btnStop.strokes = solid(C.mint, 0.9);
  btnStop.strokeWeight = 1;
  btnStop.primaryAxisAlignItems = "CENTER";
  btnStop.counterAxisAlignItems = "CENTER";
  btnStop.appendChild(createText("Stop & Analyze", 8, "Bold", C.mint));
  transport.appendChild(btnStop);
  tunerCard.appendChild(transport);
  content.appendChild(tunerCard);

  // --- Bento Card 2: Vocal Registers & Span ---
  const regCard = makeMobileCard("Vocal Registers Card", 9, 4);
  const rcHead = createFullRow(341, 6);
  rcHead.appendChild(createText("VOCAL REGISTERS & SPAN", 8, "Bold", C.textZinc400));
  rcHead.appendChild(createText("Retest ↗", 8, "Bold", C.mint));
  regCard.appendChild(rcHead);

  const regBar = createFullRow(341, 4);
  function makeRegBlock(name, range, pct, active) {
    const b = figma.createFrame();
    b.layoutMode = "VERTICAL";
    b.resize(109, 34);
    b.primaryAxisSizingMode = "FIXED";
    b.counterAxisSizingMode = "FIXED";
    b.paddingLeft = 6;
    b.paddingRight = 6;
    b.paddingTop = 2;
    b.paddingBottom = 2;
    b.cornerRadius = 5;
    b.fills = solid(active ? C.forestBase : C.glassElevated, 1);
    b.strokes = solid(active ? C.mint : C.glassBorder, active ? 1 : 0.6);
    b.strokeWeight = 1;
    b.itemSpacing = 1;
    b.appendChild(createText(name, 7, active ? "Bold" : "Medium", active ? C.mint : C.textWhite));
    b.appendChild(createText(range, 7, "Regular", C.textZinc400));
    b.appendChild(createText(pct, 7, "Bold", active ? C.mint : C.textZinc300));
    return b;
  }
  regBar.appendChild(makeRegBlock("Chest Voice", "C2–A4", "94%", false));
  regBar.appendChild(makeRegBlock("Mixed Voice", "A#4–E5", "88%", true));
  regBar.appendChild(makeRegBlock("Head Voice", "F5–G5", "76%", false));
  regCard.appendChild(regBar);
  content.appendChild(regCard);

  // --- Bento Card 3: Gemini AI Vocal Coach Card ---
  const aiCard = makeMobileCard("Gemini AI Coach Card", 9, 4);
  const aiHead = createFullRow(341, 6);
  const aiHeadL = createAutoRow(5);
  aiHeadL.appendChild(createSvgIcon("sparkle", "#00F5A0", 11));
  aiHeadL.appendChild(createText("GEMINI AI VOCAL COACH", 8, "Bold", C.mint));
  aiHead.appendChild(aiHeadL);
  aiHead.appendChild(makePill("INTELLIGENT DSP", C.mint, C.forestBase, C.mint, 7));
  aiCard.appendChild(aiHead);

  aiCard.appendChild(createText("Bridge Mix-Voice Smoothly at F#4", 9, "Bold", C.textWhite));
  aiCard.appendChild(createParagraph("Great resonance on chest tones! Smooth the F#4 to G4 bridge to eliminate the slight flat drift during breath recovery.", 341, 7.5, "Regular", C.textZinc400, 11));

  // Avatar Stack (Matching patokan.png coach card)
  aiCard.appendChild(createAvatarStack(4, "+1.4k singers trained today"));

  const btnDrill = figma.createFrame();
  btnDrill.name = "Btn/Start 5-Min Drill";
  btnDrill.layoutMode = "HORIZONTAL";
  btnDrill.resize(341, 24);
  btnDrill.primaryAxisSizingMode = "FIXED";
  btnDrill.counterAxisSizingMode = "FIXED";
  btnDrill.cornerRadius = 5;
  btnDrill.primaryAxisAlignItems = "CENTER";
  btnDrill.counterAxisAlignItems = "CENTER";
  btnDrill.fills = solid(C.forestBase, 1);
  btnDrill.strokes = solid(C.mint, 0.7);
  btnDrill.strokeWeight = 1;
  btnDrill.appendChild(createText("Start 5-Min Transition Drill ↗", 8, "Bold", C.mint));
  aiCard.appendChild(btnDrill);
  content.appendChild(aiCard);

  // --- Bento Card 4: 7-Day Accuracy Trend Chart (Matching patokan.png) ---
  const trendCard = makeMobileCard("Accuracy Trend Card", 9, 4);
  const trHead = createFullRow(341, 6);
  trHead.appendChild(createText("ACCURACY TREND", 8, "Bold", C.textZinc400));
  trHead.appendChild(createText("94.2%  ↑ 3.8%", 8, "Bold", C.mint));
  trendCard.appendChild(trHead);

  const barChart = createFullRow(341, 4);
  const days = [
    { day: "Mon", val: 30, pct: "72%" },
    { day: "Tue", val: 42, pct: "84%" },
    { day: "Wed", val: 48, pct: "88%" },
    { day: "Thu", val: 44, pct: "86%" },
    { day: "Fri", val: 52, pct: "92%" },
    { day: "Sat", val: 56, pct: "95%" },
    { day: "Today", val: 62, pct: "98%", active: true }
  ];

  for (const d of days) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.resize(44, 42);
    col.primaryAxisSizingMode = "FIXED";
    col.counterAxisSizingMode = "FIXED";
    col.primaryAxisAlignItems = "MAX";
    col.counterAxisAlignItems = "CENTER";
    col.itemSpacing = 2;
    col.fills = [];

    const bar = figma.createFrame();
    bar.resize(22, Math.round(d.val * 0.40));
    bar.cornerRadius = 3;
    bar.fills = solid(d.active ? C.mint : { r: 0.12, g: 0.16, b: 0.22 }, 1);
    col.appendChild(bar);

    col.appendChild(createText(d.day, 7, d.active ? "Bold" : "Regular", d.active ? C.mint : C.textZinc400));
    barChart.appendChild(col);
  }
  trendCard.appendChild(barChart);
  content.appendChild(trendCard);

  // --- Bento Card 5: Recent Singing Takes ---
  const takesCard = makeMobileCard("Recent Singing Takes Card", 9, 4);
  const tkHead = createFullRow(341, 6);
  tkHead.appendChild(createText("RECENT SINGING TAKES", 8, "Bold", C.textZinc400));
  tkHead.appendChild(createText("View All", 8, "Bold", C.mint));
  takesCard.appendChild(tkHead);

  function makeTakeRow(title, sub, score) {
    const row = createFullRow(341, 6);
    row.paddingTop = 1; row.paddingBottom = 1;

    const tL = createAutoCol(1);
    tL.counterAxisSizingMode = "FIXED";
    tL.resize(250, 22);
    tL.appendChild(createText(title, 8, "Bold", C.textWhite));
    tL.appendChild(createText(sub, 7, "Regular", C.textZinc400));
    row.appendChild(tL);

    row.appendChild(makePill(score, C.mint, C.forestBase, C.mint, 7));
    return row;
  }

  takesCard.appendChild(makeTakeRow("Bohemian Rhapsody", "2 min ago • 96% In-Tune", "+15 pts"));
  takesCard.appendChild(makeTakeRow("Nessun Dorma", "Yesterday • Key G • F4 Sharp Fals", "98 / 100"));
  content.appendChild(takesCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("studio");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M03. MOBILE DIAGNOSTIC SINGING REPORT & PIANO ROLL (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Report Screen 03
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================



function buildMobileReportScreen() {
  const root = createMobileScreen("VocalSense AI — M03. Mobile Singing Report & Piano Roll", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/report/take-04", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Singing Report", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Report Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Score Hero Banner Card ---
  const scoreCard = makeMobileCard("Score Card", 10, 5);
  const scTop = createFullRow(341, 8);

  // Mathematically Centered 56x56 Score Ring
  const ring = figma.createFrame();
  ring.name = "Score Ring Frame";
  ring.layoutMode = "VERTICAL";
  ring.primaryAxisSizingMode = "FIXED";
  ring.counterAxisSizingMode = "FIXED";
  ring.resize(56, 56);
  ring.cornerRadius = 28;
  ring.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.28, b: 0.18, a: 1 } },
      { position: 1.0, color: { r: 0.04, g: 0.10, b: 0.14, a: 1 } }
    ]
  }];
  ring.strokes = solid(C.mint, 1);
  ring.strokeWeight = 2;
  ring.primaryAxisAlignItems = "CENTER";
  ring.counterAxisAlignItems = "CENTER";
  ring.itemSpacing = 0;
  ring.paddingLeft = 0;
  ring.paddingRight = 0;
  ring.paddingTop = 0;
  ring.paddingBottom = 0;

  const scoreNum = createText("96", 18, "Bold", C.mint);
  scoreNum.textAlignHorizontal = "CENTER";
  scoreNum.textAlignVertical = "CENTER";
  ring.appendChild(scoreNum);

  const scoreLbl = createText("SCORE", 7, "Bold", C.mint);
  scoreLbl.textAlignHorizontal = "CENTER";
  scoreLbl.textAlignVertical = "CENTER";
  ring.appendChild(scoreLbl);
  scTop.appendChild(ring);

  const scoreTxt = createAutoCol(2);
  scoreTxt.counterAxisSizingMode = "FIXED";
  scoreTxt.resize(270, 46);

  const badgeRow = createAutoRow(6);
  badgeRow.appendChild(makePill("CONSERVATORY VIRTUOSO", C.mint, C.forestBase, C.mint, 7));
  badgeRow.appendChild(createText("Top 2% Globally", 8, "Regular", C.textZinc400));
  scoreTxt.appendChild(badgeRow);

  scoreTxt.appendChild(createText("S-Tier Intonation & Resonance", 11, "Bold", C.textWhite));
  scoreTxt.appendChild(createText("96% note accuracy with uniform 5.8Hz vibrato.", 8, "Regular", C.textZinc400));
  scTop.appendChild(scoreTxt);
  scoreCard.appendChild(scTop);

  // 3-Pill Metric Bento Row
  const mcRow = createFullRow(341, 4);
  function makeMetricPill(label, val, status) {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL";
    p.resize(109, 34);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.paddingLeft = 6;
    p.paddingRight = 6;
    p.paddingTop = 2;
    p.paddingBottom = 2;
    p.cornerRadius = 5;
    p.fills = solid(C.forestBase, 0.8);
    p.strokes = solid(C.mint, 0.5);
    p.strokeWeight = 1;
    p.itemSpacing = 1;
    p.appendChild(createText(label, 7, "Bold", C.textZinc400));
    p.appendChild(createText(val, 10, "Bold", C.mint));
    p.appendChild(createText(status, 7, "Medium", C.emerald));
    return p;
  }
  mcRow.appendChild(makeMetricPill("PITCH PRECISION", "96%", "±2 cents stable"));
  mcRow.appendChild(makeMetricPill("VIBRATO RATE", "5.8 Hz", "Ideal Oscillation"));
  mcRow.appendChild(makeMetricPill("FORMANT Q", "4.2", "Warm Pharyngeal"));
  scoreCard.appendChild(mcRow);
  content.appendChild(scoreCard);

  // --- 16-Bar Piano Roll Synchronization Card ---
  const rollCard = makeMobileCard("Piano Roll Card", 9, 5);
  const rcHead = createFullRow(341, 6);
  rcHead.appendChild(createText("PIANO ROLL SYNCHRONIZATION", 8, "Bold", C.textZinc400));
  rcHead.appendChild(makePill("BARS 1–16", C.mint, C.forestBase, C.mint, 7));
  rollCard.appendChild(rcHead);

  // Grid Canvas with Notes
  const gridBox = figma.createFrame();
  gridBox.resize(341, 56);
  gridBox.cornerRadius = 6;
  gridBox.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  gridBox.strokes = solid(C.glassBorder, 0.7);
  gridBox.strokeWeight = 1;
  gridBox.clipsContent = true;

  // Horizontal pitch guidelines
  for (let y = 14; y < 56; y += 14) {
    const line = figma.createLine();
    line.resize(341, 0); line.x = 0; line.y = y;
    line.strokes = solid(C.glassBorder, 0.35);
    gridBox.appendChild(line);
  }

  // Note Blocks (Bohemian Rhapsody motif)
  function makeNote(pitch, x, y, w, color = C.mint) {
    const note = figma.createFrame();
    note.resize(w, 11); note.x = x; note.y = y;
    note.cornerRadius = 3;
    note.fills = solid(color, 1);
    note.layoutMode = "HORIZONTAL";
    note.primaryAxisAlignItems = "CENTER";
    note.counterAxisAlignItems = "CENTER";
    note.appendChild(createText(pitch, 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
    return note;
  }

  gridBox.appendChild(makeNote("F4", 10, 36, 32));
  gridBox.appendChild(makeNote("G4", 48, 24, 38));
  gridBox.appendChild(makeNote("Bb4", 92, 10, 46));
  gridBox.appendChild(makeNote("G4", 144, 24, 34));
  gridBox.appendChild(makeNote("F4", 184, 36, 42));
  gridBox.appendChild(makeNote("Bb4", 232, 10, 38));
  gridBox.appendChild(makeNote("G4", 276, 24, 34));
  rollCard.appendChild(gridBox);
  content.appendChild(rollCard);

  // --- Gemini AI Prescription Card ---
  const aiCard = makeMobileCard("AI Prescription Card", 9, 4);
  const acHead = createFullRow(341, 6);
  const acL = createAutoRow(5);
  acL.appendChild(createSvgIcon("sparkle", "#00F5A0", 11));
  acL.appendChild(createText("GEMINI AI VOICE PRESCRIPTION", 8, "Bold", C.mint));
  acHead.appendChild(acL);
  acHead.appendChild(makePill("CLINICAL ANALYSIS", C.mint, C.forestBase, C.mint, 7));
  aiCard.appendChild(acHead);

  aiCard.appendChild(createText("Smooth Transition across Passaggio (F#4–G4)", 9.5, "Bold", C.textWhite));
  aiCard.appendChild(createParagraph("Your intonation was pristine across bars 1–10. On bar 12, subglottic pressure dropped by 8% during sustained vowel /i/, causing a slight pitch flutter.", 341, 7.5, "Regular", C.textZinc400, 11));
  content.appendChild(aiCard);

  // --- Audio Player Scrub Bar ---
  const playerCard = makeMobileCard("Audio Player Scrub Card", 8, 4);
  const plyRow = createFullRow(341, 8);
  const btnPlay = createCenteredIconButton("mic", "#00F5A0", 24, 12, 12, C.forestBase, C.mint);
  plyRow.appendChild(btnPlay);

  const barTrack = figma.createFrame();
  barTrack.resize(250, 4);
  barTrack.cornerRadius = 2;
  barTrack.fills = solid({ r: 0.12, g: 0.16, b: 0.22 }, 1);
  const barProg = figma.createFrame();
  barProg.resize(150, 4);
  barProg.cornerRadius = 2;
  barProg.fills = solid(C.mint, 1);
  barTrack.appendChild(barProg);
  plyRow.appendChild(barTrack);

  plyRow.appendChild(createText("02:18", 8, "Bold", C.textZinc300));
  playerCard.appendChild(plyRow);
  content.appendChild(playerCard);

  // Dual Action Buttons (Export PDF & Retake)
  const ctaRow = createFullRow(361, 8);
  const btnPdf = figma.createFrame();
  btnPdf.name = "Btn/Export Conservatory PDF";
  btnPdf.layoutMode = "HORIZONTAL";
  btnPdf.resize(176, 32);
  btnPdf.primaryAxisSizingMode = "FIXED";
  btnPdf.counterAxisSizingMode = "FIXED";
  btnPdf.cornerRadius = 6;
  btnPdf.primaryAxisAlignItems = "CENTER";
  btnPdf.counterAxisAlignItems = "CENTER";
  btnPdf.fills = solid(C.forestBase, 1);
  btnPdf.strokes = solid(C.mint, 0.9);
  btnPdf.strokeWeight = 1;
  btnPdf.appendChild(createText("Export Conservatory PDF", 8.5, "Bold", C.mint));
  ctaRow.appendChild(btnPdf);

  const btnReTake = figma.createFrame();
  btnReTake.name = "Btn/Re-Take Song";
  btnReTake.layoutMode = "HORIZONTAL";
  btnReTake.resize(176, 32);
  btnReTake.primaryAxisSizingMode = "FIXED";
  btnReTake.counterAxisSizingMode = "FIXED";
  btnReTake.cornerRadius = 6;
  btnReTake.primaryAxisAlignItems = "CENTER";
  btnReTake.counterAxisAlignItems = "CENTER";
  btnReTake.fills = solid(C.glassElevated, 1);
  btnReTake.strokes = solid(C.glassBorder, 0.8);
  btnReTake.strokeWeight = 1;
  btnReTake.appendChild(createText("Re-Take Song", 8.5, "Bold", C.textZinc300));
  ctaRow.appendChild(btnReTake);
  content.appendChild(ctaRow);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("reports");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M04. MOBILE VOCALIST TRAINING CENTER (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Training Screen 04
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================



function buildMobileTrainingScreen() {
  const root = createMobileScreen("VocalSense AI — M04. Mobile Training Center", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/training", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Training Center", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Training Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Vocalist Header Card ---
  const userCard = makeMobileCard("Vocalist Header Card", 10, 5);
  const ucRow = createFullRow(341, 8);
  const ucL = createAutoRow(10);

  // Centered circular avatar
  const av = createCircularAvatar(40, "ER", C.mint, C.forestBase, 14);
  ucL.appendChild(av);

  const uTxt = createAutoCol(2);
  uTxt.counterAxisSizingMode = "FIXED";
  uTxt.resize(190, 34);
  uTxt.appendChild(createText("Ethan Reynolds", 12, "Bold", C.textWhite));
  uTxt.appendChild(createText("Classical Tenor • Daily Goal: 20 Mins", 8, "Regular", C.textZinc400));
  ucL.appendChild(uTxt);
  ucRow.appendChild(ucL);

  ucRow.appendChild(makePill("WEEK 4 OF 12", C.mint, C.forestBase, C.mint, 7));
  userCard.appendChild(ucRow);
  content.appendChild(userCard);

  // --- Consistency Streak Tracker Card: 14-Day Streak (Calendar Mon-Sun) ---
  const streakCard = makeMobileCard("Consistency Streak Card", 9, 5);
  const stHead = createFullRow(341, 6);
  stHead.appendChild(createText("CONSISTENCY TRACKER", 8, "Bold", C.textZinc400));
  stHead.appendChild(createText("14-Day Streak Active", 8, "Bold", C.mint));
  streakCard.appendChild(stHead);

  const calRow = createFullRow(341, 4);
  const week = [
    { day: "Mon", done: true },
    { day: "Tue", done: true },
    { day: "Wed", done: true },
    { day: "Thu", done: true },
    { day: "Fri", done: true },
    { day: "Sat", done: true },
    { day: "Sun", today: true }
  ];
  week.forEach(w => {
    const dBox = figma.createFrame();
    dBox.layoutMode = "VERTICAL";
    dBox.resize(44, 36);
    dBox.primaryAxisSizingMode = "FIXED";
    dBox.counterAxisSizingMode = "FIXED";
    dBox.paddingTop = 3;
    dBox.paddingBottom = 3;
    dBox.counterAxisAlignItems = "CENTER";
    dBox.primaryAxisAlignItems = "CENTER";
    dBox.itemSpacing = 2;
    dBox.cornerRadius = 5;
    const isToday = w.today;
    dBox.fills = solid(isToday ? C.forestBase : C.glassElevated, 1);
    dBox.strokes = solid(isToday ? C.mint : C.glassBorder, isToday ? 1 : 0.6);
    dBox.strokeWeight = 1;
    dBox.appendChild(createText(w.day, 7, "Medium", isToday ? C.mint : C.textZinc400));
    dBox.appendChild(createSvgIcon("check", isToday ? "#00F5A0" : "#10B981", 10));
    calRow.appendChild(dBox);
  });
  streakCard.appendChild(calRow);
  content.appendChild(streakCard);

  // --- Daily Prescribed Drills Card (3 Drills) ---
  const drillCard = makeMobileCard("Daily Prescribed Drills", 9, 5);
  const drHead = createFullRow(341, 6);
  drHead.appendChild(createText("TODAY'S VOCAL DRILLS", 8, "Bold", C.textZinc400));
  drHead.appendChild(createText("3 Modules (23 Mins)", 8, "Bold", C.mint));
  drillCard.appendChild(drHead);

  function makeDrillItem(title, dur, level, isHot) {
    const item = createFullRow(341, 6);
    item.paddingTop = 2; item.paddingBottom = 2;
    const itL = createAutoRow(7);

    const ic = figma.createFrame();
    ic.layoutMode = "HORIZONTAL";
    ic.primaryAxisSizingMode = "FIXED";
    ic.counterAxisSizingMode = "FIXED";
    ic.resize(22, 22);
    ic.cornerRadius = 5;
    ic.fills = solid(isHot ? C.forestBase : C.glassElevated, 1);
    ic.strokes = solid(isHot ? C.mint : C.glassBorder, isHot ? 1 : 0.6);
    ic.strokeWeight = 1;
    ic.primaryAxisAlignItems = "CENTER";
    ic.counterAxisAlignItems = "CENTER";
    ic.paddingLeft = 0;
    ic.paddingRight = 0;
    ic.paddingTop = 0;
    ic.paddingBottom = 0;
    ic.appendChild(createSvgIcon("zap", isHot ? "#00F5A0" : "#8B9DAF", 11));
    itL.appendChild(ic);

    const itTxt = createAutoCol(1);
    itTxt.counterAxisSizingMode = "FIXED";
    itTxt.resize(220, 24);
    itTxt.appendChild(createText(title, 8.5, "Bold", C.textWhite));
    itTxt.appendChild(createText(dur + " • " + level, 7, "Regular", C.textZinc400));
    itL.appendChild(itTxt);
    item.appendChild(itL);

    const btn = figma.createFrame();
    btn.layoutMode = "HORIZONTAL";
    btn.primaryAxisSizingMode = "AUTO";
    btn.counterAxisSizingMode = "AUTO";
    btn.paddingLeft = 8;
    btn.paddingRight = 8;
    btn.paddingTop = 3;
    btn.paddingBottom = 3;
    btn.cornerRadius = 4;
    btn.fills = solid(isHot ? C.mint : C.glassElevated, 1);
    btn.appendChild(createText(isHot ? "Start" : "Play", 8, "Bold", isHot ? { r: 0.02, g: 0.12, b: 0.08 } : C.textWhite));
    item.appendChild(btn);
    return item;
  }

  drillCard.appendChild(makeDrillItem("Pitch Agility & Solfeggio Arpeggios", "10 min", "Advanced", true));
  drillCard.appendChild(makeDrillItem("Octave Glide & Mix-Voice Transition", "8 min", "Intermediate", false));
  drillCard.appendChild(makeDrillItem("Vocal Cord Compression & Resonance", "5 min", "Foundation", false));
  content.appendChild(drillCard);

  // --- Agility Benchmark Card ---
  const benchCard = makeMobileCard("Agility Benchmark", 9, 4);
  const bcHead = createFullRow(341, 6);
  bcHead.appendChild(createText("AGILITY BENCHMARK", 8, "Bold", C.textZinc400));
  bcHead.appendChild(makePill("+14.8% IMPROVED", C.mint, C.forestBase, C.mint, 7));
  benchCard.appendChild(bcHead);

  benchCard.appendChild(createText("Interval Latency: 180ms → 112ms", 9.5, "Bold", C.textWhite));
  benchCard.appendChild(createParagraph("Your vocal agility between C4 and G4 has improved by 68 milliseconds compared to Week 1 baseline.", 341, 7.5, "Regular", C.textZinc400, 11));

  const btnWorkout = figma.createFrame();
  btnWorkout.name = "Btn/Start Workout";
  btnWorkout.layoutMode = "HORIZONTAL";
  btnWorkout.resize(341, 28);
  btnWorkout.primaryAxisSizingMode = "FIXED";
  btnWorkout.counterAxisSizingMode = "FIXED";
  btnWorkout.cornerRadius = 6;
  btnWorkout.fills = solid(C.forestBase, 1);
  btnWorkout.strokes = solid(C.mint, 0.9);
  btnWorkout.strokeWeight = 1;
  btnWorkout.primaryAxisAlignItems = "CENTER";
  btnWorkout.counterAxisAlignItems = "CENTER";
  btnWorkout.appendChild(createText("Start Today's 15-Min Workout ↗", 9, "Bold", C.mint));
  benchCard.appendChild(btnWorkout);
  content.appendChild(benchCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("training");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M05. MOBILE AUTHENTICATION & CONSERVATORY LOGIN (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 05
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



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



    // =============================================================================
// VOCALSENSE AI — M05B. MOBILE ONBOARDING & VOCAL CALIBRATION WIZARD (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 05B
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



function buildMobileOnboardingScreen() {
  const root = createMobileScreen("VocalSense AI — M05B. Mobile Onboarding Wizard", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/onboarding", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header
  const header = createMobileWebHeader("Onboarding Wizard", "Auth", false);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Onboarding Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Step Indicator Header ---
  const stepRow = createFullRow(361, 4);
  function makeStepPill(num, lbl, active, done) {
    const p = figma.createFrame();
    p.layoutMode = "HORIZONTAL";
    p.resize(117, 26);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.primaryAxisAlignItems = "CENTER";
    p.counterAxisAlignItems = "CENTER";
    p.cornerRadius = 5;
    p.fills = solid(active ? C.forestBase : C.glassElevated, 1);
    p.strokes = solid(active ? C.mint : (done ? C.emerald : C.glassBorder), active || done ? 1 : 0.6);
    p.strokeWeight = 1;
    p.appendChild(createText(num + ". " + lbl, 7.5, active ? "Bold" : "Medium", active ? C.mint : (done ? C.emerald : C.textZinc400)));
    return p;
  }
  stepRow.appendChild(makeStepPill("1", "Mic Check", false, true));
  stepRow.appendChild(makeStepPill("2", "Vocal Range", true, false));
  stepRow.appendChild(makeStepPill("3", "Choose Goal", false, false));
  content.appendChild(stepRow);

  // --- Mic Status Card ---
  const micCard = makeMobileCard("Mic Status Card", 9, 4);
  const mcRow = createFullRow(341, 6);
  const mcL = createAutoRow(6);
  mcL.appendChild(createSvgIcon("mic", "#00F5A0", 12));
  mcL.appendChild(createText("Smartphone / Studio Mic Calibrated", 8.5, "Bold", C.textWhite));
  mcRow.appendChild(mcL);
  mcRow.appendChild(makePill("48 kHz • 2.7ms", C.mint, C.forestBase, C.mint, 7));
  micCard.appendChild(mcRow);
  content.appendChild(micCard);

  // --- Vocal Classification Selector Card ---
  const classCard = makeMobileCard("Vocal Classification Card", 9, 5);
  const ccHead = createFullRow(341, 6);
  ccHead.appendChild(createText("SELECT YOUR VOCAL CLASSIFICATION", 8, "Bold", C.textZinc400));
  ccHead.appendChild(createText("Detected: F3 (174.8 Hz)", 8, "Bold", C.mint));
  classCard.appendChild(ccHead);

  classCard.appendChild(createParagraph("Hum your comfortable lowest and highest pitch into your mic. We detected Tenor range characteristics.", 341, 7.5, "Regular", C.textZinc400, 11));

  function makeVoiceOption(name, range, desc, selected) {
    const opt = figma.createFrame();
    opt.layoutMode = "HORIZONTAL";
    opt.resize(341, 34);
    opt.primaryAxisSizingMode = "FIXED";
    opt.counterAxisSizingMode = "FIXED";
    opt.paddingLeft = 8;
    opt.paddingRight = 8;
    opt.primaryAxisAlignItems = "SPACE_BETWEEN";
    opt.counterAxisAlignItems = "CENTER";
    opt.cornerRadius = 6;
    opt.fills = solid(selected ? C.forestBase : C.glassElevated, 1);
    opt.strokes = solid(selected ? C.mint : C.glassBorder, selected ? 1 : 0.6);
    opt.strokeWeight = 1;

    const opL = createAutoCol(1);
    opL.counterAxisSizingMode = "FIXED";
    opL.resize(280, 24);
    opL.appendChild(createText(name + " (" + range + ")", 8.5, selected ? "Bold" : "Medium", selected ? C.mint : C.textWhite));
    opL.appendChild(createText(desc, 7, "Regular", C.textZinc400));
    opL.paddingLeft = 0;
    opL.paddingRight = 0;
    opL.paddingTop = 0;
    opL.paddingBottom = 0;
    opt.appendChild(opL);

    const rad = figma.createFrame();
    rad.resize(12, 12);
    rad.cornerRadius = 6;
    rad.fills = solid(selected ? C.mint : { r: 0.12, g: 0.16, b: 0.22 }, 1);
    rad.strokes = solid(selected ? C.mint : C.glassBorder, 1);
    rad.strokeWeight = 1;
    opt.appendChild(rad);
    return opt;
  }

  classCard.appendChild(makeVoiceOption("Tenor", "C3–A4", "High male vocal range with mix passaggio • Recommended", true));
  classCard.appendChild(makeVoiceOption("Baritone", "A2–F4", "Medium men's timbre with solid voice timbre", false));
  classCard.appendChild(makeVoiceOption("Bass", "E2–E4", "Deep resonance chest voice foundation", false));
  content.appendChild(classCard);

  // --- Goal Card ---
  const goalCard = makeMobileCard("Goal Card", 9, 4);
  const gcHead = createFullRow(341, 6);
  gcHead.appendChild(createText("CHOSEN SYLLABUS GOAL", 8, "Bold", C.textZinc400));
  gcHead.appendChild(makePill("CONSERVATORY", C.mint, C.forestBase, C.mint, 7));
  goalCard.appendChild(gcHead);
  goalCard.appendChild(createText("Mixed Voice Agility & Passaggio Intonation Stability", 9.5, "Bold", C.textWhite));
  content.appendChild(goalCard);

  // --- Real-time Pitch Test Strip ---
  const testCard = makeMobileCard("Live Calibration Strip", 9, 4);
  const tcHead = createFullRow(341, 6);
  tcHead.appendChild(createText("LIVE SPECTROGRAM SAMPLING", 8, "Bold", C.textZinc400));
  tcHead.appendChild(createText("DSP ACTIVE", 8, "Bold", C.mint));
  testCard.appendChild(tcHead);

  const specBar = figma.createFrame();
  specBar.resize(341, 18);
  specBar.cornerRadius = 4;
  specBar.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  specBar.strokes = solid(C.glassBorder, 0.7);
  specBar.strokeWeight = 1;

  const miniWave = figma.createVector();
  miniWave.vectorPaths = [{
    windingRule: "NONE",
    data: "M 0 10 C 60 4 120 16 180 10 C 240 4 300 16 341 10"
  }];
  miniWave.resize(341, 12);
  miniWave.strokes = solid(C.mint, 1);
  miniWave.strokeWeight = 1.5;
  miniWave.x = 0; miniWave.y = 3;
  specBar.appendChild(miniWave);
  testCard.appendChild(specBar);
  content.appendChild(testCard);

  // Primary Action CTA
  const btnEnter = figma.createFrame();
  btnEnter.name = "Btn/Complete Calibration";
  btnEnter.layoutMode = "HORIZONTAL";
  btnEnter.resize(361, 34);
  btnEnter.primaryAxisSizingMode = "FIXED";
  btnEnter.counterAxisSizingMode = "FIXED";
  btnEnter.cornerRadius = 6;
  btnEnter.primaryAxisAlignItems = "CENTER";
  btnEnter.counterAxisAlignItems = "CENTER";
  btnEnter.fills = solid(C.mint, 1);
  btnEnter.appendChild(createText("Complete Calibration & Enter Studio ↗", 9.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  content.appendChild(btnEnter);

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M06. MOBILE ACCOUNT SETTINGS & PREFERENCES (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 06
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Centering, Zero Overlap)
// =============================================================================



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



    // =============================================================================
// VOCALSENSE AI — M06B. MOBILE MIDTRANS CHECKOUT & QRIS SHEET (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 06B
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



function buildMobileMidtransScreen() {
  const root = createMobileScreen("VocalSense AI — M06B. Mobile Midtrans Payment Sheet", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/billing/checkout", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Header (Checkout flow)
  const header = createMobileWebHeader("Midtrans Checkout", "Settings", false);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 716)
  const content = figma.createFrame();
  content.name = "Midtrans Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 716);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.counterAxisAlignItems = "CENTER";
  content.fills = [];
  content.clipsContent = false;

  // --- Order Summary Card ---
  const orderCard = makeMobileCard("Order Summary Card", 10, 5);
  const ocHead = createFullRow(339, 6);
  ocHead.appendChild(createText("VOCALSENSE PRO PASS", 8.5, "Bold", C.mint));
  ocHead.appendChild(createText("Rp 79.000", 13, "Bold", C.textWhite));
  orderCard.appendChild(ocHead);

  orderCard.appendChild(createText("1-Month Conservatory Membership • Billed Monthly", 7.5, "Regular", C.textZinc400));

  const div = figma.createLine();
  div.resize(339, 0); div.strokes = solid(C.glassBorder, 0.7);
  orderCard.appendChild(div);

  const ocFoot = createFullRow(339, 6);
  ocFoot.appendChild(createText("PPN 11% (Included)", 7.5, "Regular", C.textZinc400));
  ocFoot.appendChild(createText("Total: Rp 79.000", 8.5, "Bold", C.mint));
  orderCard.appendChild(ocFoot);
  content.appendChild(orderCard);

  // --- QRIS Instant Payment Card ---
  const qrisCard = makeMobileCard("QRIS Card", 10, 6);
  qrisCard.counterAxisAlignItems = "CENTER";

  const qrHead = createFullRow(339, 6);
  qrHead.appendChild(createText("QRIS INSTANT PAYMENT", 8, "Bold", C.textZinc400));
  qrHead.appendChild(makePill("EXP: 14:59", { r: 1, g: 0.8, b: 0.2 }, { r: 0.25, g: 0.18, b: 0.04 }, { r: 1, g: 0.7, b: 0.1 }, 7));
  qrisCard.appendChild(qrHead);

  // National QRIS Frame
  const qrFrame = figma.createFrame();
  qrFrame.name = "QRIS Graphic Container";
  qrFrame.resize(180, 180);
  qrFrame.cornerRadius = 8;
  qrFrame.fills = solid(C.textWhite, 1);
  qrFrame.layoutMode = "VERTICAL";
  qrFrame.counterAxisAlignItems = "CENTER";

  const qRedBanner = figma.createFrame();
  qRedBanner.resize(180, 22);
  qRedBanner.fills = solid({ r: 0.88, g: 0.15, b: 0.18 }, 1);
  qRedBanner.layoutMode = "HORIZONTAL";
  qRedBanner.primaryAxisAlignItems = "CENTER";
  qRedBanner.counterAxisAlignItems = "CENTER";
  qRedBanner.appendChild(createText("QRIS STANDAR PEMBAYARAN NASIONAL", 6.5, "Bold", C.textWhite));
  qrFrame.appendChild(qRedBanner);

  // Center QR Graphic
  const qrCenter = figma.createFrame();
  qrCenter.resize(140, 140);
  qrCenter.fills = solid({ r: 0.08, g: 0.10, b: 0.14 }, 1);
  qrCenter.cornerRadius = 4;
  qrCenter.layoutMode = "VERTICAL";
  qrCenter.primaryAxisAlignItems = "CENTER";
  qrCenter.counterAxisAlignItems = "CENTER";

  const qrTxt = createText("SCAN TO PAY", 10, "Bold", C.mint);
  qrTxt.textAlignHorizontal = "CENTER";
  qrCenter.appendChild(qrTxt);
  qrCenter.appendChild(createText("GoPay • OVO • BCA • Dana", 7, "Regular", C.textZinc400));
  qrFrame.appendChild(qrCenter);

  qrisCard.appendChild(qrFrame);
  qrisCard.appendChild(createText("Scan QRIS using BCA mobile, GoPay, OVO, Dana or mobile banking.", 7.5, "Regular", C.textZinc400));
  content.appendChild(qrisCard);

  // Payment Channel Selector
  const chanCard = makeMobileCard("Alternative Payment Channels", 9, 4);
  const chHead = createFullRow(339, 6);
  chHead.appendChild(createText("ALTERNATIVE CHANNELS", 8, "Bold", C.textZinc400));
  chanCard.appendChild(chHead);

  function makeChannelRow(title, fee, selected) {
    const row = createFullRow(339, 6);
    row.paddingTop = 2; row.paddingBottom = 2;
    const rL = createAutoRow(6);
    rL.appendChild(createSvgIcon("shield", selected ? "#00F5A0" : "#8B9DAF", 11));
    rL.appendChild(createText(title, 8, selected ? "Bold" : "Medium", selected ? C.mint : C.textWhite));
    row.appendChild(rL);
    row.appendChild(createText(fee, 7, "Regular", C.textZinc400));
    return row;
  }

  chanCard.appendChild(makeChannelRow("BCA Virtual Account", "Instant verify", false));
  chanCard.appendChild(makeChannelRow("Credit / Debit Card (Visa/Mastercard)", "3DS Verified", false));
  content.appendChild(chanCard);

  // Primary Action
  const btnDone = figma.createFrame();
  btnDone.name = "Btn/Check Payment Status";
  btnDone.layoutMode = "HORIZONTAL";
  btnDone.resize(361, 34);
  btnDone.primaryAxisSizingMode = "FIXED";
  btnDone.counterAxisSizingMode = "FIXED";
  btnDone.cornerRadius = 6;
  btnDone.primaryAxisAlignItems = "CENTER";
  btnDone.counterAxisAlignItems = "CENTER";
  btnDone.fills = solid(C.mint, 1);
  btnDone.appendChild(createText("I Have Paid with QRIS ↗", 9.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  content.appendChild(btnDone);

  root.appendChild(content);

  // 4. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M07. MOBILE ADMINISTRATOR TELEMETRY CONSOLE (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 07
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



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



    // =============================================================================
// VOCALSENSE AI — M08. MOBILE VOCAL ARCHIVE & DOCUMENT VAULT (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Archive Screen 08
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================



function buildMobileDocumentsScreen() {
  const root = createMobileScreen("VocalSense AI — M08. Mobile Vocal Archive", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/archive", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Vocal Archive", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Archive Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Search & Filter Bar Card ---
  const searchCard = makeMobileCard("Search & Filters Card", 9, 5);
  const sInput = createFullRow(341, 6);
  sInput.paddingLeft = 8;
  sInput.paddingRight = 8;
  sInput.paddingTop = 4;
  sInput.paddingBottom = 4;
  sInput.cornerRadius = 6;
  sInput.fills = solid({ r: 0.03, g: 0.05, b: 0.07 }, 1);
  sInput.strokes = solid(C.glassBorder, 0.7);
  sInput.strokeWeight = 1;

  const sL = createAutoRow(6);
  sL.appendChild(createSvgIcon("search", "#8B9DAF", 11));
  sL.appendChild(createText("Search aria, take #, composer...", 8.5, "Regular", C.textZinc400));
  sInput.appendChild(sL);
  sInput.appendChild(makePill("348 TAKES", C.mint, C.forestBase, C.mint, 7));
  searchCard.appendChild(sInput);

  // Filter Chips Row
  const chipRow = createFullRow(341, 4);
  const filters = [
    { label: "All (348)", active: true },
    { label: "Solos (184)", active: false },
    { label: "Reports (42)", active: false },
    { label: "Drills (122)", active: false }
  ];
  filters.forEach(f => {
    const ch = figma.createFrame();
    ch.layoutMode = "HORIZONTAL";
    ch.primaryAxisSizingMode = "AUTO";
    ch.counterAxisSizingMode = "AUTO";
    ch.paddingLeft = 7;
    ch.paddingRight = 7;
    ch.paddingTop = 2.5;
    ch.paddingBottom = 2.5;
    ch.cornerRadius = 5;
    ch.fills = solid(f.active ? C.forestBase : C.glassElevated, 1);
    ch.strokes = solid(f.active ? C.mint : C.glassBorder, f.active ? 1 : 0.6);
    ch.strokeWeight = 1;
    ch.appendChild(createText(f.label, 7.5, f.active ? "Bold" : "Medium", f.active ? C.mint : C.textZinc400));
    chipRow.appendChild(ch);
  });
  searchCard.appendChild(chipRow);
  content.appendChild(searchCard);

  // --- 4 Singing Take Cards (Matching Desktop 08) ---
  function makeTakeItemCard(title, composer, meta, scoreVal, dur) {
    const card = makeMobileCard("Take/" + title, 9, 3);

    const row1 = createFullRow(341, 6);
    const titCol = createAutoCol(1);
    titCol.counterAxisSizingMode = "FIXED";
    titCol.resize(230, 22);
    titCol.appendChild(createText(title, 8.5, "Bold", C.textWhite));
    titCol.appendChild(createText(composer + " • " + meta, 7, "Regular", C.textZinc400));
    row1.appendChild(titCol);

    const rR = createAutoRow(5);
    rR.appendChild(makePill(scoreVal, C.mint, C.forestBase, C.mint, 7));
    const btnPlay = createCenteredIconButton("mic", "#00F5A0", 20, 10, 5, C.forestBase, C.mint);
    rR.appendChild(btnPlay);
    row1.appendChild(rR);
    card.appendChild(row1);

    const row2 = createFullRow(341, 6);
    row2.appendChild(createText("Duration: " + dur + " • 48kHz FLAC Master", 7, "Regular", C.textZinc500));
    row2.appendChild(createText("Download PDF ↗", 7.5, "Bold", C.mint));
    card.appendChild(row2);
    return card;
  }

  content.appendChild(makeTakeItemCard("Bohemian Rhapsody (Take #04)", "Freddie Mercury / Queen", "Key Bb Major", "96 / 100", "03:45"));
  content.appendChild(makeTakeItemCard("Nessun Dorma (Take #02)", "Giacomo Puccini", "Key G Major • Tenor Aria", "98 / 100", "02:58"));
  content.appendChild(makeTakeItemCard("Caro Mio Ben (Take #05)", "Giuseppe Giordani", "Key Eb Major • Bel Canto", "92 / 100", "02:15"));
  content.appendChild(makeTakeItemCard("Una Furtiva Lagrima", "Gaetano Donizetti", "Key Bb Minor • Romance", "94 / 100", "04:10"));

  // Storage Quota Card
  const quotaCard = makeMobileCard("Storage Quota", 8, 3);
  const qHead = createFullRow(341, 6);
  qHead.appendChild(createText("FLAC STORAGE QUOTA", 7.5, "Bold", C.textZinc400));
  qHead.appendChild(createText("1.4 GB / 10 GB", 7.5, "Bold", C.mint));
  quotaCard.appendChild(qHead);

  const qTrack = figma.createFrame();
  qTrack.resize(341, 4);
  qTrack.cornerRadius = 2;
  qTrack.fills = solid({ r: 0.12, g: 0.16, b: 0.22 }, 1);
  const qFill = figma.createFrame();
  qFill.resize(48, 4);
  qFill.cornerRadius = 2;
  qFill.fills = solid(C.mint, 1);
  qTrack.appendChild(qFill);
  quotaCard.appendChild(qTrack);
  content.appendChild(quotaCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("archive");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — M09. MOBILE VOCALIST PERSONAL PROFILE (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 09
// Anti-Slop (Zero Emojis, Pure SVG Icons, Mathematical Circular Avatar, Zero Overlap)
// =============================================================================



function buildMobileProfileScreen() {
  const root = createMobileScreen("VocalSense AI — M09. Mobile Vocalist Profile", 852);

  // 1. Mobile Web Browser Chrome (Safari/Chrome Top Bar with URL)
  const browserBar = createMobileBrowserBar("/profile/ethan-reynolds", "48kHz Active");
  root.appendChild(browserBar);

  // 2. Mobile Web Topbar (Header)
  const header = createMobileWebHeader("Vocalist Profile", "Studio", true);
  root.appendChild(header);

  // 3. Scrollable Content Area (y = 118, h = 662)
  const content = figma.createFrame();
  content.name = "Profile Web Content";
  content.layoutMode = "VERTICAL";
  content.resize(361, 662);
  content.counterAxisSizingMode = "FIXED";
  content.primaryAxisSizingMode = "AUTO";
  content.x = 16;
  content.y = 118;
  content.itemSpacing = 6;
  content.fills = [];
  content.clipsContent = false;

  // --- Hero Card (Matching Desktop 09 Profile Banner) ---
  const heroCard = makeMobileCard("Vocalist Profile Hero", 10, 6);
  heroCard.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0.0, color: { r: 0.02, g: 0.20, b: 0.14, a: 0.95 } },
      { position: 1.0, color: { r: 0.05, g: 0.09, b: 0.14, a: 0.90 } }
    ]
  }];
  heroCard.strokes = solid(C.mint, 0.45);

  const heroTop = createFullRow(341, 8);
  const avGroup = createAutoRow(10);

  // Mathematically perfect circular avatar (50x50, perfectly centered)
  const av = createCircularAvatar(50, "ER", C.mint, C.forestBase, 17);
  avGroup.appendChild(av);

  const idCol = createAutoCol(2);
  idCol.counterAxisSizingMode = "FIXED";
  idCol.resize(175, 46);

  const preRow = createAutoRow(5);
  preRow.appendChild(createText("PERSONAL PROFILE", 7, "Bold", C.mint));
  preRow.appendChild(makePill("VERIFIED", C.mint, C.forestBase, C.mint, 6.5));
  idCol.appendChild(preRow);

  idCol.appendChild(createText("Ethan Reynolds", 13, "Bold", C.textWhite));
  idCol.appendChild(createText("Tenor • Royal Conservatory London", 7.5, "Medium", C.textZinc300));
  avGroup.appendChild(idCol);
  heroTop.appendChild(avGroup);

  // Edit Profile Action
  const btnEdit = figma.createFrame();
  btnEdit.name = "Btn/Edit Profile";
  btnEdit.layoutMode = "HORIZONTAL";
  btnEdit.primaryAxisSizingMode = "AUTO";
  btnEdit.counterAxisSizingMode = "AUTO";
  btnEdit.paddingLeft = 8;
  btnEdit.paddingRight = 8;
  btnEdit.paddingTop = 4;
  btnEdit.paddingBottom = 4;
  btnEdit.cornerRadius = 5;
  btnEdit.fills = solid(C.forestBase, 1);
  btnEdit.strokes = solid(C.mint, 0.8);
  btnEdit.strokeWeight = 1;
  btnEdit.primaryAxisAlignItems = "CENTER";
  btnEdit.counterAxisAlignItems = "CENTER";
  btnEdit.appendChild(createText("Edit Profile", 8.5, "Bold", C.mint));
  heroTop.appendChild(btnEdit);
  heroCard.appendChild(heroTop);

  heroCard.appendChild(createParagraph("Classical crossover tenor exploring vocal biomechanics, passaggio stabilization, and microtonal intonation precision with VocalSense AI.", 341, 7.5, "Regular", C.textZinc300, 11));
  content.appendChild(heroCard);

  // --- 4 KPI Stats Row ---
  const statsRow = createFullRow(361, 5);
  function makeStatPill(val, lbl) {
    const p = figma.createFrame();
    p.layoutMode = "VERTICAL";
    p.resize(86, 36);
    p.primaryAxisSizingMode = "FIXED";
    p.counterAxisSizingMode = "FIXED";
    p.paddingTop = 3;
    p.paddingBottom = 3;
    p.counterAxisAlignItems = "CENTER";
    p.primaryAxisAlignItems = "CENTER";
    p.itemSpacing = 1;
    p.cornerRadius = 6;
    p.fills = solid(C.glassElevated, 1);
    p.strokes = solid(C.glassBorder, 0.7);
    p.strokeWeight = 1;
    p.appendChild(createText(val, 11, "Bold", C.mint));
    p.appendChild(createText(lbl, 7, "Regular", C.textZinc400));
    return p;
  }
  statsRow.appendChild(makeStatPill("348", "Takes"));
  statsRow.appendChild(makeStatPill("C3–G5", "Span"));
  statsRow.appendChild(makeStatPill("94.2%", "Accuracy"));
  statsRow.appendChild(makeStatPill("14 Days", "Streak"));
  content.appendChild(statsRow);

  // --- Vocal Practice Activity Card (Contribution Heatmap) ---
  const actCard = makeMobileCard("Vocal Activity Heatmap", 9, 4);
  const actHead = createFullRow(341, 6);
  actHead.appendChild(createText("VOCAL PRACTICE ACTIVITY", 8, "Bold", C.textZinc400));
  actHead.appendChild(createText("284 Hours Sung", 8, "Bold", C.mint));
  actCard.appendChild(actHead);

  const matFrame = figma.createFrame();
  matFrame.name = "Contribution Matrix";
  matFrame.layoutMode = "VERTICAL";
  matFrame.resize(341, 38);
  matFrame.itemSpacing = 3;
  matFrame.fills = [];

  const alphaLevels = [
    [0.1, 0.3, 0.8, 1.0, 0.3, 0.6, 0.9, 0.2, 0.5, 0.8, 1.0, 0.4, 0.9],
    [0.3, 0.7, 0.9, 1.0, 0.4, 0.8, 1.0, 0.3, 0.7, 0.9, 0.8, 0.6, 1.0],
    [0.1, 0.2, 0.1, 0.6, 0.9, 0.2, 0.5, 0.8, 0.3, 0.6, 0.5, 0.7, 0.9],
    [0.7, 1.0, 0.4, 0.8, 0.5, 1.0, 1.0, 0.4, 0.9, 0.7, 1.0, 1.0, 0.6]
  ];

  for (const rowArr of alphaLevels) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.resize(341, 7);
    row.itemSpacing = 3;
    row.fills = [];
    for (const a of rowArr) {
      const cell = figma.createFrame();
      cell.resize(23, 7);
      cell.cornerRadius = 2;
      cell.fills = solid(C.mint, a);
      row.appendChild(cell);
    }
    matFrame.appendChild(row);
  }
  actCard.appendChild(matFrame);
  content.appendChild(actCard);

  // --- Acoustic Register Span Bar Card ---
  const spanCard = makeMobileCard("Acoustic Register Span", 9, 4);
  const spHead = createFullRow(341, 6);
  spHead.appendChild(createText("ACOUSTIC REGISTER SPAN", 8, "Bold", C.textZinc400));
  spHead.appendChild(createText("2.6 Octaves (C3–G5)", 8, "Bold", C.mint));
  spanCard.appendChild(spHead);

  const spanTrack = figma.createFrame();
  spanTrack.resize(341, 16);
  spanTrack.cornerRadius = 4;
  spanTrack.clipsContent = true;
  spanTrack.layoutMode = "HORIZONTAL";

  const blk1 = figma.createFrame(); blk1.resize(110, 16); blk1.fills = solid({ r: 0.10, g: 0.72, b: 0.51 }, 1);
  blk1.layoutMode = "HORIZONTAL"; blk1.counterAxisAlignItems = "CENTER"; blk1.paddingLeft = 4;
  blk1.appendChild(createText("Chest: C3–F4", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk1);

  const blk2 = figma.createFrame(); blk2.resize(125, 16); blk2.fills = solid(C.mint, 1);
  blk2.layoutMode = "HORIZONTAL"; blk2.counterAxisAlignItems = "CENTER"; blk2.paddingLeft = 4;
  blk2.appendChild(createText("Mix: F#4–B4", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk2);

  const blk3 = figma.createFrame(); blk3.resize(106, 16); blk3.fills = solid({ r: 0.23, g: 0.71, b: 0.96 }, 1);
  blk3.layoutMode = "HORIZONTAL"; blk3.counterAxisAlignItems = "CENTER"; blk3.paddingLeft = 4;
  blk3.appendChild(createText("Head: C5–G5", 6.5, "Bold", { r: 0.02, g: 0.12, b: 0.08 }));
  spanTrack.appendChild(blk3);

  spanCard.appendChild(spanTrack);
  content.appendChild(spanCard);

  // --- Top Singing Takes Card ---
  const takesCard = makeMobileCard("Top Recorded Takes", 9, 3);
  const tkHead = createFullRow(341, 6);
  tkHead.appendChild(createText("TOP SINGING TAKES", 8, "Bold", C.textZinc400));
  tkHead.appendChild(createText("348 Takes", 8, "Bold", C.mint));
  takesCard.appendChild(tkHead);

  function makeTakeRow(num, title, meta, score) {
    const row = createFullRow(341, 6);
    row.paddingTop = 1; row.paddingBottom = 1;
    const rL = createAutoRow(6);
    rL.appendChild(createText(num, 8, "Bold", C.textZinc500));

    const tTxt = createAutoCol(1);
    tTxt.counterAxisSizingMode = "FIXED";
    tTxt.resize(230, 20);
    tTxt.appendChild(createText(title, 8, "Bold", C.textWhite));
    tTxt.appendChild(createText(meta, 7, "Regular", C.textZinc400));
    rL.appendChild(tTxt);
    row.appendChild(rL);

    row.appendChild(makePill(score, C.mint, C.forestBase, C.mint, 7));
    return row;
  }

  takesCard.appendChild(makeTakeRow("1", "Bohemian Rhapsody", "Take #04 • Queen • 3:45", "96 / 100"));
  takesCard.appendChild(makeTakeRow("2", "Nessun Dorma", "Take #02 • Puccini • 2:58", "98 / 100"));
  takesCard.appendChild(makeTakeRow("3", "Caro Mio Ben", "Take #05 • Giordani • 2:15", "92 / 100"));
  content.appendChild(takesCard);

  // --- Vocal Biometric Credentials Card (Matching Desktop 09 Milestones) ---
  const credCard = makeMobileCard("Vocal Credentials", 8, 4);
  const credHead = createFullRow(341, 6);
  credHead.appendChild(createText("CONSERVATORY VERIFIED SPECS", 7.5, "Bold", C.textZinc400));
  credHead.appendChild(createText("S-Tier", 7.5, "Bold", C.mint));
  credCard.appendChild(credHead);

  const credRow = createFullRow(341, 6);
  function makeCredChip(title, sub) {
    const chip = figma.createFrame();
    chip.layoutMode = "VERTICAL";
    chip.resize(165, 26);
    chip.primaryAxisSizingMode = "FIXED";
    chip.counterAxisSizingMode = "FIXED";
    chip.paddingLeft = 8;
    chip.paddingRight = 8;
    chip.primaryAxisAlignItems = "CENTER";
    chip.counterAxisAlignItems = "MIN";
    chip.cornerRadius = 5;
    chip.fills = solid(C.glassElevated, 1);
    chip.strokes = solid(C.glassBorder, 0.7);
    chip.strokeWeight = 1;
    chip.appendChild(createText(title, 7.5, "Bold", C.mint));
    chip.appendChild(createText(sub, 6.5, "Regular", C.textZinc400));
    return chip;
  }
  credRow.appendChild(makeCredChip("Sub-Cent Precision", "±2 Cents YIN Stability"));
  credRow.appendChild(makeCredChip("Royal Conservatory", "Virtuoso Vocal Fach"));
  credCard.appendChild(credRow);
  content.appendChild(credCard);

  root.appendChild(content);

  // 4. Mobile Web Bottom Dock (The responsive DAW dock)
  const bottomNav = createMobileBottomNav("profile");
  root.appendChild(bottomNav);

  // 5. iOS Home Indicator
  const homeInd = createMobileHomeIndicator();
  root.appendChild(homeInd);

  return root;
}



    // =============================================================================
// VOCALSENSE AI — UNIFIED RESPONSIVE MOBILE WEB SUITE RUNNER & PROTOTYPE LINKER
// Generates all 11 decoupled responsive mobile web screens (393 × 852 px) in clean grid
// 100% "11/12" identical with Desktop Web Application • Anti-Slop (Zero Emojis)
// Wires 100% interactive mobile prototype transitions
// =============================================================================













async function buildAllMobileScreens() {
  figma.notify("Generating all 11 decoupled Mobile Web Screens (393x852 Grid)...");

  // Remove existing mobile screens if re-running
  const existing = figma.currentPage.children.filter(c => c.name && c.name.startsWith("VocalSense AI — M"));
  existing.forEach(n => {
    try { n.remove(); } catch (e) {}
  });

  // Grid coordinates:
  // Row 1: M01, M02, M03, M04, M09, M06
  // Row 2: M08, M06B, M05, M05B, M07
  const hasDesktopScreens = figma.currentPage.children.some(c => c.name && (c.name.includes("01.") || c.name.includes("02.") || c.name.toLowerCase().includes("homepage")));
  const existingHomepage = figma.currentPage.children.find(c => c.name && (c.name.includes("01.") || c.name.toLowerCase().includes("homepage")));
  const startX = (hasDesktopScreens && existingHomepage) ? existingHomepage.x + existingHomepage.width + 160 : 0;
  const startY = hasDesktopScreens ? 6200 : 0;
  const colPitch = 460; // 393 + 67 px margin
  const row2Y = startY + 960; // 852px height + 108px gap

  // ROW 1
  const m1 = buildMobileWelcomeScreen();
  m1.x = startX + colPitch * 0; m1.y = startY;

  const m2 = buildMobileStudioScreen();
  m2.x = startX + colPitch * 1; m2.y = startY;

  const m3 = buildMobileReportScreen();
  m3.x = startX + colPitch * 2; m3.y = startY;

  const m4 = buildMobileTrainingScreen();
  m4.x = startX + colPitch * 3; m4.y = startY;

  const m9 = buildMobileProfileScreen();
  m9.x = startX + colPitch * 4; m9.y = startY;

  const m6 = buildMobileSettingsScreen();
  m6.x = startX + colPitch * 5; m6.y = startY;

  // ROW 2
  const m8 = buildMobileDocumentsScreen();
  m8.x = startX + colPitch * 0; m8.y = row2Y;

  const m6b = buildMobileMidtransScreen();
  m6b.x = startX + colPitch * 1; m6b.y = row2Y;

  const m5 = buildMobileAuthScreen();
  m5.x = startX + colPitch * 2; m5.y = row2Y;

  const m5b = buildMobileOnboardingScreen();
  m5b.x = startX + colPitch * 3; m5b.y = row2Y;

  const m7 = buildMobileAdminScreen();
  m7.x = startX + colPitch * 4; m7.y = row2Y;

  const mobileScreens = [m1, m2, m3, m4, m9, m6, m8, m6b, m5, m5b, m7];
  figma.currentPage.selection = mobileScreens;
  try {
    figma.viewport.scrollAndZoomIntoView(mobileScreens);
  } catch (e) {}

  // Wire interactive prototype connections
  await linkMobilePrototype({ m1, m2, m3, m4, m5, m5b, m6, m6b, m7, m8, m9 });

  figma.notify("Mobile Web Suite Complete! 11 Responsive Web Screens generated & linked with interactive prototype.");
  return mobileScreens;
}

async function linkMobilePrototype(screens) {
  const { m1, m2, m3, m4, m5, m5b, m6, m6b, m7, m8, m9 } = screens;

  // Flow starting point
  try {
    const existingFlows = figma.currentPage.flowStartingPoints || [];
    const hasMobileFlow = existingFlows.some(f => f.name && f.name.includes("Mobile Web"));
    if (!hasMobileFlow && m1) {
      figma.currentPage.flowStartingPoints = [
        ...existingFlows,
        { nodeId: m1.id, name: "Mobile Web Flow (VocalSense Responsive)" }
      ];
    }
  } catch (e) {}

  function findNode(root, nameSnippet) {
    if (!root) return null;
    if (root.name && root.name.toLowerCase().includes(nameSnippet.toLowerCase())) return root;
    if (root.children) {
      for (const c of root.children) {
        const found = findNode(c, nameSnippet);
        if (found) return found;
      }
    }
    return null;
  }

  function wire(sourceNode, targetScreen) {
    if (!sourceNode || !targetScreen) return;
    try {
      sourceNode.reactions = [
        {
          action: {
            type: "NODE",
            destinationId: targetScreen.id,
            navigation: "NAVIGATE",
            transition: {
              type: "SMART_ANIMATE",
              easing: { type: "EASE_OUT" },
              duration: 0.25
            }
          },
          trigger: { type: "ON_CLICK" }
        }
      ];
    } catch (e) {}
  }

  // M01 -> M02 (Start Session CTA)
  wire(findNode(m1, "Start Mobile Session"), m2);
  wire(findNode(m1, "Btn/Sign In"), m5);

  // M02 -> M03 (Stop & Analyze)
  wire(findNode(m2, "Stop & Analyze"), m3);
  wire(findNode(m2, "New Take"), m2);

  // M03 -> M02 (Studio header back)
  wire(findNode(m3, "Btn/Back"), m2);
  wire(findNode(m3, "Retake"), m2);

  // M04 -> M02 (Studio header back)
  wire(findNode(m4, "Btn/Back"), m2);

  // M05 -> M5B (Sign In Submit -> Onboarding)
  wire(findNode(m5, "Sign In Submit"), m5b);
  wire(findNode(m5, "Btn/Back"), m1);

  // M05B -> M02 (Enter Studio)
  wire(findNode(m5b, "Enter Studio"), m2);
  wire(findNode(m5b, "Btn/Back"), m5);

  // M06 -> M02 (Studio header back)
  wire(findNode(m6, "Btn/Back"), m2);
  wire(findNode(m6, "Logout"), m5);

  // M06B -> M06 (Midtrans Back)
  wire(findNode(m6b, "Btn/Back"), m6);

  // M08 -> M02 (Studio header back)
  wire(findNode(m8, "Btn/Back"), m2);

  // M09 -> M02 (Studio header back)
  wire(findNode(m9, "Btn/Back"), m2);
  wire(findNode(m9, "Edit Profile"), m6);
}




    // -------------------------------------------------------------------------
    // 4. DISPATCHER & MULTI-SCREEN RUNNER
    // -------------------------------------------------------------------------
    const command = figma.command || "run-all";
    const existingHomepage = findScreen(["01. official homepage", "01. homepage", "homepage"]);
    const startX = existingHomepage ? existingHomepage.x + existingHomepage.width + 160 : 0;
    const startY = existingHomepage ? existingHomepage.y : 0;

    if (command === "run-link") {
      figma.notify("Wiring up interactive prototype links between screens...", { timeout: 3000 });
      const s1 = findScreen(["01. official homepage", "01. homepage", "homepage"]);
      const s2 = findScreen(["02. live recording", "02. studio", "studio workstation"]);
      const s3 = findScreen(["03. diagnostic", "03. singing report", "piano roll"]);
      const s4 = findScreen(["04. gamified", "04. vocalist training", "training center"]);
      const s5 = findScreen(["05. auth screen", "05. authentication"]);
      const s5b = findScreen(["05b. vocalist onboarding", "onboarding wizard"]);
      const s6 = findScreen(["06. account", "06. billing", "account center"]);
      const s6b = findScreen(["06b. midtrans", "snap payment modal"]);
      const s7 = findScreen(["07. administrator", "07. admin"]);
      const s8 = findScreen(["08. vocal reports", "document archive", "vocal reports & document archive"]);
      const s9 = findScreen(["09. vocalist profile", "profile settings", "artist profile", "vocalist profile"]);

      await setupMasterInteractions({ s1, s2, s3, s4, s5, s5b, s6, s6b, s7, s8, s9 });

      // Link mobile screens if present
      const m1 = findScreen(["m01. mobile welcome", "m01."]);
      const m2 = findScreen(["m02. mobile studio", "m02."]);
      const m3 = findScreen(["m03. mobile singing report", "m03."]);
      const m4 = findScreen(["m04. mobile training", "m04."]);
      const m5 = findScreen(["m05. mobile auth", "m05."]);
      const m5b = findScreen(["m05b. mobile onboarding", "m05b."]);
      const m6 = findScreen(["m06. mobile settings", "m06."]);
      const m6b = findScreen(["m06b. mobile midtrans", "m06b."]);
      const m7 = findScreen(["m07. mobile admin", "m07."]);
      const m8 = findScreen(["m08. mobile vocal archive", "m08."]);
      const m9 = findScreen(["m09. mobile vocalist profile", "m09."]);
      if (typeof linkMobilePrototype === "function" && (m1 || m2 || m3 || m4)) {
        await linkMobilePrototype({ m1, m2, m3, m4, m5, m5b, m6, m6b, m7, m8, m9 });
      }

      figma.notify("Interactive prototype linked! Tekan Shift + Space di Figma untuk mencoba interaktivitas.", { timeout: 6000 });
      return;
    }

    function cleanupOrphans() {
      const orphans = figma.currentPage.children.filter(c => {
        if (!c.name) return false;
        const n = c.name.toLowerCase();
        if (
          n === "frame" ||
          n.includes("auth main split") ||
          n.includes("brand logo") ||
          n.startsWith("button/") ||
          n.startsWith("icon/")
        ) {
          return true;
        }
        return false;
      });
      orphans.forEach(o => o.remove());
    }

    cleanupOrphans();

    if (command === "run-studio") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("02."));
      existing.forEach(n => n.remove());
      const s = buildStudioScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 02: Studio Workstation generated!", { timeout: 3000 });
    } else if (command === "run-report") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("03."));
      existing.forEach(n => n.remove());
      const s = buildReportScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 03: Diagnostic Singing Report generated!", { timeout: 3000 });
    } else if (command === "run-training") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("04."));
      existing.forEach(n => n.remove());
      const s = buildTrainingScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 04: Vocalist Training Center generated!", { timeout: 3000 });
    } else if (command === "run-auth") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("05.") && !c.name.includes("05B."));
      existing.forEach(n => n.remove());
      const s = buildAuthScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 05: Dedicated Authentication Screen generated!", { timeout: 3000 });
    } else if (command === "run-onboarding") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("05B."));
      existing.forEach(n => n.remove());
      const s = buildOnboardingScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 05B: Vocalist Onboarding Wizard generated!", { timeout: 3000 });
    } else if (command === "run-billing") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("06.") && !c.name.includes("06B."));
      existing.forEach(n => n.remove());
      const s = buildBillingScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 06: Account & Billing Center generated!", { timeout: 3000 });
    } else if (command === "run-midtrans") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("06B."));
      existing.forEach(n => n.remove());
      const s = buildMidtransModalScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 06B: Midtrans Snap Modal Overlay generated!", { timeout: 3000 });
    } else if (command === "run-admin") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("07."));
      existing.forEach(n => n.remove());
      const s = buildAdminScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 07: Administrator Console generated!", { timeout: 3000 });
    } else if (command === "run-documents") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("08."));
      existing.forEach(n => n.remove());
      const s = buildDocumentsScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 08: Vocal Diagnostic Reports & Document Archive generated!", { timeout: 3000 });
    } else if (command === "run-profile") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("09."));
      existing.forEach(n => n.remove());
      const s = buildProfileScreen(startX, startY);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 09: Vocalist Personal Profile (Spotify-Style) generated!", { timeout: 3000 });
    } else if (command === "run-homepage" && typeof createHomepage === "function") {
      const existing = figma.currentPage.children.filter(c => c.name && c.name.includes("01."));
      existing.forEach(n => n.remove());
      const s = createHomepage(0, 0);
      figma.currentPage.selection = [s];
      figma.viewport.scrollAndZoomIntoView([s]);
      figma.notify("Screen 01: Official Homepage generated!", { timeout: 3000 });
    } else if (command === "run-mobile-all") {
      await buildAllMobileScreens();
    } else if (command.startsWith("run-mobile-")) {
      function placeMobileScreen(existingQuery, defaultCol, defaultRow, builder) {
        const existing = figma.currentPage.children.find(c => c.name && c.name.includes(existingQuery));
        const hasDesktop = figma.currentPage.children.some(c => c.name && (c.name.includes("01.") || c.name.includes("02.") || c.name.toLowerCase().includes("homepage")));
        const baseMobileY = hasDesktop ? 6200 : 0;
        const targetX = existing ? existing.x : startX + 460 * defaultCol;
        const targetY = existing ? existing.y : (defaultRow === 1 ? baseMobileY : baseMobileY + 960);
        if (existing) {
          try { existing.remove(); } catch (e) {}
        }
        const s = builder();
        s.x = targetX;
        s.y = targetY;
        figma.currentPage.selection = [s];
        figma.viewport.scrollAndZoomIntoView([s]);
        return s;
      }

      if (command === "run-mobile-welcome") {
        placeMobileScreen("M01.", 0, 1, buildMobileWelcomeScreen);
        figma.notify("Screen M01: Mobile Welcome & Experience generated!", { timeout: 3000 });
      } else if (command === "run-mobile-studio") {
        placeMobileScreen("M02.", 1, 1, buildMobileStudioScreen);
        figma.notify("Screen M02: Mobile Studio Workstation generated!", { timeout: 3000 });
      } else if (command === "run-mobile-report") {
        placeMobileScreen("M03.", 2, 1, buildMobileReportScreen);
        figma.notify("Screen M03: Mobile Singing Report generated!", { timeout: 3000 });
      } else if (command === "run-mobile-training") {
        placeMobileScreen("M04.", 3, 1, buildMobileTrainingScreen);
        figma.notify("Screen M04: Mobile Training Center generated!", { timeout: 3000 });
      } else if (command === "run-mobile-profile") {
        placeMobileScreen("M09.", 4, 1, buildMobileProfileScreen);
        figma.notify("Screen M09: Mobile Vocalist Profile generated!", { timeout: 3000 });
      } else if (command === "run-mobile-settings") {
        placeMobileScreen("M06.", 5, 1, buildMobileSettingsScreen);
        figma.notify("Screen M06: Mobile Settings & Preferences generated!", { timeout: 3000 });
      } else if (command === "run-mobile-archive") {
        placeMobileScreen("M08.", 0, 2, buildMobileDocumentsScreen);
        figma.notify("Screen M08: Mobile Vocal Archive generated!", { timeout: 3000 });
      } else if (command === "run-mobile-midtrans") {
        placeMobileScreen("M06B.", 1, 2, buildMobileMidtransScreen);
        figma.notify("Screen M06B: Mobile Midtrans Payment Sheet generated!", { timeout: 3000 });
      } else if (command === "run-mobile-auth") {
        placeMobileScreen("M05.", 2, 2, buildMobileAuthScreen);
        figma.notify("Screen M05: Mobile Authentication generated!", { timeout: 3000 });
      } else if (command === "run-mobile-onboarding") {
        placeMobileScreen("M05B.", 3, 2, buildMobileOnboardingScreen);
        figma.notify("Screen M05B: Mobile Onboarding Wizard generated!", { timeout: 3000 });
      } else if (command === "run-mobile-admin") {
        placeMobileScreen("M07.", 4, 2, buildMobileAdminScreen);
        figma.notify("Screen M07: Mobile Admin Telemetry generated!", { timeout: 3000 });
      }
    } else {
      // Default / run-all: Generate all 10 decoupled screens in clean multi-row grid!
      figma.notify("Generating all 10 decoupled screens in clean multi-row grid...", { timeout: 3000 });
      const screens = [];

      // Clean existing screens 02 through 09 and any leftover orphan nodes
      const toRemove = figma.currentPage.children.filter(c => {
        if (!c.name) return false;
        if (c.name.includes("01.") || c.name.toLowerCase().includes("homepage")) return false;
        for (let i = 2; i <= 9; i++) {
          if (c.name.includes("0" + i) || c.name.includes(i + ".")) return true;
        }
        if (
          c.name.startsWith("VocalSense AI") ||
          c.name.toLowerCase().includes("studio") ||
          c.name.toLowerCase().includes("report") ||
          c.name.toLowerCase().includes("training") ||
          c.name.toLowerCase().includes("document") ||
          c.name.toLowerCase().includes("archive") ||
          c.name.toLowerCase().includes("auth") ||
          c.name.toLowerCase().includes("onboarding") ||
          c.name.toLowerCase().includes("billing") ||
          c.name.toLowerCase().includes("midtrans") ||
          c.name.toLowerCase().includes("admin") ||
          c.name.toLowerCase().includes("profile") ||
          c.name === "Frame" ||
          c.name.startsWith("Button/") ||
          c.name === "Brand Logo"
        ) {
          return true;
        }
        return false;
      });
      toRemove.forEach(n => n.remove());

      // ROW 1: Core Studio Experience (DAW, Diagnostic Report, Training Center, Document Archive, Y = startY)
      // 02. Studio DAW (X = startX + 0)
      const s2 = buildStudioScreen(startX + 0, startY);
      screens.push(s2);

      // 03. Singing Report (X = startX + 1600)
      const s3 = buildReportScreen(startX + 1600, startY);
      screens.push(s3);

      // 04. Training Dashboard (X = startX + 3200)
      const s4 = buildTrainingScreen(startX + 3200, startY);
      screens.push(s4);

      // 08. Vocal Reports & Document Archive (X = startX + 4800)
      const s8 = buildDocumentsScreen(startX + 4800, startY);
      screens.push(s8);

      // ROW 2: User Account, Identity & Administration (Y = startY + 1200)
      const row2Y = startY + 1200;

      // 09. Vocalist Profile Settings (Spotify-Style) (X = startX + 0)
      const s9 = buildProfileScreen(startX + 0, row2Y);
      screens.push(s9);

      // 06. Billing Center (X = startX + 1600)
      const s6 = buildBillingScreen(startX + 1600, row2Y);
      screens.push(s6);

      // 06B. Midtrans Modal Overlay (X = startX + 3200)
      const s6b = buildMidtransModalScreen(startX + 3200, row2Y);
      screens.push(s6b);

      // 07. Admin Console (X = startX + 4800)
      const s7 = buildAdminScreen(startX + 4800, row2Y);
      screens.push(s7);

      // ROW 3: Auth & Onboarding Flow (Y = startY + 4000, safe distance below Screen 06)
      const row3Y = startY + 4000;

      // 05. Auth Screen (X = startX + 0)
      const s5 = buildAuthScreen(startX + 0, row3Y);
      screens.push(s5);

      // 05B. Vocal Onboarding Wizard (X = startX + 1600)
      const s5b = buildOnboardingScreen(startX + 1600, row3Y);
      screens.push(s5b);

      // Auto-connect prototype interactions between all screens!
      const s1 = existingHomepage;
      await setupMasterInteractions({ s1, s2, s3, s4, s5, s5b, s6, s6b, s7, s8, s9 });

      figma.currentPage.selection = screens;
      figma.viewport.scrollAndZoomIntoView(screens);
      figma.notify("Master Suite Complete! 10 screens generated in clean multi-row grid & linked with interactive prototype.", { timeout: 6000 });
    }
  } catch (err) {
    console.error("VocalSense Suite Error:", err);
    try {
      figma.notify("Error: " + (err && err.message ? err.message : String(err)), { error: true, timeout: 8000 });
    } catch (e) {}
  }
})();
