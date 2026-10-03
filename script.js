const GOOGLE_CLIENT_ID = "38253757162-3qvrfrj7u5cuqa47gtm7th6o39qbabf2.apps.googleusercontent.com";

const t = coopLang.t;

let currentUser = null;

const loginOverlay    = document.getElementById("loginOverlay");
const kioskApp        = document.getElementById("kioskApp");
const userBadge       = document.getElementById("userBadge");
const userAvatar      = document.getElementById("userAvatar");
const userNameEl      = document.getElementById("userName");
const signOutBtn      = document.getElementById("signOutBtn");
const googleBtnStep   = document.getElementById("googleBtnStep");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const mockGoogleBtn   = document.getElementById("mockGoogleBtn");
const nameLoginLink   = document.getElementById("nameLoginLink");
const loginNote       = document.getElementById("loginNote");
const mockNameStep    = document.getElementById("mockNameStep");
const mockUserName    = document.getElementById("mockUserName");
const mockLoginError  = document.getElementById("mockLoginError");

function initialsFor(name){
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function showLoginStep(step){
  googleBtnStep.style.display = step === "button" ? "block" : "none";
  mockNameStep.style.display  = step === "name" ? "block" : "none";
  mockLoginError.style.display = "none";
  if (step === "name"){
    mockUserName.value = "";
    mockUserName.focus();
  }
}

function showSignedInUI(){
  loginOverlay.classList.remove("show");
  kioskApp.style.display = "flex";
  userBadge.style.display = "flex";
  userNameEl.textContent = currentUser.name;
  userBadge.title = currentUser.email || "";
  if (currentUser.picture){
    userAvatar.textContent = "";
    userAvatar.style.backgroundImage = `url("${currentUser.picture}")`;
    userAvatar.classList.add("has-photo");
  } else {
    userAvatar.textContent = initialsFor(currentUser.name);
    userAvatar.style.backgroundImage = "";
    userAvatar.classList.remove("has-photo");
  }
}

function setCurrentUser(user){
  currentUser = user;
  localStorage.setItem("coopUser", JSON.stringify(currentUser));
  showSignedInUI();
}

function signInWithName(){
  const name = mockUserName.value.trim();
  if (!name){
    mockLoginError.style.display = "block";
    mockUserName.focus();
    return;
  }
  setCurrentUser({ name, provider: "name" });
}

function decodeJwt(token){
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
  );
  return JSON.parse(json);
}

function handleGoogleCredential(response){
  try {
    const payload = decodeJwt(response.credential);
    setCurrentUser({
      name: payload.name || payload.email,
      email: payload.email,
      picture: payload.picture,
      provider: "google"
    });
  } catch(e){
    loginNote.textContent = t("login.failed");
  }
}

function useNameOnlyLogin(reason){
  googleSignInBtn.style.display = "none";
  mockGoogleBtn.style.display = "flex";
  nameLoginLink.style.display = "none";
  loginNote.textContent = reason || "";
}

let gsiWaitMs = 0;
function initGoogleSignIn(){
  if (GOOGLE_CLIENT_ID.startsWith("YOUR_CLIENT_ID")){
    useNameOnlyLogin(t("login.noClientId"));
    return;
  }
  if (location.protocol === "file:"){
    useNameOnlyLogin(t("login.needsHttp"));
    return;
  }
  if (!window.google || !google.accounts || !google.accounts.id){
    gsiWaitMs += 200;
    if (gsiWaitMs > 8000){
      useNameOnlyLogin(t("login.offline"));
      return;
    }
    setTimeout(initGoogleSignIn, 200);
    return;
  }
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential
  });
  google.accounts.id.renderButton(googleSignInBtn, {
    theme: "outline", size: "large", shape: "pill", text: "signin_with", width: 280,
    locale: coopLang.info().googleLocale || "en"
  });
  googleSignInBtn.style.display = "flex";
  mockGoogleBtn.style.display = "none";
  nameLoginLink.style.display = "inline";
  loginNote.textContent = "";
}

function signOut(){
  const wasGoogle = currentUser && currentUser.provider === "google";
  currentUser = null;
  localStorage.removeItem("coopUser");
  if (wasGoogle && window.google && google.accounts && google.accounts.id){
    google.accounts.id.disableAutoSelect();
  }
  kioskApp.style.display = "none";
  userBadge.style.display = "none";
  showLoginStep("button");
  loginOverlay.classList.add("show");
}

mockGoogleBtn.addEventListener("click", () => showLoginStep("name"));
nameLoginLink.addEventListener("click", () => showLoginStep("name"));
document.getElementById("mockCancelBtn").addEventListener("click", () => showLoginStep("button"));
document.getElementById("mockContinueBtn").addEventListener("click", signInWithName);
mockUserName.addEventListener("keydown", e => { if (e.key === "Enter") signInWithName(); });
signOutBtn.addEventListener("click", signOut);

