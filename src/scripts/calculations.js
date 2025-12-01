const RATE = 1.95583;

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
                        message: "Моля, въведете данни за частично плащане в евро или лв.",
                    }
                })
            );
        } else {
            document.dispatchEvent(
                new CustomEvent("show-notification", {
                    detail: {
                        type: "error",
                        message: "Моля, въведете валидна цена в евро или лв.",
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


export { initInputsListener };