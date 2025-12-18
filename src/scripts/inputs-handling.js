import { elements, store } from "./variables.js";
import { calculatePayment, calculateChange } from "./calculations.js";
import { updateResultDisplay, scrollInputsPanelToTop } from "./calc-interface.js";

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

    // Unlock behavior
    if (!input.value) {
        if (id === "changeEur") changeBgn.disabled = false;
        if (id === "changeBgn") changeEur.disabled = false;

        clearValidation(changeEur);
        clearValidation(changeBgn);
        return { valid: true, mixed: false };
    }

    // Lock the opposite field
    if (id === "changeEur") changeBgn.disabled = true;
    if (id === "changeBgn") changeEur.disabled = true;

    // Validate against max allowed change
    if (isNaN(value)) {
        markInvalid(input);
        return { valid: false };
    }

    if (
        (id === "changeEur" && value > maxEur) ||
        (id === "changeBgn" && value > maxBgn)
    ) {
        markInvalid(input);
        return {
            valid: false,
            warning: "Въведената сума е по-голяма от дължимото ресто",
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

    // 1) Check for invalid characters (keep raw text)
    // Allowed: digits and ONE dot
    if (/[^0-9.]/.test(raw)) {
        markInvalid(input);
        store.validation[fieldId] = false;

        // Show red ping + stop all calculations
        updateResultDisplay({
            type: "warning",
            message: "Невалидни символи. Моля, въведете само числа."
        });

        return false;
    }

    // Empty input resets validation
    if (raw === "") {
    clearValidation(input);
    store.validation[fieldId] = false;
    store.inputs[fieldId] = "";

    // 🔓 PRICE auto-conversion cleanup
    if (fieldId === "priceEur") {
        elements.priceBgn.value = "";
        elements.priceBgn.disabled = false;
        clearValidation(elements.priceBgn);
        store.inputs.priceBgn = "";
        store.validation.priceBgn = false;
    }

    if (fieldId === "priceBgn") {
        elements.priceEur.value = "";
        elements.priceEur.disabled = false;
        clearValidation(elements.priceEur);
        store.inputs.priceEur = "";
        store.validation.priceEur = false;
    }

    // allow empty for change fields
    if (fieldId === "changeEur" || fieldId === "changeBgn") {
        return "empty";
    }

    return false;
}


    // 2) Validate numeric structure (only one dot allowed)
    if ((value.match(/\./g) || []).length > 1) {
        markInvalid(input);
        store.validation[fieldId] = false;
        updateResultDisplay({
            type: "warning",
            message: "Невалиден формат. Използвайте само една десетична точка."
        });
        return false;
    }

    // 3) Valid numeric text → mark as valid
    markValid(input);
    store.validation[fieldId] = true;

    // AUTO CONVERT ONLY FOR PRICE, NOT for paid/change
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

        // CASE: change input becomes empty
        if (valid === "empty") {

            if (store.mode === "change" &&
                (input.id === "changeEur" || input.id === "changeBgn")) {

                // Re-enable the opposite input
                if (input.id === "changeEur") elements.changeBgn.disabled = false;
                if (input.id === "changeBgn") elements.changeEur.disabled = false;

                // Show full original change
                const base = calculateChange();
                updateResultDisplay(base);
            }

            return;
        }

        // Stop only on truly invalid input
        if (!valid) return;

        // Now it's safe to continue
        let result = null;

        if (store.mode === "payment") {
            result = calculatePayment();
        } else if (store.mode === "change") {
            result = calculateChange();
        }

        // CHANGE MODE partial change handling
        if (store.mode === "change" && (input.id === "changeEur" || input.id === "changeBgn")) {

            const result = calculateChange(); // общото ресто

            if (!result || result.type !== "change") {
                updateResultDisplay(result || null);
                return;
            }

            const { maxEur, maxBgn } = result;

            const state = handleChangeField(input, maxEur, maxBgn);

            if (!state.valid) {
                updateResultDisplay({
                    type: "warning",
                    message: state.warning || "Невалидна стойност"
                });
                return;
            }

            // If input is empty → show full standard change again
            if (!input.value) {
                updateResultDisplay(result); // original full change
                return;
            }

            // If mixed change was entered
            if (state.mixed) {
                const partial = parseFloat(input.value.replace(",", "."));

                if (
                    (input.id === "changeEur" && partial > result.totalChangeEUR) ||
                    (input.id === "changeBgn" && partial > result.totalChangeBGN)
                ) {
                    markInvalid(input);
                    updateResultDisplay({
                        type: "warning",
                        message: "Внимание! Въведената сума за частично ресто е по-голяма от цялата стойност на рестото."
                    });
                    return;
                }

                let mixedEur, mixedBgn;

                if (input.id === "changeEur") {
                    mixedEur = partial;
                    mixedBgn = (result.totalChangeEUR - partial) * store.rate;
                } else {
                    mixedBgn = partial;
                    mixedEur = (result.totalChangeBGN - partial) / store.rate;
                }

                result.hasMixed = true;
                result.mixedEur = mixedEur;
                result.mixedBgn = mixedBgn;

                updateResultDisplay(result);
                return;
            }

            updateResultDisplay(result);
            return;
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
            scrollInputsPanelToTop();
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