document.getElementById("settingsBtn").addEventListener("click", e => {
  if (Object.keys(order).length && !confirm(t("top.settingsLeave"))){
    e.preventDefault();
  }
});

try {
  const saved = JSON.parse(localStorage.getItem("coopUser"));
  if (saved && saved.name){ currentUser = saved; showSignedInUI(); }
} catch(e){ }

googleSignInBtn.style.display = "none";
initGoogleSignIn();

const ICONS = {
  eggs:    `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="36" rx="16" ry="20" fill="#F1EAD9"/><ellipse cx="26" cy="26" rx="4" ry="5" fill="#ffffff" opacity="0.6"/></svg>`,
  tomato:  `<svg viewBox="0 0 64 64"><circle cx="32" cy="36" r="18" fill="#C1442E"/><path d="M32 18 C28 18 26 14 22 14 C24 20 28 20 30 22" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M32 18 C36 18 38 14 42 14 C40 20 36 20 34 22" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  carrot:  `<svg viewBox="0 0 64 64"><path d="M32 20 L40 52 L24 52 Z" fill="#E8A93B"/><path d="M30 20 L20 6 M32 18 L32 4 M34 20 L44 6" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round"/></svg>`,
  lettuce: `<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="19" fill="#6B8F4E"/><circle cx="32" cy="34" r="12" fill="#8FB86A"/><circle cx="32" cy="34" r="6" fill="#B6D98F"/></svg>`,
  cabbage: `<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="19" fill="#8FB86A"/><circle cx="32" cy="34" r="12" fill="#E7EFD6"/><circle cx="32" cy="34" r="5" fill="#B6D98F"/></svg>`,
  potato:  `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="36" rx="19" ry="14" fill="#C79A5B"/><circle cx="26" cy="32" r="1.6" fill="#8A6A3C"/><circle cx="38" cy="40" r="1.6" fill="#8A6A3C"/><circle cx="40" cy="30" r="1.6" fill="#8A6A3C"/></svg>`,
  onion:   `<svg viewBox="0 0 64 64"><path d="M32 16 C42 22 44 34 38 46 C34 52 30 52 26 46 C20 34 22 22 32 16 Z" fill="#C9A0C9"/><path d="M32 16 C34 12 32 8 32 6" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  garlic:  `<svg viewBox="0 0 64 64"><path d="M32 14 C42 18 44 32 38 46 C34 54 30 54 26 46 C20 32 22 18 32 14 Z" fill="#F1EAD9"/><path d="M32 20 V44 M26 24 C28 30 28 38 27 44 M38 24 C36 30 36 38 37 44" stroke="#D8CDAE" stroke-width="1.5" fill="none"/><path d="M32 14 C33 10 32 7 32 5" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round"/></svg>`,
  pepper:  `<svg viewBox="0 0 64 64"><path d="M26 22 C22 30 22 44 30 50 C38 54 46 48 44 38 C42 28 34 24 26 22 Z" fill="#C1442E"/><path d="M28 20 C26 16 30 12 34 14" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  corn:    `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="36" rx="13" ry="22" fill="#E8C33B"/><circle cx="27" cy="24" r="2" fill="#C79A2A"/><circle cx="37" cy="24" r="2" fill="#C79A2A"/><circle cx="27" cy="32" r="2" fill="#C79A2A"/><circle cx="37" cy="32" r="2" fill="#C79A2A"/><circle cx="27" cy="40" r="2" fill="#C79A2A"/><circle cx="37" cy="40" r="2" fill="#C79A2A"/><path d="M22 18 C16 12 16 6 20 4 M42 18 C48 12 48 6 44 4" stroke="#6B8F4E" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`,
  banana:  `<svg viewBox="0 0 64 64"><path d="M18 40 C18 24 30 14 44 16 C42 20 34 22 30 30 C26 38 26 46 34 50 C24 52 18 48 18 40 Z" fill="#E8D23B"/></svg>`,
  mango:   `<svg viewBox="0 0 64 64"><path d="M20 30 C20 44 26 54 34 54 C44 54 46 40 40 26 C36 16 24 18 20 30 Z" fill="#E8A93B"/><path d="M32 16 C30 12 32 8 36 8" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  chili:   `<svg viewBox="0 0 64 64"><path d="M20 20 C28 18 44 22 46 34 C48 46 38 52 30 48 C22 44 18 30 20 20 Z" fill="#C1442E"/><path d="M20 20 C18 14 22 10 26 12" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  radish:  `<svg viewBox="0 0 64 64"><path d="M24 24 C24 34 28 46 32 48 C36 46 40 34 40 24 C40 18 24 18 24 24 Z" fill="#D8546B"/><path d="M26 24 C28 30 28 40 30 46 M38 24 C36 30 36 40 34 46" stroke="#F1EAD9" stroke-width="2" fill="none"/><path d="M28 18 C24 12 24 6 28 4 M36 18 C40 12 40 6 36 4" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  apple:   `<svg viewBox="0 0 64 64"><circle cx="32" cy="38" r="17" fill="#C1442E"/><path d="M32 21 C30 16 32 12 36 12" stroke="#8A6A3C" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M32 21 C34 16 40 15 42 18" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  orange:  `<svg viewBox="0 0 64 64"><circle cx="32" cy="36" r="18" fill="#E8A93B"/><path d="M32 18 C30 14 32 10 35 10" stroke="#6B8F4E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`,
  honey:   `<svg viewBox="0 0 64 64"><path d="M22 22 H42 V50 Q42 54 38 54 H26 Q22 54 22 50 Z" fill="#E8A93B"/><rect x="24" y="16" width="16" height="8" rx="2" fill="#6B8F4E"/><rect x="22" y="34" width="20" height="4" fill="#B9822A" opacity="0.5"/></svg>`,
  basket:  `<svg viewBox="0 0 64 64"><path d="M14 28 H50 L45 52 H19 Z" fill="#C79A5B"/><path d="M20 28 C20 16 44 16 44 28" stroke="#8A6A3C" stroke-width="3" fill="none"/></svg>`
};

