import { elements, store } from "./variables.js";
import { resetAll, validateInput } from "./inputs-handling.js";

function updateDisplayText() {
    const { checklist, messageText } = elements;
    if (!checklist || !messageText) return;

    checklist.innerHTML = "";

    const isPaymentMode = store.mode === "payment";

    messageText.textContent = isPaymentMode
        ? "За да разберете колко да доплатите, въведете:"
        : "За да разберете колко да върнете, въведете:";
    const items = isPaymentMode
        ? [
            "обща цена на стоката/услугата в евро или лв.",
            "частична платената сума в евро или лв."
        ]
        : [
            "обща цена в евро или лв.",
            "получена сума в евро и/или лв.",
            "частична върната сума в евро или лв. (само за смесено ресто)"
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

const checklistMap = {
    priceEur: 1,
    priceBgn: 1,
    paidEur: 2,
    paidBgn: 2,
    changeEur: 3,
    changeBgn: 3,
};

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

    if (
        (isValidA && (isValidB || emptyB)) ||
        (isValidB && (isValidA || emptyA))
    ) {
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
        } 
        else if (btn.querySelector(".fa-rotate-left")) {
            input.value = "";
        }
        else {
            input.value += value;
        }

        input.focus();

        store.inputs[input.id] = input.value;

        const valid = validateInput(input);

        document.dispatchEvent(new CustomEvent("show-notification", {
            detail: { type: valid ? "success" : "error", fieldId: input.id }
        }));
    });
}


export {
    updateDisplayText,
    initModeSwitch,
    initKeypadToggle,
    initResetButton,
    initInputFeedback,
    initKeypadInput,
};
