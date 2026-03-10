import { elements, store } from "./variables.js";
import { formatCurrency, resetAll, validateInput } from "./inputs-handling.js";

function disableNativeKeyboard(input) {
    input.addEventListener("focus", (e) => {
        if (window.innerWidth < 1024) {
            e.preventDefault();
            // iOS Safari workaround
            input.blur();
            input.focus({ preventScroll: true });
        }
    });
}

function initDisableNativeKeyboard() {
    Object.values(elements)
        .filter(el => el?.tagName === "INPUT")
        .forEach(disableNativeKeyboard);
}

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
            "обща цена в евро или лв.",
            "частична платената сума в евро или лв."
        ]
        : [
            "обща цена в евро или лв.",
            "получена сума в евро и/или лв.",
            "частична върната сума в евро или лв. (само за смесено ресто)"
        ];

    items.forEach((text, index) => {
        const li = document.createElement("li");
        li.classList.add(
            `inputs-line-${index + 1}`,
            "flex",
            "items-center",
            "justify-start",
            "gap-2",
            "my-1.5",
            "leading-none"
        );

        const indicator = document.createElement("span");
        indicator.className = `
            check-indicator inline-block
            size-3.5 rounded-full border border-current
            opacity-50
        `;

        const textSpan = document.createElement("span");
        textSpan.className = "w-full max-w-13/14 sm:max-w-full"; // optional
        textSpan.textContent = text;

        li.appendChild(indicator);
        li.appendChild(textSpan);
        checklist.appendChild(li);
    });
}

function setIndicatorIdle(el) {
    el.innerHTML = "";
    el.className = `check-indicator inline-block size-3.5 rounded-full border border-current opacity-50`;
}

function setIndicatorSuccess(el) {
    el.className = `
        check-indicator inline-flex items-center justify-center 
        size-3.5 rounded-full bg-lime-600 text-white
    `;
    el.innerHTML = `<i class="fa-solid fa-check text-[8px] leading-none"></i>`;
}

function setIndicatorError(el) {
    el.className = `
        check-indicator relative inline-flex items-center justify-center 
        size-3.5 rounded-full bg-red-600
    `;
    el.innerHTML = `
        <span class="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        <span class="relative block size-3.5 rounded-full bg-red-600"></span>
    `;
}

function scrollInputsPanelToTop() {
    if (window.innerWidth >= 640) return;

    const panel = document.getElementById("calcInputs");
    if (!panel) return;

    panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
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

    const getSlideOffset = () => {
        return window.innerWidth < 640 ? "95%" : "130px";
    };
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
                const width = window.innerWidth;

                if (width < 400) {
                    numpad.style.transform = "translateY(-112px)";
                } else if (width >= 400 && width < 1536) {
                    numpad.style.transform = "translateY(-88px)";
                } else if (width >= 1536) {
                    numpad.style.transform = "translateY(-92px)";
                }
            }, 800);
        }

        updateDisplayText();
    }

    function setChangeMode() {
        store.mode = "change";
        resetAll();

        modeSlider.style.transform = `translateX(${getSlideOffset()})`;
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
    if (window.innerWidth < 1280) {
        numpad.classList.add("keyboard-on");
        numpad.classList.remove("xl:invisible", "xl:opacity-0");
        store.keyboardVisible = true;

        if (store.mode === "payment") {
            setTimeout(() => {
                if (store.mode !== "payment" || !numpad.classList.contains("keyboard-on")) return;

                const width = window.innerWidth;

                if (width < 400) {
                    numpad.style.transform = "translateY(-112px)";
                } else if (width >= 400 && width < 1536) {
                    numpad.style.transform = "translateY(-88px)";
                } else if (width >= 1536) {
                    numpad.style.transform = "translateY(-92px)";
                }
            }, 0);
        }
    }

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
                    if (store.mode !== "payment" || !numpad.classList.contains("keyboard-on")) return;

                    const width = window.innerWidth;

                    if (width < 1536) {
                        numpad.style.transform = "translateY(-88px)";
                    } else if (width >= 1536) {
                        numpad.style.transform = "translateY(-92px)";
                    }
                }, 500);
            }
        }
    });
}