let PRODUCTS = [
  { id: "eggs",     name: "Eggs",     price: 150, unit: "dozen", step: 1, iconKey: "eggs",    customImage: null },
  { id: "tomatoes", name: "Tomatoes", price: 60,  unit: "kg",    step: 1, iconKey: "tomato",  customImage: null },
  { id: "carrots",  name: "Carrots",  price: 70,  unit: "kg",    step: 1, iconKey: "carrot",  customImage: null },
  { id: "lettuce",  name: "Lettuce",  price: 40,  unit: "head",  step: 1, iconKey: "lettuce", customImage: null },
  { id: "potatoes", name: "Potatoes", price: 65,  unit: "kg",    step: 1, iconKey: "potato",  customImage: null },
  { id: "honey",    name: "Honey",    price: 250, unit: "jar",   step: 1, iconKey: "honey",   customImage: null }
];

const order = {};

const productGrid = document.getElementById("productGrid");
const orderList   = document.getElementById("orderList");
const subtotalAmount = document.getElementById("subtotalAmount");
const discountRow = document.getElementById("discountRow");
const discountLabel = document.getElementById("discountLabel");
const discountAmountDisplay = document.getElementById("discountAmountDisplay");
const totalAmount = document.getElementById("totalAmount");
const checkoutBtn = document.getElementById("checkoutBtn");
const overlay     = document.getElementById("overlay");

function money(n){
  return "₱" + n.toFixed(2);
}

function formatQty(n){
  const whole = Math.floor(n);
  const frac = n - whole;
  const knownFractions = [
    [0.25, "1/4"], [0.3333, "1/3"], [0.5, "1/2"], [0.6667, "2/3"], [0.75, "3/4"]
  ];
  const match = knownFractions.find(([val]) => Math.abs(frac - val) < 0.02);

  if (match){
    const [, fracLabel] = match;
    return whole > 0 ? `${whole} ${fracLabel}` : fracLabel;
  }
  return parseFloat(n.toFixed(2)).toString();
}

function iconHtmlFor(p){
  if (p.customImage) return `<img src="${p.customImage}" alt="${p.name}">`;
  return ICONS[p.iconKey] || ICONS.basket;
}

const tabOrder   = document.getElementById("tabOrder");
const tabManage  = document.getElementById("tabManage");
const tabPromos  = document.getElementById("tabPromos");
const kioskView  = document.getElementById("kioskView");
const manageView = document.getElementById("manageView");
const promosView = document.getElementById("promosView");

tabOrder.addEventListener("click", () => switchView("order"));
tabManage.addEventListener("click", () => switchView("manage"));
tabPromos.addEventListener("click", () => switchView("promos"));

function switchView(view){
  kioskView.classList.toggle("active", view === "order");
  manageView.classList.toggle("active", view === "manage");
  promosView.classList.toggle("active", view === "promos");
  tabOrder.classList.toggle("active", view === "order");
  tabManage.classList.toggle("active", view === "manage");
  tabPromos.classList.toggle("active", view === "promos");
  if (view === "manage") renderManageList();
  if (view === "promos") renderPromoList();
}

