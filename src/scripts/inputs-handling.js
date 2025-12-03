import { elements, store } from "./variables.js";

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
        resultsLine,
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
                detail: { type: valid ? "success" : "error", fieldId: input.id },
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
                    detail: { type: valid ? "success" : "error", fieldId: input.id },
                })
            );
        },
        false
    );
}

export { initInputsListener, resetAll };
