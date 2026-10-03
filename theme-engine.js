(function(){
  const DEFAULT_BG = "#1F2E1B";
  const root = document.documentElement;

  function hexToRgb(hex){
    const h = hex.replace("#", "");
    return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16));
  }
  function rgbToHex(rgb){
    return "#" + rgb.map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
  }
  function mix(hex, targetHex, amt){
    const a = hexToRgb(hex), b = hexToRgb(targetHex);
    return rgbToHex(a.map((v, i) => v + (b[i] - v) * amt));
  }
  function luminance(hex){
    const [r, g, b] = hexToRgb(hex).map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function isLight(hex){ return luminance(hex) > 0.4; }

  function isValid(hex){ return /^#[0-9a-f]{6}$/i.test(hex || ""); }

  function apply(hex){
    if (!isValid(hex)) hex = DEFAULT_BG;
    root.style.setProperty("--board", hex);
    if (isLight(hex)){
      root.style.setProperty("--board-2", mix(hex, "#FFFFFF", 0.55));
      root.style.setProperty("--chalk", "#2B2620");
      root.style.setProperty("--chalk-dim", "#4E4637");
    } else {
      root.style.setProperty("--board-2", mix(hex, "#FFFFFF", 0.07));
      root.style.setProperty("--chalk", "#F1EAD9");
      root.style.setProperty("--chalk-dim", "#C8C2AE");
    }
  }

  function get(){
    try {
      const saved = localStorage.getItem("coopTheme");
      return isValid(saved) ? saved : DEFAULT_BG;
    } catch(e){ return DEFAULT_BG; }
  }

  function save(hex){
    try { localStorage.setItem("coopTheme", hex); } catch(e){ }
    apply(hex);
  }

  function reset(){
    try { localStorage.removeItem("coopTheme"); } catch(e){ }
    apply(DEFAULT_BG);
  }

  window.coopTheme = { DEFAULT_BG, get, save, reset, apply, isLight };
  apply(get());
})();