const UNIT_PRESETS = [
  { label: "kg",     step: 0.5 },
  { label: "piece",  step: 1 },
  { label: "dozen",  step: 1 },
  { label: "bundle", step: 1 },
  { label: "bunch",  step: 1 },
  { label: "pack",   step: 1 },
  { label: "head",   step: 1 },
  { label: "jar",    step: 1 },
  { label: "liter",  step: 0.5 }
];

function renderProducts(){
  productGrid.innerHTML = "";
  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = p.id;

    const unitOptionsHtml = UNIT_PRESETS.map(u =>
      `<option value="${u.label}" ${u.label === p.unit ? "selected" : ""}>${u.label}</option>`
    ).join("");
    const hasCurrentUnit = UNIT_PRESETS.some(u => u.label === p.unit);
    const extraOption = hasCurrentUnit ? "" : `<option value="${p.unit}" selected>${p.unit}</option>`;

    card.innerHTML = `
      <span class="stock-tag">${t("card.fresh")}</span>
      <div class="icon">${iconHtmlFor(p)}</div>
      <p class="name">${p.name}</p>
      <p class="price"><span class="price-text">${money(p.price)}</span> <small>/ <span class="unit-text">${p.unit}</span></small></p>
      <div class="qty-row">
        <span class="price-edit-wrap" title="${t("card.changePrice")}">₱<input type="number" class="price-edit" value="${p.price}" min="0" step="0.01"></span>
        <button type="button" class="qty-btn minus">–</button>
        <input type="number" class="qty-input" value="1" min="${p.step}" step="${p.step}">
        <button type="button" class="qty-btn plus">+</button>
        <select class="unit-select" title="${t("card.changeUnit")}">
          ${extraOption}${unitOptionsHtml}
          <option value="__custom__">${t("card.customUnit")}</option>
        </select>
      </div>
      <button type="button" class="add-btn">${t("card.addToOrder")}</button>
    `;
    productGrid.appendChild(card);

    const qtyInput   = card.querySelector(".qty-input");
    const minusBtn   = card.querySelector(".minus");
    const plusBtn    = card.querySelector(".plus");
    const addBtn     = card.querySelector(".add-btn");
    const unitSelect = card.querySelector(".unit-select");
    const unitText   = card.querySelector(".unit-text");
    const priceEdit  = card.querySelector(".price-edit");
    const priceText  = card.querySelector(".price-text");

    priceEdit.addEventListener("change", () => {
      const newPrice = parseFloat(priceEdit.value);
      if (isNaN(newPrice) || newPrice < 0){
        priceEdit.value = p.price;
        return;
      }
      p.price = newPrice;
      priceText.textContent = money(p.price);
      renderOrder();
      renderManageList();
    });

    unitSelect.addEventListener("change", () => {
      let newUnit = unitSelect.value;

      if (newUnit === "__custom__"){
        const typed = prompt(t("card.customUnitPrompt"), p.unit);
        if (!typed || !typed.trim()){
          unitSelect.value = p.unit;
          return;
        }
        newUnit = typed.trim();
      }

      p.unit = newUnit;
      const preset = UNIT_PRESETS.find(u => u.label === newUnit);
      if (preset) p.step = preset.step;

      unitText.textContent = p.unit;
      qtyInput.min = p.step;
      qtyInput.step = p.step;
      qtyInput.value = p.step;

      renderManageList();
    });

    minusBtn.addEventListener("click", () => {
      let val = parseFloat(qtyInput.value) || p.step;
      val = Math.max(p.step, val - p.step);
      qtyInput.value = val;
    });
    plusBtn.addEventListener("click", () => {
      let val = parseFloat(qtyInput.value) || 0;
      qtyInput.value = val + p.step;
    });
    addBtn.addEventListener("click", () => {
      let qty = parseFloat(qtyInput.value);
      if (!qty || qty <= 0) return;
      addToOrder(p.id, qty);
      card.classList.add("active");
      setTimeout(() => card.classList.remove("active"), 250);
    });
  });
}

function addToOrder(productId, qty){
  order[productId] = (order[productId] || 0) + qty;
  renderOrder();
}
function removeFromOrder(productId){
  delete order[productId];
  renderOrder();
}
let discount = null;

function getSubtotal(){
  return Object.entries(order).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}
function getDiscountAmount(){
  if (!discount) return 0;
  const subtotal = getSubtotal();
  const raw = discount.type === "percent" ? subtotal * (discount.value / 100) : discount.value;
  return Math.max(0, Math.min(raw, subtotal));
}
function getGrandTotal(){
  return getSubtotal() - getDiscountAmount();
}

