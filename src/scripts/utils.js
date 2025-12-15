import { elements, store } from "./variables.js";
import { calculateChange } from "./calculations.js";
import { validateInput } from "./inputs-handling.js";
import { updateResultDisplay } from "./calc-interface.js"; 

function initThemeSwitch() {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");

    document.getElementById("themeToggle").addEventListener("click", () => {
        const html = document.documentElement;

        if (html.classList.contains("dark")) {
            localStorage.setItem("theme", "light");
        html.classList.remove("dark");

        } else {
            localStorage.setItem("theme", "dark");
        html.classList.add("dark");

        }
    });  
}

function initURLLoader() {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("price")) return;  // no GET parameter → do nothing

    let raw = params.get("price").toLowerCase().trim();  // e.g. "120.99eur", "120.99bgn"
    raw = raw.replace(",", ".");
    // Extract number part
    const number = parseFloat(raw);
    if (isNaN(number)) return;

    // Detect currency
    const isEur = raw.endsWith("eur");
    const isBgn = raw.endsWith("bgn");

    if (!isEur && !isBgn) return;

    // Force change mode
    store.mode = "change";
    document.getElementById("modeChange").click();  // activate UI switch

    // Fill the correct price input
    if (isEur) {
        elements.priceEur.value = number.toFixed(2);
        validateInput(elements.priceEur);
    }

    if (isBgn) {
        elements.priceBgn.value = number.toFixed(2);
        validateInput(elements.priceBgn);
    }

    // Trigger initial calculation
    const result = calculateChange();
    updateResultDisplay(result);
}


export { initURLLoader, initThemeSwitch };

