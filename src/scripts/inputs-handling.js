import { elements, store } from "./variables.js";
import { calculatePayment, calculateChange } from "./calculations.js";
import { updateResultDisplay } from "./calc-interface.js";

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
        if (fieldId === "priceEur") {
            resetInput(elements.priceBgn);
            elements.priceBgn.disabled = false;
        }

        if (fieldId === "priceBgn") {
            resetInput(elements.priceEur);
            elements.priceEur.disabled = false;
        }
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
    if (fieldId === "priceEur") resetInput(elements.priceBgn);
    if (fieldId === "priceBgn") resetInput(elements.priceEur);
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
        resultsLine,
    } = elements;

    // Reset all input fields
    resetInput(priceEur);
    resetInput(priceBgn);
    resetInput(paidEur);
    resetInput(paidBgn);
    resetInput(changeEur);
    resetInput(changeBgn);

    // --- DISPLAY RESET LOGIC (NO display:none!) ---

    // Hide results (fade out)
    if (resultsLine) {
        resultsLine.classList.remove("opacity-100");
        resultsLine.classList.add("opacity-0", "pointer-events-none");
        resultsLine.innerHTML = "";
    }

    // Show instructions (fade in)
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

        // Trigger calculation when inputs change
        let result = null;

        if (store.mode === "payment") {
            result = calculatePayment();
        } else if (store.mode === "change") {
            result = calculateChange();
        }

        updateResultDisplay(result);

        document.dispatchEvent(
            new CustomEvent("show-notification", {
                detail: { type: valid ? "success" : "error", fieldId: input.id },
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

export { initInputsListener, formatCurrency, resetAll, validateInput };