function renderOrder(){
  const ids = Object.keys(order);
  orderList.innerHTML = "";
  if (ids.length === 0){
    orderList.innerHTML = `<li class="empty-msg">Nothing added yet</li>`;
    checkoutBtn.disabled = true;
  } else {
    ids.forEach(id => {
      const p = PRODUCTS.find(pr => pr.id === id);
      if (!p) { delete order[id]; return; }
      const qty = order[id];
      const li = document.createElement("li");
      li.className = "order-line";
      li.innerHTML = `
        <div class="l-left">
          <div class="l-name">${p.name}</div>
          <div class="l-sub">${formatQty(qty)} ${p.unit} × ${money(p.price)}</div>
        </div>
        <div class="l-right">
          ${money(p.price * qty)}<br>
          <button class="remove" data-id="${id}">remove</button>
        </div>
      `;
      orderList.appendChild(li);
    });
    checkoutBtn.disabled = false;
  }
  orderList.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => removeFromOrder(btn.dataset.id));
  });
  renderTotals();
}

function renderTotals(){
  subtotalAmount.textContent = money(getSubtotal());
  if (discount){
    discountRow.style.display = "flex";
    discountLabel.textContent = discount.label;
    discountAmountDisplay.textContent = "–" + money(getDiscountAmount());
  } else {
    discountRow.style.display = "none";
  }
  totalAmount.textContent = money(getGrandTotal());
}

const discountToggleBtn = document.getElementById("discountToggleBtn");
const discountForm      = document.getElementById("discountForm");
const dtabPercent       = document.getElementById("dtabPercent");
const dtabFixed         = document.getElementById("dtabFixed");
const discountValue     = document.getElementById("discountValue");
const quickDiscounts    = document.getElementById("quickDiscounts");
const applyDiscountBtn  = document.getElementById("applyDiscountBtn");
const cancelDiscountBtn = document.getElementById("cancelDiscountBtn");
const removeDiscountBtn = document.getElementById("removeDiscountBtn");

let discountType = "percent";

discountToggleBtn.addEventListener("click", () => {
  discountForm.style.display = discountForm.style.display === "none" ? "block" : "none";
});
cancelDiscountBtn.addEventListener("click", () => {
  discountForm.style.display = "none";
});
removeDiscountBtn.addEventListener("click", () => {
  discount = null;
  renderTotals();
});

dtabPercent.addEventListener("click", () => setDiscountType("percent"));
dtabFixed.addEventListener("click", () => setDiscountType("fixed"));

function setDiscountType(type){
  discountType = type;
  dtabPercent.classList.toggle("active", type === "percent");
  dtabFixed.classList.toggle("active", type === "fixed");
  discountValue.placeholder = type === "percent" ? "e.g. 10" : "e.g. 20";
}

let PROMOS = [
  { id: "senior-pwd", label: "Senior/PWD 20%", type: "percent", value: 20 },
  { id: "promo-5",    label: "5% Off",         type: "percent", value: 5 },
  { id: "promo-10",   label: "10% Off",        type: "percent", value: 10 },
  { id: "promo-20off", label: "₱20 Off",       type: "fixed",   value: 20 }
];

function renderQuickDiscounts(){
  quickDiscounts.innerHTML = "";
  PROMOS.forEach(promo => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = promo.label;
    btn.addEventListener("click", () => {
      discount = { type: promo.type, value: promo.value, label: promo.label };
      discountForm.style.display = "none";
      renderTotals();
    });
    quickDiscounts.appendChild(btn);
  });
}
renderQuickDiscounts();

applyDiscountBtn.addEventListener("click", () => {
  const value = parseFloat(discountValue.value);
  if (!value || value <= 0){
    discountValue.focus();
    return;
  }
  const label = discountType === "percent" ? `Discount (${value}%)` : "Discount";
  discount = { type: discountType, value, label };
  discountValue.value = "";
  discountForm.style.display = "none";
  renderTotals();
});

const promoList       = document.getElementById("promoList");
const promoFormPanel  = document.getElementById("promoFormPanel");
const promoFormTitle  = document.getElementById("promoFormTitle");
const promoNameInput  = document.getElementById("promoName");
const promoTabPercent = document.getElementById("promoTabPercent");
const promoTabFixed   = document.getElementById("promoTabFixed");
const promoValueInput = document.getElementById("promoValue");
const promoValueLabel = document.getElementById("promoValueLabel");
const promoFormError  = document.getElementById("promoFormError");

let editingPromoId = null;
let promoFormType = "percent";

