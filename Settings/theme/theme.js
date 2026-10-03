const PRESETS = [
  { name: "Deep Navy",        hex: "#1B2A41" },
  { name: "Soft Cream",       hex: "#F5EFDC" },
  { name: "Charcoal",         hex: "#262626" },
  { name: "Pale Sky Blue",    hex: "#E3ECF5" },
  { name: "Chalkboard Green", hex: "#1F2E1B" },
  { name: "Warm Brown",       hex: "#3B2A1E" },
  { name: "Light Sage",       hex: "#E6EDDF" }
];

const swatchGrid = document.getElementById("swatchGrid");
const statusBar  = document.getElementById("statusBar");
const undoBtn    = document.getElementById("undoBtn");

let previousColor = null; 

function render(){
  const current = coopTheme.get().toLowerCase();
  swatchGrid.innerHTML = "";
  PRESETS.forEach(p => {
    const selected = p.hex.toLowerCase() === current;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "swatch" + (selected ? " selected" : "");
    btn.style.background = p.hex;
    btn.title = p.name;
    btn.setAttribute("aria-label", p.name);
    btn.setAttribute("aria-pressed", selected ? "true" : "false");
    btn.innerHTML = `<span class="check">✓</span>`;
    btn.addEventListener("click", () => choose(p.hex));
    swatchGrid.appendChild(btn);
  });
}

function choose(hex){
  const before = coopTheme.get();
  if (before.toLowerCase() === hex.toLowerCase()) return;
  previousColor = before;
  coopTheme.save(hex);
  render();
  statusBar.classList.add("show");
}

undoBtn.addEventListener("click", () => {
  if (!previousColor) return;
  coopTheme.save(previousColor);
  previousColor = null;
  render();
  statusBar.classList.remove("show");
});

render();
