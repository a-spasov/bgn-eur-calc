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

export { initURLLoader, initThemeSwitch };