document.getElementById("addPromoBtn").addEventListener("click", () => openPromoForm(null));
document.getElementById("cancelPromoBtn").addEventListener("click", () => {
  promoFormPanel.style.display = "none";
});
promoTabPercent.addEventListener("click", () => setPromoFormType("percent"));
promoTabFixed.addEventListener("click", () => setPromoFormType("fixed"));

function setPromoFormType(type){
  promoFormType = type;
  promoTabPercent.classList.toggle("active", type === "percent");
  promoTabFixed.classList.toggle("active", type === "fixed");
  promoValueLabel.textContent = type === "percent" ? t("promos.percentOff") : t("promos.amountOff");
  promoValueInput.placeholder = type === "percent" ? t("promos.examplePercent") : t("promos.exampleFixed");
}

function openPromoForm(promo){
  editingPromoId = promo ? promo.id : null;
  promoFormTitle.textContent = promo ? t("promos.edit") : t("promos.add");
  promoFormError.style.display = "none";
  promoNameInput.value = promo ? promo.label : "";
  promoValueInput.value = promo ? promo.value : "";
  setPromoFormType(promo ? promo.type : "percent");
  promoFormPanel.style.display = "block";
}

function slugifyPromo(label){
  let base = label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!base) base = "promo";
  let id = base, n = 2;
  while (PROMOS.some(p => p.id === id && p.id !== editingPromoId)){
    id = `${base}-${n}`; n++;
  }
  return id;
}

document.getElementById("savePromoBtn").addEventListener("click", () => {
  const label = promoNameInput.value.trim();
  const value = parseFloat(promoValueInput.value);

  if (!label || !value || value <= 0){
    promoFormError.style.display = "block";
    return;
  }

  const fullLabel = promoFormType === "percent" ? `${label} (${value}%)` : `${label} (₱${value})`;

  if (editingPromoId){
    const existing = PROMOS.find(p => p.id === editingPromoId);
    existing.label = fullLabel;
    existing.type = promoFormType;
    existing.value = value;
  } else {
    PROMOS.push({ id: slugifyPromo(label), label: fullLabel, type: promoFormType, value });
  }

  promoFormPanel.style.display = "none";
  renderPromoList();
  renderQuickDiscounts();
});

function renderPromoList(){
  promoList.innerHTML = "";
  if (PROMOS.length === 0){
    promoList.innerHTML = `<div class="empty-manage">${t("promos.empty")}</div>`;
    return;
  }
  PROMOS.forEach(promo => {
    const row = document.createElement("div");
    row.className = "manage-row";
    const valueText = promo.type === "percent"
      ? t("promos.percentOffOrder", { value: promo.value })
      : t("promos.fixedOffOrder", { value: promo.value });
    row.innerHTML = `
      <div class="info">
        <div class="r-name">${promo.label}</div>
        <div class="r-price">${valueText}</div>
      </div>
      <div class="row-actions">
        <button class="btn-edit">${t("common.edit")}</button>
        <button class="btn-delete">${t("common.delete")}</button>
      </div>
    `;
    row.querySelector(".btn-edit").addEventListener("click", () => openPromoForm(promo));
    row.querySelector(".btn-delete").addEventListener("click", () => {
      if (!confirm(t("promos.confirmDelete", { name: promo.label }))) return;
      PROMOS = PROMOS.filter(p => p.id !== promo.id);
      renderPromoList();
      renderQuickDiscounts();
    });
    promoList.appendChild(row);
  });
}

const paymentOverlay     = document.getElementById("paymentOverlay");
const payDue             = document.getElementById("payDue");
const cashReceivedInput  = document.getElementById("cashReceivedInput");
const quickCash          = document.getElementById("quickCash");
const changeRow          = document.getElementById("changeRow");
const changeLabel        = document.getElementById("changeLabel");
const changeAmount       = document.getElementById("changeAmount");
const paymentError       = document.getElementById("paymentError");
const confirmPaymentBtn  = document.getElementById("confirmPaymentBtn");

let lastCashReceived = 0;
let lastChangeDue = 0;

const QUICK_AMOUNTS = [20, 50, 100, 200, 500, 1000];
QUICK_AMOUNTS.forEach(amt => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "₱" + amt;
  btn.addEventListener("click", () => {
    const current = parseFloat(cashReceivedInput.value) || 0;
    cashReceivedInput.value = current + amt;
    updateChangeDisplay();
  });
  quickCash.appendChild(btn);
});
const exactBtn = document.createElement("button");
exactBtn.type = "button";
exactBtn.textContent = t("payment.exact");
exactBtn.addEventListener("click", () => {
  cashReceivedInput.value = getGrandTotal().toFixed(2);
  updateChangeDisplay();
});
quickCash.appendChild(exactBtn);
const clearBtn = document.createElement("button");
clearBtn.type = "button";
clearBtn.textContent = t("payment.clear");
clearBtn.className = "clear-btn";
clearBtn.addEventListener("click", () => {
  cashReceivedInput.value = "";
  updateChangeDisplay();
});
quickCash.appendChild(clearBtn);

