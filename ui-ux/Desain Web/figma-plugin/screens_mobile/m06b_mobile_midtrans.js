// =============================================================================
// VOCALSENSE AI — M06B. MOBILE MIDTRANS CHECKOUT & QRIS SHEET (393 × 852 px)
// Responsive Mobile Web edition • 100% 11/12 with Desktop Screen 06B
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

module.exports = { buildMobileMidtransScreen };
