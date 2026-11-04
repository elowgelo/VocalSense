const fs = require('fs');

let nodeIdCounter = 1000;

class MockNode {
  constructor(type = "FRAME", page = null) {
    this.id = String(++nodeIdCounter) + ":1";
    this.type = type;
    this.name = "";
    this.children = [];
    this.fills = [];
    this.strokes = [];
    this.effects = [];
    this._width = 100;
    this._height = 100;
    this.x = 0;
    this.y = 0;
    this.vectorPaths = [];
    this.reactions = [];
    this.clipsContent = false;
    this._page = page;
  }
  appendChild(child) {
    if (child === this) {
      throw new Error(`Cannot append node to itself!`);
    }
    if (this._page && this._page.children) {
      const idx = this._page.children.indexOf(child);
      if (idx !== -1) this._page.children.splice(idx, 1);
    }
    this.children.push(child);
    child.parent = this;
    child._page = this._page;
  }
  resize(w, h) {
    if (typeof w !== "number" || typeof h !== "number") {
      throw new Error(`resize expected numbers, got ${typeof w}, ${typeof h}`);
    }
    this._width = w;
    this._height = h;
  }
  get width() { return this._width; }
  get height() { return this._height; }
  set fontSize(val) {
    if (typeof val !== "number") {
      throw new Error(`Property "fontSize" failed validation: Expected number, received ${typeof val}`);
    }
    this._fontSize = val;
  }
  get fontSize() { return this._fontSize; }
  set characters(val) {
    if (typeof val !== "string") {
      throw new Error(`characters must be string, got ${typeof val}`);
    }
    this._characters = val;
  }
  get characters() { return this._characters; }
  set strokes(val) {
    if (Array.isArray(val)) {
      val.forEach((p, idx) => {
        if (p && typeof p.opacity === "number" && (p.opacity > 1 || p.opacity < 0)) {
          throw new Error(`Property "strokes" failed validation: Number must be less than or equal to 1 at [${idx}].opacity`);
        }
      });
    }
    this._strokes = val;
  }
  get strokes() { return this._strokes || []; }
  set fills(val) {
    if (Array.isArray(val)) {
      val.forEach((p, idx) => {
        if (p && typeof p.opacity === "number" && (p.opacity > 1 || p.opacity < 0)) {
          throw new Error(`Property "fills" failed validation: Number must be less than or equal to 1 at [${idx}].opacity`);
        }
        if (p && p.gradientStops && Array.isArray(p.gradientStops)) {
          p.gradientStops.forEach((stop, sIdx) => {
            if (!stop.color || typeof stop.color.r !== "number" || typeof stop.color.g !== "number" || typeof stop.color.b !== "number") {
              throw new Error(`Property "fills" failed validation: Required value missing at [${idx}].gradientStops[${sIdx}].color.b`);
            }
          });
        }
      });
    }
    this._fills = val;
  }
  get fills() { return this._fills || []; }
  async setReactionsAsync(reactions) {
    this.reactions = reactions;
  }
  remove() {
    if (this.parent && this.parent.children) {
      const idx = this.parent.children.indexOf(this);
      if (idx !== -1) this.parent.children.splice(idx, 1);
    }
    if (this._page && this._page.children) {
      const idx = this._page.children.indexOf(this);
      if (idx !== -1) this._page.children.splice(idx, 1);
    }
  }
}

function createMockFigma(cmd = "run-all") {
  const page = {
    children: [],
    selection: [],
    flowStartingPoints: []
  };
  return {
    editorType: "design",
    command: cmd,
    loadFontAsync: async () => {},
    createFrame: () => {
      const node = new MockNode("FRAME", page);
      page.children.push(node);
      return node;
    },
    createText: () => new MockNode("TEXT", page),
    createRectangle: () => new MockNode("RECTANGLE", page),
    createEllipse: () => new MockNode("ELLIPSE", page),
    createLine: () => new MockNode("LINE", page),
    createVector: () => new MockNode("VECTOR", page),
    createNodeFromSvg: (svg) => new MockNode("SVG", page),
    currentPage: page,
    viewport: {
      scrollAndZoomIntoView: () => {}
    },
    notify: (msg) => console.log(`[FIGMA NOTIFY (${cmd})]`, msg)
  };
}

const code = fs.readFileSync('figma-plugin/code_strict_test.js', 'utf8');

async function testCommand(cmd) {
  console.log(`\nTesting command: "${cmd}"...`);
  const mockFigma = createMockFigma(cmd);
  const startIdx = code.indexOf('(async function () {');
  const runner = new Function('figma', '"use strict";\nreturn ' + code.substring(startIdx));
  await runner(mockFigma);
  console.log(`Command "${cmd}" completed successfully! Selected nodes: ${mockFigma.currentPage.selection.length}`);
  if (cmd === "run-all" || cmd === "run-link") {
    console.log(`Flow starting points configured: ${mockFigma.currentPage.flowStartingPoints.length}`);
  }
}

async function runAllTests() {
  const commands = [
    // Desktop Suite
    "run-studio",
    "run-report",
    "run-training",
    "run-documents",
    "run-auth",
    "run-onboarding",
    "run-billing",
    "run-midtrans",
    "run-admin",
    "run-profile",
    "run-all",
    // Mobile Suite (iPhone 15/16 Pro 393x852)
    "run-mobile-welcome",
    "run-mobile-studio",
    "run-mobile-report",
    "run-mobile-training",
    "run-mobile-profile",
    "run-mobile-settings",
    "run-mobile-archive",
    "run-mobile-midtrans",
    "run-mobile-auth",
    "run-mobile-onboarding",
    "run-mobile-admin",
    "run-mobile-all",
    // Unified Prototyping
    "run-link"
  ];
  for (const cmd of commands) {
    await testCommand(cmd);
  }
  console.log("\n==========================================");
  console.log("🎉 ALL VOCALSENSE TEST SUITES PASSED 100%!");
  console.log("==========================================");
}

runAllTests().catch(err => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
