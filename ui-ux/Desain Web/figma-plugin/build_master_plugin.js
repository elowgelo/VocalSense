// =============================================================================
// Build script to assemble master code.js for VocalSense AI Suite
// =============================================================================

const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');

// Read each screen file and extract the builder function
function extractFunction(filename, funcName) {
  const content = fs.readFileSync(path.join(screensDir, filename), 'utf8');
  const startIdx = content.indexOf(`function ${funcName}`);
  if (startIdx === -1) {
    throw new Error(`Function ${funcName} not found in ${filename}`);
  }
  
  // Find matching closing brace
  let depth = 0;
  let inFunc = false;
  let endIdx = -1;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') {
      depth++;
      inFunc = true;
    } else if (content[i] === '}') {
      depth--;
      if (inFunc && depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  
  if (endIdx === -1) {
    throw new Error(`Could not find end of function ${funcName} in ${filename}`);
  }
  
  return content.substring(startIdx, endIdx);
}

const studioFunc = extractFunction('02_studio_workstation.js', 'buildStudioScreen');
const reportFunc = extractFunction('03_singing_report.js', 'buildReportScreen');
const trainingFunc = extractFunction('04_training_dashboard.js', 'buildTrainingScreen');
const authFunc = extractFunction('05_auth_screen.js', 'buildAuthScreen');
const onboardingFunc = extractFunction('05b_vocal_onboarding.js', 'buildOnboardingScreen');
const billingFunc = extractFunction('06_billing_center.js', 'buildBillingScreen');
const midtransModalFunc = extractFunction('06b_midtrans_modal.js', 'buildMidtransModalScreen');
const adminFunc = extractFunction('07_admin_console.js', 'buildAdminScreen');
const docsFunc = extractFunction('08_vocal_documents.js', 'buildDocumentsScreen');
const profileFunc = extractFunction('09_profile_settings.js', 'buildProfileScreen');

// Read homepage builder from 01_homepage.js
const homeFunc = extractFunction('01_homepage.js', 'createHomepage');
const auditFunc = extractFunction('01_homepage.js', 'createVocalAuditCardsFrame');
const studioWorkFunc = extractFunction('01_homepage.js', 'createExactStudioWorkspace');

// Read mobile screen builders from screens_mobile
const mobileDir = path.join(__dirname, 'screens_mobile');
function readMobileFile(filename) {
  let c = fs.readFileSync(path.join(mobileDir, filename), 'utf8');
  c = c.replace(/const\s+{[^}]+}\s*=\s*require\([^)]+\);?/g, '');
  c = c.replace(/module\.exports\s*=\s*{[^}]+};?/g, '');
  return c;
}

const mobileSharedCode = readMobileFile('mobile_shared.js');
const mobileWelcomeCode = readMobileFile('m01_mobile_welcome.js');
const mobileStudioCode = readMobileFile('m02_mobile_studio.js');
const mobileReportCode = readMobileFile('m03_mobile_report.js');
const mobileTrainingCode = readMobileFile('m04_mobile_training.js');
const mobileAuthCode = readMobileFile('m05_mobile_auth.js');
const mobileOnboardingCode = readMobileFile('m05b_mobile_onboarding.js');
const mobileSettingsCode = readMobileFile('m06_mobile_settings.js');
const mobileMidtransCode = readMobileFile('m06b_mobile_midtrans.js');
const mobileAdminCode = readMobileFile('m07_mobile_admin.js');
const mobileDocsCode = readMobileFile('m08_mobile_documents.js');
const mobileProfileCode = readMobileFile('m09_mobile_profile.js');
const mobileSuiteCode = readMobileFile('mobile_suite_runner.js');

const masterCode = `// =============================================================================
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
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>\`;
        } else if (type === "bell") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>\`;
        } else if (type === "moon") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>\`;
        } else if (type === "sparkle") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>\`;
        } else if (type === "arrow-up-right") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>\`;
        } else if (type === "arrow-down-right") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/></svg>\`;
        } else if (type === "pause") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>\`;
        } else if (type === "stop") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>\`;
        } else if (type === "play") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><polygon points="5 3 19 12 5 21 5 3"/></svg>\`;
        } else if (type === "check") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>\`;
        } else if (type === "download") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\`;
        } else if (type === "lock") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\`;
        } else if (type === "trophy") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12v7a6 6 0 0 1-12 0V4z"/></svg>\`;
        } else if (type === "fire") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>\`;
        } else if (type === "shield") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>\`;
        } else if (type === "home") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>\`;
        } else if (type === "waveform") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10v4"/><path d="M6 6v12"/><path d="M10 3v18"/><path d="M14 8v8"/><path d="M18 5v14"/><path d="M22 10v4"/></svg>\`;
        } else if (type === "bar-chart") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>\`;
        } else if (type === "document") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>\`;
        } else if (type === "settings") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>\`;
        } else if (type === "refresh") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>\`;
        } else if (type === "compare") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>\`;
        } else if (type === "save") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>\`;
        } else if (type === "chevron-down") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>\`;
        } else if (type === "sliders") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>\`;
        } else if (type === "camera") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>\`;
        } else if (type === "copy") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>\`;
        } else if (type === "user") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\`;
        } else if (type === "mic") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>\`;
        } else if (type === "globe") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>\`;
        } else if (type === "spotify") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#1DB954"/><path d="M8 15c2.5-.5 5-.3 7 .5M7.5 12.5c3-.7 6.5-.5 9 .5M7 10c3.5-.9 8-.7 11 .7" stroke="#000" stroke-width="1.8" stroke-linecap="round"/></svg>\`;
        } else if (type === "google") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.4-.4-2.2z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>\`;
        } else if (type === "wifi") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>\`;
        } else if (type === "zap") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>\`;
        } else if (type === "folder") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>\`;
        } else if (type === "file-text") {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>\`;
        } else {
          svgBody = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${colorHex}"><circle cx="12" cy="12" r="5"/></svg>\`;
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
    ${studioFunc}

    ${reportFunc}

    ${trainingFunc}

    ${authFunc}

    ${onboardingFunc}

    ${billingFunc}

    ${midtransModalFunc}

    ${adminFunc}

    ${docsFunc}

    ${profileFunc}

    ${studioWorkFunc ? studioWorkFunc : ''}

    ${auditFunc ? auditFunc : ''}

    ${homeFunc ? homeFunc : ''}

    // -------------------------------------------------------------------------
    // 3B. MOBILE SCREEN BUILDERS (iPhone 15/16 Pro 393x852)
    // -------------------------------------------------------------------------
    ${mobileSharedCode}

    ${mobileWelcomeCode}
    ${mobileStudioCode}
    ${mobileReportCode}
    ${mobileTrainingCode}
    ${mobileAuthCode}
    ${mobileOnboardingCode}
    ${mobileSettingsCode}
    ${mobileMidtransCode}
    ${mobileAdminCode}
    ${mobileDocsCode}
    ${mobileProfileCode}
    ${mobileSuiteCode}

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
`;

fs.writeFileSync(path.join(__dirname, 'code.js'), masterCode, 'utf8');
console.log('Successfully assembled master code.js!');
