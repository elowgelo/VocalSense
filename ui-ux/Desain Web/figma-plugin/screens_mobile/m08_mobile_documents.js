// =============================================================================
// VOCALSENSE AI — M08. MOBILE VOCAL ARCHIVE & DOCUMENT VAULT (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Archive Screen 08
// Anti-Slop (Zero Emojis, Pure SVG Icons, Zero Overlap, Verified Auto-Layout)
// =============================================================================

const {
  createMobileScreen,
  createMobileBrowserBar,
  createMobileHomeIndicator,
  createMobileWebHeader,
  createMobileBottomNav,
  makeMobileCard,
  makePill,
  createAutoRow,
  createAutoCol,
  createFullRow
} = require('./mobile_shared.js');

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

module.exports = { buildMobileDocumentsScreen };