cashReceivedInput.addEventListener("input", updateChangeDisplay);

function updateChangeDisplay(){
  const total = getGrandTotal();
  const cash = parseFloat(cashReceivedInput.value) || 0;
  const change = cash - total;

  if (cash <= 0){
    changeLabel.textContent = t("payment.change");
    changeAmount.textContent = money(0);
    changeRow.classList.remove("insufficient", "ok");
    paymentError.style.display = "none";
    confirmPaymentBtn.disabled = true;
    return;
  }

  if (change < 0){
    changeLabel.textContent = t("payment.stillDue");
    changeAmount.textContent = money(Math.abs(change));
    changeRow.classList.add("insufficient");
    changeRow.classList.remove("ok");
    paymentError.style.display = "block";
    confirmPaymentBtn.disabled = true;
  } else {
    changeLabel.textContent = t("payment.change");
    changeAmount.textContent = money(change);
    changeRow.classList.add("ok");
    changeRow.classList.remove("insufficient");
    paymentError.style.display = "none";
    confirmPaymentBtn.disabled = false;
  }
}

checkoutBtn.addEventListener("click", () => {
  payDue.textContent = money(getGrandTotal());
  cashReceivedInput.value = "";
  updateChangeDisplay();
  paymentOverlay.classList.add("show");
  cashReceivedInput.focus();
});

document.getElementById("cancelPaymentBtn").addEventListener("click", () => {
  paymentOverlay.classList.remove("show");
});

confirmPaymentBtn.addEventListener("click", () => {
  lastCashReceived = parseFloat(cashReceivedInput.value) || 0;
  lastChangeDue = lastCashReceived - getGrandTotal();
  paymentOverlay.classList.remove("show");
  showReceipt();
});

const receiptMeta  = document.getElementById("receiptMeta");
const receiptLines = document.getElementById("receiptLines");
const receiptSubtotal = document.getElementById("receiptSubtotal");
const receiptDiscountRow = document.getElementById("receiptDiscountRow");
const receiptDiscountLabel = document.getElementById("receiptDiscountLabel");
const receiptDiscountAmount = document.getElementById("receiptDiscountAmount");
const receiptTotal = document.getElementById("receiptTotal");
const receiptCash  = document.getElementById("receiptCash");
const receiptChange = document.getElementById("receiptChange");

