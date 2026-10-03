# Coop POS — Cooperatives Store Kiosk

A front-end point-of-sale mockup for a cooperatives store: browse products, build an order, apply discounts/promos, take payment (cash + change calculator), and print a receipt. Includes Google Sign-In so the app shows who's using it.

**Live site:** https://nekii0.github.io/Consumers-Cooperative/

No backend yet — everything (products, promos, the current order) lives in the browser's memory/localStorage. If you're on the Inventory System side, see [Connecting to Inventory](#connecting-to-inventory) below.

---

## Project files

| File | What it does |
|---|---|
| `index.html` | Page structure — the three tabs (Order Kiosk / Manage Products / Manage Promos), the login screen, the payment and receipt popups |
| `styles.css` | All styling/theme |
| `script.js` | All app logic — products, cart, discounts, payment, receipt, Google Sign-In |

No build step, no frameworks, no dependencies — it's plain HTML/CSS/JS. Anyone can open it in any code editor.

---

## Running it locally

You need a local server for Google Sign-In to work (it refuses to load on a page opened directly by double-clicking, i.e. a `file://` address). Easiest way if you have **Python** installed:

```
cd path\to\this\folder
python -m http.server 5500
```

(If `python` isn't recognized, try `py -m http.server 5500` instead — some Windows installs only register the `py` launcher.)

Then open **http://localhost:5500** in your browser.

If you don't need to test sign-in and just want to look at the app, you can skip the server and open `index.html` directly — everything except the Google button will work.

---

## Making changes

1. Clone the repo:
   ```
   git clone https://github.com/Nekii0/Consumers-Cooperative.git
   ```
2. Edit the files in your editor of choice (VS Code recommended).
3. Test locally (see above) before pushing.
4. Commit and push:
   ```
   git add .
   git commit -m "describe what you changed"
   git push
   ```
5. The live site at the link above rebuilds automatically about a minute after you push (it's hosted via GitHub Pages, set to deploy from the `main` branch).

**Before you start editing each session:** run `git pull` first, so you're working from the latest version and don't overwrite someone else's changes.

---

## Google Sign-In — how it's set up

- Uses Google Identity Services (the official "Sign in with Google" button), configured in `script.js` under `GOOGLE_CLIENT_ID`.
- The OAuth app is currently in **Testing** mode in Google Cloud Console, which means **only approved test-user emails can sign in** — if you need to test sign-in yourself, ask Michael to add your Google email as a test user (Google Cloud Console → the "Coop POS" project → Google Auth Platform → Audience → Test users).
- The Client ID is meant to be public and is safe to have visible in the code — it's not a secret. (There's no client *secret* used anywhere in this app.)
- Sign-in only needs internet the moment you actually sign in. After that, it's remembered locally (`localStorage`), so the rest of the app — browsing, ordering, checkout — works offline.

---

## Connecting to Inventory

This POS currently keeps its own product list in memory (`PRODUCTS` array in `script.js`) — it doesn't talk to any shared database yet. For the POS and Inventory groups' systems to reflect the same stock/prices, both sides need to read/write the same shared data source instead of each keeping a private copy.

If your group has decided which approach to use (e.g. a shared Google Sheet via Apps Script, Firebase, or a custom API), document it here once it's chosen, and update `getSubtotal()` / `renderProducts()` in `script.js` to fetch from that shared source instead of the local `PRODUCTS` array.

