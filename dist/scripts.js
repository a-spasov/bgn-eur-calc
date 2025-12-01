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
    const changeInputs = document.getElementById("changeInputs");
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
      const numpad = document.getElementById("numpad");
      const isKeyboardOn = numpad?.classList.contains("keyboard-on");
      modeSlider.style.transform = "translateX(0px)";
      setActive(modePayment);
      setInactive(modeChange);
      changeInputs.classList.add("invisible", "opacity-0", "payment-mode");
      if (isKeyboardOn) {
        setTimeout(() => {
          numpad.style.transform = "translateY(-74px)";
        }, 800);
      }
    }
    function activateChangeMode() {
      const numpad = document.getElementById("numpad");
      const isKeyboardOn = numpad?.classList.contains("keyboard-on");
      modeSlider.style.transform = `translateX(${SLIDE_WIDTH}px)`;
      setActive(modeChange);
      setInactive(modePayment);
      if (isKeyboardOn) {
        numpad.style.transform = "translateY(0)";
        setTimeout(() => {
          changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
        }, 600);
      } else {
        changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
      }
    }
    modePayment.addEventListener("click", activatePaymentMode);
    modeChange.addEventListener("click", activateChangeMode);
    activatePaymentMode();
  }
  function calcKeypadToggle() {
    const toggleBtn = document.getElementById("toggleNumpad");
    const numpad = document.getElementById("numpad");
    if (!toggleBtn || !numpad) {
      console.warn("Keypad toggle elements not found");
      return;
    }
    toggleBtn.addEventListener("click", () => {
      const hasPaymentMode = document.querySelector(".payment-mode");
      if (numpad.classList.contains("keyboard-on")) {
        numpad.classList.remove("keyboard-on");
        numpad.classList.add("xl:invisible", "xl:opacity-0");
        numpad.style.transform = "";
      } else {
        numpad.classList.add("keyboard-on");
        numpad.classList.remove("xl:invisible", "xl:opacity-0");
        if (hasPaymentMode) {
          setTimeout(() => {
            numpad.style.transform = "translateY(-74px)";
          }, 500);
        } else {
          numpad.style.transform = "";
        }
      }
    });
  }
  var init_calc_buttons = __esm({
    "src/scripts/calc-buttons.js"() {
    }
  });

  // src/scripts/calculations.js
  function autoConvert(inputElemId, value) {
    const val = parseFloat(value);
    if (isNaN(val)) return;
    const priceEur = document.getElementById("priceEur");
    const priceBgn = document.getElementById("priceBgn");
    switch (inputElemId) {
      case "priceEur":
        priceBgn.value = (val * RATE).toFixed(2);
        priceBgn.classList.add("border-lime-600");
        priceBgn.disabled = true;
        break;
      case "priceBgn":
        priceEur.value = (val / RATE).toFixed(2);
        priceEur.classList.add("border-lime-600");
        priceEur.disabled = true;
        break;
      default:
        return;
    }
  }
  function formatInputValue(input) {
    if (input.value === "") return;
    const num = parseFloat(input.value.replace(",", "."));
    if (isNaN(num)) return;
    input.value = num.toFixed(2);
  }
  function initInputsListener() {
    const wrapper = document.getElementById("calcInputs");
    if (!wrapper) {
      console.warn("calcInputs wrapper not found");
      return;
    }
    wrapper.addEventListener("input", (event) => {
      const el = event.target;
      if (!el.matches("input")) return;
      validateInput(el);
    });
    wrapper.addEventListener("blur", (event) => {
      const el = event.target;
      if (!el.matches("input")) return;
      const isValid = validateInput(el);
      if (isValid) {
        formatInputValue(el);
        document.dispatchEvent(
          new CustomEvent("show-notification", {
            detail: {
              type: "success",
              message: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0434\u0430\u043D\u043D\u0438 \u0437\u0430 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E \u043F\u043B\u0430\u0449\u0430\u043D\u0435 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432."
            }
          })
        );
      } else {
        document.dispatchEvent(
          new CustomEvent("show-notification", {
            detail: {
              type: "error",
              message: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432."
            }
          })
        );
      }
    }, true);
  }
  function validateInput(input) {
    let value = input.value;
    value = value.replace(",", ".");
    const validPattern = /^(\d+(\.\d*)?|\.\d*)$/;
    if (validPattern.test(value)) {
      input.value = value;
      input.classList.remove("border-red-600");
      input.classList.add("border-lime-600");
      autoConvert(input.id, input.value);
      return true;
    } else {
      input.classList.remove("focus:border-orange-400");
      input.classList.add("border-red-600");
      return false;
    }
  }
  var RATE;
  var init_calculations = __esm({
    "src/scripts/calculations.js"() {
      RATE = 1.95583;
    }
  });

  // src/scripts/notifications.js
  function initNotifications() {
    const messageLine = document.getElementById("messageLine");
    if (!messageLine) {
      console.warn("messageLine element not found");
      return;
    }
    document.addEventListener("show-notification", (event) => {
      const { type, message } = event.detail;
      messageLine.textContent = message;
      messageLine.classList.remove("text-yellow-300", "text-red-400", "text-green-400");
      if (type === "success") {
        messageLine.classList.add("text-green-400");
      } else if (type === "error") {
        messageLine.classList.add("text-red-400");
      } else {
        messageLine.classList.add("text-yellow-300");
      }
    });
  }
  var init_notifications = __esm({
    "src/scripts/notifications.js"() {
    }
  });

  // src/scripts/main.js
  var require_main = __commonJS({
    "src/scripts/main.js"() {
      init_theme_switch();
      init_calc_buttons();
      init_calculations();
      init_notifications();
      document.addEventListener("DOMContentLoaded", () => {
        initThemeSwitch();
        initModeSwitch();
        initNotifications();
        initInputsListener();
        calcKeypadToggle();
      });
    }
  });
  require_main();
})();
