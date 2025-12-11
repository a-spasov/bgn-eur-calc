(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

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
        messageIcon: document.getElementById("messageIcon"),
        resultsLine: document.getElementById("resultsLine")
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
        activeInput: null,
        validation: {
          priceValid: false,
          paidValid: false,
          changeValid: false
        }
      };
    }
  });

  // src/scripts/calculations.js
  function getUnifiedValue(eurField, bgnField) {
    const eurRaw = store.inputs[eurField];
    const bgnRaw = store.inputs[bgnField];
    const eur = eurRaw ? parseFloat(eurRaw.replace(",", ".")) : NaN;
    const bgn = bgnRaw ? parseFloat(bgnRaw.replace(",", ".")) : NaN;
    if (!isNaN(eur)) return eur;
    if (!isNaN(bgn)) return bgn / store.rate;
    return null;
  }
  function determinePaidLabel() {
    const paidEur = parseFloat(store.inputs.paidEur);
    const paidBgn = parseFloat(store.inputs.paidBgn);
    if (!isNaN(paidEur)) return `${paidEur.toFixed(2)} \u0435\u0432\u0440\u043E`;
    if (!isNaN(paidBgn)) return `${paidBgn.toFixed(2)} \u043B\u0432.`;
    return "";
  }
  function calculatePayment() {
    const price = getUnifiedValue("priceEur", "priceBgn");
    const paid = getUnifiedValue("paidEur", "paidBgn");
    if (price === null || paid === null) return null;
    const remainingEUR = price - paid;
    const remainingBGN = remainingEUR * store.rate;
    if (remainingEUR <= 0) {
      return { type: "warning", message: "\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0443\u043C\u0430 \u0437\u0430 \u043F\u043B\u0430\u0449\u0430\u043D\u0435 \u043F\u043E-\u043C\u0430\u043B\u043A\u0430 \u043E\u0442 \u043A\u0440\u0430\u0439\u043D\u0430\u0442\u0430 \u0446\u0435\u043D\u0430." };
    }
    return {
      type: "result",
      priceEUR: price,
      priceBGN: price * store.rate,
      paidLabel: determinePaidLabel(),
      remainingEUR,
      remainingBGN
    };
  }
  function calculateChange() {
    const price = getUnifiedValue("priceEur", "priceBgn");
    if (price === null) return null;
    let paidEur = parseFloat(store.inputs.paidEur);
    let paidBgn = parseFloat(store.inputs.paidBgn);
    if (isNaN(paidEur)) paidEur = null;
    if (isNaN(paidBgn)) paidBgn = null;
    if (paidEur === null && paidBgn === null) return null;
    let totalPaidEUR = 0;
    if (paidEur !== null) totalPaidEUR += paidEur;
    if (paidBgn !== null) totalPaidEUR += paidBgn / store.rate;
    const diffEUR = totalPaidEUR - price;
    const diffBGN = diffEUR * store.rate;
    if (diffEUR < 0) {
      return { type: "warning", message: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0435 \u043F\u043E-\u043C\u0430\u043B\u043A\u0430 \u043E\u0442 \u0446\u0435\u043D\u0430\u0442\u0430." };
    }
    return {
      type: "change",
      priceEUR: price,
      priceBGN: price * store.rate,
      paidEur,
      paidBgn,
      totalChangeEUR: diffEUR,
      totalChangeBGN: diffBGN,
      showAsterisk: paidEur !== null && paidBgn !== null
    };
  }
  var init_calculations = __esm({
    "src/scripts/calculations.js"() {
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
            size-3 rounded-full border border-current
            opacity-50
        `;
      li.appendChild(indicator);
      li.appendChild(document.createTextNode(text));
      checklist.appendChild(li);
    });
  }
  function setIndicatorIdle(el) {
    el.innerHTML = "";
    el.className = `check-indicator inline-block size-3 rounded-full border border-current opacity-50`;
  }
  function setIndicatorSuccess(el) {
    el.className = `
        check-indicator inline-flex items-center justify-center 
        size-3 rounded-full bg-lime-500 text-white
    `;
    el.innerHTML = `<i class="fa-solid fa-check text-[8px] leading-none"></i>`;
  }
  function setIndicatorError(el) {
    el.className = `
        check-indicator relative inline-flex items-center justify-center 
        size-3 rounded-full bg-red-600
    `;
    el.innerHTML = `
        <span class="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        <span class="relative block size-3 rounded-full bg-red-600"></span>
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
    numpad.addEventListener("mousedown", (event) => {
      const btn = event.target.closest("button");
      if (!btn) return;
      event.preventDefault();
    });
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
      if (window.history && window.history.replaceState) {
        const cleanURL = window.location.pathname;
        window.history.replaceState({}, "", cleanURL);
      }
    });
  }
  function initKeypadInput() {
    const { numpad } = elements;
    if (!numpad) return;
    numpad.addEventListener("click", (event) => {
      const btn = event.target.closest("button");
      if (!btn) return;
      if (!store.activeInput) return;
      const input = store.activeInput;
      const value = btn.textContent.trim();
      if (btn.querySelector(".fa-trash")) {
        input.value = input.value.slice(0, -1);
      } else if (btn.querySelector(".fa-rotate-left")) {
        input.value = "";
      } else {
        input.value += value;
      }
      input.focus();
      store.inputs[input.id] = input.value;
      const valid = validateInput(input);
      document.dispatchEvent(new CustomEvent("show-notification", {
        detail: { type: valid ? "success" : "error", fieldId: input.id }
      }));
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
  function updateResultDisplay(result) {
    const instructions = document.getElementById("messageLine");
    const results = elements.resultsLine;
    if (!instructions || !results) return;
    if (!result) {
      instructions.classList.remove("opacity-0", "pointer-events-none");
      instructions.classList.add("opacity-100");
      results.classList.remove("opacity-100");
      results.classList.add("opacity-0", "pointer-events-none");
      results.innerHTML = "";
      return;
    }
    instructions.classList.remove("opacity-100");
    instructions.classList.add("opacity-0", "pointer-events-none");
    results.classList.remove("opacity-0", "pointer-events-none");
    results.classList.add("opacity-100");
    if (result.type === "warning") {
      results.innerHTML = `
        <div class="flex items-center gap-2 text-yellow-400 font-semibold text-base">
            <span class="relative size-3 inline-flex items-center justify-center">
                <span class="absolute size-3 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span class="relative size-3 rounded-full bg-red-600"></span>
            </span>
            ${result.message}
        </div>`;
      return;
    }
    if (result.type === "change") {
      let totalPaidEUR = 0;
      if (result.paidEur !== null) totalPaidEUR += result.paidEur;
      if (result.paidBgn !== null) totalPaidEUR += result.paidBgn / store.rate;
      let totalPaidBGN = totalPaidEUR * store.rate;
      const receivedLine = `
        \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438:
        <span class="ml-2 font-bold text-blue-300">
            ${totalPaidEUR.toFixed(2)} \u0435\u0432\u0440\u043E
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-400">${totalPaidBGN.toFixed(2)} \u043B\u0432.</span> )
        </span>
    `;
      const priceLine = `
        \u0426\u0435\u043D\u0430:
        <span class="ml-2 font-bold text-blue-300">
            ${result.priceEUR.toFixed(2)} \u0435\u0432\u0440\u043E
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-400">${result.priceBGN.toFixed(2)} \u043B\u0432.</span> )
        </span>
    `;
      let changeLine = "";
      if (result.hasMixed) {
        changeLine = `
            \u0420\u0435\u0441\u0442\u043E: 
            <span class="ml-2 font-bold text-blue-300">
                ${result.mixedEur.toFixed(2)} \u0435\u0432\u0440\u043E
            </span>
            \u0438
            <span class="ml-1 font-bold text-orange-400">
                ${result.mixedBgn.toFixed(2)} \u043B\u0432.
            </span>
            <span class="align-top text-red-500 font-bold">*</span>
        `;
      } else {
        changeLine = `
            \u0420\u0435\u0441\u0442\u043E: 
            <span class="ml-2 font-bold text-blue-300">
                ${Math.abs(result.totalChangeEUR).toFixed(2)} \u0435\u0432\u0440\u043E
            </span>
            ( \u0438\u043B\u0438 
            <span class="font-bold text-orange-400">
                ${Math.abs(result.totalChangeBGN).toFixed(2)} \u043B\u0432.
            </span>
            )
            <span class="align-top text-red-500 font-bold">*</span>
        `;
      }
      results.innerHTML = `
        <div class="text-sm">
            ${priceLine}
        </div>

        <div class="text-sm">
            ${receivedLine}
        </div>

        <div class="text-sm">
            ${changeLine}
        </div>
        <div class="text-xs mt-1 text-gray-300 tracking-widest font-bold">
                    <span class="font-bold text-red-500">*</span>
                    \u0417\u0430 \u0441\u043C\u0435\u0441\u0435\u043D\u043E \u0440\u0435\u0441\u0442\u043E \u0438\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0442\u0435 \u0434\u0432\u0435 \u043F\u043E\u043B\u0435\u0442\u0430
                   </div>
    `;
      return;
    }
    const paidIsEUR = result.paidLabel.includes("\u0435\u0432\u0440\u043E");
    results.innerHTML = `
        <div class="text-sm">
            \u0426\u0435\u043D\u0430:
            <span class="ml-2 mr-1 font-bold text-blue-300">
                <span class="text-base text-shadow-lg">${result.priceEUR.toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            ( = 
            <span class="ml-1 font-bold text-orange-400">
                <span class="text-base text-shadow-lg">${result.priceBGN.toFixed(2)}</span> \u043B\u0432.
            </span>
            )
        </div>

        <div class="text-sm">
            \u041F\u043B\u0430\u0442\u0435\u043D\u0438 \u0434\u043E \u043C\u043E\u043C\u0435\u043D\u0442\u0430:
            <span class="ml-2 font-bold ${paidIsEUR ? "text-blue-300" : "text-orange-400"}">
                <span class="text-base text-shadow-lg">${result.paidLabel}</span>
            </span>
        </div>

        <div class="text-sm">
            \u041E\u0441\u0442\u0430\u0432\u0430\u0442 \u0437\u0430 \u0434\u043E\u043F\u043B\u0430\u0449\u0430\u043D\u0435:
            <span class="ml-2 mr-1 font-bold text-blue-300">
                <span class="text-base text-shadow-lg">${result.remainingEUR.toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            \u0438\u043B\u0438
            <span class="ml-1 font-bold text-orange-400">
                <span class="text-base text-shadow-lg">${result.remainingBGN.toFixed(2)}</span> \u043B\u0432.
            </span>
        </div>
    `;
  }
  var init_calc_interface = __esm({
    "src/scripts/calc-interface.js"() {
      init_variables();
      init_inputs_handling();
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
  function safeFormat(input) {
    if (!input) return;
    const fieldId = input.id;
    if (store.validation[fieldId] !== true) return;
    const n = parseFloat(input.value.replace(",", "."));
    if (!isNaN(n)) {
      formatCurrency(input);
      store.inputs[fieldId] = input.value;
    }
  }
  function handleChangeField(input, maxEur, maxBgn) {
    const id = input.id;
    const value = parseFloat(input.value.replace(",", "."));
    const { changeEur, changeBgn } = elements;
    if (!input.value) {
      if (id === "changeEur") changeBgn.disabled = false;
      if (id === "changeBgn") changeEur.disabled = false;
      clearValidation(changeEur);
      clearValidation(changeBgn);
      return { valid: true, mixed: false };
    }
    if (id === "changeEur") changeBgn.disabled = true;
    if (id === "changeBgn") changeEur.disabled = true;
    if (isNaN(value)) {
      markInvalid(input);
      return { valid: false };
    }
    if (id === "changeEur" && value > maxEur || id === "changeBgn" && value > maxBgn) {
      markInvalid(input);
      return {
        valid: false,
        warning: "\u0412\u044A\u0432\u0435\u0434\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0435 \u043F\u043E-\u0433\u043E\u043B\u044F\u043C\u0430 \u043E\u0442 \u0434\u044A\u043B\u0436\u0438\u043C\u043E\u0442\u043E \u0440\u0435\u0441\u0442\u043E"
      };
    }
    markValid(input);
    return { valid: true, mixed: true };
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
    const fieldId = input.id;
    const raw = input.value;
    const value = raw.replace(",", ".");
    store.inputs[fieldId] = raw;
    if (/[^0-9.]/.test(raw)) {
      markInvalid(input);
      store.validation[fieldId] = false;
      updateResultDisplay({
        type: "warning",
        message: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0438 \u0441\u0438\u043C\u0432\u043E\u043B\u0438. \u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0430\u043C\u043E \u0447\u0438\u0441\u043B\u0430."
      });
      return false;
    }
    if (raw === "") {
      clearValidation(input);
      store.validation[fieldId] = false;
      if (fieldId === "changeEur" || fieldId === "changeBgn") {
        store.inputs[fieldId] = "";
        return "empty";
      }
      return false;
    }
    if ((value.match(/\./g) || []).length > 1) {
      markInvalid(input);
      store.validation[fieldId] = false;
      updateResultDisplay({
        type: "warning",
        message: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0444\u043E\u0440\u043C\u0430\u0442. \u0418\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u0439\u0442\u0435 \u0441\u0430\u043C\u043E \u0435\u0434\u043D\u0430 \u0434\u0435\u0441\u0435\u0442\u0438\u0447\u043D\u0430 \u0442\u043E\u0447\u043A\u0430."
      });
      return false;
    }
    markValid(input);
    store.validation[fieldId] = true;
    autoConvert(fieldId, value);
    return true;
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
    if (resultsLine) {
      resultsLine.classList.remove("opacity-100");
      resultsLine.classList.add("opacity-0", "pointer-events-none");
      resultsLine.innerHTML = "";
    }
    const instructions = document.getElementById("messageLine");
    if (instructions) {
      instructions.classList.remove("opacity-0", "pointer-events-none");
      instructions.classList.add("opacity-100");
    }
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
      if (valid === "empty") {
        if (store.mode === "change" && (input.id === "changeEur" || input.id === "changeBgn")) {
          if (input.id === "changeEur") elements.changeBgn.disabled = false;
          if (input.id === "changeBgn") elements.changeEur.disabled = false;
          const base = calculateChange();
          updateResultDisplay(base);
        }
        return;
      }
      if (!valid) return;
      let result = null;
      if (store.mode === "payment") {
        result = calculatePayment();
      } else if (store.mode === "change") {
        result = calculateChange();
      }
      if (store.mode === "change" && (input.id === "changeEur" || input.id === "changeBgn")) {
        const result2 = calculateChange();
        if (!result2 || result2.type !== "change") {
          updateResultDisplay(result2 || null);
          return;
        }
        const { maxEur, maxBgn } = result2;
        const state = handleChangeField(input, maxEur, maxBgn);
        if (!state.valid) {
          updateResultDisplay({
            type: "warning",
            message: state.warning || "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"
          });
          return;
        }
        if (!input.value) {
          updateResultDisplay(result2);
          return;
        }
        if (state.mixed) {
          const partial = parseFloat(input.value.replace(",", "."));
          if (input.id === "changeEur" && partial > result2.totalChangeEUR || input.id === "changeBgn" && partial > result2.totalChangeBGN) {
            markInvalid(input);
            updateResultDisplay({
              type: "warning",
              message: "\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u0412\u044A\u0432\u0435\u0434\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0437\u0430 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E \u0440\u0435\u0441\u0442\u043E \u0435 \u043F\u043E-\u0433\u043E\u043B\u044F\u043C\u0430 \u043E\u0442 \u0446\u044F\u043B\u0430\u0442\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043D\u0430 \u0440\u0435\u0441\u0442\u043E\u0442\u043E."
            });
            return;
          }
          let mixedEur, mixedBgn;
          if (input.id === "changeEur") {
            mixedEur = partial;
            mixedBgn = (result2.totalChangeEUR - partial) * store.rate;
          } else {
            mixedBgn = partial;
            mixedEur = (result2.totalChangeBGN - partial) / store.rate;
          }
          result2.hasMixed = true;
          result2.mixedEur = mixedEur;
          result2.mixedBgn = mixedBgn;
          updateResultDisplay(result2);
          return;
        }
        updateResultDisplay(result2);
        return;
      }
      updateResultDisplay(result);
      document.dispatchEvent(
        new CustomEvent("show-notification", {
          detail: { type: valid ? "success" : "error", fieldId: input.id }
        })
      );
    });
    wrapper.addEventListener("focusin", (event) => {
      const input = event.target;
      if (input.matches("input")) {
        if (store.activeInput && store.activeInput !== input) {
          safeFormat(store.activeInput);
        }
        store.activeInput = input;
      }
    });
    document.addEventListener("click", (event) => {
      const active = store.activeInput;
      if (!active) return;
      if (event.target === active || active.contains(event.target)) return;
      if (event.target.closest("#numpad")) return;
      safeFormat(active);
    });
  }
  var init_inputs_handling = __esm({
    "src/scripts/inputs-handling.js"() {
      init_variables();
      init_calculations();
      init_calc_interface();
    }
  });

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
  function initURLLoader() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("price")) return;
    let raw = params.get("price").toLowerCase().trim();
    raw = raw.replace(",", ".");
    const number = parseFloat(raw);
    if (isNaN(number)) return;
    const isEur = raw.endsWith("eur");
    const isBgn = raw.endsWith("bgn");
    if (!isEur && !isBgn) return;
    store.mode = "change";
    document.getElementById("modeChange").click();
    if (isEur) {
      elements.priceEur.value = number.toFixed(2);
      validateInput(elements.priceEur);
    }
    if (isBgn) {
      elements.priceBgn.value = number.toFixed(2);
      validateInput(elements.priceBgn);
    }
    const result = calculateChange();
    updateResultDisplay(result);
  }
  var init_utils = __esm({
    "src/scripts/utils.js"() {
      init_variables();
      init_calculations();
      init_inputs_handling();
      init_calc_interface();
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
        initKeypadInput();
        initURLLoader();
      });
    }
  });
  require_main();
})();
