// =============================================================================
// VOCALSENSE AI — 06B. MIDTRANS SNAP PAYMENT GATEWAY MODAL (OVERLAY)
// Authentic Dialog Overlay with Darkened Backdrop & Dynamic QRIS (1440 x 960 px)
// Dedicated implementation of UC-21 (Midtrans Snap Checkout & Instant Activation)
//
// ENHANCEMENTS:
//   - Fixed method tabs (explicit 170x38px size, zero vertical slicing).
//   - Zero text clipping on step instructions (clean multi-line text wrapping).
//   - Authentic QR code plate with dense matrix graphic and verified merchant badges.
//   - Perfectly fits entire 860px modal height with ample breathing room.
// =============================================================================

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
