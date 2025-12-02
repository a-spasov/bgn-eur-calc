const RATE = 1.95583;

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
        default: return;
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
                        fieldId: el.id,
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
                        fieldId: el.id,
                    }
                })
            );
        } else {                    
            document.dispatchEvent(
                new CustomEvent("show-notification", {
                    detail: {
                        type: "error",
                        fieldId: el.id,
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

    input.classList.remove("border-lime-600", "border-red-600", );
    input.classList.add("border-gray-500");
}

function resetAll() {
    const ids = [
        "priceEur", "priceBgn",
        "paidEur", "paidBgn",
        "changeEur", "changeBgn"
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        resetInput(el);
    });

    const results = document.getElementById("resultsLine");
    if (results) results.textContent = "0.00";
}

export { initInputsListener };