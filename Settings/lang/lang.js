const langList  = document.getElementById("langList");
const statusBar = document.getElementById("statusBar");

function render(){
  const current = coopLang.get();
  langList.innerHTML = "";
  coopLang.list().forEach(l => {
    const selected = l.code === current;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-option" + (selected ? " selected" : "");
    btn.lang = l.htmlLang || l.code;
    btn.setAttribute("aria-pressed", selected ? "true" : "false");
    btn.innerHTML = `
      <span class="lang-badge" aria-hidden="true">${l.badge || l.code.toUpperCase()}</span>
      <span class="lang-text">
        <span class="lang-name">${l.name || l.code}</span>
        <span class="lang-sample">${l.sample || ""}</span>
      </span>
      <span class="check" aria-hidden="true">✓</span>
    `;
    btn.addEventListener("click", () => choose(l.code));
    langList.appendChild(btn);
  });
}

function choose(code){
  if (code === coopLang.get()) return;
  coopLang.set(code);
  render();
  statusBar.classList.add("show");
}

render();
