(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/scripts/theme-switch.js
  function initThemeSwitch() {
    document.getElementById("themeToggle").addEventListener("click", () => {
      const html = document.documentElement;
      html.classList.toggle("dark");
      if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }
  var init_theme_switch = __esm({
    "src/scripts/theme-switch.js"() {
    }
  });

  // src/scripts/calc-buttons.js
  function initModeSwitch() {
    const modePayment = document.getElementById("modePayment");
    const modeChange = document.getElementById("modeChange");
    const modeSlider = document.getElementById("modeSlider");
    if (!modePayment || !modeChange || !modeSlider) {
      console.warn("Mode switch elements not found");
      return;
    }
    const SLIDE_WIDTH = 130;
    const ACTIVE = ["text-white", "text-shadow-lg", "cursor-default"];
    const INACTIVE = ["text-slate-500", "text-shadow-none", "cursor-pointer"];
    function setActive(el) {
      el.classList.add(...ACTIVE);
      el.classList.remove(...INACTIVE);
    }
    function setInactive(el) {
      el.classList.add(...INACTIVE);
      el.classList.remove(...ACTIVE);
    }
    function activatePaymentMode() {
      modeSlider.style.transform = "translateX(0px)";
      setActive(modePayment);
      setInactive(modeChange);
    }
    function activateChangeMode() {
      modeSlider.style.transform = `translateX(${SLIDE_WIDTH}px)`;
      setActive(modeChange);
      setInactive(modePayment);
    }
    modePayment.addEventListener("click", activatePaymentMode);
    modeChange.addEventListener("click", activateChangeMode);
    activatePaymentMode();
  }
  function calcKeypadToggle() {
    const toggleBtn = document.getElementById("toggleNumpad");
    const numpad = document.getElementById("numpad");
    const chevron = document.getElementById("chevronIcon");
    if (!toggleBtn || !numpad || !chevron) {
      console.warn("Keypad toggle elements not found");
      return;
    }
    toggleBtn.addEventListener("click", () => {
      numpad.classList.toggle("visible");
      numpad.classList.toggle("opacity-100");
      chevron.classList.toggle("rotate-180");
    });
  }
  var init_calc_buttons = __esm({
    "src/scripts/calc-buttons.js"() {
    }
  });

  // src/scripts/main.js
  var require_main = __commonJS({
    "src/scripts/main.js"() {
      init_theme_switch();
      init_calc_buttons();
      document.addEventListener("DOMContentLoaded", () => {
        initThemeSwitch();
        initModeSwitch();
        calcKeypadToggle();
      });
    }
  });
  require_main();
})();
