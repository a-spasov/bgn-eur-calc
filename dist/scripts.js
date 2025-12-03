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

  // src/scripts/calc-interface.js
  function initDisplayText() {
    const checklist = document.getElementById("inputsChecklist");
    const changeInputs = document.getElementById("changeInputs");
    const messageText = document.getElementById("messageText");
    if (!checklist || !changeInputs || !messageText) return;
    checklist.innerHTML = "";
    const isPaymentMode = changeInputs.classList.contains("payment-mode");
    messageText.textContent = isPaymentMode ? "\u0418\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0437\u0430 \u0441\u0442\u043E\u043A\u0430/\u0443\u0441\u043B\u0443\u0433\u0430 \u0432 \u0434\u0432\u0435\u0442\u0435 \u0432\u0430\u043B\u0443\u0442\u0438? \u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435:" : "\u0418\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u0438\u0437\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0440\u0435\u0441\u0442\u043E \u0432 \u0435\u0432\u0440\u043E \u0438 \u043B\u0432.? \u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435:";
    const items = isPaymentMode ? [
      "- \u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.",
      "- \u043F\u043B\u0430\u0442\u0435\u043D\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432."
    ] : [
      "- \u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.",
      "- \u043F\u043B\u0430\u0442\u0435\u043D\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438/\u0438\u043B\u0438 \u043B\u0432.",
      "- \u0432\u044A\u0440\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432. (\u0432\u0430\u0436\u0438 \u0441\u0430\u043C\u043E \u0437\u0430 \u0441\u043C\u0435\u0441\u0435\u043D\u043E \u0440\u0435\u0441\u0442\u043E)"
    ];
    let itemCounter = 1;
    items.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.classList.add(`inputs-line-${itemCounter}`);
      checklist.appendChild(li);
      itemCounter++;
    });
  }
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
      currentMode = "payment";
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
      initDisplayText();
    }
    function activateChangeMode() {
      currentMode = "change";
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
      initDisplayText();
    }
    modePayment.addEventListener("click", activatePaymentMode);
    modeChange.addEventListener("click", activateChangeMode);
    activatePaymentMode();
  }
  function kbdToggleAnimation() {
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
  var currentMode;
  var init_calc_interface = __esm({
    "src/scripts/calc-interface.js"() {
      currentMode = "payment";
    }
  });

  // src/scripts/inputs-handling.js
  function autoConvert(inputElemId, value) {
    const val = parseFloat(value);
    if (isNaN(val)) return;
    const priceEur = document.getElementById("priceEur");
    const priceBgn = document.getElementById("priceBgn");
    switch (inputElemId) {
      case "priceEur":
        priceBgn.value = (val * RATE).toFixed(2);
        priceBgn.classList.remove("border-red-600", "border-gray-500");
        priceBgn.classList.add("border-lime-600");
        priceBgn.disabled = true;
        break;
      case "priceBgn":
        priceEur.value = (val / RATE).toFixed(2);
        priceEur.classList.remove("border-red-600", "border-gray-500");
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
              fieldId: el.id
            }
          })
        );
      } else if (el.value === "") {
        if (el.closest("#priceInputs") && el.id === "priceBgn") resetInput(document.getElementById("priceEur"));
        if (el.closest("#priceInputs") && el.id === "priceEur") resetInput(document.getElementById("priceBgn"));
        document.dispatchEvent(
          new CustomEvent("show-notification", {
            detail: {
              type: "error",
              fieldId: el.id
            }
          })
        );
      } else {
        document.dispatchEvent(
          new CustomEvent("show-notification", {
            detail: {
              type: "error",
              fieldId: el.id
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
    } else if (value === "") {
      input.classList.remove("border-red-600", "border-lime-600");
      input.classList.add("border-gray-500");
    } else {
      input.classList.add("border-red-600");
      return false;
    }
  }
  function resetInput(input) {
    if (!input) return;
    input.value = "";
    input.disabled = false;
    input.classList.remove("border-lime-600", "border-red-600");
    input.classList.add("border-gray-500");
  }
  var RATE;
  var init_inputs_handling = __esm({
    "src/scripts/inputs-handling.js"() {
      RATE = 1.95583;
    }
  });

  // src/scripts/notifications.js
  function initNotifications() {
    const messageIcon = document.getElementById("messageIcon");
    document.addEventListener("show-notification", (event) => {
      const { type, fieldId } = event.detail;
      updateChecklistStatus(fieldId, type);
      if (messageIcon) messageIcon.innerHTML = "";
      if (type === "error") {
        messageIcon.innerHTML = `
            <span class="relative flex items-center justify-center size-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span class="relative inline-flex items-center justify-center size-2.5 rounded-full bg-red-600 text-white">
                    <i class="fa-solid fa-exclamation"></i>
                </span>
            </span>
        `;
      } else if (type === "success") {
        messageIcon.innerHTML = `
            <i class="fa-solid fa-circle-check text-lime-400"></i>
        `;
      }
    });
  }
  function getChecklistLine(fieldId) {
    const lineNumber = checklistMap[fieldId];
    if (!lineNumber) return null;
    return document.querySelector(`.inputs-line-${lineNumber}`);
  }
  function updateChecklistStatus(fieldId, type) {
    const li = getChecklistLine(fieldId);
    if (!li) return;
    let oldIcon = li.querySelector(".status-indicator");
    if (oldIcon) oldIcon.remove();
    const indicator = document.createElement("span");
    indicator.className = "status-indicator ml-2";
    if (type === "error") {
      indicator.innerHTML = `
            <span class="relative flex items-center justify-center size-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span class="relative inline-flex items-center justify-center size-2.5 rounded-full bg-red-600"></span>
            </span>
        `;
    } else if (type === "success") {
      indicator.innerHTML = `
            <i class="fa-solid fa-circle-check text-lime-400"></i>
        `;
    }
    li.appendChild(indicator);
  }
  var checklistMap;
  var init_notifications = __esm({
    "src/scripts/notifications.js"() {
      checklistMap = {
        priceEur: 1,
        priceBgn: 1,
        paidEur: 2,
        paidBgn: 2,
        changeEur: 3,
        changeBgn: 3
      };
    }
  });

  // src/scripts/main.js
  var require_main = __commonJS({
    "src/scripts/main.js"() {
      init_theme_switch();
      init_calc_interface();
      init_inputs_handling();
      init_notifications();
      document.addEventListener("DOMContentLoaded", () => {
        initThemeSwitch();
        initModeSwitch();
        initInputsListener();
        kbdToggleAnimation();
        initNotifications();
      });
    }
  });
  require_main();
})();