function initAsideToggle() {
    const { infoAside, toggleAside, closeAside } = elements;
    if (!infoAside || !toggleAside) return;
    const ASIDE_SHADOW = [
        "shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]",
        "dark:shadow-[0_0_0_9999px_rgba(255,255,255,0.05)]"
    ];

    const CLOSED_CLASS = "translate-x-full";

    const openAside = () => {
        store.asideVisible = true;
        infoAside.classList.remove(CLOSED_CLASS);

        if (window.innerWidth < 1280) {
            infoAside.classList.add(...ASIDE_SHADOW);
        }
    };

    const closeAsideFn = () => {
        store.asideVisible = false;
        infoAside.classList.add(CLOSED_CLASS);
        infoAside.classList.remove(...ASIDE_SHADOW);
    };

    document.addEventListener("click", (e) => {
        if (window.innerWidth >= 1280) return;

        const clickedToggle = toggleAside.contains(e.target);
        const clickedClose = closeAside?.contains(e.target);
        const clickedInside = infoAside.contains(e.target);

        if (clickedToggle) {
            store.asideVisible ? closeAsideFn() : openAside();
            return;
        }

        if (clickedClose || (store.asideVisible && !clickedInside)) {
            closeAsideFn();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1280) {
            store.asideVisible = false;
            infoAside.classList.remove(CLOSED_CLASS, ...ASIDE_SHADOW);
        } else if (!store.asideVisible) {
            infoAside.classList.add(CLOSED_CLASS);
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

function resetPriceGroupState() {
    elements.priceEur.value = "";
    elements.priceBgn.value = "";

    store.inputs.priceEur = "";
    store.inputs.priceBgn = "";

    store.validation.priceEur = false;
    store.validation.priceBgn = false;

    document.dispatchEvent(new CustomEvent("show-notification"));
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

        if (
            (input.id === "priceEur" || input.id === "priceBgn") &&
            input.value === ""
        ) {
            resetPriceGroupState();
            return;
        }

        const valid = validateInput(input);

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
        <div class="flex items-center gap-2 text-gray-500 dark:text-yellow-400 font-bold text-base">
            <span class="relative size-3.5 inline-flex items-center justify-center">
                <span class="absolute size-3.5 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span class="relative size-3.5 rounded-full bg-red-600"></span>
            </span>
            ${result.message}
        </div>`;
        return;
    }
    //  CHANGE MODE
    if (result.type === "change") {
        let totalPaidEUR = 0;
        if (result.paidEur !== null) totalPaidEUR += result.paidEur;
        if (result.paidBgn !== null) totalPaidEUR += result.paidBgn / store.rate;

        let totalPaidBGN = totalPaidEUR * store.rate;

        const receivedLine = `
        <div class="my-1">
        Получени:
        <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
            <span class="text-base">${totalPaidEUR.toFixed(2)}</span> евро
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-500 dark:text-orange-400"><span class="text-base">${totalPaidBGN.toFixed(2)}</span> лв.</span> )
        </span>
        </div>
    `;

        const priceLine = `
        Цена:
        <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
            <span class="text-base">${result.priceEUR.toFixed(2)}</span> евро
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-500 dark:text-orange-400"><span class="text-base">${result.priceBGN.toFixed(2)}</span> лв.</span> )
        </span>
    `;

        let changeLine = "";

        if (result.hasMixed) {
            changeLine = `
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            Ресто: 
            <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${result.mixedEur.toFixed(2)}</span> евро
            </span>
            и
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${result.mixedBgn.toFixed(2)}</span> лв.
            </span>
            </span>
        `;
        } else {
            changeLine = `
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            Ресто: 
            <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${Math.abs(result.totalChangeEUR).toFixed(2)}</span> евро
            </span>
            ( или 
            <span class="font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${Math.abs(result.totalChangeBGN).toFixed(2)}</span> лв.
            </span>
            )
            </span>
        `;
        }

        results.innerHTML = `
        <div class="text-sm">
            ${priceLine}
        </div>

        <div class="text-sm">
            ${receivedLine}
        </div>

        <div class="text-sm relative w-full">
            ${changeLine}
        </div>
    `;

        return;
    }


    //  PAYMENT MODE
    const paidIsEUR = result.paidLabel.includes("евро");

    results.innerHTML = `
        <div class="text-sm">
            Цена:
            <span class="ml-2 mr-1 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${result.priceEUR.toFixed(2)}</span> евро
            </span>
            ( = 
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${result.priceBGN.toFixed(2)}</span> лв.
            </span>
            )
        </div>

        <div class="text-sm my-1">
            Платени до момента:
            <span class="ml-2 font-bold ${paidIsEUR ? "text-sky-600 dark:text-blue-300" : "text-orange-500 dark:text-orange-400"}">
                <span class="text-base">${result.paidLabel}</span>
            </span>
        </div>

        <div class="relative text-sm">
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            Остават за доплащане:
            <span class="ml-2 mr-1 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${result.remainingEUR.toFixed(2)}</span> евро
            </span>
            или
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${result.remainingBGN.toFixed(2)}</span> лв.
            </span>
            </span>
        </div>
    `;
}

export {
    initDisableNativeKeyboard,
    updateDisplayText,
    initModeSwitch,
    initKeypadToggle,
    initAsideToggle,
    initResetButton,
    initInputFeedback,
    initKeypadInput,
    updateResultDisplay,
    scrollInputsPanelToTop
};