function showReceipt(){
  receiptMeta.textContent = new Date().toLocaleString("en-PH");
  receiptLines.innerHTML = "";
  Object.entries(order).forEach(([id, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (!p) return;
    const line = document.createElement("div");
    line.className = "r-line";
    line.innerHTML = `<span>${p.name} (${formatQty(qty)} ${p.unit})</span><span>${money(p.price * qty)}</span>`;
    receiptLines.appendChild(line);
  });
  receiptSubtotal.textContent = money(getSubtotal());
  if (discount){
    receiptDiscountRow.style.display = "flex";
    receiptDiscountLabel.textContent = discount.label;
    receiptDiscountAmount.textContent = "–" + money(getDiscountAmount());
  } else {
    receiptDiscountRow.style.display = "none";
  }
  receiptTotal.textContent = money(getGrandTotal());
  receiptCash.textContent = money(lastCashReceived);
  receiptChange.textContent = money(lastChangeDue);
  overlay.classList.add("show");
}

document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("newOrderBtn").addEventListener("click", () => {
  Object.keys(order).forEach(id => delete order[id]);
  discount = null;
  renderOrder();
  overlay.classList.remove("show");
});

const manageList   = document.getElementById("manageList");
const formPanel    = document.getElementById("formPanel");
const formTitle    = document.getElementById("formTitle");
const pName        = document.getElementById("pName");
const pPrice       = document.getElementById("pPrice");
const pUnit        = document.getElementById("pUnit");
const formError    = document.getElementById("formError");
const iconChoices  = document.getElementById("iconChoices");
const srcIconTab   = document.getElementById("srcIconTab");
const srcImageTab  = document.getElementById("srcImageTab");
const iconPickerBlock  = document.getElementById("iconPickerBlock");
const imageUploadBlock = document.getElementById("imageUploadBlock");
const imageUpload      = document.getElementById("imageUpload");
const imagePreview     = document.getElementById("imagePreview");
const imagePreviewImg  = document.getElementById("imagePreviewImg");

let editingId = null;
let selectedIconKey = "basket";
let uploadedImage = null;
let pictureSource = "icon";

Object.keys(ICONS).forEach(key => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "icon-choice";
  btn.dataset.key = key;
  btn.innerHTML = ICONS[key];
  btn.title = key;
  btn.addEventListener("click", () => {
    selectedIconKey = key;
    iconChoices.querySelectorAll(".icon-choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
  iconChoices.appendChild(btn);
});

function selectIconInPicker(key){
  iconChoices.querySelectorAll(".icon-choice").forEach(b => {
    b.classList.toggle("selected", b.dataset.key === key);
  });
}

srcIconTab.addEventListener("click", () => setPictureSource("icon"));
srcImageTab.addEventListener("click", () => setPictureSource("image"));

function setPictureSource(source){
  pictureSource = source;
  srcIconTab.classList.toggle("active", source === "icon");
  srcImageTab.classList.toggle("active", source === "image");
  iconPickerBlock.style.display  = source === "icon" ? "block" : "none";
  imageUploadBlock.style.display = source === "image" ? "block" : "none";
}

imageUpload.addEventListener("change", () => {
  const file = imageUpload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = reader.result;
    imagePreviewImg.src = uploadedImage;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

document.getElementById("addNewBtn").addEventListener("click", () => openForm(null));
document.getElementById("cancelFormBtn").addEventListener("click", () => {
  formPanel.style.display = "none";
});

function openForm(product){
  editingId = product ? product.id : null;
  formTitle.textContent = product ? t("products.edit") : t("products.add");
  formError.style.display = "none";

  pName.value  = product ? product.name : "";
  pPrice.value = product ? product.price : "";
  pUnit.value  = product ? product.unit : "";

  uploadedImage = product ? product.customImage : null;
  selectedIconKey = product && product.iconKey ? product.iconKey : "basket";

  if (product && product.customImage){
    setPictureSource("image");
    imagePreviewImg.src = product.customImage;
    imagePreview.style.display = "block";
  } else {
    setPictureSource("icon");
    imagePreview.style.display = "none";
    selectIconInPicker(selectedIconKey);
  }
  imageUpload.value = "";

  formPanel.style.display = "block";
}

function slugify(name){
  let base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!base) base = "item";
  let id = base, n = 2;
  while (PRODUCTS.some(p => p.id === id && p.id !== editingId)){
    id = `${base}-${n}`; n++;
  }
  return id;
}

document.getElementById("saveProductBtn").addEventListener("click", () => {
  const name  = pName.value.trim();
  const price = parseFloat(pPrice.value);
  const unit  = pUnit.value.trim();
  const hasPicture = pictureSource === "image" ? !!uploadedImage : !!selectedIconKey;

  if (!name || !unit || isNaN(price) || price < 0 || !hasPicture){
    formError.textContent = !hasPicture
      ? t("products.errorPicture")
      : t("products.errorFields");
    formError.style.display = "block";
    return;
  }

  const iconKey     = pictureSource === "icon" ? selectedIconKey : null;
  const customImage = pictureSource === "image" ? uploadedImage : null;

  if (editingId){
    const existing = PRODUCTS.find(p => p.id === editingId);
    existing.name  = name;
    existing.price = price;
    existing.unit  = unit;
    existing.iconKey = iconKey;
    existing.customImage = customImage;
  } else {
    PRODUCTS.push({
      id: slugify(name), name, price, unit,
      step: 1, iconKey, customImage
    });
  }

  formPanel.style.display = "none";
  renderProducts();
  renderManageList();
  renderOrder();
});

function renderManageList(){
  manageList.innerHTML = "";
  if (PRODUCTS.length === 0){
    manageList.innerHTML = `<div class="empty-manage">${t("products.empty")}</div>`;
    return;
  }
  PRODUCTS.forEach(p => {
    const row = document.createElement("div");
    row.className = "manage-row";
    row.innerHTML = `
      <div class="thumb">${iconHtmlFor(p)}</div>
      <div class="info">
        <div class="r-name">${p.name}</div>
        <div class="r-price">${money(p.price)} / ${p.unit}</div>
      </div>
      <div class="row-actions">
        <button class="btn-edit">${t("common.edit")}</button>
        <button class="btn-delete">${t("common.delete")}</button>
      </div>
    `;
    row.querySelector(".btn-edit").addEventListener("click", () => openForm(p));
    row.querySelector(".btn-delete").addEventListener("click", () => {
      if (!confirm(t("products.confirmDelete", { name: p.name }))) return;
      PRODUCTS = PRODUCTS.filter(pr => pr.id !== p.id);
      removeFromOrder(p.id);
      renderProducts();
      renderManageList();
    });
    manageList.appendChild(row);
  });
}

renderProducts();
renderOrder();
