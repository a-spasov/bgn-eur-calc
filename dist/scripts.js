(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/scripts/utils.js
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
  var init_utils = __esm({
    "src/scripts/utils.js"() {
    }
  });

  // src/scripts/variables.js
  var elements, store;
  var init_variables = __esm({
    "src/scripts/variables.js"() {
      elements = {
        priceEur: document.getElementById("priceEur"),
        priceBgn: document.getElementById("priceBgn"),
        paidEur: document.getElementById("paidEur"),
        paidBgn: document.getElementById("paidBgn"),
        changeEur: document.getElementById("changeEur"),
        changeBgn: document.getElementById("changeBgn"),
        changeInputs: document.getElementById("changeInputs"),
        checklist: document.getElementById("inputsChecklist"),
        messageText: document.getElementById("messageText"),
        modePayment: document.getElementById("modePayment"),
        modeChange: document.getElementById("modeChange"),
        modeSlider: document.getElementById("modeSlider"),
        resetCalc: document.getElementById("resetCalc"),
        numpad: document.getElementById("numpad"),
        toggleNumpad: document.getElementById("toggleNumpad"),
        messageIcon: document.getElementById("messageIcon")
      };
      store = {
        mode: "payment",
        rate: 1.95583,
        keyboardVisible: false,
        inputs: {
          priceEur: null,
          priceBgn: null,
          paidEur: null,
          paidBgn: null,
          changeEur: null,
          changeBgn: null
        },
        validation: {
          priceValid: false,
          paidValid: false,
          changeValid: false
        }
      };
    }
  });

  // src/scripts/inputs-handling.js
  function autoConvert(fieldId, rawValue) {
    const value = parseFloat(rawValue);
    if (isNaN(value)) return;
    const { priceEur, priceBgn } = elements;
    switch (fieldId) {
      case "priceEur":
        priceBgn.value = (value * store.rate).toFixed(2);
        markValid(priceBgn);
        priceBgn.disabled = true;
        store.inputs.priceBgn = priceBgn.value;
        store.validation.priceBgn = true;
        break;
      case "priceBgn":
        priceEur.value = (value / store.rate).toFixed(2);
        markValid(priceEur);
        priceEur.disabled = true;
        store.inputs.priceEur = priceEur.value;
        store.validation.priceEur = true;
        break;
      default:
        return;
    }
  }
  function formatCurrency(input) {
    if (input.value === "") return;
    const number = parseFloat(input.value.replace(",", "."));
    if (isNaN(number)) return;
    input.value = number.toFixed(2);
  }
  function markValid(input) {
    input.classList.remove("border-red-600", "border-gray-500");
    input.classList.add("border-lime-600");
  }
  function markInvalid(input) {
    input.classList.remove("border-lime-600", "border-gray-500");
    input.classList.add("border-red-600");
  }
  function clearValidation(input) {
    input.classList.remove("border-lime-600", "border-red-600");
    input.classList.add("border-gray-500");
  }
  function validateInput(input) {
    let value = input.value.replace(",", ".");
    const numericPattern = /^(\d+(\.\d*)?|\.\d*)$/;
    const fieldId = input.id;
    store.inputs[fieldId] = input.value;
    if (value === "") {
      clearValidation(input);
      store.validation[fieldId] = false;
      return false;
    }
    if (numericPattern.test(value)) {
      input.value = value;
      markValid(input);
      store.validation[fieldId] = true;
      autoConvert(fieldId, input.value);
      return true;
    }
    markInvalid(input);
    store.validation[fieldId] = false;
    return false;
  }
  function resetInput(input) {
    if (!input) return;
    input.value = "";
    input.disabled = false;
    clearValidation(input);
    store.inputs[input.id] = "";
    store.validation[input.id] = false;
  }
  function resetAll() {
    const {
      priceEur,
      priceBgn,
      paidEur,
      paidBgn,
      changeEur,
      changeBgn,
      resultsLine
    } = elements;
    resetInput(priceEur);
    resetInput(priceBgn);
    resetInput(paidEur);
    resetInput(paidBgn);
    resetInput(changeEur);
    resetInput(changeBgn);
    if (resultsLine) resultsLine.textContent = "0.00";
  }
  function initInputsListener() {
    const wrapper = document.getElementById("calcInputs");
    if (!wrapper) {
      console.warn("calcInputs wrapper not found");
      return;
    }
    wrapper.addEventListener("input", (event) => {
      const input = event.target;
      if (!input.matches("input")) return;
      const valid = validateInput(input);
      document.dispatchEvent(
        new CustomEvent("show-notification", {
          detail: { type: valid ? "success" : "error", fieldId: input.id }
        })
      );
    });
    wrapper.addEventListener(
      "blur",
      (event) => {
        const input = event.target;
        if (!input.matches("input")) return;
        const valid = validateInput(input);
        if (valid) {
          formatCurrency(input);
        }
        if (input.closest("#priceInputs")) {
          if (input.id === "priceEur") resetInput(elements.priceBgn);
          if (input.id === "priceBgn") resetInput(elements.priceEur);
        }
        document.dispatchEvent(
          new CustomEvent("show-notification", {
            detail: { type: valid ? "success" : "error", fieldId: input.id }
          })
        );
      },
      false
    );
  }
  var init_inputs_handling = __esm({
    "src/scripts/inputs-handling.js"() {
      init_variables();
    }
  });

  // src/scripts/calc-interface.js
  function updateDisplayText() {
    const { checklist, messageText } = elements;
    if (!checklist || !messageText) return;
    checklist.innerHTML = "";
    const isPaymentMode = store.mode === "payment";
    messageText.textContent = isPaymentMode ? "\u0417\u0430 \u0434\u0430 \u0440\u0430\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u043E\u043B\u043A\u043E \u0434\u0430 \u0434\u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435:" : "\u0417\u0430 \u0434\u0430 \u0440\u0430\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u043E\u043B\u043A\u043E \u0434\u0430 \u0432\u044A\u0440\u043D\u0435\u0442\u0435, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435:";
    const items = isPaymentMode ? [
      "\u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u043D\u0430 \u0441\u0442\u043E\u043A\u0430\u0442\u0430/\u0443\u0441\u043B\u0443\u0433\u0430\u0442\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.",
      "\u0447\u0430\u0441\u0442\u0438\u0447\u043D\u0430 \u043F\u043B\u0430\u0442\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432."
    ] : [
      "\u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.",
      "\u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438/\u0438\u043B\u0438 \u043B\u0432.",
      "\u0447\u0430\u0441\u0442\u0438\u0447\u043D\u0430 \u0432\u044A\u0440\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432. (\u0441\u0430\u043C\u043E \u0437\u0430 \u0441\u043C\u0435\u0441\u0435\u043D\u043E \u0440\u0435\u0441\u0442\u043E)"
    ];
    items.forEach((text, index) => {
      const li = document.createElement("li");
      li.classList.add(`inputs-line-${index + 1}`, "flex", "items-center", "gap-2");
      const indicator = document.createElement("span");
      indicator.className = `
            check-indicator inline-block
            w-3 h-3 rounded-full border border-current
            opacity-50
        `;
      li.appendChild(indicator);
      li.appendChild(document.createTextNode(text));
      checklist.appendChild(li);
    });
  }
  function setIndicatorIdle(el) {
    el.className = `
        check-indicator inline-block w-3 h-3 rounded-full 
        border border-current opacity-50
    `;
  }
  function setIndicatorSuccess(el) {
    el.className = `
        check-indicator inline-flex items-center justify-center 
        w-3 h-3 rounded-full bg-lime-500 text-white
    `;
    el.innerHTML = `<i class="fa-solid fa-check text-[8px] leading-none"></i>`;
  }
  function setIndicatorError(el) {
    el.className = `
        check-indicator relative inline-flex items-center justify-center 
        w-3 h-3 rounded-full bg-red-600
    `;
    el.innerHTML = `
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        <span class="relative block w-3 h-3 rounded-full bg-red-600"></span>
    `;
  }
  function initInputFeedback() {
    document.addEventListener("show-notification", () => {
      evaluateGroup(1, ["priceEur", "priceBgn"]);
      evaluateGroup(2, ["paidEur", "paidBgn"]);
      evaluateGroup(3, ["changeEur", "changeBgn"]);
    });
  }
  function evaluateGroup(line, fields) {
    const indicator = document.querySelector(`.inputs-line-${line} .check-indicator`);
    if (!indicator) return;
    const [a, b] = fields;
    const valA = store.inputs[a];
    const valB = store.inputs[b];
    const isValidA = store.validation[a] === true;
    const isValidB = store.validation[b] === true;
    const emptyA = !valA;
    const emptyB = !valB;
    const invalidA = !emptyA && !isValidA;
    const invalidB = !emptyB && !isValidB;
    if (emptyA && emptyB) {
      setIndicatorIdle(indicator);
      return;
    }
    if (invalidA || invalidB) {
      setIndicatorError(indicator);
      return;
    }
    if (isValidA && (isValidB || emptyB) || isValidB && (isValidA || emptyA)) {
      setIndicatorSuccess(indicator);
      return;
    }
    setIndicatorIdle(indicator);
  }
  function initModeSwitch() {
    const { modePayment, modeChange, modeSlider, changeInputs, numpad } = elements;
    const SLIDE_WIDTH = 130;
    const ACTIVE = ["text-white", "text-shadow-lg", "cursor-default"];
    const INACTIVE = ["text-slate-500", "text-shadow-none", "cursor-pointer"];
    const setActive = (el) => el.classList.add(...ACTIVE) & el.classList.remove(...INACTIVE);
    const setInactive = (el) => el.classList.add(...INACTIVE) & el.classList.remove(...ACTIVE);
    function setPaymentMode() {
      store.mode = "payment";
      resetAll();
      modeSlider.style.transform = "translateX(0px)";
      setActive(modePayment);
      setInactive(modeChange);
      changeInputs.classList.add("invisible", "opacity-0", "payment-mode");
      if (numpad?.classList.contains("keyboard-on")) {
        setTimeout(() => {
          numpad.style.transform = "translateY(-74px)";
        }, 800);
      }
      updateDisplayText();
    }
    function setChangeMode() {
      store.mode = "change";
      resetAll();
      modeSlider.style.transform = `translateX(${SLIDE_WIDTH}px)`;
      setActive(modeChange);
      setInactive(modePayment);
      const keyboardOpen = numpad?.classList.contains("keyboard-on");
      if (keyboardOpen) {
        numpad.style.transform = "translateY(0)";
        setTimeout(() => {
          changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
        }, 600);
      } else {
        changeInputs.classList.remove("invisible", "opacity-0", "payment-mode");
      }
      updateDisplayText();
    }
    modePayment.addEventListener("click", setPaymentMode);
    modeChange.addEventListener("click", setChangeMode);
    setPaymentMode();
  }
  function initKeypadToggle() {
    const { toggleNumpad, numpad } = elements;
    toggleNumpad.addEventListener("click", () => {
      const isPaymentMode = store.mode === "payment";
      if (numpad.classList.contains("keyboard-on")) {
        numpad.classList.remove("keyboard-on");
        numpad.classList.add("xl:invisible", "xl:opacity-0");
        numpad.style.transform = "";
        store.keyboardVisible = false;
      } else {
        numpad.classList.add("keyboard-on");
        numpad.classList.remove("xl:invisible", "xl:opacity-0");
        store.keyboardVisible = true;
        if (isPaymentMode) {
          setTimeout(() => {
            numpad.style.transform = "translateY(-74px)";
          }, 500);
        }
      }
    });
  }
  function initResetButton() {
    const { resetCalc } = elements;
    if (!resetCalc) return;
    resetCalc.addEventListener("click", () => {
      resetAll();
      updateDisplayText();
    });
  }
  var init_calc_interface = __esm({
    "src/scripts/calc-interface.js"() {
      init_variables();
      init_inputs_handling();
    }
  });

  // src/scripts/main.js
  var require_main = __commonJS({
    "src/scripts/main.js"() {
      init_utils();
      init_calc_interface();
      init_inputs_handling();
      document.addEventListener("DOMContentLoaded", () => {
        initThemeSwitch();
        initModeSwitch();
        initInputFeedback();
        initInputsListener();
        initKeypadToggle();
        initResetButton();
      });
    }
  });
  require_main();
})();
